"use strict";
(self["webpackChunkbed_mega_textbook"] = self["webpackChunkbed_mega_textbook"] || []).push([[7212],{

/***/ 1530
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Q: () => (/* binding */ fetchContentStatus)
/* harmony export */ });
/* harmony import */ var _home_a2ahs_mega_book_for_B_Ed_claude_worktrees_agent_affcb48d7818e8183_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2007);
/* harmony import */ var _home_a2ahs_mega_book_for_B_Ed_claude_worktrees_agent_affcb48d7818e8183_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(467);
/**
 * Content-status snapshot reader (Spec 010, T030). File-based, not a database
 * table (data-model.md's "Content-status snapshot") - `scripts/report-content-status.mjs`
 * writes `static/content-status.json` at build time; this just `fetch()`s it, the same
 * `static/*.json` convention as `content-index.json` (Spec 003).
 *//**
 * Spec 017 T018/T019 - per-unit review-gate state, derived from the course
 * tracker at build time. The review queue is built from this, which is why
 * Postgres needs no queue table and learns nothing about a gate outcome.
 *//**
 * `provisional` (Constitution Art. VII.7) is agent-reviewed and published under
 * a "Final Review Pending" notice, but NOT certified. Ask `=== 'done'` for
 * "is this finished" and `!== 'done'` for "does a human still owe this a pass".
 * Reading provisional as either extreme is a bug in both directions.
 *//**
 * The unit's PUBLICATION tier (Art. VII.7 as amended by ADR-0026), derived from
 * the gate states by `publicationState` in `scripts/lib/tracker-rows.mjs`.
 *
 * The same discipline as `ContentStatusGateState` applies: ask the exact value.
 * `gated` means published with NO reviewer having read it, which is weaker than
 * `provisional`, not stronger - testing `!== 'unpublished'` to mean "trustworthy"
 * gets it exactly backwards.
 *//** research.md R10 - re-fetches the build-time artifact; never triggers a live rebuild. */function fetchContentStatus(){return _fetchContentStatus.apply(this,arguments);}function _fetchContentStatus(){_fetchContentStatus=(0,_home_a2ahs_mega_book_for_B_Ed_claude_worktrees_agent_affcb48d7818e8183_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A)(/*#__PURE__*/(0,_home_a2ahs_mega_book_for_B_Ed_claude_worktrees_agent_affcb48d7818e8183_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)().m(function _callee(){var res;return (0,_home_a2ahs_mega_book_for_B_Ed_claude_worktrees_agent_affcb48d7818e8183_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)().w(function(_context){while(1)switch(_context.n){case 0:_context.n=1;return fetch('/content-status.json');case 1:res=_context.v;if(res.ok){_context.n=2;break;}return _context.a(2,null);case 2:_context.n=3;return res.json();case 3:return _context.a(2,_context.v);}},_callee);}));return _fetchContentStatus.apply(this,arguments);}

/***/ },

