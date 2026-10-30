import React from 'react';
import { Composition } from 'remotion';
import { FPS, type ShortProps } from './props';
import { UrduShort } from './UrduShort';


// Placeholder defaults only so the composition registers; real props always come from scripts.
const defaults: ShortProps = {
  mode: 'sample', episode_id: '00000000-placeholder', title_ur: 'نمونہ', duration_s: 10, lines: [],
  end_card: { url: 'https://textbook.com.pk', cta_ur: '', seconds: 2 }, audio: null,
  cast: { ustani: 'استانی', shagird: 'شاگرد' },
  brand: {
    colors: { primary: '#1f6f5c', primary_dark: '#154b3e', accent: '#b8551d', background: '#ffffff', panel: '#eef3f1', ink: '#132a24' },
    safe_zone: { top: 250, bottom: 420, sides: 60 },
    captions: { size_px: 68, line_height: 1.9, max_words_per_line: 4, max_lines: 2, stroke_px: 6 },
    font_file: 'fonts/NotoNastaliqUrdu-Regular.woff2',
  },
};

export const RemotionRoot: React.FC = () => (
  <Composition
    id="UrduShort"
    component={UrduShort}
    width={1080}
    height={1920}
    fps={FPS}
    durationInFrames={defaults.duration_s * FPS}
    defaultProps={defaults}
    calculateMetadata={({ props }) => ({ durationInFrames: Math.round(props.duration_s * FPS) })}
  />
);
