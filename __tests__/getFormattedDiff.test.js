import { test, expect } from '@jest/globals';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import fs from 'fs';
import getFormattedDiff from '../src/index.js';

/* eslint-disable no-underscore-dangle */
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

let stylish;
let plain;
let json;

beforeAll(() => {
  stylish = readFile('stylishOutput.txt');
  plain = readFile('plainOutput.txt');
  json = readFile('jsonOutput.txt');
});

test.each(['json', 'yml', 'ini'])('getFormattedDiff of %s', (type) => {
  const filePath1 = getFixturePath(`file1.${type}`);
  const filePath2 = getFixturePath(`file2.${type}`);

  expect(getFormattedDiff(filePath1, filePath2, 'stylish')).toBe(stylish);
  expect(getFormattedDiff(filePath1, filePath2, 'plain')).toBe(plain);
  expect(getFormattedDiff(filePath1, filePath2, 'json')).toBe(json);
});

test('getFormattedDiff of unsupported file type', () => {
  const filePath1 = getFixturePath('file1.json');
  const filePath2 = getFixturePath('unsupportedFileType.css');

  expect(() => getFormattedDiff(filePath1, filePath2, 'plain')).toThrow();
});
