import { test, expect } from '@jest/globals';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import fs from 'fs';
import renderDiff from '../index.js';

/* eslint-disable no-underscore-dangle */
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

let stylish;
let plain;
let json;

let jsonFilePath1;
let jsonFilePath2;
let ymlFilePath1;
let ymlFilePath2;
let iniFilePath1;
let iniFilePath2;
let unsupportedFilePath;

beforeAll(() => {
  stylish = readFile('stylish.txt');
  plain = readFile('plain.txt');
  json = readFile('json.txt');

  jsonFilePath1 = getFixturePath('file1.json');
  jsonFilePath2 = getFixturePath('file2.json');
  ymlFilePath1 = getFixturePath('file1.yml');
  ymlFilePath2 = getFixturePath('file2.yml');
  iniFilePath1 = getFixturePath('file1.ini');
  iniFilePath2 = getFixturePath('file2.ini');
  unsupportedFilePath = getFixturePath('unsupportedFileType.css');
});

describe('stylish', () => {
  test('renderDiff JSON', () => {
    expect(renderDiff(jsonFilePath1, jsonFilePath2, 'stylish')).toBe(stylish);
  });

  test('renderDiff YAML', () => {
    expect(renderDiff(ymlFilePath1, ymlFilePath2, 'stylish')).toBe(stylish);
  });

  test('renderDiff ini', () => {
    expect(renderDiff(iniFilePath1, iniFilePath2, 'stylish')).toBe(stylish);
  });
});

describe('plain', () => {
  test('renderDiff JSON', () => {
    expect(renderDiff(jsonFilePath1, jsonFilePath2, 'plain')).toBe(plain);
  });

  test('renderDiff YAML', () => {
    expect(renderDiff(ymlFilePath1, ymlFilePath2, 'plain')).toBe(plain);
  });

  test('renderDiff ini', () => {
    expect(renderDiff(iniFilePath1, iniFilePath2, 'plain')).toBe(plain);
  });
});

describe('json', () => {
  test('renderDiff JSON', () => {
    expect(renderDiff(jsonFilePath1, jsonFilePath2, 'json')).toBe(json);
  });

  test('renderDiff YAML', () => {
    expect(renderDiff(ymlFilePath1, ymlFilePath2, 'json')).toBe(json);
  });

  test('renderDiff ini', () => {
    expect(renderDiff(iniFilePath1, iniFilePath2, 'json')).toBe(json);
  });
});

test('renderDiff unsupported file type', () => {
  expect(() => renderDiff(jsonFilePath1, unsupportedFilePath, 'plain')).toThrow();
});
