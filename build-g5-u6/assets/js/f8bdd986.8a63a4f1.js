"use strict";
(self["webpackChunkbed_mega_textbook"] = self["webpackChunkbed_mega_textbook"] || []).push([[7492],{

/***/ 3287
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ AuthGuard)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6540);
/* harmony import */ var _docusaurus_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6347);
/* harmony import */ var _site_src_contexts_AuthContext__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(9345);
/* harmony import */ var _site_src_lib_authRedirect__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(7215);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(4848);
/**
 * Client-side gate for `/app/admin/*` pages (Spec 002, T042).
 *
 * ⚠️ COSMETIC ONLY (Constitution Art. IX.2). This component decides what to
 * *render*, nothing more - it has no bearing on what data the page can
 * actually fetch. A bug here degrades UX, not security: every admin query
 * still runs through RLS (`is_admin()`), which is the real enforcement point
 * and denies unauthorized reads/writes regardless of what this component does
 * or fails to do. Never treat passing this gate as proof of authorization.
 */function AuthGuard(_ref){var children=_ref.children,requireRole=_ref.requireRole,requireVerifiedTeacher=_ref.requireVerifiedTeacher;var location=(0,_docusaurus_router__WEBPACK_IMPORTED_MODULE_1__/* .useLocation */ .zy)();var _useAuth=(0,_site_src_contexts_AuthContext__WEBPACK_IMPORTED_MODULE_2__/* .useAuth */ .A)(),loading=_useAuth.loading,session=_useAuth.session,role=_useAuth.role,verifiedTeacher=_useAuth.verifiedTeacher;if(loading)return/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("p",{children:"Loading\u2026"});if(!session){if(typeof window!=='undefined'){window.location.assign((0,_site_src_lib_authRedirect__WEBPACK_IMPORTED_MODULE_3__/* .loginUrlWithReturnTo */ .M$)(location.pathname,'login'));}return/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("p",{children:"Redirecting to sign in\u2026"});}var allowedRoles=requireRole?Array.isArray(requireRole)?requireRole:[requireRole]:null;var roleOk=!allowedRoles||role!==null&&allowedRoles.includes(role);var verifiedOk=!requireVerifiedTeacher||verifiedTeacher;if(!roleOk||!verifiedOk){return/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div",{className:"alert alert--danger",role:"alert",children:/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("p",{children:"You don't have access to this page."})});}return/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.Fragment,{children:children});}

/***/ },

/***/ 2065
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Y: () => (/* binding */ useClassRole),
/* harmony export */   p: () => (/* binding */ useQueryParam)
/* harmony export */ });
/* harmony import */ var _home_a2ahs_mega_book_for_B_Ed_claude_worktrees_agent_affcb48d7818e8183_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2007);
/* harmony import */ var _home_a2ahs_mega_book_for_B_Ed_claude_worktrees_agent_affcb48d7818e8183_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(467);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6540);
/* harmony import */ var _docusaurus_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(6347);
/* harmony import */ var _site_src_lib_supabase__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(3223);
/* harmony import */ var _site_src_contexts_AuthContext__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(9345);
/**
 * Resolves the caller's role within a given class (Spec 003, T003).
 *
 * COSMETIC ONLY (Constitution Art. IX.2), exactly like AuthGuard.tsx - this
 * hook decides what a page *renders*, nothing more. The real enforcement is
 * RLS: `classes_select` (migration 0012) already returns the row only if the
 * caller is the owning teacher, an admin, or an actively-enrolled student -
 * zero rows otherwise. `role` here is derived from *why* the row was
 * visible, not an independent authorization decision.
 *
 * ⚠️ NO REACT CONTEXT/PROVIDER - this feature uses query-string-based routing
 * (`?classId=…`), not nested dynamic path segments, because Docusaurus's
 * file-based router has no built-in dynamic-segment convention the way
 * Next.js's `[classId]` does. plan.md's file-tree sketch used bracket
 * notation as a conceptual URL shape, not a literal routing mechanism; a
 * custom route-registration plugin would be the alternative, but query
 * params work with plain static pages (the same pattern every existing
 * `src/pages/app/*.tsx` from Spec 002 already uses) and need no new
 * Docusaurus infrastructure. Each page reads its own `classId` via
 * `useQueryParam` and calls `useClassRole` directly - no ancestor provider
 * needed, since nothing here is truly global session state the way
 * AuthContext is.
 */function useClassRole(classId){var _useAuth=(0,_site_src_contexts_AuthContext__WEBPACK_IMPORTED_MODULE_5__/* .useAuth */ .A)(),profile=_useAuth.profile;var _useState=(0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(true),loading=_useState[0],setLoading=_useState[1];var _useState2=(0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(null),classRow=_useState2[0],setClassRow=_useState2[1];var _useState3=(0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(null),error=_useState3[0],setError=_useState3[1];var load=(0,react__WEBPACK_IMPORTED_MODULE_2__.useCallback)(/*#__PURE__*/(0,_home_a2ahs_mega_book_for_B_Ed_claude_worktrees_agent_affcb48d7818e8183_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A)(/*#__PURE__*/(0,_home_a2ahs_mega_book_for_B_Ed_claude_worktrees_agent_affcb48d7818e8183_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)().m(function _callee(){var supabase,_yield$supabase$from$,data,fetchError,_ref2;return (0,_home_a2ahs_mega_book_for_B_Ed_claude_worktrees_agent_affcb48d7818e8183_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)().w(function(_context){while(1)switch(_context.n){case 0:if(classId){_context.n=1;break;}setClassRow(null);setLoading(false);return _context.a(2);case 1:setLoading(true);setError(null);_context.n=2;return (0,_site_src_lib_supabase__WEBPACK_IMPORTED_MODULE_4__/* .getSupabase */ .b9)();case 2:supabase=_context.v;if(supabase){_context.n=3;break;}setLoading(false);return _context.a(2);case 3:_context.n=4;return supabase.from('classes').select('*').eq('id',classId).maybeSingle();case 4:_yield$supabase$from$=_context.v;data=_yield$supabase$from$.data;fetchError=_yield$supabase$from$.error;if(fetchError){setError('Could not load this class.');setClassRow(null);}else{setClassRow((_ref2=data)!=null?_ref2:null);}setLoading(false);case 5:return _context.a(2);}},_callee);})),[classId]);(0,react__WEBPACK_IMPORTED_MODULE_2__.useEffect)(function(){load();},[load]);var role=!classRow||!profile?'none':classRow.teacher_id===profile.id?'teacher':'student';return{loading:loading,classRow:classRow,role:role,error:error,refresh:load};}/** Read a named param (e.g. `classId`, `assignmentId`) from the URL's query string. */function useQueryParam(name){var location=(0,_docusaurus_router__WEBPACK_IMPORTED_MODULE_3__/* .useLocation */ .zy)();return new URLSearchParams(location.search).get(name);}

/***/ },

/***/ 5462
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   i: () => (/* binding */ fetchAttemptedAssignmentIds),
/* harmony export */   s: () => (/* binding */ fetchMarksByStudentForAssignments)
/* harmony export */ });
/* harmony import */ var _home_a2ahs_mega_book_for_B_Ed_claude_worktrees_agent_affcb48d7818e8183_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2007);
/* harmony import */ var _home_a2ahs_mega_book_for_B_Ed_claude_worktrees_agent_affcb48d7818e8183_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(467);
/* harmony import */ var _site_src_lib_supabase__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3223);
/**
 * Shared per-student-per-assignment mark computation (Spec 005, research.md
 * R4) - extracted from `gradebookExport.ts` (Spec 003) so Analytics (T036)
 * and the gradebook export reuse one implementation instead of two parallel
 * ones. Non-quiz assignments are scored via `submissions.grades(mark)`;
 * quiz assignments via the existing `quiz_best_scores` (Spec 003) view -
 * never `grades` (data-model.md's design decision, unchanged).
 */function client(){return _client.apply(this,arguments);}/**
 * Returns, for every student who has at least one mark among the given
 * assignments, a map of assignment_id -> mark.
 */function _client(){_client=(0,_home_a2ahs_mega_book_for_B_Ed_claude_worktrees_agent_affcb48d7818e8183_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A)(/*#__PURE__*/(0,_home_a2ahs_mega_book_for_B_Ed_claude_worktrees_agent_affcb48d7818e8183_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)().m(function _callee(){var supabase;return (0,_home_a2ahs_mega_book_for_B_Ed_claude_worktrees_agent_affcb48d7818e8183_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)().w(function(_context){while(1)switch(_context.n){case 0:_context.n=1;return (0,_site_src_lib_supabase__WEBPACK_IMPORTED_MODULE_2__/* .getSupabase */ .b9)();case 1:supabase=_context.v;if(supabase){_context.n=2;break;}throw new Error('not_configured');case 2:return _context.a(2,supabase);}},_callee);}));return _client.apply(this,arguments);}function fetchMarksByStudentForAssignments(_x){return _fetchMarksByStudentForAssignments.apply(this,arguments);}/** Which of the given assignments has this student submitted/attempted at all (regardless of grading)? Used for FR-010's "missed deadline" detection. */function _fetchMarksByStudentForAssignments(){_fetchMarksByStudentForAssignments=(0,_home_a2ahs_mega_book_for_B_Ed_claude_worktrees_agent_affcb48d7818e8183_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A)(/*#__PURE__*/(0,_home_a2ahs_mega_book_for_B_Ed_claude_worktrees_agent_affcb48d7818e8183_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)().m(function _callee2(assignments){var supabase,nonQuizIds,quizIds,marksByStudent,_yield$supabase$from$,submissions,error,_i,_arr,_gradeField$,_marksByStudent$get,row,gradeField,grade,bucket,_yield$supabase$from$2,quizScores,_error,_i2,_arr2,_marksByStudent$get2,_row,_bucket;return (0,_home_a2ahs_mega_book_for_B_Ed_claude_worktrees_agent_affcb48d7818e8183_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)().w(function(_context2){while(1)switch(_context2.n){case 0:_context2.n=1;return client();case 1:supabase=_context2.v;nonQuizIds=assignments.filter(function(a){return a.source_kind!=='quiz';}).map(function(a){return a.id;});quizIds=assignments.filter(function(a){return a.source_kind==='quiz';}).map(function(a){return a.id;});marksByStudent=new Map();if(!(nonQuizIds.length>0)){_context2.n=7;break;}_context2.n=2;return supabase.from('submissions').select('student_id, assignment_id, grades(mark)')["in"]('assignment_id',nonQuizIds);case 2:_yield$supabase$from$=_context2.v;submissions=_yield$supabase$from$.data;error=_yield$supabase$from$.error;if(!error){_context2.n=3;break;}return _context2.a(2,{data:null,error:error});case 3:_i=0,_arr=submissions!=null?submissions:[];case 4:if(!(_i<_arr.length)){_context2.n=7;break;}row=_arr[_i];gradeField=row.grades;grade=Array.isArray(gradeField)?(_gradeField$=gradeField[0])!=null?_gradeField$:null:gradeField;if(grade){_context2.n=5;break;}return _context2.a(3,6);case 5:bucket=(_marksByStudent$get=marksByStudent.get(row.student_id))!=null?_marksByStudent$get:{};bucket[row.assignment_id]=grade.mark;marksByStudent.set(row.student_id,bucket);case 6:_i++;_context2.n=4;break;case 7:if(!(quizIds.length>0)){_context2.n=9;break;}_context2.n=8;return supabase.from('quiz_best_scores').select('student_id, assignment_id, best_score')["in"]('assignment_id',quizIds);case 8:_yield$supabase$from$2=_context2.v;quizScores=_yield$supabase$from$2.data;_error=_yield$supabase$from$2.error;// Tolerated, not returned, matching gradebookExport.ts's precedent - a
// failure reading quiz scores shouldn't block the rest of the marks map.
if(!_error){for(_i2=0,_arr2=quizScores!=null?quizScores:[];_i2<_arr2.length;_i2++){_row=_arr2[_i2];_bucket=(_marksByStudent$get2=marksByStudent.get(_row.student_id))!=null?_marksByStudent$get2:{};_bucket[_row.assignment_id]=_row.best_score;marksByStudent.set(_row.student_id,_bucket);}}case 9:return _context2.a(2,{data:marksByStudent,error:null});}},_callee2);}));return _fetchMarksByStudentForAssignments.apply(this,arguments);}function fetchAttemptedAssignmentIds(_x2,_x3){return _fetchAttemptedAssignmentIds.apply(this,arguments);}function _fetchAttemptedAssignmentIds(){_fetchAttemptedAssignmentIds=(0,_home_a2ahs_mega_book_for_B_Ed_claude_worktrees_agent_affcb48d7818e8183_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A)(/*#__PURE__*/(0,_home_a2ahs_mega_book_for_B_Ed_claude_worktrees_agent_affcb48d7818e8183_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)().m(function _callee3(studentId,assignments){var supabase,nonQuizIds,quizIds,attempted,_yield$supabase$from$3,data,error,_i3,_arr3,row,_yield$supabase$from$4,_data,_error2,_i4,_arr4,_row2;return (0,_home_a2ahs_mega_book_for_B_Ed_claude_worktrees_agent_affcb48d7818e8183_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)().w(function(_context3){while(1)switch(_context3.n){case 0:_context3.n=1;return client();case 1:supabase=_context3.v;nonQuizIds=assignments.filter(function(a){return a.source_kind!=='quiz';}).map(function(a){return a.id;});quizIds=assignments.filter(function(a){return a.source_kind==='quiz';}).map(function(a){return a.id;});attempted=new Set();if(!(nonQuizIds.length>0)){_context3.n=4;break;}_context3.n=2;return supabase.from('submissions').select('assignment_id').eq('student_id',studentId)["in"]('assignment_id',nonQuizIds);case 2:_yield$supabase$from$3=_context3.v;data=_yield$supabase$from$3.data;error=_yield$supabase$from$3.error;if(!error){_context3.n=3;break;}return _context3.a(2,{data:null,error:error});case 3:for(_i3=0,_arr3=data!=null?data:[];_i3<_arr3.length;_i3++){row=_arr3[_i3];attempted.add(row.assignment_id);}case 4:if(!(quizIds.length>0)){_context3.n=7;break;}_context3.n=5;return supabase.from('quiz_attempts').select('assignment_id').eq('student_id',studentId)["in"]('assignment_id',quizIds);case 5:_yield$supabase$from$4=_context3.v;_data=_yield$supabase$from$4.data;_error2=_yield$supabase$from$4.error;if(!_error2){_context3.n=6;break;}return _context3.a(2,{data:null,error:_error2});case 6:for(_i4=0,_arr4=_data!=null?_data:[];_i4<_arr4.length;_i4++){_row2=_arr4[_i4];attempted.add(_row2.assignment_id);}case 7:return _context3.a(2,{data:attempted,error:null});}},_callee3);}));return _fetchAttemptedAssignmentIds.apply(this,arguments);}

