/*

This file is part of Ext JS 4

Copyright (c) 2011 Sencha Inc

Contact:  http://www.sencha.com/contact

Commercial Usage
Licensees holding valid commercial licenses may use this file in accordance with the Commercial Software License Agreement provided with the Software or, alternatively, in accordance with the terms contained in a written agreement between you and Sencha.

If you are unsure which license is appropriate for your use, please contact the sales department at http://www.sencha.com/contact.

*/
Ext.require([
    'Ext.layout.container.Anchor', 
    'Ext.form.*', 
    'Ext.Ajax'
]);

Ext.onReady(function(){

    var formPanel = Ext.create('Ext.form.Panel', {
        renderTo: 'form-ct',
        frame: true,
        title: 'Ajax Form',
        width: 340,
        bodyPadding: 5,
        defaults: {
            anchor: '100%'
        },
        defaultType: 'textfield',
        
        fieldDefaults: {
            labelAlign: 'left',
            labelWidth: 90
        },
        
        items: [{
            fieldLabel: 'First Name',
            emptyText: 'First Name',
            name: 'first'
        }, {
            fieldLabel: 'Last Name',
            emptyText: 'Last Name',
            name: 'last',
            allowBlank: false
        }, {
            fieldLabel: 'Company',
            name: 'company'
        }, {
            fieldLabel: 'Email',
            name: 'email',
            vtype: 'email'
        }, {
            xtype: 'textareafield',
            fieldLabel: 'Comments',
            name: 'comments',
            labelAlign: 'top'
        }],
        
        buttons: [{
            text: 'Load',
            handler: function(){
                this.up('form').getForm().load({
                    url: 'ajax-data.json'
                });
            }
        }, {
            text: 'Submit',
            disabled: true,
            formBind: true,
            handler: function(){
                this.up('form').getForm().submit({
                    url: 'ajax-errors.json',
                    submitEmptyText: false
                });
            }
        }]
    });
});

