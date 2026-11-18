import { randomBytes } from 'node:crypto';

// Fresh per run for the same reason as tests/e2e/_password.ts: a constant in a
// public repo made every leaked fixture on the live project an open account.
export const TEST_PASSWORD = `Tp-${randomBytes(12).toString('base64url')}9!`;
