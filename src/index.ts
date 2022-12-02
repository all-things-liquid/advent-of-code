import { solutions as solutions2021, solved } from './2021/solutions'
import logger from './logger'

function getSolutionsOfYearX(year: number){
  switch(year){
    case 2021:
      return solutions2021
    default:
      throw new Error(`No solutions for year ${year}!`)
  }
}

function main(year: number) {
  const solutions = getSolutionsOfYearX(year)
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

main(2021)
