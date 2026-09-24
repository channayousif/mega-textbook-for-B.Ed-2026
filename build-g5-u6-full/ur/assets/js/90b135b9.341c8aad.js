"use strict";
(self["webpackChunkbed_mega_textbook"] = self["webpackChunkbed_mega_textbook"] || []).push([[8072],{

/***/ 1099
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  assets: () => (/* binding */ assets),
  contentTitle: () => (/* binding */ contentTitle),
  "default": () => (/* binding */ MDXContent),
  frontMatter: () => (/* binding */ frontMatter),
  metadata: () => (/* reexport */ site_i_18_n_ur_docusaurus_plugin_content_docs_guides_current_student_guide_read_grades_mdx_90b_namespaceObject),
  toc: () => (/* binding */ toc)
});

;// ./.docusaurus/docusaurus-plugin-content-docs/guides/site-i-18-n-ur-docusaurus-plugin-content-docs-guides-current-student-guide-read-grades-mdx-90b.json
const site_i_18_n_ur_docusaurus_plugin_content_docs_guides_current_student_guide_read_grades_mdx_90b_namespaceObject = /*#__PURE__*/JSON.parse('{"id":"student-guide/read-grades","title":"اپنے گریڈز پڑھیں","description":"آپ کا گریڈز ایریا (ڈیش بورڈ کا حصہ) ہر کلاس میں چیک کی گئی ہر اسائنمنٹ","source":"@site/i18n/ur/docusaurus-plugin-content-docs-guides/current/student-guide/read-grades.mdx","sourceDirName":"student-guide","slug":"/student-guide/read-grades","permalink":"/ur/guides/student-guide/read-grades","draft":false,"unlisted":false,"tags":[],"version":"current","sidebarPosition":5,"frontMatter":{"title":"اپنے گریڈز پڑھیں","sidebar_position":5},"sidebar":"guides","previous":{"title":"کام جمع کرائیں","permalink":"/ur/guides/student-guide/submit-work"},"next":{"title":"ڈیش بورڈ استعمال کریں","permalink":"/ur/guides/student-guide/use-the-dashboard"}}');
// EXTERNAL MODULE: ./node_modules/react/jsx-runtime.js
var jsx_runtime = __webpack_require__(4848);
// EXTERNAL MODULE: ./node_modules/@mdx-js/react/lib/index.js
var lib = __webpack_require__(8453);
;// ./i18n/ur/docusaurus-plugin-content-docs-guides/current/student-guide/read-grades.mdx


const frontMatter = {
	title: 'اپنے گریڈز پڑھیں',
	sidebar_position: 5
};
const contentTitle = 'اپنے گریڈز پڑھیں';

const assets = {

};



const toc = [];
function _createMdxContent(props) {
  const _components = {
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
        id: "اپنے-گریڈز-پڑھیں",
        children: "اپنے گریڈز پڑھیں"
      })
    }), "\n", (0,jsx_runtime.jsxs)(_components.p, {
      children: ["آپ کا ", (0,jsx_runtime.jsx)(_components.strong, {
        children: "گریڈز"
      }), " ایریا (ڈیش بورڈ کا حصہ) ہر کلاس میں چیک کی گئی ہر اسائنمنٹ\nاور کوئز کو ان کے نمبر اور زیادہ سے زیادہ ممکنہ نمبر کے ساتھ فہرست کرتا ہے۔\nآپ کا ڈیش بورڈ ہوم بھی آپ کے 5 حالیہ ترین نتائج کا پیش منظر دکھاتا ہے۔"]
    }), "\n", (0,jsx_runtime.jsx)(_components.p, {
      children: "کچھ چیزیں ہر جگہ درست ہیں جہاں آپ کے گریڈز دکھائے جاتے ہیں:"
    }), "\n", (0,jsx_runtime.jsxs)(_components.ul, {
      children: ["\n", (0,jsx_runtime.jsx)(_components.li, {
        children: "کوئی کلاس یا گروپ کا اوسط کبھی بھی آپ کے نمبر کے ساتھ نہیں دکھایا جاتا -\nصرف آپ کا اپنا نتیجہ۔"
      }), "\n", (0,jsx_runtime.jsx)(_components.li, {
        children: "اگر استاد گریڈ واپس کرنے کے بعد اسے درست کرتا ہے، تو آپ ہمیشہ درست شدہ\nقدر دیکھتے ہیں، کبھی اصل نہیں۔"
      }), "\n", (0,jsx_runtime.jsx)(_components.li, {
        children: "کوئز اسکور آپ کے کوشش جمع کراتے ہی خود بخود شمار ہو جاتے ہیں؛ اسائنمنٹ کے\nنمبر آپ کے استاد کے کام چیک کرنے کے بعد ظاہر ہوتے ہیں۔"
      }), "\n"]
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