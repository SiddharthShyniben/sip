export function printHelp(endMessage = '') {
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
