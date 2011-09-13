/*

This file is part of Ext JS 4

Copyright (c) 2011 Sencha Inc

Contact:  http://www.sencha.com/contact

Commercial Usage
Licensees holding valid commercial licenses may use this file in accordance with the Commercial Software License Agreement provided with the Software or, alternatively, in accordance with the terms contained in a written agreement between you and Sencha.

If you are unsure which license is appropriate for your use, please contact the sales department at http://www.sencha.com/contact.

*/
Ext.define('Item', {
    extend: 'Ext.data.Model',
    fields: ['a', 'b']
});

Ext.onReady(function(){

    var grid = Ext.create('Ext.grid.Panel', {
        width: 400,
        height: 400,
        renderTo: document.body,
        store: {
            model: 'Item',
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
        },
        selModel: {
            mode: 'MULTI'
        },
        columns: [{
            header: 'A',
            dataIndex: 'a'
        }, {
            header: 'B',
            dataIndex: 'b'
        }],
        dockedItems: [{
            xtype: 'toolbar',
            items: [{
                text: 'Select all',
                handler: function(){
                    grid.getSelectionModel().selectAll();
                }
            }, {
                text: 'Select all - suppress',
                handler: function(){
                    grid.getSelectionModel().selectAll(true);
                }
            }, {
                text: 'Deselect all',
                handler: function(){
                    grid.getSelectionModel().deselectAll();
                }
            }, {
                text: 'Deselect all - suppress',
                handler: function(){
                    grid.getSelectionModel().deselectAll(true);
                }
            }]
        }]
    });
    
    grid.getSelectionModel().on({
        select: function(){
            console.log('select');
        },
        deselect: function(){
            console.log('deselect');
        },
        selectionchange: function(){
            console.log('change');
        }
    });
    
});

