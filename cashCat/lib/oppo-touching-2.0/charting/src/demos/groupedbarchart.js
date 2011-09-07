demos.GroupedBarChartClass = Ext.extend(Ext.Panel, {
    title: "Bar Charting",
    ui: 'dark',
    
    /**
     * Lazy creation
     * When the parent is added into UI display list at the first time, we add the charting
     */
    doComponentLayout : function(width, height, isSetSize) {
        this.display(width, height);
        demos.GroupedBarChartClass.superclass.doComponentLayout.apply(this, arguments);
    },
    
    display:function(width, height) {
        if(this.chart != null && this.chart.width == width && this.chart.height == height) {
            return;
        }
        this.chart = new Ext.chart.Chart({
            animate: true,
            shadow: true,
            //store: store1,
            legend: {
              position: 'right'  
            },
            axes: [{
                type: 'Numeric',
                position: 'bottom',
                fields: ['data1', 'data2', 'data3'],
                minimum: 0,
                //label: {
                //    renderer: Ext.util.Format.numberRenderer('0,0')
                //},
                grid: true,
                title: 'Number of Hits'
            }, {
                type: 'Category',
                position: 'left',
                fields: ['name'],
                title: 'Month of the Year'
            }],
            series: [{
                type: 'bar',
                axis: 'bottom',
                xField: 'name',
                yField: ['data1', 'data2', 'data3']
            }]

        });
        this.chart.setSize(width, height);
        this.add(this.chart);
        this.chart.bindStore(window.store1, true);
    }
});

demos.GroupedBarChart = new demos.GroupedBarChartClass();