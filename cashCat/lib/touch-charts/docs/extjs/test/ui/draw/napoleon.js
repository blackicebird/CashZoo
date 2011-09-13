/*

This file is part of Ext JS 4

Copyright (c) 2011 Sencha Inc

Contact:  http://www.sencha.com/contact

Commercial Usage
Licensees holding valid commercial licenses may use this file in accordance with the Commercial Software License Agreement provided with the Software or, alternatively, in accordance with the terms contained in a written agreement between you and Sencha.

If you are unsure which license is appropriate for your use, please contact the sales department at http://www.sencha.com/contact.

*/
Ext.onReady(function() {
    var tiger = Ext.create('Ext.draw.Component', {
        width: 1000,
        height: 400,
        padding: 10,
        cls: 'cursor-dragme',
        draggable: {
            constrain: true
        },
        floating: true,
        renderTo: Ext.getBody(),
        items: [{
            type: "path",
            path: "M312.035,122.651,348.035,239.151",
            "stroke-width": 4,
            stroke:"#000"
        },{
            type: "path",
            path: "M53.785,223.901,73.285,222.901,83.035,93.901",
            "stroke-width": 2,
            stroke:"#000"
        },{
            type: "path",
            path: "M3.955,154.627c0,0,3.535,2.283,7.069-0.442s4.123-5.522,9.277-5.522s1.768,3.829,1.768,5.007s1.326,3.976,6.185,3.976s5.515-1.587,6.479-1.031s5.596,5.155,6.259,7.584s-1.249,3.556-0.368,5.081s4.757,6.465,5.743,8.173s0.663,9.278-1.473,11.413s-1.35,1.762-1.35,3.495s0.082,4.318,2.198,5.54c0,0,4.013,1.127,6,2.158s2.65,1.105,3.46,3.02s-0.147,10.676,0.368,12.591s1.768,1.841,2.356,2.945s-0.442,1.252-0.147,1.915s2.209,0.811,2.356,1.694s0.588,8.394,0.441,8.762s-1.03,0.736-1.472,1.473s0.147,1.84-0.074,2.282s-2.356-0.146-3.093,1.031s-1.104,3.092-0.736,4.123s1.989,0.516,2.43,1.546s-0.098,2.334,0.152,2.959s0.75,1.25,0.5,2.25s-1.375,3.625-1.875,4.25s-0.625-0.375-1.25,0.5s-1.5,2.625-1.875,3.625s0.125,1.5,1,2s0.75-0.75,1.625,0s0.375,2.375,1.375,2.875s1.125-0.5,2.125,0s2.125,1.625,2.625,2.75s-0.875,1.875-1.125,3s0.75,4.375-0.125,5.375s-2,0.625-2.875,1.625s-1.875,7.75-1.875,7.75M271.05,205.987c0,0,0.703,1.758,2.227,2.578s2.695,0.82,2.695,0.82s0.82,1.992,1.992,2.695s2.109-1.055,3.984,0s1.523,2.695,2.578,3.164s5.977-2.344,8.438-0.469s-0.234,2.812,1.055,4.336s1.992-0.469,3.75,0.938s1.641,3.047,1.641,4.57s-1.758,2.344-1.758,4.219s2.461,2.695,3.164,6.914s-1.523,2.812-1.289,6.328s2.344,7.734,2.109,9.609s-2.227,1.523-1.055,3.164s3.75,0,4.102,2.695s-1.875,3.633-0.703,5.508s3.047-0.117,4.102,1.641s0.352,2.344,0.352,4.57s1.641,1.992,2.109,3.516s0.352,5.507,0.352,5.507M439.214,191.924l-3.164,2.461l-4.219,1.875l-3.867,0.234c0,0-0.703-1.289-1.641-1.289s-2.344,1.641-3.164,1.641s-0.938-1.289-2.109-1.289s-1.523,1.172-1.992,1.172s-1.992-1.406-3.516,0s-0.234,2.227-0.82,2.93s-2.461,1.289-3.164,2.109s0.352,1.289-0.234,2.461s-2.93,0.117-3.633,2.578s0.938,3.867,0.586,6.445s-3.75,3.164-3.75,6.328s2.578,3.867,2.812,6.328s-2.109,3.164-1.055,4.57s2.93,0.117,4.57,1.875s-0.234,2.226,0.469,3.867s1.289,1.172,1.289,2.461s-1.406,1.289-1.406,2.344s2.344,1.641,1.406,4.219s-1.641,0.117-2.695,1.992s0.234,2.109,0,2.93s-4.453,2.109-3.867,4.805s-1.992,1.992-1.758,3.516s-1.055,4.687-0.117,7.5s2.461,2.227,3.516,5.04s-0.469,3.75,1.523,5.391",
            "stroke-width": 1,
            stroke:"#000"
        },{
            type: "path",
            path: "M44.535,191.9,93.535,177.744",
            "stroke-width": 65,
            stroke:"#E6CDAE"
        },{
            type: "path",
            path: "M84.535,181.65,143.535,190.727",
            "stroke-width": 60,
            stroke:"#E6CDAE"
        },{
            type: "path",
            path: "M128,196,189.035,179.977",
            "stroke-width": 52,
            stroke:"#E6CDAE"
        },{
            type: "path",
            path: "M188.035,179.977,227.326,169.668",
            "stroke-width": 48,
            stroke:"#E6CDAE"
        },{
            type: "path",
            path: "M264.303,160.478,305.785,155.941",
            "stroke-width": 40,
            stroke:"#E6CDAE"
        },{
            type: "path",
            path: "M304.785,155.941,337.382,152.4",
            "stroke-width": 34,
            stroke:"#E6CDAE"
        },{
            type: "path",
            path: "M336.382,152.375,373.785,148.296",
            "stroke-width": 31,
            stroke:"#E6CDAE"
        },{
            type: "path",
            path: "M372.785,148.296,384.785,147.063,473.285,180.4,553.535,151.15",
            "stroke-width": 27,
            stroke:"#E6CDAE"
        },{
            type: "path",
            path: "M227,169.668,258.16,161.367,265.303,160.566",
            "stroke-width": 44,
            stroke:"#E6CDAE"
        },{
            type: "path",
            path: "M203.285,112.65,134.016,167.9",
            "stroke-width": 10,
            stroke:"#E6CDAE"
        },{
            type: "path",
            path: "M200.285,112.4,248.285,117.65",
            "stroke-width": 8,
            stroke:"#E6CDAE"
        },{
            type: "path",
            path: "M247.285,116.15,314.035,123.451",
            "stroke-width": 5,
            stroke:"#E6CDAE"
        },{
            type: "path",
            path: "M548.535,156.901,625.753,82.37,666.035,93.401",
            "stroke-width": 22,
            stroke:"#E6CDAE"
        },{
            type: "path",
            path: "M650.503,91.37,681.535,99.868,759.285,59.901",
            "stroke-width": 17,
            stroke:"#E6CDAE"
        },{
            type: "path",
            path: "M767.035,74.151,753.417,81.151",
            "stroke-width": 17,
            stroke:"#000"
        },{
            type: "path",
            path: "M764.285,74.651,756.035,77.901,751.785,128.901,736.035,136.401",
            "stroke-width": 15,
            stroke:"#000"
        },{
            type: "path",
            path: "M742.285,136.651,663.035,117.151,609.785,141.901",
            "stroke-width": 14,
            stroke:"#000"
        },{
            type: "path",
            path: "M611.035,138.901,557.285,171.151",
            "stroke-width": 9,
            stroke:"#000"
        },{
            type: "path",
            path: "M557.285,169.151,485.285,195.651",
            "stroke-width": 6,
            stroke:"#000"
        },{
            type: "path",
            path: "M486.035,194.651,407.785,210.651",
            "stroke-width": 5,
            stroke:"#000"
        },{
            type: "path",
            path: "M407.785,210.651,347.785,235.651",
            "stroke-width": 3,
            stroke:"#000"
        },{
            type: "path",
            path: "M301.285,245.151,251.785,215.901",
            "stroke-width": 3,
            stroke:"#000"
        },{
            type: "path",
            path: "M100.285,222.151,73.035,223.151",
            "stroke-width": undefined,
            stroke:"#000"
        },{
            type: "path",
            path: "M251.785,215.901,222.785,232.635,195.785,224.651,127.285,220.401,100.285,222.151",
            "stroke-width": 2,
            stroke:"#000"
        },{
            type: "path",
            path: "M349.035,236.151,310.535,247.151,300.785,246.401",
            "stroke-width": 8,
            stroke:"#000"
        },{
            type: "path",
            path: "M88.785,95.651,86.035,164.151",
            "stroke-width": 5,
            stroke:"#E6CDAE"
        },{
            type: "text",
            text: "Niemen",
            fill: "#000",
            "text-anchor": "middle",
            rotate: {
                degrees: 270
            },
            font: '6px "Lucida Grande", "Lucida Sans Unicode", Verdana, Arial, Helvetica, sans-serif',
            x: 17.535,
            y: 144.151
        },{
            type: "text",
            text: "10,000",
            fill: "#000",
            "text-anchor": "middle",
            rotate: {
                degrees: 270
            },
            font: '6px "Lucida Grande", "Lucida Sans Unicode", Verdana, Arial, Helvetica, sans-serif',
            x: 63.035,
            y: 240
        },{
            type: "text",
            text: "4,000",
            fill: "#000",
            "text-anchor": "middle",
            rotate: {
                degrees: 270
            },
            font: '6px "Lucida Grande", "Lucida Sans Unicode", Verdana, Arial, Helvetica, sans-serif',
            x: 82.285,
            y: 240
        },{
            type: "text",
            text: "422,000",
            fill: "#000",
            "text-anchor": "middle",
            font: '6px "Lucida Grande", "Lucida Sans Unicode", Verdana, Arial, Helvetica, sans-serif',
            x: 57.285,
            y: 144.151
        },{
            type: "text",
            text: "400,000",
            fill: "#000",
            "text-anchor": "middle",
            font: '6px "Lucida Grande", "Lucida Sans Unicode", Verdana, Arial, Helvetica, sans-serif',
            x: 105.535,
            y: 144.901
        },{
            type: "text",
            text: "6,000",
            fill: "#000",
            "text-anchor": "middle",
            rotate: {
                degrees: 270
            },
            font: '6px "Lucida Grande", "Lucida Sans Unicode", Verdana, Arial, Helvetica, sans-serif',
            x: 75.285,
            y: 106.901
        },{
            type: "text",
            text: "22,000",
            fill: "#000",
            "text-anchor": "middle",
            rotate: {
                degrees: 270
            },
            font: '6px "Lucida Grande", "Lucida Sans Unicode", Verdana, Arial, Helvetica, sans-serif',
            x: 96.035,
            y: 101.651
        },{
            type: "text",
            text: "8,000",
            fill: "#000",
            "text-anchor": "middle",
            rotate: {
                degrees: 270
            },
            font: '6px "Lucida Grande", "Lucida Sans Unicode", Verdana, Arial, Helvetica, sans-serif',
            x: 126.785,
            y: 240
        },{
            type: "text",
            text: "14,000",
            fill: "#000",
            "text-anchor": "middle",
            rotate: {
                degrees: 270
            },
            font: '6px "Lucida Grande", "Lucida Sans Unicode", Verdana, Arial, Helvetica, sans-serif',
            x: 155.285,
            y: 240
        },{
            type: "text",
            text: "12,000",
            fill: "#000",
            "text-anchor": "middle",
            rotate: {
                degrees: 270
            },
            font: '6px "Lucida Grande", "Lucida Sans Unicode", Verdana, Arial, Helvetica, sans-serif',
            x: 200,
            y: 240
        },{
            type: "text",
            text: "Smorgoni",
            fill: "#000",
            "text-anchor": "middle",
            font: '6px "Lucida Grande", "Lucida Sans Unicode", Verdana, Arial, Helvetica, sans-serif',
            x: 207.035,
            y: 218.651
        },{
            type: "text",
            text: "Molodezno",
            fill: "#000",
            "text-anchor": "middle",
            font: '6px "Lucida Grande", "Lucida Sans Unicode", Verdana, Arial, Helvetica, sans-serif',
            x: 223.785,
            y: 238.401
        },{
            type: "text",
            text: "Minsk",
            fill: "#000",
            "text-anchor": "middle",
            font: '6px "Lucida Grande", "Lucida Sans Unicode", Verdana, Arial, Helvetica, sans-serif',
            x: 259.535,
            y: 272.151
        },{
            type: "text",
            text: "28,000",
            fill: "#000",
            "text-anchor": "middle",
            font: '6px "Lucida Grande", "Lucida Sans Unicode", Verdana, Arial, Helvetica, sans-serif',
            x: 271.285,
            y: 240.151
        },{
            type: "text",
            text: "Studienska",
            fill: "#000",
            "text-anchor": "middle",
            font: '6px "Lucida Grande", "Lucida Sans Unicode", Verdana, Arial, Helvetica, sans-serif',
            x: 289.785,
            y: 254.151
        },{
            type: "text",
            text: "50,000",
            fill: "#000",
            "text-anchor": "middle",
            font: '6px "Lucida Grande", "Lucida Sans Unicode", Verdana, Arial, Helvetica, sans-serif',
            x: 328.785,
            y: 254.901
        },{
            type: "text",
            text: "Botr",
            fill: "#000",
            "text-anchor": "middle",
            font: '6px "Lucida Grande", "Lucida Sans Unicode", Verdana, Arial, Helvetica, sans-serif',
            x: 359.035,
            y: 242.401
        },{
            type: "text",
            text: "30,000",
            fill: "#000",
            "text-anchor": "middle",
            font: '6px "Lucida Grande", "Lucida Sans Unicode", Verdana, Arial, Helvetica, sans-serif',
            x: 320.285,
            y: 193.401
        },{
            type: "text",
            text: "20,000",
            fill: "#000",
            "text-anchor": "middle",
            font: '6px "Lucida Grande", "Lucida Sans Unicode", Verdana, Arial, Helvetica, sans-serif',
            x: 375.785,
            y: 235.401
        },{
            type: "text",
            text: "Orcha",
            fill: "#000",
            "text-anchor": "middle",
            font: '6px "Lucida Grande", "Lucida Sans Unicode", Verdana, Arial, Helvetica, sans-serif',
            x: 401.035,
            y: 201.901
        },{
            type: "text",
            text: "Mohilov",
            fill: "#000",
            "text-anchor": "middle",
            font: '6px "Lucida Grande", "Lucida Sans Unicode", Verdana, Arial, Helvetica, sans-serif',
            x: 417.035,
            y: 265.651
        },{
            type: "text",
            text: "24,000",
            fill: "#000",
            "text-anchor": "middle",
            font: '6px "Lucida Grande", "Lucida Sans Unicode", Verdana, Arial, Helvetica, sans-serif',
            x: 445.535,
            y: 214.401
        },{
            type: "text",
            text: "60,000",
            fill: "#000",
            "text-anchor": "middle",
            font: '6px "Lucida Grande", "Lucida Sans Unicode", Verdana, Arial, Helvetica, sans-serif',
            x: 189.535,
            y: 139.401
        },{
            type: "text",
            text: "33,000",
            fill: "#000",
            "text-anchor": "middle",
            font: '6px "Lucida Grande", "Lucida Sans Unicode", Verdana, Arial, Helvetica, sans-serif',
            x: 254.035,
            y: 106.401
        },{
            type: "text",
            text: "Glubokoe",
            fill: "#000",
            "text-anchor": "middle",
            font: '6px "Lucida Grande", "Lucida Sans Unicode", Verdana, Arial, Helvetica, sans-serif',
            x: 253.785,
            y: 131.901
        },{
            type: "text",
            text: "Polotsk",
            fill: "#000",
            "text-anchor": "middle",
            font: '6px "Lucida Grande", "Lucida Sans Unicode", Verdana, Arial, Helvetica, sans-serif',
            x: 309.035,
            y: 112.901
        },{
            type: "text",
            text: "Vitebsk",
            fill: "#000",
            "text-anchor": "middle",
            font: '6px "Lucida Grande", "Lucida Sans Unicode", Verdana, Arial, Helvetica, sans-serif',
            x: 382.535,
            y: 137.651
        },{
            type: "text",
            text: "Kovno",
            fill: "#000",
            "text-anchor": "middle",
            font: '6px "Lucida Grande", "Lucida Sans Unicode", Verdana, Arial, Helvetica, sans-serif',
            x: 57.785,
            y: 187.151
        },{
            type: "text",
            text: "Vilno",
            fill: "#000",
            "text-anchor": "middle",
            font: '6px "Lucida Grande", "Lucida Sans Unicode", Verdana, Arial, Helvetica, sans-serif',
            x: 130.785,
            y: 184.151
        },{
            type: "text",
            text: "175,000",
            fill: "#000",
            "text-anchor": "middle",
            font: '6px "Lucida Grande", "Lucida Sans Unicode", Verdana, Arial, Helvetica, sans-serif',
            x: 406.66,
            y: 130.026
        },{
            type: "text",
            text: "145,000",
            fill: "#000",
            "text-anchor": "middle",
            font: '6px "Lucida Grande", "Lucida Sans Unicode", Verdana, Arial, Helvetica, sans-serif',
            x: 489.035,
            y: 148.651
        },{
            type: "text",
            text: "Smolensk",
            fill: "#000",
            "text-anchor": "middle",
            font: '6px "Lucida Grande", "Lucida Sans Unicode", Verdana, Arial, Helvetica, sans-serif',
            x: 480.535,
            y: 182.401
        },{
            type: "text",
            text: "37,000",
            fill: "#000",
            "text-anchor": "middle",
            font: '6px "Lucida Grande", "Lucida Sans Unicode", Verdana, Arial, Helvetica, sans-serif',
            x: 524.535,
            y: 194.651
        },{
            type: "text",
            text: "55,000",
            fill: "#000",
            "text-anchor": "middle",
            font: '6px "Lucida Grande", "Lucida Sans Unicode", Verdana, Arial, Helvetica, sans-serif',
            x: 586.285,
            y: 169.151
        },{
            type: "text",
            text: "Dorogobuzhe",
            fill: "#000",
            "text-anchor": "middle",
            font: '6px "Lucida Grande", "Lucida Sans Unicode", Verdana, Arial, Helvetica, sans-serif',
            x: 547.035,
            y: 151.901
        },{
            type: "text",
            text: "Vizma",
            fill: "#000",
            "text-anchor": "middle",
            font: '6px "Lucida Grande", "Lucida Sans Unicode", Verdana, Arial, Helvetica, sans-serif',
            x: 614.785,
            y: 152.901
        },{
            type: "text",
            text: "Chjat",
            fill: "#000",
            "text-anchor": "middle",
            font: '6px "Lucida Grande", "Lucida Sans Unicode", Verdana, Arial, Helvetica, sans-serif',
            x: 622.285,
            y: 84.651
        },{
            type: "text",
            text: "87",
            fill: "#000",
            "text-anchor": "middle",
            rotate: {
                degrees: 270
            },
            font: '6px "Lucida Grande", "Lucida Sans Unicode", Verdana, Arial, Helvetica, sans-serif',
            x: 642.035,
            y: 144.901
        },{
            type: "text",
            text: "187,000",
            fill: "#000",
            "text-anchor": "middle",
            font: '6px "Lucida Grande", "Lucida Sans Unicode", Verdana, Arial, Helvetica, sans-serif',
            x: 640.535,
            y: 69.901
        },{
            type: "text",
            text: "100,000",
            fill: "#000",
            "text-anchor": "middle",
            font: '6px "Lucida Grande", "Lucida Sans Unicode", Verdana, Arial, Helvetica, sans-serif',
            x: 678.285,
            y: 81.901
        },{
            type: "text",
            text: "Mojaisk",
            fill: "#000",
            "text-anchor": "middle",
            font: '6px "Lucida Grande", "Lucida Sans Unicode", Verdana, Arial, Helvetica, sans-serif',
            x: 689.285,
            y: 110.651
        },{
            type: "text",
            text: "96,000",
            fill: "#000",
            "text-anchor": "middle",
            font: '6px "Lucida Grande", "Lucida Sans Unicode", Verdana, Arial, Helvetica, sans-serif',
            x: 724.785,
            y: 148.401
        },{
            type: "text",
            text: "100,000",
            fill: "#000",
            "text-anchor": "middle",
            rotate: {
                degrees: 65
            },
            font: '6px "Lucida Grande", "Lucida Sans Unicode", Verdana, Arial, Helvetica, sans-serif',
            x: 735,
            y: 53.151
        },{
            type: "text",
            text: "Moscow",
            fill: "#000",
            "text-anchor": "middle",
            font: '10px "Lucida Grande", "Lucida Sans Unicode", Verdana, Arial, Helvetica, sans-serif',
            x: 757.035,
            y: 47.151
        },{
            type: "text",
            text: "100,000",
            fill: "#000",
            "text-anchor": "middle",
            rotate: {
                degrees: 65
            },
            font: '6px "Lucida Grande", "Lucida Sans Unicode", Verdana, Arial, Helvetica, sans-serif',
            x: 777,
            y: 89.151
        },{
            type: "text",
            text: "Tarantino",
            fill: "#000",
            "text-anchor": "middle",
            font: '6px "Lucida Grande", "Lucida Sans Unicode", Verdana, Arial, Helvetica, sans-serif',
            x: 777,
            y: 112.151
        },{
            type: "text",
            text: "Malo-jarosewli",
            fill: "#000",
            "text-anchor": "middle",
            font: '6px "Lucida Grande", "Lucida Sans Unicode", Verdana, Arial, Helvetica, sans-serif',
            x: 763.785,
            y: 147
        }]
    });
});
