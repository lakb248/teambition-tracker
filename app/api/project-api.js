import ProjectModel from '../models/project-model';
import ProjectFetch from '../fetch/project-fetch';
import 'rxjs/add/operator/concatMap';
import Logger from '../utils/logger';

let logger = new Logger('[api/project-api]');

class ProjectAPI {
    getList() {
        logger.log('try to get project list from cache');
        let cache = ProjectModel.getList();
        if (cache) {
            return cache;
        }
        logger.log('try to get project list from server');
        return ProjectFetch.getList()
            .concatMap(projectList => ProjectModel.addList(projectList));
    }
    getOne(projectId) {
        logger.log(`try to get project ${projectId} from cache`);
        let cache = ProjectModel.getOne(projectId);
        if (cache) {
            return cache;
        }
        logger.log(`try to get project ${projectId} from server`);
        return ProjectFetch.getOne(projectId)
            .concatMap(project => ProjectModel.addOne(project));
    }
}
export default new ProjectAPI();
