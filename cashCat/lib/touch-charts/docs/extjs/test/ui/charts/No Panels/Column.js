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

    Ext.get('reloadData').on('click', function() {
        store1.loadData(generateData());
    });
    chart = new Ext.chart.Chart({
        width: 800,
        height: 600,
        animate: true,
        store: store1,
        renderTo: Ext.getBody(),
        shadow: true,
        axes: [{
            type: 'Numeric',
            position: 'left',
            fields: ['data1'],
            label: {
                renderer: Ext.util.Format.numberRenderer('0,0')
            },
            title: 'Number of Hits',
            grid: true,
            minimum: 0
        }, {
            type: 'Category',
            position: 'bottom',
            fields: ['name'],
            title: 'Month of the Year'
        }],
        series: [{
            type: 'column',
            axis: 'bottom',
            highlight: true,
            xField: 'name',
            yField: 'data1'
        }]
    });
});
