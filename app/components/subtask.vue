<template>
    <div class="subtask">
        <div class="subtask--line">
            <i class="subtask--setup" :class="{
                        'fui-checkbox-unchecked': !subtask.isDone,
                        'fui-checkbox-checked': subtask.isDone
                    }"
                @click="toggleDoneStatus()"
                    ></i>
            <div class="subtask--content" :class="{'done': subtask.isDone}">
                {{subtask.content}}
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ['subtask'],
    data() {
        return {};
    },
    methods: {
        toggleDoneStatus() {
            this.$emit('done-status-change', {
                isDone: !this.subtask.isDone,
                id: this.subtask._id
            });
        }
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
            height: 20px;
        }
        &--setup {
            float: left;
            width: 20px;
            height: 20px;
            font-size: 14px;
            line-height: 20px;
            text-align: center;
            cursor: pointer;
        }
        &--content {
            line-height: 20px;
            margin-left: 25px;
            &.done {
                text-decoration: line-through;
            }
        }
    }
</style>
