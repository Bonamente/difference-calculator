import _ from 'lodash';

const convertOutputValue = (value) => (_.isString(value) ? `'${value}'` : value);
const getValueOutput = (value) => (_.isObject(value) ? '[complex value]' : convertOutputValue(value));

const getPlainDiff = (diff) => {
  const iter = (data, path = []) => {
    const lines = data.flatMap((node) => {
      const { type, key, value, oldValue, newValue, children } = node;
      const fullPath = [...path, key].join('.');

      switch (type) {
        case 'added':
          return `Property '${fullPath}' was added with value: ${getValueOutput(value)}`;
        case 'deleted':
          return `Property '${fullPath}' was removed`;
        case 'changed':
          return `Property '${fullPath}' was updated. From ${getValueOutput(oldValue)} to ${getValueOutput(newValue)}`;
        case 'unchanged':
          return [];
        case 'nested':
          return iter(children, [...path, key]);
        default:
          throw new Error(`Invalid node type: '${type}'`);
      }
    });
    return lines.join('\n');
  };

  return `\n${iter(diff)}\n`;
};

export default getPlainDiff;
