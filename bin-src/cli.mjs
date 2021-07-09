import fs from 'node:fs';
import minimist from 'minimist';
import {printHelp} from './help.mjs';
import {formatBytes, getByteCount} from './utils.mjs';

// Imports break this so I gotta ignore
/* eslint-disable-next-line unicorn/prefer-module */
const {sip} = require('../dist/index.js');

const argv = minimist(process.argv.slice(2));

/* eslint-disable unicorn/no-process-exit */

const verbose = argv.v || argv.verbose;

if (argv.i || argv.input) {
	const input = argv.i || argv.input;
	const compressed = sip(input);

	if (verbose) {
		console.log(
			'\u001B[36mINFO\u001B[0m Input ' +
			formatBytes(getByteCount(input)) +
			', ' +
			input.length +
			' characters.'
		);

		console.log(
			'\u001B[36mINFO\u001B[0m Compressed ' +
			formatBytes(getByteCount(compressed)) +
			', ' +
			compressed.length +
			' characters.\n'
		);
	}

	console.log(compressed);

	process.exit(0);
} else if (argv.V || argv.version) {
	console.log('1.0.0');
	process.exit(0);
} else if (argv.help || argv.h) {
	printHelp();
	process.exit(0);
}

if (argv._.length > 0) {
	for (const file of argv._) {
		const fileContents = fs.readFileSync(file);
		const compressed = sip(fileContents);

		fs.writeFileSync(file + '.sip', compressed);

		if (!argv.keep) {
			fs.unlinkSync(file);
			if (verbose) {
				console.log('\u001B[36mINFO\u001B[0m Deleting original file');
			}
		} else if (verbose) {
			console.log('\u001B[36mINFO\u001B[0m Not deleting original file');
		}

		if (verbose) {
			console.log(
				'\u001B[36mINFO\u001B[0m File contents ' +
				formatBytes(getByteCount(fileContents)) +
				', ' +
				fileContents.length +
				' characters.'
			);

			console.log(
				'\u001B[36mINFO\u001B[0m Compressed ' +
				formatBytes(getByteCount(compressed)) +
				', ' +
				compressed.length +
				' characters.\n'
			);
		}
	}
} else {
	printHelp();
}

/* eslint-enable unicorn/no-process-exit */
