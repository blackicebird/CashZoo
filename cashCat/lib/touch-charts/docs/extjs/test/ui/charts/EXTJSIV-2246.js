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

Ext.onReady(function(){
    var panel = Ext.create('Ext.panel.Panel', {
        width: 800,
        height: 600,
        hidden: false,
        maximizable: true,
        title: 'Column Chart',
        renderTo: Ext.getBody(),
        layout: 'fit',
        tbar: [{
            text: 'Reload Data',
            handler: function(){
                store1.loadData(generateData());
            }
        }],
        items: {
            id: 'chartCmp',
            xtype: 'chart',
            style: 'background:#fff',
            animate: true,
            shadow: true,
            store: store1,
            legend: {
                position: 'right'
            },
            axes: [{
                type: 'Numeric',
                position: 'left',
                fields: ['data1', 'data2'],
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
                axis: 'left',
                highlight: false,
                xField: 'name',
                yField: 'data1',
                
                showInLegend: true,
                showInSeries: true,
                
                style: {
                    fill: '#09c' //blue
                }
            }, {
                type: 'column',
                axis: 'left',
                highlight: false,
                xField: 'name',
                yField: 'data2',
                showInLegend: true,
                showInSeries: true,
                style: {
                    fill: '#f60' //orange
                }
            
            }]
        }
    });
});
