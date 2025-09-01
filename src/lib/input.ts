import { Interval } from '../core/types'

export function parseIntervalsInput(input: string | undefined): Interval[] | null | undefined {
  if (input === undefined || input === '') {
    return undefined
  }

  return []
}
