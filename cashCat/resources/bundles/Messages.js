var lang = navigator.userLanguage ? navigator.userLanguage : navigator.language ? navigator.language : 'en';
console.log('language: %s', lang);

switch (lang) {
    case 'en':
        window.msg = enMsg();
        break;
    case 'zh-CN':
        window.msg = zhMsg();
        break;
    default:
        window.msg = zhMsg();
}

window.msg.prop = function(name) {
    if (window.msg[name])
        return window.msg[name];
    else
        return name;
};

function enMsg() {
    return {
        home: 'Home',
        ledger: 'GL',
        account: 'Account',
        report: 'Report',
        cashCat: 'CashCat',
        close: 'Close',
        settings: 'Settings',
        income: 'Income',
        expense: 'Expenses',
        debit: 'Debit',
        credit: 'Credit',
        transfer: 'Transfer',
        monthStatistic: 'Month Statistics',
        profit: 'Profits',
        accountStatistic: 'Accounts Statistics',
        equity: 'Equity',
        asset: 'Assets',
        liability: 'Liabilities',
        topFiveExpenses: 'Top 5 Expenses',
        back: 'Back'
    };
}

function zhMsg() {
    return {
        home: '主页',
        ledger: '分类账',
        account: '账户',
        report: '报表',
        cashCat: '招财猫',
        close: '关闭',
        settings: '设置',
        income: '收入',
        expense: '支出',
        debit: '借入',
        credit: '贷出',
        transfer: '转账',
        monthStatistic: '月度统计',
        profit: '盈余',
        accountStatistic: '账户统计',
        equity: '净资产',
        asset: '总资产',
        liability: '债务',
        topFiveExpenses: '支出比例统计',
        back: '返回',
        'Up Level': '上一级',
        'Create': '添加',

        /** init account begin **/
        /** init account end **/
        Asset: '资产',
        Liability: '负债',
        Assets: '资产',
        'Asset account': '资产账户',
        'Current Assets': '流动资产',
        'Cash in Wallet': '现金',
        'Bank CD': '定期储蓄',
        'Fixed Assets': '固定资产',
        'Equity': '净值产',
        'Equity account': '净资产账户',
        'Liabilities': '负债',
        'Liabilities account': '负债账户',
        'Income': '收入',
        'Income account': '收入账户',
        'Expense': '支出',
        'Expense account': '支出账户'
//        'Expense': '资产账户',
//        'Expense': '资产账户',

    };
}
