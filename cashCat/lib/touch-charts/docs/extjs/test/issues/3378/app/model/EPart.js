/*

This file is part of Ext JS 4

Copyright (c) 2011 Sencha Inc

Contact:  http://www.sencha.com/contact

Commercial Usage
Licensees holding valid commercial licenses may use this file in accordance with the Commercial Software License Agreement provided with the Software or, alternatively, in accordance with the terms contained in a written agreement between you and Sencha.

If you are unsure which license is appropriate for your use, please contact the sales department at http://www.sencha.com/contact.

*/

Ext.define('ESearch.model.EPart', {
    extend: 'Ext.data.Model',
    idProperty: 'id',
    fields: [
        {name:'id', type:'int'}, 'description', 'item_number', 'part_number'
    ],
    proxy: {
        // load using script tags for cross domain, if the data in on the same domain as
        // this page, an HttpProxy would be better
        type: 'ajax',
        url: 'app/store/data.json',
        reader: {
            root: 'response.docs',
            totalProperty: 'response.numFound'
        },
        // sends single sort as multi parameter
        simpleSortMode: true
    }
});

