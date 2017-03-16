import AV from './leancloud';
class AVActivity extends AV.Object {}
AV.Object.register(AVActivity);

import {getObjectFromAVRes} from '../../utils/util';

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/fromPromise';

import Logger from '../../utils/logger';
let logger = new Logger('[fetch/leancloud/activity]');

class Activity {
    constructor() {
        this._query = new AV.Query('AVActivity');
    }
    getList() {
        logger.log('get activity list from leancloud');
        return Observable.fromPromise(this._query.find())
            .map(list => list.map(item => getObjectFromAVRes(item)));
    }
    getOne(id) {
        logger.log(`get activity ${id} from leancloud`);
        return Observable.fromPromise(this._query.get(id))
            .map(activiyty => getObjectFromAVRes(activiyty));
    }
    addOne(data) {
        logger.log('add a new activity to leancloud');
        let activity = this._createAVActivity(data);
        return Observable.fromPromise(activity.save())
            .map(activiyty => getObjectFromAVRes(activiyty));
    }
    updateOne(id, patch) {}
    _createAVActivity(data = {}) {
        let activity = new AVActivity();
        Object.keys(data).forEach(key => {
            activity.set(key, data[key]);
        });
        return activity;
    }
}

export default new Activity();
