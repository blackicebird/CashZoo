/*

This file is part of Ext JS 4

Copyright (c) 2011 Sencha Inc

Contact:  http://www.sencha.com/contact

Commercial Usage
Licensees holding valid commercial licenses may use this file in accordance with the Commercial Software License Agreement provided with the Software or, alternatively, in accordance with the terms contained in a written agreement between you and Sencha.

If you are unsure which license is appropriate for your use, please contact the sales department at http://www.sencha.com/contact.

*/
Ext.require([
    'Ext.data.*',
    'Ext.grid.*',
    'Ext.form.*',
    'Ext.FocusManager'
]);

Ext.onReady(function() {
    Ext.FocusManager.enable(true);
    var data = function() {
        var data = [];
        for (var i = 0; i < 100; i++) {
            data.push([
                i,
                'key' + i,
                'value' + i
            ]);
        }
        return data;
    }();
    
    Ext.regModel('Data', {
        fields: [
            'id',
            'key',
            'value'
        ]
    });
    
    Ext.create('Ext.data.Store', {
        storeId: 'DataStore',
        model: 'Data',
        data: data,
        proxy: {
            type: 'memory',
            reader: {
                type: 'array'
            }
        }
    });
    
    var grid = Ext.createWidget('gridpanel', {
        title: 'Data Grid',
        store: 'DataStore',
        width: 800,
        height: 300,
        renderTo: 'grid',
        headers: [{
            text: 'ID',
            dataIndex: 'id',
            flex: 1
        }, {
            text: 'Key',
            dataIndex: 'key',
            flex: 1
        }, {
            text: 'Value',
            dataIndex: 'value',
            flex: 1
        }],
        
        dockedItems: [{
            xtype: 'toolbar',
            items: [{
                xtype: 'textfield',
                dock: 'top',
                fieldLabel: 'Search',
                flex: 1,
                margins: '2 5',
                listeners: {
                    change: function(field, newValue, oldValue) {
                        var store = Ext.StoreManager.lookup('DataStore');
                        store.clearFilter();
                        store.filter('key', newValue);
                    }
                }
            }]
        }]
    });
});

