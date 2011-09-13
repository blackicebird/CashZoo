/*

This file is part of Ext JS 4

Copyright (c) 2011 Sencha Inc

Contact:  http://www.sencha.com/contact

Commercial Usage
Licensees holding valid commercial licenses may use this file in accordance with the Commercial Software License Agreement provided with the Software or, alternatively, in accordance with the terms contained in a written agreement between you and Sencha.

If you are unsure which license is appropriate for your use, please contact the sales department at http://www.sencha.com/contact.

*/
Ext.require('Ext.menu.Menu');
Ext.onReady(function() {
    Ext.create('Ext.menu.Menu', {
        renderTo: Ext.getBody(),
        items: [{
            text: 'Menu 1 - Enabled',
            menu: [{
                text: 'Item 1',
                handler: function() {
                    alert('This shouldn\'t show!');
                }
            },{
                text: 'Item 2',
                handler: function() {
                    alert('This shouldn\'t show!');
                }
            },{
                text: 'Item 3',
                handler: function() {
                    alert('This shouldn\'t show!');
                }
            },{
                text: 'Item 4',
                handler: function() {
                    alert('This shouldn\'t show!');
                }
            },{
                text: 'I have a menu!',
                menu: [{
                    text: 'Submenu Item 1'
                }]
            },{
                xtype: 'button',
                text: 'Click Me!',
                handler: function() {
                    alert('This shouldn\'t show!');
                }
            }]
        }, {
            text: 'Menu 2 - Disabled',
            menu: {
                items: [{
                    text: 'Item 1',
                    handler: function() {
                        alert('This shouldn\'t show!');
                    }
                },{
                    text: 'Item 2',
                    handler: function() {
                        alert('This shouldn\'t show!');
                    }
                },{
                    text: 'Item 3',
                    handler: function() {
                        alert('This shouldn\'t show!');
                    }
                },{
                    text: 'Item 4',
                    handler: function() {
                        alert('This shouldn\'t show!');
                    }
                },{
                    text: 'I have a menu!',
                    menu: [{
                        text: 'Submenu Item 1'
                    }]
                },{
                    xtype: 'button',
                    text: 'Click Me!',
                    handler: function() {
                        alert('This shouldn\'t show!');
                    }
                }],
                disabled: true
            }
        }]
    }).showAt(0, 0);
});
