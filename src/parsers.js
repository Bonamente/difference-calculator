import path from 'path';
import ini from 'ini';
import yaml from 'js-yaml';

const parse = (filePath, data) => {
  const format = path.extname(filePath);

  switch (format) {
    case '.json':
      return JSON.parse(data);
    case '.yml':
      return yaml.safeLoad(data);
    case '.ini':
      return ini.parse(data);
    default:
      throw new Error('Unsupported file type');
  }
};

export default parse;
