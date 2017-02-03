<template>
    <div class="subtask">
        <i class="subtask--setup" :class="{
                    'fui-play': !isPlay,
                    'fui-pause': isPlay
                }"
            @click="toggleTaskStatus()"
                ></i>
        <div class="subtask--main">
            <div class="subtask--line">
                <div class="subtask--content">
                    {{subtask.content}}
                </div>
            </div>
            <div class="subtask--line">
                <div class="subtask--cost">{{subtask.cost}}</div>
                <div class="subtask--timer" v-show="isPlay">
                    <i class="fui-time"></i>
                    {{timer}}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {TASK_STATUS as STATUS} from '../utils/const.js';
// import {millisecondsToObject} from '../utils/util';

export default {
    props: ['subtask'],
    data() {
        return {};
    },
    computed: {
        isPlay() {
            return this.subtask.status === STATUS.PLAYING;
        }
    },
    methods: {
        toggleTaskStatus() {}
    },
    mounted() {
        this.$watch('subtask.status', val => {});
    }
};
</script>

<style lang="sass">
    @import "../styles/theme.scss";
    .subtask {
        float: left;
        padding: 2px;
        width: 100%;
        &--line {
            float: left;
            width: 100%;
        }
        &--setup {
            float: left;
            width: 20px;
            height: 20px;
            font-size: 10px;
            line-height: 20px;
            text-align: center;
            cursor: pointer;
        }
        &--main {
            overflow: hidden;
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
</style>
