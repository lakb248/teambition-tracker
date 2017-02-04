import AVActivity from '../leancloud/activity';
import Logger from '../utils/logger';
import AV from '../leancloud/leancloud';
import {setAvObjectByPlainObject, getObjectByKeyValue, getObjectFromAVRes} from '../utils/util';
import EventEmitter from '../utils/event';

import Cache from '../utils/cache';

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
                // update activity in cache
                let updatedActivity = getObjectByKeyValue(activityList, 'objectId', activity.objectId);
                updatedActivity.start = res.attributes.start;
                updatedActivity.end = res.attributes.end;
                logger.log('update activity and trigger `all-activity` event');
                EventEmitter.emit('all-activity', activityList);
            } else {
                // create an activity in cache
                activity.objectId = res.id;
                activityList.push(activity);
                logger.log('add activity and trigger `all-activity` event');
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
                        return getObjectFromAVRes(activity);
                    });
                    Cache.set('activity', res);
                    return res;
                }
                return res;
            });
    }
}

export default Activity;
