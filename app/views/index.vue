<template>
    <div class="main-panel">
        <div class="project-panel">
            <ul>
                <li v-for="project in projects" style="margin-bottom: 10px;">
                    <project :project="project" @project-selected="onProjectSelected"></project>
                </li>
            </ul>
        </div>
        <div class="task-panel">
            <ul>
                <li v-for="task in tasks" style="margin-bottom: 10px;">
                    {{task.content}}
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

export default {
    data() {
        return {
            projects: [],
            tasks: []
        };
    },
    components: {
        project: ProjectCard
    },
    methods: {
        onProjectSelected(projectId) {
            console.log(projectId);
        }
    },
    mounted() {
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
                    projects = projects.data;
                    this.projects = projects;
                    tasks = tasks.data;
                    this.tasks = tasks;
                    console.log(modelUtil.groupByProjects(projects, tasks));
                }));
    }
};

</script>

<style lang="sass">
    .main-panel {
        width: 100%;
        height: 100%;
    }
    .project-panel {
        float: left;
        width: 35%;
        height: 100%;
    }
    .task-panel {
        float: left;
        width: 65%;
        height: 100%;
        padding-left: 20px;
        overflow: auto;
    }
</style>
