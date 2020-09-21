import getStylishDiff from './stylish.js';
import getPlainDiff from './plain.js';

const getDiffFormat = (diff, format) => {
  switch (format) {
    case 'stylish':
      return getStylishDiff(diff);
    case 'plain':
      return getPlainDiff(diff);
    default:
      throw new Error(`Unsupported format: ${format}`);
  }
};

export default getDiffFormat;
