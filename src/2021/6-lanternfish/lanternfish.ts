import { readFileInput } from '../../data-extractor'

function extractData() {
  const line = readFileInput(6)
  return line.split(',').map((e) => Number(e))
}

function simulateGrowth(days: number, init: number[]) {
  let next: number[] = []
  let current = init
  const pop: number[] = []

  for (let day = 0; day < days; day++) {
    let spawn: number[] = []

    next = current.map((f) => {
      if (f === 0) {
        spawn.push(8)
        return 6
      }
      return f - 1
    })
    current = next.concat(spawn)
    pop.push(current.length)
  }
  return current
}

function initPopulation(init: number[]) {
  const pop: number[] = Array(9).fill(0)
  init.map((n) => pop[n]++)

  return pop
}

function calculatePopulation(days: number, population: number[]) {
  for (let day = 1; day <= days; day++) {
    const spawn = population.shift() as number
    population.push(spawn)
    population[6] += spawn
  }
  return population.reduce((acc, n) => (acc += n))
}

export function lanternfishPartOne(data: number[]) {
  const res = simulateGrowth(80, data)
  return res.length
}

export function lanternfishPartTwo(data: number[]) {
  const pop = initPopulation(data)
  return calculatePopulation(256, pop)
}

export default function solve() {
  const data = extractData()
  const part1 = lanternfishPartOne(data)
  const part2 = lanternfishPartTwo(data)
  return { part1, part2 }
}
