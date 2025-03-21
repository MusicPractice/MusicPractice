import Chord from '~/services/chord';

/**
 * 一个和弦进行对象
 * 就是一些和弦组成一个数组
 * 代码层面是数组，但逻辑上是环形的。
 * 因此在equal判断等一些逻辑上会看成 环形数组 来判断。
 */
export default class ChordProgression {
  content: Chord[];

  private constructor(content: Chord[]) {
    this.content = content;
  }

  /**
   * 直接用 f(1, 6, 4, 5) 构造一个C调和弦进行
   * @param args
   */
  public static fromNumbersInCScale(...args: number[]): ChordProgression {
    const content: Chord[] = [];
    for (let chordNumber of args) {
      content.push(Chord.fromNumberInCMajorScale(chordNumber, 3));
    }
    return new ChordProgression(content);
  }

  /**
   * 通过一个子和弦进行，获取这个和弦进行的下一个和弦，
   * todo，建议优化成直接抛出异常。在上层捕获异常。
   * 如果没有匹配，则返回 null
   * 例如自己是 1234
   * 传入的是 341，则返回2
   * @param childChordProgression {ChordProgression}
   */
  public getNextChord(childChordProgression: ChordProgression): Chord | null {
    if (this.content.length <= childChordProgression.content.length) {
      return null;
    }
    // 寻找子和弦进行在当前和弦进行中的位置
    // 例如 1645 找 45 ，返回是4所在的下标 2

    let index = -1;
    for (let i = 0; i < this.content.length; i++) {
      // 遍历每一个自身的起始位置，逐个贴合比较
      let isSame = true;
      for (let j = 0; j < childChordProgression.content.length; j++) {
        if (
          !this.content[(i + j) % this.content.length].isEqual(
            childChordProgression.content[j],
          )
        ) {
          isSame = false;
          break;
        }
      }
      if (isSame) {
        index = i;
        break;
      }
    }

    // 如果找到了子和弦进行在当前和弦进行中的位置，则返回下一个和弦
    if (index !== -1) {
      return this.content[
        (index + childChordProgression.content.length) % this.content.length
      ];
    } else {
      return null;
    }
  }

  /**
   * 比较自己是否和另一个和弦进行是等效的
   * 例如 1645 === 4516
   * @param other {ChordProgression}
   */
  public equal(other: ChordProgression): boolean {
    // 长度都不一样，肯定不一样
    if (this.content.length !== other.content.length) {
      return false;
    }
    // 长度一样，是环形的，从每个起始点开始比较
    for (let i = 0; i < this.content.length; i++) {
      let isEqual = true;
      for (let j = 0; j < this.content.length; j++) {
        if (
          !this.content[j].isEqual(other.content[(i + j) % this.content.length])
        ) {
          isEqual = false;
          break;
        }
      }
      if (isEqual) {
        return true;
      }
    }
    return false;
  }

  toString(): string {
    let res = '';
    for (let i = 0; i < this.content.length; i++) {
      res += this.content[i].getChordNameSimple();
      if (i !== this.content.length - 1) {
        res += ' - ';
      }
    }
    return res;
  }
}
