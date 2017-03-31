/* global it, expect, describe */
import * as DateUtil from '../../app/utils/date-util.js';

// getStartOfDay
describe('utils/date-util.js ===> getStartOfDay', () => {
    it('shoule return the start of day', () => {
        let now = new Date();
        expect(DateUtil.getStartOfDay(now)).toEqual(
            new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0)
                .getTime()
        );
    });
});

// getEndOfDay
describe('utils/date-util.js ===> getEndOfDay', () => {
    it('should return the end of day', () => {
        let now = new Date();
        expect(DateUtil.getEndOfDay(now)).toEqual(
            new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59, 999)
                .getTime()
        );
    });
});

// getWeekOfDate
describe('utils/date-util.js ===> getWeekOfDate', () => {
    it('should return the right result if the date is at the start of week', () => {
        let date = new Date('2017/04/02 12:00:00');
        let rightResult = {
            start: new Date('2017/3/27 00:00:00').getTime(),
            end: new Date('2017/4/2 23:59:59').getTime() + 999
        };
        expect(DateUtil.getWeekOfDate(date)).toEqual(rightResult);
    });
    it('should return the right result if the date is at the end of week', () => {
        let date = new Date('2017/03/27 12:00:00');
        let rightResult = {
            start: new Date('2017/3/27 00:00:00').getTime(),
            end: new Date('2017/4/2 23:59:59').getTime() + 999
        };
        expect(DateUtil.getWeekOfDate(date)).toEqual(rightResult);
    });
    it('should return the right result if the date is in the middle of week', () => {
        let date = new Date('2017/03/30 12:00:00');
        let rightResult = {
            start: new Date('2017/3/27 00:00:00').getTime(),
            end: new Date('2017/4/2 23:59:59').getTime() + 999
        };
        expect(DateUtil.getWeekOfDate(date)).toEqual(rightResult);
    });

    it('should return the right result if the date is at the start of week and the start of week is Sunday', () => {
        let date = new Date('2017/04/01 12:00:00');
        let rightResult = {
            start: new Date('2017/3/26 00:00:00').getTime(),
            end: new Date('2017/4/1 23:59:59').getTime() + 999
        };
        expect(DateUtil.getWeekOfDate(date, true)).toEqual(rightResult);
    });
    it('should return the right result if the date is at the end of week and the start of week is Sunday', () => {
        let date = new Date('2017/03/26 12:00:00');
        let rightResult = {
            start: new Date('2017/3/26 00:00:00').getTime(),
            end: new Date('2017/4/1 23:59:59').getTime() + 999
        };
        expect(DateUtil.getWeekOfDate(date, true)).toEqual(rightResult);
    });
    it('should return the right result if the date is in the middle of week and the start of week is Sunday', () => {
        let date = new Date('2017/03/30 12:00:00');
        let rightResult = {
            start: new Date('2017/3/26 00:00:00').getTime(),
            end: new Date('2017/4/1 23:59:59').getTime() + 999
        };
        expect(DateUtil.getWeekOfDate(date, true)).toEqual(rightResult);
    });
});
