import { Interval } from '../core/types'

const ERROR_INVALID_ARRAY = 'is not a valid JSON array'
const ERROR_INVALID_INTERVAL = 'is not a valid interval'

const getInvalidArrayError = (input: string): string => `"${input}" ${ERROR_INVALID_ARRAY}`

function isValidInterval(interval: unknown): boolean {
  if (!Array.isArray(interval) || interval.length !== 2) {
    return false
  }
  const [start, end] = interval

  if (typeof start !== 'number' || typeof end !== 'number') {
    return false
  }

  if (start > Number.MAX_SAFE_INTEGER || end > Number.MAX_SAFE_INTEGER) {
    return false
  }

  if (start > end) {
    return false
  }

  return true
}

export function parseIntervalsInput(input: string | undefined): Interval[] | null | undefined {
  if (input === undefined || input === '') {
    return undefined
  }

  let parsed: unknown
  try {
    parsed = JSON.parse(input)
  } catch {
    throw new Error(getInvalidArrayError(input))
  }

  if (parsed === null) {
    return null
  }

  if (!Array.isArray(parsed)) {
    throw new Error(getInvalidArrayError(input))
  }

  parsed.forEach(interval => {
    if (!isValidInterval(interval)) {
      throw new Error(`${JSON.stringify(interval)} ${ERROR_INVALID_INTERVAL}`)
    }
  })

  return parsed
}
