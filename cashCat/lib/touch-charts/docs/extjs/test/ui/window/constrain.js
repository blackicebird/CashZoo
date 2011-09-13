/*

This file is part of Ext JS 4

Copyright (c) 2011 Sencha Inc

Contact:  http://www.sencha.com/contact

Commercial Usage
Licensees holding valid commercial licenses may use this file in accordance with the Commercial Software License Agreement provided with the Software or, alternatively, in accordance with the terms contained in a written agreement between you and Sencha.

If you are unsure which license is appropriate for your use, please contact the sales department at http://www.sencha.com/contact.

*/
Ext.require('Ext.window.*');
Ext.onReady(function() {
    var win = Ext.create("widget.window", {
        width : 300,
        height : 200,
        title : "Constrained window",
        html : "I should be constrained to the browser viewport, I have a shadow",
        constrain : true,
        shadow: true
    });
    win.show();
    var win2 = Ext.create("widget.window", {
        width : 300,
        height : 200,
        title : "Constrained window 2",
        html : "I should be constrained to a dom element, no shadow",
        constrain: true,
        shadow: false,
        renderTo: Ext.get('constrain-with-shadow')
    });
    win2.show();
    
   var win3 = Ext.create("widget.window", {
        width : 300,
        height : 200,
        title : "Constrained window 3",
        html : "I should be constrained to a dom element, I have a shadow",
        constrain: true,
        hidden: false,
        renderTo: 'constrain-with-shadow2'
    });
       var win5 = Ext.create("widget.window", {
        width : 300,
        height : 200,
        title : "Constrained window 5",
        html : "header constrain",
        constrainHeader: true,
        hidden: false,
        renderTo: 'constrain-with-shadow2'
    });
    var win4 = Ext.create("widget.window", {
        width : 300,
        height : 200,
        title : "Constrained window 4",
        html : "I am not constrained, I have a shadow",
        hidden: false,
        renderTo: Ext.getBody()
    });
});
