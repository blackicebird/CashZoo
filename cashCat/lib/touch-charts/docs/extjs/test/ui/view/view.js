/*

This file is part of Ext JS 4

Copyright (c) 2011 Sencha Inc

Contact:  http://www.sencha.com/contact

Commercial Usage
Licensees holding valid commercial licenses may use this file in accordance with the Commercial Software License Agreement provided with the Software or, alternatively, in accordance with the terms contained in a written agreement between you and Sencha.

If you are unsure which license is appropriate for your use, please contact the sales department at http://www.sencha.com/contact.

*/
Ext.onReady(function(){
    var myData = [
        {
            company: '3m Co',
            price  : 71.72
        },
        {
            company: 'Alcoa Inc',
            price  : 29.01
        },
        {
            company: 'Altria Group Inc',
            price  : 83.81
        }
    ];

    Ext.regModel('Company', {
        fields: [
           {name: 'company'},
           {name: 'price',      type: 'float'}
        ]
    });

    // create the data store
    var store = new Ext.data.Store({
        model: 'Company'
    });

    // manually load local data
    store.loadData(myData);

    var view = new Ext.view.View({
        store: store,
        itemSelector: '.company',
        selectedItemCls: 'company-selected',
        tpl: '<tpl for="."><div class="company">{company}</div></tpl>',
        height: 350,
        width : 600,
        selModel: {
            // options SIMPLE, SINGLE, MULTI
            mode: 'SIMPLE'
            // deselectOnContainerClick: false
        },
        renderTo: Ext.getBody()
    });
    view.toggleEventLogging(true);

});
