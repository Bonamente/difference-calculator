#!/usr/bin/env node

import program from 'commander';
import genDiff from '../index.js';

program
  .description('Compares two configuration files and shows the difference.')
  .version('1.4.0')
  .option('-f, --format [type]', 'output format')
  .arguments('<filePath1> <filePath2>')
  .action((filePath1, filePath2) => console.log(genDiff(filePath1, filePath2)));

program.parse(process.argv);
