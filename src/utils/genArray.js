import genRandomStr from '@src/utils/genRandomStr';

/**
 * 生成数组函数
 * @param {object} options - 配置对象
 * options: {howMany, elementStyle, numberBeginWith, stringLength}
 *
 *return []
 */
const genArray = ({
  howMany = 10,
  elementStyle = 'string',
  numberBeginWith = 1,
  stringLength = 5
} = {}) => {
  const genStringItem = stringLength => genRandomStr(stringLength);
  const genNumberItem = (index, numberBeginWith) => numberBeginWith + index;
  const genItem = index => {
    return elementStyle === 'string'
      ? genStringItem(stringLength)
      : genNumberItem(index, numberBeginWith);
  };
  return Array.from({ length: howMany }, (_, index) => genItem(index));
};

export default genArray;
