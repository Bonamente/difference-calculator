#!/usr/bin/env node

import program from 'commander';
import genDiff from '../index.js';

program
  .description('Compares two configuration files and shows the difference.')
  .version('1.5.0')
  .option('-f, --format [type]', 'output format [stylish]', 'stylish')
  .arguments('<filePath1> <filePath2>')
  .action((filePath1, filePath2) => console.log(genDiff(filePath1, filePath2, program.format)));

program.parse(process.argv);
