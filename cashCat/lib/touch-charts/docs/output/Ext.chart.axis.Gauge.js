Ext.data.JsonP.Ext_chart_axis_Gauge({
  "mixedInto": [

  ],
  "alias": null,
  "doc": "<p>Gauge Axis is the axis to be used with a Gauge series. The Gauge axis\ndisplays numeric data from an interval defined by the <code>minimum</code>, <code>maximum</code> and\n<code>step</code> configuration properties. The placement of the numeric data can be changed\nby altering the <code>margin</code> option that is set to <code>10</code> by default.</p>\n\n<p>A possible configuration for this axis would look like:</p>\n\n<pre><code>axes: [{\n    type: 'gauge',\n    position: 'gauge',\n    minimum: 0,\n    maximum: 100,\n    steps: 10,\n    margin: 7\n}],\n</code></pre>\n",
  "allMixins": [

  ],
  "mixins": [

  ],
  "html_filename": "Gauge.html",
  "inheritable": false,
  "author": null,
  "code_type": "assignment",
  "href": "Gauge.html#Ext-chart-axis-Gauge",
  "subclasses": [

  ],
  "superclasses": [
    "Ext.chart.axis.Abstract"
  ],
  "linenr": 1,
  "alternateClassNames": [

  ],
  "protected": false,
  "static": false,
  "extends": "Ext.chart.axis.Abstract",
  "docauthor": null,
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
        "doc": "<p>Get the <a href=\"#/api/Ext.draw.Surface\" rel=\"Ext.draw.Surface\" class=\"docClass\">Ext.draw.Surface</a> instance for this axis.</p>\n",
        "params": [

        ],
        "owner": "Ext.chart.axis.Abstract",
        "html_filename": "Abstract.html",
        "inheritable": false,
        "href": "Abstract.html#Ext-chart-axis-Abstract-method-getSurface",
        "linenr": 64,
        "protected": false,
        "static": false,
        "private": false,
        "deprecated": null,
        "shortDoc": "Get the Ext.draw.Surface instance for this axis. ...",
        "name": "getSurface",
        "tagname": "method",
        "filename": "/Users/jamieavins/git/SDK/charts/src/chart/axis/Abstract.js",
        "return": {
          "doc": "\n",
          "type": "Ext.draw.Surface"
        }
      },
      {
        "alias": null,
        "doc": "<p>Hides all axis labels.</p>\n",
        "params": [

        ],
        "owner": "Ext.chart.axis.Abstract",
        "html_filename": "Abstract.html",
        "inheritable": false,
        "href": "Abstract.html#Ext-chart-axis-Abstract-method-hideLabels",
        "linenr": 79,
        "protected": false,
        "static": false,
        "private": false,
        "deprecated": null,
        "shortDoc": "Hides all axis labels. ...",
        "name": "hideLabels",
        "tagname": "method",
        "filename": "/Users/jamieavins/git/SDK/charts/src/chart/axis/Abstract.js",
        "return": {
          "doc": "\n",
          "type": "undefined"
        }
      },
      {
        "alias": null,
        "doc": "<p>Invokes renderFrame on this axis's surface(s)</p>\n",
        "params": [

        ],
        "owner": "Ext.chart.axis.Abstract",
        "html_filename": "Abstract.html",
        "inheritable": false,
        "href": "Abstract.html#Ext-chart-axis-Abstract-method-renderFrame",
        "linenr": 109,
        "protected": false,
        "static": false,
        "private": false,
        "deprecated": null,
        "shortDoc": "Invokes renderFrame on this axis's surface(s) ...",
        "name": "renderFrame",
        "tagname": "method",
        "filename": "/Users/jamieavins/git/SDK/charts/src/chart/axis/Abstract.js",
        "return": {
          "doc": "\n",
          "type": "undefined"
        }
      },
      {
        "alias": null,
        "doc": "<p>Reset the axis to its original state, before any user interaction.</p>\n",
        "params": [

        ],
        "owner": "Ext.chart.axis.Abstract",
        "html_filename": "Abstract.html",
        "inheritable": false,
        "href": "Abstract.html#Ext-chart-axis-Abstract-method-reset",
        "linenr": 102,
        "protected": false,
        "static": false,
        "private": false,
        "deprecated": null,
        "shortDoc": "Reset the axis to its original state, before any user interaction. ...",
        "name": "reset",
        "tagname": "method",
        "filename": "/Users/jamieavins/git/SDK/charts/src/chart/axis/Abstract.js",
        "return": {
          "doc": "\n",
          "type": "undefined"
        }
      },
      {
        "alias": null,
        "doc": "<p>Updates the title of this axis.</p>\n",
        "params": [
          {
            "doc": "\n",
            "type": "String",
            "name": "title",
            "optional": false
          }
        ],
        "owner": "Ext.chart.axis.Gauge",
        "html_filename": "Gauge.html",
        "inheritable": false,
        "href": "Gauge.html#Ext-chart-axis-Gauge-method-setTitle",
        "linenr": 124,
        "protected": false,
        "static": false,
        "private": false,
        "deprecated": null,
        "shortDoc": "Updates the title of this axis. ...",
        "name": "setTitle",
        "tagname": "method",
        "filename": "/Users/jamieavins/git/SDK/charts/src/chart/axis/Gauge.js",
        "return": {
          "doc": "\n",
          "type": "undefined"
        }
      }
    ],
    "cfg": [
      {
        "alias": null,
        "type": "Number",
        "doc": "<p>(optional) the offset positioning of the tick marks and labels in pixels. Default's 10.</p>\n",
        "owner": "Ext.chart.axis.Gauge",
        "html_filename": "Gauge.html",
        "inheritable": false,
        "href": "Gauge.html#Ext-chart-axis-Gauge-cfg-margin",
        "linenr": 35,
        "protected": false,
        "static": false,
        "private": false,
        "deprecated": null,
        "shortDoc": "(optional) the offset positioning of the tick marks and labels in pixels. ...",
        "name": "margin",
        "tagname": "cfg",
        "filename": "/Users/jamieavins/git/SDK/charts/src/chart/axis/Gauge.js"
      },
      {
        "alias": null,
        "type": "Number",
        "doc": "<p>(required) the maximum value of the interval to be displayed in the axis.</p>\n",
        "owner": "Ext.chart.axis.Gauge",
        "html_filename": "Gauge.html",
        "inheritable": false,
        "href": "Gauge.html#Ext-chart-axis-Gauge-cfg-maximum",
        "linenr": 27,
        "protected": false,
        "static": false,
        "private": false,
        "deprecated": null,
        "name": "maximum",
        "tagname": "cfg",
        "filename": "/Users/jamieavins/git/SDK/charts/src/chart/axis/Gauge.js"
      },
      {
        "alias": null,
        "type": "Number",
        "doc": "<p>(required) the minimum value of the interval to be displayed in the axis.</p>\n",
        "owner": "Ext.chart.axis.Gauge",
        "html_filename": "Gauge.html",
        "inheritable": false,
        "href": "Gauge.html#Ext-chart-axis-Gauge-cfg-minimum",
        "linenr": 23,
        "protected": false,
        "static": false,
        "private": false,
        "deprecated": null,
        "name": "minimum",
        "tagname": "cfg",
        "filename": "/Users/jamieavins/git/SDK/charts/src/chart/axis/Gauge.js"
      },
      {
        "alias": null,
        "type": "Number",
        "doc": "<p>(optional) the number of steps and tick marks to add to the interval. Default's 10.</p>\n",
        "owner": "Ext.chart.axis.Gauge",
        "html_filename": "Gauge.html",
        "inheritable": false,
        "href": "Gauge.html#Ext-chart-axis-Gauge-cfg-steps",
        "linenr": 31,
        "protected": false,
        "static": false,
        "private": false,
        "deprecated": null,
        "shortDoc": "(optional) the number of steps and tick marks to add to the interval. ...",
        "name": "steps",
        "tagname": "cfg",
        "filename": "/Users/jamieavins/git/SDK/charts/src/chart/axis/Gauge.js"
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
  "name": "Ext.chart.axis.Gauge",
  "component": false,
  "tagname": "class",
  "singleton": false,
  "filename": "/Users/jamieavins/git/SDK/charts/src/chart/axis/Gauge.js"
});