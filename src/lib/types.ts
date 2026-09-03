/**
 * Class-domain types (Spec 003) mirroring data-model.md's columns.
 *
 * Kept separate from src/contexts/AuthContext.tsx's Profile/UserRole types
 * (Spec 002) - this feature only ever *references* a profile by id, it never
 * redefines identity/role shape.
 */

export type ClassStatus = 'active' | 'archived';
export type ArchivedReason = 'manual' | 'role_change' | null;
export type EnrollmentStatus = 'active' | 'removed';
export type AssignmentSourceKind = 'activity' | 'formative' | 'summative' | 'custom' | 'quiz';
export type SubmissionQuizItemKind = 'formative' | 'summative';

export type Class = {
  id: string;
  teacher_id: string;
  course_code: string;
  name: string;
  term_label: string;
  join_code: string | null;
  status: ClassStatus;
  archived_reason: ArchivedReason;
  archived_at: string | null;
  created_at: string;
};

export type Enrollment = {
  id: string;
  class_id: string;
  student_id: string;
  status: EnrollmentStatus;
  joined_at: string;
  removed_at: string | null;
};

export type Assignment = {
  id: string;
  class_id: string;
  source_kind: AssignmentSourceKind;
  course_code: string | null;
  unit_no: number | null;
  title: string;
  instructions: string | null;
  due_at: string;
  max_mark: number;
  allow_late: boolean;
  published: boolean;
  created_at: string;
  updated_at: string;
};

export type Submission = {
  id: string;
  assignment_id: string;
  student_id: string;
  text_content: string | null;
  file_path: string | null;
  file_name: string | null;
  file_mime: string | null;
  file_size_bytes: number | null;
  submitted_at: string;
  late: boolean;
};

export type Grade = {
  id: string;
  submission_id: string;
  mark: number;
  feedback: string | null;
  graded_by: string;
  graded_at: string;
  updated_at: string;
};

export type QuizItem = {
  id: string;
  course_code: string;
  unit_no: number;
  question_text: string;
  options: { key: string; text: string }[];
  correct_option?: string; // present only for verified-teacher/admin full-row reads
  created_by: string | null;
  created_at: string;
};

export type QuizAttempt = {
  id: string;
  assignment_id: string;
  student_id: string;
  answers: Record<string, string>;
  score: number;
  attempted_at: string;
};

export type AnswerKey = {
  id: string;
  course_code: string;
  unit_no: number;
  kind: SubmissionQuizItemKind;
  content: string;
  created_by: string | null;
  updated_at: string;
};

/** Computed per-assignment status for a student - never a stored column (FR-006). */
export type AssignmentStudentStatus =
  | 'not_yet_submitted'
  | 'submitted'
  | 'late'
  | 'graded'
  | 'missing'; // teacher queue view only

/**
 * Dashboard-domain types (Spec 004) mirroring data-model.md's
 * `unit_progress`/`student_achievements` columns.
 */

export type UnitProgressMethod = 'self_marked' | 'assignment' | 'quiz';

export type UnitProgress = {
  id: string;
  student_id: string;
  course_code: string;
  unit_no: number;
  method: UnitProgressMethod;
  occurred_at: string;
};

export type AchievementKey =
  | 'first_submission'
  | 'study_streak'
  | 'full_course_coverage'
  | 'on_time_class_completion';

export type StudentAchievement = {
  id: string;
  student_id: string;
  achievement_key: AchievementKey;
  earned_at: string;
  context: Record<string, unknown> | null;
};

/**
 * Teacher-dashboard-domain types (Spec 005) mirroring data-model.md's
 * `teaching_log_entries`/`activity_feedback`/`improvement_suggestions` columns.
 */

export type TeachingLogSourceKind = 'activity' | 'formative' | 'summative';

export type TeachingLogEntry = {
  id: string;
  teacher_id: string;
  class_id: string;
  course_code: string;
  unit_no: number;
  source_kind: TeachingLogSourceKind;
  occurred_on: string;
  duration_minutes: number;
  reflection: string;
  created_at: string;
};

export type ActivityFeedback = {
  id: string;
  teacher_id: string;
  course_code: string;
  unit_no: number;
  source_kind: TeachingLogSourceKind;
  rating: number;
  what_worked: string | null;
  what_didnt: string | null;
  actual_minutes: number;
  created_at: string;
  updated_at: string;
};

export type SuggestionCategory =
  | 'typo'
  | 'clarity'
  | 'factual'
  | 'pedagogy'
  | 'translation'
  | 'other';

export type SuggestionStatus =
  | 'submitted'
  | 'under_review'
  | 'accepted'
  | 'rejected'
  | 'published';

export type ImprovementSuggestion = {
  id: string;
  teacher_id: string;
  page_slug: string;
  section_anchor: string | null;
  locale: 'en' | 'ur';
  course_code: string;
  unit_no: number | null;
  category: SuggestionCategory;
  body: string;
  status: SuggestionStatus;
  admin_note: string | null;
  created_at: string;
  updated_at: string;
};
