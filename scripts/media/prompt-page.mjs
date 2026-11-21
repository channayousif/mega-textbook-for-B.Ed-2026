// Copy-button prompt page for the manual Flow route (Feature 030, T025).
// The owner opens it on the PC, copies each prompt into Flow, and saves each clip to Downloads\gflow-cli.
// Ported from the batch-2 scratchpad builder. Do not import this file from any content gate (FR-018).
const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);

/** items: [{ key, part, prompt, note? }] -> one self-contained HTML page. */
export function promptPage({ title, intro = '', items }) {
  const cards = items.map((it, i) => `<section class="card">
<h2>${esc(it.key)} &middot; shot ${esc(it.part)}</h2>
${it.note ? `<p class="note">${esc(it.note)}</p>` : ''}<pre id="p${i}">${esc(it.prompt)}</pre>
<button type="button" data-for="p${i}">Copy prompt</button>
<p class="save">Save the clip as <code>${esc(`${it.key}_shot-${it.part}.mp4`)}</code> in Downloads\\gflow-cli</p>
</section>`).join('\n');
  return `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<style>
:root{--bg:#f7f4ec;--fg:#1d2b2a;--card:#fff;--accent:#0f6b63;--muted:#5d6b69}
@media (prefers-color-scheme:dark){:root{--bg:#121816;--fg:#e8efed;--card:#1c2422;--accent:#4fb3a9;--muted:#9aa9a6}}
body{margin:0;padding:16px;background:var(--bg);color:var(--fg);font:16px/1.5 system-ui,sans-serif}
main{max-width:860px;margin:auto}.card{background:var(--card);border-radius:10px;padding:14px 16px;margin:14px 0}
h1{font-size:1.4rem}h2{font-size:1.05rem;margin:0 0 8px}pre{white-space:pre-wrap;word-break:break-word;font:14px/1.5 ui-monospace,monospace;margin:0 0 10px}
button{background:var(--accent);color:#fff;border:0;border-radius:6px;padding:8px 14px;font-weight:600;cursor:pointer}
.note,.save{color:var(--muted);font-size:.9rem}
</style></head><body><main>
<h1>${esc(title)}</h1>${intro ? `<p>${esc(intro)}</p>` : ''}
${cards}
</main>
<script>
document.querySelectorAll('button[data-for]').forEach(function(b){b.addEventListener('click',function(){
var t=document.getElementById(b.dataset.for).textContent;
(navigator.clipboard?navigator.clipboard.writeText(t):Promise.reject()).then(function(){b.textContent='Copied'},function(){
var r=document.createRange();r.selectNodeContents(document.getElementById(b.dataset.for));var s=getSelection();s.removeAllRanges();s.addRange(r);b.textContent='Selected: press Ctrl+C'});
setTimeout(function(){b.textContent='Copy prompt'},2500);});});
</script></body></html>
`;
}
