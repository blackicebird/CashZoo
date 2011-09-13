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
        layout: {
            type: 'hbox',
            align: 'stretch'
        },
        items: [{
            xtype: 'panel',
            width: 100,
            minWidth: 100,
            maxWidth: 100,
            title: 'Panel',
            html: 'minWidth: 100, maxWidth: 100'
        },
        {
            xtype: 'splitter',
            collapsible: true
        },
        {
            xtype: 'panel',
            flex: 1,
            minWidth: 100,
            maxWidth: 200,
            html: 'minWidth: 100, maxWidth: 200',
            title: 'Panel',
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            items: [{
                xtype: 'panel',
                flex: 1
            },
            {
                xtype: 'splitter'
            },
            {
                xtype: 'panel',
                flex: 1,
                html: 'sample - maintaining flex'
            },
            {
                xtype: 'splitter'
            },
            {
                xtype: 'panel',
                flex: 1,
                minHeight: 50,
                html: 'minHeight: 50'
            },
            {
                xtype: 'splitter'
            },
            {
                xtype: 'panel',
                height: 200,
                maxHeight: 300,
                html: 'maxHeight: 300'
            }]
        },
        {
            xtype: 'splitter',
            collapsible: true
        },
        {
            xtype: 'panel',
            flex: 1,
            maintainFlex: true,
            title: 'Panel'
        },
        {
            xtype: 'splitter',
            collapsible: true
        },
        {
            xtype: 'panel',
            flex: 1,
            maxWidth: 400,
            title: 'Panel',
            html: 'maxWidth: 400'
        }]
    });
});

