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
# Blocked fast-forwards are logged only on reason changes or after 24 hours. The reason
# (without the behind count) and last log time live in CREW_STATE_DIR/owner-sync.state
# (default ~/.crew/mega-book). New or changed reasons notify the owner once, with the
# behind count and blocking files; notification failures are ignored. Level or successfully
# fast-forwarded main clears the state. It always exits 0, so it can never fail a tick.
#
# CREW_OWNER_SYNC_NOTIFY overrides the notification shell command; its first argument is
# the message (default: node <this script's directory>/crew.mjs notify).
# CREW_OWNER_CHECKOUT overrides the checkout path (default: ~/mega_book_for_B.Ed).
set -uo pipefail
REPO="${CREW_OWNER_CHECKOUT:-$HOME/mega_book_for_B.Ed}"
STATE="${CREW_STATE_DIR:-$HOME/.crew/mega-book}/owner-sync.state"
SCRIPT_DIR=$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)
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
[ "$behind" -eq 0 ] && { rm -f -- "$STATE"; exit 0; }
if [ "$ahead" -ne 0 ]; then
  log "local main has $ahead commit(s) not on origin; not fast-forwarding ($behind behind)"
  exit 0
fi

if [ "$(g symbolic-ref -q --short HEAD)" = main ]; then
  if out=$(g merge --ff-only -q origin/main 2>&1); then
    rm -f -- "$STATE"
    log "fast-forwarded main by $behind commit(s)"
  else
    # 2026-W45 M3: retain the full file list, but ignore Git's moving commit summary.
    reason=$(printf '%s\n' "$out" | sed '/^Updating /d')
    previous=""
    logged=0
    if [ -f "$STATE" ]; then
      read -r logged < "$STATE" || logged=0
      previous=$(tail -n +2 -- "$STATE")
    fi
    [[ "$logged" =~ ^[0-9]{1,10}$ ]] || logged=0
    now=$(date +%s)
    if [ "$reason" != "$previous" ] || (( now - logged > 86400 )); then
      log "fast-forward blocked ($behind behind): $(printf '%s' "$reason" | tr '\n' ' ')"
      mkdir -p -- "$(dirname -- "$STATE")" &&
        printf '%s\n%s\n' "$now" "$reason" > "$STATE"
    fi
    if [ "$reason" != "$previous" ]; then
      message="owner-sync: fast-forward blocked ($behind behind) in $REPO: $(printf '%s' "$reason" | tr '\n' ' ')"
      if [ -n "${CREW_OWNER_SYNC_NOTIFY:-}" ]; then
        bash -c "$CREW_OWNER_SYNC_NOTIFY \"\$1\"" owner-sync "$message" || :
      else
        node "$SCRIPT_DIR/crew.mjs" notify "$message" || :
      fi
    fi
  fi
else
  # main is not checked out here: move the ref. `fetch origin main:main` is fast-forward-only and
  # git refuses it if main is checked out in some other worktree, so that worktree is never touched.
  if out=$(g fetch -q origin main:main 2>&1); then
    rm -f -- "$STATE"
    log "moved main by $behind commit(s) (checkout is on $(g branch --show-current))"
  else
    log "could not move main ($behind behind): $(printf '%s' "$out" | head -2 | tr '\n' ' ')"
  fi
fi
exit 0
