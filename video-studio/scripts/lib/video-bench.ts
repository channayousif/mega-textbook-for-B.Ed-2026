// VS-005 video bench: spec loading, validation, job expansion and packing rules shared by
// scripts/video-bench.ts, scripts/video-blind.ts and the tests. kaggle/video_bench.py mirrors
// jobs_for() and flat_name(); keep them in step.
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import YAML from 'yaml';
import { VS_ROOT } from './paths.ts';

export const SPEC_DIR = join(VS_ROOT, 'specs', '005-open-video-models');
export const WORKFLOW_DIR = join(VS_ROOT, 'kaggle', 'workflows');
export const FAMILIES: Record<string, string[]> = {
  wan22_ti2v: ['unet', 'clip', 'vae'],
  hunyuan15_i2v: ['unet', 'clip1', 'clip2', 'vae', 'clip_vision'],
};
const MODEL_DIRS = new Set(['diffusion_models', 'text_encoders', 'vae', 'clip_vision', 'loras']);
const PARAMS = ['width', 'height', 'length', 'fps', 'steps', 'cfg', 'sampler', 'scheduler', 'shift'] as const;
/** Clip names: <provider>_<shot>_s<seed>.<ext>, e.g. wan22-5b_S1_s101.mp4, flow_S1_s1.mp4. */
export const CLIP_RE = /^([a-z0-9-]+)_(S\d+)_s(\d+)\.(mp4|mov|webm)$/i;

export type BenchFile = { role: string; dir: string; path: string; size: number; sha256: string };
export type Candidate = {
  id: string; active?: boolean; family: string; workflow: string; kinds: ('i2v' | 't2v')[]; licence: string;
  hf_repo: string; revision: string; files: BenchFile[]; params: Record<(typeof PARAMS)[number], number | string>;
  settings_source: string; comfy_args?: string[];
};
export type Candidates = {
  comfyui: { repo: string; tag: string; commit: string }; workers: number; seeds: number[];
  smoke: { shot: string; seed: number; length: number }; candidates: Candidate[]; mode?: string;
};
export type Layer = { file: string; height: number; x: number };
export type Shot = {
  id: string; title: string; kind: 'i2v' | 't2v'; prompt?: string; style?: string; base?: string;
  image?: { background: string; layers: Layer[] };
};
export type StyleText = { prompt_suffix: string; negative: string };
export type Shots = { motion_negative: string; style_arms: Record<string, StyleText>; shots: Shot[]; brand_style?: StyleText };

export function loadBenchSpec(dir = SPEC_DIR): { cands: Candidates; shots: Shots } {
  return {
    cands: JSON.parse(readFileSync(join(dir, 'candidates.json'), 'utf8')),
    shots: JSON.parse(readFileSync(join(dir, 'shots.json'), 'utf8')),
  };
}

/** The locked brand art style (brand-bible.yaml art_style), never copied into the spec. */
export function brandStyle(brandBible = join(VS_ROOT, 'brand', 'brand-bible.yaml')): StyleText {
  const b = YAML.parse(readFileSync(brandBible, 'utf8'));
  const s = b?.art_style;
  if (!s?.prompt_suffix || !s?.negative) throw new Error('brand-bible.yaml has no art_style.prompt_suffix / negative');
  return { prompt_suffix: String(s.prompt_suffix).trim(), negative: String(s.negative).trim() };
}

/** A style-arm shot takes its image and prompt from its base shot. */
export function resolveShot(shot: Shot, shots: Shots): Shot {
  if (!shot.base) return shot;
  const base = shots.shots.find((s) => s.id === shot.base);
  if (!base) throw new Error(`shot ${shot.id}: base ${shot.base} not found`);
  const { base: _b, ...rest } = shot;
  return { ...base, ...rest };
}

