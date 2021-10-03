import { twoPadding, nPadding } from './numberPadding';

test.each([
    [0, '00'],
    [1, '01'],
    [9, '09'],
    [1, '01'],
    [236, '236']
])(
    "given %p, 'twoPadding' returns %p",
    (number, expectedResult) => {
        // Arrange
        // Act
        const paddedNumber = twoPadding(number);

        // Assert
        expect(paddedNumber).toBe(expectedResult);
    }
);



test.each([
    [0, 1, '0'],
    [0, 2, '00'],
    [1, 3, '001'],
    [9, 4, '0009'],
    [99999, 4, '99999'],
    [1, 5, '00001'],
    [11111, 5, '11111'],
    [236, 6, '000236'],
    [236236, 6, '236236'],
    [2362366, 6, '2362366']
])(
    "given %p, 'nPadding' (%p-padding) returns %p",
    (number, n, expectedResult) => {
        // Arrange
        // Act
        const paddedNumber = nPadding(number, n);

        // Assert
        expect(paddedNumber).toBe(expectedResult);
    }
);

