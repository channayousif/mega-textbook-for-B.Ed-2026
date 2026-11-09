// Feature 028: signed unsubscribe tokens for the weekly digest.
//
// A token is `<profile_id>.<base64url HMAC-SHA256(secret, "digest-unsub:" + profile_id)>`.
// It names one profile and cannot be forged without DIGEST_TOKEN_SECRET, so the
// unsubscribe endpoint needs no sign-in. WebCrypto only, so the same module runs in
// the Deno edge runtime and in Node for the unit tests.

const enc = new TextEncoder();

function b64url(bytes: ArrayBuffer): string {
  let s = '';
  for (const b of new Uint8Array(bytes)) s += String.fromCharCode(b);
  return btoa(s).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

async function mac(secret: string, profileId: string): Promise<string> {
  const key = await crypto.subtle.importKey('raw', enc.encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
  return b64url(await crypto.subtle.sign('HMAC', key, enc.encode(`digest-unsub:${profileId}`)));
}

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export async function signUnsubscribe(secret: string, profileId: string): Promise<string> {
  if (!secret) throw new Error('DIGEST_TOKEN_SECRET is not set');
  return `${profileId}.${await mac(secret, profileId)}`;
}

/** The profile id when the token is genuine, otherwise null. Constant-time compare. */
export async function verifyUnsubscribe(secret: string, token: string): Promise<string | null> {
  if (!secret || typeof token !== 'string') return null;
  const dot = token.indexOf('.');
  if (dot < 0) return null;
  const profileId = token.slice(0, dot);
  const given = token.slice(dot + 1);
  if (!UUID.test(profileId)) return null;
  const expected = await mac(secret, profileId);
  if (given.length !== expected.length) return null;
  let diff = 0;
  for (let i = 0; i < expected.length; i++) diff |= given.charCodeAt(i) ^ expected.charCodeAt(i);
  return diff === 0 ? profileId : null;
}
