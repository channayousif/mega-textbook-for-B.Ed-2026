(self["webpackChunkbed_mega_textbook"] = self["webpackChunkbed_mega_textbook"] || []).push([[3889],{

/***/ 542
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   _: () => (/* binding */ DocProvider),
/* harmony export */   u: () => (/* binding */ useDoc)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6540);
/* harmony import */ var _docusaurus_theme_common_internal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3807);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4848);
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Context=/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createContext(null);/**
 * Note: we don't use `PropDoc` as context value on purpose. Metadata is
 * currently stored inside the MDX component, but we may want to change that in
 * the future. This layer is a good opportunity to decouple storage from
 * consuming API, potentially allowing us to provide metadata as both props and
 * route context without duplicating the chunks in the future.
 */function useContextValue(content){return (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(function(){return{metadata:content.metadata,frontMatter:content.frontMatter,assets:content.assets,contentTitle:content.contentTitle,toc:content.toc};},[content]);}/**
 * This is a very thin layer around the `content` received from the MDX loader.
 * It provides metadata about the doc to the children tree.
 */function DocProvider(_ref){var children=_ref.children,content=_ref.content;var contextValue=useContextValue(content);return/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(Context.Provider,{value:contextValue,children:children});}/**
 * Returns the data of the currently browsed doc. Gives access to the doc's MDX
 * Component, front matter, metadata, TOC, etc. When swizzling a low-level
 * component (e.g. the "Edit this page" link) and you need some extra metadata,
 * you don't have to drill the props all the way through the component tree:
 * simply use this hook instead.
 */function useDoc(){var doc=(0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(Context);if(doc===null){throw new _docusaurus_theme_common_internal__WEBPACK_IMPORTED_MODULE_1__/* .ReactContextError */ .dV('DocProvider');}return doc;}

/***/ },

/***/ 7293
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  A: () => (/* binding */ Admonition)
});

// EXTERNAL MODULE: ./node_modules/react/index.js
var react = __webpack_require__(6540);
// EXTERNAL MODULE: ./node_modules/react/jsx-runtime.js
var jsx_runtime = __webpack_require__(4848);
;// ./node_modules/@docusaurus/theme-common/lib/utils/admonitionUtils.js
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */// Workaround because it's difficult in MDX v1 to provide a MDX title as props
// See https://github.com/facebook/docusaurus/pull/7152#issuecomment-1145779682
function extractMDXAdmonitionTitle(children){var items=react.Children.toArray(children);var mdxAdmonitionTitleWrapper=items.find(function(item){return/*#__PURE__*/react.isValidElement(item)&&item.type==='mdxAdmonitionTitle';});var rest=items.filter(function(item){return item!==mdxAdmonitionTitleWrapper;});var mdxAdmonitionTitle=mdxAdmonitionTitleWrapper==null?void 0:mdxAdmonitionTitleWrapper.props.children;return{mdxAdmonitionTitle:mdxAdmonitionTitle,rest:rest.length>0?/*#__PURE__*/(0,jsx_runtime.jsx)(jsx_runtime.Fragment,{children:rest}):null};}function processAdmonitionProps(props){var _props$title;var _extractMDXAdmonition=extractMDXAdmonitionTitle(props.children),mdxAdmonitionTitle=_extractMDXAdmonition.mdxAdmonitionTitle,rest=_extractMDXAdmonition.rest;var title=(_props$title=props.title)!=null?_props$title:mdxAdmonitionTitle;return Object.assign({},props,title&&{title:title},{children:rest});}
// EXTERNAL MODULE: ./node_modules/clsx/dist/clsx.mjs
var clsx = __webpack_require__(4164);
// EXTERNAL MODULE: ./node_modules/@docusaurus/core/lib/client/exports/Translate.js + 1 modules
var Translate = __webpack_require__(1312);
// EXTERNAL MODULE: ./node_modules/@docusaurus/theme-common/lib/utils/ThemeClassNames.js
var ThemeClassNames = __webpack_require__(7559);
;// ./node_modules/@docusaurus/theme-classic/lib/theme/Admonition/Layout/styles.module.css
// extracted by mini-css-extract-plugin
/* harmony default export */ const styles_module = ({"admonition":"admonition_xJq3","admonitionHeading":"admonitionHeading_Gvgb","admonitionIcon":"admonitionIcon_Rf37","admonitionContent":"admonitionContent_BuS1"});
;// ./node_modules/@docusaurus/theme-classic/lib/theme/Admonition/Layout/index.js
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */function AdmonitionContainer(_ref){var type=_ref.type,className=_ref.className,children=_ref.children,id=_ref.id;return/*#__PURE__*/(0,jsx_runtime.jsx)("div",{className:(0,clsx/* default */.A)(ThemeClassNames/* ThemeClassNames */.G.common.admonition,ThemeClassNames/* ThemeClassNames */.G.common.admonitionType(type),styles_module.admonition,className),id:id,children:children});}function AdmonitionHeading(_ref2){var icon=_ref2.icon,title=_ref2.title;return/*#__PURE__*/(0,jsx_runtime.jsxs)("div",{className:styles_module.admonitionHeading,children:[/*#__PURE__*/(0,jsx_runtime.jsx)("span",{className:styles_module.admonitionIcon,children:icon}),title]});}function AdmonitionContent(_ref3){var children=_ref3.children;return children?/*#__PURE__*/(0,jsx_runtime.jsx)("div",{className:styles_module.admonitionContent,children:children}):null;}function AdmonitionLayout(props){var type=props.type,icon=props.icon,title=props.title,children=props.children,className=props.className,id=props.id;return/*#__PURE__*/(0,jsx_runtime.jsxs)(AdmonitionContainer,{type:type,className:className,id:id,children:[title||icon?/*#__PURE__*/(0,jsx_runtime.jsx)(AdmonitionHeading,{title:title,icon:icon}):null,/*#__PURE__*/(0,jsx_runtime.jsx)(AdmonitionContent,{children:children})]});}
;// ./node_modules/@docusaurus/theme-classic/lib/theme/Admonition/Icon/Note.js
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */function AdmonitionIconNote(props){return/*#__PURE__*/(0,jsx_runtime.jsx)("svg",Object.assign({viewBox:"0 0 14 16"},props,{children:/*#__PURE__*/(0,jsx_runtime.jsx)("path",{fillRule:"evenodd",d:"M6.3 5.69a.942.942 0 0 1-.28-.7c0-.28.09-.52.28-.7.19-.18.42-.28.7-.28.28 0 .52.09.7.28.18.19.28.42.28.7 0 .28-.09.52-.28.7a1 1 0 0 1-.7.3c-.28 0-.52-.11-.7-.3zM8 7.99c-.02-.25-.11-.48-.31-.69-.2-.19-.42-.3-.69-.31H6c-.27.02-.48.13-.69.31-.2.2-.3.44-.31.69h1v3c.02.27.11.5.31.69.2.2.42.31.69.31h1c.27 0 .48-.11.69-.31.2-.19.3-.42.31-.69H8V7.98v.01zM7 2.3c-3.14 0-5.7 2.54-5.7 5.68 0 3.14 2.56 5.7 5.7 5.7s5.7-2.55 5.7-5.7c0-3.15-2.56-5.69-5.7-5.69v.01zM7 .98c3.86 0 7 3.14 7 7s-3.14 7-7 7-7-3.12-7-7 3.14-7 7-7z"})}));}
;// ./node_modules/@docusaurus/theme-classic/lib/theme/Admonition/Type/Note.js
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var infimaClassName='alert alert--secondary';var defaultProps={icon:/*#__PURE__*/(0,jsx_runtime.jsx)(AdmonitionIconNote,{}),title:/*#__PURE__*/(0,jsx_runtime.jsx)(Translate/* default */.A,{id:"theme.admonition.note",description:"The default label used for the Note admonition (:::note)",children:"note"})};function AdmonitionTypeNote(props){return/*#__PURE__*/(0,jsx_runtime.jsx)(AdmonitionLayout,Object.assign({},defaultProps,props,{className:(0,clsx/* default */.A)(infimaClassName,props.className),children:props.children}));}
;// ./node_modules/@docusaurus/theme-classic/lib/theme/Admonition/Icon/Tip.js
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */function AdmonitionIconTip(props){return/*#__PURE__*/(0,jsx_runtime.jsx)("svg",Object.assign({viewBox:"0 0 12 16"},props,{children:/*#__PURE__*/(0,jsx_runtime.jsx)("path",{fillRule:"evenodd",d:"M6.5 0C3.48 0 1 2.19 1 5c0 .92.55 2.25 1 3 1.34 2.25 1.78 2.78 2 4v1h5v-1c.22-1.22.66-1.75 2-4 .45-.75 1-2.08 1-3 0-2.81-2.48-5-5.5-5zm3.64 7.48c-.25.44-.47.8-.67 1.11-.86 1.41-1.25 2.06-1.45 3.23-.02.05-.02.11-.02.17H5c0-.06 0-.13-.02-.17-.2-1.17-.59-1.83-1.45-3.23-.2-.31-.42-.67-.67-1.11C2.44 6.78 2 5.65 2 5c0-2.2 2.02-4 4.5-4 1.22 0 2.36.42 3.22 1.19C10.55 2.94 11 3.94 11 5c0 .66-.44 1.78-.86 2.48zM4 14h5c-.23 1.14-1.3 2-2.5 2s-2.27-.86-2.5-2z"})}));}
;// ./node_modules/@docusaurus/theme-classic/lib/theme/Admonition/Type/Tip.js
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Tip_infimaClassName='alert alert--success';var Tip_defaultProps={icon:/*#__PURE__*/(0,jsx_runtime.jsx)(AdmonitionIconTip,{}),title:/*#__PURE__*/(0,jsx_runtime.jsx)(Translate/* default */.A,{id:"theme.admonition.tip",description:"The default label used for the Tip admonition (:::tip)",children:"tip"})};function AdmonitionTypeTip(props){return/*#__PURE__*/(0,jsx_runtime.jsx)(AdmonitionLayout,Object.assign({},Tip_defaultProps,props,{className:(0,clsx/* default */.A)(Tip_infimaClassName,props.className),children:props.children}));}
;// ./node_modules/@docusaurus/theme-classic/lib/theme/Admonition/Icon/Info.js
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */function AdmonitionIconInfo(props){return/*#__PURE__*/(0,jsx_runtime.jsx)("svg",Object.assign({viewBox:"0 0 14 16"},props,{children:/*#__PURE__*/(0,jsx_runtime.jsx)("path",{fillRule:"evenodd",d:"M7 2.3c3.14 0 5.7 2.56 5.7 5.7s-2.56 5.7-5.7 5.7A5.71 5.71 0 0 1 1.3 8c0-3.14 2.56-5.7 5.7-5.7zM7 1C3.14 1 0 4.14 0 8s3.14 7 7 7 7-3.14 7-7-3.14-7-7-7zm1 3H6v5h2V4zm0 6H6v2h2v-2z"})}));}
;// ./node_modules/@docusaurus/theme-classic/lib/theme/Admonition/Type/Info.js
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Info_infimaClassName='alert alert--info';var Info_defaultProps={icon:/*#__PURE__*/(0,jsx_runtime.jsx)(AdmonitionIconInfo,{}),title:/*#__PURE__*/(0,jsx_runtime.jsx)(Translate/* default */.A,{id:"theme.admonition.info",description:"The default label used for the Info admonition (:::info)",children:"info"})};function AdmonitionTypeInfo(props){return/*#__PURE__*/(0,jsx_runtime.jsx)(AdmonitionLayout,Object.assign({},Info_defaultProps,props,{className:(0,clsx/* default */.A)(Info_infimaClassName,props.className),children:props.children}));}
;// ./node_modules/@docusaurus/theme-classic/lib/theme/Admonition/Icon/Warning.js
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */function AdmonitionIconCaution(props){return/*#__PURE__*/(0,jsx_runtime.jsx)("svg",Object.assign({viewBox:"0 0 16 16"},props,{children:/*#__PURE__*/(0,jsx_runtime.jsx)("path",{fillRule:"evenodd",d:"M8.893 1.5c-.183-.31-.52-.5-.887-.5s-.703.19-.886.5L.138 13.499a.98.98 0 0 0 0 1.001c.193.31.53.501.886.501h13.964c.367 0 .704-.19.877-.5a1.03 1.03 0 0 0 .01-1.002L8.893 1.5zm.133 11.497H6.987v-2.003h2.039v2.003zm0-3.004H6.987V5.987h2.039v4.006z"})}));}
;// ./node_modules/@docusaurus/theme-classic/lib/theme/Admonition/Type/Warning.js
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Warning_infimaClassName='alert alert--warning';var Warning_defaultProps={icon:/*#__PURE__*/(0,jsx_runtime.jsx)(AdmonitionIconCaution,{}),title:/*#__PURE__*/(0,jsx_runtime.jsx)(Translate/* default */.A,{id:"theme.admonition.warning",description:"The default label used for the Warning admonition (:::warning)",children:"warning"})};function AdmonitionTypeWarning(props){return/*#__PURE__*/(0,jsx_runtime.jsx)(AdmonitionLayout,Object.assign({},Warning_defaultProps,props,{className:(0,clsx/* default */.A)(Warning_infimaClassName,props.className),children:props.children}));}
;// ./node_modules/@docusaurus/theme-classic/lib/theme/Admonition/Icon/Danger.js
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */function AdmonitionIconDanger(props){return/*#__PURE__*/(0,jsx_runtime.jsx)("svg",Object.assign({viewBox:"0 0 12 16"},props,{children:/*#__PURE__*/(0,jsx_runtime.jsx)("path",{fillRule:"evenodd",d:"M5.05.31c.81 2.17.41 3.38-.52 4.31C3.55 5.67 1.98 6.45.9 7.98c-1.45 2.05-1.7 6.53 3.53 7.7-2.2-1.16-2.67-4.52-.3-6.61-.61 2.03.53 3.33 1.94 2.86 1.39-.47 2.3.53 2.27 1.67-.02.78-.31 1.44-1.13 1.81 3.42-.59 4.78-3.42 4.78-5.56 0-2.84-2.53-3.22-1.25-5.61-1.52.13-2.03 1.13-1.89 2.75.09 1.08-1.02 1.8-1.86 1.33-.67-.41-.66-1.19-.06-1.78C8.18 5.31 8.68 2.45 5.05.32L5.03.3l.02.01z"})}));}
;// ./node_modules/@docusaurus/theme-classic/lib/theme/Admonition/Type/Danger.js
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Danger_infimaClassName='alert alert--danger';var Danger_defaultProps={icon:/*#__PURE__*/(0,jsx_runtime.jsx)(AdmonitionIconDanger,{}),title:/*#__PURE__*/(0,jsx_runtime.jsx)(Translate/* default */.A,{id:"theme.admonition.danger",description:"The default label used for the Danger admonition (:::danger)",children:"danger"})};function AdmonitionTypeDanger(props){return/*#__PURE__*/(0,jsx_runtime.jsx)(AdmonitionLayout,Object.assign({},Danger_defaultProps,props,{className:(0,clsx/* default */.A)(Danger_infimaClassName,props.className),children:props.children}));}
;// ./node_modules/@docusaurus/theme-classic/lib/theme/Admonition/Type/Caution.js
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Caution_infimaClassName='alert alert--warning';var Caution_defaultProps={icon:/*#__PURE__*/(0,jsx_runtime.jsx)(AdmonitionIconCaution,{}),title:/*#__PURE__*/(0,jsx_runtime.jsx)(Translate/* default */.A,{id:"theme.admonition.caution",description:"The default label used for the Caution admonition (:::caution)",children:"caution"})};// TODO remove before v4: Caution replaced by Warning
// see https://github.com/facebook/docusaurus/issues/7558
function AdmonitionTypeCaution(props){return/*#__PURE__*/(0,jsx_runtime.jsx)(AdmonitionLayout,Object.assign({},Caution_defaultProps,props,{className:(0,clsx/* default */.A)(Caution_infimaClassName,props.className),children:props.children}));}
;// ./node_modules/@docusaurus/theme-classic/lib/theme/Admonition/Types.js
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var admonitionTypes={note:AdmonitionTypeNote,tip:AdmonitionTypeTip,info:AdmonitionTypeInfo,warning:AdmonitionTypeWarning,danger:AdmonitionTypeDanger};// Undocumented legacy admonition type aliases
// Provide hardcoded/untranslated retrocompatible label
// See also https://github.com/facebook/docusaurus/issues/7767
var admonitionAliases={secondary:function secondary(props){return/*#__PURE__*/(0,jsx_runtime.jsx)(AdmonitionTypeNote,Object.assign({title:"secondary"},props));},important:function important(props){return/*#__PURE__*/(0,jsx_runtime.jsx)(AdmonitionTypeInfo,Object.assign({title:"important"},props));},success:function success(props){return/*#__PURE__*/(0,jsx_runtime.jsx)(AdmonitionTypeTip,Object.assign({title:"success"},props));},caution:AdmonitionTypeCaution};/* harmony default export */ const Types = (Object.assign({},admonitionTypes,admonitionAliases));
;// ./node_modules/@docusaurus/theme-classic/lib/theme/Admonition/index.js
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */function getAdmonitionTypeComponent(type){var component=Types[type];if(component){return component;}console.warn("No admonition component found for admonition type \""+type+"\". Using Info as fallback.");return Types.info;}function Admonition(unprocessedProps){var props=processAdmonitionProps(unprocessedProps);var AdmonitionTypeComponent=getAdmonitionTypeComponent(props.type);return/*#__PURE__*/(0,jsx_runtime.jsx)(AdmonitionTypeComponent,Object.assign({},props));}

