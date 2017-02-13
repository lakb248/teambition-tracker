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
});
