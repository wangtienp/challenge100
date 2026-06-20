import { it, expect } from "vitest";
import { formatMoney } from './money'

it('formats 0 cents to $0.00', () => {
    expect(formatMoney(0)).toBe('$0.00')
})
it('formats -999 cents to -$9.99', () => {
    expect(formatMoney(-999)).toBe('-$9.99')
})
it('formats -100 cents to -$1.00', () => {
    expect(formatMoney(-100)).toBe('-$1.00')
})
