/*

This file is part of Ext JS 4

Copyright (c) 2011 Sencha Inc

Contact:  http://www.sencha.com/contact

Commercial Usage
Licensees holding valid commercial licenses may use this file in accordance with the Commercial Software License Agreement provided with the Software or, alternatively, in accordance with the terms contained in a written agreement between you and Sencha.

If you are unsure which license is appropriate for your use, please contact the sales department at http://www.sencha.com/contact.

*/
Ext.require('Ext.tip.*');
Ext.onReady(function() {
    
    Ext.tip.QuickTipManager.init();
    
    Ext.create('Ext.button.Button', {
        text: 'Foo',
        renderTo: document.body,
        tooltip: 'Normal tip'
    });
    
    Ext.create('Ext.button.Button', {
        text: 'Bar',
        renderTo: document.body,
        tooltip: {
            title: 'Foo',
            text: 'Custom tip',
            width: 200,
            height: 100
        }
    });
    
    Ext.create('Ext.button.Button', {
        text: 'Baz',
        renderTo: document.body,
        tooltip: 'Title tip',
        tooltipType: 'title'
    });
    
    Ext.create('Ext.button.Button', {
        split: true,
        text: 'Split1',
        renderTo: document.body,
        arrowTooltip: 'Arrow title',
        tooltipType: 'title'
    });
    
    Ext.create('Ext.button.Button', {
        split: true,
        text: 'Split2',
        renderTo: document.body,
        arrowTooltip: 'Arrow tip'
    });
    
});

