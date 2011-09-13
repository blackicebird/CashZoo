Ext.data.JsonP.Ext_draw_Canvas({
  "mixedInto": [

  ],
  "alias": null,
  "doc": "<p>Provides specific methods to draw with Canvas.</p>\n\n",
  "allMixins": [

  ],
  "mixins": [

  ],
  "html_filename": "Canvas.html",
  "inheritable": false,
  "author": null,
  "code_type": "assignment",
  "href": "Canvas.html#Ext-draw-Canvas",
  "subclasses": [

  ],
  "superclasses": [
    "Ext.draw.Surface"
  ],
  "linenr": 1,
  "alternateClassNames": [

  ],
  "protected": false,
  "static": false,
  "extends": "Ext.draw.Surface",
  "docauthor": null,
  "members": {
    "property": [
      {
        "alias": null,
        "type": "Object",
        "doc": "<p>Adds one or more CSS classes to the element. Duplicate classes are automatically filtered out.</p>\n\n<p>For example:</p>\n\n<pre><code>     drawComponent.surface.addCls(sprite, 'x-visible');\n</code></pre>\n",
        "owner": "Ext.draw.Surface",
        "html_filename": "Surface.html",
        "inheritable": false,
        "href": "Surface.html#Ext-draw-Surface-property-addCls",
        "linenr": 306,
        "protected": false,
        "static": false,
        "private": false,
        "deprecated": null,
        "shortDoc": "Adds one or more CSS classes to the element. ...",
        "name": "addCls",
        "tagname": "property",
        "filename": "/Users/jamieavins/git/SDK/charts/src/draw/Surface.js"
      },
      {
        "alias": null,
        "type": "Object",
        "doc": "<p>Add a gradient definition to the Surface. Note that in some surface engines, adding\na gradient via this method will not take effect if the surface has already been rendered.\nTherefore, it is preferred to pass the gradients as an item to the surface config, rather\nthan calling this method, especially if the surface is rendered immediately (e.g. due to\n'renderTo' in its config). For more information on how to create gradients in the Chart\nconfiguration object please refer to <a href=\"#/api/Ext.chart.Chart\" rel=\"Ext.chart.Chart\" class=\"docClass\">Ext.chart.Chart</a>.</p>\n\n<p>The gradient object to be passed into this method is composed by:</p>\n\n<ul>\n<li><strong>id</strong> - string - The unique name of the gradient.</li>\n<li><strong>angle</strong> - number, optional - The angle of the gradient in degrees.</li>\n<li><p><strong>stops</strong> - object - An object with numbers as keys (from 0 to 100) and style objects as values.</p>\n\n<p>  For example:</p>\n\n<pre><code>         drawComponent.surface.addGradient({\n             id: 'gradientId',\n             angle: 45,\n             stops: {\n                 0: {\n                     color: '#555'\n                 },\n                 100: {\n                     color: '#ddd'\n                 }\n             }\n         });\n</code></pre></li>\n</ul>\n\n",
        "owner": "Ext.draw.Surface",
        "html_filename": "Surface.html",
        "inheritable": false,
        "href": "Surface.html#Ext-draw-Surface-property-addGradient",
        "linenr": 505,
        "protected": false,
        "static": false,
        "private": false,
        "deprecated": null,
        "shortDoc": "Add a gradient definition to the Surface. ...",
        "name": "addGradient",
        "tagname": "property",
        "filename": "/Users/jamieavins/git/SDK/charts/src/draw/Surface.js"
      },
      {
        "alias": null,
        "type": "Object",
        "doc": "<p>A list of all event names that should be relayed by a Surface object from its inner surfaceEl.</p>\n",
        "owner": "Ext.draw.Surface",
        "html_filename": "Surface.html",
        "inheritable": false,
        "href": "Surface.html#Ext-draw-Surface-property-eventNames",
        "linenr": 1020,
        "protected": false,
        "static": false,
        "private": false,
        "deprecated": null,
        "name": "eventNames",
        "tagname": "property",
        "filename": "/Users/jamieavins/git/SDK/charts/src/draw/Surface.js"
      },
      {
        "alias": null,
        "type": "Object",
        "doc": "<p>Removes one or more CSS classes from the element.</p>\n\n<p>For example:</p>\n\n<pre><code> drawComponent.surface.removeCls(sprite, 'x-visible');\n</code></pre>\n",
        "owner": "Ext.draw.Surface",
        "html_filename": "Surface.html",
        "inheritable": false,
        "href": "Surface.html#Ext-draw-Surface-property-removeCls",
        "linenr": 318,
        "protected": false,
        "static": false,
        "private": false,
        "deprecated": null,
        "shortDoc": "Removes one or more CSS classes from the element. ...",
        "name": "removeCls",
        "tagname": "property",
        "filename": "/Users/jamieavins/git/SDK/charts/src/draw/Surface.js"
      },
      {
        "alias": null,
        "type": "Object",
        "doc": "<p>Sets CSS style attributes to an element.</p>\n\n<p>For example:</p>\n\n<pre><code> drawComponent.surface.setStyle(sprite, {\n     'cursor': 'pointer'\n });\n</code></pre>\n",
        "owner": "Ext.draw.Surface",
        "html_filename": "Surface.html",
        "inheritable": false,
        "href": "Surface.html#Ext-draw-Surface-property-setStyle",
        "linenr": 330,
        "protected": false,
        "static": false,
        "private": false,
        "deprecated": null,
        "shortDoc": "Sets CSS style attributes to an element. ...",
        "name": "setStyle",
        "tagname": "property",
        "filename": "/Users/jamieavins/git/SDK/charts/src/draw/Surface.js"
      },
      {
        "alias": null,
        "type": "Object",
        "doc": "<p>Changes the text in the sprite element. The sprite must be a <code>text</code> sprite.\nThis method can also be called from <a href=\"#/api/Ext.draw.Sprite\" rel=\"Ext.draw.Sprite\" class=\"docClass\">Ext.draw.Sprite</a>.</p>\n\n<p>For example:</p>\n\n<pre><code> var spriteGroup = drawComponent.surface.setText(sprite, 'my new text');\n</code></pre>\n",
        "owner": "Ext.draw.Surface",
        "html_filename": "Surface.html",
        "inheritable": false,
        "href": "Surface.html#Ext-draw-Surface-property-setText",
        "linenr": 860,
        "protected": false,
        "static": false,
        "private": false,
        "deprecated": null,
        "shortDoc": "Changes the text in the sprite element. ...",
        "name": "setText",
        "tagname": "property",
        "filename": "/Users/jamieavins/git/SDK/charts/src/draw/Surface.js"
      }
    ],
    "css_var": [

    ],
    "css_mixin": [

    ],
    "method": [
      {
        "alias": null,
        "doc": "<p>Add a Sprite to the surface. See <a href=\"#/api/Ext.draw.Sprite\" rel=\"Ext.draw.Sprite\" class=\"docClass\">Ext.draw.Sprite</a> for the configuration object to be passed into this method.</p>\n\n<p>For example:</p>\n\n<pre><code>drawComponent.surface.add({\n    type: 'circle',\n    fill: '#ffc',\n    radius: 100,\n    x: 100,\n    y: 100\n});\n</code></pre>\n",
        "params": [

        ],
        "owner": "Ext.draw.Surface",
        "html_filename": "Surface.html",
        "inheritable": false,
        "href": "Surface.html#Ext-draw-Surface-method-add",
        "linenr": 537,
        "protected": false,
        "static": false,
        "private": false,
        "deprecated": null,
        "shortDoc": "Add a Sprite to the surface. ...",
        "name": "add",
        "tagname": "method",
        "filename": "/Users/jamieavins/git/SDK/charts/src/draw/Surface.js",
        "return": {
          "doc": "\n",
          "type": "undefined"
        }
      },
      {
        "alias": null,
        "doc": "<p>Create and return a new concrete Surface instance appropriate for the current environment.</p>\n",
        "params": [
          {
            "doc": "<p>Initial configuration for the Surface instance</p>\n",
            "type": "Object",
            "name": "config",
            "optional": false
          },
          {
            "doc": "<p>Optional order of implementations to use; the first one that is</p>\n\n<pre><code>           available in the current environment will be used. Defaults to\n           &lt;code&gt;['Svg', 'Vml']&lt;/code&gt;.\n</code></pre>\n",
            "type": "Array",
            "name": "enginePriority",
            "optional": false
          }
        ],
        "owner": "Ext.draw.Surface",
        "html_filename": "Surface.html",
        "inheritable": false,
        "href": "Surface.html#Ext-draw-Surface-method-create",
        "linenr": 997,
        "protected": false,
        "static": false,
        "private": false,
        "deprecated": null,
        "shortDoc": "Create and return a new concrete Surface instance appropriate for the current environment. ...",
        "name": "create",
        "tagname": "method",
        "filename": "/Users/jamieavins/git/SDK/charts/src/draw/Surface.js",
        "return": {
          "doc": "\n",
          "type": "undefined"
        }
      },
      {
        "alias": null,
        "doc": "<p>Destroys the surface. This is done by removing all components from it and\nalso removing its reference to a DOM element.</p>\n\n<p>For example:</p>\n\n<pre><code> drawComponent.surface.destroy();\n</code></pre>\n",
        "params": [

        ],
        "owner": "Ext.draw.Surface",
        "html_filename": "Surface.html",
        "inheritable": false,
        "href": "Surface.html#Ext-draw-Surface-method-destroy",
        "linenr": 885,
        "protected": false,
        "static": false,
        "private": false,
        "deprecated": null,
        "shortDoc": "Destroys the surface. ...",
        "name": "destroy",
        "tagname": "method",
        "filename": "/Users/jamieavins/git/SDK/charts/src/draw/Surface.js",
        "return": {
          "doc": "\n",
          "type": "undefined"
        }
      },
      {
        "alias": null,
        "doc": "<p>Returns a new group or an existent group associated with the current surface.\nThe group returned is a <a href=\"#/api/Ext.draw.CompositeSprite\" rel=\"Ext.draw.CompositeSprite\" class=\"docClass\">Ext.draw.CompositeSprite</a> group.</p>\n\n<p>For example:</p>\n\n<pre><code> var spriteGroup = drawComponent.surface.getGroup('someGroupId');\n</code></pre>\n",
        "params": [
          {
            "doc": "<p>The unique identifier of the group.</p>\n",
            "type": "String",
            "name": "id",
            "optional": false
          }
        ],
        "owner": "Ext.draw.Surface",
        "html_filename": "Surface.html",
        "inheritable": false,
        "href": "Surface.html#Ext-draw-Surface-method-getGroup",
        "linenr": 819,
        "protected": false,
        "static": false,
        "private": false,
        "deprecated": null,
        "shortDoc": "Returns a new group or an existent group associated with the current surface. ...",
        "name": "getGroup",
        "tagname": "method",
        "filename": "/Users/jamieavins/git/SDK/charts/src/draw/Surface.js",
        "return": {
          "doc": "<p>The <a href=\"#/api/Ext.draw.CompositeSprite\" rel=\"Ext.draw.CompositeSprite\" class=\"docClass\">Ext.draw.CompositeSprite</a>.</p>\n",
          "type": "Object"
        }
      },
      {
        "alias": null,
        "doc": "<p>Retrieves the id of this component.\nWill autogenerate an id if one has not already been set.</p>\n",
        "params": [

        ],
        "owner": "Ext.draw.Surface",
        "html_filename": "Surface.html",
        "inheritable": false,
        "href": "Surface.html#Ext-draw-Surface-method-getId",
        "linenr": 877,
        "protected": false,
        "static": false,
        "private": false,
        "deprecated": null,
        "shortDoc": "Retrieves the id of this component. ...",
        "name": "getId",
        "tagname": "method",
        "filename": "/Users/jamieavins/git/SDK/charts/src/draw/Surface.js",
        "return": {
          "doc": "\n",
          "type": "undefined"
        }
      },
      {
        "alias": null,
        "doc": "<ul>\n<li>For a given event, find the Sprite corresponding to it if any.</li>\n</ul>\n\n",
        "params": [
          {
            "doc": "\n",
            "type": "Object",
            "name": "e",
            "optional": false
          }
        ],
        "owner": "Ext.draw.Surface",
        "html_filename": "Surface.html",
        "inheritable": false,
        "href": "Surface.html#Ext-draw-Surface-method-getSpriteForEvent",
        "linenr": 497,
        "protected": true,
        "static": false,
        "private": false,
        "deprecated": null,
        "shortDoc": "For a given event, find the Sprite corresponding to it if any. ...",
        "name": "getSpriteForEvent",
        "tagname": "method",
        "filename": "/Users/jamieavins/git/SDK/charts/src/draw/Surface.js",
        "return": {
          "doc": "<p>The sprite instance, or null if none found.</p>\n",
          "type": "Ext.draw.Sprite"
        }
      },
      {
        "alias": null,
        "doc": "<p>Remove a given sprite from the surface, optionally destroying the sprite in the process.\nYou can also call the sprite own <code>remove</code> method.</p>\n\n<p>For example:</p>\n\n<pre><code> drawComponent.surface.remove(sprite);\n //or...\n sprite.remove();\n</code></pre>\n",
        "params": [
          {
            "doc": "\n",
            "type": "Ext.draw.Sprite",
            "name": "sprite",
            "optional": false
          },
          {
            "doc": "\n",
            "type": "Boolean",
            "name": "destroySprite",
            "optional": false
          }
        ],
        "owner": "Ext.draw.Surface",
        "html_filename": "Surface.html",
        "inheritable": false,
        "href": "Surface.html#Ext-draw-Surface-method-remove",
        "linenr": 623,
        "protected": false,
        "static": false,
        "private": false,
        "deprecated": null,
        "shortDoc": "Remove a given sprite from the surface, optionally destroying the sprite in the process. ...",
        "name": "remove",
        "tagname": "method",
        "filename": "/Users/jamieavins/git/SDK/charts/src/draw/Surface.js",
        "return": {
          "doc": "<p>the sprite's new index in the list</p>\n",
          "type": "Number"
        }
      },
      {
        "alias": null,
        "doc": "<p>Remove all sprites from the surface, optionally destroying the sprites in the process.</p>\n\n<p>For example:</p>\n\n<pre><code> drawComponent.surface.removeAll();\n</code></pre>\n",
        "params": [
          {
            "doc": "<p>Whether to destroy all sprites when removing them.</p>\n",
            "type": "Boolean",
            "name": "destroySprites",
            "optional": false
          }
        ],
        "owner": "Ext.draw.Surface",
        "html_filename": "Surface.html",
        "inheritable": false,
        "href": "Surface.html#Ext-draw-Surface-method-removeAll",
        "linenr": 650,
        "protected": false,
        "static": false,
        "private": false,
        "deprecated": null,
        "shortDoc": "Remove all sprites from the surface, optionally destroying the sprites in the process. ...",
        "name": "removeAll",
        "tagname": "method",
        "filename": "/Users/jamieavins/git/SDK/charts/src/draw/Surface.js",
        "return": {
          "doc": "<p>The sprite's new index in the list.</p>\n",
          "type": "Number"
        }
      },
      {
        "alias": null,
        "doc": "<p>Sets the size of the surface. Accomodates the background (if any) to fit the new size too.</p>\n\n<p>For example:</p>\n\n<pre><code> drawComponent.surface.setSize(500, 500);\n</code></pre>\n\n<p>This method is generally called when also setting the size of the draw Component.</p>\n",
        "params": [
          {
            "doc": "<p>The new width of the canvas.</p>\n",
            "type": "Number",
            "name": "w",
            "optional": false
          },
          {
            "doc": "<p>The new height of the canvas.</p>\n",
            "type": "Number",
            "name": "h",
            "optional": false
          }
        ],
        "owner": "Ext.draw.Surface",
        "html_filename": "Surface.html",
        "inheritable": false,
        "href": "Surface.html#Ext-draw-Surface-method-setSize",
        "linenr": 413,
        "protected": false,
        "static": false,
        "private": false,
        "deprecated": null,
        "shortDoc": "Sets the size of the surface. ...",
        "name": "setSize",
        "tagname": "method",
        "filename": "/Users/jamieavins/git/SDK/charts/src/draw/Surface.js",
        "return": {
          "doc": "\n",
          "type": "undefined"
        }
      },
      {
        "alias": null,
        "doc": "<p>Sets a fast CSS3 transform on the surfaceEl.</p>\n",
        "params": [
          {
            "doc": "\n",
            "type": "Ext.draw.Matrix",
            "name": "matrix",
            "optional": false
          }
        ],
        "owner": "Ext.draw.Surface",
        "html_filename": "Surface.html",
        "inheritable": false,
        "href": "Surface.html#Ext-draw-Surface-method-setSurfaceFastTransform",
        "linenr": 982,
        "protected": false,
        "static": false,
        "private": false,
        "deprecated": null,
        "shortDoc": "Sets a fast CSS3 transform on the surfaceEl. ...",
        "name": "setSurfaceFastTransform",
        "tagname": "method",
        "filename": "/Users/jamieavins/git/SDK/charts/src/draw/Surface.js",
        "return": {
          "doc": "\n",
          "type": "undefined"
        }
      },
      {
        "alias": null,
        "doc": "<p>Sets the persistent transform and updates the surfaceEl's size and position to match.</p>\n",
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
        "owner": "Ext.draw.Surface",
        "html_filename": "Surface.html",
        "inheritable": false,
        "href": "Surface.html#Ext-draw-Surface-method-setSurfaceTransform",
        "linenr": 965,
        "protected": false,
        "static": false,
        "private": false,
        "deprecated": null,
        "shortDoc": "Sets the persistent transform and updates the surfaceEl's size and position to match. ...",
        "name": "setSurfaceTransform",
        "tagname": "method",
        "filename": "/Users/jamieavins/git/SDK/charts/src/draw/Surface.js",
        "return": {
          "doc": "\n",
          "type": "undefined"
        }
      }
    ],
    "cfg": [
      {
        "alias": null,
        "type": "Number",
        "doc": "<p>The height of this component in pixels (defaults to auto).\n<b>Note</b> to express this dimension as a percentage or offset see Ext.Component.anchor.</p>\n",
        "owner": "Ext.draw.Surface",
        "html_filename": "Surface.html",
        "inheritable": false,
        "href": "Surface.html#Ext-draw-Surface-cfg-height",
        "linenr": 196,
        "protected": false,
        "static": false,
        "private": false,
        "deprecated": null,
        "shortDoc": "The height of this component in pixels (defaults to auto). ...",
        "name": "height",
        "tagname": "cfg",
        "filename": "/Users/jamieavins/git/SDK/charts/src/draw/Surface.js"
      },
      {
        "alias": null,
        "type": "Number",
        "doc": "<p>The width of this component in pixels (defaults to auto).\n<b>Note</b> to express this dimension as a percentage or offset see Ext.Component.anchor.</p>\n",
        "owner": "Ext.draw.Surface",
        "html_filename": "Surface.html",
        "inheritable": false,
        "href": "Surface.html#Ext-draw-Surface-cfg-width",
        "linenr": 201,
        "protected": false,
        "static": false,
        "private": false,
        "deprecated": null,
        "shortDoc": "The width of this component in pixels (defaults to auto). ...",
        "name": "width",
        "tagname": "cfg",
        "filename": "/Users/jamieavins/git/SDK/charts/src/draw/Surface.js"
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
  "name": "Ext.draw.Canvas",
  "component": false,
  "tagname": "class",
  "singleton": false,
  "filename": "/Users/jamieavins/git/SDK/charts/src/draw/engine/Canvas.js"
});