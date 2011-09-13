/*

This file is part of Ext JS 4

Copyright (c) 2011 Sencha Inc

Contact:  http://www.sencha.com/contact

Commercial Usage
Licensees holding valid commercial licenses may use this file in accordance with the Commercial Software License Agreement provided with the Software or, alternatively, in accordance with the terms contained in a written agreement between you and Sencha.

If you are unsure which license is appropriate for your use, please contact the sales department at http://www.sencha.com/contact.

*/
Ext.require('Ext.chart.*');

Ext.onReady(function () {
    var chart, myDate = new Date('1/1/11');
    myDate = Ext.Date.add(myDate, Ext.Date.SECOND, 10);
    var generateData = (function() {
        var data = [], i = 0, 
            last = false,
            date = new Date('1/1/2011'),
            seconds = +date,
            min = Math.min,
            max = Math.max,
            random = Math.random;
        return function(giveDate) {
            var myDate = Ext.Date.add(date, Ext.Date.SECOND, i++);
            data = data.slice();
            if (i % 7) {
                data.push({
                    date:  myDate,
                    visits: min(100, max(last? last.visits + (random() - 0.5) * 20 : random() * 100, 0)),
                    views: min(100, max(last? last.views + (random() - 0.5) * 10 : random() * 100, 0)),
                    users: min(100, max(last? last.users + (random() - 0.5) * 20 : random() * 100, 0))
                });
                last = data[data.length -1];
            }
            //return duple of last date and json data.
            return [myDate, data];
        };
    })();
    
    var store = new Ext.data.JsonStore({
        fields: ['date', 'visits', 'views', 'users'],
        data: generateData()[1]
    });
    
    var intr = setInterval(function() {
        var toDate = timeAxis.toDate,
            data = generateData(),
            lastDate = data[0],
            gs = data[1],
            markerIndex = chart.markerIndex || 0;
        if (+toDate < +lastDate) {
            markerIndex = 1;
            timeAxis.toDate = lastDate;
            timeAxis.fromDate = Ext.Date.add(timeAxis.fromDate, Ext.Date.SECOND, 1);
            chart.markerIndex = markerIndex;
        }
        store.loadData(gs);
    }, 1000);

    Ext.create('Ext.Window', {
        width: 800,
        height: 600,
        hidden: false,
        maximizable: true,
        title: 'Live Animated Chart',
        renderTo: Ext.getBody(),
        layout: 'fit',
        items: [{
            xtype: 'chart',
            id: 'chartCmp',
            store: store,
            animate: false,
            axes: [{
                type: 'Numeric',
                grid: true,
                minimum: 0,
                maximum: 100,
                position: 'left',
                fields: ['views', 'visits', 'users'],
                title: 'Number of Hits',
                grid: {
                    odd: {
                        fill: '#dedede',
                        stroke: '#ddd',
                        'stroke-width': 0.5
                    }
                }
            }, {
                type: 'Time',
                position: 'bottom',
                fields: 'date',
                title: 'Day',
                dateFormat: 'M d Y H i s',
                groupBy: 'year,month,day,hour,minute,second',
                aggregateOp: 'sum',

                constrain: true,
                fromDate: new Date('1/1/11'),
                toDate: myDate,
                step: [Ext.Date.SECOND, 1],
                grid: true
            }],
            series: [{
                type: 'line',
                axis: 'left',
                xField: 'date',
                yField: 'visits',
                label: {
                    display: 'none',
                    field: 'visits',
                    renderer: function(v) { return v >> 0; },
                    'text-anchor': 'middle'
                },
                markerConfig: {
                    radius: 5,
                    size: 5
                }
            },{
                type: 'line',
                axis: 'left',
                xField: 'date',
                yField: 'views',
                label: {
                    display: 'none',
                    field: 'visits',
                    renderer: function(v) { return v >> 0; },
                    'text-anchor': 'middle'
                },
                markerConfig: {
                    radius: 5,
                    size: 5
                }
            },{
                type: 'line',
                axis: 'left',
                xField: 'date',
                yField: 'users',
                label: {
                    display: 'none',
                    field: 'visits',
                    renderer: function(v) { return v >> 0; },
                    'text-anchor': 'middle'
                },
                markerConfig: {
                    radius: 5,
                    size: 5
                }
            }]
        }]
    });
    chart = Ext.getCmp('chartCmp');
    var timeAxis = chart.axes.get(1);
});
