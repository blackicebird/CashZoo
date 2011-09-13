/*

This file is part of Ext JS 4

Copyright (c) 2011 Sencha Inc

Contact:  http://www.sencha.com/contact

Commercial Usage
Licensees holding valid commercial licenses may use this file in accordance with the Commercial Software License Agreement provided with the Software or, alternatively, in accordance with the terms contained in a written agreement between you and Sencha.

If you are unsure which license is appropriate for your use, please contact the sales department at http://www.sencha.com/contact.

*/
Ext.require([
    'Ext.container.Container',
    'Ext.layout.container.HBox'
]);

Ext.onReady(function(){

    var ct = Ext.widget('container', {
        style: 'border:1px solid blue;',
        width: 600,
        layout: {
            type: 'hbox',
            align: 'stretchmax'
        },
        renderTo: Ext.getBody(),

        items: [{
            style: 'border:1px solid red;',
            xtype: 'container',
            flex: 1,
            items: [{
                xtype: 'component',
                html: 'foo'
            }]
        }, {
            style: 'border:1px solid red;',
            xtype: 'container',
            flex: 1,
            items: [{
                xtype: 'component',
                html: 'foo'
            }]
        }]
    });


    Ext.widget('button', {
        renderTo: Ext.getBody(),
        text: 'add item to first column',
        handler: function(){
            ct.items.getAt(0).add({
                xtype: 'component',
                html: 'foo'
            });
        }
    });

});
