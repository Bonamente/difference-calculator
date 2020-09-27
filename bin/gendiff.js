#!/usr/bin/env node

import program from 'commander';
import getFormattedDiff from '../src/index.js';

program
  .description('Compares two configuration files and shows the difference.')
  .version('1.7.1')
  .option('-f, --format [type: stylish, plain, json]', 'output format', 'stylish')
  .arguments('<filePath1> <filePath2>')
  .action((filePath1, filePath2) => console.log(`\n${getFormattedDiff(filePath1, filePath2, program.format)}\n`));

program.parse(process.argv);
