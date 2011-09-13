Ext.data.JsonP.Ext_chart_Chart({
  "mixedInto": [

  ],
  "alias": null,
  "doc": "<p>The Ext.chart package provides the capability to visualize data.\nEach chart binds directly to an Ext.data.Store enabling automatic updates of the chart.\nA chart configuration object has some overall styling options as well as an array of axes\nand series. A chart instance example could look like:</p>\n\n<pre><code>    new Ext.chart.Chart({\n        renderTo: Ext.getBody(),\n        width: 800,\n        height: 600,\n        animate: true,\n        store: store1,\n        shadow: true,\n        theme: 'Category1',\n        legend: {\n            position: 'right'\n        },\n        axes: [ ...some axes options... ],\n        series: [ ...some series options... ]\n    });\n  </code></pre>\n\n\n<p>In this example we set the <code>width</code> and <code>height</code> of the chart, we decide whether our series are\nanimated or not and we select a store to be bound to the chart. We also turn on shadows for all series,\nselect a color theme <code>Category1</code> for coloring the series, set the legend to the right part of the chart and\nthen tell the chart to render itself in the body element of the document. For more information about the axes and\nseries configurations please check the documentation of each series (Line, Bar, Pie, etc).</p>\n",
  "allMixins": [

  ],
  "mixins": [

  ],
  "html_filename": "Chart.html",
  "inheritable": false,
  "author": null,
  "code_type": "assignment",
  "href": "Chart.html#Ext-chart-Chart",
  "subclasses": [

  ],
  "superclasses": [
    "Ext.draw.Component"
  ],
  "linenr": 1,
  "alternateClassNames": [

  ],
  "protected": false,
  "static": false,
  "extends": "Ext.draw.Component",
  "docauthor": null,
  "members": {
    "property": [
      {
        "alias": null,
        "type": "String",
        "doc": "<p>Current Version of Touch Charts</p>\n",
        "owner": "Ext.chart.Chart",
        "html_filename": "Chart.html",
        "inheritable": false,
        "href": "Chart.html#Ext-chart-Chart-property-version",
        "linenr": 38,
        "protected": false,
        "static": false,
        "private": false,
        "deprecated": null,
        "name": "version",
        "tagname": "property",
        "filename": "/Users/jamieavins/git/SDK/charts/src/chart/Chart.js"
      }
    ],
    "css_var": [

    ],
    "css_mixin": [

    ],
    "method": [
      {
        "alias": null,
        "doc": "<p>Adds an interaction to the chart.</p>\n",
        "params": [
          {
            "doc": "<p>Either an instantiated <a href=\"#/api/Ext.chart.interactions.Abstract\" rel=\"Ext.chart.interactions.Abstract\" class=\"docClass\">Ext.chart.interactions.Abstract</a>\ninstance, a configuration object for an interaction, or the interaction type as a String.</p>\n",
            "type": "Object/String",
            "name": "interaction",
            "optional": false
          }
        ],
        "owner": "Ext.chart.Chart",
        "html_filename": "Chart.html",
        "inheritable": false,
        "href": "Chart.html#Ext-chart-Chart-method-addInteraction",
        "linenr": 843,
        "protected": false,
        "static": false,
        "private": false,
        "deprecated": null,
        "shortDoc": "Adds an interaction to the chart. ...",
        "name": "addInteraction",
        "tagname": "method",
        "filename": "/Users/jamieavins/git/SDK/charts/src/chart/Chart.js",
        "return": {
          "doc": "\n",
          "type": "undefined"
        }
      },
      {
        "alias": null,
        "doc": "<p>Changes the data store bound to this chart and refreshes it.</p>\n",
        "params": [
          {
            "doc": "<p>The store to bind to this chart</p>\n",
            "type": "Ext.data.Store",
            "name": "store",
            "optional": false
          }
        ],
        "owner": "Ext.chart.Chart",
        "html_filename": "Chart.html",
        "inheritable": false,
        "href": "Chart.html#Ext-chart-Chart-method-bindStore",
        "linenr": 801,
        "protected": false,
        "static": false,
        "private": false,
        "deprecated": null,
        "shortDoc": "Changes the data store bound to this chart and refreshes it. ...",
        "name": "bindStore",
        "tagname": "method",
        "filename": "/Users/jamieavins/git/SDK/charts/src/chart/Chart.js",
        "return": {
          "doc": "\n",
          "type": "undefined"
        }
      },
      {
        "alias": null,
        "doc": "<p>Create the Surface instance. Resolves the correct Surface implementation to\ninstantiate based on the 'enginePriority' config. Once the Surface instance is\ncreated you can use the handle to that instance to add sprites. For example:</p>\n\n<pre><code>        drawComponent.surface.add(sprite);\n     </code></pre>\n\n",
        "params": [
          {
            "doc": "\n",
            "type": "Object",
            "name": "config",
            "optional": false
          }
        ],
        "owner": "Ext.draw.Component",
        "html_filename": "Component.html",
        "inheritable": false,
        "href": "Component.html#Ext-draw-Component-method-createSurface",
        "linenr": 208,
        "protected": false,
        "static": false,
        "private": false,
        "deprecated": null,
        "shortDoc": "Create the Surface instance. ...",
        "name": "createSurface",
        "tagname": "method",
        "filename": "/Users/jamieavins/git/SDK/charts/src/draw/Component.js",
        "return": {
          "doc": "\n",
          "type": "undefined"
        }
      },
      {
        "alias": null,
        "doc": "<p>Given an x/y point relative to the chart, find and return the first series item that\nmatches that point.</p>\n",
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
        "owner": "Ext.chart.Chart",
        "html_filename": "Chart.html",
        "inheritable": false,
        "href": "Chart.html#Ext-chart-Chart-method-getItemForPoint",
        "linenr": 731,
        "protected": false,
        "static": false,
        "private": false,
        "deprecated": null,
        "shortDoc": "Given an x/y point relative to the chart, find and return the first series item that\nmatches that point. ...",
        "name": "getItemForPoint",
        "tagname": "method",
        "filename": "/Users/jamieavins/git/SDK/charts/src/chart/Chart.js",
        "return": {
          "doc": "<p>an object with <code>series</code> and <code>item</code> properties, or <code>false</code> if no item found</p>\n",
          "type": "Object"
        }
      },
      {
        "alias": null,
        "doc": "<p>Given an x/y point relative to the chart, find and return all series items that match that point.</p>\n",
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
        "owner": "Ext.chart.Chart",
        "html_filename": "Chart.html",
        "inheritable": false,
        "href": "Chart.html#Ext-chart-Chart-method-getItemsForPoint",
        "linenr": 756,
        "protected": false,
        "static": false,
        "private": false,
        "deprecated": null,
        "shortDoc": "Given an x/y point relative to the chart, find and return all series items that match that point. ...",
        "name": "getItemsForPoint",
        "tagname": "method",
        "filename": "/Users/jamieavins/git/SDK/charts/src/chart/Chart.js",
        "return": {
          "doc": "<p>an array of objects with <code>series</code> and <code>item</code> properties</p>\n",
          "type": "Array"
        }
      },
      {
        "alias": null,
        "doc": "<p>Retrieves a reference to the <a href=\"#/api/Ext.chart.Toolbar\" rel=\"Ext.chart.Toolbar\" class=\"docClass\">Ext.chart.Toolbar</a> for this chart, creating it first\nif necessary.</p>\n",
        "params": [

        ],
        "owner": "Ext.chart.Chart",
        "html_filename": "Chart.html",
        "inheritable": false,
        "href": "Chart.html#Ext-chart-Chart-method-getToolbar",
        "linenr": 518,
        "protected": false,
        "static": false,
        "private": false,
        "deprecated": null,
        "shortDoc": "Retrieves a reference to the Ext.chart.Toolbar for this chart, creating it first\nif necessary. ...",
        "name": "getToolbar",
        "tagname": "method",
        "filename": "/Users/jamieavins/git/SDK/charts/src/chart/Chart.js",
        "return": {
          "doc": "\n",
          "type": "Ext.chart.Toolbar"
        }
      },
      {
        "alias": null,
        "doc": "<p>Redraw the chart. If animations are set this will animate the chart too.</p>\n",
        "params": [
          {
            "doc": "<p>(optional) flag which changes the default origin points of the chart for animations.</p>\n",
            "type": "Boolean",
            "name": "resize",
            "optional": true
          }
        ],
        "owner": "Ext.chart.Chart",
        "html_filename": "Chart.html",
        "inheritable": false,
        "href": "Chart.html#Ext-chart-Chart-method-redraw",
        "linenr": 555,
        "protected": false,
        "static": false,
        "private": false,
        "deprecated": null,
        "shortDoc": "Redraw the chart. ...",
        "name": "redraw",
        "tagname": "method",
        "filename": "/Users/jamieavins/git/SDK/charts/src/chart/Chart.js",
        "return": {
          "doc": "\n",
          "type": "undefined"
        }
      },
      {
        "alias": null,
        "doc": "<p>Reset the chart back to its initial state, before any user interaction.</p>\n",
        "params": [
          {
            "doc": "<p>if <code>true</code>, redrawing of the chart will be skipped.</p>\n",
            "type": "Boolean",
            "name": "skipRedraw",
            "optional": false
          }
        ],
        "owner": "Ext.chart.Chart",
        "html_filename": "Chart.html",
        "inheritable": false,
        "href": "Chart.html#Ext-chart-Chart-method-reset",
        "linenr": 1061,
        "protected": false,
        "static": false,
        "private": false,
        "deprecated": null,
        "shortDoc": "Reset the chart back to its initial state, before any user interaction. ...",
        "name": "reset",
        "tagname": "method",
        "filename": "/Users/jamieavins/git/SDK/charts/src/chart/Chart.js",
        "return": {
          "doc": "\n",
          "type": "undefined"
        }
      }
    ],
    "cfg": [
      {
        "alias": null,
        "type": "Boolean/Object",
        "doc": "<p>(optional) true for the default animation (easing: 'ease' and duration: 500)\nor a standard animation config object to be used for default chart animations. Defaults to false.</p>\n",
        "owner": "Ext.chart.Chart",
        "html_filename": "Chart.html",
        "inheritable": false,
        "href": "Chart.html#Ext-chart-Chart-cfg-animate",
        "linenr": 59,
        "protected": false,
        "static": false,
        "private": false,
        "deprecated": null,
        "shortDoc": "(optional) true for the default animation (easing: 'ease' and duration: 500)\nor a standard animation config object to...",
        "name": "animate",
        "tagname": "cfg",
        "filename": "/Users/jamieavins/git/SDK/charts/src/chart/Chart.js"
      },
      {
        "alias": null,
        "type": "Boolean",
        "doc": "<p>Turn on autoSize support which will set the bounding div's size to the natural size of the contents. Defaults to false.</p>\n",
        "owner": "Ext.draw.Component",
        "html_filename": "Component.html",
        "inheritable": false,
        "href": "Component.html#Ext-draw-Component-cfg-autoSize",
        "linenr": 68,
        "protected": false,
        "static": false,
        "private": false,
        "deprecated": null,
        "shortDoc": "Turn on autoSize support which will set the bounding div's size to the natural size of the contents. ...",
        "name": "autoSize",
        "tagname": "cfg",
        "filename": "/Users/jamieavins/git/SDK/charts/src/draw/Component.js"
      },
      {
        "alias": null,
        "type": "[Ext.chart.axis.Axis]",
        "doc": "<p>Array of <a href=\"#/api/Ext.chart.axis.Axis\" rel=\"Ext.chart.axis.Axis\" class=\"docClass\">Axis</a> instances or config objects. For example:</p>\n\n<p>axes: [{</p>\n\n<pre><code> type: 'Numeric',\n position: 'left',\n fields: ['data1'],\n title: 'Number of Hits',\n minimum: 0,\n //one minor tick between two major ticks\n minorTickSteps: 1\n</code></pre>\n\n<p>}, {</p>\n\n<pre><code> type: 'Category',\n position: 'bottom',\n fields: ['name'],\n title: 'Month of the Year'\n</code></pre>\n\n<p>}]</p>\n",
        "owner": "Ext.chart.Chart",
        "html_filename": "Chart.html",
        "inheritable": false,
        "href": "Chart.html#Ext-chart-Chart-cfg-axes",
        "linenr": 202,
        "protected": false,
        "static": false,
        "private": false,
        "deprecated": null,
        "shortDoc": "Array of Axis instances or config objects. ...",
        "name": "axes",
        "tagname": "cfg",
        "filename": "/Users/jamieavins/git/SDK/charts/src/chart/Chart.js"
      },
      {
        "alias": null,
        "type": "Object|Boolean",
        "doc": "<p>(optional) Set the chart background. This can be a gradient object, image, or color.\nDefaults to false for no background.</p>\n\n<p>For example, if <code>background</code> were to be a color we could set the object as</p>\n\n<pre><code>        background: {\n            //color string\n            fill: '#ccc'\n        }\n     </code></pre>\n\n\n<pre><code> You can specify an image by using:\n</code></pre>\n\n<pre><code>        background: {\n            image: 'http://path.to.image/'\n        }\n     </code></pre>\n\n\n<pre><code> Also you can specify a gradient by using the gradient object syntax:\n</code></pre>\n\n<pre><code>        background: {\n            gradient: {\n                id: 'gradientId',\n                angle: 45,\n                stops: {\n                    0: {\n                        color: '#555'\n                    }\n                    100: {\n                        color: '#ddd'\n                    }\n                }\n            }\n        }\n     </code></pre>\n\n",
        "owner": "Ext.chart.Chart",
        "html_filename": "Chart.html",
        "inheritable": false,
        "href": "Chart.html#Ext-chart-Chart-cfg-background",
        "linenr": 74,
        "protected": false,
        "static": false,
        "private": false,
        "deprecated": null,
        "shortDoc": "(optional) Set the chart background. ...",
        "name": "background",
        "tagname": "cfg",
        "filename": "/Users/jamieavins/git/SDK/charts/src/chart/Chart.js"
      },
      {
        "alias": null,
        "type": "Array",
        "doc": "<p>Defines the priority order for which Surface implementation to use. The first\none supported by the current environment will be used.</p>\n",
        "owner": "Ext.draw.Component",
        "html_filename": "Component.html",
        "inheritable": false,
        "href": "Component.html#Ext-draw-Component-cfg-enginePriority",
        "linenr": 50,
        "protected": false,
        "static": false,
        "private": false,
        "deprecated": null,
        "shortDoc": "Defines the priority order for which Surface implementation to use. ...",
        "name": "enginePriority",
        "tagname": "cfg",
        "filename": "/Users/jamieavins/git/SDK/charts/src/draw/Component.js"
      },
      {
        "alias": null,
        "type": "Array",
        "doc": "<p>(optional) Define a set of gradients that can be used as <code>fill</code> property in sprites.\nThe gradients array is an array of objects with the following properties:</p>\n\n<ul>\n<li><strong>id</strong> - string - The unique name of the gradient.</li>\n<li><strong>angle</strong> - number, optional - The angle of the gradient in degrees.</li>\n<li><strong>stops</strong> - object - An object with numbers as keys (from 0 to 100) and style objects\nas values</li>\n</ul>\n\n\n<pre><code> For example:\n</code></pre>\n\n<pre><code>        gradients: [{\n            id: 'gradientId',\n            angle: 45,\n            stops: {\n                0: {\n                    color: '#555'\n                },\n                100: {\n                    color: '#ddd'\n                }\n            }\n        },  {\n            id: 'gradientId2',\n            angle: 0,\n            stops: {\n                0: {\n                    color: '#590'\n                },\n                20: {\n                    color: '#599'\n                },\n                100: {\n                    color: '#ddd'\n                }\n            }\n        }]\n     </code></pre>\n\n\n<pre><code> Then the sprites can use `gradientId` and `gradientId2` by setting the fill attributes to those ids, for example:\n</code></pre>\n\n<pre><code>        sprite.setAttributes({\n            fill: 'url(#gradientId)'\n        }, true);\n     </code></pre>\n\n",
        "owner": "Ext.draw.Component",
        "html_filename": "Component.html",
        "inheritable": false,
        "href": "Component.html#Ext-draw-Component-cfg-gradients",
        "linenr": 74,
        "protected": false,
        "static": false,
        "private": false,
        "deprecated": null,
        "shortDoc": "(optional) Define a set of gradients that can be used as fill property in sprites. ...",
        "name": "gradients",
        "tagname": "cfg",
        "filename": "/Users/jamieavins/git/SDK/charts/src/draw/Component.js"
      },
      {
        "alias": null,
        "type": "integer",
        "doc": "<p>(optional) Set the amount of inset padding in pixels for the chart. Defaults to 10.</p>\n",
        "owner": "Ext.chart.Chart",
        "html_filename": "Chart.html",
        "inheritable": false,
        "href": "Chart.html#Ext-chart-Chart-cfg-insetPadding",
        "linenr": 70,
        "protected": false,
        "static": false,
        "private": false,
        "deprecated": null,
        "shortDoc": "(optional) Set the amount of inset padding in pixels for the chart. ...",
        "name": "insetPadding",
        "tagname": "cfg",
        "filename": "/Users/jamieavins/git/SDK/charts/src/chart/Chart.js"
      },
      {
        "alias": null,
        "type": "Array",
        "doc": "<p>Interactions are optional modules that can be plugged in to a chart to allow the user to interact\nwith the chart and its data in special ways. The <code>interactions</code> config takes an Array of Object\nconfigurations, each one corresponding to a particular interaction class identified by a <code>type</code> property:</p>\n\n<pre><code>new Ext.chart.Chart({\n    renderTo: Ext.getBody(),\n    width: 800,\n    height: 600,\n    store: store1,\n    axes: [ ...some axes options... ],\n    series: [ ...some series options... ],\n    interactions: [{\n        type: 'interactiontype'\n        // ...additional configs for the interaction...\n    }]\n});\n</code></pre>\n\n<p>When adding an interaction which uses only its default configuration (no extra properties other than <code>type</code>),\nyou can alternately specify only the type as a String rather than the full Object:</p>\n\n<pre><code>interactions: ['reset', 'rotate']\n</code></pre>\n\n<p>The current supported interaction types include:</p>\n\n<ul>\n<li><a href=\"#/api/Ext.chart.interactions.PanZoom\" rel=\"Ext.chart.interactions.PanZoom\" class=\"docClass\">panzoom</a> - allows pan and zoom of axes</li>\n<li><a href=\"#/api/Ext.chart.interactions.ItemCompare\" rel=\"Ext.chart.interactions.ItemCompare\" class=\"docClass\">itemcompare</a> - allows selection and comparison of two data points</li>\n<li><a href=\"#/api/Ext.chart.interactions.ItemHighlight\" rel=\"Ext.chart.interactions.ItemHighlight\" class=\"docClass\">itemhighlight</a> - allows highlighting of series data points</li>\n<li><a href=\"#/api/Ext.chart.interactions.ItemInfo\" rel=\"Ext.chart.interactions.ItemInfo\" class=\"docClass\">iteminfo</a> - allows displaying details of a data point in a popup panel</li>\n<li><a href=\"#/api/Ext.chart.interactions.PieGrouping\" rel=\"Ext.chart.interactions.PieGrouping\" class=\"docClass\">piegrouping</a> - allows selection of multiple consecutive pie slices</li>\n<li><a href=\"#/api/Ext.chart.interactions.Rotate\" rel=\"Ext.chart.interactions.Rotate\" class=\"docClass\">rotate</a> - allows rotation of pie and radar series</li>\n<li><a href=\"#/api/Ext.chart.interactions.Reset\" rel=\"Ext.chart.interactions.Reset\" class=\"docClass\">reset</a> - allows resetting of all user interactions to the default state</li>\n<li><a href=\"#/api/Ext.chart.interactions.ToggleStacked\" rel=\"Ext.chart.interactions.ToggleStacked\" class=\"docClass\">togglestacked</a> - allows toggling a multi-yField bar/column chart between stacked and grouped</li>\n</ul>\n\n\n<p>See the documentation for each of those interaction classes to see how they can be configured.</p>\n\n<p>Additional custom interactions can be registered with the <a href=\"#/api/Ext.chart.interactions.Manager\" rel=\"Ext.chart.interactions.Manager\" class=\"docClass\">interaction manager</a>.</p>\n",
        "owner": "Ext.chart.Chart",
        "html_filename": "Chart.html",
        "inheritable": false,
        "href": "Chart.html#Ext-chart-Chart-cfg-interactions",
        "linenr": 117,
        "protected": false,
        "static": false,
        "private": false,
        "deprecated": null,
        "shortDoc": "Interactions are optional modules that can be plugged in to a chart to allow the user to interact\nwith the chart and ...",
        "name": "interactions",
        "tagname": "cfg",
        "filename": "/Users/jamieavins/git/SDK/charts/src/chart/Chart.js"
      },
      {
        "alias": null,
        "type": "Boolean/Object",
        "doc": "<p>(optional) true for the default legend display or a legend config object. Defaults to false.</p>\n",
        "owner": "Ext.chart.Chart",
        "html_filename": "Chart.html",
        "inheritable": false,
        "href": "Chart.html#Ext-chart-Chart-cfg-legend",
        "linenr": 65,
        "protected": false,
        "static": false,
        "private": false,
        "deprecated": null,
        "shortDoc": "(optional) true for the default legend display or a legend config object. ...",
        "name": "legend",
        "tagname": "cfg",
        "filename": "/Users/jamieavins/git/SDK/charts/src/chart/Chart.js"
      },
      {
        "alias": null,
        "type": "[Ext.chart.series.Series]",
        "doc": "<p>Array of <a href=\"#/api/Ext.chart.series.Series\" rel=\"Ext.chart.series.Series\" class=\"docClass\">Series</a> instances or config objects. For example:</p>\n\n<p>series: [{</p>\n\n<pre><code> type: 'column',\n axis: 'left',\n listeners: {\n     'afterrender': function() {\n         console('afterrender');\n     }\n },\n xField: 'category',\n yField: 'data1'\n</code></pre>\n\n<p>}]</p>\n",
        "owner": "Ext.chart.Chart",
        "html_filename": "Chart.html",
        "inheritable": false,
        "href": "Chart.html#Ext-chart-Chart-cfg-series",
        "linenr": 185,
        "protected": false,
        "static": false,
        "private": false,
        "deprecated": null,
        "shortDoc": "Array of Series instances or config objects. ...",
        "name": "series",
        "tagname": "cfg",
        "filename": "/Users/jamieavins/git/SDK/charts/src/chart/Chart.js"
      },
      {
        "alias": null,
        "type": "Boolean/Object",
        "doc": "<p>(optional) true for the default shadow configuration (shadowOffsetX: 2, shadowOffsetY: 2, shadowBlur: 3, shadowColor: '#444')\nor a standard shadow config object to be used for default chart shadows. Defaults to false.</p>\n",
        "owner": "Ext.chart.Chart",
        "html_filename": "Chart.html",
        "inheritable": false,
        "href": "Chart.html#Ext-chart-Chart-cfg-shadow",
        "linenr": 54,
        "protected": false,
        "static": false,
        "private": false,
        "deprecated": null,
        "shortDoc": "(optional) true for the default shadow configuration (shadowOffsetX: 2, shadowOffsetY: 2, shadowBlur: 3, shadowColor:...",
        "name": "shadow",
        "tagname": "cfg",
        "filename": "/Users/jamieavins/git/SDK/charts/src/chart/Chart.js"
      },
      {
        "alias": null,
        "type": "Ext.data.Store",
        "doc": "<p>The store that supplies data to this chart.</p>\n",
        "owner": "Ext.chart.Chart",
        "html_filename": "Chart.html",
        "inheritable": false,
        "href": "Chart.html#Ext-chart-Chart-cfg-store",
        "linenr": 180,
        "protected": false,
        "static": false,
        "private": false,
        "deprecated": null,
        "name": "store",
        "tagname": "cfg",
        "filename": "/Users/jamieavins/git/SDK/charts/src/chart/Chart.js"
      },
      {
        "alias": null,
        "type": "String",
        "doc": "<p>(optional) The name of the theme to be used. A theme defines the colors and\nother visual displays of tick marks on axis, text, title text, line colors, marker colors and styles, etc.\nPossible theme values are 'Base', 'Green', 'Sky', 'Red', 'Purple', 'Blue', 'Yellow' and also six category themes\n'Category1' to 'Category6'. Default value is 'Base'.</p>\n",
        "owner": "Ext.chart.Chart",
        "html_filename": "Chart.html",
        "inheritable": false,
        "href": "Chart.html#Ext-chart-Chart-cfg-theme",
        "linenr": 47,
        "protected": false,
        "static": false,
        "private": false,
        "deprecated": null,
        "shortDoc": "(optional) The name of the theme to be used. ...",
        "name": "theme",
        "tagname": "cfg",
        "filename": "/Users/jamieavins/git/SDK/charts/src/chart/Chart.js"
      },
      {
        "alias": null,
        "type": "Object",
        "doc": "<p>Optional configuration for this chart's toolbar. The toolbar docks itself to one side of the chart\nand can contain buttons for handling certain actions. For example, if the chart legend is configured\nwith <a href=\"#/api/Ext.chart.Legend-cfg-dock\" rel=\"Ext.chart.Legend-cfg-dock\" class=\"docClass\">dock:true</a> then a button for bringing up the legend will be placed\nin this toolbar. Custom may also be added to the toolbar if desired.</p>\n\n<p>See the <a href=\"#/api/Ext.chart.Toolbar\" rel=\"Ext.chart.Toolbar\" class=\"docClass\">Ext.chart.Toolbar</a> docs for the recognized config properties.</p>\n",
        "owner": "Ext.chart.Chart",
        "html_filename": "Chart.html",
        "inheritable": false,
        "href": "Chart.html#Ext-chart-Chart-cfg-toolbar",
        "linenr": 159,
        "protected": false,
        "static": false,
        "private": false,
        "deprecated": null,
        "shortDoc": "Optional configuration for this chart's toolbar. ...",
        "name": "toolbar",
        "tagname": "cfg",
        "filename": "/Users/jamieavins/git/SDK/charts/src/chart/Chart.js"
      },
      {
        "alias": null,
        "type": "Boolean",
        "doc": "<p>Turn on view box support which will scale and position items in the draw component to fit to the component while\nmaintaining aspect ratio. Note that this scaling can override other sizing settings on yor items. Defaults to true.</p>\n",
        "owner": "Ext.draw.Component",
        "html_filename": "Component.html",
        "inheritable": false,
        "href": "Component.html#Ext-draw-Component-cfg-viewBox",
        "linenr": 61,
        "protected": false,
        "static": false,
        "private": false,
        "deprecated": null,
        "shortDoc": "Turn on view box support which will scale and position items in the draw component to fit to the component while\nmain...",
        "name": "viewBox",
        "tagname": "cfg",
        "filename": "/Users/jamieavins/git/SDK/charts/src/draw/Component.js"
      }
    ],
    "event": [
      {
        "alias": null,
        "doc": "<p>Fires before a refresh to the chart data is called.  If the beforerefresh handler returns\n<tt>false</tt> the <a href=\"#/api/Ext.chart.Chart-event-refresh\" rel=\"Ext.chart.Chart-event-refresh\" class=\"docClass\">refresh</a> action will be cancelled.</p>\n",
        "params": [
          {
            "doc": "\n",
            "type": "Ext.chart.Chart",
            "name": "this",
            "optional": false
          }
        ],
        "owner": "Ext.chart.Chart",
        "html_filename": "Chart.html",
        "inheritable": false,
        "href": "Chart.html#Ext-chart-Chart-event-beforerefresh",
        "linenr": 258,
        "protected": false,
        "static": false,
        "private": false,
        "deprecated": null,
        "shortDoc": "Fires before a refresh to the chart data is called. ...",
        "name": "beforerefresh",
        "tagname": "event",
        "filename": "/Users/jamieavins/git/SDK/charts/src/chart/Chart.js"
      },
      {
        "alias": null,
        "doc": "<p>Fires when a click event occurs on a series item.</p>\n",
        "params": [
          {
            "doc": "\n",
            "type": "Ext.chart.series.Series",
            "name": "series",
            "optional": false
          },
          {
            "doc": "\n",
            "type": "Object",
            "name": "item",
            "optional": false
          },
          {
            "doc": "\n",
            "type": "Event",
            "name": "event",
            "optional": false
          }
        ],
        "owner": "Ext.chart.Chart",
        "html_filename": "Chart.html",
        "inheritable": false,
        "href": "Chart.html#Ext-chart-Chart-event-itemclick",
        "linenr": 313,
        "protected": false,
        "static": false,
        "private": false,
        "deprecated": null,
        "shortDoc": "Fires when a click event occurs on a series item. ...",
        "name": "itemclick",
        "tagname": "event",
        "filename": "/Users/jamieavins/git/SDK/charts/src/chart/Chart.js"
      },
      {
        "alias": null,
        "doc": "<p>Fires when a doubleclick event occurs on a series item.</p>\n",
        "params": [
          {
            "doc": "\n",
            "type": "Ext.chart.series.Series",
            "name": "series",
            "optional": false
          },
          {
            "doc": "\n",
            "type": "Object",
            "name": "item",
            "optional": false
          },
          {
            "doc": "\n",
            "type": "Event",
            "name": "event",
            "optional": false
          }
        ],
        "owner": "Ext.chart.Chart",
        "html_filename": "Chart.html",
        "inheritable": false,
        "href": "Chart.html#Ext-chart-Chart-event-itemdoubleclick",
        "linenr": 320,
        "protected": false,
        "static": false,
        "private": false,
        "deprecated": null,
        "shortDoc": "Fires when a doubleclick event occurs on a series item. ...",
        "name": "itemdoubleclick",
        "tagname": "event",
        "filename": "/Users/jamieavins/git/SDK/charts/src/chart/Chart.js"
      },
      {
        "alias": null,
        "doc": "<p>Fires when a doubletap event occurs on a series item.</p>\n",
        "params": [
          {
            "doc": "\n",
            "type": "Ext.chart.series.Series",
            "name": "series",
            "optional": false
          },
          {
            "doc": "\n",
            "type": "Object",
            "name": "item",
            "optional": false
          },
          {
            "doc": "\n",
            "type": "Event",
            "name": "event",
            "optional": false
          }
        ],
        "owner": "Ext.chart.Chart",
        "html_filename": "Chart.html",
        "inheritable": false,
        "href": "Chart.html#Ext-chart-Chart-event-itemdoubletap",
        "linenr": 362,
        "protected": false,
        "static": false,
        "private": false,
        "deprecated": null,
        "shortDoc": "Fires when a doubletap event occurs on a series item. ...",
        "name": "itemdoubletap",
        "tagname": "event",
        "filename": "/Users/jamieavins/git/SDK/charts/src/chart/Chart.js"
      },
      {
        "alias": null,
        "doc": "<p>Fires when a drag event occurs on a series item.</p>\n",
        "params": [
          {
            "doc": "\n",
            "type": "Ext.chart.series.Series",
            "name": "series",
            "optional": false
          },
          {
            "doc": "\n",
            "type": "Object",
            "name": "item",
            "optional": false
          },
          {
            "doc": "\n",
            "type": "Event",
            "name": "event",
            "optional": false
          }
        ],
        "owner": "Ext.chart.Chart",
        "html_filename": "Chart.html",
        "inheritable": false,
        "href": "Chart.html#Ext-chart-Chart-event-itemdrag",
        "linenr": 404,
        "protected": false,
        "static": false,
        "private": false,
        "deprecated": null,
        "shortDoc": "Fires when a drag event occurs on a series item. ...",
        "name": "itemdrag",
        "tagname": "event",
        "filename": "/Users/jamieavins/git/SDK/charts/src/chart/Chart.js"
      },
      {
        "alias": null,
        "doc": "<p>Fires when a dragend event occurs on a series item.</p>\n",
        "params": [
          {
            "doc": "\n",
            "type": "Ext.chart.series.Series",
            "name": "series",
            "optional": false
          },
          {
            "doc": "\n",
            "type": "Object",
            "name": "item",
            "optional": false
          },
          {
            "doc": "\n",
            "type": "Event",
            "name": "event",
            "optional": false
          }
        ],
        "owner": "Ext.chart.Chart",
        "html_filename": "Chart.html",
        "inheritable": false,
        "href": "Chart.html#Ext-chart-Chart-event-itemdragend",
        "linenr": 411,
        "protected": false,
        "static": false,
        "private": false,
        "deprecated": null,
        "shortDoc": "Fires when a dragend event occurs on a series item. ...",
        "name": "itemdragend",
        "tagname": "event",
        "filename": "/Users/jamieavins/git/SDK/charts/src/chart/Chart.js"
      },
      {
        "alias": null,
        "doc": "<p>Fires when a dragstart event occurs on a series item.</p>\n",
        "params": [
          {
            "doc": "\n",
            "type": "Ext.chart.series.Series",
            "name": "series",
            "optional": false
          },
          {
            "doc": "\n",
            "type": "Object",
            "name": "item",
            "optional": false
          },
          {
            "doc": "\n",
            "type": "Event",
            "name": "event",
            "optional": false
          }
        ],
        "owner": "Ext.chart.Chart",
        "html_filename": "Chart.html",
        "inheritable": false,
        "href": "Chart.html#Ext-chart-Chart-event-itemdragstart",
        "linenr": 397,
        "protected": false,
        "static": false,
        "private": false,
        "deprecated": null,
        "shortDoc": "Fires when a dragstart event occurs on a series item. ...",
        "name": "itemdragstart",
        "tagname": "event",
        "filename": "/Users/jamieavins/git/SDK/charts/src/chart/Chart.js"
      },
      {
        "alias": null,
        "doc": "<p>Fires when a mousedown event occurs on a series item.</p>\n",
        "params": [
          {
            "doc": "\n",
            "type": "Ext.chart.series.Series",
            "name": "series",
            "optional": false
          },
          {
            "doc": "\n",
            "type": "Object",
            "name": "item",
            "optional": false
          },
          {
            "doc": "\n",
            "type": "Event",
            "name": "event",
            "optional": false
          }
        ],
        "owner": "Ext.chart.Chart",
        "html_filename": "Chart.html",
        "inheritable": false,
        "href": "Chart.html#Ext-chart-Chart-event-itemmousedown",
        "linenr": 292,
        "protected": false,
        "static": false,
        "private": false,
        "deprecated": null,
        "shortDoc": "Fires when a mousedown event occurs on a series item. ...",
        "name": "itemmousedown",
        "tagname": "event",
        "filename": "/Users/jamieavins/git/SDK/charts/src/chart/Chart.js"
      },
      {
        "alias": null,
        "doc": "<p>Fires when the mouse is moved on a series item.</p>\n",
        "params": [
          {
            "doc": "\n",
            "type": "Ext.chart.series.Series",
            "name": "series",
            "optional": false
          },
          {
            "doc": "\n",
            "type": "Object",
            "name": "item",
            "optional": false
          },
          {
            "doc": "\n",
            "type": "Event",
            "name": "event",
            "optional": false
          }
        ],
        "owner": "Ext.chart.Chart",
        "html_filename": "Chart.html",
        "inheritable": false,
        "href": "Chart.html#Ext-chart-Chart-event-itemmousemove",
        "linenr": 278,
        "protected": false,
        "static": false,
        "private": false,
        "deprecated": null,
        "shortDoc": "Fires when the mouse is moved on a series item. ...",
        "name": "itemmousemove",
        "tagname": "event",
        "filename": "/Users/jamieavins/git/SDK/charts/src/chart/Chart.js"
      },
      {
        "alias": null,
        "doc": "<p>Fires when the mouse exits a series item.</p>\n",
        "params": [
          {
            "doc": "\n",
            "type": "Ext.chart.series.Series",
            "name": "series",
            "optional": false
          },
          {
            "doc": "\n",
            "type": "Object",
            "name": "item",
            "optional": false
          },
          {
            "doc": "\n",
            "type": "Event",
            "name": "event",
            "optional": false
          }
        ],
        "owner": "Ext.chart.Chart",
        "html_filename": "Chart.html",
        "inheritable": false,
        "href": "Chart.html#Ext-chart-Chart-event-itemmouseout",
        "linenr": 306,
        "protected": false,
        "static": false,
        "private": false,
        "deprecated": null,
        "shortDoc": "Fires when the mouse exits a series item. ...",
        "name": "itemmouseout",
        "tagname": "event",
        "filename": "/Users/jamieavins/git/SDK/charts/src/chart/Chart.js"
      },
      {
        "alias": null,
        "doc": "<p>Fires when the mouse enters a series item.</p>\n",
        "params": [
          {
            "doc": "\n",
            "type": "Ext.chart.series.Series",
            "name": "series",
            "optional": false
          },
          {
            "doc": "\n",
            "type": "Object",
            "name": "item",
            "optional": false
          },
          {
            "doc": "\n",
            "type": "Event",
            "name": "event",
            "optional": false
          }
        ],
        "owner": "Ext.chart.Chart",
        "html_filename": "Chart.html",
        "inheritable": false,
        "href": "Chart.html#Ext-chart-Chart-event-itemmouseover",
        "linenr": 299,
        "protected": false,
        "static": false,
        "private": false,
        "deprecated": null,
        "shortDoc": "Fires when the mouse enters a series item. ...",
        "name": "itemmouseover",
        "tagname": "event",
        "filename": "/Users/jamieavins/git/SDK/charts/src/chart/Chart.js"
      },
      {
        "alias": null,
        "doc": "<p>Fires when a mouseup event occurs on a series item.</p>\n",
        "params": [
          {
            "doc": "\n",
            "type": "Ext.chart.series.Series",
            "name": "series",
            "optional": false
          },
          {
            "doc": "\n",
            "type": "Object",
            "name": "item",
            "optional": false
          },
          {
            "doc": "\n",
            "type": "Event",
            "name": "event",
            "optional": false
          }
        ],
        "owner": "Ext.chart.Chart",
        "html_filename": "Chart.html",
        "inheritable": false,
        "href": "Chart.html#Ext-chart-Chart-event-itemmouseup",
        "linenr": 285,
        "protected": false,
        "static": false,
        "private": false,
        "deprecated": null,
        "shortDoc": "Fires when a mouseup event occurs on a series item. ...",
        "name": "itemmouseup",
        "tagname": "event",
        "filename": "/Users/jamieavins/git/SDK/charts/src/chart/Chart.js"
      },
      {
        "alias": null,
        "doc": "<p>Fires when a pinch event occurs on a series item.</p>\n",
        "params": [
          {
            "doc": "\n",
            "type": "Ext.chart.series.Series",
            "name": "series",
            "optional": false
          },
          {
            "doc": "\n",
            "type": "Object",
            "name": "item",
            "optional": false
          },
          {
            "doc": "\n",
            "type": "Event",
            "name": "event",
            "optional": false
          }
        ],
        "owner": "Ext.chart.Chart",
        "html_filename": "Chart.html",
        "inheritable": false,
        "href": "Chart.html#Ext-chart-Chart-event-itempinch",
        "linenr": 425,
        "protected": false,
        "static": false,
        "private": false,
        "deprecated": null,
        "shortDoc": "Fires when a pinch event occurs on a series item. ...",
        "name": "itempinch",
        "tagname": "event",
        "filename": "/Users/jamieavins/git/SDK/charts/src/chart/Chart.js"
      },
      {
        "alias": null,
        "doc": "<p>Fires when a pinchend event occurs on a series item.</p>\n",
        "params": [
          {
            "doc": "\n",
            "type": "Ext.chart.series.Series",
            "name": "series",
            "optional": false
          },
          {
            "doc": "\n",
            "type": "Object",
            "name": "item",
            "optional": false
          },
          {
            "doc": "\n",
            "type": "Event",
            "name": "event",
            "optional": false
          }
        ],
        "owner": "Ext.chart.Chart",
        "html_filename": "Chart.html",
        "inheritable": false,
        "href": "Chart.html#Ext-chart-Chart-event-itempinchend",
        "linenr": 432,
        "protected": false,
        "static": false,
        "private": false,
        "deprecated": null,
        "shortDoc": "Fires when a pinchend event occurs on a series item. ...",
        "name": "itempinchend",
        "tagname": "event",
        "filename": "/Users/jamieavins/git/SDK/charts/src/chart/Chart.js"
      },
      {
        "alias": null,
        "doc": "<p>Fires when a pinchstart event occurs on a series item.</p>\n",
        "params": [
          {
            "doc": "\n",
            "type": "Ext.chart.series.Series",
            "name": "series",
            "optional": false
          },
          {
            "doc": "\n",
            "type": "Object",
            "name": "item",
            "optional": false
          },
          {
            "doc": "\n",
            "type": "Event",
            "name": "event",
            "optional": false
          }
        ],
        "owner": "Ext.chart.Chart",
        "html_filename": "Chart.html",
        "inheritable": false,
        "href": "Chart.html#Ext-chart-Chart-event-itempinchstart",
        "linenr": 418,
        "protected": false,
        "static": false,
        "private": false,
        "deprecated": null,
        "shortDoc": "Fires when a pinchstart event occurs on a series item. ...",
        "name": "itempinchstart",
        "tagname": "event",
        "filename": "/Users/jamieavins/git/SDK/charts/src/chart/Chart.js"
      },
      {
        "alias": null,
        "doc": "<p>Fires when a singletap event occurs on a series item.</p>\n",
        "params": [
          {
            "doc": "\n",
            "type": "Ext.chart.series.Series",
            "name": "series",
            "optional": false
          },
          {
            "doc": "\n",
            "type": "Object",
            "name": "item",
            "optional": false
          },
          {
            "doc": "\n",
            "type": "Event",
            "name": "event",
            "optional": false
          }
        ],
        "owner": "Ext.chart.Chart",
        "html_filename": "Chart.html",
        "inheritable": false,
        "href": "Chart.html#Ext-chart-Chart-event-itemsingletap",
        "linenr": 369,
        "protected": false,
        "static": false,
        "private": false,
        "deprecated": null,
        "shortDoc": "Fires when a singletap event occurs on a series item. ...",
        "name": "itemsingletap",
        "tagname": "event",
        "filename": "/Users/jamieavins/git/SDK/charts/src/chart/Chart.js"
      },
      {
        "alias": null,
        "doc": "<p>Fires when a swipe event occurs on a series item.</p>\n",
        "params": [
          {
            "doc": "\n",
            "type": "Ext.chart.series.Series",
            "name": "series",
            "optional": false
          },
          {
            "doc": "\n",
            "type": "Object",
            "name": "item",
            "optional": false
          },
          {
            "doc": "\n",
            "type": "Event",
            "name": "event",
            "optional": false
          }
        ],
        "owner": "Ext.chart.Chart",
        "html_filename": "Chart.html",
        "inheritable": false,
        "href": "Chart.html#Ext-chart-Chart-event-itemswipe",
        "linenr": 439,
        "protected": false,
        "static": false,
        "private": false,
        "deprecated": null,
        "shortDoc": "Fires when a swipe event occurs on a series item. ...",
        "name": "itemswipe",
        "tagname": "event",
        "filename": "/Users/jamieavins/git/SDK/charts/src/chart/Chart.js"
      },
      {
        "alias": null,
        "doc": "<p>Fires when a tap event occurs on a series item.</p>\n",
        "params": [
          {
            "doc": "\n",
            "type": "Ext.chart.series.Series",
            "name": "series",
            "optional": false
          },
          {
            "doc": "\n",
            "type": "Object",
            "name": "item",
            "optional": false
          },
          {
            "doc": "\n",
            "type": "Event",
            "name": "event",
            "optional": false
          }
        ],
        "owner": "Ext.chart.Chart",
        "html_filename": "Chart.html",
        "inheritable": false,
        "href": "Chart.html#Ext-chart-Chart-event-itemtap",
        "linenr": 327,
        "protected": false,
        "static": false,
        "private": false,
        "deprecated": null,
        "shortDoc": "Fires when a tap event occurs on a series item. ...",
        "name": "itemtap",
        "tagname": "event",
        "filename": "/Users/jamieavins/git/SDK/charts/src/chart/Chart.js"
      },
      {
        "alias": null,
        "doc": "<p>Fires when a tapcancel event occurs on a series item.</p>\n",
        "params": [
          {
            "doc": "\n",
            "type": "Ext.chart.series.Series",
            "name": "series",
            "optional": false
          },
          {
            "doc": "\n",
            "type": "Object",
            "name": "item",
            "optional": false
          },
          {
            "doc": "\n",
            "type": "Event",
            "name": "event",
            "optional": false
          }
        ],
        "owner": "Ext.chart.Chart",
        "html_filename": "Chart.html",
        "inheritable": false,
        "href": "Chart.html#Ext-chart-Chart-event-itemtapcancel",
        "linenr": 348,
        "protected": false,
        "static": false,
        "private": false,
        "deprecated": null,
        "shortDoc": "Fires when a tapcancel event occurs on a series item. ...",
        "name": "itemtapcancel",
        "tagname": "event",
        "filename": "/Users/jamieavins/git/SDK/charts/src/chart/Chart.js"
      },
      {
        "alias": null,
        "doc": "<p>Fires when a tapend event occurs on a series item.</p>\n",
        "params": [
          {
            "doc": "\n",
            "type": "Ext.chart.series.Series",
            "name": "series",
            "optional": false
          },
          {
            "doc": "\n",
            "type": "Object",
            "name": "item",
            "optional": false
          },
          {
            "doc": "\n",
            "type": "Event",
            "name": "event",
            "optional": false
          }
        ],
        "owner": "Ext.chart.Chart",
        "html_filename": "Chart.html",
        "inheritable": false,
        "href": "Chart.html#Ext-chart-Chart-event-itemtapend",
        "linenr": 341,
        "protected": false,
        "static": false,
        "private": false,
        "deprecated": null,
        "shortDoc": "Fires when a tapend event occurs on a series item. ...",
        "name": "itemtapend",
        "tagname": "event",
        "filename": "/Users/jamieavins/git/SDK/charts/src/chart/Chart.js"
      },
      {
        "alias": null,
        "doc": "<p>Fires when a taphold event occurs on a series item.</p>\n",
        "params": [
          {
            "doc": "\n",
            "type": "Ext.chart.series.Series",
            "name": "series",
            "optional": false
          },
          {
            "doc": "\n",
            "type": "Object",
            "name": "item",
            "optional": false
          },
          {
            "doc": "\n",
            "type": "Event",
            "name": "event",
            "optional": false
          }
        ],
        "owner": "Ext.chart.Chart",
        "html_filename": "Chart.html",
        "inheritable": false,
        "href": "Chart.html#Ext-chart-Chart-event-itemtaphold",
        "linenr": 355,
        "protected": false,
        "static": false,
        "private": false,
        "deprecated": null,
        "shortDoc": "Fires when a taphold event occurs on a series item. ...",
        "name": "itemtaphold",
        "tagname": "event",
        "filename": "/Users/jamieavins/git/SDK/charts/src/chart/Chart.js"
      },
      {
        "alias": null,
        "doc": "<p>Fires when a tapstart event occurs on a series item.</p>\n",
        "params": [
          {
            "doc": "\n",
            "type": "Ext.chart.series.Series",
            "name": "series",
            "optional": false
          },
          {
            "doc": "\n",
            "type": "Object",
            "name": "item",
            "optional": false
          },
          {
            "doc": "\n",
            "type": "Event",
            "name": "event",
            "optional": false
          }
        ],
        "owner": "Ext.chart.Chart",
        "html_filename": "Chart.html",
        "inheritable": false,
        "href": "Chart.html#Ext-chart-Chart-event-itemtapstart",
        "linenr": 334,
        "protected": false,
        "static": false,
        "private": false,
        "deprecated": null,
        "shortDoc": "Fires when a tapstart event occurs on a series item. ...",
        "name": "itemtapstart",
        "tagname": "event",
        "filename": "/Users/jamieavins/git/SDK/charts/src/chart/Chart.js"
      },
      {
        "alias": null,
        "doc": "<p>Fires when a touchend event occurs on a series item.</p>\n",
        "params": [
          {
            "doc": "\n",
            "type": "Ext.chart.series.Series",
            "name": "series",
            "optional": false
          },
          {
            "doc": "\n",
            "type": "Object",
            "name": "item",
            "optional": false
          },
          {
            "doc": "\n",
            "type": "Event",
            "name": "event",
            "optional": false
          }
        ],
        "owner": "Ext.chart.Chart",
        "html_filename": "Chart.html",
        "inheritable": false,
        "href": "Chart.html#Ext-chart-Chart-event-itemtouchend",
        "linenr": 390,
        "protected": false,
        "static": false,
        "private": false,
        "deprecated": null,
        "shortDoc": "Fires when a touchend event occurs on a series item. ...",
        "name": "itemtouchend",
        "tagname": "event",
        "filename": "/Users/jamieavins/git/SDK/charts/src/chart/Chart.js"
      },
      {
        "alias": null,
        "doc": "<p>Fires when a touchmove event occurs on a series item.</p>\n",
        "params": [
          {
            "doc": "\n",
            "type": "Ext.chart.series.Series",
            "name": "series",
            "optional": false
          },
          {
            "doc": "\n",
            "type": "Object",
            "name": "item",
            "optional": false
          },
          {
            "doc": "\n",
            "type": "Event",
            "name": "event",
            "optional": false
          }
        ],
        "owner": "Ext.chart.Chart",
        "html_filename": "Chart.html",
        "inheritable": false,
        "href": "Chart.html#Ext-chart-Chart-event-itemtouchmove",
        "linenr": 383,
        "protected": false,
        "static": false,
        "private": false,
        "deprecated": null,
        "shortDoc": "Fires when a touchmove event occurs on a series item. ...",
        "name": "itemtouchmove",
        "tagname": "event",
        "filename": "/Users/jamieavins/git/SDK/charts/src/chart/Chart.js"
      },
      {
        "alias": null,
        "doc": "<p>Fires when a touchstart event occurs on a series item.</p>\n",
        "params": [
          {
            "doc": "\n",
            "type": "Ext.chart.series.Series",
            "name": "series",
            "optional": false
          },
          {
            "doc": "\n",
            "type": "Object",
            "name": "item",
            "optional": false
          },
          {
            "doc": "\n",
            "type": "Event",
            "name": "event",
            "optional": false
          }
        ],
        "owner": "Ext.chart.Chart",
        "html_filename": "Chart.html",
        "inheritable": false,
        "href": "Chart.html#Ext-chart-Chart-event-itemtouchstart",
        "linenr": 376,
        "protected": false,
        "static": false,
        "private": false,
        "deprecated": null,
        "shortDoc": "Fires when a touchstart event occurs on a series item. ...",
        "name": "itemtouchstart",
        "tagname": "event",
        "filename": "/Users/jamieavins/git/SDK/charts/src/chart/Chart.js"
      },
      {
        "alias": null,
        "doc": "<p>Fires after the chart is redrawn</p>\n",
        "params": [
          {
            "doc": "\n",
            "type": "Ext.chart.Chart",
            "name": "this",
            "optional": false
          }
        ],
        "owner": "Ext.chart.Chart",
        "html_filename": "Chart.html",
        "inheritable": false,
        "href": "Chart.html#Ext-chart-Chart-event-redraw",
        "linenr": 271,
        "protected": false,
        "static": false,
        "private": false,
        "deprecated": null,
        "shortDoc": "Fires after the chart is redrawn ...",
        "name": "redraw",
        "tagname": "event",
        "filename": "/Users/jamieavins/git/SDK/charts/src/chart/Chart.js"
      },
      {
        "alias": null,
        "doc": "<p>Fires after the chart data has been refreshed.</p>\n",
        "params": [
          {
            "doc": "\n",
            "type": "Ext.chart.Chart",
            "name": "this",
            "optional": false
          }
        ],
        "owner": "Ext.chart.Chart",
        "html_filename": "Chart.html",
        "inheritable": false,
        "href": "Chart.html#Ext-chart-Chart-event-refresh",
        "linenr": 265,
        "protected": false,
        "static": false,
        "private": false,
        "deprecated": null,
        "shortDoc": "Fires after the chart data has been refreshed. ...",
        "name": "refresh",
        "tagname": "event",
        "filename": "/Users/jamieavins/git/SDK/charts/src/chart/Chart.js"
      }
    ]
  },
  "xtypes": [
    "chart"
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
  "name": "Ext.chart.Chart",
  "component": false,
  "tagname": "class",
  "singleton": false,
  "filename": "/Users/jamieavins/git/SDK/charts/src/chart/Chart.js"
});