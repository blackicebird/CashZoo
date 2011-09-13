/*

This file is part of Ext JS 4

Copyright (c) 2011 Sencha Inc

Contact:  http://www.sencha.com/contact

Commercial Usage
Licensees holding valid commercial licenses may use this file in accordance with the Commercial Software License Agreement provided with the Software or, alternatively, in accordance with the terms contained in a written agreement between you and Sencha.

If you are unsure which license is appropriate for your use, please contact the sales department at http://www.sencha.com/contact.

*/
Ext.define("themer.views.OptionField", {
    extend: 'Ext.form.field.Text',
    alias: 'widget.optionfield',

    model: null,
    
    initComponent: function() {
        var store = Ext.data.StoreManager.get('Variables'),
            index = store.find('variable', this.name);
        
        this.model = store.getAt(index);
        
        Ext.apply(this, {
            labelAlign: 'top',
            fieldLabel: this.model.get('variable'),
            value     : this.model.get('default') || '',
            width     : 220
        });
        
        themer.views.OptionField.superclass.initComponent.call(this);
    }
});
