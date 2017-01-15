<template>
    <div class="task-card">
        <div class="task-card--content">
            {{task.content}}
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
        &--content {
            font-size: 14px;
        }
    }
</style>
