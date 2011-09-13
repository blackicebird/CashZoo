/*

This file is part of Ext JS 4

Copyright (c) 2011 Sencha Inc

Contact:  http://www.sencha.com/contact

Commercial Usage
Licensees holding valid commercial licenses may use this file in accordance with the Commercial Software License Agreement provided with the Software or, alternatively, in accordance with the terms contained in a written agreement between you and Sencha.

If you are unsure which license is appropriate for your use, please contact the sales department at http://www.sencha.com/contact.

*/
Ext.create('Ext.app.Application', {
    name: 'Tasks',
    
    routes: {
        "list/show/:list": {controller: 'List', action: 'show', list: ':list'}
    },
    
    //defaultUrl: 'list/show/all',
    
    enableHistory: true,
    enableQuickTips: true,
    
    controllers: [
        'List'
    ],
    
    launch: function() {
        this.viewport = Ext.create('Tasks.view.Viewport');        
        this.control(this.viewport, {
            listtree: {
                selectionchange: true,
                quickbar: {
                    createList: {
                        click: true
                    }
                }
            },
            taskgrid: {
                selectionchange: true
            }
        });
    }
});


