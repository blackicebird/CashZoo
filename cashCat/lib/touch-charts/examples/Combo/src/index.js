Ext.setup({
    tabletStartupScreen: 'tablet_startup.jpg',
    phoneStartupScreen: 'phone_startup.jpg',
    tabletIcon: 'icon-ipad.png',
    phoneIcon: 'icon-iphone.png',
    glossOnIcon: false,
    onReady: function() {
        window.generateData = function(n, floor) {
            var data = [],
                p = (Math.random() * 11) + 1,
                i;

            floor = (!floor && floor !== 0) ? 20 : floor;

            for (i = 0; i < (n || 12); i++) {
                data.push({
                    name: Date.monthNames[i % 12],
                    2008: Math.floor(Math.max((Math.random() * 100), floor)),
                    2009: Math.floor(Math.max((Math.random() * 100), floor)),
                    2010: Math.floor(Math.max((Math.random() * 100), floor)),
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
            fields: ['name', '2008', '2009', '2010'],
            data: generateData(6, 0)
        });
        window.store2 = new Ext.data.JsonStore({
            fields: ['name', '2008', '2009', '2010', 'data4', 'data5', 'data6', 'data7', 'data8', 'data9'],
            data: generateData(6, 20)
        });
        window.store3 = new Ext.data.JsonStore({
            fields: ['name', '2008', '2009', '2010'],
            data: generateData(12, 20)
        });

        var onRefreshTap1 = function() {
            window.store1.loadData(generateData(6, 0));
        };
        var onRefreshTap2 = function() {
            window.store2.loadData(generateData(6, 20));
        };
        var onRefreshTap3 = function() {
            window.store3.loadData(generateData(12, 20));
        };

        var barChart = new Ext.chart.Panel({
            title: 'Bar Chart',
            layout: 'fit',
            iconCls: 'bar',
            dockedItems: {
                iconCls: 'shuffle',
                iconMask: true,
                ui: 'plain',
                handler: onRefreshTap1
            },
            items: [{
                xtype: 'chart',
                cls: 'barcombo1',
                theme: 'Demo',
                store: store1,
                animate: true,
                shadow: false,
                legend: {
                    position: {
                        portrait: 'right',
                        landscape: 'top'
                    }
                },
                interactions: [
                'reset',
                'togglestacked',
                {
                    type: 'panzoom',
                    axes: {
                        left: {}
                    }
                },
                {
                    type: 'iteminfo',
                    gesture: 'taphold',
                    panel: {
                        dockedItems: [{
                            dock: 'top',
                            xtype: 'toolbar',
                            title: 'Details'
                        }],

                        html: 'Testing'
                    },
                    listeners: {
                        'show': function(me, item, panel) {
                            var storeItem = item.storeItem;
                            panel.update('<ul><li><b>Month:</b> ' + storeItem.get('name') + '</li><li><b>Value: </b> ' + storeItem.get('2008') + '</li></ul>');
                        }
                    }
                },
                {
                    type: 'itemcompare',
                    offset: {
                        x: -10
                    },
                    listeners: {
                        'show': function(interaction) {
                            var val1 = interaction.item1.value,
                                val2 = interaction.item2.value;

                            barChart.descriptionPanel.setTitle(val1[0] + ' to ' + val2[0] + ' : ' + Math.round((val2[1] - val1[1]) / val1[1] * 100) + '%');
                            barChart.headerPanel.setActiveItem(1, {
                                type: 'slide',
                                direction: 'left'
                            });
                        },
                        'hide': function() {
                            barChart.headerPanel.setActiveItem(0, {
                                type: 'slide',
                                direction: 'right'
                            });
                        }
                    }
                }],
                axes: [{
                    type: 'Numeric',
                    position: 'bottom',
                    fields: ['2008', '2009', '2010'],
                    label: {
                        renderer: function(v) {
                            return v.toFixed(0);
                        }
                    },
                    title: 'Hits (thousands)',
                    minimum: 0
                },
                {
                    type: 'Category',
                    position: 'left',
                    fields: ['name'],
                    title: 'Month'
                }],
                series: [{
                    type: 'bar',
                    xField: 'name',
                    yField: ['2008', '2009', '2010'],
                    axis: 'bottom',
                    highlight: true,
                    showInLegend: true
                }]
            }]
        });

        var pieChart = new Ext.Panel({
            title: 'Pie Chart',
            layout: 'fit',
            iconCls: 'pie',
            dockedItems: {
                dock: 'top',
                xtype: 'toolbar',
                title: 'My Pie Chart',
                items: [{
                    xtype: 'spacer'
                }, {
                    xtype: 'button',
                    iconCls: 'shuffle',
                    iconMask: true,
                    ui: 'plain',
                    handler: onRefreshTap2
                }]
            },
            items: [
                new Ext.chart.Chart({
                    cls: 'piecombo1',
                    theme: 'Demo',
                    store: store2,
                    animate: true,
                    legend: {
                        position: {
                            portrait: 'bottom',
                            landscape: 'left'
                        }
                    },
                    interactions: ['rotate', 'reset'],
                    series: [{
                        type: 'pie',
                        field: '2008',
                        donut: 25,
                        showInLegend: true,
                        highlightDuration: 500,
                        highlight: {
                          segment: {
                            margin: 20
                          }
                        },
                        label: {
                            field: 'name'
                        }
                    }]
                })
            ]
        });

        var radarChart = new Ext.Panel({
            title: 'Radar Chart',
            layout: 'fit',
            iconCls: 'radar',
            dockedItems: {
                dock: 'top',
                xtype: 'toolbar',
                title: 'My Radar Chart',
                items: [{
                    xtype: 'spacer'
                }, {
                    xtype: 'button',
                    iconCls: 'shuffle',
                    iconMask: true,
                    ui: 'plain',
                    handler: onRefreshTap3
                }]
            },
            items: [
                new Ext.chart.Chart({
                    cls: 'radarcombo1',
                    theme: 'Demo',
                    insetPadding: Ext.is.Phone ? 20 : 40,
                    animate: false,
                    store: store3,
                    interactions: ['rotate', 'reset'],
                    axes: [{
                        type: 'Radial',
                        steps: 5,
                        position: 'radial',
                        label: {
                            display: true
                        }
                    }],
                    series: [{
                        type: 'radar',
                        xField: 'name',
                        yField: '2009'
                    },	{
                        type: 'radar',
                        xField: 'name',
                        yField: '2010'
                    }]
                })
            ]
        });

        var tabpanel = new Ext.TabPanel({
            tabBar: {
                dock: 'bottom',
                layout: {
                    pack: 'center'
                }
            },
            fullscreen: true,
            cardSwitchAnimation: {
                type: 'slide'
            },
            items: [barChart, pieChart, radarChart]
        });
    }
});
