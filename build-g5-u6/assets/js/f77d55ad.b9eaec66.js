"use strict";
(self["webpackChunkbed_mega_textbook"] = self["webpackChunkbed_mega_textbook"] || []).push([[5170],{

/***/ 1991
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  assets: () => (/* binding */ assets),
  contentTitle: () => (/* binding */ contentTitle),
  "default": () => (/* binding */ MDXContent),
  frontMatter: () => (/* binding */ frontMatter),
  metadata: () => (/* reexport */ site_i_18_n_ur_docusaurus_plugin_content_docs_guides_current_student_guide_index_mdx_f77_namespaceObject),
  toc: () => (/* binding */ toc)
});

;// ./.docusaurus/docusaurus-plugin-content-docs/guides/site-i-18-n-ur-docusaurus-plugin-content-docs-guides-current-student-guide-index-mdx-f77.json
const site_i_18_n_ur_docusaurus_plugin_content_docs_guides_current_student_guide_index_mdx_f77_namespaceObject = /*#__PURE__*/JSON.parse('{"id":"student-guide/index","title":"طلبہ کی رہنمائی","description":"یہ رہنما بتاتا ہے کہ بی ایڈ میگا ٹیکسٹ بک پلیٹ فارم کو ایک طالب علم کے طور پر","source":"@site/i18n/ur/docusaurus-plugin-content-docs-guides/current/student-guide/index.mdx","sourceDirName":"student-guide","slug":"/student-guide/","permalink":"/guides/student-guide/","draft":false,"unlisted":false,"tags":[],"version":"current","sidebarPosition":1,"frontMatter":{"title":"طلبہ کی رہنمائی","sidebar_position":1},"sidebar":"guides","next":{"title":"پلیٹ فارم پر تشریف لے جائیں","permalink":"/guides/student-guide/navigate-the-platform"}}');
// EXTERNAL MODULE: ./node_modules/react/jsx-runtime.js
var jsx_runtime = __webpack_require__(4848);
// EXTERNAL MODULE: ./node_modules/@mdx-js/react/lib/index.js
var lib = __webpack_require__(8453);
;// ./i18n/ur/docusaurus-plugin-content-docs-guides/current/student-guide/index.mdx


const frontMatter = {
	title: 'طلبہ کی رہنمائی',
	sidebar_position: 1
};
const contentTitle = 'طلبہ کی رہنمائی';

const assets = {

};



const toc = [];
function _createMdxContent(props) {
  const _components = {
    a: "a",
    h1: "h1",
    header: "header",
    li: "li",
    p: "p",
    ul: "ul",
    ...(0,lib/* useMDXComponents */.R)(),
    ...props.components
  };
  return (0,jsx_runtime.jsxs)(jsx_runtime.Fragment, {
    children: [(0,jsx_runtime.jsx)(_components.header, {
      children: (0,jsx_runtime.jsx)(_components.h1, {
        id: "طلبہ-کی-رہنمائی",
        children: "طلبہ کی رہنمائی"
      })
    }), "\n", (0,jsx_runtime.jsx)(_components.p, {
      children: "یہ رہنما بتاتا ہے کہ بی ایڈ میگا ٹیکسٹ بک پلیٹ فارم کو ایک طالب علم کے طور پر\nکیسے استعمال کیا جائے - سائٹ پر رستہ تلاش کرنے سے لے کر، کلاس میں شامل ہونے،\nکام جمع کرانے، اپنے گریڈز پڑھنے، اور اپنے ذاتی ڈیش بورڈ کے استعمال تک۔"
    }), "\n", (0,jsx_runtime.jsxs)(_components.ul, {
      children: ["\n", (0,jsx_runtime.jsx)(_components.li, {
        children: (0,jsx_runtime.jsx)(_components.a, {
          href: "./navigate-the-platform",
          children: "پلیٹ فارم پر تشریف لے جائیں"
        })
      }), "\n", (0,jsx_runtime.jsx)(_components.li, {
        children: (0,jsx_runtime.jsx)(_components.a, {
          href: "./join-a-class",
          children: "کلاس میں شامل ہوں"
        })
      }), "\n", (0,jsx_runtime.jsx)(_components.li, {
        children: (0,jsx_runtime.jsx)(_components.a, {
          href: "./submit-work",
          children: "کام جمع کرائیں"
        })
      }), "\n", (0,jsx_runtime.jsx)(_components.li, {
        children: (0,jsx_runtime.jsx)(_components.a, {
          href: "./read-grades",
          children: "اپنے گریڈز پڑھیں"
        })
      }), "\n", (0,jsx_runtime.jsx)(_components.li, {
        children: (0,jsx_runtime.jsx)(_components.a, {
          href: "./use-the-dashboard",
          children: "ڈیش بورڈ استعمال کریں"
        })
      }), "\n"]
    }), "\n", (0,jsx_runtime.jsx)(_components.p, {
      children: "اگر اس رہنما میں کچھ اسکرین پر نظر آنے والی چیز سے مماثل نہیں تو ایپ خود ہی\nدرست معلومات کا ذریعہ ہے - یہ رہنما مطلوبہ رویہ بیان کرتا ہے، انٹرفیس کی ہر\nتفصیل نہیں۔"
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