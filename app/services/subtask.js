import TBSubTask from '../teambition/subtasks';

class SubTask {
    constructor(request) {
        this._tbSubTask = new TBSubTask(request);
    }
    getByTaskId(taskId) {
        return this._tbSubTask.getByTaskId(taskId);
    }
    me() {
        return this._tbSubTask.me();
    }
}

export default SubTask;
