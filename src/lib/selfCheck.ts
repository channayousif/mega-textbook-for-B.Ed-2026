/**
 * Feature 032 phase C: the unit self-check. Questions come without the key from
 * self_check_questions(); marking happens on the server in check_self_quiz() (migration 0055),
 * which returns the score and the numbers of wrong items, never the right option.
 */
import { getSupabase } from '@site/src/lib/supabase';

export type SelfCheckQuestion = { item_no: number; question_text: string; options: Record<string, string>; bloom: string | null };
export type SelfCheckResult = { score: number; total: number; wrong: number[]; attempts_left: number };

export async function fetchSelfCheck(course: string, unit: number, locale: 'en' | 'ur'): Promise<SelfCheckQuestion[]> {
  const supabase = await getSupabase();
  if (!supabase) return [];
  const { data, error } = await supabase.rpc('self_check_questions', { p_course: course, p_unit: unit, p_locale: locale });
  if (error || !Array.isArray(data)) return [];
  return data as SelfCheckQuestion[];
}

export async function submitSelfCheck(course: string, unit: number, locale: 'en' | 'ur', answers: Record<number, string>):
  Promise<{ ok: true; result: SelfCheckResult } | { ok: false; error: string }> {
  const supabase = await getSupabase();
  if (!supabase) return { ok: false, error: 'offline' };
  const { data, error } = await supabase.rpc('check_self_quiz', { p_course: course, p_unit: unit, p_locale: locale, p_answers: answers });
  if (error) return { ok: false, error: error.message };
  return { ok: true, result: data as SelfCheckResult };
}
