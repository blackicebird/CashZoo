/*

This file is part of Ext JS 4

Copyright (c) 2011 Sencha Inc

Contact:  http://www.sencha.com/contact

Commercial Usage
Licensees holding valid commercial licenses may use this file in accordance with the Commercial Software License Agreement provided with the Software or, alternatively, in accordance with the terms contained in a written agreement between you and Sencha.

If you are unsure which license is appropriate for your use, please contact the sales department at http://www.sencha.com/contact.

*/
/**
 * @class Tweet
 * @extends Ext.data.Model
 * 
 * The Tweet model uses a custom Twitter proxy (defined in lib/TwitterProxy.js as it is not part of a particular app).
 * The Twitter application doesn't use this model directly very much, relying instead on the hasMany association with
 * the Search model to load the Tweets for a given Search.
 * 
 */
Ext.regModel("Tweet", {
    fields: [
        {name: "id",                type: "int"},
        {name: "text",              type: "string"},
        {name: "from_user",         type: "string"},
        {name: "profile_image_url", type: "string"}
    ],
    
    proxy: 'twitter'
});

