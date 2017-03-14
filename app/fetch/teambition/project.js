import Fetch from '../fetch';

class TBProject {
    getList() {
        return Fetch.get('/projects');
    }
    getOne(id) {
        return Fetch.get(`/projects/${id}`);
    }
}
export default new TBProject();
