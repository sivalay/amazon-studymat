import { currencyFormat } from "../../scripts/utils/money.js";

describe('Test suite : FormatCurrency', () => {
    it('converts cents into dollars', () => {
        expect(currencyFormat(2095)).toEqual('20.95')
    })
    it('work with 0z', () => {
        expect(currencyFormat(0)).toEqual('0.00')
    })
    it('rounds upto the nearest cent', () => {
        expect(currencyFormat(2000.5)).toEqual('20.01')
    })
})