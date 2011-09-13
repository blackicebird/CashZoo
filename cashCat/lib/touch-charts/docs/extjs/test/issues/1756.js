/*

This file is part of Ext JS 4

Copyright (c) 2011 Sencha Inc

Contact:  http://www.sencha.com/contact

Commercial Usage
Licensees holding valid commercial licenses may use this file in accordance with the Commercial Software License Agreement provided with the Software or, alternatively, in accordance with the terms contained in a written agreement between you and Sencha.

If you are unsure which license is appropriate for your use, please contact the sales department at http://www.sencha.com/contact.

*/
Ext.require(['Ext.form.*', 'Ext.container.Viewport', 'Ext.toolbar.TextItem']);

Ext.onReady(function() {
    var comps = [
        {
            xtype: 'window',
            width: 300,
            height: 100,
            html: '???',
            title: 'Panel',
            margin: '10 0',
            collapsible: true,
            animCollapse: false,
            hidden: false,
            floating: false
        },
        {
            xtype: 'panel',
            title: 'panel',
            html: 'panel'
        },
        {
            xtype: 'panel',
            frame: true,
            title: 'framed panel',
            html: 'panel'
        },
        {
            xtype: 'toolbar',
            items: [
                'toolbar text',
                {
                    xtype: 'button',
                    text: 'Toolbar button'
                }
            ]
        },
        {
            xtype: 'toolbar',
            items: [
                'toolbar text',
                {
                    xtype: 'button',
                    disabled: true,
                    text: 'Disabled toolbar button'
                }
            ]
        },
        {
            xtype: 'button',
            scale: 'small',
            text: 'small button'
        },
        {border:false},
        {
            xtype: 'button',
            scale: 'medium',
            text: 'medium button'
        },
        {border:false},
        {
            xtype: 'button',
            scale: 'large',
            text: 'large button'
        },
        {border:false},
        {
            xtype: 'button',
            scale: 'small',
            ui: 'default-toolbar',
            text: 'toolbar small button'
        },
        {border:false},
        {
            xtype: 'button',
            scale: 'medium',
            ui: 'default-toolbar',
            text: 'toolbar medium button'
        },
        {border:false},
        {
            xtype: 'button',
            scale: 'large',
            ui: 'default-toolbar',
            text: 'toolbar large button'
        },
        {border:false},
        {
            xtype: 'label',
            text : 'Plain Label'
        },
        {
            fieldLabel: 'TextField',
            xtype     : 'textfield',
            name      : 'someField',
            emptyText : 'Enter a value'
        },
        {
            fieldLabel: 'ComboBox',
            xtype: 'combo',
            store: ['Foo', 'Bar']
        },
        {
            fieldLabel: 'DateField',
            xtype     : 'datefield',
            name      : 'date'
        },
        {
            fieldLabel: 'TimeField',
            name: 'time',
            xtype: 'timefield'
        },
        {
            fieldLabel: 'NumberField',
            xtype     : 'numberfield',
            name      : 'number',
            emptyText : '(This field is optional)',
            allowBlank: true
        },
        {
            fieldLabel: 'TextArea',
            xtype     : 'textareafield',
            name      : 'message',
            cls       : 'x-form-valid',
            value     : 'This field is hard-coded to have the "valid" style (it will require some code changes to add/remove this style dynamically)'
        },
        {
            fieldLabel: 'Checkboxes',
            xtype: 'checkboxgroup',
            columns: [100,100],
            items: [{boxLabel: 'Foo', checked: true},{boxLabel: 'Bar'}]
        },
        {
            fieldLabel: 'Radios',
            xtype: 'radiogroup',
            columns: [100,100],
            items: [{boxLabel: 'Foo', checked: true, name: 'radios'},{boxLabel: 'Bar', name: 'radios'}]
        },
        {
            hideLabel   : true,
            id          : 'htmleditor',
            xtype       : 'htmleditor',
            name        : 'html',
            enableColors: false,
            value       : 'Mouse over toolbar for tooltips.<br /><br />The HTMLEditor IFrame requires a refresh between a stylesheet switch to get accurate colors.',
            height      : 110
        },
        {
            xtype : 'fieldset',
            title : 'Plain Fieldset'
        },
        {
            xtype      : 'fieldset',
            title      : 'Collapsible Fieldset',
            collapsible: true
        },
        {
            xtype         : 'fieldset',
            title         : 'Checkbox Fieldset',
            checkboxToggle: true
        },
        {
            xtype: 'fieldset',
            items: [
                {
                    xtype: 'label',
                    text : 'Plain Label'
                },
                {
                    fieldLabel: 'TextField',
                    xtype     : 'textfield',
                    name      : 'someField',
                    emptyText : 'Enter a value'
                },
                {
                    fieldLabel: 'ComboBox',
                    xtype: 'combo',
                    store: ['Foo', 'Bar']
                },
                {
                    fieldLabel: 'DateField',
                    xtype     : 'datefield',
                    name      : 'date'
                },
                {
                    fieldLabel: 'TimeField',
                    name: 'time',
                    xtype: 'timefield'
                },
                {
                    fieldLabel: 'NumberField',
                    xtype     : 'numberfield',
                    name      : 'number',
                    emptyText : '(This field is optional)',
                    allowBlank: true
                },
                {
                    fieldLabel: 'TextArea',
                    xtype     : 'textareafield',
                    name      : 'message',
                    cls       : 'x-form-valid',
                    value     : 'This field is hard-coded to have the "valid" style (it will require some code changes to add/remove this style dynamically)'
                },
                {
                    fieldLabel: 'Checkboxes',
                    xtype: 'checkboxgroup',
                    columns: [100,100],
                    items: [{boxLabel: 'Foo', checked: true},{boxLabel: 'Bar'}]
                },
                {
                    fieldLabel: 'Radios',
                    xtype: 'radiogroup',
                    columns: [100,100],
                    items: [{boxLabel: 'Foo', checked: true, name: 'radios'},{boxLabel: 'Bar', name: 'radios'}]
                },
                {
                    hideLabel   : true,
                    id          : 'htmleditor',
                    xtype       : 'htmleditor',
                    name        : 'html',
                    enableColors: false,
                    value       : 'Mouse over toolbar for tooltips.<br /><br />The HTMLEditor IFrame requires a refresh between a stylesheet switch to get accurate colors.',
                    height      : 110
                },
                {
                    xtype : 'fieldset',
                    title : 'Plain Fieldset'
                },
                {
                    xtype      : 'fieldset',
                    title      : 'Collapsible Fieldset',
                    collapsible: true
                },
                {
                    xtype         : 'fieldset',
                    title         : 'Checkbox Fieldset',
                    checkboxToggle: true
                }
            ]
        },
        {
            frame: true,
            title: 'fieldset inside panel',
            layout: 'fit',
            height: 800,
            items: [
                {
                    xtype: 'fieldset',
                    items: [
                        {
                            xtype: 'label',
                            text : 'Plain Label'
                        },
                        {
                            fieldLabel: 'TextField',
                            xtype     : 'textfield',
                            name      : 'someField',
                            emptyText : 'Enter a value'
                        },
                        {
                            fieldLabel: 'ComboBox',
                            xtype: 'combo',
                            store: ['Foo', 'Bar']
                        },
                        {
                            fieldLabel: 'DateField',
                            xtype     : 'datefield',
                            name      : 'date'
                        },
                        {
                            fieldLabel: 'TimeField',
                            name: 'time',
                            xtype: 'timefield'
                        },
                        {
                            fieldLabel: 'NumberField',
                            xtype     : 'numberfield',
                            name      : 'number',
                            emptyText : '(This field is optional)',
                            allowBlank: true
                        },
                        {
                            fieldLabel: 'TextArea',
                            xtype     : 'textareafield',
                            name      : 'message',
                            cls       : 'x-form-valid',
                            value     : 'This field is hard-coded to have the "valid" style (it will require some code changes to add/remove this style dynamically)'
                        },
                        {
                            fieldLabel: 'Checkboxes',
                            xtype: 'checkboxgroup',
                            columns: [100,100],
                            items: [{boxLabel: 'Foo', checked: true},{boxLabel: 'Bar'}]
                        },
                        {
                            fieldLabel: 'Radios',
                            xtype: 'radiogroup',
                            columns: [100,100],
                            items: [{boxLabel: 'Foo', checked: true, name: 'radios'},{boxLabel: 'Bar', name: 'radios'}]
                        },
                        {
                            hideLabel   : true,
                            id          : 'htmleditor',
                            xtype       : 'htmleditor',
                            name        : 'html',
                            enableColors: false,
                            value       : 'Mouse over toolbar for tooltips.<br /><br />The HTMLEditor IFrame requires a refresh between a stylesheet switch to get accurate colors.',
                            height      : 110
                        },
                        {
                            xtype : 'fieldset',
                            title : 'Plain Fieldset'
                        },
                        {
                            xtype      : 'fieldset',
                            title      : 'Collapsible Fieldset',
                            collapsible: true
                        },
                        {
                            xtype         : 'fieldset',
                            title         : 'Checkbox Fieldset',
                            checkboxToggle: true
                        }
                    ]
                }
            ]
        }
    ];
    
    var disabledComps = [],
        i;
    
    for (i = 0; i < comps.length; i++) {
        disabledComps.push(Ext.apply({}, comps[i], {
            disabled: true
        }));
    }
    
    Ext.create('Ext.Viewport', {
        layout: 'fit',
        items: [
            {
                layout: 'hbox',
                border: false,
                autoScroll: true,
                defaults: {
                    border: false,
                    padding: 10,
                    width: 600,
                    unstyled: true,
                    defaults: {
                        margin: '0 0 10 0'
                    }
                },
                items: [
                    {
                        title: '<b>Normal</b><br /><br />',
                        items: comps
                    },
                    {
                        title: '<b>Disabled</b><br /><br />',
                        items: disabledComps
                    }
                ]
            }
        ]
    });
});
