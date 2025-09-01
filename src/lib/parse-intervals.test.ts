import { parseIntervalsInput } from './input'

describe('Parse intervals input', () => {
  describe('Should return undefined', () => {
    it('When input is an empty string', () => {
      expect(parseIntervalsInput('')).toEqual(undefined)
    })
    it('When input is undefined', () => {
      expect(parseIntervalsInput(undefined)).toEqual(undefined)
    })
  })

  describe('Should return null', () => {
    it('When input is null JSON', () => {
      expect(parseIntervalsInput('null')).toEqual(null)
    })
  })

  describe('Should return empty array', () => {
    it('When input is empty array JSON', () => {
      expect(parseIntervalsInput('[]')).toEqual([])
    })
  })

  describe('Should throw an error', () => {
    describe('Invalid JSON', () => {
      it('When input is not a valid JSON', () => {
        expect(() => parseIntervalsInput('{')).toThrow('"{" is not a valid JSON array')
      })
      it('When input is not an JSON array', () => {
        expect(() => parseIntervalsInput('{}')).toThrow('"{}" is not a valid JSON array')
      })
      it('When input is not an JSON array', () => {
        expect(() => parseIntervalsInput('5')).toThrow('"5" is not a valid JSON array')
      })
    })

    describe('Invalid interval', () => {
      it('When interval is not an array', () => {
        expect(() => parseIntervalsInput('[[1, 2], 1]')).toThrow('1 is not a valid interval')
      })
      it('When interval is empty array', () => {
        expect(() => parseIntervalsInput('[[1, 2], []]')).toThrow('[] is not a valid interval')
      })
      it("When at least one of the arrays' length is not 2", () => {
        expect(() => parseIntervalsInput('[[2, 4, 3]]')).toThrow(
          '[2,4,3] is not a valid interval'
        )
      })
      it('When interval contains string value', () => {
        expect(() => parseIntervalsInput('[[1, "2"]]')).toThrow(
          '[1,"2"] is not a valid interval'
        )
      })
      it('When interval contains boolean value', () => {
        expect(() => parseIntervalsInput('[[1, true]]')).toThrow(
          '[1,true] is not a valid interval'
        )
      })
      it('When interval contains null', () => {
        expect(() => parseIntervalsInput('[[1, null]]')).toThrow(
          '[1,null] is not a valid interval'
        )
      })
      it('When interval contains an object', () => {
        expect(() => parseIntervalsInput('[[1, {}]]')).toThrow('[1,{}] is not a valid interval')
      })
      it('When interval value is bigger than safe integer', () => {
        expect(() =>
          parseIntervalsInput('[[1, 923939920390329023902390239032902390]]')
        ).toThrow('[1,9.23939920390329e+35] is not a valid interval')
      })
      it("When interval's end is less than start", () => {
        expect(() => parseIntervalsInput('[[5, 2]]')).toThrow('[5,2] is not a valid interval')
      })
    })
  })

  describe('Should return an array of provided intervals', () => {
    it('When JSON array contains one correct interval', () => {
      expect(parseIntervalsInput('[[1, 2]]')).toEqual([[1, 2]])
    })
    it('When JSON array contains several correct intervals', () => {
      expect(parseIntervalsInput('[[1, 2], [6, 10]]')).toEqual([
        [1, 2],
        [6, 10],
      ])
    })
    it('When intervals contain negative numbers or zero', () => {
      expect(parseIntervalsInput('[[-10, -1], [0, 1]]')).toEqual([
        [-10, -1],
        [0, 1],
      ])
    })
    it('When one of the intervals is of length one', () => {
      expect(parseIntervalsInput('[[1, 1]]')).toEqual([[1, 1]])
    })
  })
})
