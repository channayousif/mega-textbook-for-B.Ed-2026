/**
 * Validation and shaping for Study Studio quiz drafts (Spec 029, migration 0056).
 *
 * Pure functions, no I/O, so tests/unit/quiz-drafts.test.mjs can cover them without a
 * database. The importer (import-quiz-drafts.mjs) is the only caller that writes.
 *
 * Input file shape (one unit per file):
 *   {
 *     "course_code": "EFMP-301",
 *     "unit_no": 4,
 *     "source": "nlm quiz v2, topic 1, 2026-11-09",   // optional, for the log only
 *     "items": [
 *       { "question": "...", "options": ["...", "...", "...", "..."], "correct": 0 },
 *       { "question": "...", "options": [{ "key": "A", "text": "..." }, ...], "correct": "B" }
 *     ]
 *   }
 * `correct` is a 0-based index into `options`, or the letter of a keyed option.
 */

export const COURSE_CODE_RE = /^[A-Z]{2,5}-\d{3}$/;
export const MIN_OPTIONS = 2;
export const MAX_OPTIONS = 6;
const EM_DASHES = /[—―⸺⸻]/;

/** Normalise one raw item to { question, options: string[], correctIndex } or throw. */
export function normaliseItem(raw, n) {
  const where = `item ${n + 1}`;
  if (!raw || typeof raw !== 'object') throw new Error(`${where}: not an object`);
  const question = typeof raw.question === 'string' ? raw.question.trim() : '';
  if (!question) throw new Error(`${where}: empty question`);
  if (!Array.isArray(raw.options)) throw new Error(`${where}: options must be an array`);
  if (raw.options.length < MIN_OPTIONS || raw.options.length > MAX_OPTIONS) {
    throw new Error(`${where}: needs ${MIN_OPTIONS}-${MAX_OPTIONS} options, has ${raw.options.length}`);
  }
  const keyed = raw.options.every((o) => o && typeof o === 'object');
  const options = raw.options.map((o) => (keyed ? String(o.text ?? '') : String(o ?? '')).trim());
  if (options.some((t) => !t)) throw new Error(`${where}: an option is empty`);
  if (new Set(options.map((t) => t.toLowerCase())).size !== options.length) throw new Error(`${where}: duplicate options`);

  let correctIndex;
  if (keyed && typeof raw.correct === 'string') {
    correctIndex = raw.options.findIndex((o) => String(o.key).trim().toUpperCase() === raw.correct.trim().toUpperCase());
  } else if (Number.isInteger(raw.correct)) {
    correctIndex = raw.correct;
  } else {
    correctIndex = -1;
  }
  if (correctIndex < 0 || correctIndex >= options.length) throw new Error(`${where}: correct answer does not match any option`);

  for (const text of [question, ...options]) {
    if (EM_DASHES.test(text)) throw new Error(`${where}: contains an em dash (Constitution Art. III.9)`);
  }
  return { question, options, correctIndex };
}

/** Validate a whole file. Returns { courseCode, unitNo, items } or throws on the first problem. */
export function parseDraftFile(json) {
  if (!json || typeof json !== 'object') throw new Error('file is not a JSON object');
  const courseCode = String(json.course_code ?? '').trim().toUpperCase();
  if (!COURSE_CODE_RE.test(courseCode)) throw new Error(`course_code "${json.course_code}" is not like EFMP-301`);
  const unitNo = json.unit_no;
  if (!Number.isInteger(unitNo) || unitNo < 1) throw new Error(`unit_no "${unitNo}" must be a positive integer`);
  if (!Array.isArray(json.items) || json.items.length === 0) throw new Error('items must be a non-empty array');
  const items = json.items.map(normaliseItem);
  const stems = new Set();
  for (const it of items) {
    const k = it.question.toLowerCase();
    if (stems.has(k)) throw new Error(`duplicate question in file: "${it.question.slice(0, 60)}"`);
    stems.add(k);
  }
  return { courseCode, unitNo, items };
}

/**
 * Shuffle the options (the v2 prompt leaves the right answer in a predictable place) and
 * re-letter them A, B, C... `random` is injectable so tests are deterministic.
 */
export function toDraftRow(item, courseCode, unitNo, random = Math.random) {
  const order = item.options.map((_, i) => i);
  for (let i = order.length - 1; i > 0; i -= 1) {
    const j = Math.floor(random() * (i + 1));
    [order[i], order[j]] = [order[j], order[i]];
  }
  const options = order.map((src, i) => ({ key: String.fromCharCode(65 + i), text: item.options[src] }));
  const correct = options[order.indexOf(item.correctIndex)].key;
  return {
    course_code: courseCode,
    unit_no: unitNo,
    question_text: item.question,
    options,
    correct_option: correct,
    status: 'draft',
    created_by: null,
  };
}
