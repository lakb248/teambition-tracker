const MILLISECONDS_PER_SECOND = 1000;
const MILLISECONDS_PER_MINUTE = 60 * MILLISECONDS_PER_SECOND;
const MILLISECONDS_PER_HOUR = 60 * MILLISECONDS_PER_MINUTE;
const MILLISECONDS_PER_DAY = 24 * MILLISECONDS_PER_HOUR;

let getStartOfDay = date => {
    date.setHours(0);
    date.setMinutes(0);
    date.setSeconds(0);
    date.setMilliseconds(0);
    return date.getTime();
};
let getEndOfDay = date => {
    return getStartOfDay(date) + MILLISECONDS_PER_DAY - 1;
};

export {
    MILLISECONDS_PER_DAY,
    getStartOfDay,
    getEndOfDay
};
