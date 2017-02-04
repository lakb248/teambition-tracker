import TBSubTask from '../teambition/subtask';
import EventEmitter from '../utils/event';
import Logger from '../utils/logger';
import Cache from './cache';
import {getObjectByKeyValue} from '../utils/util';

let logger = new Logger('[service/subtask]');

class SubTask {
    constructor(request) {
        this._tbSubTask = new TBSubTask(request);
    }
    getByTaskId(taskId) {
        return this._tbSubTask.getByTaskId(taskId);
    }
    me() {
        if (Cache.get('subtask')) {
            return Promise.resolve(Cache.get('subtask'));
        }
        return this._tbSubTask.me()
            .then(res => {
                Cache.set('subtask', res.data);
                return res.data;
            });
    }
    save(subtask) {
        let id = subtask._id;
        let isDone = subtask.isDone;
        return this._tbSubTask.update(id, isDone)
            .then(res => {
                logger.log('update subtask done status and trigger `all-subtask` event');
                let subtasks = Cache.get('subtask');
                let updatedSubtask = getObjectByKeyValue(subtasks, '_id', id);
                updatedSubtask.isDone = isDone;
                EventEmitter.emit('all-subtask', subtasks);
            });
    }
}

export default SubTask;
