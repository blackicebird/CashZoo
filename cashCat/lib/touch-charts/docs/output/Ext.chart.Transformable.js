Ext.data.JsonP.Ext_chart_Transformable({
  "mixedInto": [

  ],
  "alias": null,
  "doc": "<p>Transformable is a mixin for chart items (axes, series, etc.) which makes them capable\nof having their surfaces panned and zoomed via transformations.</p>\n\n<p>There are two modes of transformation that this mixin supports:</p>\n\n<ul>\n<li><strong>Persistent transform</strong> - This is a logical transformation, saved to the item as properties\n<a href=\"#/api/Ext.chart.Transformable-property-panX\" rel=\"Ext.chart.Transformable-property-panX\" class=\"docClass\">panX</a>, <a href=\"#/api/Ext.chart.Transformable-property-panY\" rel=\"Ext.chart.Transformable-property-panY\" class=\"docClass\">panY</a>, <a href=\"#/api/Ext.chart.Transformable-property-zoomX\" rel=\"Ext.chart.Transformable-property-zoomX\" class=\"docClass\">zoomX</a>, and <a href=\"#/api/Ext.chart.Transformable-property-zoomY\" rel=\"Ext.chart.Transformable-property-zoomY\" class=\"docClass\">zoomY</a>. The item's drawing logic must\nhonor these properties and should be explicitly re-run after updating the persistent transform.</li>\n<li><strong>Fast transform</strong> - This is a pixel-wise transform applied (via CSS3) to the <a href=\"#/api/Ext.draw.Surface\" rel=\"Ext.draw.Surface\" class=\"docClass\">Ext.draw.Surface</a>\nelement itself. As this does not perform a redraw of the surface, vector shapes currently\nrendered to the surface will be deformed by this transform. This is meant to only be transient,\nand to have <a href=\"#/api/Ext.chart.Transformable-method-syncToFastTransform\" rel=\"Ext.chart.Transformable-method-syncToFastTransform\" class=\"docClass\">syncToFastTransform</a> called once the speed is no longer required to apply\nthe fast transform parameters into the persistent transform properties.</li>\n</ul>\n\n",
  "allMixins": [

  ],
  "mixins": [

  ],
  "html_filename": "Transformable.html",
  "inheritable": false,
  "author": null,
  "code_type": "assignment",
  "href": "Transformable.html#Ext-chart-Transformable",
  "subclasses": [

  ],
  "superclasses": [

  ],
  "linenr": 1,
  "alternateClassNames": [

  ],
  "protected": false,
  "static": false,
  "extends": "Object",
  "docauthor": null,
  "members": {
    "property": [
      {
        "alias": null,
        "type": "Number",
        "doc": "<p>The horizontal pan transformation offset for this chart item. Defaults to 0.</p>\n",
        "owner": "Ext.chart.Transformable",
        "html_filename": "Transformable.html",
        "inheritable": false,
        "href": "Transformable.html#Ext-chart-Transformable-property-panX",
        "linenr": 32,
        "protected": false,
        "static": false,
        "private": false,
        "deprecated": null,
        "shortDoc": "The horizontal pan transformation offset for this chart item. ...",
        "name": "panX",
        "tagname": "property",
        "filename": "/Users/jamieavins/git/SDK/charts/src/chart/Transformable.js"
      },
      {
        "alias": null,
        "type": "Number",
        "doc": "<p>The vertical pan transformation offset for this chart item. Defaults to 0.</p>\n",
        "owner": "Ext.chart.Transformable",
        "html_filename": "Transformable.html",
        "inheritable": false,
        "href": "Transformable.html#Ext-chart-Transformable-property-panY",
        "linenr": 38,
        "protected": false,
        "static": false,
        "private": false,
        "deprecated": null,
        "shortDoc": "The vertical pan transformation offset for this chart item. ...",
        "name": "panY",
        "tagname": "property",
        "filename": "/Users/jamieavins/git/SDK/charts/src/chart/Transformable.js"
      },
      {
        "alias": null,
        "type": "Number",
        "doc": "<p>The horizontal zoom transformation factor for this chart item. Defaults to 1.</p>\n",
        "owner": "Ext.chart.Transformable",
        "html_filename": "Transformable.html",
        "inheritable": false,
        "href": "Transformable.html#Ext-chart-Transformable-property-zoomX",
        "linenr": 20,
        "protected": false,
        "static": false,
        "private": false,
        "deprecated": null,
        "shortDoc": "The horizontal zoom transformation factor for this chart item. ...",
        "name": "zoomX",
        "tagname": "property",
        "filename": "/Users/jamieavins/git/SDK/charts/src/chart/Transformable.js"
      },
      {
        "alias": null,
        "type": "Number",
        "doc": "<p>The vertical zoom transformation factor for this chart item. Defaults to 1.</p>\n",
        "owner": "Ext.chart.Transformable",
        "html_filename": "Transformable.html",
        "inheritable": false,
        "href": "Transformable.html#Ext-chart-Transformable-property-zoomY",
        "linenr": 26,
        "protected": false,
        "static": false,
        "private": false,
        "deprecated": null,
        "shortDoc": "The vertical zoom transformation factor for this chart item. ...",
        "name": "zoomY",
        "tagname": "property",
        "filename": "/Users/jamieavins/git/SDK/charts/src/chart/Transformable.js"
      }
    ],
    "css_var": [

    ],
    "css_mixin": [

    ],
    "method": [
      {
        "alias": null,
        "doc": "<p>Clears all transforms from this chart item.</p>\n",
        "params": [

        ],
        "owner": "Ext.chart.Transformable",
        "html_filename": "Transformable.html",
        "inheritable": false,
        "href": "Transformable.html#Ext-chart-Transformable-method-clearTransform",
        "linenr": 195,
        "protected": false,
        "static": false,
        "private": false,
        "deprecated": null,
        "shortDoc": "Clears all transforms from this chart item. ...",
        "name": "clearTransform",
        "tagname": "method",
        "filename": "/Users/jamieavins/git/SDK/charts/src/chart/Transformable.js",
        "return": {
          "doc": "\n",
          "type": "undefined"
        }
      },
      {
        "alias": null,
        "doc": "<p>Returns a Ext.draw.Matrix representing the CSS3 fast transform currently applied to this\nchart item. If no fast transform is applied a Matrix in its default state will be returned. This\nmatrix does <em>not</em> include the persistent <a href=\"#/api/Ext.chart.Transformable-property-panX\" rel=\"Ext.chart.Transformable-property-panX\" class=\"docClass\">panX</a>/<a href=\"#/api/Ext.chart.Transformable-property-panY\" rel=\"Ext.chart.Transformable-property-panY\" class=\"docClass\">panY</a>/<a href=\"#/api/Ext.chart.Transformable-property-zoomX\" rel=\"Ext.chart.Transformable-property-zoomX\" class=\"docClass\">zoomX</a>/<a href=\"#/api/Ext.chart.Transformable-property-zoomY\" rel=\"Ext.chart.Transformable-property-zoomY\" class=\"docClass\">zoomY</a>\ntransformation properties.</p>\n",
        "params": [

        ],
        "owner": "Ext.chart.Transformable",
        "html_filename": "Transformable.html",
        "inheritable": false,
        "href": "Transformable.html#Ext-chart-Transformable-method-getFastTransformMatrix",
        "linenr": 138,
        "protected": false,
        "static": false,
        "private": false,
        "deprecated": null,
        "shortDoc": "Returns a Ext.draw.Matrix representing the CSS3 fast transform currently applied to this\nchart item. ...",
        "name": "getFastTransformMatrix",
        "tagname": "method",
        "filename": "/Users/jamieavins/git/SDK/charts/src/chart/Transformable.js",
        "return": {
          "doc": "\n",
          "type": "Ext.draw.Matrix"
        }
      },
      {
        "alias": null,
        "doc": "<p>Returns a Ext.draw.Matrix representing the total current transformation for this chart\nitem, including both the persistent <a href=\"#/api/Ext.chart.Transformable-property-panX\" rel=\"Ext.chart.Transformable-property-panX\" class=\"docClass\">panX</a>/<a href=\"#/api/Ext.chart.Transformable-property-panY\" rel=\"Ext.chart.Transformable-property-panY\" class=\"docClass\">panY</a>/<a href=\"#/api/Ext.chart.Transformable-property-zoomX\" rel=\"Ext.chart.Transformable-property-zoomX\" class=\"docClass\">zoomX</a>/<a href=\"#/api/Ext.chart.Transformable-property-zoomY\" rel=\"Ext.chart.Transformable-property-zoomY\" class=\"docClass\">zoomY</a>\nand any additional CSS3 fast transform that is currently applied.</p>\n",
        "params": [

        ],
        "owner": "Ext.chart.Transformable",
        "html_filename": "Transformable.html",
        "inheritable": false,
        "href": "Transformable.html#Ext-chart-Transformable-method-getTransformMatrix",
        "linenr": 127,
        "protected": false,
        "static": false,
        "private": false,
        "deprecated": null,
        "shortDoc": "Returns a Ext.draw.Matrix representing the total current transformation for this chart\nitem, including both the persi...",
        "name": "getTransformMatrix",
        "tagname": "method",
        "filename": "/Users/jamieavins/git/SDK/charts/src/chart/Transformable.js",
        "return": {
          "doc": "\n",
          "type": "Ext.draw.Matrix"
        }
      },
      {
        "alias": null,
        "doc": "<p>Return a list of the <a href=\"#/api/Ext.draw.Surface\" rel=\"Ext.draw.Surface\" class=\"docClass\">surfaces</a> that should be kept in sync\nwith this chart item's transformations.</p>\n",
        "params": [

        ],
        "owner": "Ext.chart.Transformable",
        "html_filename": "Transformable.html",
        "inheritable": false,
        "href": "Transformable.html#Ext-chart-Transformable-method-getTransformableSurfaces",
        "linenr": 216,
        "protected": false,
        "static": false,
        "private": false,
        "deprecated": null,
        "shortDoc": "Return a list of the surfaces that should be kept in sync\nwith this chart item's transformations. ...",
        "name": "getTransformableSurfaces",
        "tagname": "method",
        "filename": "/Users/jamieavins/git/SDK/charts/src/chart/Transformable.js",
        "return": {
          "doc": "\n",
          "type": "undefined"
        }
      },
      {
        "alias": null,
        "doc": "<p>Returns <code>true</code> if this chart item currently has a CSS3 fast transform applied, <code>false</code> if not.</p>\n",
        "params": [

        ],
        "owner": "Ext.chart.Transformable",
        "html_filename": "Transformable.html",
        "inheritable": false,
        "href": "Transformable.html#Ext-chart-Transformable-method-hasFastTransform",
        "linenr": 186,
        "protected": false,
        "static": false,
        "private": false,
        "deprecated": null,
        "shortDoc": "Returns true if this chart item currently has a CSS3 fast transform applied, false if not. ...",
        "name": "hasFastTransform",
        "tagname": "method",
        "filename": "/Users/jamieavins/git/SDK/charts/src/chart/Transformable.js",
        "return": {
          "doc": "\n",
          "type": "Boolean"
        }
      },
      {
        "alias": null,
        "doc": "<p>Directly sets the persistent pan/zoom transform properties for this chart item. Removes any\nactive fast transform and updates the <a href=\"#/api/Ext.chart.Transformable-property-panX\" rel=\"Ext.chart.Transformable-property-panX\" class=\"docClass\">panX</a>, <a href=\"#/api/Ext.chart.Transformable-property-panY\" rel=\"Ext.chart.Transformable-property-panY\" class=\"docClass\">panY</a>, <a href=\"#/api/Ext.chart.Transformable-property-zoomX\" rel=\"Ext.chart.Transformable-property-zoomX\" class=\"docClass\">zoomX</a>, and\n<a href=\"#/api/Ext.chart.Transformable-property-zoomY\" rel=\"Ext.chart.Transformable-property-zoomY\" class=\"docClass\">zoomY</a> properties to match the supplied arguments.</p>\n",
        "params": [
          {
            "doc": "\n",
            "type": "Number",
            "name": "panX",
            "optional": false
          },
          {
            "doc": "\n",
            "type": "Number",
            "name": "panY",
            "optional": false
          },
          {
            "doc": "\n",
            "type": "Number",
            "name": "zoomX",
            "optional": false
          },
          {
            "doc": "\n",
            "type": "Number",
            "name": "zoomY",
            "optional": false
          }
        ],
        "owner": "Ext.chart.Transformable",
        "html_filename": "Transformable.html",
        "inheritable": false,
        "href": "Transformable.html#Ext-chart-Transformable-method-setTransform",
        "linenr": 57,
        "protected": false,
        "static": false,
        "private": false,
        "deprecated": null,
        "shortDoc": "Directly sets the persistent pan/zoom transform properties for this chart item. ...",
        "name": "setTransform",
        "tagname": "method",
        "filename": "/Users/jamieavins/git/SDK/charts/src/chart/Transformable.js",
        "return": {
          "doc": "\n",
          "type": "undefined"
        }
      },
      {
        "alias": null,
        "doc": "<p>Sets the pan/zoom transformation for this chart item, using CSS3 for fast hardware-accelerated\ntransformation. The existing persistent <a href=\"#/api/Ext.chart.Transformable-property-panX\" rel=\"Ext.chart.Transformable-property-panX\" class=\"docClass\">panX</a>, <a href=\"#/api/Ext.chart.Transformable-property-panY\" rel=\"Ext.chart.Transformable-property-panY\" class=\"docClass\">panY</a>, <a href=\"#/api/Ext.chart.Transformable-property-zoomX\" rel=\"Ext.chart.Transformable-property-zoomX\" class=\"docClass\">zoomX</a>, and\n<a href=\"#/api/Ext.chart.Transformable-property-zoomY\" rel=\"Ext.chart.Transformable-property-zoomY\" class=\"docClass\">zoomY</a> properties will be left alone and the remaining transform required to reach\nthe supplied arguments will be applied using a CSS3 transform.</p>\n",
        "params": [
          {
            "doc": "\n",
            "type": "Number",
            "name": "panX",
            "optional": false
          },
          {
            "doc": "\n",
            "type": "Number",
            "name": "panY",
            "optional": false
          },
          {
            "doc": "\n",
            "type": "Number",
            "name": "zoomX",
            "optional": false
          },
          {
            "doc": "\n",
            "type": "Number",
            "name": "zoomY",
            "optional": false
          }
        ],
        "owner": "Ext.chart.Transformable",
        "html_filename": "Transformable.html",
        "inheritable": false,
        "href": "Transformable.html#Ext-chart-Transformable-method-setTransformFast",
        "linenr": 93,
        "protected": false,
        "static": false,
        "private": false,
        "deprecated": null,
        "shortDoc": "Sets the pan/zoom transformation for this chart item, using CSS3 for fast hardware-accelerated\ntransformation. ...",
        "name": "setTransformFast",
        "tagname": "method",
        "filename": "/Users/jamieavins/git/SDK/charts/src/chart/Transformable.js",
        "return": {
          "doc": "\n",
          "type": "undefined"
        }
      },
      {
        "alias": null,
        "doc": "<p>Sets the pan/zoom transformation for this chart item, using CSS3 for fast hardware-accelerated\ntransformation. The existing persistent <a href=\"#/api/Ext.chart.Transformable-property-panX\" rel=\"Ext.chart.Transformable-property-panX\" class=\"docClass\">panX</a>, <a href=\"#/api/Ext.chart.Transformable-property-panY\" rel=\"Ext.chart.Transformable-property-panY\" class=\"docClass\">panY</a>, <a href=\"#/api/Ext.chart.Transformable-property-zoomX\" rel=\"Ext.chart.Transformable-property-zoomX\" class=\"docClass\">zoomX</a>, and\n<a href=\"#/api/Ext.chart.Transformable-property-zoomY\" rel=\"Ext.chart.Transformable-property-zoomY\" class=\"docClass\">zoomY</a> properties will be left alone and the remaining transform required to reach\nthe supplied matrix argument will be applied using a CSS3 transform.</p>\n",
        "params": [
          {
            "doc": "\n",
            "type": "Ext.draw.Matrix",
            "name": "matrix",
            "optional": false
          }
        ],
        "owner": "Ext.chart.Transformable",
        "html_filename": "Transformable.html",
        "inheritable": false,
        "href": "Transformable.html#Ext-chart-Transformable-method-setTransformMatrixFast",
        "linenr": 149,
        "protected": false,
        "static": false,
        "private": false,
        "deprecated": null,
        "shortDoc": "Sets the pan/zoom transformation for this chart item, using CSS3 for fast hardware-accelerated\ntransformation. ...",
        "name": "setTransformMatrixFast",
        "tagname": "method",
        "filename": "/Users/jamieavins/git/SDK/charts/src/chart/Transformable.js",
        "return": {
          "doc": "\n",
          "type": "undefined"
        }
      },
      {
        "alias": null,
        "doc": "<p>If this chart item has a CSS3 fast transform applied, this method will apply that transform\nto the persistent <a href=\"#/api/Ext.chart.Transformable-property-panX\" rel=\"Ext.chart.Transformable-property-panX\" class=\"docClass\">panX</a>/<a href=\"#/api/Ext.chart.Transformable-property-panY\" rel=\"Ext.chart.Transformable-property-panY\" class=\"docClass\">panY</a>/<a href=\"#/api/Ext.chart.Transformable-property-zoomX\" rel=\"Ext.chart.Transformable-property-zoomX\" class=\"docClass\">zoomX</a>/<a href=\"#/api/Ext.chart.Transformable-property-zoomY\" rel=\"Ext.chart.Transformable-property-zoomY\" class=\"docClass\">zoomY</a> transform properties\nand remove the fast transform.</p>\n",
        "params": [

        ],
        "owner": "Ext.chart.Transformable",
        "html_filename": "Transformable.html",
        "inheritable": false,
        "href": "Transformable.html#Ext-chart-Transformable-method-syncToFastTransform",
        "linenr": 202,
        "protected": false,
        "static": false,
        "private": false,
        "deprecated": null,
        "shortDoc": "If this chart item has a CSS3 fast transform applied, this method will apply that transform\nto the persistent panX/pa...",
        "name": "syncToFastTransform",
        "tagname": "method",
        "filename": "/Users/jamieavins/git/SDK/charts/src/chart/Transformable.js",
        "return": {
          "doc": "\n",
          "type": "undefined"
        }
      },
      {
        "alias": null,
        "doc": "<p>Adjusts the persistent pan/zoom transform properties for this chart item. Removes any\nactive fast transform and adjusts the existing <a href=\"#/api/Ext.chart.Transformable-property-panX\" rel=\"Ext.chart.Transformable-property-panX\" class=\"docClass\">panX</a>, <a href=\"#/api/Ext.chart.Transformable-property-panY\" rel=\"Ext.chart.Transformable-property-panY\" class=\"docClass\">panY</a>, <a href=\"#/api/Ext.chart.Transformable-property-zoomX\" rel=\"Ext.chart.Transformable-property-zoomX\" class=\"docClass\">zoomX</a>, and\n<a href=\"#/api/Ext.chart.Transformable-property-zoomY\" rel=\"Ext.chart.Transformable-property-zoomY\" class=\"docClass\">zoomY</a> properties by the supplied arguments.</p>\n",
        "params": [
          {
            "doc": "\n",
            "type": "Number",
            "name": "panX",
            "optional": false
          },
          {
            "doc": "\n",
            "type": "Number",
            "name": "panY",
            "optional": false
          },
          {
            "doc": "\n",
            "type": "Number",
            "name": "zoomX",
            "optional": false
          },
          {
            "doc": "\n",
            "type": "Number",
            "name": "zoomY",
            "optional": false
          }
        ],
        "owner": "Ext.chart.Transformable",
        "html_filename": "Transformable.html",
        "inheritable": false,
        "href": "Transformable.html#Ext-chart-Transformable-method-transformBy",
        "linenr": 79,
        "protected": false,
        "static": false,
        "private": false,
        "deprecated": null,
        "shortDoc": "Adjusts the persistent pan/zoom transform properties for this chart item. ...",
        "name": "transformBy",
        "tagname": "method",
        "filename": "/Users/jamieavins/git/SDK/charts/src/chart/Transformable.js",
        "return": {
          "doc": "\n",
          "type": "undefined"
        }
      },
      {
        "alias": null,
        "doc": "<p>Adjusts the pan/zoom transformation for this chart item, using CSS3 for fast hardware-accelerated\ntransformation. The existing persistent <a href=\"#/api/Ext.chart.Transformable-property-panX\" rel=\"Ext.chart.Transformable-property-panX\" class=\"docClass\">panX</a>/<a href=\"#/api/Ext.chart.Transformable-property-panY\" rel=\"Ext.chart.Transformable-property-panY\" class=\"docClass\">panY</a>/<a href=\"#/api/Ext.chart.Transformable-property-zoomX\" rel=\"Ext.chart.Transformable-property-zoomX\" class=\"docClass\">zoomX</a>/<a href=\"#/api/Ext.chart.Transformable-property-zoomY\" rel=\"Ext.chart.Transformable-property-zoomY\" class=\"docClass\">zoomY</a>\nproperties will be left alone and the supplied arguments will be added to the existing transform\nusing CSS3.</p>\n",
        "params": [
          {
            "doc": "\n",
            "type": "Number",
            "name": "panX",
            "optional": false
          },
          {
            "doc": "\n",
            "type": "Number",
            "name": "panY",
            "optional": false
          },
          {
            "doc": "\n",
            "type": "Number",
            "name": "zoomX",
            "optional": false
          },
          {
            "doc": "\n",
            "type": "Number",
            "name": "zoomY",
            "optional": false
          }
        ],
        "owner": "Ext.chart.Transformable",
        "html_filename": "Transformable.html",
        "inheritable": false,
        "href": "Transformable.html#Ext-chart-Transformable-method-transformByFast",
        "linenr": 113,
        "protected": false,
        "static": false,
        "private": false,
        "deprecated": null,
        "shortDoc": "Adjusts the pan/zoom transformation for this chart item, using CSS3 for fast hardware-accelerated\ntransformation. ...",
        "name": "transformByFast",
        "tagname": "method",
        "filename": "/Users/jamieavins/git/SDK/charts/src/chart/Transformable.js",
        "return": {
          "doc": "\n",
          "type": "undefined"
        }
      }
    ],
    "cfg": [

    ],
    "event": [
      {
        "alias": null,
        "doc": "<p>Fired after a transformation has been applied to this chart item.</p>\n",
        "params": [
          {
            "doc": "\n",
            "type": "Object",
            "name": "this",
            "optional": false
          },
          {
            "doc": "<p>True if it is a CSS3 fast transform, false if a persistent transform</p>\n",
            "type": "Boolean",
            "name": "fast",
            "optional": false
          }
        ],
        "owner": "Ext.chart.Transformable",
        "html_filename": "Transformable.html",
        "inheritable": false,
        "href": "Transformable.html#Ext-chart-Transformable-event-transform",
        "linenr": 47,
        "protected": false,
        "static": false,
        "private": false,
        "deprecated": null,
        "shortDoc": "Fired after a transformation has been applied to this chart item. ...",
        "name": "transform",
        "tagname": "event",
        "filename": "/Users/jamieavins/git/SDK/charts/src/chart/Transformable.js"
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
  "name": "Ext.chart.Transformable",
  "component": false,
  "tagname": "class",
  "singleton": false,
  "filename": "/Users/jamieavins/git/SDK/charts/src/chart/Transformable.js"
});