/*

This file is part of Ext JS 4

Copyright (c) 2011 Sencha Inc

Contact:  http://www.sencha.com/contact

Commercial Usage
Licensees holding valid commercial licenses may use this file in accordance with the Commercial Software License Agreement provided with the Software or, alternatively, in accordance with the terms contained in a written agreement between you and Sencha.

If you are unsure which license is appropriate for your use, please contact the sales department at http://www.sencha.com/contact.

*/
Ext.define('MVCE.controller.TabCtrl', {
    extend: 'Ext.app.Controller',
    init: function(){
        this.control({
            'component[id=myTab]': {
                beforedestroy: function(){
                    console.log('beforedestroy');
                },
                destroy: function(){
                    console.log('destroy');
                }
            }
        });
    }
});

Ext.application({
    name: 'MVCE',
    controllers: ['TabCtrl'],
    
    launch: function(){
        var tabs = Ext.createWidget('tabpanel', {
            renderTo: document.body,
            width: 450,
            items: [{
                title: 'Short Text',
                id: 'myTab',
                html: 'Close the tab',
                closable: true
            }]
        });
    }
});

