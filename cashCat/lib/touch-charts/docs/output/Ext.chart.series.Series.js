Ext.data.JsonP.Ext_chart_series_Series({
  "mixedInto": [

  ],
  "alias": null,
  "doc": "<p>Series is the abstract class containing the common logic to all chart series. Series includes\nmethods from Labels, Highlights, Tips and Callouts mixins. This class implements the logic of\nanimating, hiding, showing all elements and returning the color of the series to be used as a legend item.</p>\n\n<h2>Listeners</h2>\n\n<p>The series class supports listeners via the Observable syntax. Some of these listeners are:</p>\n\n<ul>\n<li><code>itemmouseup</code> When the user interacts with a marker.</li>\n<li><code>itemmousedown</code> When the user interacts with a marker.</li>\n<li><code>itemmousemove</code> When the user iteracts with a marker.</li>\n<li>(similar <code>item*</code> events occur for many raw mouse and touch events)</li>\n<li><code>afterrender</code> Will be triggered when the animation ends or when the series has been rendered completely.</li>\n</ul>\n\n\n<p>For example:</p>\n\n<pre><code>series: [{\n        type: 'column',\n        axis: 'left',\n        listeners: {\n                'afterrender': function() {\n                        console('afterrender');\n                }\n        },\n        xField: 'category',\n        yField: 'data1'\n}]\n</code></pre>\n",
  "allMixins": [

  ],
  "mixins": [

  ],
  "html_filename": "Series.html",
  "inheritable": false,
  "author": null,
  "code_type": "assignment",
  "href": "Series.html#Ext-chart-series-Series",
  "subclasses": [
    "Ext.chart.series.Cartesian",
    "Ext.chart.series.Gauge",
    "Ext.chart.series.Pie",
    "Ext.chart.series.Radar"
  ],
  "superclasses": [

  ],
  "linenr": 1,
  "alternateClassNames": [

  ],
  "protected": false,
  "static": false,
  "extends": null,
  "docauthor": null,
  "members": {
    "property": [
      {
        "alias": null,
        "type": "Object",
        "doc": "<p>{String} type\nThe type of series. Set in subclasses.</p>\n",
        "owner": "Ext.chart.series.Series",
        "html_filename": "Series.html",
        "inheritable": false,
        "href": "Series.html#Ext-chart-series-Series-property-type",
        "linenr": 52,
        "protected": true,
        "static": false,
        "private": false,
        "deprecated": null,
        "shortDoc": "{String} type\nThe type of series. ...",
        "name": "type",
        "tagname": "property",
        "filename": "/Users/jamieavins/git/SDK/charts/src/chart/series/Series.js"
      }
    ],
    "css_var": [

    ],
    "css_mixin": [

    ],
    "method": [
      {
        "alias": null,
        "doc": "<p>Split any series items that were combined via <a href=\"#/api/Ext.chart.series.Series-method-combine\" rel=\"Ext.chart.series.Series-method-combine\" class=\"docClass\">combine</a> into their original items.</p>\n",
        "params": [

        ],
        "owner": "Ext.chart.series.Series",
        "html_filename": "Series.html",
        "inheritable": false,
        "href": "Series.html#Ext-chart-series-Series-method-clearCombinations",
        "linenr": 516,
        "protected": false,
        "static": false,
        "private": false,
        "deprecated": null,
        "shortDoc": "Split any series items that were combined via combine into their original items. ...",
        "name": "clearCombinations",
        "tagname": "method",
        "filename": "/Users/jamieavins/git/SDK/charts/src/chart/series/Series.js",
        "return": {
          "doc": "\n",
          "type": "undefined"
        }
      },
      {
        "alias": null,
        "doc": "<p>Combine two of this series's indexed items into one. This is done via drag-drop on the\nlegend for series that render more than one legend item. The data store is not modified,\nbut the series uses the cumulative list of combinations in its rendering.</p>\n",
        "params": [
          {
            "doc": "<p>Index of the first item</p>\n",
            "type": "Number",
            "name": "index1",
            "optional": false
          },
          {
            "doc": "<p>Index of the second item</p>\n",
            "type": "Number",
            "name": "index2",
            "optional": false
          }
        ],
        "owner": "Ext.chart.series.Series",
        "html_filename": "Series.html",
        "inheritable": false,
        "href": "Series.html#Ext-chart-series-Series-method-combine",
        "linenr": 426,
        "protected": false,
        "static": false,
        "private": false,
        "deprecated": null,
        "shortDoc": "Combine two of this series's indexed items into one. ...",
        "name": "combine",
        "tagname": "method",
        "filename": "/Users/jamieavins/git/SDK/charts/src/chart/series/Series.js",
        "return": {
          "doc": "\n",
          "type": "undefined"
        }
      },
      {
        "alias": null,
        "doc": "<p>Performs drawing of this series.</p>\n",
        "params": [

        ],
        "owner": "Ext.chart.series.Series",
        "html_filename": "Series.html",
        "inheritable": false,
        "href": "Series.html#Ext-chart-series-Series-method-drawSeries",
        "linenr": 293,
        "protected": false,
        "static": false,
        "private": false,
        "deprecated": null,
        "shortDoc": "Performs drawing of this series. ...",
        "name": "drawSeries",
        "tagname": "method",
        "filename": "/Users/jamieavins/git/SDK/charts/src/chart/series/Series.js",
        "return": {
          "doc": "\n",
          "type": "undefined"
        }
      },
      {
        "alias": null,
        "doc": "<p>Iterate over each of the records for this series. The default implementation simply iterates\nthrough the entire data store, but individual series implementations can override this to\nprovide custom handling, e.g. adding/removing records.</p>\n",
        "params": [
          {
            "doc": "<p>The function to execute for each record.</p>\n",
            "type": "Function",
            "name": "fn",
            "optional": false
          },
          {
            "doc": "<p>Scope for the fn.</p>\n",
            "type": "Object",
            "name": "scope",
            "optional": false
          }
        ],
        "owner": "Ext.chart.series.Series",
        "html_filename": "Series.html",
        "inheritable": false,
        "href": "Series.html#Ext-chart-series-Series-method-eachRecord",
        "linenr": 395,
        "protected": false,
        "static": false,
        "private": false,
        "deprecated": null,
        "shortDoc": "Iterate over each of the records for this series. ...",
        "name": "eachRecord",
        "tagname": "method",
        "filename": "/Users/jamieavins/git/SDK/charts/src/chart/series/Series.js",
        "return": {
          "doc": "\n",
          "type": "undefined"
        }
      },
      {
        "alias": null,
        "doc": "<p>For a given x/y point relative to the Surface, find a corresponding item from this\nseries, if any.</p>\n",
        "params": [
          {
            "doc": "\n",
            "type": "Number",
            "name": "x",
            "optional": false
          },
          {
            "doc": "\n",
            "type": "Number",
            "name": "y",
            "optional": false
          }
        ],
        "owner": "Ext.chart.series.Series",
        "html_filename": "Series.html",
        "inheritable": false,
        "href": "Series.html#Ext-chart-series-Series-method-getItemForPoint",
        "linenr": 205,
        "protected": false,
        "static": false,
        "private": false,
        "deprecated": null,
        "shortDoc": "For a given x/y point relative to the Surface, find a corresponding item from this\nseries, if any. ...",
        "name": "getItemForPoint",
        "tagname": "method",
        "filename": "/Users/jamieavins/git/SDK/charts/src/chart/series/Series.js",
        "return": {
          "doc": "<p>An object describing the item, or null if there is no matching item. The exact contents of</p>\n\n<pre><code>             this object will vary by series type, but should always contain at least the following:\n             &lt;ul&gt;\n               &lt;li&gt;{Ext.chart.series.Series} series - the Series object to which the item belongs&lt;/li&gt;\n               &lt;li&gt;{Object} value - the value(s) of the item's data point&lt;/li&gt;\n               &lt;li&gt;{Array} point - the x/y coordinates relative to the chart box of a single point\n                   for this data item, which can be used as e.g. a tooltip anchor point.&lt;/li&gt;\n               &lt;li&gt;{Ext.draw.Sprite} sprite - the item's rendering Sprite.\n             &lt;/ul&gt;\n</code></pre>\n",
          "type": "Object"
        }
      },
      {
        "alias": null,
        "doc": "<p>Returns a string with the color to be used for the series legend item.</p>\n",
        "params": [
          {
            "doc": "\n",
            "type": "Object",
            "name": "index",
            "optional": false
          }
        ],
        "owner": "Ext.chart.series.Series",
        "html_filename": "Series.html",
        "inheritable": false,
        "href": "Series.html#Ext-chart-series-Series-method-getLegendColor",
        "linenr": 317,
        "protected": false,
        "static": false,
        "private": false,
        "deprecated": null,
        "shortDoc": "Returns a string with the color to be used for the series legend item. ...",
        "name": "getLegendColor",
        "tagname": "method",
        "filename": "/Users/jamieavins/git/SDK/charts/src/chart/series/Series.js",
        "return": {
          "doc": "\n",
          "type": "undefined"
        }
      },
      {
        "alias": null,
        "doc": "<p>Returns an array of labels to be displayed as items in the legend. Only relevant if\n<a href=\"#/api/Ext.chart.series.Series-cfg-showInLegend\" rel=\"Ext.chart.series.Series-cfg-showInLegend\" class=\"docClass\">showInLegend</a> is true.</p>\n",
        "params": [

        ],
        "owner": "Ext.chart.series.Series",
        "html_filename": "Series.html",
        "inheritable": false,
        "href": "Series.html#Ext-chart-series-Series-method-getLegendLabels",
        "linenr": 300,
        "protected": false,
        "static": false,
        "private": false,
        "deprecated": null,
        "shortDoc": "Returns an array of labels to be displayed as items in the legend. ...",
        "name": "getLegendLabels",
        "tagname": "method",
        "filename": "/Users/jamieavins/git/SDK/charts/src/chart/series/Series.js",
        "return": {
          "doc": "\n",
          "type": "undefined"
        }
      },
      {
        "alias": null,
        "doc": "<p>Return the number of records being displayed in this series. Defaults to the number of\nrecords in the store; individual series implementations can override to provide custom handling.</p>\n",
        "params": [

        ],
        "owner": "Ext.chart.series.Series",
        "html_filename": "Series.html",
        "inheritable": false,
        "href": "Series.html#Ext-chart-series-Series-method-getRecordCount",
        "linenr": 407,
        "protected": false,
        "static": false,
        "private": false,
        "deprecated": null,
        "shortDoc": "Return the number of records being displayed in this series. ...",
        "name": "getRecordCount",
        "tagname": "method",
        "filename": "/Users/jamieavins/git/SDK/charts/src/chart/series/Series.js",
        "return": {
          "doc": "\n",
          "type": "undefined"
        }
      },
      {
        "alias": null,
        "doc": "<p>Hides all the elements in the series.</p>\n",
        "params": [

        ],
        "owner": "Ext.chart.series.Series",
        "html_filename": "Series.html",
        "inheritable": false,
        "href": "Series.html#Ext-chart-series-Series-method-hideAll",
        "linenr": 246,
        "protected": false,
        "static": false,
        "private": false,
        "deprecated": null,
        "shortDoc": "Hides all the elements in the series. ...",
        "name": "hideAll",
        "tagname": "method",
        "filename": "/Users/jamieavins/git/SDK/charts/src/chart/series/Series.js",
        "return": {
          "doc": "\n",
          "type": "undefined"
        }
      },
      {
        "alias": null,
        "doc": "<p>Determines whether the item at the given index is the result of item combination.</p>\n",
        "params": [
          {
            "doc": "\n",
            "type": "Number",
            "name": "index",
            "optional": false
          }
        ],
        "owner": "Ext.chart.series.Series",
        "html_filename": "Series.html",
        "inheritable": false,
        "href": "Series.html#Ext-chart-series-Series-method-isCombinedItem",
        "linenr": 443,
        "protected": false,
        "static": false,
        "private": false,
        "deprecated": null,
        "shortDoc": "Determines whether the item at the given index is the result of item combination. ...",
        "name": "isCombinedItem",
        "tagname": "method",
        "filename": "/Users/jamieavins/git/SDK/charts/src/chart/series/Series.js",
        "return": {
          "doc": "\n",
          "type": "Boolean"
        }
      },
      {
        "alias": null,
        "doc": "<p>Determines whether the series item at the given index has been excluded, i.e. toggled off in the legend.</p>\n",
        "params": [
          {
            "doc": "\n",
            "type": "Object",
            "name": "index",
            "optional": false
          }
        ],
        "owner": "Ext.chart.series.Series",
        "html_filename": "Series.html",
        "inheritable": false,
        "href": "Series.html#Ext-chart-series-Series-method-isExcluded",
        "linenr": 417,
        "protected": false,
        "static": false,
        "private": false,
        "deprecated": null,
        "shortDoc": "Determines whether the series item at the given index has been excluded, i.e. ...",
        "name": "isExcluded",
        "tagname": "method",
        "filename": "/Users/jamieavins/git/SDK/charts/src/chart/series/Series.js",
        "return": {
          "doc": "\n",
          "type": "undefined"
        }
      },
      {
        "alias": null,
        "doc": "<p>Reset the series to its original state, before any user interaction.</p>\n",
        "params": [

        ],
        "owner": "Ext.chart.series.Series",
        "html_filename": "Series.html",
        "inheritable": false,
        "href": "Series.html#Ext-chart-series-Series-method-reset",
        "linenr": 523,
        "protected": false,
        "static": false,
        "private": false,
        "deprecated": null,
        "shortDoc": "Reset the series to its original state, before any user interaction. ...",
        "name": "reset",
        "tagname": "method",
        "filename": "/Users/jamieavins/git/SDK/charts/src/chart/series/Series.js",
        "return": {
          "doc": "\n",
          "type": "undefined"
        }
      },
      {
        "alias": null,
        "doc": "<p>Changes the value of the <a href=\"#/api/Ext.chart.series.Series-cfg-title\" rel=\"Ext.chart.series.Series-cfg-title\" class=\"docClass\">title</a> for the series.\nArguments can take two forms:</p>\n\n<ul>\n<li>A single String value: this will be used as the new single title for the series (applies\nto series with only one yField)</li>\n<li>A numeric index and a String value: this will set the title for a single indexed yField.</li>\n</ul>\n\n",
        "params": [
          {
            "doc": "\n",
            "type": "Number",
            "name": "index",
            "optional": false
          },
          {
            "doc": "\n",
            "type": "String",
            "name": "title",
            "optional": false
          }
        ],
        "owner": "Ext.chart.series.Series",
        "html_filename": "Series.html",
        "inheritable": false,
        "href": "Series.html#Ext-chart-series-Series-method-setTitle",
        "linenr": 344,
        "protected": false,
        "static": false,
        "private": false,
        "deprecated": null,
        "shortDoc": "Changes the value of the title for the series. ...",
        "name": "setTitle",
        "tagname": "method",
        "filename": "/Users/jamieavins/git/SDK/charts/src/chart/series/Series.js",
        "return": {
          "doc": "\n",
          "type": "undefined"
        }
      },
      {
        "alias": null,
        "doc": "<p>Shows all the elements in the series.</p>\n",
        "params": [

        ],
        "owner": "Ext.chart.series.Series",
        "html_filename": "Series.html",
        "inheritable": false,
        "href": "Series.html#Ext-chart-series-Series-method-showAll",
        "linenr": 280,
        "protected": false,
        "static": false,
        "private": false,
        "deprecated": null,
        "shortDoc": "Shows all the elements in the series. ...",
        "name": "showAll",
        "tagname": "method",
        "filename": "/Users/jamieavins/git/SDK/charts/src/chart/series/Series.js",
        "return": {
          "doc": "\n",
          "type": "undefined"
        }
      }
    ],
    "cfg": [
      {
        "alias": null,
        "type": "Function",
        "doc": "<p>A function that can be overridden to set custom styling properties to each rendered element.\nPasses in (sprite, record, attributes, index, store) to the function.</p>\n",
        "owner": "Ext.chart.series.Series",
        "html_filename": "Series.html",
        "inheritable": false,
        "href": "Series.html#Ext-chart-series-Series-cfg-renderer",
        "linenr": 70,
        "protected": false,
        "static": false,
        "private": false,
        "deprecated": null,
        "shortDoc": "A function that can be overridden to set custom styling properties to each rendered element. ...",
        "name": "renderer",
        "tagname": "cfg",
        "filename": "/Users/jamieavins/git/SDK/charts/src/chart/series/Series.js"
      },
      {
        "alias": null,
        "type": "Array",
        "doc": "<p>An array with shadow attributes</p>\n",
        "owner": "Ext.chart.series.Series",
        "html_filename": "Series.html",
        "inheritable": false,
        "href": "Series.html#Ext-chart-series-Series-cfg-shadowAttributes",
        "linenr": 79,
        "protected": false,
        "static": false,
        "private": false,
        "deprecated": null,
        "name": "shadowAttributes",
        "tagname": "cfg",
        "filename": "/Users/jamieavins/git/SDK/charts/src/chart/series/Series.js"
      },
      {
        "alias": null,
        "type": "Boolean",
        "doc": "<p>Whether to show this series in the legend.</p>\n",
        "owner": "Ext.chart.series.Series",
        "html_filename": "Series.html",
        "inheritable": false,
        "href": "Series.html#Ext-chart-series-Series-cfg-showInLegend",
        "linenr": 64,
        "protected": false,
        "static": false,
        "private": false,
        "deprecated": null,
        "name": "showInLegend",
        "tagname": "cfg",
        "filename": "/Users/jamieavins/git/SDK/charts/src/chart/series/Series.js"
      },
      {
        "alias": null,
        "type": "Object",
        "doc": "<p>Add tooltips to the visualization's markers. The options for the tips are the\nsame configuration used with Ext.tip.ToolTip. For example:</p>\n\n<pre><code>tips: {\n  trackMouse: true,\n  width: 140,\n  height: 28,\n  renderer: function(storeItem, item) {\n    this.setTitle(storeItem.get('name') + ': ' + storeItem.get('data1') + ' views');\n  }\n},\n</code></pre>\n",
        "owner": "Ext.chart.series.Series",
        "html_filename": "Series.html",
        "inheritable": false,
        "href": "Series.html#Ext-chart-series-Series-cfg-tips",
        "linenr": 37,
        "protected": false,
        "static": false,
        "private": false,
        "deprecated": null,
        "shortDoc": "Add tooltips to the visualization's markers. ...",
        "name": "tips",
        "tagname": "cfg",
        "filename": "/Users/jamieavins/git/SDK/charts/src/chart/series/Series.js"
      },
      {
        "alias": null,
        "type": "String",
        "doc": "<p>The human-readable name of the series.</p>\n",
        "owner": "Ext.chart.series.Series",
        "html_filename": "Series.html",
        "inheritable": false,
        "href": "Series.html#Ext-chart-series-Series-cfg-title",
        "linenr": 58,
        "protected": false,
        "static": false,
        "private": false,
        "deprecated": null,
        "name": "title",
        "tagname": "cfg",
        "filename": "/Users/jamieavins/git/SDK/charts/src/chart/series/Series.js"
      }
    ],
    "event": [
      {
        "alias": null,
        "doc": "<p>Fires when the series title is changed via <a href=\"#/api/Ext.chart.series.Series-method-setTitle\" rel=\"Ext.chart.series.Series-method-setTitle\" class=\"docClass\">setTitle</a>.</p>\n",
        "params": [
          {
            "doc": "<p>The new title value</p>\n",
            "type": "String",
            "name": "title",
            "optional": false
          },
          {
            "doc": "<p>The index in the collection of titles</p>\n",
            "type": "Number",
            "name": "index",
            "optional": false
          }
        ],
        "owner": "Ext.chart.series.Series",
        "html_filename": "Series.html",
        "inheritable": false,
        "href": "Series.html#Ext-chart-series-Series-event-titlechange",
        "linenr": 114,
        "protected": false,
        "static": false,
        "private": false,
        "deprecated": null,
        "shortDoc": "Fires when the series title is changed via setTitle. ...",
        "name": "titlechange",
        "tagname": "event",
        "filename": "/Users/jamieavins/git/SDK/charts/src/chart/series/Series.js"
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
  "name": "Ext.chart.series.Series",
  "component": false,
  "tagname": "class",
  "singleton": false,
  "filename": "/Users/jamieavins/git/SDK/charts/src/chart/series/Series.js"
});