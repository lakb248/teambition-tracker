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
        return Observable.fromPromise(task.save())
            .map(task => getObjectFromAVRes(task));
    }
    updateOne(id, patch) {
        logger.log(`update task ${id} in leancloud`);
        let updatedTask = AV.Object.createWithoutData('AVTask', id);
        updatedTask = this._updateAVTask(updatedTask, patch);
        return Observable.fromPromise(updatedTask.save())
            .map(task => getObjectFromAVRes(task));
    }
    _createAVTask(data = {}) {
        let task = new AVTask();
        Object.keys(data).forEach(key => {
            task.set(key, data[key]);
        });
        return task;
    }
    _updateAVTask(task, patch = {}) {
        task.set('status', patch.status || task.status);
        task.set('lastStartTime', patch.lastStartTime || task.lastStartTime);
        return task;
    }
}

export default new Task();
