/*

This file is part of Ext JS 4

Copyright (c) 2011 Sencha Inc

Contact:  http://www.sencha.com/contact

Commercial Usage
Licensees holding valid commercial licenses may use this file in accordance with the Commercial Software License Agreement provided with the Software or, alternatively, in accordance with the terms contained in a written agreement between you and Sencha.

If you are unsure which license is appropriate for your use, please contact the sales department at http://www.sencha.com/contact.

*/
Ext.require('Ext.chart.*');
Ext.onReady(function() {

    var today = new Date().getTime();

    var store = Ext.create('Ext.data.JsonStore', {
        fields: [{
            name: 'datetime',
            type: 'date'
        },
        {
            name: 'val',
            type: 'float'
        }],
        data: [{
            datetime: new Date(today + (0 * 24 * 3600 * 1000)),
            val: 5
        },
        {
            datetime: new Date(today + (1 * 24 * 3600 * 1000)),
            val: 10
        },
        {
            datetime: new Date(today + (2 * 24 * 3600 * 1000)),
            val: 2
        },
        {
            datetime: new Date(today + (3 * 24 * 3600 * 1000)),
            val: 12
        },
        {
            datetime: new Date(today + (4 * 24 * 3600 * 1000)),
            val: 25
        },
        {
            datetime: new Date(today + (5 * 24 * 3600 * 1000)),
            val: 30
        },
        {
            datetime: new Date(today + (6 * 24 * 3600 * 1000)),
            val: 8
        }]
    });

    var chart = Ext.create('Ext.chart.Chart', {
        animate: false,
        shadow: true,
        store: store,
        axes: [{
            type: 'Time',
            dateFormat: 'M d',
            position: 'bottom',
            fields: 'datetime',
            title: 'Date'
        },
        {
            type: 'Numeric',
            position: 'left',
            fields: 'val',
            title: 'Utilization (%)',
            grid: false,
            minimum: 0,
            maximum: 100
        }],
        series: [{
            type: 'scatter',
            axis: 'left',
            xField: 'datetime',
            yField: 'val',
            color: '#ccc',
            markerConfig: {
                type: 'circle',
                radius: 3,
                size: 3
            }
        }]
    });

    var win = Ext.create('Ext.Window', {
        width: 800,
        height: 600,
        hidden: false,
        maximizable: true,
        title: 'Scatter Chart Test',
        renderTo: Ext.getBody(),
        layout: 'fit',
        items: chart
    });
});

