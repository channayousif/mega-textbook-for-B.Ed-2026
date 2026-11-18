#!/usr/bin/env python3
"""Authorize a client-generated public key, never accept private key material."""
import datetime
import os
from pathlib import Path
import subprocess
import sys

if len(sys.argv) != 2:
    sys.exit('usage: authorize-editor-key.py /path/to/client-key.pub')
source = Path(sys.argv[1])
key = source.read_text().strip()
if '\n' in key or not key.startswith(('ssh-ed25519 ', 'ssh-rsa ', 'ecdsa-sha2-')):
    sys.exit('Expected one OpenSSH public key line without options')
subprocess.run(['ssh-keygen', '-l', '-f', str(source)], check=True, stdout=subprocess.DEVNULL)
key_type, blob, *_ = key.split()
home = Path.home()
ssh = home / '.ssh'
ssh.mkdir(mode=0o700, exist_ok=True)
authorized = ssh / 'authorized_keys'
old = authorized.read_text() if authorized.exists() else ''
# Do not allow an already unrestricted copy of this key to bypass the wrapper.
if blob in old:
    sys.exit('Key already present. Use a fresh dedicated key; no existing access changed.')
backup = home / '.local/state/development-containment/backups' / datetime.datetime.now().strftime('%Y%m%dT%H%M%S%f')
backup.mkdir(parents=True, mode=0o700)
(backup / 'authorized_keys').write_text(old)
os.chmod(backup / 'authorized_keys', 0o600)
with authorized.open('a') as stream:
    if old and not old.endswith('\n'):
        stream.write('\n')
    stream.write(f'command="{home}/.local/bin/vscode-ssh-command" {key_type} {blob} contained-editor\n')
os.chmod(authorized, 0o600)
print('Added forced-command editor key. Normal SSH keys unchanged. Backup:', backup)
