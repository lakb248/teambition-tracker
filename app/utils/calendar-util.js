export default {
    /**
     * if the given year is leap year
     * @param  {Integer} year the year
     * @return {boolean} result the result
     */
    isLeap(year) {
        if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
            return true;
        }
        return false;
    },

    /**
     * get the max date of month
     * @param  {Integer} year  the year
     * @param  {Integer} month the month
     * @return {Integer} max the max day of month
     */
    getMaxDayOfMonth(year, month) {
        switch (month) {
        case 1:
        case 3:
        case 5:
        case 7:
        case 8:
        case 10:
        case 12:
            return 31;
        case 4:
        case 6:
        case 9:
        case 11:
            return 30;
        case 2:
            if (this.isLeap(year)) {
                return 29;
            }
            return 28;
        default:
            return;
        }
    },

    /**
     * get the first day of month
     * @param  {Integer} year  the year
     * @param  {Integer} month the month
     * @return {Integer} day the first day
     */
    getFirstDayOfMonth(year, month) {
        var firstDay = 0;
        var century = Math.floor(year / 100);
        var y = year % 100;
        if (month === 1 || month === 2) {
            century = Math.floor((year - 1) / 100);
            y = (year - 1) % 100;
            if (month === 1) {
                month = 13;
            } else {
                month = 14;
            }
        }
        firstDay = Math.floor(century / 4) - 2 * century + y +
            Math.floor(y / 4) + Math.floor(13 * (month + 1) / 5);
        firstDay %= 7;

        while (firstDay < 0) {
            firstDay += 70;
        }

        return firstDay % 7;
    },

    /**
     * get year and month of last month
     * @param  {Integer} year the year
     * @param  {Integer} month the month
     * @return {Object} result the result
     */
    getLastMonth(year, month) {
        if (month === 1) {
            return {
                year: year - 1,
                month: 12
            };
        }
        return {
            year: year,
            month: month - 1
        };
    },

    /**
     * get year and month of this month
     * @param  {Integer} year the year
     * @param  {Integer} month the month
     * @return {Object} result the result
     */
    getNextMonth(year, month) {
        if (month === 12) {
            return {
                year: year + 1,
                month: 1
            };
        }
        return {
            year: year,
            month: month + 1
        };
    }
};
