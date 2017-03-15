import AVActivity from '../fetch/leancloud/activity';
import Logger from '../utils/logger';
import AV from '../fetch/leancloud/leancloud';
import {setAvObjectByPlainObject, getObjectByKeyValue, getObjectFromAVRes} from '../utils/util';
import CalnedarUtil from '../utils/calendar-util';
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
    getByMonth(year, month) {
        let range = CalnedarUtil.getStartAndEndOfMonth(year, month);
        let start = range.start;
        let end = range.end;
        console.log(range);
        return this.all()
            .then(data => {
                console.log(data);
                let result = [];
                data.forEach(activity => {
                    if (activity.start >= start && activity.start < end) {
                        result.push(activity);
                    }
                });
                return result;
            });
    }
}

export default Activity;
