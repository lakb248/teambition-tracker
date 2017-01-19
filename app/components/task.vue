<template>
    <div class="task-card card">
        <div class="task-card--content">
            {{task.content}}
        </div>
        <div class="task-card--member">
            <span class="member-avatar" v-for="member in task.involveMembers"
                :style="{'background-image': 'url(' + member.avatarUrl + ')'}"
            ></span>
        </div>
        <div class="task-card--subtasks" v-show="task.subtaskCount.total > 0">
            <i class="fui-list-bulleted"></i>
            {{task.subtaskCount.done}}/{{task.subtaskCount.total}}
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
        overflow: hidden;
        &--content {
            float: left;
            font-size: 14px;
        }
        &--member {
            float: right;
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
    }
    .member-avatar {
        display: inline-block;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background-repeat: no-repeat;
        background-position: center;
        background-size: cover;
        margin-right: 5px;
    }
</style>
