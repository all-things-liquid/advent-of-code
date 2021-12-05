import { readFileSync } from 'fs'

export function readFileInput(day: number): string {
  const file = readFileSync(`${process.cwd()}/src/input/${day}.txt`, 'utf-8')
  return file
}
