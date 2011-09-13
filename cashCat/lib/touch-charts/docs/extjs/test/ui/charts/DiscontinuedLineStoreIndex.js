/*

This file is part of Ext JS 4

Copyright (c) 2011 Sencha Inc

Contact:  http://www.sencha.com/contact

Commercial Usage
Licensees holding valid commercial licenses may use this file in accordance with the Commercial Software License Agreement provided with the Software or, alternatively, in accordance with the terms contained in a written agreement between you and Sencha.

If you are unsure which license is appropriate for your use, please contact the sales department at http://www.sencha.com/contact.

*/
Ext.require(['Ext.chart.*', 'Ext.draw.*', 'Ext.data.*']);

Ext.onReady(function() {
    var store = Ext.create('Ext.data.JsonStore', {
        fields: ['date', 'a', 'b'],
        data: [{
            date: new Date(),
            a: 1
        }, {
            date: Ext.Date.add(new Date(), Ext.Date.DAY, 4),
            a: 3,
            b: 2
        }, {
            date: Ext.Date.add(new Date(), Ext.Date.DAY, 5),
            a: 5,
            b: 4
        }, {
            date: Ext.Date.add(new Date(), Ext.Date.DAY, 6),
            a: 3,
            b: 4
        }, {
            date: Ext.Date.add(new Date(), Ext.Date.DAY, 7),
            a: 2
        }]
    });
    
    Ext.create('Ext.Panel', {
        width: 800, //takes full width of the iframe 
        height: 400, //takes full height of the iframe 
        hidden: false,
        border: 0,
        //maximizable: true, 
        //title: 'Line Chart', 
        renderTo: Ext.getBody(),
        layout: 'fit',
        items: [{
            xtype: 'chart',
            id: 'accountChart',
            style: 'background:#fff',
            animate: true,
            store: store,
            shadow: false,
            //theme: 'Category1',
            axes: [{
                type: 'Numeric',
                position: 'left',
                fields: ['a', 'b'],
                title: 'Y'
            }, {
                title: 'Timeline',
                type: 'Category',
                position: 'bottom',
                fields: ['date'],
                dateFormat: 'M d',
                groupBy: 'year,month,day',
                //constrain: true, 
                //fromDate: new Date(new Date().getTime()+86400000*4), 
                //toDate: new Date(new Date().getTime()+86400000*7) 
                label: {
                    renderer: Ext.util.Format.dateRenderer('M d'),
                    rotate: {
                        degrees: 0
                    }
                }
            }],
            series: [{
                type: 'line',
                axis: 'left',
                xField: 'date',
                yField: 'a',
                showMarkers: true,
                renderer: function(sprite, record, attributes, index, store){
                    console.log(arguments);
                    if (record) 
                        console.log("Series 1: index:" + index + " record.data.date: " + record.data.date.getDate() + " record.data.a: " + record.data.b + " record.data.b: " + record.data.b);
                    
                    return Ext.apply(attributes, {});
                }
            }, {
                type: 'line',
                axis: 'left',
                xField: 'date',
                yField: 'b',
                showMarkers: true,
                renderer: function(sprite, record, attributes, index, store){
                    console.log(arguments);
                    if (record) 
                        console.log("Series 2: index:" + index + " record.data.date: " + record.data.date.getDate() + " record.data.a: " + record.data.b + " record.data.b: " + record.data.b);
                    
                    return Ext.apply(attributes, {});
                }
            }]
        }]
    });
});
