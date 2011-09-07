demos.MixedChartClass = Ext.extend(Ext.Panel, {
    title: "Mixed Chart",
    ui: 'dark',
    
    /**
     * Lazy creation
     * When the parent is added into UI display list at the first time, we add the charting
     */
    doComponentLayout : function(width, height, isSetSize) {
        this.display(width, height);
        demos.MixedChartClass.superclass.doComponentLayout.apply(this, arguments);
    },
    
    display:function(width, height) {
        if(this.chart != null && this.chart.width == width && this.chart.height == height) {
            return;
        }
        this.chart = new Ext.chart.Chart({
            animate: true,
            theme: 'Category1',
            axes: [{
                type: 'Numeric',
                position: 'left',
                fields: ['data1', 'data2', 'data3'],
                title: 'Number of Hits',
                grid: true
            }, {
                type: 'Category',
                position: 'bottom',
                fields: ['name'],
                title: 'Month of the Year'
            }],
            series: [{
                type: 'column',
                axis: 'left',
                xField: 'name',
                yField: 'data1',
                markerCfg: {
                    type: 'cross',
                    size: 3
                }
            }, {
                type: 'scatter',
                axis: 'left',
                xField: 'name',
                yField: 'data2',
                markerCfg: {
                    type: 'circle',
                    size: 5
                }
            }, {
                type: 'line',
                axis: 'left',
                smooth: true,
                fill: true,
                fillOpacity: 0.5,
                xField: 'name',
                yField: 'data3'
            }]


        });
        this.chart.setSize(width, height);
        this.add(this.chart);
        this.chart.bindStore(window.store1, true);
    }
});

demos.MixedChart = new demos.MixedChartClass();