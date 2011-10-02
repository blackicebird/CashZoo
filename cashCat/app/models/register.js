/**
 * Copyright (c) Li Guoqiang
 * Author: Leon Lee
 * Date: 11-10-2
 * Time: 上午11:15
 * Email: mail.lgq@gmail.com
 */

Ext.regModel('Transaction', {
    fields: [
        {name: 'tranDate', type: 'date'},
        {name: 'seq', type: 'int'},
        {name: 'description', type: 'string'},
        {name: 'from', type: 'string'},
        {name: 'to', type: 'string'},
        {name: 'amount', type: 'float'}
    ],
    validations: [
        {type: 'presence', field: 'tranDate'},
        {type: 'presence', field: 'from'},
        {type: 'presence', field: 'to'},
        {type: 'presence', field: 'amount'},
        {type: 'presence', field: 'ref'}
    ],
    proxy: {
        type: "websqlproxy",
        dbName: cashCat.dbName,
        dbTable: 'transaction',
        dbVersion: '1.0',
        writer: {
            type: 'json',
            writeAllFields: false
        },
        initialData: [
        ]
    }
});

Ext.regModel('TransactionGroup')