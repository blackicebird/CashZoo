/*

This file is part of Ext JS 4

Copyright (c) 2011 Sencha Inc

Contact:  http://www.sencha.com/contact

Commercial Usage
Licensees holding valid commercial licenses may use this file in accordance with the Commercial Software License Agreement provided with the Software or, alternatively, in accordance with the terms contained in a written agreement between you and Sencha.

If you are unsure which license is appropriate for your use, please contact the sales department at http://www.sencha.com/contact.

*/
Ext.define('Thing', {
    extend: 'Ext.data.Model',
    fields: ['a', 'b']
});

Ext.onReady(function() {
    
    var store = Ext.create('Ext.data.Store', {
        model: 'Thing',
        proxy: 'memory',
        data: [{
            a: 1,
            b: 2
        }, {
            a: 3,
            b: 4
        }, {
            a: 5,
            b: 6
        }]    
    });
    
    var editing = Ext.create('Ext.grid.plugin.CellEditing', {
        listeners: {
            beforeedit: function(context){
                if (context.rowIdx % 2 === 0) {
                    context.column.setEditor({
                        xtype: 'numberfield'
                    });
                } else {
                    context.column.setEditor({
                        xtype: 'textfield'
                    });
                }
            }
        }
    });
    
    Ext.create('Ext.grid.Panel', {
        width: 400,
        height: 400,
        renderTo: document.body,
        plugins: [editing],
        store: store,
        columns: [{
            header: 'Col A',
            dataIndex: 'a'
        }] 
    });
    
});

