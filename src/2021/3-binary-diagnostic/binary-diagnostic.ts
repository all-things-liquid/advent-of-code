import { readFileInput } from '../../data-extractor'

function extractData() {
  const file = readFileInput(3)
    return file.split('\n')
}

function str2num(str: string) {
  return Array.from(str).map((el) => Number(el))
}

function bool2num(b: boolean): number {
  // Double bitwise NOT converts a true|false value into 1|0
  return ~~b
}

function bin2dec(bin: number[]) {
  return parseInt(bin.join(''), 2)
}

function computeRates(numbers: number[], nbEntries: number) {
  const gamma: number[] = []
  const epsilon: number[] = []

  numbers.map((n) => {
    const hasMoreOnes = n > nbEntries / 2
    gamma.push(bool2num(hasMoreOnes))
    epsilon.push(bool2num(!hasMoreOnes))
  })

  return { gamma, epsilon }
}

function sumByColumn(numbers: string[]) {
  const columns = str2num(numbers[0])

  return columns.map((_, i) =>
    numbers.reduce((acc, number) => acc + Number(number[i]), 0)
  )
}

function filter(
  arr: string[],
  colIndex: number,
  criterion: (n: number, arr: string[]) => boolean
): string {
  if (colIndex > arr[0].length) {
    throw new Error('No single number matches the criteria')
  }

  if (arr.length === 1) {
    return arr.pop() as string
  }

  const n = arr.reduce((acc, number) => acc + Number(number[colIndex]), 0)

  const filtered = arr.filter(
    (el) => Number(el[colIndex]) === bool2num(criterion(n, arr))
  )
  return filter(filtered, colIndex + 1, criterion)
}

export function binaryDiagnosticPartOne(data: string[]): number {
  const nbEntries = data.length
  const { gamma, epsilon } = computeRates(sumByColumn(data), nbEntries)

  return bin2dec(gamma) * bin2dec(epsilon)
}

export function binaryDiagnosticPartTwo(data: string[]): number {
  const isMajority = (n: number, arr: string[]) => n >= arr.length / 2
  const isMinority = (n: number, arr: string[]) => n < arr.length / 2

  const o2Rating = str2num(filter(data, 0, isMajority))
  const co2Rating = str2num(filter(data, 0, isMinority))

  return bin2dec(o2Rating) * bin2dec(co2Rating)
}

export function day3() {
  const input = extractData()
  const part1 = binaryDiagnosticPartOne(input)
  const part2 = binaryDiagnosticPartTwo(input)

  return { part1, part2 }
}
