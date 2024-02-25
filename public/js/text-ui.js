"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chords_1 = require("./chords");
const EMPTY = "---|";
const ROOT = "-0-|";
const NONROOT = "-o-|";
const NUMBERINGS = "=0===1===2===3===4===5===6===7===8===9===10==11==12==\n";
function displayFret(fret) {
    const pos = fret.position;
    const s = fret.degree === 0 ? ROOT : NONROOT;
    return EMPTY.repeat(pos) + s + EMPTY.repeat(chords_1.MAX_FRET - pos) + " " + chords_1.NOTE_NAMES[fret.note];
}
function displayFrets(frets) {
    frets.forEach(p => {
        console.log(displayFret(p));
    });
    console.log(NUMBERINGS);
}
function main(roteNote, chord, tuning, fingLength) {
    chord = chord.map(n => n + roteNote);
    let fing = (0, chords_1.fingerings)(chord, tuning, fingLength);
    fing.forEach(f => {
        displayFrets(f);
    });
    console.log("Total chords: " + fing.length);
}
main(chords_1.C, chords_1.SEVENTH, chords_1.STANDARD_GUITAR_TUNING, 3);
