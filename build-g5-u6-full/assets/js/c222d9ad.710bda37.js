"use strict";
(self["webpackChunkbed_mega_textbook"] = self["webpackChunkbed_mega_textbook"] || []).push([[3266],{

/***/ 6158
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  assets: () => (/* binding */ assets),
  contentTitle: () => (/* binding */ contentTitle),
  "default": () => (/* binding */ MDXContent),
  frontMatter: () => (/* binding */ frontMatter),
  metadata: () => (/* reexport */ site_guides_teacher_guide_grade_submissions_mdx_c22_namespaceObject),
  toc: () => (/* binding */ toc)
});

;// ./.docusaurus/docusaurus-plugin-content-docs/guides/site-guides-teacher-guide-grade-submissions-mdx-c22.json
const site_guides_teacher_guide_grade_submissions_mdx_c22_namespaceObject = /*#__PURE__*/JSON.parse('{"id":"teacher-guide/grade-submissions","title":"Grade submissions","description":"Open an assignment\'s grading queue from its class page to see every actively","source":"@site/guides/teacher-guide/grade-submissions.mdx","sourceDirName":"teacher-guide","slug":"/teacher-guide/grade-submissions","permalink":"/guides/teacher-guide/grade-submissions","draft":false,"unlisted":false,"tags":[],"version":"current","sidebarPosition":3,"frontMatter":{"title":"Grade submissions","sidebar_position":3},"sidebar":"guides","previous":{"title":"Manage classes and assignments","permalink":"/guides/teacher-guide/manage-classes-and-assignments"},"next":{"title":"Use the teacher dashboard","permalink":"/guides/teacher-guide/use-the-teacher-dashboard"}}');
// EXTERNAL MODULE: ./node_modules/react/jsx-runtime.js
var jsx_runtime = __webpack_require__(4848);
// EXTERNAL MODULE: ./node_modules/@mdx-js/react/lib/index.js
var lib = __webpack_require__(8453);
;// ./guides/teacher-guide/grade-submissions.mdx


const frontMatter = {
	title: 'Grade submissions',
	sidebar_position: 3
};
const contentTitle = 'Grade submissions';

const assets = {

};



const toc = [{
  "value": "Grading and returning",
  "id": "grading-and-returning",
  "level": 2
}, {
  "value": "Tombstoned students",
  "id": "tombstoned-students",
  "level": 2
}, {
  "value": "Answer keys and rubrics",
  "id": "answer-keys-and-rubrics",
  "level": 2
}];
function _createMdxContent(props) {
  const _components = {
    a: "a",
    h1: "h1",
    h2: "h2",
    header: "header",
    p: "p",
    ...(0,lib/* useMDXComponents */.R)(),
    ...props.components
  };
  return (0,jsx_runtime.jsxs)(jsx_runtime.Fragment, {
    children: [(0,jsx_runtime.jsx)(_components.header, {
      children: (0,jsx_runtime.jsx)(_components.h1, {
        id: "grade-submissions",
        children: "Grade submissions"
      })
    }), "\n", (0,jsx_runtime.jsx)(_components.p, {
      children: "Open an assignment's grading queue from its class page to see every actively\nenrolled student, each shown as not-yet-submitted, submitted, late, or\nalready graded."
    }), "\n", (0,jsx_runtime.jsx)(_components.h2, {
      id: "grading-and-returning",
      children: "Grading and returning"
    }), "\n", (0,jsx_runtime.jsx)(_components.p, {
      children: "Entering a mark and feedback returns the submission to the student in the\nsame action - there is no separate \"save draft\" step. A mark can't exceed\nthe assignment's own maximum; the system rejects an out-of-range entry and\nasks for a valid one. You can go back and correct an already-returned grade\nat any time; the student's next visit shows the corrected value."
    }), "\n", (0,jsx_runtime.jsx)(_components.h2, {
      id: "tombstoned-students",
      children: "Tombstoned students"
    }), "\n", (0,jsx_runtime.jsx)(_components.p, {
      children: "If a student's account has since been deleted, their past submissions and\ngrades remain in the gradebook exactly as they were, just displayed without\nidentifying them by name."
    }), "\n", (0,jsx_runtime.jsx)(_components.h2, {
      id: "answer-keys-and-rubrics",
      children: "Answer keys and rubrics"
    }), "\n", (0,jsx_runtime.jsxs)(_components.p, {
      children: ["If you hold the verified-teacher capability, the official correct-answer\nreference or marking rubric for a formative or summative unit item is\navailable directly from the grading queue - see\n", (0,jsx_runtime.jsx)(_components.a, {
        href: "../verified-teacher-material",
        children: "Verified-teacher material"
      }), " for what this\ncapability covers and how to get it."]
    })]
  });
}
function MDXContent(props = {}) {
  const {wrapper: MDXLayout} = {
    ...(0,lib/* useMDXComponents */.R)(),
    ...props.components
  };
  return MDXLayout ? (0,jsx_runtime.jsx)(MDXLayout, {
    ...props,
    children: (0,jsx_runtime.jsx)(_createMdxContent, {
      ...props
    })
  }) : _createMdxContent(props);
}



/***/ },

/***/ 8453
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   R: () => (/* binding */ useMDXComponents),
/* harmony export */   x: () => (/* binding */ MDXProvider)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6540);
/**
 * @import {MDXComponents} from 'mdx/types.js'
 * @import {Component, ReactElement, ReactNode} from 'react'
 */

/**
 * @callback MergeComponents
 *   Custom merge function.
 * @param {Readonly<MDXComponents>} currentComponents
 *   Current components from the context.
 * @returns {MDXComponents}
 *   Additional components.
 *
 * @typedef Props
 *   Configuration for `MDXProvider`.
 * @property {ReactNode | null | undefined} [children]
 *   Children (optional).
 * @property {Readonly<MDXComponents> | MergeComponents | null | undefined} [components]
 *   Additional components to use or a function that creates them (optional).
 * @property {boolean | null | undefined} [disableParentContext=false]
 *   Turn off outer component context (default: `false`).
 */



/** @type {Readonly<MDXComponents>} */
const emptyComponents = {}

const MDXContext = react__WEBPACK_IMPORTED_MODULE_0__.createContext(emptyComponents)

/**
 * Get current components from the MDX Context.
 *
 * @param {Readonly<MDXComponents> | MergeComponents | null | undefined} [components]
 *   Additional components to use or a function that creates them (optional).
 * @returns {MDXComponents}
 *   Current components.
 */
function useMDXComponents(components) {
  const contextComponents = react__WEBPACK_IMPORTED_MODULE_0__.useContext(MDXContext)

  // Memoize to avoid unnecessary top-level context changes
  return react__WEBPACK_IMPORTED_MODULE_0__.useMemo(
    function () {
      // Custom merge via a function prop
      if (typeof components === 'function') {
        return components(contextComponents)
      }

      return {...contextComponents, ...components}
    },
    [contextComponents, components]
  )
}

/**
 * Provider for MDX context.
 *
 * @param {Readonly<Props>} properties
 *   Properties.
 * @returns {ReactElement}
 *   Element.
 * @satisfies {Component}
 */
function MDXProvider(properties) {
  /** @type {Readonly<MDXComponents>} */
  let allComponents

  if (properties.disableParentContext) {
    allComponents =
      typeof properties.components === 'function'
        ? properties.components(emptyComponents)
        : properties.components || emptyComponents
  } else {
    allComponents = useMDXComponents(properties.components)
  }

  return react__WEBPACK_IMPORTED_MODULE_0__.createElement(
    MDXContext.Provider,
    {value: allComponents},
    properties.children
  )
}


/***/ }

}]);