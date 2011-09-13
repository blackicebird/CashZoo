/*

This file is part of Ext JS 4

Copyright (c) 2011 Sencha Inc

Contact:  http://www.sencha.com/contact

Commercial Usage
Licensees holding valid commercial licenses may use this file in accordance with the Commercial Software License Agreement provided with the Software or, alternatively, in accordance with the terms contained in a written agreement between you and Sencha.

If you are unsure which license is appropriate for your use, please contact the sales department at http://www.sencha.com/contact.

*/
Ext.require(['Ext.panel.Panel']);

Ext.onReady(function(){
    // Ext.create('widget.panel', {
    //     title: 'Left Header',
    //     width: 300,
    //     height: 200,
    //     renderTo: Ext.getBody(),
    //     headerPosition: 'left',
    //     collapsible: true,
    //     margin: 5
    // });
    // 
    // Ext.create('widget.panel', {
    //     title: 'Left Header',
    //     width: 300,
    //     height: 200,
    //     renderTo: Ext.getBody(),
    //     headerPosition: 'left',
    //     collapsible: true,
    //     margin: 5,
    //     collapsed: true
    // });
    // 
    // Ext.create('widget.panel', {
    //     title: 'Right Header',
    //     width: 300,
    //     height: 200,
    //     renderTo: Ext.getBody(),
    //     headerPosition: 'right',
    //     collapsible: true,
    //     collapsed: true
    // });
    // 
    // Ext.create('widget.panel', {
    //     title: 'Right Header',
    //     width: 300,
    //     height: 200,
    //     renderTo: Ext.getBody(),
    //     headerPosition: 'right',
    //     collapsible: true,
    //     margin: 5
    // });
    // 
    // Ext.create('widget.panel', {
    //     title: 'Bottom Header',
    //     width: 300,
    //     height: 50,
    //     renderTo: Ext.getBody(),
    //     headerPosition: 'bottom',
    //     collapsible: true,
    //     collapseDirection: 'top',
    //     margin: 5
    // });
    
    // Ext.create('widget.panel', {
    //     title: 'Top Header',
    //     width: 300,
    //     height: 50,
    //     renderTo: Ext.getBody(),
    //     headerPosition: 'top',
    //     collapsible: true,
    //     margin: 5
    // });
    // 
    // Ext.create('widget.panel', {
    //     title: 'Bottom Header',
    //     width: 300,
    //     height: 50,
    //     renderTo: Ext.getBody(),
    //     headerPosition: 'bottom',
    //     collapsible: true,
    //     collapseDirection: 'top',
    //     margin: 5,
    //     collapsed: true
    // });
    // 
    // Ext.create('widget.panel', {
    //     title: 'Top Header',
    //     width: 300,
    //     height: 50,
    //     renderTo: Ext.getBody(),
    //     headerPosition: 'top',
    //     collapsible: true,
    //     margin: 5,
    //     collapsed: true
    // });
    
    
    
    
    
    Ext.create('widget.panel', {
        title: 'Left Header',
        width: 300,
        height: 200,
        renderTo: Ext.getBody(),
        headerPosition: 'left',
        collapsible: true,
        frame: true,
        margin: 5
    });

    Ext.create('widget.panel', {
        title: 'Left Header',
        width: 300,
        height: 200,
        renderTo: Ext.getBody(),
        headerPosition: 'left',
        collapsible: true,
        frame: true,
        margin: 5,
        collapsed: true
    });
    
    Ext.create('widget.panel', {
        title: 'Right Header',
        width: 300,
        height: 200,
        renderTo: Ext.getBody(),
        headerPosition: 'right',
        collapsible: true,
        frame: true,
        collapsed: true
    });
    
    Ext.create('widget.panel', {
        title: 'Right Header',
        width: 300,
        height: 200,
        renderTo: Ext.getBody(),
        headerPosition: 'right',
        collapsible: true,
        margin: 5,
        frame: true
    });

    Ext.create('widget.panel', {
        title: 'Bottom Header',
        width: 300,
        height: 50,
        renderTo: Ext.getBody(),
        headerPosition: 'bottom',
        collapsible: true,
        collapseDirection: 'top',
        margin: 5,
        frame: true
    });
    
    Ext.create('widget.panel', {
        title: 'Top Header',
        width: 300,
        height: 50,
        renderTo: Ext.getBody(),
        headerPosition: 'top',
        collapsible: true,
        margin: 5,
        frame: true
    });
    
    Ext.create('widget.panel', {
        title: 'Bottom Header',
        width: 300,
        height: 50,
        renderTo: Ext.getBody(),
        headerPosition: 'bottom',
        collapsible: true,
        collapseDirection: 'top',
        margin: 5,
        collapsed: true,
        frame: true
    });
    
    Ext.create('widget.panel', {
        title: 'Top Header',
        width: 300,
        height: 50,
        renderTo: Ext.getBody(),
        headerPosition: 'top',
        collapsible: true,
        margin: 5,
        collapsed: true,
        frame: true
    });
});

