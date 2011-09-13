/*

This file is part of Ext JS 4

Copyright (c) 2011 Sencha Inc

Contact:  http://www.sencha.com/contact

Commercial Usage
Licensees holding valid commercial licenses may use this file in accordance with the Commercial Software License Agreement provided with the Software or, alternatively, in accordance with the terms contained in a written agreement between you and Sencha.

If you are unsure which license is appropriate for your use, please contact the sales department at http://www.sencha.com/contact.

*/
// default to wildcard search
var query = '*';
var pass = 1;
Ext.define('ESearch.store.EParts', {
    extend: 'Ext.data.Store',
    model: 'ESearch.model.EPart',
    pageSize: 200,
    remoteSort: true,
    autoLoad:false,
    // allow the grid to interact with the paging scroller by buffering
    buffered: true,
    listeners: {
        beforeload:{ fn: function(store, options) {
            if (options && options.sorters) {
            var sorters = options.sorters;
            for (var i=0; i<sorters.length; i++) {
                // Need to switch sorter format to work with SOLR format
                if (sorters[i].property.toLowerCase().indexOf("asc",0) <= 0 && sorters[i].property.toLowerCase().indexOf("desc",0) <= 0) {
                    sorters[i].property = sorters[i].property + ' ' + sorters[i].direction.toLowerCase();
                }
            }}
        }},
        load: { fn: function(store, records, success, operation) {
            if (store && store.proxy && store.proxy.extraParams) {
                store.proxy.extraParams.q = query; //Set query param at load time based on latest input
            }
            if (pass++ === 2) {
                store.proxy.url = 'app/store/data-res332.json';
            }
            var field = Ext.getCmp('totalText');
            var seekTime = this.proxy.reader.jsonData.responseHeader.QTime/1000;
            field.update(addCommas(this.totalCount) + ' found in ' + seekTime + ' seconds');

            if (query.length > 1) {
                var queryParsed = query.replace(/\*/g,'').replace(/"/g, '').trim();
                var queries = queryParsed.split(' ');

                for (var i=0; i < queries.length; i++) {
                    if (queries[i]) {
                        var q = escapeRegExChars(queries[i]);

                        // Check to highlight text only in grid-body
                        var node = Ext.get("grid-inf").dom.childNodes;
                        for (var j=0; j < node.length;j++ ) {
                            if (node[j].className.contains("x-grid-body",true)) {
                                node = node[j];
                                break;
                            }
                        }

                        highlightText(node,
                                q + "+", 'HL', true);
                    }
                }
            }
            // temporary fix to address issue with scrollbars not resizing
            //var grid = Ext.getCmp('grid-inf');
            //grid.resetScrollers();
          }
        }
    }
});

