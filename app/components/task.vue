<template>
    <div class="task-card card"
        :class="[priorityClass]">
        <i class="task-card--setup iconfont" :class="{
                    'icon-play': !isPending && !isPlay,
                    'icon-pause': !isPending && isPlay,
                    'icon-pending': isPending
                }"
            @click="toggleTaskStatus()"
                ></i>
        <div class="task-card--main">
            <div class="task-card--line">
                <div class="task-card--content" @dblclick="editTaskTitle($event)" :contenteditable="isTitleEditable" @blur="saveTaskTitle($event)">
                    {{task.content}}
                </div>
                <div class="task-card--member">
                    <span class="member-avatar" :title="member.name" v-for="member in task.involveMembers"
                        :style="{'background-image': 'url(' + member.avatarUrl + ')'}"
                    ></span>
                </div>
            </div>
            <div class="task-card--line" v-if="task.dueDate.label !== '' || task.cost > 999">
                <div class="task-card--dueDate" :class="[dueDateClass]" v-if="task.dueDate.label !== ''">{{task.dueDate.label}} 截止</div>
                <div class="task-card--cost" v-if="task.cost > 999">{{cost}}</div>
            </div>
            <div class="task-card--line" v-if="task.subtaskCount.total > 0">
                <div class="task-card--subtasks" @click="toggleSubTask()">
                    <i class="iconfont icon-list-columned"></i>
                    {{task.subtaskCount.done}}/{{task.subtaskCount.total}}
                </div>
            </div>
            <div class="subtask-panel" v-show="!!task.subtasks && isSubtaskShow">
                <ul>
                    <li v-for="subtask in task.subtasks">
                        <subtask :subtask="subtask" @done-status-change="onDoneStatusChange"></subtask>
                    </li>
                </ul>
            </div>
            <div class="task-card--line" v-show="isPlay">
                <div class="task-card--timer">
                    <i class="iconfont icon-clock"></i>
                    <span>{{timer}}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {TASK_STATUS as STATUS} from '../utils/const.js';
import {millisecondsToObject} from '../utils/util';
import SubTask from './subtask.vue';

/* global window, document */
let setRangeFromPoint = document.caretPositionFromPoint ?
    document.caretPositionFromPoint.bind(document) : document.caretRangeFromPoint.bind(document);
let setCursorToEnd = event => {
    let rect = event.target.getBoundingClientRect();
    let range = setRangeFromPoint(rect.left + rect.width, event.clientY);
    let sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);
};

export default {
    props: ['task'],
    components: {
        subtask: SubTask
    },
    data() {
        return {
            isSubtaskShow: false,
            isTitleEditable: false,
            isPending: false
        };
    },
    computed: {
        isPlay() {
            this.isPending = false;
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
        },
        cost() {
            let obj = millisecondsToObject(this.task.cost);
            return obj.hours + 'h ' + obj.minutes + 'm ' + obj.seconds + 's';
        }
    },
    methods: {
        toggleSubTask() {
            this.isSubtaskShow = !this.isSubtaskShow;
        },
        toggleTaskStatus() {
            this.isPending = true;
            let newStatus = this.task.status === STATUS.PLAYING ?
                STATUS.PAUSE : STATUS.PLAYING;
            this.$emit('status-change', {
                id: this.task._id,
                status: newStatus
            });
        },
        onDoneStatusChange(event) {
            event.type = 'subtask';
            this.$emit('done-status-change', event);
        },
        editTaskTitle(e) {
            this.isTitleEditable = true;
            setTimeout(() => {
                setCursorToEnd(e);
            }, 1);
        },
        saveTaskTitle(e) {
            this.isTitleEditable = false;
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
            font-size: 20px;
            line-height: 20px;
            text-align: center;
            margin-right: 5px;
            cursor: pointer;
        }
        &--content {
            float: left;
            font-size: 14px;
            &:focus {
                outline: none;
            }
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
                font-size: 10px;
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
            i {
                font-size: 12px;
            }
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
        float: left;
        width: 100%;
        font-size: 12px;
        border-radius: 2px;
        overflow: hidden;
    }
    .icon-pending {
        background: url(../asserts/img/data-loading.gif) no-repeat center center;
        background-size: 200px 150px;
    }
</style>
