import Model from './model';
class TBProject extends Model {
    getProjects() {
        return this._http.request({
            url: '/projects'
        });
    }
}
export default TBProject;
