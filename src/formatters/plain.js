import _ from 'lodash';

const convertOutputValue = (value) => (_.isString(value) ? `'${value}'` : value);
const getValueOutput = (value) => (_.isObject(value) ? '[complex value]' : convertOutputValue(value));

const getPlainDiff = (diff) => {
  const iter = (data, ancestorKeys = []) => {
    const lines = data.flatMap((node) => {
      const { type, key, value, oldValue, newValue, children } = node;
      const path = [...ancestorKeys, key].join('.');

      switch (type) {
        case 'added':
          return `Property '${path}' was added with value: ${getValueOutput(value)}`;
        case 'deleted':
          return `Property '${path}' was removed`;
        case 'changed':
          return `Property '${path}' was updated. From ${getValueOutput(oldValue)} to ${getValueOutput(newValue)}`;
        case 'unchanged':
          return [];
        case 'nested':
          return iter(children, [...ancestorKeys, key]);
        default:
          throw new Error(`Invalid node type: '${type}'`);
      }
    });
    return lines.join('\n');
  };

  return iter(diff);
};

export default getPlainDiff;
