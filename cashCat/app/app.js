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
        
    }
}));

cashCat.dbName = "CashCat";