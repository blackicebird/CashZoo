Ext.data.JsonP.Ext_chart_interactions_Rotate({
  "mixedInto": [

  ],
  "alias": null,
  "doc": "<p>The Rotate interaction allows rotation of a Pie or Radar chart series. By default rotation\nis performed via a single-finger drag around the center of the series, but can be configured\nto use a two-finger pinch-rotate gesture by setting <code>gesture: 'pinch'</code>.</p>\n\n<p>To attach this interaction to a chart, include an entry in the chart's\n<a href=\"#/api/Ext.chart.Chart-cfg-interactions\" rel=\"Ext.chart.Chart-cfg-interactions\" class=\"docClass\">interactions</a> config with the <code>rotate</code> type:</p>\n\n<pre><code>new Ext.chart.Chart({\n    renderTo: Ext.getBody(),\n    width: 800,\n    height: 600,\n    store: store1,\n    series: [ ...pie/radar series options... ],\n    interactions: [{\n        type: 'rotate'\n    }]\n});\n</code></pre>\n",
  "allMixins": [

  ],
  "mixins": [

  ],
  "html_filename": "Rotate.html",
  "inheritable": false,
  "author": "Jason Johnston <jason@sencha.com>",
  "code_type": "assignment",
  "href": "Rotate.html#Ext-chart-interactions-Rotate",
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
        "type": "String",
        "doc": "<p>Defines the gesture type that will be used to rotate the chart. Currently only\nsupports <code>pinch</code> for two-finger rotation and <code>drag</code> for single-finger rotation.\nDefaults to <code>drag</code>.</p>\n",
        "owner": "Ext.chart.interactions.Rotate",
        "html_filename": "Rotate.html",
        "inheritable": false,
        "href": "Rotate.html#Ext-chart-interactions-Rotate-cfg-gesture",
        "linenr": 27,
        "protected": false,
        "static": false,
        "private": false,
        "deprecated": null,
        "shortDoc": "Defines the gesture type that will be used to rotate the chart. ...",
        "name": "gesture",
        "tagname": "cfg",
        "filename": "/Users/jamieavins/git/SDK/charts/src/chart/interactions/Rotate.js"
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
  "name": "Ext.chart.interactions.Rotate",
  "component": false,
  "tagname": "class",
  "singleton": false,
  "filename": "/Users/jamieavins/git/SDK/charts/src/chart/interactions/Rotate.js"
});