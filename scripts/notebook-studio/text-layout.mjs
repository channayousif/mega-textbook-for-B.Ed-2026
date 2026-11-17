// Feature 029: text layout shared by the Study Studio renderers (audio cards, teaser captions and
// end cards, follow reminder, thumbnails). librsvg/Pango draw the SVG text through sharp.

/** Greedy word wrap by character budget; returns at most maxLines lines (last one ellipsised). */
// Visible length: bidi isolates and marks take no space on screen.
export const vis = (s) => s.replace(/[\u200e\u200f\u2066-\u2069]/g, '').length;

export function wrap(text, budget, maxLines = 3) {
  const lines = [];
  let cur = '';
  for (const w of String(text).split(/[ \t\r\n]+/).filter(Boolean)) { // not \s: NBSP must not split
    if (cur && vis(cur + ' ' + w) > budget) { lines.push(cur); cur = w; } else cur = cur ? `${cur} ${w}` : w;
  }
  if (cur) lines.push(cur);
  if (lines.length > maxLines) { lines.length = maxLines; lines[maxLines - 1] = `${lines[maxLines - 1].replace(/\s+\S*$/, '')} …`; }
  return lines;
}


// librsvg/Pango lose the space on the far (left) side of an English run inside an Urdu line, so
// "Educational Psychology بتاتی" rendered as "بتاتیEducational", and a run split by wrapping lost it
// too. Fix: keep each English run on one line (NBSP between its words) and wrap it in an LTR
// isolate that starts with an NBSP, which Pango draws on the run's left edge.
export function bidiUr(text) {
  // Pad only a side that meets a space or an Urdu letter, not brackets: "(EFMP-301)" stays tight.
  const t = String(text);
  return t.replace(/[A-Za-z][A-Za-z0-9\-.]*(?: [A-Za-z][A-Za-z0-9\-.]*)*/g, (m, at) => {
    const pad = (c) => (c === undefined || /[\s\u0600-\u06FF]/.test(c) ? '\u00a0' : '');
    return `\u2066${pad(t[at - 1])}${m.replace(/ /g, '\u00a0')}${pad(t[at + m.length])}\u2069`;
  });
}
