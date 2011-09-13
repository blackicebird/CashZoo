/*

This file is part of Ext JS 4

Copyright (c) 2011 Sencha Inc

Contact:  http://www.sencha.com/contact

Commercial Usage
Licensees holding valid commercial licenses may use this file in accordance with the Commercial Software License Agreement provided with the Software or, alternatively, in accordance with the terms contained in a written agreement between you and Sencha.

If you are unsure which license is appropriate for your use, please contact the sales department at http://www.sencha.com/contact.

*/
Ext.require('Ext.*');
Ext.onReady(function() {
    function createToolbar (type, config) {
        var panelConfig =  {
            renderTo: Ext.getBody(),
            height : 100,
            width: 300,
            title: type
        };
        panelConfig[type] = Ext.create('Ext.toolbar.Toolbar', config);
        Ext.createWidget('panel', panelConfig);
    }
   
    createToolbar('tbar', {
            layout: {
                overflowHandler: 'Menu'
            },
            items: [{
                text: 'Number 1'
            },{
                text: 'Number 2'
            },{
                text: 'Number 3'
            },{
                text: 'Number 4'
            },{
                text: 'Number 5'
            },{
                text: 'Number 6'
            }]
    });

    createToolbar('tbar', {
            layout: {
                overflowHandler: 'Scroller'
            },
            items: [{
                text: 'Number 1'
            },{
                text: 'Number 2'
            },{
                text: 'Number 3'
            },{
                text: 'Number 4'
            },{
                text: 'Number 5'
            },{
                text: 'Number 6'
            }]
    });

    createToolbar('lbar', {
            layout: {
                overflowHandler: 'Menu'
            },
            items: [{
                text: 'Number 1'
            },{
                text: 'Number 2'
            },{
                text: 'Number 3'
            },{
                text: 'Number 4'
            },{
                text: 'Number 5'
            },{
                text: 'Number 6'
            }]
    });
    createToolbar('lbar', {
            layout: {
                overflowHandler: 'Scroller'
            },
            items: [{
                text: 'Number 1'
            },{
                text: 'Number 2'
            },{
                text: 'Number 3'
            },{
                text: 'Number 4'
            },{
                text: 'Number 5'
            },{
                text: 'Number 6'
            }]
    });
    createToolbar('rbar', {
            layout: {
                overflowHandler: 'Menu'
            },
            items: [{
                text: 'Number 1'
            },{
                text: 'Number 2'
            },{
                text: 'Number 3'
            },{
                text: 'Number 4'
            },{
                text: 'Number 5'
            },{
                text: 'Number 6'
            }]
    });
    
    createToolbar('rbar', {
        layout: {
            overflowHandler: 'Scroller'
        },
        items: [{
            text: 'Number 1'
        },{
            text: 'Number 2'
        },{
            text: 'Number 3'
        },{
            text: 'Number 4'
        },{
            text: 'Number 5'
        },{
            text: 'Number 6'
        }]
    });
});
