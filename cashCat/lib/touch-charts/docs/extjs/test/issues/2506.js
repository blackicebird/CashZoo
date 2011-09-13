/*

This file is part of Ext JS 4

Copyright (c) 2011 Sencha Inc

Contact:  http://www.sencha.com/contact

Commercial Usage
Licensees holding valid commercial licenses may use this file in accordance with the Commercial Software License Agreement provided with the Software or, alternatively, in accordance with the terms contained in a written agreement between you and Sencha.

If you are unsure which license is appropriate for your use, please contact the sales department at http://www.sencha.com/contact.

*/
Ext.onReady(function(){

    var panel = Ext.create('Ext.panel.Panel', {
        width: 400,
        height: 400,
        renderTo: document.body,
        title: 'Really long title that will overflow over the tools',
        tools: [{
            type: 'help'
        }],
        dockedItems: [{
            dock: 'bottom',
            xtype: 'toolbar',
            items: {
                text: 'Change size',
                handler: function(){
                    panel.setSize(200, 200);
                }
            }
        }]
    });
});