/***/ 9019
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ ReviewQueuePage)
});

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/regenerator.js
var regenerator = __webpack_require__(2007);
// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js
var asyncToGenerator = __webpack_require__(467);
// EXTERNAL MODULE: ./node_modules/react/index.js
var react = __webpack_require__(6540);
// EXTERNAL MODULE: ./node_modules/@docusaurus/theme-classic/lib/theme/Layout/index.js + 88 modules
var Layout = __webpack_require__(4552);
// EXTERNAL MODULE: ./node_modules/react-router/esm/react-router.js
var react_router = __webpack_require__(6347);
// EXTERNAL MODULE: ./node_modules/@docusaurus/core/lib/client/exports/Link.js
var Link = __webpack_require__(8774);
// EXTERNAL MODULE: ./node_modules/@docusaurus/core/lib/client/exports/useDocusaurusContext.js
var useDocusaurusContext = __webpack_require__(4586);
// EXTERNAL MODULE: ./src/contexts/AuthContext.tsx
var AuthContext = __webpack_require__(9345);
// EXTERNAL MODULE: ./src/lib/authRedirect.ts
var authRedirect = __webpack_require__(7215);
// EXTERNAL MODULE: ./src/lib/supabase.ts
var lib_supabase = __webpack_require__(3223);
// EXTERNAL MODULE: ./node_modules/react/jsx-runtime.js
var jsx_runtime = __webpack_require__(4848);
;// ./src/components/ReviewerGuard.tsx
/**
 * Client-side gate for `/app/admin/review-queue` (Spec 017 FR-002, T021).
 *
 * ⚠️ COSMETIC ONLY (Constitution Art. IX.2) - same disclaimer as
 * `src/components/OwnerConsoleGuard.tsx`. Nothing here decides whether a
 * certification is valid; that is settled when the artefact is committed and
 * reviewed. See spec.md's "Enforcement posture".
 *
 * One thing it does NOT do cosmetically: the capability check is
 * `is_reviewer()` over RPC, not `profile.reviewer` from the cached session.
 * The cache survives a suspension; the function does not, because the status
 * test lives inside it (0044, mirroring 0004_is_admin.sql). That is the whole
 * of success criterion 2 - a suspended reviewer is refused by the database's
 * answer rather than by the browser's memory of a column.
 *
 * An admin is admitted without the capability, because an admin may already
 * grant it to themselves in one click; making them do so would be ceremony,
 * not security.
 */function useLocale(){var _useDocusaurusContext=(0,useDocusaurusContext/* default */.A)(),i18n=_useDocusaurusContext.i18n;return i18n.currentLocale==='ur'?'ur':'en';}var MESSAGES={loading:{en:'Loading…',ur:'لوڈ ہو رہا ہے…'},redirecting:{en:'Redirecting to sign in…',ur:'سائن ان کی طرف بھیجا جا رہا ہے…'},deniedTitle:{en:'This view is for qualified reviewers',ur:'یہ صفحہ تصدیق شدہ جائزہ کاروں کے لیے ہے'},deniedBody:{en:'Certifying a unit review is an admin-granted capability, recorded in specs/reviewers/human-reviewers.md. Your own tools are available from your dashboard.',ur:'کسی یونٹ کے جائزے کی تصدیق ایک ایسی اہلیت ہے جو منتظم عطا کرتا ہے اور جس کا اندراج specs/reviewers/human-reviewers.md میں ہوتا ہے۔ آپ کے اپنے ٹولز آپ کے ڈیش بورڈ پر دستیاب ہیں۔'},goToYourTools:{en:'Go to your dashboard',ur:'اپنے ڈیش بورڈ پر جائیں'}};function ReviewerGuard(_ref){var children=_ref.children;var location=(0,react_router/* useLocation */.zy)();var locale=useLocale();var _useAuth=(0,AuthContext/* useAuth */.A)(),loading=_useAuth.loading,session=_useAuth.session,role=_useAuth.role;var _useState=(0,react.useState)('checking'),capability=_useState[0],setCapability=_useState[1];(0,react.useEffect)(function(){var cancelled=false;if(loading||!session)return undefined;if(role==='admin'){setCapability('yes');return undefined;}(0,asyncToGenerator/* default */.A)(/*#__PURE__*/(0,regenerator/* default */.A)().m(function _callee(){var supabase,_yield$supabase$rpc,data,error;return (0,regenerator/* default */.A)().w(function(_context){while(1)switch(_context.n){case 0:_context.n=1;return (0,lib_supabase/* getSupabase */.b9)();case 1:supabase=_context.v;if(supabase){_context.n=2;break;}// Fail closed: no client means no answer, and no answer is not a yes.
if(!cancelled)setCapability('no');return _context.a(2);case 2:_context.n=3;return supabase.rpc('is_reviewer');case 3:_yield$supabase$rpc=_context.v;data=_yield$supabase$rpc.data;error=_yield$supabase$rpc.error;if(!cancelled)setCapability(!error&&data===true?'yes':'no');case 4:return _context.a(2);}},_callee);}))();return function(){cancelled=true;};},[loading,session,role]);if(loading)return/*#__PURE__*/(0,jsx_runtime.jsx)("p",{children:MESSAGES.loading[locale]});if(!session){if(typeof window!=='undefined'){window.location.assign((0,authRedirect/* loginUrlWithReturnTo */.M$)(location.pathname,'login'));}return/*#__PURE__*/(0,jsx_runtime.jsx)("p",{children:MESSAGES.redirecting[locale]});}if(capability==='checking')return/*#__PURE__*/(0,jsx_runtime.jsx)("p",{children:MESSAGES.loading[locale]});if(capability==='no'){return/*#__PURE__*/(0,jsx_runtime.jsxs)("div",{className:"alert alert--info",role:"alert","data-testid":"reviewer-guard-denied",children:[/*#__PURE__*/(0,jsx_runtime.jsx)("p",{children:/*#__PURE__*/(0,jsx_runtime.jsx)("strong",{children:MESSAGES.deniedTitle[locale]})}),/*#__PURE__*/(0,jsx_runtime.jsx)("p",{children:MESSAGES.deniedBody[locale]}),/*#__PURE__*/(0,jsx_runtime.jsx)("p",{children:/*#__PURE__*/(0,jsx_runtime.jsx)(Link/* default */.A,{to:"/app/dashboard",className:"button button--primary button--sm",children:MESSAGES.goToYourTools[locale]})})]});}return/*#__PURE__*/(0,jsx_runtime.jsx)(jsx_runtime.Fragment,{children:children});}
// EXTERNAL MODULE: ./src/lib/contentStatus.ts
var contentStatus = __webpack_require__(1530);
// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/createForOfIteratorHelperLoose.js
var createForOfIteratorHelperLoose = __webpack_require__(1003);
;// ./scripts/lib/review-criteria.mjs
/**
 * The review rubric, as data: what a stage's criteria are, and which
 * deterministic checks a report must cite.
 *
 * Extracted from `review-evidence.mjs` (Spec 017 T017) because two very
 * different consumers now need it and must not drift: the agent evidence
 * validator, which refuses a report whose criteria do not match exactly, and
 * the browser certify form, which renders one row per criterion and one
 * checkbox per command. A second copy in `src/` would be a silent divergence
 * the moment a criterion is added.
 *
 * Plain data, no imports, so a Docusaurus page can import it as readily as a
 * Node gate script can.
 */

const CRITERIA = {
  G3: ['authority', 'sources', 'coverage', 'assessment', 'accessibility', 'readability', 'pedagogy'],
  G5: ['authority', 'sources', 'coverage', 'assessment', 'accessibility', 'completeness', 'semantics', 'terminology', 'register', 'rtl'],
};

const COMMANDS = ['validate:content', 'check:depth-gate', 'check:figures', 'check:no-em-dash', 'check:no-answer-keys', 'check:docs-sync', 'render-review'];

