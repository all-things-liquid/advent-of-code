import { day1 } from './1-sonar-sweep/sonar-sweep'

type Solution = () => { part1: number; part2: number }

export const solutions: Record<number, Solution> = {
  1: day1,
}

export function solved(day: number) {
  return solutions[day] !== undefined
}
