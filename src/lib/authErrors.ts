/**
 * Provider error → friendly bilingual message (Spec 002, FR-014, research.md R7).
 *
 * Supabase/GoTrue errors arrive in English only and are often technical
 * ("Invalid login credentials", "Email not confirmed", raw rate-limit text).
 * FR-014 requires simple English *and* Urdu, so raw pass-through cannot satisfy
 * the requirement - every user-visible auth error goes through this map.
 *
 * ⚠️ ALL keys are stubbed here up front (T017) so that T035 (reset flows) and
 * T058 (suspension) only supply translations and never restructure this module.
 * Three tasks across three phases touch this file; keeping the shape stable is
 * what prevents a merge conflict.
 *
 * Urdu register: academic-plain (درسی مگر عام فہم), matching Constitution
 * Art. III.2 - not literary, not machine-literal.
 */

export type AuthMessageKey =
  | 'email_not_confirmed'
  | 'invalid_credentials'
  | 'user_already_exists'
  | 'weak_password'
  | 'reset_link_invalid'
  | 'rate_limited'
  | 'account_suspended'
  | 'oauth_failed'
  | 'network_error'
  | 'unknown';

export type BilingualMessage = {
  /** Simple English, readable by a fresh HSC/intermediate graduate. */
  en: string;
  /** Academic-plain Urdu. */
  ur: string;
};

export const AUTH_MESSAGES: Record<AuthMessageKey, BilingualMessage> = {
  email_not_confirmed: {
    en: 'Please confirm your email first. We sent you a link - open it, then sign in.',
    ur: 'پہلے اپنا ای میل تصدیق کریں۔ ہم نے آپ کو ایک لنک بھیجا ہے - اسے کھولیں، پھر سائن اِن کریں۔',
  },
  invalid_credentials: {
    en: 'That email or password is not correct. Please try again.',
    ur: 'یہ ای میل یا پاس ورڈ درست نہیں ہے۔ براہِ کرم دوبارہ کوشش کریں۔',
  },
  user_already_exists: {
    en: 'An account already uses this email. Please sign in, or reset your password.',
    ur: 'اس ای میل سے پہلے ہی ایک اکاؤنٹ موجود ہے۔ براہِ کرم سائن اِن کریں یا پاس ورڈ دوبارہ مقرر کریں۔',
  },
  weak_password: {
    en: 'Please choose a longer password - at least 8 characters.',
    ur: 'براہِ کرم لمبا پاس ورڈ منتخب کریں - کم از کم 8 حروف۔',
  },
  reset_link_invalid: {
    en: 'This reset link has expired or was already used. Please request a new one.',
    ur: 'یہ لنک ختم ہو چکا ہے یا پہلے استعمال ہو چکا ہے۔ براہِ کرم نیا لنک منگوائیں۔',
  },
  rate_limited: {
    en: 'Too many attempts. Please wait a few minutes and try again.',
    ur: 'بہت زیادہ کوششیں۔ براہِ کرم چند منٹ انتظار کریں اور دوبارہ کوشش کریں۔',
  },
  account_suspended: {
    en: 'This account is suspended. Please contact your administrator.',
    ur: 'یہ اکاؤنٹ معطل ہے۔ براہِ کرم اپنے منتظم سے رابطہ کریں۔',
  },
  oauth_failed: {
    en: 'Google sign-in did not finish. Please try again.',
    ur: 'گوگل سائن اِن مکمل نہیں ہوا۔ براہِ کرم دوبارہ کوشش کریں۔',
  },
  network_error: {
    en: 'We could not reach the server. Please check your connection and try again.',
    ur: 'ہم سرور تک نہیں پہنچ سکے۔ براہِ کرم اپنا کنکشن دیکھیں اور دوبارہ کوشش کریں۔',
  },
  unknown: {
    en: 'Something went wrong. Please try again.',
    ur: 'کچھ غلط ہو گیا۔ براہِ کرم دوبارہ کوشش کریں۔',
  },
};

/**
 * Classify a provider error into a message key.
 *
 * Matches on GoTrue's stable `error_code`/`code` first, falling back to message
 * text. Text matching is a fallback because provider wording changes between
 * releases; codes do not.
 */
export function classifyAuthError(error: unknown): AuthMessageKey {
  if (!error) return 'unknown';

  const err = error as { code?: string; status?: number; message?: string; name?: string };
  const code = (err.code ?? '').toLowerCase();
  const message = (err.message ?? '').toLowerCase();

  if (err.name === 'TypeError' && message.includes('fetch')) return 'network_error';
  if (err.status === 429 || code === 'over_request_rate_limit' || message.includes('rate limit')) {
    return 'rate_limited';
  }

  if (code === 'email_not_confirmed' || message.includes('email not confirmed')) {
    return 'email_not_confirmed';
  }
  if (code === 'invalid_credentials' || message.includes('invalid login credentials')) {
    return 'invalid_credentials';
  }
  if (code === 'user_already_exists' || message.includes('already registered')) {
    return 'user_already_exists';
  }
  if (code === 'weak_password' || message.includes('password should be')) return 'weak_password';
  if (
    code === 'otp_expired' ||
    message.includes('token has expired') ||
    message.includes('invalid or has expired')
  ) {
    return 'reset_link_invalid';
  }
  // FR-020 - surfaced by the sign-in path when a suspended account authenticates.
  if (code === 'user_banned' || message.includes('suspended')) return 'account_suspended';
  if (message.includes('oauth') || message.includes('provider')) return 'oauth_failed';

  return 'unknown';
}

/** Resolve a provider error to display text in the active locale. */
export function authErrorMessage(error: unknown, locale: string): string {
  const key = classifyAuthError(error);
  const entry = AUTH_MESSAGES[key];
  return locale === 'ur' ? entry.ur : entry.en;
}
