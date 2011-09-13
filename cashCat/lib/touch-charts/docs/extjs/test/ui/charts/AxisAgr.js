/*

This file is part of Ext JS 4

Copyright (c) 2011 Sencha Inc

Contact:  http://www.sencha.com/contact

Commercial Usage
Licensees holding valid commercial licenses may use this file in accordance with the Commercial Software License Agreement provided with the Software or, alternatively, in accordance with the terms contained in a written agreement between you and Sencha.

If you are unsure which license is appropriate for your use, please contact the sales department at http://www.sencha.com/contact.

*/
Ext.require('Ext.chart.*');
Ext.require('Ext.data.*');
Ext.require(['Ext.Window', 'Ext.fx.target.Sprite', 'Ext.layout.container.Fit']);

         Ext.onReady (function () {
            Ext.regModel ('chart', {
                fields: [
                   { name: 'timestamp', type: 'date' },
                   { name: 'a', type: 'int' },
                   { name: 'b', type: 'int' }
                ]
             });
             
             var store1 = new Ext.data.Store({
                model: 'chart',
                data: []
             });

            Ext.create ('Ext.container.Viewport', {
               layout: 'fit',
               items: [{
                  xtype: 'chart',
                  animate: true,
                  store: store1,
                  shadow: true,
                  theme: 'Category1',
                  legend: { position: 'right' },
                  axes: [{
                     type: 'Numeric',
                     minimum: 0,
                     position: 'left',
                     fields: ['a', 'b'],
                     label: {
                        renderer: function(v) {
                            return v * 3;
                        }
                     }
                  }, {
                     type: 'Time',
                     position: 'bottom',
                     fields: ['timestamp'],
                     groupBy: 'year,month,day',
                     dateFormat: 'l'
                  }],
                  series: [{
                     type: 'line',
                     highlight: {
                        size: 7,
                        radius: 7
                     },
                     axis: 'left',
                     xField: 'timestamp',
                     yField: 'a'
                  }]
               }]
            });
            
            Ext.Function.defer (store1.loadData, 5000, store1, [[                  
                { timestamp: '01/01/2010T00:00:00Z', a: 1 },
                { timestamp: '01/01/2010T12:00:00Z', a: 1 },
                { timestamp: '01/02/2010T00:00:00Z', a: 5 },
                { timestamp: '01/02/2010T12:00:00Z', a: 5 },
                { timestamp: '01/03/2010T00:00:00Z', a: 1 },
                { timestamp: '01/03/2010T12:00:00Z', a: 1 },
                { timestamp: '01/04/2010T00:00:00Z', a: 5 },
                { timestamp: '01/04/2010T12:00:00Z', a: 5 },
                { timestamp: '01/05/2010T00:00:00Z', a: 1 },
                { timestamp: '01/05/2010T12:00:00Z', a: 1 }
             ]]);

         });

    
    
    
    
  
    

