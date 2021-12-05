import logger from './logger'

function main() {
  try {
    logger.info('Hello world!')
  } catch (error) {
    logger.error(error)
  }
}
main()
