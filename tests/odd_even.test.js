const data = require('../scripts/wins');

const numbers1 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 15, 14];
const numbers2 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
const numbers3 = [13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 15, 14];
const numbers4 = [13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 14, 15];

describe('Win test last numbers', () => {

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

describe('Win test other numbers', () => {

    test('Test odd win', () => {

        expect(data.odd(numbers3)).toBe(false);

    });

    test('Test odd lose', () => {

        expect(data.odd(numbers4)).toBe(false);

    });

    test('Test even win', () => {

        expect(data.even(numbers3)).toBe(false);

    });

    test('Test even lose', () => {

        expect(data.even(numbers4)).toBe(false);

    });
    
});