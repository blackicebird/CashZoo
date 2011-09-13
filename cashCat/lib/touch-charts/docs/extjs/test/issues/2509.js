/*

This file is part of Ext JS 4

Copyright (c) 2011 Sencha Inc

Contact:  http://www.sencha.com/contact

Commercial Usage
Licensees holding valid commercial licenses may use this file in accordance with the Commercial Software License Agreement provided with the Software or, alternatively, in accordance with the terms contained in a written agreement between you and Sencha.

If you are unsure which license is appropriate for your use, please contact the sales department at http://www.sencha.com/contact.

*/
Ext.require('Ext.tip.*');

Ext.onReady(function(){
    Ext.tip.QuickTipManager.init();
    Ext.create('Ext.panel.Panel', {
        width: 100,
        height: 100,
        renderTo: document.body,
        tools: [{
            type: 'help',
            tooltip: 'Foo!'
        }, {
            type: 'gear',
            tooltip: {
                title: 'Custom',
                text: 'Tip',
                width: 200,
                height: 50
            }
        }, {
            type: 'maximize',
            tooltip: 'Title only',
            tooltipType: 'title'
        }]
    });
    
});

