/*

This file is part of Ext JS 4

Copyright (c) 2011 Sencha Inc

Contact:  http://www.sencha.com/contact

Commercial Usage
Licensees holding valid commercial licenses may use this file in accordance with the Commercial Software License Agreement provided with the Software or, alternatively, in accordance with the terms contained in a written agreement between you and Sencha.

If you are unsure which license is appropriate for your use, please contact the sales department at http://www.sencha.com/contact.

*/
Ext.define('Ext.org.AlbumTree', {
    extend: 'Ext.tree.Panel',
    alias : 'widget.albumtree',
    
    title: 'My Albums',
    animate: true,
    rootVisible: false,
    
    viewConfig: {
        plugins: [{
            ddGroup: 'organizerDD',
            enableDD: true,
            ptype: 'treeviewdragdrop'
        }]
    },
    
    root: {
        text: 'Root',
        children: [
            {
                text: 'Album 1',
                leaf: true
            }
        ]
    },
    
    initComponent: function() {
        this.tbar = [
            {
                text: 'New Album',
                iconCls: 'new-album',
                scope: this,
                handler: this.addAlbum
            }
        ];
        
        this.callParent();
    },
    
    /**
     * Adds a new album node to the root
     */
    addAlbum: function() {
        var root = this.store.getRootNode();
        
        root.appendChild({text: 'test', leaf: true});
    }
});
