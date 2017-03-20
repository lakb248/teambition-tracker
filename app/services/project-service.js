import ProjectAPI from '../api/project-api';
import TaskService from './task-service';
import fecha from 'fecha';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/combineLatest';

import Logger from '../utils/logger';
let logger = new Logger('[services/project-service]');

class ProjectService {
    getList() {
        logger.log('get project list');
        return Observable.combineLatest(
            ProjectAPI.getList()
                .map(projectList => projectList.map(this._filterProjectProperty)),
            TaskService.getList()
        ).map(res => this._addCostToProjectList(res));
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
    _addCostToProjectList([projectList, taskList]) {
        return projectList.map(project => {
            return this._addCostToProject(project,
                taskList.filter(task => task.projectId === project._id));
        });
    }
    _addCostToProject(project, taskList) {
        let cost = 0;
        taskList.forEach(task => {
            cost += task.cost;
        });
        project.cost = cost;
        return project;
    }
}
export default new ProjectService();
