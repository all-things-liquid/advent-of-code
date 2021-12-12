import { expect } from 'chai'
import {
  binaryDiagnosticPartOne,
  binaryDiagnosticPartTwo,
} from './binary-diagnostic'

describe('Binary diagnostic', () => {
  const data = [
    '00100',
    '11110',
    '10110',
    '10111',
    '10101',
    '01111',
    '00111',
    '11100',
    '10000',
    '11001',
    '00010',
    '01010',
  ]

  it('Should multiply gamma rate and epsilon rate', () => {
    // When
    const res = binaryDiagnosticPartOne(data)

    // Then
    expect(res).to.equal(198)
  })

  it('Should multiply oxygen generator rating and CO2 scrubber rating', () => {
    // When
    const res = binaryDiagnosticPartTwo(data)

    // Then
    expect(res).to.equal(230)
  })
})
