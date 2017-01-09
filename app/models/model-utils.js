export default {
    groupByProjects(projects: Array, tasks: Array): Object {
        let projectMap = {};
        projects = projects || [];
        projects.forEach(project => {
            projectMap[project._id] = [];
        });
        tasks = tasks || [];
        tasks.forEach(task => {
            projectMap[task._projectId].push(task);
        });
        return projectMap;
    }
};
