/*

This file is part of Ext JS 4

Copyright (c) 2011 Sencha Inc

Contact:  http://www.sencha.com/contact

Commercial Usage
Licensees holding valid commercial licenses may use this file in accordance with the Commercial Software License Agreement provided with the Software or, alternatively, in accordance with the terms contained in a written agreement between you and Sencha.

If you are unsure which license is appropriate for your use, please contact the sales department at http://www.sencha.com/contact.

*/
Ext.Loader.setConfig({
    enabled: true
});
Ext.Loader.setPath('Ext.ux', '../../examples/ux');
Ext.require(['Ext.grid.*', 'Ext.data.*', 'Ext.ux.grid.FiltersFeature', 'Ext.toolbar.Paging']);
Ext.onReady(function() {
    Ext.define('LoanRecord', {
        extend: 'Ext.data.Model',
        fields: ["loan_number", "needs_research", "commit_number", "issue_date", "final_settle", "early_fund_date", "issue_type", "balance_type", "pool_type", "io_term", "war_io_term", "sale_name", "bond_spec", "cusip_num", "pool_suffix", "occupancy_code", "amort_term", "original_ltv", "borrower_name", "address", "loan_amount", "hockey_team", "credit_score", "cost_of_gas", "favourite_band"]
    });

    var mySelModel = Ext.create('Ext.selection.CheckboxModel');
    var columns = [{
        "id": "loan_number",
        "header": "Loan Number",
        "dataIndex": "loan_number",
        "sortable": true
    },
    {
        "id": "needs_research",
        "header": "Needs Research",
        "dataIndex": "needs_research",
        "sortable": true
    },
    {
        "id": "commit_number",
        "header": "Commit #",
        "dataIndex": "commit_number",
        "sortable": true
    },
    {
        "id": "issue_date",
        "header": "Issue Date",
        "dataIndex": "issue_date",
        "sortable": true
    },
    {
        "id": "final_settle",
        "header": "Final Settle Date",
        "dataIndex": "final_settle",
        "sortable": true
    },
    {
        "id": "early_fund_date",
        "header": "Early Fund Date",
        "dataIndex": "early_fund_date",
        "sortable": true
    },
    {
        "id": "issue_type",
        "header": "Issue Type",
        "dataIndex": "issue_type",
        "sortable": true
    },
    {
        "id": "balance_type",
        "header": "Balance Type",
        "dataIndex": "balance_type",
        "sortable": true
    },
    {
        "id": "pool_type",
        "header": "Pool Type",
        "dataIndex": "pool_type",
        "sortable": true
    },
    {
        "id": "io_term",
        "header": "IO Term",
        "dataIndex": "io_term",
        "sortable": true
    },
    {
        "id": "war_io_term",
        "header": "War IO Term",
        "dataIndex": "war_io_term",
        "sortable": true
    },
    {
        "id": "sale_name",
        "header": "Sale Name",
        "dataIndex": "sale_name",
        "sortable": true
    },
    {
        "id": "bond_spec",
        "header": "Bond Spec",
        "dataIndex": "bond_spec",
        "sortable": true
    },
    {
        "id": "cusip_num",
        "header": "Cusip",
        "dataIndex": "cusip_num",
        "sortable": true
    },
    {
        "id": "pool_suffix",
        "header": "Pool Suffix",
        "dataIndex": "pool_suffix",
        "sortable": true
    },
    {
        "id": "occupancy_code",
        "header": "Occupance Code",
        "dataIndex": "occupancy_code",
        "sortable": true
    },
    {
        "id": "amort_term",
        "header": "Amort. Term",
        "dataIndex": "amort_term",
        "sortable": true
    },
    {
        "id": "original_ltv",
        "header": "Orig LTV",
        "dataIndex": "original_ltv",
        "sortable": true
    },
    {
        "id": "borrower_name",
        "header": "Borrower Name",
        "dataIndex": "borrower_name",
        "sortable": true
    },
    {
        "id": "address",
        "header": "Address",
        "dataIndex": "address",
        "sortable": true
    },
    {
        "id": "loan_amount",
        "header": "Loan Amount",
        "dataIndex": "loan_amount",
        "sortable": true
    },
    {
        "id": "hockey_team",
        "header": "Hockey Club",
        "dataIndex": "hockey_team",
        "sortable": true
    },
    {
        "id": "credit_score",
        "header": "Credit Score",
        "dataIndex": "credit_score",
        "sortable": true
    },
    {
        "id": "cost_of_gas",
        "header": "Cost of Gas",
        "dataIndex": "cost_of_gas",
        "sortable": true
    },
    {
        "id": "favourite_band",
        "header": "Favourite Band",
        "dataIndex": "favourite_band",
        "sortable": true
    }];

    var store = new Ext.data.Store({
        model: 'LoanRecord',
        autoLoad: false,
        remoteSort: false,
        pageSize: 100,
        proxy: {
            type: 'ajax',
            url: 'loans-short.json',
            reader: {
                type: 'json',
                root: 'records',
                totalProperty: 'count',
                successProperty: 'success'
            }
        }
    });

    var grid = Ext.create('Ext.grid.Panel', {
        store: store,
        columns: columns,
        frame: true,
        width: 800,
        height: 400,
        loadMask: true,
        disableSelection: true,
        selModel: mySelModel,
        dockedItems: [{
            xtype: 'pagingtoolbar',
            store: store,
            dock: 'bottom',
            displayInfo: true,
            pageSize: 100
        }]
    });

    Ext.create('Ext.panel.Panel', {
        title: 'Grid Test',
        renderTo: Ext.getBody(),
        width: 800,
        height: 500,
        bodyBorder: false,
        border: 0,
        frame: true,
        layout: {
            type: 'vbox',
            align: 'stretch',
            flex: 1
        },
        dockedItems: [{
            xtype: 'toolbar',
            dock: 'top',
            items: [{
                xtype: 'button',
                text: 'Load Data',
                handler: function() {
                    console.time("Loading grid");
                    store.load(function() {
                        console.timeEnd("Loading grid");
                    });
                }
            }]
        }],
        items: [grid]
    });
});

