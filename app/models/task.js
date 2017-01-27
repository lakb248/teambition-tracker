import TBTask from '../teambition/task';
import TBSubTask from '../teambition/subtask';
import TBUser from '../teambition/user';

import AVTask from '../leancloud/task';

import {arrayToObject} from '../utils/util';
import fecha from 'fecha';

import {TASK_STATUS as STATUS, MILLISECONDS, DUEDATE_TYPE} from '../utils/const.js';

class Task {
    constructor(request, axios) {
        this._tbTask = new TBTask(request);
        this._tbUser = new TBUser(request);
        this._tbSubTask = new TBSubTask(request);

        this._avTask = new AVTask();
        this._axios = axios;
    }
    all() {
        let tbTaskReq = this._tbTask.me();
        let tbSubTaskReq = this._tbSubTask.me();
        let tbMembersReq = this._tbUser.members();

        let avTaskReq = this._avTask.all();

        return this._axios.all([tbTaskReq, tbMembersReq, tbSubTaskReq, avTaskReq])
            .then(this._axios.spread((tbTaskRes, tbMemberRes, tbSubTaskRes, avTaskRes) => {
                let tbTasks = tbTaskRes.data;
                let tbMembers = tbMemberRes.data;
                let tbSubTask = tbSubTaskRes.data;

                let avTasks = avTaskRes;
                // switch tbMembers and tbSubTask to Map by key
                tbMembers = arrayToObject(tbMembers, '_id');
                tbSubTask = arrayToObject(tbSubTask, '_taskId');
                avTasks = arrayToObject(avTasks, 'taskId');
                return tbTasks.map(task => {
                    // get involveMembers
                    let involveMembers = [];
                    task.involveMembers.forEach(memberId => {
                        involveMembers.push(tbMembers[memberId]);
                    });
                    // get subtasks and subtaskCount
                    let subtasks = tbSubTask[task._id];
                    let subtaskCount = {
                        done: 0,
                        total: 0
                    };
                    if (subtasks) {
                        subtasks.forEach(subtask => {
                            subtaskCount.total ++;
                            if (subtask.isDone) {
                                subtaskCount.done ++;
                            }
                        });
                    }
                    // get task from leancloud
                    let avTask = avTasks[task._id];
                    // generate task
                    return {
                        _id: task._id,
                        leancloudId: avTask ? avTask.id : undefined,
                        content: task.content,
                        subtasks: subtasks,
                        dueDate: this._dueDateBeautify(task.dueDate),
                        created: task.created,
                        subtaskCount: subtaskCount,
                        priority: task.priority,
                        involveMembers: involveMembers,
                        status: avTask ? avTask.status : STATUS.PAUSE,
                        lastStartTime: avTask ? avTask.lastStartTime : new Date()
                    };
                });
            }));
    }
    save(task) {
        if (task.leancloudId) {
            return this._avTask.update(task);
        }
        return this._avTask.create(task);
    }
    _dueDateBeautify(dueDate) {
        if (dueDate == null) {
            return {
                label: '',
                type: ''
            };
        }

        dueDate = new Date(dueDate);
        let now = new Date();
        let nowTimestamps = now.getTime();
        let dueDateTimestamps = dueDate.getTime();
        let type = '';

        let delta = dueDateTimestamps - nowTimestamps;

        if (delta < 0) {
            // has past
            type = DUEDATE_TYPE.DANGER;
        } else if (delta < MILLISECONDS.MILLISECONDS_PER_DAY) {
            // at the dueDate
            type = DUEDATE_TYPE.WARNING;
        } else if (delta < MILLISECONDS.MILLISECONDS_PER_WEEK) {
            // in one week
            type = DUEDATE_TYPE.NORMAL;
        }
        return {
            label: fecha.format(dueDate, 'YYYY-MM-DD'),
            type: type
        };
    }
    _isSameDay(one, two) {
        if (one.getDate() === two.getDate()) {
            return true;
        }
        return false;
    }
    _isSameWeek(one, two) {}
}

export default Task;
