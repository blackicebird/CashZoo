/*

This file is part of Ext JS 4

Copyright (c) 2011 Sencha Inc

Contact:  http://www.sencha.com/contact

Commercial Usage
Licensees holding valid commercial licenses may use this file in accordance with the Commercial Software License Agreement provided with the Software or, alternatively, in accordance with the terms contained in a written agreement between you and Sencha.

If you are unsure which license is appropriate for your use, please contact the sales department at http://www.sencha.com/contact.

*/
/**
 * This file sets application-wide settings and launches the application when everything has
 * been loaded onto the page. By default we just render the application's Viewport inside the
 * launch method (see app/views/Viewport.js).
 * 
 * The global variable Vimeo holds a reference to your application, and namespaces have been
 * set up for Vimeo.views, Vimeo.models, Vimeo.controllers and Vimeo.stores
 */ 
new Ext.Application({
    defaultTarget: "mainPanel",
    name         : "Vimeo",
    usesHistory  : true,
    defaultUrl   : 'videos',
    autoInitViewport: false,
    
    launch: function() {
        this.viewport = new Vimeo.Viewport({
            application: this
        });
    }
});


