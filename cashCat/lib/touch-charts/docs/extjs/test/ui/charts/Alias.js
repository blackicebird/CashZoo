/*

This file is part of Ext JS 4

Copyright (c) 2011 Sencha Inc

Contact:  http://www.sencha.com/contact

Commercial Usage
Licensees holding valid commercial licenses may use this file in accordance with the Commercial Software License Agreement provided with the Software or, alternatively, in accordance with the terms contained in a written agreement between you and Sencha.

If you are unsure which license is appropriate for your use, please contact the sales department at http://www.sencha.com/contact.

*/
Ext.require('Ext.chart.*');
Ext.require(['Ext.Window', 'Ext.fx.target.Sprite', 'Ext.layout.container.Fit']);

Ext.onReady(function () {
    var chart = Ext.create('Ext.chart.Chart', {
        width: 800,
        height: 600,
        animate: true,
        store: store1,
        renderTo: Ext.getBody(),
        axes: [{
            type: 'Numeric',
            grid: true,
            position: 'left',
            fields: ['data1', 'data2', 'data3'],
            title: 'Number of Hits',
            minimum: 0
        }, {
            type: 'Category',
            position: 'bottom',
            fields: ['name'],
            title: 'Month of the Year',
            grid: true,
            label: {
                rotate: {
                    degrees: 315
                }
            }
        }],
        series: []
    });

    var klass = Ext.define('mynamespace.MySeries', {
        alias: 'series.myseries',
        extend: 'Ext.chart.series.Area',
        type: 'myseries'
    });
    
    var mySeriesInstance = new klass({
        chart: chart,
        axis: 'left',
        xField: 'name',
        yField: ['data1', 'data2', 'data3'],
        style: {
            opacity: 0.93
        }
    });
    
    chart.series.add(mySeriesInstance);
    chart.redraw();

    
});

