/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({});
/************************************************************************/
/******/ 	// The module cache
/******/ 	const __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		const cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		const module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			loaded: false,
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = __webpack_module_cache__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		const deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			let notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				let [chunkIds, fn, priority] = deferred[i];
/******/ 				let fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					const r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			const getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/create fake namespace object */
/******/ 	(() => {
/******/ 		const getProto = Object.getPrototypeOf ? (obj) => (Object.getPrototypeOf(obj)) : (obj) => (obj.__proto__);
/******/ 		let leafPrototypes;
/******/ 		// create a fake namespace object
/******/ 		// mode & 1: value is a module id, require it
/******/ 		// mode & 2: merge all properties of value into the ns
/******/ 		// mode & 4: return value when already ns object
/******/ 		// mode & 16: return value when it's Promise-like
/******/ 		// mode & 8|1: behave like require
/******/ 		__webpack_require__.t = function(value, mode) {
/******/ 			if(mode & 1) value = this(value);
/******/ 			if(mode & 8) return value;
/******/ 			if(typeof value === 'object' && value) {
/******/ 				if((mode & 4) && value.__esModule) return value;
/******/ 				if((mode & 16) && typeof value.then === 'function') return value;
/******/ 			}
/******/ 			const ns = Object.create(null);
/******/ 			__webpack_require__.r(ns);
/******/ 			const def = {};
/******/ 			leafPrototypes = leafPrototypes || [null, getProto({}), getProto([]), getProto(getProto)];
/******/ 			for(var current = mode & 2 && value; (typeof current == 'object' || typeof current == 'function') && !~leafPrototypes.indexOf(current); current = getProto(current)) {
/******/ 				Object.getOwnPropertyNames(current).forEach((key) => (def[key] = () => (value[key])));
/******/ 			}
/******/ 			def['default'] = () => (value);
/******/ 			__webpack_require__.d(ns, def);
/******/ 			return ns;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter/value functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			if(Array.isArray(definition)) {
/******/ 				var i = 0;
/******/ 				while(i < definition.length) {
/******/ 					var key = definition[i++];
/******/ 					var binding = definition[i++];
/******/ 					if(!__webpack_require__.o(exports, key)) {
/******/ 						if(binding === 0) {
/******/ 							Object.defineProperty(exports, key, { enumerable: true, value: definition[i++] });
/******/ 						} else {
/******/ 							Object.defineProperty(exports, key, { enumerable: true, get: binding });
/******/ 						}
/******/ 					} else if(binding === 0) { i++; }
/******/ 				}
/******/ 			} else {
/******/ 				for(var key in definition) {
/******/ 					if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 						Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/ensure chunk */
/******/ 	(() => {
/******/ 		__webpack_require__.f = {};
/******/ 		// This file contains only the entry chunk.
/******/ 		// The chunk loading function for additional chunks
/******/ 		__webpack_require__.e = (chunkId) => {
/******/ 			return Promise.all(Object.keys(__webpack_require__.f).reduce((promises, key) => {
/******/ 				__webpack_require__.f[key](chunkId, promises);
/******/ 				return promises;
/******/ 			}, []));
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/get javascript chunk filename */
/******/ 	(() => {
/******/ 		// This function allow to reference async chunks
/******/ 		__webpack_require__.u = (chunkId) => {
/******/ 			// return url for filenames based on template
/******/ 			return "assets/js/" + ({"12":"e81e79e1","61":"3a290eec","62":"499ccd01","151":"6a278158","180":"234915de","202":"0b0a7a33","206":"66405cde","237":"6fd86372","294":"677669c5","367":"33b1fc53","391":"24db81fc","517":"72285862","610":"136f6ffc","797":"7f46ead9","865":"05dae7c3","940":"4fd6e9ef","996":"02bc35ff","1050":"1a302aab","1103":"de9b07f1","1133":"cf0c6bc3","1235":"a7456010","1239":"2c56ddf2","1300":"af9da345","1373":"cd4d8353","1538":"32607a88","1559":"9b3954ae","1561":"21064a51","1567":"22dd74f7","1589":"e5233fbd","1677":"7ca4477e","1723":"392851d4","1736":"51302c5f","1786":"f963f96f","1789":"fc66c132","1799":"57c09705","1811":"4d6f61cb","1813":"2a570aca","1920":"769e6660","1971":"b72a1b83","1978":"3039be6a","2021":"dc7cc464","2042":"916e0369","2044":"f0839fa4","2046":"c037291b","2065":"012a6385","2116":"7e3df462","2138":"1a4e3797","2158":"cfba2d21","2240":"fdd7ac59","2293":"2895fe63","2335":"b5ce8b89","2497":"8eacc73d","2569":"83876cc2","2574":"fdd31a68","2608":"1aa6bc9f","2641":"85fa4f02","2696":"6095aae2","2740":"313d9643","2776":"1df12100","2787":"666bb738","2874":"1fd92c48","2960":"fe16ab84","3013":"199656d4","3105":"065638d0","3123":"45fe9c73","3173":"bada6b39","3194":"2481c0ad","3204":"e430be86","3218":"3861f913","3263":"55b70e20","3266":"c222d9ad","3281":"f571a10c","3458":"06be1ca7","3497":"bcb3060d","3519":"05ec067f","3728":"bad46600","3871":"543dfe38","3881":"c8616455","3922":"afd433e9","3971":"601c52fe","3972":"b67851d0","3989":"459778aa","3993":"05f7e434","4005":"65e6533a","4055":"22874555","4106":"1ac6a0a8","4199":"c2e345ae","4229":"b0033f3a","4233":"83af1177","4317":"b54a028b","4420":"e39b8a3b","4478":"e9701416","4532":"8c1bab5c","4539":"0ee5487f","4579":"6d930ec6","4606":"52269da8","4624":"af65fcbf","4740":"807b2f62","4756":"9ffc73fc","4760":"89df1de4","4800":"499111ee","4821":"f536dda5","4844":"083264ae","4848":"35e33c63","4873":"43a1f6ed","4909":"c865d9f7","4921":"138e0e15","4961":"46058caa","5124":"bdd98ce4","5157":"34ae87f0","5190":"06975916","5206":"a2c3aa48","5284":"6ff06393","5327":"f3a2928a","5333":"f812273a","5385":"4367e6de","5423":"80fff2c9","5452":"fa892bd1","5502":"3c619d8c","5507":"e7e08fda","5593":"9a4c0380","5681":"56177334","5688":"d450bfdd","5721":"a2281811","5724":"76acfd82","5742":"aba21aa0","5754":"dd0e7b50","5767":"05b98b57","5775":"6b9f5183","5780":"acd37597","5819":"38f399df","5842":"77edc71e","5886":"59a92ae5","5932":"a7816949","5971":"74ceedf0","6002":"149a6f93","6007":"e26cd2e1","6051":"d9402ac3","6062":"b87f1ca3","6073":"9ee18cfc","6115":"3f054de9","6155":"472108f6","6215":"fe19a9b9","6231":"acacb594","6241":"72f89974","6252":"e0b5297a","6325":"4585bec8","6435":"d00a4746","6491":"e9ff80ae","6497":"1743c794","6556":"a0f9e884","6568":"c7f854c1","6643":"4913df53","6720":"e4c5201a","6761":"dd449c95","6801":"4baffb4e","6843":"ed19a161","6851":"870b43aa","6853":"6eda8c2a","6862":"926699a1","6903":"f8409a7e","6959":"a6beda10","7063":"70ccf65d","7071":"e9353c13","7097":"17b17581","7098":"a7bd4aaa","7102":"cd692737","7205":"f23af28f","7206":"76d52fad","7212":"4e0d7e82","7242":"3ffdcdc4","7492":"f8bdd986","7496":"4220c6f2","7605":"c7cf2a44","7696":"31cb1d6e","7778":"aa811768","7788":"b1261bc0","7789":"f00839a3","7798":"2ea237e6","7803":"d4302d90","7871":"aa2756e5","7873":"8f5429dd","7916":"c4aa59df","7962":"ed59a007","7977":"982d95d9","8075":"aa1f17b5","8196":"cdb567f2","8198":"ada67f88","8203":"b07c3c86","8208":"ae1bc148","8232":"6b9b11a7","8266":"f9b371b1","8351":"7effe7ca","8355":"601771aa","8359":"8539c7fa","8368":"38f69ba0","8401":"17896441","8539":"a48a417b","8569":"a691fc04","8611":"efec2d3f","8645":"2841fb67","8696":"fdfa6cfe","8720":"08fbf85f","8859":"e9e0284c","8872":"21cca144","8931":"5baf5111","8962":"5944e329","9024":"47c73d47","9044":"ee973b24","9048":"a94703ab","9078":"2ebe70b2","9157":"cd640d74","9173":"1832d1d3","9190":"70cbdd3f","9196":"ccfab65a","9326":"36617769","9332":"6813e635","9338":"dd1e2399","9348":"eafb48e6","9380":"a060c64e","9429":"1da7c19b","9540":"f907bf94","9548":"da9daa8c","9569":"19df84f4","9647":"5e95c892","9654":"d2c948cb","9655":"2470237c","9759":"8ba9df99","9767":"8990bb42","9824":"2c7b9d64","9840":"1d7bbcfd","9944":"8fad2f46","9957":"0b0cd8dc"}[chunkId] || chunkId) + "." + {"12":"50949f89","61":"346cc4f1","62":"b1d1d33b","151":"9a5eea4a","180":"e8782c5b","202":"9d860809","206":"3d3d6aed","237":"5b6d53c0","294":"269015e4","367":"7a32361f","391":"2bd9ff57","489":"2552be50","517":"df1b876d","610":"34e51d91","797":"96acc4a8","865":"f3037b85","940":"e3fd11e5","996":"f871a3ea","1050":"565c73fe","1103":"7e8d27ed","1133":"cff722b3","1235":"1c5002bc","1239":"37603f92","1300":"b9d97ce1","1373":"48f38457","1538":"603dcdfc","1559":"b0b23abf","1561":"ea66f8be","1567":"a19f3dba","1589":"801ea316","1677":"713dc79e","1723":"60699b2f","1736":"32c58ed5","1786":"892b722b","1789":"0bc857e0","1799":"ecf06297","1811":"250f8634","1813":"5f59fa38","1920":"0982ea9f","1971":"d718f54c","1978":"3b21199a","2021":"dd9a2974","2042":"b25d9a11","2044":"ba3a374d","2046":"88a069ae","2065":"d01f4c78","2116":"e4aae90d","2138":"22ce6334","2158":"5c45e28e","2237":"3794e239","2240":"cebf5fc8","2293":"da4bb859","2335":"d68954a0","2497":"5838e708","2569":"cb5f079b","2574":"221f0e73","2608":"2b0f7c5e","2641":"3229d6d4","2696":"3f4a9053","2740":"f5c6845a","2776":"4136deae","2787":"b8f0087a","2874":"cd825934","2960":"1c97e39d","3013":"75444c3a","3105":"859b2247","3123":"7277cfd1","3173":"4028ae19","3194":"d381b896","3204":"2c592392","3218":"c8295631","3263":"ba902184","3266":"710bda37","3281":"e763f73c","3436":"1951703f","3458":"9ef8eb0f","3497":"a770afe4","3519":"ffa64db2","3728":"c48812a4","3871":"0f4cd901","3881":"ce92ed29","3889":"528ad9aa","3922":"cf84ef93","3971":"2f9a5e90","3972":"cc1fb812","3989":"d849daad","3993":"668537a3","4005":"b6a2eebe","4055":"1154607e","4106":"fd6affaa","4199":"25c585a5","4229":"7b3e69c4","4233":"04466df7","4317":"e0f78b37","4420":"8b8e2dfd","4478":"7bac17fb","4532":"380b5e20","4539":"a264f72a","4579":"98f51528","4606":"92e48847","4624":"4cc3b6bf","4740":"9687b6c9","4756":"3fda1632","4760":"0aea0b58","4800":"4528fe04","4809":"b0026dd9","4821":"17313f03","4844":"4501eee3","4848":"b7e5220e","4873":"c9218577","4909":"3939f80c","4921":"5c00b769","4961":"11bc174c","4974":"bfc9dfc4","5124":"b875d03c","5157":"9d1bcc84","5190":"f6eb61ea","5206":"683ac7cc","5284":"bb415e80","5327":"a5139ec1","5333":"3cc0a2fa","5385":"9440fb7c","5423":"4072033a","5452":"2373b5ae","5502":"fb118ed2","5507":"dbe8c2da","5593":"17aa2f7d","5681":"d702f30f","5688":"1e427d22","5721":"7cda0898","5724":"04cac1c1","5741":"7c1b1b6a","5742":"3dd5f2c2","5754":"cfc5fa96","5767":"bb87f24b","5775":"884c0139","5780":"7a3b53c6","5819":"e1eee015","5842":"2a339c13","5886":"f4434779","5932":"a0929ffc","5971":"923ec985","6002":"6e7cd81e","6007":"c46047d4","6051":"b956948e","6062":"74a3b998","6073":"c07bb863","6115":"60892727","6155":"bdcb6e31","6215":"105ddb08","6231":"a5e2b653","6241":"3a6bbf96","6252":"ec5858c8","6325":"5dd418d2","6435":"828490ee","6491":"51cf378c","6497":"19f89d9a","6556":"d6af1dbe","6568":"8276afbd","6643":"90ead76e","6720":"a165d931","6761":"2e7e36cf","6801":"e268332a","6843":"b111171c","6851":"8718fc41","6853":"25251424","6862":"d2d274de","6903":"d133c332","6959":"7fe5ccf5","7063":"5430f8ed","7071":"de35e9a4","7097":"edf69415","7098":"b654ca8d","7102":"b0027ead","7205":"58ccea79","7206":"202a9bfb","7212":"2d431da9","7242":"8c31472d","7492":"8a63a4f1","7496":"26bd996b","7605":"d847b560","7696":"855b9d07","7778":"43463058","7788":"5049a583","7789":"c9e66631","7798":"6c993c26","7803":"1b131f26","7871":"05ca90cb","7873":"b82fa1cf","7916":"f3531ee5","7962":"d7b5fb37","7977":"081f9ed9","8075":"3ab1ea79","8196":"3960794a","8198":"14c31959","8203":"cc265592","8208":"308d6677","8232":"23bba3f2","8266":"18169939","8351":"3dba841d","8355":"6ab23b62","8359":"a754ea23","8368":"a2f64b91","8401":"e7d585a8","8539":"61cd18b3","8543":"d1a31b81","8569":"67cff64e","8611":"1674ee64","8645":"2e23f783","8696":"869b91b7","8720":"8b2ba602","8859":"cca23ecf","8872":"1a6169e5","8931":"91b58022","8962":"e2ade26e","9024":"ae3f4d58","9044":"25c92d2a","9048":"7ecf8f78","9078":"bfb7e748","9157":"d7d290d4","9173":"8b12e8de","9190":"384db2e9","9196":"a344c188","9326":"f16791ca","9332":"45c34865","9338":"12120c6a","9348":"5dbaefa8","9380":"eb309a8c","9429":"3f109713","9540":"1d3665a3","9548":"8f921ba9","9569":"739370fc","9647":"68d86dba","9654":"780c30cd","9655":"24161e29","9759":"2270787c","9767":"7c18217f","9824":"4d0c2b86","9840":"564ec453","9944":"3946c653","9957":"f4fc8c1f"}[chunkId] + ".js";
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/get mini-css chunk filename */
/******/ 	(() => {
/******/ 		// This function allow to reference async chunks
/******/ 		__webpack_require__.miniCssF = (chunkId) => {
/******/ 			// return url for filenames based on template
/******/ 			return undefined;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/load script */
/******/ 	(() => {
/******/ 		const inProgress = {};
/******/ 		const dataWebpackPrefix = "bed-mega-textbook:";
/******/ 		// loadScript function to load a script via script tag
/******/ 		__webpack_require__.l = (url, done, key, chunkId) => {
/******/ 			if(inProgress[url]) { inProgress[url].push(done); return; }
/******/ 			let script, needAttach;
/******/ 			if(key !== undefined) {
/******/ 				const scripts = document.getElementsByTagName("script");
/******/ 				for(var i = 0; i < scripts.length; i++) {
/******/ 					const s = scripts[i];
/******/ 					if(s.getAttribute("src") == url || s.getAttribute("data-webpack") == dataWebpackPrefix + key) { script = s; break; }
/******/ 				}
/******/ 			}
/******/ 			if(!script) {
/******/ 				needAttach = true;
/******/ 				script = document.createElement('script');
/******/ 		
/******/ 				script.charset = 'utf-8';
/******/ 				if (__webpack_require__.nc) {
/******/ 					script.setAttribute("nonce", __webpack_require__.nc);
/******/ 				}
/******/ 				script.setAttribute("data-webpack", dataWebpackPrefix + key);
/******/ 		
/******/ 				script.src = url;
/******/ 			}
/******/ 			inProgress[url] = [done];
/******/ 			const onScriptComplete = (prev, event) => {
/******/ 				// avoid mem leaks in IE.
/******/ 				script.onerror = script.onload = null;
/******/ 				clearTimeout(timeout);
/******/ 				const doneFns = inProgress[url];
/******/ 				delete inProgress[url];
/******/ 				script.parentNode?.removeChild(script);
/******/ 				doneFns?.forEach((fn) => (fn(event)));
/******/ 				if(prev) return prev(event);
/******/ 			}
/******/ 			const timeout = setTimeout(onScriptComplete.bind(null, undefined, { type: 'timeout', target: script }), 120000);
/******/ 			script.onerror = onScriptComplete.bind(null, script.onerror);
/******/ 			script.onload = onScriptComplete.bind(null, script.onload);
/******/ 			needAttach && document.head.appendChild(script);
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/set anonymous default export name */
/******/ 	(() => {
/******/ 		// set .name for anonymous default exports per ES spec
/******/ 		__webpack_require__.dn = (x) => {
/******/ 			(Object.getOwnPropertyDescriptor(x, "name") || {}).writable || Object.defineProperty(x, "name", { value: "default", configurable: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		__webpack_require__.p = "/";
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/ChunkAssetRuntimeModule */
/******/ 	(() => {
/******/ 		// Docusaurus function to get chunk asset
/******/ 		__webpack_require__.gca = function(chunkId) { chunkId = {"17896441":"8401","22874555":"4055","36617769":"9326","56177334":"5681","72285862":"517","e81e79e1":"12","3a290eec":"61","499ccd01":"62","6a278158":"151","234915de":"180","0b0a7a33":"202","66405cde":"206","6fd86372":"237","677669c5":"294","33b1fc53":"367","24db81fc":"391","136f6ffc":"610","7f46ead9":"797","05dae7c3":"865","4fd6e9ef":"940","02bc35ff":"996","1a302aab":"1050","de9b07f1":"1103","cf0c6bc3":"1133","a7456010":"1235","2c56ddf2":"1239","af9da345":"1300","cd4d8353":"1373","32607a88":"1538","9b3954ae":"1559","21064a51":"1561","22dd74f7":"1567","e5233fbd":"1589","7ca4477e":"1677","392851d4":"1723","51302c5f":"1736","f963f96f":"1786","fc66c132":"1789","57c09705":"1799","4d6f61cb":"1811","2a570aca":"1813","769e6660":"1920","b72a1b83":"1971","3039be6a":"1978","dc7cc464":"2021","916e0369":"2042","f0839fa4":"2044","c037291b":"2046","012a6385":"2065","7e3df462":"2116","1a4e3797":"2138","cfba2d21":"2158","fdd7ac59":"2240","2895fe63":"2293","b5ce8b89":"2335","8eacc73d":"2497","83876cc2":"2569","fdd31a68":"2574","1aa6bc9f":"2608","85fa4f02":"2641","6095aae2":"2696","313d9643":"2740","1df12100":"2776","666bb738":"2787","1fd92c48":"2874","fe16ab84":"2960","199656d4":"3013","065638d0":"3105","45fe9c73":"3123","bada6b39":"3173","2481c0ad":"3194","e430be86":"3204","3861f913":"3218","55b70e20":"3263","c222d9ad":"3266","f571a10c":"3281","06be1ca7":"3458","bcb3060d":"3497","05ec067f":"3519","bad46600":"3728","543dfe38":"3871","c8616455":"3881","afd433e9":"3922","601c52fe":"3971","b67851d0":"3972","459778aa":"3989","05f7e434":"3993","65e6533a":"4005","1ac6a0a8":"4106","c2e345ae":"4199","b0033f3a":"4229","83af1177":"4233","b54a028b":"4317","e39b8a3b":"4420","e9701416":"4478","8c1bab5c":"4532","0ee5487f":"4539","6d930ec6":"4579","52269da8":"4606","af65fcbf":"4624","807b2f62":"4740","9ffc73fc":"4756","89df1de4":"4760","499111ee":"4800","f536dda5":"4821","083264ae":"4844","35e33c63":"4848","43a1f6ed":"4873","c865d9f7":"4909","138e0e15":"4921","46058caa":"4961","bdd98ce4":"5124","34ae87f0":"5157","06975916":"5190","a2c3aa48":"5206","6ff06393":"5284","f3a2928a":"5327","f812273a":"5333","4367e6de":"5385","80fff2c9":"5423","fa892bd1":"5452","3c619d8c":"5502","e7e08fda":"5507","9a4c0380":"5593","d450bfdd":"5688","a2281811":"5721","76acfd82":"5724","aba21aa0":"5742","dd0e7b50":"5754","05b98b57":"5767","6b9f5183":"5775","acd37597":"5780","38f399df":"5819","77edc71e":"5842","59a92ae5":"5886","a7816949":"5932","74ceedf0":"5971","149a6f93":"6002","e26cd2e1":"6007","d9402ac3":"6051","b87f1ca3":"6062","9ee18cfc":"6073","3f054de9":"6115","472108f6":"6155","fe19a9b9":"6215","acacb594":"6231","72f89974":"6241","e0b5297a":"6252","4585bec8":"6325","d00a4746":"6435","e9ff80ae":"6491","1743c794":"6497","a0f9e884":"6556","c7f854c1":"6568","4913df53":"6643","e4c5201a":"6720","dd449c95":"6761","4baffb4e":"6801","ed19a161":"6843","870b43aa":"6851","6eda8c2a":"6853","926699a1":"6862","f8409a7e":"6903","a6beda10":"6959","70ccf65d":"7063","e9353c13":"7071","17b17581":"7097","a7bd4aaa":"7098","cd692737":"7102","f23af28f":"7205","76d52fad":"7206","4e0d7e82":"7212","3ffdcdc4":"7242","f8bdd986":"7492","4220c6f2":"7496","c7cf2a44":"7605","31cb1d6e":"7696","aa811768":"7778","b1261bc0":"7788","f00839a3":"7789","2ea237e6":"7798","d4302d90":"7803","aa2756e5":"7871","8f5429dd":"7873","c4aa59df":"7916","ed59a007":"7962","982d95d9":"7977","aa1f17b5":"8075","cdb567f2":"8196","ada67f88":"8198","b07c3c86":"8203","ae1bc148":"8208","6b9b11a7":"8232","f9b371b1":"8266","7effe7ca":"8351","601771aa":"8355","8539c7fa":"8359","38f69ba0":"8368","a48a417b":"8539","a691fc04":"8569","efec2d3f":"8611","2841fb67":"8645","fdfa6cfe":"8696","08fbf85f":"8720","e9e0284c":"8859","21cca144":"8872","5baf5111":"8931","5944e329":"8962","47c73d47":"9024","ee973b24":"9044","a94703ab":"9048","2ebe70b2":"9078","cd640d74":"9157","1832d1d3":"9173","70cbdd3f":"9190","ccfab65a":"9196","6813e635":"9332","dd1e2399":"9338","eafb48e6":"9348","a060c64e":"9380","1da7c19b":"9429","f907bf94":"9540","da9daa8c":"9548","19df84f4":"9569","5e95c892":"9647","d2c948cb":"9654","2470237c":"9655","8ba9df99":"9759","8990bb42":"9767","2c7b9d64":"9824","1d7bbcfd":"9840","8fad2f46":"9944","0b0cd8dc":"9957"}[chunkId]||chunkId; return __webpack_require__.p + __webpack_require__.u(chunkId); };
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		__webpack_require__.b = (typeof document !== 'undefined' && document.baseURI) || self.location.href;
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		const installedChunks = {
/******/ 			5354: 0,
/******/ 			1869: 0
/******/ 		};
/******/ 		
/******/ 		__webpack_require__.f.j = (chunkId, promises) => {
/******/ 				// JSONP chunk loading for javascript
/******/ 				let installedChunkData = __webpack_require__.o(installedChunks, chunkId) ? installedChunks[chunkId] : undefined;
/******/ 				if(installedChunkData !== 0) { // 0 means "already installed".
/******/ 		
/******/ 					// a Promise means "currently loading".
/******/ 					if(installedChunkData) {
/******/ 						promises.push(installedChunkData[2]);
/******/ 					} else {
/******/ 						if(!/^(1869|5354)$/.test(chunkId)) {
/******/ 							// setup Promise in chunk cache
/******/ 							const promise = new Promise((resolve, reject) => (installedChunkData = installedChunks[chunkId] = [resolve, reject]));
/******/ 							promises.push(installedChunkData[2] = promise);
/******/ 		
/******/ 							// start chunk loading
/******/ 							const url = __webpack_require__.p + __webpack_require__.u(chunkId);
/******/ 							// create error before stack unwound to get useful stacktrace later
/******/ 							const error = new Error();
/******/ 							const loadingEnded = (event) => {
/******/ 								if(__webpack_require__.o(installedChunks, chunkId)) {
/******/ 									installedChunkData = installedChunks[chunkId];
/******/ 									if(installedChunkData !== 0) installedChunks[chunkId] = undefined;
/******/ 									if(installedChunkData) {
/******/ 										const errorType = event && (event.type === 'load' ? 'missing' : event.type);
/******/ 										const realSrc = event && event.target && event.target.src;
/******/ 										error.message = 'Loading chunk ' + chunkId + ' failed.\n(' + errorType + ': ' + realSrc + ')';
/******/ 										error.name = 'ChunkLoadError';
/******/ 										error.type = errorType;
/******/ 										error.request = realSrc;
/******/ 										installedChunkData[1](error);
/******/ 									}
/******/ 								}
/******/ 							};
/******/ 							__webpack_require__.l(url, loadingEnded, "chunk-" + chunkId, chunkId);
/******/ 						} else installedChunks[chunkId] = 0;
/******/ 					}
/******/ 				}
/******/ 		};
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		const webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			let [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		const chunkLoadingGlobal = self["webpackChunkbed_mega_textbook"] = self["webpackChunkbed_mega_textbook"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// module factories are used so entry inlining is disabled
/******/ 	
/******/ })()
;