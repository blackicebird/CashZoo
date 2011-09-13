/*

This file is part of Ext JS 4

Copyright (c) 2011 Sencha Inc

Contact:  http://www.sencha.com/contact

Commercial Usage
Licensees holding valid commercial licenses may use this file in accordance with the Commercial Software License Agreement provided with the Software or, alternatively, in accordance with the terms contained in a written agreement between you and Sencha.

If you are unsure which license is appropriate for your use, please contact the sales department at http://www.sencha.com/contact.

*/
Ext.require('Ext.anim.*');

Ext.onReady(function(){
    
    function run(btn) {
        el[btn.text]();
    }
    
    function createEl() {
        if (el) {
            el.remove();
        }
        el = Ext.getBody().createChild({
            style: {
                border: '1px solid red',
                width: '100px',
                height: '100px'
            }
        });
    }
    
    var fx = ['slideIn', 'slideOut', 'puff', 'switchOff', 'frame', 'ghost', 'highlight', 'fadeIn', 'fadeOut', 'scale'],
        items = [],
        el;
        
    Ext.each(fx, function(item){
        items.push({
            text: item,
            handler: run
        });
    });
    
    items.push({
        text: 'Recreate element',
        handler: createEl
    });
    
    Ext.create('Ext.toolbar.Toolbar', {
        renderTo: document.body,
        items: items
    });
    createEl();
});

