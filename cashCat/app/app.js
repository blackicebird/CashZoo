Ext.regApplication(({
    name: 'cashCat',
    launch: function() {
        this.initCashCatData();
        Ext.dispatch({
            controller: 'home',
            action: 'index'
        });
    },
    initCashCatData: function() {
        var accountStore = new Ext.data.Store({
            model: "Account",
            storeId: "accountStore"
        });

        var assetAccount = accountStore.findRecord("name", "Asset");
        if (!assetAccount) {
            assetAccount = Ext.ModelMgr.create({name: "Asset", type:"Asset", code:"100"}, 'Account');
            assetAccount.save();
        }
    }
}));

cashCat.dbName = "CashCat";