/***/ },

/***/ 9087
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ GradebookPage)
});

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/regenerator.js
var regenerator = __webpack_require__(2007);
// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js
var asyncToGenerator = __webpack_require__(467);
// EXTERNAL MODULE: ./node_modules/react/index.js
var react = __webpack_require__(6540);
// EXTERNAL MODULE: ./node_modules/@docusaurus/theme-classic/lib/theme/Layout/index.js + 88 modules
var Layout = __webpack_require__(4552);
// EXTERNAL MODULE: ./node_modules/@docusaurus/core/lib/client/exports/useDocusaurusContext.js
var useDocusaurusContext = __webpack_require__(4586);
// EXTERNAL MODULE: ./src/components/AuthGuard.tsx
var AuthGuard = __webpack_require__(3287);
// EXTERNAL MODULE: ./src/contexts/ClassContext.tsx
var ClassContext = __webpack_require__(2065);
// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/createForOfIteratorHelperLoose.js
var createForOfIteratorHelperLoose = __webpack_require__(1003);
// EXTERNAL MODULE: ./src/lib/supabase.ts
var lib_supabase = __webpack_require__(3223);
// EXTERNAL MODULE: ./src/lib/classScores.ts
var classScores = __webpack_require__(5462);
;// ./src/lib/gradebookExport.ts
/**
 * Gradebook `.xlsx` export (Spec 003, T051). FR-014, FR-018, FR-019, SC-007.
 *
 * `exceljs` (research.md R5) is imported dynamically here, inside the
 * function body, so it never lands in the base app bundle - only pulled in
 * when a teacher actually triggers an export (Constitution Art. V.5).
 *
 * COSMETIC CONVENIENCE ONLY (Constitution Art. IX.2) for the query shape -
 * real authorization is RLS on classes/enrollments/assignments/submissions/
 * grades (already covering "own class only"); a bug here would produce a
 * wrong-looking spreadsheet, never leak another teacher's data.
 *
 * The per-student-per-assignment marks computation is shared with Spec 005's
 * Analytics area via `fetchMarksByStudentForAssignments()` (research.md R4)
 * - one implementation of the grades+quiz_best_scores merge, not two.
 */var ANONYMIZED_LABEL='(no name set)';// same convention as roster.tsx/queue.tsx - covers tombstoned students (FR-019)
