/*

This file is part of Ext JS 4

Copyright (c) 2011 Sencha Inc

Contact:  http://www.sencha.com/contact

Commercial Usage
Licensees holding valid commercial licenses may use this file in accordance with the Commercial Software License Agreement provided with the Software or, alternatively, in accordance with the terms contained in a written agreement between you and Sencha.

If you are unsure which license is appropriate for your use, please contact the sales department at http://www.sencha.com/contact.

*/
Ext.onReady(function() {
    var base = {
        renderTo: Ext.getBody(),
        
        width: 300,
        height: 300,
        
        margin: '0 40 40 0',
        
        cls: 'floater'
    };
    
    Ext.create('widget.panel', Ext.apply({}, {
        border: false,
        dockedItems: [
            {
                xtype: 'toolbar',
                dock: 'left',
                width: 30
            },
            {
                xtype: 'toolbar',
                dock: 'right',
                width: 30
            },
            {
                xtype: 'toolbar',
                dock: 'top',
                height: 30,
                weight: 100
            },
            {
                xtype: 'toolbar',
                dock: 'bottom',
                height: 30,
                weight: 100
            }
        ]
    }, base));
    
    Ext.create('widget.panel', Ext.apply({}, {
        border: false,
        dockedItems: [
            {
                xtype: 'toolbar',
                dock: 'left',
                width: 30
            },
            {
                xtype: 'toolbar',
                dock: 'right',
                width: 30
            },
            {
                xtype: 'toolbar',
                dock: 'top',
                height: 30,
                weight: 100
            },
            {
                xtype: 'toolbar',
                dock: 'bottom',
                height: 30,
                weight: 100
            },
            {
                xtype: 'toolbar',
                dock: 'top',
                height: 30,
                weight: 300
            },
            {
                xtype: 'toolbar',
                dock: 'bottom',
                height: 30,
                weight: 300
            },
            {
                xtype: 'toolbar',
                dock: 'left',
                width: 30,
                weight: 200
            },
            {
                xtype: 'toolbar',
                dock: 'right',
                width: 30,
                weight: 200
            }
        ]
    }, base));
    
    Ext.create('widget.panel', Ext.apply({}, {
        border: false,
        dockedItems: [
            {
                xtype: 'toolbar',
                dock: 'left',
                width: 30,
                weight: 100
            },
            {
                xtype: 'toolbar',
                dock: 'right',
                width: 30,
                weight: 100
            },
            {
                xtype: 'toolbar',
                dock: 'top',
                height: 30
            },
            {
                xtype: 'toolbar',
                dock: 'bottom',
                height: 30
            }
        ]
    }, base));
    
    Ext.create('widget.panel', Ext.apply({}, {
        border: false,
        dockedItems: [
            {
                xtype: 'toolbar',
                dock: 'top',
                height: 30
            },
            {
                xtype: 'toolbar',
                dock: 'top',
                height: 30
            },
            {
                xtype: 'toolbar',
                dock: 'top',
                height: 30
            },
            {
                xtype: 'toolbar',
                dock: 'right',
                width: 30,
                weight: 100
            }
        ]
    }, base));
});
