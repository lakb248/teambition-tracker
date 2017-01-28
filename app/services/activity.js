import AVActivity from '../leancloud/activity';

class Activity {
    constructor() {
        this._acActivity = new AVActivity();
    }
    save(activity) {
        if (activity.id) {
            return this._acActivity.update(activity);
        }
        return this._acActivity.create(activity);
    }
}

export default Activity;
