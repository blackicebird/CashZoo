demos.AreaChartClass = Ext.extend(Ext.Panel, {
    title: "Area Charting",
    ui: 'dark',
    
    /**
     * Lazy creation
     * When the parent is added into UI display list at the first time, we add the charting
     */
    doComponentLayout : function(width, height, isSetSize) {
        this.display(width, height);
        demos.AreaChartClass.superclass.doComponentLayout.apply(this, arguments);
    },
    
    display:function(width, height) {
        if(this.chart != null && this.chart.width == width && this.chart.height == height) {
            return;
        }
        this.chart = new Ext.chart.Chart({
            animate: true,
            legend: {
                position: 'bottom'
            },
            axes: [{
                type: 'Numeric',
                grid: true,
                position: 'left',
                fields: ['data1', 'data2', 'data3', 'data4', 'data5', 'data6', 'data7'],
                title: 'Number of Hits',
                grid: {
                    odd: {
                        opacity: 1,
                        fill: '#ddd',
                        stroke: '#bbb',
                        'stroke-width': 1
                    }
                },
                minimum: 0,
                adjustMinimumByMajorUnit: 0
            }, {
                type: 'Category',
                position: 'bottom',
                fields: ['name'],
                title: 'Month of the Year',
                grid: true,
                label: {
                    rotate: {
                        degrees: 315
                    }
                }
            }],
            series: [{
                type: 'area',
                highlight: true,
                axis: 'left',
                xField: 'name',
                yField: ['data1', 'data2', 'data3', 'data4', 'data5', 'data6', 'data7'],
                style: {
                    opacity: 0.93
                }
            }]
        });
        this.chart.setSize(width, height);
        this.add(this.chart);
        this.chart.bindStore(window.store1, true);
    }
});

demos.AreaChart = new demos.AreaChartClass();