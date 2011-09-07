demos.AreaRadarChartClass = Ext.extend(Ext.Panel, {
    title: "Bar Charting",
    ui: 'dark',
    
    /**
     * Lazy creation
     * When the parent is added into UI display list at the first time, we add the charting
     */
    doComponentLayout : function(width, height, isSetSize) {
        this.display(width, height);
        demos.AreaRadarChartClass.superclass.doComponentLayout.apply(this, arguments);
    },
    
    display:function(width, height) {
        if(this.chart != null && this.chart.width == width && this.chart.height == height) {
            return;
        }
        this.chart = new Ext.chart.Chart({
            theme: 'Category2',
            insetPadding: 20,
            animate: true,
            legend: {
                position: 'right'
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
                yField: 'data1',
                style: {
                    opacity: 0.4
                }
            },{
                showInLegend: true,
                type: 'radar',
                xField: 'name',
                yField: 'data2',
                style: {
                    opacity: 0.4
                }
            },{
                showInLegend: true,
                type: 'radar',
                xField: 'name',
                yField: 'data3',
                style: {
                    opacity: 0.4
                }
            }]


        });
        this.chart.setSize(width, height);
        this.add(this.chart);
        this.chart.bindStore(window.store1, true);
    }
});

demos.AreaRadarChart = new demos.AreaRadarChartClass();