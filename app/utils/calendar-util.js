const WEEK_DAY = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
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
    },

    /**
     * get calendar view-model of the given month
     * @param  {Integer} year the year
     * @param  {Integer} month the month
     * @param  {String} type the type of view-model, simple or normal
     * @return {Object} viewModel the view-model
     */
    getCalendarViewModel(year, month, type = 'simple') {
        let firstDayOfMonth = this.getFirstDayOfMonth(year, month);
        let nextMonth = this.getNextMonth(year, month);
        let firstDayOfNextMonth = this.getFirstDayOfMonth(nextMonth.year, nextMonth.month);

        let daysOfMonth = this.getMaxDayOfMonth(year, month);
        let viewModel = [];
        let week = [];
        let index = 1;
        // the total cells of the calendar
        let cellsOfCalendar = firstDayOfMonth + daysOfMonth +
            (firstDayOfNextMonth === 0 ? 0 : (7 - firstDayOfNextMonth));

        let isSimple = type === 'simple';

        for (let i = 1; i <= cellsOfCalendar; i++) {
            // a new week
            if (i % 7 === 1) {
                week = [];
            }
            // blank before the month
            if (i < firstDayOfMonth + 1) {
                if (!isSimple) {
                    week.push({
                        type: 'blank',
                        day: WEEK_DAY[(i - 1) % 7]
                    });
                } else {
                    week.push(0);
                }
            } else if (index <= daysOfMonth) {
                if (!isSimple) {
                    week.push({
                        type: 'normal',
                        date: index,
                        day: WEEK_DAY[(i - 1) % 7]
                    });
                } else {
                    week.push(index);
                }
                index++;
            } else {
                // blank after the month
                if (!isSimple) {
                    week.push({
                        type: 'blank',
                        day: WEEK_DAY[(i - 1) % 7]
                    });
                } else {
                    week.push(0);
                }
            }
            // the last day of one week
            if (i % 7 === 0) {
                if (!isSimple) {
                    viewModel.push(week);
                } else {
                    viewModel.push(week.join(','));
                }
            }
        }
        return viewModel;
    }
};
