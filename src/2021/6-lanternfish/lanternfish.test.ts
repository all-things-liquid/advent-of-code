import { expect } from 'chai'
import { lanternfishPartOne, lanternfishPartTwo } from './lanternfish'

describe('Lanternfish', () => {
  const data = [3, 4, 3, 1, 2]

  it('Should return the number of lanternfishes after 80 days', () => {
    // When
    const res = lanternfishPartOne(data)

    // Then
    expect(res).to.equal(5934)
  })

  it('Should return the number of lanternfishes after 256 days', () => {
    // When
    const res = lanternfishPartTwo(data)

    // Then
    expect(res).to.equal(26984457539)
  })
})
