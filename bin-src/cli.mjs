import minimist from 'minimist';
import {printHelp} from './help.mjs';

// Imports break this
const {sip} = require('../dist/index.js');

const argv = minimist(process.argv.slice(2));

if (argv.i || argv.input) {
	console.log(sip(argv.i || argv.input));
} else {
	printHelp();
}
