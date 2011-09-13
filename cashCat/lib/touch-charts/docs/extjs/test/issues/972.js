/*

This file is part of Ext JS 4

Copyright (c) 2011 Sencha Inc

Contact:  http://www.sencha.com/contact

Commercial Usage
Licensees holding valid commercial licenses may use this file in accordance with the Commercial Software License Agreement provided with the Software or, alternatively, in accordance with the terms contained in a written agreement between you and Sencha.

If you are unsure which license is appropriate for your use, please contact the sales department at http://www.sencha.com/contact.

*/
Ext.require('*');

Ext.onReady(function() {
    function makeGrid (config) {
        return Ext.apply({
            xtype: 'grid',
            border: false,
            store: new Ext.data.ArrayStore({
                fields: [
                   { name: 'company' },
                   { name: 'price', type: 'float' },
                   { name: 'change', type: 'float' },
                   { name: 'pctChange', type: 'float' }
                ],
                data: [
                    ['3m Co',71.72,0.02,0.03,'9/1 12:00am'],
                    ['Alcoa Inc',29.01,0.42,1.47,'9/1 12:00am'],
                    ['American Express Company',52.55,0.01,0.02,'9/1 12:00am'],
                    ['American International Group, Inc.',64.13,0.31,0.49,'9/1 12:00am'],
                    ['AT&T Inc.',31.61,-0.48,-1.54,'9/1 12:00am'],
                    ['Caterpillar Inc.',67.27,0.92,1.39,'9/1 12:00am'],
                    ['Citigroup, Inc.',49.37,0.02,0.04,'9/1 12:00am'],
                    ['Exxon Mobil Corp',68.1,-0.43,-0.64,'9/1 12:00am'],
                    ['General Electric Company',34.14,-0.08,-0.23,'9/1 12:00am'],
                    ['General Motors Corporation',30.27,1.09,3.74,'9/1 12:00am'],
                    ['Hewlett-Packard Co.',36.53,-0.03,-0.08,'9/1 12:00am'],
                    ['Honeywell Intl Inc',38.77,0.05,0.13,'9/1 12:00am'],
                    ['Intel Corporation',19.88,0.31,1.58,'9/1 12:00am'],
                    ['Johnson & Johnson',64.72,0.06,0.09,'9/1 12:00am'],
                    ['Merck & Co., Inc.',40.96,0.41,1.01,'9/1 12:00am'],
                    ['Microsoft Corporation',25.84,0.14,0.54,'9/1 12:00am'],
                    ['The Coca-Cola Company',45.07,0.26,0.58,'9/1 12:00am'],
                    ['The Procter & Gamble Company',61.91,0.01,0.02,'9/1 12:00am'],
                    ['Wal-Mart Stores, Inc.',45.45,0.73,1.63,'9/1 12:00am'],
                    ['Walt Disney Company (The) (Holding Company)',29.89,0.24,0.81,'9/1 12:00am']
                ]
            }),
            columns: [
                new Ext.grid.RowNumberer(),
                {
                    text: "Company",
                    flex: 1,
                    sortable: true,
                    dataIndex: 'company'
                },
                {
                    text: "Price",
                    width: 70,
                    sortable: true,
                    renderer: Ext.util.Format.usMoney,
                    dataIndex: 'price'
                },
                {
                    text: "Change",
                    width: 70,
                    sortable: true,
                    dataIndex: 'change'
                },
                {
                    text: "% Change",
                    width: 70,
                    sortable: true,
                    dataIndex: 'pctChange'
                }
            ]
        }, config);
    }

    var window = Ext.create('Ext.window.Window', {
        renderTo: Ext.getBody(),
        autoShow: true,
        title: 'Grid 1',
        x: 20, y: 20,
        width: 440,
        height: 250,
        layout: 'fit',
        items: [
            makeGrid()
        ]
    });

    var window2 = Ext.create('Ext.panel.Panel', {
        renderTo: Ext.getBody(),
        autoShow: true,
        title: 'Grid 2 (framed)',
        x: 480, y: 20,
        width: 440,
        height: 250,
        frame: true,
        layout: 'fit',
        items: [
            makeGrid({
                border: true
            })
        ]
    });

    var window3 = Ext.create('Ext.window.Window', {
        renderTo: Ext.getBody(),
        autoShow: true,
        title: 'Grid 2',
        x: 20, y: 290,
        width: 440,
        height: 250,
        layout: 'fit',
        items: [
            (function () {
                var ret = makeGrid();

                ret.columns.splice(0, 1);
                ret.selModel = Ext.create('Ext.selection.CheckboxModel');
                return ret;
            })()
        ]
    });
});

