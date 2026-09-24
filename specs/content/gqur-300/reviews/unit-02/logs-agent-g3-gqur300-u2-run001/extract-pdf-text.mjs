// Minimal PDF text extractor: parses indirect objects, inflates Flate streams,
// builds per-font ToUnicode maps from page resources, decodes Tj/TJ strings.
// Good enough for verification reading; not a general PDF library.
import { readFileSync, writeFileSync } from 'node:fs';
import { inflateSync } from 'node:zlib';

const raw = readFileSync(process.argv[2]).toString('latin1');

// 1. All indirect objects
const objects = new Map(); // num -> { dict, stream }  (dict = text between << >> of the object body pre-stream)
const objRe = /(\d+)\s+(\d+)\s+obj\b/g;
let m;
const objSpans = [];
while ((m = objRe.exec(raw))) objSpans.push({ num: Number(m[1]), start: m.index, headerEnd: objRe.lastIndex });
for (let i = 0; i < objSpans.length; i++) {
  const end = i + 1 < objSpans.length ? objSpans[i + 1].start : raw.length;
  const body = raw.slice(objSpans[i].headerEnd, end);
  const endobj = body.lastIndexOf('endobj');
  const bodyText = endobj === -1 ? body : body.slice(0, endobj);
  const streamIdx = bodyText.indexOf('stream');
  let dict = bodyText, stream = null;
  if (streamIdx !== -1) {
    dict = bodyText.slice(0, streamIdx);
    let s = streamIdx + 6;
    if (bodyText[s] === '\r') s++;
    if (bodyText[s] === '\n') s++;
    const e = bodyText.indexOf('endstream', s);
    stream = bodyText.slice(s, e === -1 ? undefined : e);
  }
  objects.set(objSpans[i].num, { dict, stream });
}
const getObj = (n) => objects.get(n);

function inflateIfFlate(obj) {
  if (!obj || obj.stream == null) return null;
  if (!/\/FlateDecode/.test(obj.dict)) return null;
  try { return inflateSync(Buffer.from(obj.stream, 'latin1')).toString('latin1'); } catch { return null; }
}

// 2. ToUnicode maps per font object number
function utf16be(hex) {
  const pairs = hex.replace(/(..)/g, '$1 ').trim().split(' ');
  let out = '';
  for (let i = 0; i + 1 < pairs.length; i += 2) out += String.fromCharCode((parseInt(pairs[i], 16) << 8) | parseInt(pairs[i + 1], 16));
  return out;
}
function parseCMap(text) {
  const map = new Map();
  if (!text) return map;
  for (const mm of text.matchAll(/beginbfchar([\s\S]*?)endbfchar/g)) {
    for (const p of mm[1].matchAll(/<([0-9A-Fa-f]+)>\s*<([0-9A-Fa-f]+)>/g)) {
      map.set(parseInt(p[1], 16), utf16be(p[2]));
    }
  }
  for (const mm of text.matchAll(/beginbfrange([\s\S]*?)endbfrange/g)) {
    for (const p of mm[1].matchAll(/<([0-9A-Fa-f]+)>\s*<([0-9A-Fa-f]+)>\s*<([0-9A-Fa-f]+)>/g)) {
      const lo = parseInt(p[1], 16), hi = parseInt(p[2], 16);
      const dest = p[3].length <= 4 ? parseInt(p[3], 16) : null;
      if (dest == null) continue; // array-form or multi-codepoint destination: skipped
      for (let c = lo; c <= hi && c - lo < 65536; c++) map.set(c, String.fromCodePoint(dest + (c - lo)));
    }
  }
  return map;
}
const fontMaps = new Map(); // font obj num -> Map
for (const [num, obj] of objects) {
  if (!/\/Font/.test(obj.dict) && !/\/Type\s*\/Font/.test(obj.dict)) continue;
  const tu = /\/ToUnicode\s+(\d+)\s+\d+\s+R/.exec(obj.dict);
  if (tu) fontMaps.set(num, parseCMap(inflateIfFlate(getObj(Number(tu[1])))));
}

// 3. Resource name -> font object, per resource dict text
function resourceFonts(dictText) {
  const fonts = new Map();
  for (const fm of dictText.matchAll(/\/Font\s*<<([\s\S]*?)>>/g)) {
    for (const p of fm[1].matchAll(/\/([A-Za-z0-9]+)\s+(\d+)\s+\d+\s+R/g)) fonts.set(p[1], Number(p[2]));
  }
  return fonts;
}

