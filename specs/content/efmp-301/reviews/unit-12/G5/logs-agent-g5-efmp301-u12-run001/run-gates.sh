#!/usr/bin/env bash
# G5 deterministic gate runner for EFMP-301 Unit 12 (agent-g5-efmp301-u12-run001).
# Runs the six mandatory content gates from the worktree root and records real
# command, exit code and output for each. Evidence-only; changes nothing.
cd /home/a2ahs/mega_book_for_B.Ed/.claude/worktrees/agent-ad57ca9469bfc4572 || exit 9
L=specs/content/efmp-301/reviews/unit-12/G5/logs-agent-g5-efmp301-u12-run001

run() {
  name="$1"; shift
  {
    echo "\$ $*"
    echo "started: $(date -u +%Y-%m-%dT%H:%M:%SZ)"
  } > "$L/$name.log"
  "$@" >> "$L/$name.log" 2>&1
  code=$?
  echo "exit_code=$code" >> "$L/$name.log"
  echo "finished: $(date -u +%Y-%m-%dT%H:%M:%SZ)" >> "$L/$name.log"
  echo "$name exit=$code"
}

run validate-content npm run validate:content
run check-depth-gate npm run check:depth-gate
run check-figures npm run check:figures
run check-no-em-dash npm run check:no-em-dash
run check-no-answer-keys npm run check:no-answer-keys
run check-docs-sync npm run check:docs-sync
