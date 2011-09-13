/*

This file is part of Ext JS 4

Copyright (c) 2011 Sencha Inc

Contact:  http://www.sencha.com/contact

Commercial Usage
Licensees holding valid commercial licenses may use this file in accordance with the Commercial Software License Agreement provided with the Software or, alternatively, in accordance with the terms contained in a written agreement between you and Sencha.

If you are unsure which license is appropriate for your use, please contact the sales department at http://www.sencha.com/contact.

*/
Ext.onReady(function() {
    Ext.regModel('User', {
        fields: ['id', 'name'],
        hasMany: 'Order',

        proxy: {
            type: 'ajax',
            url :' OrderData.json',
            reader: {
                type: 'json',
                root: 'users'
            }
        }
    });

    Ext.regModel('Order', {
        fields: ['id', 'user_id', 'status'],
        belongsTo: 'User',
        hasMany: 'OrderItem'
    });

    Ext.regModel('OrderItem', {
        fields: ['id', 'order_id', 'product_id', 'price', 'quantity'],
        belongsTo: ["Order", "Product"]
    });

    Ext.regModel('Product', {
        fields: ['id', 'name', 'description', 'price', 'image'],
        hasMany: "OrderItem"
    });
    
    Ext.createByAlias('widget.dataview', {
        renderTo: Ext.getBody(),
        store: new Ext.data.Store({
            model: 'User',
            autoLoad: true
        }),
        itemSelector: 'div.order',
        tpl: [
            '<tpl for=".">',
                '{name}',
            '</tpl>'
        ]
    });
});
