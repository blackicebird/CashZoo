/*

This file is part of Ext JS 4

Copyright (c) 2011 Sencha Inc

Contact:  http://www.sencha.com/contact

Commercial Usage
Licensees holding valid commercial licenses may use this file in accordance with the Commercial Software License Agreement provided with the Software or, alternatively, in accordance with the terms contained in a written agreement between you and Sencha.

If you are unsure which license is appropriate for your use, please contact the sales department at http://www.sencha.com/contact.

*/
Ext.onReady(function() {
    var tabCount = 2;
    
    var tabPanel = Ext.create('Ext.tab.Panel', {
        renderTo: Ext.getBody(),
        width: 600,
        height: 400,
        //plain: true,
        bodyStyle: 'padding:5px',
        
        items: [
            {
                xtype: 'panel',
                title: 'First Panel',
                html : 'Test 1',
                closable: false
            },
            {
                xtype: 'panel',
                title: 'Second Panel',
                html : 'Test 2'
            }
        ],
        
        dockedItems: {
            dock: 'bottom',
            xtype: 'toolbar',
            items: [
                {
                    text : 'Add an item',
                    handler: function() {
                        tabCount++;
                        
                        tabPanel.add({
                            xtype: 'panel',
                            title: 'Tab ' + tabCount,
                            html : 'Content for tab ' + tabCount
                        });
                    }
                },
                {
                    text: 'Toggle tabs enabled',
                    handler: function() {
                        tabPanel.tabBar.items.each(function(tab) {
                            tab.disabled ? tab.enable() : tab.disable();
                        });
                    }
                },
                {
                    text: 'Remove 2nd item',
                    handler: function() {
                        var item = tabPanel.items.items[1];
                        
                        if (item) {
                            tabPanel.remove(item);
                        }
                    }
                }
            ]
        }
    });
});
