import AVActivity from '../leancloud/activity';
import Logger from '../utils/logger';
import AV from '../leancloud/leancloud';
import {setAvObjectByPlainObject, getObjectByKeyValue} from '../utils/util';
import EventEmitter from './event';

import Cache from './cache';

let logger = new Logger('[serviecs/activity]');

class Activity {
    constructor() {
        this._query = new AV.Query('AVActivity');
    }
    save(activity) {
        let result = null;
        // upadte activity
        if (activity.objectId) {
            logger.log('update activity', activity.objectId);
            let newActivity = AV.Object.createWithoutData('AVActivity', activity.id);
            setAvObjectByPlainObject(newActivity, activity);
            result = newActivity.save();
        } else {
            // create activity
            let newActivity = new AVActivity();
            setAvObjectByPlainObject(newActivity, activity);
            logger.log('create activity');
            result = newActivity.save();
        }
        return result.then(res => {
            let activityList = Cache.get('activity');
            if (activity.objectId) {
                let updatedActivity = getObjectByKeyValue(activityList, 'objectId', activity.objectId);
                updatedActivity.start = res.attributes.start;
                updatedActivity.end = res.attributes.end;
                logger.log('update activity and trigger `all` event');
                EventEmitter.emit('all-activity', activityList);
            } else {
                activity.objectId = res.id;
                activityList.push(activity);
                logger.log('add activity and trigger `all` event');
                EventEmitter.emit('all-activity', activityList);
            }
            return res;
        });
    }
    all() {
        if (Cache.get('activity')) {
            return Promise.resolve(Cache.get('activity'));
        }
        return this._query.find()
            .then(res => {
                if (res.length !== 0) {
                    res = res.map(activity => {
                        let newActivity = {};
                        newActivity.id = activity.id;
                        newActivity.start = activity.attributes.start;
                        newActivity.end = activity.attributes.end;
                        newActivity.location = activity.attributes.location;
                        newActivity.taskId = activity.attributes.taskId;
                        return newActivity;
                    });
                    Cache.set('activity', res);
                    return res;
                }
                return res;
            });
    }
}

export default Activity;
