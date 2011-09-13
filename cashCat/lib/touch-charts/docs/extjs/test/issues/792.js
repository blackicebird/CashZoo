/*

This file is part of Ext JS 4

Copyright (c) 2011 Sencha Inc

Contact:  http://www.sencha.com/contact

Commercial Usage
Licensees holding valid commercial licenses may use this file in accordance with the Commercial Software License Agreement provided with the Software or, alternatively, in accordance with the terms contained in a written agreement between you and Sencha.

If you are unsure which license is appropriate for your use, please contact the sales department at http://www.sencha.com/contact.

*/
Ext.require('Ext.tab.*');
Ext.onReady(function() {
    var tabCount = 2;
    
    Ext.create('Ext.tab.Panel', {
        renderTo: Ext.getBody(),
        width: 600,
        height: 200
    });
    
    Ext.create('Ext.tab.Panel', {
        renderTo: Ext.getBody(),
        width: 600,
        height: 200,
        activeTab: 1,
        items: [
            {
                xtype: 'panel',
                title: 'First Panel',
                html : 'Test 1'
            },
            {
                xtype: 'panel',
                title: 'Second Panel',
                html : 'Test 2'
            }
        ]
    });
    
    Ext.create('Ext.tab.Panel', {
        renderTo: Ext.getBody(),
        width: 600,
        height: 200,
        items: [
            {
                xtype: 'panel',
                title: 'First Panel',
                html : 'Test 1'
            },
            {
                xtype: 'panel',
                title: 'Second Panel',
                html : 'Test 2'
            }
        ]
    });
});
