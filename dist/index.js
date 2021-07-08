(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.sip = {}));
}(this, (function (exports) { 'use strict';

	function sip() {
	  return 'zipped content';
	}
	function unsip() {
	  return 'unzipped content';
	}

	exports.sip = sip;
	exports.unsip = unsip;

	Object.defineProperty(exports, '__esModule', { value: true });

})));
