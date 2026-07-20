import { getSupabase } from '@site/src/lib/supabase';
import type { Result } from '@site/src/lib/classes';
import type { Assignment, AssignmentStudentStatus, Submission } from '@site/src/lib/types';

/**
 * Submission submit/resubmit + computed status (Spec 003, T033).
 *
 * COSMETIC CONVENIENCE ONLY (Constitution Art. IX.2) — real authorization is
 * RLS + `compute_submission_late()`/`guard_submission_updates()`
 * (supabase/migrations/0018) and the Storage bucket policies (0019).
 */

async function client() {
  const supabase = await getSupabase();
  if (!supabase) throw new Error('not_configured');
  return supabase;
}

const ALLOWED_MIME_TYPES = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'image/png',
  'image/jpeg',
];
const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024; // 10 MB, FR-009

export type FileValidationError = 'too_large' | 'unsupported_type';

/** Client-side pre-check (FR-009) — the Storage bucket config is the real enforcement. */
export function validateFile(file: File): FileValidationError | null {
  if (file.size > MAX_FILE_SIZE_BYTES) return 'too_large';
  if (!ALLOWED_MIME_TYPES.includes(file.type)) return 'unsupported_type';
  return null;
}

export type SubmitInput = {
  assignmentId: string;
  studentId: string;
  textContent: string | null;
  file: File | null;
};

/**
 * FR-007 — submit or resubmit (before the due date). One `upsert` on
 * `(assignment_id, student_id)` covers both: the INSERT branch for a first
 * submission, the UPDATE branch (via `ON CONFLICT`) for a resubmission —
 * each governed by its own RLS policy (0018). A new file always gets a
 * fresh Storage path (data-model.md — no Storage UPDATE policy needed);
 * omitting `file` on a resubmission leaves the previously uploaded file
 * untouched.
 */
export async function submitOrResubmit(input: SubmitInput): Promise<Result<Submission>> {
  const supabase = await client();

  let filePayload: Partial<Submission> = {};
  if (input.file) {
    const fileError = validateFile(input.file);
    if (fileError) return { data: null, error: new Error(fileError) };

    const safeName = input.file.name.replace(/[^\w.-]+/g, '_');
    const filePath = `${input.assignmentId}/${input.studentId}/${Date.now()}-${safeName}`;
    const { error: uploadError } = await supabase.storage.from('submissions').upload(filePath, input.file, {
      contentType: input.file.type,
    });
    if (uploadError) return { data: null, error: uploadError };

    filePayload = {
      file_path: filePath,
      file_name: input.file.name,
      file_mime: input.file.type || null,
      file_size_bytes: input.file.size,
    };
  }

  const { data, error } = await supabase
    .from('submissions')
    .upsert(
      {
        assignment_id: input.assignmentId,
        student_id: input.studentId,
        text_content: input.textContent,
        ...filePayload,
      },
      { onConflict: 'assignment_id,student_id' },
    )
    .select()
    .single();

  return { data: (data as Submission) ?? null, error };
}

export async function fetchOwnSubmission(assignmentId: string, studentId: string): Promise<Result<Submission>> {
  const supabase = await client();
  const { data, error } = await supabase
    .from('submissions')
    .select('*')
    .eq('assignment_id', assignmentId)
    .eq('student_id', studentId)
    .maybeSingle();
  return { data: (data as Submission) ?? null, error };
}

/** A short-lived signed URL for a submission's uploaded file (own file, or the owning teacher's). */
export async function getSubmissionFileUrl(filePath: string): Promise<Result<string>> {
  const supabase = await client();
  const { data, error } = await supabase.storage.from('submissions').createSignedUrl(filePath, 600);
  if (error) return { data: null, error };
  return { data: data.signedUrl, error: null };
}

/** FR-006 — computed per-assignment status for a student; never a stored column. */
export function computeStudentStatus(params: {
  dueAtIso: string;
  submission: Submission | null;
  graded: boolean;
}): AssignmentStudentStatus {
  if (params.graded) return 'graded';
  if (!params.submission) {
    return Date.now() > new Date(params.dueAtIso).getTime() ? 'missing' : 'not_yet_submitted';
  }
  return params.submission.late ? 'late' : 'submitted';
}

/** Is a submission still editable (before the assignment's due date)? */
export function isSubmissionEditable(assignment: Pick<Assignment, 'due_at'>): boolean {
  return Date.now() <= new Date(assignment.due_at).getTime();
}

/** FR-006, FR-016 — bilingual label for a computed status, shared by assignments.tsx and queue.tsx. */
const STATUS_LABELS: Record<AssignmentStudentStatus, { en: string; ur: string }> = {
  not_yet_submitted: { en: 'not yet submitted', ur: 'ابھی جمع نہیں کروایا' },
  submitted: { en: 'submitted', ur: 'جمع کروا دیا گیا' },
  late: { en: 'late', ur: 'تاخیر سے' },
  graded: { en: 'graded', ur: 'نمبر دے دیے گئے' },
  missing: { en: 'missing', ur: 'جمع نہیں کروایا گیا' },
};

export function statusLabel(status: AssignmentStudentStatus, locale: 'en' | 'ur'): string {
  return STATUS_LABELS[status][locale];
}
