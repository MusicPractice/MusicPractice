// 没整成
// import Chord, {ChordExtension, ChordType} from "~/services/chord";
// import Note from "~/services/note";

import {describe, expect, test} from '@jest/globals';


// function test1() {
//     const chord = new Chord(
//         new Note(3, 1),
//         ChordType.Maj,
//         ChordExtension.None
//     )
// }
function sum(a: number, b: number): number {
    return a + b;
}

test('test1', () => {
    expect(sum(1, 3)).toBe(4);
})