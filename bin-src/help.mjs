export function printHelp() {
	console.log(
		`
szip 1.0
usage: sip [-cdhioVv] [-i text] [<file> [<file> ...]

-c --stdout        write output to stdout and keep files
   --to-stdout
-d --decompress    uncompress files
   --uncompress    
-h --help          show this help
-k --keep          keep the uncompressed file
-V --version       show version information
-v --verbose       print extra statistics

-i text            compress text and write it to the stdout 
   --input text
`
	);
}
