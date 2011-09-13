Ext.data.JsonP.Ext_chart_interactions_Reset({
  "mixedInto": [

  ],
  "alias": null,
  "doc": "<p>The Reset interaction allows resetting of all previous user interactions with\nthe chart. By default the reset is triggered by a double-tap on the empty chart\narea; to customize the event use the event config.</p>\n\n<p>To attach this interaction to a chart, include an entry in the chart's\n<a href=\"#/api/Ext.chart.Chart-cfg-interactions\" rel=\"Ext.chart.Chart-cfg-interactions\" class=\"docClass\">interactions</a> config with the <code>reset</code> type:</p>\n\n<pre><code>new Ext.chart.Chart({\n    renderTo: Ext.getBody(),\n    width: 800,\n    height: 600,\n    store: store1,\n    axes: [ ...some axes options... ],\n    series: [ ...some series options... ],\n    interactions: [{\n        type: 'reset'\n    }]\n});\n</code></pre>\n",
  "allMixins": [

  ],
  "mixins": [

  ],
  "html_filename": "Reset.html",
  "inheritable": false,
  "author": "Nicolas Garcia Belmonte <nicolas@sencha.com>",
  "code_type": "assignment",
  "href": "Reset.html#Ext-chart-interactions-Reset",
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
        "type": "Boolean",
        "doc": "<p>If set to <code>true</code>, a dialog will be presented to the user to confirm that they want to reset\nthe chart. Defaults to <code>false</code>.</p>\n",
        "owner": "Ext.chart.interactions.Reset",
        "html_filename": "Reset.html",
        "inheritable": false,
        "href": "Reset.html#Ext-chart-interactions-Reset-cfg-confirm",
        "linenr": 36,
        "protected": false,
        "static": false,
        "private": false,
        "deprecated": null,
        "shortDoc": "If set to true, a dialog will be presented to the user to confirm that they want to reset\nthe chart. ...",
        "name": "confirm",
        "tagname": "cfg",
        "filename": "/Users/jamieavins/git/SDK/charts/src/chart/interactions/Reset.js"
      },
      {
        "alias": null,
        "type": "String",
        "doc": "<p>Specifies the text displayed in the confirmation dialog, if <a href=\"#/api/Ext.chart.interactions.Reset-cfg-confirm\" rel=\"Ext.chart.interactions.Reset-cfg-confirm\" class=\"docClass\">confirm</a> is <code>true</code>.\nDefaults to <code>'Reset the chart?'</code></p>\n",
        "owner": "Ext.chart.interactions.Reset",
        "html_filename": "Reset.html",
        "inheritable": false,
        "href": "Reset.html#Ext-chart-interactions-Reset-cfg-confirmText",
        "linenr": 49,
        "protected": false,
        "static": false,
        "private": false,
        "deprecated": null,
        "shortDoc": "Specifies the text displayed in the confirmation dialog, if confirm is true. ...",
        "name": "confirmText",
        "tagname": "cfg",
        "filename": "/Users/jamieavins/git/SDK/charts/src/chart/interactions/Reset.js"
      },
      {
        "alias": null,
        "type": "String",
        "doc": "<p>Specifies the title displayed in the confirmation dialog, if <a href=\"#/api/Ext.chart.interactions.Reset-cfg-confirm\" rel=\"Ext.chart.interactions.Reset-cfg-confirm\" class=\"docClass\">confirm</a> is <code>true</code>.\nDefaults to <code>'Reset'</code></p>\n",
        "owner": "Ext.chart.interactions.Reset",
        "html_filename": "Reset.html",
        "inheritable": false,
        "href": "Reset.html#Ext-chart-interactions-Reset-cfg-confirmTitle",
        "linenr": 42,
        "protected": false,
        "static": false,
        "private": false,
        "deprecated": null,
        "shortDoc": "Specifies the title displayed in the confirmation dialog, if confirm is true. ...",
        "name": "confirmTitle",
        "tagname": "cfg",
        "filename": "/Users/jamieavins/git/SDK/charts/src/chart/interactions/Reset.js"
      },
      {
        "alias": null,
        "type": "String",
        "doc": "<p>Defines the gesture type that should trigger the chart reset. Gestures that occur on a series\nitem will be ignored. Defaults to <code>doubletap</code>.</p>\n",
        "owner": "Ext.chart.interactions.Reset",
        "html_filename": "Reset.html",
        "inheritable": false,
        "href": "Reset.html#Ext-chart-interactions-Reset-cfg-gesture",
        "linenr": 29,
        "protected": false,
        "static": false,
        "private": false,
        "deprecated": null,
        "shortDoc": "Defines the gesture type that should trigger the chart reset. ...",
        "name": "gesture",
        "tagname": "cfg",
        "filename": "/Users/jamieavins/git/SDK/charts/src/chart/interactions/Reset.js"
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
  "name": "Ext.chart.interactions.Reset",
  "component": false,
  "tagname": "class",
  "singleton": false,
  "filename": "/Users/jamieavins/git/SDK/charts/src/chart/interactions/Reset.js"
});