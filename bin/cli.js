#!/usr/bin/env node
'use strict';

var minimist = require('minimist');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var minimist__default = /*#__PURE__*/_interopDefaultLegacy(minimist);

function printHelp(endMessage = '') {
	console.log(
`
szip 1.0
usage: sip [-cdhioqVv] [-s .suffix] [<file> [<file> ...]

-c --stdout        write output stdout and keep files
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

// Imports break this
const {sip} = require('../dist/index.js');

const argv = minimist__default['default'](process.argv.slice(2));

if (argv.i || argv.input) {
	console.log(sip(argv.i || argv.input));
} else {
	printHelp();
}
