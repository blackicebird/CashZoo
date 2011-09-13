Ext.data.JsonP.Ext_chart_axis_Time({
  "mixedInto": [

  ],
  "alias": null,
  "doc": "<p>A type of axis whose units are measured in time values. Use this axis\nfor listing dates that you will want to group or dynamically change.\nIf you just want to display dates as categories then use the\nCategory class for axis instead.</p>\n\n<p>For example:</p>\n\n<pre><code>axes: [{\n    type: 'Time',\n    position: 'bottom',\n    fields: 'date',\n    title: 'Day',\n    dateFormat: 'M d',\n    groupBy: 'year,month,day',\n    aggregateOp: 'sum',\n\n    constrain: true,\n    fromDate: new Date('1/1/11'),\n    toDate: new Date('1/7/11')\n}]\n</code></pre>\n\n<p>In this example we're creating a time axis that has as title <em>Day</em>.\nThe field the axis is bound to is <code>date</code>.\nThe date format to use to display the text for the axis labels is <code>M d</code>\nwhich is a three letter month abbreviation followed by the day number.\nThe time axis will show values for dates between <code>fromDate</code> and <code>toDate</code>.\nSince <code>constrain</code> is set to true all other values for other dates not between\nthe fromDate and toDate will not be displayed.</p>\n",
  "allMixins": [

  ],
  "mixins": [

  ],
  "html_filename": "Time.html",
  "inheritable": false,
  "author": null,
  "code_type": "assignment",
  "href": "Time.html#Ext-chart-axis-Time",
  "subclasses": [

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
        "type": "String",
        "doc": "<p>Aggregation operation when grouping. Possible options are 'sum', 'avg', 'max', 'min'. Default's 'sum'.</p>\n",
        "owner": "Ext.chart.axis.Time",
        "html_filename": "Time.html",
        "inheritable": false,
        "href": "Time.html#Ext-chart-axis-Time-property-aggregateOp",
        "linenr": 61,
        "protected": false,
        "static": false,
        "private": false,
        "deprecated": null,
        "shortDoc": "Aggregation operation when grouping. ...",
        "name": "aggregateOp",
        "tagname": "property",
        "filename": "/Users/jamieavins/git/SDK/charts/src/chart/axis/Time.js"
      },
      {
        "alias": null,
        "type": "Boolean",
        "doc": "<p>If true, the values of the chart will be rendered only if they belong between the fromDate and toDate.\nIf false, the time axis will adapt to the new values by adding/removing steps.\nDefault's [Ext.Date.DAY, 1].</p>\n",
        "owner": "Ext.chart.axis.Time",
        "html_filename": "Time.html",
        "inheritable": false,
        "href": "Time.html#Ext-chart-axis-Time-property-constrain",
        "linenr": 92,
        "protected": false,
        "static": false,
        "private": false,
        "deprecated": null,
        "shortDoc": "If true, the values of the chart will be rendered only if they belong between the fromDate and toDate. ...",
        "name": "constrain",
        "tagname": "property",
        "filename": "/Users/jamieavins/git/SDK/charts/src/chart/axis/Time.js"
      },
      {
        "alias": null,
        "type": "Date",
        "doc": "<p>The starting date for the time axis.</p>\n",
        "owner": "Ext.chart.axis.Time",
        "html_filename": "Time.html",
        "inheritable": false,
        "href": "Time.html#Ext-chart-axis-Time-property-fromDate",
        "linenr": 69,
        "protected": false,
        "static": false,
        "private": false,
        "deprecated": null,
        "name": "fromDate",
        "tagname": "property",
        "filename": "/Users/jamieavins/git/SDK/charts/src/chart/axis/Time.js"
      },
      {
        "alias": null,
        "type": "String",
        "doc": "<p>Indicates the time unit to use for each step. Can be 'day', 'month', 'year' or a comma-separated combination of all of them.\nDefault's 'year,month,day'.</p>\n",
        "owner": "Ext.chart.axis.Time",
        "html_filename": "Time.html",
        "inheritable": false,
        "href": "Time.html#Ext-chart-axis-Time-property-groupBy",
        "linenr": 52,
        "protected": false,
        "static": false,
        "private": false,
        "deprecated": null,
        "shortDoc": "Indicates the time unit to use for each step. ...",
        "name": "groupBy",
        "tagname": "property",
        "filename": "/Users/jamieavins/git/SDK/charts/src/chart/axis/Time.js"
      },
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
        "type": "Array",
        "doc": "<p>An array with two components: The first is the unit of the step (day, month, year, etc). The second one is the number of units for the step (1, 2, etc.).\nDefault's [Ext.Date.DAY, 1].</p>\n",
        "owner": "Ext.chart.axis.Time",
        "html_filename": "Time.html",
        "inheritable": false,
        "href": "Time.html#Ext-chart-axis-Time-property-step",
        "linenr": 83,
        "protected": false,
        "static": false,
        "private": false,
        "deprecated": null,
        "shortDoc": "An array with two components: The first is the unit of the step (day, month, year, etc). ...",
        "name": "step",
        "tagname": "property",
        "filename": "/Users/jamieavins/git/SDK/charts/src/chart/axis/Time.js"
      },
      {
        "alias": null,
        "type": "Date",
        "doc": "<p>The ending date for the time axis.</p>\n",
        "owner": "Ext.chart.axis.Time",
        "html_filename": "Time.html",
        "inheritable": false,
        "href": "Time.html#Ext-chart-axis-Time-property-toDate",
        "linenr": 76,
        "protected": false,
        "static": false,
        "private": false,
        "deprecated": null,
        "name": "toDate",
        "tagname": "property",
        "filename": "/Users/jamieavins/git/SDK/charts/src/chart/axis/Time.js"
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
        "doc": "\n",
        "params": [

        ],
        "owner": "Ext.chart.axis.Time",
        "html_filename": "Time.html",
        "inheritable": false,
        "href": "Time.html#Ext-chart-axis-Time-method-constructor",
        "linenr": 1,
        "protected": false,
        "static": false,
        "private": false,
        "deprecated": null,
        "shortDoc": " ...",
        "name": "constructor",
        "tagname": "method",
        "filename": "/Users/jamieavins/git/SDK/charts/src/chart/axis/Time.js",
        "return": {
          "doc": "\n",
          "type": "Object"
        }
      },
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
        "doc": "<p>Updates the <a href=\"#/api/Ext.chart.axis.Time-cfg-title\" rel=\"Ext.chart.axis.Time-cfg-title\" class=\"docClass\">title</a> of this axis.</p>\n",
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
        "doc": "<p>The minimum value drawn by the axis. If not set explicitly, the axis\nminimum will be calculated automatically.</p>\n",
        "owner": "Ext.chart.axis.Time",
        "html_filename": "Time.html",
        "inheritable": false,
        "href": "Time.html#Ext-chart-axis-Time-cfg-calculateByLabelSize",
        "linenr": 38,
        "protected": false,
        "static": false,
        "private": false,
        "deprecated": null,
        "shortDoc": "The minimum value drawn by the axis. ...",
        "name": "calculateByLabelSize",
        "tagname": "cfg",
        "filename": "/Users/jamieavins/git/SDK/charts/src/chart/axis/Time.js"
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
        "type": "String/Boolean",
        "doc": "<p>Indicates the format the date will be rendered on.\nFor example: 'M d' will render the dates as 'Jan 30', etc.</p>\n",
        "owner": "Ext.chart.axis.Time",
        "html_filename": "Time.html",
        "inheritable": false,
        "href": "Time.html#Ext-chart-axis-Time-cfg-dateFormat",
        "linenr": 45,
        "protected": false,
        "static": false,
        "private": false,
        "deprecated": null,
        "shortDoc": "Indicates the format the date will be rendered on. ...",
        "name": "dateFormat",
        "tagname": "cfg",
        "filename": "/Users/jamieavins/git/SDK/charts/src/chart/axis/Time.js"
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
  "name": "Ext.chart.axis.Time",
  "component": false,
  "tagname": "class",
  "singleton": false,
  "filename": "/Users/jamieavins/git/SDK/charts/src/chart/axis/Time.js"
});