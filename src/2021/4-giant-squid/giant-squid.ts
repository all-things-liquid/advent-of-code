interface Data {
  boardSize: number
  numbers: string[]
  boards: string[][]
}

interface Grid {
  rows: string[][]
  columns: string[][]
}

function extractData(file: string) {
  const lines = file.split('\n\n')

  const numbers = (lines.shift() as string).split(',')
  const boards = lines.map((board) =>
    board
      .replace(/\n/g, ' ') // Remove line breaks
      .replace(/\ \ /g, ' ') // Remove double spaces
      .replace(/^ /g, '') // Remove first space if board[0][0] is a 1-digit number
      .split(' ')
  )

  return { numbers, boards, boardSize: 5 }
}

function convertToGrids(boards: string[][], boardSize: number) {
  let grids: Record<string, Grid> = {}

  boards.map((board, b) => {
    const rows: string[][] = [...Array(boardSize)].map((_) => Array())
    const columns: string[][] = [...Array(boardSize)].map((_) => Array())

    board.map((el, i) => {
      const r = Math.floor(i / boardSize)
      const c = i % boardSize

      rows[r].push(el)
      columns[c].push(el)
    })

    grids[b] = { rows, columns }
  })

  return grids
}

function isWinningBoard(
  board: { rows: string[][]; columns: string[][] },
  numbers: string[]
) {
  const { rows, columns } = board
  const hasWinningRow = rows.some((row) =>
    row.every((nb) => numbers.includes(nb))
  )
  const hasWinningColumn = columns.some((col) =>
    col.every((nb) => numbers.includes(nb))
  )

  return hasWinningColumn || hasWinningRow
}

function computeMinWinningSubset(
  grid: Grid,
  numbers: string[],
  end: number
): number {
  if (isWinningBoard(grid, numbers.slice(0, end))) {
    return end
  }
  if (end > numbers.length) {
    throw new Error('Board can never win!')
  }
  return computeMinWinningSubset(grid, numbers, end + 1)
}

function getFirstWinningGrid(
  grids: Record<string, Grid>,
  subsetsLengths: number[]
) {
  let smallestSet = Math.min(...subsetsLengths)
  const i = subsetsLengths.indexOf(smallestSet)

  return {
    grid: grids[i].rows,
    subsetLength: smallestSet,
  }
}

function getLastWinningGrid(
  grids: Record<string, Grid>,
  subsetsLengths: number[]
) {
  let largestSet = Math.max(...subsetsLengths)
  const i = subsetsLengths.indexOf(largestSet)

  return {
    grid: grids[i].rows,
    subsetLength: largestSet,
  }
}

function calculateScore(
  grid: string[][],
  numbers: string[],
  setLength: number
) {
  const boardNumbers = grid.flat().map((n) => Number(n))

  numbers.slice(0, setLength).map((n) => {
    const index = boardNumbers.indexOf(Number(n))
    if (index !== -1) {
      boardNumbers.splice(index, 1)
    }
  })

  const winningNumber = Number(numbers[setLength - 1])

  const gridTotal = boardNumbers.reduce((acc, n) => acc + n)

  return winningNumber * gridTotal
}

export function giantSquidPartOne(data: Data): number {
  const { boards, numbers, boardSize } = data
  const grids = convertToGrids(boards, boardSize)
  let results: number[] = []

  for (const [i, grid] of Object.entries(grids)) {
    results[Number(i)] = computeMinWinningSubset(grid, numbers, boardSize)
  }

  const { grid: winningGrid, subsetLength: setLength } = getFirstWinningGrid(
    grids,
    results
  )

  return calculateScore(winningGrid, numbers, setLength)
}

export function giantSquidPartTwo(data: Data): number {
  const { boards, numbers, boardSize } = data
  const grids = convertToGrids(boards, boardSize)
  let results: number[] = []

  for (const [i, grid] of Object.entries(grids)) {
    results[Number(i)] = computeMinWinningSubset(grid, numbers, boardSize)
  }

  const { grid: winningGrid, subsetLength: setLength } = getLastWinningGrid(
    grids,
    results
  )

  return calculateScore(winningGrid, numbers, setLength)
}

export default function solve(str: string) {
  const data = extractData(str)
  const part1 = giantSquidPartOne(data)
  const part2 = giantSquidPartTwo(data)
  return { part1, part2 }
}
