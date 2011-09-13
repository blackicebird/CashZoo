/*

This file is part of Ext JS 4

Copyright (c) 2011 Sencha Inc

Contact:  http://www.sencha.com/contact

Commercial Usage
Licensees holding valid commercial licenses may use this file in accordance with the Commercial Software License Agreement provided with the Software or, alternatively, in accordance with the terms contained in a written agreement between you and Sencha.

If you are unsure which license is appropriate for your use, please contact the sales department at http://www.sencha.com/contact.

*/
Ext.require('Ext.chart.*');
Ext.require(['Ext.Window', 'Ext.layout.container.Fit', 'Ext.fx.target.Sprite']);

Ext.onReady(function() { 
    var myData = 
            [ 
                ['Users_1','4'], 
                ['Users_2','1'], 
                ['Users_3','3'] 
            ]; 

    var store = new Ext.data.ArrayStore({ 
        fields: [ 
            {name: 'title'}, 
            {name: 'value'} 
        ], 
        data: myData 
    }); 

    var panel_usr = Ext.create('widget.panel', { 
        width: 580, 
        height: 300, 
        renderTo: Ext.getBody(), 
        title: 'Users', 
        layout: 'fit', 
        items: 
        { 
            id: 'chartCmp', 
            xtype: 'chart', 
            animate: true, 
            shadow: true, 
            store: store, 
            axes: [{ 
                    type: 'Numeric', 
                    position: 'left', 
                    fields: ['value'], 
                    maximum: 10, 
                    minimum: 0, 
                    majorTickSteps: 3, 
                    minorTickSteps: 1, 
                    title: 'Numeric', 
                    grid: true, 
                    label: { 
                        renderer: Ext.util.Format.numberRenderer('0.0') 
                    } 
                }, 
                { 
                    type: 'Category', 
                    position: 'bottom', 
                    fields: ['title'] 
                } 
            ], 
            series: 
                    [ 
                        { 
                            type: 'column', 
                            axis: 'left', 
                            label: 
                            { 
                                display: 'insideEnd', 
                                orientation: 'vertical', 
                                'text-anchor': 'middle', 
                                field: 'value' 
                            }, 
                            xField: 'title', 
                            yField: 'value' 
                        } 
                    ] 
        } 
    }); 
});  
