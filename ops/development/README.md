# Contained remote development

The dedicated SSH alias is for VS Code. Keep an ordinary SSH connection available for
recovery. Open the project folder, never the whole home directory. Multiple windows are
supported, sharing one 3 GiB editor ceiling. Excess use can disconnect every contained
window; save buffers frequently. No automatic editor restart is configured.

## Server setup

Run `python3 scripts/development/install.py` from this repository. It backs up overwritten
files and extension versions beneath `~/.local/state/development-containment/backups/`,
installs user units and executables, updates machine watcher/search exclusions, and starts
tmux and monitoring. Existing processes stay where they are. User lingering must be enabled
for persistence after the final SSH logout (`loginctl show-user "$USER" -p Linger`). It was
already enabled on this host. No credentials are written to service definitions.

Use `~/.local/bin/agent-terminal course-work` from a project directory, then start `claude`
in that shell. Detach with Ctrl-b then d. Attach using the same command from ordinary SSH
or a VS Code terminal. Add `~/.local/bin` to your shell PATH if needed. Named sessions
retain their directory when reattached; new sessions use the caller's directory. The
normal account shell configuration applies. Do not import editor environment variables or
credentials into the persistent service. Existing Claude processes must finish or be
explicitly resumed inside tmux; attaching cannot migrate them. Session persistence covers
editor failure, not a host reboot or the agent group's own memory limit.

## Windows 11 client rollout

In PowerShell:

```powershell
New-Item -ItemType Directory -Force "$env:USERPROFILE\.ssh" | Out-Null
ssh-keygen -t ed25519 -f "$env:USERPROFILE\.ssh\id_ed25519_vscode_contained" -C "vscode-contained"
Get-Content "$env:USERPROFILE\.ssh\id_ed25519_vscode_contained.pub"
```

Use a passphrase and decline overwriting an existing key. Supply ONLY the `.pub` line to
the server maintainer, who saves it in a public-key file and runs:

```sh
python3 scripts/development/authorize-editor-key.py /path/to/client-key.pub
```

The helper backs up authorized_keys and appends a forced-command entry for the new key.
Existing SSH identities are unchanged. TCP forwarding and PTYs are not disabled by this
entry. This is resource containment for a trusted account, not a security sandbox against
that account intentionally bypassing its own launcher.

In `%USERPROFILE%\.ssh\config`, add an alias using the SAME HostName, User, Port and any
ProxyJump from your working alias. Replace the example host and username as necessary:

```sshconfig
Host textbook-editor
    HostName YOUR_EXISTING_SERVER
    User a2ahs
    IdentityFile ~/.ssh/id_ed25519_vscode_contained
    IdentitiesOnly yes
    ControlMaster no
    ControlPath none
```

Keep the original alias unchanged. In LOCAL VS Code user settings merge:

```json
"remote.SSH.serverInstallPath": {
  "textbook-editor": "/home/a2ahs/.vscode-server-contained"
}
```

This distinct server directory prevents reconnects from reusing the uncontained server.
Machine exclusions are prepared for both direct and nested `.vscode-server` layouts.
The live server process `--server-data-dir` identifies the actual settings root; verify it
after a transport change. Test from PowerShell before connecting
VS Code:

```powershell
ssh textbook-editor 'cat /proc/self/cgroup'
'input-test' | ssh textbook-editor cat
ssh textbook-editor 'exit 23'
$LASTEXITCODE
```

Expect development.slice/development-editor.slice in the first output, preserved input,
and exit code 23. Test SSH forwarding and the installed Remote SSH transport before
trusting the alias. Keep the default transport initially and inspect Remote SSH logs on
failure; no versioned VS Code binaries are patched. Then save buffers, explicitly migrate
Claude sessions and close old editor connections. Do not kill existing sessions silently.
Open the repository through the new alias with extensions disabled for a baseline.

## Acceptance and investigation

Run the lightweight tests with `python3 -m unittest discover -s tests/ops -v`. The opt-in
`python3 scripts/development/verify-live.py --stop-editor-slice` DISCONNECTS contained
editors. Save buffers first. It checks wrapper semantics, agent heartbeat survival, and
an 80 MiB allocation refused inside a disposable 32 MiB cgroup. Confirm the journal result
is `oom-kill`, rather than accepting another cause of nonzero exit as proof.

After reconnect and each server update, check process cgroups for every server, watcher,
extension host and terminal (the monitor also counts uncontained editor roles). Processes
must have `/development.slice/development-editor.slice/` in `/proc/PID/cgroup`. Two windows
must have that same ancestor. Agent panes must descend from development-agents.slice;
this host's tmux can create separate tmux-spawn scopes under that slice. Test editing,
search, Git, file refresh, terminal attachment and forwarding in the real client.

