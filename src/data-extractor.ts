import { readFileSync } from 'fs'

export function readFileInput(day: number, year: number = 2021): string {
  return readFileSync(`${process.cwd()}/src/${year}/input/${day}.txt`, 'utf-8')
}
