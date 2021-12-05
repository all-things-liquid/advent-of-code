import { solutions, solved } from './solutions'
import logger from './logger'

function main() {
  try {
    const date = new Date()
    const today = date.getDate()

    for (let day = 1; day <= Math.min(today, 25); day++) {
      if (solved(day)) {
        const { part1, part2 } = solutions[day]()
        logger.info({ part1, part2 }, `Solution of day ${day}`)
      }
    }
  } catch (error) {
    logger.error(error)
  }
}
main()
