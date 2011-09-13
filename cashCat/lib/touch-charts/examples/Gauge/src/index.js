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
            data: generateData(5, 20)
        });

        var onRefreshTap = function() {
            window.store1.loadData(generateData(5, 20));
        };

        new Ext.Panel({
            fullscreen: true,
            ui: 'light',
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            dockedItems: {
                dock: 'top',
                xtype: 'toolbar',
                ui: 'light',
                title: 'Gauge Chart',
                items: [{
                    xtype: 'spacer'
                }, {
                    xtype: 'button',
                    iconCls: 'shuffle',
                    iconMask: true,
                    ui: 'plain',
                    handler: onRefreshTap
                }]
            },
            defaults: {
                flex: 1,
                layout: {
                    type: 'hbox',
                    align: 'stretch'
                },
                defaults: {
                    xtype: 'chart',
                    flex: 1,
                    insetPadding: 25
                }
            },
            items: [{
                items: [{
                    animate: {
                        easing: 'elasticIn',
                        duration: 1000
                    },
                    store: store1,
                    axes: [{
                        type: 'gauge',
                        position: 'gauge',
                        minimum: 0,
                        maximum: 100,
                        steps: 10,
                        margin: 10
                    }],
                    series: [{
                        type: 'gauge',
                        field: 'data1',
                        donut: false,
                        colorSet: ['#F49D10', '#ddd']
                    }]
                }, {
                    animate: true,
                    store: store1,
                    axes: [{
                        type: 'gauge',
                        position: 'gauge',
                        minimum: 0,
                        maximum: 100,
                        steps: 10,
                        margin: 7
                    }],
                    series: [{
                        type: 'gauge',
                        field: 'data2',
                        donut: 30,
                        colorSet: ['#82B525', '#ddd']
                    }]
                }]
            },{
                flex: 1,
                items: [{
                    animate: true,
                    store: store1,
                    axes: [{
                        type: 'gauge',
                        position: 'gauge',
                        minimum: 0,
                        maximum: 100,
                        steps: 10,
                        margin: 7
                    }],
                    series: [{
                        type: 'gauge',
                        field: 'data3',
                        donut: 55,
                        colorSet: ['#2582B5', '#ddd']
                    }]
                }, {
                    animate: {
                        easing: 'bounceOut',
                        duration: 500
                    },
                    store: store1,
                    axes: [{
                        type: 'gauge',
                        position: 'gauge',
                        minimum: 0,
                        maximum: 100,
                        steps: 10,
                        margin: 7
                    }],
                    series: [{
                        type: 'gauge',
                        field: 'data4',
                        donut: 80,
                        colorSet: ['#3AA8CB', '#ddd']
                    }]
                }]
            }]
        });
    }
});
