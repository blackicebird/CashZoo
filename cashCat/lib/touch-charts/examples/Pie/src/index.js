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
                    2007: Math.floor(Math.max((Math.random() * 100), floor))
                });
            }
            return data;
        };
        window.store1 = new Ext.data.JsonStore({
            fields: ['name', '2007'],
            data: generateData(6, 2)
        });

        var onRefreshTap = function() {
            window.store1.loadData(generateData(6, 2));
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
		               title: 'Pie Chart'
		           }],
		           stopMaskTapEvent: false,
		           fullscreen: false,
				   html: "This example's uses many interactions.<br><ul>" +
							"<li>Dragging the Pie Chart will rotate it.</li>" +
							"<li>Tapping any slice will bring up an overlay which can then be sized to group and total slices together.</li>" +
							"<li>Tap and hold will bring up additional information about a slice</li>" +
							"<li>Double-Tap will reset the chart back to the initial state (after confirmation)</li>"
		       }).show('pop');
		}

        var chartPanel = new Ext.chart.Panel({
            title: 'Pie Chart',
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
                cls: 'pie1',
                theme: 'Demo',
                store: store1,
                shadow: false,
                animate: true,
                insetPadding: 20,
                legend: {
                    position: {
                        portrait: 'bottom',
                        landscape: 'left'
                    }
                },
                interactions: [{
                    type: 'reset',
                    confirm: true
                },
                {
                    type: 'rotate'
                },
                {
                    type: 'iteminfo',
                    gesture: 'taphold',
                    listeners: {
                        show: function(interaction, item, panel) {
                            var storeItem = item.storeItem;
                            panel.update(['<ul><li><b>Month: </b>' + storeItem.get('name') + '</li>', '<li><b>Value: </b> ' + storeItem.get('2007') + '</li></ul>'].join(''));
                        }
                    }
                },
                {
                    type: 'piegrouping',
                    //snapWhileDragging: true,
                    onSelectionChange: function(me, items) {
                        if (items.length) {
                            var sum = 0,
                                i = items.length;
                            while(i--) {
                                sum += items[i].storeItem.get('2007');
                            }
                            chartPanel.descriptionPanel.setTitle('Total: ' + sum);
                            chartPanel.headerPanel.setActiveItem(1, {
                                type: 'slide',
                                direction: 'left'
                            });
                        }
                        else {
                            chartPanel.headerPanel.setActiveItem(0, {
                                type: 'slide',
                                direction: 'right'
                            });
                        }
                    }
                }],
                series: [{
                    type: 'pie',
                    field: '2007',
                    showInLegend: true,
                    highlight: false,
                    listeners: {
                        'labelOverflow': function(label, item) {
                            item.useCallout = true;
                        }
                    },
                    // Example to return as soon as styling arrives for callouts
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
                    },
                    label: {
                        field: 'name'
                    }
                }]
            }
        });

    }
});
