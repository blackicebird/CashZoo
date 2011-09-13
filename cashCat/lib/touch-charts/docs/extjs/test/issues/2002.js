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
    var menuItem = Ext.create('Ext.menu.Item', {
            text: 'menu item with some long text'
        }),
        subItem = Ext.create('Ext.menu.Item', {
            text: 'menu item with some long text'
        }),
        subMenu = Ext.create('Ext.menu.Item', {
            text: 'Submenu',
            menu: [
                { text: 'Sub 1' },
                subItem,
                { text: 'Submenu Item 2' }
            ]
        });

    var menuButton = Ext.create('Ext.button.Button', {
        text: 'menu',
        menu: [
            { text: 'Item 1' },
            menuItem,
            { text: 'Item 2' },
            subMenu
        ]
    })

    var longText = 'menu item now with some ridiculously very very long text',
        shortText = 'menu item',
        addedItem,
        addedSubItem;

    Ext.create('Ext.window.Window', {
        tbar: [
            menuButton,
            {
                text: 'Set long text',
                handler: function() {
                    menuItem.setText(longText);
                    subItem.setText(longText);
                }
            },
            {
                text: 'Set short text',
                handler: function() {
                    menuItem.setText(shortText);
                    subItem.setText(shortText+' *');
                }
            },
            {
                text: 'Add long item',
                handler: function () {
                    if (!addedItem) {
                        addedItem = menuButton.menu.add({
                            text: longText
                        });
                        addedSubItem = subMenu.menu.add({
                            text: longText
                        });
                    }
                }
            },
            {
                text: 'Remove long item',
                handler: function () {
                    if (addedItem) {
                        menuButton.menu.remove(addedItem);
                        subMenu.menu.remove(addedSubItem);

                        addedItem = addedSubItem = null;
                    }
                }
            }
        ],
        layout: 'fit',
        items: {
            border:false,
            bodyPadding: 6,
            items: {
                xtype: 'component',
                html: '<big>'+
                    'All tests start at refresh/page load.<br>'+
                    '<h1>Test 1:</h1>'+
                    '1. Drop down menu button and submenu to render menus.<br>'+
                    '2. Click "Set long text" button.<br>'+
                    '3. Drop down menu button and submenu to see menus expanded (be '+
                        'sure to check each item width by hovering it).<br>'+
                    '4. Click "Set short text" button.<br>'+
                    '5. Drop down menu button and submenu to see menu reduced.<br>'+
                    '6. Repeat steps again (shrink/grow/shrink was broken).<br>'+
                    '<br>'+
                    '<h1>Test 2:</h1>'+
                    'Repeat Test 1 but press buttons twice in Steps 2 and 4.<br>'+
                    '<br>'+
                    '<h1>Test 3:</h1>'+
                    '1. Drop down menu button and submenu to render menus.<br>'+
                    '2. Click "Add long item" button.<br>'+
                    '3. Drop down menu button and submenu to see menus expanded.<br>'+
                    '4. Click "Remove long item" button.<br>'+
                    '5. Drop down menu button and submenu to see menu reduced.<br>'+
                    '6. Repeat steps again (shrink/grow/shrink was broken).'+
                    '</big>'
            }
        },
        renderTo: Ext.getBody(),
        x: 20,
        y: 20,
        width: 600,
        height: 500,
        autoShow: true
    });
});

