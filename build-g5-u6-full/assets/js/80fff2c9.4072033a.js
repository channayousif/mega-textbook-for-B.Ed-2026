"use strict";
(self["webpackChunkbed_mega_textbook"] = self["webpackChunkbed_mega_textbook"] || []).push([[5423],{

/***/ 7997
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  assets: () => (/* binding */ assets),
  contentTitle: () => (/* binding */ contentTitle),
  "default": () => (/* binding */ MDXContent),
  frontMatter: () => (/* binding */ frontMatter),
  metadata: () => (/* reexport */ site_docs_semester_1_gict_300_unit_01_activities_mdx_80f_namespaceObject),
  toc: () => (/* binding */ toc)
});

;// ./.docusaurus/docusaurus-plugin-content-docs/default/site-docs-semester-1-gict-300-unit-01-activities-mdx-80f.json
const site_docs_semester_1_gict_300_unit_01_activities_mdx_80f_namespaceObject = /*#__PURE__*/JSON.parse('{"id":"semester-1/gict-300/unit-01/activities","title":"Application of ICT - Unit 1 · Activities (coming soon)","description":"This unit has not been authored yet. It is scaffolded so navigation has no dead ends.","source":"@site/docs/semester-1/gict-300/unit-01/activities.mdx","sourceDirName":"semester-1/gict-300/unit-01","slug":"/semester-1/gict-300/unit-01/activities","permalink":"/semester-1/gict-300/unit-01/activities","draft":false,"unlisted":false,"tags":[],"version":"current","frontMatter":{"title":"Application of ICT - Unit 1 · Activities (coming soon)","course_code":"GICT-300","unit_no":1,"clo_refs":["SLO:GICT-300-1-1"],"blooms_summary":"To be authored.","est_reading_minutes":1,"translation_status":"draft","coming_soon":true},"sidebar":"textbook","previous":{"title":"Application of ICT - Unit 1 · Content (coming soon)","permalink":"/semester-1/gict-300/unit-01/"},"next":{"title":"Application of ICT - Unit 1 · Formative (coming soon)","permalink":"/semester-1/gict-300/unit-01/formative"}}');
// EXTERNAL MODULE: ./node_modules/react/jsx-runtime.js
var jsx_runtime = __webpack_require__(4848);
// EXTERNAL MODULE: ./node_modules/@mdx-js/react/lib/index.js
var lib = __webpack_require__(8453);
// EXTERNAL MODULE: ./node_modules/@docusaurus/core/lib/client/exports/Head.js
var Head = __webpack_require__(5260);
;// ./docs/semester-1/gict-300/unit-01/activities.mdx


const frontMatter = {
	title: 'Application of ICT - Unit 1 · Activities (coming soon)',
	course_code: 'GICT-300',
	unit_no: 1,
	clo_refs: [
		'SLO:GICT-300-1-1'
	],
	blooms_summary: 'To be authored.',
	est_reading_minutes: 1,
	translation_status: 'draft',
	coming_soon: true
};
const contentTitle = 'Application of ICT - Unit 1 (Activities)';

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
        id: "application-of-ict---unit-1-activities",
        children: "Application of ICT - Unit 1 (Activities)"
      })
    }), "\n", (0,jsx_runtime.jsx)(_components.admonition, {
      title: "Coming soon",
      type: "info",
      children: (0,jsx_runtime.jsx)(_components.p, {
        children: "This unit has not been authored yet. It is scaffolded so navigation has no dead ends."
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