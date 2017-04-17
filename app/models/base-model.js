import Cache from '../utils/cache';
import Logger from '../utils/logger';

let logger = new Logger('[models/base-model]');

class BaseModel {
    constructor(modelName) {
        this._modelName = modelName;
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
    addOne(data, unionFlag = '_id') {}
    addList(data, unionFlag = '_id') {}
}

export default BaseModel;
