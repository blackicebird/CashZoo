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
        title: 'FieldSet Example',
        width: 340,
        bodyPadding: 5,

        fieldDefaults: {
            labelAlign: 'left',
            labelWidth: 90,
            anchor: '100%'
        },

        defaultType: 'fieldset',
        defaults: {
            anchor: '100%',
            padding: 10
        },

        items: [
            {
                items: [{
                    xtype: 'component',
                    html: '<p>This is a simple fieldset with no title configured.</p>'
                }, {
                    xtype: 'textfield',
                    name: 'field1',
                    fieldLabel: 'Field'
                }]
            }, {
                title: 'Fieldset Title',
                items: [{
                    xtype: 'component',
                    html: '<p>This is a fieldset with a title configured.</p>'
                }, {
                    xtype: 'textfield',
                    name: 'field2',
                    fieldLabel: 'Field'
                }]
            }, {
                title: 'Fieldset with checkbox',
                checkboxToggle: true,
                checkboxName: 'checkbox1',
                items: [{
                    xtype: 'component',
                    html: '<p>This fieldset has checkboxToggle=true. Clicking the checkbox toggles the fieldset\'s collapsed state</p>'
                }, {
                    xtype: 'textfield',
                    name: 'field3',
                    fieldLabel: 'Field'
                }]
            }, {
                title: 'Fieldset with checkbox',
                checkboxToggle: true,
                checkboxName: 'checkbox2',
                collapsed: true,
                items: [{
                    xtype: 'component',
                    html: '<p>This fieldset has checkboxToggle=true and collapsed=true, so it is collapsed and unchecked by default.</p>'
                }, {
                    xtype: 'textfield',
                    name: 'field4',
                    fieldLabel: 'Field'
                }]
            }, {
                title: 'Collapsible fieldset',
                collapsible: true,
                items: [{
                    xtype: 'component',
                    html: '<p>This fieldset has collapsible=true, without a checkbox.</p>'
                }, {
                    xtype: 'textfield',
                    name: 'field5',
                    fieldLabel: 'Field'
                }]
            }, {
                title: 'Collapsible fieldset',
                collapsible: true,
                collapsed: true,
                items: [{
                    xtype: 'component',
                    html: '<p>This fieldset has collapsible=true, and is collapsed by default.</p>'
                }, {
                    xtype: 'textfield',
                    name: 'field6',
                    fieldLabel: 'Field'
                }]
            }
        ]
    });

    formPanel.render('form-ct');

});

