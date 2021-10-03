import { useState, useEffect } from 'react';

/**
 * msToTime returns the proper time in hours, minutes, seconds and milliseconds from a given ms delta
 * 
 * @param delta, int, an amount of milliseconds
 * @returns hours, minutes, seconds and milliseconds which fit in delta
 */
export const msToTime = (delta) => [
    Math.floor((delta / (1000 * 60 * 60)) % 24),
    Math.floor((delta / (1000 * 60)) % 60),
    Math.floor((delta / 1000) % 60),
    Math.floor((delta % 1000))
];

/**
 * useElapsedTime returns the elapsed time in ms 
 * 
 * uses UTC
 * 
 * @param startDate, Date object, datetime to count the elapsed time from
 * @param refreshIntervalMs, int, update period in ms
 * @returns difference in ms since startDate to now
 */
export const useElapsedMs = (startDate, refreshIntervalMs = 1000) => {
    const [now, setNow] = useState(startDate); // Save the current date to be able to trigger an update

    // use an interval to update the 'now' date every refreshIntervalMs ms
    useEffect(() => {
        const ticker = setInterval(() => setNow(new Date()), refreshIntervalMs);
        return () => clearInterval(ticker);  // clean timer on unmount
    }, [refreshIntervalMs]);

    return [now - startDate];
};