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
        var accountView = Ext.getCmp('accountView');
        var activeItem = accountView.getActiveItem();
        if (!activeItem) {

            var accountList = this.render({
                xtype: 'cashCatAccountList',
                store: this.cacheStore
            });

            accountList.on('itemdoubletap', this.loadAccount, this);
            accountList.on('itemswipe', this.deleteAccount, this);

            this.accountList = accountList;

            accountView.setActiveItem(accountList, 'slide');
        }

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
                        Ext.getCmp('accountView').enableUpBtn();
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
            Ext.getCmp('accountView').disableUpBtn();
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
    edit: function(options) {
        console.log("edit account: %o", options.selectedRecord);

    },
    create: function(options){
        var selectedRecords = this.accountList.getSelectedRecords();
        var parent = this.accountParent;
        if (selectedRecords && selectedRecords.length > 0) {
            parent = selectedRecords[0].getId();
        }

        console.log('parent: %o', parent);
    }
};
Ext.regController("account", accountController);
