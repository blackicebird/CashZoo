/*

This file is part of Ext JS 4

Copyright (c) 2011 Sencha Inc

Contact:  http://www.sencha.com/contact

Commercial Usage
Licensees holding valid commercial licenses may use this file in accordance with the Commercial Software License Agreement provided with the Software or, alternatively, in accordance with the terms contained in a written agreement between you and Sencha.

If you are unsure which license is appropriate for your use, please contact the sales department at http://www.sencha.com/contact.

*/
Ext.require('Ext.tab.*');

Ext.onReady(function(){

    var tabs = Ext.Array.map([1,2,3,4,5], function(num) {
            return {title: 'Tab ' + num};
        }),
        fewTabs = tabs.slice(0, 2);

    Ext.Array.forEach(['top', 'bottom'], function(pos) {

        Ext.widget('container', {
            renderTo: Ext.getBody(),
            defaultType: 'tabpanel',
            defaults: {
                tabPosition: pos,
                margin: 3,
                width: 150,
                height: 100,
                style: 'float: left;'
            },
            items: [{
                xtype: 'panel',
                title: 'Panel Title',
                headerPosition: pos
            }, {
                items: fewTabs
            }, {
                items: fewTabs,
                plain: true
            }, {
                items: tabs
            }, {
                items: tabs,
                plain: true
            }, {
                items: fewTabs,
                border: false
            }, {
                items: fewTabs,
                plain: true,
                border: false
            }, {
                items: tabs,
                border: false
            }, {
                items: tabs,
                plain: true,
                border: false
            }]
        });

    });

});
