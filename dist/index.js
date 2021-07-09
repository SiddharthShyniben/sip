(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.sip = {}));
}(this, (function (exports) { 'use strict';

	function compress(string) {
		const dict = {};
		const data = (String(string)).split('');
		const out = [];
		let currChar;
		let phrase = data[0];
		let code = 256;

		for (let i = 1; i < data.length; i++) {
			currChar = data[i];
			/* eslint-disable-next-line no-eq-null, eqeqeq */
			if (dict[phrase + currChar] == null) {
				out.push(phrase.length > 1 ? dict[phrase] : phrase.charCodeAt(0));
				dict[phrase + currChar] = code;
				code++;
				phrase = currChar;
			} else {
				phrase += currChar;
			}
		}

		out.push(phrase.length > 1 ? dict[phrase] : phrase.charCodeAt(0));

		for (let i = 0; i < out.length; i++) {
			out[i] = String.fromCharCode(out[i]);
		}

		return out.join('');
	}

	function decompress(string) {
		const dict = {};
		const data = (String(string)).split('');
		let currChar = data[0];
		let oldPhrase = currChar;
		const out = [currChar];
		let code = 256;
		let phrase;

		for (let i = 1; i < data.length; i++) {
			const currCode = data[i].charCodeAt(0);
			if (currCode < 256) {
				phrase = data[i];
			} else {
				phrase = dict[currCode] ? dict[currCode] : (oldPhrase + currChar);
			}

			out.push(phrase);
			currChar = phrase.charAt(0);
			dict[code] = oldPhrase + currChar;
			code++;
			oldPhrase = phrase;
		}

		return out.join('');
	}

	function sip(data) {
		return compress(data);
	}

	function unsip(data) {
		return decompress(data);
	}

	exports.sip = sip;
	exports.unsip = unsip;

	Object.defineProperty(exports, '__esModule', { value: true });

})));
