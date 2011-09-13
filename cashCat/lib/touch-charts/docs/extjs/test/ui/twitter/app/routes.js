/*

This file is part of Ext JS 4

Copyright (c) 2011 Sencha Inc

Contact:  http://www.sencha.com/contact

Commercial Usage
Licensees holding valid commercial licenses may use this file in accordance with the Commercial Software License Agreement provided with the Software or, alternatively, in accordance with the terms contained in a written agreement between you and Sencha.

If you are unsure which license is appropriate for your use, please contact the sales department at http://www.sencha.com/contact.

*/
/**
 * The routes.js file connects local urls (e.g. http://mydomain.com/#someUrl) to a controller action.
 * This allows the application to reinitialize itself if it is refreshed, and provides in-application
 * history support. Sample usage:
 * 
 * We only need a single route in the Twitter application - this always goes through to the show search
 * action and enables the application to restore the application state when the user refreshes.
 */
Ext.Router.draw(function(map) {
    map.connect("searches/first",  {controller: 'searches', action: 'first'});
    map.connect("searches/:query", {controller: 'searches', action: 'show'});
});

