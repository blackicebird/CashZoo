Ext.data.JsonP.Ext_chart_Toolbar({
  "mixedInto": [

  ],
  "alias": null,
  "doc": "<p>The chart toolbar is a container that is docked to one side of the chart, that is intended\nto hold buttons for performing user actions without taking up valuable screen real estate\nfrom the chart. This is used internally for things like the button for showing the legend\nwhen the legend is <a href=\"#/api/Ext.chart.Legend-cfg-dock\" rel=\"Ext.chart.Legend-cfg-dock\" class=\"docClass\">docked</a>, or the\n<a href=\"#/api/Ext.chart.interactions.PanZoom\" rel=\"Ext.chart.interactions.PanZoom\" class=\"docClass\">pan/zoom interaction</a>'s button for switching between\npan and zoom mode in non-multi-touch environments.</p>\n\n<p>An instance of this class is created automatically by the chart when it is needed; authors\nshould not need to instantiate it directly. To customize the configuration of the toolbar,\nspecify the chart's <a href=\"#/api/Ext.chart.Chart-cfg-toolbar\" rel=\"Ext.chart.Chart-cfg-toolbar\" class=\"docClass\">toolbar</a> config.</p>\n",
  "allMixins": [

  ],
  "mixins": [

  ],
  "html_filename": "Toolbar.html",
  "inheritable": false,
  "author": "Jason Johnston <jason@sencha.com>",
  "code_type": "assignment",
  "href": "Toolbar.html#Ext-chart-Toolbar",
  "subclasses": [

  ],
  "superclasses": [

  ],
  "linenr": 1,
  "alternateClassNames": [

  ],
  "protected": false,
  "static": false,
  "extends": "Ext.Container",
  "docauthor": "Jason Johnston <jason@sencha.com>",
  "members": {
    "property": [

    ],
    "css_var": [

    ],
    "css_mixin": [

    ],
    "method": [
      {
        "alias": null,
        "doc": "<p>Get the target position of the toolbar, after resolving any orientation-specific configs.\nIn most cases this method should be used rather than reading the <code>position</code> property directly.</p>\n",
        "params": [

        ],
        "owner": "Ext.chart.Toolbar",
        "html_filename": "Toolbar.html",
        "inheritable": false,
        "href": "Toolbar.html#Ext-chart-Toolbar-method-getPosition",
        "linenr": 67,
        "protected": false,
        "static": false,
        "private": false,
        "deprecated": null,
        "shortDoc": "Get the target position of the toolbar, after resolving any orientation-specific configs. ...",
        "name": "getPosition",
        "tagname": "method",
        "filename": "/Users/jamieavins/git/SDK/charts/src/chart/Toolbar.js",
        "return": {
          "doc": "<p>The position config value</p>\n",
          "type": "String"
        }
      },
      {
        "alias": null,
        "doc": "<p>Returns whether the toolbar is configured with orientation-specific positions.</p>\n",
        "params": [

        ],
        "owner": "Ext.chart.Toolbar",
        "html_filename": "Toolbar.html",
        "inheritable": false,
        "href": "Toolbar.html#Ext-chart-Toolbar-method-isOrientationSpecific",
        "linenr": 58,
        "protected": false,
        "static": false,
        "private": false,
        "deprecated": null,
        "shortDoc": "Returns whether the toolbar is configured with orientation-specific positions. ...",
        "name": "isOrientationSpecific",
        "tagname": "method",
        "filename": "/Users/jamieavins/git/SDK/charts/src/chart/Toolbar.js",
        "return": {
          "doc": "\n",
          "type": "Boolean"
        }
      },
      {
        "alias": null,
        "doc": "<p>Updates the toolbar to match the current viewport orientation.</p>\n",
        "params": [

        ],
        "owner": "Ext.chart.Toolbar",
        "html_filename": "Toolbar.html",
        "inheritable": false,
        "href": "Toolbar.html#Ext-chart-Toolbar-method-orient",
        "linenr": 92,
        "protected": true,
        "static": false,
        "private": false,
        "deprecated": null,
        "shortDoc": "Updates the toolbar to match the current viewport orientation. ...",
        "name": "orient",
        "tagname": "method",
        "filename": "/Users/jamieavins/git/SDK/charts/src/chart/Toolbar.js",
        "return": {
          "doc": "\n",
          "type": "undefined"
        }
      }
    ],
    "cfg": [
      {
        "alias": null,
        "type": "String",
        "doc": "<p>The position at which the toolbar should be docked in relation to the chart. Can be one of:</p>\n\n<ul>\n<li>\"top\" - positions the legend centered at the top of the chart</li>\n<li>\"bottom\" - positions the legend centered at the bottom of the chart</li>\n<li>\"left\" - positions the legend centered on the left side of the chart</li>\n<li><p>\"right\" - positions the legend centered on the right side of the chart</p>\n\n<p> toolbar: {</p>\n\n<pre><code> position: 'right'\n</code></pre>\n\n<p> }</p></li>\n</ul>\n\n\n<p>In addition, you can specify different positionss based on the orientation of the browser viewport,\nfor instance you might want to put the toolbar on the right in landscape orientation but on the bottom in\nportrait orientation. To achieve this, you can set the <code>position</code> config to an Object with <code>portrait</code> and\n<code>landscape</code> properties, and set the value of those properties to one of the recognized value types described\nabove. For example, the following config will put the toolbar on the right in landscape and on the bottom\nin portrait:</p>\n\n<pre><code>toolbar:\n    position: {\n        landscape: 'right',\n        portrait: 'bottom'\n    }\n}\n</code></pre>\n\n<p>If not specified, the position will default to the configured position of the chart legend (if\na legend is configured), or 'bottom' otherwise.</p>\n",
        "owner": "Ext.chart.Toolbar",
        "html_filename": "Toolbar.html",
        "inheritable": false,
        "href": "Toolbar.html#Ext-chart-Toolbar-cfg-position",
        "linenr": 26,
        "protected": false,
        "static": false,
        "private": false,
        "deprecated": null,
        "shortDoc": "The position at which the toolbar should be docked in relation to the chart. ...",
        "name": "position",
        "tagname": "cfg",
        "filename": "/Users/jamieavins/git/SDK/charts/src/chart/Toolbar.js"
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
  "name": "Ext.chart.Toolbar",
  "component": false,
  "tagname": "class",
  "singleton": false,
  "filename": "/Users/jamieavins/git/SDK/charts/src/chart/Toolbar.js"
});