// 4. Decode content streams
function decodeString(bytes, map) {
  let out = '';
  if (map && map.size) {
    for (let i = 0; i < bytes.length; i += 2) {
      const code = (bytes.charCodeAt(i) << 8) | (bytes.charCodeAt(i + 1) || 0);
      out += map.get(code) ?? '';
    }
  } else {
    for (let i = 0; i < bytes.length; i++) {
      const code = bytes.charCodeAt(i);
      out += map?.get(code) ?? (code >= 32 && code < 127 ? String.fromCharCode(code) : '');
    }
  }
  return out;
}
function unescapePdf(s) {
  return s.replace(/\\n/g, '\n').replace(/\\r/g, '\r').replace(/\\t/g, '\t').replace(/\\([()\\])/g, '$1').replace(/\\([0-7]{1,3})/g, (_, o) => String.fromCharCode(parseInt(o, 8)));
}

// 3b. Map content-stream object -> { fontName -> fontObjNum } via page objects
const contentFonts = new Map(); // content obj num -> Map(name -> font obj num)
for (const [, obj] of objects) {
  if (!/\/Type\s*\/Page\b/.test(obj.dict)) continue;
  const contents = [];
  for (const cm of obj.dict.matchAll(/\/Contents\s+(\d+)\s+\d+\s+R/g)) contents.push(Number(cm[1]));
  for (const cm of obj.dict.matchAll(/\/Contents\s*\[([\s\S]*?)\]/g)) {
    for (const r of cm[1].matchAll(/(\d+)\s+\d+\s+R/g)) contents.push(Number(r[1]));
  }
  if (!contents.length) continue;
  let resText = '';
  const resRef = /\/Resources\s+(\d+)\s+\d+\s+R/.exec(obj.dict);
  if (resRef) resText = getObj(Number(resRef[1]))?.dict ?? '';
  const inline = /\/Resources\s*(<<[\s\S]*?>>)/.exec(obj.dict);
  if (inline) resText += ' ' + inline[1];
  const fonts = resourceFonts(resText);
  for (const c of contents) {
    if (!contentFonts.has(c)) contentFonts.set(c, new Map());
    for (const [k, v] of fonts) contentFonts.get(c).set(k, v);
  }
}

const pages = [];
for (const [num, obj] of objects) {
  if (obj.stream == null) continue;
  const content = inflateIfFlate(obj);
  if (!content || !/\bTj\b|\bTJ\b/.test(content)) continue;
  const fonts = contentFonts.get(num) ?? resourceFonts(obj.dict);
  let currentMap = null;
  let text = '';
  const tokenRe = /\/([A-Za-z0-9]+)\s+[\d.]+\s+Tf|\(((?:\\.|[^\\()])*)\)\s*Tj|<([0-9A-Fa-f]+)>\s*Tj|\[((?:[^\]\\]|\\.)*)\]\s*TJ/g;
  let t;
  while ((t = tokenRe.exec(content))) {
    if (t[1]) { const f = fonts.get(t[1]); currentMap = f != null ? (fontMaps.get(f) ?? null) : null; continue; }
    if (t[2] != null) { text += decodeString(unescapePdf(t[2]), currentMap) + ' '; continue; }
    if (t[3] != null) {
      const bytes = t[3].replace(/(..)/g, '$1 ').trim().split(' ').map((h) => String.fromCharCode(parseInt(h, 16))).join('');
      text += decodeString(bytes, currentMap) + ' '; continue;
    }
    if (t[4] != null) {
      for (const sm of t[4].matchAll(/\(((?:\\.|[^\\()])*)\)|<([0-9A-Fa-f]+)>/g)) {
        if (sm[1] != null) text += decodeString(unescapePdf(sm[1]), currentMap);
        if (sm[2] != null) {
          const bytes = sm[2].replace(/(..)/g, '$1 ').trim().split(' ').map((h) => String.fromCharCode(parseInt(h, 16))).join('');
          text += decodeString(bytes, currentMap);
        }
      }
      text += ' ';
    }
  }
  if (text.trim()) pages.push(text);
}

writeFileSync(process.argv[3], pages.join('\n\n==== PAGE BREAK ====\n\n'));
console.log('content streams decoded:', pages.length, 'chars:', pages.join('').length);
