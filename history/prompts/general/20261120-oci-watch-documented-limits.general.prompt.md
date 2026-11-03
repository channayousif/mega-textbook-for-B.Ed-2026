---
id: 20261120
title: OCI watchdog driven by documented Always Free limits for all resources
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
  pr: https://github.com/channayousif/mega-textbook-for-B.Ed-2026/pull/432
files:
  - AGENTS.md
  - history/prompts/general/20261120-oci-watch-documented-limits.general.prompt.md
  - ~/bin/oci-free-watch.py (host-local, rewritten on the OCI Python SDK)
  - ~/.config/oci-free-limits.json (host-local, generated from Oracle's docs)
  - ~/.config/oci-free-watch.env (host-local)
tests:
  - --refresh-limits parses all 31 documented limits, and each matches the page
  - full dry-run: every check green
  - simulated docs change: limit corrected (20 -> 10) and changed lines reported
  - forced-threshold dry-run: dump prune stops at the 14-day floor
---

## Prompt

you should watch according to documented oci free limits, and update them when oci changes them. no need to wait for the billing data to arrive. Rule is simple, keep the usage of all resources under allowed always free limits

## Response snapshot

Rewrote `~/bin/oci-free-watch.py` on the OCI Python SDK, using the CLI's own uv venv. This uses
far less CPU than one CLI process per call.

**Limits from the docs.** Limits are no longer hand-set. They are parsed from Oracle's "Always
Free Resources" page into `~/.config/oci-free-limits.json`: 31 values, two of them fixed prose
facts. The page is re-fetched every 24 hours. When its hash changes:
- the limits are re-parsed;
- the owner is alerted with the limit changes and the changed lines;
- any value that can no longer be parsed keeps its last known value and raises a critical
  "parser needs a look" alert.

**Live usage checks.** Usage is measured directly against each limit:
- home-region-only subscription
- Object Storage per tier (10/10/10 GB for paid accounts) and objects outside the backup prefixes
- A1 OCPU-hours and GB-hours, projected from the live allocation
- Micro count, paid shapes, non-free images
- 200 GB boot + block storage, VPU above 10, 5 volume backups
- the flexible LB at 10 Mbps, and the NLB
- 2 Autonomous DBs and 1 MySQL HeatWave (paid ones are stopped), NoSQL tables
- Vault private vaults, HSM key versions and secrets; certificate authorities and certificates
- Connector Hub connectors; Resource Manager stacks

**Metered checks (hourly).** Usage quantities, not cost: egress against 10 TB, Object Storage
requests against 50k, Monitoring, Email, Notifications, Logging, and any metered SKU with no
known free allowance. Storage is projected from the bytes stored now. Resources sized to their
cap on purpose (A1, the 200 GB boot volume) alert only when exceeded. Cost stays as a backstop.

**Countermeasures** (reversible only):
- prune old Supabase dumps
- stop extra or paid instances, paid ADB and paid MySQL
- reset VPU to 10

**Alerts.** Warnings are sent once per change; critical alerts repeat every 6 hours.

## Outcome

- ✅ Impact: the watchdog follows Oracle's published limits and adjusts itself when they change; all resource types on the page are covered.
- 🧪 Tests: the parser, a full dry-run, a simulated docs change and a forced prune dry-run all passed.
- 📁 Files: AGENTS.md rule reworded; host-local script, limits file and config.
- 🔁 Next prompts: install on dava when the owner asks.
- 🧠 Reflection: the first projection used early-month GB-months that included the deleted archive and posted one false warning; storage is now projected from live bytes.

## Handoff (for CEO and agents)

- Shipped / changed: v2 `~/bin/oci-free-watch.py` (cron `*/15`), `~/.config/oci-free-limits.json` (auto-maintained from the docs; never hand-edit), and the AGENTS.md owner rule "keep every OCI resource under the documented Always Free limits".
- Decisions the team must respect: the documented page is the authority for limits; A1 compute and 200 GB block storage are already used in full; only reversible countermeasures run automatically.
- Pending / next owner: dava coverage (owner, later); budget email rule (owner decision).
- Paperclip issues affected: none

## Evaluation notes (flywheel)

- Failure modes observed: one false metered-storage warning, caused by a stale early-month rate.
- Graders run and results (PASS/FAIL): manual verification PASS.
- Prompt variant (if applicable): none
- Next experiment (smallest change to try): add per-resource SKU checks (dashboards, APM) if they are ever used.
