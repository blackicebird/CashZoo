Ext.regController("home", {
    reportService : cashCat.services.reportService,
    index: function() {
        var reportService = cashCat.services.reportService;

        var topExpenseData = reportService.analyseTopExpense(5);
        var monthData = reportService.analyseMonthly(new Date());
        var accountData = reportService.analyseAccount(new Date());

        this.viewport = this.render(new cashCat.views.Viewport({
            topExpenseData: topExpenseData,
            monthData: monthData,
            accountData: accountData
        }));
        this.viewport.on('beforecardswitch', this.onTabChange);
    },
    refresh: function() {
        var topExpenseData = this.reportService.analyseTopExpense(5);
        var monthData = this.reportService.analyseMonthly(new Date());
        var accountData = this.reportService.analyseAccount(new Date());

    },
    onTabChange: function(panel, newCard, oldCard, index, animated) {
        switch (newCard.xtype) {
            case 'cashCatHome':
                Ext.dispatch({
                    controller: "home",
                    action    : "refresh",
                    historyUrl: "home/refresh"
                });
                break;
            case 'cashCatAccount':
                Ext.dispatch({
                    controller: "account",
                    action: "index",
                    historyUrl: "home/refresh"
                });
                break;
            default:
        }
    }
});