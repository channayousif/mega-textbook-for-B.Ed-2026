/**
 * The single definition of where content lives (Feature 015, FR-001).
 *
 * WHY THIS EXISTS. Five gate scripts plus `lib/review-evidence.mjs` each
 * independently re-derived the same rule: walk `docs/` for `^semester-\d+$`,
 * thread a numeric semester through the check function, then rebuild the Urdu
 * path as `semester-${semester}` under a hardcoded `UR_BASE`. Nobody chose "one
 * content hierarchy" as an architecture - it became load-bearing because six
 * places copied it, and a directory that is not a semester was invisible to all
 * of them. Two further gates (`check-no-em-dash`, `check-no-answer-keys`) scan
 * whole trees rather than units and kept their own hardcoded root arrays, so a
 * new content root would have bypassed the zero-em-dash rule and answer-key
 * leakage detection entirely.
 *
 * See ADR-0020 and specs/015-licence-content-tree/contracts/content-roots.md.
 *
 * TWO ACCESS PATTERNS, deliberately. `walkUnits`/`resolveUnit` serve consumers
 * that reason about units. `CONTENT_ROOTS` serves consumers that scan trees for
 * text patterns and must not be forced through a unit-shaped API, because they
 * legitimately read non-unit files too.
 */
import { existsSync, readdirSync, statSync } from 'node:fs';
import { join, resolve } from 'node:path';

/**
 * A content track. `pre-service` is the B.Ed degree corpus, which happens to
 * group its courses by semester; semester grouping is a property of this one
 * track, not of the content model. Adding a track is an entry here plus a
 * content root plus a Docusaurus plugin instance (FR-013).
 *
 * `urBase` is derived from `pluginId` because Docusaurus names translation
 * directories after the plugin instance - `i18n/ur/docusaurus-plugin-content-docs-guides/`
 * already exists as proof. Assuming the default base instead would silently pass
 * a unit that has no Urdu mirror at all (FR-006).
 */
const urBaseFor = (pluginId) =>
  join('i18n', 'ur', pluginId ? `docusaurus-plugin-content-docs-${pluginId}` : 'docusaurus-plugin-content-docs', 'current');

export const TRACKS = Object.freeze([
  Object.freeze({
    id: 'pre-service',
    contentRoot: 'docs',
    /** Courses are grouped one level down, in directories matching this. */
    dirPattern: /^semester-(\d+)$/,
    hasOrdinal: true,
    /** Course > unit > topic. Every unit-walking gate reads this shape. */
    shape: 'course-unit',
    pluginId: null, // the default docs-plugin instance
    urBase: urBaseFor(null),
    routeBasePath: '/',
  }),
  Object.freeze({
    id: 'licence',
    contentRoot: 'licence',
    /**
     * No grouping directory: courses sit at the track root. The licence corpus is
     * not a programme and has no semesters, so it has no ordinal (FR-008) - and
     * nothing may ask it for one.
     */
    dirPattern: null,
    hasOrdinal: false,
    /**
     * Feature 024: the licence track is a list of STEDA Part II topics and
     * subtopics under `pedagogy/<heading>/<subtopic>.mdx`, not courses and units.
     * It has no course codes, so `walkCourses`/`walkUnits` yield nothing for it
     * and the unit-shaped gates never see it; `walkLicenceSubtopics` and
     * `check-licence.mjs` own it instead. `CONTENT_ROOTS` still lists it, so the
     * pattern-scanning gates (em dash, answer keys) keep covering it.
     */
    shape: 'topic-list',
    pluginId: 'licence',
    urBase: urBaseFor('licence'),
    routeBasePath: '/licence',
  }),
]);

/** Flat list of every track's content directory, for the pattern-scanning gates (FR-014). */
export const CONTENT_ROOTS = Object.freeze(TRACKS.map((t) => t.contentRoot));

const UNIT_DIR = /^unit-(\d+)$/;

const dirs = (p) =>
  existsSync(p) ? readdirSync(p).filter((n) => statSync(join(p, n)).isDirectory()) : [];

const trackOf = (id) => TRACKS.find((t) => t.id === id);

/**
 * Every course across every track, in the same order `walkUnits` uses.
 *
 * Consumers that emit course-level records (`build-content-index`'s
 * `course-review.mdx`) or run course-level checks (`validate-content`'s category,
 * overview and bilingual checks) need this; walking units alone would have left
 * them re-deriving the semester regex and defeating the point.
 */
export function walkCourses(root, options = {}) {
  const base = resolve(root);
  const tracks = (options.track ? [trackOf(options.track)].filter(Boolean) : TRACKS)
    .filter((t) => t.shape === 'course-unit');
  const out = [];

  for (const track of tracks) {
    const rootDir = join(base, track.contentRoot);
    if (!existsSync(rootDir)) continue;

    const groups = track.dirPattern
      ? dirs(rootDir)
          .map((name) => ({ name, match: track.dirPattern.exec(name) }))
          .filter((g) => g.match)
          .map((g) => ({ trackDir: g.name, ordinal: Number(g.match[1]), dir: join(rootDir, g.name) }))
      : [{ trackDir: '', ordinal: null, dir: rootDir }];

    for (const group of groups) {
      for (const courseFolder of dirs(group.dir)) {
        out.push(Object.freeze({
          track,
          trackDir: group.trackDir,
          groupDir: group.dir,
          ordinal: track.hasOrdinal ? group.ordinal : null,
          courseFolder,
          courseCode: courseFolder.toUpperCase(),
          courseDir: join(group.dir, courseFolder),
          urCourseDir: join(base, track.urBase, group.trackDir, courseFolder),
        }));
      }
    }
  }

  const order = new Map(TRACKS.map((t, i) => [t.id, i]));
  return out.sort((a, b) =>
    order.get(a.track.id) - order.get(b.track.id) ||
    a.trackDir.localeCompare(b.trackDir) ||
    a.courseFolder.localeCompare(b.courseFolder));
}

