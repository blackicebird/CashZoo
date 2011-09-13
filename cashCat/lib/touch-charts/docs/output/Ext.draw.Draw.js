Ext.data.JsonP.Ext_draw_Draw({
  "mixedInto": [

  ],
  "alias": null,
  "doc": "<p>Base Drawing class.  Provides base drawing functions.</p>\n",
  "allMixins": [

  ],
  "mixins": [

  ],
  "html_filename": "Draw.html",
  "inheritable": false,
  "author": null,
  "code_type": "assignment",
  "href": "Draw.html#Ext-draw-Draw",
  "subclasses": [

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

    ],
    "css_var": [

    ],
    "css_mixin": [

    ],
    "method": [
      {
        "alias": null,
        "doc": "<p>snapEnds is a utility function that gives you axis ticks information based on start, end\nand preferred number of steps. It happens quite often that you have just a dataset and need to\nbuild an axis. If you simply take min and max and divide delta to number of steps you could get\nvery ugly numbers. Lets say you have min = 0.532 and max = 0.823 and you want to draw axis\nacross 20 steps. Simple calculation like (max - min) / steps will give us: 0.014549(9), so\nyour axis will look like this:</p>\n\n<pre><code>0.532, 0.5465499, 0.5610998, 0.5756497, etc\n</code></pre>\n\n<p>Not pretty at all. snapEnds will give different set of numbers for the same values:</p>\n\n<pre><code>0.5, 0.52, 0.54, 0.56, 0.58, 0.6, 0.62, ... 0.8, 0.82, 0.84\n</code></pre>\n\n<p>It starts a bit earlier and ends a bit later and trying to find a step which will look nice.</p>\n",
        "params": [
          {
            "doc": "<p>The minimum value in the data</p>\n",
            "type": "Number",
            "name": "from",
            "optional": false
          },
          {
            "doc": "<p>The maximum value in the data</p>\n",
            "type": "Number",
            "name": "to",
            "optional": false
          },
          {
            "doc": "<p>The maximum number of ticks</p>\n",
            "type": "Number",
            "name": "stepsMax",
            "optional": false
          },
          {
            "doc": "<p>If true, the 'from' and 'to' parameters will be used as fixed end values</p>\n\n<pre><code>   and will not be adjusted\n</code></pre>\n",
            "type": "Number",
            "name": "endsLocked",
            "optional": false
          }
        ],
        "owner": "Ext.draw.Draw",
        "html_filename": "Draw.html",
        "inheritable": false,
        "href": "Draw.html#Ext-draw-Draw-method-snapEnds",
        "linenr": 758,
        "protected": false,
        "static": false,
        "private": false,
        "deprecated": null,
        "shortDoc": "snapEnds is a utility function that gives you axis ticks information based on start, end\nand preferred number of steps. ...",
        "name": "snapEnds",
        "tagname": "method",
        "filename": "/Users/jamieavins/git/SDK/charts/src/draw/Draw.js",
        "return": {
          "doc": "<p>The calculated step and ends info; properties are:</p>\n\n<pre><code>- from: The result start value, which may be lower than the original start value\n- to: The result end value, which may be higher than the original end value\n- power: The power of 10 used in the step calculation\n- step: The value size of each step\n- steps: The number of steps. NOTE: the steps may not divide the from/to range perfectly evenly;\n         there may be a smaller distance between the last step and the end value than between prior\n         steps, particularly when the `endsLocked` param is true. Therefore it is best to not use\n         the `steps` result when finding the axis tick points, instead use the `step`, `to`, and\n         `from` to find the correct point for each tick.\n</code></pre>\n",
          "type": "Object"
        }
      }
    ],
    "cfg": [

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
  "name": "Ext.draw.Draw",
  "component": false,
  "tagname": "class",
  "singleton": false,
  "filename": "/Users/jamieavins/git/SDK/charts/src/draw/Draw.js"
});