/*

This file is part of Ext JS 4

Copyright (c) 2011 Sencha Inc

Contact:  http://www.sencha.com/contact

Commercial Usage
Licensees holding valid commercial licenses may use this file in accordance with the Commercial Software License Agreement provided with the Software or, alternatively, in accordance with the terms contained in a written agreement between you and Sencha.

If you are unsure which license is appropriate for your use, please contact the sales department at http://www.sencha.com/contact.

*/
Ext.define('ESearch.controller.Search', {
    extend: 'Ext.app.Controller',
    models:[
        'EPart'
    ],
    stores:[
        'EParts'
    ],
    views:[
        'parts.List'
    ],
    refs:[{
         ref:'PartsList',
         selector:'partslist'
    }],
    init:function(app) {
            var store = this.getEPartsStore();
            store.guaranteeRange(0, 199);
            this.control({
			    'partslist button':{
				click:this.onButtonClick
			}
		});
    },
    onButtonClick: function(btn, e) {
        if (btn.operation === 'newSearch') {
            //TODO need to find a nice way to instantiate a new window
        }
    }
});
