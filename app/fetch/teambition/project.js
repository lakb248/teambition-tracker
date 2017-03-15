import Fetch from '../fetch';
import Logger from '../../utils/logger';

let logger = new Logger('[fetch/teambition/project]');

class TBProject {
    getList() {
        logger.log('get project list from teambition');
        return Fetch.get('/projects');
    }
    getOne(id) {
        logger.log(`get project ${id} from teambition`);
        return Fetch.get(`/projects/${id}`);
    }
}
export default new TBProject();
