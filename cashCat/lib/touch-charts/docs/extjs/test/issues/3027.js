/*

This file is part of Ext JS 4

Copyright (c) 2011 Sencha Inc

Contact:  http://www.sencha.com/contact

Commercial Usage
Licensees holding valid commercial licenses may use this file in accordance with the Commercial Software License Agreement provided with the Software or, alternatively, in accordance with the terms contained in a written agreement between you and Sencha.

If you are unsure which license is appropriate for your use, please contact the sales department at http://www.sencha.com/contact.

*/
Ext.onReady(function() {
    
    var win = Ext.create('Ext.window.Window', {
        title: 'A title',
        width: 200,
        height: 200,
        tools: [{
            type: 'help'
        }]
    }).show();
    
    Ext.create('Ext.form.Panel', {
        width: 800,
        height: 200,
        renderTo: document.body,
        items: [{
            xtype: 'container',
            layout: 'hbox',
            items: [{
                xtype: 'textfield'
            }, {
                xtype: 'button',
                text: 'Change title',
                handler: function(){
                    win.setTitle(this.prev().getValue());
                }
            }]
        }, {
            xtype: 'container',
            layout: 'hbox',
            items: [{
                xtype: 'textfield'
            }, {
                xtype: 'button',
                text: 'Change iconCls',
                handler: function(){
                    win.setIconCls(this.prev().getValue());
                }
            }]
        }, {
            xtype: 'container',
            layout: 'hbox',
            items: [{
                xtype: 'textfield'
            }, {
                xtype: 'button',
                text: 'Add tool (tool type)',
                handler: function(){
                    win.addTool({
                        type: this.prev().getValue()
                    });
                }
            }, {
                xtype: 'button',
                text: 'Remove tool (tool type)',
                handler: function(){
                    var tool = win.header.query('tool[type=' + this.prev('textfield').getValue() + ']')[0];
                    if (tool) {
                        win.header.remove(tool);
                    }
                }
            }, {
                xtype: 'button',
                text: 'Hide tool (tool type)',
                handler: function(){
                    var tool = win.header.query('tool[type=' + this.prev('textfield').getValue() + ']')[0];
                    if (tool) {
                        tool.hide();
                    }
                }
            }, {
                xtype: 'button',
                text: 'Show tool (tool type)',
                handler: function(){
                    var tool = win.header.query('tool[type=' + this.prev('textfield').getValue() + ']')[0];
                    if (tool) {
                        tool.show();
                    }
                }
            }]
        }]    
    });
    
});

