#!/usr/bin/env bash
# Keep the owner's working checkout's `main` level with origin/main (owner request, 2026-11-02).
#
# The crew merges to origin from its own control checkout and nothing ever pulled the owner's
# checkout, so its `main` drifted 2317 commits behind. tick.sh calls this every run, so `main`
# follows origin within one tick of any merge.
#
# Fast-forward only. It never stashes, resets, deletes or overwrites: when a fast-forward would
# need any of that (local commits on main, a tracked edit or an untracked file in the way, a
# merge or rebase in progress), it logs why and leaves the checkout alone for the owner.
# It always exits 0, so it can never fail a tick.
#
# CREW_OWNER_CHECKOUT overrides the checkout path (default: ~/mega_book_for_B.Ed).
set -uo pipefail
REPO="${CREW_OWNER_CHECKOUT:-$HOME/mega_book_for_B.Ed}"
log() { echo "owner-sync: $*"; }
g() { git -C "$REPO" "$@"; }

g rev-parse --git-dir >/dev/null 2>&1 || { log "no git checkout at $REPO; skipped"; exit 0; }
gitdir=$(g rev-parse --absolute-git-dir)
for state in rebase-merge rebase-apply MERGE_HEAD CHERRY_PICK_HEAD REVERT_HEAD BISECT_LOG; do
  [ -e "$gitdir/$state" ] && { log "$state in progress in $REPO; skipped"; exit 0; }
done

g fetch -q origin main 2>/dev/null || { log "fetch failed; skipped"; exit 0; }
g rev-parse -q --verify refs/heads/main >/dev/null || { log "no local main branch; skipped"; exit 0; }
behind=$(g rev-list --count main..origin/main)
ahead=$(g rev-list --count origin/main..main)
[ "$behind" -eq 0 ] && exit 0
if [ "$ahead" -ne 0 ]; then
  log "local main has $ahead commit(s) not on origin; not fast-forwarding ($behind behind)"
  exit 0
fi

if [ "$(g symbolic-ref -q --short HEAD)" = main ]; then
  if out=$(g merge --ff-only -q origin/main 2>&1); then
    log "fast-forwarded main by $behind commit(s)"
  else
    log "fast-forward blocked ($behind behind): $(printf '%s' "$out" | head -4 | tr '\n' ' ')"
  fi
else
  # main is not checked out here: move the ref. `fetch origin main:main` is fast-forward-only and
  # git refuses it if main is checked out in some other worktree, so that worktree is never touched.
  if out=$(g fetch -q origin main:main 2>&1); then
    log "moved main by $behind commit(s) (checkout is on $(g branch --show-current))"
  else
    log "could not move main ($behind behind): $(printf '%s' "$out" | head -2 | tr '\n' ' ')"
  fi
fi
exit 0
