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
    var vertical = {
        renderTo: Ext.getBody(),
        margin: '10 0 10 10',
        vertical: true,
        height: 300,
        style: 'float:left',
        items: [
            {
                xtype: 'button',
                text: 'button'
            },
            '-',
            {
                xtype: 'button',
                text: 'button'
            },
            {
                xtype: 'button',
                text: 'button'
            },
            {
                xtype: 'button',
                text: 'button'
            },
            {
                xtype: 'button',
                text: 'button'
            }
        ]
    };
    
    var horizontal = {
        renderTo: Ext.getBody(),
        margin: '10 0 10 10',
        width: 500,
        style: 'clear:both',
        items: [
            {
                xtype: 'button',
                text: 'button'
            },
            '-',
            {
                xtype: 'button',
                text: 'button'
            },
            {
                xtype: 'button',
                text: 'button'
            },
            {
                xtype: 'button',
                text: 'button'
            },
            {
                xtype: 'button',
                text: 'button'
            }
        ]
    };
    
    Ext.create('widget.toolbar', Ext.apply({
        width: 100
    }, vertical));
    
    Ext.create('widget.toolbar', Ext.apply({
        width: 200
    }, vertical));
    
    Ext.create('widget.toolbar', Ext.apply({
        width: 300
    }, vertical));
    
    Ext.create('widget.toolbar', horizontal);
    
    Ext.create('widget.toolbar', Ext.apply({
        height: 100
    }, horizontal));
});