function client(){return _client.apply(this,arguments);}/**
 * FR-014 - every student (active AND removed, per FR-018/FR-019 - a removed
 * or tombstoned student's marks stay in the gradebook) x every assignment x
 * every mark, as one matrix sheet. Quiz-sourced assignments are scored via
 * `quiz_best_scores` (0023, US6), never `grades` (data-model.md's design
 * decision) - the query for it is skipped entirely when the class has no
 * quiz assignments, and any other failure there is tolerated (treated as "no
 * scores yet") rather than blocking the rest of the export - originally a
 * soft dependency written before US6 existed, kept soft even now that it
 * does (contracts/classes-operations.md §G).
 */function _client(){_client=(0,asyncToGenerator/* default */.A)(/*#__PURE__*/(0,regenerator/* default */.A)().m(function _callee(){var supabase;return (0,regenerator/* default */.A)().w(function(_context){while(1)switch(_context.n){case 0:_context.n=1;return (0,lib_supabase/* getSupabase */.b9)();case 1:supabase=_context.v;if(supabase){_context.n=2;break;}throw new Error('not_configured');case 2:return _context.a(2,supabase);}},_callee);}));return _client.apply(this,arguments);}function exportGradebook(_x){return _exportGradebook.apply(this,arguments);}function _exportGradebook(){_exportGradebook=(0,asyncToGenerator/* default */.A)(/*#__PURE__*/(0,regenerator/* default */.A)().m(function _callee2(classId){var _classRes$error,_assignmentsRes$data,_enrollmentsRes$data;var supabase,_yield$Promise$all,classRes,assignmentsRes,enrollmentsRes,klass,assignments,_yield$fetchMarksBySt,marksByStudent,marksError,rows,ExcelJS,workbook,sheet,_iterator,_step,row,rowData,_iterator2,_step2,a,mark,buffer,blob,url,safeName,link;return (0,regenerator/* default */.A)().w(function(_context2){while(1)switch(_context2.n){case 0:_context2.n=1;return client();case 1:supabase=_context2.v;_context2.n=2;return Promise.all([supabase.from('classes').select('*').eq('id',classId).single(),supabase.from('assignments').select('*').eq('class_id',classId).order('due_at',{ascending:true}),supabase.from('enrollments').select('student_id, profiles(full_name)').eq('class_id',classId)]);case 2:_yield$Promise$all=_context2.v;classRes=_yield$Promise$all[0];assignmentsRes=_yield$Promise$all[1];enrollmentsRes=_yield$Promise$all[2];if(!(classRes.error||!classRes.data)){_context2.n=3;break;}return _context2.a(2,{error:(_classRes$error=classRes.error)!=null?_classRes$error:new Error('class_not_found')});case 3:if(!assignmentsRes.error){_context2.n=4;break;}return _context2.a(2,{error:assignmentsRes.error});case 4:if(!enrollmentsRes.error){_context2.n=5;break;}return _context2.a(2,{error:enrollmentsRes.error});case 5:klass=classRes.data;assignments=(_assignmentsRes$data=assignmentsRes.data)!=null?_assignmentsRes$data:[];_context2.n=6;return (0,classScores/* fetchMarksByStudentForAssignments */.s)(assignments);case 6:_yield$fetchMarksBySt=_context2.v;marksByStudent=_yield$fetchMarksBySt.data;marksError=_yield$fetchMarksBySt.error;if(!(marksError||!marksByStudent)){_context2.n=7;break;}return _context2.a(2,{error:marksError});case 7:rows=((_enrollmentsRes$data=enrollmentsRes.data)!=null?_enrollmentsRes$data:[]).map(function(e){var _e$profiles$full_name,_e$profiles,_marksByStudent$get;return{displayName:(_e$profiles$full_name=(_e$profiles=e.profiles)==null?void 0:_e$profiles.full_name)!=null?_e$profiles$full_name:ANONYMIZED_LABEL,marks:(_marksByStudent$get=marksByStudent.get(e.student_id))!=null?_marksByStudent$get:{}};});_context2.n=8;return __webpack_require__.e(/* import() */ 4974).then(__webpack_require__.t.bind(__webpack_require__, 4974, 23));case 8:ExcelJS=_context2.v["default"];workbook=new ExcelJS.Workbook();sheet=workbook.addWorksheet('Gradebook');sheet.columns=[{header:'Student',key:'student',width:28}].concat(assignments.map(function(a){return{header:a.title,key:a.id,width:16};}));for(_iterator=(0,createForOfIteratorHelperLoose/* default */.A)(rows);!(_step=_iterator()).done;){row=_step.value;rowData={student:row.displayName};for(_iterator2=(0,createForOfIteratorHelperLoose/* default */.A)(assignments);!(_step2=_iterator2()).done;){a=_step2.value;mark=row.marks[a.id];if(mark!==undefined)rowData[a.id]=mark;}sheet.addRow(rowData);}_context2.n=9;return workbook.xlsx.writeBuffer();case 9:buffer=_context2.v;blob=new Blob([buffer],{type:'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'});url=URL.createObjectURL(blob);safeName=(klass.course_code+"-"+klass.name).replace(/[^\w.-]+/g,'_');link=document.createElement('a');link.href=url;link.download=safeName+"-gradebook.xlsx";document.body.appendChild(link);link.click();link.remove();URL.revokeObjectURL(url);return _context2.a(2,{error:null});}},_callee2);}));return _exportGradebook.apply(this,arguments);}
