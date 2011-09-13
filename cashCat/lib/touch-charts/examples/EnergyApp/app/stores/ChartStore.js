EnergyApp.stores.ChartStore = new Ext.data.JsonStore({
    root: 'items',
    idProperty: 'year',
    fields: [{
        name: 'year',
        type: 'int'
    }, {
        name: 'coal',
        type: 'int'
    }, {
        name: 'nuclear',
        type: 'int'
    }, {
        name: 'crude-oil',
        type: 'int'
    }, {
        name: 'gas',
        type: 'int'
    }, {
        name: 'renewable',
        type: 'int'
    }]
});

EnergyApp.stores.YearStore = new Ext.data.JsonStore({
    fields: ['type', 'data']
});