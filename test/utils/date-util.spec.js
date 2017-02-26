/* global it, expect, describe */
import * as DateUtil from '../../app/utils/date-util.js';

// getStartOfDay
describe('utils/date-util.js === getStartOfDay', () => {
    it('shoule return the start of day', () => {
        let now = new Date();
        expect(DateUtil.getStartOfDay(now)).toEqual(
            new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0)
                .getTime()
        );
    });
});

// getEndOfDay
describe('utils/date-util.js === getEndOfDay', () => {
    it('should return the end of day', () => {
        let now = new Date();
        expect(DateUtil.getEndOfDay(now)).toEqual(
            new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59, 999)
                .getTime()
        );
    });
});
