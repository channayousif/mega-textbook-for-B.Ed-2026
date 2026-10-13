#!/usr/bin/env bash
# Run a heavy job in one of two host slots (CLAUDE.md "Host resource limits").
# Waits until a slot is free. Slot 1 is the original single lock, so any caller
# still using `flock /tmp/mega-book-heavy.lock` counts against the same limit.
# Usage: scripts/heavy.sh npm run build
[ $# -gt 0 ] || { echo "usage: scripts/heavy.sh <command> [args...]" >&2; exit 2; }
SLOTS=(/tmp/mega-book-heavy.lock /tmp/mega-book-heavy.2.lock)
BUSY=75
while :; do
  for lock in "${SLOTS[@]}"; do
    flock -n -E "$BUSY" "$lock" "$@"
    rc=$?
    [ "$rc" -eq "$BUSY" ] || exit "$rc"
  done
  sleep 5
done
