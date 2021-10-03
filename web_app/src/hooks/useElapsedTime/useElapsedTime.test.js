import { msToTime } from './useElapsedTime';

test.each([
    [900, 0, 0, 0, 900],
    [1000, 0, 0, 1, 0],
    [60000, 0, 1, 0, 0],
    [3600000, 1, 0, 0, 0],
    [3600120, 1, 0, 0, 120],
    [23000001, 6, 23, 20, 1]
])(
    "given %pms, 'msToTime' returns %p:%p:%p:%p",
    (durationMs, expectedH, expectedM, expectedS, expectedMs) => {
        // Arrange
        // Act
        const [h, m, s, ms] = msToTime(durationMs);

        // Assert
        expect(h).toBe(expectedH);
        expect(m).toBe(expectedM);
        expect(s).toBe(expectedS);
        expect(ms).toBe(expectedMs);
    }
);