/***/ },

/***/ 4129
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  A: () => (/* binding */ DocItemContent)
});

// EXTERNAL MODULE: ./node_modules/react/index.js
var react = __webpack_require__(6540);
// EXTERNAL MODULE: ./node_modules/clsx/dist/clsx.mjs
var clsx = __webpack_require__(4164);
// EXTERNAL MODULE: ./node_modules/@docusaurus/theme-common/lib/utils/ThemeClassNames.js
var ThemeClassNames = __webpack_require__(7559);
// EXTERNAL MODULE: ./node_modules/@docusaurus/plugin-content-docs/lib/client/doc.js
var doc = __webpack_require__(542);
// EXTERNAL MODULE: ./node_modules/@docusaurus/theme-classic/lib/theme/Heading/index.js
var Heading = __webpack_require__(4608);
// EXTERNAL MODULE: ./node_modules/@mdx-js/react/lib/index.js
var lib = __webpack_require__(8453);
// EXTERNAL MODULE: ./src/theme/MDXComponents.tsx + 4 modules
var MDXComponents = __webpack_require__(6026);
// EXTERNAL MODULE: ./node_modules/react/jsx-runtime.js
var jsx_runtime = __webpack_require__(4848);
;// ./node_modules/@docusaurus/theme-classic/lib/theme/MDXContent/index.js
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */function MDXContent(_ref){var children=_ref.children;return/*#__PURE__*/(0,jsx_runtime.jsx)(lib/* MDXProvider */.x,{components:MDXComponents/* default */.A,children:children});}
;// ./node_modules/@docusaurus/theme-classic/lib/theme/DocItem/Content/index.js
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *//**
 Title can be declared inside md content or declared through
 front matter and added manually. To make both cases consistent,
 the added title is added under the same div.markdown block
 See https://github.com/facebook/docusaurus/pull/4882#issuecomment-853021120

 We render a "synthetic title" if:
 - user doesn't ask to hide it with front matter
 - the markdown content does not already contain a top-level h1 heading
*/function useSyntheticTitle(){var _useDoc=(0,doc/* useDoc */.u)(),metadata=_useDoc.metadata,frontMatter=_useDoc.frontMatter,contentTitle=_useDoc.contentTitle;var shouldRender=!frontMatter.hide_title&&typeof contentTitle==='undefined';if(!shouldRender){return null;}return metadata.title;}function DocItemContent(_ref){var children=_ref.children;var syntheticTitle=useSyntheticTitle();return/*#__PURE__*/(0,jsx_runtime.jsxs)("div",{className:(0,clsx/* default */.A)(ThemeClassNames/* ThemeClassNames */.G.docs.docMarkdown,'markdown'),children:[syntheticTitle&&/*#__PURE__*/(0,jsx_runtime.jsx)("header",{children:/*#__PURE__*/(0,jsx_runtime.jsx)(Heading/* default */.A,{as:"h1",children:syntheticTitle})}),/*#__PURE__*/(0,jsx_runtime.jsx)(MDXContent,{children:children})]});}

/***/ },

/***/ 9446
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  A: () => (/* binding */ DocItemFooter)
});

// EXTERNAL MODULE: ./node_modules/react/index.js
var react = __webpack_require__(6540);
// EXTERNAL MODULE: ./node_modules/clsx/dist/clsx.mjs
var clsx = __webpack_require__(4164);
// EXTERNAL MODULE: ./node_modules/@docusaurus/theme-common/lib/utils/ThemeClassNames.js
var ThemeClassNames = __webpack_require__(7559);
// EXTERNAL MODULE: ./node_modules/@docusaurus/plugin-content-docs/lib/client/doc.js
var doc = __webpack_require__(542);
// EXTERNAL MODULE: ./node_modules/@docusaurus/core/lib/client/exports/Translate.js + 1 modules
var Translate = __webpack_require__(1312);
// EXTERNAL MODULE: ./node_modules/@docusaurus/core/lib/client/exports/Link.js
var Link = __webpack_require__(8774);
;// ./node_modules/@docusaurus/theme-classic/lib/theme/Tag/styles.module.css
// extracted by mini-css-extract-plugin
/* harmony default export */ const styles_module = ({"tag":"tag_zVej","tagRegular":"tagRegular_sFm0","tagWithCount":"tagWithCount_h2kH"});
// EXTERNAL MODULE: ./node_modules/react/jsx-runtime.js
var jsx_runtime = __webpack_require__(4848);
;// ./node_modules/@docusaurus/theme-classic/lib/theme/Tag/index.js
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */function Tag(_ref){var permalink=_ref.permalink,label=_ref.label,count=_ref.count,description=_ref.description;return/*#__PURE__*/(0,jsx_runtime.jsxs)(Link/* default */.A,{rel:"tag",href:permalink,title:description,className:(0,clsx/* default */.A)(styles_module.tag,count?styles_module.tagWithCount:styles_module.tagRegular),children:[label,count&&/*#__PURE__*/(0,jsx_runtime.jsx)("span",{children:count})]});}
;// ./node_modules/@docusaurus/theme-classic/lib/theme/TagsListInline/styles.module.css
// extracted by mini-css-extract-plugin
/* harmony default export */ const TagsListInline_styles_module = ({"tags":"tags_jXut","tag":"tag_QGVx"});
;// ./node_modules/@docusaurus/theme-classic/lib/theme/TagsListInline/index.js
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */function TagsListInline(_ref){var tags=_ref.tags;return/*#__PURE__*/(0,jsx_runtime.jsxs)(jsx_runtime.Fragment,{children:[/*#__PURE__*/(0,jsx_runtime.jsx)("b",{children:/*#__PURE__*/(0,jsx_runtime.jsx)(Translate/* default */.A,{id:"theme.tags.tagsListLabel",description:"The label alongside a tag list",children:"Tags:"})}),/*#__PURE__*/(0,jsx_runtime.jsx)("ul",{className:(0,clsx/* default */.A)(TagsListInline_styles_module.tags,'padding--none','margin-left--sm'),children:tags.map(function(tag){return/*#__PURE__*/(0,jsx_runtime.jsx)("li",{className:TagsListInline_styles_module.tag,children:/*#__PURE__*/(0,jsx_runtime.jsx)(Tag,Object.assign({},tag))},tag.permalink);})})]});}
// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js
var objectWithoutPropertiesLoose = __webpack_require__(8587);
;// ./node_modules/@docusaurus/theme-classic/lib/theme/Icon/Edit/styles.module.css
// extracted by mini-css-extract-plugin
/* harmony default export */ const Edit_styles_module = ({"iconEdit":"iconEdit_Z9Sw"});
;// ./node_modules/@docusaurus/theme-classic/lib/theme/Icon/Edit/index.js
var _excluded=["className"];/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */function IconEdit(_ref){var className=_ref.className,restProps=(0,objectWithoutPropertiesLoose/* default */.A)(_ref,_excluded);return/*#__PURE__*/(0,jsx_runtime.jsx)("svg",Object.assign({fill:"currentColor",height:"20",width:"20",viewBox:"0 0 40 40",className:(0,clsx/* default */.A)(Edit_styles_module.iconEdit,className),"aria-hidden":"true"},restProps,{children:/*#__PURE__*/(0,jsx_runtime.jsx)("g",{children:/*#__PURE__*/(0,jsx_runtime.jsx)("path",{d:"m34.5 11.7l-3 3.1-6.3-6.3 3.1-3q0.5-0.5 1.2-0.5t1.1 0.5l3.9 3.9q0.5 0.4 0.5 1.1t-0.5 1.2z m-29.5 17.1l18.4-18.5 6.3 6.3-18.4 18.4h-6.3v-6.2z"})})}));}
;// ./node_modules/@docusaurus/theme-classic/lib/theme/EditThisPage/index.js
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */function EditThisPage(_ref){var editUrl=_ref.editUrl;return/*#__PURE__*/(0,jsx_runtime.jsxs)(Link/* default */.A,{to:editUrl,className:ThemeClassNames/* ThemeClassNames */.G.common.editThisPage,children:[/*#__PURE__*/(0,jsx_runtime.jsx)(IconEdit,{}),/*#__PURE__*/(0,jsx_runtime.jsx)(Translate/* default */.A,{id:"theme.common.editThisPage",description:"The link label to edit the current page",children:"Edit this page"})]});}
// EXTERNAL MODULE: ./node_modules/@docusaurus/core/lib/client/exports/useDocusaurusContext.js
var useDocusaurusContext = __webpack_require__(4586);
;// ./node_modules/@docusaurus/theme-common/lib/utils/IntlUtils.js
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */function useCalendar(){var _useDocusaurusContext=(0,useDocusaurusContext/* default */.A)(),_useDocusaurusContext2=_useDocusaurusContext.i18n,currentLocale=_useDocusaurusContext2.currentLocale,localeConfigs=_useDocusaurusContext2.localeConfigs;return localeConfigs[currentLocale].calendar;}function useDateTimeFormat(options){if(options===void 0){options={};}var _useDocusaurusContext3=(0,useDocusaurusContext/* default */.A)(),currentLocale=_useDocusaurusContext3.i18n.currentLocale;var calendar=useCalendar();return new Intl.DateTimeFormat(currentLocale,Object.assign({calendar:calendar},options));}
;// ./node_modules/@docusaurus/theme-classic/lib/theme/LastUpdated/index.js
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */function LastUpdatedAtDate(_ref){var lastUpdatedAt=_ref.lastUpdatedAt;var atDate=new Date(lastUpdatedAt);var dateTimeFormat=useDateTimeFormat({day:'numeric',month:'short',year:'numeric',timeZone:'UTC'});var formattedLastUpdatedAt=dateTimeFormat.format(atDate);return/*#__PURE__*/(0,jsx_runtime.jsx)(Translate/* default */.A,{id:"theme.lastUpdated.atDate",description:"The words used to describe on which date a page has been last updated",values:{date:/*#__PURE__*/(0,jsx_runtime.jsx)("b",{children:/*#__PURE__*/(0,jsx_runtime.jsx)("time",{dateTime:atDate.toISOString(),itemProp:"dateModified",children:formattedLastUpdatedAt})})},children:' on {date}'});}function LastUpdatedByUser(_ref2){var lastUpdatedBy=_ref2.lastUpdatedBy;return/*#__PURE__*/(0,jsx_runtime.jsx)(Translate/* default */.A,{id:"theme.lastUpdated.byUser",description:"The words used to describe by who the page has been last updated",values:{user:/*#__PURE__*/(0,jsx_runtime.jsx)("b",{children:lastUpdatedBy})},children:' by {user}'});}function LastUpdated(_ref3){var lastUpdatedAt=_ref3.lastUpdatedAt,lastUpdatedBy=_ref3.lastUpdatedBy;return/*#__PURE__*/(0,jsx_runtime.jsxs)("span",{className:ThemeClassNames/* ThemeClassNames */.G.common.lastUpdated,children:[/*#__PURE__*/(0,jsx_runtime.jsx)(Translate/* default */.A,{id:"theme.lastUpdated.lastUpdatedAtBy",description:"The sentence used to display when a page has been last updated, and by who",values:{atDate:lastUpdatedAt?/*#__PURE__*/(0,jsx_runtime.jsx)(LastUpdatedAtDate,{lastUpdatedAt:lastUpdatedAt}):'',byUser:lastUpdatedBy?/*#__PURE__*/(0,jsx_runtime.jsx)(LastUpdatedByUser,{lastUpdatedBy:lastUpdatedBy}):''},children:'Last updated{atDate}{byUser}'}), false&&/*#__PURE__*/0]});}
;// ./node_modules/@docusaurus/theme-classic/lib/theme/EditMetaRow/styles.module.css
// extracted by mini-css-extract-plugin
/* harmony default export */ const EditMetaRow_styles_module = ({"lastUpdated":"lastUpdated_JAkA","noPrint":"noPrint_WFHX"});
;// ./node_modules/@docusaurus/theme-classic/lib/theme/EditMetaRow/index.js
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */function EditMetaRow(_ref){var className=_ref.className,editUrl=_ref.editUrl,lastUpdatedAt=_ref.lastUpdatedAt,lastUpdatedBy=_ref.lastUpdatedBy;return/*#__PURE__*/(0,jsx_runtime.jsxs)("div",{className:(0,clsx/* default */.A)('row',className),children:[/*#__PURE__*/(0,jsx_runtime.jsx)("div",{className:(0,clsx/* default */.A)('col',EditMetaRow_styles_module.noPrint),children:editUrl&&/*#__PURE__*/(0,jsx_runtime.jsx)(EditThisPage,{editUrl:editUrl})}),/*#__PURE__*/(0,jsx_runtime.jsx)("div",{className:(0,clsx/* default */.A)('col',EditMetaRow_styles_module.lastUpdated),children:(lastUpdatedAt||lastUpdatedBy)&&/*#__PURE__*/(0,jsx_runtime.jsx)(LastUpdated,{lastUpdatedAt:lastUpdatedAt,lastUpdatedBy:lastUpdatedBy})})]});}
;// ./node_modules/@docusaurus/theme-classic/lib/theme/DocItem/Footer/index.js
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */function DocItemFooter(){var _useDoc=(0,doc/* useDoc */.u)(),metadata=_useDoc.metadata;var editUrl=metadata.editUrl,lastUpdatedAt=metadata.lastUpdatedAt,lastUpdatedBy=metadata.lastUpdatedBy,tags=metadata.tags;var canDisplayTagsRow=tags.length>0;var canDisplayEditMetaRow=!!(editUrl||lastUpdatedAt||lastUpdatedBy);var canDisplayFooter=canDisplayTagsRow||canDisplayEditMetaRow;if(!canDisplayFooter){return null;}return/*#__PURE__*/(0,jsx_runtime.jsxs)("footer",{className:(0,clsx/* default */.A)(ThemeClassNames/* ThemeClassNames */.G.docs.docFooter,'docusaurus-mt-lg'),children:[canDisplayTagsRow&&/*#__PURE__*/(0,jsx_runtime.jsx)("div",{className:(0,clsx/* default */.A)('row margin-top--sm',ThemeClassNames/* ThemeClassNames */.G.docs.docFooterTagsRow),children:/*#__PURE__*/(0,jsx_runtime.jsx)("div",{className:"col",children:/*#__PURE__*/(0,jsx_runtime.jsx)(TagsListInline,{tags:tags})})}),canDisplayEditMetaRow&&/*#__PURE__*/(0,jsx_runtime.jsx)(EditMetaRow,{className:(0,clsx/* default */.A)('margin-top--sm',ThemeClassNames/* ThemeClassNames */.G.docs.docFooterEditMetaRow),editUrl:editUrl,lastUpdatedAt:lastUpdatedAt,lastUpdatedBy:lastUpdatedBy})]});}

