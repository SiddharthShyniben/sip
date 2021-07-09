# `sip`

`sip` is a command line utility that helps you compress files. It is designed
with text and similar files in mind, so be careful when compressing images with
this!

`sip` uses the [LZW compression algorithm][lzw] compression algorithm.

## Installing

`sip` requires [`node.js`][node] to be installed. You can install `sip` 
by running:

```console
$ npm install @siddharthshyniben/sip -g
```

## Using `sip`

```sh
# sip a file
sip somefile.txt

# unsip a file
sip -d somefile.txt.sip

# sip a file, but keep the original
sip -k somefile.txt

# sip text
sip -i "TOBEORNOTTOBEORTOBEORNOTTOBE"

# sip a file but write it to stdout, and keep the file
sip somefile.txt -c

# sip many
sip somefile.txt someotherfile.md somethingelse.css

# view help
sip
```

## Contributing

Contributions are absolutely welcome! To contribute:

1. Fork and clone this repository
2. Create a new branch
3. Make your changes then commit them
4. Push to your branch
5. Open a Pull Request

Alternatively, check out GitHub documentation on [creating a Pull Request][pr]

## Contributors

Thanks to the following people who contributed to `sip`:

- [@siddharthshyniben](https://github.com/siddharthshyniben)

## Contact

You can reach me at <siddharth.muscat@gmail.com>

## License

[GPL-3.0](./LICENSE)

[lzw]: https://en.wikipedia.org/wiki/Lempel%E2%80%93Ziv%E2%80%93Welch
[node]: https://nodejs.org
[pr]: https://help.github.com/en/github/collaborating-with-issues-and-pull-requests/creating-a-pull-request
