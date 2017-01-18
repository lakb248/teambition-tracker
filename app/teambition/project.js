import Model from './model';
class Project extends Model {
    getProjects() {
        return this._http.request({
            url: '/projects'
        });
    }
}
export default Project;
