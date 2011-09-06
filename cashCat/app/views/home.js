cashCat.views.Home = Ext.extend(Ext.Panel, {
    fullscreen: true,

    dockedItems: [
        {
            dock : 'top',
            xtype: 'toolbar',
            title: 'Standard Titlebar'
        },
        {
            dock : 'top',
            xtype: 'toolbar',
            ui   : 'light',
            items: [
                {
                    text: 'Test Button'
                }
            ]
        }
    ],

    html: 'Testing'
});

Ext.reg('cashCatHome', cashCat.views.Home);