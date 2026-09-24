"use strict";
(self["webpackChunkbed_mega_textbook"] = self["webpackChunkbed_mega_textbook"] || []).push([[7798],{

/***/ 4691
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DN: () => (/* binding */ updateAssignment),
/* harmony export */   OD: () => (/* binding */ listForTeacher),
/* harmony export */   SY: () => (/* binding */ loggableOptions),
/* harmony export */   Ub: () => (/* binding */ unpublishAssignment),
/* harmony export */   Vj: () => (/* binding */ isLoggableContent),
/* harmony export */   hQ: () => (/* binding */ publishAssignment),
/* harmony export */   mM: () => (/* binding */ fetchContentIndex),
/* harmony export */   nK: () => (/* binding */ deleteAssignment),
/* harmony export */   s8: () => (/* binding */ getAssignment),
/* harmony export */   vI: () => (/* binding */ listPublishedForStudent),
/* harmony export */   wB: () => (/* binding */ createAssignment)
/* harmony export */ });
/* unused harmony export LOGGABLE_CONTENT_KINDS */
/* harmony import */ var _home_a2ahs_mega_book_for_B_Ed_claude_worktrees_agent_affcb48d7818e8183_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2007);
/* harmony import */ var _home_a2ahs_mega_book_for_B_Ed_claude_worktrees_agent_affcb48d7818e8183_node_modules_babel_runtime_helpers_esm_createForOfIteratorHelperLoose_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1003);
/* harmony import */ var _home_a2ahs_mega_book_for_B_Ed_claude_worktrees_agent_affcb48d7818e8183_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(467);
/* harmony import */ var _site_src_lib_supabase__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(3223);
/**
 * Assignment CRUD (Spec 003, T032).
 *
 * COSMETIC CONVENIENCE ONLY (Constitution Art. IX.2) - real authorization is
 * RLS + the `enforce_active_class()` trigger (supabase/migrations/0017).
 */function client(){return _client.apply(this,arguments);}function _client(){_client=(0,_home_a2ahs_mega_book_for_B_Ed_claude_worktrees_agent_affcb48d7818e8183_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .A)(/*#__PURE__*/(0,_home_a2ahs_mega_book_for_B_Ed_claude_worktrees_agent_affcb48d7818e8183_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)().m(function _callee(){var supabase;return (0,_home_a2ahs_mega_book_for_B_Ed_claude_worktrees_agent_affcb48d7818e8183_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)().w(function(_context){while(1)switch(_context.n){case 0:_context.n=1;return (0,_site_src_lib_supabase__WEBPACK_IMPORTED_MODULE_3__/* .getSupabase */ .b9)();case 1:supabase=_context.v;if(supabase){_context.n=2;break;}throw new Error('not_configured');case 2:return _context.a(2,supabase);}},_callee);}));return _client.apply(this,arguments);}/** FR-004/FR-005 - create an assignment (unit-linked or custom), unpublished by default. */function createAssignment(_x){return _createAssignment.apply(this,arguments);}/** FR-005 - publish/unpublish, toggleable at any time regardless of existing submissions. */function _createAssignment(){_createAssignment=(0,_home_a2ahs_mega_book_for_B_Ed_claude_worktrees_agent_affcb48d7818e8183_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .A)(/*#__PURE__*/(0,_home_a2ahs_mega_book_for_B_Ed_claude_worktrees_agent_affcb48d7818e8183_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)().m(function _callee2(input){var _ref;var supabase,_yield$supabase$from$,data,error;return (0,_home_a2ahs_mega_book_for_B_Ed_claude_worktrees_agent_affcb48d7818e8183_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)().w(function(_context2){while(1)switch(_context2.n){case 0:_context2.n=1;return client();case 1:supabase=_context2.v;_context2.n=2;return supabase.from('assignments').insert({class_id:input.classId,source_kind:input.sourceKind,course_code:input.courseCode,unit_no:input.unitNo,title:input.title,instructions:input.instructions,due_at:input.dueAtIso,max_mark:input.maxMark,allow_late:input.allowLate}).select().single();case 2:_yield$supabase$from$=_context2.v;data=_yield$supabase$from$.data;error=_yield$supabase$from$.error;return _context2.a(2,{data:(_ref=data)!=null?_ref:null,error:error});}},_callee2);}));return _createAssignment.apply(this,arguments);}function publishAssignment(_x2){return _publishAssignment.apply(this,arguments);}function _publishAssignment(){_publishAssignment=(0,_home_a2ahs_mega_book_for_B_Ed_claude_worktrees_agent_affcb48d7818e8183_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .A)(/*#__PURE__*/(0,_home_a2ahs_mega_book_for_B_Ed_claude_worktrees_agent_affcb48d7818e8183_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)().m(function _callee3(assignmentId){var _ref2;var supabase,_yield$supabase$from$2,data,error;return (0,_home_a2ahs_mega_book_for_B_Ed_claude_worktrees_agent_affcb48d7818e8183_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)().w(function(_context3){while(1)switch(_context3.n){case 0:_context3.n=1;return client();case 1:supabase=_context3.v;_context3.n=2;return supabase.from('assignments').update({published:true}).eq('id',assignmentId).select().single();case 2:_yield$supabase$from$2=_context3.v;data=_yield$supabase$from$2.data;error=_yield$supabase$from$2.error;return _context3.a(2,{data:(_ref2=data)!=null?_ref2:null,error:error});}},_callee3);}));return _publishAssignment.apply(this,arguments);}function unpublishAssignment(_x3){return _unpublishAssignment.apply(this,arguments);}/**
 * Spec 011 US5 / FR-012 - edit an assignment's editable fields after creation. The
 * owning-teacher check is enforced by RLS (`assignments_update`, migration 0017); the
 * `enforce_active_class()` trigger still re-asserts the parent class is active.
 */function _unpublishAssignment(){_unpublishAssignment=(0,_home_a2ahs_mega_book_for_B_Ed_claude_worktrees_agent_affcb48d7818e8183_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .A)(/*#__PURE__*/(0,_home_a2ahs_mega_book_for_B_Ed_claude_worktrees_agent_affcb48d7818e8183_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)().m(function _callee4(assignmentId){var _ref3;var supabase,_yield$supabase$from$3,data,error;return (0,_home_a2ahs_mega_book_for_B_Ed_claude_worktrees_agent_affcb48d7818e8183_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)().w(function(_context4){while(1)switch(_context4.n){case 0:_context4.n=1;return client();case 1:supabase=_context4.v;_context4.n=2;return supabase.from('assignments').update({published:false}).eq('id',assignmentId).select().single();case 2:_yield$supabase$from$3=_context4.v;data=_yield$supabase$from$3.data;error=_yield$supabase$from$3.error;return _context4.a(2,{data:(_ref3=data)!=null?_ref3:null,error:error});}},_callee4);}));return _unpublishAssignment.apply(this,arguments);}function updateAssignment(_x4,_x5){return _updateAssignment.apply(this,arguments);}/**
 * Spec 011 US5 / FR-012 - delete an assignment. RLS (`assignments_delete`, migration 0039)
 * refuses the delete whenever the assignment has any submission, so a delete only ever
 * succeeds on an empty assignment - the caller can surface that as "cannot delete".
 */function _updateAssignment(){_updateAssignment=(0,_home_a2ahs_mega_book_for_B_Ed_claude_worktrees_agent_affcb48d7818e8183_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .A)(/*#__PURE__*/(0,_home_a2ahs_mega_book_for_B_Ed_claude_worktrees_agent_affcb48d7818e8183_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)().m(function _callee5(assignmentId,patch){var _ref4;var supabase,_yield$supabase$from$4,data,error;return (0,_home_a2ahs_mega_book_for_B_Ed_claude_worktrees_agent_affcb48d7818e8183_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)().w(function(_context5){while(1)switch(_context5.n){case 0:_context5.n=1;return client();case 1:supabase=_context5.v;_context5.n=2;return supabase.from('assignments').update(patch).eq('id',assignmentId).select().single();case 2:_yield$supabase$from$4=_context5.v;data=_yield$supabase$from$4.data;error=_yield$supabase$from$4.error;return _context5.a(2,{data:(_ref4=data)!=null?_ref4:null,error:error});}},_callee5);}));return _updateAssignment.apply(this,arguments);}function deleteAssignment(_x6){return _deleteAssignment.apply(this,arguments);}/** Teacher's full list for a class, including unpublished (FR-006). */function _deleteAssignment(){_deleteAssignment=(0,_home_a2ahs_mega_book_for_B_Ed_claude_worktrees_agent_affcb48d7818e8183_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .A)(/*#__PURE__*/(0,_home_a2ahs_mega_book_for_B_Ed_claude_worktrees_agent_affcb48d7818e8183_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)().m(function _callee6(assignmentId){var supabase,_yield$supabase$from$5,error;return (0,_home_a2ahs_mega_book_for_B_Ed_claude_worktrees_agent_affcb48d7818e8183_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)().w(function(_context6){while(1)switch(_context6.n){case 0:_context6.n=1;return client();case 1:supabase=_context6.v;_context6.n=2;return supabase.from('assignments')["delete"]().eq('id',assignmentId);case 2:_yield$supabase$from$5=_context6.v;error=_yield$supabase$from$5.error;return _context6.a(2,{data:null,error:error});}},_callee6);}));return _deleteAssignment.apply(this,arguments);}function listForTeacher(_x7){return _listForTeacher.apply(this,arguments);}/** Student's published-only list for a class they're enrolled in (FR-006). */function _listForTeacher(){_listForTeacher=(0,_home_a2ahs_mega_book_for_B_Ed_claude_worktrees_agent_affcb48d7818e8183_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .A)(/*#__PURE__*/(0,_home_a2ahs_mega_book_for_B_Ed_claude_worktrees_agent_affcb48d7818e8183_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)().m(function _callee7(classId){var _ref5;var supabase,_yield$supabase$from$6,data,error;return (0,_home_a2ahs_mega_book_for_B_Ed_claude_worktrees_agent_affcb48d7818e8183_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)().w(function(_context7){while(1)switch(_context7.n){case 0:_context7.n=1;return client();case 1:supabase=_context7.v;_context7.n=2;return supabase.from('assignments').select('*').eq('class_id',classId).order('due_at',{ascending:true});case 2:_yield$supabase$from$6=_context7.v;data=_yield$supabase$from$6.data;error=_yield$supabase$from$6.error;return _context7.a(2,{data:(_ref5=data)!=null?_ref5:null,error:error});}},_callee7);}));return _listForTeacher.apply(this,arguments);}function listPublishedForStudent(_x8){return _listPublishedForStudent.apply(this,arguments);}function _listPublishedForStudent(){_listPublishedForStudent=(0,_home_a2ahs_mega_book_for_B_Ed_claude_worktrees_agent_affcb48d7818e8183_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .A)(/*#__PURE__*/(0,_home_a2ahs_mega_book_for_B_Ed_claude_worktrees_agent_affcb48d7818e8183_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)().m(function _callee8(classId){var _ref6;var supabase,_yield$supabase$from$7,data,error;return (0,_home_a2ahs_mega_book_for_B_Ed_claude_worktrees_agent_affcb48d7818e8183_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)().w(function(_context8){while(1)switch(_context8.n){case 0:_context8.n=1;return client();case 1:supabase=_context8.v;_context8.n=2;return supabase.from('assignments').select('*').eq('class_id',classId).eq('published',true).order('due_at',{ascending:true});case 2:_yield$supabase$from$7=_context8.v;data=_yield$supabase$from$7.data;error=_yield$supabase$from$7.error;return _context8.a(2,{data:(_ref6=data)!=null?_ref6:null,error:error});}},_callee8);}));return _listPublishedForStudent.apply(this,arguments);}function getAssignment(_x9){return _getAssignment.apply(this,arguments);}function _getAssignment(){_getAssignment=(0,_home_a2ahs_mega_book_for_B_Ed_claude_worktrees_agent_affcb48d7818e8183_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .A)(/*#__PURE__*/(0,_home_a2ahs_mega_book_for_B_Ed_claude_worktrees_agent_affcb48d7818e8183_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)().m(function _callee9(assignmentId){var _ref7;var supabase,_yield$supabase$from$8,data,error;return (0,_home_a2ahs_mega_book_for_B_Ed_claude_worktrees_agent_affcb48d7818e8183_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)().w(function(_context9){while(1)switch(_context9.n){case 0:_context9.n=1;return client();case 1:supabase=_context9.v;_context9.n=2;return supabase.from('assignments').select('*').eq('id',assignmentId).maybeSingle();case 2:_yield$supabase$from$8=_context9.v;data=_yield$supabase$from$8.data;error=_yield$supabase$from$8.error;return _context9.a(2,{data:(_ref7=data)!=null?_ref7:null,error:error});}},_callee9);}));return _getAssignment.apply(this,arguments);}/**
 * The unit-item kinds a teacher can assign, log, or rate (FR-004).
 *
 * This list used to hold only the legacy trio, on the reasoning that Spec 008's
 * `topic`/`assessment` pages "are whole lessons, not activity kinds". That was
 * defensible while most content was legacy. It stopped being defensible as the
 * corpus migrated: by 2026-09-20 EFMP-301 offered 0 loggable items of 5 indexed
 * and EFMP-302 0 of 31, so every course with real authored content offered a
 * teacher nothing at all, and the only loggable items left were `coming_soon`
 * scaffolds. A constraint that admits only placeholder content is not
 * protecting a distinction; it is disabling a feature. Migration 0045 widened
 * the database CHECKs to match.
 *
 * `course-review` is still excluded, and for a reason that has not changed: it
 * is a whole-COURSE page, while both tables key on (course_code, unit_no) with
 * unit_no NOT NULL. There is no unit for it to belong to.
 *
 * Every consumer that turns index records into a pickable activity MUST filter
 * through this, or it offers a value the schema will refuse on save.
 */var LOGGABLE_CONTENT_KINDS=['activity','formative','summative','topic','assessment'];/**
 * One pickable item per (unit_no, kind) - the grain the DATABASE actually stores.
 *
 * The three tables key on (course_code, unit_no, source_kind) and carry no
 * topic_no; `activity_feedback` is even UNIQUE on
 * (teacher_id, course_code, unit_no, source_kind). So "Unit 2, topic" is one
 * row however many topic pages a unit has.
 *
 * Before migration 0045 this never showed, because `topic` was not loggable at
 * all. Widening the kinds exposed it immediately: EFMP-302 alone produced 31
 * options collapsing to 12 distinct values, with `3::topic` appearing five
 * times - nineteen entries a user could not tell apart, all saving to the same
 * row, and duplicate React keys besides.
 *
 * Deduplicating here rather than adding topic_no to three tables is the smaller
 * claim, and the honest one: a unit-grained log is what the schema was designed
 * for. If per-topic logging is wanted, that is a schema change and a product
 * decision, not a picker fix.
 */function loggableOptions(index,courseCode){var byKey=new Map();for(var _iterator=(0,_home_a2ahs_mega_book_for_B_Ed_claude_worktrees_agent_affcb48d7818e8183_node_modules_babel_runtime_helpers_esm_createForOfIteratorHelperLoose_js__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A)(index),_step;!(_step=_iterator()).done;){var entry=_step.value;if(entry.course_code!==courseCode||!isLoggableContent(entry))continue;var key=entry.unit_no+"::"+entry.kind;var seen=byKey.get(key);if(seen)seen.pageCount++;else byKey.set(key,Object.assign({},entry,{pageCount:1}));}// `Array.from`, NOT `[...byKey.values()]`. This project's browserslist target
// makes Babel transpile an array-literal spread to `[].concat(iterable)`, and
// `concat` does not spread a Map iterator - it appends the iterator OBJECT as
// one element. The picker rendered exactly one option reading
// `undefined::undefined`, in the built bundle only; the source and the unit
// tests were both fine, because node spreads iterators correctly.
return Array.from(byKey.values()).sort(function(a,b){return a.unit_no-b.unit_no||a.kind.localeCompare(b.kind);});}/** Narrows an index record to one of the three assignable/loggable kinds. */function isLoggableContent(entry){return LOGGABLE_CONTENT_KINDS.includes(entry.kind);}/**
 * Fetch the build-time content index (T034 - no Docusaurus hook exposes
 * custom front-matter, so this is a static JSON file generated by
 * scripts/build-content-index.mjs and copied verbatim into the build output).
 */function fetchContentIndex(){return _fetchContentIndex.apply(this,arguments);}function _fetchContentIndex(){_fetchContentIndex=(0,_home_a2ahs_mega_book_for_B_Ed_claude_worktrees_agent_affcb48d7818e8183_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .A)(/*#__PURE__*/(0,_home_a2ahs_mega_book_for_B_Ed_claude_worktrees_agent_affcb48d7818e8183_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)().m(function _callee0(){var res;return (0,_home_a2ahs_mega_book_for_B_Ed_claude_worktrees_agent_affcb48d7818e8183_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)().w(function(_context0){while(1)switch(_context0.n){case 0:_context0.n=1;return fetch('/content-index.json');case 1:res=_context0.v;if(res.ok){_context0.n=2;break;}return _context0.a(2,[]);case 2:_context0.n=3;return res.json();case 3:return _context0.a(2,_context0.v);}},_callee0);}));return _fetchContentIndex.apply(this,arguments);}

