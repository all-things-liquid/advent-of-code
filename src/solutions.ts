import { day1 } from './1-sonar-sweep/sonar-sweep'
import { day2 } from './2-dive/dive'
import { day3 } from './3-binary-diagnostic/binary-diagnostic'

type Solution = () => { part1: number; part2: number }

export const solutions: Record<number, Solution> = {
  1: day1,
  2: day2,
  3: day3,
}

export function solved(day: number) {
  return solutions[day] !== undefined
}
