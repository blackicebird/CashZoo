Ext.regApplication(({
    name: 'cashCat',
    launch: function() {
        Ext.dispatch({
            controller: 'home',
            action: 'index'
        });
    }
}));

cashCat.dbName = "CashCat";