// T041: a cut puppet. One pose image (cross-faded over the idle pose), then face overlays for the
// eyes and mouth, then any occluder the pose has in front of the face. The head is in the same
// place in every pose (tools/cast/cast_rig.py checks this), so the overlays fit every pose.
import React from 'react';
import { Img, random, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';
import type { Overlay, Pose, Rig, Viseme } from './props';

/** Frames over which a gesture fades in and out. */
export const POSE_FADE = 5;

export interface PoseSpan { from: number; to: number; pose: Pose }

/** Shapes a rig may lack, and the nearest shape it has (Ustani has rest and A for now). */
const FALLBACK: Record<Viseme, Array<'rest' | 'M' | 'E' | 'A' | 'O'>> = {
  X: ['rest'], M: ['M', 'rest'], E: ['E', 'A', 'rest'], A: ['A', 'E', 'rest'], O: ['O', 'A', 'rest'],
};

export function mouthOverlay(rig: Rig, v: Viseme): Overlay {
  for (const k of FALLBACK[v]) { const o = rig.mouths[k]; if (o) return o; }
  return rig.mouths.rest;
}

/** Blink frames: one every 3 to 5 s from a seeded schedule, eyes closed for 3 frames. */
export function isBlinking(frame: number, fps: number, seed: string): boolean {
  let t = Math.round(fps * (1 + 2 * random(`${seed}-0`)));
  for (let i = 1; t <= frame; i++) {
    if (frame < t + 3) return true;
    t += Math.round(fps * (3 + 2 * random(`${seed}-${i}`)));
  }
  return false;
}

/** The gesture showing at a frame and its opacity (fades in and out at the span ends). */
export function poseAt(spans: PoseSpan[], frame: number): { pose: Pose; opacity: number } {
  const s = spans.find((p) => frame >= p.from && frame < p.to);
  if (!s || s.pose === 'idle') return { pose: 'idle', opacity: 0 };
  const opacity = Math.min(1, (frame - s.from + 1) / POSE_FADE, (s.to - frame) / POSE_FADE);
  return { pose: s.pose, opacity };
}

const Layer: React.FC<{ o: Overlay; opacity?: number }> = ({ o, opacity = 1 }) => (
  <Img src={staticFile(o.src)} style={{ position: 'absolute', left: o.x, top: o.y, width: o.w, height: o.h, opacity }} />
);

export const Puppet: React.FC<{
  rig: Rig; seed: string; spans: PoseSpan[]; mouth: Viseme; active: boolean;
  centerX: number; bottom: number; height: number;
}> = ({ rig, seed, spans, mouth, active, centerX, bottom, height }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const [w, h] = rig.canvas;
  const scale = height / h;
  const { pose, opacity } = poseAt(spans, frame);
  const poseSrc = rig.poses[pose];
  const breathe = 1 + 0.005 * Math.sin((2 * Math.PI * frame) / (fps * 3.6) + (seed.length % 7));
  const occluder = pose !== 'idle' ? rig.occluders[pose] : undefined;
  const full = { position: 'absolute' as const, left: 0, top: 0, width: w, height: h };
  return (
    <div
      style={{
        position: 'absolute', left: centerX - (w * scale) / 2, top: bottom - h, width: w, height: h,
        transform: `scale(${scale}) scaleY(${breathe})`, transformOrigin: '0 100%',
        filter: active ? undefined : 'brightness(0.96)',
      }}
    >
      <Img src={staticFile(rig.poses.idle)} style={full} />
      {poseSrc && opacity > 0 ? <Img src={staticFile(poseSrc)} style={{ ...full, opacity }} /> : null}
      <Layer o={isBlinking(frame, fps, seed) ? rig.eyes.closed : rig.eyes.open} />
      <Layer o={mouthOverlay(rig, mouth)} />
      {occluder && opacity > 0 ? <Layer o={occluder} opacity={opacity} /> : null}
    </div>
  );
};
