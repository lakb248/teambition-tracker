<template>
    <div class="task-card card"
        :class="{
            'task-card__normal': task.priority === 0,
            'task-card__priority1': task.priority === 1,
            'task-card__priority2': task.priority === 2
        }">
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
        <div class="task-card--line" v-if="task.subtaskCount.total > 0">
            <div class="task-card--subtasks">
                <i class="fui-list-bulleted"></i>
                {{task.subtaskCount.done}}/{{task.subtaskCount.total}}
            </div>
        </div>
        <div class="task-card--line" v-if="task.dueDate.label !== ''">
            <div class="task-card--dueDate" :class="{
                'task-card--dueDate__normal': task.dueDate.type === 'normal',
                'task-card--dueDate__warning': task.dueDate.type === 'warning',
                'task-card--dueDate__danger': task.dueDate.type === 'danger'
                }">{{task.dueDate.label}} 截止</div>
        </div>
    </div>
</template>

<script>
export default {
    props: ['task'],
    data() {
        return {};
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

        &__normal {
            border-left-color: transparent;
        }
        &__priority1 {
            border-left-color: $warning-color;
        }
        &__priority2 {
            border-left-color: $danger-color;
        }

        &--line {
            float: left;
            width: 100%;
            margin-top: 5px;
            &:first-of-type {
                margin-top: 0px;
            }
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
            width: 100%;
            font-size: 10px;
            i {
                display: inline-block;
                width: 10px;
                height: 10px;
            }
        }
        &--dueDate {
            float: left;
            font-size: 10px;
            padding: 0px 5px;
            border-radius: 2px;
            background-color: $light-gray;
            color: $gray;
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
</style>
