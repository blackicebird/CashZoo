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
    var panel = Ext.create('Ext.panel.Panel', {
        title: 'Wheel Data',
        renderTo: Ext.getBody(),
        layout: 'fit',
        width: 300,
        //height: 500,
        items: [
            { xtype: 'displayfield' }
        ]
    });

    var counter = 0;

    function dump (event) {
        var buf = [
            event.type + ' -- ' + (++counter),
            'wheelDeltas: ' + Ext.encode(event.getWheelDeltas()),
            'wheelDelta: ' + event.getWheelDelta(),
            'scaleFactor: ' + event.WHEEL_SCALE,
            'webKitVersion: ' + Ext.webKitVersion
        ];

        Ext.Object.each(event, function (name, value) {
            if (Ext.isNumber(value)) {
                buf.push(name + ': ' + value);
            }
        });
        for (var name in event.browserEvent) {
            var value = event.browserEvent[name];
            if (Ext.isNumber(value)) {
                buf.push('be.' + name + ': ' + value);
            }
        }

        panel.items.items[0].setValue(buf.join('<br>'));
        panel.doComponentLayout();
    }

    Ext.getBody().on({
        mousewheel: dump,
        mousedown: dump
    });
});

