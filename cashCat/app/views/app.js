cashCat.views.App = Ext.extend(Ext.TabPanel, {
    fullscreen: true,
    sortable: true,
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
    constructor: function(config) {
        var self = this;
        cashCat.mq.addListener('back', function(prev) {
            self.setActiveItem(this.prevCard, {
                type: 'slide',
                reverse: true,
                scope: this
            });

        });
        cashCat.views.App.superclass.constructor.call(this, config);
    },
    initComponent: function() {
        Ext.apply(this, {
            items: [
                {
                    title: msg['home'],
                    xtype: 'cashCatHome',
                    iconCls: 'home'
                },
                {
                    title: msg['account'],
                    xtype: 'cashCatAccount',
                    iconCls: 'star',
                    appPanel: this
                },
                {
                    title: msg['ledger'],
                    html: '<h1>General ledger</h1>',
                    iconCls: 'bookmarks'
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