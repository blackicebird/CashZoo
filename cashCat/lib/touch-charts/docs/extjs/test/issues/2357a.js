/*

This file is part of Ext JS 4

Copyright (c) 2011 Sencha Inc

Contact:  http://www.sencha.com/contact

Commercial Usage
Licensees holding valid commercial licenses may use this file in accordance with the Commercial Software License Agreement provided with the Software or, alternatively, in accordance with the terms contained in a written agreement between you and Sencha.

If you are unsure which license is appropriate for your use, please contact the sales department at http://www.sencha.com/contact.

*/
Ext.require(['*']);

Ext.onReady(function(){
    var panels = [];
    for (var i = 0; i < 10; i++) {
        panels.push({
            xtype:'panel',
            height: 150,
            collapsible: true,
            title: 'pane'
        });
    }
    var vp = Ext.create("Ext.container.Viewport", {
        layout: 'border',
        items: [
            Ext.create("Ext.panel.Panel", {
            region: 'west',
            width: 300,
            split: true
        }), {
            xtype:'tabpanel',
            region: 'center',
            items: [{
                xtype: 'panel',
                bodyPadding: 20,
                title:'Panels',
                layout: 'auto',
                autoScroll: true,
                items: panels
            }]
        }]
    });
});

