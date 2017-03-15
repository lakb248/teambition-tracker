import ProjectAPI from '../api/project-api';
import fecha from 'fecha';
import 'rxjs/add/operator/map';
import Logger from '../utils/logger';

let logger = new Logger('[services/project-service]');

class ProjectService {
    getList() {
        logger.log('get project list');
        return ProjectAPI.getList()
            .map(projectList => projectList.map(this._filterProjectProperty));
    }
    getOne(id) {
        logger.log(`get project ${id}`);
        return ProjectAPI.getOne(id);
    }
    _filterProjectProperty(project) {
        return {
            _id: project._id,
            created: fecha.format(new Date(project.created), 'YYYY-MM-DD'),
            name: project.name,
            logo: project.logo
        };
    }
}
export default new ProjectService();
