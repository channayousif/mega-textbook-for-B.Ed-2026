# Plan - VS-002 Studio Console

## 1. Shape
```
browser (127.0.0.1:4310)                     video-studio/ (files = source of truth)
┌──────────────────────────┐   REST + SSE   ┌───────────────────────────────────────┐
│ React SPA (Vite)         │◀──────────────▶│ studio-server (Node, Hono)            │
│  Home · Topics · Episode │                │  routes/  episodes, topics, assets,   │
│  stepper · Settings      │                │           jobs, brand, providers      │
│  Remotion <Player>       │                │  providers/  voice | video | image |  │
└──────────────────────────┘                │              publish  (manual now)    │
                                            │  jobs/  claude-cli, align, render ... │
                                            │  watcher (chokidar) → SSE "changed"   │
                                            └──────────┬────────────────────────────┘
                                                       │ reuses scripts/lib from 001
                                                       ▼
                                   episodes/*, queue/*, brand/*, remotion/
```

## 2. Folder layout (added to video-studio/)
```
studio/
├── server/
│   ├── index.ts              (Hono app, binds 127.0.0.1:4310, serves built SPA)
│   ├── routes/*.ts           (see contracts/api.md)
│   ├── providers/
│   │   ├── types.ts          (VoiceProvider, VideoProvider, ImageProvider, Publisher)
│   │   ├── manual/*.ts       (instructions + accept upload)
│   │   └── api/*.ts          (stubs that throw "not enabled" - future)
│   ├── jobs/                 (queue, runner, SSE broadcaster, claude-cli.ts)
│   └── watcher.ts
├── web/
│   ├── src/App.tsx           (router: /, /topics, /e/:id/:stage, /settings)
│   ├── src/stages/{Script,Voices,Visuals,Preview,Render,Publish}.tsx
│   ├── src/components/{StageShell,InstructionBox,CopyField,DropZone,AudioCard,ShotCard,GateBar,JobLog,UrduText}.tsx
│   └── src/lib/{api.ts, sse.ts}
└── README.md
config/providers.yaml
```
The Remotion `<Player>` imports the same `UrduShort` component from `remotion/src`, so preview
and render are always identical.

## 3. Provider interface (the automation seam - VS-ADR-0006)
```ts
interface StageProvider<Req, Out> {
  id: string;                        // "manual" | "gemini-api" | "veo-api" | "longcat" ...
  mode: "manual" | "api";
  describe(req: Req): Instructions;  // what the UI shows (manual) or a summary (api)
  run?(req: Req, job: JobCtx): Promise<Out>;      // api providers only
  accept?(req: Req, upload: UploadedFile): Promise<Out>; // manual providers only
}
type VoiceReq = { lineId; character; voiceName; stylePrompt; text };
type VideoReq = { shotId; prompt; negative; aspect: "9:16"; seconds: 8; firstFrame?; refs? };
type ImageReq = { shotId; prompt; refs? };
type PublishReq = { episodeId; platform; pack; videoPath; coverPath };
```
Every stage card renders from `describe()`. In manual mode it shows instructions + DropZone;
in api mode it shows a Generate button that starts a job calling `run()`. Outputs land in the
same files and the same `episode.json` fields either way.

## 4. Claude jobs (VS-ADR-0007)
`jobs/claude-cli.ts` spawns `claude -p "<slash command or prompt>" --output-format stream-json`
in `video-studio/`, streaming lines to the job log. Allowed commands are a fixed whitelist
(`/video-harvest`, `/video-new`, reviewers, `/video-publish`); the UI never sends free text to a
shell. Disabled by default (`providers.yaml: claude_cli.enabled: false`) → UI shows
"Copy command" instead.

## 5. Live sync
chokidar watches `episodes/`, `queue/`, `brand/` → SSE `{type:"changed", path}` → SPA refetches
that episode. So work done in Claude Code in the terminal appears in the Studio immediately.

## 6. Safety
127.0.0.1 only; CORS off; uploads streamed to a temp dir, type-sniffed (`file-type`), size-capped,
then moved by the server (the client never chooses paths); filenames are generated, never taken
from the client; FFmpeg called with argument arrays (no shell strings).

## 7. Stack
Hono + @hono/node-server, Vite + React + TypeScript, TanStack Query, Tailwind (brand tokens from
generated `brand.ts`), @remotion/player, wavesurfer.js, chokidar, file-type, zod.
One command: `npm run studio` (builds web if needed, starts server, opens browser).
