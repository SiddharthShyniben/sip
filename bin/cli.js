#!/usr/bin/env node
'use strict';

var fs = require('node:fs');
var minimist = require('minimist');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var fs__default = /*#__PURE__*/_interopDefaultLegacy(fs);
var minimist__default = /*#__PURE__*/_interopDefaultLegacy(minimist);

function printHelp(endMessage = '') {
	console.log(
		`
szip 1.0
usage: sip [-cdhioVv] [-s .suffix] [-i text] [<file> [<file> ...]

-c --stdout        write output to stdout and keep files
   --to-stdout
-d --decompress    uncompress files
   --uncompress    
-h --help          show this help
-k --keep          keep the uncompressed file
-V --version       show version information
-v --verbose       print extra statistics

-s .suf            use the .suf suffix instead of .sip
   --suffix .suf
-i text            compress text and write it to the stdout 
   --input text

${endMessage}
`
	);
}

function formatBytes(bytes, decimals = 2) {
	if (bytes === 0) {
		return '0 Bytes';
	}

	const k = 1024;
	const dm = decimals < 0 ? 0 : decimals;
	const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

	const i = Math.floor(Math.log(bytes) / Math.log(k));

	return Number.parseFloat((bytes / k ** i).toFixed(dm)) + ' ' + sizes[i];
}

function getByteCount(string) {
	return Buffer.byteLength(string, 'utf8');
}

// Imports break this so I gotta ignore
/* eslint-disable-next-line unicorn/prefer-module */
const {sip} = require('../dist/index.js');

const argv = minimist__default['default'](process.argv.slice(2));

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
		const fileContents = fs__default['default'].readFileSync(file);
		const compressed = sip(fileContents);

		fs__default['default'].writeFileSync(file + '.sip', compressed);

		if (!argv.keep) {
			fs__default['default'].unlinkSync(file);
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
