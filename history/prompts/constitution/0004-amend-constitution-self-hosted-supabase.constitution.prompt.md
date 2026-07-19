---
id: 0004
title: Amend constitution for self-hosted Supabase
stage: constitution
date: 2026-07-18
surface: agent
model: claude-sonnet-5
feature: 002-authentication
branch: 002-authentication
user: channayousif@gmail.com
command: /sp.adr
labels: ["constitution", "adr", "supabase", "self-hosted", "infrastructure"]
links:
  spec: specs/002-authentication/spec.md
  ticket: null
  adr: history/adr/0006-self-hosted-supabase-backend.md
  pr: null
files:
 - .specify/memory/constitution.md
 - history/adr/0006-self-hosted-supabase-backend.md
tests:
 - "N/A — governance/documentation change, no code"
---

## Prompt

constitution amendment + ADR for self-hosted Supabase now,

(This answers a question asked three times across the implementation session: whether to write
up the earlier `#decision: we will go with selfhosted backend. we will need it in future also.
we must have strong foundations` — confirmed via AskUserQuestion selecting "Self-hosted Supabase
(Recommended)" — as governance now, or after Docker/the stack is actually running. The user chose
now.)

## Response snapshot

Bumped the constitution 2.1.0 → **2.2.0** (MINOR — an operational/hosting commitment is
redefined, no user-facing authorization or content principle changes, no approved spec content
is invalidated). Amended:

- **Article V.1**: "a managed backend (**Supabase**: ...)" → "a **self-hosted Supabase** stack
  ... running on infrastructure the project controls, not a third-party managed tier."
- **Article V.6**: renamed "Free-tier friendly" → "**Cost-controlled infrastructure**";
  replaced the free/low-cost-tier mandate (Vercel/Netlify/GitHub Pages + Supabase free tier)
  with "runs on infrastructure the project already owns or controls... a future move to a
  metered vendor tier requires a new ADR."

Wrote **ADR-0006** (self-hosted Supabase on the existing a2ahs.com VPS), grounding it in evidence
gathered this session rather than assertion: `ss -tln` confirmed ports `80`/`443`/`8080`/`8443`
already bound (apache2), `8000` free — so Kong's default HTTPS port collides and must be remapped,
written into the ADR as a concrete requirement, not a caveat. `free -h`/`df -h` confirmed ~12 GiB
RAM and 13 GB disk free after this session's earlier Hestia service trim (mariadb/vsftpd/php-fpm
disabled). Wrote the transactional-mail-relay requirement (Resend/SES, not local exim4) into the
ADR as **binding**, honoring the commitment made when it was first raised as a recommendation —
exim4 is confirmed live (MX → mail.a2ahs.com) but VPS-IP deliverability to Gmail is fragile, and a
silently-undelivered verification email is a broken FR-002 signup, not a mail-admin footnote.
Considered and rejected three alternatives (Supabase Cloud free/paid, hand-rolled Postgres+Express,
Firebase) with concrete reasons tied to what Spec 002 already built.

**Flagged, not fixed**: four downstream artifacts now contradict this decision —
`specs/002-authentication/plan.md` (Vercel + Mumbai region in Technical Context and the
Constitution Check table), `quickstart.md` §1 (hosted-dashboard walkthrough), and
`SDD/ROADMAP.md` ("Supabase (managed backend)", "is Vercel acceptable"). Also noted, independent
of this decision: plan.md's Vercel line was already wrong before today — the site has run
self-hosted (nginx → apache2 on this same VPS) since its original deploy. Listed as explicit
follow-up TODOs in the constitution's sync-impact report rather than silently rewritten, since
the user asked specifically for "constitution amendment + ADR... now" — not a full doc pass.

## Outcome

- ✅ Impact: Constitution and ADR now match the actual, already-in-motion infrastructure decision. Nothing in Spec 002's code changes — this is a hosting-location decision, not an architecture one.
- 🧪 Tests: N/A (governance documents). Evidence for the ADR's port/capacity claims was gathered live (`ss -tln`, `free -h`, `df -h`, CLI-absence checks), not carried over from memory.
- 📁 Files: 2 files (1 amended, 1 new).
- 🔁 Next prompts: install Docker (still absent — confirmed again this session) and stand up the Compose stack per ADR-0006; then correct the four flagged downstream artifacts (plan.md, quickstart.md, ROADMAP.md) to stop describing a hosted-cloud setup that was never built; then re-run T021–T025/T063 against the real instance.
- 🧠 Reflection: this is the second time in this session a claim got corrected by checking the actual host rather than trusting an earlier characterization — the previous PHR's RAM estimate (7.6→10.4 GB) turned out low against the real `free -h` (12 GiB available), and the Kong-port collision risk went from a hedge ("map deliberately") to a confirmed fact once `ss -tln` was actually run. Recommendations grounded in live commands hold up better than recommendations reasoned from memory of a prior finding.

## Evaluation notes (flywheel)

- Failure modes observed: none in this step — the risk was scope creep (rewriting plan.md/quickstart.md/ROADMAP.md when only "constitution + ADR" was asked for); resisted by flagging them as sync-impact-report TODOs instead, matching this repo's own established convention from the v2.0.0/v2.1.0 reports.
- Graders run and results (PASS/FAIL): N/A — no executable artifact produced this step.
- Prompt variant (if applicable): n/a
- Next experiment (smallest change to try): when a decision has been sitting unconfirmed for multiple turns (asked 3× here), stop re-asking after the second no-response and instead present the two options as a single low-cost default action with an explicit opt-out, rather than blocking further work on an answer that isn't coming.
