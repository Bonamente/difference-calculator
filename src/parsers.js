import path from 'path';
import yaml from 'js-yaml';

const parse = (filePath, data) => {
  const format = path.extname(filePath);

  switch (format) {
    case '.json':
      return JSON.parse(data);
    case '.yml':
      return yaml.safeLoad(data);
    default:
      throw new Error('This file type is not supported!');
  }
};

export default parse;
