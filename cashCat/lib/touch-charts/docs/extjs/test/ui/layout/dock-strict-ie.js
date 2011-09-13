/*

This file is part of Ext JS 4

Copyright (c) 2011 Sencha Inc

Contact:  http://www.sencha.com/contact

Commercial Usage
Licensees holding valid commercial licenses may use this file in accordance with the Commercial Software License Agreement provided with the Software or, alternatively, in accordance with the terms contained in a written agreement between you and Sencha.

If you are unsure which license is appropriate for your use, please contact the sales department at http://www.sencha.com/contact.

*/
Ext.require(
    'Ext.panel.Panel'
);

Ext.onReady(function() {
    new Ext.Panel({
        renderTo: 'dock-example',
        title: 'foo',
        width: 300,
        height: 200,
        dockedItems: [{
            xtype: 'component',
            dock: 'top',
            height: 0,
            html: 'Should NOT be visible'
        }],
        html: 'Test'
    });
});
