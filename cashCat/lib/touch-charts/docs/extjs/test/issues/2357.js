/*

This file is part of Ext JS 4

Copyright (c) 2011 Sencha Inc

Contact:  http://www.sencha.com/contact

Commercial Usage
Licensees holding valid commercial licenses may use this file in accordance with the Commercial Software License Agreement provided with the Software or, alternatively, in accordance with the terms contained in a written agreement between you and Sencha.

If you are unsure which license is appropriate for your use, please contact the sales department at http://www.sencha.com/contact.

*/
Ext.Loader.setPath({
    'Ext.ux': '../../examples/ux'
});

Ext.require([
    '*',
    'Ext.ux.event.RecorderManager'
]);

Ext.onReady(function(){

    var stepCount = 0, takenCount = 0;
    function step (text) {
        ++stepCount;
        return '<span class="step" id="step'+stepCount+'">Step '+stepCount+': '+text+'</span>';
    }

    function takeStep () {
        var id1 = 'step' + (takenCount++),
            id2 = 'step' + takenCount,
            f = Ext.fly(id1);

        if (f) {
            f.fadeOut();
        } else {
            Ext.select('span.step').setOpacity(0);
        }

        f = Ext.fly(id2);
        if (f) {
            f.setStyle({ position: 'absolute', top: 0 });
            Ext.fly(id2).fadeIn();
        }
    }

    function getHorizontalTest () {
        function makeHorz (counter) {
            var a = [], s = '1234567890';
            for (var i = counter; i-- > 0; ) {
                a.push(s);
            }
            return {
                xtype: 'component',
                html: a.join('')
            };
        }
        
        var ret = {
            xtype: 'panel',
            title: 'Panel A',
            //bodyPadding: 15,
            collapsible: true,
            style: 'display: inline-block;',
            bodyStyle: 'min-width: 100px; min-height: 100px;',
            //width: 150,
            items: [
                {
                    title: 'Panel B',
                    collapsible: true,
                    items: [
                        makeHorz(1)
                    ]
                    //style: 'margin-top: 8px;',
                }
            ],
            tools: [
                {
                    type: 'plus',
                    handler: function (e, target, owner, tool) {
                        var panel = owner.ownerCt.items.items[0], // owner = header
                            n = panel.items.getCount() + 1;

                        panel.add(makeHorz(n));

                        panel.setTitle('Panel B - ' + n);
                    }
                }
            ]
        };

        ret = {
            xtype: 'container',
            layout: 'column',
            items: [
                ret
            ]
        };
        ret.items.push({ columnWidth: 1, html: 'Flex', style: 'border: 1px solid blue;', height: 30 });

        return ret;
    }

    function getVerticalTest () {
        return {
            xtype: 'panel',
            title: 'Panel X',
            anchor: '0',
            bodyPadding: 15,
            layout: {
                type: 'anchor'
            },
            collapsible: true,
            style: 'margin-top: 15px;',
            listeners: {
                collapse: takeStep,
                expand: takeStep
            },
            items: [
                {
                    title: 'Panel Y',
                    collapsible: true,
                    autoHeight: true,
                    style: 'margin-top: 8px;',
                    listeners: {
                        collapse: takeStep,
                        expand: takeStep
                    },
                    tools: [
                        {
                            type: 'plus',
                            handler: function (e, target, owner, tool) {
                                var panel = owner.ownerCt, // owner = header
                                    n = panel.items.getCount() + 1;

                                panel.add({
                                    xtype: 'component',
                                    html: 'FooBar<br>Item #' + n
                                });

                                panel.setTitle('Panel Y - ' + n);
                                takeStep();
                            }
                        }
                    ]
                }
            ]
        };
    }

    Ext.create('Ext.container.Viewport', {
        layout: 'anchor',
        items: [
            getVerticalTest(),
            {
                xtype: 'displayfield',
                style: 'margin-top: 8px;',
                listeners: {
                    afterrender: takeStep
                },
                value: [
                    '<b>',
                    step('Hit "+" tool and see 1 new items in Panel Y.'),
                    step('Collapse Panel Y.'),
                    step('Expand Panel Y and see the item.'),
                    step('Hit "+" tool and see new item (now 2 items) in Panel Y.'),
                    step('Collapse Panel Y.'),
                    step('Hit "+" tool and see Panel Y title update to 3.'),
                    step('Expand Panel Y and see all 3 items.'),
                    step('Hit "+" tool and see new item (now 4 items) in Panel Y.'),
                    step('Collapse Panel X (outer panel).'),
                    step('Expand Panel X and check height'),
                    step('Hit "+" tool and see new item (now 5 items) in Panel Y.'),
                    step('Collapse Panel Y.'),
                    step('Collapse Panel X.'),
                    step('Expand Panel X.'),
                    step('Expand Panel Y; check height.'),
                    step('Hit "+" tool and see new item (now 6 items) in Panel Y.'),
                    step('Collapse Panel Y'),
                    step('Hit "+" tool and see Panel Y title update to 7.'),
                    step('Collapse Panel X.'),
                    step('Expand Panel X.'),
                    step('Expand Panel Y; check height.'),
                    step('Hit "+" tool and see new item (now 8 items) in Panel Y.'),
                    step('Collapse Panel Y'),
                    step('Hit "+" tool and see Panel Y title update to 9.'),
                    step('Collapse Panel X.'),
                    step('Expand Panel X; check height.'),
                    step('Hit "+" tool and see Panel Y title update to 10.'),
                    step('Expand Panel Y and see all 10 items.'),
                    step('Hit "+" tool and see Panel Y title update to 11.'),
                    '</b>'
                ].join('')
            },
            getHorizontalTest()
        ]
    }); // viewport
});

