/**
 * 音符类
 *
 * 术语表示：
 * 文件名格式：'4_01', '4_02'
 * 音名格式：'C4',  'C#4'
 *
 */
import { accumulate } from '~/utils/itertools';

export default class Note {
  group: number;
  idx: number;

  static SCALE_LIST: string[] = [
    'C',
    'C#',
    'D',
    'D#',
    'E',
    'F',
    'F#',
    'G',
    'G#',
    'A',
    'A#',
    'B',
  ];

  /**
   * 生成一个音符
   * @param group {number} 第几大组
   * @param number {number} 从1开始 [1, 12]
   */
  constructor(group: number, number: number) {
    this.group = group;
    if (number < 1 || number > 12) {
      console.warn('构造音符出错', number, '超出范围,number');
    }
    this.idx = number;
  }

  /**
   * 转换成文件名格式
   */
  getFileName(): string {
    return `${this.group}_${this.idx.toString().padStart(2, '0')}`;
  }

  /**
   * 获取音名格式
   * @returns {string} 音名格式，例如 'C4', 'C#4'
   */
  getNoteName(): string {
    const octave: number = this.group + 1; // 转换成音名中的八度表示
    const noteName: string = Note.SCALE_LIST[this.idx - 1]; // 根据音符的 idx 获取对应的音名
    return `${noteName}${octave}`;
  }

  /**
   * 获取音名的前缀，不加组号
   */
  getNoteNameFix(): string {
    // 根据音符的 idx 获取对应的音名
    return Note.SCALE_LIST[this.idx - 1];
  }

  /**
   * 当前这个音符.add(2) 提升一个全音，返回一个新的音符对象
   * @param n {number} 半音
   */
  transpose(n: number): Note {
    // 计算新的索引值和组号
    let newGroup = this.group;
    let newIdx = this.idx + n;

    // 处理索引值超过或等于12的情况
    while (newIdx >= 12) {
      newIdx -= 12;
      newGroup++;
    }

    // 处理索引值小于等于0的情况
    while (newIdx <= 0) {
      newIdx += 12;
      newGroup--;
    }

    // 创建新的音符对象并返回
    return new Note(newGroup, newIdx);
  }

  /**
   * 从音名格式创建音符对象
   * @param noteName {string} 音名格式，例如 'C4', 'C#4'
   */
  static fromNoteName(noteName: string): Note {
    // 解析音名格式，获取音名和八度
    const noteNameRegex = /^([A-G]#?)(\d+)$/;
    const match = noteName.match(noteNameRegex);
    if (!match) {
      throw new Error(`不合法的音名[${noteName}]`);
    }
    let sliceFixEnd = noteName.includes('#') ? 2 : 1;
    const groupString = noteName.slice(sliceFixEnd, noteName.length);
    const group: number = parseInt(groupString) - 1;
    const fix: string = noteName.slice(0, sliceFixEnd);
    // 创建音符对象并返回
    return new Note(group, Note.SCALE_LIST.indexOf(fix) + 1);
  }

  /**
   * 将文件名格式转换成对象
   * @param fileName {string}
   */
  static fromFileName(fileName: string): Note {
    // 拆分文件名并转换成数字
    const [groupStr, idxStr] = fileName.split('_');
    const group = parseInt(groupStr);
    const idx = parseInt(idxStr);

    // 创建音符对象并返回
    return new Note(group, idx);
  }

  /**
   * 判断这个音符属于哪些音阶
   * 例如，C4
   * 属于 C调，G调，F调，#D调，#G调，#A调
   * 这里的调说的是大调
   */
  getScale() {
    const noteNameFix = this.getNoteNameFix(); // 获取音名的前缀，不含八度
    const res: string[] = [];
    const scaleList = [0, 2, 2, 1, 2, 2, 2, 1]; // 大调音阶
    const scaleListAccumulate: number[] = accumulate(scaleList);

    // 先遍历每一个调
    for (const baseScaleNoteString of Note.SCALE_LIST) {
      // 根据这个调，的基音，推出这个调的所有音
      let curNote: Note = Note.fromNoteName(`${baseScaleNoteString}4`);
      // console.log(`${baseScaleNoteString}音阶 起始音:${curNote.getNoteName()}`);

      const newScaleList: string[] = [];

      for (const add of scaleList) {
        curNote = curNote.transpose(add);
        newScaleList.push(curNote.getNoteNameFix());
      }
      // console.log(`以${baseScaleNoteString}为基音的大调为[${newScaleList}]`);

      if (newScaleList.includes(noteNameFix)) {
        res.push(baseScaleNoteString);
      }
    }
    return res;
  }
}
