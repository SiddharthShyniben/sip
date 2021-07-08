(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.sip = {}));
}(this, (function (exports) { 'use strict';

	function compress(str) {
		let dict = {},
			data = (str + "").split(""),
			out = [],
			currChar,
			phrase = data[0],
			code = 256;

		for (let i = 1; i < data.length; i++) {
			currChar = data[i];
			if (dict[phrase + currChar] != null) phrase += currChar;
			else {
				out.push(phrase.length > 1 ? dict[phrase] : phrase.charCodeAt(0));
				dict[phrase + currChar] = code;
				code++;
				phrase = currChar;
			}
		}

		out.push(phrase.length > 1 ? dict[phrase] : phrase.charCodeAt(0));

		for (let i = 0; i < out.length; i++) out[i] = String.fromCharCode(out[i]);

		return out.join("");
	}

	function decompress(str) {
		let dict = {},
			data = (str + "").split(""),
			currChar = data[0],
			oldPhrase = currChar,
			out = [currChar],
			code = 256,
			phrase;

		for (let i = 1; i < data.length; i++) {
			let currCode = data[i].charCodeAt(0);
			if (currCode < 256) phrase = data[i];
			else phrase = dict[currCode] ? dict[currCode] : (oldPhrase + currChar);
			out.push(phrase);
			currChar = phrase.charAt(0);
			dict[code] = oldPhrase + currChar;
			code++;
			oldPhrase = phrase;
		}
		return out.join("");
	}

	function sip(data) {
		return compress(data);
	}

	function unsip() {
		return decompress(data);
	}

	function sipPath() {
		
	}

	function unsipPath() {
		
	}

	exports.sip = sip;
	exports.sipPath = sipPath;
	exports.unsip = unsip;
	exports.unsipPath = unsipPath;

	Object.defineProperty(exports, '__esModule', { value: true });

})));
