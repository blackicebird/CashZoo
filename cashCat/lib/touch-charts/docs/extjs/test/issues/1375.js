/*

This file is part of Ext JS 4

Copyright (c) 2011 Sencha Inc

Contact:  http://www.sencha.com/contact

Commercial Usage
Licensees holding valid commercial licenses may use this file in accordance with the Commercial Software License Agreement provided with the Software or, alternatively, in accordance with the terms contained in a written agreement between you and Sencha.

If you are unsure which license is appropriate for your use, please contact the sales department at http://www.sencha.com/contact.

*/
Ext.onReady(function(){
    var panel, card, previous, next;
    
    panel = Ext.widget('panel', {
        width: 300,
        height: 200,
        html: 'Card 1'
    });
    
    previous = Ext.widget('button', {
        text: 'Previous',
        disabled: true,
        handler: function(){
            previous.disable();
            next.enable();
            card.getLayout().setActiveItem(panel);
        }
    });
    
    next = Ext.widget('button', {
        text: 'Next',
        handler: function(button){
            var panel2;
            
            previous.enable();
            next.disable();
            
            panel2 = Ext.widget('panel', {
                width: 300,
                height: 200,
                html: 'Card 2'
            });
            
            panel2.on('deactivate', function(){
                // Adding a defered fixes the problem
                // Ext.Function.defer(function() {
                panel2.destroy();
                // }, 1000);
            });
            
            card.getLayout().setActiveItem(panel2);
        }
    });
    
    card = new Ext.widget('panel', {
        layout: 'card',
        renderTo: Ext.getBody(),
        padding: 15,
        width: 300,
        height: 200,
        items: [panel],
        buttons: [previous, next]
    });
});

