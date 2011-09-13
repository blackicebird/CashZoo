var areaChart = new Ext.chart.Chart({
    title: 'Area',
    iconCls: 'area',
    cls: 'chartpanel',
    theme: 'Energy',
    interactions: ['reset', {
        type: 'panzoom',
        axes: {
            right: {}
        }
    },
    {
        type: 'iteminfo',
        gesture: 'tap',
        listeners: {
            show: function(interaction, item, panel) {
                EnergyApp.popup(item, panel);
            }
        }
    }],
    animate: false,
    store: EnergyApp.stores.ChartStore,
    axes: [{
        type: 'Numeric',
        position: 'right',
        minimum: 0,
        label: {
            renderer: EnergyApp.commify
        },
        adjustMinimumByMajorUnit: 0,
        fields: ['coal', 'nuclear', 'crude-oil', 'gas', 'renewable'],
        title: 'Million BTUs'
    },
    {
        type: 'Category',
        position: 'bottom',
        fields: ['year'],
        title: 'Year',
        label: {
            rotate: {
                degrees: 45
            }
        }
    }],
    legend: {
        position: Ext.is.Phone ? 'left' : 'top'
    },
    series: [{
        type: 'area',
        highlight: false,
        title: ['Coal', 'Nuclear', 'Oil', 'Natural Gas', 'Renewable'],
        axis: 'right',
        xField: 'year',
        yField: ['coal', 'nuclear', 'crude-oil', 'gas', 'renewable']
    }],
    listeners: {
        afterrender: function(me) {
            me.on('beforerefresh', function() {
                if (me.ownerCt.getActiveItem().id !== me.id) {
                    return false;
                }
            }, me);
        }
    }
});

var lineChart = new Ext.chart.Chart({
    title: 'Line',
    iconCls: 'line',
    cls: 'chartpanel',
    interactions: ['reset', {
        type: 'panzoom',
        axes: {
            right: {}
        }
    },{
        type: 'iteminfo',
        gesture: 'tap',
        listeners: {
            show: function(interaction, item, panel) {
                EnergyApp.popup(item, panel);
            }
        }
    }],
    animate: false,
    store: EnergyApp.stores.ChartStore,
    axes: [{
        type: 'Numeric',
        position: 'right',
        minimum: 0,
        label: {
            renderer: EnergyApp.commify
        },
        adjustMinimumByMajorUnit: 0,
        fields: ['coal', 'nuclear', 'crude-oil', 'gas', 'renewable'],
        title: 'Million BTUs',
        grid: {
            odd: {
                stroke: '#777'
            },
            even: {
                stroke: '#555'
            }
        }
    },
    {
        type: 'Category',
        position: 'bottom',
        fields: ['year'],
        title: 'Year',
        label: {
            rotate: {
                degrees: 45
            }
        }
    }],
    legend: {
        position: Ext.is.Phone ? 'left' : 'top'
    },
    theme: 'Energy',
    series: [{
        type: 'line',
        highlight: false,
        showMarkers: false,
        fill: true,
        smooth: true,
        axis: 'right',
        xField: 'year',
        yField: 'coal',
        title: ['Coal']
    }, {
        type: 'line',
        highlight: false,
        showMarkers: false,
        fill: true,
        smooth: true,
        axis: 'right',
        xField: 'year',
        yField: 'crude-oil',
        title: ['Oil']
    }, {
        type: 'line',
        highlight: false,
        showMarkers: false,
        fill: true,
        smooth: true,
        axis: 'right',
        xField: 'year',
        yField: 'gas',
        title: ['Natural Gas']
    }, {
        type: 'line',
        highlight: false,
        showMarkers: false,
        fill: true,
        smooth: true,
        axis: 'right',
        xField: 'year',
        yField: 'nuclear',
        title: ['Nuclear']
    }, {
        type: 'line',
        highlight: false,
        showMarkers: false,
        fill: true,
        smooth: true,
        axis: 'right',
        xField: 'year',
        yField: 'renewable',
        title: ['Renewable']
    }],
    listeners: {
        afterrender: function(me) {
            me.on('beforerefresh', function() {
                if (me.ownerCt.getActiveItem().id !== me.id) {
                    return false;
                }
            }, me);
        }
    }
});

