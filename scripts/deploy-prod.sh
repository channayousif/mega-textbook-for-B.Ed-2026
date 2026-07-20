#!/usr/bin/env bash
#
# Pull-based production deployer for www.a2ahs.com (this machine).
#
# Runs from cron every 5 minutes: if origin/main has a new commit AND its
# ci.yml workflow run succeeded (build + e2e jobs both green), build it in
# the dedicated deploy clone and rsync into the HestiaCP docroot that nginx/
# Apache actually serve. Deliberately pull-based (no inbound SSH, no repo
# secrets, no self-hosted runner service) — the deploy host polls GitHub,
# GitHub never reaches into the host.
#
# The deploy clone (~/deploy/mega_book) is NOT the development working tree:
# dev/test builds clobber the dev repo's build/ constantly (observed in
# practice), and deploying from it would ship uncommitted work. Only what
# landed on origin/main — and passed CI — ever reaches the docroot.
#
# Requirements on the host (already true at install time):
# - gh CLI authenticated as the repo owner (~/.config/gh)
# - git https credentials able to fetch the private repo non-interactively
# - ~/deploy/mega_book/.env.local with DOCUSAURUS_SUPABASE_URL and
#   DOCUSAURUS_SUPABASE_ANON_KEY only (build-time, client-side values;
#   the service-role key must never be present — the build doesn't need it)
#
# All logic lives inside main(), invoked on the last line — combined with
# git updating files by rename (new inode), a `git reset --hard` that
# replaces this very script mid-run cannot corrupt the executing copy.

set -euo pipefail

OWNER_REPO="channayousif/mega-textbook-for-B.Ed-2026"
REPO="/home/a2ahs/deploy/mega_book"
DOCROOT="/home/a2ahs/web/a2ahs.com/public_html"
STATE="/home/a2ahs/deploy/deployed-sha"
LOG="/home/a2ahs/deploy/deploy.log"
LOCK="/home/a2ahs/deploy/deploy.lock"

log() { printf '%s %s\n' "$(date -u +'%Y-%m-%dT%H:%M:%SZ')" "$*" >>"$LOG"; }

main() {
  # Single-flight: a build takes minutes; overlapping cron ticks must no-op.
  exec 9>"$LOCK"
  flock -n 9 || exit 0

  # Keep the log from growing unbounded.
  if [ -f "$LOG" ] && [ "$(stat -c%s "$LOG")" -gt 1048576 ]; then
    tail -n 200 "$LOG" >"$LOG.tmp" && mv "$LOG.tmp" "$LOG"
  fi

  # cron's PATH has no node/npm — resolve them the way a login shell would.
  export NVM_DIR="$HOME/.nvm"
  # shellcheck disable=SC1091
  [ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"

  git -C "$REPO" fetch --quiet origin main
  local target current
  target=$(git -C "$REPO" rev-parse origin/main)
  current=$(cat "$STATE" 2>/dev/null || echo none)
  [ "$target" = "$current" ] && exit 0

  # CI gate — the ci.yml run for this exact SHA must have fully succeeded
  # (its jobs include both `build` and `e2e`, so run-level success covers
  # both). Queried by workflow file, not check-run name, because the Pages
  # fallback workflow also has a job named `build` that would collide.
  local ci_status ci_conclusion
  read -r ci_status ci_conclusion < <(gh api \
    "repos/$OWNER_REPO/actions/workflows/ci.yml/runs?head_sha=$target&per_page=1" \
    --jq '.workflow_runs[0] | "\(.status) \(.conclusion)"' 2>/dev/null || echo "none none")
  if [ "$ci_status" != "completed" ] || [ "$ci_conclusion" != "success" ]; then
    log "holding $target: ci.yml status=$ci_status conclusion=$ci_conclusion"
    exit 0
  fi

  log "deploying $target (was $current)"
  git -C "$REPO" reset --hard --quiet "$target"

  cd "$REPO"
  if [ ! -f .env.local ]; then
    log "ABORT: $REPO/.env.local missing (build-time Supabase URL/anon key)"
    exit 1
  fi
  npm ci --no-audit --no-fund >>"$LOG" 2>&1
  npm run build >>"$LOG" 2>&1

  # Sanity: never rsync a broken/partial build over the live site.
  for f in build/index.html build/ur/index.html build/app/classes/index.html; do
    if [ ! -f "$f" ]; then
      log "ABORT: build output missing $f — docroot left untouched"
      exit 1
    fi
  done

  rsync -a --delete build/ "$DOCROOT"/
  echo "$target" >"$STATE"
  log "deployed $target OK"
}

main "$@"
exit $?
