import { day1 } from './1-sonar-sweep/sonar-sweep'
import { day2 } from './2-dive/dive'

type Solution = () => { part1: number; part2: number }

export const solutions: Record<number, Solution> = {
  1: day1,
  2: day2,
}

export function solved(day: number) {
  return solutions[day] !== undefined
}
