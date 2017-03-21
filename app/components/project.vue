<template>
    <div class="project-card card" @click="onProjectClick(project._id)">
        <div class="project-logo" :style="{'background-image': 'url(' + project.logo + ')'}"></div>
        <div class="project-overview">
            <p class="project-overview--name">{{project.name}}</p>
            <p class="project-overview--createtime">{{project.created}}</p>
            <p class="project-overview--cost">{{cost}}</p>
        </div>
        <i class="iconfont icon-eye project-card--more" @click.stop="onProjectDetail(project._id)"></i>
    </div>
</template>

<script>
import {millisecondsToObject} from '../utils/util';
export default {
    props: ['project'],
    data() {
        return {};
    },
    computed: {
        cost() {
            let obj = millisecondsToObject(this.project.cost);
            return obj.hours + 'h ' + obj.minutes + 'm ' + obj.seconds + 's';
        }
    },
    methods: {
        onProjectClick(projectId) {
            this.$emit('project-selected', projectId);
        },
        onProjectDetail(projectId) {
            this.$emit('project-show', projectId);
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
            top: 5px;
            width: 20px;
            height: 20px;
            color: $gray;
            &:hover {
                color: $primary-color-hover;
            }
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
        &--cost {
            float: left;
            font-size: 10px;
            color: $black;
            padding: 0px 5px;
            border-radius: 2px;
            background-color: $light-gray;
        }
    }
</style>
