import {Fingering, firstFret} from "./chords"

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

function test1() {
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

test1()




