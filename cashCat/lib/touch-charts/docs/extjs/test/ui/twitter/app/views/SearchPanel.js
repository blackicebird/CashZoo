/*

This file is part of Ext JS 4

Copyright (c) 2011 Sencha Inc

Contact:  http://www.sencha.com/contact

Commercial Usage
Licensees holding valid commercial licenses may use this file in accordance with the Commercial Software License Agreement provided with the Software or, alternatively, in accordance with the terms contained in a written agreement between you and Sencha.

If you are unsure which license is appropriate for your use, please contact the sales department at http://www.sencha.com/contact.

*/
/**
 * @class twitter.views.SearchPanel
 * @extends Ext.panel.Panel
 * 
 * Simple dataview which displays a list of search terms from the localStorage 'Searches' store.
 */
Ext.define('twitter.views.SearchPanel', {
    extend: 'Ext.panel.Panel',
    alias : 'widget.searchpanel',
    
    /**
     * @private
     */
    initComponent: function() {
        var me = this,
            controller = Ext.ControllerManager.get('searches');
        
        controller.on({
            scope : me,
            search: me.highlight
        });
        
        /**
         * @cfg dataview
         * @type Ext.view.View
         * The dataview which shows all seacrhes
         */
        me.dataview = Ext.create('Ext.view.View', {
            store: Ext.getStore('Searches'),
            
            autoScroll  : true,
            singleSelect: true,
            multiSelect : false,
            trackOver   : true,
            overItemCls : 'x-search-over',
            itemSelector: '.x-search',
            tpl: new Ext.XTemplate(
                '<tpl for=".">',
                    '<div class="x-search">',
                        '{query}',
                        '<div class="x-delete"></div>',
                    '</div>',
                '</tpl>'
            ),
            listeners: {
                beforeitemclick: function(comp, record, node, index, e) {
                    var target = Ext.get(e.getTarget()),
                        record = me.dataview.getRecord(node);
                    
                    if (target.hasCls('x-delete')) {
                        me.onDestroy(record, index);
                        return false;
                    } else {
                        me.onSelect(record, index);
                        return true;
                    }
                }
            }
        });
        
        Ext.apply(me, {
            id    : 'searchpanel',
            ui    : 'searchpanel',
            border: false,
            layout: 'fit',
            
            dockedItems: [
                {
                    xtype  : 'searchtoolbar',
                    padding: '0 0 10 0',
                    dock   : 'top'
                }
            ],
            
            items: [me.dataview]
        });
        
        me.callParent(arguments);
    },
     
    /**
     * Called when a user wants to select/search a search term. Should first check if there is a record, then select record in the grid and then
     * dispatches to the Searches controller
     * @param {Ext.data.Record} record A search term record
     */
    onSelect: function(record) {
        if (!record) {
            return;
        }
        
        var controller = Ext.ControllerManager.get('searches'),
            query      = controller.sanitizeQuery(record.get('query'));
        
        //dispatch to the controller
        Ext.dispatch({
            controller: 'searches',
            action    : 'show',
            instance  : record,
            historyUrl: 'searches/' + query
        });
    },
    
    /**
     * Called when a user wants to destroy a search term. Should remove the record from the store and select the first before it. It should also call
     * sync() on the store as a record is being removed and it is a localStore
     * @param {Ext.data.Record} record A search term record
     */
    onDestroy: function(record, index) {
        var me = this,
            store = Ext.getStore('Searches'),
            selectedRecord = me.dataview.getRecord(me.dataview.getSelectedNodes()[0]);
        
        store.remove(record);
        store.sync();
        
        if (selectedRecord && selectedRecord == record) {
            var record = store.getAt(index) || store.getAt(index - 1) || store.getAt(0);
            if (record) {
                me.onSelect(record);
            }
        }
    },
    
    /**
     * Method called to highlight a specific record in the dataview
     * @param {Ext.data.Record} record A search term record
     */
    highlight: function(record) {
        var store = Ext.getStore('Searches'),
            me = this;
        
        //this may be called when the store is not loaded, so defer it if so
        if (!store.getCount()) {
            Ext.defer(me.highlight, 100, me, [record]);
            return;
        }
        
        //select the record
        var index  = store.find('query', record.get('query')),
            record = store.getAt(index);
        
        if (record) {
            me.dataview.getSelectionModel().select(record, false);
        } else {
            //get the first store record and select it
            var first = store.first();
            if (first) {
                me.onSelect(first);
            }
        }
    }
});

