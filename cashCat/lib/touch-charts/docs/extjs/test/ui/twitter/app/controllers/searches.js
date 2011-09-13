/*

This file is part of Ext JS 4

Copyright (c) 2011 Sencha Inc

Contact:  http://www.sencha.com/contact

Commercial Usage
Licensees holding valid commercial licenses may use this file in accordance with the Commercial Software License Agreement provided with the Software or, alternatively, in accordance with the terms contained in a written agreement between you and Sencha.

If you are unsure which license is appropriate for your use, please contact the sales department at http://www.sencha.com/contact.

*/
/**
 * @class searches
 * @extends Ext.Controller
 * 
 * The searches controller renders the tweets list for a given Search record. We have two public actions - first and
 * show. Usually, the 'show' action will be called, either because the user tapped on a search or because when the app
 * first loaded the browser url was in the form #searches/Search%20Term (see app/routes.js for more details).
 * 
 * The 'show' action shows the Tweets for a given Search. The 'first' action is used when initializing the application
 * for the first time - it makes sure that the shared Searches Store (see app/stores/Searches.js) is loaded and then
 * loads the first available Search. Because we add to history using the historyUrl config, if the user refreshes now
 * they will be taken straight to the 'show' action.
 * 
 */
Ext.regController("searches", {
    model: "Search",
    
    /**
     * Cleans up a query so it is good for the URL
     */
    sanitizeQuery: function(query) {
        return query.replace(" ", "%20").replace("@", "%40").replace("#", "%23").replace("?", "%3F");
    },
    
    /**
     * Reverts sanitizing the query
     */
    unsanitizeQuery: function(query) {
        return query.replace("%20", " ").replace("%40", "@").replace("%23", "#").replace('%3F', "?");
    },
    
    /**
     * Shows the first Search instance in the global Searches store (see app/stores/Search.js). If no Searches are
     * found, renders a message to the user asking them to add a search
     */
    first: function() {
        var store = Ext.getStore('Searches'),
            record = store.first();
        
        //inject some fake data into the store if there are no items
        if (!record) {
            record = store.create({query: 'Sencha'});
            store.add(record);
        }
        
        Ext.dispatch({
            controller: "searches",
            action    : "show",
            instance  : record,
            historyUrl: "searches/" + this.sanitizeQuery(record.get('query'))
        });
    },
    
    /**
     * Shows the results of a given Search. Handles both a Search model instance being passed or a query string
     * @param {Object} options Config object expected to have either an instance or a query property
     */
    show: function(options) {
        var store = Ext.getStore('Searches');
        
        //if the browser supports localStorage + the store has no loaded, defer this for 50ms until it has
        if (Ext.supports.localStorage && !store.loaded) {
            Ext.defer(this.show, 50, this, [options]);
            return;
        }
        
        var me       = this,
            search   = options.instance,
            timeline = me.timeline;
        
        //if we weren't given a Search instance, create a new one now
        if (!search) {
            var query = me.unsanitizeQuery(options.query);
            
            search = new this.model({
                query: query
            });
            
            //check if the search term is in the store. if not, add it
            if (store.find('query', query, 0, false, false, true) < 0) {
                store.add(search);
                store.sync();
            }
        }
        
        /*
         * This uses the hasMany association set up in app/models/Search.js to load the tweets for the given Search
         */
        store = search.tweets();
        
        /**
         * The first time we render the timeline component, we store a reference to it in this.timeline so that we can
         * reuse the instance we already have. If we haven't rendered yet, we render the timeline, otherwise we just bind
         * a new Store.
         */
        if (!timeline) {
            me.spacer1 = me.render({
                xtype: 'widget.tbspacer',
                flex: 1
            });
            timeline = me.timeline = me.render({
                xtype: 'widget.timeline',
                store: store
            });
            me.spacer2 = me.render({
                xtype: 'widget.tbspacer',
                flex: 1
            });
        } else {
            timeline.bindStore(store);
        }
        
        //load the tweets store
        store.load();
        
        //fire off a search event
        me.fireEvent('search', search);
    }
});