Use Developer: Show Running Extensions to profile extension hosts and Help: Start
Extension Bisect after the extensions-disabled baseline. Record extension versions,
profiles and measurements. Disable only a confirmed offender on this remote host until
a verified fix. For watcher traces use Developer: Set Log Level > Trace, then Output >
Server, following [Microsoft's watcher diagnostics](https://github.com/microsoft/vscode/wiki/File-Watcher-Issues).
Return to normal logging after collecting evidence. Authored docs, licence, i18n and
source folders remain watched and searchable; generated renders and video media are excluded.

The 30-second sampler writes private JSON lines under
`~/.local/state/development-containment/`, rotating at 5 MiB to three backups. It records
slice memory/events/PSI, CPU statistics, disk latency deltas, and aggregate editor roles.
It never persists command arguments, environments, credentials or file contents. Warnings
use local wall/syslog after 60 seconds above 2.5 GiB; kernel controls enforce the limit.
Observe a normal workday for growth, throttling, I/O stalls and site responsiveness before
marking rollout complete. Increase budgets only with measured production headroom.

## If the integrated terminal remains outside the editor slice

A contained SSH launcher can still reuse an older uncontained VS Code server. On
2026-11-04 the new launcher was inside development-editor.slice but used the standard
`.vscode-server` path; its terminal belonged to the original session-22454.scope.
The dedicated directory contained only prepared settings. This is a failed editor
acceptance check, even though the standalone SSH command passed.

Inspect the client's Remote - SSH output lines for `SSH Resolver called for` and
`remote.SSH.serverInstallPath`. Confirm the local active profile's setting maps the
exact resolver alias to the dedicated directory. Do not assume a setting saved in
remote settings applies to the local SSH resolver. An owner-supplied log on this host confirmed the resolver alias was correct but
`remote.SSH.serverInstallPath = {}`. In that case, open a local VS Code window in the
same active profile, use Preferences: Open User Settings (JSON), and replace the
existing empty mapping or add the mapping once. Save, reconnect the dedicated window,
and confirm the effective log shows the path before accepting terminal ancestry.
If both alias and path match, investigate actual transport logs before changing transport options. Do not stop the original server
until existing Claude sessions have been explicitly migrated or finished.

## Rollback

Reconnect with the unchanged ordinary SSH alias. Restore the client alias and local
serverInstallPath setting. Restore remote settings from the first backup's
`.vscode-server/data/Machine/settings.json` (remove if manifest says it did not exist).
The dedicated settings file can be removed after its editor connections close. Remove
only the dedicated key's `contained-editor` line from authorized_keys; do not overwrite
concurrent key changes with an old full backup.

Stop contained editors explicitly after saving work. Preserve tmux sessions and the agent
service and parent slice budgets until their workloads finish. Stop the monitor with
`systemctl --user disable --now development-monitor.service`. After all agent sessions
finish, disable/stop agent-tmux, check both slice subtrees have `populated 0`, stop the child
slices then the parent, and restore/remove installed files according to the FIRST install
backup's manifest. Run `systemctl --user daemon-reload`. Do not remove limits while
contained workloads are live. Restore previous enablement where units existed before
installation. Existing outer user limits, gateways, DB, production and normal SSH need no
changes. No OCI resources or deployment architecture are changed by this work.

## Remote builds

`scripts/heavy.sh` first calls `~/.config/mega-book/heavy-remote` when that executable exists.
Exit code 99 means "not handled", and the job then takes a local slot as usual. On the
production host this is a symlink to `~/bin/crew-remote-build.sh` (host-level, not in this
repository). It offloads only `npm run build` started from a crew worktree under `~/crew-wt/`
to the davinci host: it pushes the worktree's HEAD to `refs/crew/build` in davinci's
`~/crew-build/repo`, rsyncs uncommitted files over it, builds there in a capped scope
(5 GiB, 1.5 CPUs), streams the output back, copies `build/` into the worktree and returns the
build's exit code. If davinci is unreachable or the transfer fails, it falls back to the local
slot. Builds from the owner's checkout, the deploy clone and every other heavy job still run
locally. To disable offload, remove the symlink.

## Media desktop on davinci

Since 2026-11-24 the Flow producer (gflow-cli) and the browser sessions media work needs run on
davinci, so they no longer depend on the owner's laptop. Unit files are copied in
`ops/development/media-davinci/` (installed copies are live; edit those, then re-copy).

| Where | Unit | What |
|---|---|---|
| davinci (system) | `tigervncserver@:1` | XFCE desktop on display `:1`, localhost only (`~/.vnc/tigervnc.conf`, `/etc/tigervnc/vncserver.users`) |
| davinci (user `ubuntu`) | `gflow-serve` | gflow MCP on 127.0.0.1:18800, profile `a2ahs-alpha`, Chrome on `:1` |
| davinci (user) | `gflow-files` | `~/Downloads/gflow-cli` on 127.0.0.1:18801 |
| davinci (user) | `workspace-chrome` | Chrome for NotebookLM, meta.ai, Business Suite; DevTools on 127.0.0.1:9222 |
| production host (user `a2ahs`) | `media-tunnel` | `ssh -N -L` 18800, 18801, 15901 (VNC), 18802 (DevTools) to davinci |

Both users have linger on, so all of it starts at boot without a login. Nothing listens on a
public interface and no OCI security-list rule was added: the desktop, gflow and DevTools are
reached only through SSH.

- **Owner's view of the desktop:** from the laptop, `ssh -N -L 45901:127.0.0.1:15901
  textbook-editor`, then a VNC viewer on `localhost:45901`. The password is in
  `~/.config/tigervnc/owner-pass.txt` on davinci. Windows reserves 5901 and 15901 on the owner's PC.
- **Re-login:** see the media-studio skill ("gflow route"). NotebookLM for `nlm`:
  `nlm login --provider openclaw --cdp-url http://127.0.0.1:18802` on the production host.
- **Memory:** the two Chromes and gflow's warm session use about 4-5 GB on davinci, leaving about
  5 GB; remote builds are capped at 5 GiB, so a build during a heavy Business Suite session can be
  slow. Close Business Suite tabs when idle.
- **Back to the laptop route:** `systemctl --user stop media-tunnel` here, then start the three
  Windows windows (media-studio skill). Only one route can hold 18800.
