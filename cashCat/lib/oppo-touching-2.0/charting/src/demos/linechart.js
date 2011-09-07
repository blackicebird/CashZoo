demos.LineChartClass = Ext.extend(Ext.Panel, {
    title: "Bar Charting",
    ui: 'dark',
    
    /**
     * Lazy creation
     * When the parent is added into UI display list at the first time, we add the charting
     */
    doComponentLayout : function(width, height, isSetSize) {
        this.display(width, height);
        demos.LineChartClass.superclass.doComponentLayout.apply(this, arguments);
    },
    
    display:function(width, height) {
        if(this.chart != null && this.chart.width == width && this.chart.height == height) {
            return;
        }
        this.chart = new Ext.chart.Chart({
            shadow: true,
            theme: 'Category1',
            legend: {
                position: 'right'
            },
            axes: [{
                type: 'Numeric',
                minimum: 0,
                position: 'left',
                fields: ['data1', 'data2', 'data3'],
                title: 'Number of Hits',
                grid: {
                    odd: {
                        opacity: 1,
                        fill: '#ddd',
                        stroke: '#bbb',
                        'stroke-width': 0.5
                    }
                }
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
                axis: 'left',
                xField: 'name',
                yField: 'data1',
                markerCfg: {
                    type: 'cross',
                    size: 4,
                    radius: 4,
                    'stroke-width': 0
                }
            }, {
                type: 'line',
                highlight: {
                    size: 7,
                    radius: 7
                },
                axis: 'left',
                smooth: true,
                xField: 'name',
                yField: 'data2',
                markerCfg: {
                    type: 'circle',
                    size: 4,
                    radius: 4,
                    'stroke-width': 0
                }
            }, {
                type: 'line',
                highlight: {
                    size: 7,
                    radius: 7
                },
                axis: 'left',
                smooth: true,
                fill: true,
                xField: 'name',
                yField: 'data3',
                markerCfg: {
                    type: 'circle',
                    size: 4,
                    radius: 4,
                    'stroke-width': 0
                }
            }]

        });
        this.chart.setSize(width, height);
        this.add(this.chart);
        this.chart.bindStore(window.store1, true);
    }
});

demos.LineChart = new demos.LineChartClass();