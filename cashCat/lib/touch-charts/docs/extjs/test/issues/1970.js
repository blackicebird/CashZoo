/*

This file is part of Ext JS 4

Copyright (c) 2011 Sencha Inc

Contact:  http://www.sencha.com/contact

Commercial Usage
Licensees holding valid commercial licenses may use this file in accordance with the Commercial Software License Agreement provided with the Software or, alternatively, in accordance with the terms contained in a written agreement between you and Sencha.

If you are unsure which license is appropriate for your use, please contact the sales department at http://www.sencha.com/contact.

*/
Ext.require('*');

Ext.onReady(function(){
    function cell (text, cs, rs) {
        var ret = { html: text };
        if (cs) {
            ret.colspan = cs;
        }
        if (rs) {
            ret.rowspan = rs;
        }
        return ret;
    }

    Ext.create('Ext.window.Window', {
        autoShow: true,
        renderTo: Ext.getBody(),
        width: 200,
        height: 150,
        x: 20, y: 20,
        layout: 'fit',
        items: [{
            border: false,
            layout: {
                type: 'table',
                columns: 3,
                tableAttrs: {
                    style: {
                        width: '100%',
                        height: '100%'
                    }
                },
                tdAttrs: {
                    valign: 'middle',
                    style: 'border: 1px solid blue; text-align: center;'
                }
            },
            defaultType: 'component',
            /*
                    0   1   2   3
                  +---+---+---+
                0 | A |       |
                  +---+   B   |
                1 | C |       |
                  +---+---+---+
                2 | D | E | F |
                  +---+---+---+
             */
            items: [
                cell('A'), cell('B', 2, 2),
                cell('C'),
                cell('D'), cell('E'), cell('F')
            ]
        }]
    });

    Ext.create('Ext.window.Window', {
        autoShow: true,
        renderTo: Ext.getBody(),
        width: 200,
        height: 150,
        x: 250, y: 20,
        layout: 'fit',
        items: [{
            border: false,
            layout: {
                type: 'table',
                columns: 3,
                tableAttrs: {
                    style: {
                        width: '100%',
                        height: '100%'
                    }
                },
                tdAttrs: {
                    valign: 'middle',
                    style: 'border: 1px solid blue; text-align: center;'
                }
            },
            defaultType: 'component',
            /*
                        0        1        2
                    +--------+-----------------+
                  0 |   A    |   B             |
                    |        |--------+--------|
                  1 |        |   C    |   D    |
                    +--------+--------+--------+
             */
            items: [
                cell('A', 0, 2), cell('B', 2),
                cell('C'), cell('D')
            ]
        }]
    });

    Ext.create('Ext.window.Window', {
        autoShow: true,
        renderTo: Ext.getBody(),
        width: 200,
        height: 150,
        x: 20, y: 200,
        layout: 'fit',
        items: [{
            border: false,
            layout: {
                type: 'table',
                columns: 4,
                tableAttrs: {
                    style: {
                        width: '100%',
                        height: '100%'
                    }
                },
                tdAttrs: {
                    valign: 'middle',
                    style: 'border: 1px solid blue; text-align: center;'
                }
            },
            defaultType: 'component',
            /*
                      0   1   2   3
                    +---+---+---+---+
                  0 | A | B | C | D |
                    +---+---+---+---+
                  1 | E |       | G |
                    +---+   F   +---+
                  2 | H |       | I |
                    +---+---+---+---+
                  3 | J | K | L | M |
                    +---+---+---+---+
             */
            items: [
                cell('A'), cell('B'), cell('C'), cell('D'),
                cell('E'), cell('F', 2, 2), cell('G'),
                cell('H'), cell('I'),
                cell('J'), cell('K'), cell('L'), cell('M')
            ]
        }]
    });

    Ext.create('Ext.window.Window', {
        autoShow: true,
        renderTo: Ext.getBody(),
        width: 200,
        height: 150,
        x: 250, y: 200,
        layout: 'fit',
        items: [{
            border: false,
            layout: {
                type: 'table',
                columns: 4,
                tableAttrs: {
                    style: {
                        width: '100%',
                        height: '100%'
                    }
                },
                tdAttrs: {
                    valign: 'middle',
                    style: 'border: 1px solid blue; text-align: center;'
                }
            },
            defaultType: 'component',
            /*
                      0   1   2   3
                    +---+---+---+---+
                  0 |   A   | B | C |
                    +---+---+---+---+
                  1 |       | E |   |
                    +   D   |---+ F |
                  2 |       |   |   |
                    +-------+ G +---+
                  3 | H | I |   | J |
                    +---+---+---+---+
             */
            items: [
                cell('A', 2),    cell('B'), cell('C'),
                cell('D', 2, 2), cell('E'), cell('F', 0, 2),
                cell('G', 0, 2),
                cell('H'), cell('I'), cell('J')
            ]
        }]
    });

    Ext.create('Ext.window.Window', {
        autoShow: true,
        renderTo: Ext.getBody(),
        width: 200,
        height: 150,
        x: 20, y: 380,
        layout: 'fit',
        items: [{
            border: false,
            layout: {
                type: 'table',
                columns: 4,
                tableAttrs: {
                    style: {
                        width: '100%',
                        height: '100%'
                    }
                },
                tdAttrs: {
                    valign: 'middle',
                    style: 'border: 1px solid blue; text-align: center;'
                }
            },
            defaultType: 'component',
            /*
                      0   1   2   3
                    +---+---+---+---+
                  0 |   A   | B |   |
                    +---+---+---+ C +
                  1 |       | E |   |
                    +   D   |---+---+
                  2 |       |       |
                    +-------+   F   +
                  3 | G | H |       |
                    +---+---+---+---+
             */
            items: [
                cell('A', 2),    cell('B'), cell('C', 0, 2),
                cell('D', 2, 2), cell('E'),
                cell('F', 2, 2),
                cell('G'), cell('H')
            ]
        }]
    });
});

