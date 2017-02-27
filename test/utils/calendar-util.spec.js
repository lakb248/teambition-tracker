/* global describe,it,expect */
import Calendar from '../../app/utils/calendar-util.js';

// isLeap
describe('utils/calendar-util.js === isLeap', () => {
    it('should 2011 not be a leap year', () => {
        expect(Calendar.isLeap(2011)).toBe(false);
    });
    it('should 2012 be a leap year', () => {
        expect(Calendar.isLeap(2012)).toBe(true);
    });
});

// getMaxDayOfMonth
describe('utils/calendar-util.js === getMaxDayOfMonth', () => {
    it('should have 28 days in 2017.02', () => {
        expect(Calendar.getMaxDayOfMonth(2017, 2)).toBe(28);
    });
    it('should have 31 days in 2017.12', () => {
        expect(Calendar.getMaxDayOfMonth(2017, 12)).toBe(31);
    });
    it('should have 30 days in 2017.11', () => {
        expect(Calendar.getMaxDayOfMonth(2017, 11)).toBe(30);
    });
    it('should have 29 days in 2016.02', () => {
        expect(Calendar.getMaxDayOfMonth(2016, 2)).toBe(29);
    });
});

// getFirstDayOfMonth
describe('utils/calendar-util.js === getFirstDayOfMonth', () => {
    it('the first day of 2017.01 should be sunday', () => {
        expect(Calendar.getFirstDayOfMonth(2017, 1)).toBe(0);
    });
    it('the first day of 2017.02 should be wednesday', () => {
        expect(Calendar.getFirstDayOfMonth(2017, 2)).toBe(3);
    });
    it('the first day of 2017.03 should be wednesday', () => {
        expect(Calendar.getFirstDayOfMonth(2017, 3)).toBe(3);
    });
});

// getLastMonth
describe('utils/calendar-util.js === getLastMonth', () => {
    it('the month before 2017.01 should be 2016.12', () => {
        expect(Calendar.getLastMonth(2017, 1)).toEqual({
            year: 2016,
            month: 12
        });
    });
    it('the month before 2017.02 should be 2017.01', () => {
        expect(Calendar.getLastMonth(2017, 2)).toEqual({
            year: 2017,
            month: 1
        });
    });
});

// getNextMonth
describe('utils/calendar-util.js === getNextMonth', () => {
    it('the month after 2016.12 should be 2017.01', () => {
        expect(Calendar.getNextMonth(2016, 12)).toEqual({
            year: 2017,
            month: 1
        });
    });
    it('the month after 2017.01 should be 2017.02', () => {
        expect(Calendar.getNextMonth(2017, 1)).toEqual({
            year: 2017,
            month: 2
        });
    });
});

// getStartAndEndOfMonth
describe('utils/calednar-util.js === getStartAndEndOfMonth', () => {
    it('the start of 2017.01 should be 2017.01.01 00:00:00', () => {
        expect(Calendar.getStartAndEndOfMonth(2017, 1).start)
            .toEqual(new Date(2017, 0, 1, 0, 0, 0).getTime());
    });
    it('the end of 2017.01 should be 2017.01.31 23:59:59.9999', () => {
        expect(Calendar.getStartAndEndOfMonth(2017, 1).end)
            .toEqual(new Date(2017, 0, 31, 23, 59, 59, 999).getTime());
    });
});
