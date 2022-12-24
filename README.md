[![Maintainability](https://api.codeclimate.com/v1/badges/3cca3cd1da940cadbb74/maintainability)](https://codeclimate.com/github/Bonamente/frontend-project-lvl2/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/3cca3cd1da940cadbb74/test_coverage)](https://codeclimate.com/github/Bonamente/frontend-project-lvl2/test_coverage)


# Difference calculator 

A command line interface utility that determines the difference between two data structures.

## Technologies
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E.svg?style=for-the-badge&logo=JavaScript&logoColor=black)
![Jest](https://img.shields.io/badge/Jest-C21325.svg?style=for-the-badge&logo=Jest&logoColor=white)
![Asciinema](https://img.shields.io/badge/asciinema-D40000.svg?style=for-the-badge&logo=asciinema&logoColor=white)

## Utility features:

* **Support** for various input data formats: **yaml**, **ini**, **json**
* Generating a **report** in **plain text**, **stylish** and **json format**

### Installation

Difference calculator requires [Node.js](https://nodejs.org/) v14+ to run.

```sh
$ make install
```

### Usage

```
Usage: gendiff [options] <filePath1> <filePath2>

Compares two configuration files and shows the difference.

Options:
  -V, --version                              output the version number
  -f, --format [type: stylish, plain, json]  output format (default: "stylish")
  -h, --help                                 display help for command

 ```
 
## Examples:

### Comparison of flat files (JSON)
[![asciicast](https://asciinema.org/a/359161.svg)](https://asciinema.org/a/359161)
### Comparison of flat files (YAML)
[![asciicast](https://asciinema.org/a/359595.svg)](https://asciinema.org/a/359595)
### Comparison of flat files (ini)
[![asciicast](https://asciinema.org/a/359759.svg)](https://asciinema.org/a/359759)
### Comparison of files with nested structures
[![asciicast](https://asciinema.org/a/360621.svg)](https://asciinema.org/a/360621)
### Plain format output
[![asciicast](https://asciinema.org/a/360840.svg)](https://asciinema.org/a/360840)
### JSON format output
[![asciicast](https://asciinema.org/a/361498.svg)](https://asciinema.org/a/361498)
