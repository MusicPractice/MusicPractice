import Note from "~/services/note";

/**
 * 和弦类型
 */
export enum ChordType {
    Maj,
    Min,
    Dim,
    Aug,
    Sus2,
    Sus4,
    Fifth,  // 纯五度和弦
}

function getChordTypeByName(name: string): ChordType | undefined {
    switch (name) {
        case "Maj":
            return ChordType.Maj;
        case "Min":
            return ChordType.Min;
        case "Dim":
            return ChordType.Dim;
        case "Aug":
            return ChordType.Aug;
        case "Sus2":
            return ChordType.Sus2;
        case "Sus4":
            return ChordType.Sus4;
        case "Fifth":
            return ChordType.Fifth;
        default:
            return undefined; // 如果名称不匹配，则返回 undefined
    }
}
/**
 * 和弦的附加音
 * 6、7、Maj7、add9、9、11、13
 */
export enum ChordExtension {
    /**
     * 不加任何附加音，就是三和弦
     */
    None,
    Ext6,
    Ext7,
    Maj7,
    Add9,
    Ext9,
    Ext11,
    Ext13,
}

/**
 * 和弦
 */
export default class Chord {
    type: ChordType;
    extension: ChordExtension;
    root: Note; // 根音

    /**
     * 创建一个和弦对象
     * @param type {ChordType} 和弦类型
     * @param extension {ChordExtension} 和弦扩展
     * @param root {Note} 根音
     */
    constructor(root: Note, type: ChordType, extension: ChordExtension) {
        this.root = root;
        this.type = type;
        this.extension = extension;
    }

    /**
     * 判断这个和弦是什么调内的
     * 例如返回 ['C', 'G'] 表示这个和弦的构成音既是C调调内音，也是G调调内音。
     */
    getScale(): string[] {
        // 根据和弦的根音和类型，确定和弦所在的调内音
        const chordNotes = this.getNotes();
        const scales: string[][] = [];
        for (const note of chordNotes) {
            scales.push(note.getScale());
        }
        // 遍历每一个音阶，看看是不是每一个子数组都包含
        return scales.reduce((prev, curr) => {
            return prev.filter(note => curr.includes(note));
        })
    }

    /**
     * 计算并获取这个和弦所组成音符序列
     */
    getNotes(): Note[] {
        let thirdTranspose = 0;  // 三音，三和弦中，中间那个音的音程比根音高几个半音
        let fifthTranspose = 7;  // 五音
        switch (this.type) {
            case ChordType.Maj:
                thirdTranspose = 4;
                break;
            case ChordType.Min:
                thirdTranspose = 3;
                break;
            case ChordType.Sus2:
                thirdTranspose = 2;
                break;
            case ChordType.Sus4:
                thirdTranspose = 5;
                break;
            case ChordType.Dim:
                thirdTranspose = 3;
                fifthTranspose = 6;
                break;
            case ChordType.Aug:
                thirdTranspose = 4;
                fifthTranspose = 8;
                break;
            case ChordType.Fifth:
                // 不用管
                break;
            default:
                console.warn('未知的和弦类型', this.type, typeof this.type);
                break;
        }


        // 构建三和弦
        let res = [
            this.root,
            this.root.transpose(thirdTranspose),
            this.root.transpose(fifthTranspose)
        ];

        // 如果是5和弦 把中音去掉
        if (this.type === ChordType.Fifth) {
            res = [res[0], res[2]];
        }

        switch (this.extension) {
            case ChordExtension.None:
                break;
            case ChordExtension.Ext6:
                res.push(this.root.transpose(9));
                break;
            case ChordExtension.Ext7:
                res.push(this.root.transpose(10));
                break;
            case ChordExtension.Maj7:
                res.push(this.root.transpose(11));
                break;
            case ChordExtension.Add9:
                res.push(this.root.transpose(14));
                break;
            case ChordExtension.Ext11:
                res.push(this.root.transpose(17));
                break;
            case ChordExtension.Ext13:
                res.push(this.root.transpose(21));
                break;
        }
        // 调整音符高度，将差距过于远的音符向下八度
        return res;
    }

    /**
     * 从和弦的字符串名字中解析出对象，目前仅支持三和弦
     * 如果Maj这部分后缀没有识别出来，就当Maj大和弦处理
     * @param name {string} 例如：'D#Maj'
     */
    static fromName(name: string): Chord {
        const sliceIndex = name.includes("#") ? 2 : 1;
        const baseNote: string = name.slice(0, sliceIndex);
        const chordType: ChordType = getChordTypeByName(name.slice(sliceIndex, name.length)) || 0;

        return new Chord(
            Note.fromNoteName(`${baseNote}3`),
            chordType,
            ChordExtension.None,
        )
    }

    /**
     * 获取和弦名称
     * @returns {string} 和弦名称，例如 'D#Maj'
     */
    getChordName(): string {
        return `${this.root}${this.type}${this.extension}`;
    }
}