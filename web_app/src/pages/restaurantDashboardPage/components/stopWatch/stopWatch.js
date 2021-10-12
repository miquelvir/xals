import { useElapsedMs, msToTime } from '../../../../hooks/useElapsedTime/useElapsedTime';
import { timeToString } from './_timeToString';
import { useEffect } from 'react';
/**
 * 
 * @param startTime, required, the Date to count from 
 * @param refreshIntervalMs, optional, the refresh frequency of the clock
 * @param precision, optional, the precision of the clock ('hours', 'minutes', 'seconds' or 'miliseconds')
 * @returns a string up to the required precision
 */
export function StopWatch({
    startTime,
    notifyDelta = (_) => {},
    refreshIntervalMs = 1000,
    precision = 'seconds'
}) {
    const [elapsedMs] = useElapsedMs(startTime, refreshIntervalMs);
    const elapsedTime = msToTime(elapsedMs);

    useEffect(() => {
        notifyDelta(elapsedMs);
    }, [elapsedMs])
    return <span>
        {timeToString(elapsedTime, precision)}
    </span>;
}
