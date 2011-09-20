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
    multiSelect: true,
    indexBar: {
        dock    : 'right',
        overlay : true,
        alphabet: false
    },
    fullscreen: true,
    loadingText: msg.prop('Loading Accounts...'),
    grouped: false,
    itemTpl: '<span class="account-code">{code}</span> <span class="account-name">{name}</span>',
    constructor: function(config) {
        this.mode = config.mode;
        cashCat.views.AccountList.superclass.constructor.call(this, config);
    },
    initComponent: function() {
        cashCat.views.AccountList.superclass.initComponent.apply(this, arguments);
    },
    afterRender: function() {
        cashCat.views.AccountList.superclass.afterRender.call(this);

        this.mon(this.el, 'taphold', this.onTapHold, this);
    },
    onTapHold: function(e) {
        var item = this.findItemByChild(e.getTarget());
        var record = this.getRecord(item);

        Ext.dispatch({
            controller: 'account',
            action: 'edit',
            historyUrl: 'account/index',
            selectedRecord: record
        });
    }
});
Ext.reg('cashCatAccountList', cashCat.views.AccountList);

cashCat.views.AccountListPanel = Ext.extend(Ext.Panel, {
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
    initComponent: function() {
        var modeBtn = new Ext.Button({
            text: msg.prop('Edit Mode'),
            ui: 'action',
            mode: 'view',
            handler: function(btn, event) {
                if (this.mode == 'view') {
                    this.mode = 'edit';
                    this.setText(msg.prop('View Model'));
                } else {
                    this.mode = 'view';
                    this.setText(msg.prop('Edit Model'));
                }

                Ext.dispatch({
                    controller: 'account',
                    action: 'switchMode',
                    historyUrl: 'account/index',
                    mode: this.mode
                });
            }
        });
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
                        modeBtn
                    ]
                }
            ],
            items: [
            ]
        });

        cashCat.views.AccountListPanel.superclass.initComponent.apply(this, arguments);
    }
});
Ext.reg('cashCatAccountListPanel', cashCat.views.AccountListPanel);

cashCat.views.Account = Ext.extend(Ext.Panel, {
    id: 'accountView',
    fullscreen: true,
    layout: {
        type: 'card',
        align: 'stretch',
        pack: 'center'
    },
    constructor: function(config) {

        cashCat.views.Account.superclass.constructor.call(this, config);
    },
    initComponent: function() {

        cashCat.views.Account.superclass.initComponent.apply(this, arguments);
    }
});

Ext.reg('cashCatAccount', cashCat.views.Account);

cashCat.views.AccountEditor = Ext.extend(Ext.form.FormPanel, {
    initComponent: function() {
        Ext.apply(this, {
            title: msg.prop("Account Info"),
            fullscreen: false,
            id: 'accountEditForm',
            scroll: 'vertical',
            defaults:{
                labelAlign: 'left',
                labelWidth: '35%'
            },
            dockedItems: [
                {
                    dock: 'top',
                    xtype: 'toolbar',
                    title: msg.prop('Account Info')
                }
            ],
            items:[
                {
                    xtype: 'selectfield',
                    name: 'parent',
                    label: msg.prop('Parent'),
                    placeHolder: msg.prop('Parent Account'),
                    required: true,
                    useClearIcon: true,
                    options: [
                        {
                            text: msg.prop('Asset'),
                            value: 'asset'
                        }
                    ]
                },
                {
                    xtype: 'selectfield',
                    name: 'type',
                    label: msg.prop('Type'),
                    placeHolder: msg.prop('Account Type'),
                    required: true,
                    useClearIcon: true,
                    options: [
                        {
                            text: msg.prop('Asset'),
                            value: 'asset'
                        }
                    ]
                },
                {
                    xtype: 'textfield',
                    name: 'name',
                    label: msg.prop('Name'),
                    placeHolder: msg.prop('Account Name'),
                    autoCapitalize: true,
                    required: true,
                    useClearIcon: true
                },
                {
                    xtype: 'textfield',
                    name: 'code',
                    label: msg.prop('Code'),
                    placeHolder: msg.prop('Account Code'),
                    required: true,
                    useClearIcon: true
                },
                {
                    xtype: 'textfield',
                    name: 'description',
                    label: msg.prop('Description'),
                    placeHolder: msg.prop('Account Description'),
                    required: false,
                    useClearIcon: true
                },
                {
                    xtype: 'selectfield',
                    name: 'currency',
                    label: msg.prop('Currency'),
                    placeHolder: msg.prop('Account Currency'),
                    required: true,
                    useClearIcon: true,
                    options: [
                        {
                            text: msg.prop('CNY'),
                            value: 'cny'
                        }
                    ]
                },
                {
                    xtype: 'selectfield',
                    name: 'color',
                    label: msg.prop('Color'),
                    placeHolder: msg.prop('Account Color'),
                    required: false,
                    useClearIcon: true,
                    options: [
                        {
                            text: msg.prop('Normal'),
                            value: 'normal'
                        },
                        {
                            text: msg.prop('Red'),
                            value: 'red'
                        }
                    ]
                },
                {
                    xtype: 'togglefield',
                    name: 'editable',
                    label: msg.prop('Editable'),
                    placeHolder: msg.prop('Is account editable?'),
                    useClearIcon: true
                },
                {
                    xtype: 'togglefield',
                    name: 'visible',
                    label: msg.prop('Visible'),
                    placeHolder: msg.prop('Is account visible?'),
                    useClearIcon: true
                },
                {
                    xtype: 'textareafield',
                    name: 'memo',
                    label: msg.prop('Memo'),
                    placeHolder: msg.prop('Memo info'),
                    required: false,
                    useClearIcon: true
                }
            ]
        });
        cashCat.views.AccountEditor.superclass.initComponent.apply(this, arguments);
    }
});
Ext.reg('accountEditor', cashCat.views.AccountEditor);