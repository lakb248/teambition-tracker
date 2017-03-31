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

let getNearestEndOfWeek = (date, startWithSunday = false) => {
    let endDayOfWeek = 7;
    if (startWithSunday) {
        endDayOfWeek = 6;
    }
    let day = date.getDay();
    let delta = (endDayOfWeek - day + 7) % 7;
    date.setTime(date.getTime() + delta * MILLISECONDS_PER_DAY);
    return getEndOfDay(date);
};
let getNearestStartOfWeek = (date, startWithSunday = false) => {
    let startDayOfWeek = 1;
    if (startWithSunday) {
        startDayOfWeek = 7;
    }
    let day = date.getDay();
    let delta = (day - startDayOfWeek + 7) % 7;
    date.setTime(date.getTime() - delta * MILLISECONDS_PER_DAY);
    return getStartOfDay(date);
};

let getWeekOfDate = (date, startWithSunday = false) => {
    return {
        start: getNearestStartOfWeek(date, startWithSunday),
        end: getNearestEndOfWeek(date, startWithSunday)
    };
};

export {
    MILLISECONDS_PER_DAY,
    getStartOfDay,
    getEndOfDay,
    getWeekOfDate
};
