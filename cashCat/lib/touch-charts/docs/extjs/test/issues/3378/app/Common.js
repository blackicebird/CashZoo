/*

This file is part of Ext JS 4

Copyright (c) 2011 Sencha Inc

Contact:  http://www.sencha.com/contact

Commercial Usage
Licensees holding valid commercial licenses may use this file in accordance with the Commercial Software License Agreement provided with the Software or, alternatively, in accordance with the terms contained in a written agreement between you and Sencha.

If you are unsure which license is appropriate for your use, please contact the sales department at http://www.sencha.com/contact.

*/
if(typeof String.prototype.startsWith !== 'function') {
    String.prototype.startsWith = function (str) {
        return !this.indexOf(str);
    };
}
if(typeof String.prototype.endsWith !== 'function') {
    String.prototype.endsWith = function (str) {
        return this.indexOf(str, this.length - str.length) !== -1;
    };
}
if(typeof String.prototype.trim !== 'function') {
    String.prototype.trim = function() {
        return this.replace(/^\s+|\s+$/g, '');
    };
}
if(typeof String.prototype.contains !== 'function') {
    String.prototype.contains = function(value, ignorecase) {
        if (ignorecase) {
            return (this.toLowerCase().indexOf(value.toString().toLowerCase()) != -1);
        }
        else {
            return this.indexOf(value) != -1;
        }
    };
}
function addCommas(nStr)
{
	nStr += '';
	x = nStr.split('.');
	x1 = x[0];
	x2 = x.length > 1 ? '.' + x[1] : '';
	var rgx = /(\d+)(\d{3})/;
	while (rgx.test(x1)) {
		x1 = x1.replace(rgx, '$1' + ',' + '$2');
	}
	return x1 + x2;
}
function highlightText(node, regex, cls, deep) {
    if (typeof(regex) == 'string') {
        regex = new RegExp(regex, "igm");
    } else if (!regex.global) {
        throw "RegExp to highlight must use the global qualifier";
    }

        var value, df, m, l, start = 0, highlightSpan;
//  Note: You must add the trim function to the String's prototype
        if ((node.nodeType == 3) && (value = node.data.trim())) {

//      Loop through creating a document DocumentFragment containing text nodes interspersed with
//      <span class={cls}> elements wrapping the matched text.
            while (m = regex.exec(value)) {
                if (!df) {
                    df = document.createDocumentFragment();
                }
                if (l = m.index - start) {
                    df.appendChild(document.createTextNode(value.substr(start, l)));
                }
                highlightSpan = document.createElement('span');
                highlightSpan.className = cls;
                highlightSpan.appendChild(document.createTextNode(m[0]));
                df.appendChild(highlightSpan);
                start = m.index + m[0].length;
            }

//      If there is a resulting DocumentFragment, replace the original text node with the fragment
            if (df) {
                if (l = value.length - start) {
                    df.appendChild(document.createTextNode(value.substr(start, l)));
                }
                node.parentNode.replaceChild(df, node);
            }
        } else {
            if(deep) {
                Ext.each(node.childNodes, function(child){
                    highlightText(child, regex, cls, deep);
                });
            }
        }

}
function escapeRegExChars(s) {
    return s.replace(
                        new RegExp("([{}()^$&.*?\/+|[\\\\]|]|-)","g"),
                        "\\$1");

}
function columnWrap(val){
    var style = '';
    if (Ext.isIE) {
        style = '<pre style="font: normal 11px tahoma,arial,verdana;overflow:hidden;word-wrap:break-word";>' + val + '</pre>';
    }
    else {
        style = '<div style="word-wrap:break-word;white-space:normal !important;">'+ val +'</div>';
    }
    return style;
}
