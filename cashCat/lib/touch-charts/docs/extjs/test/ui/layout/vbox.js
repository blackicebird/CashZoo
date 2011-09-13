/*

This file is part of Ext JS 4

Copyright (c) 2011 Sencha Inc

Contact:  http://www.sencha.com/contact

Commercial Usage
Licensees holding valid commercial licenses may use this file in accordance with the Commercial Software License Agreement provided with the Software or, alternatively, in accordance with the terms contained in a written agreement between you and Sencha.

If you are unsure which license is appropriate for your use, please contact the sales department at http://www.sencha.com/contact.

*/
Ext.onReady(function() {
    Ext.create('Ext.Viewport', {
        id: 'vp',
        layout: {
            type: 'vbox',
            align: 'stretchmax'
        },
        items: [{
            xtype: 'panel',
            title: 'box 1',
            id: 'box1',
            margins: '5 5 0 5',
            width: 300,
            flex: 1,
            items: [{
                xtype: 'button',
                text: 'set box 1 to random width',
                handler: function() {
                    var w = Math.floor(Math.random() * 200) + 400;
                    Ext.getCmp('box1').setWidth(w);
                }
            }]
        },{
            xtype: 'panel',
            title: 'box 2',
            id: 'box2',
            margins: '5 5 0 5',
            width: 250,
            flex: 1,
            html: 'testing'
        },{
            xtype: 'panel',
            title: 'box 3',
            width: 180,
            id: 'box3',
            margins: '5 5 5 5',
            flex: 1,
            html: 'tiny space'
        }]
    });
});

