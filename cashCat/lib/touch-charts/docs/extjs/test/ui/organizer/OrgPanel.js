/*

This file is part of Ext JS 4

Copyright (c) 2011 Sencha Inc

Contact:  http://www.sencha.com/contact

Commercial Usage
Licensees holding valid commercial licenses may use this file in accordance with the Commercial Software License Agreement provided with the Software or, alternatively, in accordance with the terms contained in a written agreement between you and Sencha.

If you are unsure which license is appropriate for your use, please contact the sales department at http://www.sencha.com/contact.

*/
Ext.define('Ext.org.OrgPanel', {
    extend: 'Ext.panel.Panel',
    requires: 'Ext.layout.container.Border',
    
    layout: 'border',
    
    initComponent: function() {
        this.items = [
            {
                xtype: 'albumtree',
                region: 'west',
                padding: 5,
                width: 200
            },
            {
                xtype: 'panel',
                title: 'My Images',
                layout: 'fit',
                region: 'center',
                padding: '5 5 5 0',
                items: {
                    xtype: 'imageview'
                }
            }
        ];
        
        this.callParent(arguments);
    }
});
