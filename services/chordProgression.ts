/**
 * 和弦进行业务服务
 */
export default class ChordProgression {
  /**
   * 根据一些和弦进行，来获取一个表格
   * 用于表示所有和弦后面接什么的概率
   *
   * 计算每一个和弦后面接什么的可能性
   * 计算方法：
   * 遍历 1~7
   *    寻找每个和弦中的 1
   *       将 1 后面的数字加入到 结果集合
   *       结果集合用来计算1 后面接什么的概率
   *
   * 最终结果结构 = {
   *   1: {
   *     5: 0.5  接5的概率
   *     6: 0.2
   *   }
   * }
   * 更改了，最终的结构 = {
   *     1: [[5, 0.5], [6, 0.2]]  概率降序排列
   * }
   * @param progressionList
   */
  static computeRateFromProgressionList(
    progressionList: number[][],
  ): Record<number, [number, number][]> {
    const ChordRate: Record<number, [number, number][]> = {};

    for (let currentNote = 1; currentNote <= 7; currentNote++) {
      const setCount: Record<number, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0 };
      const probabilities: [number, number][] = [];

      for (const chordProgression of progressionList) {
        for (let j = 0; j < chordProgression.length; j++) {
          if (chordProgression[j] === currentNote) {
            let nextIdx = j === chordProgression.length - 1 ? 0 : j + 1;
            setCount[chordProgression[nextIdx]]++;
          }
        }
      }

      let total = 0;
      for (let note = 1; note <= 7; note++) {
        total += setCount[note];
      }

      for (let note = 1; note <= 7; note++) {
        const probability = total === 0 ? 0 : setCount[note] / total;
        probabilities.push([note, probability]);
      }

      // 按概率降序排序
      probabilities.sort((a, b) => b[1] - a[1]);

      ChordRate[currentNote] = probabilities;
    }
    return ChordRate;
  }
}
