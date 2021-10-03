/**
 * nPaddinng pads a number to n digits (e.g. 1 -> 001 for n=3)
 * 
 * @param number, a number 
 * @param n, the padding required 
 * @returns the number with as many leading zeros as needed for it to be of the minimum length >= n
 */
export const nPadding = (number, n) => {
    if (n <= 0) throw `n must be > 0, '${n}' is an invalid padding`;

    return String(number).padStart(n, '0');
}

/**
 * twoPadding pads a number to two digits (e.g. 1 -> 01)
 * 
 * @param number, a number 
 * @returns the number with as many leading zeros as needed for it to be of the minimum length >= 2
 */
export const twoPadding = (number) => nPadding(number, 2);