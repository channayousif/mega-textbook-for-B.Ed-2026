#!/usr/bin/env bash
# One crew heartbeat: sync the control checkout with main, plan, tick, refresh the board.
# Cron runs this every 15 minutes, so the crew keeps moving when no lead session is open.
# flock -n: if the previous tick (or a lead running it by hand) is still going, skip this one.
set -euo pipefail
cd "$(dirname "$0")/../.."
STATE="${CREW_STATE_DIR:-$HOME/.crew/mega-book}"
mkdir -p "$STATE"
exec 9>"$STATE/tick.lock"
flock -n 9 || { echo "tick already running"; exit 0; }
export PATH="$HOME/.local/bin:$HOME/.nvm/versions/node/v22.22.1/bin:$PATH"
git fetch -q origin
# plan regenerates static/content-status.json here; on a checkout that still tracks it, drop it so the
# merge cannot abort. Since b1b4ee90 it is untracked, so checkout fails and must not kill the tick (set -e).
git checkout -q -- static/content-status.json 2>/dev/null || true
git merge -q --ff-only origin/main 2>/dev/null || git merge -q --no-edit origin/main
node scripts/crew/crew.mjs plan
node scripts/crew/crew.mjs tick
node scripts/crew/crew.mjs status > /dev/null
