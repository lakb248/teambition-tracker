<template>
    <div class="task-card">
        <div class="task-card--content">
            {{task.content}}
        </div>
        <div class="task-card--member">
            <span class="member-avatar" v-for="member in task.involveMembers"
                :style="{'background-image': 'url(' + member.avatarUrl + ')'}"
            ></span>
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
        box-shadow: $box-shadow;
        padding: 10px;
        overflow: hidden;
        &--content {
            float: left;
            font-size: 14px;
        }
        &--member {
            float: right;
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
