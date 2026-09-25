#!/usr/bin/env bash
# Extra G5 evidence: dark-variant freshness for the unit's Urdu figure set.
cd /home/a2ahs/mega_book_for_B.Ed/.claude/worktrees/agent-ad57ca9469bfc4572 || exit 9
L=specs/content/efmp-301/reviews/unit-12/G5/logs-agent-g5-efmp301-u12-run001
{
  echo "\$ npm run figures:variants:check"
  echo "started: $(date -u +%Y-%m-%dT%H:%M:%SZ)"
  npm run figures:variants:check 2>&1
  echo "exit_code=$?"
  echo "finished: $(date -u +%Y-%m-%dT%H:%M:%SZ)"
} > "$L/figures-variants-check.log" 2>&1
tail -3 "$L/figures-variants-check.log"
