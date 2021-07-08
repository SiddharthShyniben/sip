import {compress, decompress} from './compresst.js';

export function sip(data) {
	return compress(data);
}

export function unsip(data) {
	return decompress(data);
}

export function sipPath() {}

export function unsipPath() {}
