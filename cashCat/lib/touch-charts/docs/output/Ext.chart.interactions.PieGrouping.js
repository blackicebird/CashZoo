Ext.data.JsonP.Ext_chart_interactions_PieGrouping({
  "mixedInto": [

  ],
  "alias": null,
  "doc": "<p>The PieGrouping interaction allows the user to select a group of consecutive slices\nin a <a href=\"#/api/Ext.chart.series.Pie\" rel=\"Ext.chart.series.Pie\" class=\"docClass\">pie series</a> to get additional information about the\ngroup. It provides an interactive user interface with handles that can be dragged\naround the pie to add/remove slices in the selection group.</p>\n\n<p>You can attach this interaction to a chart by including an entry in the chart's\n<a href=\"#/api/Ext.chart.Chart-cfg-interactions\" rel=\"Ext.chart.Chart-cfg-interactions\" class=\"docClass\">interactions</a> config with the <code>piegrouping</code> type:</p>\n\n<pre><code>new Ext.chart.Chart({\n    renderTo: Ext.getBody(),\n    width: 800,\n    height: 600,\n    store: store1,\n    series: [ ...pie series options... ],\n    interactions: [{\n        type: 'piegrouping'\n    }]\n});\n</code></pre>\n",
  "allMixins": [

  ],
  "mixins": [

  ],
  "html_filename": "PieGrouping.html",
  "inheritable": false,
  "author": "Jason Johnston <jason@sencha.com>",
  "code_type": "assignment",
  "href": "PieGrouping.html#Ext-chart-interactions-PieGrouping",
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
        "doc": "<p>Specifies the gesture that, when performed on a slice in the pie series, initializes the\nselection UI on that slice. Defaults to <code>tap</code>.</p>\n",
        "owner": "Ext.chart.interactions.PieGrouping",
        "html_filename": "PieGrouping.html",
        "inheritable": false,
        "href": "PieGrouping.html#Ext-chart-interactions-PieGrouping-cfg-gesture",
        "linenr": 31,
        "protected": false,
        "static": false,
        "private": false,
        "deprecated": null,
        "shortDoc": "Specifies the gesture that, when performed on a slice in the pie series, initializes the\nselection UI on that slice. ...",
        "name": "gesture",
        "tagname": "cfg",
        "filename": "/Users/jamieavins/git/SDK/charts/src/chart/interactions/PieGrouping.js"
      },
      {
        "alias": null,
        "type": "Function",
        "doc": "<p>A handler function that can be implemented to handle selection changes, as an alternative\nto adding a listener for the <a href=\"#/api/Ext.chart.interactions.PieGrouping-event-selectionchange\" rel=\"Ext.chart.interactions.PieGrouping-event-selectionchange\" class=\"docClass\">selectionchange</a> event. The function will be passed\nthe same parameters as are passed to selectionchange listeners.</p>\n",
        "owner": "Ext.chart.interactions.PieGrouping",
        "html_filename": "PieGrouping.html",
        "inheritable": false,
        "href": "PieGrouping.html#Ext-chart-interactions-PieGrouping-cfg-onSelectionChange",
        "linenr": 56,
        "protected": false,
        "static": false,
        "private": false,
        "deprecated": null,
        "shortDoc": "A handler function that can be implemented to handle selection changes, as an alternative\nto adding a listener for th...",
        "name": "onSelectionChange",
        "tagname": "cfg",
        "filename": "/Users/jamieavins/git/SDK/charts/src/chart/interactions/PieGrouping.js"
      },
      {
        "alias": null,
        "type": "Number",
        "doc": "<p>Specifies how far beyond the pie circle radius the selection overlay extends.\nDefaults to <code>6</code>.</p>\n",
        "owner": "Ext.chart.interactions.PieGrouping",
        "html_filename": "PieGrouping.html",
        "inheritable": false,
        "href": "PieGrouping.html#Ext-chart-interactions-PieGrouping-cfg-outset",
        "linenr": 41,
        "protected": false,
        "static": false,
        "private": false,
        "deprecated": null,
        "shortDoc": "Specifies how far beyond the pie circle radius the selection overlay extends. ...",
        "name": "outset",
        "tagname": "cfg",
        "filename": "/Users/jamieavins/git/SDK/charts/src/chart/interactions/PieGrouping.js"
      },
      {
        "alias": null,
        "type": "Boolean",
        "doc": "<p>If set to <code>true</code>, the selection overlay will snap to the nearest pie slice continuously\nwhile the user is dragging the handles, firing the <a href=\"#/api/Ext.chart.interactions.PieGrouping-event-selectionchange\" rel=\"Ext.chart.interactions.PieGrouping-event-selectionchange\" class=\"docClass\">selectionchange</a> event each\ntime it snaps. Otherwise, the selection will only snap to the nearest slice when the user\nreleases the handle drag, firing the event once. Defaults to <code>false</code>.</p>\n",
        "owner": "Ext.chart.interactions.PieGrouping",
        "html_filename": "PieGrouping.html",
        "inheritable": false,
        "href": "PieGrouping.html#Ext-chart-interactions-PieGrouping-cfg-snapWhileDragging",
        "linenr": 48,
        "protected": false,
        "static": false,
        "private": false,
        "deprecated": null,
        "shortDoc": "If set to true, the selection overlay will snap to the nearest pie slice continuously\nwhile the user is dragging the ...",
        "name": "snapWhileDragging",
        "tagname": "cfg",
        "filename": "/Users/jamieavins/git/SDK/charts/src/chart/interactions/PieGrouping.js"
      }
    ],
    "event": [
      {
        "alias": null,
        "doc": "<p>Fired when the set of selected pie slice items changes.</p>\n",
        "params": [
          {
            "doc": "\n",
            "type": "Ext.chart.interactions.PieGrouping",
            "name": "interaction",
            "optional": false
          },
          {
            "doc": "\n",
            "type": "Array",
            "name": "selectedItems",
            "optional": false
          }
        ],
        "owner": "Ext.chart.interactions.PieGrouping",
        "html_filename": "PieGrouping.html",
        "inheritable": false,
        "href": "PieGrouping.html#Ext-chart-interactions-PieGrouping-event-selectionchange",
        "linenr": 67,
        "protected": false,
        "static": false,
        "private": false,
        "deprecated": null,
        "shortDoc": "Fired when the set of selected pie slice items changes. ...",
        "name": "selectionchange",
        "tagname": "event",
        "filename": "/Users/jamieavins/git/SDK/charts/src/chart/interactions/PieGrouping.js"
      }
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
  "name": "Ext.chart.interactions.PieGrouping",
  "component": false,
  "tagname": "class",
  "singleton": false,
  "filename": "/Users/jamieavins/git/SDK/charts/src/chart/interactions/PieGrouping.js"
});