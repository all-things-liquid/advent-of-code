import { Dirent, readdirSync } from 'fs'
import { join } from 'path'

export const DEFAULT_YEAR = new Date().getFullYear().toString()
export const DEFAULT_DAY = new Date().getDay().toString()
export const SOLUTIONS_FILENAME = 'solutions.ts'

export type FileSystemEntity = {
  name: string
  path: string
}

function isSolutionsFile(entity: Dirent) {
  return entity.isFile() && entity.name === SOLUTIONS_FILENAME
}

export function parseYear(arg?: string) {
  const year = arg?.match(/^201[5-9]$|^20[2-9]\d$/)
  return (year && year[0]) ?? DEFAULT_YEAR
}

export function parseDay(arg?: string) {
  const day = arg?.match(/^(1?\d)$|^2[0-4]$/)
  return (day && day[0]) ?? DEFAULT_DAY
}

export function getSolutionsFolder(year: string): FileSystemEntity {
  const solutionFolders = readdirSync(__dirname, { withFileTypes: true })
    .filter((entity) => entity.isDirectory() && entity.name === year)
    .map((directory) => {
      return { name: directory.name, path: join(__dirname, directory.name) }
    })

  if (!solutionFolders || solutionFolders.length === 0) {
    throw new Error(
      `No solutions found for year ${year}. Try to solve some problems first!`
    )
  }
  return solutionFolders.pop() as FileSystemEntity
}

export async function getSolutions(folder: FileSystemEntity) {
  const file = readdirSync(folder.path, { withFileTypes: true })
    .filter(isSolutionsFile)
    .map((file) => {
      return { file: file.name, path: join(folder.path, file.name) }
    })
    ?.pop()

  if (!file) {
    throw new Error(
      `No solutions file found for year ${folder.name}. Try to run "npm run build --year=${folder.name}" first`
    )
  }

  return (await import(file.path)).default
}
