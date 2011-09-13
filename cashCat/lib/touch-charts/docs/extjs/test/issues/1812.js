/*

This file is part of Ext JS 4

Copyright (c) 2011 Sencha Inc

Contact:  http://www.sencha.com/contact

Commercial Usage
Licensees holding valid commercial licenses may use this file in accordance with the Commercial Software License Agreement provided with the Software or, alternatively, in accordance with the terms contained in a written agreement between you and Sencha.

If you are unsure which license is appropriate for your use, please contact the sales department at http://www.sencha.com/contact.

*/
Ext.require('*');

Ext.onReady(function() {
    function makeGrid (config) {
        return Ext.apply({
            xtype: 'grid',
            border: false,
            store: new Ext.data.ArrayStore({
                fields: [
                   { name: 'company' },
                   { name: 'selected', type: 'bool' }
                ],
                data: [
                    ['3m Co',''],
                    ['Alcoa Inc',''],
                    ['American Express Company',''],
                    ['American International Group, Inc.',''],
                    ['AT&T Inc.',''],
                    ['Caterpillar Inc.',''],
                    ['Citigroup, Inc.',''],
                    ['Exxon Mobil Corp',''],
                    ['General Electric Company',''],
                    ['General Motors Corporation',''],
                    ['Hewlett-Packard Co.',''],
                    ['Honeywell Intl Inc',''],
                    ['Intel Corporation',''],
                    ['Johnson & Johnson',''],
                    ['Merck & Co., Inc.',''],
                    ['Microsoft Corporation',''],
                    ['The Coca-Cola Company',''],
                    ['The Procter & Gamble Company',''],
                    ['Wal-Mart Stores, Inc.',''],
                    ['Walt Disney Company (The) (Holding Company)','']
                ]
            }),
            columns: [
                new Ext.grid.RowNumberer(),
                {
                    text: "Company",
                    flex: 1,
                    sortable: true,
                    dataIndex: 'company'
                },
                {
                    text: 'Selected',
                    width: 70,
                    dataIndex: 'selected'
                }
            ]
        }, config);
    }

    var canSelectRows = [ true, true ];

    var win = Ext.create('Ext.window.Window', {
        renderTo: Ext.getBody(),
        autoShow: true,
        title: 'Row Selection',
        x: 20, y: 20,
        width: 440,
        height: 250,
        layout: 'fit',
        tbar: [
            {
                text: 'Can Select Even Rows',
                handler: function (btn) {
                    canSelectRows[0] = !!btn.pressed;
                },
                enableToggle: true,
                pressed: canSelectRows[0]
            },
            {
                text: 'Can Select Odd Rows',
                handler: function (btn) {
                    canSelectRows[1] = !!btn.pressed;
                },
                enableToggle: true,
                pressed: canSelectRows[1]
            },
            {
                text: 'MultiSelect',
                handler: function (btn) {
                    var mode = btn.pressed ? 'MULTI' : 'SINGLE';
                    win.items.items[0].getSelectionModel().setSelectionMode(mode);
                },
                enableToggle: true
            }
        ],
        items: [
            makeGrid({
                listeners: {
                    selectionchange: function (){
                        var grid = win.items.items[0];
                        grid.store.each(function (rec) {
                            var sel = grid.getSelectionModel().isSelected(rec);
                            if (rec.data.selected !== sel) {
                                rec.data.selected = sel;
                                rec.afterEdit();
                            }
                        });
                    },
                    beforedeselect: function (sm, record, rowIdx) {
                        return canSelectRows[(rowIdx+1) % canSelectRows.length];
                    },
                    beforeselect: function (sm, record, rowIdx) {
                        return canSelectRows[(rowIdx+1) % canSelectRows.length];
                    }
                }
            })
        ]
    });

    function updateViewSelectins () {
        var infoCmp = Ext.getCmp('viewSelInfo'),
            view = viewWin.items.items[0],
            sel = [];

        view.store.each(function (rec) {
            if (view.getSelectionModel().isSelected(rec)) {
                sel.push(rec.data.name);
            }
        });
        var s = sel.join(', ');
        infoCmp.setText(s ? 'Selection: ' + s : 'No selection');
    }

    var canSelectItems = [ false, false ];
    var viewWin = Ext.create('Ext.window.Window', {
        renderTo: Ext.getBody(),
        autoShow: true,
        title: 'View Selection',
        x: 480, y: 20,
        width: 440,
        height: 250,
        layout: 'fit',
        tbar: [
            {
                text: 'Can Select Even',
                handler: function (btn) {
                    canSelectItems[0] = !!btn.pressed;
                },
                enableToggle: true,
                pressed: canSelectItems[0]
            },
            {
                text: 'Can Select Odd',
                handler: function (btn) {
                    canSelectItems[1] = !!btn.pressed;
                },
                enableToggle: true,
                pressed: canSelectItems[1]
            },
            {
                text: 'MultiSelect',
                handler: function (btn) {
                    var mode = btn.pressed ? 'MULTI' : 'SINGLE';
                    viewWin.items.items[0].getSelectionModel().setSelectionMode(mode);
                },
                enableToggle: true
            }
        ],
        bbar: [
            {
                xtype: 'tbtext',
                id: 'viewSelInfo',
                text: 'No selection'
            }
        ],
        items: Ext.create('Ext.view.View', {
            store: new Ext.data.ArrayStore({
                fields: [
                   { name: 'name' }
                ],
                data: [
                    [ '1' ],
                    [ '2' ],
                    [ '3' ],
                    [ '4' ],
                    [ '5' ],
                    [ '6' ],
                    [ '7' ],
                    [ '8' ],
                    [ '9' ],
                    [ '10' ],
                    [ '11' ],
                    [ '12' ],
                    [ '13' ]
                ]
            }),
            tpl: [
                '<tpl for=".">',
                    '<div style="margin: 6px; border: 1px solid blue; width:75px; height: 30px; float:left;" class="item">',
                        '{name}</div>',
                '</tpl>',
                '<div class="x-clear"></div>'
            ],
            //multiSelect: true,
            trackOver: true,
            overItemCls: 'x-item-over',
            itemSelector: 'div.item',
            listeners: {
                selectionchange: function(dv, nodes ){
                    var num = nodes.length,
                        s = num !== 1 ? 's' : '';
                    if (num) {
                        viewWin.setTitle('View Selection (' + num + ' item' + s + ' selected)');
                    } else {
                        viewWin.setTitle('View Selection');
                    }
                },
                beforedeselect: function (sm, record) {
                    Ext.Function.defer(updateViewSelectins, 100);
                    var index = parseInt(record.data.name, 10);
                    return canSelectItems[index % canSelectItems.length];
                },
                beforeselect: function (sm, record) {
                    Ext.Function.defer(updateViewSelectins, 100);
                    var index = parseInt(record.data.name, 10);
                    return canSelectItems[index % canSelectItems.length];
                }
            }
        })        
    })
});

