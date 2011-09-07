sink.Structure = [
    {
        text: 'Charting',
        cls: 'launchscreen',
        items: [
            {
                text: 'Area Chart',
                card: demos.AreaChart,
                source: 'src/demos/areachart.js',
                leaf: true
            },
            {
                text: 'Bar Chart',
                card: demos.BarChart,
                source: 'src/demos/barchart.js',
                leaf: true
            },
            {
                text: 'Stack BarChart',
                card: demos.StackBarChart,
                source: 'src/demos/stackbarchart.js',
                leaf: true
            },
            {
                text: 'Grouped BarChart',
                card: demos.GroupedBarChart,
                source: 'src/demos/groupedbarchart.js',
                leaf: true
            },
            {
                text: 'Column Chart',
                card: demos.ColumnChart,
                source: 'src/demos/columnchart.js',
                leaf: true
            },
            {
                text: 'Cool Column',
                card: demos.ColumnChart2,
                source: 'src/demos/customcolumnchart.js',
                leaf: true
            },
            {
                text: 'Line Chart',
                card: demos.LineChart,
                source: 'src/demos/linechart.js',
                leaf: true
            },
            /** Memory leak !!!
            {
                text: 'Live LineChart',
                card: demos.LiveLineChart,
                source: 'src/demos/livelinechart.js',
                leaf: true
            }
            **/
            
            {
                text: 'Pie Chart',
                card: demos.PieChart,
                source: 'src/demos/piechart.js',
                leaf: true
            },
            {
                text: 'Radar Chart',
                card: demos.RadarChart,
                source: 'src/demos/radarchart.js',
                leaf: true
            },
            {
                text: 'Area RadarChart',
                card: demos.AreaRadarChart,
                source: 'src/demos/arearadarchart.js',
                leaf: true
            },
            {
                text: 'Mixed Chart',
                card: demos.MixedChart,
                source: 'src/demos/mixedchart.js',
                leaf: true
            }
        ]
    },
    {
        text: 'Drawing',
        items: [
            {
                text: 'Tiger',
                card: demos.Tiger,
                source: 'src/demos/tiger.js',
                leaf: true
            }]
    }
];

Ext.regModel('Demo', {
    fields: [
        {name: 'text',        type: 'string'},
        {name: 'source',      type: 'string'},
        {name: 'preventHide', type: 'boolean'},
        {name: 'cardSwitchAnimation'},
        {name: 'card'}
    ]
});

sink.StructureStore = new Ext.data.TreeStore({
    model: 'Demo',
    root: {
        items: sink.Structure
    },
    proxy: {
        type: 'ajax',
        reader: {
            type: 'tree',
            root: 'items'
        }
    }
});
