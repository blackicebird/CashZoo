Ext.data.JsonP.Ext_draw_Sprite({
  "mixedInto": [

  ],
  "alias": null,
  "doc": "<p>A Sprite is an object rendered in a Drawing surface. There are different options and types of sprites.\nThe configuration of a Sprite is an object with the following properties:</p>\n\n<ul>\n<li><strong>type</strong> - (String) The type of the sprite. Possible options are 'circle', 'path', 'rect', 'text', 'square', 'image'.</li>\n<li><strong>width</strong> - (Number) Used in rectangle sprites, the width of the rectangle.</li>\n<li><strong>height</strong> - (Number) Used in rectangle sprites, the height of the rectangle.</li>\n<li><strong>size</strong> - (Number) Used in square sprites, the dimension of the square.</li>\n<li><strong>radius</strong> - (Number) Used in circle sprites, the radius of the circle.</li>\n<li><strong>x</strong> - (Number) The position along the x-axis.</li>\n<li><strong>y</strong> - (Number) The position along the y-axis.</li>\n<li><strong>path</strong> - (Array) Used in path sprites, the path of the sprite written in SVG-like path syntax.</li>\n<li><strong>opacity</strong> - (Number) The opacity of the sprite.</li>\n<li><strong>fill</strong> - (String) The fill color.</li>\n<li><strong>stroke</strong> - (String) The stroke color.</li>\n<li><strong>stroke-width</strong> - (Number) The width of the stroke.</li>\n<li><strong>font</strong> - (String) Used with text type sprites. The full font description. Uses the same syntax as the CSS <code>font</code> parameter.</li>\n<li><strong>text</strong> - (String) Used with text type sprites. The text itself.</li>\n</ul>\n\n\n<p>Additionally there are three transform objects that can be set with <code>setAttributes</code> which are <code>translate</code>, <code>rotate</code> and\n<code>scale</code>.</p>\n\n<p>For translate, the configuration object contains x and y attributes that indicate where to\ntranslate the object. For example:</p>\n\n<pre><code>sprite.setAttributes({\n  translate: {\n   x: 10,\n   y: 10\n  }\n}, true);\n</code></pre>\n\n<p>For rotation, the configuration object contains x and y attributes for the center of the rotation (which are optional),\nand a <code>degrees</code> attribute that specifies the rotation in degrees. For example:</p>\n\n<pre><code>sprite.setAttributes({\n  rotate: {\n   degrees: 90\n  }\n}, true);\n</code></pre>\n\n<p>For scaling, the configuration object contains x and y attributes for the x-axis and y-axis scaling. For example:</p>\n\n<pre><code>sprite.setAttributes({\n  scale: {\n   x: 10,\n   y: 3\n  }\n}, true);\n</code></pre>\n\n<p>Sprites can be created with a reference to a <a href=\"#/api/Ext.draw.Surface\" rel=\"Ext.draw.Surface\" class=\"docClass\">Ext.draw.Surface</a></p>\n\n<pre><code> var drawComponent = Ext.create('Ext.draw.Component', options here...);\n\n var sprite = Ext.create('Ext.draw.Sprite', {\n     type: 'circle',\n     fill: '#ff0',\n     surface: drawComponent.surface,\n     radius: 5\n });\n</code></pre>\n\n<p>Sprites can also be added to the surface as a configuration object:</p>\n\n<pre><code> var sprite = drawComponent.surface.add({\n     type: 'circle',\n     fill: '#ff0',\n     radius: 5\n });\n</code></pre>\n\n<p>In order to properly apply properties and render the sprite we have to\n<code>show</code> the sprite setting the option <code>redraw</code> to <code>true</code>:</p>\n\n<pre><code> sprite.show(true);\n</code></pre>\n\n<p>The constructor configuration object of the Sprite can also be used and passed into the <a href=\"#/api/Ext.draw.Surface\" rel=\"Ext.draw.Surface\" class=\"docClass\">Ext.draw.Surface</a>\nadd method to append a new sprite to the canvas. For example:</p>\n\n<pre><code>drawComponent.surface.add({\n    type: 'circle',\n    fill: '#ffc',\n    radius: 100,\n    x: 100,\n    y: 100\n});\n</code></pre>\n",
  "allMixins": [

  ],
  "mixins": [

  ],
  "html_filename": "Sprite.html",
  "inheritable": false,
  "author": null,
  "code_type": "assignment",
  "href": "Sprite.html#Ext-draw-Sprite",
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
        "doc": "<p>Adds one or more CSS classes to the element. Duplicate classes are automatically filtered out.  Note this method\nis severly limited in VML.</p>\n",
        "params": [
          {
            "doc": "<p>The CSS class to add, or an array of classes</p>\n",
            "type": "String/Array",
            "name": "className",
            "optional": false
          }
        ],
        "owner": "Ext.draw.Sprite",
        "html_filename": "Sprite.html",
        "inheritable": false,
        "href": "Sprite.html#Ext-draw-Sprite-method-addCls",
        "linenr": 409,
        "protected": false,
        "static": false,
        "private": false,
        "deprecated": null,
        "shortDoc": "Adds one or more CSS classes to the element. ...",
        "name": "addCls",
        "tagname": "method",
        "filename": "/Users/jamieavins/git/SDK/charts/src/draw/Sprite.js",
        "return": {
          "doc": "<p>this</p>\n",
          "type": "Ext.draw.Sprite"
        }
      },
      {
        "alias": null,
        "doc": "<p>Removes the sprite and clears all listeners.</p>\n",
        "params": [

        ],
        "owner": "Ext.draw.Sprite",
        "html_filename": "Sprite.html",
        "inheritable": false,
        "href": "Sprite.html#Ext-draw-Sprite-method-destroy",
        "linenr": 367,
        "protected": false,
        "static": false,
        "private": false,
        "deprecated": null,
        "shortDoc": "Removes the sprite and clears all listeners. ...",
        "name": "destroy",
        "tagname": "method",
        "filename": "/Users/jamieavins/git/SDK/charts/src/draw/Sprite.js",
        "return": {
          "doc": "\n",
          "type": "undefined"
        }
      },
      {
        "alias": null,
        "doc": "<p>Retrieve the bounding box of the sprite. This will be returned as an object with x, y, width, and height properties.</p>\n",
        "params": [
          {
            "doc": "\n",
            "type": "Object",
            "name": "isWithoutTransform",
            "optional": false
          }
        ],
        "owner": "Ext.draw.Sprite",
        "html_filename": "Sprite.html",
        "inheritable": false,
        "href": "Sprite.html#Ext-draw-Sprite-method-getBBox",
        "linenr": 316,
        "protected": false,
        "static": false,
        "private": false,
        "deprecated": null,
        "shortDoc": "Retrieve the bounding box of the sprite. ...",
        "name": "getBBox",
        "tagname": "method",
        "filename": "/Users/jamieavins/git/SDK/charts/src/draw/Sprite.js",
        "return": {
          "doc": "<p>bbox</p>\n",
          "type": "Object"
        }
      },
      {
        "alias": null,
        "doc": "<p>Hide the sprite.</p>\n",
        "params": [
          {
            "doc": "<p>Flag to immediatly draw the change.</p>\n",
            "type": "Boolean",
            "name": "redraw",
            "optional": false
          }
        ],
        "owner": "Ext.draw.Sprite",
        "html_filename": "Sprite.html",
        "inheritable": false,
        "href": "Sprite.html#Ext-draw-Sprite-method-hide",
        "linenr": 328,
        "protected": false,
        "static": false,
        "private": false,
        "deprecated": null,
        "shortDoc": "Hide the sprite. ...",
        "name": "hide",
        "tagname": "method",
        "filename": "/Users/jamieavins/git/SDK/charts/src/draw/Sprite.js",
        "return": {
          "doc": "<p>this</p>\n",
          "type": "Ext.draw.Sprite"
        }
      },
      {
        "alias": null,
        "doc": "<p>Redraw the sprite.</p>\n",
        "params": [

        ],
        "owner": "Ext.draw.Sprite",
        "html_filename": "Sprite.html",
        "inheritable": false,
        "href": "Sprite.html#Ext-draw-Sprite-method-redraw",
        "linenr": 380,
        "protected": false,
        "static": false,
        "private": false,
        "deprecated": null,
        "shortDoc": "Redraw the sprite. ...",
        "name": "redraw",
        "tagname": "method",
        "filename": "/Users/jamieavins/git/SDK/charts/src/draw/Sprite.js",
        "return": {
          "doc": "<p>this</p>\n",
          "type": "Ext.draw.Sprite"
        }
      },
      {
        "alias": null,
        "doc": "<p>Remove the sprite.</p>\n",
        "params": [

        ],
        "owner": "Ext.draw.Sprite",
        "html_filename": "Sprite.html",
        "inheritable": false,
        "href": "Sprite.html#Ext-draw-Sprite-method-remove",
        "linenr": 352,
        "protected": false,
        "static": false,
        "private": false,
        "deprecated": null,
        "shortDoc": "Remove the sprite. ...",
        "name": "remove",
        "tagname": "method",
        "filename": "/Users/jamieavins/git/SDK/charts/src/draw/Sprite.js",
        "return": {
          "doc": "\n",
          "type": "undefined"
        }
      },
      {
        "alias": null,
        "doc": "<p>Removes one or more CSS classes from the element.</p>\n",
        "params": [
          {
            "doc": "<p>The CSS class to remove, or an array of classes.  Note this method\nis severly limited in VML.</p>\n",
            "type": "String/Array",
            "name": "className",
            "optional": false
          }
        ],
        "owner": "Ext.draw.Sprite",
        "html_filename": "Sprite.html",
        "inheritable": false,
        "href": "Sprite.html#Ext-draw-Sprite-method-removeCls",
        "linenr": 420,
        "protected": false,
        "static": false,
        "private": false,
        "deprecated": null,
        "shortDoc": "Removes one or more CSS classes from the element. ...",
        "name": "removeCls",
        "tagname": "method",
        "filename": "/Users/jamieavins/git/SDK/charts/src/draw/Sprite.js",
        "return": {
          "doc": "<p>this</p>\n",
          "type": "Ext.draw.Sprite"
        }
      },
      {
        "alias": null,
        "doc": "<p>Change the attributes of the sprite.</p>\n",
        "params": [
          {
            "doc": "<p>attributes to be changed on the sprite.</p>\n",
            "type": "Object",
            "name": "attrs",
            "optional": false
          },
          {
            "doc": "<p>Flag to immediatly draw the change.</p>\n",
            "type": "Boolean",
            "name": "redraw",
            "optional": false
          }
        ],
        "owner": "Ext.draw.Sprite",
        "html_filename": "Sprite.html",
        "inheritable": false,
        "href": "Sprite.html#Ext-draw-Sprite-method-setAttributes",
        "linenr": 219,
        "protected": false,
        "static": false,
        "private": false,
        "deprecated": null,
        "shortDoc": "Change the attributes of the sprite. ...",
        "name": "setAttributes",
        "tagname": "method",
        "filename": "/Users/jamieavins/git/SDK/charts/src/draw/Sprite.js",
        "return": {
          "doc": "<p>this</p>\n",
          "type": "Ext.draw.Sprite"
        }
      },
      {
        "alias": null,
        "doc": "<p>Wrapper for setting style properties, also takes single object parameter of multiple styles.</p>\n",
        "params": [
          {
            "doc": "<p>The style property to be set, or an object of multiple styles.</p>\n",
            "type": "String/Object",
            "name": "property",
            "optional": false
          },
          {
            "doc": "<p>(optional) The value to apply to the given property, or null if an object was passed.</p>\n",
            "type": "String",
            "name": "value",
            "optional": true
          }
        ],
        "owner": "Ext.draw.Sprite",
        "html_filename": "Sprite.html",
        "inheritable": false,
        "href": "Sprite.html#Ext-draw-Sprite-method-setStyle",
        "linenr": 398,
        "protected": false,
        "static": false,
        "private": false,
        "deprecated": null,
        "shortDoc": "Wrapper for setting style properties, also takes single object parameter of multiple styles. ...",
        "name": "setStyle",
        "tagname": "method",
        "filename": "/Users/jamieavins/git/SDK/charts/src/draw/Sprite.js",
        "return": {
          "doc": "<p>this</p>\n",
          "type": "Ext.draw.Sprite"
        }
      },
      {
        "alias": null,
        "doc": "<p>Show the sprite.</p>\n",
        "params": [
          {
            "doc": "<p>Flag to immediatly draw the change.</p>\n",
            "type": "Boolean",
            "name": "redraw",
            "optional": false
          }
        ],
        "owner": "Ext.draw.Sprite",
        "html_filename": "Sprite.html",
        "inheritable": false,
        "href": "Sprite.html#Ext-draw-Sprite-method-show",
        "linenr": 340,
        "protected": false,
        "static": false,
        "private": false,
        "deprecated": null,
        "shortDoc": "Show the sprite. ...",
        "name": "show",
        "tagname": "method",
        "filename": "/Users/jamieavins/git/SDK/charts/src/draw/Sprite.js",
        "return": {
          "doc": "<p>this</p>\n",
          "type": "Ext.draw.Sprite"
        }
      },
      {
        "alias": null,
        "doc": "<p>Draw a sprite Tween (animation interpolation).</p>\n",
        "params": [

        ],
        "owner": "Ext.draw.Sprite",
        "html_filename": "Sprite.html",
        "inheritable": false,
        "href": "Sprite.html#Ext-draw-Sprite-method-tween",
        "linenr": 389,
        "protected": false,
        "static": false,
        "private": false,
        "deprecated": null,
        "shortDoc": "Draw a sprite Tween (animation interpolation). ...",
        "name": "tween",
        "tagname": "method",
        "filename": "/Users/jamieavins/git/SDK/charts/src/draw/Sprite.js",
        "return": {
          "doc": "<p>this</p>\n",
          "type": "Ext.draw.Sprite"
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
  "name": "Ext.draw.Sprite",
  "component": false,
  "tagname": "class",
  "singleton": false,
  "filename": "/Users/jamieavins/git/SDK/charts/src/draw/Sprite.js"
});