/**
 * Mirror an Urdu figure variant's layout for right-to-left reading.
 *
 * Style guide v4.1 (Art. III.9a): a `.ur.svg` is not finished when its labels
 * are translated. An Urdu reader reads right to left, so a timeline drawn
 * left to right tells them stage 5 happened first, and a table whose row-label
 * column sits leftmost contradicts the HTML table beside it on the same page.
 *
 * WHY COORDINATE MIRRORING AND NOT A TRANSFORM. The obvious implementation is
 * to wrap the drawing in `<g transform="translate(W,0) scale(-1,1)">`. That
 * mirrors the glyphs too, producing back-to-front Urdu, and every `<text>`
 * would need a counter-transform. Rewriting the coordinates leaves text
 * upright by construction and keeps the file readable and diffable.
 *
 * WHAT IS DELIBERATELY NOT MIRRORED:
 *   - `<defs>` and `<marker>` contents, which live in their own coordinate
 *     space; mirroring an arrowhead's own path turns it inside out. Markers
 *     follow their path's direction automatically once the path is reversed.
 *   - `y` coordinates. Vertical reading order is unchanged by RTL.
 *
 * Usage:  node scripts/mirror-figure-rtl.mjs <file.ur.svg> [--check]
 *         --check reports whether the file would change, and writes nothing.
 */
import { readFileSync, writeFileSync } from 'node:fs';

/** Round to 2dp and drop a trailing ".00", so mirrored files stay diffable. */
const n = (v) => {
  const r = Math.round(v * 100) / 100;
  return Number.isInteger(r) ? String(r) : String(r);
};

export function mirrorSvg(source) {
  const vb = /viewBox="\s*([\d.-]+)\s+([\d.-]+)\s+([\d.-]+)\s+([\d.-]+)\s*"/.exec(source);
  if (!vb) throw new Error('no viewBox');
  const [minX, , width] = [Number(vb[1]), Number(vb[2]), Number(vb[3])];
  const flip = (x) => minX + minX + width - x;

  // Split out the regions whose coordinates must be left alone.
  const protectedRanges = [];
  for (const m of source.matchAll(/<(defs|marker)\b[\s\S]*?<\/\1>/g)) {
    protectedRanges.push([m.index, m.index + m[0].length]);
  }
  const isProtected = (i) => protectedRanges.some(([a, b]) => i >= a && i < b);

  let out = source;

  // Work right-to-left through the string so earlier indices stay valid.
  const edits = [];
  const push = (start, end, text) => edits.push({ start, end, text });

  for (const m of source.matchAll(/<(rect|circle|ellipse|line|text|path|polygon|polyline|image|use|tspan)\b([^>]*)>/g)) {
    if (isProtected(m.index)) continue;
    const tag = m[1];
    let attrs = m[2];
    const before = attrs;

    const num = (name, fn) => {
      attrs = attrs.replace(new RegExp(`(\\b${name}=")([-\\d.]+)(")`), (_, a, v, c) => a + n(fn(Number(v))) + c);
    };

    if (tag === 'rect' || tag === 'image' || tag === 'use') {
      const w = Number((/\bwidth="([-\d.]+)"/.exec(attrs) || [, 0])[1]);
      num('x', (x) => flip(x) - w);
    } else if (tag === 'circle' || tag === 'ellipse') {
      num('cx', flip);
    } else if (tag === 'line') {
      num('x1', flip);
      num('x2', flip);
    } else if (tag === 'text' || tag === 'tspan') {
      num('x', flip);
      if (/text-anchor="/.test(attrs)) {
        attrs = attrs.replace(/text-anchor="(start|end)"/, (_, a) => `text-anchor="${a === 'start' ? 'end' : 'start'}"`);
      } else if (/\bx="/.test(attrs)) {
        // No attribute means `start`, which after mirroring must become `end` -
        // otherwise the label keeps growing away from its anchor and runs off
        // the far edge. Found by measuring real glyph extents; getBBox against
        // the viewBox is not enough on its own, because the overflow is only
        // visible once the anchor is wrong AND the string is long.
        attrs += ' text-anchor="end"';
      }
    } else if (tag === 'polygon' || tag === 'polyline') {
      attrs = attrs.replace(/(\bpoints=")([^"]+)(")/, (_, a, pts, c) => {
        const flipped = pts.trim().split(/\s+/).map((pair) => {
          const [x, y] = pair.split(',').map(Number);
          return `${n(flip(x))},${n(y)}`;
        }).join(' ');
        return a + flipped + c;
      });
    }

    // A translated element (a rotated axis label, a grouped badge) carries its
    // position in the transform rather than in x, so mirroring x alone leaves
    // it on the wrong side. Only the translate's x moves; the rotation is left
    // as authored, since a vertical Urdu label's reading direction is a
    // typographic convention rather than a consequence of page direction.
    attrs = attrs.replace(/(\btransform="[^"]*translate\()\s*([-\d.]+)([\s,])/, (_, a, x, sep) => a + n(flip(Number(x))) + sep);

    if (tag === 'path') {
      attrs = attrs.replace(/(\bd=")([^"]+)(")/, (_, a, d, c) => a + mirrorPath(d, flip) + c);
    }

    if (attrs !== before) push(m.index, m.index + m[0].length, `<${tag}${attrs}>`);
  }

  for (const e of edits.sort((x, y) => y.start - x.start)) {
    out = out.slice(0, e.start) + e.text + out.slice(e.end);
  }
  return out;
}

