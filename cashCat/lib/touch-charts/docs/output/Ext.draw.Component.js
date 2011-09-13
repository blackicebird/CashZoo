Ext.data.JsonP.Ext_draw_Component({
  "mixedInto": [

  ],
  "alias": null,
  "doc": "<p>The Draw Component is a surface in which sprites can be rendered. The Draw Component\nmanages and holds a <code>Surface</code> instance: an interface that has\nan SVG or VML implementation depending on the browser capabilities and where\nSprites can be appended.\n<p><img src=\"doc-resources/Ext.draw.Component/Ext.draw.Component.png\" alt=\"Ext.draw.Component component\"></p>\nOne way to create a draw component is:</p>\n\n<pre><code>var drawComponent = Ext.create('Ext.draw.Component', {\n    viewBox: false,\n    items: [{\n        type: 'circle',\n        fill: '#79BB3F',\n        radius: 100,\n        x: 100,\n        y: 100\n    }]\n});\n\nExt.create('Ext.Window', {\n    width: 215,\n    height: 235,\n    layout: 'fit',\n    items: [drawComponent]\n}).show();\n</code></pre>\n\n<p>In this case we created a draw component and added a sprite to it.\nThe <em>type</em> of the sprite is <em>circle</em> so if you run this code you'll see a yellow-ish\ncircle in a Window. When setting <code>viewBox</code> to <code>false</code> we are responsible for setting the object's position and\ndimensions accordingly.</p>\n\n<p>You can also add sprites by using the surface's add method:</p>\n\n<pre><code>drawComponent.surface.add({\n    type: 'circle',\n    fill: '#79BB3F',\n    radius: 100,\n    x: 100,\n    y: 100\n});\n</code></pre>\n\n<p>For more information on Sprites, the core elements added to a draw component's surface,\nrefer to the <a href=\"#/api/Ext.draw.Sprite\" rel=\"Ext.draw.Sprite\" class=\"docClass\">Ext.draw.Sprite</a> documentation.</p>\n",
  "allMixins": [

  ],
  "mixins": [

  ],
  "html_filename": "Component.html",
  "inheritable": false,
  "author": null,
  "code_type": "assignment",
  "href": "Component.html#Ext-draw-Component",
  "subclasses": [
    "Ext.chart.Chart"
  ],
  "superclasses": [

  ],
  "linenr": 1,
  "alternateClassNames": [

  ],
  "protected": false,
  "static": false,
  "extends": "Ext.Component",
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
      }
    ],
    "cfg": [
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
  "name": "Ext.draw.Component",
  "component": false,
  "tagname": "class",
  "singleton": false,
  "filename": "/Users/jamieavins/git/SDK/charts/src/draw/Component.js"
});