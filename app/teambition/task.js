import Model from './model';

class TBTask extends Model {
    me() {
        return this._http.request({
            url: '/v2/tasks/me'
        });
    }
}

export default TBTask;
