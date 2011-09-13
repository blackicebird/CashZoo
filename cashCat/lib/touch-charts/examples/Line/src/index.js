Ext.setup({
    tabletStartupScreen: 'tablet_startup.jpg',
    phoneStartupScreen: 'phone_startup.jpg',
    tabletIcon: 'icon-ipad.png',
    phoneIcon: 'icon-iphone.png',
    glossOnIcon: false,
    onReady: function() {
        window.generateData = function(n, floor) {
            var data = [],
                p = (Math.random() *  11) + 1,
                i;

            floor = 10;

            for (i = 0; i < (n || 12); i++) {
                data.push({
                    name: Date.monthNames[i % 12],
                    iphone: Math.floor(Math.max((Math.random() * 100), floor)),
                    android: Math.floor(Math.max((Math.random() * 100), floor)),
                    ipad: Math.floor(Math.max((Math.random() * 100), floor))
                });
            }
            return data;
        };
        window.store1 = new Ext.data.JsonStore({
            fields: ['name', 'iphone', 'android', 'ipad'],
            data: generateData(5, 20)
        });

        var onRefreshTap = function() {
            window.store1.loadData(generateData(5, 20));
        };
        var onHelpTap = function() {
            new Ext.Panel({
                floating: true,
                modal: true,
                centered: true,
                width: 300,
                height: 250,
                styleHtmlContent: true,
                scroll: 'vertical',
                dockedItems: [{
                    dock: 'top',
                    xtype: 'toolbar',
                    title: 'Line Chart'
                }],
                stopMaskTapEvent: false,
                fullscreen: false,
                html: "Tapping a data point will bring up detailed information about it"
            }).show('pop');
        };
        new Ext.chart.Panel({
            title: 'Line Chart',
            fullscreen: true,
            dockedItems: [{
                xtype: 'button',
                iconCls: 'help',
                iconMask: true,
                ui: 'plain',
                handler: onHelpTap
            }, {
                xtype: 'button',
                iconCls: 'shuffle',
                iconMask: true,
                ui: 'plain',
                handler: onRefreshTap
            }],
            items: {
                cls: 'line1',
                theme: 'Demo',
                store: store1,
                animate: true,
                shadow: true,
                legend: {
                    position: 'right'
                },
               interactions: [{
                type: 'panzoom',
                    axes: {
                        left: {}
                    }
                }, {
                   type: 'iteminfo',
                   listeners: {
                       show: function(interaction, item, panel) {
                           var storeItem = item.storeItem;
                           panel.update(['<ul><li><b>Month: </b>' + storeItem.get('name') + '</li>', '<li><b>Value: </b> ' + item.value[1]+ '</li></ul>'].join(''));
                       }
                   }
               }],
                axes: [{
                    type: 'Numeric',
                    minimum: 0,
                    maximum: 100,
                    position: 'left',
                    fields: ['iphone', 'android', 'ipad'],
                    title: 'Number of Hits',
                    minorTickSteps: 1
                }, {
                    type: 'Category',
                    position: 'bottom',
                    fields: ['name'],
                    title: 'Month of the Year'
                }],
                series: [{
                    type: 'line',
                    highlight: {
                        size: 7,
                        radius: 7
                    },
                    fill: true,
                    smooth: true,
                    axis: 'left',
                    xField: 'name',
                    yField: 'iphone',
                    title: 'iPhone'
                }, {
                    type: 'line',
                    highlight: {
                        size: 7,
                        radius: 7
                    },
                    axis: 'left',
                    smooth: true,
                    xField: 'name',
                    yField: 'android',
                    title: 'Android'
                }, {
                    type: 'line',
                    highlight: {
                        size: 7,
                        radius: 7
                    },
                    axis: 'left',
                    smooth: true,
                    xField: 'name',
                    yField: 'ipad',
                    title: 'iPad'
                }]
            }
        });
    }
});
