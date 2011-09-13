/*

This file is part of Ext JS 4

Copyright (c) 2011 Sencha Inc

Contact:  http://www.sencha.com/contact

Commercial Usage
Licensees holding valid commercial licenses may use this file in accordance with the Commercial Software License Agreement provided with the Software or, alternatively, in accordance with the terms contained in a written agreement between you and Sencha.

If you are unsure which license is appropriate for your use, please contact the sales department at http://www.sencha.com/contact.

*/
Ext.require('Ext.chart.*');
Ext.require('Ext.layout.container.Fit');

Ext.onReady(function () {
    //The canvas 
    var canvas = Ext.create('Ext.draw.Component', {
        viewBox: false
    });
 
    Ext.create('Ext.Window', {
        width: 800,
        height: 500,
        layout: 'fit',
        items: [canvas]
    }).show(); 
 
 //rectangle
    var rectangle = canvas.surface.add({
        type: 'rect',
        x: 500,
        y: 100,
        height: 100,
        width: 200,
        fill: '#ff0000'
    });
 
    //circle
    var circle = canvas.surface.add({
        type: 'circle',
        x: 100,
        y: 100,
        radius: 50,
        fill: '#ff6600'
    });
 
   rectangle.show(true);
   circle.show(true);
   
   rectangle.initDraggable();
   circle.initDraggable();
});
