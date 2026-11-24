import { expect, type Page } from '@playwright/test';
import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import { deleteUsers } from './_cleanup';
import { TEST_PASSWORD } from './_password';

/**
 * Shared fixtures for the Spec 011 dashboard specs (T012, T016, T021, T025, T030, T034):
 * service-role users with a known role, sign-in through the real form, and one teardown
 * that removes classes first (classes.teacher_id blocks the profile delete) and then users.
 *
 * The site sets trailingSlash: true. A typed URL with a query must keep the slash
 * (`/app/classes/roster/?classId=`): the static server's slash redirect drops the query string.
 */
export const SUPABASE_URL = process.env.DOCUSAURUS_SUPABASE_URL;
export const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
export const configured = Boolean(SUPABASE_URL && process.env.DOCUSAURUS_SUPABASE_ANON_KEY && SERVICE_KEY);
export const SKIP_REASON = 'requires DOCUSAURUS_SUPABASE_URL, DOCUSAURUS_SUPABASE_ANON_KEY, SUPABASE_SERVICE_ROLE_KEY';

export type FixtureUser = { authId: string; profileId: string; email: string };

export class Fixtures {
  readonly svc: SupabaseClient;
  readonly tag = `${Date.now()}${Math.floor(Math.random() * 1000)}`;
  private users: string[] = [];
  private classes: string[] = [];

  constructor() {
    this.svc = createClient(SUPABASE_URL!, SERVICE_KEY!, { auth: { persistSession: false } });
  }

  async user(label: string, role: 'student' | 'teacher', opts: { verified?: boolean } = {}): Promise<FixtureUser> {
    const email = `e2e-dash011-${label}-${this.tag}@example.test`;
    const { data, error } = await this.svc.auth.admin.createUser({
      email, password: TEST_PASSWORD, email_confirm: true, user_metadata: { role },
    });
    if (error || !data.user) throw new Error(`createUser ${label}: ${error?.message}`);
    this.users.push(data.user.id);
    const { data: profile, error: pErr } = await this.svc.from('profiles').select('id').eq('auth_user_id', data.user.id).single();
    if (pErr || !profile) throw new Error(`profile ${label}: ${pErr?.message}`);
    if (opts.verified) {
      const { error: vErr } = await this.svc.from('profiles').update({ verified_teacher: true }).eq('id', profile.id);
      if (vErr) throw new Error(`verify ${label}: ${vErr.message}`);
    }
    return { authId: data.user.id, profileId: profile.id, email };
  }

  /** A class owned by `teacher`, optionally with enrolled students. */
  async klass(teacher: FixtureUser, name: string, students: FixtureUser[] = [], courseCode = 'EFMP-301'): Promise<{ id: string; joinCode: string }> {
    const joinCode = `${this.tag.slice(-5)}${this.classes.length}`.slice(-6).toUpperCase();
    const { data, error } = await this.svc.from('classes').insert({
      teacher_id: teacher.profileId, course_code: courseCode, name, term_label: 'Fall 2026', join_code: joinCode,
    }).select('id, join_code').single();
    if (error || !data) throw new Error(`class ${name}: ${error?.message}`);
    this.track('class', data.id);
    for (const s of students) await this.svc.from('enrollments').insert({ class_id: data.id, student_id: s.profileId });
    return { id: data.id, joinCode: data.join_code };
  }

  /** Classes created through the UI are registered here so teardown removes them too. */
  track(_kind: 'class', id: string): void {
    this.classes.push(id);
  }

  async teardown(): Promise<void> {
    if (this.classes.length) await this.svc.from('classes').delete().in('id', this.classes);
    await deleteUsers(this.svc, ...this.users);
  }
}

export async function signIn(page: Page, email: string): Promise<void> {
  await page.goto('/app/login');
  await page.getByLabel(/email/i).fill(email);
  await page.getByLabel(/password/i).fill(TEST_PASSWORD);
  await page.getByRole('button', { name: /^sign in$/i }).click();
  await expect(page).not.toHaveURL(/\/app\/login/);
}
