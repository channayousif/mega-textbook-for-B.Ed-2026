import { getSupabase } from '@site/src/lib/supabase';
import type { Result } from '@site/src/lib/classes';
import type { AssignmentTemplate } from '@site/src/lib/types';

/**
 * Assignment templates - a teacher's reusable assignment configurations (Spec 011, US7 /
 * FR-016). RLS (migration 0041) scopes every row to the owning teacher.
 */

async function client() {
  const supabase = await getSupabase();
  if (!supabase) throw new Error('not_configured');
  return supabase;
}

export async function listOwnTemplates(): Promise<Result<AssignmentTemplate[]>> {
  const supabase = await client();
  const { data, error } = await supabase
    .from('assignment_templates')
    .select('*')
    .order('created_at', { ascending: false });
  return { data: (data as AssignmentTemplate[]) ?? null, error };
}

export type NewTemplate = {
  name: string;
  titlePattern: string;
  instructions: string;
  maxMark: number;
  allowLate: boolean;
};

export async function createTemplate(teacherId: string, t: NewTemplate): Promise<Result<AssignmentTemplate>> {
  const supabase = await client();
  const { data, error } = await supabase
    .from('assignment_templates')
    .insert({
      teacher_id: teacherId,
      name: t.name,
      title_pattern: t.titlePattern,
      instructions: t.instructions,
      max_mark: t.maxMark,
      allow_late: t.allowLate,
    })
    .select()
    .single();
  return { data: (data as AssignmentTemplate) ?? null, error };
}

export async function deleteTemplate(id: string): Promise<Result<null>> {
  const supabase = await client();
  const { error } = await supabase.from('assignment_templates').delete().eq('id', id);
  return { data: null, error };
}
