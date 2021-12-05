import { readFileSync } from 'fs'

export function extractData(day: number): number[] {
  const file = readFileSync(`${process.cwd()}/src/input/${day}.txt`, 'utf-8')
  return file.split('\n').map((el: string) => parseInt(el))
}