/**
 * Every unit across every track. Sorted by track order, then grouping directory,
 * then course folder, then unit number - the prior walks relied on readdirSync
 * order, which happened to match sorted order but was never guaranteed.
 *
 * An absent content root yields nothing: an unoccupied track is not an error.
 * A malformed unit directory name is skipped exactly as before, so this is
 * behaviour-preserving rather than newly strict.
 */
export function walkUnits(root, options = {}) {
  const out = [];
  for (const course of walkCourses(root, options)) {
    for (const unit of dirs(course.courseDir)) {
      const unitMatch = UNIT_DIR.exec(unit);
      if (!unitMatch) continue;
      out.push(Object.freeze({
        track: course.track,
        trackDir: course.trackDir,
        ordinal: course.ordinal,
        courseFolder: course.courseFolder,
        courseCode: course.courseCode,
        unitNo: Number(unitMatch[1]),
        unitDir: join(course.courseDir, unit),
        urUnitDir: join(course.urCourseDir, unit),
      }));
    }
  }
  // Track order first: a track without a grouping directory has an empty
  // trackDir, which would otherwise sort ahead of `semester-1`.
  const order = new Map(TRACKS.map((t, i) => [t.id, i]));
  return out.sort((a, b) =>
    order.get(a.track.id) - order.get(b.track.id) ||
    a.trackDir.localeCompare(b.trackDir) ||
    a.courseFolder.localeCompare(b.courseFolder) ||
    a.unitNo - b.unitNo);
}

/**
 * One unit by course and number. Course codes are globally unique across tracks
 * (FR-011), so no track argument is needed and a duplicate is a defect worth
 * throwing on rather than silently picking a winner.
 */
export function resolveUnit(root, courseCode, unitNo) {
  const matches = walkUnits(root).filter(
    (u) => u.courseCode === String(courseCode).toUpperCase() && u.unitNo === Number(unitNo));
  if (matches.length === 0) throw new Error(`no unit found for ${courseCode} unit ${unitNo}`);
  if (matches.length > 1) {
    throw new Error(`${courseCode} unit ${unitNo} resolves to ${matches.length} directories: ` +
      `${matches.map((m) => m.unitDir).join(', ')}`);
  }
  return matches[0];
}

/**
 * Course codes that appear in more than one track (FR-011).
 *
 * A code identifies exactly one course everywhere, which is what lets
 * `resolveUnit` take no track argument and keeps `review:evidence prepare
 * EED-313 1 G3` unambiguous. `resolveUnit` throws when it trips over a
 * duplicate, but only if something happens to ask for that course - the gate
 * needs to catch it whether or not anyone looks.
 */
export function findDuplicateCourseCodes(root) {
  const byCode = new Map();
  for (const { courseCode, track } of walkCourses(root)) {
    if (!byCode.has(courseCode)) byCode.set(courseCode, new Set());
    byCode.get(courseCode).add(track.id);
  }
  return [...byCode.entries()]
    .filter(([, tracks]) => tracks.size > 1)
    .map(([code, tracks]) => ({ courseCode: code, tracks: [...tracks].sort() }));
}

/** The only sanctioned way to build an Urdu path. Never join a UR base yourself. */
export function urPathFor(record, ...segments) {
  return join(record.urUnitDir, ...segments);
}

/** The heading directory the licence track keeps its topic list under (Feature 024). */
export const LICENCE_SECTION = 'pedagogy';

/**
 * Every licence page under `licence/pedagogy/<heading>/`, English side, with its
 * Urdu mirror path. `kind` is `heading-index` for `index.mdx`, `practice` for
 * `practice.mdx`, and `subtopic` for everything else. Sorted by heading then file.
 */
export function walkLicenceSubtopics(root) {
  const track = trackOf('licence');
  const base = resolve(root);
  const sectionDir = join(base, track.contentRoot, LICENCE_SECTION);
  const out = [];
  for (const headingDir of dirs(sectionDir).sort()) {
    const dir = join(sectionDir, headingDir);
    const files = readdirSync(dir).filter((n) => n.endsWith('.mdx')).sort();
    for (const file of files) {
      const slug = file.replace(/\.mdx$/, '');
      out.push(Object.freeze({
        headingDir,
        heading: headingDir.split('-')[0],
        slug,
        kind: slug === 'index' ? 'heading-index' : slug === 'practice' ? 'practice' : 'subtopic',
        file: join(dir, file),
        urFile: join(base, track.urBase, LICENCE_SECTION, headingDir, file),
        route: `${track.routeBasePath}/${LICENCE_SECTION}/${headingDir}/${slug === 'index' ? '' : slug}`,
      }));
    }
  }
  return out;
}
