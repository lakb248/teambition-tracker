import Model from './model';
import Cache from '../utils/cache';
import {getObjectByKeyValue, patchApply} from '../utils/util';
import Logger from '../utils/logger';
let logger = new Logger('[models/subtask-model]');

class SubtaskModel {
    getOne(id) {
        let cache = Cache.get(`subtask:${id}`);
        if (cache && cache.isComplete) {
            logger.log(`get subtask ${id} from cache`);
            return cache.get();
        }
        return null;
    }
    getList() {
        let cache = Cache.get('subtask:list');
        if (cache) {
            logger.log('get subtask list from cache');
            return cache.get();
        }
        return null;
    }
    addOne(data, unionFlag = '_id') {
        let cache = Cache.get(`subtask:${data[unionFlag]}`);
        if (cache) {
            logger.log(`update subtask ${data[unionFlag]} in cache`);
            cache.isComplete = true;
            return cache.update(data).concatMap(() => cache.get());
        }
        logger.log(`add subtask ${data[unionFlag]} to cache`);
        let model = new Model(data, true);
        Cache.set(`subtask:${data[unionFlag]}`, model);
        return model.get();
    }
    addList(data, unionFlag = '_id') {
        logger.log('add subtask list to cache');
        let model = new Model(data, true);
        Cache.set('subtask:list', model);
        data.forEach(item => {
            let flag = `subtask:${item[unionFlag]}`;
            let cache = Cache.get(flag);
            if (cache) {
                cache.update(item);
            } else {
                let subtask = new Model(item, false);
                Cache.set(flag, subtask);
            }
        });
        return model.get();
    }
    updateOne(id, patch) {
        logger.log(`update subtask ${id} in cache`);
        let subtask = Cache.get(`subtask:${id}`);
        subtask.update(patch);
        this._updateItemInList(subtask.data);
        return subtask.get();
    }
    _updateItemInList(item) {
        let model = Cache.get('subtask:list');
        let id = item._id;
        let updatedItem = getObjectByKeyValue(model.data, '_id', id);
        patchApply(updatedItem, item);
        logger.log('update subtask list in cache');
        model.update(model.data);
    }
}

export default new SubtaskModel();
