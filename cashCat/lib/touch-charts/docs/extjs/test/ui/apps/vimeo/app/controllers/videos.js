/*

This file is part of Ext JS 4

Copyright (c) 2011 Sencha Inc

Contact:  http://www.sencha.com/contact

Commercial Usage
Licensees holding valid commercial licenses may use this file in accordance with the Commercial Software License Agreement provided with the Software or, alternatively, in accordance with the terms contained in a written agreement between you and Sencha.

If you are unsure which license is appropriate for your use, please contact the sales department at http://www.sencha.com/contact.

*/
/**
 * @class videos
 * @extends Ext.Controller
 * The videos controller
 */
Ext.regController("videos", {

    list: function(options) {        
        this.render({
            xtype: 'videolist',
            listeners: {
                scope: this,
                filterByTags: this.filterByTags,
                filterByQuery: this.filterByQuery,
                click: function(dataview, index) {
                    var video = dataview.store.getAt(index);
                    
                    return Ext.redirect(video);
                }
            }
        }, 'mainPanel');
    },

    show: function(options) {
        var id       = Number(options.id),
            store    = Ext.getStore('Videos'),
            instance = options.instance || store.getById(id);
        
        if (instance) {
            this.doShow(instance);
        } else {
            store.on('load', function(store, records) {
                this.doShow(store.getById(id));
            }, this, {single: true});
        }
    },
    
    doShow: function(video) {
        this.render({
            xtype: 'videoshow',
            video: video,
            
            listeners: {
                showList: Ext.createRedirect('videos')
            }
        }, 'mainPanel');
    },
    
    /**
     * Filters the Videos Store to only show videos matching at least one of the given tags
     */
    filterByTags: function(tags) {
        var store = Ext.getStore('Videos'),
            data  = Ext.Array.pluck(tags, 'data'),
            names = Ext.Array.pluck(data, 'name'),
            regex = new RegExp(names.join("|"));
        
        store.filter({
            id: 'tags',
            filterFn: function(record) {
                return regex.test(record.get('tags'));
            }
        });
    },
    
    /**
     * Filters the Videos Store by the given query string
     */
    filterByQuery: function(query) {
        var store = Ext.getStore('Videos');
        
        if (query == "") {
            store.filters.removeAtKey('query');
            store.filter();
        } else {
            store.filter({
                id: 'query',
                property: 'title',
                value   : query,
                anyMatch: true
            });
        }
    }
});

