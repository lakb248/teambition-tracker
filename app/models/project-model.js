import Model from './model';
import BaseModel from './base-model';
import Cache from '../utils/cache';
import Logger from '../utils/logger';
import 'rxjs/add/operator/concatMap';

let logger = new Logger('[models/project-model]');

class ProjectModel extends BaseModel {
    constructor() {
        super('project');
    }
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
        let cache = Cache.get('project:list');
        let model = cache;
        if (cache) {
            logger.log('update project list in cache(addList)');
            cache.update(data);
        } else {
            logger.log('add project list to cache');
            model = new Model(data, true);
            Cache.set('project:list', model);
        }
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
    updateOne(id, data) {
        let cache = Cache.get(`project:${id}`);
        if (cache) {
            return cache.update(data);
        }
        return null;
    }
}

export default new ProjectModel();
