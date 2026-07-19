---
id: 0015
title: Wire nginx api subdomain to Kong
stage: green
date: 2026-07-18
surface: agent
model: claude-sonnet-5
feature: 002-authentication
branch: 002-authentication
user: channayousif@gmail.com
command: null
labels: ["nginx", "cloudflare", "kong", "tls", "networking", "infrastructure"]
links:
  spec: specs/002-authentication/spec.md
  ticket: null
  adr: history/adr/0006-self-hosted-supabase-backend.md
  pr: null
files:
 - history/adr/0006-self-hosted-supabase-backend.md
 - specs/002-authentication/tasks.md
 - .env.local (gitignored — not committed; DOCUSAURUS_SUPABASE_URL now the public URL)
 - "/etc/nginx/conf.d/api.a2ahs.com.conf (outside repo — standalone, deliberately not Hestia-managed)"
 - "/home/a2ahs/supabase-project/api.a2ahs.com.nginx.conf (source copy, outside repo)"
tests:
 - "PASS: curl -I https://api.a2ahs.com/auth/v1/health with anon key -> 200, GoTrue health JSON"
 - "PASS: npm run test:rls (13/13, 1 skip) re-run through the public path, not loopback"
 - "PASS: npm run build (en+ur) with the public URL baked into customFields; grep-confirmed present in the built bundle"
---

## Prompt

wire nginx to proxy api.a2ahs.com to Kong

(followed by, mid-task, an unprompted question:) why supabase is outside of my project directory
[— answered in the previous turn, already logged in PHR 0014]

(then, after the DNS/Cloudflare clarifying questions:) "Cloudflare, proxied (orange cloud)" /
"I'll check and add the api record myself" [selected via AskUserQuestion]

done that, it works
[— turned out to be premature; see below]

ran it, here's the output curl -I https://api.a2ahs.com/auth/v1/health
HTTP/2 401 [full header dump, see conversation]

## Response snapshot

Investigated the actual network topology before writing any config, rather than assuming a plain
nginx→backend setup: found `a2ahs.com` resolves to a Cloudflare IP (proxied) and the VPS's own
interface (`10.0.0.150`) is a private address, and that `api.a2ahs.com` had no DNS record at all.
Asked the user to clarify the Cloudflare relationship (proxied vs DNS-only) rather than guessing,
since a wrong TLS-mode assumption could have broken the already-working main site, not just the
new subdomain.

Decided against routing `api.a2ahs.com` through Hestia's domain-management system: its templated
`nginx.conf` carries an explicit "DO NOT MODIFY — changes lost on rebuild" header and is built
for Apache/PHP-backed hosting, not an arbitrary reverse proxy to Kong. Wrote a standalone
`/etc/nginx/conf.d/api.a2ahs.com.conf` instead — outside Hestia's regeneration path entirely —
and recommended a Cloudflare Origin Certificate over Let's Encrypt, since the zone is proxied and
an Origin Cert avoids fighting Cloudflare's edge for HTTP-01 validation. Confirmed via
`grep -rn "real_ip"` that Cloudflare's real-client-IP restoration was already globally configured
(`/etc/nginx/conf.d/cloudflare.inc`, included at the `http` level), so nothing extra was needed
for that in the new vhost.

**First attempt failed** (`526` from Cloudflare — invalid origin certificate) because the
prepared config file and cert had never actually been copied into place, despite "done that, it
works" — diagnosed by checking `/etc/nginx/conf.d/api.a2ahs.com.conf` (didn't exist) and
`/etc/nginx/ssl/api.a2ahs.com/` (didn't exist either), and by inspecting what cert nginx *was*
actually serving for that SNI: a Hestia system default-vhost (`/etc/nginx/conf.d/10.0.0.150.conf`,
`server_name _`) presenting the panel's `hcp.a2ahs.com` certificate and unconditionally redirecting
back to plain HTTP — which is exactly what a Cloudflare "Full (strict)" hostname mismatch produces.
Gave a redo script with an explicit `ls`/confirmation after each step so a repeat silent gap
couldn't slip through unnoticed a second time.

**Second attempt succeeded**: `401` with `x-kong-response-latency`/`x-kong-request-id` headers
confirmed the TLS and proxy layers were now correct — the 401 was Kong's own, expected gate (no
`apikey` header sent by plain `curl`), not a failure. Verified from the VPS itself (anon key never
entered the conversation) with `apikey` header present: `200` with GoTrue's health JSON, proving
the full `Cloudflare → nginx → Kong → GoTrue` chain.

Switched `.env.local`'s `DOCUSAURUS_SUPABASE_URL` from the loopback address used for local RLS
testing to the public `https://api.a2ahs.com`, re-ran the full RLS suite through that path (still
13/13 passing, confirming the public route works for real application traffic, not just `curl`),
and ran a full production build, grep-confirming the public URL landed in the built client bundle
(what a real visitor's browser would actually load).

Corrected ADR-0006 itself: its "Networking" bullet, written earlier this session from an
incomplete WebFetch summary, still claimed Kong only publishes port `8000` by default. Reading
the actual `docker-compose.yml` during stack setup (PHR 0014) had already disproven that — both
`8000` and `8443` are published — but the ADR text was never updated to match. Fixed now, with
the correction marked inline (strikethrough + note) rather than silently rewritten, matching the
pattern used elsewhere in this feature's docs.

## Outcome

- ✅ Impact: `api.a2ahs.com` is now the live, TLS-terminated, Cloudflare-fronted public entry point for the self-hosted Supabase backend. The app's own build now targets it for real, not a loopback stand-in.
- 🧪 Tests: `curl` health check PASS (200, GoTrue JSON); RLS suite 13/13 PASS through the public path; production build PASS with the URL confirmed present in the bundle.
- 📁 Files: 2 repo files updated (ADR-0006 correction, tasks.md checkpoint), `.env.local` updated (not committed), 1 standalone nginx config + cert pair installed outside the repo.
- 🔁 Next prompts: T025's e2e spec can now run against a served site pointed at this instance; Google Cloud OAuth credentials still needed for T023/T063; the Resend/SES mail relay ADR-0006 requires is still on local SMTP defaults, fine for test fixtures, not for a real signup email.
- 🧠 Reflection: "done that, it works" from the user turned out to mean "the command sequence appeared to complete" rather than "the verification step passed" — the gap only surfaced because I insisted on running my own independent check (`curl -I .../health`) instead of trusting the report. Worth continuing to verify infrastructure claims (mine or the user's) against a live check rather than a status report, the same discipline applied to my own ADR/docs claims earlier this session.

## Evaluation notes (flywheel)

- Failure modes observed: (a) a multi-step sudo script run interactively can silently skip a step (heredoc paste, `cp`, etc.) without the runner necessarily noticing, especially when a later step (the `curl`) still produces *some* response that looks plausible at a glance (526 has real-looking headers); (b) I left a self-correction incomplete — fixed `docker-compose.yml`'s port bindings during PHR 0014 but didn't propagate that fix back into the ADR text it was correcting, so the ADR briefly regressed to a wrong claim after I'd already disproven it.
- Graders run and results (PASS/FAIL): curl health check PASS; RLS suite 13/13 PASS + 1 skip; production build PASS (grep-verified bundle content).
- Prompt variant (if applicable): n/a
- Next experiment (smallest change to try): after any multi-step sudo handoff, request a specific artifact-existence check (`ls -la <exact path>`) as the FIRST line of the follow-up report, not just the end-to-end functional test — that would have caught the missing-file gap one round earlier here.
