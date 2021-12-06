import { expect } from 'chai'
import { divePartOne, Direction, divePartTwo } from './dive'

describe('Dive!', () => {
  const data = [
    { direction: 'forward', amount: 5 },
    { direction: 'down', amount: 5 },
    { direction: 'forward', amount: 8 },
    { direction: 'up', amount: 3 },
    { direction: 'down', amount: 8 },
    { direction: 'forward', amount: 2 },
  ] as { direction: Direction; amount: number }[]

  it('Should multiply final horizontal position and depth', () => {
    // When
    const res = divePartOne(data)

    // Then
    expect(res).to.be.equal(150)
  })

  it('Should multiply final adjusted horizontal position and depth', () => {
    // When
    const res = divePartTwo(data)

    // Then
    expect(res).to.be.equal(900)
  })
})
