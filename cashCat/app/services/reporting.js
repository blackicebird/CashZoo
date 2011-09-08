/**
 * Copyright (c) Li Guoqiang
 * Author: Leon Lee
 * Date: 11-9-8
 * Time: 下午5:54
 * Email: mail.lgq@gmail.com
 */
Ext.ns("cashCat.services");
cashCat.services.reportService = {
    analyseTopExpense: function(num) {
        return "expense";
    },
    analyseMonthly: function(date) {
        return 'month';
    },
    analyseAccount: function(date) {
        return 'account';
    }
};