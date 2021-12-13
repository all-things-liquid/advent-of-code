import { readFileInput } from '../data-extractor'

export interface Venture {
  begin: [number, number]
  end: [number, number]
}

interface Coordinates {
  x: number
  y: number
}

function extractData() {
  const file = readFileInput(5)

  return file.split('\n').map((el) => {
    const coordinates = el.split(' -> ')
    const begin = coordinates[0].split(',').map((c) => Number(c))
    const end = coordinates[1].split(',').map((c) => Number(c))

    return { begin: begin as [number, number], end: end as [number, number] }
  })
}

function computeIntermediateCoordinates(venture: Venture): Coordinates[] {
  const [x1, y1] = venture.begin
  const [x2, y2] = venture.end
  const coordinates: Coordinates[] = []
  const length = Math.max(Math.abs(x2 - x1), Math.abs(y2 - y1)) + 1

  function computeOneDimension(start: number, end: number) {
    const reverse = start > end
    const coords = Array(length)
      .fill(reverse ? end : start)
      .map((x, i) => (start !== end ? x + i : x))

    return reverse ? coords.reverse() : coords
  }

  const xCoords = computeOneDimension(x1, x2)
  const yCoords = computeOneDimension(y1, y2)

  xCoords.map((x, i) => coordinates.push({ x, y: yCoords[i] }))

  return coordinates
}

function fillVenture(coordinates: Map<string, number>, venture: Venture) {
  const coords = computeIntermediateCoordinates(venture)

  for (const coord of coords) {
    const key = `${coord.x},${coord.y}`
    if (coordinates.has(key)) {
      const currentValue = coordinates.get(key) as number
      coordinates.set(key, currentValue + 1)
    } else {
      coordinates.set(key, 1)
    }
  }
}

function countOverlaps(coordinates: Map<string, number>) {
  let totalOverlaps = 0
  for (const overlaps of coordinates.values()) {
    if (overlaps > 1) {
      totalOverlaps++
    }
  }
  return totalOverlaps
}

export function hydrothermalVenturePartOne(data: Venture[]): number {
  const coordinates = new Map<string, number>()
  const dataWithoutDiagonals = data.filter(
    (v) => v.begin[0] === v.end[0] || v.begin[1] === v.end[1]
  )
  for (const venture of dataWithoutDiagonals) {
    fillVenture(coordinates, venture)
  }

  return countOverlaps(coordinates)
}

export function hydrothermalVenturePartTwo(data: Venture[]): number {
  const coordinates = new Map<string, number>()

  for (const venture of data) {
    fillVenture(coordinates, venture)
  }

  return countOverlaps(coordinates)
}

export function day5(): { part1: number; part2: number } {
  const data = extractData()
  const part1 = hydrothermalVenturePartOne(data)
  const part2 = hydrothermalVenturePartTwo(data)
  return { part1, part2 }
}
