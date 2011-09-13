/*

This file is part of Ext JS 4

Copyright (c) 2011 Sencha Inc

Contact:  http://www.sencha.com/contact

Commercial Usage
Licensees holding valid commercial licenses may use this file in accordance with the Commercial Software License Agreement provided with the Software or, alternatively, in accordance with the terms contained in a written agreement between you and Sencha.

If you are unsure which license is appropriate for your use, please contact the sales department at http://www.sencha.com/contact.

*/
Ext.define('ESearch.view.parts.List', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.partslist',
    store: 'EParts',
    initComponent: function() {
        var groupingFeature = Ext.create('Ext.grid.feature.Grouping', {
            groupHeaderTpl: 'Group: {name} ({rows.length})',
            startCollapsed: false
        });

        var selectFeature = Ext.create('qcom.grid.SelectFeature');

        var config = {
            name: 'qparts-grid',
            id: 'grid-inf',
            verticalScrollerType: 'paginggridscroller',
            loadMask: true,
            invalidateScrollerOnRefresh: false,
            disableSelection: false,  //need selection for drag-n-drop            
            features: [groupingFeature,selectFeature],
            viewConfig: {
                trackOver: false
            },
            // grid columns
            columns:[{xtype: 'rownumberer',width: 45, sortable: false},{
                id: 'id-col',
                header: "ID",
                dataIndex: 'id',
                width:60
            },{
                id:"descr",
                header: "Description",
                dataIndex: 'description',
                width: 300,
                renderer: columnWrap
            },{
                id:"itemnum",
                header: "Item Numbers",
                dataIndex: 'item_number',
                width: 100
            },{
                id: "partnum",
                header: "Part Numbers",
                dataIndex: 'part_number',
                flex: 1,
                renderer: columnWrap
            }]
            ,selModel:{
				 selType:'rowmodel'
				,allowDeselect:true
				,mode:'MULTI'
			},
            tbar:
                ['Search:',{
                     xtype: 'textfield',
                     name: 'searchField',
                     hideLabel: true,
                     width: 250,
                     emptyText: "Enter search terms separated by space",
                     listeners: {
                         change: {
                            fn: function adjustQuery(field) {
                                // temporary fix to address issue with scrollbars not resizing
                                //this.store.resetData();

                                // Regex query and add wildcards where appropriate
                                if (field.value.length >= 1) {
                                    var values = field.getValue().match(/[A-Za-z0-9_%\/\.\-\|]+|"[^"]+"/g),
                                        value =[];
                                    if (values && values.length > 1) {
                                        for ( var i=0; i < values.length; i++ ) {
                                            if (values[i].indexOf("\"") >= 0 ) {
                                                value.push(values[i].toLowerCase());
                                            }
                                            else {
                                                value.push("*" + values[i].toLowerCase() + "*");
                                            }
                                        }
                                        query = value.join(" ");
                                        if (Ext.isChrome) {
                                            console.log(query);
                                        }
                                    }
                                    else {
                                        if (field.getValue().indexOf("\"") >= 0 ) {
                                            value.push(field.getValue().toLowerCase());
                                            query = value.join(" ");
                                        }
                                        else {
                                            // temporary fix because regex not picking up 1 char
                                            var temp = values ? values[0] : field.getValue();
                                            query = "*" + temp.toLowerCase() + "*";
                                        }
                                        if (Ext.isChrome) {
                                            console.log(query);
                                        }
                                    }
                                    this.store.load({
                                        params: {q:query}
                                    });
                                }
                            },
                            scope: this,
                            buffer: 500
                         }
                     }
                },
//                {
//                     text:'New Search'
//                    ,operation:'newSearch'
//			    },
                {
                     xtype: 'tbfill'
                },{
                     xtype: 'displayfield',
                     name: 'totalText',
                     id: 'totalText',
                     hideLabel: true,
                     baseCls: 'x-toolbar-text',
                     style: 'text-align:right;',
                     width:180
                }
            ]
        };
        // apply config object
		Ext.apply(this, config);

		// call parent initComponent
		this.callParent(arguments);
    }
});

