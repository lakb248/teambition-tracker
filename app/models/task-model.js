import Model from './model';
import Cache from '../utils/cache';
import {getObjectByKeyValue, patchApply} from '../utils/util';
import Logger from '../utils/logger';
let logger = new Logger('[models/task-model]');

class TaskModel {
    getOne(id) {
        let cache = Cache.get(`task:${id}`);
        if (cache && cache.isComplete) {
            logger.log(`get task ${id} from cache`);
            return cache.get();
        }
        return null;
    }
    getList() {
        let cache = Cache.get('task:list');
        if (cache) {
            logger.log('get task list from cache');
            return cache.get();
        }
        return null;
    }
    addOne(data, unionFlag = '_id') {
        let cache = Cache.get(`task:${data[unionFlag]}`);
        // update cache and return the updated data
        if (cache) {
            logger.log(`update task ${data[unionFlag]} in cache`);
            cache.isComplete = true;
            return cache.update(data).concatMap(() => cache.get());
        }
        // add new model to cache
        logger.log(`add task ${data[unionFlag]} to cache`);
        let model = new Model(data, true);
        Cache.set(`task:${data[unionFlag]}`, model);
        logger.log(`add task ${data[unionFlag]} to the task list in cache`);
        this._addItemToList(model);
        return model.get();
    }
    addList(data, unionFlag = '_id') {
        logger.log('add task list to cache');
        let model = new Model(data, true);
        Cache.set('task:list', model);
        data.forEach(item => {
            let flag = `task:${item[unionFlag]}`;
            let cache = Cache.get(flag);
            if (cache) {
                cache.update(item);
            } else {
                let task = new Model(item, false);
                Cache.set(flag, task);
            }
        });
        return model.get();
    }
    updateOne(id, patch) {
        logger.log(`update task ${id} in cache`);
        let task = Cache.get(`task:${id}`);
        task.update(patch);
        logger.log(`update task ${id} to the task list in cache`);
        this._updateItemInList(task);
        return task.get();
    }
    _addItemToList(item) {
        let model = Cache.get('task:list');
        model.data.push(item.data);
        logger.log('update task list in cache');
        model.update(model.data);
    }
    _updateItemInList(item) {
        let model = Cache.get('task:list');
        let id = item._id;
        let updatedItem = getObjectByKeyValue(model.data, '_id', id);
        patchApply(updatedItem, item);
        logger.log('update task list in cache');
        model.update(model.data);
    }
}

export default new TaskModel();
