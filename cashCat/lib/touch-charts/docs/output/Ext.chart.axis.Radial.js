Ext.data.JsonP.Ext_chart_axis_Radial({
  "mixedInto": [

  ],
  "alias": null,
  "doc": "<p>Radial Axis is the axis to be used with a Radar Series. The Radial axis\nis a circular display of numerical data by steps, with the number of circles\nequivalent to the defined number of <code>steps</code>. Given the maximum data value,\nthe axis will compute step values depending on the number of defined <code>steps</code>.</p>\n\n<p>A possible configuration for this axis would look like:</p>\n\n<p> axes: [{</p>\n\n<pre><code> steps: 5,\n type: 'Radial',\n position: 'radial',\n label: {\n     display: 'none'\n }\n</code></pre>\n\n<p> }]</p>\n",
  "allMixins": [

  ],
  "mixins": [

  ],
  "html_filename": "Radial.html",
  "inheritable": false,
  "author": null,
  "code_type": "assignment",
  "href": "Radial.html#Ext-chart-axis-Radial",
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
      }
    ],
    "cfg": [
      {
        "alias": null,
        "type": "Number",
        "doc": "<p>(optional) the maximum value to be displayed in the axis.</p>\n",
        "owner": "Ext.chart.axis.Radial",
        "html_filename": "Radial.html",
        "inheritable": false,
        "href": "Radial.html#Ext-chart-axis-Radial-cfg-maximum",
        "linenr": 23,
        "protected": false,
        "static": false,
        "private": false,
        "deprecated": null,
        "name": "maximum",
        "tagname": "cfg",
        "filename": "/Users/jamieavins/git/SDK/charts/src/chart/axis/Radial.js"
      },
      {
        "alias": null,
        "type": "Number",
        "doc": "<p>(required) the number of steps to add to the radial axis.</p>\n",
        "owner": "Ext.chart.axis.Radial",
        "html_filename": "Radial.html",
        "inheritable": false,
        "href": "Radial.html#Ext-chart-axis-Radial-cfg-steps",
        "linenr": 27,
        "protected": false,
        "static": false,
        "private": false,
        "deprecated": null,
        "name": "steps",
        "tagname": "cfg",
        "filename": "/Users/jamieavins/git/SDK/charts/src/chart/axis/Radial.js"
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
  "name": "Ext.chart.axis.Radial",
  "component": false,
  "tagname": "class",
  "singleton": false,
  "filename": "/Users/jamieavins/git/SDK/charts/src/chart/axis/Radial.js"
});