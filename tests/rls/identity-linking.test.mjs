/**
 * T023 [US1] — Google sign-in on an email with an existing password account
 * resolves to the same `profiles.id` (FR-003a, contracts/auth-operations.md
 * §D item 2).
 *
 * ⚠️ FINDING (2026-07-18, found while writing this test, not while implementing
 * it): this cannot be exercised through the admin API, and — more importantly —
 * it may not need application code at all. Supabase's GoTrue performs automatic
 * identity linking at the `auth.identities` level for verified emails in the
 * same linking domain (see supabase/auth `DetermineAccountLinking`): a Google
 * sign-in on an email that already has a confirmed password account attaches a
 * new *identity* to the *existing* `auth.users.id`. No new `auth.users` row is
 * inserted, so `handle_new_user()`'s AFTER INSERT trigger never fires for this
 * case — its email-matching re-link branch (0007_handle_new_user.sql) is
 * unreachable for the scenario FR-003a describes. `profiles.auth_user_id` was
 * never repointed because it never changed.
 *
 * That branch is not wrong, just apparently dead for the primary case — it
 * would only fire if GoTrue itself decided to create a second `auth.users` row
 * for a matching email (e.g. an unverified provider email, or manual-linking
 * mode), and `admin.createUser` cannot simulate that: it enforces email
 * uniqueness up front, so a second call with the same email errors before any
 * trigger runs. Real verification needs a live OAuth round-trip, which is what
 * T063 (quickstart.md §1.4) already does on a real device. Recording this here
 * rather than faking a synthetic pass. See data-model.md's 2026-07-18 note.
 */
import { describe, test } from 'vitest';
import { rlsConfigured } from './_helpers.mjs';

describe.skipIf(!rlsConfigured)('identity linking (Google after password)', () => {
  test.skip(
    'requires a live Google OAuth round-trip — verified manually via T063, not by this suite',
    () => {},
  );
});
