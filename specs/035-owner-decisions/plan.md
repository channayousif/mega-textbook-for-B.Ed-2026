# Plan: Feature 035 - Owner Decisions page

Model: the G3 sign-off desk (ADR-0032, `supabase/migrations/0050_g3_signoffs.sql`,
`scripts/crew/signoff-sync.mjs`).

```
host tick (15 min)                               Supabase                   /app/admin/decisions
board.json + media.json + ledgers ──push──────▶ owner_queue ──────read────▶ cards, links, details
crew.mjs cmd "<cmd>" --via web --locked ◀─poll─ owner_decisions ◀──RPC───── buttons + note
                         ──mark applied/refused + crew reply──▶              shows the result
```

## Parts

| Part | File |
|---|---|
| Tables and RPCs | `supabase/migrations/0059_owner_decisions.sql` |
| Queue builder and command mapping (pure) | `scripts/crew/owner-queue.mjs` |
| Sync: apply decisions, push queue | `scripts/crew/decisions-sync.mjs`, run from `scripts/crew/tick.sh` (`--in-tick`) |
| Structured command result | `scripts/crew/crew.mjs cmd ... --json` prints `{ ok, reply }` |
| Page logic (pure) | `src/lib/ownerDecisions.ts` |
| Page | `src/pages/app/admin/decisions.tsx`, nav in `src/lib/dashboardNav.ts`, hub card in `src/pages/app/admin/index.tsx` |

## Digests

- teaser script: current sha256 of `specs/studio/teasers/<id>.json` (what approval binds to);
- private Short: YouTube id;
- Study Studio unit: hash of the qa3-pass item keys and YouTube ids;
- social post: hash of id and card; crew question: hash of id and askedAt.

## Security

- The service key stays in `~/.crew/mega-book/signoff.env`, loaded only in the tick subshell; the child
  `crew.mjs cmd` runs without it.
- The page only selects from the queue; the RPC checks the action is one the item offers, so free text
  never becomes a command key. Notes are collapsed to one line before they enter a command.

## Rollout

1. Merge; apply migration 0059 to the live Supabase (owner confirms).
2. The next tick pushes the queue; check the page.
3. Owner makes one real decision; confirm `media.json` records `via: "web"` and the card shows Applied.
