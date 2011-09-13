Ext.data.JsonP.Ext_draw_CompositeSprite({
  "mixedInto": [

  ],
  "alias": null,
  "doc": "<p>A composite Sprite handles a group of sprites with common methods to a sprite\nsuch as <code>hide</code>, <code>show</code>, <code>setAttributes</code>. These methods are applied to the set of sprites\nadded to the group.</p>\n\n<p>CompositeSprite extends Ext.util.MixedCollection so you can use the same methods\nin <code>MixedCollection</code> to iterate through sprites, add and remove elements, etc.</p>\n\n<p>In order to create a CompositeSprite, one has to provide a handle to the surface where it is\nrendered:</p>\n\n<pre><code>var group = Ext.create('Ext.draw.CompositeSprite', {\n    surface: drawComponent.surface\n});\n</code></pre>\n\n<p>Then just by using <code>MixedCollection</code> methods it's possible to add <a href=\"#/api/Ext.draw.Sprite\" rel=\"Ext.draw.Sprite\" class=\"docClass\">Ext.draw.Sprite</a>s:</p>\n\n<pre><code>group.add(sprite1);\ngroup.add(sprite2);\ngroup.add(sprite3);\n</code></pre>\n\n<p>And then apply common Sprite methods to them:</p>\n\n<pre><code>group.setAttributes({\n    fill: '#f00'\n}, true);\n</code></pre>\n",
  "allMixins": [

  ],
  "mixins": [

  ],
  "html_filename": "CompositeSprite.html",
  "inheritable": false,
  "author": null,
  "code_type": "assignment",
  "href": "CompositeSprite.html#Ext-draw-CompositeSprite",
  "subclasses": [

  ],
  "superclasses": [

  ],
  "linenr": 1,
  "alternateClassNames": [

  ],
  "protected": false,
  "static": false,
  "extends": "Ext.util.MixedCollection",
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
        "doc": "<p>Add a Sprite to the Group</p>\n",
        "params": [
          {
            "doc": "\n",
            "type": "Object",
            "name": "key",
            "optional": false
          },
          {
            "doc": "\n",
            "type": "Object",
            "name": "o",
            "optional": false
          }
        ],
        "owner": "Ext.draw.CompositeSprite",
        "html_filename": "CompositeSprite.html",
        "inheritable": false,
        "href": "CompositeSprite.html#Ext-draw-CompositeSprite-method-add",
        "linenr": 90,
        "protected": false,
        "static": false,
        "private": false,
        "deprecated": null,
        "shortDoc": "Add a Sprite to the Group ...",
        "name": "add",
        "tagname": "method",
        "filename": "/Users/jamieavins/git/SDK/charts/src/draw/CompositeSprite.js",
        "return": {
          "doc": "\n",
          "type": "undefined"
        }
      },
      {
        "alias": null,
        "doc": "<p>Destroys the SpriteGroup</p>\n",
        "params": [

        ],
        "owner": "Ext.draw.CompositeSprite",
        "html_filename": "CompositeSprite.html",
        "inheritable": false,
        "href": "CompositeSprite.html#Ext-draw-CompositeSprite-method-destroy",
        "linenr": 265,
        "protected": false,
        "static": false,
        "private": false,
        "deprecated": null,
        "shortDoc": "Destroys the SpriteGroup ...",
        "name": "destroy",
        "tagname": "method",
        "filename": "/Users/jamieavins/git/SDK/charts/src/draw/CompositeSprite.js",
        "return": {
          "doc": "\n",
          "type": "undefined"
        }
      },
      {
        "alias": null,
        "doc": "<p>Returns the group bounding box.\nBehaves like <a href=\"#/api/Ext.draw.Sprite\" rel=\"Ext.draw.Sprite\" class=\"docClass\">Ext.draw.Sprite</a> getBBox method.</p>\n",
        "params": [

        ],
        "owner": "Ext.draw.CompositeSprite",
        "html_filename": "CompositeSprite.html",
        "inheritable": false,
        "href": "CompositeSprite.html#Ext-draw-CompositeSprite-method-getBBox",
        "linenr": 116,
        "protected": false,
        "static": false,
        "private": false,
        "deprecated": null,
        "shortDoc": "Returns the group bounding box. ...",
        "name": "getBBox",
        "tagname": "method",
        "filename": "/Users/jamieavins/git/SDK/charts/src/draw/CompositeSprite.js",
        "return": {
          "doc": "\n",
          "type": "undefined"
        }
      },
      {
        "alias": null,
        "doc": "<p>Hides all sprites. If the first parameter of the method is true\nthen a redraw will be forced for each sprite.</p>\n",
        "params": [
          {
            "doc": "\n",
            "type": "Object",
            "name": "redraw",
            "optional": false
          }
        ],
        "owner": "Ext.draw.CompositeSprite",
        "html_filename": "CompositeSprite.html",
        "inheritable": false,
        "href": "CompositeSprite.html#Ext-draw-CompositeSprite-method-hide",
        "linenr": 166,
        "protected": false,
        "static": false,
        "private": false,
        "deprecated": null,
        "shortDoc": "Hides all sprites. ...",
        "name": "hide",
        "tagname": "method",
        "filename": "/Users/jamieavins/git/SDK/charts/src/draw/CompositeSprite.js",
        "return": {
          "doc": "\n",
          "type": "undefined"
        }
      },
      {
        "alias": null,
        "doc": "<p>Remove a Sprite from the Group</p>\n",
        "params": [
          {
            "doc": "\n",
            "type": "Object",
            "name": "o",
            "optional": false
          }
        ],
        "owner": "Ext.draw.CompositeSprite",
        "html_filename": "CompositeSprite.html",
        "inheritable": false,
        "href": "CompositeSprite.html#Ext-draw-CompositeSprite-method-remove",
        "linenr": 101,
        "protected": false,
        "static": false,
        "private": false,
        "deprecated": null,
        "shortDoc": "Remove a Sprite from the Group ...",
        "name": "remove",
        "tagname": "method",
        "filename": "/Users/jamieavins/git/SDK/charts/src/draw/CompositeSprite.js",
        "return": {
          "doc": "\n",
          "type": "undefined"
        }
      },
      {
        "alias": null,
        "doc": "<p>Iterates through all sprites calling\n <code>setAttributes</code> on each one. For more information\n <a href=\"#/api/Ext.draw.Sprite\" rel=\"Ext.draw.Sprite\" class=\"docClass\">Ext.draw.Sprite</a> provides a description of the\n attributes that can be set with this method.</p>\n",
        "params": [
          {
            "doc": "\n",
            "type": "Object",
            "name": "attrs",
            "optional": false
          },
          {
            "doc": "\n",
            "type": "Object",
            "name": "redraw",
            "optional": false
          }
        ],
        "owner": "Ext.draw.CompositeSprite",
        "html_filename": "CompositeSprite.html",
        "inheritable": false,
        "href": "CompositeSprite.html#Ext-draw-CompositeSprite-method-setAttributes",
        "linenr": 149,
        "protected": false,
        "static": false,
        "private": false,
        "deprecated": null,
        "shortDoc": "Iterates through all sprites calling\n setAttributes on each one. ...",
        "name": "setAttributes",
        "tagname": "method",
        "filename": "/Users/jamieavins/git/SDK/charts/src/draw/CompositeSprite.js",
        "return": {
          "doc": "\n",
          "type": "undefined"
        }
      },
      {
        "alias": null,
        "doc": "<p>Shows all sprites. If the first parameter of the method is true\nthen a redraw will be forced for each sprite.</p>\n",
        "params": [
          {
            "doc": "\n",
            "type": "Object",
            "name": "redraw",
            "optional": false
          }
        ],
        "owner": "Ext.draw.CompositeSprite",
        "html_filename": "CompositeSprite.html",
        "inheritable": false,
        "href": "CompositeSprite.html#Ext-draw-CompositeSprite-method-show",
        "linenr": 181,
        "protected": false,
        "static": false,
        "private": false,
        "deprecated": null,
        "shortDoc": "Shows all sprites. ...",
        "name": "show",
        "tagname": "method",
        "filename": "/Users/jamieavins/git/SDK/charts/src/draw/CompositeSprite.js",
        "return": {
          "doc": "\n",
          "type": "undefined"
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
  "name": "Ext.draw.CompositeSprite",
  "component": false,
  "tagname": "class",
  "singleton": false,
  "filename": "/Users/jamieavins/git/SDK/charts/src/draw/CompositeSprite.js"
});