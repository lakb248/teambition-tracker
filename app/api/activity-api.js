import ActivityFetch from '../fetch/activity-fetch';
import ActivityModel from '../models/activity-model';
import Logger from '../utils/logger';

let logger = new Logger('[api/activity-api]');

class ActvityAPI {
    getOne(id) {
        logger.log(`try to get activity ${id} from cache`);
        let cache = ActivityModel.getOne(id);
        if (cache) {
            return cache;
        }
        logger.log(`try to get activity ${id} from server`);
        return ActivityFetch.getOne(id).concatMap(activity => ActivityModel.addOne(activity));
    }
    getList() {
        logger.log('try to get activity list from cache');
        let cache = ActivityModel.getList();
        if (cache) {
            return cache;
        }
        logger.log('try to get activity list from server');
        return ActivityFetch.getList().concatMap(list => ActivityModel.addList(list));
    }
    addOne(data) {
        logger.log('try to add a new activity to server');
        return ActivityFetch.addOne(data).concatMap(activity => ActivityModel.addOne(activity).take(1));
    }
    updateOne(id, data) {}
}
export default new ActvityAPI();
