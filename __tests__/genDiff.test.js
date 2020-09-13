import { test, expect } from '@jest/globals';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import fs from 'fs';
import genDiff from '../index.js';

/* eslint-disable no-underscore-dangle */
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

let filePath1;
let filePath2;
let result;

beforeAll(() => {
  filePath1 = getFixturePath('file1.json');
  filePath2 = getFixturePath('file2.json');
  result = readFile('result.txt');
});

test('genDiff', () => {
  expect(genDiff(filePath1, filePath2).trim()).toBe(result);
});
