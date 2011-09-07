cashCat.views.App = Ext.extend(Ext.TabPanel, {
    fullscreen: true,
    cardSwitchAnimation: {
        type: 'slide',
        cover: true
    },
    defaults: {
        scroll: 'vertical'
    },
    tabBar: {
        dock: 'bottom',
        layout: {pack: 'center'}
    },
    initComponent: function() {
        Ext.apply(this, {
            items: [
                {
                    title: msg['home'],
                    xtype: 'cashCatHome',
                    iconCls: 'home',
                    labelCls: "cc-tab-title"
                },
                {
                    title: msg['ledger'],
                    html: '<h1>General ledger</h1>',
                    iconCls: 'bookmarks'
                },
                {
                    title: msg['account'],
                    html: '<h1>Account</h1>',
                    iconCls: 'star'
                },
                {
                    title: msg['report'],
                    html: '<h1>Report</h1>',
                    iconCls: 'search'
                }
            ]
        });
        cashCat.views.App.superclass.initComponent.apply(this, arguments);
    }
});

Ext.reg('cashCatApp', cashCat.views.App);