/***/ },

/***/ 4157
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ DocItemMetadata)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6540);
/* harmony import */ var _docusaurus_theme_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5500);
/* harmony import */ var _docusaurus_plugin_content_docs_client__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(542);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(4848);
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */function DocItemMetadata(){var _assets$image;var _useDoc=(0,_docusaurus_plugin_content_docs_client__WEBPACK_IMPORTED_MODULE_2__/* .useDoc */ .u)(),metadata=_useDoc.metadata,frontMatter=_useDoc.frontMatter,assets=_useDoc.assets;return/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_docusaurus_theme_common__WEBPACK_IMPORTED_MODULE_1__/* .PageMetadata */ .be,{title:metadata.title,description:metadata.description,keywords:frontMatter.keywords,image:(_assets$image=assets.image)!=null?_assets$image:frontMatter.image});}

/***/ },

/***/ 8998
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ DocItem)
});

// EXTERNAL MODULE: ./node_modules/react/index.js
var react = __webpack_require__(6540);
// EXTERNAL MODULE: ./node_modules/@docusaurus/theme-common/lib/utils/metadataUtils.js
var metadataUtils = __webpack_require__(5500);
// EXTERNAL MODULE: ./node_modules/@docusaurus/plugin-content-docs/lib/client/doc.js
var doc = __webpack_require__(542);
// EXTERNAL MODULE: ./src/theme/DocItem/Metadata/index.tsx
var Metadata = __webpack_require__(5749);
// EXTERNAL MODULE: ./node_modules/clsx/dist/clsx.mjs
var clsx = __webpack_require__(4164);
// EXTERNAL MODULE: ./node_modules/@docusaurus/theme-common/lib/hooks/useWindowSize.js
var useWindowSize = __webpack_require__(4581);
// EXTERNAL MODULE: ./node_modules/@docusaurus/core/lib/client/exports/Translate.js + 1 modules
var Translate = __webpack_require__(1312);
// EXTERNAL MODULE: ./node_modules/@docusaurus/core/lib/client/exports/Link.js
var Link = __webpack_require__(8774);
// EXTERNAL MODULE: ./node_modules/react/jsx-runtime.js
var jsx_runtime = __webpack_require__(4848);
;// ./node_modules/@docusaurus/theme-classic/lib/theme/PaginatorNavLink/index.js
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */function PaginatorNavLink(props){var permalink=props.permalink,title=props.title,subLabel=props.subLabel,isNext=props.isNext;return/*#__PURE__*/(0,jsx_runtime.jsxs)(Link/* default */.A,{className:(0,clsx/* default */.A)('pagination-nav__link',isNext?'pagination-nav__link--next':'pagination-nav__link--prev'),to:permalink,children:[subLabel&&/*#__PURE__*/(0,jsx_runtime.jsx)("div",{className:"pagination-nav__sublabel",children:subLabel}),/*#__PURE__*/(0,jsx_runtime.jsx)("div",{className:"pagination-nav__label",children:title})]});}
;// ./node_modules/@docusaurus/theme-classic/lib/theme/DocPaginator/index.js
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */function DocPaginator(props){var className=props.className,previous=props.previous,next=props.next;return/*#__PURE__*/(0,jsx_runtime.jsxs)("nav",{className:(0,clsx/* default */.A)(className,'pagination-nav'),"aria-label":(0,Translate/* translate */.T)({id:'theme.docs.paginator.navAriaLabel',message:'Docs pages',description:'The ARIA label for the docs pagination'}),children:[previous&&/*#__PURE__*/(0,jsx_runtime.jsx)(PaginatorNavLink,Object.assign({},previous,{subLabel:/*#__PURE__*/(0,jsx_runtime.jsx)(Translate/* default */.A,{id:"theme.docs.paginator.previous",description:"The label used to navigate to the previous doc",children:"Previous"})})),next&&/*#__PURE__*/(0,jsx_runtime.jsx)(PaginatorNavLink,Object.assign({},next,{subLabel:/*#__PURE__*/(0,jsx_runtime.jsx)(Translate/* default */.A,{id:"theme.docs.paginator.next",description:"The label used to navigate to the next doc",children:"Next"}),isNext:true}))]});}
;// ./node_modules/@docusaurus/theme-classic/lib/theme/DocItem/Paginator/index.js
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *//**
 * This extra component is needed, because <DocPaginator> should remain generic.
 * DocPaginator is used in non-docs contexts too: generated-index pages...
 */function DocItemPaginator(){var _useDoc=(0,doc/* useDoc */.u)(),metadata=_useDoc.metadata;return/*#__PURE__*/(0,jsx_runtime.jsx)(DocPaginator,{className:"docusaurus-mt-lg",previous:metadata.previous,next:metadata.next});}
// EXTERNAL MODULE: ./node_modules/@docusaurus/core/lib/client/exports/useDocusaurusContext.js
var useDocusaurusContext = __webpack_require__(4586);
// EXTERNAL MODULE: ./node_modules/@docusaurus/plugin-content-docs/lib/client/index.js + 2 modules
var client = __webpack_require__(4070);
// EXTERNAL MODULE: ./node_modules/@docusaurus/theme-common/lib/utils/ThemeClassNames.js
var ThemeClassNames = __webpack_require__(7559);
// EXTERNAL MODULE: ./node_modules/@docusaurus/plugin-content-docs/lib/client/docsPreferredVersion.js
var docsPreferredVersion = __webpack_require__(3886);
// EXTERNAL MODULE: ./node_modules/@docusaurus/plugin-content-docs/lib/client/docsVersion.js
var docsVersion = __webpack_require__(3025);
;// ./node_modules/@docusaurus/theme-classic/lib/theme/DocVersionBanner/index.js
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */function UnreleasedVersionLabel(_ref){var siteTitle=_ref.siteTitle,versionMetadata=_ref.versionMetadata;return/*#__PURE__*/(0,jsx_runtime.jsx)(Translate/* default */.A,{id:"theme.docs.versions.unreleasedVersionLabel",description:"The label used to tell the user that he's browsing an unreleased doc version",values:{siteTitle:siteTitle,versionLabel:/*#__PURE__*/(0,jsx_runtime.jsx)("b",{children:versionMetadata.label})},children:'This is unreleased documentation for {siteTitle} {versionLabel} version.'});}function UnmaintainedVersionLabel(_ref2){var siteTitle=_ref2.siteTitle,versionMetadata=_ref2.versionMetadata;return/*#__PURE__*/(0,jsx_runtime.jsx)(Translate/* default */.A,{id:"theme.docs.versions.unmaintainedVersionLabel",description:"The label used to tell the user that he's browsing an unmaintained doc version",values:{siteTitle:siteTitle,versionLabel:/*#__PURE__*/(0,jsx_runtime.jsx)("b",{children:versionMetadata.label})},children:'This is documentation for {siteTitle} {versionLabel}, which is no longer actively maintained.'});}var BannerLabelComponents={unreleased:UnreleasedVersionLabel,unmaintained:UnmaintainedVersionLabel};function BannerLabel(props){var BannerLabelComponent=BannerLabelComponents[props.versionMetadata.banner];return/*#__PURE__*/(0,jsx_runtime.jsx)(BannerLabelComponent,Object.assign({},props));}function LatestVersionSuggestionLabel(_ref3){var versionLabel=_ref3.versionLabel,to=_ref3.to,onClick=_ref3.onClick;return/*#__PURE__*/(0,jsx_runtime.jsx)(Translate/* default */.A,{id:"theme.docs.versions.latestVersionSuggestionLabel",description:"The label used to tell the user to check the latest version",values:{versionLabel:versionLabel,latestVersionLink:/*#__PURE__*/(0,jsx_runtime.jsx)("b",{children:/*#__PURE__*/(0,jsx_runtime.jsx)(Link/* default */.A,{to:to,onClick:onClick,children:/*#__PURE__*/(0,jsx_runtime.jsx)(Translate/* default */.A,{id:"theme.docs.versions.latestVersionLinkLabel",description:"The label used for the latest version suggestion link label",children:"latest version"})})})},children:'For up-to-date documentation, see the {latestVersionLink} ({versionLabel}).'});}function DocVersionBannerEnabled(_ref4){var className=_ref4.className,versionMetadata=_ref4.versionMetadata;var _useDocusaurusContext=(0,useDocusaurusContext/* default */.A)(),siteTitle=_useDocusaurusContext.siteConfig.title;var _useActivePlugin=(0,client/* useActivePlugin */.vT)({failfast:true}),pluginId=_useActivePlugin.pluginId;var getVersionMainDoc=function getVersionMainDoc(version){return version.docs.find(function(doc){return doc.id===version.mainDocId;});};var _useDocsPreferredVers=(0,docsPreferredVersion/* useDocsPreferredVersion */.g1)(pluginId),savePreferredVersionName=_useDocsPreferredVers.savePreferredVersionName;var _useDocVersionSuggest=(0,client/* useDocVersionSuggestions */.HW)(pluginId),latestDocSuggestion=_useDocVersionSuggest.latestDocSuggestion,latestVersionSuggestion=_useDocVersionSuggest.latestVersionSuggestion;// Try to link to same doc in latest version (not always possible), falling
// back to main doc of latest version
var latestVersionSuggestedDoc=latestDocSuggestion!=null?latestDocSuggestion:getVersionMainDoc(latestVersionSuggestion);return/*#__PURE__*/(0,jsx_runtime.jsxs)("div",{className:(0,clsx/* default */.A)(className,ThemeClassNames/* ThemeClassNames */.G.docs.docVersionBanner,'alert alert--warning margin-bottom--md'),role:"alert",children:[/*#__PURE__*/(0,jsx_runtime.jsx)("div",{children:/*#__PURE__*/(0,jsx_runtime.jsx)(BannerLabel,{siteTitle:siteTitle,versionMetadata:versionMetadata})}),/*#__PURE__*/(0,jsx_runtime.jsx)("div",{className:"margin-top--md",children:/*#__PURE__*/(0,jsx_runtime.jsx)(LatestVersionSuggestionLabel,{versionLabel:latestVersionSuggestion.label,to:latestVersionSuggestedDoc.path,onClick:function onClick(){return savePreferredVersionName(latestVersionSuggestion.name);}})})]});}function DocVersionBanner(_ref5){var className=_ref5.className;var versionMetadata=(0,docsVersion/* useDocsVersion */.r)();if(versionMetadata.banner){return/*#__PURE__*/(0,jsx_runtime.jsx)(DocVersionBannerEnabled,{className:className,versionMetadata:versionMetadata});}return null;}
;// ./node_modules/@docusaurus/theme-classic/lib/theme/DocVersionBadge/index.js
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */function DocVersionBadge(_ref){var className=_ref.className;var versionMetadata=(0,docsVersion/* useDocsVersion */.r)();if(versionMetadata.badge){return/*#__PURE__*/(0,jsx_runtime.jsx)("span",{className:(0,clsx/* default */.A)(className,ThemeClassNames/* ThemeClassNames */.G.docs.docVersionBadge,'badge badge--secondary'),children:/*#__PURE__*/(0,jsx_runtime.jsx)(Translate/* default */.A,{id:"theme.docs.versionBadge.label",values:{versionLabel:versionMetadata.label},children:'Version: {versionLabel}'})});}return null;}
// EXTERNAL MODULE: ./src/theme/DocItem/Footer.tsx + 1 modules
var Footer = __webpack_require__(2291);
// EXTERNAL MODULE: ./node_modules/@docusaurus/theme-common/lib/components/Collapsible/index.js
var Collapsible = __webpack_require__(1422);
// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js
var objectWithoutPropertiesLoose = __webpack_require__(8587);
// EXTERNAL MODULE: ./node_modules/@docusaurus/theme-common/lib/utils/useThemeConfig.js
var useThemeConfig = __webpack_require__(6342);
;// ./node_modules/@docusaurus/theme-common/lib/utils/tocUtils.js
/* unused harmony import specifier */ var useMemo;
var _excluded=["parentIndex"];/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */function treeifyTOC(flatTOC){var headings=flatTOC.map(function(heading){return Object.assign({},heading,{parentIndex:-1,children:[]});});// Keep track of which previous index would be the current heading's direct
// parent. Each entry <i> is the last index of the `headings` array at heading
// level <i>. We will modify these indices as we iterate through all headings.
// e.g. if an ### H3 was last seen at index 2, then prevIndexForLevel[3] === 2
// indices 0 and 1 will remain unused.
var prevIndexForLevel=Array(7).fill(-1);headings.forEach(function(curr,currIndex){// Take the last seen index for each ancestor level. the highest index will
// be the direct ancestor of the current heading.
var ancestorLevelIndexes=prevIndexForLevel.slice(2,curr.level);curr.parentIndex=Math.max.apply(Math,ancestorLevelIndexes);// Mark that curr.level was last seen at the current index.
prevIndexForLevel[curr.level]=currIndex;});var rootNodes=[];// For a given parentIndex, add each Node into that parent's `children` array
headings.forEach(function(heading){var parentIndex=heading.parentIndex,rest=(0,objectWithoutPropertiesLoose/* default */.A)(heading,_excluded);if(parentIndex>=0){headings[parentIndex].children.push(rest);}else{rootNodes.push(rest);}});return rootNodes;}/**
 * Takes a flat TOC list (from the MDX loader) and treeifies it into what the
 * TOC components expect. Memoized for performance.
 */function useTreeifiedTOC(toc){return useMemo(function(){return treeifyTOC(toc);},[toc]);}function filterTOC(_ref){var toc=_ref.toc,minHeadingLevel=_ref.minHeadingLevel,maxHeadingLevel=_ref.maxHeadingLevel;function isValid(item){return item.level>=minHeadingLevel&&item.level<=maxHeadingLevel;}return toc.flatMap(function(item){var filteredChildren=filterTOC({toc:item.children,minHeadingLevel:minHeadingLevel,maxHeadingLevel:maxHeadingLevel});if(isValid(item)){return[Object.assign({},item,{children:filteredChildren})];}return filteredChildren;});}/**
 * Takes a flat TOC list (from the MDX loader) and treeifies it into what the
 * TOC components expect, applying the `minHeadingLevel` and `maxHeadingLevel`.
 * Memoized for performance.
 *
 * **Important**: this is not the same as `useTreeifiedTOC(toc.filter(...))`,
 * because we have to filter the TOC after it has been treeified. This is mostly
 * to ensure that weird TOC structures preserve their semantics. For example, an
 * h3-h2-h4 sequence should not be treeified as an "h3 > h4" hierarchy with
 * min=3, max=4, but should rather be "[h3, h4]" (since the h2 heading has split
 * the two headings and they are not parent-children)
 */function useFilteredAndTreeifiedTOC(_ref2){var toc=_ref2.toc,minHeadingLevel=_ref2.minHeadingLevel,maxHeadingLevel=_ref2.maxHeadingLevel;return (0,react.useMemo)(function(){return filterTOC({toc:treeifyTOC(toc),minHeadingLevel:minHeadingLevel,maxHeadingLevel:maxHeadingLevel});},[toc,minHeadingLevel,maxHeadingLevel]);}
