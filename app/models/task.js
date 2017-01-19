import TBTask from '../teambition/task';
import TBUser from '../teambition/user';
import Util from '../utils/util';

class Task {
    constructor(request, axios):void {
        this._tbTask = new TBTask(request);
        this._tbUser = new TBUser(request);
        this._axios = axios;
    }
    all() {
        let tbTaskReq = this._tbTask.me();
        let tbMembersReq = this._tbUser.members();
        return this._axios.all([tbTaskReq, tbMembersReq])
            .then(this._axios.spread((tbTaskRes, tbMemberRes) => {
                let tbTasks = tbTaskRes.data;
                let tbMembers = tbMemberRes.data;
                tbMembers = Util.arrayToObject(tbMembers, '_id');
                return tbTasks.map(task => {
                    let newTask = {};
                    newTask._id = task._id;
                    newTask.content = task.content;
                    newTask.subtasks = task.subtasks;
                    newTask.dueDate = task.dueDate;
                    newTask.created = task.created;
                    newTask.subtaskCount = task.subtaskCount;
                    let involveMembers = task.involveMembers;
                    newTask.involveMembers = [];
                    involveMembers.forEach(memberId => {
                        newTask.involveMembers.push(tbMembers[memberId]);
                    });
                    return newTask;
                });
            }));
    }
}

export default Task;
