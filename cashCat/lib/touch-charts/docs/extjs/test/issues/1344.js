/*

This file is part of Ext JS 4

Copyright (c) 2011 Sencha Inc

Contact:  http://www.sencha.com/contact

Commercial Usage
Licensees holding valid commercial licenses may use this file in accordance with the Commercial Software License Agreement provided with the Software or, alternatively, in accordance with the terms contained in a written agreement between you and Sencha.

If you are unsure which license is appropriate for your use, please contact the sales department at http://www.sencha.com/contact.

*/
Ext.require('Ext.*');

Ext.onReady(function() {
    Ext.QuickTips.init();

    // sample static data for the store
    var myData = [
        ['3m Co',  true],
        ['Alcoa Inc',  false]
    ];


    var cellEditing = Ext.create('Ext.grid.plugin.CellEditing', {
        clicksToEdit: 1
    });
    
    // create the data store
    var store = Ext.create('Ext.data.ArrayStore', {
        fields: [
           {name: 'company'},
           {name: 'closed',      type: 'boolean'}
        ],
        data: myData
    });

    // create the Grid
    var grid = Ext.create('Ext.grid.Panel', {
        store: store,
        columns: [
            {
                text     : 'Company',
                flex     : 1,
                sortable : false,
                dataIndex: 'company',
                field: {
                    xtype: 'textfield'
                }
            },
            {
                text     : 'Closed',
                width    : 75,
                sortable : true,
                dataIndex: 'closed',
                xtype: 'booleancolumn',
                trueText: 'Yes',
                falseText: 'No',
                field: {
                  xtype: 'checkbox'
                }
            }
        ],
        height: 350,
        width: 600,
        title: 'Array Grid',
        renderTo: Ext.getBody(),
        viewConfig: {
            stripeRows: true
        },
        plugins: [cellEditing]
    });
    
});
