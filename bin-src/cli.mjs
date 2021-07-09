import fs from 'node:fs';
import minimist from 'minimist';
import trash from 'trash';
import {printHelp} from './help.mjs';
import {formatBytes, getByteCount, logInfo} from './utils.mjs';

// Imports break this so I gotta ignore
/* eslint-disable-next-line unicorn/prefer-module */
const {sip, unsip} = require('../dist/index.js');

const argv = minimist(process.argv.slice(2), {
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
		logInfo(
			'Input',
			formatBytes(getByteCount(argv.input)), 
			',',
			argv.input.length,
			'characters.'
		);

		logInfo(
			'Compressed', 
			formatBytes(getByteCount(compressed)), 
			',', 
			compressed.length, 
			'characters.'
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
			const fileContents = fs.readFileSync(file);
			const compressed = unsip(fileContents);

			const filename = file.replace(/\.sip$/gim, '');

			if (argv.stdout) {
				console.log(compressed);
			} else {
				fs.writeFileSync(filename, compressed);
			}

			if (argv.verbose) {
				logInfo('Wrote', file, 'to', filename);
			}
		}
	} else {
		for (const file of argv._) {
			const fileContents = fs.readFileSync(file);
			const compressed = sip(fileContents);

			if (argv.stdout) {
				console.log(compressed);
			} else {
				fs.writeFileSync(file + '.sip', compressed);

				if (!argv.keep) {
					trash(file);
				}

				if (argv.verbose) {
					logInfo(argv.keep ? 'Trashing' : 'Not trashing', 'original file');
				}
			}

			if (argv.verbose) {
				logInfo(
					'File contents',
					formatBytes(getByteCount(fileContents)),
					',',
					fileContents.length,
					'characters.'
				);

				logInfo(
					'Compressed',
					formatBytes(getByteCount(compressed)),
					',',
					compressed.length,
					'characters.'
				);
			}
		}
	}
} else {
	printHelp();
}

/* eslint-enable unicorn/no-process-exit */
