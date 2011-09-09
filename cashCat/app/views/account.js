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
    grouped: false,
    itemTpl: '<span class="account-code">{code}</span> <span class="account-name">{name}</span>',
    initComponent: function() {
        cashCat.views.AccountList.superclass.initComponent.apply(this, arguments);
    }
});
Ext.reg('cashCatAccountList', cashCat.views.AccountList);

cashCat.views.Account = Ext.extend(Ext.Panel, {
    id: 'accountView',
    fullscreen: true,
    layout: {
        type: 'card',
        align: 'stretch',
        pack: 'center'
    },
    upBtn : new Ext.Button({
        text: msg.prop('Up Level'),
        ui: 'action',
        disabled: true,
        handler: function(btn, event) {
            Ext.dispatch({
                controller: "account",
                action: "back"
            });
        }
    }),
    disableUpBtn: function() {
        this.upBtn.disable(true);
    },
    enableUpBtn: function() {
        this.upBtn.enable(true);
    },
    constructor: function(config) {
        this.appPanel = config.appPanel;
        cashCat.views.Account.superclass.constructor.call(this, config);
    },
    initComponent: function() {
        Ext.apply(this, {
            dockedItems: [
                {
                    dock: 'top',
                    xtype: 'toolbar',
                    title: msg.prop('account'),
                    items:[
                        this.upBtn
                        ,
                        {
                            xtype: 'spacer'
                        },
                        {
                            text: msg.prop('Create'),
                            ui: 'action',
                            handler: function(btn, event) {
                                Ext.dispatch({
                                   controller: 'account',
                                    action: 'create',
                                    historyUrl: 'account/index'
                                });
                            }
                        }
                    ]
                }
            ],
            items: [
            ]
        });
        cashCat.views.Account.superclass.initComponent.apply(this, arguments);
    }
});

Ext.reg('cashCatAccount', cashCat.views.Account);