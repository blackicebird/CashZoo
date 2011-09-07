Ext.regModel('Person', {
    fields: [
        {name: 'name',  type: 'string'},
        {name: 'age',   type: 'int'},
        {name: 'phone', type: 'string'},
        {name: 'alive', type: 'boolean', defaultValue: true}
    ],

    proxy: {
        type: 'websqlproxy',
        dbName: 'users',
        dbTable: 'persons',
        dbVersion: '1.0',
        writer: {
            type: 'json',
            writeAllFields: false
        }
    }
});
