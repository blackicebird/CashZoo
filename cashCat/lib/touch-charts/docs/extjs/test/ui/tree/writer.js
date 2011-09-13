/*

This file is part of Ext JS 4

Copyright (c) 2011 Sencha Inc

Contact:  http://www.sencha.com/contact

Commercial Usage
Licensees holding valid commercial licenses may use this file in accordance with the Commercial Software License Agreement provided with the Software or, alternatively, in accordance with the terms contained in a written agreement between you and Sencha.

If you are unsure which license is appropriate for your use, please contact the sales department at http://www.sencha.com/contact.

*/
Ext.require([
    'Ext.tree.*',
    'Ext.data.*',
    'Ext.tip.*'
]);

Ext.onReady(function() {
    Ext.QuickTips.init();
    
    var store = Ext.create('Ext.data.TreeStore', {
        proxy: {
            type: 'ajax',
            api: {
                read: 'sample-data.php',
                create: 'sample-data.php?action=create',
                update: 'sample-data.php?action=update',
                destroy: 'sample-data.php?action=destroy'
            }
        },
        root: {
            text: 'Ext JS',
            id: 'src',
            expanded: true
        }
    });
    
    var counter = 1;

    var tree = Ext.create('Ext.tree.Panel', {
        store: store,
        renderTo: 'tree-div',
        height: 300,
        width: 600,
        title: 'Files',
        viewConfig: {
            plugins: {
                ptype: 'treeviewdragdrop'
            }
        },
        tbar: [{
            text: 'Add to root node',
            handler: function(){
                tree.getRootNode().appendChild({
                    text: 'New Node ' + counter,
                    leaf: true
                });
                ++counter;
            }
        }, {
            text: 'Change selected',
            handler: function(){
                var node = tree.getSelectionModel().getSelection()[0];
                node.set('text', node.get('text') + 'foo');
            }
        }, {
            text: 'Remove selected',
            handler: function(){
                var node = tree.getSelectionModel().getSelection()[0];
                node.remove();
            }
        }, {
            text: 'Sync',
            handler: function(){
                store.sync();
            }
        }]
    });
});

