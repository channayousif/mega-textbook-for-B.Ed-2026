"use strict";
(self["webpackChunkbed_mega_textbook"] = self["webpackChunkbed_mega_textbook"] || []).push([[5206],{

/***/ 857
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  assets: () => (/* binding */ assets),
  contentTitle: () => (/* binding */ contentTitle),
  "default": () => (/* binding */ MDXContent),
  frontMatter: () => (/* binding */ frontMatter),
  metadata: () => (/* reexport */ site_docs_semester_1_gict_300_course_overview_mdx_a2c_namespaceObject),
  toc: () => (/* binding */ toc)
});

;// ./.docusaurus/docusaurus-plugin-content-docs/default/site-docs-semester-1-gict-300-course-overview-mdx-a2c.json
const site_docs_semester_1_gict_300_course_overview_mdx_a2c_namespaceObject = /*#__PURE__*/JSON.parse('{"id":"semester-1/gict-300/course-overview","title":"Application of ICT - Course Overview","description":"GICT-300 Application of ICT for the B.Ed (4-Year) programme: computers and digital tools for teaching. Units, outcomes, assessment.","source":"@site/docs/semester-1/gict-300/course-overview.mdx","sourceDirName":"semester-1/gict-300","slug":"/semester-1/gict-300/course-overview","permalink":"/semester-1/gict-300/course-overview","draft":false,"unlisted":false,"tags":[],"version":"current","frontMatter":{"title":"Application of ICT - Course Overview","description":"GICT-300 Application of ICT for the B.Ed (4-Year) programme: computers and digital tools for teaching. Units, outcomes, assessment.","course_code":"GICT-300","credit_hours":"3 (2-1)","category":"General Education"},"sidebar":"textbook","previous":{"title":"Application of ICT - Unit 1 · Teacher Notes (coming soon)","permalink":"/semester-1/gict-300/unit-01/teacher-notes"},"next":{"title":"Foundations of Quantitative Reasoning","permalink":"/semester-1/gqur-300/unit-01/"}}');
// EXTERNAL MODULE: ./node_modules/react/jsx-runtime.js
var jsx_runtime = __webpack_require__(4848);
// EXTERNAL MODULE: ./node_modules/@mdx-js/react/lib/index.js
var lib = __webpack_require__(8453);
// EXTERNAL MODULE: ./node_modules/@docusaurus/core/lib/client/exports/Head.js
var Head = __webpack_require__(5260);
;// ./docs/semester-1/gict-300/course-overview.mdx


const frontMatter = {
	title: 'Application of ICT - Course Overview',
	description: 'GICT-300 Application of ICT for the B.Ed (4-Year) programme: computers and digital tools for teaching. Units, outcomes, assessment.',
	course_code: 'GICT-300',
	credit_hours: '3 (2-1)',
	category: 'General Education'
};
const contentTitle = 'Application of ICT - Course Overview';

const assets = {

};




const toc = [];
function _createMdxContent(props) {
  const _components = {
    admonition: "admonition",
    h1: "h1",
    header: "header",
    p: "p",
    ...(0,lib/* useMDXComponents */.R)(),
    ...props.components
  };
  return (0,jsx_runtime.jsxs)(jsx_runtime.Fragment, {
    children: [(0,jsx_runtime.jsx)(Head/* default */.A, {
      children: (0,jsx_runtime.jsx)("meta", {
        name: "robots",
        content: "noindex"
      })
    }), "\n", (0,jsx_runtime.jsx)(_components.header, {
      children: (0,jsx_runtime.jsx)(_components.h1, {
        id: "application-of-ict---course-overview",
        children: "Application of ICT - Course Overview"
      })
    }), "\n", (0,jsx_runtime.jsx)(_components.admonition, {
      title: "Coming soon",
      type: "info",
      children: (0,jsx_runtime.jsx)(_components.p, {
        children: "Course overview to be authored from the course guide."
      })
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