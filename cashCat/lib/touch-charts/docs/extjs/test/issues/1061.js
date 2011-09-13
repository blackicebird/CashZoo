/*

This file is part of Ext JS 4

Copyright (c) 2011 Sencha Inc

Contact:  http://www.sencha.com/contact

Commercial Usage
Licensees holding valid commercial licenses may use this file in accordance with the Commercial Software License Agreement provided with the Software or, alternatively, in accordance with the terms contained in a written agreement between you and Sencha.

If you are unsure which license is appropriate for your use, please contact the sales department at http://www.sencha.com/contact.

*/
Ext.require('*');
Ext.onReady(function(){
    Ext.createWidget('tabpanel', {
       width: 800,
       height: 200,
       tabPosition: 'bottom',
       items: [{
           id: 'tab1',
           title: 'TAB 1'
       },{
           id: 'tab2',
           title: 'TAB 2',
           closable: true
       }],
       renderTo: Ext.getBody()
    });
    Ext.TaskManager.start({
         run: function(){
             var tab1 =  Ext.getCmp('tab1');
             if (tab1) {
                 tab1.setTitle(tab1.title + ' * ');
             }
             var tab2 =  Ext.getCmp('tab2');
             if (tab2) {
                 tab2.setTitle(tab2.title + ' * ');
             }
         },
         interval: 1000
     });
});
