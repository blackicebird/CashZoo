/*

This file is part of Ext JS 4

Copyright (c) 2011 Sencha Inc

Contact:  http://www.sencha.com/contact

Commercial Usage
Licensees holding valid commercial licenses may use this file in accordance with the Commercial Software License Agreement provided with the Software or, alternatively, in accordance with the terms contained in a written agreement between you and Sencha.

If you are unsure which license is appropriate for your use, please contact the sales department at http://www.sencha.com/contact.

*/
Ext.require(['*']);

Ext.define('SumoBrain.search.ui.CollectionContainerUi', {
    extend: 'Ext.container.Container',
    width: 330,
    height: 155,
    layout: {
        type: 'hbox',
        align: 'stretch'
    },
    initComponent: function() {
        this.items = [{
                xtype: 'container',
                flex: 4,
                layout: 'fit',
                items: [{
                    xtype: 'fieldset',
                    padding: 5,
                    margin: 0,
                    height: 150,
                    itemId: 'patentCollections',
                    title: 'Patent Collections',
                    layout: 'anchor',
                    labelWidth: 0,
                    defaults: {
                        anchor: '100%',
                        labelWidth: 0
                    },
                    items: [{
                            xtype: 'checkboxgroup',
                            itemId: "patentCollectionsGroup",
                            layout: {
                                type: 'anchor'
                            },
                            defaults: {
                                anchor: '100%',
                                checked: true,
                                width: 120
                            },
                            items: [
                                {boxLabel: 'US Patents', name: 'uspt', itemId: 'usPatents'},
                                {boxLabel: 'US Applications', name: 'usapp', itemId: 'usApplications'},
                                {boxLabel: 'EP Documents', name: 'ep', itemId: 'epDocuments'},
                                {boxLabel: 'WIPO (PCT)', name: 'wipo', itemId: 'wipo'},
                                {boxLabel: 'JP Abstracts', name: 'jp', itemId: 'abstractsJapan', margin:0}
                            ]
                    }]
                }]
            },
            {
                xtype: 'container',
                flex: 5,
                layout: {
                    type: 'vbox',
                    align: 'stretch'
                },
                defaults: {
                    labelWidth: 0,
                    anchor: '100%'
                },
                items: [
                    {
                        xtype: 'fieldset',
                        margin: '0 3',
                        padding: 5,
                        flex: 1,
                        title: 'Other Collections',
                        itemId: 'nonPatentCollections',
                        layout: 'anchor',
                        defaults: {
                            labelWidth: 0,
                            anchor: '100%'
                        },
                        items: [
                            {
                                xtype: 'checkboxgroup',
                                layout: 'anchor',
                                defaults: {
                                    anchor: '100%',
                                    labelWidth: 0,
                                    width: 120
                                },
                                items: [
                                    {boxLabel: 'Non-Patent Docs', name: 'npl', itemId: 'nonPatent', margin:0}
                                ]
                            }
                        ]
                    },
                    {
                        xtype: 'fieldset',
                        title: 'Internal Collections',
                        flex: 2,
                        margin: '0 3',
                        padding: 5,
                        layout: 'anchor',
                        itemId: 'internalCollections',
                        defaults: {
                            labelWidth: 0,
                            anchor: '100%'
                        },
                        items: [
                            {
                                xtype: 'checkboxgroup',
                                itemId: "internalCollectionsGroup",
                                layout: 'anchor',
                                defaults: {
                                    anchor: '100%',
                                    labelWidth: 0,
                                    width: 137
                                },
                                items: [
                                   {boxLabel: 'Unpublished Apps', name: 'PE2E_PREPUB', itemId: 'unpublishedApps'},
                                   {boxLabel: 'Office Actions', name: 'PE2E_OA',itemId: 'officeActions'},
                                   {boxLabel: 'Non-Patent Literature', name: 'PE2E_NPL', itemId: 'nonPatentLiterature', margin:0}
                                ]
                            }
                        ]
                    }
                ]
            }
        ]
        SumoBrain.search.ui.CollectionContainerUi.superclass.initComponent.call(this);
    }
});

Ext.onReady(function () {
    Ext.create('SumoBrain.search.ui.CollectionContainerUi', {
        renderTo: Ext.getBody()
    });
});

