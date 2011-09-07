/**
 * Account model
 */
Ext.regModel("Account", {
    fields: [
        {name: "name", type: "string"},
        {name: "code", type: "string"},
        {name: "description", type: "string"},
        {name: "currency", type: "string"},
        {name: "color", type: "string"},
        {name: "memo", type: "string"},
        {name: "editable", type: "boolean", defaultValue: true},
        {name: "visible", type: "boolean", defaultValue: true},
        {name: "parent", type: "string"},
        {name: "type", type: "string"}
    ],
    validations: [
        {type: "presence", field: "name"},
        {type: "presence", field: "type"},
        {type: "length", field: "name", min: 2, max: 32},
        {type: "inclusion", field: "name", list: ["Asset", "Liability", "Income", "Expense", "Equity"]}
    ],
    proxy: {
        type: "websqlproxy",
        dbName: "CashCat",
        dbTable: 'account',
        dbVersion: '1.0',
        writer: {
            type: 'json',
            writeAllFields: false
        },
        initialData: [
            {name: "Asset", type: "Asset", code: "100" , description: "Asset account"}
        ]
    }
});
