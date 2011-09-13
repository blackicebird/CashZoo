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
 * Connects http://myapp.com/#home to the index controller's overview action:
 * map.connect("home", {controller: 'index', action: 'overview'});
 * 
 * Connects urls like "images/myImage.jpg" to the images controller's show action, passing
 * "myImage.jpg" as the "url" property of the options object each controller action receives:
 * map.connect("images/:url", {controller: 'images', action: 'show'});
 * 
 * Your app.js file can specify a defaultUrl config property, which will be dispatched to if there is
 * no specified url when the application first loads.
 */
Ext.Router.draw(function(map) {
    map.resources("Video");
});
