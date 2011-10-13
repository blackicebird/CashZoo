/**
 * Copyright (c) Li Guoqiang
 * Author: Leon Lee
 * Date: 11-10-2
 * Time: 上午11:15
 * Email: mail.lgq@gmail.com
 */

Ext.regModel('Entry', {
    fields: [
        {name: 'transaction', type: 'string'},
        {name: 'action', type: 'string'},
        {name: 'description', type: 'string'},
        {name: 'from', type: 'string'},
        {name: 'to', type: 'string'},
        {name: 'amount', type: 'float'},
        {name: 'balance', type: 'float'}
        
    ],
    validations: [
        {type: 'presence', field: 'from'},
        {type: 'presence', field: 'to'},
        {type: 'presence', field: 'amount'}
    ],
    proxy: {
        type: "websqlproxy",
        dbName: cashCat.dbName,
        dbTable: 'entry',
        dbVersion: '1.0',
        writer: {
            type: 'json',
            writeAllFields: false
        },
        initialData: [
        ]
    }
});

Ext.regModel('Transaction', {
    fields: [
        {name: 'postedDate', type: 'date'},
        {name: 'seq', type: 'int'},
        {name: 'description', type: 'string'},
        {name: 'total', type: 'float'}
    ],
    validations: [
        {type: 'presence', field: 'postedDate'},
        {type: 'presence', field: 'total'}
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