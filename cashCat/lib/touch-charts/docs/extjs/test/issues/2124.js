/*

This file is part of Ext JS 4

Copyright (c) 2011 Sencha Inc

Contact:  http://www.sencha.com/contact

Commercial Usage
Licensees holding valid commercial licenses may use this file in accordance with the Commercial Software License Agreement provided with the Software or, alternatively, in accordance with the terms contained in a written agreement between you and Sencha.

If you are unsure which license is appropriate for your use, please contact the sales department at http://www.sencha.com/contact.

*/
Ext.Loader.setPath({
    'Ext.ux': '../../examples/ux'
});

Ext.require(['*']);

Ext.define('Issues.Grid2124', {
    extend: 'Ext.grid.Panel',
    requires: [
        'Ext.ux.RowExpander'
    ],
    alias: 'widget.grid2124',
    columns: [
        { text: 'Column 1', flex: 1, dataIndex: 'name' }
    ],
    plugins: [{
        ptype: 'rowexpander',
        rowBodyTpl : [
            '<p><b>Comments:</b> {name}</p>'
        ]
    }]
});

Ext.onReady(function(){
    function makeGrid () {
        var store = Ext.create('Ext.data.ArrayStore', {
            fields: [
               {name: 'name' }
            ],
            data: [
                [ 'Foo' ]
            ]
        });

        return {
            xtype: 'grid2124',
            title: 'Grid',
            style: 'margin-top: 10px;',
            anchor: '0',
            height: 100,
            store: store
        };
    }

    var panel = Ext.create('Ext.panel.Panel', {
        renderTo: Ext.getBody(),
        width: 500,
        layout: 'anchor',
        border: false,
        items: [
            makeGrid(),
            makeGrid()
        ]
    });
});

