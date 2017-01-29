import AVActivity from '../leancloud/activity';
import Logger from '../utils/logger';
import AV from '../leancloud/leancloud';
import {setAvObjectByPlainObject} from '../utils/util';

let logger = new Logger('serviecs/activity');

class Activity {
    constructor() {
        this._query = new AV.Query('AVActivity');
    }
    save(activity) {
        // upadte activity
        if (activity.objectId) {
            logger.log('update activity', activity.objectId);
            let newActivity = AV.Object.createWithoutData('AVActivity', activity.id);
            setAvObjectByPlainObject(newActivity, activity);
            return newActivity.save();
        }
        // create activity
        let newActivity = new AVActivity();
        setAvObjectByPlainObject(newActivity, activity);
        logger.log('create activity');
        return newActivity.save();
    }
    all() {
        return this._query.find();
    }
}

export default Activity;
