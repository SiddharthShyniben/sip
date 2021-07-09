import fs from 'node:fs';
import minimist from 'minimist';
import {printHelp} from './help.mjs';

// Imports break this so I gotta ignore
/* eslint-disable-next-line unicorn/prefer-module */
const {sip} = require('../dist/index.js');

const argv = minimist(process.argv.slice(2));

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
		const fileContents = fs.readFileSync(file);
		const compressed = sip(fileContents);

		fs.writeFileSync(file + '.sip', compressed);
	}
} else {
	printHelp();
}

/* eslint-enable unicorn/no-process-exit */
