<template>
    <div class="main-panel">
        <div class="project-panel">
            <div class="search-panel">
                <i class="iconfont icon-search"></i>
                <input placeholder="搜索" type="text" v-model="projectSearchKey">
            </div>
            <ul class="project-list">
                <li v-show="isProjectLoading" class="card data-loading"></li>
                <li v-for="project in filteredProject">
                    <project :project="project" @project-selected="onProjectSelected" @project-show="onProjectShow"></project>
                </li>
            </ul>
        </div>
        <div class="task-panel">
            <ul>
                <li v-show="isTaskLoading" class="card data-loading"></li>
                <li v-for="task in filteredTask" style="margin-bottom: 10px;">
                    <task :task="task" @status-change="onTaskStatusChange" @done-status-change="onDoneStatusChange"></task>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import ProjectService from '../services/project-service';
import TaskService from '../services/task-service';
import SubtaskService from '../services/subtask-service';
import ActivityService from '../services/activity-service';
import ProjectOverview from '../components/project.vue';
import TaskCard from '../components/task.vue';
import {TASK_STATUS} from '../utils/const.js';
import {getObjectByKeyValue} from '../utils/util';
import Logger from '../utils/logger';

let taskTimer = -1;
let subscriptions = [];
let logger = new Logger('[index.vue]');

let getTaskByStatus = (tasks, status) => {
    tasks = tasks || [];
    for (let i = 0, l = tasks.length; i < l; i++) {
        if (tasks[i].status === status) {
            return tasks[i];
        }
    }
    return null;
};

/**
 * start task
 * 1. set lastStartTime to now if timer is zero
 * 2. set task timer
 * 3. change the status of task
 * 4. start the task timer
 * @param  {Object} task      the task to be start
 * @param  {Number} [timer=0] the initial timer of task
 */
let startTask = (task, timer = 0) => {
    logger.log(`start task ${task._id}`);

    let taskSub = TaskService.updateStatus(task._id, {
        objectId: task.objectId,
        status: TASK_STATUS.PLAYING,
        lastStartTime: timer === 0 ? new Date().getTime() : task.lastStartTime
    }).subscribe(res => {
        logger.log(`start task ${task._id} success!!!`);
    });

    subscriptions.push(taskSub);
};

/**
 * pause task
 * 1. reset task timer, and change the status of task
 * 2. clear timer
 * 3. create a new activity of task
 * @param  {Object} task the task to be paused
 * @param  {String} userId the userId
 * @param  {String} subtaskId the id of subtask if exist
 */
let pauseTask = (task, userId, subtaskId) => {
    logger.log(`pause task ${task._id} and clear task timer`);
    let taskSub = TaskService.updateStatus(task._id, {
        objectId: task.objectId,
        status: TASK_STATUS.PAUSE
    }).subscribe(() => {
        logger.log(`pause task ${task._id} success!!!`);
    });
    subscriptions.push(taskSub);

    // create a new activivty
    let activity = {};
    activity.start = task.lastStartTime;
    activity.end = new Date().getTime();
    activity.taskId = task._id;
    activity.userId = userId;
    let actSub = ActivityService.addOne(activity)
        .subscribe(activity => {
            logger.log('activity create success!!!');
        });
    subscriptions.push(actSub);
};

/**
 * reset task interval timer
 * @param {Array} tasks the task list
 */
let resetTaskInterval = tasks => {
    logger.log('reset task timer');
    let pTask = getTaskByStatus(tasks, TASK_STATUS.PLAYING);
    if (pTask != null) {
        // calculate timer of task by lastStartTime
        pTask.timer = new Date().getTime() - pTask.lastStartTime;
        taskTimer = setInterval(() => {
            pTask.timer += 1000;
        }, 1000);
    } else {
        clearInterval(taskTimer);
    }
};

export default {
    data() {
        return {
            projects: [],
            tasks: [],
            showedProject: {},
            projectSearchKey: '',
            selectedProjectId: -1,
            userId: -1,
            isProjectLoading: true,
            isTaskLoading: true
        };
    },
    components: {
        project: ProjectOverview,
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
        },
        filteredTask() {
            if (this.selectedProjectId === -1) {
                return this.tasks;
            }
            return this.tasks.filter(task => {
                return task.projectId === this.selectedProjectId;
            });
        }
    },
    methods: {
        onProjectSelected(projectId) {
            logger.log(`select project ${projectId}`);
            this.selectedProjectId = projectId;
        },
        onProjectShow(projectId) {
            logger.log(`show project ${projectId}`);
            let projectSub = ProjectService.getOne(projectId).subscribe(project => {
                this.showedProject = project;
            });
            subscriptions.push(projectSub);
        },
        onTaskStatusChange(event) {
            logger.log(`change status of task ${event.id} to ${event.status}`);
            let task = getObjectByKeyValue(this.tasks, '_id', event.id);
            let pTask = getTaskByStatus(this.tasks, TASK_STATUS.PLAYING);
            let userId = this.$parent._userId;
            if (event.status === TASK_STATUS.PLAYING) {
                // stop task that is playing
                if (pTask != null) {
                    pauseTask(pTask, userId);
                }
                // start task
                startTask(task);
            } else {
                // pause task
                pauseTask(task, userId);
            }
        },
        onDoneStatusChange(event) {
            logger.log(`set done status of subtask ${event.id} to ${event.isDone}`);
            if (event.type === 'subtask') {
                let subtaskSub = SubtaskService.updateStatus(event.id, event.isDone)
                                    .subscribe(res => {
                                        logger.log('done status change success!!!');
                                    });
                subscriptions.push(subtaskSub);
            }
        }
    },
    mounted() {
        clearInterval(taskTimer);
        let projectSub = ProjectService.getList().subscribe(projects => {
            logger.log('get project list from project service');
            this.projects = projects;
            this.isProjectLoading = false;
        });
        subscriptions.push(projectSub);
        let taskSub = TaskService.getList().subscribe(tasks => {
            logger.log('get task list from task service');
            this.tasks = tasks;
            this.isTaskLoading = false;
            resetTaskInterval(tasks);
        });
        subscriptions.push(taskSub);
    },
    beforeDestroy() {
        logger.log('beforeDestroy: unsubscribe all subscriptions');
        subscriptions.forEach(subscription => {
            subscription.unsubscribe();
        });
        subscriptions = [];
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
    .data-loading {
        width: 100%;
        height: 60px;
        background: url(../asserts/img/data-loading.gif) no-repeat center center;
        background-size: 400px 300px;
        background-color: $white;
    }
</style>
