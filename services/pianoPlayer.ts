import {Howl} from 'howler';
import Note from "~/services/note";
import Chord from "~/services/chord";

/**
 * 音色到音色路径的映射
 */
export enum Timber {
    defaultTimber = 'default',
    genshinPoetry = 'genshin/mirror',
    genshinMirror = 'genshin/poetry',
}

/**
 * 音频播放者类
 */
export default class PianoPlayer {

    protected static audioFiles: Record<string, Howl> = {};

    /**
     * 更改音色
     */
    static async changeTimber(newTimber: Timber) {
        await this.loadAudio(newTimber);
    }

    /**
     * 加载音源 assets/audio/{fileName}/ 下的所有音源文件
     * 如果音源音域不全，就用默认的音色。
     * 因此必须保证默认音色是全的。
     * @param fileName {Timber} 文件夹的名字 详见音色枚举
     */
    static async loadAudio(fileName: Timber) {
        const notes = [];
        for (let group = 0; group < 7; group++) {
            for (let noteI = 1; noteI <= 12; noteI++) {
                notes.push(new Note(group, noteI).getFileName())
            }
        }

        for (const note of notes) {
            // 将音频绑定到类的属性上
            let src;
            try {
                src = (await import(`../assets/audio/${fileName}/${note}.mp3`)).default;
                console.log(`加载成功：../assets/audio/${fileName}/${note}.mp3`);
            } catch (e) {
                console.log(e);
                // 加载不到就用默认音色
                console.warn(`无法加载：../assets/audio/${fileName}/${note}.mp3，采用默认音色`);
                src = (await import(`../assets/audio/${Timber.defaultTimber}/${note}.mp3`)).default;
            }
            this.audioFiles[note] = new Howl({
                src,
                volume: 1,
                loop: false,
            });
        }
    }

    /**
     * 播放一个音符的声音
     */
    static playNote(note: Note) {
        const audio = this.audioFiles[note.getFileName()];
        if (audio) {
            audio.play();
        } else {
            console.error(`找不到音符 ${note.getFileName()} 的音频文件`);
        }
    }

    /**
     * 博凡一个和弦的声音
     * @param chord
     * @param autoTrans {boolean} 是否自动转位
     * 自动转位的原理：一旦和弦音高于基音超过一个八度，就降低且仅降低一个八度。
     */
    static playChord(chord: Chord, autoTrans: boolean): void {
        const chordNotes: Note[] = chord.getNotes();
        const baseNoteGroup: number = chordNotes[0].group;

        for (let note of chordNotes) {
            console.log(note.getNoteName(), note.group);
            // 自动转位的原理，一旦和弦音高于基音一个八度，就降低一个八度。
            if (autoTrans && note.group > baseNoteGroup) {
                note = note.transpose(-12);
            }
            this.playNote(note);
        }
    }

}