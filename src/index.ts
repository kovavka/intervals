import { program } from 'commander'
import { parseIntervalsInput } from './lib/input-parser'
import { findIntervals } from './core/find-intervals'
import { Interval } from './core/types'

program
  .option('-i, --include [intervals]', 'intervals to include, JSON array')
  .option('-e, --exclude [intervals]', 'intervals to exclude, JSON array')

program.parse()

const options = program.opts()

let includedIntervals: Interval[] | undefined | null
let excludedIntervals: Interval[] | undefined | null

try {
  includedIntervals = parseIntervalsInput(options.include)
  excludedIntervals = parseIntervalsInput(options.exclude)
} catch (error) {
  if (error instanceof Error) {
    console.error(error.message)
  } else {
    console.error(error)
  }
  process.exit(1)
}

console.log('Non overlapping intervals:')
const result = findIntervals(includedIntervals, excludedIntervals)
console.log(result)
