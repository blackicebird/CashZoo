Ext.data.JsonP.Ext_chart_interactions_PanZoom({
  "mixedInto": [

  ],
  "alias": null,
  "doc": "<p>The PanZoom interaction allows the user to navigate the data for one or more chart\naxes by panning and/or zooming. Navigation can be limited to particular axes. Zooming is\nperformed by pinching on the chart or axis area; panning is performed by single-touch dragging.</p>\n\n<p>For devices which do not support multiple-touch events, zooming can not be done via pinch\ngestures; in this case the interaction will allow the user to perform both zooming and\npanning using the same single-touch drag gesture. Tapping the chart will switch between\nthe two modes, briefly displaying a graphical indicator\nshowing whether it is in zoom or pan mode.</p>\n\n<p>You can attach this interaction to a chart by including an entry in the chart's\n<a href=\"#/api/Ext.chart.Chart-cfg-interactions\" rel=\"Ext.chart.Chart-cfg-interactions\" class=\"docClass\">interactions</a> config with the <code>panzoom</code> type:</p>\n\n<pre><code>new Ext.chart.Chart({\n    renderTo: Ext.getBody(),\n    width: 800,\n    height: 600,\n    store: store1,\n    axes: [ ...some axes options... ],\n    series: [ ...some series options... ],\n    interactions: [{\n        type: 'panzoom',\n        axes: {\n            left: {\n                maxZoom: 5,\n                startZoom: 2\n            },\n            bottom: {\n                maxZoom: 2\n            }\n        }\n    }]\n});\n</code></pre>\n\n<p>The configuration object for the <code>panzoom</code> interaction type should specify which axes\nwill be made navigable via the <code>axes</code> config. See the <a href=\"#/api/Ext.chart.interactions.PanZoom-cfg-axes\" rel=\"Ext.chart.interactions.PanZoom-cfg-axes\" class=\"docClass\">axes</a> config documentation\nfor details on the allowed formats. If the <code>axes</code> config is not specified, it will default\nto making all axes navigable with the default axis options.</p>\n",
  "allMixins": [

  ],
  "mixins": [

  ],
  "html_filename": "PanZoom.html",
  "inheritable": false,
  "author": "Jason Johnston <jason@sencha.com>",
  "code_type": "assignment",
  "href": "PanZoom.html#Ext-chart-interactions-PanZoom",
  "subclasses": [

  ],
  "superclasses": [
    "Ext.chart.interactions.Abstract"
  ],
  "linenr": 1,
  "alternateClassNames": [

  ],
  "protected": false,
  "static": false,
  "extends": "Ext.chart.interactions.Abstract",
  "docauthor": "Jason Johnston <jason@sencha.com>",
  "members": {
    "property": [
      {
        "alias": null,
        "type": "Object",
        "doc": "<p>Placeholder method.</p>\n",
        "owner": "Ext.chart.interactions.Abstract",
        "html_filename": "Abstract2.html",
        "inheritable": false,
        "href": "Abstract2.html#Ext-chart-interactions-Abstract-property-onGesture",
        "linenr": 40,
        "protected": true,
        "static": false,
        "private": false,
        "deprecated": null,
        "name": "onGesture",
        "tagname": "property",
        "filename": "/Users/jamieavins/git/SDK/charts/src/chart/interactions/Abstract.js"
      }
    ],
    "css_var": [

    ],
    "css_mixin": [

    ],
    "method": [
      {
        "alias": null,
        "doc": "<p>Add an event listener to this interaction's chart. All ineteraction event listeners\nshould be attached using this method, since it adds logic for honoring event locks.</p>\n",
        "params": [
          {
            "doc": "\n",
            "type": "Object",
            "name": "name",
            "optional": false
          },
          {
            "doc": "\n",
            "type": "Object",
            "name": "fn",
            "optional": false
          },
          {
            "doc": "\n",
            "type": "Object",
            "name": "scope",
            "optional": false
          },
          {
            "doc": "\n",
            "type": "Object",
            "name": "opts",
            "optional": false
          }
        ],
        "owner": "Ext.chart.interactions.Abstract",
        "html_filename": "Abstract2.html",
        "inheritable": false,
        "href": "Abstract2.html#Ext-chart-interactions-Abstract-method-addChartListener",
        "linenr": 71,
        "protected": true,
        "static": false,
        "private": false,
        "deprecated": null,
        "shortDoc": "Add an event listener to this interaction's chart. ...",
        "name": "addChartListener",
        "tagname": "method",
        "filename": "/Users/jamieavins/git/SDK/charts/src/chart/interactions/Abstract.js",
        "return": {
          "doc": "\n",
          "type": "undefined"
        }
      },
      {
        "alias": null,
        "doc": "<p>Find and return a single series item corresponding to the given event,\nor null if no matching item is found.</p>\n",
        "params": [
          {
            "doc": "\n",
            "type": "Event",
            "name": "e",
            "optional": false
          }
        ],
        "owner": "Ext.chart.interactions.Abstract",
        "html_filename": "Abstract2.html",
        "inheritable": false,
        "href": "Abstract2.html#Ext-chart-interactions-Abstract-method-getItemForEvent",
        "linenr": 46,
        "protected": true,
        "static": false,
        "private": false,
        "deprecated": null,
        "shortDoc": "Find and return a single series item corresponding to the given event,\nor null if no matching item is found. ...",
        "name": "getItemForEvent",
        "tagname": "method",
        "filename": "/Users/jamieavins/git/SDK/charts/src/chart/interactions/Abstract.js",
        "return": {
          "doc": "<p>the item object or null if none found.</p>\n",
          "type": "Object"
        }
      },
      {
        "alias": null,
        "doc": "<p>Find and return all series items corresponding to the given event.</p>\n",
        "params": [
          {
            "doc": "\n",
            "type": "Event",
            "name": "e",
            "optional": false
          }
        ],
        "owner": "Ext.chart.interactions.Abstract",
        "html_filename": "Abstract2.html",
        "inheritable": false,
        "href": "Abstract2.html#Ext-chart-interactions-Abstract-method-getItemsForEvent",
        "linenr": 59,
        "protected": true,
        "static": false,
        "private": false,
        "deprecated": null,
        "shortDoc": "Find and return all series items corresponding to the given event. ...",
        "name": "getItemsForEvent",
        "tagname": "method",
        "filename": "/Users/jamieavins/git/SDK/charts/src/chart/interactions/Abstract.js",
        "return": {
          "doc": "<p>array of matching item objects</p>\n",
          "type": "Array"
        }
      },
      {
        "alias": null,
        "doc": "<p>A method to be implemented by subclasses where all event attachment should occur.</p>\n",
        "params": [

        ],
        "owner": "Ext.chart.interactions.Abstract",
        "html_filename": "Abstract2.html",
        "inheritable": false,
        "href": "Abstract2.html#Ext-chart-interactions-Abstract-method-initEvents",
        "linenr": 25,
        "protected": true,
        "static": false,
        "private": false,
        "deprecated": null,
        "shortDoc": "A method to be implemented by subclasses where all event attachment should occur. ...",
        "name": "initEvents",
        "tagname": "method",
        "filename": "/Users/jamieavins/git/SDK/charts/src/chart/interactions/Abstract.js",
        "return": {
          "doc": "\n",
          "type": "undefined"
        }
      }
    ],
    "cfg": [
      {
        "alias": null,
        "type": "Object/Array",
        "doc": "<p>Specifies which axes should be made navigable. The config value can take the following formats:</p>\n\n<ul>\n<li><p>An Object whose keys correspond to the <a href=\"#/api/Ext.chart.axis.Axis-cfg-position\" rel=\"Ext.chart.axis.Axis-cfg-position\" class=\"docClass\">position</a> of each\naxis that should be made navigable. Each key's value can either be an Object with further\nconfiguration options for each axis or simply <code>true</code> for a default set of options.</p>\n\n<pre><code>{\n    type: 'panzoom',\n    axes: {\n        left: {\n            maxZoom: 5,\n            allowPan: false\n        },\n        bottom: true\n    }\n}\n</code></pre>\n\n<p>If using the full Object form, the following options can be specified for each axis:</p>\n\n<ul>\n<li>minZoom (Number) A minimum zoom level for the axis. Defaults to <code>1</code> which is its natural size.</li>\n<li>maxZoom (Number) A maximum zoom level for the axis. Defaults to <code>10</code>.</li>\n<li>startZoom (Number) A starting zoom level for the axis. Defaults to <code>1</code>.</li>\n<li>allowZoom (Boolean) Whether zooming is allowed for the axis. Defaults to <code>true</code>.</li>\n<li>allowPan (Boolean) Whether panning is allowed for the axis. Defaults to <code>true</code>.</li>\n<li>startPan (Boolean) A starting panning offset for the axis. Defaults to <code>0</code>.</li>\n</ul>\n</li>\n<li><p>An Array of strings, each one corresponding to the <a href=\"#/api/Ext.chart.axis.Axis-cfg-position\" rel=\"Ext.chart.axis.Axis-cfg-position\" class=\"docClass\">position</a>\nof an axis that should be made navigable. The default options will be used for each named axis.</p>\n\n<pre><code>{\n    type: 'panzoom',\n    axes: ['left', 'bottom']\n}\n</code></pre></li>\n</ul>\n\n\n<p>If the <code>axes</code> config is not specified, it will default to making all axes navigable with the\ndefault axis options.</p>\n",
        "owner": "Ext.chart.interactions.PanZoom",
        "html_filename": "PanZoom.html",
        "inheritable": false,
        "href": "PanZoom.html#Ext-chart-interactions-PanZoom-cfg-axes",
        "linenr": 49,
        "protected": false,
        "static": false,
        "private": false,
        "deprecated": null,
        "shortDoc": "Specifies which axes should be made navigable. ...",
        "name": "axes",
        "tagname": "cfg",
        "filename": "/Users/jamieavins/git/SDK/charts/src/chart/interactions/PanZoom.js"
      },
      {
        "alias": null,
        "type": "String",
        "doc": "<p>Specifies which gesture type should be used for starting the interaction.\nDefaults to <code>tap</code>.</p>\n",
        "owner": "Ext.chart.interactions.Abstract",
        "html_filename": "Abstract2.html",
        "inheritable": false,
        "href": "Abstract2.html#Ext-chart-interactions-Abstract-cfg-gesture",
        "linenr": 12,
        "protected": false,
        "static": false,
        "private": false,
        "deprecated": null,
        "shortDoc": "Specifies which gesture type should be used for starting the interaction. ...",
        "name": "gesture",
        "tagname": "cfg",
        "filename": "/Users/jamieavins/git/SDK/charts/src/chart/interactions/Abstract.js"
      },
      {
        "alias": null,
        "type": "Object",
        "doc": "<p>A set of optional overrides for the overflow arrow sprites' options. Only relevant when\n<a href=\"#/api/Ext.chart.interactions.PanZoom-cfg-showOverflowArrows\" rel=\"Ext.chart.interactions.PanZoom-cfg-showOverflowArrows\" class=\"docClass\">showOverflowArrows</a> is <code>true</code>.</p>\n",
        "owner": "Ext.chart.interactions.PanZoom",
        "html_filename": "PanZoom.html",
        "inheritable": false,
        "href": "PanZoom.html#Ext-chart-interactions-PanZoom-cfg-overflowArrowOptions",
        "linenr": 102,
        "protected": false,
        "static": false,
        "private": false,
        "deprecated": null,
        "shortDoc": "A set of optional overrides for the overflow arrow sprites' options. ...",
        "name": "overflowArrowOptions",
        "tagname": "cfg",
        "filename": "/Users/jamieavins/git/SDK/charts/src/chart/interactions/PanZoom.js"
      },
      {
        "alias": null,
        "type": "Boolean",
        "doc": "<p>If <code>true</code>, arrows will be conditionally shown at either end of each axis to indicate that the\naxis is overflowing and can therefore be panned in that direction. Set this to <code>false</code> to\nprevent the arrows from being displayed. Defaults to <code>true</code>.</p>\n",
        "owner": "Ext.chart.interactions.PanZoom",
        "html_filename": "PanZoom.html",
        "inheritable": false,
        "href": "PanZoom.html#Ext-chart-interactions-PanZoom-cfg-showOverflowArrows",
        "linenr": 94,
        "protected": false,
        "static": false,
        "private": false,
        "deprecated": null,
        "shortDoc": "If true, arrows will be conditionally shown at either end of each axis to indicate that the\naxis is overflowing and c...",
        "name": "showOverflowArrows",
        "tagname": "cfg",
        "filename": "/Users/jamieavins/git/SDK/charts/src/chart/interactions/PanZoom.js"
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
  "name": "Ext.chart.interactions.PanZoom",
  "component": false,
  "tagname": "class",
  "singleton": false,
  "filename": "/Users/jamieavins/git/SDK/charts/src/chart/interactions/PanZoom.js"
});