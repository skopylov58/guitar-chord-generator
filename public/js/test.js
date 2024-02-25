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
function test1() {
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
test1();
