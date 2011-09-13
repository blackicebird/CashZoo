/*

This file is part of Ext JS 4

Copyright (c) 2011 Sencha Inc

Contact:  http://www.sencha.com/contact

Commercial Usage
Licensees holding valid commercial licenses may use this file in accordance with the Commercial Software License Agreement provided with the Software or, alternatively, in accordance with the terms contained in a written agreement between you and Sencha.

If you are unsure which license is appropriate for your use, please contact the sales department at http://www.sencha.com/contact.

*/
Ext.require(['Ext.grid.*', 'Ext.data.*', 'Ext.util.*', 'Ext.state.*', 'Ext.window.*']);

Ext.onReady(function() {

    var store = Ext.create('Ext.data.ArrayStore', {
        fields: [
            { name: 'company' }
        ],
        data: [
            ['Row 1']
        ]
    });

    var columns = [
        {
            text: 'Column',
            flex: 1,
            sortable: false,
            dataIndex: 'company'
        }
    ];

    var grid = Ext.create('Ext.grid.Panel', {
        store: new Ext.data.ArrayStore(),
        columns: []
    });

    var window = new Ext.Window({
        x: 40, y: 40,
        height: 350,
        width: 600,
        title: 'Grid Reconfigure',
        autoShow: true,
        layout: 'fit',
        items: [
            {
                xtype: 'panel',
                border: false,
                layout: 'fit',
                items: [ grid ]
            }
        ],
        tools: [
            {
                type: 'refresh',
                handler: function () {
                    grid.reconfigure(store, columns);
                }
            }
        ],
        renderTo: Ext.getBody()
    });
});

