import BaseModel from './base-model';

class TaskModel extends BaseModel {
    constructor() {
        super('task');
    }
}

export default new TaskModel();
