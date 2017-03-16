import TaskAPI from '../api/task-api';
import UserAPI from '../api/user-api';
import ActivityAPI from '../api/activity-api';
import {arrayToObject} from '../utils/util';
import fecha from 'fecha';
import {MILLISECONDS, DUEDATE_TYPE} from '../utils/const.js';

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/operator/take';

import Logger from '../utils/logger';
let logger = new Logger('[service/task-service]');

class TaskService {
    getList() {
        logger.log('get task list');
        return Observable.combineLatest(
            TaskAPI.getList(),
            UserAPI.getMembers(),
            ActivityAPI.getList()
        ).map(res => this._generateTaskList(res));
    }
    updateStatus(id, task) {
        logger.log(`update status of task ${id} to ${task.status}`);
        return TaskAPI.updateStatus(id, task).take(1);
    }
    _generateTaskList([tasks, members, activityList]) {
        members = arrayToObject(members, '_id');
        activityList = arrayToObject(activityList, 'taskId', true);
        return tasks.map(task => this._generateTask(task, members, activityList[task._id]));
    }
    _generateTask(task, members, activityList) {
        let involveMembers = [];
        task.involveMembers.forEach(memberId => {
            involveMembers.push(members[memberId]);
        });
        return {
            _id: task._id,
            objectId: task.objectId,
            projectId: task._projectId,
            content: task.content,
            // subtasks: subtasks,
            subtasks: [],
            dueDate: this._dueDateBeautify(task.dueDate),
            created: task.created,
            // subtaskCount: subtaskCount,
            subtaskCount: {
                done: 0,
                total: 0
            },
            priority: task.priority,
            involveMembers: involveMembers,
            activity: activityList,
            cost: this._getCostFromActivity(activityList),
            status: task.status,
            lastStartTime: task.lastStartTime,
            timer: task.timer
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
    _getCostFromActivity(activity) {
        activity = activity || [];
        let cost = 0;
        activity.forEach(activity => {
            cost += activity.end - activity.start;
        });
        return cost;
    }
    _dueDateBeautify(dueDate) {
        if (!dueDate || dueDate == null) {
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

export default new TaskService();
