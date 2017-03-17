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
            <div class="today-selector" @click="jumpToToday()">今天</div>
            <div class="month-selector">
                <i class="iconfont icon-arrow-left" @click="lastMonth()"></i>
                <div class="month-selector--view">{{year}}年{{month}}月</div>
                <i class="iconfont icon-arrow-right" @click="nextMonth()"></i>
            </div>
        </div>
        <activity-calendar :month="month" :year="year" :activity="activity"></activity-calendar>
    </div>
</template>

<script>
import EventEmitter from '../utils/event';
import CalendarUtil from '../utils/calendar-util';
import ActivityCalendar from '../components/activity-calendar.vue';
import ActivityService from '../services/activity-service';

let subscriptions = [];

export default {
    components: {
        'activity-calendar': ActivityCalendar
    },
    data() {
        return {
            calendarType: 'month',
            month: new Date().getMonth() + 1,
            year: new Date().getFullYear(),
            activity: []
        };
    },
    methods: {
        calendarTypeChange(type = 'week') {
            this.calendarType = type;
        },
        lastMonth() {
            let res = CalendarUtil.getLastMonth(this.year, this.month);
            this.month = res.month;
            this.year = res.year;
        },
        nextMonth() {
            let res = CalendarUtil.getNextMonth(this.year, this.month);
            this.month = res.month;
            this.year = res.year;
        },
        jumpToToday() {
            let now = new Date();
            this.month = now.getMonth() + 1;
            this.year = now.getFullYear();
        }
    },
    watch: {
        year(val) {
            ActivityService.getByMonth(val, this.month)
                .subscribe(res => {
                    this.activity = res;
                });
        },
        month(val) {
            ActivityService.getByMonth(this.year, val)
                .subscribe(res => {
                    this.activity = res;
                });
        }
    },
    mounted() {
        EventEmitter.emit('loading-hide');
        let actSub = ActivityService.getByMonth(this.year, this.month)
            .subscribe(res => {
                this.activity = res;
            });
        subscriptions.push(actSub);
    },
    beforeDestroy() {
        subscriptions.forEach(subscription => {
            subscription.unsubscribe();
        });
        subscriptions = [];
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
    .today-selector {
        float: left;
        margin-left: 20px;
        width: 60px;
        height: 30px;
        line-height: 30px;
        text-align: center;
        color: $white;
        font-size: 12px;
        background-color: $primary-color;
        border-radius: 3px;
        cursor: pointer;
        &:hover {
            background-color: $primary-color-hover;
        }
    }
    $month-selector-width: 200px;
    $month-selector-height: 30px;
    $month-selector-arrow-width: 30px;
    $month-selector-view-margin: 10px;
    .month-selector {
        position: absolute;
        width: $month-selector-width;
        height: $month-selector-height;
        left: 50%;
        margin-left: -$month-selector-width / 2;
        i {
            float: left;
            width: $month-selector-arrow-width;
            height: $month-selector-arrow-width;
            line-height: $month-selector-arrow-width;
            text-align: center;
            margin-top: ($month-selector-height - $month-selector-arrow-width) / 2;
            font-size: 14px;
            cursor: pointer;
            &:hover {
                color: $primary-color-hover;
            }
        }
        &--view {
            float: left;
            width: $month-selector-width - 2 * $month-selector-view-margin - 2 * $month-selector-arrow-width;
            height: $month-selector-height;
            line-height: $month-selector-height;
            text-align: center;
            margin: 0px $month-selector-view-margin;
        }
    }
</style>
