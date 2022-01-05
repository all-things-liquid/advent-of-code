import { solutions, solved } from './solutions'
import logger from './logger'

function main() {
  try {
    for (let day = 1; day <= 25; day++) {
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
