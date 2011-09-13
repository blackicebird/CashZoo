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
    
    var lineModel = [
        {
            name: 'data1',
            data: 10
        },
        {
            name: 'data2',
            data: 10
        },
        {
            name: 'data3',
            data: 20
        },
        {
            name: 'data4',
            data: 10
        },
        {
            name: 'data5',
            data: 10
        }
    ];
    
    var lineStore = store3;
    store3.loadData(generateData(20));
    
    var lineChart = Ext.create('Ext.chart.Chart', {
        width:150,
        height: 50,
        animate: false,
        shadow: false,
        store: lineStore,
        theme: 'Category2',
        axes: [],
        series: [{
            type: 'line',
            axis: 'left',
            xField: 'name',
            yField: ['data1'],
            showMarkers: false
        }, {
            type: 'line',
            axis: 'left',
            xField: 'name',
            yField: ['data2'],
            showMarkers: false
        }, {
            type: 'line',
            axis: 'left',
            xField: 'name',
            yField: ['data3'],
            showMarkers: false
        }, {
            type: 'line',
            axis: 'left',
            xField: 'name',
            yField: ['data4'],
            showMarkers: false
        }]
    });
    
    var panel1 = Ext.create('widget.panel', {
        width: 800,
        height: 400,
        title: 'Line Chart',
        renderTo: Ext.getBody(),
        layout: 'fit',
        items: {
            xtype: 'chart',
            animate: true,
            shadow: true,
            store: store1,
            axes: [{
                type: 'Numeric',
                position: 'left',
                fields: ['data1'],
                title: false,
                grid: true,
                minimum: 0,
                maximum: 120,
                majorTickSteps: 3,
                adjustMaximumByMajorUnit: false,
                adjustMinimumByMajorUnit: false
            }, {
                type: 'Category',
                position: 'bottom',
                fields: ['name'],
                title: false
            }],
            series: [{
                type: 'line',
                axis: 'left',
                gutter: 80,
                xField: 'name',
                yField: ['data1'],
                callouts: {
                    offsetFromViz: 100,
                    styles: {
                        width: 150,
                        height: 80,
                        'stroke-width': 2
                    },
                    items: {
                        xtype: 'container',
                        layout: 'hbox',
                        items: lineChart
                    },
                    filter: function(storeItem) {
                        if (storeItem.get('name') == 'March') {
                            return true;   
                        }
                        return false;
                    },
                    renderer: function(callout, storeItem) {
                        if (storeItem.get('name') == 'March') {
                            callout.panel.setTitle("Progress for March");
                        }
                    }
                }
            }]
        }
    });
});

