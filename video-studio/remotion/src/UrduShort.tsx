import { loadFont } from '@remotion/fonts';
import React from 'react';
import { AbsoluteFill, Audio, Img, interpolate, Sequence, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';
import { chunk } from './align';
import type { CaptionLine, ShortProps, Viseme } from './props';
import { POSE_FADE, Puppet, type PoseSpan } from './Puppet';

const URDU = 'Noto Nastaliq Urdu';
let fontRequested = '';
function useUrduFont(file: string) {
  if (fontRequested !== file) {
    fontRequested = file;
    loadFont({ family: URDU, url: staticFile(file), weight: '400' });
  }
}

export { chunk };

const Captions: React.FC<{ line: CaptionLine; props: ShortProps }> = ({ line, props }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const c = props.brand.captions;
  let rows: string[];
  if (line.cues?.length) {
    const now = line.from_s + frame / fps;
    const cue = line.cues.find((q) => now < q.to_s) ?? line.cues[line.cues.length - 1];
    rows = now < cue.from_s ? [] : chunk(cue.text_ur, c.max_words_per_line, 1e6)[0] ?? [];
  } else {
    const windows = chunk(line.text_ur, c.max_words_per_line, c.max_lines);
    const total = (line.to_s - line.from_s) * fps;
    rows = windows[Math.min(windows.length - 1, Math.floor((frame / total) * windows.length))];
  }
  if (!rows.length) return null;
  return (
    <div
      dir="rtl"
      lang="ur"
      style={{
        position: 'absolute',
        left: props.brand.safe_zone.sides,
        right: props.brand.safe_zone.sides,
        bottom: props.brand.safe_zone.bottom,
        textAlign: 'center',
      }}
    >
      {/* A dark plate, not a text stroke: a stroke over a light set left the white fill invisible
          (Phase 0 stills, 2026-10-26). The plate reads on any background, B-roll included. */}
      <div
        style={{
          display: 'inline-block',
          background: 'rgba(19, 42, 36, 0.88)',
          borderRadius: 28,
          padding: '8px 40px 28px',
          fontFamily: URDU,
          fontSize: c.size_px,
          lineHeight: c.line_height,
          color: '#ffffff',
        }}
      >
        {rows.map((row, i) => <div key={i}>{row}</div>)}
      </div>
    </div>
  );
};

const Placeholder: React.FC<{ name: string; color: string; active: boolean; side: 'left' | 'right' }> = ({ name, color, active, side }) => {
  const frame = useCurrentFrame();
  const bob = active ? Math.sin(frame / 4) * 6 : 0;
  return (
    <div style={{ position: 'absolute', top: 760 + bob, [side]: 110, width: 340, textAlign: 'center' }}>
      <div style={{ width: 300, height: 300, margin: '0 auto', borderRadius: '50%', background: color, opacity: active ? 1 : 0.55 }} />
      <div dir="rtl" lang="ur" style={{ fontFamily: URDU, fontSize: 48, color: '#132a24', marginTop: 24 }}>{name}</div>
    </div>
  );
};

const EndCard: React.FC<{ props: ShortProps }> = ({ props }) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 10], [0, 1], { extrapolateRight: 'clamp' });
  const { colors } = props.brand;
  return (
    <AbsoluteFill style={{ background: colors.primary, opacity, alignItems: 'center', justifyContent: 'center', padding: 80 }}>
      <div dir="rtl" lang="ur" style={{ fontFamily: URDU, fontSize: 64, lineHeight: 1.9, color: '#ffffff', textAlign: 'center' }}>
        {props.end_card.cta_ur}
      </div>
      <div dir="ltr" style={{ unicodeBidi: 'isolate', fontFamily: 'sans-serif', fontSize: 44, fontWeight: 600, color: '#ffffff', marginTop: 40, textAlign: 'center', overflowWrap: 'anywhere', maxWidth: '100%' }}>
        {props.end_card.url.replace(/^https?:\/\//, '')}
      </div>
    </AbsoluteFill>
  );
};

/** Puppet height and feet line on the 1080x1920 frame; captions sit over the lower legs. */
const PUPPET_H = 1180;
const FEET_Y = 1880;

/** A character's gestures (its own lines, inset so the fades finish inside the line) and mouth now. */
const Cast: React.FC<{ props: ShortProps; who: 'ustani' | 'shagird'; centerX: number }> = ({ props, who, centerX }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const own = props.lines.filter((l) => l.speaker === who);
  const spans: PoseSpan[] = own.map((l) => ({
    from: Math.round(l.from_s * fps) + 2, to: Math.max(Math.round(l.from_s * fps) + 2 + 2 * POSE_FADE, Math.round(l.to_s * fps) - 2), pose: l.gesture ?? 'idle',
  }));
  const line = own.find((l) => frame >= Math.round(l.from_s * fps) && frame < Math.round(l.to_s * fps));
  const mouth = ((line?.mouth ?? '')[frame - Math.round((line?.from_s ?? 0) * fps)] ?? 'X') as Viseme;
  return (
    <Puppet rig={props.puppets![who]} seed={`${props.episode_id}-${who}`} spans={spans} mouth={line ? mouth : 'X'}
      active={!!line} centerX={centerX} bottom={FEET_Y} height={PUPPET_H} />
  );
};

export const UrduShort: React.FC<ShortProps> = (props) => {
  useUrduFont(props.brand.font_file);
  const { fps } = useVideoConfig();
  const frame = useCurrentFrame();
  const { colors, safe_zone } = props.brand;
  const now = frame / fps;
  const speaking = props.lines.find((l) => now >= l.from_s && now < l.to_s)?.speaker;
  const endFrom = Math.round((props.duration_s - props.end_card.seconds) * fps);
  return (
    <AbsoluteFill style={{ background: colors.background }}>
      {props.set ? <Img src={staticFile(props.set)} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} /> : null}
      {props.audio ? <Audio src={staticFile(props.audio)} /> : null}
      <div
        dir="rtl"
        lang="ur"
        style={{
          position: 'absolute', top: safe_zone.top, left: safe_zone.sides, right: safe_zone.sides,
          background: colors.panel, borderRadius: 32, padding: '24px 36px', textAlign: 'center',
          fontFamily: URDU, fontSize: 72, lineHeight: 1.9, color: colors.primary_dark,
        }}
      >
        {props.title_ur}
      </div>
      {props.puppets ? (
        <>
          {/* Ustani on the right, Bilal on the left: the order an RTL viewer reads the exchange. */}
          <Cast props={props} who="shagird" centerX={290} />
          <Cast props={props} who="ustani" centerX={800} />
        </>
      ) : (
        <>
          <Placeholder name={props.cast.ustani} color={colors.primary} active={speaking === 'ustani'} side="right" />
          <Placeholder name={props.cast.shagird} color={colors.accent} active={speaking === 'shagird'} side="left" />
        </>
      )}
      {props.lines.map((l) => (
        <Sequence key={l.id} from={Math.round(l.from_s * fps)} durationInFrames={Math.round((l.to_s - l.from_s) * fps)} layout="none">
          {l.audio ? <Audio src={staticFile(l.audio)} /> : null}
          <Captions line={l} props={props} />
        </Sequence>
      ))}
      {props.mode === 'sample' ? (
        <div style={{ position: 'absolute', top: 60, left: -60, transform: 'rotate(-30deg)', background: '#b8551d', color: '#fff', padding: '8px 120px', fontFamily: 'sans-serif', fontSize: 34, fontWeight: 700 }}>SAMPLE</div>
      ) : null}
      <Sequence from={endFrom}>
        <EndCard props={props} />
      </Sequence>
    </AbsoluteFill>
  );
};
