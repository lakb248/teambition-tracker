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
                let tbTask = tbTaskRes.data;
                let tbMember = tbMemberRes.data;
                tbMember = Util.arrayToObject(tbMember, '_id');
                let taskList = [];
                tbTask.forEach(task => {
                    let newTask = {};
                    newTask._id = task._id;
                    newTask.content = task.content;
                    newTask.subtasks = task.subtasks;
                    // newTask.involveMembers = task.involveMembers;
                    newTask.created = task.created;
                    newTask.subtaskCount = task.subtaskCount;
                    let involveMembers = task.involveMembers;
                    newTask.involveMembers = [];
                    involveMembers.forEach(memberId => {
                        newTask.involveMembers.push(tbMember[memberId]);
                    });
                    taskList.push(newTask);
                });
                return taskList;
            }));
    }
}

export default Task;
