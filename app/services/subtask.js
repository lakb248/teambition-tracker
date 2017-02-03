import TBSubTask from '../teambition/subtasks';
import EventEmitter from '../utils/event';

class SubTask extends EventEmitter {
    constructor(request) {
        super();
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
