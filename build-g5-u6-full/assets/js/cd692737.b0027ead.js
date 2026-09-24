"use strict";
(self["webpackChunkbed_mega_textbook"] = self["webpackChunkbed_mega_textbook"] || []).push([[7102],{

/***/ 2023
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  assets: () => (/* binding */ assets),
  contentTitle: () => (/* binding */ contentTitle),
  "default": () => (/* binding */ MDXContent),
  frontMatter: () => (/* binding */ frontMatter),
  metadata: () => (/* reexport */ site_guides_teacher_guide_manage_classes_and_assignments_mdx_cd6_namespaceObject),
  toc: () => (/* binding */ toc)
});

;// ./.docusaurus/docusaurus-plugin-content-docs/guides/site-guides-teacher-guide-manage-classes-and-assignments-mdx-cd6.json
const site_guides_teacher_guide_manage_classes_and_assignments_mdx_cd6_namespaceObject = /*#__PURE__*/JSON.parse('{"id":"teacher-guide/manage-classes-and-assignments","title":"Manage classes and assignments","description":"Your classes and assignments live under \\"Classes\\" (/app/classes), reachable","source":"@site/guides/teacher-guide/manage-classes-and-assignments.mdx","sourceDirName":"teacher-guide","slug":"/teacher-guide/manage-classes-and-assignments","permalink":"/guides/teacher-guide/manage-classes-and-assignments","draft":false,"unlisted":false,"tags":[],"version":"current","sidebarPosition":2,"frontMatter":{"title":"Manage classes and assignments","sidebar_position":2},"sidebar":"guides","previous":{"title":"Teacher Guide","permalink":"/guides/teacher-guide/"},"next":{"title":"Grade submissions","permalink":"/guides/teacher-guide/grade-submissions"}}');
// EXTERNAL MODULE: ./node_modules/react/jsx-runtime.js
var jsx_runtime = __webpack_require__(4848);
// EXTERNAL MODULE: ./node_modules/@mdx-js/react/lib/index.js
var lib = __webpack_require__(8453);
;// ./guides/teacher-guide/manage-classes-and-assignments.mdx


const frontMatter = {
	title: 'Manage classes and assignments',
	sidebar_position: 2
};
const contentTitle = 'Manage classes and assignments';

const assets = {

};



const toc = [{
  "value": "Classes",
  "id": "classes",
  "level": 2
}, {
  "value": "Roster",
  "id": "roster",
  "level": 2
}, {
  "value": "Assignments",
  "id": "assignments",
  "level": 2
}, {
  "value": "Gradebook",
  "id": "gradebook",
  "level": 2
}];
function _createMdxContent(props) {
  const _components = {
    code: "code",
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
        id: "manage-classes-and-assignments",
        children: "Manage classes and assignments"
      })
    }), "\n", (0,jsx_runtime.jsxs)(_components.p, {
      children: ["Your classes and assignments live under \"Classes\" (", (0,jsx_runtime.jsx)(_components.code, {
        children: "/app/classes"
      }), "), reachable\nfrom the navbar once you're signed in as a teacher."]
    }), "\n", (0,jsx_runtime.jsx)(_components.h2, {
      id: "classes",
      children: "Classes"
    }), "\n", (0,jsx_runtime.jsx)(_components.p, {
      children: "Create a class by choosing its course from the dropdown (courses are grouped\nby semester and show their full name; a course with no teaching content yet\nis not offered), then a name and a term label. Each class gets a join code\nyour students use to enrol themselves - you can reissue a new code at any\ntime (the old one stops working immediately) or revoke it entirely without\naffecting students already enrolled. From the roster page you can edit a\nclass's name and term. A class can be archived once its term ends, and\nreactivated later if you're still an eligible teacher; an archived class\nbecomes fully read-only."
    }), "\n", (0,jsx_runtime.jsx)(_components.h2, {
      id: "roster",
      children: "Roster"
    }), "\n", (0,jsx_runtime.jsx)(_components.p, {
      children: "Each class has a roster of enrolled students. You can remove a student (their\npast submissions and grades stay intact, just marked as no longer active) and\nrestore a removed student later - a student cannot rejoin a class they were\nremoved from just by re-entering the join code."
    }), "\n", (0,jsx_runtime.jsx)(_components.h2, {
      id: "assignments",
      children: "Assignments"
    }), "\n", (0,jsx_runtime.jsxs)(_components.p, {
      children: ["From a class, create an assignment drawn from a unit's activity, formative,\nor summative item - or a custom assignment with no unit attached. Set a due\ndate, a maximum mark, and whether late submissions are still accepted. You\ncan save an assignment's settings as a ", (0,jsx_runtime.jsx)(_components.strong, {
        children: "template"
      }), " and reuse it later with\n\"from a template\" on the create form."]
    }), "\n", (0,jsx_runtime.jsxs)(_components.p, {
      children: ["After creating an assignment you can ", (0,jsx_runtime.jsx)(_components.strong, {
        children: "edit"
      }), " its title, instructions, due\ndate, maximum mark, and late policy, or ", (0,jsx_runtime.jsx)(_components.strong, {
        children: "delete"
      }), " it - deletion is only\nallowed while the assignment has no submissions; once a student has\nsubmitted, unpublish it instead. Select several assignments with their\ncheckboxes to publish, unpublish, or close them in one action."]
    }), "\n", (0,jsx_runtime.jsx)(_components.p, {
      children: "You can publish or unpublish an assignment at any time, including after\nstudents have already submitted work; unpublishing never touches existing\nsubmissions or grades. Quizzes are a separate assignment type, scored\nautomatically from a unit's question bank - no manual grading needed for\nthose."
    }), "\n", (0,jsx_runtime.jsx)(_components.h2, {
      id: "gradebook",
      children: "Gradebook"
    }), "\n", (0,jsx_runtime.jsx)(_components.p, {
      children: "A full gradebook view and a downloadable spreadsheet export are both\navailable from the class page - every student against every assignment,\nincluding students who have since been removed, so nothing in the historical\nrecord disappears."
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