demos.ColumnChartClass2 = Ext.extend(Ext.Panel, {
    title: "Column Charting2",
    ui: 'dark',
    
    /**
     * Lazy creation
     * When the parent is added into UI display list at the first time, we add the charting
     */
    doComponentLayout : function(width, height, isSetSize) {
        this.display(width, height);
        demos.ColumnChartClass2.superclass.doComponentLayout.apply(this, arguments);
    },
    
    display:function(width, height) {
        if(this.chart != null && this.chart.width == width && this.chart.height == height) {
            return;
        }
        var colors = ['url(#v-1)',
                  'url(#v-2)',
                  'url(#v-3)',
                  'url(#v-4)',
                  'url(#v-5)'];
    
        var baseColor = '#eee';
        
        Ext.chart.theme.Fancy = Ext.extend(Ext.chart.theme.Base, {
            constructor: function(config) {
                Ext.chart.theme.Base.prototype.constructor.call(this, Ext.apply({
                    axis: {
                        fill: baseColor,
                        stroke: baseColor
                    },
                    axisLabelLeft: {
                        fill: baseColor
                    },
                    axisLabelBottom: {
                        fill: baseColor
                    },
                    axisTitleLeft: {
                        fill: baseColor
                    },
                    axisTitleBottom: {
                        fill: baseColor
                    },
                    colors: colors
                }, config));
            }
        }); 
        this.chart = new Ext.chart.Chart({
            theme: 'Fancy',
            animate: {
                easing: 'bounceOut',
                duration: 750
            },
            store: store1,
            background: {
                fill: 'rgb(17, 17, 17)'
            },
            gradients: [
            {
                'id': 'v-1',
                'angle': 0,
                stops: {
                    0: {
                        color: 'rgb(212, 40, 40)'
                    },
                    100: {
                        color: 'rgb(117, 14, 14)'
                    }
                }
            },
            {
                'id': 'v-2',
                'angle': 0,
                stops: {
                    0: {
                        color: 'rgb(180, 216, 42)'
                    },
                    100: {
                        color: 'rgb(94, 114, 13)'
                    }
                }
            },
            {
                'id': 'v-3',
                'angle': 0,
                stops: {
                    0: {
                        color: 'rgb(43, 221, 115)'
                    },
                    100: {
                        color: 'rgb(14, 117, 56)'
                    }
                }
            },
            {
                'id': 'v-4',
                'angle': 0,
                stops: {
                    0: {
                        color: 'rgb(45, 117, 226)'
                    },
                    100: {
                        color: 'rgb(14, 56, 117)'
                    }
                }
            },
            {
                'id': 'v-5',
                'angle': 0,
                stops: {
                    0: {
                        color: 'rgb(187, 45, 222)'
                    },
                    100: {
                        color: 'rgb(85, 10, 103)'
                    }
                }
            }],
            axes: [{
                type: 'Numeric',
                position: 'left',
                fields: ['data1'],
                minimum: 0,
                maximum: 100,
                //label: {
                //    renderer: Ext.util.Format.numberRenderer('0,0')
                //},
                title: 'Number of Hits',
                grid: {
                    odd: {
                        stroke: '#555'
                    },
                    even: {
                        stroke: '#555'
                    }
                }
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
                label: {
                  display: 'insideEnd',
                  'text-anchor': 'middle',
                    field: 'data1',
                    orientation: 'horizontal',
                    fill: '#fff',
                    font: '17px Arial'
                },
                renderer: function(sprite, storeItem, barAttr, i, store) {
                    barAttr.fill = colors[i % colors.length];
                    return barAttr;
                },
                style: {
                    opacity: 0.95
                },
                xField: 'name',
                yField: 'data1'
            }]


        });
        this.chart.setSize(width, height);
        this.add(this.chart);
        //window.store1.loadData(generateData(5, 0));
        this.chart.bindStore(window.store1, true);
    }
});

demos.ColumnChart2 = new demos.ColumnChartClass2();