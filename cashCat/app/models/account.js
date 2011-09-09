/**
 * Account model
 */
Ext.regModel("AccountType", {
    fields: [
        {name: "name", type: "string"},
        {name: "seq", type: "int"}
    ],
    validations: [
        {type: "presence", field: "name"},
        {type: "presence", field: "seq"},
        {type: "length", field: "name", min: 2, max: 32}
    ],
    proxy: {
        type: "websqlproxy",
        dbName: cashCat.dbName,
        dbTable: 'account_type',
        dbVersion: '1.0',
        writer: {
            type: 'json',
            writeAllFields: false
        },
        initialData: [
            {name: msg.prop("Asset"), seq: 1},
            {name: msg.prop("Liability"), seq: 2},
            {name: msg.prop("Equity"), seq: 3},
            {name: msg.prop("Income"), seq: 4},
            {name: msg.prop("Expense"), seq: 5}
        ]
    }
});
Ext.regModel("Account", {
    fields: [
        {name: "name", type: "string"},
        {name: "code", type: "int"},
        {name: "description", type: "string"},
        {name: "currency", type: "string"},
        {name: "color", type: "string"},
        {name: "memo", type: "string"},
        {name: "editable", type: "boolean", defaultValue: true},
        {name: "visible", type: "boolean", defaultValue: true},
        {name: "parent", type: "int", defaultValue: 0},
        {name: "type", type: "string"},
        {name: "childrenNum", type: 'int', defaultValue: 0}
    ],
    validations: [
        {type: "presence", field: "name"},
        {type: "presence", field: "type"},
        {type: "length", field: "name", min: 2, max: 32},
        {type: "inclusion", field: "name",
            list: [msg.prop("Asset"), msg.prop("Liability"), msg.prop("Income"), msg.prop("Expense"), msg.prop("Equity")]}
    ],
    proxy: {
        type: "websqlproxy",
        dbName: cashCat.dbName,
        dbTable: 'account',
        dbVersion: '1.0',
        writer: {
            type: 'json',
            writeAllFields: false
        },
        initialData: [
            {name: msg.prop("Assets"), type: msg.prop("Asset"), code: 10000 , description: msg.prop("Asset account")},

            {name: msg.prop("Current Assets"), type: msg.prop("Asset"), code: 11000 , description: msg.prop("Current Assets"), parent: 10000},
            {name: msg.prop("Cash in Wallet"), type: msg.prop("Asset"), code: 11100 , description: msg.prop("Cash in Wallet"), parent: 11000},
            {name: msg.prop("Petty Cash"), type: msg.prop("Asset"), code: 11200 , description: msg.prop("Petty Cash"), parent: 11000},
            {name: msg.prop("Checking Account"), type: msg.prop("Asset"), code: 11300 , description: msg.prop("Checking Account"), parent: 11000},
            {name: msg.prop("Savings Account"), type: msg.prop("Asset"), code: 11400 , description: msg.prop("Savings Account"), parent: 11000},
            {name: msg.prop("Bank CD"), type: msg.prop("Asset"), code: 11500 , description: msg.prop("Bank CD"), parent: 11000},
            {name: msg.prop("Money Market"), type: msg.prop("Asset"), code: 11600 , description: msg.prop("Money Market"), parent: 11000},
            {name: msg.prop("Others"), type: msg.prop("Asset"), code: 11700 , description: msg.prop("Others"), parent: 11000},

            {name: msg.prop("Fixed Assets"), type: msg.prop("Asset"), code: 12000 , description: msg.prop("Fixed Assets"), parent: 10000},
            {name: msg.prop("House"), type: msg.prop("Asset"), code: 12100 , description: msg.prop("House"), parent: 12000},
            {name: msg.prop("Vehicle"), type: msg.prop("Asset"), code: 12200 , description: msg.prop("Vehicle"), parent: 12000},
            {name: msg.prop("Others"), type: msg.prop("Asset"), code: 12300 , description: msg.prop("Others"), parent: 12000},

            {name: msg.prop("Investments"), type: msg.prop("Asset"), code: 13000 , description: msg.prop("Investments"), parent: 10000},
            
            {name: msg.prop("Brokerage Account"), type: msg.prop("Asset"), code: 13100 , description: msg.prop("Brokerage Account"), parent: 13000},
            {name: msg.prop("Stock"), type: msg.prop("Asset"), code: 13101 , description: msg.prop("Stock"), parent: 13100},
            {name: msg.prop("Mutual Fund"), type: msg.prop("Asset"), code: 13102 , description: msg.prop("Mutual Fund"), parent: 13100},
            {name: msg.prop("Bond"), type: msg.prop("Asset"), code: 13103 , description: msg.prop("Bond"), parent: 13100},
            {name: msg.prop("Market Index"), type: msg.prop("Asset"), code: 13104 , description: msg.prop("Market Index"), parent: 13100},
            {name: msg.prop("Others"), type: msg.prop("Asset"), code: 13105 , description: msg.prop("Others"), parent: 13100},

            {name: msg.prop("Retirement"), type: msg.prop("Asset"), code: 13200 , description: msg.prop("Retirement"), parent: 13000},
            {name: msg.prop("Stock"), type: msg.prop("Asset"), code: 13201 , description: msg.prop("Stock"), parent: 13200},
            {name: msg.prop("Mutual Fund"), type: msg.prop("Asset"), code: 13202 , description: msg.prop("Mutual Fund"), parent: 13200},
            {name: msg.prop("Bond"), type: msg.prop("Asset"), code: 13203 , description: msg.prop("Bond"), parent: 13200},
            {name: msg.prop("Market Index"), type: msg.prop("Asset"), code: 13204 , description: msg.prop("Market Index"), parent: 13200},
            {name: msg.prop("Others"), type: msg.prop("Asset"), code: 13205 , description: msg.prop("Others"), parent: 13200},

            {name: msg.prop("Spouse Retirement"), type: msg.prop("Asset"), code: 13300 , description: msg.prop("Spouse Retirement"), parent: 13000},
            {name: msg.prop("Stock"), type: msg.prop("Asset"), code: 13301 , description: msg.prop("Stock"), parent: 13300},
            {name: msg.prop("Mutual Fund"), type: msg.prop("Asset"), code: 13302 , description: msg.prop("Mutual Fund"), parent: 13300},
            {name: msg.prop("Bond"), type: msg.prop("Asset"), code: 13303 , description: msg.prop("Bond"), parent: 13300},
            {name: msg.prop("Market Index"), type: msg.prop("Asset"), code: 13304 , description: msg.prop("Market Index"), parent: 13300},
            {name: msg.prop("Others"), type: msg.prop("Asset"), code: 13305 , description: msg.prop("Others"), parent: 13300},

            {name: msg.prop("Accounts Receivable"), type: msg.prop("Asset"), code: 14000 , description: msg.prop("Accounts Receivable"), parent: 10000},


            {name: msg.prop("Equity"), type: msg.prop("Equity"), code: 20000 , description: msg.prop("Equity account")},
            {name: msg.prop("Opening Balances"), type: msg.prop("Equity"), code: 21000 , description: msg.prop("Opening Balances"), parent: 20000},
            {name: msg.prop("Retained Earnings"), type: msg.prop("Equity"), code: 22000 , description: msg.prop("Retained Earnings"), parent: 20000},
            {name: msg.prop("Others"), type: msg.prop("Equity"), code: 23000 , description: msg.prop("Others"), parent: 20000},

            {name: msg.prop("Liabilities"), type: msg.prop("Liability"), code: 30000 , description: msg.prop("Liabilities account")},

            {name: msg.prop("Credit Card"), type: msg.prop("Liability"), code: 31000 , description: msg.prop("Credit Card"), parent: 30000},

            {name: msg.prop("Loans"), type: msg.prop("Liability"), code: 32000 , description: msg.prop("Loans"), parent: 30000},
            {name: msg.prop("Education Loan"), type: msg.prop("Liability"), code: 32100 , description: msg.prop("Education Loan"), parent: 32000},
            {name: msg.prop("Mortgage Loan"), type: msg.prop("Liability"), code: 32200 , description: msg.prop("Mortgage Loan"), parent: 32000},
            {name: msg.prop("Vehicle Loan"), type: msg.prop("Liability"), code: 32300 , description: msg.prop("Vehicle Loan"), parent: 32000},
            {name: msg.prop("Others"), type: msg.prop("Liability"), code: 32400 , description: msg.prop("Others"), parent: 32000},

            {name: msg.prop("Accounts Payable"), type: msg.prop("Liability"), code: 33000 , description: msg.prop("Accounts Payable"), parent: 30000},
            {name: msg.prop("Others"), type: msg.prop("Liability"), code: 34000 , description: msg.prop("Others"), parent: 30000},


            {name: msg.prop("Income"), type: msg.prop("Income"), code: 40000 , description: msg.prop("Income account")},
            {name: msg.prop("Salary"), type: msg.prop("Income"), code: 41000 , description: msg.prop("Salary"), parent: 40000},
            {name: msg.prop("Salary (Spouse)"), type: msg.prop("Income"), code: 42000 , description: msg.prop("Salary (Spouse)"), parent: 40000},
            {name: msg.prop("Bonus"), type: msg.prop("Income"), code: 43000 , description: msg.prop("Bonus"), parent: 40000},
            {name: msg.prop("Dividend Income"), type: msg.prop("Income"), code: 44000 , description: msg.prop("Dividend Income"), parent: 40000},
            {name: msg.prop("Gifts Received"), type: msg.prop("Income"), code: 45000 , description: msg.prop("Gifts Received"), parent: 40000},
            {name: msg.prop("Reimbursed Expenses"), type: msg.prop("Income"), code: 46000 , description: msg.prop("Reimbursed Expenses"), parent: 40000},
            {name: msg.prop("Sales"), type: msg.prop("Income"), code: 47000 , description: msg.prop("Sales"), parent: 40000},

            {name: msg.prop("Interest Income"), type: msg.prop("Income"), code: 48000 , description: msg.prop("Interest Income"), parent: 40000},
            {name: msg.prop("Checking Interest"), type: msg.prop("Income"), code: 48100 , description: msg.prop("Checking Interest"), parent: 48000},
            {name: msg.prop("Savings Interest"), type: msg.prop("Income"), code: 48200 , description: msg.prop("Savings Interest"), parent: 48000},
            {name: msg.prop("CD Interest"), type: msg.prop("Income"), code: 48300 , description: msg.prop("CD Interest"), parent: 48000},
            {name: msg.prop("Bond Interest"), type: msg.prop("Income"), code: 48400 , description: msg.prop("Bond Interest"), parent: 48000},
            {name: msg.prop("Money Market Interest"), type: msg.prop("Income"), code: 48500 , description: msg.prop("Money Market Interest"), parent: 48000},
            {name: msg.prop("Others"), type: msg.prop("Income"), code: 48600 , description: msg.prop("Others"), parent: 48000},

            {name: msg.prop("Others"), type: msg.prop("Income"), code: 49000 , description: msg.prop("Others"), parent: 40000},

            {name: msg.prop("Expense"), type: msg.prop("Expense"), code: 50000 , description: msg.prop("Expense account")},
            {name: msg.prop("Adjustment"), type: msg.prop("Expense"), code: 51000 , description: msg.prop("Adjustment"), parent: 50000},

            {name: msg.prop("Auto"), type: msg.prop("Expense"), code: 52000 , description: msg.prop("Auto"), parent: 50000},
            {name: msg.prop("Gas"), type: msg.prop("Expense"), code: 52100 , description: msg.prop("Gas"), parent: 52000},
            {name: msg.prop("Fees"), type: msg.prop("Expense"), code: 52200 , description: msg.prop("Fees"), parent: 52000},
            {name: msg.prop("Parking"), type: msg.prop("Expense"), code: 52300 , description: msg.prop("Parking"), parent: 52000},
            {name: msg.prop("Repair and Maintenance"), type: msg.prop("Expense"), code: 52400 , description: msg.prop("Repair and Maintenance"), parent: 52000},
            {name: msg.prop("Others"), type: msg.prop("Expense"), code: 52500 , description: msg.prop("Others"), parent: 52000}

           /* {name: msg.prop("Books"), type: msg.prop("Expense"), code: 50000 , description: msg.prop("Books")},
            {name: msg.prop("Cable"), type: msg.prop("Expense"), code: 50000 , description: msg.prop("Cable")},
            {name: msg.prop("Cash Discounts"), type: msg.prop("Expense"), code: 50000 , description: msg.prop("Cash Discounts")},
            {name: msg.prop("Charity"), type: msg.prop("Expense"), code: 50000 , description: msg.prop("Charity")},
            {name: msg.prop("Childcare"), type: msg.prop("Expense"), code: 50000 , description: msg.prop("Childcare")},
            {name: msg.prop("Clothes"), type: msg.prop("Expense"), code: 50000 , description: msg.prop("Clothes")},
            {name: msg.prop("Commissions"), type: msg.prop("Expense"), code: 50000 , description: msg.prop("Commissions")},
            {name: msg.prop("Computer"), type: msg.prop("Expense"), code: 50000 , description: msg.prop("Computer")},
            {name: msg.prop("Depreciation"), type: msg.prop("Expense"), code: 50000 , description: msg.prop("Depreciation")},
            {name: msg.prop("Dining"), type: msg.prop("Expense"), code: 50000 , description: msg.prop("Dining")},
            {name: msg.prop("Dues and Subscriptions"), type: msg.prop("Expense"), code: 50000 , description: msg.prop("Dues and Subscriptions")},
            {name: msg.prop("Education"), type: msg.prop("Expense"), code: 50000 , description: msg.prop("Education")},

            {name: msg.prop("Entertainment"), type: msg.prop("Expense"), code: 50000 , description: msg.prop("Entertainment")},
            {name: msg.prop("Music/Movies"), type: msg.prop("Expense"), code: 50000 , description: msg.prop("Music/Movies")},
            {name: msg.prop("Recreation"), type: msg.prop("Expense"), code: 50000 , description: msg.prop("Recreation")},
            {name: msg.prop("Travel"), type: msg.prop("Expense"), code: 50000 , description: msg.prop("Travel")},

            {name: msg.prop("Equipment Rental"), type: msg.prop("Expense"), code: 50000 , description: msg.prop("Equipment Rental")},
            {name: msg.prop("Gifts"), type: msg.prop("Expense"), code: 50000 , description: msg.prop("Gifts")},
            {name: msg.prop("Groceries"), type: msg.prop("Expense"), code: 50000 , description: msg.prop("Groceries")},
            {name: msg.prop("Hobbies"), type: msg.prop("Expense"), code: 50000 , description: msg.prop("Hobbies")},
            {name: msg.prop("Home Repair"), type: msg.prop("Expense"), code: 50000 , description: msg.prop("Home Repair")},

            {name: msg.prop("Insurance"), type: msg.prop("Expense"), code: 50000 , description: msg.prop("Insurance")},
            {name: msg.prop("Auto Insurance"), type: msg.prop("Expense"), code: 50000 , description: msg.prop("Auto Insurance")},
            {name: msg.prop("Disability Insurance"), type: msg.prop("Expense"), code: 50000 , description: msg.prop("Disability Insurance")},
            {name: msg.prop("Health Insurance"), type: msg.prop("Expense"), code: 50000 , description: msg.prop("Health Insurance")},
            {name: msg.prop("Home Insurance"), type: msg.prop("Expense"), code: 50000 , description: msg.prop("Home Insurance")},
            {name: msg.prop("Liability Insurance"), type: msg.prop("Expense"), code: 50000 , description: msg.prop("Liability Insurance")},
            {name: msg.prop("Life Insurance"), type: msg.prop("Expense"), code: 50000 , description: msg.prop("Life Insurance")},
            {name: msg.prop("Rental Insurance"), type: msg.prop("Expense"), code: 50000 , description: msg.prop("Rental Insurance")},
            {name: msg.prop("Workers Comp"), type: msg.prop("Expense"), code: 50000 , description: msg.prop("Workers Comp")},
            {name: msg.prop("Others"), type: msg.prop("Expense"), code: 52500 , description: msg.prop("Others")},


            {name: msg.prop("Interest"), type: msg.prop("Expense"), code: 50000 , description: msg.prop("Interest")},
            {name: msg.prop("Education Loan Interest"), type: msg.prop("Expense"), code: 50000 , description: msg.prop("Education Loan Interest")},
            {name: msg.prop("Mortgage Interest"), type: msg.prop("Expense"), code: 50000 , description: msg.prop("Mortgage Interest")},
            {name: msg.prop("Vehicle Loan Interest"), type: msg.prop("Expense"), code: 50000 , description: msg.prop("Vehicle Loan Interest")},
            {name: msg.prop("Others"), type: msg.prop("Expense"), code: 52500 , description: msg.prop("Others")},

            {name: msg.prop("Laundry/Dry Cleaning"), type: msg.prop("Expense"), code: 50000 , description: msg.prop("Laundry/Dry Cleaning")},
            {name: msg.prop("Licenses and Permits"), type: msg.prop("Expense"), code: 50000 , description: msg.prop("Licenses and Permits")},
            {name: msg.prop("Medical Expenses"), type: msg.prop("Expense"), code: 50000 , description: msg.prop("Medical Expenses")},
            {name: msg.prop("Miscellaneous"), type: msg.prop("Expense"), code: 50000 , description: msg.prop("Miscellaneous")},
            {name: msg.prop("Office Supplies"), type: msg.prop("Expense"), code: 50000 , description: msg.prop("Office Supplies")},
            {name: msg.prop("Online Services"), type: msg.prop("Expense"), code: 50000 , description: msg.prop("Online Services")},
            {name: msg.prop("Outside Services"), type: msg.prop("Expense"), code: 50000 , description: msg.prop("Outside Services")},
            {name: msg.prop("Payroll Expenses"), type: msg.prop("Expense"), code: 50000 , description: msg.prop("Payroll Expenses")},
            {name: msg.prop("Phone"), type: msg.prop("Expense"), code: 50000 , description: msg.prop("Phone")},
            {name: msg.prop("Postage and Delivery"), type: msg.prop("Expense"), code: 50000 , description: msg.prop("Postage and Delivery")},
            {name: msg.prop("Printing and Reproduction"), type: msg.prop("Expense"), code: 50000 , description: msg.prop("Printing and Reproduction")},

            {name: msg.prop("Professional Fees"), type: msg.prop("Expense"), code: 50000 , description: msg.prop("Professional Fees")},
            {name: msg.prop("Accounting"), type: msg.prop("Expense"), code: 50000 , description: msg.prop("Accounting")},
            {name: msg.prop("Legal Fees"), type: msg.prop("Expense"), code: 50000 , description: msg.prop("Legal Fees")},

            {name: msg.prop("Public Transportation"), type: msg.prop("Expense"), code: 50000 , description: msg.prop("Public Transportation")},
            {name: msg.prop("Rent"), type: msg.prop("Expense"), code: 50000 , description: msg.prop("Rent")},

            {name: msg.prop("Repairs"), type: msg.prop("Expense"), code: 50000 , description: msg.prop("Repairs")},
            {name: msg.prop("Building Repairs"), type: msg.prop("Expense"), code: 50000 , description: msg.prop("Building Repairs")},
            {name: msg.prop("Computer Repairs"), type: msg.prop("Expense"), code: 50000 , description: msg.prop("Computer Repairs")},
            {name: msg.prop("Equipment Repairs"), type: msg.prop("Expense"), code: 50000 , description: msg.prop("Equipment Repairs")},
            {name: msg.prop("Janitorial Expenses"), type: msg.prop("Expense"), code: 50000 , description: msg.prop("Janitorial Expenses")},

            {name: msg.prop("Subscriptions"), type: msg.prop("Expense"), code: 50000 , description: msg.prop("Subscriptions")},
            {name: msg.prop("Supplies"), type: msg.prop("Expense"), code: 50000 , description: msg.prop("Supplies")},

            {name: msg.prop("Taxes"), type: msg.prop("Expense"), code: 50000 , description: msg.prop("Taxes")},
            {name: msg.prop("Social Security"), type: msg.prop("Expense"), code: 50000 , description: msg.prop("Social Security")},
            {name: msg.prop("Others"), type: msg.prop("Expense"), code: 52500 , description: msg.prop("Others")},

            {name: msg.prop("Taxes (Spouse)"), type: msg.prop("Expense"), code: 50000 , description: msg.prop("Taxes (Spouse)")},
            {name: msg.prop("Social Security"), type: msg.prop("Expense"), code: 50000 , description: msg.prop("Social Security")},
            {name: msg.prop("Others"), type: msg.prop("Expense"), code: 52500 , description: msg.prop("Others")},

            {name: msg.prop("Travel and Entertainment"), type: msg.prop("Expense"), code: 52500 , description: msg.prop("Travel and Entertainment")},
            {name: msg.prop("Meals"), type: msg.prop("Expense"), code: 52500 , description: msg.prop("Meals")},
            {name: msg.prop("Travel"), type: msg.prop("Expense"), code: 52500 , description: msg.prop("Travel")},
            {name: msg.prop("Entertainment"), type: msg.prop("Expense"), code: 52500 , description: msg.prop("Entertainment")},
            {name: msg.prop("Others"), type: msg.prop("Expense"), code: 52500 , description: msg.prop("Others")},

            {name: msg.prop("Utilities"), type: msg.prop("Expense"), code: 52500 , description: msg.prop("Utilities")},
            {name: msg.prop("Cable"), type: msg.prop("Expense"), code: 52500 , description: msg.prop("Cable")},
            {name: msg.prop("Cell Phone"), type: msg.prop("Expense"), code: 52500 , description: msg.prop("Cell Phone")},
            {name: msg.prop("Electric"), type: msg.prop("Expense"), code: 52500 , description: msg.prop("Electric")},
            {name: msg.prop("Garbage collection"), type: msg.prop("Expense"), code: 52500 , description: msg.prop("Garbage collection")},
            {name: msg.prop("Gas"), type: msg.prop("Expense"), code: 52500 , description: msg.prop("Gas")},
            {name: msg.prop("Internet"), type: msg.prop("Expense"), code: 52500 , description: msg.prop("Internet")},
            {name: msg.prop("Phone"), type: msg.prop("Expense"), code: 52500 , description: msg.prop("Phone")},
            {name: msg.prop("Water"), type: msg.prop("Expense"), code: 52500 , description: msg.prop("Water")}*/


        ]
    }
});
