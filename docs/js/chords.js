"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.noteFromString = exports.tuningFromString = exports.allDegrees = exports.hasRootOnBassString = exports.compareFirstFret = exports.firstFret = exports.fingerings0 = exports.fingerings = exports.len = exports.frets = exports.note = exports.degree = exports.UKULELE_TUNING = exports.OPEN_G_MINOR_TUNING = exports.OPEN_G_TUNING = exports.STANDARD_GUITAR_TUNING = exports.MINOR_SEVENTH = exports.MINOR_SIXTH = exports.MINOR = exports.SEVENTH = exports.SIXTH = exports.MAJOR = exports.MAX_FRET = exports.NOTE_NAMES = exports.B = exports.A = exports.G = exports.F = exports.E = exports.D = exports.C = void 0;
exports.C = 0;
exports.D = 2;
exports.E = 4;
exports.F = 5;
exports.G = 7;
exports.A = 9;
exports.B = 11;
exports.NOTE_NAMES = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
exports.MAX_FRET = 15;
exports.MAJOR = [0, 4, 7];
exports.SIXTH = [0, 4, 7, 9];
exports.SEVENTH = [0, 4, 7, 10];
exports.MINOR = [0, 3, 7];
exports.MINOR_SIXTH = [0, 3, 7, 9];
exports.MINOR_SEVENTH = [0, 3, 7, 10];
exports.STANDARD_GUITAR_TUNING = [exports.E, exports.A, exports.D, exports.G, exports.B, exports.E].reverse();
exports.OPEN_G_TUNING = [exports.D, exports.G, exports.D, exports.G, exports.B, exports.D].reverse();
exports.OPEN_G_MINOR_TUNING = [exports.D, exports.G, exports.D, exports.G, 10, exports.D].reverse();
exports.UKULELE_TUNING = [exports.G, exports.C, exports.E, exports.A].reverse();
/**
 * Check if given note is in the chord
 * @param {note} note
 * @param {chord} chord aray of notes
 * @returns index of found note, else returns -1
 */
function degree(note, chord) {
    return chord.map(n => n % 12).indexOf(note % 12);
}
exports.degree = degree;
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
exports.note = note;
/**
 * Finds all frets on a certain string for a given chord and tuning.
 * @param stringNum string number
 * @param chord chord
 * @param tuning tuning
 * @returns list of all frets on a given string
 */
function frets(stringNum, chord, tuning) {
    let res = [];
    for (let i = 0; i < exports.MAX_FRET; i++) {
        const n = note(stringNum, i, tuning);
        const d = degree(n, chord);
        if (d >= 0) {
            res.push({ position: i, note: n, degree: d });
        }
    }
    return res;
}
exports.frets = frets;
/**
 * Calculates fingering length
 * @param fing fingering to calculate
 * @returns fingering length
 */
function len(fing) {
    let total = fing.map(f => f.position).reduce((acc, val) => acc + val, 0);
    if (total == 0) {
        return 0;
    }
    const max = Math.max(...fing.map(p => p.position));
    const min = Math.min(...fing.map(p => p.position).filter(p => p != 0));
    return max - min + 1;
}
exports.len = len;
function fingerings(chord, tuning, fingeringLength) {
    let pos = tuning.map((_, i) => frets(i, chord, tuning));
    let fings = cartesianProduct(...pos);
    return fings
        .filter(f => len(f) <= fingeringLength)
        .filter(f => allDegrees(f, chord))
        .filter(hasRootOnBassString)
        .sort(compareFirstFret);
}
exports.fingerings = fingerings;
function fingerings0(chord, tuning, fingeringLength) {
    return fingerings(chord, tuningFromString(tuning), fingeringLength);
}
exports.fingerings0 = fingerings0;
function firstFret(fing) {
    let total = fing.map(f => f.position).reduce((acc, val) => acc + val);
    let min = Math.min(...fing.map(p => p.position).filter(p => p != 0));
    return total == 0 ? 0 : min;
}
exports.firstFret = firstFret;
function compareFirstFret(fing1, fing2) {
    let f1 = firstFret(fing1);
    let f2 = firstFret(fing2);
    return f1 - f2;
}
exports.compareFirstFret = compareFirstFret;
function hasRootOnBassString(fing) {
    return fing.map(f => f).reverse().slice(0, 3).filter(f => f.degree == 0).length > 0;
}
exports.hasRootOnBassString = hasRootOnBassString;
/*
function cmp(f1: Fingering, f2: Fingering): number {
    let b1 = hasRootOnBassString(f1);
    let b2 = hasRootOnBassString(f2);
    if (b1 == b2) {
        return 0
    } else if (b1) {
        return -1
    } else {
        return 1
    }
}
*/
/**
 * Checks if fingering has all degrees of a given chord
 * @param fing
 * @param chord
 * @returns true if fingering contains all degrees of given chord
 */
function allDegrees(fing, chord) {
    let degrees = fing.map(f => f.degree);
    if (chord.length > 3) {
        degrees = degrees.filter(d => d != 2); //skip musical 5-th degree
    }
    let uniq = [...new Set(degrees)];
    return uniq.length === 3;
}
exports.allDegrees = allDegrees;
function tuningFromString(str) {
    return str.split(" ").map(noteFromString).reverse();
}
exports.tuningFromString = tuningFromString;
function noteFromString(note) {
    for (let i = 0; i < exports.NOTE_NAMES.length; i++) {
        if (note == exports.NOTE_NAMES[i]) {
            return i;
        }
    }
    throw ("Unknown note " + note);
}
exports.noteFromString = noteFromString;
/*
Гитара: E A D G B E
Бас-гитара: E A D G
Укулеле: G C E A
Банджо: G D G B D
Мандолина: G G D D A A E E
Скрипка: G D A E
Альт: C G D A
Виолончель: C G D A
Контрабас: E A D G
*/ 
