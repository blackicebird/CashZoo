/*

This file is part of Ext JS 4

Copyright (c) 2011 Sencha Inc

Contact:  http://www.sencha.com/contact

Commercial Usage
Licensees holding valid commercial licenses may use this file in accordance with the Commercial Software License Agreement provided with the Software or, alternatively, in accordance with the terms contained in a written agreement between you and Sencha.

If you are unsure which license is appropriate for your use, please contact the sales department at http://www.sencha.com/contact.

*/
Ext.require([
    'Ext.grid.*',
    'Ext.data.*'
]);

Ext.onReady(function() {
    Ext.create('Ext.grid.Panel', {
        store: Ext.create('Ext.data.Store', {
            fields: [
               {name: 'company'},
               {name: 'price', type: 'float'}
            ],
            groupField: 'company',
            data: [
              ['3m Co', 71.72],
              ['3m Co', 34.78],
              ['3m Co', 44.75],
              ['Alcoa Inc', 22.22],
              ['Alcoa Inc', 29.01],
              ['Altria Group Inc', 12.02],
              ['American Express Company', 52.55]
            ],
            proxy: {
                type: 'memory',
                reader: {
                    type: 'array'
                }
            }
        }),
        features: [{
            hideGroupedHeader: true,
            ftype: 'grouping'
        }],
        columns: [
            {id:'company',text: 'Company', width: 200, dataIndex: 'company'},
            {text: 'Price', width: 200, dataIndex: 'price'}
        ],
        height: 350,
        width: 600,
        title: 'Hidden Grouped Header Grid',
        renderTo: Ext.getBody()
    });
});
