// Where a content pack's files live (Feature 038, ADR-0040).
// Media (video, audio, images, SRT) stays outside git under the pack root; small text artefacts are
// mirrored into git under specs/studio/packs/. Do not import this file from any content gate.
import { homedir } from 'node:os';
import { join, resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

export const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..', '..', '..');
export const pad2 = (n) => String(n).padStart(2, '0');
export const PACK_ROOT = () => process.env.MEGA_BOOK_PACK_ROOT || join(homedir(), 'studio-media', 'packs');

/** `~/studio-media/packs/<course>/unit-NN/topic-NN` (media, never committed). */
export const mediaDir = (course, unit, topic) => join(PACK_ROOT(), course.toLowerCase(), `unit-${pad2(unit)}`, `topic-${pad2(topic)}`);
/** `specs/studio/packs/<course>/unit-NN/topic-NN` (text artefacts, committed). */
export const specDir = (course, unit, topic, root = ROOT) => join(root, 'specs', 'studio', 'packs', course.toLowerCase(), `unit-${pad2(unit)}`, `topic-${pad2(topic)}`);

/** Parse `efmp-301 4 1` or `efmp-301/4/1` style CLI arguments. */
export function parseTopic(args) {
  const parts = args.join(' ').split(/[\s/]+/).filter(Boolean);
  const [course, unit, topic] = [parts[0]?.toLowerCase(), Number(parts[1]), Number(parts[2])];
  if (!/^[a-z]{2,6}-\d{3}$/.test(course ?? '') || !Number.isInteger(unit) || unit < 0 || !Number.isInteger(topic) || topic < 1) {
    throw new Error('expected <course> <unit> <topic>, e.g. efmp-301 4 1');
  }
  return { course, unit, topic };
}