/**
 * The deterministic checks a G2 draft-stage gate manifest must cite.
 *
 * G2 asks a different question from G3. "Does a draft exist at standard" is a
 * machine-checkable property, so it is answered by gate exit codes rather than
 * by a reviewer's judgement, and needs no reviewer identity at all.
 *
 * Deliberately NOT `COMMANDS`: that list is the G3 pass contract and is also
 * imported by the Spec 017 browser certify form, so widening it would move UI.
 * This list may therefore include `check:concept-graph`, which G3 does not
 * require, without disturbing anything.
 *
 * `check:pipeline-gate` is deliberately absent. It is the gate this evidence
 * satisfies; requiring it here would be circular.
 */
const DRAFT_COMMANDS = (/* unused pure expression or super */ null && (['validate:content', 'check:depth-gate', 'check:figures',
  'check:concept-graph', 'check:bloom-bands', 'check:no-em-dash', 'check:no-answer-keys',
  'check:docs-sync']));

;// ./src/lib/reviewQueue.ts
/**
 * The review queue and the certification artefact (Spec 017).
 *
 * Deliberately free of any `@site/...` VALUE import (only `import type`, erased
 * at compile time) so this module is unit-testable under vitest with a plain
 * relative import, the same discipline `src/lib/feedbackExport.ts` keeps.
 *
 * Everything here is pure. The page supplies the reviewer's inputs and takes
 * the two artefacts away as downloads; nothing in this file touches Supabase,
 * Git, or the filesystem, which is what makes FR-009's "no automatic writes"
 * a property of the code rather than a promise in the UI.
 */// The rubric, from the one module that defines it (Spec 017 T017). A second
// copy here would drift from the evidence validator the first time a criterion
// is added, and nothing would notice.
/** One row of `static/content-index.json`, as much of it as the queue reads. *//**
 * The unit's own route, taken from any indexed page beneath it: the index
 * carries topic and assessment permalinks but no bare unit entry, and every one
 * of them sits under `.../unit-NN/`. Derived rather than constructed, so a
 * change to the route scheme cannot leave this pointing somewhere that no
 * longer exists.
 */function unitRoute(index,courseCode,unitNo){var pad="/unit-"+String(unitNo).padStart(2,'0')+"/";for(var _iterator=(0,createForOfIteratorHelperLoose/* default */.A)(index),_step;!(_step=_iterator()).done;){var entry=_step.value;if(entry.course_code!==courseCode||entry.unit_no!==unitNo)continue;var at=entry.permalink.indexOf(pad);if(at!==-1)return entry.permalink.slice(0,at+pad.length-1);}return null;}/**
 * Units awaiting a review, ordered by course then unit.
 *
 * Two rules carry the weight here:
 *
 * 1. **A unit whose G3 is open offers G3 only.** Art. VII §4 binds G5 to
 *    accepted G3 evidence for the same English version, so offering G5 first
 *    would invite a certification that `buildCertification` then refuses. This
 *    is the first of the binding's three enforcement points; the second is that
 *    refusal, and the third is the reviewer's own commit.
 * 2. **An unauthored unit is never queued.** A `coming_soon` scaffold has
 *    nothing to review, and its tracker rows are open precisely because the
 *    work has not started.
 */function buildReviewQueue(report,index){if(index===void 0){index=[];}var items=[];for(var _iterator2=(0,createForOfIteratorHelperLoose/* default */.A)(report.courses),_step2;!(_step2=_iterator2()).done;){var course=_step2.value;for(var _iterator3=(0,createForOfIteratorHelperLoose/* default */.A)(course.units),_step3;!(_step3=_iterator3()).done;){var unit=_step3.value;if(!unit.authored)continue;var gates=unit.gates;if(!gates)continue;// `!== 'done'`, never `=== 'open'`. A provisional unit is agent-reviewed
// and already published under a "Final Review Pending" notice, which makes
// it the unit MOST needing a human pass - testing for 'open' would drop it
// out of the very queue that exists to clear it.
var stage=gates.G3!=='done'?'G3':gates.G5!=='done'?'G5':null;if(!stage)continue;var en=unitRoute(index,course.course_code,unit.unit_no);items.push({course_code:course.course_code,unit_no:unit.unit_no,stage:stage,en_route:en,ur_route:en?"/ur"+en:null});}}return items.sort(function(a,b){return a.course_code.localeCompare(b.course_code)||a.unit_no-b.unit_no;});}// ---------------------------------------------------------------------------
// The certification artefact (contracts/certification.md)
// ---------------------------------------------------------------------------
var INITIALS=/^[A-Z]{1,5}$/;var unitFolder=function unitFolder(unitNo){return"unit-"+String(unitNo).padStart(2,'0');};var reviewDir=function reviewDir(courseCode,unitNo,stage){return"specs/content/"+courseCode.toLowerCase()+"/reviews/"+unitFolder(unitNo)+"/"+stage+"/";};/**
 * Build a certification, refusing anything that would be weaker evidence than
 * the agent path produces.
 *
 * Every refusal below has a counterpart in `scripts/lib/review-evidence.mjs`.
 * A human reviewer is trusted more than an agent in one respect only - their
 * identity is not forgeable in the way an agent's is, which is why there is no
 * signature - and in no other. The rules about what a `pass` may contain, and
 * about a G5 needing its G3, apply identically.
 */function buildCertification(input){var course_code=input.course_code,unit_no=input.unit_no,stage=input.stage,reviewer_id=input.reviewer_id;// T026 - identity. `agent:` in a human artefact would mislead
// `validateAgentTrackerRow` into a signature check that cannot pass, and
// Art. VII §3 forbids the reverse impersonation just as firmly.
if(reviewer_id.startsWith('agent:')){throw new Error('reviewer_id must be human initials, never an agent identity');}if(!INITIALS.test(reviewer_id)){throw new Error("reviewer_id must match "+INITIALS+" (1-5 capitals)");}// `input_manifest` is the map, not a path to it: a path cannot be compared
// against a freshly computed manifest, so it would make Art. VII §4's
// freshness rule uncheckable and the two evidence formats undiffable.
if(typeof input.input_manifest!=='object'||input.input_manifest===null||Array.isArray(input.input_manifest)||Object.keys(input.input_manifest).length===0){throw new Error('input_manifest must be the non-empty digest map from manifest.json, not a path');}var expected=CRITERIA[stage];var ids=input.criteria.map(function(c){return c.id;});if(ids.length!==expected.length||expected.some(function(id){return!ids.includes(id);})){throw new Error("criteria must be exactly "+stage+"'s: "+expected.join(', '));}// T028 - the G5 binding. Art. VII §4: G5 binds to accepted G3 evidence for
// the same English version. The agent path refuses a G5 report with no
// `g3_report`; so does this one.
if(stage==='G5'){var g3=input.g3_report;if(!g3)throw new Error('a G5 certification requires g3_report, the accepted G3 it binds to');if(!g3.startsWith(reviewDir(course_code,unit_no,'G3'))){throw new Error("g3_report must sit under "+reviewDir(course_code,unit_no,'G3'));}}else if(input.g3_report){throw new Error('g3_report belongs only on a G5 certification');}// T027 - the pass invariant, mirroring review-evidence.mjs.
if(input.disposition==='pass'){var failed=input.criteria.find(function(c){return c.status!=='pass';});if(failed)throw new Error("pass has a non-passing criterion: "+failed.id);var unresolved=input.findings.find(function(f){return f.severity!=='advisory'&&!f.resolved;});if(unresolved)throw new Error("pass has an unresolved "+unresolved.severity+" finding");var names=new Set(input.commands.map(function(c){return c.name;}));var missing=COMMANDS.filter(function(name){return!names.has(name);});if(missing.length)throw new Error("pass is missing command records: "+missing.join(', '));var nonZero=input.commands.find(function(c){return c.exit_code!==0;});if(nonZero)throw new Error("pass has a failing command: "+nonZero.name);}var certification={schema_version:1,course_code:course_code,unit_no:unit_no,stage:stage,reviewer_id:reviewer_id,input_manifest:input.input_manifest,commands:input.commands,criteria:input.criteria,findings:input.findings,disposition:input.disposition,started_at:input.started_at,completed_at:input.completed_at};if(input.supersedes)certification.supersedes=input.supersedes;if(input.g3_report)certification.g3_report=input.g3_report;return certification;}/** Where a certification must be committed, given its own contents. */function certificationPath(certification,runId){return""+reviewDir(certification.course_code,certification.unit_no,certification.stage)+runId+".json";}/**
 * The tracker row that references a committed certification, in data-model.md's
 * `| Unit | Stage | Status | Reviewer | Suggestion |` shape.
 *
 * Only a `pass` produces a done row. A `revise` or `escalate` leaves the gate
 * open by design, which is also the whole of the escalation mechanism: the
 * owner sees it at the next gate run, because the gate still fails.
 */function buildTrackerRow(certification,reportPath){var prefix=reviewDir(certification.course_code,certification.unit_no,certification.stage);if(!reportPath.startsWith(prefix)){throw new Error("report path must sit under "+prefix);}var stageLabel=certification.stage==='G3'?'G3 en-review':'G5 ur-review';var status=certification.disposition==='pass'?'✅':'⏳';return"| Unit "+certification.unit_no+" | "+stageLabel+" | "+status+" | "+certification.reviewer_id+" | review:"+reportPath+" |";}
