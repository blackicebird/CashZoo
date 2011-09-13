/*

This file is part of Ext JS 4

Copyright (c) 2011 Sencha Inc

Contact:  http://www.sencha.com/contact

Commercial Usage
Licensees holding valid commercial licenses may use this file in accordance with the Commercial Software License Agreement provided with the Software or, alternatively, in accordance with the terms contained in a written agreement between you and Sencha.

If you are unsure which license is appropriate for your use, please contact the sales department at http://www.sencha.com/contact.

*/
/**
 * @class Search
 * @extends Ext.data.Model
 * 
 * The Search model uses localStorage to save the user's searches. As each Search consists of a number of Tweets, we
 * set up a hasMany association between this and the Tweet model. Even though the Tweet model uses a different proxy
 * (loading its data from twitter.com instead of localStorage), the hasMany association to Tweet still works. See the
 * 'show' action in app/controllers/search.js to see the assoociation in use.
 * 
 */
Ext.regModel("Search", {
    fields: [
        {name: "id",    type: "int"},
        {name: "query", type: "string"}
    ],
    
    hasMany: {
        model: "Tweet", 
        name : 'tweets',
        filterProperty: 'query',
        storeConfig: {
            pageSize: 15,
            remoteFilter: true,
            clearOnPageLoad: false
        }
    },
    
    proxy: (Ext.supports.localStorage) ? {
        type: 'localstorage',
        id  : 'twitter-searches'
    } : 'memory'
});

