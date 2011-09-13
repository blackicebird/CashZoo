/*

This file is part of Ext JS 4

Copyright (c) 2011 Sencha Inc

Contact:  http://www.sencha.com/contact

Commercial Usage
Licensees holding valid commercial licenses may use this file in accordance with the Commercial Software License Agreement provided with the Software or, alternatively, in accordance with the terms contained in a written agreement between you and Sencha.

If you are unsure which license is appropriate for your use, please contact the sales department at http://www.sencha.com/contact.

*/
//Example 1 – Form Example
//ExtJS 4.0 - preview 5
//
Ext.onReady(function() {
    var watch = new StopWatch();
    var win = Ext.create('Ext.Window', {
        layout: 'fit',
        width: 420,
        height: 450,
        title: 'Test Page',
        items: [{
            xtype: 'form',
            autoScroll: true,

            items: (function() {
                var items = [],
                    i = 1, num = 500;
                for (; i <= num; i++) {
                    items.push({
                        xtype: 'textfield',
                        fieldLabel: 'Field ' + i
                    });
                }
                return items;
            })()
        }]
    });


    function dump(str) {
        Ext.getBody().createChild({
            tag: 'div',
            html: str
        })
    }

    watch.start();
    win.on('afterrender', function() {
        watch.stop();
        dump('Rendering took: ' + watch.duration());

        win.setSize = function() {
            watch.start();
            win.self.prototype.setSize.apply(this, arguments);
            watch.stop();
            dump('Resize took: ' + watch.duration());
        };
    });

    win.show();

});
