Ext.data.JsonP.Ext_fx_Anim({
  "mixedInto": [

  ],
  "alias": null,
  "doc": "<p>This class manages animation for a specific <a href=\"#/api/Ext.fx.Anim-cfg-target\" rel=\"Ext.fx.Anim-cfg-target\" class=\"docClass\">target</a>. The animation allows\nanimation of various properties on the target, such as size, position, color and others.</p>\n\n<h2>Starting Conditions</h2>\n\n<p>The starting conditions for the animation are provided by the <a href=\"#/api/Ext.fx.Anim-cfg-from\" rel=\"Ext.fx.Anim-cfg-from\" class=\"docClass\">from</a> configuration.\nAny/all of the properties in the <a href=\"#/api/Ext.fx.Anim-cfg-from\" rel=\"Ext.fx.Anim-cfg-from\" class=\"docClass\">from</a> configuration can be specified. If a particular\nproperty is not defined, the starting value for that property will be read directly from the target.</p>\n\n<h2>End Conditions</h2>\n\n<p>The ending conditions for the animation are provided by the <a href=\"#/api/Ext.fx.Anim-cfg-to\" rel=\"Ext.fx.Anim-cfg-to\" class=\"docClass\">to</a> configuration. These mark\nthe final values once the animations has finished. The values in the <a href=\"#/api/Ext.fx.Anim-cfg-from\" rel=\"Ext.fx.Anim-cfg-from\" class=\"docClass\">from</a> can mirror\nthose in the <a href=\"#/api/Ext.fx.Anim-cfg-to\" rel=\"Ext.fx.Anim-cfg-to\" class=\"docClass\">to</a> configuration to provide a starting point.</p>\n\n<h2>Other Options</h2>\n\n<ul>\n<li><a href=\"#/api/Ext.fx.Anim-cfg-duration\" rel=\"Ext.fx.Anim-cfg-duration\" class=\"docClass\">duration</a>: Specifies the time period of the animation.</li>\n<li><a href=\"#/api/Ext.fx.Anim-cfg-easing\" rel=\"Ext.fx.Anim-cfg-easing\" class=\"docClass\">easing</a>: Specifies the easing of the animation.</li>\n<li><a href=\"#/api/Ext.fx.Anim-cfg-iterations\" rel=\"Ext.fx.Anim-cfg-iterations\" class=\"docClass\">iterations</a>: Allows the animation to repeat a number of times.</li>\n<li><a href=\"#/api/Ext.fx.Anim-cfg-alternate\" rel=\"Ext.fx.Anim-cfg-alternate\" class=\"docClass\">alternate</a>: Used in conjunction with <a href=\"#/api/Ext.fx.Anim-cfg-iterations\" rel=\"Ext.fx.Anim-cfg-iterations\" class=\"docClass\">iterations</a>, reverses the direction every second iteration.</li>\n</ul>\n\n\n<h2>Example Code</h2>\n\n<pre><code>var myComponent = Ext.create('Ext.Component', {\n    renderTo: document.body,\n    width: 200,\n    height: 200,\n    style: 'border: 1px solid red;'\n});\n\nnew Ext.fx.Anim({\n    target: myComponent,\n    duration: 1000,\n    from: {\n        width: 400 //starting width 400\n    },\n    to: {\n        width: 300, //end width 300\n        height: 300 // end width 300\n    }\n});\n</code></pre>\n",
  "allMixins": [

  ],
  "mixins": [

  ],
  "html_filename": "Anim.html",
  "inheritable": false,
  "author": null,
  "code_type": "assignment",
  "href": "Anim.html#Ext-fx-Anim",
  "subclasses": [

  ],
  "superclasses": [

  ],
  "linenr": 1,
  "alternateClassNames": [

  ],
  "protected": false,
  "static": false,
  "extends": "Ext.util.Observable",
  "docauthor": null,
  "members": {
    "property": [
      {
        "alias": null,
        "type": "int",
        "doc": "<p>Current iteration the animation is running.</p>\n",
        "owner": "Ext.fx.Anim",
        "html_filename": "Anim.html",
        "inheritable": false,
        "href": "Anim.html#Ext-fx-Anim-property-currentIteration",
        "linenr": 162,
        "protected": false,
        "static": false,
        "private": false,
        "deprecated": null,
        "name": "currentIteration",
        "tagname": "property",
        "filename": "/Users/jamieavins/git/SDK/charts/src/fx/Anim.js"
      },
      {
        "alias": null,
        "type": "boolean",
        "doc": "<p>Flag to determine if the animation is paused. Only set this to true if you need to\nkeep the Anim instance around to be unpaused later; otherwise call end.</p>\n",
        "owner": "Ext.fx.Anim",
        "html_filename": "Anim.html",
        "inheritable": false,
        "href": "Anim.html#Ext-fx-Anim-property-paused",
        "linenr": 141,
        "protected": false,
        "static": false,
        "private": false,
        "deprecated": null,
        "shortDoc": "Flag to determine if the animation is paused. ...",
        "name": "paused",
        "tagname": "property",
        "filename": "/Users/jamieavins/git/SDK/charts/src/fx/Anim.js"
      },
      {
        "alias": null,
        "type": "boolean",
        "doc": "<p>Flag to determine if the animation has started</p>\n",
        "owner": "Ext.fx.Anim",
        "html_filename": "Anim.html",
        "inheritable": false,
        "href": "Anim.html#Ext-fx-Anim-property-running",
        "linenr": 134,
        "protected": false,
        "static": false,
        "private": false,
        "deprecated": null,
        "name": "running",
        "tagname": "property",
        "filename": "/Users/jamieavins/git/SDK/charts/src/fx/Anim.js"
      },
      {
        "alias": null,
        "type": "Date",
        "doc": "<p>Starting time of the animation.</p>\n",
        "owner": "Ext.fx.Anim",
        "html_filename": "Anim.html",
        "inheritable": false,
        "href": "Anim.html#Ext-fx-Anim-property-startTime",
        "linenr": 169,
        "protected": false,
        "static": false,
        "private": false,
        "deprecated": null,
        "name": "startTime",
        "tagname": "property",
        "filename": "/Users/jamieavins/git/SDK/charts/src/fx/Anim.js"
      }
    ],
    "css_var": [

    ],
    "css_mixin": [

    ],
    "method": [

    ],
    "cfg": [
      {
        "alias": null,
        "type": "Boolean",
        "doc": "<p>Used in conjunction with iterations to reverse the animation each time an iteration completes. Defaults to false.</p>\n",
        "owner": "Ext.fx.Anim",
        "html_filename": "Anim.html",
        "inheritable": false,
        "href": "Anim.html#Ext-fx-Anim-cfg-alternate",
        "linenr": 155,
        "protected": false,
        "static": false,
        "private": false,
        "deprecated": null,
        "shortDoc": "Used in conjunction with iterations to reverse the animation each time an iteration completes. ...",
        "name": "alternate",
        "tagname": "cfg",
        "filename": "/Users/jamieavins/git/SDK/charts/src/fx/Anim.js"
      },
      {
        "alias": null,
        "type": "Number",
        "doc": "<p>Time to delay before starting the animation. Defaults to 0.</p>\n",
        "owner": "Ext.fx.Anim",
        "html_filename": "Anim.html",
        "inheritable": false,
        "href": "Anim.html#Ext-fx-Anim-cfg-delay",
        "linenr": 54,
        "protected": false,
        "static": false,
        "private": false,
        "deprecated": null,
        "shortDoc": "Time to delay before starting the animation. ...",
        "name": "delay",
        "tagname": "cfg",
        "filename": "/Users/jamieavins/git/SDK/charts/src/fx/Anim.js"
      },
      {
        "alias": null,
        "type": "Number",
        "doc": "<p>Time in milliseconds for a single animation to last. Defaults to 250. If the <a href=\"#/api/Ext.fx.Anim-cfg-iterations\" rel=\"Ext.fx.Anim-cfg-iterations\" class=\"docClass\">iterations</a> property is\nspecified, then each animate will take the same duration for each iteration.</p>\n",
        "owner": "Ext.fx.Anim",
        "html_filename": "Anim.html",
        "inheritable": false,
        "href": "Anim.html#Ext-fx-Anim-cfg-duration",
        "linenr": 47,
        "protected": false,
        "static": false,
        "private": false,
        "deprecated": null,
        "shortDoc": "Time in milliseconds for a single animation to last. ...",
        "name": "duration",
        "tagname": "cfg",
        "filename": "/Users/jamieavins/git/SDK/charts/src/fx/Anim.js"
      },
      {
        "alias": null,
        "type": "Boolean",
        "doc": "<p>Currently only for Component Animation: Only set a component's outer element size bypassing layouts.  Set to true to do full layouts for every frame of the animation.  Defaults to false.</p>\n",
        "owner": "Ext.fx.Anim",
        "html_filename": "Anim.html",
        "inheritable": false,
        "href": "Anim.html#Ext-fx-Anim-cfg-dynamic",
        "linenr": 63,
        "protected": false,
        "static": false,
        "private": false,
        "deprecated": null,
        "shortDoc": "Currently only for Component Animation: Only set a component's outer element size bypassing layouts. ...",
        "name": "dynamic",
        "tagname": "cfg",
        "filename": "/Users/jamieavins/git/SDK/charts/src/fx/Anim.js"
      },
      {
        "alias": null,
        "type": "String",
        "doc": "<p>This describes how the intermediate values used during a transition will be calculated. It allows for a transition to change\nspeed over its duration.</p>\n\n<pre><code>     -backIn\n     -backOut\n     -bounceIn\n     -bounceOut\n     -ease\n     -easeIn\n     -easeOut\n     -easeInOut\n     -elasticIn\n     -elasticOut\n     -cubic-bezier(x1, y1, x2, y2)\n</code></pre>\n\n<p>Note that cubic-bezier will create a custom easing curve following the CSS3 transition-timing-function specification <code>http://www.w3.org/TR/css3-transitions/.function_tag</code>. The four values specify points P1 and P2 of the curve\nas (x1, y1, x2, y2). All values must be in the range [0, 1] or the definition is invalid.</p>\n",
        "owner": "Ext.fx.Anim",
        "html_filename": "Anim.html",
        "inheritable": false,
        "href": "Anim.html#Ext-fx-Anim-cfg-easing",
        "linenr": 69,
        "protected": false,
        "static": false,
        "private": false,
        "deprecated": null,
        "shortDoc": "This describes how the intermediate values used during a transition will be calculated. ...",
        "name": "easing",
        "tagname": "cfg",
        "filename": "/Users/jamieavins/git/SDK/charts/src/fx/Anim.js"
      },
      {
        "alias": null,
        "type": "Object",
        "doc": "<p>An object containing property/value pairs for the beginning of the animation.  If not specified, the current state of the\nExt.fx.target will be used. For example:</p>\n\n<pre><code>from : {\n    opacity: 0,       // Transparent\n    color: '#ffffff', // White\n    left: 0\n}\n</code></pre>\n\n",
        "owner": "Ext.fx.Anim",
        "html_filename": "Anim.html",
        "inheritable": false,
        "href": "Anim.html#Ext-fx-Anim-cfg-from",
        "linenr": 191,
        "protected": false,
        "static": false,
        "private": false,
        "deprecated": null,
        "shortDoc": "An object containing property/value pairs for the beginning of the animation. ...",
        "name": "from",
        "tagname": "cfg",
        "filename": "/Users/jamieavins/git/SDK/charts/src/fx/Anim.js"
      },
      {
        "alias": null,
        "type": "int",
        "doc": "<p>Number of times to execute the animation. Defaults to 1.</p>\n",
        "owner": "Ext.fx.Anim",
        "html_filename": "Anim.html",
        "inheritable": false,
        "href": "Anim.html#Ext-fx-Anim-cfg-iterations",
        "linenr": 149,
        "protected": false,
        "static": false,
        "private": false,
        "deprecated": null,
        "shortDoc": "Number of times to execute the animation. ...",
        "name": "iterations",
        "tagname": "cfg",
        "filename": "/Users/jamieavins/git/SDK/charts/src/fx/Anim.js"
      },
      {
        "alias": null,
        "type": "Object",
        "doc": "<p>Animation keyframes follow the CSS3 Animation configuration pattern. 'from' is always considered '0%' and 'to'\nis considered '100%'.<b>Every keyframe declaration must have a keyframe rule for 0% and 100%, possibly defined using\n\"from\" or \"to\"</b>.  A keyframe declaration without these keyframe selectors is invalid and will not be available for\nanimation.  The keyframe declaration for a keyframe rule consists of properties and values. Properties that are unable to\nbe animated are ignored in these rules, with the exception of 'easing' which can be changed at each keyframe. For example:</p>\n\n<pre><code>keyframes : {\n    '0%': {\n        left: 100\n    },\n    '40%': {\n        left: 150\n    },\n    '60%': {\n        left: 75\n    },\n    '100%': {\n        left: 100\n    }\n}\n </code></pre>\n\n",
        "owner": "Ext.fx.Anim",
        "html_filename": "Anim.html",
        "inheritable": false,
        "href": "Anim.html#Ext-fx-Anim-cfg-keyframes",
        "linenr": 92,
        "protected": false,
        "static": false,
        "private": false,
        "deprecated": null,
        "shortDoc": "Animation keyframes follow the CSS3 Animation configuration pattern. ...",
        "name": "keyframes",
        "tagname": "cfg",
        "filename": "/Users/jamieavins/git/SDK/charts/src/fx/Anim.js"
      },
      {
        "alias": null,
        "type": "Boolean",
        "doc": "<p>Run the animation from the end to the beginning\nDefaults to false.</p>\n",
        "owner": "Ext.fx.Anim",
        "html_filename": "Anim.html",
        "inheritable": false,
        "href": "Anim.html#Ext-fx-Anim-cfg-reverse",
        "linenr": 127,
        "protected": false,
        "static": false,
        "private": false,
        "deprecated": null,
        "name": "reverse",
        "tagname": "cfg",
        "filename": "/Users/jamieavins/git/SDK/charts/src/fx/Anim.js"
      },
      {
        "alias": null,
        "type": "String/Object",
        "doc": "<p>The <a href=\"#/api/Ext.fx.target.Target\" rel=\"Ext.fx.target.Target\" class=\"docClass\">Ext.fx.target.Target</a> to apply the animation to.  This should only be specified when creating an <a href=\"#/api/Ext.fx.Anim\" rel=\"Ext.fx.Anim\" class=\"docClass\">Ext.fx.Anim</a> directly.\nThe target does not need to be a <a href=\"#/api/Ext.fx.target.Target\" rel=\"Ext.fx.target.Target\" class=\"docClass\">Ext.fx.target.Target</a> instance, it can be the underlying object. For example, you can\npass a Component, Element or Sprite as the target and the Anim will create the appropriate <a href=\"#/api/Ext.fx.target.Target\" rel=\"Ext.fx.target.Target\" class=\"docClass\">Ext.fx.target.Target</a> object\nautomatically.</p>\n",
        "owner": "Ext.fx.Anim",
        "html_filename": "Anim.html",
        "inheritable": false,
        "href": "Anim.html#Ext-fx-Anim-cfg-target",
        "linenr": 183,
        "protected": false,
        "static": false,
        "private": false,
        "deprecated": null,
        "shortDoc": "The Ext.fx.target.Target to apply the animation to. ...",
        "name": "target",
        "tagname": "cfg",
        "filename": "/Users/jamieavins/git/SDK/charts/src/fx/Anim.js"
      },
      {
        "alias": null,
        "type": "Object",
        "doc": "<p>An object containing property/value pairs for the end of the animation. For example:</p>\n\n<pre><code> to : {\n     opacity: 1,       // Opaque\n     color: '#00ff00', // Green\n     left: 500\n }\n </code></pre>\n\n",
        "owner": "Ext.fx.Anim",
        "html_filename": "Anim.html",
        "inheritable": false,
        "href": "Anim.html#Ext-fx-Anim-cfg-to",
        "linenr": 204,
        "protected": false,
        "static": false,
        "private": false,
        "deprecated": null,
        "shortDoc": "An object containing property/value pairs for the end of the animation. ...",
        "name": "to",
        "tagname": "cfg",
        "filename": "/Users/jamieavins/git/SDK/charts/src/fx/Anim.js"
      }
    ],
    "event": [
      {
        "alias": null,
        "doc": "<p>Fires when the animation is complete.</p>\n",
        "params": [
          {
            "doc": "\n",
            "type": "Ext.fx.Anim",
            "name": "this",
            "optional": false
          },
          {
            "doc": "\n",
            "type": "Date",
            "name": "startTime",
            "optional": false
          }
        ],
        "owner": "Ext.fx.Anim",
        "html_filename": "Anim.html",
        "inheritable": false,
        "href": "Anim.html#Ext-fx-Anim-event-afteranimate",
        "linenr": 251,
        "protected": false,
        "static": false,
        "private": false,
        "deprecated": null,
        "shortDoc": "Fires when the animation is complete. ...",
        "name": "afteranimate",
        "tagname": "event",
        "filename": "/Users/jamieavins/git/SDK/charts/src/fx/Anim.js"
      },
      {
        "alias": null,
        "doc": "<p>Fires before the animation starts. A handler can return false to cancel the animation.</p>\n",
        "params": [
          {
            "doc": "\n",
            "type": "Ext.fx.Anim",
            "name": "this",
            "optional": false
          }
        ],
        "owner": "Ext.fx.Anim",
        "html_filename": "Anim.html",
        "inheritable": false,
        "href": "Anim.html#Ext-fx-Anim-event-beforeanimate",
        "linenr": 245,
        "protected": false,
        "static": false,
        "private": false,
        "deprecated": null,
        "shortDoc": "Fires before the animation starts. ...",
        "name": "beforeanimate",
        "tagname": "event",
        "filename": "/Users/jamieavins/git/SDK/charts/src/fx/Anim.js"
      },
      {
        "alias": null,
        "doc": "<p>Fires when the animation's last frame has been set.</p>\n",
        "params": [
          {
            "doc": "\n",
            "type": "Ext.fx.Anim",
            "name": "this",
            "optional": false
          },
          {
            "doc": "\n",
            "type": "Date",
            "name": "startTime",
            "optional": false
          }
        ],
        "owner": "Ext.fx.Anim",
        "html_filename": "Anim.html",
        "inheritable": false,
        "href": "Anim.html#Ext-fx-Anim-event-lastframe",
        "linenr": 258,
        "protected": false,
        "static": false,
        "private": false,
        "deprecated": null,
        "shortDoc": "Fires when the animation's last frame has been set. ...",
        "name": "lastframe",
        "tagname": "event",
        "filename": "/Users/jamieavins/git/SDK/charts/src/fx/Anim.js"
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
  "name": "Ext.fx.Anim",
  "component": false,
  "tagname": "class",
  "singleton": false,
  "filename": "/Users/jamieavins/git/SDK/charts/src/fx/Anim.js"
});