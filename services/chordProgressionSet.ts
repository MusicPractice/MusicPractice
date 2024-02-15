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

  get chordProgressionArray() {
    // 有点危险，会被修改
    return this.innerSet;
  }

  /**
   * 向和弦进行集合中增加一个和弦进行
   * @param chordProgression {ChordProgression}
   */
  addChordProgression(chordProgression: ChordProgression) {
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
