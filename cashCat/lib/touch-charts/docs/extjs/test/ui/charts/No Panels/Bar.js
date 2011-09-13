/*

This file is part of Ext JS 4

Copyright (c) 2011 Sencha Inc

Contact:  http://www.sencha.com/contact

Commercial Usage
Licensees holding valid commercial licenses may use this file in accordance with the Commercial Software License Agreement provided with the Software or, alternatively, in accordance with the terms contained in a written agreement between you and Sencha.

If you are unsure which license is appropriate for your use, please contact the sales department at http://www.sencha.com/contact.

*/
Ext.onReady(function () {
    var chart;

    Ext.get('reloadData').on('click', function() {
        store1.loadData(generateData());
    });

    Ext.chart.theme.White = Ext.extend(Ext.chart.theme.Base, {
        constructor: function() {
           Ext.chart.theme.White.superclass.constructor.call(this, {
               axis: {
                   stroke: 'rgb(8,69,148)',
                   'stroke-width': 1
               },
               axisLabel: {
                   fill: 'rgb(8,69,148)',
                   font: '12px Arial',
                   'font-family': '"Arial',
                   spacing: 2,
                   padding: 5,
                   renderer: function(v) { return v; }
               },
               axisTitle: {
                  font: 'bold 18px Arial'
               }
           });
        }
    });

    chart = new Ext.chart.Chart({
        renderTo: Ext.getBody(),
        width: 800,
        height: 600,
        animate: true,
        store: store1,
        theme: 'White',
        axes: [{
            type: 'Numeric',
            position: 'bottom',
            fields: ['data1'],
            label: {
               renderer: Ext.util.Format.numberRenderer('0,0')
            },
            title: 'Number of Hits'
        }, {
            type: 'Category',
            position: 'left',
            fields: ['name'],
            title: 'Month of the Year'
        }],
        series: [{
            type: 'bar',
            axis: 'bottom',
            xField: 'name',
            yField: 'data1',
            highlight: true,
            label: {
                display: 'insideEnd',
                field: 'data1',
                renderer: Ext.util.Format.numberRenderer('0'),
                orientation: 'horizontal',
                color: '#333',
               'text-anchor': 'middle'
            }
        }]
    });
});
