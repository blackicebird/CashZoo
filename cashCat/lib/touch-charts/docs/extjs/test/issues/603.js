/*

This file is part of Ext JS 4

Copyright (c) 2011 Sencha Inc

Contact:  http://www.sencha.com/contact

Commercial Usage
Licensees holding valid commercial licenses may use this file in accordance with the Commercial Software License Agreement provided with the Software or, alternatively, in accordance with the terms contained in a written agreement between you and Sencha.

If you are unsure which license is appropriate for your use, please contact the sales department at http://www.sencha.com/contact.

*/
Ext.onReady(function() {
    function test(config) {
        var  testEl, html, el, results, tag, parent, display, position;
        
        testEl = Ext.getBody().createChild({
            style: {
                border: '1px solid black',
                padding: '5px',
                margin: '1px',
                width: '222.01px',
                float:'left'
            }
        });

        testEl.createChild({
            tag: 'h1',
            html: config.title || config.display,
            style: {
                'font-size': '14px'
            }
        });
        delete config.title;
        
        config['font-size'] = '12.01px';
        html = config.html;
        delete config.html;
        tag = config.tag;
        delete config.tag;
        parent = config.parent || testEl;
        delete config.parent;
        el = config.el;
        el = parent.createChild({
            tag: tag,
            html: html || 'A test text dsf sdf sd fsdf dsf dsfsd d',
            style: config
        });
        display = el.getStyle('display');
        position = el.getStyle('position');
        
        if (display === 'inline') {
            el.setStyle({'display' : 'inline-block'});
        }
        if (display === 'table-row' || display === 'table-row-group' || display === 'table-footer-group' ||
            display === 'table-header-group') {
            el.setStyle({'position': 'absolute'});
        }
        results = '<br /><table border="1"><caption>Width</caption>'
        results += '<tr><th>Methods</th><th>Results</th></tr>';
        results += '<tr><td>getWidth</td><td>' + el.getWidth() + '</td></tr>';
        results += "<tr><td>getStyle(width)</td><td>" + parseFloat(el.getStyle('width')) + '</td></tr>';
        results += "<tr><td>offsetWidth</td><td>" + el.dom.offsetWidth + '</td></tr>';
        results += "<tr><td>clientWidth</td><td>" + el.dom.clientWidth + '</td></tr>';
        if (Ext.isString(document.body.style.msTransformOrigin)) {
            results += '<tr><td>msTransformOrigin</td><td>' + parseFloat(el.dom.currentStyle.msTransformOrigin.split(' ')[0])*2 + '</td></tr>';
        }
        results += '<tr><td>border(lr)</td><td>' + el.getBorderWidth("lr") + '</td></tr>';
        results += '<tr><td>padding(lr)</td><td>' + el.getPadding("lr") + '</td></tr>';
        results += '</table>';
        
        results += '<br /><table border="1"><caption>Height</caption>'
        results += '<tr><th>Methods</th><th>Results</th></tr>';
        results += '<tr><td>getHeight</td><td>' + el.getHeight() + '</td></tr>';
        results += "<tr><td>getStyle(height)</td><td>" + parseFloat(el.getStyle('height')) + '</td></tr>';
        results += "<tr><td>offsetHeight</td><td>" + el.dom.offsetHeight + '</td></tr>';
        results += "<tr><td>clientHeight</td><td>" + el.dom.clientHeight + '</td></tr>';
        if (Ext.isString(document.body.style.msTransformOrigin)) {
            results += '<tr><td>msTransformOrigin</td><td>' + parseFloat(el.dom.currentStyle.msTransformOrigin.split(' ')[1])*2 + '</td></tr>';
        }
        results += '<tr><td>border(tb)</td><td>' + el.getBorderWidth("tb") + '</td></tr>';
        results += '<tr><td>padding(tb)</td><td>' + el.getPadding("tb") + '</td></tr>';
        results += '</table>';
        
        testEl.createChild({
            html: results
        });
        el.remove();
    } 
    
    Ext.getBody().createChild({
        tag: 'h1',
        html: 'Direct2DBug: ' + Ext.supports.Direct2DBug,
        style: {
            'font-size': '22px'
        }
    });
    
    Ext.getBody().createChild({
        tag: 'h1',
        html: 'Classics',
        style: {
            'font-size': '20px'
        }
    });
        
    test({
       display: 'none'
    });
    
    test({
       display: 'block'
    });
    
    test({
       display: 'inline'
    });
    
    test({
        display: 'inline-block'
    });
    
    
    test({
        display: 'list-item'
    });
    
    test({
        display: 'run-in'
    });
    
    Ext.getBody().createChild({
        tag: 'h1',
        html: 'Classic Mix',
        style: {
            'font-size': '20px',
            clear: 'both'
        }
    });
    
    test({
       title: 'block auto',
       display: 'block',
       height: 'auto',
       width: 'auto'
    });
    
    test({
       title: 'block containing inline',
       display: 'block',
       float: 'left',
       html: '<input role="checkbox"><label>A test text dsf sdf sd fsdf dsf dsfsd d<br/>A test text dsf sdf sd fsdf dsf dsfsd d</label>'
    });
    
    test({
       title: 'block fixed',
       display: 'block',
       height: '188.01px',
       width: '188.01px'
    });
    
    test({
       title: 'block padding fixed',
       display: 'block',
       padding: '10px'
    });
     
    test({
        title: 'inline + lb',
        display: 'inline',
        html: 'A test text dsf sdf sd fsdf dsf dsfsd d<br/>A test text dsf sdf sd fsdf dsf dsfsd d'
    });
    
    test({
        title: 'inline-block + lb',
        display: 'inline-block',
        html: 'A test text dsf sdf sd fsdf dsf dsfsd d<br/>A test text dsf sdf sd fsdf dsf dsfsd d'
    });
    
    Ext.getBody().createChild({
        tag: 'h1',
        html: 'Tables',
        style: {
            'font-size': '20px',
            clear: 'both'
        }
    });
    
    test({
        display: 'inline-table'
    });
    
    test({
        display: 'table'
    });
    
    var table = Ext.getBody().createChild({
        tag: 'table'
    });

    var tbody = table.child('tbody') || table.createChild({
        tag: 'tbody'
    });
    
    tbody.createChild({
        tag: 'tr',
        html: '<td>A test text dsf sdf sd fsdf dsf dsfsd d</td>'
    });
    
    try {
        test({
            title: 'table-caption',
            tag: 'caption',
            parent: table
        });
    } catch (e) {} 
    
    test({
        title: 'table-row-group',
        tag: 'tr',
        html: '<th>A test text dsf sdf sd fsdf dsf dsfsd d</th>',
        parent: table
    });
    
    test({
        title: 'table-row',
        tag: 'tr',
        html: '<td>A test text dsf sdf sd fsdf dsf dsfsd d</td>',
        parent: tbody
    });
    
    var tr = tbody.createChild({
        tag: 'tr'
    });
    
    test({
        title: 'table-cell',
        tag: 'td',
        parent: tr
    });  
      
    test({
        title: 'table-cell',
        tag: 'td',
        parent: tr
    });    
    tbody.remove();
    
    try {
        test({
            title: 'table-header-group',
            tag: 'thead',
            html: '<tr><td>A test text dsf sdf sd fsdf dsf dsfsd d</td></tr>',
            parent: table
        });   
    } catch (e) {} 
    
    try {
        test({
            title: 'table-footer-group',
            tag: 'tfoot',
            html: '<tr><td>A test text dsf sdf sd fsdf dsf dsfsd d</td></tr>',
            parent: table
        });
    } catch (e) {} 
    
    table.remove();
});
