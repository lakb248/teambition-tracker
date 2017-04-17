import BaseModel from './base-model';

class SubtaskModel extends BaseModel {
    constructor() {
        super('subtask');
    }
}

export default new SubtaskModel();