/***/ },

/***/ 7363
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  se: () => (/* binding */ confirmGuestFeedback),
  MA: () => (/* binding */ exportUnitFeedback),
  ar: () => (/* binding */ fetchQueue),
  ii: () => (/* binding */ isIllegalTransitionError),
  Wz: () => (/* binding */ submitFeedback),
  Eh: () => (/* binding */ submitGuestFeedback),
  fz: () => (/* binding */ transitionFeedback)
});

// UNUSED EXPORTS: fetchOwnFeedback, renderFeedbackExportDocument, resolveContentPath

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/createForOfIteratorHelperLoose.js
var createForOfIteratorHelperLoose = __webpack_require__(1003);
// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/regenerator.js
var regenerator = __webpack_require__(2007);
// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js
var asyncToGenerator = __webpack_require__(467);
// EXTERNAL MODULE: ./src/lib/supabase.ts
var lib_supabase = __webpack_require__(3223);
// EXTERNAL MODULE: ./src/lib/assignments.ts
var assignments = __webpack_require__(4691);
;// ./src/lib/feedbackExport.ts
/**
 * Pure feedback-export helpers (Spec 010, Story 5, FR-022) - deliberately free of any
 * `@site/...` VALUE import (only `import type`, erased at compile time) so this module is
 * directly unit-testable under vitest with a plain relative import, no Supabase/webpack
 * alias resolution needed. `src/lib/contentFeedback.ts`'s `exportUnitFeedback()` is the
 * only caller that adds the live query on top of these.
 */var pad=function pad(n){return String(n).padStart(2,'0');};/**
 * Resolves one feedback item's repo-relative source path, the same filename convention
 * `report-content-status.mjs`/`build-content-index.mjs` already encode. `semesterByCourseCode`
 * comes from `content-index.json` - content_feedback itself never stores a semester number,
 * since it is an unvalidated pointer (Art. V.1/V.4) same as every other course-scoped column
 * on this table. `null` when the course has no indexed record at all to resolve a semester
 * from (edge case - never guessed at).
 */function resolveContentPath(item,semesterByCourseCode){var semester=semesterByCourseCode[item.course_code];if(semester===undefined)return null;var base="docs/semester-"+semester+"/"+item.course_code.toLowerCase();switch(item.page_kind){case'course_review':return base+"/course-review.mdx";case'unit_opening':return item.unit_no===null?null:base+"/unit-"+pad(item.unit_no)+"/index.mdx";case'unit_assessment':return item.unit_no===null?null:base+"/unit-"+pad(item.unit_no)+"/unit-assessment.mdx";case'unit_teacher_notes':return item.unit_no===null?null:base+"/unit-"+pad(item.unit_no)+"/unit-teacher-notes.mdx";case'topic':return item.unit_no===null||item.topic_no===null?null:base+"/unit-"+pad(item.unit_no)+"/topic-"+pad(item.topic_no)+".mdx";default:return null;}}/**
 * Renders the export document itself - a heading per affected file, each item's quoted
 * passage as a blockquote, its comment as prose beneath. Never pulls in page body text
 * (FR-022). Zero items renders an empty-but-valid document, not an error (edge case, US5).
 */function renderFeedbackExportDocument(items,resolvePath){var lines=['# Feedback export',''];if(items.length===0){lines.push('No open or planned feedback items for this unit.','');return lines.join('\n');}var byPath=new Map();for(var _iterator=(0,createForOfIteratorHelperLoose/* default */.A)(items),_step;!(_step=_iterator()).done;){var _resolvePath,_item$unit_no;var item=_step.value;var path=(_resolvePath=resolvePath(item))!=null?_resolvePath:"(unresolved path: "+item.course_code+" unit "+((_item$unit_no=item.unit_no)!=null?_item$unit_no:'-')+" "+item.page_kind+")";if(!byPath.has(path))byPath.set(path,[]);byPath.get(path).push(item);}for(var _iterator2=(0,createForOfIteratorHelperLoose/* default */.A)(byPath),_step2;!(_step2=_iterator2()).done;){var _step2$value=_step2.value,_path=_step2$value[0],itemsForPath=_step2$value[1];lines.push("## "+_path,'');for(var _iterator3=(0,createForOfIteratorHelperLoose/* default */.A)(itemsForPath),_step3;!(_step3=_iterator3()).done;){var _item=_step3.value;if(_item.scope==='passage'&&_item.quoted_passage){lines.push("> "+_item.quoted_passage,'');}lines.push(_item.comment,'');}}return lines.join('\n');}
