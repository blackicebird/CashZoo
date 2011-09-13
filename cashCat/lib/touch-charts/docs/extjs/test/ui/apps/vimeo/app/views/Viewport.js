/*

This file is part of Ext JS 4

Copyright (c) 2011 Sencha Inc

Contact:  http://www.sencha.com/contact

Commercial Usage
Licensees holding valid commercial licenses may use this file in accordance with the Commercial Software License Agreement provided with the Software or, alternatively, in accordance with the terms contained in a written agreement between you and Sencha.

If you are unsure which license is appropriate for your use, please contact the sales department at http://www.sencha.com/contact.

*/
/**
 * @class Vimeo.Viewport
 * @extends Ext.Panel
 * This is a default generated class which would usually be used to initialize your application's
 * main viewport. By default this is simply a welcome screen that tells you that the app was
 * generated correctly.
 */
Ext.define("Vimeo.Viewport", {
    extend: 'Ext.Viewport',

    id        : 'viewport',
    layout    : 'fit',
    fullscreen: true,

    initComponent: function() {
        Ext.apply(this, {
            items: [
                {
                    id: 'mainPanel',
                    layout: 'card'
                }
            ]
        });
        
        Vimeo.Viewport.superclass.initComponent.apply(this, arguments);
    }
});

Ext.LoadMask = Ext.extend(Object, {
    bindStore: Ext.emptyFn
});

