/*

This file is part of Ext JS 4

Copyright (c) 2011 Sencha Inc

Contact:  http://www.sencha.com/contact

Commercial Usage
Licensees holding valid commercial licenses may use this file in accordance with the Commercial Software License Agreement provided with the Software or, alternatively, in accordance with the terms contained in a written agreement between you and Sencha.

If you are unsure which license is appropriate for your use, please contact the sales department at http://www.sencha.com/contact.

*/
Ext.require('Ext.chart.*');
Ext.require(['Ext.Window', 'Ext.layout.container.Fit', 'Ext.fx.target.Sprite']);

Ext.onReady(function () {
    var store = Ext.create('Ext.data.JsonStore', {
        fields: ['name', 'data1', 'data2', 'data3', 'data4', 'data5'],
        data: [{
            'name': 'January',
            'data1': 0
        }, {
            'name': 'February',
            'data1': 0
        }, {
            'name': 'March',
            'data1': 0
        }, {
            'name': 'April',
            'data1': 0
        }, {
            'name': 'May',
            'data1': 20
        }]
    });

    Ext.create('Ext.chart.Chart', {
        renderTo: Ext.getBody(),
        width: 800,
        height: 600,
        animate: true,
        store: store,
        theme: 'Category1',
        legend: { // Pie Chart Legend Position 
            position: 'right'
        },
        series: [{
            type: 'pie',
            field: 'data1',
            showInLegend: true,
            tips: {
                trackMouse: true,
                width: 140,
                height: 28
            },
            highlight: {
                segment: {
                    margin: 5
                }
            }
        }]
    });
});
