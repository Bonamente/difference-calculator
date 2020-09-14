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

let result;

beforeAll(() => {
  result = readFile('result.txt');
});

test('genDiff JSON', () => {
  const filePath1 = getFixturePath('file1.json');
  const filePath2 = getFixturePath('file2.json');

  expect(genDiff(filePath1, filePath2)).toBe(result);
});

test('genDiff YAML', () => {
  const filePath1 = getFixturePath('file1.yml');
  const filePath2 = getFixturePath('file2.yml');

  expect(genDiff(filePath1, filePath2)).toBe(result);
});
