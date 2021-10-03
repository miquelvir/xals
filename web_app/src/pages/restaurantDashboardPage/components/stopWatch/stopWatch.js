import { useElapsedMs, msToTime } from '../../../../hooks/useElapsedTime/useElapsedTime';
import { timeToString } from './_timeToString';

/**
 * 
 * @param startTime, required, the Date to count from 
 * @param refreshIntervalMs, optional, the refresh frequency of the clock
 * @param precision, optional, the precision of the clock ('hours', 'minutes', 'seconds' or 'miliseconds')
 * @returns a string up to the required precision
 */
export function StopWatch({
    startTime,
    refreshIntervalMs = 1000,
    precision = 'seconds'
}) {
    const [elapsedMs] = useElapsedMs(startTime, refreshIntervalMs);
    const elapsedTime = msToTime(elapsedMs);
    return <span>
        {timeToString(elapsedTime, precision)}
    </span>;
}
