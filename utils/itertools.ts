/**
 * 数组累加和
 * 1, 2, 3 ==>
 * 1, 3, 6
 * @param array
 */
export function accumulate(array: any[]): any[] {
  if (array.length === 0) {
    return [];
  }
  if (array.length === 1) {
    return [array[0]];
  }
  const res = [array[0]];

  for (let i = 1; i < array.length; i++) {
    res.push(res[i - 1] + array[i]);
  }
  return res;
}

/**
 * 用于将统计的字典类型转化成概率比率类型
 * @example {"apple": 3, "banana": 1} ---> {"apple": 0.75, "banana": 0.25}
 * @param dict
 */
export function counterToRate(
  dict: Record<string, number>,
): Record<string, number> {
  // 计算总数
  const totalCount = Object.values(dict).reduce((acc, curr) => acc + curr, 0);
  // 如果总数为 0，则直接返回原始字典
  if (totalCount === 0) {
    return dict;
  }
  // 转换成比率
  const rateDict: Record<string, number> = {} as Record<string, number>;
  for (const key in dict) {
    rateDict[key] = dict[key] / totalCount;
  }

  return rateDict;
}

/**
 * 将字典转化成 数组，方便前端界面渲染
 * 同时key会根据字典序升序排序
 * @example {"b": 5, "aaa": 16}  --> [ ["aaa", 16], ["b", 5] ]
 * @param dict
 */
export function dictToMatrix(dict: Record<string, number>): [string, number][] {
  // 将字典的键值对转换为数组
  const array = Object.entries(dict);

  // 根据键进行排序
  array.sort((a, b) => a[0].localeCompare(b[0]));

  return array;
}
