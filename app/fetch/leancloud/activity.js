import AV from './leancloud';
import Logger from '../../utils/logger';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/fromPromise';

class AVActivity extends AV.Object {}
AV.Object.register(AVActivity);

let logger = new Logger('[fetch/leancloud/activity]');

class Activity {
    constructor() {
        this._query = new AV.Query('AVActivity');
    }
    getList() {
        logger.log('get activity list from leancloud');
        return Observable.fromPromise(this._query.find());
    }
    getOne(id) {
        logger.log(`get activity ${id} from leancloud`);
        return Observable.fromPromise(this._query.get(id));
    }
    addOne(data) {
        logger.log('add a new activity to leancloud');
        let activity = this._createAVActivity(data);
        return Observable.fromPromise(activity.save());
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
