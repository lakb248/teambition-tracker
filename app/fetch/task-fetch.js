import TBTask from './teambition/task';
import AVTask from './leancloud/task';
import {arrayToObject} from '../utils/util';
import {TASK_STATUS as STATUS} from '../utils/const.js';

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/forkJoin';

import Logger from '../utils/logger';
let logger = new Logger('[fetch/task-fetch]');

class TaskFetch {
    getOne(id) {
        logger.log(`get task ${id} from server`);
        return Observable.forkJoin(
            TBTask.getOne(id),
            AVTask.getOne(id),
            this._mergeTask
        );
    }
    getList() {
        logger.log('get task list from server');
        return Observable.forkJoin(
            TBTask.getList(),
            AVTask.getList(),
            this._mergeTaskList.bind(this)
        );
    }
    updateOne(id, patch) {
        if (patch.objectId) {
            return AVTask.updateOne(patch.objectId, patch);
        }
        return AVTask.addOne({
            taskId: id,
            lastStartTime: patch.lastStartTime,
            status: patch.status
        });
    }
    updateStatus(id, data) {
        logger.log(`update status of task ${id} to ${data.status} in server`);
        if (data.objectId) {
            return AVTask.updateOne(data.objectId, data);
        }
        return AVTask.addOne({
            taskId: id,
            lastStartTime: data.lastStartTime,
            status: data.status
        });
    }
    updateContent(id, content) {}
    remove() {}
    _mergeTaskList(tbTasks, avTasks) {
        avTasks = arrayToObject(avTasks, 'taskId');
        return tbTasks.map(tbTask => {
            let avTask = avTasks[tbTask._id];
            return this._mergeTask(tbTask, avTask);
        });
    }
    _mergeTask(tbTask, avTask) {
        // get status of task
        let status = avTask ? avTask.status : STATUS.PAUSE;
        let lastStartTime = avTask ? avTask.lastStartTime : new Date();
        tbTask.objectId = avTask ? avTask.objectId : undefined;
        tbTask.status = status;
        tbTask.lastStartTime = lastStartTime;
        return tbTask;
    }
}

export default new TaskFetch();
