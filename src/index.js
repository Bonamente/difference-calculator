import _ from 'lodash';
import fs from 'fs';
import path from 'path';
import parse from './parsers.js';
import getDiffFormat from './formatters/index.js';

const readFile = (filePath) => {
  const fullPath = path.resolve(process.cwd(), filePath);
  const data = fs.readFileSync(fullPath, 'utf-8');
  return data;
};

const getDataType = (filePath) => path.extname(filePath).slice(1);

const getDiff = (data1, data2) => {
  const keys = _.union(_.keys(data1), _.keys(data2)).sort();

  const diff = keys.map((key) => {
    if (!_.has(data1, key)) return { type: 'added', key, value: data2[key] };
    if (!_.has(data2, key)) return { type: 'deleted', key, value: data1[key] };
    if (data1[key] === data2[key]) return { type: 'unchanged', key, value: data1[key] };
    if (_.isPlainObject(data1[key]) && _.isPlainObject(data2[key])) {
      return { type: 'nested', key, children: getDiff(data1[key], data2[key]) };
    }
    return { type: 'changed', key, oldValue: data1[key], newValue: data2[key] };
  });

  return diff;
};

const getFormattedDiff = (filePath1, filePath2, format) => {
  const dataType1 = getDataType(filePath1);
  const dataType2 = getDataType(filePath2);

  const data1 = parse(readFile(filePath1), dataType1);
  const data2 = parse(readFile(filePath2), dataType2);

  const diff = getDiff(data1, data2);

  return getDiffFormat(diff, format);
};

export default getFormattedDiff;
