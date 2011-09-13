/*

This file is part of Ext JS 4

Copyright (c) 2011 Sencha Inc

Contact:  http://www.sencha.com/contact

Commercial Usage
Licensees holding valid commercial licenses may use this file in accordance with the Commercial Software License Agreement provided with the Software or, alternatively, in accordance with the terms contained in a written agreement between you and Sencha.

If you are unsure which license is appropriate for your use, please contact the sales department at http://www.sencha.com/contact.

*/
Ext.require(['*']);

function getTreeData () {
    return {
        expanded: true,
        children: [
            {
                text: "To Do",
                cls: "folder",
                expanded: true,
                children: [
                    { text: "Go jogging", leaf: true, checked: true },
                    { text: "Take a nap", leaf: true, checked: false },
                    { text: "Climb Everest", leaf: true, checked: false }
                ]
            },
            {
                text: "Grocery List",
                cls: "folder",
                expanded: true,
                children: [
                    { text: "Bananas", leaf: true, checked: false },
                    { text: "Milk", leaf: true, checked: false },
                    { text: "Cereal", leaf: true, checked: false },
                    {
                        text: "Energy foods",
                        cls: "folder",
                        expanded: true,
                        children: [
                            { text: "Coffee", leaf: true, checked: false },
                            { text: "Red Bull", leaf: true, checked: false }
                        ]
                    }
                ]
            },
            {
                text: "Remodel Project",
                cls: "folder",
                expanded: true,
                children: [
                    { text: "Finish the budget proposal and send copies", leaf: true, checked: false },
                    { text: "Call contractors", leaf: true, checked: false },
                    { text: "Choose design", leaf: true, checked: false }
                ]
            }
        ]
    };
}

Ext.onReady(function() {

    function makeTree (config) {
        return Ext.create('Ext.tree.Panel', Ext.apply({
            rootVisible: false,
            title: 'Check Tree',
            root: getTreeData()
        }, config));
    }

    var panel = Ext.ComponentManager.create({
        xtype: 'window',
        title: 'Tree accordion Window',
        autoShow: true,
        width: 200,
        height: 400,
        renderTo: Ext.getBody(),
        layout: 'accordion',
        items: [
            makeTree({ title: 'Tree B' }),
            { title: 'Ignore me', html: '&#160;' },
            makeTree({ title: 'Tree C'}),
            { title: 'Ignore me 2', html: '&#160;' },
            { title: 'Ignore me 3', html: '&#160;' }
        ]
    });

    var tree = Ext.ComponentManager.create({
        xtype: 'window',
        title: 'Tree fit to Window',
        autoShow: true,
        collapsible: true,
        width: 200,
        height: 300,
        x: 240,
        y: 300,
        renderTo: Ext.getBody(),
        layout: 'fit',
        items: [
            makeTree({ title: 'Tree A', border: false })
        ]
    });
});

Ext.onReady(function() {

    // TREE
    var tree = Ext.create('Ext.tree.Panel', {
        root: getTreeData(),
        rootVisible: false,
        title: 'Tree X',
        width: 200,
        height: 250
    });

    // VIEWPORT
    var viewport = Ext.create('Ext.Viewport', {
        id: 'border-example',
        layout: 'border',
        items: [{
            xtype: 'tabpanel',
            region: 'east',
            title: 'East Side',
            dockedItems: [{
                dock: 'top',
                xtype: 'toolbar',
                items: [ '->', {
                   xtype: 'button',
                   text: 'test',
                   tooltip: 'Test Button'
                }]
            }],
            animCollapse: true,
            collapsible: true,
            split: true,
            width: 225,
            minSize: 175,
            maxSize: 400,
            activeTab: 1,
            tabPosition: 'bottom',
            items: [{
                html: '<p>A TabPanel component can be a region.</p>',
                title: 'A Tab',
                autoScroll: true
            }]
        }, {
            region: 'west',
            id: 'west-panel',
            title: 'West',
            split: true,
            width: 200,
            minWidth: 175,
            maxWidth: 400,
            collapsible: true,
            animCollapse: true,
            margins: '0 0 0 5',
            layout: 'accordion',
            items: [

            // Start Comment
            {
                //contentEl: 'west',
                title: 'Navigation',
                iconCls: 'nav'
            }, {
                title: 'Settings',
                html: '<p>Some settings in here.</p>',
                iconCls: 'settings'
            }, {
                title: 'Information',
                html: '<p>Some info in here.</p>',
                iconCls: 'info'
            }
        // End Comment
        ]
        },{
            region: 'center',
            xtype: 'tabpanel',
            deferredRender: false,
            activeTab: 0,
            items: [{
                title: 'Center Panel',
                bodyPadding: 8,
                html: [
                    '<h1>Tree A:</h1>',
                    '<ul>',
                        '<li>Grow vertical does not properly remove vscroll</li>',
                        '<li>Then grow horizontal and now vscroll is gone (correct)</li>',
                        '<li>Shrink vertical and vscroll will not come back</li>',
                        '<li>Grow horizontal and now vscroll is back (correct)</li>',
                        '<li>No horizontal scroll, but "..." in Chrome 11, clipped text in FF3</li>',
                        '<li>Grow horizonal likewise does not change "..." or lack of scroolbar</li>',
                    '</ul><br>',
                    '<h1>Tree B:</h1>',
                    '<ul>',
                        '<li>Vertical scroll in Chrome 11, not in FF3</li>',
                        '<li>No horizontal scroll, but "..." in Chrome 11, clipped text in FF3</li>',
                        '<li>Chrome 11: grow vertical never removes vscroll</li>',
                        '<li>Grow horizonal likewise does not change "..." or lack of scroolbar</li>',
                    '</ul><br>',
                    '<h1>Tree C:</h1>',
                    '<ul>',
                        '<li>No vertical scroll</li>',
                        '<li>No horizontal scroll, but "..." in Chrome 11, clipped text in FF3</li>',
                    '</ul><br>',
                    '<h1>Tree X:</h1>',
                    '<ul>',
                        '<li>Wrong width when expanded in accordion</li>',
                    '</ul>'
                ].join('')
            }]
        }]
    });

    Ext.getCmp('west-panel').add(tree);
});

