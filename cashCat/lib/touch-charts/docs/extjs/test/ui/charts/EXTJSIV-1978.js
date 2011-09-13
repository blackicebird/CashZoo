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

Ext.onReady(function(){
   var d = new Date;
    var store = Ext.create('Ext.data.JsonStore', { 
        fields: ['date', 'sc'], 
        data: [ 
            {date: d, sc: 1}, 
            {date: Ext.Date.add(d, Ext.Date.DAY, 1),   sc: 3}, 
            {date: Ext.Date.add(d, Ext.Date.DAY, 5), sc: 4}, 
            {date: Ext.Date.add(d, Ext.Date.DAY, 6), sc: 3}, 
            {date: Ext.Date.add(d, Ext.Date.DAY, 7), sc: 2} 
        ] 
    }); 
        
    Ext.create('Ext.Panel', { 
        width: 800,  
        height: 400, 
        hidden: false, 
        border: 0, 
        renderTo: Ext.getBody(), 
        layout: 'fit', 
        items: [{ 
            xtype: 'chart', 
            id: 'accountChart', 
            style: 'background:#fff', 
            animate: true, 
            store: store, 
            shadow: false, 
            theme: 'Category1', 
            axes: [{ 
                type: 'Numeric', 
                position: 'left', 
                fields: ['sc'], 
                title: 'Y' 
            }, { 
                title: 'Timeline', 
                type: 'Time', 
                position: 'bottom', 
                fields: ['date'], 
                dateFormat: 'M d', 
                groupBy: 'year,month,day',
                fromDate: d,
                toDate: Ext.Date.add(d, Ext.Date.DAY, 7),
                constrain: true
            }], 
            series: [{ 
                type: 'line', 
                axis: 'left', 
                xField: 'date', 
                yField: 'sc', 
                showMarkers: true 
            }] 
        }] 
    }); 
});
