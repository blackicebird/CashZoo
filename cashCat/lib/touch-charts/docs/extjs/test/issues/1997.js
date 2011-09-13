/*

This file is part of Ext JS 4

Copyright (c) 2011 Sencha Inc

Contact:  http://www.sencha.com/contact

Commercial Usage
Licensees holding valid commercial licenses may use this file in accordance with the Commercial Software License Agreement provided with the Software or, alternatively, in accordance with the terms contained in a written agreement between you and Sencha.

If you are unsure which license is appropriate for your use, please contact the sales department at http://www.sencha.com/contact.

*/
Ext.Loader.setConfig({enabled: true});

Ext.Loader.setPath('Ext.ux', '../../examples/ux/');
Ext.require([
    'Ext.grid.*',
    'Ext.data.*',
    'Ext.util.*',
    'Ext.grid.PagingScroller','Ext.toolbar.TextItem',
    'Ext.ux.data.PagingMemoryProxy'
]);

function generateData (count) {
    var data = [],
        i;

    for (i = 0; i++ < count; ) {
        data.push({
            id: i,
            title: 'Record ' + i,
            replycount: i % 300
        });
    }

    return {
        data: data,
        totalRecords: count
    };
}

Ext.onReady(function(){
    Ext.define('ForumThread', {
        extend: 'Ext.data.Model',
        fields: [
            'id',
            'title',
            {name: 'replycount', type: 'int'}
        ],
        idProperty: 'threadid'
    });

    // create the Data Store
    var store = Ext.create('Ext.data.Store', {
        id: 'store',
        pageSize: 200,
        model: 'ForumThread',
        remoteSort: true,
        remoteFilter: true,
        // allow the grid to interact with the paging scroller by buffering
        buffered: true,
        proxy: {
            type: 'pagingmemory',
            reader: {
                root: 'data',
                totalProperty: 'totalRecords'
            },
            data: generateData(5000),
            // sends single sort as multi parameter
            simpleSortMode: true
        },
        sorters: [{
            property: 'title',
            direction: 'ASC'
        }]
    });

    var grid = Ext.create('Ext.grid.Panel', {
        width: 700,
        height: 500,
        title: 'ExtJS.com - Browse Forums',
        store: store,
        verticalScrollerType: 'paginggridscroller',
        loadMask: true,
        disableSelection: true,
        invalidateScrollerOnRefresh: false,
        viewConfig: {
            trackOver: false
        },
        // grid columns
        columns:[
            {xtype: 'rownumberer',width: 50, sortable: false},
            {
                // id assigned so we can apply custom css (e.g. .x-grid-cell-topic b { color:#333 })
                // TODO: This poses an issue in subclasses of Grid now because Headers are now Components
                // therefore the id will be registered in the ComponentManager and conflict. Need a way to
                // add additional CSS classes to the rendered cells.
                id: 'topic',
                text: "Topic",
                dataIndex: 'title',
                flex: 1,
                sortable: false
            },
            {
                text: "Replies",
                dataIndex: 'replycount',
                align: 'center',
                width: 70,
                sortable: false
            }
        ],
        tbar: [
            {xtype: 'tbfill'},
            'Search:',
            {
                 xtype: 'textfield',
                 name: 'searchField',
                 hideLabel: true,
                 width: 200,
                 listeners: {
                     change: function(field) {
                        var value = field.getValue();
                        if (value) {
                            store.filter({
                                property: 'replycount',
                                value: value
                            });
                        } else {
                            store.clearFilter();
                        }
                    },
                    scope: this,
                    buffer: 500 //waits 1/2 sec for keystrokes to stop
                 }
            }
        ],
        renderTo: Ext.getBody()
    });

    // trigger the data store load
    store.guaranteeRange(0, 199);
});

