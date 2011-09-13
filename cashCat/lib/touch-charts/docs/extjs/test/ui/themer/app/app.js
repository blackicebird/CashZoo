/*

This file is part of Ext JS 4

Copyright (c) 2011 Sencha Inc

Contact:  http://www.sencha.com/contact

Commercial Usage
Licensees holding valid commercial licenses may use this file in accordance with the Commercial Software License Agreement provided with the Software or, alternatively, in accordance with the terms contained in a written agreement between you and Sencha.

If you are unsure which license is appropriate for your use, please contact the sales department at http://www.sencha.com/contact.

*/
Ext.onReady(function() {
    Ext.getBody().removeCls('ext-no-border-radius');
    Ext.getBody().removeCls('ext-no-linear-gradient');
});

Ext.regApplication({
    name: "themer",
    autoInitViewport: false,
    
    // defaultUrl   : 'searches/first',
    defaultTarget: "viewport",
    
    /**
     * This is called automatically when the page loads. Here we set up the main component on the page - the Viewport
     */
    launch: function() {
        this.viewport = new themer.views.Viewport({
            application: this
        });
        
        Ext.dispatch({
            controller: 'compiler',
            action    : 'compile'
        });
    }
});
