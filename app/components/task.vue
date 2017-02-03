<template>
    <div class="task-card card"
        :class="[priorityClass]">
        <i class="task-card--setup" :class="{
                    'fui-play': !isPlay,
                    'fui-pause': isPlay
                }"
            @click="toggleTaskStatus()"
                ></i>
        <div class="task-card--main">
            <div class="task-card--line">
                <div class="task-card--content">
                    {{task.content}}
                </div>
                <div class="task-card--member">
                    <span class="member-avatar" :title="member.name" v-for="member in task.involveMembers"
                        :style="{'background-image': 'url(' + member.avatarUrl + ')'}"
                    ></span>
                </div>
            </div>
            <div class="task-card--line" v-if="task.dueDate.label !== '' || task.objectId">
                <div class="task-card--dueDate" :class="[dueDateClass]" v-if="task.dueDate.label !== ''">{{task.dueDate.label}} 截止</div>
                <div class="task-card--cost">{{task.cost}}</div>
            </div>
            <div class="task-card--line" v-if="task.subtaskCount.total > 0">
                <div class="task-card--subtasks" @click="toggleSubTask()">
                    <i class="fui-list-bulleted"></i>
                    {{task.subtaskCount.done}}/{{task.subtaskCount.total}}
                </div>
            </div>
            <div class="subtask-panel" v-show="!!task.subtasks && isSubtaskShow">
                <ul>
                    <li v-for="subtask in task.subtasks">
                        <div class="subtask">
                            {{subtask.content}}
                        </div>
                    </li>
                </ul>
            </div>
            <div class="task-card--line" v-show="isPlay">
                <div class="task-card--timer">
                    <i class="fui-time"></i>
                    <span>{{timer}}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {TASK_STATUS as STATUS} from '../utils/const.js';
import {millisecondsToObject} from '../utils/util';

export default {
    props: ['task'],
    data() {
        return {
            isSubtaskShow: false
        };
    },
    computed: {
        isPlay() {
            return this.task.status === STATUS.PLAYING;
        },
        priorityClass() {
            return 'task-card__priority' + this.task.priority;
        },
        dueDateClass() {
            return 'task-card--dueDate__' + this.task.dueDate.type;
        },
        timer() {
            let obj = millisecondsToObject(this.task.timer);
            return obj.hours + ':' + obj.minutes + ':' + obj.seconds;
        }
    },
    methods: {
        toggleSubTask() {
            this.isSubtaskShow = !this.isSubtaskShow;
        },
        toggleTaskStatus() {
            let newStatus = this.task.status === STATUS.PLAYING ?
                STATUS.PAUSE : STATUS.PLAYING;
            this.$emit('status-change', {
                id: this.task._id,
                status: newStatus
            });
        }
    }
};
</script>

<style lang="sass">
    @import "../styles/theme.scss";
    .task-card {
        padding: 10px;
        border-left-width: 4px;
        border-left-style: solid;
        overflow: hidden;

        &__priority0 {
            border-left-color: transparent;
        }
        &__priority1 {
            border-left-color: $warning-color;
        }
        &__priority2 {
            border-left-color: $danger-color;
        }

        &--main {
            overflow: hidden;
        }

        &--line {
            float: left;
            width: 100%;
            margin-top: 5px;
            font-size: 10px;
            &:first-of-type {
                margin-top: 0px;
            }
        }
        &--setup {
            float: left;
            width: 20px;
            height: 20px;
            font-size: 10px;
            line-height: 20px;
            text-align: center;
            margin-right: 5px;
            cursor: pointer;
        }
        &--content {
            float: left;
            font-size: 14px;
        }
        &--member {
            float: right;
            height: 20px;
        }
        &--subtasks {
            float: left;
            cursor: pointer;
            i {
                display: inline-block;
                width: 10px;
                height: 10px;
            }
        }
        &--dueDate {
            float: left;
            padding: 0px 5px;
            border-radius: 2px;
            background-color: $light-gray;
            color: $gray;
            margin-right: 5px;
            &__normal {
                background-color: $primary-color;
                color: $white;
            }
            &__warning {
                background-color: $warning-color;
                color: $white;
            }
            &__danger {
                background-color: $danger-color;
                color: $white;
            }
        }
        &--cost {
            float: left;
            padding: 0px 5px;
            background-color: $light-gray;
            border-radius: 2px;
        }
        &--timer {
            float: left;
            font-size: 12px;
        }
    }
    .member-avatar {
        display: inline-block;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background-repeat: no-repeat;
        background-position: center;
        background-size: cover;
        margin-left: 5px;
    }
    .subtask-panel {
        font-size: 12px;
        border-radius: 2px;
        padding: 10px;
        overflow: hidden;
        ul {
            list-style-type: initial;
            padding-left: 20px;
        }
        li {
            margin: 5px 0px;
        }
    }
</style>
