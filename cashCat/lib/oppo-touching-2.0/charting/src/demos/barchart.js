demos.BarChartClass = Ext.extend(Ext.Panel, {
    title: "Bar Charting",
    ui: 'dark',
    
    /**
     * Lazy creation
     * When the parent is added into UI display list at the first time, we add the charting
     */
    doComponentLayout : function(width, height, isSetSize) {
        this.display(width, height);
        demos.BarChartClass.superclass.doComponentLayout.apply(this, arguments);
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
                position: 'bottom',
                fields: ['data1'],
                //label: {
                //    renderer: Ext.util.Format.numberRenderer('0,0')
                //},
                title: 'Number of Hits',
                grid: true,
                minimum: 0
            }, {
                type: 'Category',
                position: 'left',
                fields: ['name'],
                title: 'Month of the Year'
            }],
            //theme: 'White',
            background: {
              gradient: {
                id: 'backgroundGradient',
                angle: 45,
                stops: {
                  0: {
                    color: '#ffffff'
                  },
                  100: {
                    color: '#eaf1f8'
                  }
                }
              }
            },
            series: [{
                type: 'bar',
                axis: 'bottom',
                highlight: true,
                tips: {
                  trackMouse: true,
                  width: 140,
                  height: 28,
                  renderer: function(storeItem, item) {
                    this.setTitle(storeItem.get('name') + ': ' + storeItem.get('data1') + ' views');
                  }
                },
                label: {
                  display: 'insideEnd',
                    field: 'data1',
                    //renderer: Ext.util.Format.numberRenderer('0'),
                    orientation: 'horizontal',
                    color: '#333',
                  'text-anchor': 'middle'
                },
                xField: 'name',
                yField: ['data1']
            }]
        });
        this.chart.setSize(width, height);
        this.add(this.chart);
        this.chart.bindStore(window.store1, true);
    }
});

demos.BarChart = new demos.BarChartClass();