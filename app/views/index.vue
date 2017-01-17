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
                    <task :task="task"></task>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import Project from '../models/project';
import Task from '../models/task';
import modelUtil from '../models/model-utils';
import ProjectCard from '../components/project.vue';
import TaskCard from '../components/task.vue';

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
        }
    },
    mounted() {
        /* global window */
        let cache = window.localStorage;
        if (cache.getItem('projects') && cache.getItem('tasks')) {
            this.projects = JSON.parse(cache.getItem('projects')).data;
            this.tasks = JSON.parse(cache.getItem('tasks')).data;
        } else {
            let project = new Project(this.request);
            let allProjects = project.getProjects();
            let task = new Task(this.request);
            let allTasks = task.me();
            this.axios.all([allProjects, allTasks])
                .then(this.axios.spread(
                    (
                    projects: Object,
                    tasks: Object
                    ) => {
                        cache.setItem('projects', JSON.stringify(projects));
                        cache.setItem('tasks', JSON.stringify(tasks));
                        projects = projects.data;
                        this.projects = projects;
                        tasks = tasks.data;
                        this.tasks = tasks;
                        console.log(modelUtil.groupByProjects(projects, tasks));
                    }));
        }
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
            &:focus {
                border-bottom: 1px solid $light-gray;
            }
        }
    }
</style>
