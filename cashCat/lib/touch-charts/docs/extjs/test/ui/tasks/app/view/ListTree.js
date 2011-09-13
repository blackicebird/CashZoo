/*

This file is part of Ext JS 4

Copyright (c) 2011 Sencha Inc

Contact:  http://www.sencha.com/contact

Commercial Usage
Licensees holding valid commercial licenses may use this file in accordance with the Commercial Software License Agreement provided with the Software or, alternatively, in accordance with the terms contained in a written agreement between you and Sencha.

If you are unsure which license is appropriate for your use, please contact the sales department at http://www.sencha.com/contact.

*/
Ext.define('Tasks.view.ListTree', {
   extend: 'Ext.tree.Panel',
   alias: 'widget.view.listtree',
   
   //title: 'My Lists',
   // width: 200,
   // margins: '3',
   rootVisible: true,
   useArrows: true,
   hideHeaders: true,
   // animCollapse: false,
   // animExpand: false,
   // collapsible: true,
   // collapseDirection: Ext.Component.DIRECTION_LEFT,
   
   initComponent: function() {
       this.quickbar = Ext.create('Ext.Toolbar', {
           itemId: 'quickbar',
           dock: 'bottom',
           items: [{
               tooltip: 'Create List',
               itemId: 'createList',
               iconCls: 'create-list'
           }, {
               tooltip: 'Delete List',
               itemId: 'destroyList',
               iconCls: 'delete-list'
           }, '-', {
               tooltip: 'Create Folder',
               itemId: 'createFolder',
               iconCls: 'create-folder'
           }, {
               tooltip: 'Delete Folder',
               itemId: 'destroyFolder',
               iconCls: 'delete-folder'
           }]
       });
       
       this.columns = [{
           dataIndex: 'name',
           flex: 1,
           xtype: 'treecolumn',
           field: {
               xtype: 'textfield'
           }
       }];
       
       this.viewConfig = {
          toggleOnDblClick: false,
          markDirty: false 
       };
       
       this.plugins = [Ext.create('Ext.grid.plugin.CellEditing')];
       
       this.dockedItems = [this.quickbar];
       this.callParent(arguments);
   }
});
