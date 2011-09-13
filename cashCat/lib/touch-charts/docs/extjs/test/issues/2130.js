/*

This file is part of Ext JS 4

Copyright (c) 2011 Sencha Inc

Contact:  http://www.sencha.com/contact

Commercial Usage
Licensees holding valid commercial licenses may use this file in accordance with the Commercial Software License Agreement provided with the Software or, alternatively, in accordance with the terms contained in a written agreement between you and Sencha.

If you are unsure which license is appropriate for your use, please contact the sales department at http://www.sencha.com/contact.

*/
var title = 'HBox/Field labelAlign';

Ext.require(['*']);

Ext.onReady(function(){
    var cnt = Ext.ComponentManager.create({
        xtype: 'panel',
        renderTo    : Ext.getBody(),
        layout      : 'hbox',
        defaultType : 'textfield',
        title: 'HBox w/labelAlign top',
        bodyPadding: 8,
        defaults    : {
            labelClsExtra: 'mycls',
            flex       : 1
        },
        items       : [
            { fieldLabel : 'Full Name', labelAlign: 'top' },
            { fieldLabel : 'Email', vtype : 'email' }
        ]
    });
});

