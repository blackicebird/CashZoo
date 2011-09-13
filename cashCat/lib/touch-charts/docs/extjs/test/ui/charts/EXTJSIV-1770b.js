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
   Ext.define('SalesGrowthGlobal', {
	extend: 'Ext.data.Model',
    fields: [
        {name: 'productLine',  			type: 'string'},
        {name: 'salesRegion',  			type: 'string'},
        {name: 'upperTarget',  			type: 'float'},
        {name: 'value',                         type: 'float'}
    ]
});

    var salesGrowthGlobalChart = {                          
             id : 'salesGrowthGlobalChart',
             xtype : 'chart',
             width: 800,
             height: 600,            
             store: store,
             shadow: true,
             theme: 'Category1',
             legend: {
                 position: 'right'  
               },
             axes: [{
                 type: 'Numeric',
                 position: 'left',
                 fields: ['upperTarget','value'],                 
                 minorTickSteps: 1,
                 label: {
                     renderer: Ext.util.Format.numberRenderer('0.00')
                 },
                 grid: true
             },{
                 type: 'Category',
                 position: 'bottom',
                 fields: 'salesRegion',
                 title: 'Sales Region'
             }],
             series: [{
                 type: 'column',
                 axis: 'left',
                 gutter: 30,              
                 label: {
                 	display: 'outside',
                 	'text-anchor': 'middle',
                 	//field: ['lowerTarget','value'],
                 	renderer: Ext.util.Format.numberRenderer('0.00'),
                 	orientation: 'horizontal',
                 	color: '#FFF'
                 },
                 xField: 'salesRegion',
                 yField: ['upperTarget','value'],
                 style: {
                     opacity: 0.8
                 }          
             }]             
         };
});
