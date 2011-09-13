Ext.data.JsonP.Ext_chart_axis_Category({
  "mixedInto": [

  ],
  "alias": null,
  "doc": "<p>A type of axis that displays items in categories. This axis is generally used to\ndisplay categorical information like names of items, month names, quarters, etc.\nbut no quantitative values. For that other type of information <em>Number</em>\naxis are more suitable.</p>\n\n<p>As with other axis you can set the position of the axis and its title. For example:</p>\n\n<p><p><img src=\"doc-resources/Ext.chart.axis.Category/Ext.chart.axis.Category.png\" alt=\"Ext.chart.axis.Category chart axis\"></p></p>\n\n<pre><code>var store = new Ext.data.JsonStore({\n    fields: ['name', 'data1', 'data2', 'data3', 'data4', 'data5'],\n    data: [\n        {'name':'metric one', 'data1':10, 'data2':12, 'data3':14, 'data4':8, 'data5':13},\n        {'name':'metric two', 'data1':7, 'data2':8, 'data3':16, 'data4':10, 'data5':3},\n        {'name':'metric three', 'data1':5, 'data2':2, 'data3':14, 'data4':12, 'data5':7},\n        {'name':'metric four', 'data1':2, 'data2':14, 'data3':6, 'data4':1, 'data5':23},\n        {'name':'metric five', 'data1':27, 'data2':38, 'data3':36, 'data4':13, 'data5':33}                                                \n    ]\n});\n\nnew Ext.chart.Chart({\n    renderTo: Ext.getBody(),\n    width: 500,\n    height: 300,\n    store: store,\n    axes: [{\n        type: 'Numeric',\n        grid: true,\n        position: 'left',\n        fields: ['data1', 'data2', 'data3', 'data4', 'data5'],\n        title: 'Sample Values',\n        grid: {\n            odd: {\n                opacity: 1,\n                fill: '#ddd',\n                stroke: '#bbb',\n                'stroke-width': 1\n            }\n        },\n        minimum: 0,\n        adjustMinimumByMajorUnit: false\n    }, {\n        type: 'Category',\n        position: 'bottom',\n        fields: ['name'],\n        title: 'Sample Metrics',\n        grid: true,\n        label: {\n            rotate: {\n                degrees: 315\n            }\n        }\n    }],\n    series: [{\n        type: 'area',\n        highlight: false,\n        axis: 'left',\n        xField: 'name',\n        yField: ['data1', 'data2', 'data3', 'data4', 'data5'],\n        style: {\n            opacity: 0.93\n        }\n    }]\n});\n</code></pre>\n\n<p>In this example with set the category axis to the bottom of the surface, bound the axis to\nthe <em>name</em> property and set as title <em>Month of the Year</em>.</p>\n",
  "allMixins": [

  ],
  "mixins": [

  ],
  "html_filename": "Category.html",
  "inheritable": false,
  "author": null,
  "code_type": "assignment",
  "href": "Category.html#Ext-chart-axis-Category",
  "subclasses": [
    "Ext.chart.axis.Field"
  ],
  "superclasses": [
    "Ext.chart.axis.Abstract",
    "Ext.chart.axis.Axis"
  ],
  "linenr": 1,
  "alternateClassNames": [

  ],
  "protected": false,
  "static": false,
  "extends": "Ext.chart.axis.Axis",
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
        "owner": "Ext.chart.axis.Axis",
        "html_filename": "Axis.html",
        "inheritable": false,
        "href": "Axis.html#Ext-chart-axis-Axis-method-drawLabel",
        "linenr": 736,
        "protected": false,
        "static": false,
        "private": false,
        "deprecated": null,
        "shortDoc": "Renders the labels in the axes. ...",
        "name": "drawLabel",
        "tagname": "method",
        "filename": "/Users/jamieavins/git/SDK/charts/src/chart/axis/Axis.js",
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
        "doc": "<p>Updates the <a href=\"#/api/Ext.chart.axis.Category-cfg-title\" rel=\"Ext.chart.axis.Category-cfg-title\" class=\"docClass\">title</a> of this axis.</p>\n",
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
  "name": "Ext.chart.axis.Category",
  "component": false,
  "tagname": "class",
  "singleton": false,
  "filename": "/Users/jamieavins/git/SDK/charts/src/chart/axis/Category.js"
});