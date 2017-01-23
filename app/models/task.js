import TBTask from '../teambition/task';
import TBSubTask from '../teambition/subtask';
import TBUser from '../teambition/user';
import Util from '../utils/util';
import fecha from 'fecha';

const MILLISECONDS_PER_HOUR = 60 * 60 * 1000;
const MILLISECONDS_PER_DAY = 24 * MILLISECONDS_PER_HOUR;
const MILLISECONDS_PER_WEEK = 7 * MILLISECONDS_PER_DAY;

class Task {
    constructor(request, axios) {
        this._tbTask = new TBTask(request);
        this._tbUser = new TBUser(request);
        this._tbSubTask = new TBSubTask(request);
        this._axios = axios;
    }
    all() {
        let tbTaskReq = this._tbTask.me();
        let tbSubTaskReq = this._tbSubTask.me();
        let tbMembersReq = this._tbUser.members();
        return this._axios.all([tbTaskReq, tbMembersReq, tbSubTaskReq])
            .then(this._axios.spread((tbTaskRes, tbMemberRes, tbSubTaskRes) => {
                let tbTasks = tbTaskRes.data;
                let tbMembers = tbMemberRes.data;
                let tbSubTask = tbSubTaskRes.data;
                // switch tbMembers and tbSubTask to Map by key
                tbMembers = Util.arrayToObject(tbMembers, '_id');
                tbSubTask = Util.arrayToObject(tbSubTask, '_taskId');
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
                    // generate task
                    return {
                        _id: task._id,
                        content: task.content,
                        subtasks: subtasks,
                        dueDate: this._dueDateBeautify(task.dueDate),
                        created: task.created,
                        subtaskCount: subtaskCount,
                        priority: task.priority,
                        involveMembers: involveMembers
                    };
                });
            }));
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
            type = 'danger';
        } else if (delta < MILLISECONDS_PER_DAY) {
            // at the dueDate
            type = 'warning';
        } else if (delta < MILLISECONDS_PER_WEEK) {
            // in one week
            type = 'normal';
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
