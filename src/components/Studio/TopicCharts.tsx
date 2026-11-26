/**
 * Mounts a topic's charts (specs/studio/charts, via studio-index.json) after the first table under the heading
 * named by `afterHeading` (`afterHeadingUr` on Urdu pages), with no MDX edit. If the heading is not
 * found the chart renders below the topic content instead.
 */
import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import Chart, { type ChartData } from './Chart';
import { useStudioIndex } from './useStudioIndex';

type Slot = { charts?: ChartData[] };
type Mount = { chart: ChartData; el: HTMLElement | null };

const norm = (t: string | null | undefined) => (t ?? '').replace(/[​-‏‪-‮]/g, '').replace(/\s+/g, ' ').trim();

export default function TopicCharts({ courseCode, unitNo, topicNo, locale }: { courseCode: string; unitNo: number; topicNo: number; locale: 'en' | 'ur' }): React.ReactElement | null {
  const index = useStudioIndex();
  const [mounts, setMounts] = useState<Mount[]>([]);
  const charts = (index?.[`${courseCode.toLowerCase()}/${unitNo}/${topicNo}`] as Slot | undefined)?.charts;

  useEffect(() => {
    if (!charts?.length || typeof document === 'undefined') { setMounts([]); return undefined; }
    const created: HTMLElement[] = [];
    const headings = Array.from(document.querySelectorAll<HTMLElement>('.markdown h2, .markdown h3, .markdown h4'));
    const next: Mount[] = charts.map((chart) => {
      const wanted = norm(locale === 'ur' ? chart.afterHeadingUr : chart.afterHeading);
      const h = wanted ? headings.find((x) => norm(x.textContent) === wanted) : undefined;
      if (!h) return { chart, el: null };
      const el = document.createElement('div');
      el.setAttribute('data-studio-chart', String(chart.topic));
      // After the first table in the heading's section (the data the chart draws), else after the heading.
      let anchor: Element = h;
      for (let n = h.nextElementSibling; n && !/^H[1-4]$/.test(n.tagName); n = n.nextElementSibling) {
        if (n.tagName === 'TABLE' || n.querySelector('table')) { anchor = n; break; }
      }
      anchor.after(el);
      created.push(el);
      return { chart, el };
    });
    setMounts(next);
    return () => { for (const el of created) el.remove(); setMounts([]); };
  }, [charts, locale]);

  if (!mounts.length) return null;
  return (
    <>
      {mounts.map((m, i) => {
        const node = <Chart key={i} chart={m.chart} locale={locale} />;
        return m.el ? createPortal(node, m.el, `c${i}`) : node;
      })}
    </>
  );
}
