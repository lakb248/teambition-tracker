<template>
    <div class="main-panel">
        <div class="project-panel">
            <div class="search-panel">
                <i class="fui-search"></i>
                <input placeholder="搜索" type="text" v-model="projectSearchKey">
            </div>
            <ul class="project-list">
                <li v-for="project in filteredProject">
                    <project :project="project" @project-selected="onProjectSelected"></project>
                </li>
            </ul>
        </div>
        <div class="task-panel">
            <ul>
                <li v-for="task in tasks" style="margin-bottom: 10px;">
                    <task :task="task" @status-change="onTaskStatusChange"></task>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import ProjectService from '../services/project';
import ActivityService from '../services/activity';
import TaskService from '../services/task';
import ProjectCard from '../components/project.vue';
import TaskCard from '../components/task.vue';
import {TASK_STATUS} from '../utils/const.js';
import {getObjectByKeyValue} from '../utils/util';
import Logger from '../utils/logger';
import EventEmitter from '../services/event';

let projectService = null;
let taskService = null;
let activityService = null;
let taskTimer = -1;
let logger = new Logger('[index.vue]');

export default {
    data() {
        return {
            projects: [],
            tasks: [],
            projectSearchKey: ''
        };
    },
    components: {
        project: ProjectCard,
        task: TaskCard
    },
    computed: {
        filteredProject() {
            let key = this.projectSearchKey;
            let lowerCaseKey = key.toLowerCase();
            let upperCaseKey = key.toUpperCase();
            return this.projects.filter(project => {
                return project.name.indexOf(lowerCaseKey) !== -1 ||
                    project.name.indexOf(upperCaseKey) !== -1;
            });
        }
    },
    methods: {
        onProjectSelected(projectId) {
            console.log(projectId);
        },
        onTaskStatusChange(event) {
            logger.log('onTaskStatusChange', event.id, event.status);
            let task = getObjectByKeyValue(this.tasks, '_id', event.id);
            task.status = event.status;
            if (event.status === TASK_STATUS.PLAYING) {
                logger.log('start task');
                // mark startTime and start a timer
                var now = new Date().getTime();
                task.lastStartTime = now;
                taskService.save(task);
            } else {
                logger.log('pause task');
                // create a new activivty and stop the timer
                taskService.save(task)
                    .then(res => {
                        logger.log('clear taskTimer', res);
                        clearInterval(taskTimer);
                    });
                let activity = {};
                activity.start = task.lastStartTime;
                activity.end = new Date().getTime();
                activity.taskId = task._id;
                activityService.save(activity);
            }
        }
    },
    mounted() {
        projectService = new ProjectService(this.request);
        taskService = new TaskService(this.request, this.axios);
        activityService = new ActivityService();
        EventEmitter.on('all-task', tasks => {
            this.tasks = tasks;
        });
        let allProjects = projectService.all();
        let allTasks = taskService.all();

        // assemble data
        this.axios.all([allProjects, allTasks])
            .then(this.axios.spread(
                (
                projects: Object,
                tasks: Object
                ): void => {
                    this.projects = projects;
                    this.tasks = tasks;
                }));
    }
};

</script>

<style lang="sass">
    @import "../styles/theme.scss";
    .main-panel {
        width: 100%;
        height: 100%;
    }
    .project-panel, .task-panel {
        float: left;
        width: 35%;
        height: 100%;
        padding: 0px 10px;
        overflow: auto;
    }
    .task-panel {
        width: 65%;
    }
    .project-list {
        margin-top: 15px;
        li {
            margin-bottom: 10px;
        }
    }
    .search-panel {
        position: relative;
        width: 100%;
        height: 30px;
        padding-left: 30px;
        i {
            position: absolute;
            top: 5px;
            left: 5px;
            width: 20px;
            height: 20px;
            text-align: center;
            line-height: 20px;
            font-size: 16px;
        }
        input {
            width: 100%;
            height: 28px;
            line-height: 28px;
            padding-left: 10px;
            font-size: 14px;
            background-color: $light-gray;
        }
    }
</style>
