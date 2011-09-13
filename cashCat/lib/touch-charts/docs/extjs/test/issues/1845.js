/*

This file is part of Ext JS 4

Copyright (c) 2011 Sencha Inc

Contact:  http://www.sencha.com/contact

Commercial Usage
Licensees holding valid commercial licenses may use this file in accordance with the Commercial Software License Agreement provided with the Software or, alternatively, in accordance with the terms contained in a written agreement between you and Sencha.

If you are unsure which license is appropriate for your use, please contact the sales department at http://www.sencha.com/contact.

*/
Ext.onReady(function(){

    Ext.create('Ext.container.Viewport', {
        layout: 'border',
        items: [{
            collapsible: true,
            region: 'west',
            width: 200,
            split: true,
            hideCollapseTool: true,
            html: 'West'
        }, {
            region: 'center',
            layout: 'fit',
            dockedItems: [{
                xtype: 'toolbar',
                items: {
                    text: 'Collapse',
                    handler: function(){
                        Ext.getCmp('foo').collapse();
                    }
                }
            }],
            items: {
                id: 'foo',
                style: 'border: 5px solid red;',
                collapsible: true,
                hideCollapseTool: true
            }
        }, {
            collapsible: true,
            region: 'south',
            height: 200,
            split: true,
            hideCollapseTool: true,
            html: 'South'
        }]
    });
    
});

