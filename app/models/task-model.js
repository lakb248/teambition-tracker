import Model from './model';
import Cache from '../utils/cache';
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
        return model.get();
    }
    addList(data, unionFlag = '_id') {
        logger.log('add task list to cache');
        let model = new Model(data, true);
        Cache.set('task:list', data);
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
}

export default new TaskModel();
