import { readFileInput } from '../data-extractor'

// export enum Direction {
//   FORWARD = 'forward',
//   UP = 'up',
//   DOWN = 'down',
// }

export type Direction = 'forward' | 'up' | 'down'

function extractData() {
  const file = readFileInput(2)
  return file.split('\n').map((command: string) => {
    const [direction, amount] = command.split(' ')
    return { direction: direction as Direction, amount: parseInt(amount) }
  })
}

export function divePartOne(
  data: { direction: Direction; amount: number }[]
): number {
  let [horizontalPos, depth] = [0, 0]

  for (const command of data) {
    switch (command.direction) {
      case 'forward':
        horizontalPos += command.amount
        break
      case 'down':
        depth += command.amount
        break
      case 'up':
        depth -= command.amount
    }
  }
  return depth * horizontalPos
}

export function divePartTwo(
  data: { direction: Direction; amount: number }[]
): number {
  let [horizontalPos, depth, aim] = [0, 0, 0]

  for (const command of data) {
    switch (command.direction) {
      case 'forward':
        horizontalPos += command.amount
        depth += aim * command.amount
        break
      case 'down':
        aim += command.amount
        break
      case 'up':
        aim -= command.amount
    }
  }
  return horizontalPos * depth
}

export function day2() {
  const commands = extractData()
  const part1 = divePartOne(commands)
  const part2 = divePartTwo(commands)

  return { part1, part2 }
}
