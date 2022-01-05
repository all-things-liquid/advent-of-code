import { day1 } from './1-sonar-sweep/sonar-sweep'
import { day2 } from './2-dive/dive'
import { day3 } from './3-binary-diagnostic/binary-diagnostic'
import { day4 } from './4-giant-squid/giant-squid'
import { day5 } from './5-hydrothermal-venture/hydrothermal-venture'
import { day6 } from './6-lanternfish/lanternfish'

type Solution = () => { part1: number; part2: number }

export const solutions: Record<number, Solution> = {
  1: day1,
  2: day2,
  3: day3,
  4: day4,
  5: day5,
  6: day6,
}

export function solved(day: number) {
  return solutions[day] !== undefined
}
