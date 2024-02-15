import ChordProgressionSet from '~/services/chordProgressionSet';
import ChordProgression from '~/services/chordProgression';
import { counterToRate } from '~/utils/itertools';

/**
 * 和弦进行 计算业务服务
 */
export default class ChordProgressionComputer {
  /**
   * 收集很多的和弦进行，用于计算数据
   */
  static chordProgressionDatabase: number[][] = [
    [1, 4, 5],
    [2, 6, 3], // 3应该是E7，民谣。

    [1, 2, 4, 5],
    [1, 4, 5, 1],
    [1, 4, 5, 6], // D# 大调 50 年代末到60年代初是非常流行的情歌风格和弦进行之一
    [1, 4, 7, 1],
    [1, 5, 4, 5],
    [1, 5, 6, 4], // 流行
    [1, 6, 2, 5], // 流行
    [1, 6, 4, 5], // 50年代流行，G大调现代摇滚

    [2, 4, 5, 6],
    [2, 5, 1, 6],
    [2, 6, 1, 5],

    [6, 5, 4, 3],
    [6, 5, 4, 5],
    [6, 5, 4, 1],
    [6, 4, 1, 5], // 弹唱
    [6, 4, 5, 1],
    [6, 5, 3, 6],

    [1, 5, 6, 3, 4, 1, 4, 5],
    [1, 5, 6, 3, 4, 1, 2, 5],
    [4, 5, 3, 6, 2, 5, 1],

    [1, 5, 6, 4, 1, 5, 4], // D大调，这个和弦序列也很适合出现在流行摇滚和独立音乐中，并且可以帮助创造出一些动感。
    [1, 5, 6, 4, 1, 5, 4, 1], // C ，多一个C，增加更多变化
  ];

  /**
   * 上面属性的集合形式，会自动去重等效的和弦进行
   */
  static chordProgressionDatabaseSet: ChordProgressionSet =
    this.getChordProgressionByTable(this.chordProgressionDatabase);

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
   */
  static computeRateFromProgressionList(): Record<number, [number, number][]> {
    // 最终返回的结果先定义好
    const ChordRate: Record<number, [number, number][]> = {};

    for (let currentNote = 1; currentNote <= 7; currentNote++) {
      const setCount: Record<number, number> = {
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0,
        6: 0,
        7: 0,
      };
      const probabilities: [number, number][] = [];

      for (const chordProgression of ChordProgressionComputer.chordProgressionDatabase) {
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

  /**
   * 上面的函数所计算得到的结果，只计算一次即可
   */
  static chordRateTable: Record<number, [number, number][]> =
    this.computeRateFromProgressionList();

  /**
   * 通过二维数组获取 和弦进行集合对象
   */
  static getChordProgressionByTable(table: number[][]): ChordProgressionSet {
    const res = new ChordProgressionSet();
    for (const chordNumber of table) {
      res.addChordProgression(
        ChordProgression.fromNumbersInCScale(...chordNumber),
      );
    }
    return res;
  }

  /**
   * 根据用户输入的和弦进行，预测接下来接每一种和弦的可能性
   */
  static getNextChord(progression: number[]): Record<number, number> {
    const setCount = Array.from({ length: 7 }, (_, i) => i + 1).reduce(
      (acc: Record<number, number>, curr) => {
        acc[curr] = 0;
        return acc;
      },
      {},
    );

    // 没输入长度，则下一个所有可能是0
    if (progression.length === 0) {
      return setCount;
    }

    // 如果长度是1，就按长度为1的推荐来。
    if (progression.length === 1) {
      // [[1, 0.5], [2, 0.3], ... [7, 0.05]]
      let res: Record<number, number> = {};
      for (let [note, rate] of this.chordRateTable[progression[0]]) {
        res[note] = rate;
      }
      return res;
    }

    // 如果长度是2或者超过2，就看所有存储过的和弦进行里，
    // 每个存储的和弦进行看成一个环形数组。
    // 1的记录一下，长度为2的记录一下……
    // [1 6 4]
    //      4   +1
    //    6 4   +2
    //  1 6 4   +4

    for (let startIdx = 0; startIdx < progression.length; startIdx++) {
      const child = ChordProgression.fromNumbersInCScale(
        ...progression.slice(startIdx, progression.length),
      );
      // 让每一个子和弦进行遍历所有的和弦进行集合，去找自己适合的下一个
      // 遍历集合里的每一个进行段
      // 匹配一下，找到下一个，看是否存在。
      // 如果存在，就增加到结果集合里。增加一个权重。
      // 如果不存在，就跳过

      for (const progressionSaved of this.chordProgressionDatabaseSet
        .chordProgressionArray) {
        const nextChord = progressionSaved.getNextChord(child);
        if (nextChord === null) {
          continue;
        }
        // 找到了下一个
        setCount[nextChord.getLevelAsCScale()] +=
          2 ** (progression.length - startIdx - 1);
      }
    }

    // 将结果统计字典转化为概率

    return counterToRate(setCount);
  }
}
