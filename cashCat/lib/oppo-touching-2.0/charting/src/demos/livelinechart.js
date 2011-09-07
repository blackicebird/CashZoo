demos.LiveLineChartClass = Ext.extend(Ext.Panel, {
    title: "Live LineChart",
    ui: 'dark',
    
    /**
     * Lazy creation
     * When the parent is added into UI display list at the first time, we add the charting
     */
    doComponentLayout : function(width, height, isSetSize) {
        this.display(width, height);
        demos.LiveLineChartClass.superclass.doComponentLayout.apply(this, arguments);
    },
    
    display:function(width, height) {
        if(this.chart != null && this.chart.width == width && this.chart.height == height) {
            return;
        }
        var generateData = (function() {
            var data = [], i = 0, 
                last = false,
                date = new Date('1/1/2011'),
                seconds = +date,
                min = Math.min,
                max = Math.max,
                random = Math.random;
            return function() {
                data = data.slice();
                data.push({
                    date:  date.add(Ext.Date.DAY, i++).format('m/d/y'),
                    visits: min(100, max(last? last.visits + (random() - 0.5) * 20 : random() * 100, 0)),
                    views: min(100, max(last? last.views + (random() - 0.5) * 10 : random() * 100, 0)),
                    users: min(100, max(last? last.users + (random() - 0.5) * 20 : random() * 100, 0))
                });
                last = data[data.length -1];
                return data;
            };
        })();
    
        var group = false,
            groupOp = [{
                dateFormat: 'M d',
                groupBy: 'year,month,day' 
            }, {
                dateFormat: 'M',
                groupBy: 'year,month'
            }];
        
        function regroup() {
            group = !group;
            var axis = this.chart.axes.get(1),
                selectedGroup = groupOp[+group];
            axis.dateFormat = selectedGroup.dateFormat;
            axis.groupBy = selectedGroup.groupBy;
            
            //this.chart.redraw();
        }
        
        var store = new Ext.data.JsonStore({
            fields: ['date', 'visits', 'views', 'users'],
            data: generateData()
        });
        
        var intr = setInterval(function() {
            var gs = generateData();
            var toDate = new Date(timeAxis.toDate),
                lastDate = new Date(gs[gs.length - 1].date),
                markerIndex = this.chart.markerIndex || 0;
            if (+toDate < +lastDate) {
                markerIndex = 1;
                timeAxis.toDate = lastDate.format('m/d/y');
                timeAxis.fromDate = new Date(timeAxis.fromDate).add(Ext.Date.DAY, 1).format('m/d/y');
                this.chart.markerIndex = markerIndex;
            }
            store.loadData(gs);
        }, 10000);
        
        this.chart = new Ext.chart.Chart({
            animate: true,
            axes: [{
                type: 'Numeric',
                grid: true,
                minimum: 0,
                maximum: 100,
                position: 'left',
                fields: ['views', 'visits', 'users'],
                title: 'Number of Hits',
                grid: {
                    odd: {
                        fill: '#dedede',
                        stroke: '#ddd',
                        'stroke-width': 0.5
                    }
                }
            }, {
                type: 'Time',
                position: 'bottom',
                fields: 'date',
                title: 'Day',
                dateFormat: 'M d',
                groupBy: 'year,month,day',
                aggregateOp: 'sum',

                constrain: true,
                fromDate: '1/1/11',
                toDate: '1/7/11',
                grid: true
            }],
            series: [{
                type: 'line',
                axis: 'left',
                xField: 'date',
                yField: 'visits',
                label: {
                    display: 'none',
                    field: 'visits',
                    renderer: function(v) { return v >> 0; },
                    'text-anchor': 'middle'
                },
                markerCfg: {
                    radius: 5,
                    size: 5
                }
            },{
                type: 'line',
                axis: 'left',
                xField: 'date',
                yField: 'views',
                label: {
                    display: 'none',
                    field: 'visits',
                    renderer: function(v) { return v >> 0; },
                    'text-anchor': 'middle'
                },
                markerCfg: {
                    radius: 5,
                    size: 5
                }
            },{
                type: 'line',
                axis: 'left',
                xField: 'date',
                yField: 'users',
                label: {
                    display: 'none',
                    field: 'visits',
                    renderer: function(v) { return v >> 0; },
                    'text-anchor': 'middle'
                },
                markerCfg: {
                    radius: 5,
                    size: 5
                }
            }]
        });
        var timeAxis = this.chart.axes.get(1);
        this.chart.setSize(width, height);
        this.add(this.chart);
        this.chart.bindStore(store, true);
    }
});

demos.LiveLineChart = new demos.LiveLineChartClass();