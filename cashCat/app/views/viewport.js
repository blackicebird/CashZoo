/**
 * Copyright (c) Li Guoqiang
 * Author: Leon Lee
 * Date: 11-9-8
 * Time: 下午5:50
 * Email: mail.lgq@gmail.com
 */

cashCat.views.Viewport = Ext.extend(Ext.TabPanel, {
    id: 'viewport',
    fullscreen: true,
    sortable: false,
    cardSwitchAnimation: {
        type: 'slide',
        cover: false,
        duration: 550,
        delay: 100
    },
    defaults: {
        scroll: 'vertical'
    },
    tabBar: {
        dock: 'bottom',
        layout: {pack: 'center'}
    },
    constructor: function(config) {
        this.topExpenseData = config.topExpenseData;
        this.monthData = config.monthData;
        this.accountData = config.accountData;
        
        cashCat.views.App.superclass.constructor.call(this, config);
    },
    initComponent: function() {
        Ext.apply(this, {
            items: [
                {
                    title: msg['home'],
                    xtype: 'cashCatHome',
                    iconCls: 'home',
                    topExpenseData: this.topExpenseData,
                    monthData: this.monthData,
                    accountData: this.accountData
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