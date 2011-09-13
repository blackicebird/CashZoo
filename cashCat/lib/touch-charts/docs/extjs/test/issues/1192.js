/*

This file is part of Ext JS 4

Copyright (c) 2011 Sencha Inc

Contact:  http://www.sencha.com/contact

Commercial Usage
Licensees holding valid commercial licenses may use this file in accordance with the Commercial Software License Agreement provided with the Software or, alternatively, in accordance with the terms contained in a written agreement between you and Sencha.

If you are unsure which license is appropriate for your use, please contact the sales department at http://www.sencha.com/contact.

*/
Ext.require('*');
Ext.onReady(function() {
    Ext.createWidget('tabpanel', {
        width: 200,
        height: 100,
        renderTo: Ext.getBody(),
        items: [{
            title: 'Tab 1',
            html: 'Tab 1'
        }, {
            title: 'Tab 2',
            html: 'Tab 2'
        }]
    });
    
    Ext.createWidget('tabpanel', {
        width: 200,
        height: 100,
        renderTo: Ext.getBody()
    });
    
    Ext.createWidget('tabpanel', {
        width: 200,
        height: 100,
        activeTab: 1,
        renderTo: Ext.getBody(),
        items: [{
            title: 'Tab 1',
            html: 'Tab 1'
        }, {
            title: 'Tab 2',
            html: 'Tab 2'
        }]
    });
});
