/**
 * 测试 文件
 * @author ydr.me
 * @create 2016-05-17 12:13
 */


'use strict';

var date = require('blear.utils.date');

var calendar = require('../src/index.js');

describe('index.js', function () {
    // it('.wrap', function () {
    //     var d0 = new Date();
    //     var d1 = calendar.wrap();
    //     var d2 = calendar.wrap(new Date(2016, 3, 11));
    //
    //     expect(d1.year).toEqual(d0.getFullYear());
    //     expect(d1.month).toEqual(d0.getMonth());
    //     expect(d1.date).toEqual(d0.getDate());
    //     expect(d1.today).toEqual(true);
    //
    //     expect(d2.year).toEqual(2016);
    //     expect(d2.month).toEqual(3);
    //     expect(d2.date).toEqual(11);
    //     expect(d2.day).toEqual(1);
    //     expect(d2.today).toEqual(false);
    //     expect(d2.id).toEqual(20160411);
    // });

    it('.month', function (done) {
        // 2016年4月
        var list = calendar.month(2016, 3);
        console.log(list);
        expect(list.length).toEqual(5);

        expect(list[0][0].id).toEqual(20160327);
        expect(list[0][0].year).toEqual(2016);
        expect(list[0][0].month).toEqual(2);
        expect(list[0][0].date).toEqual(27);
        expect(list[0][0].prevMonth).toEqual(true);
        expect(list[0][0].thisMonth).toEqual(false);
        expect(list[0][0].nextMonth).toEqual(false);
        expect(list[0][0].today).toEqual(false);
        expect(list[0][0].day).toEqual(0);

        expect(list[0][6].id).toEqual(20160402);
        expect(list[0][6].year).toEqual(2016);
        expect(list[0][6].month).toEqual(3);
        expect(list[0][6].date).toEqual(2);
        expect(list[0][6].prevMonth).toEqual(false);
        expect(list[0][6].thisMonth).toEqual(true);
        expect(list[0][6].nextMonth).toEqual(false);
        expect(list[0][6].today).toEqual(false);
        expect(list[0][6].day).toEqual(6);

        expect(list[4][6].id).toEqual(20160430);
        expect(list[4][6].year).toEqual(2016);
        expect(list[4][6].month).toEqual(3);
        expect(list[4][6].date).toEqual(30);
        expect(list[4][6].prevMonth).toEqual(false);
        expect(list[4][6].thisMonth).toEqual(true);
        expect(list[4][6].nextMonth).toEqual(false);
        expect(list[4][6].day).toEqual(6);

        done();
    });

    it('.month:filter', function (done) {
        // 起始日期 20160411
        var startDate = new Date(2016, 3, 11);
        var startDateId = date.id(startDate);
        // 起始日期 20160422
        var endDate = new Date(2016, 3, 22);
        var endDateId = date.id(endDate);
        // 2016年4月
        var list = calendar.month(2016, 3, function (item) {
            item.inScope = item.id >=startDateId && item.id <= endDateId;
        });
        console.log(list);
        expect(list.length).toEqual(5);

        expect(list[0][0].id).toEqual(20160327);
        expect(list[0][0].year).toEqual(2016);
        expect(list[0][0].month).toEqual(2);
        expect(list[0][0].date).toEqual(27);
        expect(list[0][0].prevMonth).toEqual(true);
        expect(list[0][0].thisMonth).toEqual(false);
        expect(list[0][0].nextMonth).toEqual(false);
        expect(list[0][0].today).toEqual(false);
        expect(list[0][0].inScope).toEqual(false);
        expect(list[0][0].day).toEqual(0);

        expect(list[0][6].id).toEqual(20160402);
        expect(list[0][6].year).toEqual(2016);
        expect(list[0][6].month).toEqual(3);
        expect(list[0][6].date).toEqual(2);
        expect(list[0][6].prevMonth).toEqual(false);
        expect(list[0][6].thisMonth).toEqual(true);
        expect(list[0][6].nextMonth).toEqual(false);
        expect(list[0][6].today).toEqual(false);
        expect(list[0][6].inScope).toEqual(false);
        expect(list[0][6].day).toEqual(6);

        expect(list[2][0].id).toEqual(20160410);
        expect(list[2][0].year).toEqual(2016);
        expect(list[2][0].month).toEqual(3);
        expect(list[2][0].date).toEqual(10);
        expect(list[2][0].prevMonth).toEqual(false);
        expect(list[2][0].thisMonth).toEqual(true);
        expect(list[2][0].nextMonth).toEqual(false);
        expect(list[2][0].today).toEqual(false);
        expect(list[2][0].inScope).toEqual(false);
        expect(list[2][0].day).toEqual(0);

        expect(list[2][1].id).toEqual(20160411);
        expect(list[2][1].year).toEqual(2016);
        expect(list[2][1].month).toEqual(3);
        expect(list[2][1].date).toEqual(11);
        expect(list[2][1].prevMonth).toEqual(false);
        expect(list[2][1].thisMonth).toEqual(true);
        expect(list[2][1].nextMonth).toEqual(false);
        expect(list[2][1].today).toEqual(false);
        expect(list[2][1].inScope).toEqual(true);
        expect(list[2][1].day).toEqual(1);

        expect(list[3][5].id).toEqual(20160422);
        expect(list[3][5].year).toEqual(2016);
        expect(list[3][5].month).toEqual(3);
        expect(list[3][5].date).toEqual(22);
        expect(list[3][5].prevMonth).toEqual(false);
        expect(list[3][5].thisMonth).toEqual(true);
        expect(list[3][5].nextMonth).toEqual(false);
        expect(list[3][5].today).toEqual(false);
        expect(list[3][5].inScope).toEqual(true);
        expect(list[3][5].day).toEqual(5);

        expect(list[3][6].id).toEqual(20160423);
        expect(list[3][6].year).toEqual(2016);
        expect(list[3][6].month).toEqual(3);
        expect(list[3][6].date).toEqual(23);
        expect(list[3][6].prevMonth).toEqual(false);
        expect(list[3][6].thisMonth).toEqual(true);
        expect(list[3][6].nextMonth).toEqual(false);
        expect(list[3][6].today).toEqual(false);
        expect(list[3][6].inScope).toEqual(false);
        expect(list[3][6].day).toEqual(6);

        expect(list[4][6].id).toEqual(20160430);
        expect(list[4][6].year).toEqual(2016);
        expect(list[4][6].month).toEqual(3);
        expect(list[4][6].date).toEqual(30);
        expect(list[4][6].prevMonth).toEqual(false);
        expect(list[4][6].thisMonth).toEqual(true);
        expect(list[4][6].nextMonth).toEqual(false);
        expect(list[4][6].inScope).toEqual(false);
        expect(list[4][6].day).toEqual(6);

        done();
    });



    it('.month:options', function (done) {
        // 2016年4月
        var list = calendar.month(2016, 3, {
            // 周二为一周开始
            firstDayInWeek: 2,
            // 显示7周
            weeks: 7
        });
        console.table(list);
        expect(list.length).toEqual(7);

        expect(list[0][0].id).toEqual(20160329);
        expect(list[0][0].year).toEqual(2016);
        expect(list[0][0].month).toEqual(2);
        expect(list[0][0].date).toEqual(29);
        expect(list[0][0].prevMonth).toEqual(true);
        expect(list[0][0].thisMonth).toEqual(false);
        expect(list[0][0].nextMonth).toEqual(false);
        expect(list[0][0].today).toEqual(false);
        expect(list[0][0].day).toEqual(2);

        expect(list[0][6].id).toEqual(20160404);
        expect(list[0][6].year).toEqual(2016);
        expect(list[0][6].month).toEqual(3);
        expect(list[0][6].date).toEqual(4);
        expect(list[0][6].prevMonth).toEqual(false);
        expect(list[0][6].thisMonth).toEqual(true);
        expect(list[0][6].nextMonth).toEqual(false);
        expect(list[0][6].today).toEqual(false);
        expect(list[0][6].day).toEqual(1);

        expect(list[6][6].id).toEqual(20160516);
        expect(list[6][6].year).toEqual(2016);
        expect(list[6][6].month).toEqual(4);
        expect(list[6][6].date).toEqual(16);
        expect(list[6][6].prevMonth).toEqual(false);
        expect(list[6][6].thisMonth).toEqual(false);
        expect(list[6][6].nextMonth).toEqual(true);
        expect(list[6][6].day).toEqual(1);

        done();
    });
});
