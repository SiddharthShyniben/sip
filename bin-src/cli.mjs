import minimist from 'minimist';
import {printHelp} from './help.mjs';
import fs from 'fs';

// Imports break this so I gotta ignore
/* eslint-disable-next-line unicorn/prefer-module */
const {sip} = require('../dist/index.js');

const argv = minimist(process.argv.slice(2));

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
	argv._.forEach(file => {
		const fileContents = fs.readFileSync(file);
		const compressed = sip(fileContents);

		fs.writeFileSync(file + '.sip', compressed)
	})
} else {
	printHelp();
}
