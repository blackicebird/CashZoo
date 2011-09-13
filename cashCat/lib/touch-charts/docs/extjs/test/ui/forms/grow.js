/*

This file is part of Ext JS 4

Copyright (c) 2011 Sencha Inc

Contact:  http://www.sencha.com/contact

Commercial Usage
Licensees holding valid commercial licenses may use this file in accordance with the Commercial Software License Agreement provided with the Software or, alternatively, in accordance with the terms contained in a written agreement between you and Sencha.

If you are unsure which license is appropriate for your use, please contact the sales department at http://www.sencha.com/contact.

*/
Ext.onReady(function() {

    var formPanel = Ext.create('Ext.form.Panel', {
        frame: true,
        title: 'Form Fields',
        width: 600,
        bodyPadding: 5,

        fieldDefaults: {
            labelAlign: 'left',
            labelWidth: 90,
            anchor: '100%'
        },

        items: [{
            xtype: 'textfield',
            name: 'textfield1',
            fieldLabel: 'Text field',
            value: 'Text field value',
            grow: true,
            growMax: 400,
            emptyText: 'empty text'
        }, {
            xtype: 'textareafield',
            name: 'textarea1',
            fieldLabel: 'TextArea',
            value: 'Textarea value',
            grow: true
        }]
    });

    formPanel.render('form-ct');

});

