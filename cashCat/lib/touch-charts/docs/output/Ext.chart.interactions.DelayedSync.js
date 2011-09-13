Ext.data.JsonP.Ext_chart_interactions_DelayedSync({
  "mixedInto": [

  ],
  "alias": null,
  "doc": "<p>This is a mixin for chart interactions which gives them basic support for synchronizing\nthe chart to the user's interaction after a configurable <a href=\"#/api/Ext.chart.interactions.DelayedSync-cfg-syncDelay\" rel=\"Ext.chart.interactions.DelayedSync-cfg-syncDelay\" class=\"docClass\">delay</a>. This\nis useful for example in interactions which perform fast CSS3 transformation during the\ninteraction's gesture, but needs to perform a full synchronization to that transformation\nfor full quality after a delay.</p>\n",
  "allMixins": [

  ],
  "mixins": [

  ],
  "html_filename": "DelayedSync.html",
  "inheritable": false,
  "author": "Jason Johnston <jason@sencha.com>",
  "code_type": "assignment",
  "href": "DelayedSync.html#Ext-chart-interactions-DelayedSync",
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
        "type": "Number",
        "doc": "<p>Specifies a timeout in milliseconds between when the user finishes an interaction\ngesture and when the chart are synced and redrawn to match.\nDefaults to 500.</p>\n",
        "owner": "Ext.chart.interactions.DelayedSync",
        "html_filename": "DelayedSync.html",
        "inheritable": false,
        "href": "DelayedSync.html#Ext-chart-interactions-DelayedSync-cfg-syncDelay",
        "linenr": 15,
        "protected": false,
        "static": false,
        "private": false,
        "deprecated": null,
        "shortDoc": "Specifies a timeout in milliseconds between when the user finishes an interaction\ngesture and when the chart are sync...",
        "name": "syncDelay",
        "tagname": "cfg",
        "filename": "/Users/jamieavins/git/SDK/charts/src/chart/interactions/DelayedSync.js"
      },
      {
        "alias": null,
        "type": "String",
        "doc": "<p>The text to be displayed while the chart is redrawing itself after the interaction sync.\nDefaults to 'Rendering...'.</p>\n",
        "owner": "Ext.chart.interactions.DelayedSync",
        "html_filename": "DelayedSync.html",
        "inheritable": false,
        "href": "DelayedSync.html#Ext-chart-interactions-DelayedSync-cfg-syncWaitText",
        "linenr": 23,
        "protected": false,
        "static": false,
        "private": false,
        "deprecated": null,
        "shortDoc": "The text to be displayed while the chart is redrawing itself after the interaction sync. ...",
        "name": "syncWaitText",
        "tagname": "cfg",
        "filename": "/Users/jamieavins/git/SDK/charts/src/chart/interactions/DelayedSync.js"
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
  "name": "Ext.chart.interactions.DelayedSync",
  "component": false,
  "tagname": "class",
  "singleton": false,
  "filename": "/Users/jamieavins/git/SDK/charts/src/chart/interactions/DelayedSync.js"
});