Ext.data.JsonP.Ext_chart_Label({
  "mixedInto": [

  ],
  "alias": null,
  "doc": "<p>Labels is a mixin whose methods are appended onto the Series class. Labels is an interface with methods implemented\nin each of the Series (Pie, Bar, etc) for label creation and label placement.</p>\n\n<p>The methods implemented by the Series are:</p>\n\n<ul>\n<li><p><strong><code>onCreateLabel(storeItem, item, i, display)</code></strong> Called each time a new label is created.\nThe arguments of the method are:</p>\n\n<ul>\n<li><em><code>storeItem</code></em> The element of the store that is related to the label sprite.</li>\n<li><em><code>item</code></em> The item related to the label sprite. An item is an object containing the position of the shape\nused to describe the visualization and also pointing to the actual shape (circle, rectangle, path, etc).</li>\n<li><em><code>i</code></em> The index of the element created (i.e the first created label, second created label, etc)</li>\n<li><em><code>display</code></em> The display type. May be <b>false</b> if the label is hidden</li>\n</ul>\n</li>\n<li><p><strong><code>onPlaceLabel(label, storeItem, item, i, display, animate)</code></strong> Called for updating the position of the label.\nThe arguments of the method are:</p>\n\n<ul>\n<li><em><code>label</code></em> The sprite label.</li></li>\n<li><em><code>storeItem</code></em> The element of the store that is related to the label sprite</li></li>\n<li><em><code>item</code></em> The item related to the label sprite. An item is an object containing the position of the shape\nused to describe the visualization and also pointing to the actual shape (circle, rectangle, path, etc).</li>\n<li><em><code>i</code></em> The index of the element to be updated (i.e. whether it is the first, second, third from the labelGroup)</li>\n<li><em><code>display</code></em> The display type. May be <b>false</b> if the label is hidden.</li>\n<li><em><code>animate</code></em> A boolean value to set or unset animations for the labels.</li>\n</ul>\n</li>\n</ul>\n\n",
  "allMixins": [

  ],
  "mixins": [

  ],
  "html_filename": "Label.html",
  "inheritable": false,
  "author": null,
  "code_type": "assignment",
  "href": "Label.html#Ext-chart-Label",
  "subclasses": [

  ],
  "superclasses": [

  ],
  "linenr": 1,
  "alternateClassNames": [

  ],
  "protected": false,
  "static": false,
  "extends": "Object",
  "docauthor": null,
  "members": {
    "property": [

    ],
    "css_var": [

    ],
    "css_mixin": [

    ],
    "method": [

    ],
    "cfg": [
      {
        "alias": null,
        "type": "Object",
        "doc": "<p>Object with the following properties:</p>\n\n<ul>\n<li><strong>display</strong> : String</li>\n</ul>\n\n\n<p>Specifies the presence and position of labels for each pie slice. Either \"rotate\", \"middle\", \"insideStart\",\n\"insideEnd\", \"outside\", \"over\", \"under\", or \"none\" to prevent label rendering.\nDefault value: 'none'.</p>\n\n<ul>\n<li><strong>color</strong> : String</li>\n</ul>\n\n\n<p>The color of the label text.\nDefault value: '#000' (black).</p>\n\n<ul>\n<li><strong>contrast</strong> : Boolean</li>\n</ul>\n\n\n<p>True to render the label in contrasting color with the backround.\nDefault value: false.</p>\n\n<ul>\n<li><strong>field</strong> : String</li>\n</ul>\n\n\n<p>The name of the field to be displayed in the label.\nDefault value: 'name'.</p>\n\n<ul>\n<li><strong>minMargin</strong> : Number</li>\n</ul>\n\n\n<p>Specifies the minimum distance from a label to the origin of the visualization.\nThis parameter is useful when using PieSeries width variable pie slice lengths.\nDefault value: 50.</p>\n\n<ul>\n<li><strong>font</strong> : String</li>\n</ul>\n\n\n<p>The font used for the labels.\nDefault value: \"11px Helvetica, sans-serif\".</p>\n\n<ul>\n<li><strong>orientation</strong> : String</li>\n</ul>\n\n\n<p>Either \"horizontal\" or \"vertical\".\nDefault value: \"horizontal\".</p>\n\n<ul>\n<li><strong>renderer</strong> : Function</li>\n</ul>\n\n\n<p>Optional function for formatting the label into a displayable value.\nDefault value: function(v) { return v; }</p>\n",
        "owner": "Ext.chart.Label",
        "html_filename": "Label.html",
        "inheritable": false,
        "href": "Label.html#Ext-chart-Label-cfg-label",
        "linenr": 29,
        "protected": false,
        "static": false,
        "private": false,
        "deprecated": null,
        "shortDoc": "Object with the following properties:\n\n\ndisplay : String\n\n\n\nSpecifies the presence and position of labels for each pi...",
        "name": "label",
        "tagname": "cfg",
        "filename": "/Users/jamieavins/git/SDK/charts/src/chart/Label.js"
      }
    ],
    "event": [

    ]
  },
  "xtypes": [

  ],
  "statics": {
    "property": [

    ],
    "css_var": [

    ],
    "css_mixin": [

    ],
    "method": [

    ],
    "cfg": [

    ],
    "event": [

    ]
  },
  "private": false,
  "deprecated": null,
  "name": "Ext.chart.Label",
  "component": false,
  "tagname": "class",
  "singleton": false,
  "filename": "/Users/jamieavins/git/SDK/charts/src/chart/Label.js"
});