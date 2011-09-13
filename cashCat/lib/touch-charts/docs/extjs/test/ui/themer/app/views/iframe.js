/*

This file is part of Ext JS 4

Copyright (c) 2011 Sencha Inc

Contact:  http://www.sencha.com/contact

Commercial Usage
Licensees holding valid commercial licenses may use this file in accordance with the Commercial Software License Agreement provided with the Software or, alternatively, in accordance with the terms contained in a written agreement between you and Sencha.

If you are unsure which license is appropriate for your use, please contact the sales department at http://www.sencha.com/contact.

*/
Ext.define("themer.views.iframe", {
    extend: 'Ext.Panel',
    alias: 'widget.iframe',

    renderTpl: [
        '<div class="{baseCls}-wrap">',
            '<div class="{baseCls}-body<tpl if="bodyCls"> {bodyCls}</tpl>"<tpl if="bodyStyle"> style="{bodyStyle}"</tpl>>',
                '<iframe id="theme_iframe" src="" width="100%" height="100%" style="border-width:0;"></iframe>',
            '</div>',
        '</div>'
    ],
    
    initComponent: function() {
        Ext.applyIf(this, {
            border: false
        });
        
        themer.views.iframe.superclass.initComponent.call(this);
    }
});