/** Every problem in the two spec files; empty means valid. */
export function validateBenchSpec(cands: Candidates, shots: Shots, workflowNames: string[]): string[] {
  const errs: string[] = [];
  if (!/^[0-9a-f]{40}$/.test(cands.comfyui?.commit ?? '')) errs.push('comfyui.commit must be a 40-hex commit');
  if (!Number.isInteger(cands.workers) || cands.workers < 1 || cands.workers > 2) errs.push('workers must be 1 or 2 (T4 x2)');
  if (!cands.seeds?.length || !cands.seeds.every(Number.isInteger)) errs.push('seeds must be integers');
  const ids = new Set<string>();
  for (const c of cands.candidates ?? []) {
    const at = `candidate ${c.id}`;
    if (!/^[a-z0-9-]+$/.test(c.id ?? '')) errs.push(`${at}: id must be lower-case letters, digits and hyphens`);
    if (ids.has(c.id)) errs.push(`${at}: duplicate id`);
    ids.add(c.id);
    if (!FAMILIES[c.family]) errs.push(`${at}: unknown family ${c.family}`);
    if (!workflowNames.includes(c.workflow)) errs.push(`${at}: workflow ${c.workflow} not in kaggle/workflows`);
    if (!/^[0-9a-f]{40}$/.test(c.revision ?? '')) errs.push(`${at}: revision must be a 40-hex commit`);
    if (!c.licence) errs.push(`${at}: licence missing`);
    if (!c.settings_source) errs.push(`${at}: settings_source missing`);
    if (!c.kinds?.length || c.kinds.some((k) => k !== 'i2v' && k !== 't2v')) errs.push(`${at}: kinds must be i2v and/or t2v`);
    for (const f of c.files ?? []) {
      if (!/^[0-9a-f]{64}$/.test(f.sha256 ?? '')) errs.push(`${at}: ${f.path} sha256 must be 64 hex`);
      if (!Number.isInteger(f.size) || f.size <= 0) errs.push(`${at}: ${f.path} size must be a positive integer`);
      if (!MODEL_DIRS.has(f.dir)) errs.push(`${at}: ${f.path} dir ${f.dir} is not a ComfyUI model folder`);
    }
    const roles = (c.files ?? []).map((f) => f.role).sort();
    if (FAMILIES[c.family] && roles.join() !== [...FAMILIES[c.family]].sort().join()) errs.push(`${at}: file roles ${roles.join()} do not match family ${c.family}`);
    for (const p of PARAMS) if (c.params?.[p] === undefined) errs.push(`${at}: params.${p} missing`);
    if (c.params && ((c.params.width as number) % 16 || (c.params.height as number) % 16)) errs.push(`${at}: width and height must be multiples of 16`);
    if (c.params && ((c.params.length as number) - 1) % 4) errs.push(`${at}: length must be 4n+1 frames`);
  }
  const shotIds = new Set<string>();
  for (const s of shots.shots ?? []) {
    if (!/^S\d+$/.test(s.id)) errs.push(`shot ${s.id}: id must look like S1`);
    if (shotIds.has(s.id)) errs.push(`shot ${s.id}: duplicate id`);
    shotIds.add(s.id);
    if (s.style && !shots.style_arms?.[s.style]) errs.push(`shot ${s.id}: unknown style arm ${s.style}`);
    let r: Shot;
    try { r = resolveShot(s, shots); } catch (e) { errs.push((e as Error).message); continue; }
    if (!r.prompt?.trim()) errs.push(`shot ${s.id}: prompt missing`);
    if (r.kind === 'i2v' && !r.image?.background) errs.push(`shot ${s.id}: i2v needs image.background`);
    if (r.kind === 't2v' && r.image) errs.push(`shot ${s.id}: t2v must not have an image`);
    for (const l of r.image?.layers ?? []) {
      if (!(l.height > 0 && l.height <= 1) || !(l.x >= 0 && l.x <= 1)) errs.push(`shot ${s.id}: layer ${l.file} height/x must be fractions of the frame`);
    }
    if (/\b(text|caption|subtitle|logo|written)\b/i.test(r.prompt ?? '') && !/\bno text\b/i.test(r.prompt ?? '')) errs.push(`shot ${s.id}: prompt asks for on-screen text`);
  }
  if (!shotIds.has(cands.smoke?.shot)) errs.push(`smoke.shot ${cands.smoke?.shot} is not a shot id`);
  if (cands.smoke && (cands.smoke.length - 1) % 4) errs.push('smoke.length must be 4n+1 frames');
  return errs;
}

export type Job = { candidate: string; shot: string; seed: number };

/** Same expansion as kaggle/video_bench.py jobs_for(). */
export function benchJobs(cands: Candidates, shots: Shots, mode: 'full' | 'smoke' = 'full'): Job[] {
  const out: Job[] = [];
  for (const c of cands.candidates.filter((x) => x.active !== false)) {
    if (mode === 'smoke') {
      const s = resolveShot(shots.shots.find((x) => x.id === cands.smoke.shot)!, shots);
      if (c.kinds.includes(s.kind)) out.push({ candidate: c.id, shot: s.id, seed: cands.smoke.seed });
      continue;
    }
    for (const raw of shots.shots) {
      const s = resolveShot(raw, shots);
      if (!c.kinds.includes(s.kind)) continue;
      for (const seed of cands.seeds) out.push({ candidate: c.id, shot: s.id, seed });
    }
  }
  return out;
}

/** Brand-asset files (relative to $MEDIA_ROOT/brand-assets) the shots need, de-duplicated. */
export function stillsNeeded(shots: Shots): string[] {
  const set = new Set<string>();
  for (const raw of shots.shots) {
    const s = resolveShot(raw, shots);
    if (!s.image) continue;
    set.add(s.image.background);
    for (const l of s.image.layers) set.add(l.file);
  }
  for (const p of set) if (p.includes('..') || p.startsWith('/')) throw new Error(`unsafe brand-asset path ${p}`);
  return [...set].sort();
}

/** Kaggle dataset uploads skip subfolders, so stills are packed flat (same rule as flat_name in Python). */
export const flatName = (rel: string) => rel.replaceAll('/', '__');

/** The packed candidates.json: --only and --smoke applied. */
export function packCandidates(cands: Candidates, opts: { only?: string[]; smoke?: boolean }): Candidates {
  const out: Candidates = JSON.parse(JSON.stringify(cands));
  if (opts.only) {
    const unknown = opts.only.filter((id) => !out.candidates.some((c) => c.id === id));
    if (unknown.length) throw new Error(`--only names unknown candidates: ${unknown.join(', ')}`);
    for (const c of out.candidates) c.active = opts.only.includes(c.id);
  }
  out.mode = opts.smoke ? 'smoke' : 'full';
  return out;
}

/** The packed shots.json carries the brand style read from brand-bible.yaml. */
export const packShots = (shots: Shots, style: StyleText): Shots => ({ ...shots, brand_style: style });