// EXTERNAL MODULE: ./node_modules/react/jsx-runtime.js
var jsx_runtime = __webpack_require__(4848);
;// ./src/pages/app/classes/gradebook.tsx
/**
 * Gradebook export (Spec 003, T052/T062). Teacher-only export button
 * triggering a client-side `.xlsx` generation and download - no export
 * endpoint (R5). Bilingual status/error text (FR-016).
 */var MESSAGES={loading:{en:'Loading…',ur:'لوڈ ہو رہا ہے…'},noAccess:{en:"You don't have access to this class.",ur:'اس کلاس تک آپ کی رسائی نہیں ہے۔'},exportError:{en:'Could not export the gradebook. Please try again.',ur:'گریڈ بک ایکسپورٹ نہیں ہو سکی۔ براہِ کرم دوبارہ کوشش کریں۔'},exporting:{en:'Exporting…',ur:'ایکسپورٹ ہو رہی ہے…'}};function GradebookContent(_ref){var classId=_ref.classId;var _useDocusaurusContext=(0,useDocusaurusContext/* default */.A)(),i18n=_useDocusaurusContext.i18n;var locale=i18n.currentLocale==='ur'?'ur':'en';var _useClassRole=(0,ClassContext/* useClassRole */.Y)(classId),loading=_useClassRole.loading,classRow=_useClassRole.classRow,role=_useClassRole.role;var _useState=(0,react.useState)(false),exporting=_useState[0],setExporting=_useState[1];var _useState2=(0,react.useState)(null),error=_useState2[0],setError=_useState2[1];function handleExport(){return _handleExport.apply(this,arguments);}function _handleExport(){_handleExport=(0,asyncToGenerator/* default */.A)(/*#__PURE__*/(0,regenerator/* default */.A)().m(function _callee(){var _yield$exportGradeboo,exportError;return (0,regenerator/* default */.A)().w(function(_context){while(1)switch(_context.n){case 0:setError(null);setExporting(true);_context.n=1;return exportGradebook(classId);case 1:_yield$exportGradeboo=_context.v;exportError=_yield$exportGradeboo.error;setExporting(false);if(exportError)setError(MESSAGES.exportError[locale]);case 2:return _context.a(2);}},_callee);}));return _handleExport.apply(this,arguments);}if(loading)return/*#__PURE__*/(0,jsx_runtime.jsx)("p",{children:MESSAGES.loading[locale]});if(!classRow||role!=='teacher'){return/*#__PURE__*/(0,jsx_runtime.jsx)("div",{className:"alert alert--danger",role:"alert","aria-live":"assertive",children:MESSAGES.noAccess[locale]});}return/*#__PURE__*/(0,jsx_runtime.jsxs)("div",{children:[/*#__PURE__*/(0,jsx_runtime.jsxs)("h2",{children:["Gradebook - ",classRow.name]}),/*#__PURE__*/(0,jsx_runtime.jsxs)("p",{children:[classRow.course_code," - ",classRow.term_label]}),error&&/*#__PURE__*/(0,jsx_runtime.jsx)("div",{className:"alert alert--danger",role:"alert","aria-live":"assertive",children:error}),/*#__PURE__*/(0,jsx_runtime.jsx)("button",{type:"button",className:"button button--primary",disabled:exporting,onClick:handleExport,children:exporting?MESSAGES.exporting[locale]:'Export gradebook'})]});}function GradebookPage(){var classId=(0,ClassContext/* useQueryParam */.p)('classId');return/*#__PURE__*/(0,jsx_runtime.jsx)(Layout/* default */.A,{title:"Gradebook",children:/*#__PURE__*/(0,jsx_runtime.jsx)(AuthGuard/* default */.A,{requireRole:"teacher",children:/*#__PURE__*/(0,jsx_runtime.jsx)("main",{className:"container auth-page margin-vert--lg",children:classId?/*#__PURE__*/(0,jsx_runtime.jsx)(GradebookContent,{classId:classId}):/*#__PURE__*/(0,jsx_runtime.jsx)("p",{children:"No class selected."})})})});}

/***/ }

}]);