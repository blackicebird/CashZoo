/*

This file is part of Ext JS 4

Copyright (c) 2011 Sencha Inc

Contact:  http://www.sencha.com/contact

Commercial Usage
Licensees holding valid commercial licenses may use this file in accordance with the Commercial Software License Agreement provided with the Software or, alternatively, in accordance with the terms contained in a written agreement between you and Sencha.

If you are unsure which license is appropriate for your use, please contact the sales department at http://www.sencha.com/contact.

*/
Ext.require('*');

Ext.onReady(function() {
    var header = function(title) {
        Ext.create('widget.component', {
            html: title,
            border: false,
            renderTo: 'content',
            cls: 'header'
        });
    };
    
    var headerSmall = function(title) {
        Ext.create('widget.component', {
            html: title,
            border: false,
            renderTo: 'content',
            cls: 'header-small'
        });
    };
    
    var hr = function() {
        Ext.create('widget.component', {
            border: false,
            renderTo: 'content',
            cls: 'hr'
        });
    };
    
    var panel = function(config, xtype) {
        Ext.create(xtype || 'widget.panel', Ext.apply(config, {}, {
            renderTo: 'content',
            cls: 'floater',
            width: 380,
            height: 300
        }));
    }
    
    var panels = function(config, xtype) {
        config = config || {};
        
        panel(Ext.apply(config, {
            title: 'Docked top',
            dockedItems: [Ext.apply({
                dock: 'top'
            }, {}, horizontalToolbar)]
        }), xtype);
        panel(Ext.apply(config, {
            title: 'Docked right',
            dockedItems: [Ext.apply({
                dock: 'right'
            }, {}, verticalToolbar)]
        }), xtype);
        panel(Ext.apply(config, {
            title: 'Docked bottom',
            dockedItems: [Ext.apply({
                dock: 'bottom'
            }, {}, horizontalToolbar)]
        }), xtype);
        panel(Ext.apply(config, {
            title: 'Docked left',
            dockedItems: [Ext.apply({
                dock: 'left'
            }, {}, verticalToolbar)]
        }), xtype);
    }
    
    var horizontalToolbar = {
        xtype: 'toolbar',
        items: [
            {
                xtype: 'button',
                text: 'Button 1'
            },
            {
                xtype: 'button',
                text: 'Button 2'
            },
            '-',
            {
                xtype: 'button',
                text: 'Button 3'
            }
        ]
    };
    
    var verticalToolbar = {
        xtype: 'toolbar',
        vertical: true,
        items: [
            {
                xtype: 'button',
                text: 'Button 1'
            },
            {
                xtype: 'button',
                text: 'Button 2'
            },
            '-',
            {
                xtype: 'button',
                text: 'Button 3'
            }
        ]
    };
    
    var buttons = [];
    
    var row = function(title, config, xtype) {
        var config = config || {};
        
        buttons.push(Ext.create('widget.button', {
            text: title,
            cls: 'floater',
            handler: function() {
                Ext.get('content').update();
                
                if (xtype) {
                    header(title);
                    hr();
                    panels(config, xtype);
                    hr();
                    panels(Ext.apply({}, config, {
                        frame: true
                    }), xtype);
                    hr();
                } else {
                    header(title);
                    hr();
                    panels(config);
                    hr();
                    panels(Ext.apply({}, config, {
                        frame: true
                    }));
                    hr();
                    panels(Ext.apply({}, config, {
                        floating: false,
                        hidden: false
                    }), 'widget.window');
                    hr();
                }
            }
        }));
    }
    
    var sep = function() {
        buttons.push('-');
    };
    
    /**
     * Actual Examples
     */
    
    row('no content');
    
    sep();
    
    row('no content (border:false)', {
        border: false
    });
    
    row('no content (border:0)', {
        border: 0
    });
    
    row('no content (bodyBorder:false)', {
        bodyBorder: false
    });
    
    row('no content (bodyBorder:0)', {
        bodyBorder: 0
    });
    
    row('no content (border:true, bodyBorder:0)', {
        border: true,
        bodyBorder: 0
    });
    
    row('no content (border:false, bodyBorder:true)', {
        border: false,
        bodyBorder: true
    });
    
    sep();
    
    row('html content', {
        html: 'test'
    });
    
    sep();
    
    row('widget.panel as an item', {
        items: [
            {
                xtype: 'panel',
                html: 'child panel'
            }
        ]
    });
    
    row('layout:fit - widget.panel as an item', {
        layout: 'fit',
        items: [
            {
                xtype: 'panel',
                html: 'child panel'
            }
        ]
    });
    
    row('layout:fit - widget.panel as an item (border:false)', {
        layout: 'fit',
        items: [
            {
                xtype: 'panel',
                border: false,
                html: 'child panel'
            }
        ]
    });
    
    sep();
    
    row('widget.fieldset as an item', {
        items: [
            {
                xtype: 'fieldset',
                items: [
                    {
                        xtype: 'textfield',
                        fieldLabel: 'Label'
                    }
                ]
            }
        ]
    });
    
    row('layout:fit - widget.fieldset as an item (title:"title")', {
        items: [
            {
                xtype: 'fieldset',
                title: 'title',
                items: [
                    {
                        xtype: 'textfield',
                        fieldLabel: 'Label'
                    }
                ]
            }
        ]
    });
    
    row('layout:fit - widget.fieldset as an item', {
        layout: 'fit',
        items: [
            {
                xtype: 'fieldset',
                items: [
                    {
                        xtype: 'textfield',
                        fieldLabel: 'Label'
                    }
                ]
            }
        ]
    });
    
    row('layout:fit - widget.fieldset as an item (title:"title")', {
        layout: 'fit',
        items: [
            {
                xtype: 'fieldset',
                title: 'title',
                items: [
                    {
                        xtype: 'textfield',
                        fieldLabel: 'Label'
                    }
                ]
            }
        ]
    });
    
    sep();
    
    Ext.define('mymodel', {
        extend: 'Ext.data.Model',
        fields: ['text', 'more']
    });
    
    var store = Ext.create('Ext.data.ArrayStore', {
        model: 'mymodel',
        data: [
            ['one', 'more'],
            ['two', 'more'],
            ['three', 'more'],
            ['four', 'more'],
            ['five', 'more'],
            ['six', 'more'],
            ['seven', 'more'],
            ['eight', 'more'],
            ['nine', 'more'],
            ['ten', 'more'],
            ['one', 'more'],
            ['two', 'more'],
            ['three', 'more'],
            ['four', 'more'],
            ['five', 'more'],
            ['six', 'more'],
            ['seven', 'more'],
            ['eight', 'more'],
            ['nine', 'more'],
            ['ten', 'more'],
            ['one', 'more'],
            ['two', 'more'],
            ['three', 'more'],
            ['four', 'more'],
            ['five', 'more'],
            ['six', 'more'],
            ['seven', 'more'],
            ['eight', 'more'],
            ['nine', 'more'],
            ['ten', 'more'],
            ['one', 'more'],
            ['two', 'more'],
            ['three', 'more'],
            ['four', 'more'],
            ['five', 'more'],
            ['six', 'more'],
            ['seven', 'more'],
            ['eight', 'more'],
            ['nine', 'more'],
            ['ten', 'more']
        ]
    })
    
    row('layout:fit - widget.gridpanel as an item', {
        layout: 'fit',
        items: [
            {
                xtype: 'gridpanel',
                store: store,
                columns: [
                    {
                        dataIndex: 'text',
                        flex: 3,
                        text: 'Number'
                    },
                    {
                        dataIndex: 'more',
                        text: 'More'
                    }
                ]
            }
        ]
    });
    
    row('layout:fit - widget.gridpanel as an item (border:false)', {
        layout: 'fit',
        items: [
            {
                xtype: 'gridpanel',
                store: store,
                border: false,
                columns: [
                    {
                        dataIndex: 'text',
                        flex: 3,
                        text: 'Number'
                    },
                    {
                        dataIndex: 'more',
                        text: 'More'
                    }
                ]
            }
        ]
    });
    
    row('widget.gridpanel', {
        store: store,
        columns: [
            {
                dataIndex: 'text',
                flex: 3,
                text: 'Number'
            },
            {
                dataIndex: 'more',
                text: 'More'
            }
        ]
    }, 'widget.gridpanel');
    
    row('layout:fit - widget.gridpanel as an item (hideBorders:true)', {
        layout: 'fit',
        items: [
            {
                xtype: 'gridpanel',
                hideHeaders: true,
                store: store,
                columns: [
                    {
                        dataIndex: 'text',
                        flex: 3,
                        text: 'Number'
                    },
                    {
                        dataIndex: 'more',
                        text: 'More'
                    }
                ]
            }
        ]
    });
    
    row('layout:fit - widget.gridpanel as an item (border:false, hideBorders:true)', {
        layout: 'fit',
        items: [
            {
                xtype: 'gridpanel',
                store: store,
                hideHeaders: true,
                border: false,
                columns: [
                    {
                        dataIndex: 'text',
                        flex: 3,
                        text: 'Number'
                    },
                    {
                        dataIndex: 'more',
                        text: 'More'
                    }
                ]
            }
        ]
    });
    
    row('widget.gridpanel (hideBorders:true)', {
        store: store,
        hideHeaders: true,
        columns: [
            {
                dataIndex: 'text',
                flex: 3,
                text: 'Number'
            },
            {
                dataIndex: 'more',
                text: 'More'
            }
        ]
    }, 'widget.gridpanel');
    
    sep();
    
    
    
    
    Ext.create('widget.viewport', {
        layout: 'fit',
        items: [
            {
                layout: 'fit',
                dockedItems: [
                    {
                        xtype: 'toolbar',
                        dock: 'left',
                        vertical: true,
                        items: buttons,
                        width: 300
                    }
                ],
                items: [
                    {
                        xtype: 'component',
                        id: 'content',
                        autoScroll: true
                    }
                ]
            }
        ]
    });
});
