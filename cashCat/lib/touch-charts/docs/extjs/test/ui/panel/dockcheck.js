/*

This file is part of Ext JS 4

Copyright (c) 2011 Sencha Inc

Contact:  http://www.sencha.com/contact

Commercial Usage
Licensees holding valid commercial licenses may use this file in accordance with the Commercial Software License Agreement provided with the Software or, alternatively, in accordance with the terms contained in a written agreement between you and Sencha.

If you are unsure which license is appropriate for your use, please contact the sales department at http://www.sencha.com/contact.

*/
Ext.require([
    'Ext.panel.Panel',
    'Ext.toolbar.TextItem'
]);

Ext.onReady(function() {

    // Ext.createWidget('panel', {
    //     renderTo: Ext.getBody(),
    //     height: 200,
    //     width: 200,
    //     title: 'toolbar: right',
    //     html: "Test Test Test",
    //     dockedItems: [{
    //         xtype: 'toolbar',
    //         dock: 'top',
    //         items: [{
    //             xtype: 'button',
    //             text: 'Button',
    //             color: 'toolbar'
    //         }, {
    //             xtype: 'tbtext',
    //             text: 'Testing'
    //         }]
    //     }]
    // });

    Ext.createWidget('panel', {
        renderTo: Ext.getBody(),
        height: 200,
        width: 200,
        title: 'toolbar: right',
        html: "Test Test Test",
        dockedItems: [{
            xtype: 'toolbar',
            dock: 'right',
            vertical: true,
            weight: 3,
            items: [{
                xtype: 'button',
                text: 'Button',
                color: 'toolbar'
            }, {
                xtype: 'tbtext',
                text: 'Testing'
            }]
        }, {
            dock: 'right',
            xtype: 'toolbar',
            vertical: true,
            weight: 2,
            items: {
                xtype: 'tbtext',
                text: 'Weighted'
            }
        }, {
            dock: 'right',
            xtype: 'toolbar',
            vertical: true,
            weight: 1,
            items: {
                xtype: 'tbtext',
                text: 'Weighted 2'
            }
        }]
    });
});

