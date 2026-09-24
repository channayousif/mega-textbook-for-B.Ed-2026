"use strict";
(self["webpackChunkbed_mega_textbook"] = self["webpackChunkbed_mega_textbook"] || []).push([[8203],{

/***/ 1810
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  assets: () => (/* binding */ assets),
  contentTitle: () => (/* binding */ contentTitle),
  "default": () => (/* binding */ MDXContent),
  frontMatter: () => (/* binding */ frontMatter),
  metadata: () => (/* reexport */ site_guides_teacher_guide_verified_teacher_material_mdx_b07_namespaceObject),
  toc: () => (/* binding */ toc)
});

;// ./.docusaurus/docusaurus-plugin-content-docs/guides/site-guides-teacher-guide-verified-teacher-material-mdx-b07.json
const site_guides_teacher_guide_verified_teacher_material_mdx_b07_namespaceObject = /*#__PURE__*/JSON.parse('{"id":"teacher-guide/verified-teacher-material","title":"Verified-teacher material","description":"Every teacher can create classes, assign work, and grade - that\'s the","source":"@site/guides/teacher-guide/verified-teacher-material.mdx","sourceDirName":"teacher-guide","slug":"/teacher-guide/verified-teacher-material","permalink":"/guides/teacher-guide/verified-teacher-material","draft":false,"unlisted":false,"tags":[],"version":"current","sidebarPosition":6,"frontMatter":{"title":"Verified-teacher material","sidebar_position":6},"sidebar":"guides","previous":{"title":"Give feedback and suggest improvements","permalink":"/guides/teacher-guide/give-feedback-and-suggest-improvements"},"next":{"title":"Reviewing and certifying a unit","permalink":"/guides/teacher-guide/review-and-certify"}}');
// EXTERNAL MODULE: ./node_modules/react/jsx-runtime.js
var jsx_runtime = __webpack_require__(4848);
// EXTERNAL MODULE: ./node_modules/@mdx-js/react/lib/index.js
var lib = __webpack_require__(8453);
;// ./guides/teacher-guide/verified-teacher-material.mdx


const frontMatter = {
	title: 'Verified-teacher material',
	sidebar_position: 6
};
const contentTitle = 'Verified-teacher material';

const assets = {

};



const toc = [];
function _createMdxContent(props) {
  const _components = {
    code: "code",
    h1: "h1",
    header: "header",
    li: "li",
    p: "p",
    strong: "strong",
    ul: "ul",
    ...(0,lib/* useMDXComponents */.R)(),
    ...props.components
  };
  return (0,jsx_runtime.jsxs)(jsx_runtime.Fragment, {
    children: [(0,jsx_runtime.jsx)(_components.header, {
      children: (0,jsx_runtime.jsx)(_components.h1, {
        id: "verified-teacher-material",
        children: "Verified-teacher material"
      })
    }), "\n", (0,jsx_runtime.jsxs)(_components.p, {
      children: ["Every teacher can create classes, assign work, and grade - that's the\n", (0,jsx_runtime.jsx)(_components.code, {
        children: "teacher"
      }), " role itself, and it needs no special approval. A separate\ncapability, ", (0,jsx_runtime.jsx)(_components.strong, {
        children: "verified teacher"
      }), ", unlocks access to restricted material:"]
    }), "\n", (0,jsx_runtime.jsxs)(_components.ul, {
      children: ["\n", (0,jsx_runtime.jsx)(_components.li, {
        children: "The official correct-answer reference or marking rubric for a formative\nor summative unit item, shown directly in the grading queue."
      }), "\n", (0,jsx_runtime.jsx)(_components.li, {
        children: "The correct-answer data behind practice quizzes (the quiz questions\nthemselves are visible to everyone; only the correct-answer reference is\nrestricted)."
      }), "\n"]
    }), "\n", (0,jsx_runtime.jsx)(_components.p, {
      children: "Verified-teacher status is granted only by an admin - it isn't something you\ncan switch on for yourself, and it doesn't change anything else about your\naccount or your classes. If you believe you should have this capability and\ndon't, contact your platform administrator."
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