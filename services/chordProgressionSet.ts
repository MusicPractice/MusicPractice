import ChordProgression from '~/services/chordProgression';

/**
 * 用于和弦的统计工作。
 * 这个集合自带了和弦进行去重功能。
 */
export default class ChordProgressionSet {
  innerSet: ChordProgression[];

  constructor() {
    this.innerSet = [];
  }

  /**
   * 获取这个和弦进行集合中的内容列表
   * 谨慎使用，可能会对数组进行修改
   */
  get getInnerSet() {
    return this.innerSet;
  }
  /**
   * 通过二维数组获取 和弦进行集合对象
   */
  public static fromMatrix(table: number[][]): ChordProgressionSet {
    const res = new ChordProgressionSet();
    for (const chordNumber of table) {
      res.add(ChordProgression.fromNumbersInCScale(...chordNumber));
    }
    return res;
  }
  /**
   * 向和弦进行集合中增加一个和弦进行
   * @param chordProgression {ChordProgression}
   */
  private add(chordProgression: ChordProgression) {
    // 增加之前先看一遍是否出现重复
    for (let existProgression of this.innerSet) {
      if (existProgression.equal(chordProgression)) {
        return;
      }
    }
    this.innerSet.push(chordProgression);
  }

  get size(): number {
    return this.innerSet.length;
  }
}
