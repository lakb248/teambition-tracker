import TBProject from '../teambition/project';
import fecha from 'fecha';
import Cache from '../utils/cache';
// import {Observable} from 'rxjs/Observable';
// import 'rxjs/add/observable/fromPromise';
// import 'rxjs/add/observable/withLatestFrom';
import Rx from 'rxjs';
class Project {
    constructor(request) {
        this._tbProject = new TBProject(request);
    }
    all() {
        let resPromise = null;
        if (Cache.get('projects')) {
            resPromise = Promise.resolve(Cache.get('projects'));
        }
        resPromise = this._tbProject.getProjects()
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
        return Rx.Observable.fromPromise(resPromise);
    }
}
export default Project;
