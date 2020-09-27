import _ from 'lodash';

const initialIndent = 2;
const increasedIndent = 4;
const getNewIndent = (depth) => ' '.repeat(increasedIndent * depth + initialIndent);

const stringify = (data, depth) => {
  if (!_.isPlainObject(data)) return data;
  const convertedData = _.toPairs(data).map(
    ([key, value]) => `${getNewIndent(depth + 1)}  ${key}: ${stringify(value, depth + 1)}`
  );
  return ['{', ...convertedData, `${getNewIndent(depth)}  }`].join('\n');
};

const getStylishDiff = (diff) => {
  const iter = (data, depth = 0) => {
    const lines = data.map((node) => {
      const { type, key, value, oldValue, newValue, children } = node;
      const indent = getNewIndent(depth);

      switch (type) {
        case 'added':
          return `${indent}+ ${key}: ${stringify(value, depth)}`;
        case 'deleted':
          return `${indent}- ${key}: ${stringify(value, depth)}`;
        case 'changed':
          return `${indent}- ${key}: ${stringify(oldValue, depth)}\n${indent}+ ${key}: ${stringify(newValue, depth)}`;
        case 'unchanged':
          return `${indent}  ${key}: ${stringify(value, depth)}`;
        case 'nested':
          return `${indent}  ${key}: {\n${iter(children, depth + 1)}\n${indent}  }`;
        default:
          throw new Error(`Invalid node type: '${type}'`);
      }
    });
    return lines.join('\n');
  };

  return `{\n${iter(diff)}\n}`;
};

export default getStylishDiff;
