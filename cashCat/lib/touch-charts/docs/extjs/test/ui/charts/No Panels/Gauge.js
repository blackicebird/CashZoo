/*

This file is part of Ext JS 4

Copyright (c) 2011 Sencha Inc

Contact:  http://www.sencha.com/contact

Commercial Usage
Licensees holding valid commercial licenses may use this file in accordance with the Commercial Software License Agreement provided with the Software or, alternatively, in accordance with the terms contained in a written agreement between you and Sencha.

If you are unsure which license is appropriate for your use, please contact the sales department at http://www.sencha.com/contact.

*/
Ext.require(['Ext.chart.*', 'Ext.chart.series.*']);

Ext.onReady(function () {
    function createGauge(colors, donut) {
        return Ext.create('Ext.chart.Chart', {
            margin: '2, 50, 2, 50',
            width: 300,
            height: 200,
            animate: true,
            store: store1,
            insetPadding: 25,
            axes: [{
                type: 'Gauge',
                position: 'gauge',
                minimum: 0,
                maximum: 100,
                steps: 20,
                margin: 7
            }],
            series: [{
                type: 'gauge',
                field: 'data1',
                donut: donut,
                colorSet: colors,
                showInLegend: false,
                animate: true
            }]
        });
    }
    
    var chart1 = createGauge(['#F49D10', '#eee'], 20);
    var chart2 = createGauge(['#82B525', '#eee'], false);
    var chart3 = createGauge(['#3AA8CB', '#eee'], 70);
    
    Ext.create('Ext.Window', {
        width: 400,
        height: 670,
        title: 'Gauge Charts',
        tbar: [{
            text: 'Reload Data',
            handler: function() {
                store1.loadData(generateData(5));
            }
        }],
        items: [chart1, chart2, chart3]
    }).show();
    
});
