import { expect } from 'chai'
import { sonarSweepPartOne, sonarSweepPartTwo } from './sonar-sweep'

describe('Sonar Sweep', () => {
  const data = [199, 200, 208, 210, 200, 207, 240, 269, 260, 263]

  it('Should count the amount of times depth increases', () => {
    // When
    const nbIncreases = sonarSweepPartOne(data)

    // Then
    expect(nbIncreases).to.equal(7)
  })

  it('Should count the amount of times the sums of three consecutive depth increases', () => {
    // When
    const nbIncreases = sonarSweepPartTwo(data)

    // Then
    expect(nbIncreases).to.equal(5)
  })
})
