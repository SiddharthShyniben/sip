export function compress(data) {
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

export function decompress(compressed) {
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
