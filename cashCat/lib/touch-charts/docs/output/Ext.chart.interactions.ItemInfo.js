Ext.data.JsonP.Ext_chart_interactions_ItemInfo({
  "mixedInto": [

  ],
  "alias": null,
  "doc": "<p>The ItemInfo interaction allows displaying detailed information about a series data\npoint in a popup panel.</p>\n\n<p>To attach this interaction to a chart, include an entry in the chart's\n<a href=\"#/api/Ext.chart.Chart-cfg-interactions\" rel=\"Ext.chart.Chart-cfg-interactions\" class=\"docClass\">interactions</a> config with the <code>iteminfo</code> type:</p>\n\n<pre><code>new Ext.chart.Chart({\n    renderTo: Ext.getBody(),\n    width: 800,\n    height: 600,\n    store: store1,\n    axes: [ ...some axes options... ],\n    series: [ ...some series options... ],\n    interactions: [{\n        type: 'iteminfo',\n        listeners: {\n            show: function(me, item, panel) {\n                panel.update('Stock Price: $' + item.storeItem.get('price'));\n            }\n        }\n    }]\n});\n</code></pre>\n",
  "allMixins": [

  ],
  "mixins": [

  ],
  "html_filename": "ItemInfo.html",
  "inheritable": false,
  "author": "Nicolas Garcia Belmonte <nicolas@sencha.com>",
  "code_type": "assignment",
  "href": "ItemInfo.html#Ext-chart-interactions-ItemInfo",
  "subclasses": [

  ],
  "superclasses": [

  ],
  "linenr": 1,
  "alternateClassNames": [

  ],
  "protected": false,
  "static": false,
  "extends": "Ext.util.Observable",
  "docauthor": "Jason Johnston <jason@sencha.com>",
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
        "type": "String",
        "doc": "<p>Defines the gesture type that should trigger the item info panel to be displayed.\nDefaults to <code>tap</code>.</p>\n",
        "owner": "Ext.chart.interactions.ItemInfo",
        "html_filename": "ItemInfo.html",
        "inheritable": false,
        "href": "ItemInfo.html#Ext-chart-interactions-ItemInfo-cfg-gesture",
        "linenr": 33,
        "protected": false,
        "static": false,
        "private": false,
        "deprecated": null,
        "shortDoc": "Defines the gesture type that should trigger the item info panel to be displayed. ...",
        "name": "gesture",
        "tagname": "cfg",
        "filename": "/Users/jamieavins/git/SDK/charts/src/chart/interactions/ItemInfo.js"
      },
      {
        "alias": null,
        "type": "Object",
        "doc": "<p>An optional set of configuration overrides for the Ext.Panel that gets\ndisplayed. This object will be merged with the default panel configuration.</p>\n",
        "owner": "Ext.chart.interactions.ItemInfo",
        "html_filename": "ItemInfo.html",
        "inheritable": false,
        "href": "ItemInfo.html#Ext-chart-interactions-ItemInfo-cfg-panel",
        "linenr": 40,
        "protected": false,
        "static": false,
        "private": false,
        "deprecated": null,
        "shortDoc": "An optional set of configuration overrides for the Ext.Panel that gets\ndisplayed. ...",
        "name": "panel",
        "tagname": "cfg",
        "filename": "/Users/jamieavins/git/SDK/charts/src/chart/interactions/ItemInfo.js"
      }
    ],
    "event": [
      {
        "alias": null,
        "doc": "<p>Fires when the info panel is shown.</p>\n",
        "params": [
          {
            "doc": "<p>The interaction instance</p>\n",
            "type": "Ext.chart.interactions.ItemInfo",
            "name": "this",
            "optional": false
          },
          {
            "doc": "<p>The item whose info is being displayed</p>\n",
            "type": "Object",
            "name": "item",
            "optional": false
          },
          {
            "doc": "<p>The panel for displaying the info</p>\n",
            "type": "Ext.Panel",
            "name": "panel",
            "optional": false
          }
        ],
        "owner": "Ext.chart.interactions.ItemInfo",
        "html_filename": "ItemInfo.html",
        "inheritable": false,
        "href": "ItemInfo.html#Ext-chart-interactions-ItemInfo-event-show",
        "linenr": 50,
        "protected": false,
        "static": false,
        "private": false,
        "deprecated": null,
        "shortDoc": "Fires when the info panel is shown. ...",
        "name": "show",
        "tagname": "event",
        "filename": "/Users/jamieavins/git/SDK/charts/src/chart/interactions/ItemInfo.js"
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
  "name": "Ext.chart.interactions.ItemInfo",
  "component": false,
  "tagname": "class",
  "singleton": false,
  "filename": "/Users/jamieavins/git/SDK/charts/src/chart/interactions/ItemInfo.js"
});