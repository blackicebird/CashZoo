/*

This file is part of Ext JS 4

Copyright (c) 2011 Sencha Inc

Contact:  http://www.sencha.com/contact

Commercial Usage
Licensees holding valid commercial licenses may use this file in accordance with the Commercial Software License Agreement provided with the Software or, alternatively, in accordance with the terms contained in a written agreement between you and Sencha.

If you are unsure which license is appropriate for your use, please contact the sales department at http://www.sencha.com/contact.

*/
Ext.define('Tasks.controller.List', {
    extend: 'Ext.app.Controller',
    
    model: 'Tasks.model.List',
    store: 'Tasks.store.List',

    init: function(application, eventbus) {
        // this.control(application.viewport, {
        //     listtree: {
        //         selectionchange: true,
        //         quickbar: {
        //             createList: {
        //                 click: true
        //             }
        //         }
        //     },
        // });
        
        console.log('init list controller', application, eventbus);
    },
    
    
    
        // 
        // index: function(interaction) {
        //     // if (!this.tree) {
        //     //     this.tree = this.render({
        //     //         view: 'ListTree',
        //     //         store: this.store
        //     //     }, this.application.viewport.view);
        //     // 
        //     //     this.control(this.tree, {
        //     //         selectionchange: this.onListSelect,
        //     //         
        //     //         quickbar: {
        //     //             createList:     {click: this.bind({controller: 'List', action: 'create'})},
        //     //             createFolder:   {click: this.bind({controller: 'List', action: 'create'})},
        //     //             destroyList:     {click: this.bind({controller: 'List', action: 'destroy'})},
        //     //             destroyFolder:   {click: this.bind({controller: 'List', action: 'destroy'})}
        //     //         }
        //     //     });
        //     // }
        // },
        // 
        // show: function(interaction) {
        //     // var list = interaction.list;
        //     // 
        //     // if (Ext.isString(list)) {
        //     //     list = this.store.getNodeById(list);
        //     // }
        //     // 
        //     // if (list) {
        //     //     this.tree.getSelectionModel().select(list);
        //     // }
        // },
        // 
        // create: function(interaction) {
        //     console.log('create', interaction);
        // },
        // 
        // destroy: function(interaction) {
        //     console.log('destroy', interaction);
        // },
        // 
        // onListSelect: function(selModel, selection) {
        //     console.log('select ', selection[0])
        // }
});
