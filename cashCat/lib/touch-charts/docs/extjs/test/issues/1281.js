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
    fields: ['name']
});

Ext.onReady(function(){

    Ext.create('Ext.view.View', {
        renderTo: document.body,
        width: 200,
        height: 200,
        store: {
            model: 'Item',
            data: [{
                name: 'Item 1'
            }, {
                name: 'Item 2'
            }, {
                name: 'Item 3'
            }, {
                name: 'Item 4'
            }],
            proxy: {
                type: 'memory'
            }
        },
        overItemCls: 'foo',
        itemTpl: '<div class="item">{name}</div>'
    });
    
    
});

