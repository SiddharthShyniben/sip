import {compress, decompress} from './compress';

export function sip(data) {
	return compress(data);
}

export function unsip() {
	return decompress(data);
}

export function sipPath() {
	
}

export function unsipPath() {
	
}
