/*

This file is part of Ext JS 4

Copyright (c) 2011 Sencha Inc

Contact:  http://www.sencha.com/contact

Commercial Usage
Licensees holding valid commercial licenses may use this file in accordance with the Commercial Software License Agreement provided with the Software or, alternatively, in accordance with the terms contained in a written agreement between you and Sencha.

If you are unsure which license is appropriate for your use, please contact the sales department at http://www.sencha.com/contact.

*/
Ext.require('Ext.chart.*');
Ext.require(['Ext.Window', 'Ext.layout.container.Fit', 'Ext.fx.target.Sprite']);

Ext.onReady(function () {
   var trendStore = Ext.create('store.json', {
      fields: ['Month', 'Boston', 'Central', 'NewYork'],
      data: [{
          Month: 'Jan 09',
          Boston: 1000,
          Central: 900
      }, {
          Month: 'Jan 10',
          Boston: 1100,
          Central: 800
      }, {
          Month: 'Feb 10',
          Boston: 1200,
          Central: 1000
      }, {
          Month: 'Mar 10',
          Boston: 1200,
          Central: 700
      }]
  });

   Ext.createWidget('chart', {
      renderTo: Ext.getBody(),
      width: 500,
      height: 500,
      animate: false,
      store: trendStore,
      legend: {
          position: 'bottom'
      },
      axes: [{
          type: 'Numeric',
          position: 'left',
          grid: true,
          fields: ['Boston', 'Central'],
          title: 'Work Orders'
      }, {
          type: 'Category',
          position: 'bottom',
          fields: ['Month']
      }],
      series: [{
          title: 'Boston',
          type: 'line',
          lineWidth: 4,
          showMarkers: true,
          axis: 'right',
          xField: 'Month',
          yField: 'Boston',
          axis: 'left'
      }, {
          title: 'Central',
          type: 'line',
          lineWidth: 4,
          showMarkers: true,
          axis: 'right',
          xField: 'Month',
          yField: 'Central',
          axis: 'left'
      }]
  });
});
