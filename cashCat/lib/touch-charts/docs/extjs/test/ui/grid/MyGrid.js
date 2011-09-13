/*

This file is part of Ext JS 4

Copyright (c) 2011 Sencha Inc

Contact:  http://www.sencha.com/contact

Commercial Usage
Licensees holding valid commercial licenses may use this file in accordance with the Commercial Software License Agreement provided with the Software or, alternatively, in accordance with the terms contained in a written agreement between you and Sencha.

If you are unsure which license is appropriate for your use, please contact the sales department at http://www.sencha.com/contact.

*/
Ext.define('MyGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.mygrid',
    initComponent: function() {
        this.columns = [{
            text     : 'Company',
            flex     : 1,
            sortable : false, 
            dataIndex: 'company'
        },{
            text     : 'Price',
            locked: true,
            width    : 75, 
            sortable : true, 
            dataIndex: 'price'
        },{
            text     : 'Change', 
            width    : 75, 
            sortable : true, 
            dataIndex: 'change'
        },{
            text     : '% Change', 
            width    : 75, 
            sortable : true, 
            dataIndex: 'pctChange'
        },{
            text     : 'Last Updated', 
            width    : 85, 
            sortable : true, 
            dataIndex: 'lastChange'
        }];
        this.callParent(arguments);
    }
})



