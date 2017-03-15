import AV from './leancloud';
import {getObjectFromAVRes} from '../../utils/util';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/fromPromise';
import Logger from '../../utils/logger';

class AVTask extends AV.Object {}
AV.Object.register(AVTask);

let logger = new Logger('[fetch/leancloud/task]');

class Task {
    constructor() {
        this._query = new AV.Query('AVTask');
    }
    getList() {
        logger.log('get task list from leancloud');
        return Observable.fromPromise(this._query.find())
            .map(list => list.map(item => getObjectFromAVRes(item)));
    }
    getOne(id) {
        logger.log(`get task ${id} from leancloud`);
        return Observable.fromPromise(this._query.get(id));
    }
    addOne(data) {
        logger.log(`add a new task to leancloud`);
        let task = this._createAVTask(data);
        return Observable.fromPromise(task.save());
    }
    updateOne(id, patch) {
        let updatedTask = AV.Object.createWithoutData('AVTask', id);
        updatedTask = this._updateAVTask(updatedTask, patch);
        return Observable.fromPromise(updatedTask.save());
    }
    _createAVTask(data = {}) {
        let task = new AVTask();
        Object.keys(data).forEach(key => {
            task.set(key, data[key]);
        });
        return task;
    }
    _updateAVTask(task, patch = {}) {
        Object.keys(patch).forEach(key => {
            if (key !== 'objectId') {
                task.set(key, patch[key]);
            }
        });
        return task;
    }
}

export default new Task();
