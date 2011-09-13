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
    
    Ext.define('Order', {
        extend: 'Ext.data.Model',
        fields:['name', 'orders']
    });
    
    var store = new Ext.data.Store({
        model: 'Order',
        data: [
            {name:'Q1 \'10', orders: 45},
            {name:'Q2 \'10', orders: 123},
            {name:'Q3 \'10', orders: 145}
        ]
    });
    
    var chart = {
        xtype: 'chart',
        style: 'background:#fff',
        animate: true,
        store: store,
        shadow: true,
        axes: [{
            type: 'Numeric',
            minimum: 0,
            position: 'left',
            fields: ['orders'],
            title: 'Orders',
            minorTickSteps: 1,
            grid: {
                odd: {
                    opacity: 1,
                    fill: '#eee',
                    stroke: '#bbb',
                    'stroke-width': 0.5
                }
            }
        }, {
            type: 'Category',
            position: 'bottom',
            fields: ['name'],
            title: 'Quarter'
        }],
        series: [{
            type: 'line',
            highlight: {
                size: 7,
                radius: 7
            },
            tips: {
                width: 130,
                //trackMouse: true,
                renderer: function(storeItem, item) {
                    this.setTitle('Received ' + storeItem.get('orders') + 
                        ' orders in ' + storeItem.get('name'));
                }
            },
            axis: 'left',
            smooth: true,
            xField: 'name',
            yField: 'orders',
            markerConfig: {
                type: 'circle',
                size: 4,
                radius: 4,
                'stroke-width': 0
            }
        }]
    };

    Ext.create('Ext.Window', {
        width: 800,
        height: 600,
        hidden: false,
        maximizable: true,
        title: 'Mouse over a marker to see a console error',
        renderTo: Ext.getBody(),
        layout: 'fit',
        items: chart
    });
    
});

