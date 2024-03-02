"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chords_1 = require("./chords");
function assert1(cond) {
    if (!cond) {
        throw ("");
    }
}
function assert2(cond, msg) {
    if (!cond) {
        throw (msg);
    }
}
function arraysAreEquals(a, b) {
    if (a.length != b.length)
        return false;
    for (let i = 0; i < a.length; i++) {
        if (a[i] != b[i])
            return false;
    }
    return true;
}
function testFirstFret() {
    let arr = [0, 1, 0, 2, 3, 0];
    let min = Math.min(...arr.filter(i => i != 0));
    assert2(min == 1, 'expecting min 1');
    //C major fingering
    let fing = [
        { position: 0, degree: 0, note: 0 },
        { position: 1, degree: 0, note: 0 },
        { position: 0, degree: 0, note: 0 },
        { position: 2, degree: 0, note: 0 },
        { position: 3, degree: 0, note: 0 },
        { position: 0, degree: 0, note: 0 }
    ];
    let first = (0, chords_1.firstFret)(fing);
    assert1(first == 1);
    //Open G fingering
    fing = [
        { position: 0, degree: 0, note: 0 },
        { position: 0, degree: 0, note: 0 },
        { position: 0, degree: 0, note: 0 },
        { position: 0, degree: 0, note: 0 },
        { position: 0, degree: 0, note: 0 },
        { position: 0, degree: 0, note: 0 }
    ];
    first = (0, chords_1.firstFret)(fing);
    assert1(first == 0);
}
function testNoteFromString() {
    const nc = (0, chords_1.noteFromString)("C");
    assert1(nc == 0);
    const nd = (0, chords_1.noteFromString)("D");
    assert1(nd == 2);
    // const cdies = noteFromString("C#")
    // assert1(cdies == 1)
}
function testTuningFromSting() {
    const tuning = (0, chords_1.tuningFromString)("E A D G B E");
    assert1(arraysAreEquals(tuning, chords_1.STANDARD_GUITAR_TUNING));
}
testFirstFret();
testNoteFromString();
testTuningFromSting();
