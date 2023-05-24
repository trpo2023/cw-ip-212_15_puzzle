const data = require('../scripts/wins');

const numbers1 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 15, 14];
const numbers2 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

describe('Win test', () => {

    test('Test odd win', () => {

        expect(data.odd(numbers1)).toBe(true);

    });

    test('Test odd lose', () => {

        expect(data.odd(numbers2)).toBe(false);

    });

    test('Test even win', () => {

        expect(data.even(numbers2)).toBe(true);

    });

    test('Test even lose', () => {

        expect(data.even(numbers1)).toBe(false);

    });
    
});