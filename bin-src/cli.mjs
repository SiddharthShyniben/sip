import minimist from 'minimist';
import {printHelp} from './help.mjs';

// Imports break this so I gotta ignore
/* eslint-disable-next-line unicorn/prefer-module */
const {sip} = require('../dist/index.js');

const argv = minimist(process.argv.slice(2));

if (argv.i || argv.input) {
	console.log(sip(argv.i || argv.input));
} else if (argv.V || argv.version) {
	console.log('1.0.0');
} else if (argv.help || argv.h) {
	printHelp();
}