// EXTERNAL MODULE: ./src/lib/pagination.ts
var pagination = __webpack_require__(4805);
;// ./src/lib/contentFeedback.ts
/* unused harmony import specifier */ var _regenerator;
/* unused harmony import specifier */ var _asyncToGenerator;
/**
 * Content feedback - submit/read-own/admin-queue/transition helpers over
 * content_feedback (Spec 010, T020). Mirrors suggestions.ts's shape.
 *
 * COSMETIC CONVENIENCE ONLY (Constitution Art. IX.2) - real authorization is
 * RLS + two guard triggers (supabase/migrations/0033-0035); a bug here would
 * degrade UX, not security. `author_role` and the initial `status` are never
 * sent by this module - they are always stamped/forced server-side (FR-014).
 */function client(){return _client.apply(this,arguments);}function _client(){_client=(0,asyncToGenerator/* default */.A)(/*#__PURE__*/(0,regenerator/* default */.A)().m(function _callee(){var supabase;return (0,regenerator/* default */.A)().w(function(_context){while(1)switch(_context.n){case 0:_context.n=1;return (0,lib_supabase/* getSupabase */.b9)();case 1:supabase=_context.v;if(supabase){_context.n=2;break;}throw new Error('not_configured');case 2:return _context.a(2,supabase);}},_callee);}));return _client.apply(this,arguments);}/** FR-010, FR-011, FR-012 - submit whole-page or passage feedback; status always defaults to 'open' server-side. */function submitFeedback(_x){return _submitFeedback.apply(this,arguments);}function _submitFeedback(){_submitFeedback=(0,asyncToGenerator/* default */.A)(/*#__PURE__*/(0,regenerator/* default */.A)().m(function _callee2(input){var _ref;var supabase,_yield$supabase$from$,data,error;return (0,regenerator/* default */.A)().w(function(_context2){while(1)switch(_context2.n){case 0:_context2.n=1;return client();case 1:supabase=_context2.v;_context2.n=2;return supabase.from('content_feedback').insert({author_id:input.authorId,page_kind:input.pageKind,course_code:input.courseCode,unit_no:input.unitNo,topic_no:input.topicNo,locale:input.locale,section_anchor:input.sectionAnchor,scope:input.scope,quoted_passage:input.quotedPassage,passage_context:input.passageContext,comment:input.comment}).select().single();case 2:_yield$supabase$from$=_context2.v;data=_yield$supabase$from$.data;error=_yield$supabase$from$.error;return _context2.a(2,{data:(_ref=data)!=null?_ref:null,error:error});}},_callee2);}));return _submitFeedback.apply(this,arguments);}/**
 * Spec 010 follow-up (2026-09-07) - a signed-out reader's feedback, identified only by an
 * email address. Goes through guest-feedback-submit (an Edge Function using the service
 * role) rather than a direct table insert: content_feedback has no anon INSERT policy at
 * all (0037_content_feedback_guest_access.sql's file comment explains why), so this is the
 * only way a signed-out visitor can create a row here. The function itself re-validates
 * everything server-side (never trust a payload with no RLS behind it) and sends a
 * confirmation email before the item is treated as confirmed - see confirm-feedback.tsx.
 */function submitGuestFeedback(_x2){return _submitGuestFeedback.apply(this,arguments);}/**
 * Spec 010 follow-up (2026-09-07) - confirms a guest's emailed link. SECURITY DEFINER RPC
 * (0037); the token itself is the credential, so this works for a fully signed-out caller.
 * Returns `true` only the first time a given token is confirmed (idempotent-safe: a second
 * click, or a stale/forged token, returns `false` rather than erroring - confirm-feedback.tsx
 * treats that as "invalid or already used", not distinguishing the two, since the RPC itself
 * can't tell them apart from a boolean).
 */function _submitGuestFeedback(){_submitGuestFeedback=(0,asyncToGenerator/* default */.A)(/*#__PURE__*/(0,regenerator/* default */.A)().m(function _callee3(input){var supabase,_yield$supabase$funct,data,error;return (0,regenerator/* default */.A)().w(function(_context3){while(1)switch(_context3.n){case 0:_context3.n=1;return client();case 1:supabase=_context3.v;_context3.n=2;return supabase.functions.invoke('guest-feedback-submit',{body:{email:input.email,pageKind:input.pageKind,courseCode:input.courseCode,unitNo:input.unitNo,topicNo:input.topicNo,locale:input.locale,sectionAnchor:input.sectionAnchor,scope:input.scope,quotedPassage:input.quotedPassage,passageContext:input.passageContext,comment:input.comment,website:input.website}});case 2:_yield$supabase$funct=_context3.v;data=_yield$supabase$funct.data;error=_yield$supabase$funct.error;if(!error){_context3.n=3;break;}return _context3.a(2,{data:null,error:error});case 3:return _context3.a(2,{data:data,error:null});}},_callee3);}));return _submitGuestFeedback.apply(this,arguments);}function confirmGuestFeedback(_x3){return _confirmGuestFeedback.apply(this,arguments);}/** FR-015 - every feedback item the signed-in reader has filed, most-recent-first. */function _confirmGuestFeedback(){_confirmGuestFeedback=(0,asyncToGenerator/* default */.A)(/*#__PURE__*/(0,regenerator/* default */.A)().m(function _callee4(token){var supabase,_yield$supabase$rpc,data,error;return (0,regenerator/* default */.A)().w(function(_context4){while(1)switch(_context4.n){case 0:_context4.n=1;return client();case 1:supabase=_context4.v;_context4.n=2;return supabase.rpc('confirm_guest_feedback',{p_token:token});case 2:_yield$supabase$rpc=_context4.v;data=_yield$supabase$rpc.data;error=_yield$supabase$rpc.error;if(!error){_context4.n=3;break;}return _context4.a(2,{data:null,error:error});case 3:return _context4.a(2,{data:Boolean(data),error:null});}},_callee4);}));return _confirmGuestFeedback.apply(this,arguments);}function fetchOwnFeedback(){return _fetchOwnFeedback.apply(this,arguments);}function _fetchOwnFeedback(){_fetchOwnFeedback=_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5(){var _ref2;var supabase,_yield$supabase$from$2,data,error;return _regenerator().w(function(_context5){while(1)switch(_context5.n){case 0:_context5.n=1;return client();case 1:supabase=_context5.v;_context5.n=2;return supabase.from('content_feedback').select('*').order('created_at',{ascending:false});case 2:_yield$supabase$from$2=_context5.v;data=_yield$supabase$from$2.data;error=_yield$supabase$from$2.error;return _context5.a(2,{data:(_ref2=data)!=null?_ref2:null,error:error});}},_callee5);}));return _fetchOwnFeedback.apply(this,arguments);}/**
 * FR-018 - admin triage queue, filterable by any combination of course/unit/topic/status/scope/
 * locale. Paginates (pagination.ts) rather than a bare `select('*')` - an unfiltered call (the
 * overview panel's own admin-wide aggregate) would otherwise silently truncate at PostgREST's
 * `max_rows` once this table has real usage, exactly like `unit_progress` already does.
 */function fetchQueue(_x4){return _fetchQueue.apply(this,arguments);}function _fetchQueue(){_fetchQueue=(0,asyncToGenerator/* default */.A)(/*#__PURE__*/(0,regenerator/* default */.A)().m(function _callee6(filters){var supabase;return (0,regenerator/* default */.A)().w(function(_context6){while(1)switch(_context6.n){case 0:if(filters===void 0){filters={};}_context6.n=1;return client();case 1:supabase=_context6.v;return _context6.a(2,(0,pagination/* fetchAllPages */.E)(function(from,to){var query=supabase.from('content_feedback').select('*');if(filters.status)query=query.eq('status',filters.status);if(filters.courseCode)query=query.eq('course_code',filters.courseCode);if(filters.unitNo!==undefined)query=query.eq('unit_no',filters.unitNo);if(filters.topicNo!==undefined)query=query.eq('topic_no',filters.topicNo);if(filters.scope)query=query.eq('scope',filters.scope);if(filters.locale)query=query.eq('locale',filters.locale);return query.order('created_at',{ascending:false}).range(from,to);}));}},_callee6);}));return _fetchQueue.apply(this,arguments);}/** FR-019, FR-020 - transition a feedback item's status along the legal graph; admin only (enforced by RLS + the guard trigger). */function transitionFeedback(_x5,_x6,_x7){return _transitionFeedback.apply(this,arguments);}/** Does an error come from enforce_content_feedback_status_transition() rejecting an illegal transition? */function _transitionFeedback(){_transitionFeedback=(0,asyncToGenerator/* default */.A)(/*#__PURE__*/(0,regenerator/* default */.A)().m(function _callee7(id,status,options){var _ref3;var supabase,patch,_yield$supabase$from$3,data,error;return (0,regenerator/* default */.A)().w(function(_context7){while(1)switch(_context7.n){case 0:if(options===void 0){options={};}_context7.n=1;return client();case 1:supabase=_context7.v;patch={status:status};if(options.ownerNote!==undefined)patch.owner_note=options.ownerNote;if(options.resolutionRef!==undefined)patch.resolution_ref=options.resolutionRef;_context7.n=2;return supabase.from('content_feedback').update(patch).eq('id',id).select().single();case 2:_yield$supabase$from$3=_context7.v;data=_yield$supabase$from$3.data;error=_yield$supabase$from$3.error;return _context7.a(2,{data:(_ref3=data)!=null?_ref3:null,error:error});}},_callee7);}));return _transitionFeedback.apply(this,arguments);}function isIllegalTransitionError(error){var _error$message;return Boolean(error==null||(_error$message=error.message)==null?void 0:_error$message.toLowerCase().includes('illegal content_feedback status transition'));}/**
 * FR-022 - exports one unit's open/planned feedback as one self-contained Markdown
 * document, generated on demand and never stored (data-model.md's "Feedback export
 * bundle"). Idempotent: re-running with no queue change returns the same items again.
 */function exportUnitFeedback(_x8,_x9){return _exportUnitFeedback.apply(this,arguments);}function _exportUnitFeedback(){_exportUnitFeedback=(0,asyncToGenerator/* default */.A)(/*#__PURE__*/(0,regenerator/* default */.A)().m(function _callee8(courseCode,unitNo){var _ref4;var supabase,_yield$Promise$all,_yield$Promise$all$,data,error,entries,semesterByCourseCode,_iterator,_step,entry,document;return (0,regenerator/* default */.A)().w(function(_context8){while(1)switch(_context8.n){case 0:_context8.n=1;return client();case 1:supabase=_context8.v;_context8.n=2;return Promise.all([supabase.from('content_feedback').select('*').eq('course_code',courseCode).eq('unit_no',unitNo)["in"]('status',['open','planned']).order('created_at',{ascending:true}),(0,assignments/* fetchContentIndex */.mM)()]);case 2:_yield$Promise$all=_context8.v;_yield$Promise$all$=_yield$Promise$all[0];data=_yield$Promise$all$.data;error=_yield$Promise$all$.error;entries=_yield$Promise$all[1];if(!error){_context8.n=3;break;}return _context8.a(2,{data:null,error:error});case 3:semesterByCourseCode={};for(_iterator=(0,createForOfIteratorHelperLoose/* default */.A)(entries);!(_step=_iterator()).done;){entry=_step.value;if(!(entry.course_code in semesterByCourseCode))semesterByCourseCode[entry.course_code]=entry.semester;}document=renderFeedbackExportDocument((_ref4=data)!=null?_ref4:[],function(item){return resolveContentPath(item,semesterByCourseCode);});return _context8.a(2,{data:document,error:null});}},_callee8);}));return _exportUnitFeedback.apply(this,arguments);}

