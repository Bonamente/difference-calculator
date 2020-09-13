import _ from 'lodash';
import fs from 'fs';
import path from 'path';

const readFile = (filePath) => {
  const fullPath = path.resolve(process.cwd(), filePath);
  const data = fs.readFileSync(fullPath, 'utf-8');
  return data;
};

const genDiff = (filePath1, filePath2) => {
  const data1 = readFile(filePath1);
  const data2 = readFile(filePath2);

  const obj1 = JSON.parse(data1);
  const obj2 = JSON.parse(data2);

  const keys = _.union(Object.keys(obj1), Object.keys(obj2)).sort();

  const str = keys
    .map((key) => {
      if (_.has(obj1, key) && !_.has(obj2, key)) return `  - ${key}: ${obj1[key]}\n`;
      if (!_.has(obj1, key) && _.has(obj2, key)) return `  + ${key}: ${obj2[key]}\n`;
      if (obj1[key] === obj2[key]) return `    ${key}: ${obj1[key]}\n`;
      return `  - ${key}: ${obj1[key]}\n  + ${key}: ${obj2[key]}\n`;
    })
    .join('');

  return `\n{\n${str}}\n`;
};

export default genDiff;
