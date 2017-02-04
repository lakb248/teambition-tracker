import TBProject from '../teambition/project';
import fecha from 'fecha';
import Cache from '../utils/cache';
class Project {
    constructor(request) {
        this._tbProject = new TBProject(request);
    }
    all() {
        if (Cache.get('projects')) {
            return Promise.resolve(Cache.get('projects'));
        }
        return this._tbProject.getProjects()
            .then(res => {
                let projects = res.data;
                let result = projects.map(project => {
                    return {
                        _id: project._id,
                        created: fecha.format(new Date(project.created), 'YYYY-MM-DD'),
                        name: project.name,
                        logo: project.logo
                    };
                });
                Cache.set('projects', result);
                return result;
            });
    }
}
export default Project;
