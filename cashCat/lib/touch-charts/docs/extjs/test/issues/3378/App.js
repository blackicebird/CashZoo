/*

This file is part of Ext JS 4

Copyright (c) 2011 Sencha Inc

Contact:  http://www.sencha.com/contact

Commercial Usage
Licensees holding valid commercial licenses may use this file in accordance with the Commercial Software License Agreement provided with the Software or, alternatively, in accordance with the terms contained in a written agreement between you and Sencha.

If you are unsure which license is appropriate for your use, please contact the sales department at http://www.sencha.com/contact.

*/
Ext.Loader.setConfig({enabled: true,
        paths: {
            'Ext.ux':'lib/extjs4/ux/',
            'ESearch': 'app'
        }
});
Ext.require([
    'Ext.grid.*',
    'Ext.data.*',
    'Ext.util.*',
    'ESearch.view.Portal',
    'Ext.grid.PagingScroller',
    'Ext.grid.feature.Grouping',
    'Ext.grid.plugin.CellEditing',
    'Ext.state.CookieProvider'
]);
Ext.application({
	 name:'ESearch',
	 appFolder:'app',
	 autoCreateViewport:false,
     controllers:['Search'],
     launch:function() {
		Ext.state.Manager.setProvider(new Ext.state.CookieProvider());
		this.viewport = Ext.create('ESearch.view.Portal', {
			stateId:'esearchWindow'
		});
		window[this.name].app = this;

		this.viewport.show();

	}
});

