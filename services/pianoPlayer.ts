import {Howl} from 'howler';
import Note from "~/services/note";
import Chord from "~/services/chord";

/**
 * 音频播放者类
 */
export default class PianoPlayer {

    protected static audioFiles: Record<string, Howl> = {};

    /**
     * 加载音源 assets/audio/{fileName}/ 下的所有音源文件
     * @param fileName {string} 文件夹的名字
     */
    static async loadAudio(fileName: string) {
        const notes = [];
        for (let group = 0; group < 7; group++) {
            for (let noteI = 1; noteI <= 12; noteI++) {
                notes.push(new Note(group, noteI).getFileName())
            }
        }

        for (const note of notes) {
            // 将音频绑定到类的属性上
            this.audioFiles[note] = new Howl({
                src: (await import(`../assets/audio/${fileName}/${note}.mp3`)).default,
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
     */
    static playChord(chord: Chord, autoTrans: boolean): void {

        for (let note of chord.getNotes()) {
            console.log(note.getNoteName(), note.group);
            if (autoTrans && note.group >= 4) {
                note = note.transpose(-12);
            }
            this.playNote(note);
        }
    }

}