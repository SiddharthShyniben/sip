const config = [
	{
		input: 'src/index.mjs',
		output: {
			dir: 'dist',
			format: 'umd',
			name: 'sip'
		}
	},
	{
		input: 'bin-src/cli.mjs',
		output: {
			banner: '#!/usr/bin/env node',
			dir: 'bin',
			format: 'cjs'
		}
	}
];

export default config;
