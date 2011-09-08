Ext.regController("home", {
    reportService : cashCat.services.reportService,
    index: function() {

        var topExpenseData = this.reportService.analyseTopExpense(5);
        var monthData = this.reportService.analyseMonthly(new Date());
        var accountData = this.reportService.analyseAccount(new Date());

    },
    refresh: function() {
        var topExpenseData = this.reportService.analyseTopExpense(5);
        var monthData = this.reportService.analyseMonthly(new Date());
        var accountData = this.reportService.analyseAccount(new Date());

        
    }
});