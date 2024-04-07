import {
    Fingering, 
    STANDARD_GUITAR_TUNING, 
    firstFret, 
    noteFromString, 
    tuningFromString,
    C, D, E, F, G, A, B
} from "../src/chords"

describe("Note from string", () => {
    test('C#', () => {
      const cdies = noteFromString("C#")
      expect(cdies).toBe(1);
    });

    test('D"', () => {
      const nd = noteFromString("D")
      expect(nd).toBe(2);
    });
})

describe("Tuning from string", () => {
    test("Standard tuning", () => {
        const tuning = tuningFromString("E A D G B E")
        expect(tuning).toStrictEqual([E, A, D, G, B, E].reverse())
    })
})

describe("First fret", () => {
    test("C chord in first position", () => {
        let fing : Fingering = [
            {position: 0, degree : 0, note : 0},
            {position: 1, degree : 0, note : 0},
            {position: 0, degree : 0, note : 0},
            {position: 2, degree : 0, note : 0},
            {position: 3, degree : 0, note : 0},
            {position: 0, degree : 0, note : 0}
        ]
        expect(firstFret(fing)).toBe(1)
    })

    test("G in open g tuning", () => {
        let fing : Fingering = [
            {position: 0, degree : 0, note : 0},
            {position: 0, degree : 0, note : 0},
            {position: 0, degree : 0, note : 0},
            {position: 0, degree : 0, note : 0},
            {position: 0, degree : 0, note : 0},
            {position: 0, degree : 0, note : 0}
        ]
        expect(firstFret(fing)).toBe(0)
    })
})

