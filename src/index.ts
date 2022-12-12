import logger from './logger'
import { getSolutions, getSolutionsFolder, parseDay, parseYear } from './global'

async function main(year: string, day: string) {
  try {
    const yearFolder = getSolutionsFolder(year)
    const solutions = await getSolutions(yearFolder)

    if (solutions[day]) {
      const { part1, part2 } = solutions[day]()
      logger.info({ part1, part2 }, `Solution for day ${day}`)
    } else {
      logger.info(`No solution for day ${day}`)
    }
  } catch (e) {
    logger.error(e)
  }
}

const year = parseYear(process.env.npm_config_aoc_y)
const day = parseDay(process.env.npm_config_aoc_d)
main(year, day).then(() => logger.info('Done'))
