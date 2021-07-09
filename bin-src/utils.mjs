export function formatBytes(bytes, decimals = 2) {
	if (bytes === 0) {
		return '0 Bytes';
	}

	const k = 1024;
	const dm = decimals < 0 ? 0 : decimals;
	const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

	const i = Math.floor(Math.log(bytes) / Math.log(k));

	return Number.parseFloat(((bytes / k) ** i).toFixed(dm)) + ' ' + sizes[i];
}

export function getByteCount(string) {
	return Buffer.byteLength(string, 'utf8');
}

export function logInfo(...args) {
	console.log('\u001B[36mINFO\u001B[0m ' + args.join(' '))
}
