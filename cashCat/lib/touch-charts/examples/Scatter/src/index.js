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

            floor = (!floor && floor !== 0)? 20 : floor;

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
            data: generateData(12, 20)
        });

        var onRefreshTap = function() {
            window.store1.loadData(generateData(12, 5));
        };

        new Ext.chart.Panel({
            title: 'Scatter Chart',
            fullscreen: true,
            dockedItems: {
                xtype: 'button',
                iconCls: 'shuffle',
                iconMask: true,
                ui: 'plain',
                handler: onRefreshTap,
                dock: 'right'
            },
            items: {
                cls: 'scatter1',
                theme: 'Demo',
                animate: false,
                // shadow: true,
                store: store1,
                axes: [{
                    type: 'Numeric',
                    position: 'left',
                    fields: ['data1', 'data2', 'data3'],
                    title: 'Number of Hits'
                }, {
                    type: 'Category',
                    position: 'bottom',
                    fields: ['name'],
                    title: 'Month of the Year'
                }],
                series: [{
                    type: 'scatter',
                    markerConfig: {},
                    axis: 'left',
                    xField: 'name',
                    yField: 'data1'
                }, {
                    type: 'scatter',
                    markerConfig: {},
                    axis: 'left',
                    xField: 'name',
                    yField: 'data2'
                }, {
                    type: 'scatter',
                    markerConfig: {},
                    axis: 'left',
                    xField: 'name',
                    yField: 'data3'
                }]
            }
        });
    }
});
