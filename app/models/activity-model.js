import Model from './model';
import Cache from '../utils/cache';
import Logger from '../utils/logger';

let logger = new Logger('[models/activity-model]');

class ActivityModel {
    getOne(id) {
        let cache = Cache.get(`activity:${id}`);
        if (cache && cache.isComplete) {
            logger.log(`get activity ${id} from cache`);
            return cache.get();
        }
        return null;
    }
    getList() {
        let cache = Cache.get('activity:list');
        if (cache) {
            logger.log('get activity list from cache');
            return cache;
        }
        return null;
    }
    addOne(data, unionFlag = '_id') {
        let cache = Cache.get(`activity:${data[unionFlag]}`);
        if (cache) {
            logger.log(`update activity ${data[unionFlag]} in cache`);
            cache.isComplete = true;
            return cache.update(data).concatMap(() => cache.get());
        }
        logger.log(`add activity ${data[unionFlag]} to cache`);
        let model = new Model(data, true);
        Cache.set(`activity:${data[unionFlag]}`, model);
        return model.get();
    }
    addList(data, unionFlag = '_id') {
        logger.log('add activity list to cache');
        let model = new Model(data, true);
        Cache.set('activity:list', model);
        data.forEach(item => {
            let flag = `activity:${item[unionFlag]}`;
            let cache = Cache.get(flag);
            if (cache) {
                cache.update(item);
            } else {
                let activity = new Model(item, false);
                Cache.set(flag, activity);
            }
        });
        return model.get();
    }
    updateOne(id, data) {
        let cache = Cache.get(`activity:${id}`);
        return cache.update(data);
    }
}

export default new ActivityModel();
