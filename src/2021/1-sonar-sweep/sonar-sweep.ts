import { readFileInput } from '../../data-extractor'

function extractData() {
  const file = readFileInput(1)
  return file.split('\n').map((el: string) => parseInt(el))
}

export function sonarSweepPartOne(depths: number[]): number {
  return depths.filter(
    (currentDepth, currentIndex) => currentDepth > depths[currentIndex - 1]
  ).length
}

export function sonarSweepPartTwo(depths: number[]) {
  const sumsOfThreee = depths
    .slice(0, -2)
    .map(
      (currentDepth, currentIndex) =>
        currentDepth + depths[currentIndex + 1] + depths[currentIndex + 2]
    )

  return sonarSweepPartOne(sumsOfThreee)
}

export function day1() {
  const input = extractData()
  const part1 = sonarSweepPartOne(input)
  const part2 = sonarSweepPartTwo(input)

  return { part1, part2 }
}
