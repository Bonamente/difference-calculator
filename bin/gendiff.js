#!/usr/bin/env node

import program from 'commander';

program
  .description('Compares two configuration files and shows the difference.')
  .version('1.1.0')
  .arguments('<filepath1> <filepath2>')
  .option('-f, --format [type]', 'output format');

program.parse(process.argv);
