/*

This file is part of Ext JS 4

Copyright (c) 2011 Sencha Inc

Contact:  http://www.sencha.com/contact

Commercial Usage
Licensees holding valid commercial licenses may use this file in accordance with the Commercial Software License Agreement provided with the Software or, alternatively, in accordance with the terms contained in a written agreement between you and Sencha.

If you are unsure which license is appropriate for your use, please contact the sales department at http://www.sencha.com/contact.

*/
Ext.onReady(function () {
    var chart;
    store1.loadData(generateData(25));
    
    function createHandler(fieldName) {
        return function(sprite, record, attr, index, store) {
            var fieldValue = Math.random() * 20 + 20;
            var value = (record.get('data1') >> 0) % 8;
            var color = ['rgb(213, 70, 121)', 
                         'rgb(44, 153, 201)', 
                         'rgb(146, 6, 157)', 
                         'rgb(49, 149, 0)', 
                         'rgb(249, 153, 0)',
                         'rgb(0, 0, 0)',
                         'rgb(120, 120, 120)',
                         'rgb(200, 200, 200)'][value];
            return Ext.apply(attr, {
                radius: fieldValue,
                fill: color
            });
        };
    }

    Ext.get('reloadData').on('click', function() {
        store1.loadData(generateData(25));
    });
    chart = new Ext.chart.Chart({
        width: 800,
        height: 600,
        animate: true,
        store: store1,
        renderTo: Ext.getBody(),
        axes: false,
        insetPadding: 50,
        series: [{
            type: 'scatter',
            axis: false,
            xField: 'data1',
            yField: 'data2',
            label: {
                display: 'middle',
                field: 'data2',
                renderer: function (n) { return n >> 0; },
                'text-anchor': 'middle',
                contrast: true
            },
            renderer: createHandler('data2'),
            markerConfig: {
                type: 'circle',
                size: 5,
                fill: '#a00',
                'stroke-width': 0
            }
        }]
    });
});
