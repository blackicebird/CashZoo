/*

This file is part of Ext JS 4

Copyright (c) 2011 Sencha Inc

Contact:  http://www.sencha.com/contact

Commercial Usage
Licensees holding valid commercial licenses may use this file in accordance with the Commercial Software License Agreement provided with the Software or, alternatively, in accordance with the terms contained in a written agreement between you and Sencha.

If you are unsure which license is appropriate for your use, please contact the sales department at http://www.sencha.com/contact.

*/
Ext.require([
    'widget.menu',
    'widget.textfield'
]);


Ext.onReady(function() {
    var btnClick = function(btn) {
        alert('Clicked ' + btn.text);
    };
    
    var toolbar = Ext.createWidget('toolbar', {
        renderTo: Ext.getBody(),
        
        items: [
            {
                text: 'Users Menu',
                iconCls: 'group',
                itemId: 'testBtn',
                menu: {
                    minWidth: 800,
                    title: 'Test Menu',
                    headerPosition: 'left',
                    items: [
                        {
                            text: 'Add User',
                            iconCls: 'add',
                            handler: btnClick,
                            disabled: true
                        },
                        {
                            text: 'Edit User',
                            iconCls: 'edit',
                            handler: btnClick
                        },
                        {
                            text: 'Hidden Feature',
                            hidden: true
                        },
                        '-',
                        {
                            text: 'Delete User',
                            iconCls: 'delete',
                            disabled: true,
                            handler: btnClick
                        }
                    ]
                }
            }
        ]
    });
});