;// ./node_modules/@docusaurus/theme-common/lib/hooks/useTOCHighlight.js
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */// TODO make the hardcoded theme-classic classnames configurable (or add them
// to ThemeClassNames?)
/**
 * If the anchor has no height and is just a "marker" in the DOM; we'll use the
 * parent (normally the link text) rect boundaries instead
 */function getVisibleBoundingClientRect(element){var rect=element.getBoundingClientRect();var hasNoHeight=rect.top===rect.bottom;if(hasNoHeight){return getVisibleBoundingClientRect(element.parentNode);}return rect;}/**
 * Considering we divide viewport into 2 zones of each 50vh, this returns true
 * if an element is in the first zone (i.e., appear in viewport, near the top)
 */function isInViewportTopHalf(boundingRect){return boundingRect.top>0&&boundingRect.bottom<window.innerHeight/2;}function getAnchors(_ref){var minHeadingLevel=_ref.minHeadingLevel,maxHeadingLevel=_ref.maxHeadingLevel;var selectors=[];for(var i=minHeadingLevel;i<=maxHeadingLevel;i+=1){selectors.push("h"+i+".anchor");}return Array.from(document.querySelectorAll(selectors.join()));}function getActiveAnchor(anchors,_ref2){var _anchors2;var anchorTopOffset=_ref2.anchorTopOffset;// Naming is hard: The "nextVisibleAnchor" is the first anchor that appear
// under the viewport top boundary. It does not mean this anchor is visible
// yet, but if user continues scrolling down, it will be the first to become
// visible
var nextVisibleAnchor=anchors.find(function(anchor){var boundingRect=getVisibleBoundingClientRect(anchor);return boundingRect.top>=anchorTopOffset;});if(nextVisibleAnchor){var _anchors;var boundingRect=getVisibleBoundingClientRect(nextVisibleAnchor);// If anchor is in the top half of the viewport: it is the one we consider
// "active" (unless it's too close to the top and and soon to be scrolled
// outside viewport)
if(isInViewportTopHalf(boundingRect)){return nextVisibleAnchor;}// If anchor is in the bottom half of the viewport, or under the viewport,
// we consider the active anchor is the previous one. This is because the
// main text appearing in the user screen mostly belong to the previous
// anchor. Returns null for the first anchor, see
// https://github.com/facebook/docusaurus/issues/5318
return(_anchors=anchors[anchors.indexOf(nextVisibleAnchor)-1])!=null?_anchors:null;}// No anchor under viewport top (i.e. we are at the bottom of the page),
// highlight the last anchor found
return(_anchors2=anchors[anchors.length-1])!=null?_anchors2:null;}function getLinkAnchorValue(link){return decodeURIComponent(link.href.substring(link.href.indexOf('#')+1));}function getLinks(linkClassName){return Array.from(document.getElementsByClassName(linkClassName));}function getNavbarHeight(){// Not ideal to obtain actual height this way
// Using TS ! (not ?) because otherwise a bad selector would be un-noticed
return document.querySelector('.navbar').clientHeight;}function useAnchorTopOffsetRef(){var anchorTopOffsetRef=(0,react.useRef)(0);var _useThemeConfig=(0,useThemeConfig/* useThemeConfig */.p)(),hideOnScroll=_useThemeConfig.navbar.hideOnScroll;(0,react.useEffect)(function(){anchorTopOffsetRef.current=hideOnScroll?0:getNavbarHeight();},[hideOnScroll]);return anchorTopOffsetRef;}/**
 * Side-effect that applies the active class name to the TOC heading that the
 * user is currently viewing. Disabled when `config` is undefined.
 */function useTOCHighlight(config){var lastActiveLinkRef=(0,react.useRef)(undefined);var anchorTopOffsetRef=useAnchorTopOffsetRef();(0,react.useEffect)(function(){if(!config){// No-op, highlighting is disabled
return function(){};}var linkClassName=config.linkClassName,linkActiveClassName=config.linkActiveClassName,minHeadingLevel=config.minHeadingLevel,maxHeadingLevel=config.maxHeadingLevel;function updateLinkActiveClass(link,active){if(active){if(lastActiveLinkRef.current&&lastActiveLinkRef.current!==link){lastActiveLinkRef.current.classList.remove(linkActiveClassName);}link.classList.add(linkActiveClassName);lastActiveLinkRef.current=link;// link.scrollIntoView({block: 'nearest'});
}else{link.classList.remove(linkActiveClassName);}}function updateActiveLink(){var links=getLinks(linkClassName);var anchors=getAnchors({minHeadingLevel:minHeadingLevel,maxHeadingLevel:maxHeadingLevel});var activeAnchor=getActiveAnchor(anchors,{anchorTopOffset:anchorTopOffsetRef.current});var activeLink=links.find(function(link){return activeAnchor&&activeAnchor.id===getLinkAnchorValue(link);});links.forEach(function(link){updateLinkActiveClass(link,link===activeLink);});}document.addEventListener('scroll',updateActiveLink);document.addEventListener('resize',updateActiveLink);updateActiveLink();return function(){document.removeEventListener('scroll',updateActiveLink);document.removeEventListener('resize',updateActiveLink);};},[config,anchorTopOffsetRef]);}
;// ./node_modules/@docusaurus/theme-classic/lib/theme/TOCItems/Tree.js
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */// Recursive component rendering the toc tree
function TOCItemTree(_ref){var toc=_ref.toc,className=_ref.className,linkClassName=_ref.linkClassName,isChild=_ref.isChild;if(!toc.length){return null;}return/*#__PURE__*/(0,jsx_runtime.jsx)("ul",{className:isChild?undefined:className,children:toc.map(function(heading){return/*#__PURE__*/(0,jsx_runtime.jsxs)("li",{children:[/*#__PURE__*/(0,jsx_runtime.jsx)(Link/* default */.A,{to:"#"+heading.id,className:linkClassName!=null?linkClassName:undefined// Developer provided the HTML, so assume it's safe.
,dangerouslySetInnerHTML:{__html:heading.value}}),/*#__PURE__*/(0,jsx_runtime.jsx)(TOCItemTree,{isChild:true,toc:heading.children,className:className,linkClassName:linkClassName})]},heading.id);})});}// Memo only the tree root is enough
/* harmony default export */ const Tree = (/*#__PURE__*/react.memo(TOCItemTree));
;// ./node_modules/@docusaurus/theme-classic/lib/theme/TOCItems/index.js
var TOCItems_excluded=["toc","className","linkClassName","linkActiveClassName","minHeadingLevel","maxHeadingLevel"];/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */function TOCItems(_ref){var toc=_ref.toc,_ref$className=_ref.className,className=_ref$className===void 0?'table-of-contents table-of-contents__left-border':_ref$className,_ref$linkClassName=_ref.linkClassName,linkClassName=_ref$linkClassName===void 0?'table-of-contents__link':_ref$linkClassName,_ref$linkActiveClassN=_ref.linkActiveClassName,linkActiveClassName=_ref$linkActiveClassN===void 0?undefined:_ref$linkActiveClassN,minHeadingLevelOption=_ref.minHeadingLevel,maxHeadingLevelOption=_ref.maxHeadingLevel,props=(0,objectWithoutPropertiesLoose/* default */.A)(_ref,TOCItems_excluded);var themeConfig=(0,useThemeConfig/* useThemeConfig */.p)();var minHeadingLevel=minHeadingLevelOption!=null?minHeadingLevelOption:themeConfig.tableOfContents.minHeadingLevel;var maxHeadingLevel=maxHeadingLevelOption!=null?maxHeadingLevelOption:themeConfig.tableOfContents.maxHeadingLevel;var tocTree=useFilteredAndTreeifiedTOC({toc:toc,minHeadingLevel:minHeadingLevel,maxHeadingLevel:maxHeadingLevel});var tocHighlightConfig=(0,react.useMemo)(function(){if(linkClassName&&linkActiveClassName){return{linkClassName:linkClassName,linkActiveClassName:linkActiveClassName,minHeadingLevel:minHeadingLevel,maxHeadingLevel:maxHeadingLevel};}return undefined;},[linkClassName,linkActiveClassName,minHeadingLevel,maxHeadingLevel]);useTOCHighlight(tocHighlightConfig);return/*#__PURE__*/(0,jsx_runtime.jsx)(Tree,Object.assign({toc:tocTree,className:className,linkClassName:linkClassName},props));}
;// ./node_modules/@docusaurus/theme-classic/lib/theme/TOCCollapsible/CollapseButton/styles.module.css
// extracted by mini-css-extract-plugin
/* harmony default export */ const styles_module = ({"tocCollapsibleButton":"tocCollapsibleButton_TO0P","tocCollapsibleButtonExpanded":"tocCollapsibleButtonExpanded_MG3E"});
;// ./node_modules/@docusaurus/theme-classic/lib/theme/TOCCollapsible/CollapseButton/index.js
var CollapseButton_excluded=["collapsed"];/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */function TOCCollapsibleCollapseButton(_ref){var collapsed=_ref.collapsed,props=(0,objectWithoutPropertiesLoose/* default */.A)(_ref,CollapseButton_excluded);return/*#__PURE__*/(0,jsx_runtime.jsx)("button",Object.assign({type:"button"},props,{className:(0,clsx/* default */.A)('clean-btn',styles_module.tocCollapsibleButton,!collapsed&&styles_module.tocCollapsibleButtonExpanded,props.className),children:/*#__PURE__*/(0,jsx_runtime.jsx)(Translate/* default */.A,{id:"theme.TOCCollapsible.toggleButtonLabel",description:"The label used by the button on the collapsible TOC component",children:"On this page"})}));}
;// ./node_modules/@docusaurus/theme-classic/lib/theme/TOCCollapsible/styles.module.css
// extracted by mini-css-extract-plugin
/* harmony default export */ const TOCCollapsible_styles_module = ({"tocCollapsible":"tocCollapsible_ETCw","tocCollapsibleContent":"tocCollapsibleContent_vkbj","tocCollapsibleExpanded":"tocCollapsibleExpanded_sAul"});
;// ./node_modules/@docusaurus/theme-classic/lib/theme/TOCCollapsible/index.js
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */function TOCCollapsible(_ref){var toc=_ref.toc,className=_ref.className,minHeadingLevel=_ref.minHeadingLevel,maxHeadingLevel=_ref.maxHeadingLevel;var _useCollapsible=(0,Collapsible/* useCollapsible */.u)({initialState:true}),collapsed=_useCollapsible.collapsed,toggleCollapsed=_useCollapsible.toggleCollapsed;return/*#__PURE__*/(0,jsx_runtime.jsxs)("div",{className:(0,clsx/* default */.A)(TOCCollapsible_styles_module.tocCollapsible,!collapsed&&TOCCollapsible_styles_module.tocCollapsibleExpanded,className),children:[/*#__PURE__*/(0,jsx_runtime.jsx)(TOCCollapsibleCollapseButton,{collapsed:collapsed,onClick:toggleCollapsed}),/*#__PURE__*/(0,jsx_runtime.jsx)(Collapsible/* Collapsible */.N,{lazy:true,className:TOCCollapsible_styles_module.tocCollapsibleContent,collapsed:collapsed,children:/*#__PURE__*/(0,jsx_runtime.jsx)(TOCItems,{toc:toc,minHeadingLevel:minHeadingLevel,maxHeadingLevel:maxHeadingLevel})})]});}
;// ./node_modules/@docusaurus/theme-classic/lib/theme/DocItem/TOC/Mobile/styles.module.css
// extracted by mini-css-extract-plugin
/* harmony default export */ const Mobile_styles_module = ({"tocMobile":"tocMobile_ITEo"});
;// ./node_modules/@docusaurus/theme-classic/lib/theme/DocItem/TOC/Mobile/index.js
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */function DocItemTOCMobile(){var _useDoc=(0,doc/* useDoc */.u)(),toc=_useDoc.toc,frontMatter=_useDoc.frontMatter;return/*#__PURE__*/(0,jsx_runtime.jsx)(TOCCollapsible,{toc:toc,minHeadingLevel:frontMatter.toc_min_heading_level,maxHeadingLevel:frontMatter.toc_max_heading_level,className:(0,clsx/* default */.A)(ThemeClassNames/* ThemeClassNames */.G.docs.docTocMobile,Mobile_styles_module.tocMobile)});}
;// ./node_modules/@docusaurus/theme-classic/lib/theme/TOC/styles.module.css
// extracted by mini-css-extract-plugin
/* harmony default export */ const TOC_styles_module = ({"tableOfContents":"tableOfContents_bqdL","docItemContainer":"docItemContainer_F8PC"});
;// ./node_modules/@docusaurus/theme-classic/lib/theme/TOC/index.js
var TOC_excluded=["className"];/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */// Using a custom className
// This prevents TOCInline/TOCCollapsible getting highlighted by mistake
var LINK_CLASS_NAME='table-of-contents__link toc-highlight';var LINK_ACTIVE_CLASS_NAME='table-of-contents__link--active';function TOC(_ref){var className=_ref.className,props=(0,objectWithoutPropertiesLoose/* default */.A)(_ref,TOC_excluded);return/*#__PURE__*/(0,jsx_runtime.jsx)("div",{className:(0,clsx/* default */.A)(TOC_styles_module.tableOfContents,'thin-scrollbar',className),children:/*#__PURE__*/(0,jsx_runtime.jsx)(TOCItems,Object.assign({},props,{linkClassName:LINK_CLASS_NAME,linkActiveClassName:LINK_ACTIVE_CLASS_NAME}))});}
;// ./node_modules/@docusaurus/theme-classic/lib/theme/DocItem/TOC/Desktop/index.js
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */function DocItemTOCDesktop(){var _useDoc=(0,doc/* useDoc */.u)(),toc=_useDoc.toc,frontMatter=_useDoc.frontMatter;return/*#__PURE__*/(0,jsx_runtime.jsx)(TOC,{toc:toc,minHeadingLevel:frontMatter.toc_min_heading_level,maxHeadingLevel:frontMatter.toc_max_heading_level,className:ThemeClassNames/* ThemeClassNames */.G.docs.docTocDesktop});}
// EXTERNAL MODULE: ./src/theme/DocItem/Content.tsx + 1 modules
var Content = __webpack_require__(8314);
// EXTERNAL MODULE: ./node_modules/@docusaurus/plugin-content-docs/lib/client/docsUtils.js + 1 modules
var docsUtils = __webpack_require__(4718);
// EXTERNAL MODULE: ./node_modules/@docusaurus/theme-common/lib/utils/routesUtils.js
var routesUtils = __webpack_require__(9169);
// EXTERNAL MODULE: ./node_modules/@docusaurus/core/lib/client/exports/useBaseUrl.js
var useBaseUrl = __webpack_require__(6025);
;// ./node_modules/@docusaurus/theme-classic/lib/theme/Icon/Home/index.js
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */function IconHome(props){return/*#__PURE__*/(0,jsx_runtime.jsx)("svg",Object.assign({viewBox:"0 0 24 24"},props,{children:/*#__PURE__*/(0,jsx_runtime.jsx)("path",{d:"M10 19v-5h4v5c0 .55.45 1 1 1h3c.55 0 1-.45 1-1v-7h1.7c.46 0 .68-.57.33-.87L12.67 3.6c-.38-.34-.96-.34-1.34 0l-8.36 7.53c-.34.3-.13.87.33.87H5v7c0 .55.45 1 1 1h3c.55 0 1-.45 1-1z",fill:"currentColor"})}));}
;// ./node_modules/@docusaurus/theme-classic/lib/theme/DocBreadcrumbs/Items/Home/styles.module.css
// extracted by mini-css-extract-plugin
/* harmony default export */ const Home_styles_module = ({"breadcrumbHomeIcon":"breadcrumbHomeIcon_YNFT"});
;// ./node_modules/@docusaurus/theme-classic/lib/theme/DocBreadcrumbs/Items/Home/index.js
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */function HomeBreadcrumbItem(){var homeHref=(0,useBaseUrl/* default */.Ay)('/');return/*#__PURE__*/(0,jsx_runtime.jsx)("li",{className:"breadcrumbs__item",children:/*#__PURE__*/(0,jsx_runtime.jsx)(Link/* default */.A,{"aria-label":(0,Translate/* translate */.T)({id:'theme.docs.breadcrumbs.home',message:'Home page',description:'The ARIA label for the home page in the breadcrumbs'}),className:"breadcrumbs__link",href:homeHref,children:/*#__PURE__*/(0,jsx_runtime.jsx)(IconHome,{className:Home_styles_module.breadcrumbHomeIcon})})});}
// EXTERNAL MODULE: ./node_modules/@docusaurus/core/lib/client/exports/Head.js
var Head = __webpack_require__(5260);
;// ./node_modules/@docusaurus/plugin-content-docs/lib/client/structuredDataUtils.js
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */function useBreadcrumbsStructuredData(_ref){var breadcrumbs=_ref.breadcrumbs;var _useDocusaurusContext=(0,useDocusaurusContext/* default */.A)(),siteConfig=_useDocusaurusContext.siteConfig;return{'@context':'https://schema.org','@type':'BreadcrumbList',itemListElement:breadcrumbs// We filter breadcrumb items without links, they are not allowed
// See also https://github.com/facebook/docusaurus/issues/9319#issuecomment-2643560845
.filter(function(breadcrumb){return breadcrumb.href;}).map(function(breadcrumb,index){return{'@type':'ListItem',position:index+1,name:breadcrumb.label,item:""+siteConfig.url+breadcrumb.href};})};}
;// ./node_modules/@docusaurus/theme-classic/lib/theme/DocBreadcrumbs/StructuredData/index.js
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */function DocBreadcrumbsStructuredData(props){var structuredData=useBreadcrumbsStructuredData({breadcrumbs:props.breadcrumbs});return/*#__PURE__*/(0,jsx_runtime.jsx)(Head/* default */.A,{children:/*#__PURE__*/(0,jsx_runtime.jsx)("script",{type:"application/ld+json",children:JSON.stringify(structuredData)})});}
;// ./node_modules/@docusaurus/theme-classic/lib/theme/DocBreadcrumbs/styles.module.css
// extracted by mini-css-extract-plugin
/* harmony default export */ const DocBreadcrumbs_styles_module = ({"breadcrumbsContainer":"breadcrumbsContainer_Z_bl"});
;// ./node_modules/@docusaurus/theme-classic/lib/theme/DocBreadcrumbs/index.js
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */// TODO move to design system folder
function BreadcrumbsItemLink(_ref){var children=_ref.children,href=_ref.href,isLast=_ref.isLast;var className='breadcrumbs__link';if(isLast){return/*#__PURE__*/(0,jsx_runtime.jsx)("span",{className:className,children:children});}return href?/*#__PURE__*/(0,jsx_runtime.jsx)(Link/* default */.A,{className:className,href:href,children:/*#__PURE__*/(0,jsx_runtime.jsx)("span",{children:children})}):/*#__PURE__*/(0,jsx_runtime.jsx)("span",{className:className,children:children});}// TODO move to design system folder
function BreadcrumbsItem(_ref2){var children=_ref2.children,active=_ref2.active;return/*#__PURE__*/(0,jsx_runtime.jsx)("li",{className:(0,clsx/* default */.A)('breadcrumbs__item',{'breadcrumbs__item--active':active}),children:children});}function DocBreadcrumbs(){var breadcrumbs=(0,docsUtils/* useSidebarBreadcrumbs */.OF)();var homePageRoute=(0,routesUtils/* useHomePageRoute */.Dt)();if(!breadcrumbs){return null;}return/*#__PURE__*/(0,jsx_runtime.jsxs)(jsx_runtime.Fragment,{children:[/*#__PURE__*/(0,jsx_runtime.jsx)(DocBreadcrumbsStructuredData,{breadcrumbs:breadcrumbs}),/*#__PURE__*/(0,jsx_runtime.jsx)("nav",{className:(0,clsx/* default */.A)(ThemeClassNames/* ThemeClassNames */.G.docs.docBreadcrumbs,DocBreadcrumbs_styles_module.breadcrumbsContainer),"aria-label":(0,Translate/* translate */.T)({id:'theme.docs.breadcrumbs.navAriaLabel',message:'Breadcrumbs',description:'The ARIA label for the breadcrumbs'}),children:/*#__PURE__*/(0,jsx_runtime.jsxs)("ul",{className:"breadcrumbs",children:[homePageRoute&&/*#__PURE__*/(0,jsx_runtime.jsx)(HomeBreadcrumbItem,{}),breadcrumbs.map(function(item,idx){var isLast=idx===breadcrumbs.length-1;var href=item.type==='category'&&item.linkUnlisted?undefined:item.href;return/*#__PURE__*/(0,jsx_runtime.jsx)(BreadcrumbsItem,{active:isLast,children:/*#__PURE__*/(0,jsx_runtime.jsx)(BreadcrumbsItemLink,{href:href,isLast:isLast,children:item.label})},idx);})]})})]});}
;// ./node_modules/@docusaurus/theme-common/lib/translations/contentVisibilityTranslations.js
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */function UnlistedBannerTitle(){return/*#__PURE__*/(0,jsx_runtime.jsx)(Translate/* default */.A,{id:"theme.contentVisibility.unlistedBanner.title",description:"The unlisted content banner title",children:"Unlisted page"});}function UnlistedBannerMessage(){return/*#__PURE__*/(0,jsx_runtime.jsx)(Translate/* default */.A,{id:"theme.contentVisibility.unlistedBanner.message",description:"The unlisted content banner message",children:"This page is unlisted. Search engines will not index it, and only users having a direct link can access it."});}// TODO Docusaurus v4 breaking change (since it's v3 public theme-common API :/)
//  Move this to theme/ContentVisibility/Unlisted
function UnlistedMetadata(){return/*#__PURE__*/(0,jsx_runtime.jsx)(Head/* default */.A,{children:/*#__PURE__*/(0,jsx_runtime.jsx)("meta",{name:"robots",content:"noindex, nofollow"})});}function DraftBannerTitle(){return/*#__PURE__*/(0,jsx_runtime.jsx)(Translate/* default */.A,{id:"theme.contentVisibility.draftBanner.title",description:"The draft content banner title",children:"Draft page"});}function DraftBannerMessage(){return/*#__PURE__*/(0,jsx_runtime.jsx)(Translate/* default */.A,{id:"theme.contentVisibility.draftBanner.message",description:"The draft content banner message",children:"This page is a draft. It will only be visible in dev and be excluded from the production build."});}
// EXTERNAL MODULE: ./node_modules/@docusaurus/theme-classic/lib/theme/Admonition/index.js + 15 modules
var Admonition = __webpack_require__(7293);
;// ./node_modules/@docusaurus/theme-classic/lib/theme/ContentVisibility/Draft/index.js
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */function Draft(_ref){var className=_ref.className;return/*#__PURE__*/(0,jsx_runtime.jsx)(Admonition/* default */.A,{type:"caution",title:/*#__PURE__*/(0,jsx_runtime.jsx)(DraftBannerTitle,{}),className:(0,clsx/* default */.A)(className,ThemeClassNames/* ThemeClassNames */.G.common.draftBanner),children:/*#__PURE__*/(0,jsx_runtime.jsx)(DraftBannerMessage,{})});}
;// ./node_modules/@docusaurus/theme-classic/lib/theme/ContentVisibility/Unlisted/index.js
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */function UnlistedBanner(_ref){var className=_ref.className;return/*#__PURE__*/(0,jsx_runtime.jsx)(Admonition/* default */.A,{type:"caution",title:/*#__PURE__*/(0,jsx_runtime.jsx)(UnlistedBannerTitle,{}),className:(0,clsx/* default */.A)(className,ThemeClassNames/* ThemeClassNames */.G.common.unlistedBanner),children:/*#__PURE__*/(0,jsx_runtime.jsx)(UnlistedBannerMessage,{})});}function Unlisted(props){return/*#__PURE__*/(0,jsx_runtime.jsxs)(jsx_runtime.Fragment,{children:[/*#__PURE__*/(0,jsx_runtime.jsx)(UnlistedMetadata,{}),/*#__PURE__*/(0,jsx_runtime.jsx)(UnlistedBanner,Object.assign({},props))]});}
;// ./node_modules/@docusaurus/theme-classic/lib/theme/ContentVisibility/index.js
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */function ContentVisibility(_ref){var metadata=_ref.metadata;var unlisted=metadata.unlisted,frontMatter=metadata.frontMatter;// Reading draft/unlisted status from frontMatter is useful to display
// the banners in dev mode (in dev, metadata.unlisted is always false)
// See https://github.com/facebook/docusaurus/issues/8285
return/*#__PURE__*/(0,jsx_runtime.jsxs)(jsx_runtime.Fragment,{children:[(unlisted||frontMatter.unlisted)&&/*#__PURE__*/(0,jsx_runtime.jsx)(Unlisted,{}),frontMatter.draft&&/*#__PURE__*/(0,jsx_runtime.jsx)(Draft,{})]});}
;// ./node_modules/@docusaurus/theme-classic/lib/theme/DocItem/Layout/styles.module.css
// extracted by mini-css-extract-plugin
/* harmony default export */ const Layout_styles_module = ({"docItemContainer":"docItemContainer_Djhp","docItemCol":"docItemCol_VOVn"});
;// ./node_modules/@docusaurus/theme-classic/lib/theme/DocItem/Layout/index.js
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *//**
 * Decide if the toc should be rendered, on mobile or desktop viewports
 */function useDocTOC(){var _useDoc=(0,doc/* useDoc */.u)(),frontMatter=_useDoc.frontMatter,toc=_useDoc.toc;var windowSize=(0,useWindowSize/* useWindowSize */.l)();var hidden=frontMatter.hide_table_of_contents;var canRender=!hidden&&toc.length>0;var mobile=canRender?/*#__PURE__*/(0,jsx_runtime.jsx)(DocItemTOCMobile,{}):undefined;var desktop=canRender&&(windowSize==='desktop'||windowSize==='ssr')?/*#__PURE__*/(0,jsx_runtime.jsx)(DocItemTOCDesktop,{}):undefined;return{hidden:hidden,mobile:mobile,desktop:desktop};}function DocItemLayout(_ref){var children=_ref.children;var docTOC=useDocTOC();var _useDoc2=(0,doc/* useDoc */.u)(),metadata=_useDoc2.metadata;return/*#__PURE__*/(0,jsx_runtime.jsxs)("div",{className:"row",children:[/*#__PURE__*/(0,jsx_runtime.jsxs)("div",{className:(0,clsx/* default */.A)('col',!docTOC.hidden&&Layout_styles_module.docItemCol),children:[/*#__PURE__*/(0,jsx_runtime.jsx)(ContentVisibility,{metadata:metadata}),/*#__PURE__*/(0,jsx_runtime.jsx)(DocVersionBanner,{}),/*#__PURE__*/(0,jsx_runtime.jsxs)("div",{className:Layout_styles_module.docItemContainer,children:[/*#__PURE__*/(0,jsx_runtime.jsxs)("article",{children:[/*#__PURE__*/(0,jsx_runtime.jsx)(DocBreadcrumbs,{}),/*#__PURE__*/(0,jsx_runtime.jsx)(DocVersionBadge,{}),docTOC.mobile,/*#__PURE__*/(0,jsx_runtime.jsx)(Content/* default */.A,{children:children}),/*#__PURE__*/(0,jsx_runtime.jsx)(Footer/* default */.A,{})]}),/*#__PURE__*/(0,jsx_runtime.jsx)(DocItemPaginator,{})]})]}),docTOC.desktop&&/*#__PURE__*/(0,jsx_runtime.jsx)("div",{className:"col col--3",children:docTOC.desktop})]});}
