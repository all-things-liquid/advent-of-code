import { readdirSync, writeFileSync } from 'fs'
import { join, parse } from 'path'
import logger from './logger'
import { parseYear, SOLUTIONS_FILENAME } from './global'

function listProblemDirectories(yearFolder: string) {
  return readdirSync(yearFolder)
    .filter((d) => d.match(/^(\d)/))
    .map((d) => {
      return {
        day: parseInt(d[0]),
        year: yearFolder,
        path: join(yearFolder, d),
      }
    })
}

function getFunctionsFile(problemFolder: string) {
  return readdirSync(problemFolder)
    .filter((f) => f.match(/^[a-z-]+\.ts/))
    .map((f) => join(problemFolder, f))
    .pop() as string
}

async function build(year: string): Promise<string> {
  const yearFolder = join(__dirname, year)
  const solutions = []
  const imports = []

  for (const { day, path } of listProblemDirectories(yearFolder)) {
    const file = getFunctionsFile(path)
    const defaultFunction = (await import(file)).default
    const { dir: d, name: f } = parse(file)
    const defaultImport = `day${day}`
    if (defaultFunction) {
      imports.push(`import ${defaultImport} from "${d}/${f}"`)
      solutions.push(`${day}: ${defaultImport}`)
    }
  }
  const exports = `export default {${solutions.join(',')}}`
  const outputPath = join(__dirname, year, SOLUTIONS_FILENAME)

  writeFileSync(outputPath, imports.concat(['\n'], exports).join('\n'))
  return outputPath
}

const year = parseYear(process.argv[2])
build(year).then((path: string) => logger.info({ year, path }, 'Build done'))
