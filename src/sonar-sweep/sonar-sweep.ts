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
