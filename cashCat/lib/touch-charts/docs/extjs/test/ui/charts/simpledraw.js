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
        width: 1000,
        height: 500,
        maximized: true,
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
        fill: '#ff0000',
        stroke: '#555'
    });
 
 //circle
    var circle = canvas.surface.add({
        type: 'circle',
        x: 100,
        y: 100,
        radius: 50,
        fill: '#ff6600',
        stroke: '#555',
        'stroke-width': 5
    });

    //ellipse
    var ellipse = canvas.surface.add({
        type: 'ellipse',
        x: 500,
        y: 400,
        height: 100,
        width: 200,
        fill: '#ff0000',
        stroke: '#555'

    });

    //text
    var text = canvas.surface.add({
        type: 'text',
        x: 100,
        y: 400,
        text: 'This is some text',
        fill: '#000',
        font: '20px Arial'
    });

    //path
    var path = canvas.surface.add({
        type: 'path',
        x: 500,
        y: 400,
        path: ['M', 500, 100, 'L', 600, 150, 'L', 550, 200],
        stroke: '#000'
    });

   //rectangle.redraw();
   //circle.redraw();
   //ellipse.redraw();
   //text.redraw();
   //path.redraw();
   
   text.setAttributes({
        rotate: {
            degrees: 45    
        }    
    }, true);
   
   canvas.surface.render();
});
