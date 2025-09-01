import { program } from 'commander'
import { parseIntervalsInput } from './lib/input'

program
  .option('-i, --include [intervals]', 'intervals to include, JSON array')
  .option('-e, --exclude [intervals]', 'intervals to exclude, JSON array')

program.parse()

const options = program.opts()
const include = options.include
const exclude = options.exclude

console.log(include, exclude)

try {
  parseIntervalsInput(include)
} catch (error) {
  if (error instanceof Error) {
    console.error(error.message)
  } else {
    console.error(error)
  }
  process.exit(1)
}
