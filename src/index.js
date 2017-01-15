'use strict';


var date = require('blear.utils.date');
var object = require('blear.utils.object');
var typeis = require('blear.utils.typeis');
var fun = require('blear.utils.function');
var array = require('blear.utils.array');


/**
 * 修正 date
 * @param d
 * @returns {{year: number, month: number, date: number, day: number}}
 */
var fixDateItem = function (d) {
    return {
        year: d.getFullYear(),
        month: d.getMonth(),
        date: d.getDate(),
        day: d.getDay()
    };
};


/**
 * 是否为今天
 * @param item
 * @returns {boolean}
 */
var isToday = function (item) {
    var today = new Date();
    var todayItem = fixDateItem(today);

    return item.year === todayItem.year &&
        item.month === todayItem.month &&
        item.date === todayItem.date;
};



/**
 * 计算开始和结束时间戳
 * @param item
 */
var calItemTime = function (item) {
    var thisDate = new Date(item.year, item.month, item.date);
    item.startTime = date.start(thisDate).getTime();
    item.endTime = date.end(thisDate).getTime();
};



var defaults = {
    /**
     * 一周的第一天星期几，默认为周日
     * @type Number
     */
    firstDayInWeek: 0,

    /**
     * 过滤器
     * @type Function
     * @param item
     * @returns {*}
     */
    filter: null
};


/**
 * 月历
 * @param year {Number} 年
 * @param month {Number} 序列月
 * @param [options] {Object|Function} 配置
 * @param [options.firstDayInWeek=0] {Number} 一周的第一天星期几，默认为0，即星期日
 * @param [options.weeks] {undefined|Number} 日历显示几周，默认最小行数，可以指定6+行
 * @param [options.filter] {null} 过滤器
 * @returns [Array] 月历数组
 */
exports.month = function calendar(year, month, options) {
    if (typeis.Function(options)) {
        options = {
            filter: options
        };
    }

    options = object.assign({}, defaults, options);

    var list = [];
    var prevDate = new Date(year, month - 1);
    var thisDate = new Date(year, month, 1);
    var nextDate = new Date(year, month + 1, 1);
    var thisMonthDays = date.getDaysInMonth(year, month);
    var thisMonthFirstDateDay = thisDate.getDay();
    var firstDayInWeek = options.firstDayInWeek;
    thisMonthFirstDateDay = thisMonthFirstDateDay < firstDayInWeek ? thisMonthFirstDateDay + 7 : thisMonthFirstDateDay;
    var deltaDays = thisMonthFirstDateDay - firstDayInWeek;
    var prevMonthDays = date.getDaysInMonth(year, month - 1);
    var i = 0;

    // 上月
    for (; i < deltaDays; i++) {
        list.push({
            year: prevDate.getFullYear(),
            month: prevDate.getMonth(),
            date: prevMonthDays - i,
            prevMonth: true
        });
    }

    list.reverse();

    // 本月
    for (i = 1; i <= thisMonthDays; i++) {
        list.push({
            year: thisDate.getFullYear(),
            month: thisDate.getMonth(),
            date: i,
            thisMonth: true
        });
    }

    deltaDays = list.length % 7;

    // 下月
    if (deltaDays) {
        for (i = 1; i <= 7 - deltaDays; i++) {
            list.push({
                year: nextDate.getFullYear(),
                month: nextDate.getMonth(),
                date: i,
                nextMonth: true
            });
        }
    } else {
        i = 1;
    }

    var weeks = Math.ceil(list.length / 7);
    var optionWeeks = options.weeks;
    if (typeis.Number(optionWeeks) && optionWeeks > weeks) {
        // 下个月
        var j = (optionWeeks - weeks) * 7;

        while (j--) {
            list.push({
                year: nextDate.getFullYear(),
                month: nextDate.getMonth(),
                date: i++,
                nextMonth: true
            });
        }
    }

    // 分组
    var group = [];
    var index = 0;
    var filter = fun.noop(options.filter);

    while (list.length) {
        var groupItem = list.splice(0, 7);
        array.each(groupItem, function (dayIndex, item) {
            item.id = date.id(item);
            item.prevMonth = item.prevMonth || false;
            item.thisMonth = item.thisMonth || false;
            item.nextMonth = item.nextMonth || false;
            item.today = isToday(item);
            calItemTime(item);
            item.day = (dayIndex + firstDayInWeek) % 7;
            // 第几周
            item.weeks = index;
            filter(item, index);
        });
        group.push(groupItem);
        index++;
    }

    return group;
};