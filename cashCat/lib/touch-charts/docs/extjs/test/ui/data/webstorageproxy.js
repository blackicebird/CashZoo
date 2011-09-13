/*

This file is part of Ext JS 4

Copyright (c) 2011 Sencha Inc

Contact:  http://www.sencha.com/contact

Commercial Usage
Licensees holding valid commercial licenses may use this file in accordance with the Commercial Software License Agreement provided with the Software or, alternatively, in accordance with the terms contained in a written agreement between you and Sencha.

If you are unsure which license is appropriate for your use, please contact the sales department at http://www.sencha.com/contact.

*/
Ext.require('Ext.data.*');
var store;
Ext.onReady(function() {
    Ext.regModel('spec.User', {
        fields: [
            {name: 'id',   type: 'int'},
            {name: 'name', type: 'string'}
        ]
    });

    store = Ext.create('Ext.data.Store', {
        model: 'spec.User',
        proxy: {
            id: 'lsTest',
            type: 'localstorage'
        }
    });
});
