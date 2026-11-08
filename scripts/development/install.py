#!/usr/bin/env python3
"""Install user containment assets, backing up every overwritten file first."""
import datetime
import json
import os
from pathlib import Path
import shutil
import subprocess

repo = Path(__file__).resolve().parents[2]
home = Path.home()
backup = home / '.local/state/development-containment/backups' / datetime.datetime.now().strftime('%Y%m%dT%H%M%S%f')
backup.mkdir(parents=True, mode=0o700)
os.umask(0o077)
manifest = []


def save(target):
    relative = str(target.relative_to(home))
    manifest.append({'path': relative, 'existed': target.exists()})
    if target.exists():
        dest = backup / relative
        dest.parent.mkdir(parents=True, exist_ok=True)
        shutil.copy2(target, dest)
    target.parent.mkdir(parents=True, exist_ok=True)


for source in (repo / 'ops/development/systemd').glob('*'):
    target = home / '.config/systemd/user' / source.name
    save(target)
    shutil.copy2(source, target)
for name in ('agent-terminal', 'vscode-ssh-command', 'development-monitor'):
    target = home / '.local/bin' / name
    save(target)
    shutil.copy2(repo / 'scripts/development' / name, target)
settings = home / '.vscode-server/data/Machine/settings.json'
# jsonc-parser is bundled with VS Code. Refuse to replace settings if JSONC cannot be parsed.
if settings.exists():
    parser = next((home / '.vscode-server').glob('cli/servers/Stable-*/server/node_modules/jsonc-parser/lib/umd/main.js'), None)
    if parser is None:
        data = json.loads(settings.read_text())
    else:
        result = subprocess.run(['node', '-e',
            'const fs=require("fs"),p=require(process.argv[1]),e=[];const d=p.parse(fs.readFileSync(process.argv[2],"utf8"),e);if(e.length)process.exit(1);process.stdout.write(JSON.stringify(d));',
            str(parser), str(settings)], capture_output=True, text=True, check=True)
        data = json.loads(result.stdout)
else:
    data = {}
patterns = ['**/node_modules/**', '**/.git/objects/**', '**/.git/subtree-cache/**',
            '**/build/**', '**/dist/**', '**/.docusaurus/**', '**/.cache/**',
            '**/.venv/**', '**/venv/**', '**/__pycache__/**', '**/.pytest_cache/**',
            '**/coverage/**', '**/specs/content/**/reviews/**/renders*/**',
            '**/specs/content/**/reviews/**/render-inspect*/**',
            '**/video-studio/output/**', '**/video-studio/renders/**',
            '**/video-studio/episodes/*/{inbox,audio,clips,images,render,publish,stills}/**',
            '**/video-studio/media/**', '**/video-studio/kaggle/{out,bundle}/**',
            '**/video-studio/remotion/{out,public}/**']
for key in ('files.watcherExclude', 'search.exclude'):
    data.setdefault(key, {}).update(dict.fromkeys(patterns, True))
# Snapshot installed top-level extension versions without credentials.
versions = []
for package in (home / '.vscode-server/extensions').glob('*/package.json'):
    obj = json.loads(package.read_text())
    versions.append({'id': str(obj.get('publisher')) + '.' + str(obj.get('name')), 'version': obj.get('version')})
(backup / 'extension-versions.json').write_text(json.dumps(versions, indent=2) + '\n')
save(settings)
settings.write_text(json.dumps(data, indent=2) + '\n')
# Remote SSH's legacy transport appends .vscode-server to serverInstallPath.
# Prepare both layouts; actual process --server-data-dir remains authoritative.
for relative in ('.vscode-server-contained/data/Machine/settings.json',
                 '.vscode-server-contained/.vscode-server/data/Machine/settings.json'):
    contained = home / relative
    save(contained)
    contained_data = json.loads(contained.read_text()) if contained.exists() else json.loads(json.dumps(data))
    for key in ('files.watcherExclude', 'search.exclude'):
        contained_data.setdefault(key, {}).update(dict.fromkeys(patterns, True))
    contained.write_text(json.dumps(contained_data, indent=2) + '\n')
(backup / 'manifest.json').write_text(json.dumps(manifest, indent=2) + '\n')
subprocess.run(['systemctl', '--user', 'daemon-reload'], check=True)
subprocess.run(['systemctl', '--user', 'start', 'development-editor.slice', 'development-agents.slice'], check=True)
subprocess.run(['systemctl', '--user', 'enable', '--now', 'agent-tmux.service', 'development-monitor.service'], check=True)
print('Installed. Backup:', backup)
print('Existing editor/Claude processes were not moved or stopped. Dedicated SSH key rollout remains required.')
