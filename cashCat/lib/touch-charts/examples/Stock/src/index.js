Ext.setup({
    tabletStartupScreen: 'tablet_startup.jpg',
    phoneStartupScreen: 'phone_startup.jpg',
    tabletIcon: 'icon-ipad.png',
    phoneIcon: 'icon-iphone.png',
    glossOnIcon: false,
    onReady: function() {
    
    function generateData(){
        var today = new Date(),
            before = today.add(Date.DAY, -200),
            data = [{
                date: before,
                num: 0,
                djia: 10000,
                sp500: 1100
            }],
            i, currentDate = before;

        for (i = 1; i < 200; i++) {
            data.push({
                date: (currentDate = currentDate.add(Date.DAY, 1)),
                num: i,
                sp500: data[i - 1].sp500 + ((Math.floor(Math.random() * 2) % 2) ? -1 : 1) * Math.floor(Math.random() * 7),
                djia: data[i - 1].djia + ((Math.floor(Math.random() * 2) % 2) ? -1 : 1) * Math.floor(Math.random() * 7)
            });
        }
        return data;
    }

    var store = new Ext.data.JsonStore({
        fields: ['date', 'num', 'sp500', 'djia'],
        data: generateData()
    });

    store.loadData(generateData());

    var onRefreshTap = function() {
        store.loadData(generateData());
    };

    new Ext.chart.Panel({
        id: 'chartCmp',
        title: 'Stock Example',
        fullscreen: true,
        dockedItems: {
            xtype: 'button',
            iconCls: 'shuffle',
            iconMask: true,
            ui: 'plain',
            handler: onRefreshTap,
            dock: 'left'
        },
        items: {
            cls: 'stock1',
            theme: 'Demo',
            legend: {
                position: {
                    portrait: 'right',
                    landscape: 'top'
                },
                labelFont: '17px Arial'
            },
            interactions: [{
                type: 'panzoom',
                axes: {
                    left: {
                        maxZoom: 2
                    },
                    bottom: {
                        maxZoom: 4
                    },
                    right: {
                        minZoom: 0.5,
                        maxZoom: 4,
                        allowPan: false
                    }
                }
            }],
            animate: false,
            store: store,
            axes: [{
                type: 'Numeric',
                position: 'left',
                fields: ['djia'],
                title: 'Dow Jones Average'
            }, {
                type: 'Numeric',
                position: 'right',
                fields: ['sp500'],
                title: 'S&P 500'
            }, {
                type: 'Time',
                position: 'bottom',
                fields: ['date'],
                dateFormat: ' M d ',
                label: {
                    rotate: {
                        degrees: 45
                    }
                }
            }],
            series: [{
                type: 'line',
                showMarkers: false,
                smooth: true,
                axis: 'left',
                xField: 'date',
                yField: 'djia'
            }, {
                type: 'line',
                showMarkers: false,
                fill: true,
                axis: 'right',
                xField: 'date',
                yField: 'sp500'
            }]
        }
    });
}});
