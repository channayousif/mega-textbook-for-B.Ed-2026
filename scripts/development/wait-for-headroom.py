#!/usr/bin/env python3
"""Fail closed on unavailable pressure data; 30 healthy seconds within 30 minutes."""
import sys
import time
from pathlib import Path


def healthy(root=Path('/proc')):
    mem = dict(line.split(':', 1) for line in (root / 'meminfo').read_text().splitlines())
    if int(mem['MemAvailable'].split()[0]) < 3 * 1024 * 1024:
        return False
    for resource in ('memory', 'io'):
        some = next(line for line in (root / 'pressure' / resource).read_text().splitlines()
                    if line.startswith('some '))
        fields = dict(item.split('=') for item in some.split()[1:])
        if float(fields['avg10']) > 10:
            return False
    return True


def wait(timeout=1800, stable=30, interval=5):
    deadline = time.monotonic() + timeout
    since = None
    print('heavy: slot acquired; waiting for 30 seconds of memory/PSI headroom', file=sys.stderr)
    while time.monotonic() < deadline:
        try:
            ok = healthy()
        except (OSError, ValueError, KeyError, StopIteration):
            ok = False
        now = time.monotonic()
        since = (now if since is None else since) if ok else None
        if since is not None and now - since >= stable:
            return 0
        time.sleep(min(interval, max(0, deadline - time.monotonic())))
    print('heavy: admission timed out after 30 minutes (memory/PSI); retry later', file=sys.stderr)
    return 75


if __name__ == '__main__':
    sys.exit(wait())
