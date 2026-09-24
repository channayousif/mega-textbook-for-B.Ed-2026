"use strict";
(self["webpackChunkbed_mega_textbook"] = self["webpackChunkbed_mega_textbook"] || []).push([[8075],{

/***/ 1537
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  assets: () => (/* binding */ assets),
  contentTitle: () => (/* binding */ contentTitle),
  "default": () => (/* binding */ MDXContent),
  frontMatter: () => (/* binding */ frontMatter),
  metadata: () => (/* reexport */ site_docs_semester_1_efmp_301_course_overview_mdx_aa1_namespaceObject),
  toc: () => (/* binding */ toc)
});

;// ./.docusaurus/docusaurus-plugin-content-docs/default/site-docs-semester-1-efmp-301-course-overview-mdx-aa1.json
const site_docs_semester_1_efmp_301_course_overview_mdx_aa1_namespaceObject = /*#__PURE__*/JSON.parse('{"id":"semester-1/efmp-301/course-overview","title":"Educational Psychology - Course Overview","description":"Course overview for EFMP-301 Educational Psychology in the B.Ed (4-Year) programme: units, learning outcomes, recommended books and how the course is assessed.","source":"@site/docs/semester-1/efmp-301/course-overview.mdx","sourceDirName":"semester-1/efmp-301","slug":"/semester-1/efmp-301/course-overview","permalink":"/semester-1/efmp-301/course-overview","draft":false,"unlisted":false,"tags":[],"version":"current","frontMatter":{"title":"Educational Psychology - Course Overview","description":"Course overview for EFMP-301 Educational Psychology in the B.Ed (4-Year) programme: units, learning outcomes, recommended books and how the course is assessed.","course_code":"EFMP-301","credit_hours":"3 (3-0)","category":"Major: Professional","assessment_weighting":{"summative":60,"formative":40},"teaching_strategies":["Interactive lecture with Pakistani classroom examples","Small-group discussion and case analysis"],"assessment_criteria":["Class test and mid-term (formative)","End-of-semester examination (summative)"],"resources":[{"ref":"Woolfolk, A. - Educational Psychology (course-guide recommended reading)","type":"book"}]},"sidebar":"textbook","previous":{"title":"Introduction to Educational Psychology - teacher notes","permalink":"/semester-1/efmp-301/unit-01/unit-teacher-notes"},"next":{"title":"Understanding Teaching","permalink":"/semester-1/efmp-302/unit-01/"}}');
// EXTERNAL MODULE: ./node_modules/react/jsx-runtime.js
var jsx_runtime = __webpack_require__(4848);
// EXTERNAL MODULE: ./node_modules/@mdx-js/react/lib/index.js
var lib = __webpack_require__(8453);
;// ./docs/semester-1/efmp-301/course-overview.mdx


const frontMatter = {
	title: 'Educational Psychology - Course Overview',
	description: 'Course overview for EFMP-301 Educational Psychology in the B.Ed (4-Year) programme: units, learning outcomes, recommended books and how the course is assessed.',
	course_code: 'EFMP-301',
	credit_hours: '3 (3-0)',
	category: 'Major: Professional',
	assessment_weighting: {
		summative: 60,
		formative: 40
	},
	teaching_strategies: [
		'Interactive lecture with Pakistani classroom examples',
		'Small-group discussion and case analysis'
	],
	assessment_criteria: [
		'Class test and mid-term (formative)',
		'End-of-semester examination (summative)'
	],
	resources: [
		{
			ref: 'Woolfolk, A. - Educational Psychology (course-guide recommended reading)',
			type: 'book'
		}
	]
};
const contentTitle = 'Educational Psychology - Course Overview';

const assets = {

};



const toc = [{
  "value": "Teaching strategies",
  "id": "teaching-strategies",
  "level": 2
}, {
  "value": "Assessment",
  "id": "assessment",
  "level": 2
}, {
  "value": "Recommended reading",
  "id": "recommended-reading",
  "level": 2
}];
function _createMdxContent(props) {
  const _components = {
    h1: "h1",
    h2: "h2",
    header: "header",
    p: "p",
    strong: "strong",
    ...(0,lib/* useMDXComponents */.R)(),
    ...props.components
  };
  return (0,jsx_runtime.jsxs)(jsx_runtime.Fragment, {
    children: [(0,jsx_runtime.jsx)(_components.header, {
      children: (0,jsx_runtime.jsx)(_components.h1, {
        id: "educational-psychology---course-overview",
        children: "Educational Psychology - Course Overview"
      })
    }), "\n", (0,jsx_runtime.jsx)(_components.p, {
      children: "This course introduces prospective B.Ed teachers to how learners develop, think, and\nlearn, and to the psychological principles that inform effective teaching in Pakistani\nclassrooms."
    }), "\n", (0,jsx_runtime.jsx)(_components.h2, {
      id: "teaching-strategies",
      children: "Teaching strategies"
    }), "\n", (0,jsx_runtime.jsx)(_components.p, {
      children: "Teaching follows the course guide: interactive lectures grounded in local classroom\nexamples, small-group discussion, and case analysis."
    }), "\n", (0,jsx_runtime.jsx)(_components.h2, {
      id: "assessment",
      children: "Assessment"
    }), "\n", (0,jsx_runtime.jsxs)(_components.p, {
      children: ["Assessment for the affiliated colleges (GECEs) is weighted ", (0,jsx_runtime.jsx)(_components.strong, {
        children: "60% summative / 40%\nformative"
      }), ", per the course guide and Constitution III.7."]
    }), "\n", (0,jsx_runtime.jsx)(_components.h2, {
      id: "recommended-reading",
      children: "Recommended reading"
    }), "\n", (0,jsx_runtime.jsx)(_components.p, {
      children: "Recommended books from the course guide are listed for scope and further reading only;\nthey are never reproduced as content."
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