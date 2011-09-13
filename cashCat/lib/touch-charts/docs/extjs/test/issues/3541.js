/*

This file is part of Ext JS 4

Copyright (c) 2011 Sencha Inc

Contact:  http://www.sencha.com/contact

Commercial Usage
Licensees holding valid commercial licenses may use this file in accordance with the Commercial Software License Agreement provided with the Software or, alternatively, in accordance with the terms contained in a written agreement between you and Sencha.

If you are unsure which license is appropriate for your use, please contact the sales department at http://www.sencha.com/contact.

*/
Ext.onReady(function(){
    
    function hide(btn) {
        var p = viewport.child('panel[region=' + btn.region + ']');
        p.hide();
    }
    
    function show(btn) {
        var p = viewport.child('panel[region=' + btn.region + ']');
        p.show();
    }
    
    var buttons = [];
    Ext.each(['north', 'south', 'east', 'west'], function(region){
        buttons.push({
            region: region,
            text: 'Hide ' + region,
            handler: hide
        });
        
        buttons.push({
            region: region,
            text: 'Show ' + region,
            handler: show
        });
    });
    
    var viewport = Ext.create('Ext.container.Viewport', {
        layout: 'border',
        defaults: {
            collapsible: true
        },
        items: [{
            region: 'north',
            height: 100,
            html: 'North'
        }, {
            region: 'south',
            height: 100,
            html: 'South',
            collapseMode: 'mini'
        }, {
            region: 'west',
            width: 100,
            html: 'West'
        }, {
            region: 'east',
            width: 100,
            html: 'East',
            collapseMode: 'mini'
        }, {
            region: 'center',
            html: 'Center',
            dockedItems: [{
                xtype: 'toolbar',
                items: buttons
            }]
        }]
    });
    
});

