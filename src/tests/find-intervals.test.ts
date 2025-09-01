import { findIntervals } from '../core/find-intervals'

describe('Find intervals', () => {
  describe('No included intervals', () => {
    it('Should return empty array when includes is empty', () => {
      expect(findIntervals([], [[1, 5]])).toEqual([])
    })
    it('Should return empty array when includes is undefined', () => {
      expect(findIntervals(undefined, [[1, 5]])).toEqual([])
    })
    it('Should return empty array when includes and excludes are undefined', () => {
      expect(findIntervals(undefined, undefined)).toEqual([])
    })
  })

  describe('No excluded intervals', () => {
    it('Should return the same interval when excludes is empty', () => {
      expect(findIntervals([[1, 5]], [])).toEqual([[1, 5]])
    })
    it('Should return the same interval when excludes is undefined', () => {
      expect(findIntervals([[1, 5]], undefined)).toEqual([[1, 5]])
    })
  })

  it('Should return intervals in a sorted order', () => {
    expect(
      findIntervals([
        [10, 50],
        [1, 6],
      ])
    ).toEqual([
      [1, 6],
      [10, 50],
    ])
  })

  it('Should concat intersecting intervals', () => {
    expect(
      findIntervals([
        [50, 5000],
        [10, 100],
      ])
    ).toEqual([[10, 5000]])
  })

  describe('Should return the same interval when excludes is not overlapping with includes', () => {
    it('When excludes is to the right of includes', () => {
      expect(findIntervals([[10, 20]], [[30, 50]])).toEqual([[10, 20]])
    })
    it('When excludes is to the left of includes', () => {
      expect(findIntervals([[10, 20]], [[1, 8]])).toEqual([[10, 20]])
    })
  })

  describe('Should return one interval when excluded interval is intersecting with included', () => {
    it('When intersection is on the right', () => {
      expect(findIntervals([[10, 100]], [[80, 150]])).toEqual([[10, 79]])
    })
    it('When intersection is on the left', () => {
      expect(findIntervals([[20, 100]], [[1, 50]])).toEqual([[51, 100]])
    })
  })

  describe('Should return empty array when everything is excluded', () => {
    it('When excluded interval is the same as included', () => {
      expect(findIntervals([[1, 10]], [[1, 10]])).toEqual([])
    })
    it('When included interval is a subsegment of excluded', () => {
      expect(findIntervals([[10, 50]], [[1, 100]])).toEqual([])
    })
    it('When included interval is a subsegment of several overlapping excluded intervals', () => {
      expect(
        findIntervals(
          [[10, 50]],
          [
            [1, 20],
            [30, 50],
            [15, 32],
          ]
        )
      ).toEqual([])
    })
  })

  it('Should return two intervals when excluded interval is a subsegment of included', () => {
    expect(findIntervals([[10, 100]], [[20, 30]])).toEqual([
      [10, 19],
      [31, 100],
    ])
  })

  it('Should exclude a segment from both intervals when excluded interval is intersecting with two non-overlapping intervals', () => {
    expect(
      findIntervals(
        [
          [200, 300],
          [50, 150],
        ],
        [[95, 205]]
      )
    ).toEqual([
      [50, 94],
      [206, 300],
    ])
  })

  it('Should return two intervals when excluded interval is intersecting with two overlapping interval', () => {
    expect(
      findIntervals(
        [
          [10, 50],
          [30, 100],
        ],
        [[20, 40]]
      )
    ).toEqual([
      [10, 19],
      [41, 100],
    ])
  })

  it('Should exclude the biggest interval when one excluded interval is a subsegment of the other', () => {
    expect(
      findIntervals(
        [
          [200, 300],
          [10, 100],
          [400, 500],
        ],
        [
          [410, 420],
          [95, 205],
          [100, 150],
        ]
      )
    ).toEqual([
      [10, 94],
      [206, 300],
      [400, 409],
      [421, 500],
    ])
  })

  it('Should return an interval of length one when the rest is excluded', () => {
    expect(findIntervals([[10, 100]], [[11, 100]])).toEqual([[10, 10]])
  })

  it('Should support negative numbers', () => {
    expect(findIntervals([[-100, -10]], [[-200, -50]])).toEqual([[-49, -10]])
  })

  it('Should support negative-positive intervals', () => {
    expect(findIntervals([[-100, 100]], [[-50, 20]])).toEqual([
      [-100, -51],
      [21, 100],
    ])
  })
})
