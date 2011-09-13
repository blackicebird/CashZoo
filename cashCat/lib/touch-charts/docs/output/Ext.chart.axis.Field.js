Ext.data.JsonP.Ext_chart_axis_Field({
  "mixedInto": [

  ],
  "alias": null,
  "doc": "<p>Creates Field Axis.\nTODO:\n   -    useful description\n   -    test label rotation</p>\n",
  "allMixins": [

  ],
  "mixins": [

  ],
  "html_filename": "Field.html",
  "inheritable": false,
  "author": null,
  "code_type": "assignment",
  "href": "Field.html#Ext-chart-axis-Field",
  "subclasses": [

  ],
  "superclasses": [
    "Ext.chart.axis.Abstract",
    "Ext.chart.axis.Axis",
    "Ext.chart.axis.Category"
  ],
  "linenr": 1,
  "alternateClassNames": [

  ],
  "protected": false,
  "static": false,
  "extends": "Ext.chart.axis.Category",
  "docauthor": null,
  "members": {
    "property": [
      {
        "alias": null,
        "type": "Number",
        "doc": "<p>Offset axis position. Default's 0.</p>\n",
        "owner": "Ext.chart.axis.Axis",
        "html_filename": "Axis.html",
        "inheritable": false,
        "href": "Axis.html#Ext-chart-axis-Axis-property-length",
        "linenr": 83,
        "protected": false,
        "static": false,
        "private": false,
        "deprecated": null,
        "shortDoc": "Offset axis position. ...",
        "name": "length",
        "tagname": "property",
        "filename": "/Users/jamieavins/git/SDK/charts/src/chart/axis/Axis.js"
      },
      {
        "alias": null,
        "type": "Number",
        "doc": "<p>Offset axis width. Default's 0.</p>\n",
        "owner": "Ext.chart.axis.Axis",
        "html_filename": "Axis.html",
        "inheritable": false,
        "href": "Axis.html#Ext-chart-axis-Axis-property-width",
        "linenr": 90,
        "protected": false,
        "static": false,
        "private": false,
        "deprecated": null,
        "shortDoc": "Offset axis width. ...",
        "name": "width",
        "tagname": "property",
        "filename": "/Users/jamieavins/git/SDK/charts/src/chart/axis/Axis.js"
      }
    ],
    "css_var": [

    ],
    "css_mixin": [

    ],
    "method": [
      {
        "alias": null,
        "doc": "<p>Renders the axis into the screen and updates it's position.</p>\n",
        "params": [
          {
            "doc": "\n",
            "type": "Object",
            "name": "init",
            "optional": false
          }
        ],
        "owner": "Ext.chart.axis.Axis",
        "html_filename": "Axis.html",
        "inheritable": false,
        "href": "Axis.html#Ext-chart-axis-Axis-method-drawAxis",
        "linenr": 226,
        "protected": false,
        "static": false,
        "private": false,
        "deprecated": null,
        "shortDoc": "Renders the axis into the screen and updates it's position. ...",
        "name": "drawAxis",
        "tagname": "method",
        "filename": "/Users/jamieavins/git/SDK/charts/src/chart/axis/Axis.js",
        "return": {
          "doc": "\n",
          "type": "undefined"
        }
      },
      {
        "alias": null,
        "doc": "<p>Renders an horizontal and/or vertical grid into the Surface.</p>\n",
        "params": [

        ],
        "owner": "Ext.chart.axis.Axis",
        "html_filename": "Axis.html",
        "inheritable": false,
        "href": "Axis.html#Ext-chart-axis-Axis-method-drawGrid",
        "linenr": 382,
        "protected": false,
        "static": false,
        "private": false,
        "deprecated": null,
        "shortDoc": "Renders an horizontal and/or vertical grid into the Surface. ...",
        "name": "drawGrid",
        "tagname": "method",
        "filename": "/Users/jamieavins/git/SDK/charts/src/chart/axis/Axis.js",
        "return": {
          "doc": "\n",
          "type": "undefined"
        }
      },
      {
        "alias": null,
        "doc": "<p>Renders the labels in the axes.</p>\n",
        "params": [

        ],
        "owner": "Ext.chart.axis.Field",
        "html_filename": "Field.html",
        "inheritable": false,
        "href": "Field.html#Ext-chart-axis-Field-method-drawLabel",
        "linenr": 140,
        "protected": false,
        "static": false,
        "private": false,
        "deprecated": null,
        "shortDoc": "Renders the labels in the axes. ...",
        "name": "drawLabel",
        "tagname": "method",
        "filename": "/Users/jamieavins/git/SDK/charts/src/chart/axis/Field.js",
        "return": {
          "doc": "\n",
          "type": "undefined"
        }
      },
      {
        "alias": null,
        "doc": "<p>Return the Series object(s) that are bound to this axis.</p>\n",
        "params": [

        ],
        "owner": "Ext.chart.axis.Axis",
        "html_filename": "Axis.html",
        "inheritable": false,
        "href": "Axis.html#Ext-chart-axis-Axis-method-getBoundSeries",
        "linenr": 863,
        "protected": false,
        "static": false,
        "private": false,
        "deprecated": null,
        "shortDoc": "Return the Series object(s) that are bound to this axis. ...",
        "name": "getBoundSeries",
        "tagname": "method",
        "filename": "/Users/jamieavins/git/SDK/charts/src/chart/axis/Axis.js",
        "return": {
          "doc": "<p>Ext.util.MixedCollection</p>\n",
          "type": "undefined"
        }
      },
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
        "doc": "<p>Determine whether this axis is bound to the given field name.</p>\n",
        "params": [
          {
            "doc": "\n",
            "type": "String",
            "name": "field",
            "optional": false
          }
        ],
        "owner": "Ext.chart.axis.Axis",
        "html_filename": "Axis.html",
        "inheritable": false,
        "href": "Axis.html#Ext-chart-axis-Axis-method-isBoundToField",
        "linenr": 882,
        "protected": false,
        "static": false,
        "private": false,
        "deprecated": null,
        "shortDoc": "Determine whether this axis is bound to the given field name. ...",
        "name": "isBoundToField",
        "tagname": "method",
        "filename": "/Users/jamieavins/git/SDK/charts/src/chart/axis/Axis.js",
        "return": {
          "doc": "\n",
          "type": "Boolean"
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
        "doc": "<p>Updates the <a href=\"#/api/Ext.chart.axis.Field-cfg-title\" rel=\"Ext.chart.axis.Field-cfg-title\" class=\"docClass\">title</a> of this axis.</p>\n",
        "params": [
          {
            "doc": "\n",
            "type": "String",
            "name": "title",
            "optional": false
          }
        ],
        "owner": "Ext.chart.axis.Axis",
        "html_filename": "Axis.html",
        "inheritable": false,
        "href": "Axis.html#Ext-chart-axis-Axis-method-setTitle",
        "linenr": 798,
        "protected": false,
        "static": false,
        "private": false,
        "deprecated": null,
        "shortDoc": "Updates the title of this axis. ...",
        "name": "setTitle",
        "tagname": "method",
        "filename": "/Users/jamieavins/git/SDK/charts/src/chart/axis/Axis.js",
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
        "doc": "<p>Indicates whether or not to calculate the number of categories (ticks and\nlabels) when there is not enough room to display all labels on the axis.\nIf set to true, the axis will determine the number of categories to plot.\nIf not, all categories will be plotted.</p>\n",
        "owner": "Ext.chart.axis.Category",
        "html_filename": "Category.html",
        "inheritable": false,
        "href": "Category.html#Ext-chart-axis-Category-cfg-calculateCategoryCount",
        "linenr": 82,
        "protected": false,
        "static": false,
        "private": false,
        "deprecated": null,
        "shortDoc": "Indicates whether or not to calculate the number of categories (ticks and\nlabels) when there is not enough room to di...",
        "name": "calculateCategoryCount",
        "tagname": "cfg",
        "filename": "/Users/jamieavins/git/SDK/charts/src/chart/axis/Category.js"
      },
      {
        "alias": null,
        "type": "Array",
        "doc": "<p>A list of category names to display along this axis.</p>\n",
        "owner": "Ext.chart.axis.Category",
        "html_filename": "Category.html",
        "inheritable": false,
        "href": "Category.html#Ext-chart-axis-Category-cfg-categoryNames",
        "linenr": 76,
        "protected": false,
        "static": false,
        "private": false,
        "deprecated": null,
        "name": "categoryNames",
        "tagname": "cfg",
        "filename": "/Users/jamieavins/git/SDK/charts/src/chart/axis/Category.js"
      },
      {
        "alias": null,
        "type": "Number",
        "doc": "<p>The size of the dash marker. Default's 3.</p>\n",
        "owner": "Ext.chart.axis.Axis",
        "html_filename": "Axis.html",
        "inheritable": false,
        "href": "Axis.html#Ext-chart-axis-Axis-cfg-dashSize",
        "linenr": 71,
        "protected": false,
        "static": false,
        "private": false,
        "deprecated": null,
        "shortDoc": "The size of the dash marker. ...",
        "name": "dashSize",
        "tagname": "cfg",
        "filename": "/Users/jamieavins/git/SDK/charts/src/chart/axis/Axis.js"
      },
      {
        "alias": null,
        "type": "Array",
        "doc": "<p>An array containing the names of record fields which should be mapped along the axis</p>\n",
        "owner": "Ext.chart.axis.Axis",
        "html_filename": "Axis.html",
        "inheritable": false,
        "href": "Axis.html#Ext-chart-axis-Axis-cfg-fields",
        "linenr": 56,
        "protected": false,
        "static": false,
        "private": false,
        "deprecated": null,
        "name": "fields",
        "tagname": "cfg",
        "filename": "/Users/jamieavins/git/SDK/charts/src/chart/axis/Axis.js"
      },
      {
        "alias": null,
        "type": "Object",
        "doc": "<p>The label configuration object for the Axis</p>\n",
        "owner": "Ext.chart.axis.Axis",
        "html_filename": "Axis.html",
        "inheritable": false,
        "href": "Axis.html#Ext-chart-axis-Axis-cfg-label",
        "linenr": 66,
        "protected": false,
        "static": false,
        "private": false,
        "deprecated": null,
        "name": "label",
        "tagname": "cfg",
        "filename": "/Users/jamieavins/git/SDK/charts/src/chart/axis/Axis.js"
      },
      {
        "alias": null,
        "type": "Number",
        "doc": "<p>If <code>minimum</code> and <code>maximum</code> are specified it forces the number of major ticks to the specified value.</p>\n",
        "owner": "Ext.chart.axis.Axis",
        "html_filename": "Axis.html",
        "inheritable": false,
        "href": "Axis.html#Ext-chart-axis-Axis-cfg-majorTickSteps",
        "linenr": 46,
        "protected": false,
        "static": false,
        "private": false,
        "deprecated": null,
        "name": "majorTickSteps",
        "tagname": "cfg",
        "filename": "/Users/jamieavins/git/SDK/charts/src/chart/axis/Axis.js"
      },
      {
        "alias": null,
        "type": "Number",
        "doc": "<p>The number of small ticks between two major ticks. Default is zero.</p>\n",
        "owner": "Ext.chart.axis.Axis",
        "html_filename": "Axis.html",
        "inheritable": false,
        "href": "Axis.html#Ext-chart-axis-Axis-cfg-minorTickSteps",
        "linenr": 51,
        "protected": false,
        "static": false,
        "private": false,
        "deprecated": null,
        "shortDoc": "The number of small ticks between two major ticks. ...",
        "name": "minorTickSteps",
        "tagname": "cfg",
        "filename": "/Users/jamieavins/git/SDK/charts/src/chart/axis/Axis.js"
      },
      {
        "alias": null,
        "type": "String",
        "doc": "<p>Where to set the axis. Available options are <code>left</code>, <code>bottom</code>, <code>right</code>, <code>top</code>. Default's <code>bottom</code>.</p>\n",
        "owner": "Ext.chart.axis.Axis",
        "html_filename": "Axis.html",
        "inheritable": false,
        "href": "Axis.html#Ext-chart-axis-Axis-cfg-position",
        "linenr": 77,
        "protected": false,
        "static": false,
        "private": false,
        "deprecated": null,
        "shortDoc": "Where to set the axis. ...",
        "name": "position",
        "tagname": "cfg",
        "filename": "/Users/jamieavins/git/SDK/charts/src/chart/axis/Axis.js"
      },
      {
        "alias": null,
        "type": "String",
        "doc": "<p>The title for the Axis</p>\n",
        "owner": "Ext.chart.axis.Axis",
        "html_filename": "Axis.html",
        "inheritable": false,
        "href": "Axis.html#Ext-chart-axis-Axis-cfg-title",
        "linenr": 61,
        "protected": false,
        "static": false,
        "private": false,
        "deprecated": null,
        "name": "title",
        "tagname": "cfg",
        "filename": "/Users/jamieavins/git/SDK/charts/src/chart/axis/Axis.js"
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
  "name": "Ext.chart.axis.Field",
  "component": false,
  "tagname": "class",
  "singleton": false,
  "filename": "/Users/jamieavins/git/SDK/charts/src/chart/axis/Field.js"
});