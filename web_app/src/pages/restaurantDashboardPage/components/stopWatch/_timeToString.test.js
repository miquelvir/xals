import { timeToString } from './_timeToString';

test.each([
    [[1,1,1,1], 'milliseconds', '01:01:01:01'],
    [[1,1,1,1], 'seconds', '01:01:01'],
    [[1,1,1,1], 'minutes', '01:01'],
    [[1,1,1,1], 'hours', '01'],
    [[22,22,22,22], 'milliseconds', '22:22:22:22'],
    [[22,22,22,22], 'seconds', '22:22:22'],
    [[22,22,22,22], 'minutes', '22:22'],
    [[22,22,22,22], 'hours', '22'],
])(
    "given time %p and precision %p, 'timeToString' returns %p",
    (elapsedTime, precision, expectedResult) => {
        // Arrange
        // Act
        const time = timeToString(elapsedTime, precision);

        // Assert
        expect(time).toBe(expectedResult);
    }
);

