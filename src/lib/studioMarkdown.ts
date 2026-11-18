/**
 * Tiny Markdown-to-HTML renderer for Studio text assets (Feature 029): the practicum brief and
 * the study guide under static/studio/. Those files are our own reviewed output of
 * scripts/notebook-studio/postprocess-report.mjs, but every character is HTML-escaped first
 * anyway, so the result is safe for dangerouslySetInnerHTML.
 *
 * Supported subset (what Gemini's reports use): ATX headings (rendered one level lower so a
 * report's `#` never competes with the page title), `---` rules, bullet and numbered lists,
 * pipe tables, paragraphs, **bold**, *italic* / _italic_ and `code`.
 */

const esc = (s: string): string =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

function inline(s: string): string {
  return esc(s)
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/(^|[\s(])\*([^*\s][^*]*)\*/g, '$1<em>$2</em>')
    .replace(/(^|[\s(])_([^_\s][^_]*)_/g, '$1<em>$2</em>');
}

const cells = (row: string): string[] => row.trim().replace(/^\||\|$/g, '').split('|').map((c) => c.trim());

export function studioMarkdownToHtml(md: string): string {
  const lines = md.replace(/\r\n/g, '\n').split('\n');
  const out: string[] = [];
  let para: string[] = [];
  let list: { tag: 'ul' | 'ol'; items: string[] } | null = null;

  const flushPara = () => { if (para.length) { out.push(`<p>${inline(para.join(' '))}</p>`); para = []; } };
  const flushList = () => { if (list) { out.push(`<${list.tag}>${list.items.map((i) => `<li>${inline(i)}</li>`).join('')}</${list.tag}>`); list = null; } };
  const flush = () => { flushPara(); flushList(); };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const t = line.trim();
    if (!t) { flush(); continue; }
    const h = t.match(/^(#{1,6})\s+(.*)$/);
    if (h) { flush(); const lvl = Math.min(h[1].length + 1, 6); out.push(`<h${lvl}>${inline(h[2])}</h${lvl}>`); continue; }
    if (/^(-{3,}|\*{3,})$/.test(t)) { flush(); out.push('<hr>'); continue; }
    if (t.startsWith('|') && /^\|?\s*:?-{3,}/.test((lines[i + 1] ?? '').trim())) {
      flush();
      const head = cells(t);
      i += 1;
      const body: string[][] = [];
      while (i + 1 < lines.length && lines[i + 1].trim().startsWith('|')) { i += 1; body.push(cells(lines[i])); }
      out.push(`<div class="studio-table"><table><thead><tr>${head.map((c) => `<th>${inline(c)}</th>`).join('')}</tr></thead><tbody>${
        body.map((r) => `<tr>${r.map((c) => `<td>${inline(c)}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`);
      continue;
    }
    const ul = t.match(/^[*-]\s+(.*)$/);
    const ol = t.match(/^\d+[.)]\s+(.*)$/);
    if (ul || ol) {
      flushPara();
      const tag = ul ? 'ul' : 'ol';
      if (!list || list.tag !== tag) { flushList(); list = { tag, items: [] }; }
      list.items.push((ul ?? ol)![1]);
      continue;
    }
    if (list && /^\s{2,}/.test(line)) { list.items[list.items.length - 1] += ` ${t}`; continue; }
    flushList();
    para.push(t);
  }
  flush();
  return out.join('\n');
}
