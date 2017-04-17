import Model from './model';
import Cache from '../utils/cache';
import Logger from '../utils/logger';
import {getObjectByKeyValue, patchApply} from '../utils/util';

let logger = new Logger('[models/base-model]');

class BaseModel {
    constructor(modelName, unionFlag = '_id') {
        this._modelName = modelName;
        this._unionFlag = unionFlag;
    }
    getOne(id) {
        let cache = Cache.get(`${this._modelName}:${id}`);
        if (cache && cache.isComplete) {
            logger.log(`get ${this._modelName} ${id} from cache`);
            return cache.get();
        }
        return null;
    }
    getList() {
        let cache = Cache.get(`${this._modelName}:list`);
        if (cache) {
            logger.log(`get ${this._modelName} list from cache`);
            return cache.get();
        }
        return null;
    }
    addOne(data) {
        let cache = Cache.get(`${this._modelName}:${data[this._unionFlag]}`);
        if (cache) {
            logger.log(`update ${this._modelName} ${data[this._unionFlag]} in cache`);
            cache.isComplete = true;
            return cache.update(data).concatMap(() => cache.get());
        }
        logger.log(`add ${this._modelName} ${data[this._unionFlag]} to cache`);
        let model = new Model(data, true);
        Cache.set(`${this._modelName}:${data[this._unionFlag]}`, model);
        logger.log(`add ${this._modelName} ${data[this._unionFlag]} to ${this._modelName} list in cache`);
        this._addItemToList(model);
        return model.get();
    }
    addList(data) {
        let cache = Cache.get(`${this._modelName}:list`);
        let model = cache;
        if (cache) {
            logger.log(`update ${this._modelName} list in cache(addList)`);
            cache.update(data);
        } else {
            logger.log(`add ${this._modelName} list to cache`);
            model = new Model(data, true);
            Cache.set(`${this._modelName}:list`, model);
        }
        data.forEach(item => {
            let flag = `${this._modelName}:${item[this._unionFlag]}`;
            let cache = Cache.get(flag);
            if (cache) {
                cache.update(item);
            } else {
                let newModel = new Model(item, false);
                Cache.set(flag, newModel);
            }
        });
        return model.get();
    }
    updateOne(id, patch) {
        logger.log(`update ${this._modelName} ${id} in cache`);
        let model = Cache.get(`${this._modelName}:${id}`);
        model.update(patch);
        logger.log(`update ${this._modelName} ${id} to the ${this._modelName} list in cache`);
        this._updateItemInList(model.data);
        return model.get();
    }
    _addItemToList(item) {
        let list = Cache.get(`${this._modelName}:list`);
        list.data.push(item.data);
        logger.log(`update ${this._modelName} list in cache`);
        list.update(list.data);
    }
    _updateItemInList(item) {
        let model = Cache.get(`${this._modelName}:list`);
        let id = item[this._unionFlag];
        let updatedItem = getObjectByKeyValue(model.data, this._unionFlag, id);
        patchApply(updatedItem, item);
        logger.log(`update ${this._modelName} list in cache`);
        model.update(model.data);
    }
}

export default BaseModel;
