/*

This file is part of Ext JS 4

Copyright (c) 2011 Sencha Inc

Contact:  http://www.sencha.com/contact

Commercial Usage
Licensees holding valid commercial licenses may use this file in accordance with the Commercial Software License Agreement provided with the Software or, alternatively, in accordance with the terms contained in a written agreement between you and Sencha.

If you are unsure which license is appropriate for your use, please contact the sales department at http://www.sencha.com/contact.

*/
Ext.regController('compiler', {
    host: 'localhost',
    port: '4567',
    path: '',
    
    parameterKey: 'scss',
    
    iframe: null,
    
    compile: function(options) {
        var scss = options.args || '';
        
        //replace all ; with | so they can be passed via url
        scss = scss.replace(/;/g, '|');
        scss = scss.replace(/#/g, '=');
        scss = scss + "@import 'ext4/default/all'|";
        
        //get the url
        var url = this.getUrl(scss);
        
        //load the url in the iframe
        this.fetchThemeViewer(url);
    },
    
    /**
     * 
     */
    getUrl: function(str) {
        return Ext.String.format("http://{0}:{1}/{2}?{3}={4}", this.host, this.port, this.path, this.parameterKey, str);
    },
    
    /**
     * 
     */
    getiframe: function() {
        this.iframe = Ext.get('theme_iframe');
        return this.iframe;
    },
    
    /**
     * 
     */
    fetchThemeViewer: function(src) {
        if (!this.iframe) {
            this.getiframe();
        }
        
        this.iframe.dom.setAttribute('src', src);
    }
});

