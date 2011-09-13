/*

This file is part of Ext JS 4

Copyright (c) 2011 Sencha Inc

Contact:  http://www.sencha.com/contact

Commercial Usage
Licensees holding valid commercial licenses may use this file in accordance with the Commercial Software License Agreement provided with the Software or, alternatively, in accordance with the terms contained in a written agreement between you and Sencha.

If you are unsure which license is appropriate for your use, please contact the sales department at http://www.sencha.com/contact.

*/
Ext.onReady(function(){
    var title = new Ext.ux.BubblePanel({
        bodyStyle: 'padding-left: 8px;color: #0d2a59',
        renderTo: 'bubbleCt',
        html: '<h3>Ext.ux.BubblePanel</h3',
        width: 200,
        autoHeight: true
    });
    var cp = new Ext.ux.BubblePanel({
        renderTo: 'bubbleCt',
        padding: 5,
        width: 400,
        autoHeight: true,
        contentEl: 'bubble-markup'
    });

    var plainOldPanel = Ext.createWidget('panel', {
        renderTo: 'panelCt',
        padding: 5,
        frame: true,
        width: 400,
        autoHeight: true,
        title: 'Plain Old Panel',
        html: '<p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Sed metus nibh, sodales a, porta at, vulputate eget, dui. Pellentesque ut nisl. Maecenas tortor turpis, interdum non, sodales non, iaculis ac, lacus. Vestibulum auctor, tortor quis iaculis malesuada, libero lectus bibendum purus, sit amet tincidunt quam turpis vel lacus. In pellentesque nisl non sem. Suspendisse nunc sem, pretium eget, cursus a, fringilla vel, urna.<br/><br/>Aliquam commodo ullamcorper erat. Nullam vel justo in neque porttitor laoreet. Aenean lacus dui, consequat eu, adipiscing eget, nonummy non, nisi. Morbi nunc est, dignissim non, ornare sed, luctus eu, massa. Vivamus eget quam. Vivamus tincidunt diam nec urna. Curabitur velit.</p>'
    });

});



