"use strict";
(self["webpackChunkbed_mega_textbook"] = self["webpackChunkbed_mega_textbook"] || []).push([[4844],{

/***/ 8665
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  assets: () => (/* binding */ assets),
  contentTitle: () => (/* binding */ contentTitle),
  "default": () => (/* binding */ MDXContent),
  frontMatter: () => (/* binding */ frontMatter),
  metadata: () => (/* reexport */ site_licence_eed_313_course_overview_mdx_083_namespaceObject),
  toc: () => (/* binding */ toc)
});

;// ./.docusaurus/docusaurus-plugin-content-docs/licence/site-licence-eed-313-course-overview-mdx-083.json
const site_licence_eed_313_course_overview_mdx_083_namespaceObject = /*#__PURE__*/JSON.parse('{"id":"eed-313/course-overview","title":"Classroom Management - Course Overview","description":"Course overview for EED-313 Classroom Management, a licence-track module covering the Sindh Teaching Licence syllabus area that the 2026 B.Ed scheme does not teach.","source":"@site/licence/eed-313/course-overview.mdx","sourceDirName":"eed-313","slug":"/eed-313/course-overview","permalink":"/ur/licence/eed-313/course-overview","draft":false,"unlisted":false,"tags":[],"version":"current","frontMatter":{"title":"Classroom Management - Course Overview","description":"Course overview for EED-313 Classroom Management, a licence-track module covering the Sindh Teaching Licence syllabus area that the 2026 B.Ed scheme does not teach.","course_code":"EED-313","credit_hours":"3 (3-0)","category":"Licence track","bilingual":true,"coming_soon":true,"assessment_weighting":{"summative":60,"formative":40},"resources":[{"ref":"HEC pre-service course guide, Classroom Management. See specs/content/eed-313/content-spec.md.","type":"course-guide"}]},"sidebar":"licenceSidebar","previous":{"title":"لائسنس ٹریک","permalink":"/ur/licence/"},"next":{"title":"Learning theories and classroom management","permalink":"/ur/licence/eed-313/unit-01/"}}');
// EXTERNAL MODULE: ./node_modules/react/jsx-runtime.js
var jsx_runtime = __webpack_require__(4848);
// EXTERNAL MODULE: ./node_modules/@mdx-js/react/lib/index.js
var lib = __webpack_require__(8453);
;// ./licence/eed-313/course-overview.mdx


const frontMatter = {
	title: 'Classroom Management - Course Overview',
	description: 'Course overview for EED-313 Classroom Management, a licence-track module covering the Sindh Teaching Licence syllabus area that the 2026 B.Ed scheme does not teach.',
	course_code: 'EED-313',
	credit_hours: '3 (3-0)',
	category: 'Licence track',
	bilingual: true,
	coming_soon: true,
	assessment_weighting: {
		summative: 60,
		formative: 40
	},
	resources: [
		{
			ref: 'HEC pre-service course guide, Classroom Management. See specs/content/eed-313/content-spec.md.',
			type: 'course-guide'
		}
	]
};
const contentTitle = 'Classroom Management';

const assets = {

};



const toc = [{
  "value": "Units",
  "id": "units",
  "level": 2
}];
function _createMdxContent(props) {
  const _components = {
    a: "a",
    code: "code",
    h1: "h1",
    h2: "h2",
    header: "header",
    li: "li",
    ol: "ol",
    p: "p",
    strong: "strong",
    ...(0,lib/* useMDXComponents */.R)(),
    ...props.components
  };
  return (0,jsx_runtime.jsxs)(jsx_runtime.Fragment, {
    children: [(0,jsx_runtime.jsx)(_components.header, {
      children: (0,jsx_runtime.jsx)(_components.h1, {
        id: "classroom-management",
        children: "Classroom Management"
      })
    }), "\n", (0,jsx_runtime.jsxs)(_components.p, {
      children: [(0,jsx_runtime.jsx)(_components.strong, {
        children: "Licence track."
      }), " This course is not part of the approved 2026 B.Ed scheme. It was ", (0,jsx_runtime.jsx)(_components.code, {
        children: "EED-313"
      }), ", a\nFoundation course in the 2025 scheme, which the 2026 revision restructured away with no successor.\nThe Sindh Teaching Licence (Elementary) test still assesses it, at the weight of two sampled\nconstructed-response items, which is why it is authored here rather than inside a degree course."]
    }), "\n", (0,jsx_runtime.jsx)(_components.h2, {
      id: "units",
      children: "Units"
    }), "\n", (0,jsx_runtime.jsx)(_components.p, {
      children: "Four units are specified and not yet authored:"
    }), "\n", (0,jsx_runtime.jsxs)(_components.ol, {
      children: ["\n", (0,jsx_runtime.jsx)(_components.li, {
        children: "Learning theories and classroom management"
      }), "\n", (0,jsx_runtime.jsx)(_components.li, {
        children: "Curriculum and classroom management"
      }), "\n", (0,jsx_runtime.jsx)(_components.li, {
        children: "Routines, schedules, and time management in diverse classrooms"
      }), "\n", (0,jsx_runtime.jsx)(_components.li, {
        children: "Creating shared values and community"
      }), "\n"]
    }), "\n", (0,jsx_runtime.jsxs)(_components.p, {
      children: ["The unit specifications are in\n", (0,jsx_runtime.jsx)(_components.a, {
        href: "https://github.com/channayousif/mega-textbook-for-B.Ed-2026/blob/main/specs/content/eed-313/content-spec.md",
        children: (0,jsx_runtime.jsx)(_components.code, {
          children: "specs/content/eed-313/content-spec.md"
        })
      }), ",\nand the licence-syllabus mapping is in ", (0,jsx_runtime.jsx)(_components.code, {
        children: "specs/content/licence-blueprint.md"
      }), "."]
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