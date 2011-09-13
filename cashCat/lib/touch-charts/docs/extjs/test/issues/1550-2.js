/*

This file is part of Ext JS 4

Copyright (c) 2011 Sencha Inc

Contact:  http://www.sencha.com/contact

Commercial Usage
Licensees holding valid commercial licenses may use this file in accordance with the Commercial Software License Agreement provided with the Software or, alternatively, in accordance with the terms contained in a written agreement between you and Sencha.

If you are unsure which license is appropriate for your use, please contact the sales department at http://www.sencha.com/contact.

*/
Ext.require(['*']);
Ext.onReady(function () {

    // Define the Order Model and it's associations
    Ext.regModel('Order', {
        fields: [{
            name: 'Id',
            type: 'int'
        }, {
            name: 'Name',
            type: 'string'
        }, {
            name: 'Description',
            type: 'string'
        }],
        hasMany: [{
            model: 'OrderItem',
            name: 'orderitems'
        }, {
            model: 'OrderRecipient',
            name: 'orderrecipients'
        }]
    });

    // Define the Order Item Model
    Ext.regModel('OrderItem', {
        fields: [{
            name: 'Id',
            type: 'int'
        }, {
            name: 'Name',
            type: 'string'
        }, {
            name: 'Description',
            type: 'string'
        }],
        belongsTo: 'Order'
    });

    // Define the Order Recipient Model
    Ext.regModel('OrderRecipient', {
        fields: [{
            name: 'Id',
            type: 'int'
        }, {
            name: 'Name',
            type: 'string'
        }, {
            name: 'Description',
            type: 'string'
        }],
        belongsTo: 'Order'
    });

    var myData = {
        orders: [
            {
                Id: 1,
                Name: 'Order 1',
                Description: 'Order 1 Desc',
                orderrecipients:
                [
                    {
                        Id: 1,
                        Name: 'Order 1 Recip 1',
                        Description: 'Order 1 Recip 1 Desc'
                    }
                ]
            },
            {
                Id: 2,
                Name: 'Order 2',
                Description: 'Order 2 Desc',
                orderitems:
                [
                    {
                        Id: 1,
                        Name: 'Order 2 Item 1',
                        Description: 'Order 2 Item 1 Desc'
                    },
                    {
                        Id: 2,
                        Name: 'Order 2 Item 2',
                        Description: 'Order 2 Item 2 Desc'
                    },
                    {
                        Id: 3,
                        Name: 'Order 2 Item 3',
                        Description: 'Order 2 Item 3 Desc'
                    },
                    {
                        Id: 4,
                        Name: 'Order 2 Item 4',
                        Description: 'Order 2 Item 4 Desc'
                    },
                    {
                        Id: 5,
                        Name: 'Order 2 Item 5',
                        Description: 'Order 2 Item 5 Desc'
                    },
                    {
                        Id: 6,
                        Name: 'Order 2 Item 6',
                        Description: 'Order 2 Item 6 Desc'
                    },
                    {
                        Id: 7,
                        Name: 'Order 2 Item 7',
                        Description: 'Order 2 Item 7 Desc'
                    },
                    {
                        Id: 8,
                        Name: 'Order 2 Item 8',
                        Description: 'Order 2 Item 8 Desc'
                    },
                    {
                        Id: 9,
                        Name: 'Order 2 Item 9',
                        Description: 'Order 2 Item 9 Desc'
                    },
                    {
                        Id: 10,
                        Name: 'Order 2 Item 10',
                        Description: 'Order 2 Item 10 Desc'
                    },
                    {
                        Id: 11,
                        Name: 'Order 2 Item 11',
                        Description: 'Order 2 Item 11 Desc'
                    },
                    {
                        Id: 12,
                        Name: 'Order 2 Item 12',
                        Description: 'Order 2 Item 12 Desc'
                    },
                    {
                        Id: 13,
                        Name: 'Order 2 Item 13',
                        Description: 'Order 2 Item 13 Desc'
                    },
                    {
                        Id: 14,
                        Name: 'Order 2 Item 14',
                        Description: 'Order 2 Item 14 Desc'
                    },
                    {
                        Id: 15,
                        Name: 'Order 2 Item 15',
                        Description: 'Order 2 Item 15 Desc'
                    },
                    {
                        Id: 16,
                        Name: 'Order 2 Item 16',
                        Description: 'Order 2 Item 16 Desc'
                    },
                    {
                        Id: 17,
                        Name: 'Order 2 Item 17',
                        Description: 'Order 2 Item 17 Desc'
                    },
                    {
                        Id: 18,
                        Name: 'Order 2 Item 18',
                        Description: 'Order 2 Item 18 Desc'
                    },
                    {
                        Id: 19,
                        Name: 'Order 2 Item 19',
                        Description: 'Order 2 Item 19 Desc'
                    }


                ],
                orderrecipients: [
                    {
                        Id: 1,
                        Name: 'Order 2 Recip 1',
                        Description: 'Order 2 Recip 1 Desc'
                    }
                ]
            }
        ]
    };


    this.orderStore = new Ext.data.Store({
        autoLoad: false,
        model: 'Order',
        data: myData,
        proxy: {
            type: 'memory',
            reader: {
                type: 'json',
                root: 'orders'
            }
        }
    });

    this.orderItemsStore = new Ext.data.Store({
        model: 'OrderItem',
        proxy: {
            type: 'ajax',
            url: 'getdata.aspx?operation=loadQuote',
            reader: {
                type: 'json',
                root: 'orderitems'
            }
        },
        autoLoad: false
    });

    this.orderRecipientsStore = new Ext.data.Store({
        model: 'OrderRecipient',
        proxy: {
            type: 'ajax',
            url: 'getdata.aspx?operation=loadQuote',
            reader: {
                type: 'json',
                root: 'orderrecipients'
            }
        },
        autoLoad: false
    });

    var vp = Ext.create('Ext.container.Viewport', {
        layout: 'border',
        renderTo: Ext.getBody(),
        items: [{
            region: 'center',
            xtype: 'tabpanel',
            plain: true,
            activeTab: 0,
            items: [{
                layout: 'fit',
                title: 'Q 1',
                items: [{
                    xtype: 'tabpanel',
                    flex: 2,
                    border: false,
                    plain: true,
                    items: [{
                        xtype: 'panel',
                        layout: 'fit',
                        title: 'Customer Info',
                        html: 'customer info goes here'
                    }, {
                        title: 'Hardware',
                        layout: {
                            type: 'vbox',
                            align: 'stretch'
                        },
                        items: [{
                            xtype: 'grid',
                            id: 'ordersGrid',
                            title: 'Orders',
                            flex: 2,
                            store: this.orderStore,
                            listeners: {

                                select: {
                                    scope: this,
                                    fn: function (selModel, rec, index) {

                                        this.orderItemsStore.loadData(rec.orderitems().data.items, false);
                                        this.orderRecipientsStore.loadData(rec.orderrecipients().data.items, false);

                                    }
                                }

                            },
                            columns: [{
                                xtype: 'gridcolumn',
                                header: 'Id',
                                dataIndex: 'Id',
                                width: 100
                            }, {
                                xtype: 'gridcolumn',
                                header: 'Name',
                                dataIndex: 'Name',
                                width: 100
                            }, {
                                xtype: 'gridcolumn',
                                header: 'Description',
                                dataIndex: 'Description',
                                width: 100
                            }],
                            dockedItems: [{
                                dock: 'top',
                                xtype: 'toolbar',
                                items: [{
                                    text: 'Add'


                                }, {

                                    text: 'Remove'

                                }]
                            }]
                        }, {
                            xtype: 'tabpanel',
                            id: 'detailTabPanel',
                            border: false,
                            flex: 1,
                            items: [{
                                title: 'Items',
                                xtype: 'panel',
                                layout: 'fit',
                                items: [{
                                    xtype: 'grid',
                                    id: 'orderItemsGrid',
                                    store: this.orderItemsStore,
                                    autoScroll: true,
                                    columns: [{
                                        xtype: 'gridcolumn',
                                        header: 'Id',
                                        dataIndex: 'Id',
                                        width: 100
                                    }, {
                                        xtype: 'gridcolumn',
                                        header: 'Name',
                                        dataIndex: 'Name',
                                        width: 100
                                    }, {
                                        xtype: 'gridcolumn',
                                        header: 'Description',
                                        dataIndex: 'Description',
                                        width: 100
                                    }],
                                    dockedItems: [{
                                        dock: 'top',
                                        xtype: 'toolbar',
                                        items: [{

                                            text: 'Add'


                                        }, {

                                            text: 'Remove'

                                        }]
                                    }]
                                }]
                            }, {
                                title: 'Recips',
                                xtype: 'panel',
                                layout: 'fit',
                                items: [{
                                    xtype: 'grid',
                                    autoScroll: true,
                                    id: 'orderRecipsGrid',
                                    store: this.orderRecipientsStore,
                                    columns: [{
                                        xtype: 'gridcolumn',
                                        header: 'Id',
                                        dataIndex: 'Id',
                                        width: 100
                                    }, {
                                        xtype: 'gridcolumn',
                                        header: 'Name',
                                        dataIndex: 'Name',
                                        width: 100
                                    }, {
                                        xtype: 'gridcolumn',
                                        header: 'Description',
                                        dataIndex: 'Description',
                                        width: 100
                                    }],
                                    dockedItems: [{
                                        dock: 'top',
                                        xtype: 'toolbar',
                                        items: [{

                                            text: 'Add'


                                        }, {

                                            text: 'Remove'

                                        }]
                                    }]
                                }]
                            }]
                        }]
                    }, {

                        xtype: 'panel',
                        layout: 'fit',
                        title: 'Estimate',
                        html: 'Estimate info goes here'
                    }]
                }]
            }]
        }, {
            region: 'west',
            title: 'Nav Bar',
            collapsible: false,
            split: false,
            width: 150
        }]
    });

});
