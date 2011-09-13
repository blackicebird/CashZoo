/*

This file is part of Ext JS 4

Copyright (c) 2011 Sencha Inc

Contact:  http://www.sencha.com/contact

Commercial Usage
Licensees holding valid commercial licenses may use this file in accordance with the Commercial Software License Agreement provided with the Software or, alternatively, in accordance with the terms contained in a written agreement between you and Sencha.

If you are unsure which license is appropriate for your use, please contact the sales department at http://www.sencha.com/contact.

*/
Ext.require([
    'Ext.form.*'
]);

Ext.onReady(function() {
    Ext.createWidget('form', {
        title: 'Form Panel',
        width: 500,
        height: 250,
        renderTo: 'form',
        bodyStyle: {
            padding: '10px'
        },
        layout: {
            type: 'vbox',
            align: 'stretch'
        },
        
        defaultType: 'textfield',
        items: [{
            xtype: 'numberfield',
            fieldLabel: 'Some Number',
            minValue: 0,
            allowBlank: false,
            allowDecimals: false
        },{
            fieldLabel: 'Text Field 1',
            allowBlank: false
        },{
            fieldLabel: 'Text Field 2'
        }],
        
        buttons: [{
            text: 'Submit',
            formBind: true,
            handler: function() {
                var form = this.up('form').getForm();
                if (form.isValid()) {
                    console.log('Valid!');
                } else {
                    console.log('Invalid!');
                }
            }
        }]
    });
});

