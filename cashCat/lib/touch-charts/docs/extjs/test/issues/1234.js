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
    var markup = '<p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Sed metus nibh, sodales a, '+
    'porta at, vulputate eget, dui. Pellentesque ut nisl. Maecenas tortor turpis, interdum non, sodales non, iaculis ac, '+
    'lacus. Vestibulum auctor, tortor quis iaculis malesuada, libero lectus bibendum purus, sit amet tincidunt quam turpis '+
    'vel lacus. In pellentesque nisl non sem. Suspendisse nunc sem, pretium eget, cursus a, fringilla vel, urna.<br/><br/>'+
    'Aliquam commodo ullamcorper erat. Nullam vel justo in neque porttitor laoreet. Aenean lacus dui, consequat eu, adipiscing '+
    'eget, nonummy non, nisi. Morbi nunc est, dignissim non, ornare sed, luctus eu, massa. Vivamus eget quam. Vivamus tincidunt '+
    'diam nec urna. Curabitur velit. Lorem ipsum dolor sit amet.</p>';
    
    var viewport = Ext.create('Ext.Viewport', {
       layout: 'border',
       defaults: {
           collapsible: true
       },
       items: [{
           id: 'center',
           region: 'center',
           xtype: 'tabpanel',
           title: "YAY",
           iconCls: 'x-icon1',
           items: [{
               iconCls: 'x-icon1',
               title: 'Tab 1'
           },{
               iconCls: 'x-icon2',
               title: 'Tab 2'
           }]
       },{
           id: 'north',
           region: 'north',
           title: 'north',
           html: 'North',
           html: markup,
           iconCls: 'x-icon1'
       }, {
           id: 'south',
           region: 'south',
           title: 'south',
           xtype: 'tabpanel',
           items: {
               title: 'tab1',
               html: markup
           },
           iconCls: 'x-icon1'   
       },{
           xtype: 'container',
           id: 'west',
           region: 'west',
           title: 'west',
           html: markup,
           iconCls: 'x-icon1'         
       },{
           id: 'east',
           region: 'east',
           title: 'east' ,
           html: markup,
           iconCls: 'x-icon1'
       }] 
    });

    Ext.TaskManager.start({
            run: function(){
               viewport.items.each(function(item) {
                   if (item.setIconCls) {
                       if (item.iconCls === 'x-icon2') {
                           item.setIconCls('x-icon1');
                       } else {
                           item.setIconCls('x-icon2');
                       }
                   }
               });
               var tabpanel = Ext.getCmp('center');
               tabpanel.items.each(function(item) {
                   if (item.setIconCls) {
                       if (item.iconCls === 'x-icon2') {
                           item.setIconCls('x-icon1');
                       } else {
                           item.setIconCls('x-icon2');
                       }
                   }
               });
            },
            interval: 1000
       });
});
