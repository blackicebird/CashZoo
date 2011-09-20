/**
 * Copyright (c) Li Guoqiang
 * Author: Leon Lee
 * Date: 11-9-8
 * Time: 下午7:30
 * Email: mail.lgq@gmail.com
 */
var accountController = {
    accountParent: 0,
    cache: {
        accounts: []
    },
    cacheStore:  new Ext.data.JsonStore({
        model: 'Account',
        data: [],
        getGroupString : function(record) {
            return record.get('type');
        }
    }),
    accountStore: new Ext.data.Store({
        model: 'Account',
        sorters: 'code',
        listeners: {

        }
    }),
    index: function() {
        this.viewport = Ext.getCmp('viewport');
        this.accountView = Ext.getCmp('accountView');

        if (!this.accountList) {
            this.accountList = this.render({
                mode: 'view',
                xtype: 'cashCatAccountList',
                store: this.cacheStore
            });

            this.enableViewEvent();
        }
        if (!this.accountListPanel) {
            this.accountListPanel = this.render({
                xtype: 'cashCatAccountListPanel'
            });
            this.accountListPanel.setActiveItem(this.accountList);
        }

        this.accountView.setActiveItem(this.accountListPanel, 'slide');
        this.loadAccount();
    },
    loadAccount: function(list, index, item, event) {
        var accountParent = this.accountParent;
        if (list && item) {
            accountParent = list.getRecord(item).data.code;
        }
        this.accountStore.clearFilter(true);
        this.accountStore.filter('parent', accountParent);
        this.accountStore.load({
            scope: this,
            callback: function(records, operation, success) {
                if (success) {
                    var accounts = this.accountStore.data.items;
                    if (accounts.length != 0) {
                        this.cache.accounts = accounts;
                        this.accountParent = accountParent;
                    } else {
                        console.log("no children");
                        if (this.cache.accounts.length == 0) {
                            this.calcParent();
                            return this.loadAccount();
                        } else {
                            return;
                        }
                    }

                    console.log("cache: %o", this.cache);
                    this.cacheStore.loadData(this.cache.accounts, false);

                    if (this.accountParent != 0) {
                        this.accountListPanel.enableUpBtn();
                    }
                } else {
                    console.log("can't load accounts");
                }

            }
        });
    },
    back: function() {
        this.calcParent();

        if (this.accountParent == 0) {
            this.accountListPanel.disableUpBtn();
        }

        this.loadAccount();
    },
    calcParent: function() {
        switch (true) {
            case this.accountParent == 0:
                break;
            case this.accountParent % 100 != 0:
                this.accountParent = this.accountParent - this.accountParent % 100;
                break;
            case this.accountParent % 1000 != 0:
                this.accountParent = this.accountParent - this.accountParent % 1000;
                break;
            case this.accountParent % 10000 != 0:
                this.accountParent = this.accountParent - this.accountParent % 10000;
                break;
            default:
                this.accountParent = 0;
        }
    },
    deleteAccount: function(list, index, item, event) {
        Ext.Msg.confirm(msg.prop('Delete Account'), msg.prop('Do you want to delete this Account?'), function(btn) {
            if ('yes' == btn) {
                if (list && item) {
                    var record = list.getRecord(item);
                    this.accountStore.remove(record);
                    this.accountStore.sync();
                }
                console.log("deleted item: %o", index);
                this.loadAccount();
            }
        }, this);
    },
    edit: function() {
        var account = this.accountList.getSelectedRecords();
        console.log("edit account: %o", account);

        if (!this.accountEditor) {
            this.accountEditor = new cashCat.views.AccountEditor();

            if (!this.accountEditorToolbar) {
                this.initAccountEditorToolbar();
                this.accountEditor.addDocked(this.accountEditorToolbar);
            }
        }
        this.accountEditor.load(account);
        this.accountView.setActiveItem(this.accountEditor);
    },
    create: function(options) {
        var selectedRecords = this.accountList.getSelectedRecords();
        var parent = this.accountParent;
        if (selectedRecords && selectedRecords.length > 0) {
            parent = selectedRecords[0].getId();
        }

        console.log('parent: %o', parent);
    },
    switchMode: function(options) {
        console.log("mode: %s", options.mode);
        var mode = options.mode;

        if (!this.accountListToolbar) {
            this.initAccountListToolbar();
        }

        if (mode == 'edit') {
            this.accountList.addCls('account-list-edit');
            this.accountListPanel.addDocked(this.accountListToolbar);
            this.disableViewEvent();
            this.enableEditEvent();
            this.accountList.getSelectionModel().select(0);
        } else {
            this.accountList.removeCls('account-list-edit');
            this.accountListPanel.removeDocked(this.accountListToolbar, false);
            this.disableEditEvent();
            this.enableViewEvent();
            this.accountList.getSelectionModel().deselect(this.accountList.getSelectedRecords());
        }
    },
    initAccountListToolbar: function() {
        var editBtn = new Ext.Button({
            text: msg.prop('Edit')
        });
        editBtn.on("tap", function(btn, event) {
            Ext.dispatch({
                controller: 'account',
                action: 'edit',
                historyUrl: 'account/index'
            });
        });
        this.accountListToolbar = new Ext.Toolbar({
                dock: 'bottom',
                xtype: 'toolbar',
                ui: 'light',
                items:[
                    {
                        xtype: 'spacer'
                    },
                    editBtn
                    ,
                    {
                        text: msg.prop('Delete')
                    },
                    {
                        text: msg.prop('Create')
                    },
                    {
                        text: msg.prop('Create Sub Account')
                    },
                    {
                        xtype: 'spacer'
                    }
                ]
            }
        );
    },
    disableViewEvent :function () {
        this.accountList.un('itemtap', this.loadAccount, this);
    },
    enableEditEvent: function() {

    },
    disableEditEvent: function() {

    },
    enableViewEvent: function() {
        this.accountList.on('itemtap', this.loadAccount, this);
    },
    initAccountEditorToolbar :function() {
        var saveBtn = new Ext.Button({
            text: msg.prop('Save')
        });
        saveBtn.on('tap', function() {
            this.accountView.setActiveItem(this.accountListPanel);
        }, this);

        var cancelBtn = new Ext.Button({
            text: msg.prop('Cancel')
        });
        cancelBtn.on('tap', function() {
            this.accountView.setActiveItem(this.accountListPanel);
        }, this);

        this.accountEditorToolbar = new Ext.Toolbar({
            dock: 'bottom',
            ui: 'light',
            items: [
                {
                    xtype: 'spacer'
                },
                saveBtn,
                cancelBtn,
                {
                    xtype: 'spacer'
                }
            ]
        });
    }
};
Ext.regController("account", accountController);
