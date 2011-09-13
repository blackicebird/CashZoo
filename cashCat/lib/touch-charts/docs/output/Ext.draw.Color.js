Ext.data.JsonP.Ext_draw_Color({
  "mixedInto": [

  ],
  "alias": null,
  "doc": "<p>Represents an RGB color and provides helper functions get\ncolor components in HSL color space.</p>\n",
  "allMixins": [

  ],
  "mixins": [

  ],
  "html_filename": "Color.html",
  "inheritable": false,
  "author": null,
  "code_type": "assignment",
  "href": "Color.html#Ext-draw-Color",
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
            "doc": "<p>Red component (0..255)</p>\n",
            "type": "Number",
            "name": "red",
            "optional": false
          },
          {
            "doc": "<p>Green component (0..255)</p>\n",
            "type": "Number",
            "name": "green",
            "optional": false
          },
          {
            "doc": "<p>Blue component (0..255)</p>\n",
            "type": "Number",
            "name": "blue",
            "optional": false
          }
        ],
        "owner": "Ext.draw.Color",
        "html_filename": "Color.html",
        "inheritable": false,
        "href": "Color.html#Ext-draw-Color-method-constructor",
        "linenr": 23,
        "protected": false,
        "static": false,
        "private": false,
        "deprecated": null,
        "shortDoc": " ...",
        "name": "constructor",
        "tagname": "method",
        "filename": "/Users/jamieavins/git/SDK/charts/src/draw/Color.js",
        "return": {
          "doc": "\n",
          "type": "Object"
        }
      },
      {
        "alias": null,
        "doc": "<p>Create a new color based on the specified HSL values.</p>\n",
        "params": [
          {
            "doc": "<p>Hue component (0..359)</p>\n",
            "type": "Number",
            "name": "h",
            "optional": false
          },
          {
            "doc": "<p>Saturation component (0..1)</p>\n",
            "type": "Number",
            "name": "s",
            "optional": false
          },
          {
            "doc": "<p>Lightness component (0..1)</p>\n",
            "type": "Number",
            "name": "l",
            "optional": false
          }
        ],
        "owner": "Ext.draw.Color",
        "html_filename": "Color.html",
        "inheritable": false,
        "href": "Color.html#Ext-draw-Color-method-fromHSL",
        "linenr": 228,
        "protected": false,
        "static": false,
        "private": false,
        "deprecated": null,
        "shortDoc": "Create a new color based on the specified HSL values. ...",
        "name": "fromHSL",
        "tagname": "method",
        "filename": "/Users/jamieavins/git/SDK/charts/src/draw/Color.js",
        "return": {
          "doc": "<p>Ext.draw.Color</p>\n",
          "type": "undefined"
        }
      },
      {
        "alias": null,
        "doc": "<p>Parse the string and create a new color.</p>\n\n<p>Supported formats: '#rrggbb', '#rgb', and 'rgb(r,g,b)'.</p>\n\n<p>If the string is not recognized, an undefined will be returned instead.</p>\n",
        "params": [
          {
            "doc": "<p>Color in string.</p>\n",
            "type": "String",
            "name": "str",
            "optional": false
          }
        ],
        "owner": "Ext.draw.Color",
        "html_filename": "Color.html",
        "inheritable": false,
        "href": "Color.html#Ext-draw-Color-method-fromString",
        "linenr": 177,
        "protected": false,
        "static": false,
        "private": false,
        "deprecated": null,
        "shortDoc": "Parse the string and create a new color. ...",
        "name": "fromString",
        "tagname": "method",
        "filename": "/Users/jamieavins/git/SDK/charts/src/draw/Color.js",
        "return": {
          "doc": "<p>Ext.draw.Color</p>\n",
          "type": "undefined"
        }
      },
      {
        "alias": null,
        "doc": "<p>Get the blue component of the color, in the range 0..255.</p>\n",
        "params": [

        ],
        "owner": "Ext.draw.Color",
        "html_filename": "Color.html",
        "inheritable": false,
        "href": "Color.html#Ext-draw-Color-method-getBlue",
        "linenr": 54,
        "protected": false,
        "static": false,
        "private": false,
        "deprecated": null,
        "shortDoc": "Get the blue component of the color, in the range 0..255. ...",
        "name": "getBlue",
        "tagname": "method",
        "filename": "/Users/jamieavins/git/SDK/charts/src/draw/Color.js",
        "return": {
          "doc": "\n",
          "type": "Number"
        }
      },
      {
        "alias": null,
        "doc": "<p>Return a new color that is darker than this color.</p>\n",
        "params": [
          {
            "doc": "<p>Darker factor (0..1), default to 0.2</p>\n",
            "type": "Number",
            "name": "factor",
            "optional": false
          }
        ],
        "owner": "Ext.draw.Color",
        "html_filename": "Color.html",
        "inheritable": false,
        "href": "Color.html#Ext-draw-Color-method-getDarker",
        "linenr": 120,
        "protected": false,
        "static": false,
        "private": false,
        "deprecated": null,
        "shortDoc": "Return a new color that is darker than this color. ...",
        "name": "getDarker",
        "tagname": "method",
        "filename": "/Users/jamieavins/git/SDK/charts/src/draw/Color.js",
        "return": {
          "doc": "<p>Ext.draw.Color</p>\n",
          "type": "undefined"
        }
      },
      {
        "alias": null,
        "doc": "<p>Returns the gray value (0 to 255) of the color.</p>\n\n<p>The gray value is calculated using the formula r<em>0.3 + g</em>0.59 + b*0.11.</p>\n",
        "params": [

        ],
        "owner": "Ext.draw.Color",
        "html_filename": "Color.html",
        "inheritable": false,
        "href": "Color.html#Ext-draw-Color-method-getGrayscale",
        "linenr": 216,
        "protected": false,
        "static": false,
        "private": false,
        "deprecated": null,
        "shortDoc": "Returns the gray value (0 to 255) of the color. ...",
        "name": "getGrayscale",
        "tagname": "method",
        "filename": "/Users/jamieavins/git/SDK/charts/src/draw/Color.js",
        "return": {
          "doc": "\n",
          "type": "Number"
        }
      },
      {
        "alias": null,
        "doc": "<p>Get the green component of the color, in the range 0..255.</p>\n",
        "params": [

        ],
        "owner": "Ext.draw.Color",
        "html_filename": "Color.html",
        "inheritable": false,
        "href": "Color.html#Ext-draw-Color-method-getGreen",
        "linenr": 46,
        "protected": false,
        "static": false,
        "private": false,
        "deprecated": null,
        "shortDoc": "Get the green component of the color, in the range 0..255. ...",
        "name": "getGreen",
        "tagname": "method",
        "filename": "/Users/jamieavins/git/SDK/charts/src/draw/Color.js",
        "return": {
          "doc": "\n",
          "type": "Number"
        }
      },
      {
        "alias": null,
        "doc": "<p>Get the equivalent HSL components of the color.</p>\n",
        "params": [

        ],
        "owner": "Ext.draw.Color",
        "html_filename": "Color.html",
        "inheritable": false,
        "href": "Color.html#Ext-draw-Color-method-getHSL",
        "linenr": 71,
        "protected": false,
        "static": false,
        "private": false,
        "deprecated": null,
        "shortDoc": "Get the equivalent HSL components of the color. ...",
        "name": "getHSL",
        "tagname": "method",
        "filename": "/Users/jamieavins/git/SDK/charts/src/draw/Color.js",
        "return": {
          "doc": "\n",
          "type": "Array"
        }
      },
      {
        "alias": null,
        "doc": "<p>Return a new color that is lighter than this color.</p>\n",
        "params": [
          {
            "doc": "<p>Lighter factor (0..1), default to 0.2</p>\n",
            "type": "Number",
            "name": "factor",
            "optional": false
          }
        ],
        "owner": "Ext.draw.Color",
        "html_filename": "Color.html",
        "inheritable": false,
        "href": "Color.html#Ext-draw-Color-method-getLighter",
        "linenr": 107,
        "protected": false,
        "static": false,
        "private": false,
        "deprecated": null,
        "shortDoc": "Return a new color that is lighter than this color. ...",
        "name": "getLighter",
        "tagname": "method",
        "filename": "/Users/jamieavins/git/SDK/charts/src/draw/Color.js",
        "return": {
          "doc": "<p>Ext.draw.Color</p>\n",
          "type": "undefined"
        }
      },
      {
        "alias": null,
        "doc": "<p>Get the RGB values.</p>\n",
        "params": [

        ],
        "owner": "Ext.draw.Color",
        "html_filename": "Color.html",
        "inheritable": false,
        "href": "Color.html#Ext-draw-Color-method-getRGB",
        "linenr": 62,
        "protected": false,
        "static": false,
        "private": false,
        "deprecated": null,
        "shortDoc": "Get the RGB values. ...",
        "name": "getRGB",
        "tagname": "method",
        "filename": "/Users/jamieavins/git/SDK/charts/src/draw/Color.js",
        "return": {
          "doc": "\n",
          "type": "Array"
        }
      },
      {
        "alias": null,
        "doc": "<p>Get the red component of the color, in the range 0..255.</p>\n",
        "params": [

        ],
        "owner": "Ext.draw.Color",
        "html_filename": "Color.html",
        "inheritable": false,
        "href": "Color.html#Ext-draw-Color-method-getRed",
        "linenr": 38,
        "protected": false,
        "static": false,
        "private": false,
        "deprecated": null,
        "shortDoc": "Get the red component of the color, in the range 0..255. ...",
        "name": "getRed",
        "tagname": "method",
        "filename": "/Users/jamieavins/git/SDK/charts/src/draw/Color.js",
        "return": {
          "doc": "\n",
          "type": "Number"
        }
      },
      {
        "alias": null,
        "doc": "<p>Convert a color to hexadecimal format.</p>\n",
        "params": [
          {
            "doc": "<p>The color value (i.e 'rgb(255, 255, 255)', 'color: #ffffff').\nCan also be an Array, in this case the function handles the first member.</p>\n",
            "type": "String|Array",
            "name": "color",
            "optional": false
          }
        ],
        "owner": "Ext.draw.Color",
        "html_filename": "Color.html",
        "inheritable": false,
        "href": "Color.html#Ext-draw-Color-method-toHex",
        "linenr": 146,
        "protected": false,
        "static": false,
        "private": false,
        "deprecated": null,
        "shortDoc": "Convert a color to hexadecimal format. ...",
        "name": "toHex",
        "tagname": "method",
        "filename": "/Users/jamieavins/git/SDK/charts/src/draw/Color.js",
        "return": {
          "doc": "<p>The color in hexadecimal format.</p>\n",
          "type": "String"
        }
      },
      {
        "alias": null,
        "doc": "<p>Return the color in the hex format, i.e. '#rrggbb'.</p>\n",
        "params": [

        ],
        "owner": "Ext.draw.Color",
        "html_filename": "Color.html",
        "inheritable": false,
        "href": "Color.html#Ext-draw-Color-method-toString",
        "linenr": 130,
        "protected": false,
        "static": false,
        "private": false,
        "deprecated": null,
        "shortDoc": "Return the color in the hex format, i.e. ...",
        "name": "toString",
        "tagname": "method",
        "filename": "/Users/jamieavins/git/SDK/charts/src/draw/Color.js",
        "return": {
          "doc": "\n",
          "type": "String"
        }
      }
    ],
    "cfg": [
      {
        "alias": null,
        "type": "Number",
        "doc": "<p>The default factor to compute the lighter or darker color. Defaults to 0.2.</p>\n",
        "owner": "Ext.draw.Color",
        "html_filename": "Color.html",
        "inheritable": false,
        "href": "Color.html#Ext-draw-Color-cfg-lightnessFactor",
        "linenr": 16,
        "protected": false,
        "static": false,
        "private": false,
        "deprecated": null,
        "shortDoc": "The default factor to compute the lighter or darker color. ...",
        "name": "lightnessFactor",
        "tagname": "cfg",
        "filename": "/Users/jamieavins/git/SDK/charts/src/draw/Color.js"
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
  "name": "Ext.draw.Color",
  "component": false,
  "tagname": "class",
  "singleton": false,
  "filename": "/Users/jamieavins/git/SDK/charts/src/draw/Color.js"
});