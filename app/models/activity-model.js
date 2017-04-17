import BaseModel from './base-model';

class ActivityModel extends BaseModel {
    constructor() {
        super('activity', 'objectId');
    }
}

export default new ActivityModel();
