/*

This file is part of Ext JS 4

Copyright (c) 2011 Sencha Inc

Contact:  http://www.sencha.com/contact

Commercial Usage
Licensees holding valid commercial licenses may use this file in accordance with the Commercial Software License Agreement provided with the Software or, alternatively, in accordance with the terms contained in a written agreement between you and Sencha.

If you are unsure which license is appropriate for your use, please contact the sales department at http://www.sencha.com/contact.

*/
Ext.require('Ext.window.Window');

Ext.onReady(function() {
    
    var w1 = Ext.create('Ext.window.Window', {
        width: 100,
        height: 100,
        autoShow: true,
        title: 'Foo',
        x: 100,
        y: 100,
        dockedItems: [{
            xtype: 'toolbar',
            items: {
                text: 'Align',
                handler: function(){
                    w1.alignTo(w2);
                }
            }
        }]
    });
    
    var w2 = Ext.create('Ext.window.Window', {
        width: 200,
        height: 300,
        autoShow: true,
        title: 'Foo',
        x: 300,
        y: 400
    });
    
    
});