;// ./node_modules/@docusaurus/theme-classic/lib/theme/DocItem/index.js
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */function DocItem(props){var docHtmlClassName="docs-doc-id-"+props.content.metadata.id;var MDXComponent=props.content;return/*#__PURE__*/(0,jsx_runtime.jsx)(doc/* DocProvider */._,{content:props.content,children:/*#__PURE__*/(0,jsx_runtime.jsxs)(metadataUtils/* HtmlClassNameProvider */.e3,{className:docHtmlClassName,children:[/*#__PURE__*/(0,jsx_runtime.jsx)(Metadata/* default */.A,{}),/*#__PURE__*/(0,jsx_runtime.jsx)(DocItemLayout,{children:/*#__PURE__*/(0,jsx_runtime.jsx)(MDXComponent,{})})]})});}

/***/ },

/***/ 7413
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  A: () => (/* binding */ theme_MDXComponents)
});

// EXTERNAL MODULE: ./node_modules/react/index.js
var react = __webpack_require__(6540);
// EXTERNAL MODULE: ./node_modules/@docusaurus/core/lib/client/exports/Head.js
var Head = __webpack_require__(5260);
// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js
var objectWithoutPropertiesLoose = __webpack_require__(8587);
// EXTERNAL MODULE: ./node_modules/@docusaurus/core/lib/client/exports/useIsBrowser.js
var useIsBrowser = __webpack_require__(2303);
// EXTERNAL MODULE: ./node_modules/clsx/dist/clsx.mjs
var clsx = __webpack_require__(4164);
// EXTERNAL MODULE: ./node_modules/@docusaurus/theme-common/lib/contexts/colorMode.js
var contexts_colorMode = __webpack_require__(5293);
// EXTERNAL MODULE: ./node_modules/@docusaurus/theme-common/lib/utils/useThemeConfig.js
var useThemeConfig = __webpack_require__(6342);
;// ./node_modules/@docusaurus/theme-common/lib/hooks/usePrismTheme.js
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *//**
 * Returns a color-mode-dependent Prism theme: whatever the user specified in
 * the config. Falls back to `palenight`.
 */function usePrismTheme(){var _useThemeConfig=(0,useThemeConfig/* useThemeConfig */.p)(),prism=_useThemeConfig.prism;var _useColorMode=(0,contexts_colorMode/* useColorMode */.G)(),colorMode=_useColorMode.colorMode;var lightModeTheme=prism.theme;var darkModeTheme=prism.darkTheme||lightModeTheme;var prismTheme=colorMode==='dark'?darkModeTheme:lightModeTheme;return prismTheme;}
