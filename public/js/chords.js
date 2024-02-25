"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.allDegrees = exports.hasRootOnBassString = exports.compFirstFret = exports.firstFret = exports.fingerings = exports.len = exports.frets = exports.note = exports.degree = exports.UKULELE_TUNING = exports.OPEN_G_MINOR_TUNING = exports.OPEN_G_TUNING = exports.STANDARD_GUITAR_TUNING = exports.MINOR_SEVENTH = exports.MINOR_SIXTH = exports.MINOR = exports.SEVENTH = exports.SIXTH = exports.MAJOR = exports.MAX_FRET = exports.NOTE_NAMES = exports.B = exports.A = exports.G = exports.F = exports.E = exports.D = exports.C = void 0;
exports.C = 0;
exports.D = 2;
exports.E = 4;
exports.F = 5;
exports.G = 7;
exports.A = 9;
exports.B = 11;
exports.NOTE_NAMES = ["C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab", "A", "A#m, Bb", "B",];
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
        //.filter(f => f[4].position == 3)
        .sort(compFirstFret);
}
exports.fingerings = fingerings;
function firstFret(fing) {
    return Math.min(...fing.map(p => p.position).filter(p => p != 0));
}
exports.firstFret = firstFret;
function compFirstFret(fing1, fing2) {
    let f1 = firstFret(fing1);
    let f2 = firstFret(fing2);
    return f1 - f2;
}
exports.compFirstFret = compFirstFret;
function hasRootOnBassString(fing) {
    return fing.map(f => f).reverse().slice(0, 3).filter(f => f.degree == 0).length > 0;
}
exports.hasRootOnBassString = hasRootOnBassString;
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
    let uniq = [...new Set(fing.map(p => p.note % 12))];
    return uniq.length === chord.length;
}
exports.allDegrees = allDegrees;