var testEvents = [
    {"type":"mousedown","ts":4871,"target":"#tool-1024/img","xy":[1300,81],"button":0},
    {"type":"mouseup","ts":4960,"target":"#tool-1024/img","xy":[1300,81],"button":0},
    {"type":"click","ts":4961,"target":"#tool-1024/img","xy":[1300,81],"button":0},
    {"type":"mousedown","ts":6963,"target":"#tool-1021/img","xy":[1285,82],"button":0},
    {"type":"mouseup","ts":7074,"target":"#tool-1021/img","xy":[1285,82],"button":0},
    {"type":"click","ts":7075,"target":"#tool-1021/img","xy":[1285,82],"button":0},
    {"type":"mousedown","ts":8335,"target":"#tool-1021/img","xy":[1285,82],"button":0},
    {"type":"mouseup","ts":8424,"target":"#tool-1021/img","xy":[1285,82],"button":0},
    {"type":"click","ts":8425,"target":"#tool-1021/img","xy":[1285,82],"button":0},
    {"type":"mousedown","ts":10630,"target":"#tool-1024/img","xy":[1300,82],"button":0},
    {"type":"mouseup","ts":10731,"target":"#tool-1024/img","xy":[1300,82],"button":0},
    {"type":"click","ts":10732,"target":"#tool-1024/img","xy":[1300,82],"button":0},
    {"type":"mousedown","ts":13037,"target":"#tool-1021/img","xy":[1281,82],"button":0},
    {"type":"mouseup","ts":13116,"target":"#tool-1021/img","xy":[1281,82],"button":0},
    {"type":"click","ts":13117,"target":"#tool-1021/img","xy":[1281,82],"button":0},
    {"type":"mousedown","ts":15062,"target":"#tool-1024/img","xy":[1298,82],"button":0},
    {"type":"mouseup","ts":15152,"target":"#tool-1024/img","xy":[1298,82],"button":0},
    {"type":"click","ts":15152,"target":"#tool-1024/img","xy":[1298,82],"button":0},
    {"type":"mousedown","ts":17177,"target":"#tool-1021/img","xy":[1282,82],"button":0},
    {"type":"mouseup","ts":17256,"target":"#tool-1021/img","xy":[1282,82],"button":0},
    {"type":"click","ts":17256,"target":"#tool-1021/img","xy":[1282,82],"button":0},
    {"type":"mousedown","ts":19856,"target":"#tool-1024/img","xy":[1298,82],"button":0},
    {"type":"mouseup","ts":19956,"target":"#tool-1024/img","xy":[1298,82],"button":0},
    {"type":"click","ts":19956,"target":"#tool-1024/img","xy":[1298,82],"button":0},
    {"type":"mousedown","ts":21666,"target":"#tool-1018/img","xy":[1317,31],"button":0},
    {"type":"mouseup","ts":21779,"target":"#tool-1018/img","xy":[1317,31],"button":0},
    {"type":"click","ts":21780,"target":"#tool-1018/img","xy":[1317,31],"button":0},
    {"type":"mousedown","ts":23354,"target":"#tool-1018/img","xy":[1317,31],"button":0},
    {"type":"mouseup","ts":23443,"target":"#tool-1018/img","xy":[1317,31],"button":0},
    {"type":"click","ts":23444,"target":"#tool-1018/img","xy":[1317,31],"button":0},
    {"type":"mousedown","ts":26448,"target":"#tool-1024/img","xy":[1298,78],"button":0},
    {"type":"mouseup","ts":26514,"target":"#tool-1024/img","xy":[1298,78],"button":0},
    {"type":"click","ts":26515,"target":"#tool-1024/img","xy":[1298,78],"button":0},
    {"type":"mousedown","ts":28822,"target":"#tool-1021/img","xy":[1284,79],"button":0},
    {"type":"mouseup","ts":28911,"target":"#tool-1021/img","xy":[1284,79],"button":0},
    {"type":"click","ts":28912,"target":"#tool-1021/img","xy":[1284,79],"button":0},
    {"type":"mousedown","ts":31701,"target":"#tool-1018/img","xy":[1318,29],"button":0},
    {"type":"mouseup","ts":31779,"target":"#tool-1018/img","xy":[1318,29],"button":0},
    {"type":"click","ts":31780,"target":"#tool-1018/img","xy":[1318,29],"button":0},
    {"type":"mousedown","ts":33535,"target":"#tool-1018/img","xy":[1318,29],"button":0},
    {"type":"mouseup","ts":33591,"target":"#tool-1018/img","xy":[1318,29],"button":0},
    {"type":"click","ts":33591,"target":"#tool-1018/img","xy":[1318,29],"button":0},
    {"type":"mousedown","ts":36516,"target":"#tool-1021/img","xy":[1286,78],"button":0},
    {"type":"mouseup","ts":36583,"target":"#tool-1021/img","xy":[1286,78],"button":0},
    {"type":"click","ts":36583,"target":"#tool-1021/img","xy":[1286,78],"button":0},
    {"type":"mousedown","ts":39756,"target":"#tool-1024/img","xy":[1301,80],"button":0},
    {"type":"mouseup","ts":39845,"target":"#tool-1024/img","xy":[1301,80],"button":0},
    {"type":"click","ts":39846,"target":"#tool-1024/img","xy":[1301,80],"button":0},
    {"type":"mousedown","ts":41477,"target":"#tool-1021/img","xy":[1286,81],"button":0},
    {"type":"mouseup","ts":41567,"target":"#tool-1021/img","xy":[1286,81],"button":0},
    {"type":"click","ts":41567,"target":"#tool-1021/img","xy":[1286,81],"button":0},
    {"type":"mousedown","ts":43885,"target":"#tool-1024/img","xy":[1303,81],"button":0},
    {"type":"mouseup","ts":43974,"target":"#tool-1024/img","xy":[1303,81],"button":0},
    {"type":"click","ts":43975,"target":"#tool-1024/img","xy":[1303,81],"button":0},
    {"type":"mousedown","ts":45449,"target":"#tool-1018/img","xy":[1318,34],"button":0},
    {"type":"mouseup","ts":45560,"target":"#tool-1018/img","xy":[1318,34],"button":0},
    {"type":"click","ts":45561,"target":"#tool-1018/img","xy":[1318,34],"button":0},
    {"type":"mousedown","ts":46495,"target":"#tool-1018/img","xy":[1317,33],"button":0},
    {"type":"mouseup","ts":46584,"target":"#tool-1018/img","xy":[1317,33],"button":0},
    {"type":"click","ts":46585,"target":"#tool-1018/img","xy":[1317,33],"button":0},
    {"type":"mousedown","ts":49532,"target":"#tool-1021/img","xy":[1283,79],"button":0},
    {"type":"mouseup","ts":49644,"target":"#tool-1021/img","xy":[1283,79],"button":0},
    {"type":"click","ts":49644,"target":"#tool-1021/img","xy":[1283,79],"button":0},
    {"type":"mousedown","ts":51985,"target":"#tool-1024/img","xy":[1301,79],"button":0},
    {"type":"mouseup","ts":52086,"target":"#tool-1024/img","xy":[1301,79],"button":0},
    {"type":"click","ts":52086,"target":"#tool-1024/img","xy":[1301,79],"button":0},
    {"type":"mousedown","ts":54977,"target":"#tool-1021/img","xy":[1283,81],"button":0},
    {"type":"mouseup","ts":55033,"target":"#tool-1021/img","xy":[1283,81],"button":0},
    {"type":"click","ts":55033,"target":"#tool-1021/img","xy":[1283,81],"button":0},
    {"type":"mousedown","ts":57295,"target":"#tool-1024/img","xy":[1304,81],"button":0},
    {"type":"mouseup","ts":57385,"target":"#tool-1024/img","xy":[1304,81],"button":0},
    {"type":"click","ts":57385,"target":"#tool-1024/img","xy":[1304,81],"button":0},
    {"type":"mousedown","ts":59342,"target":"#tool-1018/img","xy":[1315,31],"button":0},
    {"type":"mouseup","ts":59466,"target":"#tool-1018/img","xy":[1315,31],"button":0},
    {"type":"click","ts":59466,"target":"#tool-1018/img","xy":[1315,31],"button":0},
    {"type":"mousedown","ts":61041,"target":"#tool-1018/img","xy":[1315,31],"button":0},
    {"type":"mouseup","ts":61175,"target":"#tool-1018/img","xy":[1315,31],"button":0},
    {"type":"click","ts":61176,"target":"#tool-1018/img","xy":[1315,31],"button":0},
    {"type":"mousedown","ts":63123,"target":"#tool-1024/img","xy":[1299,76],"button":0},
    {"type":"mouseup","ts":63189,"target":"#tool-1024/img","xy":[1299,76],"button":0},
    {"type":"click","ts":63190,"target":"#tool-1024/img","xy":[1299,76],"button":0},
    {"type":"mousedown","ts":64505,"target":"#tool-1021/img","xy":[1282,80],"button":0},
    {"type":"mouseup","ts":64584,"target":"#tool-1021/img","xy":[1282,80],"button":0},
    {"type":"click","ts":64585,"target":"#tool-1021/img","xy":[1282,80],"button":0},
    {"type":"mousedown","ts":66981,"target":"#tool-1024/img","xy":[1301,81],"button":0},
    {"type":"mouseup","ts":67059,"target":"#tool-1024/img","xy":[1301,81],"button":0},
    {"type":"click","ts":67059,"target":"#tool-1024/img","xy":[1301,81],"button":0}
];

