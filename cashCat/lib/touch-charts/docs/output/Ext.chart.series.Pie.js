Ext.data.JsonP.Ext_chart_series_Pie({
  "mixedInto": [

  ],
  "alias": null,
  "doc": "<p>Creates a Pie Chart. A Pie Chart is a useful visualization technique to display quantitative information for different\ncategories that also have a meaning as a whole.\nAs with all other series, the Pie Series must be appended in the <em>series</em> Chart array configuration. See the Chart\ndocumentation for more information. A typical configuration object for the pie series could be:</p>\n\n<p><p><img src=\"doc-resources/Ext.chart.series.Pie/Ext.chart.series.Pie.png\" alt=\"Ext.chart.series.Pie chart series\"></p></p>\n\n<pre><code>var store = new Ext.data.JsonStore({\n    fields: ['name', 'data1', 'data2', 'data3', 'data4', 'data5'],\n    data: [\n        {'name':'metric one', 'data1':10, 'data2':12, 'data3':14, 'data4':8, 'data5':13},\n        {'name':'metric two', 'data1':7, 'data2':8, 'data3':16, 'data4':10, 'data5':3},\n        {'name':'metric three', 'data1':5, 'data2':2, 'data3':14, 'data4':12, 'data5':7},\n        {'name':'metric four', 'data1':2, 'data2':14, 'data3':6, 'data4':1, 'data5':23},\n        {'name':'metric five', 'data1':27, 'data2':38, 'data3':36, 'data4':13, 'data5':33}\n    ]\n});\n\nnew Ext.chart.Chart({\n    renderTo: Ext.getBody(),\n    width: 500,\n    height: 300,\n    animate: true,\n    store: store,\n    theme: 'Base:gradients',\n    series: [{\n        type: 'pie',\n        angleField: 'data1',\n        showInLegend: true,\n        tips: {\n          trackMouse: true,\n          width: 140,\n          height: 28,\n          renderer: function(storeItem, item) {\n            //calculate and display percentage on hover\n            var total = 0;\n            store.each(function(rec) {\n                total += rec.get('data1');\n            });\n            this.setTitle(storeItem.get('name') + ': ' + Math.round(storeItem.get('data1') / total * 100) + '%');\n          }\n        },\n        highlight: {\n          segment: {\n            margin: 20\n          }\n        },\n        label: {\n            field: 'name',\n            display: 'rotate',\n            contrast: true,\n            font: '18px Arial'\n        }\n    }]\n});\n</code></pre>\n\n<p>In this configuration we set <code>pie</code> as the type for the series, set an object with specific style properties for highlighting options\n(triggered when hovering elements). We also set true to <code>showInLegend</code> so all the pie slices can be represented by a legend item.\nWe set <code>data1</code> as the value of the field to determine the angle span for each pie slice. We also set a label configuration object\nwhere we set the field name of the store field to be renderer as text for the label. The labels will also be displayed rotated.\nWe set <code>contrast</code> to <code>true</code> to flip the color of the label if it is to similar to the background color. Finally, we set the font family\nand size through the <code>font</code> parameter.</p>\n",
  "allMixins": [

  ],
  "mixins": [

  ],
  "html_filename": "Pie.html",
  "inheritable": false,
  "author": null,
  "code_type": "assignment",
  "href": "Pie.html#Ext-chart-series-Pie",
  "subclasses": [

  ],
  "superclasses": [
    "Ext.chart.series.Series"
  ],
  "linenr": 1,
  "alternateClassNames": [

  ],
  "protected": false,
  "static": false,
  "extends": "Ext.chart.series.Series",
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
        "doc": "<p>Split any series items that were combined via <a href=\"#/api/Ext.chart.series.Pie-method-combine\" rel=\"Ext.chart.series.Pie-method-combine\" class=\"docClass\">combine</a> into their original items.</p>\n",
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
        "doc": "<p>Draws the series for the current chart.</p>\n",
        "params": [

        ],
        "owner": "Ext.chart.series.Pie",
        "html_filename": "Pie.html",
        "inheritable": false,
        "href": "Pie.html#Ext-chart-series-Pie-method-drawSeries",
        "linenr": 266,
        "protected": false,
        "static": false,
        "private": false,
        "deprecated": null,
        "shortDoc": "Draws the series for the current chart. ...",
        "name": "drawSeries",
        "tagname": "method",
        "filename": "/Users/jamieavins/git/SDK/charts/src/chart/series/Pie.js",
        "return": {
          "doc": "\n",
          "type": "undefined"
        }
      },
      {
        "alias": null,
        "doc": "<p>Iterate over each of the displayed records for this pie series, taking into account\nrecords that have been combined into one by the user.</p>\n",
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
        "owner": "Ext.chart.series.Pie",
        "html_filename": "Pie.html",
        "inheritable": false,
        "href": "Pie.html#Ext-chart-series-Pie-method-eachRecord",
        "linenr": 1071,
        "protected": false,
        "static": false,
        "private": false,
        "deprecated": null,
        "shortDoc": "Iterate over each of the displayed records for this pie series, taking into account\nrecords that have been combined i...",
        "name": "eachRecord",
        "tagname": "method",
        "filename": "/Users/jamieavins/git/SDK/charts/src/chart/series/Pie.js",
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
        "doc": "<p>Returns the color of the series (to be displayed as color for the series legend item).</p>\n",
        "params": [
          {
            "doc": "<p>{Object} Info about the item; same format as returned by #getItemForPoint</p>\n",
            "type": "Object",
            "name": "item",
            "optional": false
          }
        ],
        "owner": "Ext.chart.series.Pie",
        "html_filename": "Pie.html",
        "inheritable": false,
        "href": "Pie.html#Ext-chart-series-Pie-method-getLegendColor",
        "linenr": 1058,
        "protected": false,
        "static": false,
        "private": false,
        "deprecated": null,
        "shortDoc": "Returns the color of the series (to be displayed as color for the series legend item). ...",
        "name": "getLegendColor",
        "tagname": "method",
        "filename": "/Users/jamieavins/git/SDK/charts/src/chart/series/Pie.js",
        "return": {
          "doc": "\n",
          "type": "undefined"
        }
      },
      {
        "alias": null,
        "doc": "<p>Returns an array of labels to be displayed as items in the legend. Only relevant if\n<a href=\"#/api/Ext.chart.series.Pie-cfg-showInLegend\" rel=\"Ext.chart.series.Pie-cfg-showInLegend\" class=\"docClass\">showInLegend</a> is true.</p>\n",
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
        "doc": "<p>Highlight the specified item. If no item is provided the whole series will be highlighted.</p>\n",
        "params": [
          {
            "doc": "<p>{Object} Info about the item; same format as returned by #getItemForPoint</p>\n",
            "type": "Object",
            "name": "item",
            "optional": false
          }
        ],
        "owner": "Ext.chart.series.Pie",
        "html_filename": "Pie.html",
        "inheritable": false,
        "href": "Pie.html#Ext-chart-series-Pie-method-highlightItem",
        "linenr": 860,
        "protected": false,
        "static": false,
        "private": false,
        "deprecated": null,
        "shortDoc": "Highlight the specified item. ...",
        "name": "highlightItem",
        "tagname": "method",
        "filename": "/Users/jamieavins/git/SDK/charts/src/chart/series/Pie.js",
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
        "doc": "<p>Changes the value of the <a href=\"#/api/Ext.chart.series.Pie-cfg-title\" rel=\"Ext.chart.series.Pie-cfg-title\" class=\"docClass\">title</a> for the series.\nArguments can take two forms:</p>\n\n<ul>\n<li>A single String value: this will be used as the new single title for the series (applies\nto series with only one yField)</li>\n<li>A numeric index and a String value: this will set the title for a single indexed yField.</li>\n</ul>\n\n",
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
      },
      {
        "alias": null,
        "doc": "<p>un-highlights the specified item. If no item is provided it will un-highlight the entire series.</p>\n",
        "params": [
          {
            "doc": "<p>{Object} Info about the item; same format as returned by #getItemForPoint</p>\n",
            "type": "Object",
            "name": "item",
            "optional": false
          }
        ],
        "owner": "Ext.chart.series.Pie",
        "html_filename": "Pie.html",
        "inheritable": false,
        "href": "Pie.html#Ext-chart-series-Pie-method-unHighlightItem",
        "linenr": 955,
        "protected": false,
        "static": false,
        "private": false,
        "deprecated": null,
        "shortDoc": "un-highlights the specified item. ...",
        "name": "unHighlightItem",
        "tagname": "method",
        "filename": "/Users/jamieavins/git/SDK/charts/src/chart/series/Pie.js",
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
        "doc": "<p>The store record field name to be used for the pie angles.\nThe values bound to this field name must be positive real numbers.\nThis parameter is required.</p>\n",
        "owner": "Ext.chart.series.Pie",
        "html_filename": "Pie.html",
        "inheritable": false,
        "href": "Pie.html#Ext-chart-series-Pie-cfg-angleField",
        "linenr": 82,
        "protected": false,
        "static": false,
        "private": false,
        "deprecated": null,
        "shortDoc": "The store record field name to be used for the pie angles. ...",
        "name": "angleField",
        "tagname": "cfg",
        "filename": "/Users/jamieavins/git/SDK/charts/src/chart/series/Pie.js"
      },
      {
        "alias": null,
        "type": "Array",
        "doc": "<p>An array of color values which will be used, in order, as the pie slice fill colors.</p>\n",
        "owner": "Ext.chart.series.Pie",
        "html_filename": "Pie.html",
        "inheritable": false,
        "href": "Pie.html#Ext-chart-series-Pie-cfg-colorSet",
        "linenr": 118,
        "protected": false,
        "static": false,
        "private": false,
        "deprecated": null,
        "name": "colorSet",
        "tagname": "cfg",
        "filename": "/Users/jamieavins/git/SDK/charts/src/chart/series/Pie.js"
      },
      {
        "alias": null,
        "type": "Boolean|Number",
        "doc": "<p>Whether to set the pie chart as donut chart.\nDefault's false. Can be set to a particular percentage to set the radius\nof the donut chart.</p>\n",
        "owner": "Ext.chart.series.Pie",
        "html_filename": "Pie.html",
        "inheritable": false,
        "href": "Pie.html#Ext-chart-series-Pie-cfg-donut",
        "linenr": 98,
        "protected": false,
        "static": false,
        "private": false,
        "deprecated": null,
        "shortDoc": "Whether to set the pie chart as donut chart. ...",
        "name": "donut",
        "tagname": "cfg",
        "filename": "/Users/jamieavins/git/SDK/charts/src/chart/series/Pie.js"
      },
      {
        "alias": null,
        "type": "Boolean",
        "doc": "<p>Extra distance value for which the labelOverflow listener is triggered. Default to 20.</p>\n",
        "owner": "Ext.chart.series.Pie",
        "html_filename": "Pie.html",
        "inheritable": false,
        "href": "Pie.html#Ext-chart-series-Pie-cfg-labelOverflowPadding",
        "linenr": 112,
        "protected": false,
        "static": false,
        "private": false,
        "deprecated": null,
        "shortDoc": "Extra distance value for which the labelOverflow listener is triggered. ...",
        "name": "labelOverflowPadding",
        "tagname": "cfg",
        "filename": "/Users/jamieavins/git/SDK/charts/src/chart/series/Pie.js"
      },
      {
        "alias": null,
        "type": "String",
        "doc": "<p>The store record field name to be used for the pie slice lengths.\nThe values bound to this field name must be positive real numbers.\nThis parameter is optional.</p>\n",
        "owner": "Ext.chart.series.Pie",
        "html_filename": "Pie.html",
        "inheritable": false,
        "href": "Pie.html#Ext-chart-series-Pie-cfg-lengthField",
        "linenr": 90,
        "protected": false,
        "static": false,
        "private": false,
        "deprecated": null,
        "shortDoc": "The store record field name to be used for the pie slice lengths. ...",
        "name": "lengthField",
        "tagname": "cfg",
        "filename": "/Users/jamieavins/git/SDK/charts/src/chart/series/Pie.js"
      },
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
        "type": "Number",
        "doc": "<p>The angle in degrees at which the first pie slice should start. Defaults to <code>0</code>.</p>\n",
        "owner": "Ext.chart.series.Pie",
        "html_filename": "Pie.html",
        "inheritable": false,
        "href": "Pie.html#Ext-chart-series-Pie-cfg-rotation",
        "linenr": 76,
        "protected": false,
        "static": false,
        "private": false,
        "deprecated": null,
        "shortDoc": "The angle in degrees at which the first pie slice should start. ...",
        "name": "rotation",
        "tagname": "cfg",
        "filename": "/Users/jamieavins/git/SDK/charts/src/chart/series/Pie.js"
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
        "doc": "<p>Whether to add the pie chart elements as legend items. Default's false.</p>\n",
        "owner": "Ext.chart.series.Pie",
        "html_filename": "Pie.html",
        "inheritable": false,
        "href": "Pie.html#Ext-chart-series-Pie-cfg-showInLegend",
        "linenr": 106,
        "protected": false,
        "static": false,
        "private": false,
        "deprecated": null,
        "shortDoc": "Whether to add the pie chart elements as legend items. ...",
        "name": "showInLegend",
        "tagname": "cfg",
        "filename": "/Users/jamieavins/git/SDK/charts/src/chart/series/Pie.js"
      },
      {
        "alias": null,
        "type": "Object",
        "doc": "<p>An object containing styles for overriding series styles from Theming.</p>\n",
        "owner": "Ext.chart.series.Pie",
        "html_filename": "Pie.html",
        "inheritable": false,
        "href": "Pie.html#Ext-chart-series-Pie-cfg-style",
        "linenr": 123,
        "protected": false,
        "static": false,
        "private": false,
        "deprecated": null,
        "name": "style",
        "tagname": "cfg",
        "filename": "/Users/jamieavins/git/SDK/charts/src/chart/series/Pie.js"
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
        "doc": "<p>Fires when the series title is changed via <a href=\"#/api/Ext.chart.series.Pie-method-setTitle\" rel=\"Ext.chart.series.Pie-method-setTitle\" class=\"docClass\">setTitle</a>.</p>\n",
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
    "pie"
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
  "name": "Ext.chart.series.Pie",
  "component": false,
  "tagname": "class",
  "singleton": false,
  "filename": "/Users/jamieavins/git/SDK/charts/src/chart/series/Pie.js"
});