;// ./src/pages/app/admin/review-queue.tsx
/**
 * The review surface (Spec 017 FR-004, T022-T024, T031-T032).
 *
 * Two things this page deliberately does not do:
 *
 * 1. **It writes nothing.** Certifying produces two downloads, which the
 *    reviewer commits through the ordinary PR flow (ADR-0015, FR-009). No
 *    `translation_status` changes, no gate is marked done, no row is written.
 *    `tests/unit/reviewQueue.test.mjs` asserts the module behind this page
 *    imports no Supabase client at all, so that claim is checked rather than
 *    promised.
 * 2. **It invents no digests.** The browser cannot see the repository, so
 *    `input_manifest` is read from the `manifest.json` the reviewer generated
 *    with `npm run review:evidence prepare`, and the deterministic checks are
 *    recorded as the exit codes the reviewer actually saw. Fabricating either
 *    would produce evidence that looks identical to real evidence, which is
 *    worse than having none.
 *
 * The queue itself comes from `static/content-status.json`, built from the
 * tracker files, so Postgres holds nothing about a gate outcome (Art. V.1).
 */var ACTIONS=[{disposition:'pass',label:'Certify',hint:'Every criterion passes and no blocking or uncertain finding is open.'},{disposition:'revise',label:'Request revision',hint:'Goes back to authoring. Art. VII §2 allows at most two repair cycles before escalation.'},{disposition:'escalate',label:'Escalate',hint:'Reaches the curriculum owner, who keeps policy and escalation ownership under Art. VII §1. There is no separate inbox: an escalation is a committed certification whose disposition leaves the gate open, which the owner sees at the next gate run.'}];function download(filename,body,type){var url=window.URL.createObjectURL(new Blob([body],{type:type}));var a=document.createElement('a');a.href=url;a.download=filename;document.body.appendChild(a);a.click();a.remove();window.URL.revokeObjectURL(url);}function ReviewQueueContent(){var _useAuth=(0,AuthContext/* useAuth */.A)(),displayName=_useAuth.displayName;var _useState=(0,react.useState)(null),queue=_useState[0],setQueue=_useState[1];var _useState2=(0,react.useState)(null),error=_useState2[0],setError=_useState2[1];var _useState3=(0,react.useState)(null),selected=_useState3[0],setSelected=_useState3[1];// Certification draft state.
var _useState4=(0,react.useState)(''),initials=_useState4[0],setInitials=_useState4[1];var _useState5=(0,react.useState)(null),manifest=_useState5[0],setManifest=_useState5[1];var _useState6=(0,react.useState)(null),manifestName=_useState6[0],setManifestName=_useState6[1];var _useState7=(0,react.useState)(''),g3Report=_useState7[0],setG3Report=_useState7[1];var _useState8=(0,react.useState)(''),supersedes=_useState8[0],setSupersedes=_useState8[1];var _useState9=(0,react.useState)(function(){return new Date().toISOString();}),startedAt=_useState9[0];var _useState0=(0,react.useState)({}),criteria=_useState0[0],setCriteria=_useState0[1];var _useState1=(0,react.useState)({}),commands=_useState1[0],setCommands=_useState1[1];var _useState10=(0,react.useState)([]),findings=_useState10[0],setFindings=_useState10[1];var load=(0,react.useCallback)(/*#__PURE__*/(0,asyncToGenerator/* default */.A)(/*#__PURE__*/(0,regenerator/* default */.A)().m(function _callee(){var _ref2;var _yield$Promise$all,status,indexRes;return (0,regenerator/* default */.A)().w(function(_context){while(1)switch(_context.n){case 0:setError(null);_context.n=1;return Promise.all([(0,contentStatus/* fetchContentStatus */.Q)(),fetch('/content-index.json').then(function(r){return r.ok?r.json():[];})["catch"](function(){return[];})]);case 1:_yield$Promise$all=_context.v;status=_yield$Promise$all[0];indexRes=_yield$Promise$all[1];if(status){_context.n=2;break;}setError('Could not read the content status report. Is the site built?');setQueue([]);return _context.a(2);case 2:setQueue(buildReviewQueue(status,(_ref2=indexRes)!=null?_ref2:[]));case 3:return _context.a(2);}},_callee);})),[]);(0,react.useEffect)(function(){void load();},[load]);var stageCriteria=(0,react.useMemo)(function(){return selected?CRITERIA[selected.stage]:[];},[selected]);function openUnit(item){setSelected(item);setError(null);setManifest(null);setManifestName(null);setG3Report('');setSupersedes('');setFindings([]);setCriteria(Object.fromEntries(CRITERIA[item.stage].map(function(id){return[id,{status:'unverified',evidence:''}];})));setCommands(Object.fromEntries(COMMANDS.map(function(name){return[name,''];})));}function readManifestFile(_x){return _readManifestFile.apply(this,arguments);}function _readManifestFile(){_readManifestFile=(0,asyncToGenerator/* default */.A)(/*#__PURE__*/(0,regenerator/* default */.A)().m(function _callee2(file){var _parsed$input_manifes,parsed,map,_t,_t2;return (0,regenerator/* default */.A)().w(function(_context2){while(1)switch(_context2.p=_context2.n){case 0:_context2.p=0;_t=JSON;_context2.n=1;return file.text();case 1:parsed=_t.parse.call(_t,_context2.v);map=(_parsed$input_manifes=parsed==null?void 0:parsed.input_manifest)!=null?_parsed$input_manifes:parsed;if(!(!map||typeof map!=='object'||Array.isArray(map))){_context2.n=2;break;}throw new Error('no input_manifest object found');case 2:setManifest(map);setManifestName(file.name);setError(null);_context2.n=4;break;case 3:_context2.p=3;_t2=_context2.v;setManifest(null);setManifestName(null);setError("Could not read "+file.name+": "+_t2.message+". Expected the manifest.json written by \"npm run review:evidence prepare\".");case 4:return _context2.a(2);}},_callee2,null,[[0,3]]);}));return _readManifestFile.apply(this,arguments);}function certify(disposition){if(!selected)return;try{var certification=buildCertification(Object.assign({course_code:selected.course_code,unit_no:selected.unit_no,stage:selected.stage,reviewer_id:initials.trim().toUpperCase(),input_manifest:manifest!=null?manifest:{},commands:Object.entries(commands).filter(function(_ref3){var code=_ref3[1];return code!=='';}).map(function(_ref4){var name=_ref4[0],code=_ref4[1];return{name:name,exit_code:Number(code)};}),criteria:stageCriteria.map(function(id){var _criteria$id$status,_criteria$id,_criteria$id$evidence,_criteria$id2;return{id:id,status:(_criteria$id$status=(_criteria$id=criteria[id])==null?void 0:_criteria$id.status)!=null?_criteria$id$status:'unverified',evidence:((_criteria$id$evidence=(_criteria$id2=criteria[id])==null?void 0:_criteria$id2.evidence)!=null?_criteria$id$evidence:'').split('\n').map(function(l){return l.trim();}).filter(Boolean)};}),findings:findings,disposition:disposition,started_at:startedAt,completed_at:new Date().toISOString()},supersedes.trim()?{supersedes:supersedes.trim()}:{},selected.stage==='G5'&&g3Report.trim()?{g3_report:g3Report.trim()}:{}));var runId=certification.completed_at.slice(0,10)+"-"+certification.reviewer_id.toLowerCase()+"-"+Math.random().toString(36).slice(2,8);var path=certificationPath(certification,runId);download(runId+".json",JSON.stringify(certification,null,2)+"\n",'application/json');download(runId+".tracker-row.txt",buildTrackerRow(certification,path)+"\n",'text/plain');setError(null);}catch(e){setError(e.message);}}return/*#__PURE__*/(0,jsx_runtime.jsxs)("main",{className:"container margin-vert--lg",children:[/*#__PURE__*/(0,jsx_runtime.jsx)("h1",{children:"Review queue"}),/*#__PURE__*/(0,jsx_runtime.jsx)("p",{children:"Units awaiting a G3 English review or a G5 Urdu review, derived from each course tracker. Certifying produces two files to commit; this page changes nothing by itself."}),error&&/*#__PURE__*/(0,jsx_runtime.jsx)("div",{className:"alert alert--danger",role:"alert",children:error}),queue===null&&/*#__PURE__*/(0,jsx_runtime.jsx)("p",{children:"Loading\u2026"}),queue!==null&&queue.length===0&&/*#__PURE__*/(0,jsx_runtime.jsx)("div",{className:"alert alert--success",role:"status",children:"Nothing is awaiting review."}),queue!==null&&queue.length>0&&/*#__PURE__*/(0,jsx_runtime.jsxs)("table",{children:[/*#__PURE__*/(0,jsx_runtime.jsx)("thead",{children:/*#__PURE__*/(0,jsx_runtime.jsxs)("tr",{children:[/*#__PURE__*/(0,jsx_runtime.jsx)("th",{children:"Course"}),/*#__PURE__*/(0,jsx_runtime.jsx)("th",{children:"Unit"}),/*#__PURE__*/(0,jsx_runtime.jsx)("th",{children:"Stage"}),/*#__PURE__*/(0,jsx_runtime.jsx)("th",{})]})}),/*#__PURE__*/(0,jsx_runtime.jsx)("tbody",{children:queue.map(function(item){return/*#__PURE__*/(0,jsx_runtime.jsxs)("tr",{children:[/*#__PURE__*/(0,jsx_runtime.jsx)("td",{children:item.course_code}),/*#__PURE__*/(0,jsx_runtime.jsx)("td",{children:item.unit_no}),/*#__PURE__*/(0,jsx_runtime.jsx)("td",{children:item.stage}),/*#__PURE__*/(0,jsx_runtime.jsx)("td",{children:/*#__PURE__*/(0,jsx_runtime.jsx)("button",{type:"button",className:"button button--sm button--primary",onClick:function onClick(){return openUnit(item);},children:"Review"})})]},item.course_code+"-"+item.unit_no+"-"+item.stage);})})]}),selected&&/*#__PURE__*/(0,jsx_runtime.jsxs)("section",{className:"margin-top--lg",children:[/*#__PURE__*/(0,jsx_runtime.jsxs)("h2",{children:[selected.course_code," Unit ",selected.unit_no," - ",selected.stage]}),selected.stage==='G5'&&selected.en_route&&selected.ur_route&&/*#__PURE__*/(0,jsx_runtime.jsx)("div",{style:{display:'flex',flexWrap:'wrap',gap:'1rem'},children:[['English',selected.en_route],['Urdu',selected.ur_route]].map(function(_ref5){var label=_ref5[0],route=_ref5[1];return/*#__PURE__*/(0,jsx_runtime.jsxs)("div",{style:{flex:'1 1 20rem',minWidth:0},children:[/*#__PURE__*/(0,jsx_runtime.jsxs)("p",{children:[/*#__PURE__*/(0,jsx_runtime.jsx)("strong",{children:label})," - ",/*#__PURE__*/(0,jsx_runtime.jsx)("a",{href:route,target:"_blank",rel:"noreferrer",children:"open in a new tab"})]}),/*#__PURE__*/(0,jsx_runtime.jsx)("iframe",{title:label+" source",src:route,style:{width:'100%',height:'32rem',border:'1px solid var(--ifm-color-emphasis-300)'}})]},label);})}),selected.stage==='G3'&&selected.en_route&&/*#__PURE__*/(0,jsx_runtime.jsx)("p",{children:/*#__PURE__*/(0,jsx_runtime.jsx)("a",{href:selected.en_route,target:"_blank",rel:"noreferrer",children:"Open the English unit in a new tab"})}),!selected.en_route&&/*#__PURE__*/(0,jsx_runtime.jsx)("div",{className:"alert alert--warning",role:"alert",children:"This unit is authored but has no entry in the content index, so there is no route to open."}),/*#__PURE__*/(0,jsx_runtime.jsx)("h3",{children:"Evidence"}),/*#__PURE__*/(0,jsx_runtime.jsxs)("p",{children:["Run ",/*#__PURE__*/(0,jsx_runtime.jsxs)("code",{children:["npm run review:evidence prepare ",selected.course_code," ",selected.unit_no," ",selected.stage," <dir>"]}),", then attach the ",/*#__PURE__*/(0,jsx_runtime.jsx)("code",{children:"manifest.json"})," it writes. The digests come from the file, never from this page."]}),/*#__PURE__*/(0,jsx_runtime.jsxs)("label",{className:"auth-tap-target",children:[/*#__PURE__*/(0,jsx_runtime.jsx)("span",{children:"manifest.json"}),' ',/*#__PURE__*/(0,jsx_runtime.jsx)("input",{type:"file",accept:"application/json,.json",onChange:function onChange(e){var _e$target$files;var f=(_e$target$files=e.target.files)==null?void 0:_e$target$files[0];if(f)void readManifestFile(f);}})]}),manifest&&/*#__PURE__*/(0,jsx_runtime.jsxs)("p",{children:[/*#__PURE__*/(0,jsx_runtime.jsx)("strong",{children:manifestName}),": ",Object.keys(manifest).length," input(s) digested."]}),/*#__PURE__*/(0,jsx_runtime.jsx)("h3",{children:"Deterministic checks"}),/*#__PURE__*/(0,jsx_runtime.jsx)("p",{children:"Record the exit code you saw for each. A certification cannot pass with a missing or non-zero one."}),/*#__PURE__*/(0,jsx_runtime.jsxs)("table",{children:[/*#__PURE__*/(0,jsx_runtime.jsx)("thead",{children:/*#__PURE__*/(0,jsx_runtime.jsxs)("tr",{children:[/*#__PURE__*/(0,jsx_runtime.jsx)("th",{children:"Command"}),/*#__PURE__*/(0,jsx_runtime.jsx)("th",{children:"Exit code"})]})}),/*#__PURE__*/(0,jsx_runtime.jsx)("tbody",{children:COMMANDS.map(function(name){var _commands$name;return/*#__PURE__*/(0,jsx_runtime.jsxs)("tr",{children:[/*#__PURE__*/(0,jsx_runtime.jsx)("td",{children:/*#__PURE__*/(0,jsx_runtime.jsx)("code",{children:name})}),/*#__PURE__*/(0,jsx_runtime.jsx)("td",{children:/*#__PURE__*/(0,jsx_runtime.jsx)("input",{className:"input",type:"number","aria-label":"Exit code for "+name,value:(_commands$name=commands[name])!=null?_commands$name:'',onChange:function onChange(e){return setCommands(function(c){var _Object$assign;return Object.assign({},c,(_Object$assign={},_Object$assign[name]=e.target.value===''?'':Number(e.target.value),_Object$assign));});}})})]},name);})})]}),/*#__PURE__*/(0,jsx_runtime.jsx)("h3",{children:"Criteria"}),/*#__PURE__*/(0,jsx_runtime.jsxs)("table",{children:[/*#__PURE__*/(0,jsx_runtime.jsx)("thead",{children:/*#__PURE__*/(0,jsx_runtime.jsxs)("tr",{children:[/*#__PURE__*/(0,jsx_runtime.jsx)("th",{children:"Criterion"}),/*#__PURE__*/(0,jsx_runtime.jsx)("th",{children:"Verdict"}),/*#__PURE__*/(0,jsx_runtime.jsx)("th",{children:"Evidence (one locator per line)"})]})}),/*#__PURE__*/(0,jsx_runtime.jsx)("tbody",{children:stageCriteria.map(function(id){var _criteria$id$status2,_criteria$id3,_criteria$id$evidence2,_criteria$id4;return/*#__PURE__*/(0,jsx_runtime.jsxs)("tr",{children:[/*#__PURE__*/(0,jsx_runtime.jsx)("td",{children:id}),/*#__PURE__*/(0,jsx_runtime.jsx)("td",{children:/*#__PURE__*/(0,jsx_runtime.jsxs)("select",{className:"input","aria-label":"Verdict for "+id,value:(_criteria$id$status2=(_criteria$id3=criteria[id])==null?void 0:_criteria$id3.status)!=null?_criteria$id$status2:'unverified',onChange:function onChange(e){return setCriteria(function(c){var _Object$assign2;return Object.assign({},c,(_Object$assign2={},_Object$assign2[id]=Object.assign({},c[id],{status:e.target.value}),_Object$assign2));});},children:[/*#__PURE__*/(0,jsx_runtime.jsx)("option",{value:"pass",children:"pass"}),/*#__PURE__*/(0,jsx_runtime.jsx)("option",{value:"fail",children:"fail"}),/*#__PURE__*/(0,jsx_runtime.jsx)("option",{value:"unverified",children:"unverified"})]})}),/*#__PURE__*/(0,jsx_runtime.jsx)("td",{children:/*#__PURE__*/(0,jsx_runtime.jsx)("textarea",{className:"input","aria-label":"Evidence for "+id,rows:2,value:(_criteria$id$evidence2=(_criteria$id4=criteria[id])==null?void 0:_criteria$id4.evidence)!=null?_criteria$id$evidence2:'',onChange:function onChange(e){return setCriteria(function(c){var _Object$assign3;return Object.assign({},c,(_Object$assign3={},_Object$assign3[id]=Object.assign({},c[id],{evidence:e.target.value}),_Object$assign3));});}})})]},id);})})]}),/*#__PURE__*/(0,jsx_runtime.jsx)("h3",{children:"Findings"}),findings.map(function(finding,i){return/*#__PURE__*/(0,jsx_runtime.jsxs)("div",{className:"margin-bottom--sm",style:{display:'flex',gap:'0.5rem',flexWrap:'wrap'},children:[/*#__PURE__*/(0,jsx_runtime.jsxs)("select",{className:"input","aria-label":"Severity for finding "+(i+1),value:finding.severity,onChange:function onChange(e){return setFindings(function(f){return f.map(function(x,j){return j===i?Object.assign({},x,{severity:e.target.value}):x;});});},children:[/*#__PURE__*/(0,jsx_runtime.jsx)("option",{value:"blocking",children:"blocking"}),/*#__PURE__*/(0,jsx_runtime.jsx)("option",{value:"uncertain",children:"uncertain"}),/*#__PURE__*/(0,jsx_runtime.jsx)("option",{value:"advisory",children:"advisory"})]}),/*#__PURE__*/(0,jsx_runtime.jsx)("input",{className:"input",style:{flex:'1 1 16rem'},"aria-label":"Message for finding "+(i+1),value:finding.message,onChange:function onChange(e){return setFindings(function(f){return f.map(function(x,j){return j===i?Object.assign({},x,{message:e.target.value}):x;});});}}),/*#__PURE__*/(0,jsx_runtime.jsxs)("label",{className:"auth-tap-target",children:[/*#__PURE__*/(0,jsx_runtime.jsx)("input",{type:"checkbox",checked:finding.resolved,"aria-label":"Finding "+(i+1)+" resolved",onChange:function onChange(e){return setFindings(function(f){return f.map(function(x,j){return j===i?Object.assign({},x,{resolved:e.target.checked}):x;});});}}),' ',"resolved"]})]},i);}),/*#__PURE__*/(0,jsx_runtime.jsx)("button",{type:"button",className:"button button--sm button--secondary",onClick:function onClick(){return setFindings(function(f){return[].concat(f,[{severity:'advisory',message:'',resolved:false}]);});},children:"Add a finding"}),/*#__PURE__*/(0,jsx_runtime.jsx)("h3",{children:"Identity"}),/*#__PURE__*/(0,jsx_runtime.jsxs)("label",{className:"auth-tap-target",children:[/*#__PURE__*/(0,jsx_runtime.jsx)("span",{children:"Your initials"}),' ',/*#__PURE__*/(0,jsx_runtime.jsx)("input",{className:"input","aria-label":"Reviewer initials",value:initials,placeholder:displayName?displayName.slice(0,2).toUpperCase():'AB',onChange:function onChange(e){return setInitials(e.target.value);}})]}),/*#__PURE__*/(0,jsx_runtime.jsxs)("p",{children:["One to five capitals, matching your entry in",' ',/*#__PURE__*/(0,jsx_runtime.jsx)("code",{children:"specs/reviewers/human-reviewers.md"}),". Never an agent identity."]}),selected.stage==='G5'&&/*#__PURE__*/(0,jsx_runtime.jsxs)(jsx_runtime.Fragment,{children:[/*#__PURE__*/(0,jsx_runtime.jsx)("h3",{children:"The G3 this binds to"}),/*#__PURE__*/(0,jsx_runtime.jsx)("p",{children:"Art. VII \xA74: a G5 binds to accepted G3 evidence for the same English version. Paste the path of this unit's accepted G3 certification."}),/*#__PURE__*/(0,jsx_runtime.jsx)("input",{className:"input",style:{width:'100%'},"aria-label":"Accepted G3 certification path",value:g3Report,placeholder:"specs/content/"+selected.course_code.toLowerCase()+"/reviews/unit-"+String(selected.unit_no).padStart(2,'0')+"/G3/<run-id>.json",onChange:function onChange(e){return setG3Report(e.target.value);}})]}),/*#__PURE__*/(0,jsx_runtime.jsx)("h3",{children:"Superseding an earlier attempt"}),/*#__PURE__*/(0,jsx_runtime.jsx)("input",{className:"input",style:{width:'100%'},"aria-label":"Run id this supersedes",value:supersedes,placeholder:"run-id of a prior attempt, or leave blank",onChange:function onChange(e){return setSupersedes(e.target.value);}}),/*#__PURE__*/(0,jsx_runtime.jsx)("h3",{children:"Disposition"}),/*#__PURE__*/(0,jsx_runtime.jsx)("div",{style:{display:'flex',gap:'0.75rem',flexWrap:'wrap'},children:ACTIONS.map(function(action){return/*#__PURE__*/(0,jsx_runtime.jsx)("button",{type:"button",className:"button button--sm "+(action.disposition==='pass'?'button--primary':'button--secondary'),title:action.hint,onClick:function onClick(){return certify(action.disposition);},children:action.label},action.disposition);})}),/*#__PURE__*/(0,jsx_runtime.jsx)("ul",{children:ACTIONS.map(function(action){return/*#__PURE__*/(0,jsx_runtime.jsxs)("li",{children:[/*#__PURE__*/(0,jsx_runtime.jsx)("strong",{children:action.label})," - ",action.hint]},action.disposition);})}),/*#__PURE__*/(0,jsx_runtime.jsxs)("div",{className:"alert alert--info",role:"note",children:["Each action downloads the certification and its tracker row. Applying them is a commit you make, through the ordinary pull request flow - this page writes nothing to Git, to the database, or to any ",/*#__PURE__*/(0,jsx_runtime.jsx)("code",{children:"translation_status"}),"."]})]})]});}function ReviewQueuePage(){return/*#__PURE__*/(0,jsx_runtime.jsx)(Layout/* default */.A,{title:"Review queue",description:"Units awaiting a G3 English or G5 Urdu content review, for qualified reviewers.",children:/*#__PURE__*/(0,jsx_runtime.jsx)(ReviewerGuard,{children:/*#__PURE__*/(0,jsx_runtime.jsx)(ReviewQueueContent,{})})});}

/***/ }

}]);