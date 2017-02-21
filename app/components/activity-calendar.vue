<template>
    <div class="calendar-view card">
        <div class="calendar-view--header">
            <div class="calendar-view--weekname weekend">日</div>
            <div class="calendar-view--weekname">一</div>
            <div class="calendar-view--weekname">二</div>
            <div class="calendar-view--weekname">三</div>
            <div class="calendar-view--weekname">四</div>
            <div class="calendar-view--weekname">五</div>
            <div class="calendar-view--weekname weekend">六</div>
        </div>
        <div class="calendar-view--content">
            <div class="calendar-view--week" v-for="week in calendar">
                <div class="calendar-view--day" :class="{'weekend': index === 0 || index === 6}" v-for="(day, index) in week">
                    <span class="day-number" :class="{'today': isToday(day.date)}">{{day.date}}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import CalendarUtil from '../utils/calendar-util.js';
export default {
    props: {
        type: {
            type: String,
            default: 'week'
        },
        month: {
            type: Number,
            default: new Date().getMonth() + 1
        },
        year: {
            type: Number,
            default: new Date().getFullYear()
        }
    },
    watch: {
        month(val) {
            this.calendar = CalendarUtil.getCalendarViewModel(this.year, val, 'normal');
        },
        year(val) {
            this.calendar = CalendarUtil.getCalendarViewModel(val, this.month, 'normal');
        }
    },
    data() {
        return {
            calendar: []
        };
    },
    methods: {
        isToday(date) {
            let now = new Date();
            return now.getFullYear() === this.year &&
                (now.getMonth() + 1) === this.month &&
                now.getDate() === date;
        }
    },
    mounted() {
        this.calendar = CalendarUtil.getCalendarViewModel(this.year, this.month, 'normal');
    }
};
</script>

<style lang="sass">
    @import "../styles/theme.scss";
    .calendar-view {
        position: absolute;
        top: 50px;
        left: 10px;
        right: 10px;
        bottom: 10px;
        background-color: $white;
        font-size: 12px;
        &--header {
            position: absolute;
            height: 40px;
            width: 100%;
            line-height: 40px;
            border-bottom: 1px solid $light-gray;
        }
        &--content {
            position: absolute;
            top: 40px;
            bottom: 0px;
            left: 0px;
            right: 0px;
            overflow-y: scroll;
        }
        &--weekname {
            float: left;
            width: 14.286%;
            height: 40px;
            padding-left: 5px;
            &.weekend {
                color: $gray;
            }
        }
        &--week {
            width:100%;
            height: 20%;
            min-height: 128px;
            border-bottom: 1px solid $light-gray;
            &.six {
                height: 16.666%;
            }
        }
        &--day {
            float: left;
            width: 14.286%;
            height: 100%;
            padding: 5px;
            border-right: 1px solid $light-gray;
            &:nth-of-type(7n) {
                border: none;
            }
            &.weekend {
                color: $gray;
            }
        }
    }
    $day-number-square: 24px;
    .day-number {
        float: left;
        width: $day-number-square;
        height: $day-number-square;
        line-height: $day-number-square;
        text-align: center;
        &.today {
            background-color: $primary-color;
            border-radius: 50%;
            color: $white;
        }
    }
</style>
