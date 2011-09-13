Ext.data.JsonP.Ext_chart_Legend({
  "mixedInto": [

  ],
  "alias": null,
  "doc": "<p>Defines a legend for a chart's series.\nThe 'chart' member must be set prior to rendering.\nThe legend class displays a list of legend items each of them related with a\nseries being rendered. In order to render the legend item of the proper series\nthe series configuration object must have showInLegend\nset to true.</p>\n\n<p>The legend configuration object accepts a <a href=\"#/api/Ext.chart.Legend-cfg-position\" rel=\"Ext.chart.Legend-cfg-position\" class=\"docClass\">position</a> as parameter, which allows\ncontrol over where the legend appears in relation to the chart. The position can be\nconfiured with different values for portrait vs. landscape orientations. Also, the <a href=\"#/api/Ext.chart.Legend-cfg-dock\" rel=\"Ext.chart.Legend-cfg-dock\" class=\"docClass\">dock</a>\nconfig can be used to hide the legend in a sheet docked to one of the sides.</p>\n\n<p>Full example:</p>\n\n<pre><code>    var store = new Ext.data.JsonStore({\n        fields: ['name', 'data1', 'data2', 'data3', 'data4', 'data5'],\n        data: [\n            {'name':'metric one', 'data1':10, 'data2':12, 'data3':14, 'data4':8, 'data5':13},\n            {'name':'metric two', 'data1':7, 'data2':8, 'data3':16, 'data4':10, 'data5':3},\n            {'name':'metric three', 'data1':5, 'data2':2, 'data3':14, 'data4':12, 'data5':7},\n            {'name':'metric four', 'data1':2, 'data2':14, 'data3':6, 'data4':1, 'data5':23},\n            {'name':'metric five', 'data1':27, 'data2':38, 'data3':36, 'data4':13, 'data5':33}\n        ]\n    });\n\n    new Ext.chart.Chart({\n        renderTo: Ext.getBody(),\n        width: 500,\n        height: 300,\n        animate: true,\n        store: store,\n        shadow: true,\n        theme: 'Category1',\n        legend: {\n            position: 'top'\n        },\n         axes: [{\n                type: 'Numeric',\n                grid: true,\n                position: 'left',\n                fields: ['data1', 'data2', 'data3', 'data4', 'data5'],\n                title: 'Sample Values',\n                grid: {\n                    odd: {\n                        opacity: 1,\n                        fill: '#ddd',\n                        stroke: '#bbb',\n                        'stroke-width': 1\n                    }\n                },\n                minimum: 0,\n                adjustMinimumByMajorUnit: 0\n            }, {\n                type: 'Category',\n                position: 'bottom',\n                fields: ['name'],\n                title: 'Sample Metrics',\n                grid: true,\n                label: {\n                    rotate: {\n                        degrees: 315\n                    }\n                }\n        }],\n        series: [{\n            type: 'area',\n            highlight: false,\n            axis: 'left',\n            xField: 'name',\n            yField: ['data1', 'data2', 'data3', 'data4', 'data5'],\n            style: {\n                opacity: 0.93\n            }\n        }]\n    });\n    </code></pre>\n\n",
  "allMixins": [

  ],
  "mixins": [

  ],
  "html_filename": "Legend.html",
  "inheritable": false,
  "author": null,
  "code_type": "assignment",
  "href": "Legend.html#Ext-chart-Legend",
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
        "doc": "\n",
        "params": [
          {
            "doc": "\n",
            "type": "Object",
            "name": "config",
            "optional": false
          }
        ],
        "owner": "Ext.chart.Legend",
        "html_filename": "Legend.html",
        "inheritable": false,
        "href": "Legend.html#Ext-chart-Legend-method-constructor",
        "linenr": 142,
        "protected": false,
        "static": false,
        "private": false,
        "deprecated": null,
        "shortDoc": " ...",
        "name": "constructor",
        "tagname": "method",
        "filename": "/Users/jamieavins/git/SDK/charts/src/chart/Legend.js",
        "return": {
          "doc": "\n",
          "type": "Object"
        }
      },
      {
        "alias": null,
        "doc": "<p>Calculate and return the number of pixels that should be reserved for the legend along\nits edge. Only returns a non-zero value if the legend is positioned to one of the four\nnamed edges, and if it is not <a href=\"#/api/Ext.chart.Legend-cfg-dock\" rel=\"Ext.chart.Legend-cfg-dock\" class=\"docClass\">docked</a>.</p>\n",
        "params": [

        ],
        "owner": "Ext.chart.Legend",
        "html_filename": "Legend.html",
        "inheritable": false,
        "href": "Legend.html#Ext-chart-Legend-method-getInsetSize",
        "linenr": 401,
        "protected": false,
        "static": false,
        "private": false,
        "deprecated": null,
        "shortDoc": "Calculate and return the number of pixels that should be reserved for the legend along\nits edge. ...",
        "name": "getInsetSize",
        "tagname": "method",
        "filename": "/Users/jamieavins/git/SDK/charts/src/chart/Legend.js",
        "return": {
          "doc": "\n",
          "type": "undefined"
        }
      },
      {
        "alias": null,
        "doc": "<p>Get the target position of the legend, after resolving any orientation-specific configs.\nIn most cases this method should be used rather than reading the <code>position</code> property directly.</p>\n",
        "params": [

        ],
        "owner": "Ext.chart.Legend",
        "html_filename": "Legend.html",
        "inheritable": false,
        "href": "Legend.html#Ext-chart-Legend-method-getPosition",
        "linenr": 268,
        "protected": false,
        "static": false,
        "private": false,
        "deprecated": null,
        "shortDoc": "Get the target position of the legend, after resolving any orientation-specific configs. ...",
        "name": "getPosition",
        "tagname": "method",
        "filename": "/Users/jamieavins/git/SDK/charts/src/chart/Legend.js",
        "return": {
          "doc": "<p>The position config value</p>\n",
          "type": "String/Object"
        }
      },
      {
        "alias": null,
        "doc": "<p>Retrieves the view component for this legend, creating it first if needed.</p>\n",
        "params": [

        ],
        "owner": "Ext.chart.Legend",
        "html_filename": "Legend.html",
        "inheritable": false,
        "href": "Legend.html#Ext-chart-Legend-method-getView",
        "linenr": 238,
        "protected": false,
        "static": false,
        "private": false,
        "deprecated": null,
        "shortDoc": "Retrieves the view component for this legend, creating it first if needed. ...",
        "name": "getView",
        "tagname": "method",
        "filename": "/Users/jamieavins/git/SDK/charts/src/chart/Legend.js",
        "return": {
          "doc": "\n",
          "type": "@link Ext.chart.Legend.View"
        }
      },
      {
        "alias": null,
        "doc": "<p>Hides the legend if it is currently shown.</p>\n",
        "params": [

        ],
        "owner": "Ext.chart.Legend",
        "html_filename": "Legend.html",
        "inheritable": false,
        "href": "Legend.html#Ext-chart-Legend-method-hide",
        "linenr": 437,
        "protected": false,
        "static": false,
        "private": false,
        "deprecated": null,
        "shortDoc": "Hides the legend if it is currently shown. ...",
        "name": "hide",
        "tagname": "method",
        "filename": "/Users/jamieavins/git/SDK/charts/src/chart/Legend.js",
        "return": {
          "doc": "\n",
          "type": "undefined"
        }
      },
      {
        "alias": null,
        "doc": "<p>Returns whether the legend is configured with orientation-specific positions.</p>\n",
        "params": [

        ],
        "owner": "Ext.chart.Legend",
        "html_filename": "Legend.html",
        "inheritable": false,
        "href": "Legend.html#Ext-chart-Legend-method-isOrientationSpecific",
        "linenr": 259,
        "protected": false,
        "static": false,
        "private": false,
        "deprecated": null,
        "shortDoc": "Returns whether the legend is configured with orientation-specific positions. ...",
        "name": "isOrientationSpecific",
        "tagname": "method",
        "filename": "/Users/jamieavins/git/SDK/charts/src/chart/Legend.js",
        "return": {
          "doc": "\n",
          "type": "Boolean"
        }
      },
      {
        "alias": null,
        "doc": "<p>Returns whether the orientation of the legend items is vertical.</p>\n",
        "params": [

        ],
        "owner": "Ext.chart.Legend",
        "html_filename": "Legend.html",
        "inheritable": false,
        "href": "Legend.html#Ext-chart-Legend-method-isVertical",
        "linenr": 287,
        "protected": false,
        "static": false,
        "private": false,
        "deprecated": null,
        "shortDoc": "Returns whether the orientation of the legend items is vertical. ...",
        "name": "isVertical",
        "tagname": "method",
        "filename": "/Users/jamieavins/git/SDK/charts/src/chart/Legend.js",
        "return": {
          "doc": "<p><code>true</code> if the legend items are to be arranged stacked vertically, <code>false</code> if they\nare to be arranged side-by-side.</p>\n",
          "type": "Boolean"
        }
      },
      {
        "alias": null,
        "doc": "<p>Fired when two legend items are combined via drag-drop in the legend view.</p>\n",
        "params": [
          {
            "doc": "<p>The series for the combined items</p>\n",
            "type": "Ext.chart.series.Series",
            "name": "series",
            "optional": false
          },
          {
            "doc": "<p>The series for the combined items</p>\n",
            "type": "Ext.chart.series.Series",
            "name": "index1",
            "optional": false
          },
          {
            "doc": "<p>The series for the combined items</p>\n",
            "type": "Ext.chart.series.Series",
            "name": "index2",
            "optional": false
          }
        ],
        "owner": "Ext.chart.Legend",
        "html_filename": "Legend.html",
        "inheritable": false,
        "href": "Legend.html#Ext-chart-Legend-method-onCombine",
        "linenr": 444,
        "protected": true,
        "static": false,
        "private": false,
        "deprecated": null,
        "shortDoc": "Fired when two legend items are combined via drag-drop in the legend view. ...",
        "name": "onCombine",
        "tagname": "method",
        "filename": "/Users/jamieavins/git/SDK/charts/src/chart/Legend.js",
        "return": {
          "doc": "\n",
          "type": "undefined"
        }
      },
      {
        "alias": null,
        "doc": "<p>Update the legend component to match the current viewport orientation.</p>\n",
        "params": [

        ],
        "owner": "Ext.chart.Legend",
        "html_filename": "Legend.html",
        "inheritable": false,
        "href": "Legend.html#Ext-chart-Legend-method-orient",
        "linenr": 297,
        "protected": false,
        "static": false,
        "private": false,
        "deprecated": null,
        "shortDoc": "Update the legend component to match the current viewport orientation. ...",
        "name": "orient",
        "tagname": "method",
        "filename": "/Users/jamieavins/git/SDK/charts/src/chart/Legend.js",
        "return": {
          "doc": "\n",
          "type": "undefined"
        }
      },
      {
        "alias": null,
        "doc": "<p>Reset the legend back to its initial state before any user interactions.</p>\n",
        "params": [

        ],
        "owner": "Ext.chart.Legend",
        "html_filename": "Legend.html",
        "inheritable": false,
        "href": "Legend.html#Ext-chart-Legend-method-reset",
        "linenr": 464,
        "protected": false,
        "static": false,
        "private": false,
        "deprecated": null,
        "shortDoc": "Reset the legend back to its initial state before any user interactions. ...",
        "name": "reset",
        "tagname": "method",
        "filename": "/Users/jamieavins/git/SDK/charts/src/chart/Legend.js",
        "return": {
          "doc": "\n",
          "type": "undefined"
        }
      },
      {
        "alias": null,
        "doc": "<p>Shows the legend if it is currently hidden.</p>\n",
        "params": [

        ],
        "owner": "Ext.chart.Legend",
        "html_filename": "Legend.html",
        "inheritable": false,
        "href": "Legend.html#Ext-chart-Legend-method-show",
        "linenr": 430,
        "protected": false,
        "static": false,
        "private": false,
        "deprecated": null,
        "shortDoc": "Shows the legend if it is currently hidden. ...",
        "name": "show",
        "tagname": "method",
        "filename": "/Users/jamieavins/git/SDK/charts/src/chart/Legend.js",
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
        "doc": "<p>If set to <code>true</code>, then rather than rendering within the chart area the legend will be docked to the\n<a href=\"#/api/Ext.chart.Legend-cfg-position\" rel=\"Ext.chart.Legend-cfg-position\" class=\"docClass\">configured edge position</a> within a Ext.Sheet. The sheet will be initially\nhidden and can be opened by tapping on a tab along the configured edge. This prevents screen real\nestate from being taken up by the legend, which is especially important on small screen devices.</p>\n\n<p>Defaults to <code>true</code> for phone-sized screens, <code>false</code> for larger screens.</p>\n",
        "owner": "Ext.chart.Legend",
        "html_filename": "Legend.html",
        "inheritable": false,
        "href": "Legend.html#Ext-chart-Legend-cfg-dock",
        "linenr": 124,
        "protected": false,
        "static": false,
        "private": false,
        "deprecated": null,
        "shortDoc": "If set to true, then rather than rendering within the chart area the legend will be docked to the\nconfigured edge pos...",
        "name": "dock",
        "tagname": "cfg",
        "filename": "/Users/jamieavins/git/SDK/charts/src/chart/Legend.js"
      },
      {
        "alias": null,
        "type": "Number",
        "doc": "<p>The duration in milliseconds in which two consecutive taps will be considered a doubletap.\nDefaults to <code>250</code>.</p>\n",
        "owner": "Ext.chart.Legend",
        "html_filename": "Legend.html",
        "inheritable": false,
        "href": "Legend.html#Ext-chart-Legend-cfg-doubleTapThreshold",
        "linenr": 135,
        "protected": false,
        "static": false,
        "private": false,
        "deprecated": null,
        "shortDoc": "The duration in milliseconds in which two consecutive taps will be considered a doubletap. ...",
        "name": "doubleTapThreshold",
        "tagname": "cfg",
        "filename": "/Users/jamieavins/git/SDK/charts/src/chart/Legend.js"
      },
      {
        "alias": null,
        "type": "String",
        "doc": "<p>The position of the legend in relation to the chart. Can be one of:</p>\n\n<ul>\n<li>\"top\" - positions the legend centered at the top of the chart</li>\n<li>\"bottom\" - positions the legend centered at the bottom of the chart</li>\n<li>\"left\" - positions the legend centered on the left side of the chart</li>\n<li>\"right\" - positions the legend centered on the right side of the chart</li>\n<li>an Object with numeric properties <code>x</code> and <code>y</code>, and boolean property <code>vertical</code> - displays the legend\nfloating on top of the chart at the given x/y coordinates. If <code>vertical:true</code> the legend items will\nbe arranged stacked vertically, otherwise they will be arranged side-by-side. If <a href=\"#/api/Ext.chart.Legend-cfg-dock\" rel=\"Ext.chart.Legend-cfg-dock\" class=\"docClass\">dock</a> is\nset to <code>true</code> then this position config will be ignored and will dock to the bottom.</li>\n</ul>\n\n\n<p>In addition, you can specify different legend alignments based on the orientation of the browser viewport,\nfor instance you might want to put the legend on the right in landscape orientation but on the bottom in\nportrait orientation. To achieve this, you can set the <code>position</code> config to an Object with <code>portrait</code> and\n<code>landscape</code> properties, and set the value of those properties to one of the recognized value types described\nabove. For example, the following config will put the legend on the right in landscape but float it on top\nof the chart at position 10,10 in portrait:</p>\n\n<pre><code>legend: {\n    position: {\n        landscape: 'right',\n        portrait: {\n            x: 10,\n            y: 10,\n            vertical: true\n        }\n    }\n}\n</code></pre>\n",
        "owner": "Ext.chart.Legend",
        "html_filename": "Legend.html",
        "inheritable": false,
        "href": "Legend.html#Ext-chart-Legend-cfg-position",
        "linenr": 91,
        "protected": false,
        "static": false,
        "private": false,
        "deprecated": null,
        "shortDoc": "The position of the legend in relation to the chart. ...",
        "name": "position",
        "tagname": "cfg",
        "filename": "/Users/jamieavins/git/SDK/charts/src/chart/Legend.js"
      },
      {
        "alias": null,
        "type": "Boolean",
        "doc": "<p>Whether or not the legend should be displayed.</p>\n",
        "owner": "Ext.chart.Legend",
        "html_filename": "Legend.html",
        "inheritable": false,
        "href": "Legend.html#Ext-chart-Legend-cfg-visible",
        "linenr": 85,
        "protected": false,
        "static": false,
        "private": false,
        "deprecated": null,
        "name": "visible",
        "tagname": "cfg",
        "filename": "/Users/jamieavins/git/SDK/charts/src/chart/Legend.js"
      }
    ],
    "event": [
      {
        "alias": null,
        "doc": "<p>Fired when two legend items are combined together via drag-drop.</p>\n",
        "params": [
          {
            "doc": "\n",
            "type": "Ext.chart.Legend",
            "name": "legend",
            "optional": false
          },
          {
            "doc": "<p>The series owning the items being combined</p>\n",
            "type": "Ext.chart.series.Series",
            "name": "series",
            "optional": false
          },
          {
            "doc": "<p>The index of the first legend item</p>\n",
            "type": "Number",
            "name": "index1",
            "optional": false
          },
          {
            "doc": "<p>The index of the second legend item</p>\n",
            "type": "Number",
            "name": "index2",
            "optional": false
          }
        ],
        "owner": "Ext.chart.Legend",
        "html_filename": "Legend.html",
        "inheritable": false,
        "href": "Legend.html#Ext-chart-Legend-event-combine",
        "linenr": 153,
        "protected": false,
        "static": false,
        "private": false,
        "deprecated": null,
        "shortDoc": "Fired when two legend items are combined together via drag-drop. ...",
        "name": "combine",
        "tagname": "event",
        "filename": "/Users/jamieavins/git/SDK/charts/src/chart/Legend.js"
      },
      {
        "alias": null,
        "doc": "<p>Fired when a previously-combined legend item is split into its original constituent items.</p>\n",
        "params": [
          {
            "doc": "\n",
            "type": "Ext.chart.Legend",
            "name": "legend",
            "optional": false
          },
          {
            "doc": "<p>The series owning the item being split</p>\n",
            "type": "Ext.chart.series.Series",
            "name": "series",
            "optional": false
          },
          {
            "doc": "<p>The index of the legend item being split</p>\n",
            "type": "Number",
            "name": "index",
            "optional": false
          }
        ],
        "owner": "Ext.chart.Legend",
        "html_filename": "Legend.html",
        "inheritable": false,
        "href": "Legend.html#Ext-chart-Legend-event-split",
        "linenr": 163,
        "protected": false,
        "static": false,
        "private": false,
        "deprecated": null,
        "shortDoc": "Fired when a previously-combined legend item is split into its original constituent items. ...",
        "name": "split",
        "tagname": "event",
        "filename": "/Users/jamieavins/git/SDK/charts/src/chart/Legend.js"
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
  "name": "Ext.chart.Legend",
  "component": false,
  "tagname": "class",
  "singleton": false,
  "filename": "/Users/jamieavins/git/SDK/charts/src/chart/Legend.js"
});