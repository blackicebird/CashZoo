/*

This file is part of Ext JS 4

Copyright (c) 2011 Sencha Inc

Contact:  http://www.sencha.com/contact

Commercial Usage
Licensees holding valid commercial licenses may use this file in accordance with the Commercial Software License Agreement provided with the Software or, alternatively, in accordance with the terms contained in a written agreement between you and Sencha.

If you are unsure which license is appropriate for your use, please contact the sales department at http://www.sencha.com/contact.

*/
Ext.regStore('Videos', {
    model: 'Video',
    autoLoad: true,
    
    listeners: {
        load: function(store, videos) {
            var tags    = new Ext.util.MixedCollection(),
                store   = Ext.getStore('Tags'),
                trim    = Ext.util.Format.trim,
                records = [];
            
            Ext.each(videos, function(video) {
                Ext.each(video.get('tags').split(','), function(tag) {
                    tags.add({tag: trim(tag)});
                }, this);
            });
            
            Ext.each(tags.collect('tag'), function(tag) {
                records.push({name: tag});
            }, this);
            
            store.removeAll();
            store.add(records);
            store.sort();
        }
    },
    
    proxy: {
        type: 'scripttag',
        
        reader: {
            type: 'json',
            root: 'query.results.videos',
            record: 'video'
        },
        
        autoAppendParams: false,

        /**
         * The Proxy will always use this url for all requests - Yahoo's YQL service does the rest with the 
         * query that we send it in {@link #buildRequest}
         */
        url: 'http://query.yahooapis.com/v1/public/yql',

        /**
         * This proxy uses YQL, which is an SQL-like way of accessing remote data. We are using an XTemplate
         * to generate the search query. See {@link #buildRequest} for more details
         */
        queries: {
            list: new Ext.XTemplate(
                'use "https://github.com/yql/yql-tables/raw/master/vimeo/vimeo.user.videos.xml" as videos;',
                'select video from videos where username="sencha"',
                {compiled: true}
            )
        },
        
        buildRequest: function(operation) {
            var request    = Ext.data.proxy.ScriptTag.prototype.buildRequest.apply(this, arguments),
                queryTpl   = this.queries.list,
                filters    = operation.filters || [],
                filterData = {};

            Ext.iterate(filters, function(filter) {
                filterData[filter.property] = filter.value;
            });

            delete request.params.filters;

            Ext.applyIf(request.params, {
                format: 'json',
                q: queryTpl.applyTemplate(filterData)
            });

            request.url = Ext.urlAppend(request.url, Ext.urlEncode(request.params));

            return request;
        }
    }
});
