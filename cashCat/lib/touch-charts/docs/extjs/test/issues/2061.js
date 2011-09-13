/*

This file is part of Ext JS 4

Copyright (c) 2011 Sencha Inc

Contact:  http://www.sencha.com/contact

Commercial Usage
Licensees holding valid commercial licenses may use this file in accordance with the Commercial Software License Agreement provided with the Software or, alternatively, in accordance with the terms contained in a written agreement between you and Sencha.

If you are unsure which license is appropriate for your use, please contact the sales department at http://www.sencha.com/contact.

*/

Ext.onReady(function() {
    var store = Ext.create('Ext.data.Store', {
        fields:['name', 'email', 'phone'],
        data:{'items':[
            {"name":"Lisa", "email":"lisa@simpsons.com", "phone":"555-111-1224"},
            {"name":"Bart", "email":"bart@simpsons.com", "phone":"555--222-1234"},
            {"name":"Homer", "email":"home@simpsons.com", "phone":"555-222-1244"},                        
            {"name":"Marge", "email":"marge@simpsons.com", "phone":"555-222-1254"},
            {"name":"Lisa", "email":"lisa@simpsons.com", "phone":"555-111-1224"},
            {"name":"Bart", "email":"bart@simpsons.com", "phone":"555--222-1234"},
            {"name":"Homer", "email":"home@simpsons.com", "phone":"555-222-1244"},                        
            {"name":"Marge", "email":"marge@simpsons.com", "phone":"555-222-1254"},
            {"name":"Lisa", "email":"lisa@simpsons.com", "phone":"555-111-1224"},
            {"name":"Bart", "email":"bart@simpsons.com", "phone":"555--222-1234"},
            {"name":"Homer", "email":"home@simpsons.com", "phone":"555-222-1244"},                        
            {"name":"Marge", "email":"marge@simpsons.com", "phone":"555-222-1254"}            
        ]},
        proxy: {
            type: 'memory',
            reader: {
                type: 'json',
                root: 'items'
            }
        }
    });

    Ext.create('Ext.grid.Panel', {
        title: 'Simpsons',
        store: store,
        columns: [
            {header: 'Name',  dataIndex: 'name'},
            {header: 'Email', dataIndex: 'email', flex:1},
            {header: 'Phone', dataIndex: 'phone'}
        ],
        height: 200,
        width: 400,
        collapsible: true,
        renderTo: Ext.getBody()
    });
});
