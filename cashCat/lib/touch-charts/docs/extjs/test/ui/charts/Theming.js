/*

This file is part of Ext JS 4

Copyright (c) 2011 Sencha Inc

Contact:  http://www.sencha.com/contact

Commercial Usage
Licensees holding valid commercial licenses may use this file in accordance with the Commercial Software License Agreement provided with the Software or, alternatively, in accordance with the terms contained in a written agreement between you and Sencha.

If you are unsure which license is appropriate for your use, please contact the sales department at http://www.sencha.com/contact.

*/
Ext.require('Ext.chart.*');
Ext.require(['Ext.Window', 'Ext.fx.target.Sprite', 'Ext.layout.container.Fit']);

Ext.onReady(function () {
    var gradients = false;
    var refresh = (function() {
        var memo = {};
        return function() {
            win.items.each(function(n) {
                n.theme = theme;
                n.initTheme(theme);
                //Create gradients if not previously defined.
                if (n.themeAttrs.gradients) {
                    if (!(theme in memo)) {
                        n.surface.gradients = n.themeAttrs.gradients;
                        n.surface.initGradients();
                    }
                }
                n.redraw();
            });
            memo[theme] = true;
        };
    })();

    var theme = 'Base';
    var win = Ext.create('Ext.Window', {
        width: 800,
        height: 600,
        hidden: false,
        title: 'Chart Theming',
        renderTo: Ext.getBody(),
        layout: {
            type: 'vbox',
            align: 'stretch'
        },
        tbar: [{
            text: 'Reload Data',
            handler: function() {
                store1.loadData(generateData());
            }
        }, {
            text: 'Blue',
            handler: function() {
                theme = 'Blue' + (gradients? ':gradients' : '');
                refresh();
            }
        }, {
            text: 'Green',
            handler: function() {
                theme = 'Green' + (gradients? ':gradients' : '');
                refresh();
            }
        }, {
            text: 'Red',
            handler: function() {
                theme = 'Red' + (gradients? ':gradients' : '');
                refresh();
            }
        }, {
            text: 'Sky',
            handler: function() {
                theme = 'Sky' + (gradients? ':gradients' : '');
                refresh();
            }
        }, {
            text: 'Purple',
            handler: function() {
                theme = 'Purple' + (gradients? ':gradients' : '');
                refresh();
            }
        }, {
            text: 'Yellow',
            handler: function() {
                theme = 'Yellow' + (gradients? ':gradients' : '');
                refresh();
            }
        }, {
            text: 'Cat1',
            handler: function() {
                theme = 'Category1' + (gradients? ':gradients' : '');
                refresh();
            }
        }, {
            text: 'Cat2',
            handler: function() {
                theme = 'Category2' + (gradients? ':gradients' : '');
                refresh();
            }
        }, {
            text: 'Cat3',
            handler: function() {
                theme = 'Category3' + (gradients? ':gradients' : '');
                refresh();
            }
        }, {
            text: 'Cat4',
            handler: function() {
                theme = 'Category4' + (gradients? ':gradients' : '');
                refresh();
            }
        }, {
            text: 'Cat5',
            handler: function() {
                theme = 'Category5' + (gradients? ':gradients' : '');
                refresh();
            }
        }, {
            text: 'Cat6',
            handler: function() {
                theme = 'Category6' + (gradients? ':gradients' : '');
                refresh();
            }
        }, {
            text: 'Toggle Gradients',
            handler: function() {
                if (!gradients) {
                    theme += ':gradients';
                } else {
                    theme = theme.match(/([0-9A-Za-z]+).gradients/)[1];
                }
                gradients = !gradients;
                refresh();
            }
        }],
        items: [{
            xtype: 'chart',
            flex: 1,
            theme: theme,
            store: store1,
            shadow: false,
            series: [{
                type: 'column',
                xField: 'name',
                yField: ['data1', 'data2', 'data3', 'data4', 'data5'],
                stacked: true,
                style: {
                    'stroke-width': 0.5,
                    'stroke': '#555'
                }
            }]
        }, {
           xtype: 'chart',
           flex: 1,
           theme: theme,
           store: store1,
           shadow: false,
           series: [{
               type: 'line',
               showMarkers: true,
               xField: 'name',
               yField: 'data1',
               style: {
                       'stroke-width': 0.5
                   }
           },{
               type: 'line',
               showMarkers: true,
               xField: 'name',
               yField: 'data2',
               style: {
                       'stroke-width': 0.5
                   }
           }, {
               type: 'line',
               showMarkers: true,
               xField: 'name',
               yField: 'data3',
               style: {
                       'stroke-width': 0.5
                   }
           }]
        }, {
           xtype: 'chart',
           flex: 1,
           theme: theme,
           store: store1,
           shadow: false,
           series: [{
               type: 'area',
               showMarkers: false,
               smooth: true,
               fill: true,
               xField: 'name',
               yField: ['data1', 'data2', 'data3'],
               style: {
                   'stroke-width': 0.5,
                   'stroke': '#555'
               }
           }]
        }]
    });
});

