import { extractData } from './data-extractor'
import logger from './logger'
import { sonarSweepPartOne, sonarSweepPartTwo } from './sonar-sweep/sonar-sweep'

function main() {
  try {
    const input = extractData(1)
    const res1 = sonarSweepPartOne(input)
    const res2 = sonarSweepPartTwo(input)
    logger.info({ res1, res2 })
  } catch (error) {
    logger.error(error)
  }
}
main()
