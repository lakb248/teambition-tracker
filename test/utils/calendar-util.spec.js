/* global describe,it,expect */
import Calendar from '../../app/utils/calendar-util.js';

// isLeap
describe('utils/calendar-util.js === isLeap', () => {
    it('should 2012 be a leap year', () => {
        expect(Calendar.isLeap(2011)).toBe(false);
    });
});
