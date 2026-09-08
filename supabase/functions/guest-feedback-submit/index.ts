// guest-feedback-submit — Spec 010 follow-up (2026-09-07).
//
// The one write content_feedback's own RLS deliberately cannot express: a
// signed-out reader, identified only by an email address, filing feedback.
// RLS policies run as a specific *role* (authenticated/anon) with no
// concept of "but also send a confirmation email and only count it once
// they click it" — that needs code, hence an Edge Function, the same reason
// admin-suspend/admin-list-users exist (supabase/functions/_shared/adminAuth.ts's
// file-level comment). Unlike those two, this function has NO caller-identity
// check at all by design — anyone, signed in or not, may call it; every field
// it accepts is validated here, in full, because unlike the authenticated
// submitFeedback() path there is no RLS layer behind this insert at all (it
// runs as the service role, on purpose — see 0037_content_feedback_guest_access.sql).
//
// Confirmation, once the guest clicks the emailed link, does NOT go through
// this function — that's confirm_guest_feedback(), a SECURITY DEFINER RPC
// callable directly by `anon` (0037), since a same-shape "confirm a token"
// action needs no server-side email step and RLS-shaped logic (token match)
// is exactly what a database function is for.

import { serviceClient } from '../_shared/adminAuth.ts';

const PAGE_KINDS = ['topic', 'unit_opening', 'unit_assessment', 'unit_teacher_notes', 'course_review'];
const SCOPES = ['whole_page', 'passage'];
const LOCALES = ['en', 'ur'];
const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
const MAX_COMMENT = 4000;
const MAX_PASSAGE = 2000;

type Body = {
  email?: string;
  pageKind?: string;
  courseCode?: string;
  unitNo?: number | null;
  topicNo?: number | null;
  locale?: string;
  sectionAnchor?: string | null;
  scope?: string;
  quotedPassage?: string | null;
  passageContext?: string | null;
  comment?: string;
  // Honeypot: a real reader never fills this (it's not shown by the actual
  // form); a bot filling every field in a scraped form usually does. Filled
  // -> pretend success, insert and send nothing. Never reveal the detection.
  website?: string;
};

function validationError(body: Body): string | null {
  if (!body.email || !EMAIL_RE.test(body.email) || body.email.length > 320) return 'a valid email is required';
  if (!body.pageKind || !PAGE_KINDS.includes(body.pageKind)) return 'invalid pageKind';
  if (!body.courseCode || typeof body.courseCode !== 'string') return 'courseCode is required';
  if (!body.locale || !LOCALES.includes(body.locale)) return 'invalid locale';
  if (!body.scope || !SCOPES.includes(body.scope)) return 'invalid scope';
  if (!body.comment || typeof body.comment !== 'string' || body.comment.length > MAX_COMMENT) {
    return 'comment is required (max 4000 characters)';
  }
  // Mirrors 0033's own CHECK constraints — a friendly 400 instead of a raw
  // Postgres constraint-violation error for the exact same rules.
  if (body.scope === 'passage' && (!body.quotedPassage || body.quotedPassage.length > MAX_PASSAGE)) {
    return 'a quoted passage (max 2000 characters) is required when scope is "passage"';
  }
  if (body.scope === 'whole_page' && body.quotedPassage) return 'quotedPassage must be omitted when scope is "whole_page"';
  if ((body.pageKind === 'topic') !== (body.topicNo != null)) return 'topicNo is required only for page_kind "topic"';
  if ((body.pageKind === 'course_review') !== (body.unitNo == null)) return 'unitNo must be omitted only for page_kind "course_review"';
  return null;
}

async function sendConfirmationEmail(email: string, token: string, locale: string): Promise<boolean> {
  const apiKey = Deno.env.get('RESEND_API_KEY');
  const from = Deno.env.get('RESEND_FROM_EMAIL');
  if (!apiKey || !from) return false;

  const siteUrl = Deno.env.get('SITE_URL') ?? 'https://www.a2ahs.com';
  // Trailing slash BEFORE the query string is load-bearing, not style: this site's
  // `trailingSlash: true` build makes `/app/confirm-feedback` (no slash) 301 to
  // `/app/confirm-feedback/` with the query string dropped entirely (verified directly
  // against a served build - `Location: /app/confirm-feedback/`, no `?token=...`).
  // Every other query-param link in this app (`loginUrlWithReturnTo`) has the same
  // shape but is only ever reached via in-app client-side navigation, which never hits
  // the server and so never triggers this redirect - this confirmation link is the
  // first one meant to be opened fresh, from an email, so it has to get this right.
  const confirmUrl = `${siteUrl}/app/confirm-feedback/?token=${token}&locale=${locale}`;

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: `B.Ed Textbook <${from}>`,
      to: [email],
      subject: 'Confirm your feedback on B.Ed Mega Textbook',
      text: `Thanks for leaving feedback on the B.Ed Mega Textbook.\n\n`
        + `Click this link to confirm it reached us and add it to the curriculum owner's queue:\n${confirmUrl}\n\n`
        + `If you didn't leave this feedback, you can ignore this email — nothing happens until the link above is clicked.`,
    }),
  });
  return res.ok;
}

Deno.serve(async (req: Request) => {
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'method not allowed' }), { status: 405 });
  }

  let body: Body;
  try {
    body = await req.json();
  } catch {
    return new Response(JSON.stringify({ error: 'invalid JSON body' }), { status: 400 });
  }

  // Honeypot tripped — report success, do nothing. Checked before real
  // validation so a bot gets no signal either way.
  if (body.website) {
    return new Response(JSON.stringify({ ok: true }), { status: 200, headers: { 'Content-Type': 'application/json' } });
  }

  const validationProblem = validationError(body);
  if (validationProblem) {
    return new Response(JSON.stringify({ error: validationProblem }), { status: 400 });
  }

  const service = serviceClient();
  const token = crypto.randomUUID();

  const { data: inserted, error: insertError } = await service
    .from('content_feedback')
    .insert({
      author_id: null,
      page_kind: body.pageKind,
      course_code: body.courseCode,
      unit_no: body.unitNo ?? null,
      topic_no: body.topicNo ?? null,
      locale: body.locale,
      section_anchor: body.sectionAnchor ?? null,
      scope: body.scope,
      quoted_passage: body.quotedPassage ?? null,
      passage_context: body.passageContext ?? null,
      comment: body.comment,
      guest_email: body.email,
      guest_confirmation_token: token,
    })
    .select('id')
    .single();
  if (insertError || !inserted) {
    return new Response(JSON.stringify({ error: 'could not record feedback' }), { status: 500 });
  }

  const sent = await sendConfirmationEmail(body.email!, token, body.locale!);
  if (!sent) {
    // All-or-nothing: a row nobody can ever confirm (the email that would
    // let them never arrived) is just silent data loss dressed up as
    // success. Better to fail the request and let the reader retry.
    await service.from('content_feedback').delete().eq('id', inserted.id);
    return new Response(JSON.stringify({ error: 'could not send confirmation email' }), { status: 502 });
  }

  return new Response(JSON.stringify({ ok: true }), { status: 200, headers: { 'Content-Type': 'application/json' } });
});
