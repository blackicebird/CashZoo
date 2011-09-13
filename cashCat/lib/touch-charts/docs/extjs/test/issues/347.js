/*

This file is part of Ext JS 4

Copyright (c) 2011 Sencha Inc

Contact:  http://www.sencha.com/contact

Commercial Usage
Licensees holding valid commercial licenses may use this file in accordance with the Commercial Software License Agreement provided with the Software or, alternatively, in accordance with the terms contained in a written agreement between you and Sencha.

If you are unsure which license is appropriate for your use, please contact the sales department at http://www.sencha.com/contact.

*/
Ext.onReady(function(){
    var dh = Ext.DomHelper,
        // div
        textNode1 = document.getElementById('textnode1').childNodes[0],
        textNode2 = document.getElementById('textnode2').childNodes[0],
        textNode3 = document.getElementById('textnode3').childNodes[0],
        textNode4 = document.getElementById('textnode4').childNodes[0],
        table1 = document.getElementById('table1').childNodes[0],
        table2 = document.getElementById('table2').childNodes[0],
        table3 = document.getElementById('table3').childNodes[0],
        table4 = document.getElementById('table4').childNodes[0],
        div1 = document.getElementById('div1').childNodes[0],
        div2 = document.getElementById('div2').childNodes[0],
        div3 = document.getElementById('div3').childNodes[0],
        div4 = document.getElementById('div4').childNodes[0];
    var testBlock = Ext.getBody().createChild({
        cls: 'test-block'
    });
    testBlock.createChild({
        tag: 'h1',
        html: 'Ext.supports.Range: ' + Ext.supports.Range
    });

    testBlock.createChild({
        tag: 'h1',
        html: 'Ext.supports.CreateContextualFragment: ' + Ext.supports.CreateContextualFragment
    });
        
   // Ext.isTextNode tests
    testBlock.createChild({
        tag: 'h1',
        html: 'Ext.isTextNode(textNode1): ' + Ext.isTextNode(textNode1)
    });
    
    testBlock.createChild({
        tag: 'h1',
        html: 'Ext.isTextNode(div1): ' + Ext.isTextNode(div1)
    });
    testBlock.createChild({
        tag: 'h1',
        html: 'Ext.isTextNode(table1): ' + Ext.isTextNode(table1)
    });
    
    // context textnode
    dh.insertHtml('beforeBegin', textNode1, '<div class="inserted">1</div>');
    dh.insertHtml('afterBegin', textNode2, '<div class="inserted">1</div>');
    dh.insertHtml('beforeEnd', textNode3, '<div class="inserted">1</div>');
    dh.insertHtml('afterEnd', textNode4, '<div class="inserted">1</div>');
    dh.insertHtml('beforeBegin', textNode1, '<div class="inserted">2</div>');
    dh.insertHtml('afterBegin', textNode2, '<div class="inserted">2</div>');
    dh.insertHtml('beforeEnd', textNode3, '<div class="inserted">2</div>');
    dh.insertHtml('afterEnd', textNode4, '<div class="inserted">2</div>');
    dh.insertHtml('beforeBegin', textNode1, '<div class="inserted">3</div>');
    dh.insertHtml('afterBegin', textNode2, '<div class="inserted">3</div>');
    dh.insertHtml('beforeEnd', textNode3, '<div class="inserted">3</div>');
    dh.insertHtml('afterEnd', textNode4, '<div class="inserted">3</div>');    
    // context table 
    dh.insertHtml('beforeBegin', table1, '<div class="inserted">1</div>');
    dh.insertHtml('afterBegin', table2, '<tr class="inserted"><td>1</td></tr>');
    dh.insertHtml('beforeEnd', table3, '<tr class="inserted"><td>1</td></tr>');
    dh.insertHtml('afterEnd', table4, '<div class="inserted">1</div>');
    dh.insertHtml('beforeBegin', table1, '<div class="inserted">2</div>');
    dh.insertHtml('afterBegin', table2, '<tr class="inserted"><td>2</td></tr>');
    dh.insertHtml('beforeEnd', table3, '<tr class="inserted"><td>2</td></tr>');
    dh.insertHtml('afterEnd', table4, '<div class="inserted">2</div>');
    dh.insertHtml('beforeBegin', table1, '<div class="inserted">3</div>');
    dh.insertHtml('afterBegin', table2, '<tr class="inserted"><td>3</td></tr>');
    dh.insertHtml('beforeEnd', table3, '<tr class="inserted"><td>3</td></tr>');
    dh.insertHtml('afterEnd', table4, '<div class="inserted">3</div>');
    
    // context: div 
    dh.insertHtml('beforeBegin', div1, '<div class="inserted">1</div>');
    dh.insertHtml('afterBegin', div2, '<div class="inserted">1</div>');
    dh.insertHtml('beforeEnd', div3, '<div class="inserted">1</div>');
    dh.insertHtml('afterEnd', div4, '<div class="inserted">1</div>');    
    dh.insertHtml('beforeBegin', div1, '<div class="inserted">2</div>');
    dh.insertHtml('afterBegin', div2, '<div class="inserted">2</div>');
    dh.insertHtml('beforeEnd', div3, '<div class="inserted">2</div>');
    dh.insertHtml('afterEnd', div4, '<div class="inserted">2</div>');    
    dh.insertHtml('beforeBegin', div1, '<div class="inserted">3</div>');
    dh.insertHtml('afterBegin', div2, '<div class="inserted">3</div>');
    dh.insertHtml('beforeEnd', div3, '<div class="inserted">3</div>');
    dh.insertHtml('afterEnd', div4, '<div class="inserted">3</div>');
});
