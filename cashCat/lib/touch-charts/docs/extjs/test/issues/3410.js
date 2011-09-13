/*

This file is part of Ext JS 4

Copyright (c) 2011 Sencha Inc

Contact:  http://www.sencha.com/contact

Commercial Usage
Licensees holding valid commercial licenses may use this file in accordance with the Commercial Software License Agreement provided with the Software or, alternatively, in accordance with the terms contained in a written agreement between you and Sencha.

If you are unsure which license is appropriate for your use, please contact the sales department at http://www.sencha.com/contact.

*/
Ext.onReady(function(){
    
    function makeItems(direction, animate) {
        var items = [],
            i = 1;
        for (; i < 5; ++i) {
            items.push({
                flex: 1,
                title: 'Item ' + i,
                html: 'Item' + i,
                collapsible: true,
                collapseDirection: direction,
                animCollapse: animate
            });
        }
        return items;
    }
    
    Ext.create('Ext.container.Viewport', {
        layout: {
            type: 'vbox',
            align: 'stretch'
        },
        defaultType: 'container',
        defaults: {
            flex: 1,
            layout: {
                type: 'hbox',
                align: 'stretch'
            }
        },
        items: [{
            items: makeItems('left', true)
        }, {
            items: makeItems('right', false)
        }]
    });
    
});

