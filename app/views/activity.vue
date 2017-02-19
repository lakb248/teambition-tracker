<template>
    <div>
        <div class="activity-calendar-header">
            <ul class="calendar-type-selector">
                <li class="calendar-type-selector--option"
                    @click="calendarTypeChange('week')"
                    :class="{'selected': calendarType === 'week'}">周</li>
                <li class="calendar-type-selector--option"
                    @click="calendarTypeChange('month')"
                    :class="{'selected': calendarType === 'month'}">月</li>
            </ul>
        </div>
        <activity-calendar></activity-calendar>
    </div>
</template>

<script>
import EventEmitter from '../utils/event';
import CalendarUtil from '../utils/calendar-util';
import ActivityCalendar from '../components/activity-calendar.vue';

export default {
    components: {
        'activity-calendar': ActivityCalendar
    },
    data() {
        return {
            calendarType: 'week'
        };
    },
    mounted() {
        EventEmitter.emit('loading-hide');
        console.log(CalendarUtil.getCalendarViewModel(2017, 5, 'normal'));
    },
    methods: {
        calendarTypeChange(type) {
            console.log(type);
        }
    }
};
</script>

<style lang="sass">
    @import "../styles/theme.scss";
    .activity-calendar-header {
        overflow: hidden;
    }
    $selector-height: 30px;
    $selector-width: 70px;
    .calendar-type-selector {
        float: left;
        width: 2 * $selector-width;
        height: $selector-height;
        cursor: pointer;
        &--option {
            float: left;
            width: $selector-width;
            height: $selector-height;
            line-height: $selector-height;
            text-align: center;
            background-color: $primary-color;
            color: $white;
            font-size: 12px;
            &:hover {
                background-color: $primary-color-hover;
            }
            &.selected{
                background-color: $primary-color-dark;
            }
            &:first-of-type {
                border-radius: 3px 0px 0px 3px;
            }
            &:last-of-type {
                border-radius: 0px 3px 3px 0px;
            }
        }
    }
</style>