var yearChart = new Ext.Panel({
    title: 'Yearly',
    iconCls: 'line',
    cls: 'chartpanel',
    layout: {
        type: 'hbox',
        align: 'stretch'
    },
    listeners: {
        activate: function() {
            var slider = Ext.getCmp('mySlider');
            slider.initValue();
            slider.setValue(2009);
        },
        single: true
    },
    dockedItems: [{
        dock: 'bottom',
        xtype: 'toolbar',
        height: 70,
        items: [{
            xtype: 'component',
            cls: 'yearlabel',
            html: '1960'
        }, {
            flex: 1,
            ui: 'light',
            id: 'mySlider',
            xtype: 'sliderfield',
            name: 'year',
            maxValue : 2009,
            minValue : 1960,
            value: 2009,
            listeners: {
                change: function(slider, thumb, value) {
                    if (value) {
                        Ext.getCmp('yearToolbar').setTitle('Data For ' + value);
                        EnergyApp.loadPieAtYear(value);
                    }
                }
            }
        }, {
            xtype: 'component',
            cls: 'yearlabel',
            html: '2009'
        }]
    },  {
        id: 'yearToolbar',
        dock: 'bottom',
        xtype: 'toolbar',
        title: 'Data For 1960'
    }],
    items: [{
        flex: 1,
        xtype: 'chart',
        theme: 'Energy',
        cls: 'radar',
        store: EnergyApp.stores.YearStore,
        shadow: false,
        animate: true,
        interactions: [{
            type: 'iteminfo',
            listeners: {
                show: function(interaction, item, panel) {
                    EnergyApp.popupYear(item, panel);
                }
            }
        }, 'rotate', 'reset'],
        axes: [{
            steps: 5,
            type: 'Radial',
            position: 'radial',
            label: {
                // display: 'none'
            }
        }],
        series: [{
            type: 'radar',
            xField: 'type',
            yField: 'data',
            style: {
                opacity: 0.4
            }
        }],
        listeners: {
            afterrender: function(me) {
                me.on('beforerefresh', function() {
                    if (me.ownerCt.ownerCt.ownerCt.getActiveItem().id !== me.ownerCt.ownerCt.id) {
                        return false;
                    }
                }, me);
            }
        }
    }, {
        flex: 1,
        xtype: 'chart',
        store: EnergyApp.stores.YearStore,
        shadow: false,
        animate: true,
        insetPadding: 30,
        interactions: [{
            type: 'rotate'
        }, {
            type: 'iteminfo',
            listeners: {
                show: function(interaction, item, panel) {
                    EnergyApp.popupYear(item, panel);
                }
            }
        }],
        series: [{
            type: 'pie',
            field: 'data',
	        interactions: ['rotate', 'reset'],
            highlight: false,
            label: {
                field: 'type',
                display: 'rotate',
                contrast: true,
                font: '12px Arial'
            },
            listeners: {
                'labelOverflow': function(label, item) {
                    item.useCallout = true;
                }
            },
            callouts: {
                renderer: function(callout, storeItem) {
                    callout.label.setAttributes({
                        text: storeItem.get('type')
                    }, true);
                },
                filter: function() {
                    return false;
                },
                lines: {
                    'stroke-width': 2,
                    offsetFromViz: 20
                },
                label: {
                    font: '12px Arial',
                    fill: '#fff'
                }
            }
        }],
        listeners: {
            afterrender: function(me) {
                me.on('beforerefresh', function() {
                    if (me.ownerCt.ownerCt.ownerCt.getActiveItem().id !== me.ownerCt.ownerCt.id) {
                        return false;
                    }
                }, me);
            }
        }
    }]
});

if (Ext.is.Phone) {
    EnergyApp.views.ChartView = new Ext.TabPanel({
        tabBar: {
            dock: 'top',
            layout: {
                pack: 'center'
            }
        },
        ui: 'light',
        cardSwitchAnimation: {
            type: 'slide'
        },
        items: [areaChart, lineChart]
    });
}
else {
    EnergyApp.views.ChartView = new Ext.TabPanel({
        tabBar: {
            dock: 'top',
            layout: {
                pack: 'center'
            }
        },
        ui: 'light',
        cardSwitchAnimation: {
            type: 'slide'
        },
        items: [areaChart, lineChart, yearChart]
    });
}
