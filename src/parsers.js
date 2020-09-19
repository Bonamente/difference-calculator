import ini from 'ini';
import yaml from 'js-yaml';

const parse = (data, fileType) => {
  switch (fileType) {
    case 'json':
      return JSON.parse(data);
    case 'yml':
      return yaml.safeLoad(data);
    case 'ini':
      return ini.parse(data);
    default:
      throw new Error(`Unsupported file type: ${fileType}`);
  }
};

export default parse;
