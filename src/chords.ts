type Note = number
type Chord = number[]
type Tuning = number[]
interface Fret {
    position: number
    note: Note
    degree: number
}
type Fingering = Fret[]

const C: Note = 0
const D: Note = 2
const E: Note = 4
const F: Note = 5
const G: Note = 7
const A: Note = 9
const B: Note = 11

const NOTE_NAMES: string[] = ["C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab", "A", "A#m, Bb", "B",]

const MAX_FRET = 15
const MAJOR: Chord = [0, 4, 7]
const SIXTH: Chord = [0, 4, 7, 9]
const SEVENTH: Chord = [0, 4, 7, 10]

const MINOR: Chord = [0, 3, 7]
const MINOR_SIXTH: Chord = [0, 3, 7, 9]
const MINOR_SEVENTH: Chord = [0, 3, 7, 10]

const STANDARD_GUITAR_TUNING: Tuning = [E, A, D, G, B, E].reverse()
const OPEN_G_TUNING: Tuning = [D, G, D, G, B, D].reverse()
const OPEN_G_MINOR_TUNING: Tuning = [D, G, D, G, 10, D].reverse()

const EMPTY: string = "---|"
const ROOT: string = "-0-|"
const NONROOT: string = "-o-|"
const NUMBERINGS = "=0===1===2===3===4===5===6===7===8===9===10==11==12==\n";

/**
 * Check if given note is in the chord
 * @param {note} note 
 * @param {chord} chord aray of notes
 * @returns index of found note, else returns -1
 */
function degree(note: Note, chord: Chord): number {
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
function note(stringNum: number, fretNumber: number, tuning: Tuning): Note {
    return (tuning[stringNum] + fretNumber) % 12
}

/**
 * Finds all frets on a certain string for a given chord and tuning.
 * @param stringNum string number
 * @param chord chord
 * @param tuning tuning
 * @returns list of all frets on a given string
 */
function frets(stringNum: number, chord: Chord, tuning: Tuning): Fret[] {
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
 * @param fing Calculates
 * @returns 
 */
function len(fing: Fingering): number {
    const max = Math.max(...fing.map(p => p.position))
    const min = Math.min(...fing.map(p => p.position).filter(p => p != 0))
    return max - min + 1
}


function fingerings(chord: Chord, tuning: Tuning, fingeringLength: number): Fingering[] {
    let pos = tuning.map((_, i) => frets(i, chord, tuning))
    let fings = cartesianProduct(...pos)
    return fings
    .filter(f => len(f) <= fingeringLength)
    .filter(f => allDegrees(f, chord))
    .filter(hasRootOnBassString)
    //.filter(f => f[4].position == 3)
    .sort(compFirstFret)
}

function firstFret(fing : Fingering) : number {
    return  Math.min(...fing.map(p => p.position).filter(p => p != 0))
}

function compFirstFret(fing1 : Fingering, fing2 : Fingering) : number {
    let f1 = firstFret(fing1)
    let f2 = firstFret(fing2)
    return f1 - f2
}

function hasRootOnBassString(fing : Fingering) : boolean {
    return fing.map(f => f).reverse().slice(0,3).filter(f => f.degree == 0).length > 0
}

function cmp(f1 : Fingering, f2 : Fingering) : number {
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

/**
 * Checks if fingering has all degrees of a given chord
 * @param fing 
 * @param chord 
 * @returns true if fingering contains all degrees of given chord
 */
function allDegrees(fing: Fingering, chord: Chord): boolean {
    let uniq = [... new Set(fing.map(p => p.note % 12))]
    return uniq.length === chord.length
}

function displayFret(fret: Fret): string {
    const pos = fret.position
    const s = fret.degree === 0 ? ROOT : NONROOT
    return EMPTY.repeat(pos) + s + EMPTY.repeat(MAX_FRET - pos) + " " + NOTE_NAMES[fret.note]
}

function displayFrets(frets: Fret[]): void {
    frets.forEach(p => {
        console.log(displayFret(p))
    })
    console.log(NUMBERINGS)
}

function main(roteNote: Note, chord: Chord, tuning: Tuning, fingLength: number): void {
    chord = chord.map(n => n + roteNote)
    let fing: Fingering[] = fingerings(chord, tuning, fingLength)

    fing.forEach(f => {
        displayFrets(f)
    });
    console.log("Total chords: " + fing.length)
}

main(C, SEVENTH, STANDARD_GUITAR_TUNING, 3)