#!/usr/bin/env python3
"""Opt-in, bounded live check. Stops ONLY the editor slice; save buffers first."""
import os
from pathlib import Path
import subprocess
import sys
import tempfile
import time

if sys.argv[1:] != ['--stop-editor-slice']:
    sys.exit('Save editor work, then pass --stop-editor-slice. Stops contained editors only.')
run = lambda *a, **kw: subprocess.run(*a, check=True, **kw)
wrapper = str(Path.home() / '.local/bin/vscode-ssh-command')
env = dict(os.environ, SSH_ORIGINAL_COMMAND="cat; printf '%s' '$HOME `uname`'; exit 23")
r = subprocess.run([wrapper], env=env, input='stdin\n', text=True, capture_output=True)
assert r.returncode == 23 and r.stdout == 'stdin\n$HOME `uname`', r
print('PASS wrapper stdin, literal arguments, exit 23')
sock = f'/run/user/{os.getuid()}/agent-tmux/socket'
with tempfile.TemporaryDirectory(prefix='containment-check-') as directory:
    heart = Path(directory) / 'heartbeat'
    run(['tmux', '-S', sock, 'new-session', '-d', '-s', 'containment-validation', '-c', os.getcwd(),
         f'while :; do date +%s >> {heart}; sleep 1; done'])
    try:
        time.sleep(2)
        pid = subprocess.check_output(['tmux', '-S', sock, 'display-message', '-p', '-t',
                                       'containment-validation', '#{pane_pid}'], text=True).strip()
        cg = Path(f'/proc/{pid}/cgroup').read_text()
        assert '/development.slice/development-agents.slice/' in cg, cg
        child = subprocess.Popen([wrapper], env=dict(os.environ, SSH_ORIGINAL_COMMAND='exec sleep 90'))
        time.sleep(1)
        tasks = subprocess.check_output(['systemctl', '--user', 'show', 'development-editor.slice',
                                         '-p', 'TasksCurrent', '--value'], text=True).strip()
        assert int(tasks) > 0, tasks
        before = heart.stat().st_size
        run(['systemctl', '--user', 'stop', 'development-editor.slice'])
        child.wait(timeout=10)
        time.sleep(2)
        assert heart.stat().st_size > before
        run(['tmux', '-S', sock, 'has-session', '-t', 'containment-validation'])
        print('PASS agent heartbeat and named tmux session survive editor slice stop')
    finally:
        run(['tmux', '-S', sock, 'kill-session', '-t', 'containment-validation'])
        run(['systemctl', '--user', 'start', 'development-editor.slice'])
# Allocate 80 MiB inside a 32 MiB disposable budget, under the development parent.
unit = f'containment-memory-check-{os.getpid()}'
r = subprocess.run(['systemd-run', '--user', '--wait', '--collect', '--quiet',
                    '--unit=' + unit, '--slice=development-editor.slice', '-p', 'MemoryMax=32M',
                    '-p', 'MemorySwapMax=0', '-p', 'RuntimeMaxSec=15', '--', '/usr/bin/python3',
                    '-c', 'x=bytearray(80*1024*1024)'])
assert r.returncode != 0, 'Allocation unexpectedly exceeded disposable cgroup limit'
journal = subprocess.check_output(['journalctl', '--user', '-u', unit + '.service', '--no-pager', '-o', 'cat'], text=True)
assert "result 'oom-kill'" in journal, 'Nonzero allocation exit was not confirmed as a cgroup OOM'
print('PASS disposable memory limit enforced; journal confirms oom-kill')
