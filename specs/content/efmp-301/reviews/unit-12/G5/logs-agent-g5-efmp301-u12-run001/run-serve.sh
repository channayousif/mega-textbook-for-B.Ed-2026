#!/usr/bin/env bash
# G5 static serve for Urdu render inspection (agent-g5-efmp301-u12-run001).
# Port 3215 chosen to avoid clashing with any concurrent reviewer server.
cd /home/a2ahs/mega_book_for_B.Ed/.claude/worktrees/agent-ad57ca9469bfc4572 || exit 9
L=specs/content/efmp-301/reviews/unit-12/G5/logs-agent-g5-efmp301-u12-run001
{
  echo "\$ npx docusaurus serve --port 3215 --dir build"
  echo "started: $(date -u +%Y-%m-%dT%H:%M:%SZ)"
  npx docusaurus serve --port 3215 --dir build 2>&1
  echo "exit_code=$?"
  echo "finished: $(date -u +%Y-%m-%dT%H:%M:%SZ)"
} > "$L/serve.log" 2>&1
