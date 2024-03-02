import {Fingering, STANDARD_GUITAR_TUNING, firstFret, noteFromString, tuningFromString} from "./chords"

function assert1(cond : boolean) : void {
    if (!cond) {
        throw ("")
    }
}

function assert2(cond : boolean, msg : string) : void {
    if (!cond) {
        throw (msg)
    }
}

function arraysAreEquals(a : number[], b : number[]) : boolean {
    if (a.length != b.length) return false;
    for (let i = 0; i < a.length; i++) {
        if (a[i] != b[i]) return false
    }
    return true;
}

function testFirstFret() {
    let arr = [0, 1, 0, 2, 3, 0]
    let min = Math.min(... arr.filter(i => i != 0))
    assert2 (min == 1, 'expecting min 1')

    //C major fingering
    let fing : Fingering = [
        {position: 0, degree : 0, note : 0},
        {position: 1, degree : 0, note : 0},
        {position: 0, degree : 0, note : 0},
        {position: 2, degree : 0, note : 0},
        {position: 3, degree : 0, note : 0},
        {position: 0, degree : 0, note : 0}
    ]
    let first = firstFret(fing)
    assert1(first == 1)

    //Open G fingering
     fing = [
        {position: 0, degree : 0, note : 0},
        {position: 0, degree : 0, note : 0},
        {position: 0, degree : 0, note : 0},
        {position: 0, degree : 0, note : 0},
        {position: 0, degree : 0, note : 0},
        {position: 0, degree : 0, note : 0}
    ]
    first = firstFret(fing)
    assert1(first == 0)
}

function testNoteFromString() : void {
    const nc = noteFromString("C")
    assert1(nc == 0)

    const nd = noteFromString("D")
    assert1(nd == 2)

    // const cdies = noteFromString("C#")
    // assert1(cdies == 1)
}

function testTuningFromSting() {
    const tuning = tuningFromString("E A D G B E")
    assert1(arraysAreEquals(tuning, STANDARD_GUITAR_TUNING))
}

testFirstFret();
testNoteFromString()
testTuningFromSting()



