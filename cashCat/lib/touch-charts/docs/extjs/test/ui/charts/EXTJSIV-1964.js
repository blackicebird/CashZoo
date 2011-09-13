/*

This file is part of Ext JS 4

Copyright (c) 2011 Sencha Inc

Contact:  http://www.sencha.com/contact

Commercial Usage
Licensees holding valid commercial licenses may use this file in accordance with the Commercial Software License Agreement provided with the Software or, alternatively, in accordance with the terms contained in a written agreement between you and Sencha.

If you are unsure which license is appropriate for your use, please contact the sales department at http://www.sencha.com/contact.

*/
Ext.require('Ext.chart.*');
Ext.require('Ext.data.*');
Ext.require(['Ext.Window', 'Ext.layout.container.Fit', 'Ext.fx.target.Sprite']);

Ext.onReady(function() {   
var store1 = Ext.create('Ext.data.JsonStore', {
    fields: ['name', 'total', 'unique'],
    data:  [{ name: '04/03/2011', total: 0, unique: 0},
            { name: '04/04/2011', total: 0, unique: 0},
            { name: '04/05/2011', total: 0, unique: 0},
            { name: '04/06/2011', total: 0, unique: 0},
            { name: '04/07/2011', total: 0, unique: 0},
            { name: '04/08/2011', total: 0, unique: 0},
            { name: '04/09/2011', total: 0, unique: 0},
            { name: '04/10/2011', total: 0, unique: 0}]

});

Ext.create('Ext.panel.Panel', {
    border: false,
    height: 250,
    layout: 'fit',
    items: [{
        animate: true,
        axes: [{
            fields: ['total'],
            grid: true,
            minimum: 0,
            position: 'left',
            title: 'Number of Hits',
            type: 'Numeric'
        }, {
            fields: ['name'],
            grid: true,
            position: 'bottom',
            type: 'Category'
        }],
        height: 250,
        highlight: true,
        series: [{
            fill: true,
            highlight: true,
            smooth: true,
            type: 'line',
            xField: 'name',
            yField: 'total'
        }],
        store: store1,
        xtype: 'chart'
    }],
    renderTo: Ext.getBody(),
    width: 700
});

});

