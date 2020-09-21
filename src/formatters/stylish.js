import _ from 'lodash';

const indent = 2;
const increasedIndent = 4;
const getNewIndent = (depth) => ' '.repeat(increasedIndent * depth + indent);

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

      switch (type) {
        case 'added':
          return `${getNewIndent(depth)}+ ${key}: ${stringify(value, depth)}`;
        case 'deleted':
          return `${getNewIndent(depth)}- ${key}: ${stringify(value, depth)}`;
        case 'changed':
          return `${getNewIndent(depth)}- ${key}: ${stringify(oldValue, depth)}\n${getNewIndent(
            depth
          )}+ ${key}: ${stringify(newValue, depth)}`;
        case 'unchanged':
          return `${getNewIndent(depth)}  ${key}: ${stringify(value, depth)}`;
        case 'nested':
          return `${getNewIndent(depth)}  ${key}: {\n${iter(children, depth + 1)}\n${getNewIndent(depth)}  }`;
        default:
          throw new Error(`Invalid node type: '${type}'`);
      }
    });
    return lines.join('\n');
  };

  return `\n{\n${iter(diff)}\n}\n`;
};

export default getStylishDiff;
