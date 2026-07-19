import { describe, it, expect } from 'vitest';
import { classifyAuthError, authErrorMessage } from '../../src/lib/authErrors.ts';

// T033 [US2] — expired/used reset link and rate-limit codes map to friendly
// bilingual messages, never raw provider text (FR-014).
describe('reset-flow error classification', () => {
  it('maps an expired reset link (otp_expired) to reset_link_invalid', () => {
    expect(classifyAuthError({ code: 'otp_expired', message: 'Token has expired' }))
      .toBe('reset_link_invalid');
  });

  it('maps an already-used reset link to reset_link_invalid', () => {
    expect(classifyAuthError({ message: 'Token has expired or is invalid' }))
      .toBe('reset_link_invalid');
  });

  it('maps a reset-request rate limit (429) to rate_limited', () => {
    expect(classifyAuthError({ status: 429, message: 'Email rate limit exceeded' }))
      .toBe('rate_limited');
  });

  it('maps the over_request_rate_limit code to rate_limited even without a 429 status', () => {
    expect(classifyAuthError({ code: 'over_request_rate_limit', message: 'too many requests' }))
      .toBe('rate_limited');
  });

  it('never surfaces raw provider text — every mapped key resolves to a bilingual message', () => {
    for (const key of ['reset_link_invalid', 'rate_limited']) {
      const error = { code: key === 'reset_link_invalid' ? 'otp_expired' : 'over_request_rate_limit' };
      const en = authErrorMessage(error, 'en');
      const ur = authErrorMessage(error, 'ur');
      expect(en).not.toMatch(/token|rate limit exceeded/i);
      expect(ur.length).toBeGreaterThan(0);
      expect(en).not.toBe(ur);
    }
  });
});
