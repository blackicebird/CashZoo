/*

This file is part of Ext JS 4

Copyright (c) 2011 Sencha Inc

Contact:  http://www.sencha.com/contact

Commercial Usage
Licensees holding valid commercial licenses may use this file in accordance with the Commercial Software License Agreement provided with the Software or, alternatively, in accordance with the terms contained in a written agreement between you and Sencha.

If you are unsure which license is appropriate for your use, please contact the sales department at http://www.sencha.com/contact.

*/
Ext.onReady(function() {
    var pnl = Ext.create('Ext.Panel', {
        renderTo: Ext.getBody(),
        title: 'Resize Component',
        width: 100,
        height: 300,
        resizable: true,
        draggable: true
    });

    var win = Ext.create('Ext.Window', {
        title: 'Resize Component',
        width: 100,
        height: 300,
        resizable: true,
        constrain: true
    });
    win.show();
});
