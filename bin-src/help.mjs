export function printHelp(endMessage = '') {
	console.log(
		`
szip 1.0
usage: sip [-cdhioVv] [-s .suffix] [<file> [<file> ...]

-c --stdout        write output to stdout and keep files
   --to-stdout
-d --decompress    uncompress files
   --uncompress    
-h --help          show this help
-k --keep          keep the uncompressed file
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
