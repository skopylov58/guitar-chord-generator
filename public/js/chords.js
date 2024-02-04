"use strict";
const C = 0;
const D = 2;
const E = 4;
const F = 5;
const G = 7;
const A = 9;
const B = 11;
const NOTE_NAMES = ["C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab", "A", "A#m, Bb", "B",];
const MAX_FRET = 12;
const MAJOR = [0, 4, 7];
const SIXTH = [0, 4, 7, 9];
const SEVENTH = [0, 4, 7, 10];
const MINOR = [0, 3, 7];
const MINOR_SIXTH = [0, 3, 7, 9];
const MINOR_SEVENTH = [0, 3, 7, 10];
const STANDARD_GUITAR_TUNING = [E, A, D, G, B, E].reverse();
const EMPTY = "---|";
const ROOT = "-0-|";
const NONROOT = "-o-|";
const NUMBERINGS = "=0===1===2===3===4===5===6===7===8===9===10==11==12==\n";
/**
 * Check if given note is in the chord
 * @param {note} note
 * @param {chord} chord aray of notes
 * @returns index of found note, else returns -1
 */
function degree(note, chord) {
    return chord.map(n => n % 12).indexOf(note % 12);
}
function cartesianProduct(...allEntries) {
    return allEntries.reduce((results, entries) => results
        .map(result => entries.map(entry => [...result, entry]))
        .reduce((subResults, result) => [...subResults, ...result], []), [[]]);
}
/**
 * Calculates note on the fretboard
 * @param stringNum string number
 * @param fretNumber fret number
 * @param tuning Tuning
 * @returns note on a given position
 */
function note(stringNum, fretNumber, tuning) {
    return (tuning[stringNum] + fretNumber) % 12;
}
/**
 * Finds all frets on a certain string for a given chord and tuning.
 * @param stringNum string number
 * @param chord chord
 * @param tuning tuning
 * @returns list of all frets on a given string
 */
function frets(stringNum, chord, tuning) {
    let res = [];
    for (let i = 0; i < MAX_FRET; i++) {
        const n = note(stringNum, i, tuning);
        const d = degree(n, chord);
        if (d >= 0) {
            res.push({ position: i, note: n, degree: d });
        }
    }
    return res;
}
/**
 * Calculates fingering length
 * @param fing Calculates
 * @returns
 */
function len(fing) {
    const max = Math.max(...fing.map(p => p.position));
    const min = Math.min(...fing.map(p => p.position).filter(p => p != 0));
    return max - min + 1;
}
function fingerings(chord, tuning, fingeringLength) {
    let pos = tuning.map((_, i) => frets(i, chord, tuning));
    let fings = cartesianProduct(...pos);
    return fings
        .filter(f => len(f) <= fingeringLength)
        .filter(f => allDegrees(f, chord))
        //.filter(f => f[4].position == 3)
        .sort(compFirstFret);
}
function firstFret(fing) {
    return Math.min(...fing.map(p => p.position).filter(p => p != 0));
}
function compFirstFret(fing1, fing2) {
    let f1 = firstFret(fing1);
    let f2 = firstFret(fing2);
    return f1 - f2;
}
function hasRootOnBassString(fing) {
    return fing.map(f => f).reverse().slice(0, 3).filter(f => f.degree == 0).length > 0;
}
function cmp(f1, f2) {
    let b1 = hasRootOnBassString(f1);
    let b2 = hasRootOnBassString(f2);
    if (b1 == b2) {
        return 0;
    }
    else if (b1) {
        return -1;
    }
    else {
        return 1;
    }
}
/**
 * Checks if fingering has all degrees of a given chord
 * @param fing
 * @param chord
 * @returns true if fingering contains all degrees of given chord
 */
function allDegrees(fing, chord) {
    let uniq = [...new Set(fing.map(p => p.note))];
    return uniq.length === chord.length;
}
function displayFret(fret) {
    const pos = fret.position;
    const s = fret.degree === 0 ? ROOT : NONROOT;
    return EMPTY.repeat(pos) + s + EMPTY.repeat(MAX_FRET - pos) + " " + NOTE_NAMES[fret.note];
}
function displayFrets(frets) {
    frets.forEach(p => {
        console.log(displayFret(p));
    });
    console.log(NUMBERINGS);
}
function main(roteNote, chord, tuning, fingLength) {
    chord = chord.map(n => n + roteNote);
    let fing = fingerings(chord, tuning, fingLength);
    fing.forEach(f => {
        displayFrets(f);
    });
    console.log("Total chords: " + fing.length);
}
main(C, SEVENTH, STANDARD_GUITAR_TUNING, 3);
