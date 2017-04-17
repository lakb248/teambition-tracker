import Model from './model';
import Cache from '../utils/cache';
import {getObjectByKeyValue, patchApply} from '../utils/util';
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
            return cache.get();
        }
        return null;
    }
    addOne(data, unionFlag = 'objectId') {
        let cache = Cache.get(`activity:${data[unionFlag]}`);
        if (cache) {
            logger.log(`update activity ${data[unionFlag]} in cache`);
            cache.isComplete = true;
            return cache.update(data).concatMap(() => cache.get());
        }
        logger.log(`add activity ${data[unionFlag]} to cache`);
        let model = new Model(data, true);
        Cache.set(`activity:${data[unionFlag]}`, model);
        logger.log(`add activity ${data[unionFlag]} to the activity list in cache`);
        this._addItemToList(model);
        return model.get();
    }
    addList(data, unionFlag = 'objectId') {
        logger.log('add activity list to cache');
        let cache = Cache.get('activity:list');
        let model = cache;
        if (cache) {
            logger.log('update activity list in cache');
            cache.update(data);
        } else {
            model = new Model(data, true);
            Cache.set('activity:list', model);
        }
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
        cache.update(data);
        return cache.get();
    }
    _updateItemInList(item) {
        let model = Cache.get('activity:list');
        let id = item.objectId;
        let updatedItem = getObjectByKeyValue(model.data, 'objectId', id);
        patchApply(updatedItem, item);
        logger.log('update activity list in cache');
        model.update(model.data);
    }
    _addItemToList(item) {
        let model = Cache.get('activity:list');
        model.data.push(item.data);
        logger.log('update activity list in cache');
        model.update(model.data);
    }
}

export default new ActivityModel();
