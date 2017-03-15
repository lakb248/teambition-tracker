import TBProject from './teambition/project';
import Logger from '../utils/logger';

let logger = new Logger('[fetch/project-fetch]');

class ProjectFetch {
    getOne(id) {
        logger.log(`get project ${id} from server`);
        return TBProject.getOne(id);
    }
    getList() {
        logger.log('get project list from server');
        return TBProject.getList();
    }
    update() {}
    remove() {}
}
export default new ProjectFetch();
