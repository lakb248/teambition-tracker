import TBTask from '../teambition/task';
import TBUser from '../teambition/user';
import AV from '../leancloud/leancloud';
import AVTask from '../leancloud/task';
import ActivityService from './activity';
import SubtaskService from './subtask';
import EventEmitter from '../utils/event';

// import {Observable} from 'rxjs/Observable';
// import 'rxjs/add/observable/fromPromise';
import Rx from 'rxjs';

import {
    arrayToObject,
    setAvObjectByPlainObject,
    getObjectByKeyValue,
    getObjectFromAVRes
} from '../utils/util';
import fecha from 'fecha';
import Logger from '../utils/logger';
import Cache from '../utils/cache';

import {TASK_STATUS as STATUS, MILLISECONDS, DUEDATE_TYPE} from '../utils/const.js';

let logger = new Logger('[service/task]');

class Task {
    constructor(request, axios) {
        this._tbTask = new TBTask(request);
        this._tbUser = new TBUser(request);
        this._subtaskService = new SubtaskService(request);

        this._taskQuery = new AV.Query('AVTask');
        this._activityService = new ActivityService();
        EventEmitter.on('all-activity', activityList => {
            this._onActivityChange(activityList);
        });
        EventEmitter.on('all-subtask', subtasks => {
            this._onSubtasksChange(subtasks);
        });
        this._axios = axios;
    }
    all() {
        let resPromise = null;
        if (Cache.get('tasks')) {
            resPromise = Promise.resolve(Cache.get('tasks'));
        }
        let tbTaskReq = this._tbTask.me();
        let tbSubTaskReq = this._subtaskService.me();
        let tbMembersReq = this._tbUser.members();

        let avTaskReq = this._allAVTask();
        let avActivityReq = this._activityService.all();

        resPromise = this._axios.all([tbTaskReq, tbMembersReq, tbSubTaskReq, avTaskReq, avActivityReq])
            .then(this._axios.spread((tbTaskRes, tbMemberRes, tbSubTaskRes, avTaskRes, avActivityReq) => {
                let tbTasks = tbTaskRes.data;
                let tbMembers = tbMemberRes.data;
                let tbSubTask = tbSubTaskRes;

                let avTasks = avTaskRes;
                let avActivities = avActivityReq;
                // switch tbMembers and tbSubTask to Map by key
                tbMembers = arrayToObject(tbMembers, '_id');
                tbSubTask = arrayToObject(tbSubTask, '_taskId', true);
                avTasks = arrayToObject(avTasks, 'taskId');
                avActivities = arrayToObject(avActivities, 'taskId', true);
                let res = tbTasks.map(task => {
                    let avActivity = avActivities[task._id];
                    // get task from leancloud
                    let avTask = avTasks[task._id];
                    return this._generateTask(task, tbMembers, tbSubTask, avTask, avActivity);
                });
                Cache.set('tasks', res);
                return res;
            }));
        return Rx.Observable.fromPromise(resPromise);
    }
    save(task) {
        let result = null;
        // update task in leancloud
        if (task.objectId) {
            logger.log('update task in leancloud');
            let newTask = AV.Object.createWithoutData('AVTask', task.objectId);
            setAvObjectByPlainObject(newTask, {
                status: task.status,
                lastStartTime: task.lastStartTime
            });
            result = newTask.save();
        } else {
            // create new task in leancloud
            logger.log('create task in leancloud');
            let newTask = new AVTask();
            setAvObjectByPlainObject(newTask, {
                taskId: task._id,
                status: task.status,
                lastStartTime: task.lastStartTime
            });
            result = newTask.save();
        }
        return result.then(res => {
            logger.log('task save succeed', task._id);
            let tasks = Cache.get('tasks');
            let updatedTask = getObjectByKeyValue(tasks, '_id', task._id);
            getObjectFromAVRes(res, updatedTask);
            logger.log('update task in cache and trigger `all-task` event');
            EventEmitter.emit('all-task', tasks);
            return res;
        });
    }
    _allAVTask() {
        return this._taskQuery.find()
            .then(res => {
                if (res.length !== 0) {
                    res = res.map(task => {
                        let newTask = {};
                        newTask.id = task.id;
                        newTask.status = task.attributes.status;
                        newTask.taskId = task.attributes.taskId;
                        newTask.lastStartTime = task.attributes.lastStartTime;
                        return newTask;
                    });
                    return res;
                }
                return res;
            });
    }
    _onActivityChange(activities) {
        activities = arrayToObject(activities, 'taskId', true);
        let tasks = Cache.get('tasks');
        tasks.forEach(task => {
            let activityList = activities[task._id];
            task.activity = activityList;
            task.cost = this._getCostFromActivity(activityList);
        });
        logger.log('activity updated and trigger `all-task` event');
        EventEmitter.emit('all-task', tasks);
    }
    _onSubtasksChange(subtasks) {
        subtasks = arrayToObject(subtasks, '_taskId', true);
        let tasks = Cache.get('tasks');
        tasks.forEach(task => {
            let subtaskList = subtasks[task._id];
            task.subtasks = subtaskList;
            task.subtaskCount = this._getSubtasksCount(subtaskList);
        });
        logger.log('subtasks updated and trigger `all-task` event');
        EventEmitter.emit('all-task', tasks);
    }
    _getCostFromActivity(activity) {
        activity = activity || [];
        let cost = 0;
        activity.forEach(activity => {
            cost += activity.end - activity.start;
        });
        return cost;
    }
    _generateTask(task, tbMembers, tbSubTask, avTask, avActivity) {
        // get involveMembers
        let involveMembers = [];
        task.involveMembers.forEach(memberId => {
            involveMembers.push(tbMembers[memberId]);
        });
        // get subtasks and subtaskCount
        let subtasks = tbSubTask[task._id];
        let subtaskCount = this._getSubtasksCount(subtasks);
        // get status of task
        let status = avTask ? avTask.status : STATUS.PAUSE;
        // get timer of task
        let timer = 0;
        let lastStartTime = avTask ? avTask.lastStartTime : new Date();
        if (status === STATUS.PLAYING) {
            timer = new Date().getTime() - lastStartTime;
        }
        // generate task
        return {
            _id: task._id,
            objectId: avTask ? avTask.id : undefined,
            projectId: task._projectId,
            content: task.content,
            subtasks: subtasks,
            dueDate: this._dueDateBeautify(task.dueDate),
            created: task.created,
            subtaskCount: subtaskCount,
            priority: task.priority,
            involveMembers: involveMembers,
            activity: avActivity,
            cost: this._getCostFromActivity(avActivity),
            status: status,
            lastStartTime: lastStartTime,
            timer: timer
        };
    }
    _getSubtasksCount(subtasks) {
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
        return subtaskCount;
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
