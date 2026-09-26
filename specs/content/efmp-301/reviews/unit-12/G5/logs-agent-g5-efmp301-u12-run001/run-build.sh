#!/usr/bin/env bash
# G5 build for EFMP-301 Unit 12 Urdu render inspection (agent-g5-efmp301-u12-run001).
cd /home/a2ahs/mega_book_for_B.Ed/.claude/worktrees/agent-ad57ca9469bfc4572 || exit 9
L=specs/content/efmp-301/reviews/unit-12/G5/logs-agent-g5-efmp301-u12-run001
{
  echo "\$ npm run build"
  echo "started: $(date -u +%Y-%m-%dT%H:%M:%SZ)"
  npm run build 2>&1
  echo "exit_code=$?"
  echo "finished: $(date -u +%Y-%m-%dT%H:%M:%SZ)"
} > "$L/build.log" 2>&1
code=$(grep -o 'exit_code=[0-9]*' "$L/build.log" | tail -1)
echo "build $code"
tail -4 "$L/build.log"
