import {Fret, MAX_FRET, NOTE_NAMES, Note, Chord, Tuning, Fingering, C, SEVENTH, STANDARD_GUITAR_TUNING, fingerings} from "./chords"

const EMPTY: string = "---|"
const ROOT: string = "-0-|"
const NONROOT: string = "-o-|"
const NUMBERINGS = "=0===1===2===3===4===5===6===7===8===9===10==11==12==\n";

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