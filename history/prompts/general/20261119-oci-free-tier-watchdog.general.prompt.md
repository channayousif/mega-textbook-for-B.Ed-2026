---
id: 20261119
title: OCI free-tier watchdog with Discord alerts and reversible countermeasures
stage: general
date: 2026-11-03
surface: agent
model: claude-opus-5-5
feature: none
branch: ops/oci-free-watch
user: M Yousif Channa
command: none
labels: [board-direct, ops, oci, billing]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
  - AGENTS.md
  - history/prompts/general/20261118-stop-oci-object-storage-charge.general.prompt.md
  - history/prompts/general/20261119-oci-free-tier-watchdog.general.prompt.md
  - ~/bin/oci-free-watch.py (host-local, not in repo)
  - ~/.config/oci-free-watch.env (host-local, not in repo)
tests:
  - oci-free-watch.py --dry-run (all 11 checks green)
  - forced thresholds dry-run (prune list stops at the 14-day floor)
  - cost detection replayed on October 2026 (0.0816 SGD found)
  - --test-alert delivered to Discord #etextbook-platform
---

## Prompt

watch for such actions which cause the billing an keep the overall resiurce usage under the free limit in any way possible, alert me on textbook channel on discord immediately and take safe counter measures.

## Response snapshot

Owner rulings, given in this session: cover the Toronto tenancy now and dava later; countermeasures
are reversible only; alerts go to the crew channel #etextbook-platform (no channel is literally
named "textbook").

Built `~/bin/oci-free-watch.py`, which cron runs every 15 minutes (about 60 s per run, niced). It
checks:
- any cost this month (Usage API, hourly)
- Object Storage Standard, IA and Archive size (warns at 8 GB, acts at 9 GB, free 10 GB), and
  requests (free 50k)
- objects outside `supabase/ base/ wal/`
- compute: A1 2 OCPU / 12 GB cap, 2 Micro, paid shapes
- boot + block volumes against 200 GB, and VPU above 10
- volume backups against 5
- load balancers and NLBs
- an inventory diff of new resources

Countermeasures:
- prune the oldest `supabase/` logical dumps (keeping the newest 14 days; base/ and WAL are
  never touched)
- STOP, never terminate, any paid or extra instance (the host instance is excluded)

Alerts are deduplicated (repeat at most every 6 hours, a resolved message when a check clears)
and go to Discord. Critical ones also go to WhatsApp. If openclaw fails, they fall back to ntfy,
then to an OUTBOX file. Kill switch: `WATCH_ACT=0` in `~/.config/oci-free-watch.env`.
Added a rule to AGENTS.md.

The existing OCI budget `Monthly-budget` (3 SGD) has no alert rule. Adding an email rule was left
to the owner because it needs a recipient address.

## Outcome

- ✅ Impact: billing risks in the Toronto tenancy are watched every 15 minutes, with alerts sent at once.
- 🧪 Tests: dry-run, forced-threshold dry-run, an October cost replay and a live test alert all passed.
- 📁 Files: AGENTS.md, 2 PHRs; host-local script, config and crontab line.
- 🔁 Next prompts: install on dava once its OCI CLI is configured; optionally add a budget email rule.
- 🧠 Reflection: the Usage API lags by hours, so the inventory checks are what prevent a charge; the cost check is the backstop.

## Handoff (for CEO and agents)

- Shipped / changed: `~/bin/oci-free-watch.py` in cron (`*/15`), state in `~/.crew/oci-watch/`, an AGENTS.md rule, and the 2026-11-03 Hestia archive deletion (PHR 20261118).
- Decisions the team must respect: never create, grow or reshape OCI resources in Toronto; `textbook-db-backups` holds backups only; the watchdog may prune old Supabase dumps and stop non-host instances on its own.
- Pending / next owner: owner to decide on a budget email rule; dava install deferred (owner).
- Paperclip issues affected: none

## Evaluation notes (flywheel)

- Failure modes observed: a one-off upload with no retention quietly used up the free allowance.
- Graders run and results (PASS/FAIL): manual verification PASS.
- Prompt variant (if applicable): none
- Next experiment (smallest change to try): if run CPU becomes a problem, list platform images less often.
