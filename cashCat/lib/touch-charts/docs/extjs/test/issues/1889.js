/*

This file is part of Ext JS 4

Copyright (c) 2011 Sencha Inc

Contact:  http://www.sencha.com/contact

Commercial Usage
Licensees holding valid commercial licenses may use this file in accordance with the Commercial Software License Agreement provided with the Software or, alternatively, in accordance with the terms contained in a written agreement between you and Sencha.

If you are unsure which license is appropriate for your use, please contact the sales department at http://www.sencha.com/contact.

*/
Ext.onReady(function(){

    Ext.create('Ext.container.Viewport', {
        layout: 'border',
        renderTo: document.body,
        items: [{
            split: true,
            region: 'west',
            width: 250,
            html: '<iframe name="ifaui_menu" src="http://www.google.com" frameborder="0" scrolling="no" marginwidth="0" marginheight="0" id="ifaui_menu" style="width:100%;height:100%"/>'
        }, {
            region: 'center',
             html: '<iframe name="ifaui_menu" src="http://www.google.com" frameborder="0" scrolling="no" marginwidth="0" marginheight="0" id="ifaui_menu" style="width:100%;height:100%"/>'
        }]
    });
});

