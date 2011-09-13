/*

This file is part of Ext JS 4

Copyright (c) 2011 Sencha Inc

Contact:  http://www.sencha.com/contact

Commercial Usage
Licensees holding valid commercial licenses may use this file in accordance with the Commercial Software License Agreement provided with the Software or, alternatively, in accordance with the terms contained in a written agreement between you and Sencha.

If you are unsure which license is appropriate for your use, please contact the sales department at http://www.sencha.com/contact.

*/
(function () {
    var match = /^\?([^=]+)$/.exec(location.search),
        testCase = match && match[1];

    if (testCase) {
        document.write('<link rel="stylesheet" type="text/css" href="'+testCase+'.css"/>');
        document.write('<script type="text/javascript" src="'+testCase+'.js"></script>');
        document.write('<title>'+testCase+'</title>');

        Ext.onReady(function () {
            if (typeof(title) === 'string') {
                document.title = testCase + ' - ' + title;
            }
        });
    } else {
        window.onload = function () {
            var p = document.createElement('p');
            p.innerHTML = '<font size="+2">Append "?ticket" to URL and reload</font>';
            document.body.appendChild(p);
        };
    }
})();

