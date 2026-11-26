/**
 * Study Studio chart (Feature 034 T025, #812): a dependency-free, accessible SVG bar or line chart
 * with a data table under it. Data comes from specs/studio/charts/<course>/unit-NN.json through
 * static/studio-index.json; no topic MDX is edited. On Urdu pages the x axis is mirrored so it
 * reads right to left, and the Urdu labels are used.
 */
import React, { useEffect, useRef } from 'react';
import styles from './chart.module.css';

type Locale = 'en' | 'ur';
type Bil = { en: string; ur: string };
export type ChartData = {
  topic: number;
  afterHeading: string;
  afterHeadingUr: string | null;
  type: 'bar' | 'line';
  title: Bil;
  xLabel: Bil;
  yLabel: Bil;
  series: { label: Bil; points: [string | number, number][] }[];
  source: string;
};

const W = 640;
const H = 360;
const M = { top: 28, right: 24, bottom: 62, left: 64 };
const T = { table: { en: 'Data table', ur: 'ڈیٹا ٹیبل' } };

/** A round upper bound and tick step for the y axis. */
export function niceScale(max: number): { top: number; step: number } {
  if (!(max > 0)) return { top: 1, step: 0.25 };
  const raw = max / 5;
  const pow = 10 ** Math.floor(Math.log10(raw));
  const f = raw / pow;
  const step = (f <= 1 ? 1 : f <= 2 ? 2 : f <= 5 ? 5 : 10) * pow;
  return { top: Math.ceil(max / step) * step, step };
}

const fmt = (n: number) => (Number.isInteger(n) ? String(n) : String(Math.round(n * 100) / 100));

export default function Chart({ chart, locale }: { chart: ChartData; locale: Locale }): React.ReactElement {
  const rtl = locale === 'ur';
  const detailsRef = useRef<HTMLDetailsElement>(null);
  // A closed <details> hides its content from print, so open it for printing and restore it after.
  useEffect(() => {
    let was = false;
    const before = () => { was = detailsRef.current?.open ?? false; if (detailsRef.current) detailsRef.current.open = true; };
    const after = () => { if (detailsRef.current) detailsRef.current.open = was; };
    window.addEventListener('beforeprint', before);
    window.addEventListener('afterprint', after);
    return () => { window.removeEventListener('beforeprint', before); window.removeEventListener('afterprint', after); };
  }, []);
  const title = chart.title[locale];
  const cats = chart.series[0].points.map((p) => p[0]);
  const lookup = chart.series.map((s) => new Map(s.points.map(([x, y]) => [String(x), y])));
  const max = Math.max(...chart.series.flatMap((s) => s.points.map((p) => p[1])));
  const { top, step } = niceScale(max);
  const plotW = W - M.left - M.right;
  const plotH = H - M.top - M.bottom;
  // Left-to-right layout coordinates, mirrored for Urdu. `px` flips an x position; `anchor` flips text-anchor.
  const px = (v: number) => (rtl ? W - v : v);
  const anchor = (a: 'start' | 'end'): 'start' | 'end' => (rtl ? (a === 'start' ? 'end' : 'start') : a);
  const py = (v: number) => M.top + plotH - (v / top) * plotH;
  const band = plotW / cats.length;
  const cx = (i: number) => M.left + band * (i + 0.5);
  const ticks: number[] = [];
  for (let v = 0; v <= top + step / 1000; v += step) ticks.push(Math.round(v * 1e6) / 1e6);
  const n = chart.series.length;
  const groupW = band * 0.7;

  return (
    <figure className={styles.chart} lang={locale} dir={rtl ? 'rtl' : 'ltr'} data-testid="studio-chart">
      <figcaption className={styles.title}>{title}</figcaption>
      <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label={title} className={styles.svg} preserveAspectRatio="xMidYMid meet">
        <title>{title}</title>
        {ticks.map((t) => (
          <g key={t}>
            <line x1={px(M.left)} x2={px(W - M.right)} y1={py(t)} y2={py(t)} className={t === 0 ? styles.axis : styles.grid} />
            <text x={px(M.left - 8)} y={py(t) + 4} textAnchor={anchor('end')} className={styles.tick}>{fmt(t)}</text>
          </g>
        ))}
        <line x1={px(M.left)} x2={px(M.left)} y1={M.top} y2={M.top + plotH} className={styles.axis} />
        {cats.map((c, i) => (
          <text key={String(c)} x={px(cx(i))} y={M.top + plotH + 18} textAnchor="middle" className={styles.tick}>{String(c)}</text>
        ))}
        <text x={px(M.left + plotW / 2)} y={H - 10} textAnchor="middle" className={styles.axisLabel}>{chart.xLabel[locale]}</text>
        <text x={0} y={0} transform={`translate(${px(16)} ${M.top + plotH / 2}) rotate(-90)`} textAnchor="middle" className={styles.axisLabel}>{chart.yLabel[locale]}</text>
        {chart.type === 'bar' &&
          chart.series.map((s, si) =>
            cats.map((c, i) => {
              const y = lookup[si].get(String(c));
              if (y === undefined) return null;
              const bw = groupW / n;
              const x0 = cx(i) - groupW / 2 + si * bw;
              const left = rtl ? W - (x0 + bw) : x0;
              return (
                <g key={`${si}-${String(c)}`}>
                  <rect x={left} y={py(y)} width={bw - 2} height={M.top + plotH - py(y)} className={styles[`s${si % 2}`]} />
                  <text x={left + (bw - 2) / 2} y={py(y) - 5} textAnchor="middle" className={styles.value}>{fmt(y)}</text>
                </g>
              );
            }),
          )}
        {chart.type === 'line' &&
          chart.series.map((s, si) => {
            const pts = cats.map((c, i) => [px(cx(i)), lookup[si].get(String(c))] as const).filter((p): p is readonly [number, number] => p[1] !== undefined);
            return (
              <g key={si}>
                <polyline points={pts.map(([x, y]) => `${x},${py(y)}`).join(' ')} className={styles[`l${si % 2}`]} fill="none" />
                {pts.map(([x, y]) => (
                  <g key={x}>
                    <circle cx={x} cy={py(y)} r={4} className={styles[`d${si % 2}`]} />
                    <text x={x} y={py(y) - 9} textAnchor="middle" className={styles.value}>{fmt(y)}</text>
                  </g>
                ))}
              </g>
            );
          })}
      </svg>
      {n > 1 && (
        <ul className={styles.legend}>
          {chart.series.map((s, si) => (
            <li key={si}><span className={`${styles.swatch} ${styles[`k${si % 2}`]}`} aria-hidden="true" />{s.label[locale]}</li>
          ))}
        </ul>
      )}
      <details ref={detailsRef} className={styles.details}>
        <summary>{T.table[locale]}</summary>
        <table>
          <caption>{title}</caption>
          <thead>
            <tr>
              <th scope="col">{chart.xLabel[locale]}</th>
              {chart.series.map((s, si) => <th key={si} scope="col">{s.label[locale]}</th>)}
            </tr>
          </thead>
          <tbody>
            {cats.map((c) => (
              <tr key={String(c)}>
                <th scope="row">{String(c)}</th>
                {chart.series.map((_, si) => <td key={si}>{lookup[si].has(String(c)) ? fmt(lookup[si].get(String(c)) as number) : ''}</td>)}
              </tr>
            ))}
          </tbody>
        </table>
      </details>
    </figure>
  );
}