// EXTERNAL MODULE: ./node_modules/@docusaurus/theme-common/lib/utils/ThemeClassNames.js
var ThemeClassNames = __webpack_require__(7559);
// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/wrapRegExp.js + 1 modules
var wrapRegExp = __webpack_require__(3909);
// EXTERNAL MODULE: ./node_modules/parse-numeric-range/index.js
var parse_numeric_range = __webpack_require__(8426);
var parse_numeric_range_default = /*#__PURE__*/__webpack_require__.n(parse_numeric_range);
// EXTERNAL MODULE: ./node_modules/@docusaurus/theme-common/lib/utils/reactUtils.js + 5 modules
var reactUtils = __webpack_require__(3807);
// EXTERNAL MODULE: ./node_modules/react/jsx-runtime.js
var jsx_runtime = __webpack_require__(4848);
;// ./node_modules/@docusaurus/theme-common/lib/utils/codeBlockUtils.js
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var codeBlockTitleRegex=/*#__PURE__*/(0,wrapRegExp/* default */.A)(/title=(["'])(.*?)\1/,{quote:1,title:2});var metastringLinesRangeRegex=/*#__PURE__*/(0,wrapRegExp/* default */.A)(/\{([\d,-]+)\}/,{range:1});// Supported types of highlight comments
var popularCommentPatterns={js:{start:'\\/\\/',end:''},jsBlock:{start:'\\/\\*',end:'\\*\\/'},jsx:{start:'\\{\\s*\\/\\*',end:'\\*\\/\\s*\\}'},bash:{start:'#',end:''},html:{start:'<!--',end:'-->'}};var commentPatterns=Object.assign({},popularCommentPatterns,{// shallow copy is sufficient
// minor comment styles
lua:{start:'--',end:''},wasm:{start:'\\;\\;',end:''},tex:{start:'%',end:''},vb:{start:"['‘’]",end:''},vbnet:{start:"(?:_\\s*)?['‘’]",end:''},// Visual Studio 2019 or later
rem:{start:'[Rr][Ee][Mm]\\b',end:''},f90:{start:'!',end:''},// Free format only
ml:{start:'\\(\\*',end:'\\*\\)'},cobol:{start:'\\*>',end:''}// Free format only
});var popularCommentTypes=Object.keys(popularCommentPatterns);function getCommentPattern(languages,magicCommentDirectives){// To be more reliable, the opening and closing comment must match
var commentPattern=languages.map(function(lang){var _commentPatterns$lang=commentPatterns[lang],start=_commentPatterns$lang.start,end=_commentPatterns$lang.end;return"(?:"+start+"\\s*("+magicCommentDirectives.flatMap(function(d){var _d$block,_d$block2;return[d.line,(_d$block=d.block)==null?void 0:_d$block.start,(_d$block2=d.block)==null?void 0:_d$block2.end].filter(Boolean);}).join('|')+")\\s*"+end+")";}).join('|');// White space is allowed, but otherwise it should be on it's own line
return new RegExp("^\\s*(?:"+commentPattern+")\\s*$");}/**
 * Select comment styles based on language
 */function getAllMagicCommentDirectiveStyles(lang,magicCommentDirectives){switch(lang){case'js':case'javascript':case'ts':case'typescript':return getCommentPattern(['js','jsBlock'],magicCommentDirectives);case'jsx':case'tsx':return getCommentPattern(['js','jsBlock','jsx'],magicCommentDirectives);case'html':return getCommentPattern(['js','jsBlock','html'],magicCommentDirectives);case'python':case'py':case'bash':return getCommentPattern(['bash'],magicCommentDirectives);case'markdown':case'md':// Text uses HTML, front matter uses bash
return getCommentPattern(['html','jsx','bash'],magicCommentDirectives);case'tex':case'latex':case'matlab':return getCommentPattern(['tex'],magicCommentDirectives);case'lua':case'haskell':return getCommentPattern(['lua'],magicCommentDirectives);case'sql':return getCommentPattern(['lua','jsBlock'],magicCommentDirectives);case'wasm':return getCommentPattern(['wasm'],magicCommentDirectives);case'vb':case'vba':case'visual-basic':return getCommentPattern(['vb','rem'],magicCommentDirectives);case'vbnet':return getCommentPattern(['vbnet','rem'],magicCommentDirectives);case'batch':return getCommentPattern(['rem'],magicCommentDirectives);case'basic':// https://github.com/PrismJS/prism/blob/master/components/prism-basic.js#L3
return getCommentPattern(['rem','f90'],magicCommentDirectives);case'fsharp':return getCommentPattern(['js','ml'],magicCommentDirectives);case'ocaml':case'sml':return getCommentPattern(['ml'],magicCommentDirectives);case'fortran':return getCommentPattern(['f90'],magicCommentDirectives);case'cobol':return getCommentPattern(['cobol'],magicCommentDirectives);default:// All popular comment types
return getCommentPattern(popularCommentTypes,magicCommentDirectives);}}function parseCodeBlockTitle(metastring){var _metastring$match$gro,_metastring$match;return(_metastring$match$gro=metastring==null||(_metastring$match=metastring.match(codeBlockTitleRegex))==null?void 0:_metastring$match.groups.title)!=null?_metastring$match$gro:'';}function getMetaLineNumbersStart(metastring){var showLineNumbersMeta=metastring==null?void 0:metastring.split(' ').find(function(str){return str.startsWith('showLineNumbers');});if(showLineNumbersMeta){if(showLineNumbersMeta.startsWith('showLineNumbers=')){var value=showLineNumbersMeta.replace('showLineNumbers=','');return parseInt(value,10);}return 1;}return undefined;}function getLineNumbersStart(_ref){var showLineNumbers=_ref.showLineNumbers,metastring=_ref.metastring;var defaultStart=1;if(typeof showLineNumbers==='boolean'){return showLineNumbers?defaultStart:undefined;}if(typeof showLineNumbers==='number'){return showLineNumbers;}return getMetaLineNumbersStart(metastring);}// TODO Docusaurus v4: remove, only kept for internal retro-compatibility
//  See https://github.com/facebook/docusaurus/pull/11153
function containsLineNumbers(metastring){return Boolean(metastring==null?void 0:metastring.includes('showLineNumbers'));}function parseCodeLinesFromMetastring(code,_ref2){var metastring=_ref2.metastring,magicComments=_ref2.magicComments;// Highlighted lines specified in props: don't parse the content
if(metastring&&metastringLinesRangeRegex.test(metastring)){var linesRange=metastring.match(metastringLinesRangeRegex).groups.range;if(magicComments.length===0){throw new Error("A highlight range has been given in code block's metastring (``` "+metastring+"), but no magic comment config is available. Docusaurus applies the first magic comment entry's className for metastring ranges.");}var metastringRangeClassName=magicComments[0].className;var lines=parse_numeric_range_default()(linesRange).filter(function(n){return n>0;}).map(function(n){return[n-1,[metastringRangeClassName]];});return{lineClassNames:Object.fromEntries(lines),code:code};}return null;}function parseCodeLinesFromContent(code,params){var language=params.language,magicComments=params.magicComments;if(language===undefined){return{lineClassNames:{},code:code};}var directiveRegex=getAllMagicCommentDirectiveStyles(language,magicComments);// Go through line by line
var lines=code.split(/\r?\n/);var blocks=Object.fromEntries(magicComments.map(function(d){return[d.className,{start:0,range:''}];}));var lineToClassName=Object.fromEntries(magicComments.filter(function(d){return d.line;}).map(function(_ref3){var className=_ref3.className,line=_ref3.line;return[line,className];}));var blockStartToClassName=Object.fromEntries(magicComments.filter(function(d){return d.block;}).map(function(_ref4){var className=_ref4.className,block=_ref4.block;return[block.start,className];}));var blockEndToClassName=Object.fromEntries(magicComments.filter(function(d){return d.block;}).map(function(_ref5){var className=_ref5.className,block=_ref5.block;return[block.end,className];}));for(var lineNumber=0;lineNumber<lines.length;){var line=lines[lineNumber];var match=line.match(directiveRegex);if(!match){// Lines without directives are unchanged
lineNumber+=1;continue;}var directive=match.slice(1).find(function(item){return item!==undefined;});if(lineToClassName[directive]){blocks[lineToClassName[directive]].range+=lineNumber+",";}else if(blockStartToClassName[directive]){blocks[blockStartToClassName[directive]].start=lineNumber;}else if(blockEndToClassName[directive]){blocks[blockEndToClassName[directive]].range+=blocks[blockEndToClassName[directive]].start+"-"+(lineNumber-1)+",";}lines.splice(lineNumber,1);}var lineClassNames={};Object.entries(blocks).forEach(function(_ref6){var className=_ref6[0],range=_ref6[1].range;parse_numeric_range_default()(range).forEach(function(l){var _lineClassNames$l;(_lineClassNames$l=lineClassNames[l])!=null?_lineClassNames$l:lineClassNames[l]=[];lineClassNames[l].push(className);});});return{code:lines.join('\n'),lineClassNames:lineClassNames};}/**
 * Parses the code content, strips away any magic comments, and returns the
 * clean content and the highlighted lines marked by the comments or metastring.
 *
 * If the metastring contains a range, the `content` will be returned as-is
 * without any parsing. The returned `lineClassNames` will be a map from that
 * number range to the first magic comment config entry (which _should_ be for
 * line highlight directives.)
 */function parseLines(code,params){var _parseCodeLinesFromMe;// Historical behavior: we remove last line break
var newCode=code.replace(/\r?\n$/,'');// Historical behavior: we try one strategy after the other
// we don't support mixing metastring ranges + magic comments
return(_parseCodeLinesFromMe=parseCodeLinesFromMetastring(newCode,Object.assign({},params)))!=null?_parseCodeLinesFromMe:parseCodeLinesFromContent(newCode,Object.assign({},params));}/**
 * Gets the language name from the class name (set by MDX).
 * e.g. `"language-javascript"` => `"javascript"`.
 * Returns undefined if there is no language class name.
 */function parseClassNameLanguage(className){if(!className){return undefined;}var languageClassName=className.split(' ').find(function(str){return str.startsWith('language-');});return languageClassName==null?void 0:languageClassName.replace(/language-/,'');}// Prism languages are always lowercase
// We want to fail-safe and allow both "php" and "PHP"
// See https://github.com/facebook/docusaurus/issues/9012
function normalizeLanguage(language){return language==null?void 0:language.toLowerCase();}function getLanguage(params){var _normalizeLanguage,_ref7,_params$language;return(_normalizeLanguage=normalizeLanguage((_ref7=(_params$language=params.language)!=null?_params$language:parseClassNameLanguage(params.className))!=null?_ref7:params.defaultLanguage))!=null?_normalizeLanguage:'text';// There's always a language, required by Prism;
}/**
 * This ensures that we always have the code block language as className
 * For MDX code blocks this is provided automatically by MDX
 * For JSX code blocks, the language gets added by this function
 * This ensures both cases lead to a consistent HTML output
 */function ensureLanguageClassName(_ref8){var className=_ref8.className,language=_ref8.language;return (0,clsx/* default */.A)(className,language&&!(className!=null&&className.includes("language-"+language))&&"language-"+language);}function createCodeBlockMetadata(params){var language=getLanguage({language:params.language,defaultLanguage:params.defaultLanguage,className:params.className});var _parseLines=parseLines(params.code,{metastring:params.metastring,magicComments:params.magicComments,language:language}),lineClassNames=_parseLines.lineClassNames,code=_parseLines.code;var className=ensureLanguageClassName({className:params.className,language:language});var title=parseCodeBlockTitle(params.metastring)||params.title;var lineNumbersStart=getLineNumbersStart({showLineNumbers:params.showLineNumbers,metastring:params.metastring});return{codeInput:params.code,code:code,className:className,language:language,title:title,lineNumbersStart:lineNumbersStart,lineClassNames:lineClassNames};}function getPrismCssVariables(prismTheme){var mapping={color:'--prism-color',backgroundColor:'--prism-background-color'};var properties={};Object.entries(prismTheme.plain).forEach(function(_ref9){var key=_ref9[0],value=_ref9[1];var varName=mapping[key];if(varName&&typeof value==='string'){properties[varName]=value;}});return properties;}var CodeBlockContext=/*#__PURE__*/(0,react.createContext)(null);function CodeBlockContextProvider(_ref0){var metadata=_ref0.metadata,wordWrap=_ref0.wordWrap,children=_ref0.children;// Should we optimize this in 2 contexts?
// Unlike metadata, wordWrap is stateful and likely to trigger re-renders
var value=(0,react.useMemo)(function(){return{metadata:metadata,wordWrap:wordWrap};},[metadata,wordWrap]);return/*#__PURE__*/(0,jsx_runtime.jsx)(CodeBlockContext.Provider,{value:value,children:children});}function useCodeBlockContext(){var value=(0,react.useContext)(CodeBlockContext);if(value===null){throw new reactUtils/* ReactContextError */.dV('CodeBlockContextProvider');}return value;}
;// ./node_modules/@docusaurus/theme-classic/lib/theme/CodeBlock/Container/styles.module.css
// extracted by mini-css-extract-plugin
/* harmony default export */ const styles_module = ({"codeBlockContainer":"codeBlockContainer_Ckt0"});
;// ./node_modules/@docusaurus/theme-classic/lib/theme/CodeBlock/Container/index.js
var _excluded=["as"];/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */function CodeBlockContainer(_ref){var As=_ref.as,props=(0,objectWithoutPropertiesLoose/* default */.A)(_ref,_excluded);var prismTheme=usePrismTheme();var prismCssVariables=getPrismCssVariables(prismTheme);return/*#__PURE__*/(0,jsx_runtime.jsx)(As// Polymorphic components are hard to type, without `oneOf` generics
,Object.assign({},props,{style:prismCssVariables,className:(0,clsx/* default */.A)(props.className,styles_module.codeBlockContainer,ThemeClassNames/* ThemeClassNames */.G.common.codeBlock)}));}
;// ./node_modules/@docusaurus/theme-classic/lib/theme/CodeBlock/Content/styles.module.css
// extracted by mini-css-extract-plugin
/* harmony default export */ const Content_styles_module = ({"codeBlock":"codeBlock_bY9V","codeBlockStandalone":"codeBlockStandalone_MEMb","codeBlockLines":"codeBlockLines_e6Vv","codeBlockLinesWithNumbering":"codeBlockLinesWithNumbering_o6Pm"});
;// ./node_modules/@docusaurus/theme-classic/lib/theme/CodeBlock/Content/Element.js
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */// TODO Docusaurus v4: move this component at the root?
// This component only handles a rare edge-case: <pre><MyComp/></pre> in MDX
// <pre> tags in markdown map to CodeBlocks. They may contain JSX children.
// When children is not a simple string, we just return a styled block without
// actually highlighting.
function CodeBlockJSX(_ref){var children=_ref.children,className=_ref.className;return/*#__PURE__*/(0,jsx_runtime.jsx)(CodeBlockContainer,{as:"pre",tabIndex:0,className:(0,clsx/* default */.A)(Content_styles_module.codeBlockStandalone,'thin-scrollbar',className),children:/*#__PURE__*/(0,jsx_runtime.jsx)("code",{className:Content_styles_module.codeBlockLines,children:children})});}
;// ./node_modules/@docusaurus/theme-common/lib/hooks/useMutationObserver.js
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var DefaultOptions={attributes:true,characterData:true,childList:true,subtree:true};function useMutationObserver(target,callback,options){if(options===void 0){options=DefaultOptions;}var stableCallback=(0,reactUtils/* useEvent */._q)(callback);// MutationObserver options are not nested much
// so this should be to memo options in 99%
// TODO handle options.attributeFilter array
var stableOptions=(0,reactUtils/* useShallowMemoObject */.Be)(options);(0,react.useEffect)(function(){var observer=new MutationObserver(stableCallback);if(target){observer.observe(target,stableOptions);}return function(){return observer.disconnect();};},[target,stableCallback,stableOptions]);}
;// ./node_modules/@docusaurus/theme-common/lib/hooks/useCodeWordWrap.js
// Callback fires when the "hidden" attribute of a tabpanel changes
// See https://github.com/facebook/docusaurus/pull/7485
function useTabBecameVisibleCallback(codeBlockRef,callback){var _useState=(0,react.useState)(),hiddenTabElement=_useState[0],setHiddenTabElement=_useState[1];var updateHiddenTabElement=(0,react.useCallback)(function(){var _codeBlockRef$current;// No need to observe non-hidden tabs
// + we want to force a re-render when a tab becomes visible
setHiddenTabElement((_codeBlockRef$current=codeBlockRef.current)==null?void 0:_codeBlockRef$current.closest('[role=tabpanel][hidden]'));},[codeBlockRef,setHiddenTabElement]);(0,react.useEffect)(function(){updateHiddenTabElement();},[updateHiddenTabElement]);useMutationObserver(hiddenTabElement,function(mutations){mutations.forEach(function(mutation){if(mutation.type==='attributes'&&mutation.attributeName==='hidden'){callback();updateHiddenTabElement();}});},{attributes:true,characterData:false,childList:false,subtree:false});}function useCodeWordWrap(){var _useState2=(0,react.useState)(false),isEnabled=_useState2[0],setIsEnabled=_useState2[1];var _useState3=(0,react.useState)(false),isCodeScrollable=_useState3[0],setIsCodeScrollable=_useState3[1];var codeBlockRef=(0,react.useRef)(null);var toggle=(0,react.useCallback)(function(){var codeElement=codeBlockRef.current.querySelector('code');if(isEnabled){codeElement.removeAttribute('style');}else{codeElement.style.whiteSpace='pre-wrap';// When code wrap is enabled, we want to avoid a scrollbar in any case
// Ensure that very very long words/strings/tokens still wrap
codeElement.style.overflowWrap='anywhere';}setIsEnabled(function(value){return!value;});},[codeBlockRef,isEnabled]);var updateCodeIsScrollable=(0,react.useCallback)(function(){var _codeBlockRef$current2=codeBlockRef.current,scrollWidth=_codeBlockRef$current2.scrollWidth,clientWidth=_codeBlockRef$current2.clientWidth;var isScrollable=scrollWidth>clientWidth||codeBlockRef.current.querySelector('code').hasAttribute('style');setIsCodeScrollable(isScrollable);},[codeBlockRef]);useTabBecameVisibleCallback(codeBlockRef,updateCodeIsScrollable);(0,react.useEffect)(function(){updateCodeIsScrollable();},[isEnabled,updateCodeIsScrollable]);(0,react.useEffect)(function(){window.addEventListener('resize',updateCodeIsScrollable,{passive:true});return function(){window.removeEventListener('resize',updateCodeIsScrollable);};},[updateCodeIsScrollable]);return{codeBlockRef:codeBlockRef,isEnabled:isEnabled,isCodeScrollable:isCodeScrollable,toggle:toggle};}
;// ./node_modules/@docusaurus/theme-classic/lib/theme/CodeBlock/Title/index.js
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */// Just a pass-through component that users can swizzle and customize
function CodeBlockTitle(_ref){var children=_ref.children;return children;}
// EXTERNAL MODULE: ./node_modules/prism-react-renderer/dist/index.mjs
var dist = __webpack_require__(1765);
;// ./node_modules/@docusaurus/theme-classic/lib/theme/CodeBlock/Line/Token/index.js
var Token_excluded=["line","token"];/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */// Pass-through components that users can swizzle and customize
function CodeBlockLineToken(_ref){var line=_ref.line,token=_ref.token,props=(0,objectWithoutPropertiesLoose/* default */.A)(_ref,Token_excluded);return/*#__PURE__*/(0,jsx_runtime.jsx)("span",Object.assign({},props));}
;// ./node_modules/@docusaurus/theme-classic/lib/theme/CodeBlock/Line/styles.module.css
// extracted by mini-css-extract-plugin
/* harmony default export */ const Line_styles_module = ({"codeLine":"codeLine_lJS_","codeLineNumber":"codeLineNumber_Tfdd","codeLineContent":"codeLineContent_feaV"});
;// ./node_modules/@docusaurus/theme-classic/lib/theme/CodeBlock/Line/index.js
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */// This <br/ seems useful when the line has no content to prevent collapsing.
// For code blocks with "diff" languages, this makes the empty lines collapse to
// zero height lines, which is undesirable.
// See also https://github.com/facebook/docusaurus/pull/11565
function LineBreak(){return/*#__PURE__*/(0,jsx_runtime.jsx)("br",{});}// Replaces single lines with '\n' by '' so that we don't end up with
// duplicate line breaks (the '\n' + the artificial <br/> above)
// see also https://github.com/facebook/docusaurus/pull/11565
function fixLineBreak(line){var singleLineBreakToken=line.length===1&&line[0].content==='\n'?line[0]:undefined;if(singleLineBreakToken){return[Object.assign({},singleLineBreakToken,{content:''})];}return line;}function CodeBlockLine(_ref){var lineProp=_ref.line,classNames=_ref.classNames,showLineNumbers=_ref.showLineNumbers,getLineProps=_ref.getLineProps,getTokenProps=_ref.getTokenProps;var line=fixLineBreak(lineProp);var lineProps=getLineProps({line:line,className:(0,clsx/* default */.A)(classNames,showLineNumbers&&Line_styles_module.codeLine)});var lineTokens=line.map(function(token,key){var tokenProps=getTokenProps({token:token});return/*#__PURE__*/(0,jsx_runtime.jsx)(CodeBlockLineToken,Object.assign({},tokenProps,{line:line,token:token,children:tokenProps.children}),key);});return/*#__PURE__*/(0,jsx_runtime.jsxs)("div",Object.assign({},lineProps,{children:[showLineNumbers?/*#__PURE__*/(0,jsx_runtime.jsxs)(jsx_runtime.Fragment,{children:[/*#__PURE__*/(0,jsx_runtime.jsx)("span",{className:Line_styles_module.codeLineNumber}),/*#__PURE__*/(0,jsx_runtime.jsx)("span",{className:Line_styles_module.codeLineContent,children:lineTokens})]}):lineTokens,/*#__PURE__*/(0,jsx_runtime.jsx)(LineBreak,{})]}));}
;// ./node_modules/@docusaurus/theme-classic/lib/theme/CodeBlock/Content/index.js
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */// TODO Docusaurus v4: remove useless forwardRef
var Pre=/*#__PURE__*/react.forwardRef(function(props,ref){return/*#__PURE__*/(0,jsx_runtime.jsx)("pre",Object.assign({ref:ref/* eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex */,tabIndex:0},props,{className:(0,clsx/* default */.A)(props.className,Content_styles_module.codeBlock,'thin-scrollbar')}));});function Code(props){var _useCodeBlockContext=useCodeBlockContext(),metadata=_useCodeBlockContext.metadata;return/*#__PURE__*/(0,jsx_runtime.jsx)("code",Object.assign({},props,{className:(0,clsx/* default */.A)(props.className,Content_styles_module.codeBlockLines,metadata.lineNumbersStart!==undefined&&Content_styles_module.codeBlockLinesWithNumbering),style:Object.assign({},props.style,{counterReset:metadata.lineNumbersStart===undefined?undefined:"line-count "+(metadata.lineNumbersStart-1)})}));}function CodeBlockContent(_ref){var classNameProp=_ref.className;var _useCodeBlockContext2=useCodeBlockContext(),metadata=_useCodeBlockContext2.metadata,wordWrap=_useCodeBlockContext2.wordWrap;var prismTheme=usePrismTheme();var code=metadata.code,language=metadata.language,lineNumbersStart=metadata.lineNumbersStart,lineClassNames=metadata.lineClassNames;return/*#__PURE__*/(0,jsx_runtime.jsx)(dist/* Highlight */.f4,{theme:prismTheme,code:code,language:language,children:function children(_ref2){var className=_ref2.className,style=_ref2.style,lines=_ref2.tokens,getLineProps=_ref2.getLineProps,getTokenProps=_ref2.getTokenProps;return/*#__PURE__*/(0,jsx_runtime.jsx)(Pre,{ref:wordWrap.codeBlockRef,className:(0,clsx/* default */.A)(classNameProp,className),style:style,children:/*#__PURE__*/(0,jsx_runtime.jsx)(Code,{children:lines.map(function(line,i){return/*#__PURE__*/(0,jsx_runtime.jsx)(CodeBlockLine,{line:line,getLineProps:getLineProps,getTokenProps:getTokenProps,classNames:lineClassNames[i],showLineNumbers:lineNumbersStart!==undefined},i);})})});}});}
;// ./node_modules/@docusaurus/core/lib/client/exports/BrowserOnly.js
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */// Similar comp to the one described here:
// https://www.joshwcomeau.com/react/the-perils-of-rehydration/#abstractions
function BrowserOnly(_ref){var children=_ref.children,fallback=_ref.fallback;var isBrowser=(0,useIsBrowser/* default */.A)();if(isBrowser){if(typeof children!=='function'&&"production"==='development')// removed by dead control flow
{}return/*#__PURE__*/(0,jsx_runtime.jsx)(jsx_runtime.Fragment,{children:children==null?void 0:children()});}return fallback!=null?fallback:null;}
// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/regenerator.js
var regenerator = __webpack_require__(2007);
// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js
var asyncToGenerator = __webpack_require__(467);
// EXTERNAL MODULE: ./node_modules/@docusaurus/core/lib/client/exports/Translate.js + 1 modules
var Translate = __webpack_require__(1312);
;// ./node_modules/@docusaurus/theme-classic/lib/theme/CodeBlock/Buttons/Button/index.js
var Button_excluded=["className"];/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */function CodeBlockButton(_ref){var className=_ref.className,props=(0,objectWithoutPropertiesLoose/* default */.A)(_ref,Button_excluded);return/*#__PURE__*/(0,jsx_runtime.jsx)("button",Object.assign({type:"button"},props,{className:(0,clsx/* default */.A)('clean-btn',className)}));}
;// ./node_modules/@docusaurus/theme-classic/lib/theme/Icon/Copy/index.js
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */function IconCopy(props){return/*#__PURE__*/(0,jsx_runtime.jsx)("svg",Object.assign({viewBox:"0 0 24 24"},props,{children:/*#__PURE__*/(0,jsx_runtime.jsx)("path",{fill:"currentColor",d:"M19,21H8V7H19M19,5H8A2,2 0 0,0 6,7V21A2,2 0 0,0 8,23H19A2,2 0 0,0 21,21V7A2,2 0 0,0 19,5M16,1H4A2,2 0 0,0 2,3V17H4V3H16V1Z"})}));}
;// ./node_modules/@docusaurus/theme-classic/lib/theme/Icon/Success/index.js
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */function IconSuccess(props){return/*#__PURE__*/(0,jsx_runtime.jsx)("svg",Object.assign({viewBox:"0 0 24 24"},props,{children:/*#__PURE__*/(0,jsx_runtime.jsx)("path",{fill:"currentColor",d:"M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"})}));}
;// ./node_modules/@docusaurus/theme-classic/lib/theme/CodeBlock/Buttons/CopyButton/styles.module.css
// extracted by mini-css-extract-plugin
/* harmony default export */ const CopyButton_styles_module = ({"copyButtonCopied":"copyButtonCopied_Vdqa","copyButtonIcons":"copyButtonIcons_IEyt","copyButtonIcon":"copyButtonIcon_TrPX","copyButtonSuccessIcon":"copyButtonSuccessIcon_cVMy"});
;// ./node_modules/@docusaurus/theme-classic/lib/theme/CodeBlock/Buttons/CopyButton/index.js
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */function title(){return (0,Translate/* translate */.T)({id:'theme.CodeBlock.copy',message:'Copy',description:'The copy button label on code blocks'});}function ariaLabel(isCopied){return isCopied?(0,Translate/* translate */.T)({id:'theme.CodeBlock.copied',message:'Copied',description:'The copied button label on code blocks'}):(0,Translate/* translate */.T)({id:'theme.CodeBlock.copyButtonAriaLabel',message:'Copy code to clipboard',description:'The ARIA label for copy code blocks button'});}function copyToClipboard(_x){return _copyToClipboard.apply(this,arguments);}function _copyToClipboard(){_copyToClipboard=(0,asyncToGenerator/* default */.A)(/*#__PURE__*/(0,regenerator/* default */.A)().m(function _callee(text){var _yield$import,copy;return (0,regenerator/* default */.A)().w(function(_context){while(1)switch(_context.n){case 0:if(!navigator.clipboard){_context.n=1;break;}return _context.a(2,navigator.clipboard.writeText(text));case 1:_context.n=2;return __webpack_require__.e(/* import() */ 3436).then(__webpack_require__.bind(__webpack_require__, 3436));case 2:_yield$import=_context.v;copy=_yield$import["default"];return _context.a(2,copy(text));}},_callee);}));return _copyToClipboard.apply(this,arguments);}function useCopyButton(){var _useCodeBlockContext=useCodeBlockContext(),code=_useCodeBlockContext.metadata.code;var _useState=(0,react.useState)(false),isCopied=_useState[0],setIsCopied=_useState[1];var copyTimeout=(0,react.useRef)(undefined);var copyCode=(0,react.useCallback)(function(){copyToClipboard(code).then(function(){setIsCopied(true);copyTimeout.current=window.setTimeout(function(){setIsCopied(false);},1000);});// Errors are intentionally not caught so they remain unhandled and can
// be captured by observability tools (e.g. Sentry, PostHog).
},[code]);(0,react.useEffect)(function(){return function(){return window.clearTimeout(copyTimeout.current);};},[]);return{copyCode:copyCode,isCopied:isCopied};}function CopyButton(_ref){var className=_ref.className;var _useCopyButton=useCopyButton(),copyCode=_useCopyButton.copyCode,isCopied=_useCopyButton.isCopied;return/*#__PURE__*/(0,jsx_runtime.jsx)(CodeBlockButton,{"aria-label":ariaLabel(isCopied),title:title(),className:(0,clsx/* default */.A)(className,CopyButton_styles_module.copyButton,isCopied&&CopyButton_styles_module.copyButtonCopied),onClick:copyCode,children:/*#__PURE__*/(0,jsx_runtime.jsxs)("span",{className:CopyButton_styles_module.copyButtonIcons,"aria-hidden":"true",children:[/*#__PURE__*/(0,jsx_runtime.jsx)(IconCopy,{className:CopyButton_styles_module.copyButtonIcon}),/*#__PURE__*/(0,jsx_runtime.jsx)(IconSuccess,{className:CopyButton_styles_module.copyButtonSuccessIcon})]})});}
;// ./node_modules/@docusaurus/theme-classic/lib/theme/Icon/WordWrap/index.js
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */function IconWordWrap(props){return/*#__PURE__*/(0,jsx_runtime.jsx)("svg",Object.assign({viewBox:"0 0 24 24"},props,{children:/*#__PURE__*/(0,jsx_runtime.jsx)("path",{fill:"currentColor",d:"M4 19h6v-2H4v2zM20 5H4v2h16V5zm-3 6H4v2h13.25c1.1 0 2 .9 2 2s-.9 2-2 2H15v-2l-3 3l3 3v-2h2c2.21 0 4-1.79 4-4s-1.79-4-4-4z"})}));}
;// ./node_modules/@docusaurus/theme-classic/lib/theme/CodeBlock/Buttons/WordWrapButton/styles.module.css
// extracted by mini-css-extract-plugin
/* harmony default export */ const WordWrapButton_styles_module = ({"wordWrapButtonIcon":"wordWrapButtonIcon_b1P5","wordWrapButtonEnabled":"wordWrapButtonEnabled_uzNF"});
;// ./node_modules/@docusaurus/theme-classic/lib/theme/CodeBlock/Buttons/WordWrapButton/index.js
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */function WordWrapButton(_ref){var className=_ref.className;var _useCodeBlockContext=useCodeBlockContext(),wordWrap=_useCodeBlockContext.wordWrap;var canShowButton=wordWrap.isEnabled||wordWrap.isCodeScrollable;if(!canShowButton){return false;}var title=(0,Translate/* translate */.T)({id:'theme.CodeBlock.wordWrapToggle',message:'Toggle word wrap',description:'The title attribute for toggle word wrapping button of code block lines'});return/*#__PURE__*/(0,jsx_runtime.jsx)(CodeBlockButton,{onClick:function onClick(){return wordWrap.toggle();},className:(0,clsx/* default */.A)(className,wordWrap.isEnabled&&WordWrapButton_styles_module.wordWrapButtonEnabled),"aria-label":title,title:title,children:/*#__PURE__*/(0,jsx_runtime.jsx)(IconWordWrap,{className:WordWrapButton_styles_module.wordWrapButtonIcon,"aria-hidden":"true"})});}
;// ./node_modules/@docusaurus/theme-classic/lib/theme/CodeBlock/Buttons/styles.module.css
// extracted by mini-css-extract-plugin
/* harmony default export */ const Buttons_styles_module = ({"buttonGroup":"buttonGroup_M5ko"});
;// ./node_modules/@docusaurus/theme-classic/lib/theme/CodeBlock/Buttons/index.js
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */// Code block buttons are not server-rendered on purpose
// Adding them to the initial HTML is useless and expensive (due to JSX SVG)
// They are hidden by default and require React  to become interactive
function CodeBlockButtons(_ref){var className=_ref.className;return/*#__PURE__*/(0,jsx_runtime.jsx)(BrowserOnly,{children:function children(){return/*#__PURE__*/(0,jsx_runtime.jsxs)("div",{className:(0,clsx/* default */.A)(className,Buttons_styles_module.buttonGroup),children:[/*#__PURE__*/(0,jsx_runtime.jsx)(WordWrapButton,{}),/*#__PURE__*/(0,jsx_runtime.jsx)(CopyButton,{})]});}});}
;// ./node_modules/@docusaurus/theme-classic/lib/theme/CodeBlock/Layout/styles.module.css
// extracted by mini-css-extract-plugin
/* harmony default export */ const Layout_styles_module = ({"codeBlockContent":"codeBlockContent_QJqH","codeBlockTitle":"codeBlockTitle_OeMC","codeBlock":"codeBlock_a8dz"});
;// ./node_modules/@docusaurus/theme-classic/lib/theme/CodeBlock/Layout/index.js
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */function CodeBlockLayout(_ref){var className=_ref.className;var _useCodeBlockContext=useCodeBlockContext(),metadata=_useCodeBlockContext.metadata;return/*#__PURE__*/(0,jsx_runtime.jsxs)(CodeBlockContainer,{as:"div",className:(0,clsx/* default */.A)(className,metadata.className),children:[metadata.title&&/*#__PURE__*/(0,jsx_runtime.jsx)("div",{className:Layout_styles_module.codeBlockTitle,children:/*#__PURE__*/(0,jsx_runtime.jsx)(CodeBlockTitle,{children:metadata.title})}),/*#__PURE__*/(0,jsx_runtime.jsxs)("div",{className:Layout_styles_module.codeBlockContent,children:[/*#__PURE__*/(0,jsx_runtime.jsx)(CodeBlockContent,{}),/*#__PURE__*/(0,jsx_runtime.jsx)(CodeBlockButtons,{})]})]});}
;// ./node_modules/@docusaurus/theme-classic/lib/theme/CodeBlock/Content/String.js
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */function useCodeBlockMetadata(props){var _useThemeConfig=(0,useThemeConfig/* useThemeConfig */.p)(),prism=_useThemeConfig.prism;return createCodeBlockMetadata({code:props.children,className:props.className,metastring:props.metastring,magicComments:prism.magicComments,defaultLanguage:prism.defaultLanguage,language:props.language,title:props.title,showLineNumbers:props.showLineNumbers});}// TODO Docusaurus v4: move this component at the root?
function CodeBlockString(props){var metadata=useCodeBlockMetadata(props);var wordWrap=useCodeWordWrap();return/*#__PURE__*/(0,jsx_runtime.jsx)(CodeBlockContextProvider,{metadata:metadata,wordWrap:wordWrap,children:/*#__PURE__*/(0,jsx_runtime.jsx)(CodeBlockLayout,{})});}
;// ./node_modules/@docusaurus/theme-classic/lib/theme/CodeBlock/index.js
var CodeBlock_excluded=["children"];/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *//**
 * Best attempt to make the children a plain string so it is copyable. If there
 * are react elements, we will not be able to copy the content, and it will
 * return `children` as-is; otherwise, it concatenates the string children
 * together.
 */function maybeStringifyChildren(children){if(react.Children.toArray(children).some(function(el){return/*#__PURE__*/(0,react.isValidElement)(el);})){return children;}// The children is now guaranteed to be one/more plain strings
return Array.isArray(children)?children.join(''):children;}function CodeBlock(_ref){var rawChildren=_ref.children,props=(0,objectWithoutPropertiesLoose/* default */.A)(_ref,CodeBlock_excluded);// The Prism theme on SSR is always the default theme but the site theme can
// be in a different mode. React hydration doesn't update DOM styles that come
// from SSR. Hence force a re-render after mounting to apply the current
// relevant styles.
var isBrowser=(0,useIsBrowser/* default */.A)();var children=maybeStringifyChildren(rawChildren);var CodeBlockComp=typeof children==='string'?CodeBlockString:CodeBlockJSX;return/*#__PURE__*/(0,jsx_runtime.jsx)(CodeBlockComp,Object.assign({},props,{children:children}),String(isBrowser));}
;// ./node_modules/@docusaurus/theme-classic/lib/theme/CodeInline/index.js
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */// Simple component used to render inline code blocks
// its purpose is to be swizzled and customized
// MDX 1 used to have a inlineCode comp, see https://mdxjs.com/migrating/v2/
function CodeInline(props){return/*#__PURE__*/(0,jsx_runtime.jsx)("code",Object.assign({},props));}
;// ./node_modules/@docusaurus/theme-classic/lib/theme/MDXComponents/Code.js
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */function shouldBeInline(props){return(// empty code blocks have no props.children,
// see https://github.com/facebook/docusaurus/pull/9704
typeof props.children!=='undefined'&&react.Children.toArray(props.children).every(function(el){return typeof el==='string'&&!el.includes('\n');}));}function MDXCode(props){return shouldBeInline(props)?/*#__PURE__*/(0,jsx_runtime.jsx)(CodeInline,Object.assign({},props)):/*#__PURE__*/(0,jsx_runtime.jsx)(CodeBlock,Object.assign({},props));}
// EXTERNAL MODULE: ./node_modules/@docusaurus/core/lib/client/exports/Link.js
var Link = __webpack_require__(8774);
// EXTERNAL MODULE: ./node_modules/@docusaurus/theme-common/lib/utils/anchorUtils.js + 1 modules
var anchorUtils = __webpack_require__(3535);
;// ./node_modules/@docusaurus/theme-classic/lib/theme/MDXComponents/A/index.js
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */function MDXA(props){// MDX Footnotes have ids such as <a id="user-content-fn-1-953011" ...>
var anchorTargetClassName=(0,anchorUtils/* useAnchorTargetClassName */.v)(props.id);return/*#__PURE__*/(0,jsx_runtime.jsx)(Link/* default */.A,Object.assign({},props,{className:(0,clsx/* default */.A)(anchorTargetClassName,props.className)}));}
;// ./node_modules/@docusaurus/theme-classic/lib/theme/MDXComponents/Pre.js
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */function MDXPre(props){// With MDX 2, this element is only used for fenced code blocks
// It always receives a MDXComponents/Code as children
return/*#__PURE__*/(0,jsx_runtime.jsx)(jsx_runtime.Fragment,{children:props.children});}
;// ./node_modules/@babel/runtime/helpers/esm/objectDestructuringEmpty.js
function _objectDestructuringEmpty(t) {
  if (null == t) throw new TypeError("Cannot destructure " + t);
}

// EXTERNAL MODULE: ./node_modules/@docusaurus/core/lib/client/exports/useBrokenLinks.js + 1 modules
var useBrokenLinks = __webpack_require__(3427);
// EXTERNAL MODULE: ./node_modules/@docusaurus/theme-common/lib/components/Collapsible/index.js
var Collapsible = __webpack_require__(1422);
;// ./node_modules/@docusaurus/theme-common/lib/components/Details/styles.module.css
// extracted by mini-css-extract-plugin
/* harmony default export */ const Details_styles_module = ({"details":"details_lb9f","isBrowser":"isBrowser_bmU9","collapsibleContent":"collapsibleContent_i85q"});
;// ./node_modules/@docusaurus/theme-common/lib/components/Details/index.js
var Details_excluded=["summary","children"];/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */function isInSummary(node){if(!node){return false;}return node.tagName==='SUMMARY'||isInSummary(node.parentElement);}function hasParent(node,parent){if(!node){return false;}return node===parent||hasParent(node.parentElement,parent);}/**
 * A mostly un-styled `<details>` element with smooth collapsing. Provides some
 * very lightweight styles, but you should bring your UI.
 */function Details(_ref){var summary=_ref.summary,children=_ref.children,props=(0,objectWithoutPropertiesLoose/* default */.A)(_ref,Details_excluded);(0,useBrokenLinks/* default */.A)().collectAnchor(props.id);var isBrowser=(0,useIsBrowser/* default */.A)();var detailsRef=(0,react.useRef)(null);var _useCollapsible=(0,Collapsible/* useCollapsible */.u)({initialState:!props.open}),collapsed=_useCollapsible.collapsed,setCollapsed=_useCollapsible.setCollapsed;// Use a separate state for the actual details prop, because it must be set
// only after animation completes, otherwise close animations won't work
var _useState=(0,react.useState)(props.open),open=_useState[0],setOpen=_useState[1];var summaryElement=/*#__PURE__*/react.isValidElement(summary)?summary:/*#__PURE__*/(0,jsx_runtime.jsx)("summary",{children:summary!=null?summary:'Details'});return(/*#__PURE__*/// eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions
(0,jsx_runtime.jsxs)("details",Object.assign({},props,{ref:detailsRef,open:open,"data-collapsed":collapsed,className:(0,clsx/* default */.A)(Details_styles_module.details,isBrowser&&Details_styles_module.isBrowser,props.className),onMouseDown:function onMouseDown(e){var target=e.target;// Prevent a double-click to highlight summary text
if(isInSummary(target)&&e.detail>1){e.preventDefault();}},onClick:function onClick(e){e.stopPropagation();// For isolation of multiple nested details/summary
var target=e.target;var shouldToggle=isInSummary(target)&&hasParent(target,detailsRef.current);if(!shouldToggle){return;}e.preventDefault();if(collapsed){setCollapsed(false);setOpen(true);}else{setCollapsed(true);// Don't do this, it breaks close animation!
// setOpen(false);
}},children:[summaryElement,/*#__PURE__*/(0,jsx_runtime.jsx)(Collapsible/* Collapsible */.N,{lazy:false// Content might matter for SEO in this case
,collapsed:collapsed,onCollapseTransitionEnd:function onCollapseTransitionEnd(newCollapsed){setCollapsed(newCollapsed);setOpen(!newCollapsed);},children:/*#__PURE__*/(0,jsx_runtime.jsx)("div",{className:Details_styles_module.collapsibleContent,children:children})})]})));}
;// ./node_modules/@docusaurus/theme-classic/lib/theme/Details/styles.module.css
// extracted by mini-css-extract-plugin
/* harmony default export */ const theme_Details_styles_module = ({"details":"details_b_Ee"});
;// ./node_modules/@docusaurus/theme-classic/lib/theme/Details/index.js
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */// Should we have a custom details/summary comp in Infima instead of reusing
// alert classes?
var InfimaClasses='alert alert--info';function Details_Details(_ref){var props=Object.assign({},(_objectDestructuringEmpty(_ref),_ref));return/*#__PURE__*/(0,jsx_runtime.jsx)(Details,Object.assign({},props,{className:(0,clsx/* default */.A)(InfimaClasses,theme_Details_styles_module.details,props.className)}));}
;// ./node_modules/@docusaurus/theme-classic/lib/theme/MDXComponents/Details.js
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */function MDXDetails(props){var items=react.Children.toArray(props.children);// Split summary item from the rest to pass it as a separate prop to the
// Details theme component
var summary=items.find(function(item){return/*#__PURE__*/react.isValidElement(item)&&item.type==='summary';});var children=/*#__PURE__*/(0,jsx_runtime.jsx)(jsx_runtime.Fragment,{children:items.filter(function(item){return item!==summary;})});return/*#__PURE__*/(0,jsx_runtime.jsx)(Details_Details,Object.assign({},props,{summary:summary,children:children}));}
// EXTERNAL MODULE: ./node_modules/@docusaurus/theme-classic/lib/theme/Heading/index.js
var Heading = __webpack_require__(4608);
;// ./node_modules/@docusaurus/theme-classic/lib/theme/MDXComponents/Heading.js
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */function MDXHeading(props){return/*#__PURE__*/(0,jsx_runtime.jsx)(Heading/* default */.A,Object.assign({},props));}
;// ./node_modules/@docusaurus/theme-classic/lib/theme/MDXComponents/Ul/styles.module.css
// extracted by mini-css-extract-plugin
/* harmony default export */ const Ul_styles_module = ({"containsTaskList":"containsTaskList_mC6p"});
;// ./node_modules/@docusaurus/theme-classic/lib/theme/MDXComponents/Ul/index.js
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */function transformUlClassName(className){// Fix https://github.com/facebook/docusaurus/issues/9098
if(typeof className==='undefined'){return undefined;}return (0,clsx/* default */.A)(className,// This class is set globally by GitHub/MDX. We keep the global class, and
// add another class to get a task list without the default ul styling
// See https://github.com/syntax-tree/mdast-util-to-hast/issues/28
(className==null?void 0:className.includes('contains-task-list'))&&Ul_styles_module.containsTaskList);}function MDXUl(props){return/*#__PURE__*/(0,jsx_runtime.jsx)("ul",Object.assign({},props,{className:transformUlClassName(props.className)}));}
;// ./node_modules/@docusaurus/theme-classic/lib/theme/MDXComponents/Li.js
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */function MDXLi(props){// MDX Footnotes have ids such as <li id="user-content-fn-1-953011">
(0,useBrokenLinks/* default */.A)().collectAnchor(props.id);var anchorTargetClassName=(0,anchorUtils/* useAnchorTargetClassName */.v)(props.id);return/*#__PURE__*/(0,jsx_runtime.jsx)("li",Object.assign({className:(0,clsx/* default */.A)(anchorTargetClassName,props.className)},props));}
;// ./node_modules/@docusaurus/theme-classic/lib/theme/MDXComponents/Img/styles.module.css
// extracted by mini-css-extract-plugin
/* harmony default export */ const Img_styles_module = ({"img":"img_ev3q"});
;// ./node_modules/@docusaurus/theme-classic/lib/theme/MDXComponents/Img/index.js
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */function transformImgClassName(className){return (0,clsx/* default */.A)(className,Img_styles_module.img);}function MDXImg(props){return(/*#__PURE__*/// eslint-disable-next-line jsx-a11y/alt-text
(0,jsx_runtime.jsx)("img",Object.assign({decoding:"async",loading:"lazy"},props,{className:transformImgClassName(props.className)})));}
// EXTERNAL MODULE: ./node_modules/@docusaurus/theme-classic/lib/theme/Admonition/index.js + 15 modules
var Admonition = __webpack_require__(7293);
;// ./node_modules/@docusaurus/core/lib/client/exports/Noop.js
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *//* harmony default export */ const Noop = (function(){return null;});
__webpack_require__.dn(Noop);
;// ./node_modules/@docusaurus/theme-classic/lib/theme/MDXComponents/index.js
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var MDXComponents={Head:Head/* default */.A,details:MDXDetails,// For MD mode support, see https://github.com/facebook/docusaurus/issues/9092#issuecomment-1602902274
Details:MDXDetails,code:MDXCode,a:MDXA,pre:MDXPre,ul:MDXUl,li:MDXLi,img:MDXImg,h1:function h1(props){return/*#__PURE__*/(0,jsx_runtime.jsx)(MDXHeading,Object.assign({as:"h1"},props));},h2:function h2(props){return/*#__PURE__*/(0,jsx_runtime.jsx)(MDXHeading,Object.assign({as:"h2"},props));},h3:function h3(props){return/*#__PURE__*/(0,jsx_runtime.jsx)(MDXHeading,Object.assign({as:"h3"},props));},h4:function h4(props){return/*#__PURE__*/(0,jsx_runtime.jsx)(MDXHeading,Object.assign({as:"h4"},props));},h5:function h5(props){return/*#__PURE__*/(0,jsx_runtime.jsx)(MDXHeading,Object.assign({as:"h5"},props));},h6:function h6(props){return/*#__PURE__*/(0,jsx_runtime.jsx)(MDXHeading,Object.assign({as:"h6"},props));},admonition:Admonition/* default */.A,mermaid:Noop};/* harmony default export */ const theme_MDXComponents = (MDXComponents);

/***/ },

/***/ 8426
(module, exports) {

/**
 * @param {string} string    The string to parse
 * @returns {Array<number>}  Returns an energetic array.
 */
function parsePart(string) {
  let res = [];
  let m;

  for (let str of string.split(",").map((str) => str.trim())) {
    // just a number
    if (/^-?\d+$/.test(str)) {
      res.push(parseInt(str, 10));
    } else if (
      (m = str.match(/^(-?\d+)(-|\.\.\.?|\u2025|\u2026|\u22EF)(-?\d+)$/))
    ) {
      // 1-5 or 1..5 (equivalent) or 1...5 (doesn't include 5)
      let [_, lhs, sep, rhs] = m;

      if (lhs && rhs) {
        lhs = parseInt(lhs);
        rhs = parseInt(rhs);
        const incr = lhs < rhs ? 1 : -1;

        // Make it inclusive by moving the right 'stop-point' away by one.
        if (sep === "-" || sep === ".." || sep === "\u2025") rhs += incr;

        for (let i = lhs; i !== rhs; i += incr) res.push(i);
      }
    }
  }

  return res;
}

exports["default"] = parsePart;
module.exports = parsePart;


/***/ },

/***/ 9321
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ _regeneratorValues)
/* harmony export */ });
/* harmony import */ var _typeof_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2284);

function _regeneratorValues(e) {
  if (null != e) {
    var t = e["function" == typeof Symbol && Symbol.iterator || "@@iterator"],
      r = 0;
    if (t) return t.call(e);
    if ("function" == typeof e.next) return e;
    if (!isNaN(e.length)) return {
      next: function next() {
        return e && r >= e.length && (e = void 0), {
          value: e && e[r++],
          done: !e
        };
      }
    };
  }
  throw new TypeError((0,_typeof_js__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)(e) + " is not iterable");
}


/***/ },

/***/ 8453
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
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