Ext.data.JsonP.Ext_chart_interactions_ItemCompare({
  "mixedInto": [

  ],
  "alias": null,
  "doc": "<p>The ItemCompare interaction allows the user to select two data points in a series and\nsee a trend comparison between the two. An arrowed line will be drawn between the two points.</p>\n\n<p>You can attach this interaction to a chart by including an entry in the chart's\n<a href=\"#/api/Ext.chart.Chart-cfg-interactions\" rel=\"Ext.chart.Chart-cfg-interactions\" class=\"docClass\">interactions</a> config with the <code>itemcompare</code> type:</p>\n\n<pre><code>new Ext.chart.Chart({\n    renderTo: Ext.getBody(),\n    width: 800,\n    height: 600,\n    store: store1,\n    axes: [ ...some axes options... ],\n    series: [ ...some series options... ],\n    interactions: [{\n        type: 'itemcompare'\n    }]\n});\n</code></pre>\n\n<p>The display of the arrowed line <a href=\"#/api/Ext.draw.Sprite\" rel=\"Ext.draw.Sprite\" class=\"docClass\">sprites</a> can be customized via the\n<a href=\"#/api/Ext.chart.interactions.ItemCompare-cfg-circle\" rel=\"Ext.chart.interactions.ItemCompare-cfg-circle\" class=\"docClass\">circle</a>, <a href=\"#/api/Ext.chart.interactions.ItemCompare-cfg-line\" rel=\"Ext.chart.interactions.ItemCompare-cfg-line\" class=\"docClass\">line</a>, and <a href=\"#/api/Ext.chart.interactions.ItemCompare-cfg-arrow\" rel=\"Ext.chart.interactions.ItemCompare-cfg-arrow\" class=\"docClass\">arrow</a> configs. It can also be given a global\n<a href=\"#/api/Ext.chart.interactions.ItemCompare-cfg-offset\" rel=\"Ext.chart.interactions.ItemCompare-cfg-offset\" class=\"docClass\">position offset</a>.</p>\n\n<p>Use the show and <a href=\"#/api/Ext.chart.interactions.ItemCompare-event-hide\" rel=\"Ext.chart.interactions.ItemCompare-event-hide\" class=\"docClass\">hide</a> events to perform additional actions when the trend\nis displayed or hidden, such as displaying the trend change percentage to the user. Handlers\nfor these events are passed a reference to the ItemCompare interaction instance, so you\ncan access data from the <a href=\"#/api/Ext.chart.interactions.ItemCompare-property-item1\" rel=\"Ext.chart.interactions.ItemCompare-property-item1\" class=\"docClass\">item1</a> and <a href=\"#/api/Ext.chart.interactions.ItemCompare-property-item2\" rel=\"Ext.chart.interactions.ItemCompare-property-item2\" class=\"docClass\">item2</a> properties.</p>\n",
  "allMixins": [

  ],
  "mixins": [

  ],
  "html_filename": "ItemCompare.html",
  "inheritable": false,
  "author": "Nicolas Garcia Belmonte <nicolas@sencha.com>",
  "code_type": "assignment",
  "href": "ItemCompare.html#Ext-chart-interactions-ItemCompare",
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
        "doc": "<p>An object containing information about the first selected data point item if any.</p>\n",
        "owner": "Ext.chart.interactions.ItemCompare",
        "html_filename": "ItemCompare.html",
        "inheritable": false,
        "href": "ItemCompare.html#Ext-chart-interactions-ItemCompare-property-item1",
        "linenr": 61,
        "protected": false,
        "static": false,
        "private": false,
        "deprecated": null,
        "name": "item1",
        "tagname": "property",
        "filename": "/Users/jamieavins/git/SDK/charts/src/chart/interactions/ItemCompare.js"
      },
      {
        "alias": null,
        "type": "Object",
        "doc": "<p>An object containing information about the second selected data point item if any.</p>\n",
        "owner": "Ext.chart.interactions.ItemCompare",
        "html_filename": "ItemCompare.html",
        "inheritable": false,
        "href": "ItemCompare.html#Ext-chart-interactions-ItemCompare-property-item2",
        "linenr": 67,
        "protected": false,
        "static": false,
        "private": false,
        "deprecated": null,
        "name": "item2",
        "tagname": "property",
        "filename": "/Users/jamieavins/git/SDK/charts/src/chart/interactions/ItemCompare.js"
      },
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
      },
      {
        "alias": null,
        "doc": "<p>Resets any selected comparison items, removes the overlay arrow if present, and fires\nthe 'hide' event.</p>\n",
        "params": [

        ],
        "owner": "Ext.chart.interactions.ItemCompare",
        "html_filename": "ItemCompare.html",
        "inheritable": false,
        "href": "ItemCompare.html#Ext-chart-interactions-ItemCompare-method-reset",
        "linenr": 140,
        "protected": false,
        "static": false,
        "private": false,
        "deprecated": null,
        "shortDoc": "Resets any selected comparison items, removes the overlay arrow if present, and fires\nthe 'hide' event. ...",
        "name": "reset",
        "tagname": "method",
        "filename": "/Users/jamieavins/git/SDK/charts/src/chart/interactions/ItemCompare.js",
        "return": {
          "doc": "\n",
          "type": "undefined"
        }
      }
    ],
    "cfg": [
      {
        "alias": null,
        "type": "Object",
        "doc": "<p>Custom <a href=\"#/api/Ext.draw.Sprite\" rel=\"Ext.draw.Sprite\" class=\"docClass\">Ext.draw.Sprite</a> configuration to be applied to the sprite for the trend\nline's ending arrow.</p>\n",
        "owner": "Ext.chart.interactions.ItemCompare",
        "html_filename": "ItemCompare.html",
        "inheritable": false,
        "href": "ItemCompare.html#Ext-chart-interactions-ItemCompare-cfg-arrow",
        "linenr": 49,
        "protected": false,
        "static": false,
        "private": false,
        "deprecated": null,
        "name": "arrow",
        "tagname": "cfg",
        "filename": "/Users/jamieavins/git/SDK/charts/src/chart/interactions/ItemCompare.js"
      },
      {
        "alias": null,
        "type": "Object",
        "doc": "<p>Custom <a href=\"#/api/Ext.draw.Sprite\" rel=\"Ext.draw.Sprite\" class=\"docClass\">Ext.draw.Sprite</a> configuration to be applied to the sprite for the trend\nline's starting circle.</p>\n",
        "owner": "Ext.chart.interactions.ItemCompare",
        "html_filename": "ItemCompare.html",
        "inheritable": false,
        "href": "ItemCompare.html#Ext-chart-interactions-ItemCompare-cfg-circle",
        "linenr": 37,
        "protected": false,
        "static": false,
        "private": false,
        "deprecated": null,
        "name": "circle",
        "tagname": "cfg",
        "filename": "/Users/jamieavins/git/SDK/charts/src/chart/interactions/ItemCompare.js"
      },
      {
        "alias": null,
        "type": "String",
        "doc": "<p>Specifies which gesture type should be used for selecting the items to be compared.\nDefaults to <code>tap</code>.</p>\n",
        "owner": "Ext.chart.interactions.ItemCompare",
        "html_filename": "ItemCompare.html",
        "inheritable": false,
        "href": "ItemCompare.html#Ext-chart-interactions-ItemCompare-cfg-gesture",
        "linenr": 73,
        "protected": false,
        "static": false,
        "private": false,
        "deprecated": null,
        "shortDoc": "Specifies which gesture type should be used for selecting the items to be compared. ...",
        "name": "gesture",
        "tagname": "cfg",
        "filename": "/Users/jamieavins/git/SDK/charts/src/chart/interactions/ItemCompare.js"
      },
      {
        "alias": null,
        "type": "Object",
        "doc": "<p>Custom <a href=\"#/api/Ext.draw.Sprite\" rel=\"Ext.draw.Sprite\" class=\"docClass\">Ext.draw.Sprite</a> configuration to be applied to the sprite for the trend\nline's connecting line.</p>\n",
        "owner": "Ext.chart.interactions.ItemCompare",
        "html_filename": "ItemCompare.html",
        "inheritable": false,
        "href": "ItemCompare.html#Ext-chart-interactions-ItemCompare-cfg-line",
        "linenr": 43,
        "protected": false,
        "static": false,
        "private": false,
        "deprecated": null,
        "name": "line",
        "tagname": "cfg",
        "filename": "/Users/jamieavins/git/SDK/charts/src/chart/interactions/ItemCompare.js"
      },
      {
        "alias": null,
        "type": "Object",
        "doc": "<p>An optional x and y offset for the trend line's sprites in relation to the series items'\ntarget points. Defaults to <code>{x:0, y:0}</code>.</p>\n",
        "owner": "Ext.chart.interactions.ItemCompare",
        "html_filename": "ItemCompare.html",
        "inheritable": false,
        "href": "ItemCompare.html#Ext-chart-interactions-ItemCompare-cfg-offset",
        "linenr": 55,
        "protected": false,
        "static": false,
        "private": false,
        "deprecated": null,
        "shortDoc": "An optional x and y offset for the trend line's sprites in relation to the series items'\ntarget points. ...",
        "name": "offset",
        "tagname": "cfg",
        "filename": "/Users/jamieavins/git/SDK/charts/src/chart/interactions/ItemCompare.js"
      }
    ],
    "event": [
      {
        "alias": null,
        "doc": "<p>Fired when the point-to-point comparison is hidden</p>\n",
        "params": [
          {
            "doc": "<p>interaction instance</p>\n",
            "type": "Ext.chart.interactions.ItemCompare",
            "name": "this",
            "optional": false
          }
        ],
        "owner": "Ext.chart.interactions.ItemCompare",
        "html_filename": "ItemCompare.html",
        "inheritable": false,
        "href": "ItemCompare.html#Ext-chart-interactions-ItemCompare-event-hide",
        "linenr": 92,
        "protected": false,
        "static": false,
        "private": false,
        "deprecated": null,
        "shortDoc": "Fired when the point-to-point comparison is hidden ...",
        "name": "hide",
        "tagname": "event",
        "filename": "/Users/jamieavins/git/SDK/charts/src/chart/interactions/ItemCompare.js"
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
  "name": "Ext.chart.interactions.ItemCompare",
  "component": false,
  "tagname": "class",
  "singleton": false,
  "filename": "/Users/jamieavins/git/SDK/charts/src/chart/interactions/ItemCompare.js"
});