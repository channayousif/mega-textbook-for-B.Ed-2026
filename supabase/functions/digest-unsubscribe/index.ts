// digest-unsubscribe - Feature 028. Turns off the weekly digest for one profile.
//
// POST only, so link scanners that prefetch URLs in an email never unsubscribe anyone:
//   - RFC 8058 one-click: mail clients POST to the List-Unsubscribe URL with the token
//     in the query string and body `List-Unsubscribe=One-Click`.
//   - The site's /app/unsubscribe/ page POSTs JSON `{ token }` after the reader confirms.
// The token is HMAC-signed for one profile id (_shared/digestToken.ts); no sign-in needed.

import { serviceClient } from '../_shared/adminAuth.ts';
import { verifyUnsubscribe } from '../_shared/digestToken.ts';

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json' } });

Deno.serve(async (req: Request) => {
  if (req.method !== 'POST') return json({ error: 'method not allowed' }, 405);
  let token = new URL(req.url).searchParams.get('token') ?? '';
  if (!token && (req.headers.get('content-type') ?? '').includes('application/json')) {
    try {
      token = String((await req.json() as { token?: unknown }).token ?? '');
    } catch {
      return json({ error: 'invalid JSON body' }, 400);
    }
  }
  const profileId = await verifyUnsubscribe(Deno.env.get('DIGEST_TOKEN_SECRET') ?? '', token);
  if (!profileId) return json({ error: 'invalid or expired link' }, 400);

  const { error } = await serviceClient().from('profiles')
    .update({ digest_opt_out: true, digest_opt_out_at: new Date().toISOString() })
    .eq('id', profileId).eq('digest_opt_out', false);
  if (error) return json({ error: 'could not update your preference' }, 500);
  return json({ unsubscribed: true });
});
