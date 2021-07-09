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
usage: sip [-cdhioqVv] [-s .suffix] [<file> [<file> ...]

-c --stdout        write output to stdout and keep files
   --to-stdout
-d --decompress    uncompress files
   --uncompress    
-h --help          show this help
-o --output        specify path to output to
-q --quiet         be quiet
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

// Imports break this so I gotta ignore
/* eslint-disable-next-line unicorn/prefer-module */
const {sip} = require('../dist/index.js');

const argv = minimist__default['default'](process.argv.slice(2));

/* eslint-disable unicorn/no-process-exit */

if (argv.i || argv.input) {
	console.log(sip(argv.i || argv.input));
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
	}
} else {
	printHelp();
}

/* eslint-enable unicorn/no-process-exit */
