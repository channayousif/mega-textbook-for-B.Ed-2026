# ADR-0008: Production Deployment Architecture

- **Status:** Accepted
- **Date:** 2026-07-21
- **Feature:** 003-classes-assignments (applies platform-wide)
- **Context:** Through Spec 003's merge (PR #4), production releases to www.a2ahs.com were
  manual copies of `build/` into the HestiaCP docroot — undocumented anywhere in the repo, and
  drifting: `main` contained Spec 003 while production still served Spec 002. Meanwhile the
  repo's only deploy workflow (`deploy.yml`, GitHub Pages fallback) failed on every merge
  because Pages was never enabled for this (private) repo, and ADR-0002's "Vercel primary"
  hosting bullet never became the real delivery path either — the actual chain, traced live, is
  Cloudflare → HestiaCP host nginx → Apache → `/home/a2ahs/web/a2ahs.com/public_html`, on the
  same self-hosted server that runs the Supabase backend (ADR-0006). Constraints at decision
  time: repo is private; passwordless `sudo` is unavailable to automation (no service installs);
  Constitution Art. V.6 requires running on infrastructure the project already controls.

## Decision

Adopt **pull-based, CI-gated continuous deployment executed by the production host itself**:

- **Trigger:** user cron (`*/5 * * * *`) on the production host — the host polls GitHub;
  GitHub never reaches into the host. No inbound SSH, no repo-stored deploy secrets, no
  self-hosted runner service.
- **Deployer:** `scripts/deploy-prod.sh`, versioned in the repo and self-updating (the deploy
  clone resets to the deployed SHA, which includes the script; all logic in `main()` so a
  mid-run self-replacement cannot corrupt execution).
- **CI gate:** a commit deploys only if the `ci.yml` workflow run for that **exact SHA**
  completed with `success` — queried via the workflow-runs API by workflow file + `head_sha`,
  deliberately *not* by check-run name, because `deploy.yml` has a job also named `build`
  that would collide. `ci.yml`'s run-level success covers both its `build` and `e2e` jobs.
- **Build isolation:** builds happen in a dedicated clone (`~/deploy/mega_book`), never the
  development working tree — the dev repo's `build/` is routinely clobbered by local test
  builds, and deploying it would ship uncommitted work. The clone's `.env.local` carries only
  the two client-side build values (Supabase URL + anon key); the service-role key is never
  present.
- **Release step:** post-build sanity checks (en + ur + `app/classes` index files must exist)
  then `rsync -a --delete build/ → docroot`. State (`~/deploy/deployed-sha`) and logs
  (`~/deploy/deploy.log`) live on the host.
- **`deploy.yml` demoted:** push trigger removed (was 404-failing every merge);
  `workflow_dispatch` kept in case GitHub Pages is ever actually enabled.

The developer-facing contract: **merge to `main` → CI green → live within ~5 minutes.** Manual
docroot copies are retired.

## Consequences

### Positive

- Zero-secret, zero-inbound-surface design: nothing new is exposed publicly and no deploy
  credentials exist in GitHub — the host's existing outbound `gh`/git auth is sufficient.
- Deploys are impossible for commits that failed or haven't finished CI — verified in the first
  live cycle (the 23:55 cron tick logged `holding …: ci.yml status=in_progress`, then the 00:00
  tick deployed after green).
- Fully installable without `sudo`; survives reboots (cron), with single-flight locking so a
  slow build and the next tick cannot race.
- Production can no longer silently drift behind `main`, and the previously red-on-every-merge
  Pages workflow no longer produces failure noise.

### Negative

- Up to ~5 minutes of latency between CI green and go-live, plus no deploy status surfaced in
  the GitHub UI — the deploy log lives on the host (`~/deploy/deploy.log`), so "did it ship?"
  requires host access (or waiting a few minutes).
- Deployment health is not monitored by anything: if cron, `gh` auth, or the build breaks, the
  failure is visible only in the host log. Mitigated partially by the script leaving the
  docroot untouched on any failure (sanity gate before rsync).
- Builds consume production-host CPU for ~2 minutes per release — acceptable at this project's
  merge frequency, and the host already runs heavier workloads (Supabase stack).
- ADR-0002's "Hosting & delivery" bullet ("Vercel primary, GitHub Pages fallback") is
  **superseded by this ADR** for the delivery mechanism; ADR-0002's content-platform and
  static-output decisions are unaffected.

## Alternatives Considered

- **Self-hosted GitHub Actions runner on the production host** — push-based, instant deploys,
  logs in the GitHub UI; safe here because the repo is private. Rejected: installing the runner
  as a boot-persistent service requires `sudo` (unavailable to automation), and it adds a
  standing daemon with repo-scoped credentials to maintain — a heavier moving part for a
  5-minute latency win.
- **SSH-push deploy from GitHub-hosted runners** — a workflow job rsyncs the CI build over SSH.
  Rejected: requires storing a private key to the production host as a repo secret and keeping
  SSH reachable from GitHub's IP ranges — a new inbound trust path where the pull model needs
  none.
- **Webhook → local listener** — near-instant, still pull-ish. Rejected for now: requires a new
  public endpoint on the host plus a listener service (again `sudo`); the script's
  gate/build/rsync core is trigger-agnostic, so this remains a drop-in upgrade if the 5-minute
  latency ever matters.
- **Actually adopting Vercel/GitHub Pages (ADR-0002's original hosting plan)** — rejected:
  production is Cloudflare-fronted on project-controlled infrastructure co-located with the
  self-hosted Supabase backend (ADR-0006, Constitution Art. V.6); Pages is additionally
  unavailable for private-repo sites on the current plan, which is why `deploy.yml` failed on
  every merge.

## References

- Feature Spec: [specs/003-classes-assignments/spec.md](../../specs/003-classes-assignments/spec.md)
- Implementation Plan: [specs/003-classes-assignments/plan.md](../../specs/003-classes-assignments/plan.md)
- Deployer: [scripts/deploy-prod.sh](../../scripts/deploy-prod.sh) (commit 49da974)
- Related ADRs: ADR-0002 (hosting bullet superseded by this ADR; content-platform decisions
  unaffected), ADR-0006 (the self-hosted server this deploys to), ADR-0007 (the no-API-server
  model that makes static-docroot deployment sufficient)
- Evaluator Evidence: [history/prompts/003-classes-assignments/0021-integrate-pull-based-production-deployment.green.prompt.md](../prompts/003-classes-assignments/0021-integrate-pull-based-production-deployment.green.prompt.md)
  — first deploy live-verified through Cloudflare; autonomy loop (hold-then-deploy) confirmed
  from the deploy log
