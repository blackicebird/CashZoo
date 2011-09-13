/*

This file is part of Ext JS 4

Copyright (c) 2011 Sencha Inc

Contact:  http://www.sencha.com/contact

Commercial Usage
Licensees holding valid commercial licenses may use this file in accordance with the Commercial Software License Agreement provided with the Software or, alternatively, in accordance with the terms contained in a written agreement between you and Sencha.

If you are unsure which license is appropriate for your use, please contact the sales department at http://www.sencha.com/contact.

*/
Ext.define('Shaper.Window', {
    extend: 'Ext.window.Window',
    alias: 'widget.shaperWindow',

    initComponent: function() {
        var canvas = Ext.create('Ext.draw.Component', {
            viewBox: false,
            itemId: 'canvas'

        });
        Ext.apply(this, {
            title: 'Sprites',
            width: 600,
            height: 400,
            x: 200,
            y: 200,
            layout: 'fit',
            hidden: false,
            maximizable: true,
            //renderTo: Ext.getBody(),
            items: [canvas],
            dockedItems: [
                {
                    xtype: 'toolbar',
                    dock: 'top',
                    items: [
                        {
                            text: 'circle',
                            itemId: 'cCircle',
                            scope: this,
                            handler: this.drawShape
                        },
                        {
                            text: 'Rect',
                            itemId: 'cRect',
                            scope: this,
                            handler: this.drawShape
                        },
                        {
                            text: 'Text',
                            itemId: 'cText',
                            scope: this,
                            handler: this.drawShape
                        },
                        {
                            text: 'Path',
                            itemId: 'cPath',
                            scope: this,
                            handler: this.drawShape
                        },
                        '->',
                        {
                            text: 'clear all',
                            scope: this,
                            handler: this.clearCanvas
                        }
                    ]}
            ]
        });
        this.callParent();
    },
    drawShape: function(button) {
        var sprite = null, canvas = this.down('#canvas'), x, y;
        switch (button.itemId) {
            case 'cCircle':
                sprite = new Ext.draw.Sprite({
                    type: 'circle',
                    x: 50,
                    y: 160,
                    radius: 50,
                    fill: 'red',
                    draggable: true
                });
                break;
            case 'cRect':
                sprite = new Ext.draw.Sprite({
                    type: 'rect',
                    x: 150,
                    y: 160,
                    width: 60,
                    height: 60,
                    fill: 'blue',
                    draggable: true
                });
                break;
            case 'cText':
                sprite = new Ext.draw.Sprite({
                    type: 'text',
                    x: 200,
                    y: 60,
                    width: 160,
                    height: 40,
                    text: 'Text-Sprite',
                    font: '12px Arial',
                    'stroke-width': 4,
                    fill: 'green',
                    draggable: true
                });
                break;
            case 'cPath':
                sprite = new Ext.draw.Sprite({
                    type: 'path',
                    path: 'M27.998,2.266c-2.12-1.91-6.925,0.382-9.575,1.93c-0.76-0.12-1.557-0.185-2.388-0.185c-3.349,0-6.052,0.985-8.106,2.843c-2.336,2.139-3.631,4.94-3.631,8.177c0,0.028,0.001,0.056,0.001,0.084c3.287-5.15,8.342-7.79,9.682-8.487c0.212-0.099,0.338,0.155,0.141,0.253c-0.015,0.042-0.015,0,0,0c-2.254,1.35-6.434,5.259-9.146,10.886l-0.003-0.007c-1.717,3.547-3.167,8.529-0.267,10.358c2.197,1.382,6.13-0.248,9.295-2.318c0.764,0.108,1.567,0.165,2.415,0.165c5.84,0,9.937-3.223,11.399-7.924l-8.022-0.014c-0.337,1.661-1.464,2.548-3.223,2.548c-2.21,0-3.729-1.211-3.828-4.012l15.228-0.014c0.028-0.578-0.042-0.985-0.042-1.436c0-5.251-3.143-9.355-8.255-10.663c2.081-1.294,5.974-3.209,7.848-1.681c1.407,1.14,0.633,3.533,0.295,4.518c-0.056,0.254,0.24,0.296,0.296,0.057C28.814,5.573,29.026,3.194,27.998,2.266zM13.272,25.676c-2.469,1.475-5.873,2.539-7.539,1.289c-1.243-0.935-0.696-3.468,0.398-5.938c0.664,0.992,1.495,1.886,2.473,2.63C9.926,24.651,11.479,25.324,13.272,25.676zM12.714,13.046c0.042-2.435,1.787-3.49,3.617-3.49c1.928,0,3.49,1.112,3.49,3.49H12.714z',
                    fill: 'rgb(156, 178, 248)',
                    x: 100,
                    y: 20,
                    draggable: true
                });
                break;
        }
        if (sprite) {
            canvas.surface.add(sprite);
            sprite.show(true);
        }
    },
    clearCanvas: function() {
        var surface = this.down('#canvas').surface;
        surface.removeAll(true);
    }
});

Ext.onReady(function() {
    Ext.widget('shaperWindow', {}).show();
});  
