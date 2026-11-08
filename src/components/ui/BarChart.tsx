/**
 * A small bar chart in SVG, no chart library. The bars are a picture of the numbers;
 * the numbers themselves are in a visually hidden table (and in each bar's label), so
 * a screen reader gets the data, not a description of shapes. One bar can be
 * highlighted in amber. Bars grow in once, and stay put under reduced motion.
 */
import React from 'react';
import styles from './ui.module.css';

export type Bar = { label: string; value: number; display?: string };

type Props = { data: Bar[]; caption: string; max?: number; highlight?: number; valueLabel?: string; height?: number };

export default function BarChart({ data, caption, max, highlight, valueLabel = 'Value', height = 160 }: Props): React.ReactElement {
  const top = Math.max(max ?? 0, ...data.map((d) => d.value), 1);
  const w = 32;
  const gap = 18;
  const width = data.length * (w + gap) - gap;
  return (
    <figure className={styles.chart}>
      <svg className={styles.chartSvg} viewBox={`0 0 ${Math.max(width, 1)} ${height + 22}`} role="presentation" aria-hidden="true" focusable="false" preserveAspectRatio="xMidYMax meet">
        {data.map((d, i) => {
          const h = Math.max(4, Math.round((d.value / top) * height));
          const x = i * (w + gap);
          return (
            <g key={d.label}>
              <rect x={x} y={0} width={w} height={height} rx={w / 2} className={styles.barTrack} />
              <rect x={x} y={height - h} width={w} height={h} rx={w / 2} className={i === highlight ? styles.barHot : styles.bar} />
              <text x={x + w / 2} y={height + 16} textAnchor="middle" className={styles.barLabel}>{d.label}</text>
            </g>
          );
        })}
      </svg>
      <figcaption className={styles.chartCaption}>{caption}</figcaption>
      <table className="sr-only">
        <caption>{caption}</caption>
        <thead><tr><th scope="col">{caption}</th><th scope="col">{valueLabel}</th></tr></thead>
        <tbody>{data.map((d) => <tr key={d.label}><th scope="row">{d.label}</th><td>{d.display ?? d.value}</td></tr>)}</tbody>
      </table>
    </figure>
  );
}
