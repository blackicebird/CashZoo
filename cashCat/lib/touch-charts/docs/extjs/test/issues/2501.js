/*

This file is part of Ext JS 4

Copyright (c) 2011 Sencha Inc

Contact:  http://www.sencha.com/contact

Commercial Usage
Licensees holding valid commercial licenses may use this file in accordance with the Commercial Software License Agreement provided with the Software or, alternatively, in accordance with the terms contained in a written agreement between you and Sencha.

If you are unsure which license is appropriate for your use, please contact the sales department at http://www.sencha.com/contact.

*/
Ext.require(['*']);

Ext.define('IDB.Temp', {
    extend : 'Ext.grid.Panel',
    alias : 'widget.IDB.Temp',
    store : 'storeItems',
    columns : [
        { text: 'Hostname', locked: true, dataIndex: 'hostname'},
        { text: 'Address', dataIndex: 'address' },
        { text: 'Comment', dataIndex: 'comment' }
    ],
    initComponent : function () {
        this.callParent(arguments);
    }
});

Ext.onReady(function(){
    // setup the state provider, all state information will be saved to a cookie
    Ext.state.Manager.setProvider(Ext.create('Ext.state.CookieProvider'));

    var store = Ext.create('Ext.data.ArrayStore', {
        id: 'storeItems',
        fields: [
           { name: 'hostname' },
           { name: 'address' },
           { name: 'comment' }
        ],
        data: [
            [ 'loopback', '127.0.0.1', 'This machine' ]
        ]
    });

    Ext.create('IDB.Temp', {
            title: 'Stateful Locking Grid',
            renderTo: Ext.getBody(),
            width: 500,
            height: 400
        });
});

