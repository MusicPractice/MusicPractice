import ChordProgressionSet from '~/services/chordProgressionSet';
import ChordProgression from '~/services/chordProgression';
import { counterToRate, dictToMatrix } from '~/utils/itertools';

/**
 * 和弦进行 计算业务服务
 */
export default class ChordProgressionComputer {
  /**
   * 收集很多的和弦进行，用于计算数据
   */
  private static CHORD_MATRIX: number[][] = [
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
  private static CHORD_SET: ChordProgressionSet =
    ChordProgressionSet.fromMatrix(this.CHORD_MATRIX);
  /**
   * 仅仅用于界面顶部展示
   * 最终的结构 = {
   *     1: [['5', 0.5], ['6', 0.2]]  概率降序排列
   *     2: [...],
   *     ...,
   *     7: [...],
   * }
   */
  public static chordRateTable: Record<number, [number, number][]> =
    this.computeRateFromChordMatrix();

  /**
   *
   */
  private static computeRateFromChordMatrix(): Record<
    number,
    [number, number][]
  > {
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
      // 遍历和弦进行集合，累加统计字典
      for (const chordProgression of ChordProgressionComputer.CHORD_SET
        .innerSet) {
        const nextChord = chordProgression.getNextChord(
          ChordProgression.fromNumbersInCScale(currentNote),
        );
        if (nextChord) {
          setCount[nextChord.getLevelAsCScale()]++;
        }
      }
      ChordRate[currentNote] = dictToMatrix(counterToRate(setCount));
    }
    return ChordRate;
  }

  /**
   * 根据用户输入的和弦进行，预测接下来接每一种和弦的可能性
   */
  public static getNextChord(
    inputProgression: number[],
  ): Record<number, number> {
    const setCount = Array.from({ length: 7 }, (_, i) => i + 1).reduce(
      (acc: Record<number, number>, curr) => {
        acc[curr] = 0;
        return acc;
      },
      {},
    );

    // 没输入长度，则下一个所有可能是0
    if (inputProgression.length === 0) {
      return setCount;
    }

    // 如果长度是2或者超过2，就看所有存储过的和弦进行里，
    // 每个存储的和弦进行看成一个环形数组。
    // 1的记录一下，长度为2的记录一下……
    // [1 6 4]
    //      4   +1
    //    6 4   +2
    //  1 6 4   +4

    for (let startIdx = 0; startIdx < inputProgression.length; startIdx++) {
      const child = ChordProgression.fromNumbersInCScale(
        ...inputProgression.slice(startIdx, inputProgression.length),
      );
      // 让每一个子和弦进行遍历所有的和弦进行集合，去找自己适合的下一个
      // 遍历集合里的每一个进行段
      // 匹配一下，找到下一个，看是否存在。
      // 如果存在，就增加到结果集合里。增加一个权重。
      // 如果不存在，就跳过

      for (const progressionSaved of this.CHORD_SET.getInnerSet) {
        const nextChord = progressionSaved.getNextChord(child);
        if (nextChord === null) {
          continue;
        }
        // 找到了下一个
        setCount[nextChord.getLevelAsCScale()] +=
          2 ** (inputProgression.length - startIdx - 1);
      }
    }

    // 将结果统计字典转化为概率

    return counterToRate(setCount);
  }
}
