/*

This file is part of Ext JS 4

Copyright (c) 2011 Sencha Inc

Contact:  http://www.sencha.com/contact

Commercial Usage
Licensees holding valid commercial licenses may use this file in accordance with the Commercial Software License Agreement provided with the Software or, alternatively, in accordance with the terms contained in a written agreement between you and Sencha.

If you are unsure which license is appropriate for your use, please contact the sales department at http://www.sencha.com/contact.

*/
Ext.require(['Ext.grid.*', 'Ext.data.*']);
Ext.onReady(function(){
    Ext.QuickTips.init();
    
    // sample static data for the store
    var myData = [['3m Co'], ['Alcoa Inc'], ['Altria Group Inc'], ['American Express Company']];
    
    // create the data store
    var store = new Ext.data.ArrayStore({
        fields: [{
            name: 'company'
        }],
        data: myData
    });
    
    // create the Grid
    var grid = new Ext.grid.Panel({
        store: store,
        columnLines: true,
        border: "0 1",
        columns: [{
            text: 'Company',
            flex: 1,
            sortable: false,
            dataIndex: 'company'
        }],
        dockedItems: [{
            xtype: 'panel',
            title: 'Docked panel',
            collapsible: true,
            collapsed: true,
            autoScroll: true,
            split: true,
            resizable: {
                handles: 's'
            },
            items: [{
                xtype: 'textfield'
            }, {
                xtype: 'textfield'
            }]
        
        }],
        height: 350,
        width: 600,
        title: 'Array Grid',
        renderTo: document.body,
        viewConfig: {
            stripeRows: true
        }
    });
});

