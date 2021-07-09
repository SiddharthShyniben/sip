#!/usr/bin/env node
'use strict';

var fs = require('node:fs');
var minimist = require('minimist');
var trash = require('trash');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var fs__default = /*#__PURE__*/_interopDefaultLegacy(fs);
var minimist__default = /*#__PURE__*/_interopDefaultLegacy(minimist);
var trash__default = /*#__PURE__*/_interopDefaultLegacy(trash);

function printHelp() {
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

-i text            compress text and write it to the stdout 
   --input text
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

	return Number.parseFloat(((bytes / k) ** i).toFixed(dm)) + ' ' + sizes[i];
}

function getByteCount(string) {
	return Buffer.byteLength(string, 'utf8');
}

// Imports break this so I gotta ignore
/* eslint-disable-next-line unicorn/prefer-module */
const {sip, unsip} = require('../dist/index.js');

const argv = minimist__default['default'](process.argv.slice(2), {
	boolean: [
		'd',
		'decompress',
		'uncompress',
		'k',
		'keep',
		'v',
		'verbose',
		'V',
		'version',
		'c',
		'stdout',
		'to-stdout'
	],
	string: [
		'i',
		'input',
		's',
		'suffix'
	],
	alias: {
		d: 'decompress',
		uncompress: 'decompress',
		k: 'keep',
		v: 'verbose',
		V: 'version',
		c: 'stdout',
		'to-stdout': 'stdout',
		i: 'input',
		s: 'suffix'
	}
});

/* eslint-disable unicorn/no-process-exit */

if (argv.input) {
	const compressed = sip(argv.input);

	if (argv.verbose) {
		console.log(
			'\u001B[36mINFO\u001B[0m Input ' +
			formatBytes(getByteCount(argv.input)) +
			', ' +
			argv.input.length +
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
} else if (argv.version) {
	console.log('1.0.0');
	process.exit(0);
} else if (argv.help) {
	printHelp();
	process.exit(0);
}

if (argv._.length > 0) {
	if (argv.decompress) {
		for (const file of argv._) {
			const fileContents = fs__default['default'].readFileSync(file);
			const compressed = unsip(fileContents);

			const filename = file.replace(/\.sip$/gim, '');

			if (argv.stdout) {
				console.log(compressed);
			} else {
				fs__default['default'].writeFileSync(filename, compressed);
			}

			if (argv.verbose) {
				console.log('\u001B[36mINFO\u001B[0m Wrote ' + file + 'to' + filename);
			}
		}
	} else {
		for (const file of argv._) {
			const fileContents = fs__default['default'].readFileSync(file);
			const compressed = sip(fileContents);

			if (argv.stdout) {
				console.log(compressed);
			} else {
				fs__default['default'].writeFileSync(file + '.sip', compressed);

				if (!argv.keep) {
					trash__default['default'](file);
				}

				if (argv.verbose) {
					console.log('\u001B[36mINFO\u001B[0m ' +
						argv.keep ? 'Trashing' : 'Not trashing' +
						' original file');
				}
			}

			if (argv.verbose) {
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
	}
} else {
	printHelp();
}

/* eslint-enable unicorn/no-process-exit */
