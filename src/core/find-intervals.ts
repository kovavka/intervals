import { Interval } from './types'

type IntervalEvent = {
  type: 'include-start' | 'include-end' | 'exclude-start' | 'exclude-end'
  value: number
}

export function findIntervals(
  includes?: Interval[],
  excludes?: Interval[] | undefined
): Interval[] {
  if (includes === undefined || includes.length === 0) return []

  const allEvents: IntervalEvent[] = []
  includes.forEach(([start, end]) => {
    allEvents.push({
      type: 'include-start',
      value: start,
    })
    allEvents.push({
      type: 'include-end',
      // making interval's end non-inclusive, so it works in the case when we have 2 touching intervals
      value: end,
    })
  })

  excludes?.forEach(([start, end]) => {
    allEvents.push({
      type: 'exclude-start',
      value: start,
    })
    allEvents.push({
      type: 'exclude-end',
      // making interval's end non-inclusive
      value: end + 1,
    })
  })

  const sortedEvents = allEvents.sort((a, b) => a.value - b.value)

  const result: Interval[] = []

  let includesOpenCount = 0
  let includesStart: number | null = null

  let excludesOpenCount = 0

  sortedEvents.forEach(({ type, value }) => {
    switch (type) {
      case 'include-start':
        if (includesOpenCount === 0) {
          if (excludesOpenCount === 0) {
            // otherwise it will be excluded
            includesStart = value
          }
        }
        includesOpenCount++
        break
      case 'include-end':
        if (includesOpenCount === 1 && excludesOpenCount === 0 && includesStart !== null) {
          // save only when it's the last pending interval
          result.push([includesStart, value - 1]) // -1 since the end is non-inclusive
        }
        includesOpenCount--
        break
      case 'exclude-start':
        if (includesOpenCount !== 0 && includesStart !== null) {
          if (includesStart !== value) {
            // otherwise it should be excluded as well
            result.push([includesStart, value - 1])
          }
          includesStart = null
        }
        excludesOpenCount++
        break
      case 'exclude-end':
        if (includesOpenCount !== 0 && excludesOpenCount === 1) {
          // since the end is non-inclusive, we can start interval with the same value
          includesStart = value
        }
        excludesOpenCount--
        break
    }
  })

  return result
}
