/*

This file is part of Ext JS 4

Copyright (c) 2011 Sencha Inc

Contact:  http://www.sencha.com/contact

Commercial Usage
Licensees holding valid commercial licenses may use this file in accordance with the Commercial Software License Agreement provided with the Software or, alternatively, in accordance with the terms contained in a written agreement between you and Sencha.

If you are unsure which license is appropriate for your use, please contact the sales department at http://www.sencha.com/contact.

*/
Ext.require([
    'Ext.grid.*',
    'Ext.tree.*'
]);

Ext.onReady(function() {    
    // var grid = new Ext.grid.Panel({
    //     renderTo: 'viewGrid',
    //     width: 400,
    //     height: 400,
    //     store: store,
    //     viewConfig: {
    //         plugins: [{
    //             ptype: 'gridviewdd'
    //         }]
    //     },
    //     selModel: {
    //         mode: 'MULTI'
    //     },
    //     columns: [{
    //         text     : 'Company',
    //         flex     : 1,
    //         sortable : false, 
    //         dataIndex: 'company'
    //     },
    //     {
    //         text     : 'Price', 
    //         width    : 75, 
    //         sortable : true, 
    //         renderer : 'usMoney', 
    //         dataIndex: 'price'
    //     },
    //     {
    //         text     : 'Change', 
    //         width    : 75, 
    //         sortable : true, 
    //         dataIndex: 'change'
    //     },
    //     {
    //         text     : '% Change', 
    //         width    : 75, 
    //         sortable : true, 
    //         dataIndex: 'pctChange'
    //     },
    //     {
    //         text     : 'Last Updated', 
    //         width    : 85, 
    //         sortable : true, 
    //         dataIndex: 'lastChange'
    //     }]
    // });
    
    var tree = new Ext.tree.Panel({
        //lines: false,
        //useArrows: true,
        store: treeStore,
        viewConfig: {
            plugins: [{
                ptype: 'treeviewdragdrop'
            }]
        },
        columns: [{
            xtype: 'treecolumn',
            text: 'File Name',
            flex: 1,
            sortable: false, 
            dataIndex: 'fileName'
        },{
            text: 'ID',
            flex: 1,
            sortable: false, 
            dataIndex: 'id'
        }]
    });
    
    var win = new Ext.window.Window({
        title: 'TreePanel Example',
        items: [tree],
        width: 500,
        height: 450,
        layout: 'fit'
    });
    
    win.show();
});
