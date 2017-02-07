<template>
    <div class="project-card card" @click="onProjectClick(project._id)">
        <div class="project-logo" :style="{'background-image': 'url(' + project.logo + ')'}"></div>
        <div class="project-overview">
            <p class="project-overview--name">{{project.name}}</p>
            <p class="project-overview--createtime">{{project.created}}</p>
            <p class="project-overview--createtime">04:23 h</p>
        </div>
    </div>
</template>

<script>
export default {
    props: ['project'],
    data() {
        return {};
    },
    methods: {
        onProjectClick(projectId: Number): void {
            this.$emit('project-selected', projectId);
        }
    }
};
</script>

<style lang="sass">
    @import "../styles/theme.scss";
    $project-logo-square: 70px;
    .project-card {
        position: relative;
        height: $project-logo-square;
        cursor: pointer;
        &--more {
            position: absolute;
            right: 5px;
            bottom: 5px;
            width: 10px;
            height: 30px;
            border: 1px solid black;
        }
    }

    .project-logo {
        float: left;
        width: $project-logo-square;
        height: $project-logo-square;
        background-size: cover;
        background-repeat: no-repeat;
        background-position: center;
    }
    .project-overview {
        position: absolute;
        left: $project-logo-square;
        top: 0px;
        bottom: 0px;
        right: 0px;
        padding: 5px 10px;
        &--name {
            font-size: 14px;
            height: 20px;
            line-height: 20px;
            margin-bottom: 6px;
        }
        &--createtime {
            font-size: 10px;
            height: 15px;
            line-height: 15px;
            color: $gray;
            margin-bottom: 2px;
        }
    }
</style>
