import _ from 'lodash';
import ini from 'ini';
import yaml from 'js-yaml';

const parseIniFile = (data) => {
  const intermediateData = ini.parse(data);

  const iter = (dataForProcessing) => {
    const pairs = _.toPairs(dataForProcessing);
    return pairs.reduce((acc, [key, value]) => {
      if (_.isPlainObject(value)) return { ...acc, [key]: iter(value) };
      if (_.isBoolean(value)) return { ...acc, [key]: value };
      if (_.isFinite(_.toNumber(value))) return { ...acc, [key]: _.toNumber(value) };
      return { ...acc, [key]: value };
    }, {});
  };

  return iter(intermediateData);
};

const parse = (data, dataType) => {
  switch (dataType) {
    case 'json':
      return JSON.parse(data);
    case 'yml':
      return yaml.safeLoad(data);
    case 'ini':
      return parseIniFile(data);
    default:
      throw new Error(`Unsupported data type: ${dataType}`);
  }
};

export default parse;
