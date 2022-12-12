function extractData(file: string) {
  return file.split('\n').map((el: string) => parseInt(el))
}

export function sonarSweepPartOne(depths: number[]): number {
  return depths.filter(
    (currentDepth, currentIndex) => currentDepth > depths[currentIndex - 1]
  ).length
}

export function sonarSweepPartTwo(depths: number[]) {
  const sumsOfThree = depths
    .slice(0, -2)
    .map(
      (currentDepth, currentIndex) =>
        currentDepth + depths[currentIndex + 1] + depths[currentIndex + 2]
    )

  return sonarSweepPartOne(sumsOfThree)
}

export default function solve(str: string) {
  const input = extractData(str)
  const part1 = sonarSweepPartOne(input)
  const part2 = sonarSweepPartTwo(input)

  return { part1, part2 }
}
