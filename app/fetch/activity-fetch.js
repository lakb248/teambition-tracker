import AVActivity from './leancloud/activity';
import Logger from '../utils/logger';

let logger = new Logger('[fetch/activity-fetch]');

class ActivityFetch {
    getOne(id) {
        logger.log(`get activity ${id} from server`);
        return AVActivity.getOne(id);
    }
    getList() {
        logger.log('get activity list from server');
        return AVActivity.getList();
    }
    addOne(data) {
        logger.log('add a new activity to server');
        return AVActivity.addOne(data);
    }
}
export default new ActivityFetch();
