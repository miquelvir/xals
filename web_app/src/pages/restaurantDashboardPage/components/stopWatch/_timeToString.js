import {twoPadding} from '../../../../helpers/numberPadding';

const ALLOWED_PRECISIONS = ['hours', 'minutes', 'seconds', 'milliseconds'];
export const timeToString = (elapsedTime, precision) => {
    if (!ALLOWED_PRECISIONS.includes(precision)) throw `precision '${precision}' is not a valid precision; must be one of ${ALLOWED_PRECISIONS}`;

    const [hh, mm, ss, ms] = elapsedTime.map(twoPadding);

    switch (precision) {
        case ALLOWED_PRECISIONS[0]:
            return hh;
        case ALLOWED_PRECISIONS[1]:
            return `${hh}:${mm}`;
        case ALLOWED_PRECISIONS[2]:
            return `${hh}:${mm}:${ss}`;
        case ALLOWED_PRECISIONS[3]:
            return `${hh}:${mm}:${ss}:${ms}`;
    }
}