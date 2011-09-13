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
                    2007: Math.floor(Math.max((Math.random() * 100), floor)),
                    2008: Math.floor(Math.max((Math.random() * 100), floor)),
                    2009: Math.floor(Math.max((Math.random() * 100), floor)),
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
            fields: ['name', '2007', '2008', '2009', 'data4', 'data5', 'data6', 'data7', 'data9', 'data9'],
            data: generateData(12, 20)
        });

        var onRefreshTap = function() {
            window.store1.loadData(generateData(12, 20));
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
		               title: 'Radar Chart'
		           }],
		           stopMaskTapEvent: false,
		           fullscreen: false,
				   html: "This example's uses two interactions.<br><ul>" +
							"<li>Dragging the Radar Chart will rotate it.</li>" +
							"<li>Double-Tap will reset the chart back to the initial state (no confirmation)</li>"
		       }).show('pop');
		};

        new Ext.chart.Panel({
            title: 'Radar Chart',
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
                cls: 'radar1',
                theme: 'Demo',
                insetPadding: 30,
                shadow: true,
                animate: true,
                store: store1,
                interactions: ['rotate', 'reset'],
	            legend: {
	                position: {
	                    portrait: 'bottom',
	                    landscape: 'right'
	                },
	                labelFont: '17px Helvetica, Arial, sans-serif' // To be moved to SCSS
	            },
                axes: [{
                    type: 'Radial',
                    position: 'radial',
                    label: {
                        display: true
                    }
                }],
                series: [{
                    showInLegend: true,
                    type: 'radar',
                    xField: 'name',
                    yField: '2007'
                },{
                    showInLegend: true,
                    type: 'radar',
                    xField: 'name',
                    yField: '2008'
                },{
                    showInLegend: true,
                    type: 'radar',
                    xField: 'name',
                    yField: '2009'
                }]
            }
        });
    }
});
