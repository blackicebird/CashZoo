/*

This file is part of Ext JS 4

Copyright (c) 2011 Sencha Inc

Contact:  http://www.sencha.com/contact

Commercial Usage
Licensees holding valid commercial licenses may use this file in accordance with the Commercial Software License Agreement provided with the Software or, alternatively, in accordance with the terms contained in a written agreement between you and Sencha.

If you are unsure which license is appropriate for your use, please contact the sales department at http://www.sencha.com/contact.

*/
Ext.require('Ext.chart.*');
Ext.onReady(function() {

    // Store creation
    Ext.define('State', {
        extend: 'Ext.data.Model',
        fields: [{
            type: 'string',
            name: 'abbr'
        },
        {
            type: 'string',
            name: 'name'
        },
        {
            type: 'string',
            name: 'slogan'
        }]
    });

    // The data for all states
    var states = [{
        "abbr": "AL",
        "name": "Alabama",
        "slogan": "The Heart of Dixie"
    },
    {
        "abbr": "AK",
        "name": "Alaska",
        "slogan": "The Land of the Midnight Sun"
    },
    {
        "abbr": "AZ",
        "name": "Arizona",
        "slogan": "The Grand Canyon State"
    },
    {
        "abbr": "AR",
        "name": "Arkansas",
        "slogan": "The Natural State"
    }];

    var store = Ext.create('Ext.data.Store', {
        model: 'State',
        data: states
    });

    // a Combobox
    var simpleCombo2 = Ext.create('Ext.form.field.ComboBox', {
        fieldLabel: 'combo2',
        displayField: 'name',
        width: 320,
        labelWidth: 130,
        store: store,
        queryMode: 'local',
        typeAhead: false,
        forceSelection: true,
        allowBlank: false
    });

    // a Combobox        
    var simpleCombo3 = Ext.create('Ext.form.field.ComboBox', {
        fieldLabel: 'combo3',
        displayField: 'name',
        width: 320,
        labelWidth: 130,
        store: store,
        queryMode: 'local',
        typeAhead: false,
        forceSelection: true,
        allowBlank: false
    });

    // a Combobox            
    var simpleCombo4 = Ext.create('Ext.form.field.ComboBox', {
        fieldLabel: 'combo4',
        displayField: 'name',
        width: 320,
        labelWidth: 130,
        store: store,
        queryMode: 'local',
        typeAhead: false,
        forceSelection: true,
        allowBlank: false
    });

    // a Combobox with a listener
    var simpleCombo = Ext.create('Ext.form.field.ComboBox', {
        fieldLabel: 'combo1',
        displayField: 'name',
        width: 320,
        labelWidth: 130,
        store: store,
        queryMode: 'local',
        typeAhead: false,
        forceSelection: true,
        allowBlank: false,
        listeners: {
            select: function() {
                simpleCombo2.setVisible(!simpleCombo2.isVisible());
                simpleCombo3.setVisible(!simpleCombo3.isVisible());
                simpleCombo4.setVisible(!simpleCombo4.isVisible());
            }
        }
    });

    Ext.create('Ext.panel.Panel', {
        title: 'a panel',
        border: true,
        autoScroll: false,
        renderTo: Ext.getBody(),
        id: 'viewport',
        items: [{
            id: 'inner-1',
            items: [{
                id: 'inner-2',
                items: [{
                    id: 'inner-3',
                    items: [{
                        id: 'inner-4',
                        items: [{
                            id: 'inner-5',
                            items: [{
                                id: 'inner-6',
                                items: [{
                                    id: 'inner-7',
                                    items: [simpleCombo, simpleCombo2, simpleCombo3, simpleCombo4]
                                }]
                            }]
                        }]
                    }]
                }]
            }]
        }]

    });
});

