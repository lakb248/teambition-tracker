import Logger from '../utils/logger';
import CalnedarUtil from '../utils/calendar-util';
import ActivityAPI from '../api/activity-api';

let logger = new Logger('[serviecs/activity-service]');

class ActivityService {
    getList() {
        logger.log('try to get activity list');
        return ActivityAPI.getList();
    }
    addOne(data) {
        logger.log('try to add a new activity');
        return ActivityAPI.addOne(data);
    }
    getByMonth(year, month) {
        logger.log(`try to get activity list in ${year}.${month}`);
        let range = CalnedarUtil.getStartAndEndOfMonth(year, month);
        let start = range.start;
        let end = range.end;
        return ActivityAPI.getList()
                .map(data => data.filter(activity => activity.start >= start && activity.start < end));
    }
}

export default new ActivityService();
