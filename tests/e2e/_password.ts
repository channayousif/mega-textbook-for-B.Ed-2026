import { randomBytes } from 'node:crypto';

/**
 * Password for e2e fixture users, fresh per worker process.
 *
 * It used to be a constant committed to this public repository, and the specs
 * run against the live project, so every leaked fixture (68 of them admins on
 * 2026-11-08) was an account anyone could sign in to. A random value means a
 * stranded fixture is unusable even before the sweep removes it. Each spec
 * creates and signs in its users inside one worker, so nothing needs to share
 * it across processes. Upper, lower, digit and symbol satisfy any policy.
 */
export const TEST_PASSWORD = `Tp-${randomBytes(12).toString('base64url')}9!`;
