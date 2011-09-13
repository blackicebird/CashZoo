/*

This file is part of Ext JS 4

Copyright (c) 2011 Sencha Inc

Contact:  http://www.sencha.com/contact

Commercial Usage
Licensees holding valid commercial licenses may use this file in accordance with the Commercial Software License Agreement provided with the Software or, alternatively, in accordance with the terms contained in a written agreement between you and Sencha.

If you are unsure which license is appropriate for your use, please contact the sales department at http://www.sencha.com/contact.

*/
Ext.onReady(function() {

    // Simple trigger field
    Ext.create('Ext.form.field.Trigger', {
        name: 'simpleTrigger',
        width: 300,
        renderTo: 'simpleTriggerDemo',
        value: 'Trigger!',

        triggerCls: 'simple-trigger',

        onTriggerClick: function() {
            alert('Trigger was clicked! Field value is "' + this.getValue() + '"');
        }
    });

    // Multiple triggers demo
    Ext.create('Ext.form.field.Trigger', {
        name: 'multiTriggers',
        width: 300,
        emptyText: 'Search...',
        renderTo: 'multiTriggerDemo',

        // Clear
        trigger1Cls: 'clear-trigger',
        onTrigger1Click: function() {
            this.setValue('');
        },

        // search
        trigger2Cls: 'search-trigger',
        onTrigger2Click: function() {
            var val = Ext.util.Format.trim(this.getValue());
            if (val) {
                window.location = 'http://google.com/search?q=' + val;
            }
        }
    });

});
