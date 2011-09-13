/*

This file is part of Ext JS 4

Copyright (c) 2011 Sencha Inc

Contact:  http://www.sencha.com/contact

Commercial Usage
Licensees holding valid commercial licenses may use this file in accordance with the Commercial Software License Agreement provided with the Software or, alternatively, in accordance with the terms contained in a written agreement between you and Sencha.

If you are unsure which license is appropriate for your use, please contact the sales department at http://www.sencha.com/contact.

*/
Ext.require(['*']);

Ext.onReady(function () {
    var viewPort = new Ext.Viewport({
        layout: 'border', items: [
            {
                region: 'north',
                title: 'North',
                height: 100
            },
            {
                region: 'south',
                collapsible: true,
                collapsed: true,
                height: 100,
                //split: true,
                title: 'Messages'
            },
            {
                region: 'west',
                collapsible: true,
                collapsed: true,
                width: 200,
                title: 'West'
            },
            {
                region: 'east',
                collapsible: true,
                collapsed: true,
                width: 200,
                title: 'East'
            },
            {
                region: 'center',
                html: 'In IE grow browser window on right and see if Expand tool in South '+
                    'region follows properly'
            }
        ]
    });
});

