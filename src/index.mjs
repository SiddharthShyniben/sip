import {compress, decompress} from './compress.mjs';

export function sip(data) {
	return compress(data);
}

export function unsip(data) {
	return decompress(data);
}
