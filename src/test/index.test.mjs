import test from 'ava';
import {sip, unsip} from '../index.mjs';

function getRandomString(length) {
	let result = '';
	const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	const charactersLength = characters.length;
	for (let i = 0; i < length; i++) {
		result += characters.charAt(Math.floor(Math.random() *
			charactersLength));
	}

	return result;
}

test('compression works', t => {
	const randomString = getRandomString(64);
	const compressed = sip(randomString);
	const uncompressed = unsip(compressed);

	t.is(randomString, uncompressed);
});

test('compression does not increase size', t => {
	const randomString = getRandomString(64);
	const compressed = sip(randomString);

	t.true(compressed.length <= randomString.length);
});
