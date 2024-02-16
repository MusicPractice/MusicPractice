/**
 * 音符类
 *
 * 术语表示：
 *
 * 音名：'C4',  'C#4'
 * 音名前缀：'C', 'C#'
 * 八度/组号：4
 *
 * 一个音符对象构建好了就不能再变了
 * 涉及到翻阅八度等操作，会返回新的对象。
 */
export default class Note {
  private readonly octave: number;
  private readonly idx: number;

  // prettier-ignore
  static SCALE_LIST: string[] = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

  get getOctave() {
    return this.octave;
  }

  get getIndex() {
    return this.idx;
  }

  /**
   * 生成一个音符
   * @param octave {number} 第几大组
   * @param number {number} 从1开始 [1, 12]
   */
  constructor(octave: number, number: number) {
    this.octave = octave;
    if (number < 1 || number > 12) {
      console.warn('构造音符出错', number, '超出范围,number');
    }
    this.idx = number;
  }

  /**
   * 获取音名
   * @returns {string} 音名格式，例如 'C4', 'C#4' 若忽略八度，就是 'C', 'C#'
   */
  public getNoteName(ignoreOctave?: boolean): string {
    if (ignoreOctave) {
      return Note.SCALE_LIST[this.idx - 1];
    }
    const octave: number = this.octave; // 转换成音名中的八度表示
    const noteName: string = Note.SCALE_LIST[this.idx - 1]; // 根据音符的 idx 获取对应的音名
    return `${noteName}${octave}`;
  }

  /**
   * 判断这个音符可以属于哪些调（大调）调性
   * 例如，C4
   * 属于 C调，G调，F调，#D调，#G调，#A调
   * @returns {string[]} 例如 ['C', 'G']
   */
  public getTonality(): string[] {
    const noteNameFix = this.getNoteName(true);
    const res: string[] = [];
    const scaleList = [0, 2, 2, 1, 2, 2, 2, 1]; // 大调音阶

    // 先遍历每一个调
    for (const baseScaleNoteString of Note.SCALE_LIST) {
      // 根据这个调，的基音，推出这个调的所有音
      let curNote: Note = Note.fromNoteName(`${baseScaleNoteString}3`);

      const newScaleList: string[] = [];

      for (const add of scaleList) {
        curNote = curNote.transpose(add);
        newScaleList.push(curNote.getNoteName(true));
      }

      if (newScaleList.includes(noteNameFix)) {
        res.push(baseScaleNoteString);
      }
    }
    return res;
  }

  /**
   * 当前这个音符.add(2) 提升一个全音，返回一个新的音符对象
   * @param n {number} 半音
   */
  public transpose(n: number): Note {
    // 计算新的索引值和组号
    let newOctave = this.octave;
    let newIdx = this.idx + n;

    // 处理索引值超过或等于12的情况
    while (newIdx >= 12) {
      newIdx -= 12;
      newOctave++;
    }

    // 处理索引值小于等于0的情况
    while (newIdx <= 0) {
      newIdx += 12;
      newOctave--;
    }

    // 创建新的音符对象并返回
    return new Note(newOctave, newIdx);
  }

  /**
   * ========
   * 以下都是静态工厂方法
   * ========
   */


  /**
   * 从音名格式创建音符对象
   * @param noteName {string} 音名格式，例如 'C4', 'C#4'
   */
  public static fromNoteName(noteName: string): Note {
    // 解析音名格式，获取音名和八度
    const noteNameRegex = /^([A-G]#?)(\d+)$/;
    const match = noteName.match(noteNameRegex);
    if (!match) {
      throw new Error(`不合法的音名[${noteName}]`);
    }
    let sliceFixEnd = noteName.includes('#') ? 2 : 1;
    const groupString = noteName.slice(sliceFixEnd, noteName.length);
    const octave: number = parseInt(groupString);
    const fix: string = noteName.slice(0, sliceFixEnd);
    // 创建音符对象并返回
    return new Note(octave, Note.SCALE_LIST.indexOf(fix) + 1);
  }

  /**
   * 直接用数字简谱创建C大调音阶音符。
   * 但第二个参数要提供组号
   * @example f(1, 2) ==> C2,  f(3, 2) ==> E2
   * @param n
   * @param group
   */
  public static fromNumberInCMajorScale(n: number, group: number): Note {
    return Note.fromNoteName('_CDEFGAB'[n] + group.toString());
  }

  /**
   * 将文件名格式转换成对象
   * @param fileName {string} 例如 '3_05'
   */
  static fromFileName(fileName: string): Note {
    // 拆分文件名并转换成数字
    const [groupStr, idxStr] = fileName.split('_');
    const group = parseInt(groupStr);
    const idx = parseInt(idxStr);

    // 创建音符对象并返回
    return new Note(group, idx);
  }
}
