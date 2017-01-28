import TBProject from '../teambition/project';
import fecha from 'fecha';
class Project {
    constructor(request) {
        this._tbProject = new TBProject(request);
    }
    all() {
        return this._tbProject.getProjects()
            .then(res => {
                let projects = res.data;
                return projects.map(project => {
                    return {
                        _id: project._id,
                        created: fecha.format(new Date(project.created), 'YYYY-MM-DD'),
                        name: project.name,
                        logo: project.logo
                    };
                });
            });
    }
}
export default Project;
