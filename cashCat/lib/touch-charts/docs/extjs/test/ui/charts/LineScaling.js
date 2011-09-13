/*

This file is part of Ext JS 4

Copyright (c) 2011 Sencha Inc

Contact:  http://www.sencha.com/contact

Commercial Usage
Licensees holding valid commercial licenses may use this file in accordance with the Commercial Software License Agreement provided with the Software or, alternatively, in accordance with the terms contained in a written agreement between you and Sencha.

If you are unsure which license is appropriate for your use, please contact the sales department at http://www.sencha.com/contact.

*/
Ext.require('Ext.chart.*');
Ext.require('Ext.data.*');
Ext.require('Ext.layout.container.Fit');

function calcProfile(startTemperature,surfHeatFlow,porosity,conductivity,finalDepth,incDepth){
  var profile = [];
  var depth = 0;
  var temperature = startTemperature;
  profile.push([depth,temperature]);
  while (depth < finalDepth) {
          depth = depth + incDepth;
          var por = porosity * (Math.exp((-(depth-incDepth)/1000))-Math.exp(-depth/1000))/incDepth;
          cpp = Math.pow(conductivity,1-por)*Math.pow(0.6,por); // effective thermal conductivity of a porous media. 0.6 is groundwater conductivity
          t0 = (cpp-(0.000001*incDepth*incDepth)/(2*cpp));
          t1 = (surfHeatFlow -((depth-incDepth)/1000000))*incDepth/t0;
          temperature = temperature + t1;
          profile.push([depth,temperature]); 
  }; 
  return profile;
}

Ext.onReady(function(){

        store1 = new Ext.data.ArrayStore({
        fields:[ 'depth', 'temperature'],
        idIndex:0
    });
        var prf = calcProfile(12,0.06,600,2.8,200,5);
    store1.loadData(prf,false);
  
    // extra simple
    var form = Ext.create('Ext.form.Panel',{
        renderTo:Ext.getBody(),
        title:'Calculate temperature profile',
        autoHeight: true,
        bodyStyle: 'padding: 5px',
        width:400,
        layout:'fit',                
        items:[ {
                xtype : 'numberfield',
                name  : 'surftemp',
                fieldLabel : 'Surface Temperature',
                decimalPrecision:1,
                allowBlank:false,
                emptytext:"12"
        },{
                xtype : 'numberfield',
                name  : 'heatflow',
                fieldLabel : 'Surface Heatflow (W/m2)',
                allowBlank:false,
                decimalPrecision:4,
                emptytext:"0.0600"
        },{
                xtype : 'numberfield',
                name  : 'porosity',
                fieldLabel : 'Porosity',
                allowBlank:false,
                decimalPrecision:2,
                emptytext:"0.60"
        },{
                xtype : 'numberfield',
                name  : 'conductivity',
                allowBlank:false,
                fieldLabel : 'Thermal Conductivity',
                decimalPrecision:2,
                emptytext:"2.8"
        },{
                xtype : 'numberfield',
                name  : 'maxdepth',
                fieldLabel : 'Maximum depth (<600m)',
                allowBlank:false,
                decimalPrecision:1,
                emptytext:"200"
        }
              ], 
        buttons:[
                 {
                    text:'Re-calculate profile',
                    handler: function() {
                            var vals = form.getForm().getValues();
                                var prf = calcProfile(parseFloat(vals.surftemp),
                                                      parseFloat(vals.heatflow),
                                                      parseFloat(vals.porosity)*1000,
                                                      parseFloat(vals.conductivity),
                                                      parseFloat(vals.maxdepth),
                                                      5);
                            console.log(prf);
                            store1.loadData(prf,false);                            
                        }
                 }]
    }); 
    
    form.getForm().setValues({
       surftemp: 12,
       heatflow: 0.0600,
       porosity: 0.60,
       conductivity: 2.8,
       maxdepth: 200
   });
    
    Ext.create('widget.panel',{
        title: 'Temperature Curve', 
        frame:true, 
        renderTo: Ext.getBody(), 
        width:500,
        height:300,
        layout:'fit',
        items: {
            xtype: 'chart',
            store: store1,
            axes: [{
                type:'Numeric',
                position:'left',
                fields:['depth'],
                title:'Depth',
                label:{
                  labelRenderer : Ext.util.Format.numberRenderer('0,0.0')
                },
                grid: {
                    odd: {
                        opacity: 1,
                        fill: '#ddd',
                        stroke: '#bbb',
                        'stroke-width': 0.5
                    }
                }
            },{
                type:'Numeric',
                position:'top',
                fields:['temperature'],
                grid:true,
                label:{
                    labelRenderer : Ext.util.Format.numberRenderer('0,0.00')
                  },
                title:'Temperature'
            }],
            series:[{
                type:'line',
                axis:'left',
                xField: 'temperature',
                yField: 'depth',
                tips: {
                  trackMouse: true,
                  width: 220,
                  height: 25,
                  renderer: function(storeItem, item) {
                    this.setTitle(Ext.util.Format.number(storeItem.get('temperature'),'0.00') + ' at ' + storeItem.get('depth')+'m');
                  }
                },
                markerConfig: {
                    type: 'circle',
                    size: 1,
                    'stroke-width': 0,
                    fill: '#38B8BF',
                    stroke: '#38B8BF'
                }                
            }]                    
        }
    });
});
