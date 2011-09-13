/*

This file is part of Ext JS 4

Copyright (c) 2011 Sencha Inc

Contact:  http://www.sencha.com/contact

Commercial Usage
Licensees holding valid commercial licenses may use this file in accordance with the Commercial Software License Agreement provided with the Software or, alternatively, in accordance with the terms contained in a written agreement between you and Sencha.

If you are unsure which license is appropriate for your use, please contact the sales department at http://www.sencha.com/contact.

*/
Ext.require(['Ext.data.*']);
Ext.onReady(function() {
    var fields = [],
        columns = [],
        recordData = {},
        size = 100,
        i, m, store, grid;

    for (i = 0; i < size; i++) {
        columns.push({
            header: 'column' + i,
            dataIndex: 'column' + i,
            width: 100
        });
        fields.push({
            name: 'column' + i
        });
    }

    Ext.define('myModel', {
        extend: 'Ext.data.Model',
        fields: fields
    });

    store = Ext.create('Ext.data.Store', {
        model: 'myModel'
    });

    grid = Ext.create('Ext.grid.Panel', {
        border: false,
        columns: columns,
        store: store
    });

    for (i = 0; i < size; i++) {
        recordData['column' + i] = 'column' + i;
    }

    for (j = 0; j < size; j++) {
        m = Ext.ModelManager.create(recordData, 'myModel');
        store.add(m);
    }

    Ext.create('Ext.window.Window', {
        title: 'SLOW GRID',
        width: 700,
        height: 500,
        layout: 'fit',
        items: grid
    }).show();
});

