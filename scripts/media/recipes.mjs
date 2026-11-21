// Versioned prompt and pacing recipes (Feature 030, FR-009, T017).
//
// A recipe lives at specs/studio/recipes/<name>@<version>.json and is never edited once used; a
// change is a new version. A teaser script names its recipe in `recipe: { name, version }`; a script
// without one is treated as teaser@1 (batches 1 and 2).
// Do not import this file from any content gate (FR-018).
import { existsSync, readFileSync } from 'node:fs';
import { join, resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import Ajv2020 from 'ajv/dist/2020.js';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '../..');
export const DEFAULT_TEASER_RECIPE = { name: 'teaser', version: 1 };
/** The recipe new teasers get (owner, 2026-11-20). */
export const CURRENT_TEASER_RECIPE = { name: 'teaser', version: 3 };

/** A named camera move, as recipe v2 requires in its action shots. */
export const CAMERA_MOVE_RE = /\b(push(ing|es)?[- ]?(in|through|forward|past)|pull[- ]?(back|out)|crane|dolly|tracking|track(s|ing)? (along|past|with)|whip[- ]?pan|pans?\b|panning|tilts?\b|tilting|handheld|orbit(s|ing)?|zoom(s|ing)?( in| out)?|aerial|drone|steadicam|truck(s|ing)?\b|arc shot|rack focus|fly[- ]?(over|through))/i;

let validator;
function validate(recipe, where) {
  validator ??= new Ajv2020({ allErrors: true, strict: false })
    .compile(JSON.parse(readFileSync(join(ROOT, 'specs/studio/recipe.schema.json'), 'utf8')));
  if (!validator(recipe)) {
    throw new Error(`${where}: ${validator.errors.map((e) => `${e.instancePath || '/'} ${e.message}`).join('; ')}`);
  }
}

export const recipePath = (name, version, root = ROOT) => join(root, 'specs/studio/recipes', `${name}@${version}.json`);

export function loadRecipe(name, version, root = ROOT) {
  const p = recipePath(name, version, root);
  if (!existsSync(p)) throw new Error(`no recipe ${name}@${version} (${p})`);
  const recipe = JSON.parse(readFileSync(p, 'utf8'));
  validate(recipe, `${name}@${version}`);
  if (recipe.name !== name || recipe.version !== version) throw new Error(`${p} declares ${recipe.name}@${recipe.version}`);
  return recipe;
}

/** The recipe reference a teaser script uses (teaser@1 when it names none). */
export const recipeRef = (script) => script?.recipe ?? DEFAULT_TEASER_RECIPE;
export const recipeFor = (script, root = ROOT) => {
  const { name, version } = recipeRef(script);
  return loadRecipe(name, version, root);
};

export const isPresenterShot = (recipe, n) => recipe.presenter_shots.includes(n);

/**
 * The Veo prompt for one shot: head + the shot's visual + who speaks the line + tail.
 * `shot` is the script's shot object ({ n, visual }). The aspect ratio goes to the generator as an
 * argument, never into the prompt.
 */
export function buildPrompt(recipe, script, shot, locale = 'ur') {
  const line = script.locales?.[locale]?.narration?.[shot.n - 1];
  if (!line) throw new Error(`${script.id}: no ${locale} narration for shot ${shot.n}`);
  const speech = (isPresenterShot(recipe, shot.n) ? recipe.prompt.presenter : recipe.prompt.voice_over).replace('{line}', line);
  return recipe.prompt.head + shot.visual.trim() + speech + recipe.prompt.tail;
}

/** QG0 findings a recipe adds to a script: word budget per locale and camera moves in action shots. */
export function recipeFindings(recipe, script) {
  const f = [];
  const words = (s) => s.trim().split(/\s+/).filter(Boolean).length;
  for (const loc of ['en', 'ur'].filter((l) => script.locales?.[l])) {
    const budget = recipe.word_budget[loc];
    if (!budget) continue;
    script.locales[loc].narration.forEach((line, i) => {
      const n = words(line);
      if (n > budget) f.push(`${loc} shot ${i + 1}: ${n} words, over the ${budget}-word budget of ${recipe.name}@${recipe.version}`);
    });
  }
  for (const n of recipe.camera_move_shots) {
    const shot = script.shots?.find((s) => s.n === n);
    if (shot && !CAMERA_MOVE_RE.test(shot.visual)) f.push(`shot ${n}: name a camera move (push-in, crane, dolly, tracking, whip-pan...) as ${recipe.name}@${recipe.version} requires`);
  }
  return f;
}
