/*

This file is part of Ext JS 4

Copyright (c) 2011 Sencha Inc

Contact:  http://www.sencha.com/contact

Commercial Usage
Licensees holding valid commercial licenses may use this file in accordance with the Commercial Software License Agreement provided with the Software or, alternatively, in accordance with the terms contained in a written agreement between you and Sencha.

If you are unsure which license is appropriate for your use, please contact the sales department at http://www.sencha.com/contact.

*/
Ext.define('Model1', {
    extend: 'Ext.data.Model',
    fields: ['name', 'age']
});

Ext.define('Model2', {
    extend: 'Ext.data.Model',
    fields: ['foo', 'bar']
});

Ext.onReady(function(){

    var grid = Ext.create('Ext.grid.Panel', {
        width: 400,
        height: 400,
        renderTo: document.body,
        store: {
            proxy: 'memory',
            model: 'Model1',
            data: [{
                name: 'a',
                age: 1
            }, {
                name: 'b',
                age: 2
            }, {
                name: 'c',
                age: 3
            }]
        },
        columns: [{
            width: 100,
            dataIndex: 'name',
            text: 'Name',
            locked: true
        }, {
            dataIndex: 'age',
            text: 'Age',
            flex: 1
        }]
    });
    
    setTimeout(function(){
        grid.reconfigure({
            proxy: 'memory',
            model: 'Model2',
            data: [{
                foo: 'x1',
                bar: 'y1'
            }, {
                foo: 'x2',
                bar: 'y2'
            }, {
                foo: 'x3',
                bar: 'y3'
            }]
        }, [{
            width: 200,
            text: 'Foo',
            dataIndex: 'foo',
            locked: true
        }, {
            text: 'Bar',
            dataIndex: 'bar',
            flex: 1
        }]);
    }, 1000);
    
    
});

