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
            fields: ['name', '2008', '2009', '2010', 'data4', 'data5', 'data6', 'data7', 'data9', 'data9'],
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
		               title: 'Bar Chart'
		           }],
		           stopMaskTapEvent: false,
		           fullscreen: false,
				   html: "This example's uses many interactions.<br><ul>" +
							"<li>A horizontal swipe will change between a grouped and stacked bar chart.</li>" +
							"<li>Tapping two items will overlay an arrow and show a comparison in the Title area.</li>" +
							"<li>The chart can be zoomed vertically with a pinch gesture, and the panned by dragging.  For devices which do not support multi-touch, an extra toggle button is made available to switch between pan and zoom.  When zoomed in, arrow indicators will be overlayed on the chart to show that more data is available</li>" +
							"<li>Double-Tap will reset the chart back to the initial state</li>"
		       }).show('pop');
		}

        var chartPanel = new Ext.chart.Panel({
            title: 'Bar Chart',
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
                cls: 'bar1',
                theme: 'Demo',
                store: store1,
                animate: true,
                shadow: false,
                legend: {
                    position: {
                        portrait: 'right',
                        landscape: 'top'
                    },
                    labelFont: '17px Arial'
                },
                interactions: [{
                    type: 'reset'
                },
                {
                    type: 'togglestacked'
                },
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
                            panel.update('<ul><li><b>Month:</b> ' + item.value[0] + '</li><li><b>Value: </b> ' + item.value[1] + '</li></ul>');
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

                            chartPanel.descriptionPanel.setTitle(val1[0] + ' to ' + val2[0] + ' : ' + Math.round((val2[1] - val1[1]) / val1[1] * 100) + '%');
                            chartPanel.headerPanel.setActiveItem(1, {
                                type: 'slide',
                                direction: 'left'
                            });
                        },
                        'hide': function() {
                            chartPanel.headerPanel.setActiveItem(0, {
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
                    title: 'Number of Hits',
                    minimum: 0
                },
                {
                    type: 'Category',
                    position: 'left',
                    fields: ['name'],
                    title: 'Month of the Year'
                }],
                series: [{
                    type: 'bar',
                    xField: 'name',
                    yField: ['2008', '2009', '2010'],
                    axis: 'bottom',
                    highlight: true,
                    showInLegend: true
                }]
            }
        });
    }
});
