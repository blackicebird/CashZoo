/*

This file is part of Ext JS 4

Copyright (c) 2011 Sencha Inc

Contact:  http://www.sencha.com/contact

Commercial Usage
Licensees holding valid commercial licenses may use this file in accordance with the Commercial Software License Agreement provided with the Software or, alternatively, in accordance with the terms contained in a written agreement between you and Sencha.

If you are unsure which license is appropriate for your use, please contact the sales department at http://www.sencha.com/contact.

*/
Ext.require(['*']);
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

    Ext.create('Ext.container.Viewport', {
        layout: 'anchor',
        items: [
            {
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
                                        xtype: 'panel',
                                        html: 'FooBar<br>Item #' + n
                                    });

                                    panel.setTitle('Panel Y - ' + n);
                                    takeStep();
                                }
                            }
                        ]
                    }
                ]
            },
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
            }
        ]
    }); // viewport
});

