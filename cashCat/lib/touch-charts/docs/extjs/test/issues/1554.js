/*

This file is part of Ext JS 4

Copyright (c) 2011 Sencha Inc

Contact:  http://www.sencha.com/contact

Commercial Usage
Licensees holding valid commercial licenses may use this file in accordance with the Commercial Software License Agreement provided with the Software or, alternatively, in accordance with the terms contained in a written agreement between you and Sencha.

If you are unsure which license is appropriate for your use, please contact the sales department at http://www.sencha.com/contact.

*/
Ext.require('Ext.container.Viewport');

Ext.onReady(function(){
    var bd = Ext.getBody();
    
    var base = {
        width: 200,
        height: 100,
        html: '???',
        title: 'Panel',
        margin: '10 0',
        collapsible: true,
        animCollapse: false
    };
    
    var lista = [
        base,
        Ext.apply({
            headerPosition: 'right',
            collapseDirection: 'left'
        }, base),
        Ext.apply({
            headerPosition: 'bottom',
            collapseDirection: 'top'
        }, base),
        Ext.apply({
            headerPosition: 'left'
        }, base),
        Ext.apply({
            collapsed: true
        }, base),
        Ext.apply({
            headerPosition: 'right',
            collapsed: true
        }, base),
        Ext.apply({
            headerPosition: 'bottom',
            collapsed: true
        }, base),
        Ext.apply({
            headerPosition: 'left',
            collapsed: true
        }, base)
    ];
    
    var listb = [
        Ext.apply({
            border: false
        }, base),
        Ext.apply({
            headerPosition: 'right',
            border: false,
            collapseDirection: 'left'
        }, base),
        Ext.apply({
            headerPosition: 'bottom',
            border: false,
            collapseDirection: 'top'
        }, base),
        Ext.apply({
            headerPosition: 'left',
            border: false
        }, base),
        Ext.apply({
            collapsed: true,
            border: false
        }, base),
        Ext.apply({
            headerPosition: 'right',
            collapsed: true,
            border: false
        }, base),
        Ext.apply({
            headerPosition: 'bottom',
            collapsed: true,
            border: false
        }, base),
        Ext.apply({
            headerPosition: 'left',
            collapsed: true,
            border: false
        }, base)
    ];
    
    var listc = [
        Ext.apply({
            frame: true
        }, base),
        Ext.apply({
            headerPosition: 'right',
            frame: true,
            collapseDirection: 'left'
        }, base),
        Ext.apply({
            headerPosition: 'bottom',
            frame: true,
            collapseDirection: 'top'
        }, base),
        Ext.apply({
            headerPosition: 'left',
            frame: true
        }, base),
        Ext.apply({
            collapsed: true,
            frame: true
        }, base),
        Ext.apply({
            headerPosition: 'right',
            collapsed: true,
            frame: true
        }, base),
        Ext.apply({
            headerPosition: 'bottom',
            collapsed: true,
            frame: true
        }, base),
        Ext.apply({
            headerPosition: 'left',
            collapsed: true,
            frame: true
        }, base)
    ];
    
    var listd = [
        Ext.apply({
            border: false,
            frame: true
        }, base),
        Ext.apply({
            headerPosition: 'right',
            border: false,
            frame: true,
            collapseDirection: 'left'
        }, base),
        Ext.apply({
            headerPosition: 'bottom',
            border: false,
            frame: true,
            collapseDirection: 'top'
        }, base),
        Ext.apply({
            headerPosition: 'left',
            border: false,
            frame: true
        }, base),
        Ext.apply({
            collapsed: true,
            border: false,
            frame: true
        }, base),
        Ext.apply({
            headerPosition: 'right',
            collapsed: true,
            border: false,
            frame: true
        }, base),
        Ext.apply({
            headerPosition: 'bottom',
            collapsed: true,
            border: false,
            frame: true
        }, base),
        Ext.apply({
            headerPosition: 'left',
            collapsed: true,
            border: false,
            frame: true
        }, base)
    ];
    
    var liste = [
        Ext.apply({
            unstyled: true
        }, base),
        Ext.apply({
            headerPosition: 'right',
            unstyled: true,
            collapseDirection: 'left'
        }, base),
        Ext.apply({
            headerPosition: 'bottom',
            unstyled: true
        }, base),
        Ext.apply({
            headerPosition: 'left',
            unstyled: true
        }, base),
        Ext.apply({
            collapsed: true,
            unstyled: true
        }, base),
        Ext.apply({
            headerPosition: 'right',
            collapsed: true,
            unstyled: true
        }, base),
        Ext.apply({
            headerPosition: 'bottom',
            collapsed: true,
            unstyled: true
        }, base),
        Ext.apply({
            headerPosition: 'left',
            collapsed: true,
            unstyled: true
        }, base)
    ];
    
    var base = {
        xtype: 'window',
        width: 200,
        height: 100,
        html: '???',
        title: 'Panel',
        margin: '10 0',
        collapsible: true,
        animCollapse: false,
        hidden: false,
        floating: false
    };
    
    var listf = [
        Ext.apply({
            
        }, base),
        Ext.apply({
            headerPosition: 'right',
            collapseDirection: 'left'
        }, base),
        Ext.apply({
            headerPosition: 'bottom',
            collapseDirection: 'top'
        }, base),
        Ext.apply({
            headerPosition: 'left'
        }, base),
        Ext.apply({
            collapsed: true
        }, base),
        Ext.apply({
            headerPosition: 'right',
            collapsed: true
        }, base),
        Ext.apply({
            headerPosition: 'bottom',
            collapsed: true,
            collapseDirection: 'top'
        }, base),
        Ext.apply({
            headerPosition: 'left',
            collapsed: true
        }, base)
    ];
    
    //lists
    Ext.create('Ext.Viewport', {
        layout: 'fit',
        border: false,
        padding: 10,
        
        items: [
            {
                layout: 'hbox',
                border: false,
                defaults: {
                    margin: '10 50 10 0',
                    unstyled: true
                },
                items: [
                    {
                        title: 'Default panel',
                        items: lista
                    },
                    {
                        title: 'panel border:false',
                        items: listb
                    },
                    {
                        title: 'framed panel',
                        items: listc
                    },
                    {
                        title: 'framed panel border:false',
                        items: listd
                    },
                    {
                        title: 'unstyled panel',
                        items: liste
                    },
                    {
                        title: 'window',
                        items: listf
                    }
                ]
            }
        ]
    });
});