/***/ },

/***/ 4805
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   E: () => (/* binding */ fetchAllPages)
/* harmony export */ });
/* harmony import */ var _home_a2ahs_mega_book_for_B_Ed_claude_worktrees_agent_affcb48d7818e8183_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2007);
/* harmony import */ var _home_a2ahs_mega_book_for_B_Ed_claude_worktrees_agent_affcb48d7818e8183_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(467);
/**
 * Pagination helper (Spec 010, post-implementation fix) - PostgREST caps an unbounded
 * `select('*')` at its configured `max_rows` (1000 in this project's `supabase/config.toml`).
 * An admin-wide aggregate query with no filter WILL exceed that as a table grows with real
 * usage - discovered when `unit_progress` (2,595 rows from accumulated testing) silently
 * dropped a freshly-inserted row from `admin/overview.tsx`'s progress panel. Every admin-wide
 * "read everything, then aggregate client-side" query in this feature goes through this
 * helper instead of a bare `.select('*')`, so none of them can silently truncate.
 */var PAGE_SIZE=1000;function fetchAllPages(_x){return _fetchAllPages.apply(this,arguments);}function _fetchAllPages(){_fetchAllPages=(0,_home_a2ahs_mega_book_for_B_Ed_claude_worktrees_agent_affcb48d7818e8183_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A)(/*#__PURE__*/(0,_home_a2ahs_mega_book_for_B_Ed_claude_worktrees_agent_affcb48d7818e8183_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)().m(function _callee(fetchPage){var all,from,_yield$fetchPage,data,error;return (0,_home_a2ahs_mega_book_for_B_Ed_claude_worktrees_agent_affcb48d7818e8183_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)().w(function(_context){while(1)switch(_context.n){case 0:all=[];from=0;case 1:_context.n=2;return fetchPage(from,from+PAGE_SIZE-1);case 2:_yield$fetchPage=_context.v;data=_yield$fetchPage.data;error=_yield$fetchPage.error;if(!error){_context.n=3;break;}return _context.a(2,{data:null,error:error});case 3:if(!(!data||data.length===0)){_context.n=4;break;}return _context.a(3,7);case 4:all.push.apply(all,data);if(!(data.length<PAGE_SIZE)){_context.n=5;break;}return _context.a(3,7);case 5:from+=PAGE_SIZE;case 6:_context.n=1;break;case 7:return _context.a(2,{data:all,error:null});}},_callee);}));return _fetchAllPages.apply(this,arguments);}

