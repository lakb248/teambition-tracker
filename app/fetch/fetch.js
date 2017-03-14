import axios from 'axios';
import Config from '../utils/config';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/fromPromise';
import Logger from '../utils/logger';

let logger = new Logger('[fetch/fetch]');

class Fetch {
    constructor() {
        this._http = null;
    }
    setToken(token) {
        logger.log(`init http with token(${token}) and base url(${Config.apiUrl})`);
        this._http = axios.create({
            baseURL: Config.apiUrl,
            headers: {
                Authorization: 'OAuth2 ' + token
            }
        });
    }
    get(path, query = {}) {
        // let params = '';
        // if (typeof query === 'object') {
        //
        // } else {
        //     params = query;
        // }
        return Observable.fromPromise(
            this._http.get(path)
                .then(res => {
                    if (res.status === 200) {
                        return res.data;
                    }
                })
        );
    }
    post(path, data) {
        return Observable.fromPromise(this._http.post({
            url: path,
            data: data
        }));
    }
    _queryToParams(query) {}
}

export default new Fetch();
