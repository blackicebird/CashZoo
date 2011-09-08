/**
 * Copyright (c) Li Guoqiang
 * Author: Leon Lee
 * Date: 11-9-8
 * Time: 上午10:18
 * Email: mail.lgq@gmail.com
 */

cashCat.views.AccountList = Ext.extend(Ext.List, {
    displayField: 'name',
    pinHeaders:true,
    indexBar: {
        dock    : 'right',
        overlay : true,
        alphabet: false
    },
    fullscreen: true,
    loadingText: msg.prop('Loading Accounts...'),
    grouped: true,
    itemTpl: '<span class="account-code">{code}</span> <span class="account-name">{name}</span>',
    initComponent: function() {
        var store = new Ext.data.Store({
            model: 'Account',
            sorters: 'code',
            getGroupString : function(record) {
                return record.get('type');
            }
        });
        store.load();
        Ext.apply(this, {
            store: store
        });
        cashCat.views.AccountList.superclass.initComponent.apply(this, arguments);
    }
});
Ext.reg('cashCatAccountList', cashCat.views.AccountList);
cashCat.views.Account = Ext.extend(Ext.Panel, {
    fullscreen: true,
    layout: {
        type: 'vbox',
        align: 'stretch',
        pack: 'center'
    },
    constructor: function(config) {
        this.appPanel = config.appPanel;
        cashCat.views.Account.superclass.constructor.call(this, config);
    },
    initComponent: function() {
        var accountList = new cashCat.views.AccountList();
        Ext.apply(this, {
            dockedItems: [
                {
                    dock: 'top',
                    xtype: 'toolbar',
                    title: msg.prop('account'),
                    items:[
                        {
                            text: msg.prop('back'),
                            ui: 'back',
                            handler: function(btn, event) {
                                cashCat.mq.fireEvent('back');
                            }
                        }
                    ]
                }
            ],
            items: [
                accountList
            ]
        });
        accountList.show();
        accountList.on('itemtap', function() {
        });
        cashCat.views.Account.superclass.initComponent.apply(this, arguments);
    }
});

Ext.reg('cashCatAccount', cashCat.views.Account);