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
   store1.loadData([{
       name: 'Jan',
       data1: 100
   }, {
       name: 'Feb',
       data1: 100
   }, {
       name: 'Mar',
       data1: 100
   }, {
       name: 'Apr',
       data1: 100
   }, {
       name: 'May',
       data1: 100
   }, {
       name: 'Jun',
       data1: 100
   }, {
       name: 'Jul',
       data1: 100
   }, {
       name: 'Aug',
       data1: 100
   }, {
       name: 'Sep',
       data1: 100
   }, {
       name: 'Oct',
       data1: 100
   }, {
       name: 'Nov',
       data1: 100
   }, {
       name: 'Dec',
       data1: 100
   }]);

   var win = Ext.create('Ext.Window', {
       width: 800,
       height: 600,
       hidden: false,
       maximizable: true,
       title: 'Column Chart',
       renderTo: Ext.getBody(),
       layout: 'fit',
       items: {
           id: 'chartCmp',
           xtype: 'chart',
           animate: true,
           shadow: true,
           store: store1,
           axes: [{
               type: 'Category',
               position: 'bottom',
               fields: ['name'],
               title: 'Month of the Year'
           }],
           series: [{
               type: 'column',
               axis: 'left',
               label: {
                 display: 'insideEnd',
                 'text-anchor': 'middle',
                   field: 'data1',
                   renderer: Ext.util.Format.numberRenderer('0'),
                   orientation: 'vertical',
                   color: '#333'
               },
               xField: 'name',
               yField: 'data1'
           }]
       }
   });
});
