import {Fingering, firstFret} from "./chords"

const SVG_NS = "http://www.w3.org/2000/svg" //svg namespace
const X0 = 40
const Y0 = 40
const DX = 50
const DY = 20
const STRING_THICK = [1, 1, 2, 2, 2, 3, 4, 4]
const DEGREE_COLOURS = ["green", "blue", "indigo", "violet"]

function hLine(x:number, y:number, len:number, width:number) : Element {
    let line = document.createElementNS(SVG_NS, "line");
    line.setAttribute("x1", String(x))
    line.setAttribute("y1", String(y))
    line.setAttribute("x2", String(x + len))
    line.setAttribute("y2", String(y))
    line.setAttribute("stroke", "black")
    line.setAttribute("stroke-width", String(width))
    return line
}

function vLine(x:number, y:number, len:number) : Element {
    let line = document.createElementNS(SVG_NS, "line");
    line.setAttribute("x1", String(x))
    line.setAttribute("y1", String(y))
    line.setAttribute("x2", String(x))
    line.setAttribute("y2", String(y + len))
    line.setAttribute("stroke", "black")
    //line.setAttribute("stroke-width", width)
    return line
}

function circle(x:number, y:number, r:number, colour : string) : Element {
    let circ = document.createElementNS(SVG_NS, "circle");
    circ.setAttribute("cx", x.toString())
    circ.setAttribute("cy", y.toString())
    circ.setAttribute("r", r.toString())
    circ.setAttribute("stroke", "black")
    circ.setAttribute("stroke-width", "1")
    circ.setAttribute("fill", colour)
    return circ
}

function drawString(stringNumber:number, numOfFrets : number) : Element {
    return hLine(X0, Y0 + DY * stringNumber, DX * numOfFrets, STRING_THICK[stringNumber])
}

function drawFret(fretNumber:number, numberOfStrings : number) :Element {
    return vLine(X0 + DX * fretNumber, Y0, DY * (numberOfStrings - 1))
}

function press(stringNum:number, fretNum: number, colour : string) : Element {
    if (fretNum === 0) {
        return circle(X0 + DX * fretNum - DX / 4, Y0 + DY * stringNum, 5, colour)
    } else {
        return circle(X0 + DX * fretNum - DX / 2, Y0 + DY * stringNum, 5, colour)
    }
}

function text(x:number, y:number, text:string) : Element {
    let text0 = document.createElementNS(SVG_NS, "text");
    text0.setAttribute("y", String(y))
    text0.setAttribute("x", String(x))
    text0.setAttribute("fill", "black")
    text0.textContent = text
    return text0
}

// export function drawFingering(fing : Fingering) : Element {
//     let svg = drawNeck(fing.length, 15, 1)
//     fing.forEach( (fret, i) => {
//         svg.appendChild(press(i, fret.position, DEGREE_COLOURS[fret.degree]))
//     })
//     return svg
// }

export function drawFingering4(fing : Fingering) : Element {
    const first = firstFret(fing)
    let svg = drawNeck(fing.length, 4, first)
    fing.forEach( (fret, i) => {
        let pos = fret.position == 0 ? 0 : fret.position - first + 1;
        svg.appendChild(press(i, pos, DEGREE_COLOURS[fret.degree]))
    })
    return svg
}

function drawNeck(numOfStrings:number, numOfFrets : number, firstFretNumber : number) : Element {
    let svg = document.createElementNS(SVG_NS, "svg");
    const width = X0 + DX * numOfFrets
    const height = Y0 + DY * numOfStrings
    svg.setAttribute("width", width.toString())
    svg.setAttribute("height", height.toString())

    for (let i = 0; i < numOfStrings; i++) {
        svg.appendChild(drawString(i, numOfFrets))
    }
    for (let i = 0; i < numOfFrets; i++) {
        svg.appendChild(drawFret(i, numOfStrings))
    }
    for (let i = 0; i < numOfFrets; i++) {
        svg.appendChild(text(X0 + DX * i + DX / 2, Y0 + DY * numOfStrings, String(i + firstFretNumber)))
    }
    return svg
}
