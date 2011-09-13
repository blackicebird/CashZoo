/*

This file is part of Ext JS 4

Copyright (c) 2011 Sencha Inc

Contact:  http://www.sencha.com/contact

Commercial Usage
Licensees holding valid commercial licenses may use this file in accordance with the Commercial Software License Agreement provided with the Software or, alternatively, in accordance with the terms contained in a written agreement between you and Sencha.

If you are unsure which license is appropriate for your use, please contact the sales department at http://www.sencha.com/contact.

*/
/**
 * @class twitter.views.Viewport
 * @extends Ext.Viewport
 * 
 * The viewport is the application's shell - the parts of the UI that don't change. In the Twitter app, we only ever render 
 * a single view at a time, so we use a fit layout here to have a fullscreen app and all it's contents stretch to that size. 
 * The other part of the UI is the search list on the left, which we add as a docked item.
 */
Ext.define('twitter.views.Viewport', {
    extend: 'Ext.Viewport',
    
    layout: 'fit',

    initComponent: function() {
        Ext.apply(this, {
            items: [
                {
                    id     : 'viewport',
                    padding: 0,
                    border : false,
                    
                    layout: {
                        type : 'hbox',
                        align: 'stretch'
                    },
                    
                    dockedItems: [
                        {
                            margin: '10',
                            border: false,
                            dockedItems: [
                                {
                                    xtype: 'component',
                                    dock : 'top',
                                    cls  : 'search-title',
                                    html : 'Twitter Search'
                                }
                            ],
                            items: [
                                {
                                    xtype : 'searchpanel',
                                    padding: 10
                                }
                            ],
                            width: 250,
                            dock : 'left',
                            layout: 'fit'
                        }
                    ]
                }
            ]
        });

        this.callParent(arguments);
    }
});


