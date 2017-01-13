<template>
    <div class="project-card">
        <div class="project-logo" :style="{'background-image': 'url(' + project.logo + ')'}"></div>
        <div class="project-overview">
            <p class="project-overview--name">{{project.name}}</p>
            <p class="project-overview--createtime">{{project.created}}</p>
            <p class="project-overview--createtime">04:23 h</p>

        </div>
        <div class="project-card--more">

        </div>
    </div>
</template>

<script>
export default {
    props: ['project'],
    data() {
        return {};
    }
};
</script>

<style lang="sass">
    @import "../styles/theme.scss";
    $project-logo-square: 63px;
    .project-card {
        position: relative;
        height: $project-logo-square;
        border-left: $project-logo-square solid transparent;
        box-shadow: $box-shadow;
        &--more {
            position: absolute;
            right: 5px;
            bottom: 5px;
            width: 10px;
            height: 20px;
            border: 1px solid black;
        }
    }

    .project-logo {
        float: left;
        width: $project-logo-square;
        height: $project-logo-square;
        margin-left: -$project-logo-square;
        background-size: cover;
        background-repeat: no-repeat;
        background-position: center;
    }
    .project-overview {
        padding: 5px 10px;
        &--name {
            font-size: 14px;
            height: 20px;
            line-height: 20px;
            margin-bottom: 3px;
        }
        &--createtime {
            font-size: 10px;
            height: 15px;
            line-height: 15px;
            color: $gray;
        }
    }
</style>
