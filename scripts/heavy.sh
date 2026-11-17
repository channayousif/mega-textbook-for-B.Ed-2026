#!/usr/bin/env bash
# Two cooperative host slots. Hold the slot throughout pressure admission and job.
[ $# -gt 0 ] || { echo 'usage: scripts/heavy.sh <command> [args...]' >&2; exit 2; }
script_dir=$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)
# Optional host offload (ops/development/README.md "Remote builds"): if the host installs this
# executable, it may run the job on another machine. Exit 99 means "not handled": run it here.
remote="$HOME/.config/mega-book/heavy-remote"
if [ -x "$remote" ]; then
  "$remote" "$@"
  rc=$?
  [ "$rc" -eq 99 ] || exit "$rc"
fi
while :; do
  for lock in /tmp/mega-book-heavy.lock /tmp/mega-book-heavy.2.lock; do
    exec {slot_fd}>"$lock"
    if flock -n "$slot_fd"; then
      python3 "$script_dir/development/wait-for-headroom.py" || exit "$?"
      "$@"
      exit "$?"
    fi
    exec {slot_fd}>&-
  done
  sleep 5
done
