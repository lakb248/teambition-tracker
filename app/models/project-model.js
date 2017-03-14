import Model from './model';
import Cache from '../utils/cache';
import Logger from '../utils/logger';
import 'rxjs/add/operator/concatMap';

let logger = new Logger('[models/project-model]');

class ProjectModel {
    addOne(data, unionFlag = '_id') {
        let cache = Cache.get(`project:${data[unionFlag]}`);
        // update cache and return the updated data
        if (cache) {
            cache.isComplete = true;
            return cache.update(data).concatMap(() => cache.get());
        }
        // add new model to cache
        let model = new Model(data, true);
        Cache.set(`project:${data[unionFlag]}`, model);
        return model.get();
    }
    addList(data, unionFlag = '_id') {
        logger.log('add project list to cache');
        let model = new Model(data, true);
        Cache.set('project:list', data);
        data.forEach(item => {
            let flag = `project:${item[unionFlag]}`;
            let cache = Cache.get(flag);
            if (cache) {
                cache.update(item);
            } else {
                let project = new Model(item, false);
                Cache.set(`project:${item._id}`, project);
            }
        });
        return model.get();
    }
    getList() {
        let cache = Cache.get('project:list');
        if (cache) {
            logger.log('get project list from cache');
            return cache.get();
        }
        return null;
    }
    getOne(id) {
        let cache = Cache.get(`project:${id}`);
        if (cache && cache.isComplete) {
            logger.log(`get project ${id} from cache`);
            return cache.get();
        }
        return null;
    }
    updateOne(id, data) {
        let cache = Cache.get(`project:${id}`);
        if (cache) {
            return cache.update(data);
        }
        return null;
    }
}

export default new ProjectModel();
