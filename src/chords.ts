export type Note = number
export type Chord = number[]
export type Tuning = number[]
export interface Fret {
    position: number
    note: Note
    degree: number
}
export type Fingering = Fret[]

export const C: Note = 0
export const D: Note = 2
export const E: Note = 4
export const F: Note = 5
export const G: Note = 7
export const A: Note = 9
export const B: Note = 11

export const NOTE_NAMES: string[] = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"]

export const MAX_FRET = 15
export const MAJOR: Chord = [0, 4, 7]
export const SIXTH: Chord = [0, 4, 7, 9]
export const SEVENTH: Chord = [0, 4, 7, 10]

export const MINOR: Chord = [0, 3, 7]
export const MINOR_SIXTH: Chord = [0, 3, 7, 9]
export const MINOR_SEVENTH: Chord = [0, 3, 7, 10]

export const STANDARD_GUITAR_TUNING: Tuning = [E, A, D, G, B, E].reverse()
export const OPEN_G_TUNING: Tuning = [D, G, D, G, B, D].reverse()
export const OPEN_G_MINOR_TUNING: Tuning = [D, G, D, G, 10, D].reverse()
export const UKULELE_TUNING : Tuning =  [G, C, E, A].reverse()

/**
 * Check if given note is in the chord
 * @param {note} note 
 * @param {chord} chord aray of notes
 * @returns index of found note, else returns -1
 */
export function degree(note: Note, chord: Chord): number {
    return chord.map(n => n % 12).indexOf(note % 12)
}

function cartesianProduct<T>(...allEntries: T[][]): T[][] {
    return allEntries.reduce<T[][]>(
        (results, entries) =>
            results
                .map(result => entries.map(entry => [...result, entry]))
                .reduce((subResults, result) => [...subResults, ...result], []),
        [[]]
    )
}

/**
 * Calculates note on the fretboard
 * @param stringNum string number
 * @param fretNumber fret number
 * @param tuning Tuning
 * @returns note on a given position
 */
export function note(stringNum: number, fretNumber: number, tuning: Tuning): Note {
    return (tuning[stringNum] + fretNumber) % 12
}

/**
 * Finds all frets on a certain string for a given chord and tuning.
 * @param stringNum string number
 * @param chord chord
 * @param tuning tuning
 * @returns list of all frets on a given string
 */
export function frets(stringNum: number, chord: Chord, tuning: Tuning): Fret[] {
    let res: Fret[] = []
    for (let i = 0; i < MAX_FRET; i++) {
        const n = note(stringNum, i, tuning)
        const d = degree(n, chord)
        if (d >= 0) {
            res.push({ position: i, note: n, degree: d })
        }
    }
    return res
}

/**
 * Calculates fingering length
 * @param fing fingering to calculate
 * @returns fingering length
 */
export function len(fing: Fingering): number {
    if (isOpenChord(fing)) {
        return 0;
    }
    const max = Math.max(...fing.map(p => p.position))
    const min = Math.min(...fing.map(p => p.position).filter(p => p != 0))
    return max - min + 1
}

export function fingerings(chord: Chord, tuning: Tuning, fingeringLength: number): Fingering[] {
    let pos = tuning.map((_, i) => frets(i, chord, tuning))
    let fings = cartesianProduct(...pos)
    return fings
        .filter(f => len(f) <= fingeringLength)
        .filter(f => allDegrees(f, chord))
        .filter(hasRootOnBassString)
        .sort(compareFirstFret)
}

export function fingerings0(chord: Chord, tuning: string, fingeringLength: number): Fingering[] {
    return fingerings(chord, tuningFromString(tuning), fingeringLength)
}

/**
 * @param fing Checks if given fingering is open string chord, like G in open G tuning
 * @returns true if chord is open string
 */
export function isOpenChord(fing : Fingering) : boolean {
    return fing.map(f => f.position).every(i => i == 0)
}

/**
 * Gives the first fret of fingering
 * @param fing 
 * @returns 
 */
export function firstFret(fing: Fingering): number {
    if (isOpenChord(fing)) {
        return 0;
    }
    return  Math.min(...fing.map(p => p.position).filter(p => p != 0))
}

export function compareFirstFret(fing1: Fingering, fing2: Fingering): number {
    let f1 = firstFret(fing1)
    let f2 = firstFret(fing2)
    return f1 - f2
}

export function hasRootOnBassString(fing: Fingering): boolean {
    return fing.map(f => f).reverse().slice(0, 3).filter(f => f.degree == 0).length > 0
}

/**
 * Checks if fingering has all degrees of a given chord. 
 * In seventh chord we can skip musical 5-th degree
 * @param fing 
 * @param chord 
 * @returns true if fingering contains all degrees of given chord
 */
export function allDegrees(fing: Fingering, chord: Chord): boolean {
    //Creating bit mask for all degrees
    const mask = fing.map(f => f.degree)
    .reduce((acc, i) => acc | (1 << i), 0)
    return chord.length == 3 ? mask == 7 : (mask | 4) == 15
}

export function tuningFromString(str : string) : Tuning {
    return str.split(" ").map(noteFromString).reverse();
}

export function noteFromString(note : string) : Note {
    const i = NOTE_NAMES.indexOf(note)
    if (i >= 0) {
        return i
    }
    throw ("Unknown note " + note)
}

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