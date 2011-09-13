var monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
];
window.generateData = function(n, floor) {
    var data = [],
        p = (Math.random() * 11) + 1,
        i;

    floor = (!floor && floor !== 0) ? 20 : floor;

    for (i = 0; i < (n || 5); i++) {
        data.push({
            name: monthNames[i % 12],
            data1: Math.floor(Math.max((Math.random() * 100), floor)),
            data2: Math.floor(Math.max((Math.random() * 100), floor)),
            data3: Math.floor(Math.max((Math.random() * 100), floor)),
            data4: Math.floor(Math.max((Math.random() * 100), floor)),
            data5: Math.floor(Math.max((Math.random() * 100), floor)),
            data6: Math.floor(Math.max((Math.random() * 100), floor)),
            data7: Math.floor(Math.max((Math.random() * 100), floor)),
            data8: Math.floor(Math.max((Math.random() * 100), floor)),
            data9: Math.floor(Math.max((Math.random() * 100), floor))
        });
    }
    return data;
};
window.store1 = new Ext.data.JsonStore({
    fields: ['name', 'data1', 'data2', 'data3', 'data4', 'data5', 'data6', 'data7', 'data9', 'data9'],
    data: generateData()
});
cashCat.views.topExpensePanel = new Ext.Panel({
    flex: 4,
    title: 'Pie Chart',
    layout: 'fit',
    iconCls: 'pie',
    items: [
        new Ext.chart.Chart({
            cls: 'piecombo1',
            theme: 'Demo',
            store: store1,
            animate: true,
            legend: {
                position: {
                    portrait: 'right',
                    landscape: 'left'
                }
            },
            interactions: ['rotate', 'reset'],
            series: [
                {
                    type: 'pie',
                    field: 'data1',
                    donut: 0,
                    showInLegend: true,
                    highlightDuration: 500,
                    highlight: {
                        segment: {
                            margin: 20
                        }
                    },
                    label: {
                        field: 'name'
                    },
                    listeners: {
                        'labelOverflow': function(label, item) {
                            item.useCallout = true;
                        }
                    },
                    callouts: {
                        renderer: function(callout, storeItem) {
                            callout.label.setAttributes({
                                text: storeItem.get('name')
                            }, true);
                        },
                        filter: function() {
                            return false;
                        },
                        box: {
                            //no config here.
                        },
                        lines: {
                            'stroke-width': 2,
                            offsetFromViz: 20
                        },
                        label: {
                            font: 'italic 14px Arial'
                        },
                        styles: {
                            font: '14px Arial'
                        }
                    }
                }
            ]
        })
    ]
});

cashCat.views.Home = Ext.extend(Ext.Panel, {
    id: 'homeView',
    fullscreen: true,
    cls: 'home-panel',
    layout: {
        type: 'vbox',
        align: 'stretch',
        pack: 'center'
    },
    constructor: function(config) {
        this.topExpenseData = config.topExpenseData;
        this.monthData = config.monthData;
        this.accountData = config.accountData;

        cashCat.views.Home.superclass.constructor.call(this, config);
    },
    initComponent: function() {
        Ext.apply(this, {
            dockedItems:[
                {
                    dock: 'top',
                    xtype: 'toolbar',
                    title: msg.prop('cashCat'),
                    items:[
                        /*{
                         text: msg.prop('close'),
                         ui: 'back'
                         },*/
                        {
                            xtype: 'spacer'
                        },
                        {
                            text: msg.prop('settings'),
                            ui: 'action'
                        }
                    ]
                }
            ],
            items:[
                cashCat.views.topExpensePanel,
//                {
//                    flex: 4,
//                    xtype: 'topExpensePiePanel'
//                },
                {
                    flex: 1,
                    xtype: 'panel',
                    layout: {
                        type: 'hbox',
                        align: 'stretch',
                        pack: 'center'
                    },
                    defaults: {
                        xtype: 'button',
                        cls: 'homebtn',
                        flex: 1,
                        centered: true
                    },
                    items:[
                        {
                            text: msg.prop('income'),
                            xtype: 'button'
                        },
                        {
                            text: msg.prop('transfer'),
                            xtype: 'button'
                        },
                        {
                            text: msg.prop('expense'),
                            xtype: 'button'
                        }
                    ]
                },
                {
                    flex: 3,
                    xtype: 'formpanel',
                    bodyPadding: '1px 10px',
                    items: [
                        {
                            xtype: 'fieldset',
                            title: msg.prop('monthStatistic'),
                            items:[
                                {
                                    xtype: 'textfield',
                                    name: 'incomeAccount',
                                    label: msg.prop('income'),
                                    value: 11000,
                                    disabled: true
                                },
                                {
                                    xtype: 'textfield',
                                    name: 'expenseAccount',
                                    label: msg.prop('expense'),
                                    value: 3000,
                                    disabled: true
                                },
                                {
                                    xtype: 'textfield',
                                    name: 'profit',
                                    label: msg.prop('profit'),
                                    value: 8000,
                                    disabled: true
                                }
                            ]
                        },
                        {
                            xtype: 'fieldset',
                            title: msg.prop('accountStatistic'),
                            items:[
                                {
                                    xtype: 'textfield',
                                    name: 'equity',
                                    label: msg.prop('equity')
                                },
                                {
                                    xtype: 'textfield',
                                    name: 'liability',
                                    label: msg.prop('liability')
                                },
                                {
                                    xtype: 'textfield',
                                    name: 'asset',
                                    label: msg.prop('asset')
                                }
                            ]
                        }
                    ]
                }
            ]
        });
        cashCat.views.Home.superclass.initComponent.apply(this, arguments);
    }
});

Ext.reg('cashCatHome', cashCat.views.Home);