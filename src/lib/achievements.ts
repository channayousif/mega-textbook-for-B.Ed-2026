import { getSupabase } from '@site/src/lib/supabase';
import type { Result } from '@site/src/lib/classes';
import type { AchievementKey, StudentAchievement } from '@site/src/lib/types';

/**
 * Achievement catalog + earned-achievement reads (Spec 004, T038).
 *
 * The fixed, four-entry catalog is static code, not a Postgres table
 * (research.md R4) - it never changes without a deploy, matching this repo's
 * established convention for platform-wide bilingual UI copy (the same
 * `{ en, ur }`-keyed pattern used throughout `src/pages/app/`). Only *earned*
 * achievements (`student_achievements`) are persisted.
 */

export type AchievementDefinition = {
  key: AchievementKey;
  title: { en: string; ur: string };
  description: { en: string; ur: string };
  howToReach: { en: string; ur: string };
};

export const ACHIEVEMENT_CATALOG: Record<AchievementKey, AchievementDefinition> = {
  first_submission: {
    key: 'first_submission',
    title: { en: 'First Submission', ur: 'پہلی جمع کرائی' },
    description: {
      en: 'Awarded the first time you submit any assignment.',
      ur: 'کسی بھی اسائنمنٹ کو پہلی بار جمع کرانے پر دیا جاتا ہے۔',
    },
    howToReach: { en: 'Submit any assignment in any of your classes.', ur: 'اپنی کسی بھی کلاس میں کوئی اسائنمنٹ جمع کرائیں۔' },
  },
  study_streak: {
    key: 'study_streak',
    title: { en: 'Study Streak', ur: 'مطالعے کا تسلسل' },
    description: {
      en: 'Awarded for marking at least one unit studied on 3 consecutive days.',
      ur: 'لگاتار 3 دن کم از کم ایک یونٹ کو پڑھا ہوا نشان زد کرنے پر دیا جاتا ہے۔',
    },
    howToReach: {
      en: 'Mark a unit studied from the Progress area or a unit page on 3 days in a row.',
      ur: 'پیش رفت کے صفحے یا کسی یونٹ کے صفحے سے لگاتار 3 دن کسی یونٹ کو پڑھا ہوا نشان زد کریں۔',
    },
  },
  full_course_coverage: {
    key: 'full_course_coverage',
    title: { en: '100% Course Coverage', ur: '100% کورس کوریج' },
    description: {
      en: 'Awarded the first time you reach 100% unit coverage in any course.',
      ur: 'کسی بھی کورس میں پہلی بار 100% یونٹ کوریج تک پہنچنے پر دیا جاتا ہے۔',
    },
    howToReach: { en: 'Cover every unit of one course - through grades, quizzes, or self-marking.', ur: 'گریڈز، کوئز یا خود نشان زد کرنے کے ذریعے کسی ایک کورس کے تمام یونٹس مکمل کریں۔' },
  },
  on_time_class_completion: {
    key: 'on_time_class_completion',
    title: { en: 'On-Time Finisher', ur: 'وقت پر مکمل کرنے والا' },
    description: {
      en: 'Awarded the first time you complete every assignment in a class on time.',
      ur: 'کسی کلاس کی تمام اسائنمنٹس وقت پر مکمل کرنے پر پہلی بار دیا جاتا ہے۔',
    },
    howToReach: { en: 'Submit every published assignment in one class before its due date.', ur: 'کسی ایک کلاس کی تمام شائع شدہ اسائنمنٹس ان کی آخری تاریخ سے پہلے جمع کرائیں۔' },
  },
};

async function client() {
  const supabase = await getSupabase();
  if (!supabase) throw new Error('not_configured');
  return supabase;
}

/** FR-009 - the signed-in student's own earned achievements. */
export async function fetchEarnedAchievements(): Promise<Result<StudentAchievement[]>> {
  const supabase = await client();
  const { data, error } = await supabase
    .from('student_achievements')
    .select('*')
    .order('earned_at', { ascending: false });
  return { data: (data as StudentAchievement[]) ?? null, error };
}

/**
 * FR-008 - checks (and grants if newly earned) the "100% course coverage"
 * achievement. The server recomputes the numerator authoritatively; only
 * `totalUnits` (Git-derived, unavailable to Postgres) crosses the boundary -
 * a deliberate, narrowly-scoped exception (research.md R2). Returns whether
 * the achievement is newly or already granted.
 */
export async function checkFullCoverageAchievement(courseCode: string, totalUnits: number): Promise<Result<boolean>> {
  const supabase = await client();
  const { data, error } = await supabase.rpc('check_full_coverage_achievement', {
    p_course_code: courseCode,
    p_total_units: totalUnits,
  });
  return { data: (data as boolean) ?? false, error };
}
