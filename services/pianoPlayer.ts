import { Howl } from 'howler';
import Note from '~/services/note';
import Chord from '~/services/chord';

/**
 * 音色到音色路径的映射
 */
export enum Timber {
  defaultTimber = 'default',
  genshinPoetry = 'genshin/mirror',
  genshinMirror = 'genshin/poetry',
}

/**
 * 和弦播放模式
 */
export enum ChordPlayMode {
  // [123]
  Columnar,
  // 1 2 3 2
  rootThreeFifthThree,
  // 1 5 1. 3.
  rootFifthRootThree,
  // 琶音
  arpeggio,
  // 中音向上翻阅八度
  LargeColumnar,
}

/**
 * 音频播放者类
 */
export default class PianoPlayer {
  protected static audioFiles: Record<string, Howl> = {};

  /**
   * 更改音色
   * todo 还没做好
   */
  static async changeTimber(newTimber: Timber) {
    await this.loadAudio(newTimber);
  }

  /**
   * 将音符对象转化成文件名 '3_05' ，不带'.mp3'后缀
   * @param note
   * @private
   */
  private static getNoteFileName(note: Note): string {
    return `${note.getOctave}_${note.getIndex.toString().padStart(2, '0')}`;
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
        notes.push(this.getNoteFileName(new Note(group, noteI)));
      }
    }

    for (const note of notes) {
      // 将音频绑定到类的属性上
      let src;
      try {
        src = (await import(`../assets/audio/${fileName}/${note}.mp3`)).default;
      } catch (e) {
        console.log(e);
        // 加载不到就用默认音色
        console.warn(
          `无法加载：../assets/audio/${fileName}/${note}.mp3，采用默认音色`,
        );
        src = (
          await import(`../assets/audio/${Timber.defaultTimber}/${note}.mp3`)
        ).default;
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
    const audio = this.audioFiles[this.getNoteFileName(note)];
    if (audio) {
      audio.play();
    } else {
      console.error(`找不到音符 ${this.getNoteFileName(note)} 的音频文件`);
    }
  }

  /**
   * 博凡一个和弦的声音
   * @param chord
   * @param autoTrans {boolean} 是否自动转位
   * 自动转位的原理：一旦和弦音高于基音超过一个八度，就降低且仅降低一个八度。
   * @param mode {ChordPlayMode} 是否是分解和弦
   */
  static playChord(
    chord: Chord,
    autoTrans: boolean,
    mode?: ChordPlayMode,
  ): void {
    const chordNotes: Note[] = chord.getNotes();
    const baseNoteGroup: number = chordNotes[0].group;

    // 用于在播放和弦时播放一个音符
    const playNoteInChord = (note: Note, delayMs: number) => {
      setTimeout(() => {
        this.playNote(note);
      }, delayMs);
    };

    const columnarPlay = () => {
      console.log('柱式和弦');
      for (let note of chordNotes) {
        // 自动转位的原理，一旦和弦音高于基音一个八度，就降低一个八度。
        if (autoTrans && note.group > baseNoteGroup) {
          note = note.transpose(-12);
        }
        this.playNote(note);
      }
    };

    switch (mode) {
      case ChordPlayMode.Columnar:
        columnarPlay();
        break;
      case ChordPlayMode.rootFifthRootThree:
        playNoteInChord(chordNotes[0], 0);
        playNoteInChord(chordNotes[2], 200);
        playNoteInChord(chordNotes[0].transpose(12), 400);
        playNoteInChord(chordNotes[1].transpose(12), 600);
        break;
      case ChordPlayMode.rootThreeFifthThree:
        playNoteInChord(chordNotes[0], 0);
        playNoteInChord(chordNotes[1], 500);
        playNoteInChord(chordNotes[2], 1000);
        playNoteInChord(chordNotes[1], 1500);
        break;
      case ChordPlayMode.arpeggio:
        const playNoteList = [
          chordNotes[0],
          chordNotes[1],
          chordNotes[2],
          chordNotes[0].transpose(12),
          chordNotes[1].transpose(12),
          chordNotes[2].transpose(12),
          chordNotes[1].transpose(12),
          chordNotes[0].transpose(12),
          chordNotes[2],
          chordNotes[1],
          chordNotes[0],
          chordNotes[1],
          chordNotes[2],
          chordNotes[0].transpose(12),
        ];
        for (let i = 0; i < playNoteList.length; i++) {
          playNoteInChord(playNoteList[i], i * 150);
        }
        break;
      case ChordPlayMode.LargeColumnar:
        playNoteInChord(chordNotes[0], 0);
        playNoteInChord(chordNotes[1].transpose(12), 0);
        playNoteInChord(chordNotes[2], 0);
        break;
      default:
        console.warn(`未知的播放类型: ${mode}, ${typeof mode}`);
        columnarPlay();
    }
  }
}
