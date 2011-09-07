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
}
window.store1 = new Ext.data.JsonStore({
    fields: ['name', 'data1', 'data2', 'data3', 'data4', 'data5', 'data6', 'data7', 'data9', 'data9'],
    data: generateData()
});

cashCat.views.TopExpensePiePanel = Ext.extend(Ext.Panel, {
    layout: {
        type: 'vbox',
        align: 'stretch',
        pack: 'center'
    },
    doComponentLayout: function(width, height, isSetSize) {
        this.display(width, height - 50);
        cashCat.views.TopExpensePiePanel.superclass.doComponentLayout.apply(this, arguments);
    },
    display: function(width, height) {
        if (this.chart != null) {
            return;
        }
        this.chart = new Ext.chart.Chart({
            animate: false,
            //store: store1,
            shadow: true,
            legend: {
                position: 'right'
            },
            insetPadding: 10,
            theme: 'Base:gradients',
            series: [
                {
                    type: 'pie',
                    field: 'data1',
                    showInLegend: true,
                    //donut: donut,
                    tips: {
                        trackMouse: true,
//                        width: 140,
//                        height: 28,
                        renderer: function(storeItem, item) {
                            //calculate percentage.
                            var total = 0;
                            store1.each(function(rec) {
                                total += rec.get('data1');
                            });
                            this.setTitle(storeItem.get('name') + ': ' + Math.round(storeItem.get('data1') / total * 100) + '%');
                        }
                    },
                    highlight: {
                        segment: {
                            margin: 1
                        }
                    },
                    label: {
                        field: 'name',
                        display: 'rotate',
                        contrast: true,
                        font: '12px Arial'
                    }
                }
            ]

        });
        this.chart.setSize(width, height);
        this.add({
            cls: 'txtCenter',
            html: msg.prop('topFiveExpenses')
        });
        this.add(this.chart);
        this.chart.bindStore(window.store1, true);
    }

});
Ext.reg('topExpensePiePanel', cashCat.views.TopExpensePiePanel);

cashCat.views.Home = Ext.extend(Ext.Panel, {
    fullscreen: true,
    cls: 'home-panel',
    layout: {
        type: 'vbox',
        align: 'stretch',
        pack: 'center'
    },
    initComponent: function() {
        Ext.apply(this, {
            dockedItems:[
                {
                    dock: 'top',
                    xtype: 'toolbar',
                    title: msg.prop('cashCat'),
                    items:[
                        {
                            text: msg.prop('close'),
                            ui: 'back'
                        },
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
                {
                    flex: 4,
                    xtype: 'topExpensePiePanel'
                },
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
                            xtype: 'button',
                            ui: 'round'
                        },
                        {
                            text: msg.prop('transfer'),
                            xtype: 'button',
                            ui: 'round'
                        },
                        {
                            text: msg.prop('expense'),
                            xtype: 'button',
                            ui: 'round'
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
                                    xtype: 'numberfield',
                                    name: 'incomeAccount',
                                    label: msg.prop('income'),
                                    value: 11000,
                                    disabled: true
                                },
                                {
                                    xtype: 'numberfield',
                                    name: 'expenseAccount',
                                    label: msg.prop('expense'),
                                    value: 3000,
                                    disabled: true
                                },
                                {
                                    xtype: 'numberfield',
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