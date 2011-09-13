/*

This file is part of Ext JS 4

Copyright (c) 2011 Sencha Inc

Contact:  http://www.sencha.com/contact

Commercial Usage
Licensees holding valid commercial licenses may use this file in accordance with the Commercial Software License Agreement provided with the Software or, alternatively, in accordance with the terms contained in a written agreement between you and Sencha.

If you are unsure which license is appropriate for your use, please contact the sales department at http://www.sencha.com/contact.

*/
Ext.onReady(function() {
    Ext.create('Ext.Panel', {
        id: 'outer',
        title: 'Some Panel',
        layout: {
            type: 'hbox',
            align: 'stretchmax'
        },
        renderTo: Ext.getBody(),
        width: 500,
        items: [{
            id: 'panel1',
            xtype: 'panel',
            flex: 1,
            height: 300,
            title: 'Panel 1',
            html: 'Panel 1'
        }, {
            id: 'panel2',
            xtype: 'panel',
            flex: 1,
            title: 'Panel 2',
            html: 'Panel 2'
        }],
        dockedItems: [{
            xtype: 'toolbar',
            items: [{
                id: 'button1',
                text: 'Button One'
            }, {
                id: 'button2',
                text: 'Button Two',
                handler: function() {
                    this.setHeight(50);
                }
            }]
        }]
    });
});
