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

        var colors = ['url(#v-1)', 'url(#v-2)', 'url(#v-3)', 'url(#v-4)', 'url(#v-5)'];

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
		               title: 'Column Chart'
		           }],
		           stopMaskTapEvent: false,
		           fullscreen: false,
				   html: "This example's uses custom styling to make each data point use a different gradient color.<br>" +
							"The chart can be zoomed horizontally with a pinch gesture, and the panned by dragging.  For devices which do not support multi-touch, an extra toggle button is made available to switch between pan and zoom.  When zoomed in, arrow indicators will be overlayed on the chart to show that more data is available"
		       }).show('pop');
		}
        new Ext.chart.Panel({
            fullscreen: true,
            title: 'Column Chart',
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
                cls: 'column1',
                animate: {
                    easing: 'bounceOut',
                    duration: 750
                },
                store: store1,
                shadow: false,
                gradients: [{
                    'id': 'v-1',
                    'angle': 0,
                    stops: {
                        0: {
                            color: 'rgb(212, 40, 40)'
                        },
                        100: {
                            color: 'rgb(117, 14, 14)'
                        }
                    }
                },
                {
                    'id': 'v-2',
                    'angle': 0,
                    stops: {
                        0: {
                            color: 'rgb(180, 216, 42)'
                        },
                        100: {
                            color: 'rgb(94, 114, 13)'
                        }
                    }
                },
                {
                    'id': 'v-3',
                    'angle': 0,
                    stops: {
                        0: {
                            color: 'rgb(43, 221, 115)'
                        },
                        100: {
                            color: 'rgb(14, 117, 56)'
                        }
                    }
                },
                {
                    'id': 'v-4',
                    'angle': 0,
                    stops: {
                        0: {
                            color: 'rgb(45, 117, 226)'
                        },
                        100: {
                            color: 'rgb(14, 56, 117)'
                        }
                    }
                },
                {
                    'id': 'v-5',
                    'angle': 0,
                    stops: {
                        0: {
                            color: 'rgb(187, 45, 222)'
                        },
                        100: {
                            color: 'rgb(85, 10, 103)'
                        }
                    }
                }],
                axes: [{
                    type: 'Numeric',
                    position: 'left',
                    fields: ['data1'],
                    minimum: 0,
                    maximum: 100,
                    label: {
                        renderer: function(v) {
                            return v.toFixed(0);
                        }
                    },
                    title: 'Number of Hits'
                },
                {
                    type: 'Category',
                    position: 'bottom',
                    fields: ['name'],
                    title: 'Month of the Year'
                }],
                series: [{
                    type: 'column',
                    axis: 'left',
                    highlight: true,
                    renderer: function(sprite, storeItem, barAttr, i, store) {
                        barAttr.fill = colors[i % colors.length];
                        return barAttr;
                    },
                    label: {
                      field: 'data1'
                    },
                    xField: 'name',
                    yField: 'data1'
                }],
                interactions: [{
                    type: 'panzoom',
                    axes: ['bottom']
                }]
            }
        });

    }
});