/***/ },

/***/ 1516
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ConfirmFeedbackPage)
/* harmony export */ });
/* harmony import */ var _home_a2ahs_mega_book_for_B_Ed_claude_worktrees_agent_affcb48d7818e8183_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2007);
/* harmony import */ var _home_a2ahs_mega_book_for_B_Ed_claude_worktrees_agent_affcb48d7818e8183_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(467);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6540);
/* harmony import */ var _theme_Layout__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(4552);
/* harmony import */ var _docusaurus_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(6347);
/* harmony import */ var _site_src_lib_contentFeedback__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(7363);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(4848);
/**
 * Guest feedback confirmation landing page (Spec 010 follow-up, 2026-09-07).
 * Reached only via the link in guest-feedback-submit's confirmation email
 * (supabase/functions/guest-feedback-submit/index.ts) - deliberately outside
 * every auth guard, since the whole point is that the visitor has no account.
 *
 * `locale` travels as a query param (set by the emailed link, from the
 * submission's own `locale` field) rather than this page living under
 * `/ur/...` - the confirmation email itself is English-only (documented
 * limitation, contracts/console-operations.md), but the LANDING PAGE the
 * link opens can still greet a Faisalabad… reader in the language they were
 * reading in, which is the part actually worth localizing.
 */var MESSAGES={confirming:{en:'Confirming your feedback…',ur:'آپ کی رائے کی تصدیق کی جا رہی ہے…'},missingToken:{en:'This confirmation link is missing its token.',ur:'اس تصدیقی لنک میں ٹوکن موجود نہیں ہے۔'},success:{en:'Thanks — your feedback is confirmed and now in the curriculum owner’s queue.',ur:'شکریہ - آپ کی رائے کی تصدیق ہو گئی ہے اور اب یہ نصاب کے ذمہ دار کی فہرست میں ہے۔'},invalidOrUsed:{en:'This confirmation link is invalid or has already been used.',ur:'یہ تصدیقی لنک غلط ہے یا پہلے ہی استعمال ہو چکا ہے۔'},error:{en:'Something went wrong confirming your feedback. Please try the link again.',ur:'آپ کی رائے کی تصدیق کرتے ہوئے کچھ غلط ہو گیا۔ براہ کرم لنک دوبارہ آزمائیں۔'},backToSite:{en:'Continue to the site',ur:'سائٹ پر جاری رکھیں'}};function useLocaleFromQuery(){var location=(0,_docusaurus_router__WEBPACK_IMPORTED_MODULE_4__/* .useLocation */ .zy)();var params=new URLSearchParams(location.search);return params.get('locale')==='ur'?'ur':'en';}function ConfirmFeedbackPage(){var location=(0,_docusaurus_router__WEBPACK_IMPORTED_MODULE_4__/* .useLocation */ .zy)();var locale=useLocaleFromQuery();var _useState=(0,react__WEBPACK_IMPORTED_MODULE_2__.useState)('pending'),state=_useState[0],setState=_useState[1];(0,react__WEBPACK_IMPORTED_MODULE_2__.useEffect)(function(){var cancelled=false;var token=new URLSearchParams(location.search).get('token');if(!token){setState('missing_token');return undefined;}(0,_home_a2ahs_mega_book_for_B_Ed_claude_worktrees_agent_affcb48d7818e8183_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A)(/*#__PURE__*/(0,_home_a2ahs_mega_book_for_B_Ed_claude_worktrees_agent_affcb48d7818e8183_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)().m(function _callee(){var _yield$confirmGuestFe,confirmed,error;return (0,_home_a2ahs_mega_book_for_B_Ed_claude_worktrees_agent_affcb48d7818e8183_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)().w(function(_context){while(1)switch(_context.n){case 0:_context.n=1;return (0,_site_src_lib_contentFeedback__WEBPACK_IMPORTED_MODULE_5__/* .confirmGuestFeedback */ .se)(token);case 1:_yield$confirmGuestFe=_context.v;confirmed=_yield$confirmGuestFe.data;error=_yield$confirmGuestFe.error;if(!cancelled){_context.n=2;break;}return _context.a(2);case 2:if(!error){_context.n=3;break;}setState('error');return _context.a(2);case 3:setState(confirmed?'success':'invalid');case 4:return _context.a(2);}},_callee);}))();return function(){cancelled=true;};},[location.search]);var body={pending:MESSAGES.confirming[locale],missing_token:MESSAGES.missingToken[locale],success:MESSAGES.success[locale],invalid:MESSAGES.invalidOrUsed[locale],error:MESSAGES.error[locale]}[state];return/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_theme_Layout__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .A,{title:"Confirm feedback",children:/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("main",{className:"container auth-page margin-vert--lg",style:{maxWidth:480},dir:locale==='ur'?'rtl':'ltr',children:[/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div",{className:"alert "+(state==='success'?'alert--success':state==='pending'?'alert--info':'alert--danger'),role:state==='pending'?'status':'alert',"data-testid":"confirm-feedback-message",children:body}),state!=='pending'&&/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("p",{className:"margin-top--md",children:/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("a",{href:"/",children:MESSAGES.backToSite[locale]})})]})});}

/***/ }

}]);