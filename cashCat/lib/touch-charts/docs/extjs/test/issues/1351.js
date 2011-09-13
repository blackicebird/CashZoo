/*

This file is part of Ext JS 4

Copyright (c) 2011 Sencha Inc

Contact:  http://www.sencha.com/contact

Commercial Usage
Licensees holding valid commercial licenses may use this file in accordance with the Commercial Software License Agreement provided with the Software or, alternatively, in accordance with the terms contained in a written agreement between you and Sencha.

If you are unsure which license is appropriate for your use, please contact the sales department at http://www.sencha.com/contact.

*/
Ext.require('Ext.tab.Panel');

Ext.onReady(function() {
    
    var tabs = Ext.create('Ext.tab.Panel', {
        width: 400,
        height: 400,
        renderTo: document.body,
        items: [{
            title: 'Home',
            html: 'Home',
            itemId: 'home'
        }, {
            title: 'Users',
            html: 'Users',
            itemId: 'users',
            hidden: true
        }, {
            title: 'Tickets',
            html: 'Tickets',
            itemId: 'tickets'
        }]    
    });
    
    setTimeout(function(){
        tabs.child('#home').tab.hide();
        var users = tabs.child('#users');
        users.tab.show();
        tabs.setActiveTab(users);
    }, 1000);
    
});
