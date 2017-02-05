<template>
    <div>calendar</div>
</template>

<script>
import EventEmitter from '../utils/event';
export default {
    data() {
        return {};
    },
    mounted() {
        EventEmitter.emit('loading-hide');
    }
};
</script>

<style lang="sass">
</style>
