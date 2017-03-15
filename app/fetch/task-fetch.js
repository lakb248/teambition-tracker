import TBTask from './teambition/task';
import AVTask from './leancloud/task';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/forkJoin';
import Logger from '../utils/logger';
import {arrayToObject} from '../utils/util';
import {TASK_STATUS as STATUS} from '../utils/const.js';

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
    update() {}
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
        // get timer of task
        let timer = 0;
        let lastStartTime = avTask ? avTask.lastStartTime : new Date();
        if (status === STATUS.PLAYING) {
            timer = new Date().getTime() - lastStartTime;
        }
        tbTask.objectId = avTask ? avTask.id : undefined;
        tbTask.status = status;
        tbTask.lastStartTime = lastStartTime;
        tbTask.timer = timer;
        return tbTask;
    }
}

export default new TaskFetch();
