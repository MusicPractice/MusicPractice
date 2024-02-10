/**
 * 音符类
 *
 * 术语表示：
 * 文件名格式：'4_01', '4_02'
 * 音名格式：'C4',  'C#4'
 *
 */

export default class Note {
    group: number;
    idx: number;

    /**
     * 生成一个音符
     * @param group {number} 第几大组
     * @param idx {number} [1, 12]
     */
    constructor(group: number, idx: number) {
        this.group = group;
        this.idx = idx;
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
        const noteNames = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
        const octave = this.group + 1; // 转换成音名中的八度表示
        const noteName = noteNames[this.idx - 1]; // 根据音符的 idx 获取对应的音名
        return `${noteName}${octave}`;
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
            throw new Error('不合法的音名');
        }
        const [, noteNamePart, octaveStr] = match;
        const octave = parseInt(octaveStr);
        const idx = noteName.indexOf(noteNamePart) + 1;
        if (idx === 0) {
            throw new Error('不合法的音名');
        }
        const group = octave - 1;

        // 创建音符对象并返回
        return new Note(group, idx);
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
}