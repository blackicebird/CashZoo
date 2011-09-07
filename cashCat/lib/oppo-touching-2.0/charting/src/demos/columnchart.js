demos.ColumnChartClass = Ext.extend(Ext.Panel, {
    title: "Column Charting",
    ui: 'dark',
    
    /**
     * Lazy creation
     * When the parent is added into UI display list at the first time, we add the charting
     */
    doComponentLayout : function(width, height, isSetSize) {
        this.display(width, height);
        demos.ColumnChartClass.superclass.doComponentLayout.apply(this, arguments);
    },
    
    display:function(width, height) {
        if(this.chart != null && this.chart.width == width && this.chart.height == height) {
            return;
        }
        this.chart = new Ext.chart.Chart({
            animate: true,
            shadow: true,
            //store: store1,
            axes: [{
                type: 'Numeric',
                position: 'left',
                fields: ['data1'],
                //label: {
                //    renderer: Ext.util.Format.numberRenderer('0,0')
                //},
                title: 'Number of Hits',
                grid: true,
                minimum: 0
            }, {
                type: 'Category',
                position: 'bottom',
                fields: ['name'],
                title: 'Month of the Year'
            }],
            series: [{
                type: 'column',
                axis: 'left',
                highlight: true,
                tips: {
                  trackMouse: true,
                  width: 140,
                  height: 28,
                  renderer: function(storeItem, item) {
                    this.setTitle(storeItem.get('name') + ': ' + storeItem.get('data1') + ' $');
                  }
                },
                label: {
                  display: 'insideEnd',
                  'text-anchor': 'middle',
                    field: 'data1',
                    //renderer: Ext.util.Format.numberRenderer('0'),
                    orientation: 'vertical',
                    color: '#333'
                },
                xField: 'name',
                yField: 'data1'
            }]

        });
        this.chart.setSize(width, height);
        this.add(this.chart);
        this.chart.bindStore(window.store1, true);
    }
});

demos.ColumnChart = new demos.ColumnChartClass();