/**
 * Mirror a path's x coordinates. Absolute commands get `flip(x)`; relative
 * ones only need their x deltas negated, since a delta has no origin.
 * Arc flags are positional and must not be treated as coordinates, so `A`/`a`
 * are handled explicitly rather than by a generic number sweep.
 */
function mirrorPath(d, flip) {
  const tokens = d.match(/[A-Za-z]|[-+]?[\d.]+(?:e[-+]?\d+)?/gi) || [];
  const out = [];
  let cmd = '';
  let i = 0;
  const take = (k) => tokens.slice(i, i + k).map(Number);
  while (i < tokens.length) {
    if (/[A-Za-z]/.test(tokens[i])) { cmd = tokens[i]; out.push(cmd); i += 1; continue; }
    const abs = cmd === cmd.toUpperCase();
    const fx = (x) => (abs ? flip(x) : -x);
    switch (cmd.toUpperCase()) {
      case 'M': case 'L': case 'T': {
        const [x, y] = take(2); out.push(n(fx(x)), n(y)); i += 2; break;
      }
      case 'H': { const [x] = take(1); out.push(n(fx(x))); i += 1; break; }
      case 'V': { const [y] = take(1); out.push(n(y)); i += 1; break; }
      case 'C': { const v = take(6); out.push(n(fx(v[0])), n(v[1]), n(fx(v[2])), n(v[3]), n(fx(v[4])), n(v[5])); i += 6; break; }
      case 'S': case 'Q': { const v = take(4); out.push(n(fx(v[0])), n(v[1]), n(fx(v[2])), n(v[3])); i += 4; break; }
      case 'A': {
        const v = take(7);
        // rx ry rotation large-arc sweep x y - sweep flips with the mirror.
        out.push(n(v[0]), n(v[1]), n(-v[2]), n(v[3]), n(v[4] ? 0 : 1), n(fx(v[5])), n(v[6]));
        i += 7; break;
      }
      case 'Z': break;
      default: out.push(tokens[i]); i += 1;
    }
  }
  return out.join(' ').replace(/([A-Za-z]) /g, '$1').replace(/ ([A-Za-z])/g, '$1').replace(/(\d)([A-Za-z])/g, '$1 $2');
}

const [, , file, flag] = process.argv;
if (file) {
  const src = readFileSync(file, 'utf8');
  const mirrored = mirrorSvg(src);
  if (flag === '--check') {
    console.log(`${file}: ${mirrored === src ? 'unchanged' : 'would change'}`);
  } else {
    writeFileSync(file, mirrored);
    console.log(`mirrored ${file}`);
  }
}
