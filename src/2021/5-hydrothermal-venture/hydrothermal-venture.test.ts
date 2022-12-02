import { expect } from 'chai'
import {
  hydrothermalVenturePartOne,
  hydrothermalVenturePartTwo,
  Venture,
} from './hydrothermal-venture'

describe('Hydrothermal venture', () => {
  const data: Venture[] = [
    { begin: [0, 9], end: [5, 9] },
    { begin: [8, 0], end: [0, 8] },
    { begin: [9, 4], end: [3, 4] },
    { begin: [2, 2], end: [2, 1] },
    { begin: [7, 0], end: [7, 4] },
    { begin: [6, 4], end: [2, 0] },
    { begin: [0, 9], end: [2, 9] },
    { begin: [3, 4], end: [1, 4] },
    { begin: [0, 0], end: [8, 8] },
    { begin: [5, 5], end: [8, 2] },
  ]
  it('Should compute the number of line overlaps without horizontal ventures', () => {
    // When
    const res = hydrothermalVenturePartOne(data)

    // Then
    expect(res).to.equal(5)
  })

  it('Should compute the number of line overlapsof all ventures', () => {
    // When
    const res = hydrothermalVenturePartTwo(data)

    // Then
    expect(res).to.equal(12)
  })
})
