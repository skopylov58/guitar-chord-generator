import { fingerings0, firstFret } from "./chords"
import { drawFingering4 } from "./svg"

function showChord() {
    let root = Number(getSelection("rootNote"))
    console.log("Root ${root}")

    let chord = getSelection("chord").split(",").map(i => Number(i))
    console.log("Chord ${chord}")
    chord = chord.map(i => (i + root) % 12)

    let boards = document.getElementById("boards")
    while (boards.firstChild) {
        boards.removeChild(boards.firstChild);
    }

    let tuningOpt = getSelection("tuning")
    let length = getSelection("length")

    let f = fingerings0(chord, tuningOpt, Number(length))
    f.forEach(fing => {
        let svg = drawFingering4(fing)
        boards.appendChild(svg)
    });
    return false;
}

function getSelection(id : string) : string {
    return (document.getElementById(id) as HTMLSelectElement).value
}

function init() {
    let searchButton = document.getElementById("search")
    searchButton.onclick = showChord
}

init()
