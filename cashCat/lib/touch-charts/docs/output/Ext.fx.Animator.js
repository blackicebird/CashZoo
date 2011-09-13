Ext.data.JsonP.Ext_fx_Animator({
  "mixedInto": [

  ],
  "alias": null,
  "doc": "<p>Animation instance</p>\n\n<p>This class is used to run keyframe based animations, which follows the CSS3 based animation structure.\nKeyframe animations differ from typical from/to animations in that they offer the ability to specify values\nat various points throughout the animation.</p>\n\n<p><strong>Using Keyframes</strong>\nThe <a href=\"#/api/Ext.fx.Animator-cfg-keyframes\" rel=\"Ext.fx.Animator-cfg-keyframes\" class=\"docClass\">keyframes</a> option is the most important part of specifying an animation when using this\nclass. A key frame is a point in a particular animation. We represent this as a percentage of the\ntotal animation duration. At each key frame, we can specify the target values at that time. Note that\nyou <em>must</em> specify the values at 0% and 100%, the start and ending values. There is also a keyframe\nevent that fires after each key frame is reached.</p>\n\n<p><strong>Example Usage</strong>\nIn the example below, we modify the values of the element at each fifth throughout the animation.</p>\n\n<pre><code>Ext.create('Ext.fx.Animator', {\n    target: Ext.getBody().createChild({\n        style: {\n            width: '100px',\n            height: '100px',\n            'background-color': 'red'\n        }\n    }),\n    duration: 10000, // 10 seconds\n    keyframes: {\n        0: {\n            opacity: 1,\n            backgroundColor: 'FF0000'\n        },\n        20: {\n            x: 30,\n            opacity: 0.5\n        },\n        40: {\n            x: 130,\n            backgroundColor: '0000FF'\n        },\n        60: {\n            y: 80,\n            opacity: 0.3\n        },\n        80: {\n            width: 200,\n            y: 200\n        },\n        100: {\n            opacity: 1,\n            backgroundColor: '00FF00'\n        }\n    }\n});\n</code></pre>\n",
  "allMixins": [

  ],
  "mixins": [

  ],
  "html_filename": "Animator.html",
  "inheritable": false,
  "author": null,
  "code_type": "assignment",
  "href": "Animator.html#Ext-fx-Animator",
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
        "owner": "Ext.fx.Animator",
        "html_filename": "Animator.html",
        "inheritable": false,
        "href": "Animator.html#Ext-fx-Animator-property-currentIteration",
        "linenr": 134,
        "protected": false,
        "static": false,
        "private": false,
        "deprecated": null,
        "name": "currentIteration",
        "tagname": "property",
        "filename": "/Users/jamieavins/git/SDK/charts/src/fx/Animator.js"
      },
      {
        "alias": null,
        "type": "Number",
        "doc": "<p>Current keyframe step of the animation.</p>\n",
        "owner": "Ext.fx.Animator",
        "html_filename": "Animator.html",
        "inheritable": false,
        "href": "Animator.html#Ext-fx-Animator-property-keyframeStep",
        "linenr": 141,
        "protected": false,
        "static": false,
        "private": false,
        "deprecated": null,
        "name": "keyframeStep",
        "tagname": "property",
        "filename": "/Users/jamieavins/git/SDK/charts/src/fx/Animator.js"
      },
      {
        "alias": null,
        "type": "boolean",
        "doc": "<p>Flag to determine if the animation is paused. Only set this to true if you need to\nkeep the Anim instance around to be unpaused later; otherwise call end.</p>\n",
        "owner": "Ext.fx.Animator",
        "html_filename": "Animator.html",
        "inheritable": false,
        "href": "Animator.html#Ext-fx-Animator-property-paused",
        "linenr": 115,
        "protected": false,
        "static": false,
        "private": false,
        "deprecated": null,
        "shortDoc": "Flag to determine if the animation is paused. ...",
        "name": "paused",
        "tagname": "property",
        "filename": "/Users/jamieavins/git/SDK/charts/src/fx/Animator.js"
      },
      {
        "alias": null,
        "type": "boolean",
        "doc": "<p>Flag to determine if the animation has started</p>\n",
        "owner": "Ext.fx.Animator",
        "html_filename": "Animator.html",
        "inheritable": false,
        "href": "Animator.html#Ext-fx-Animator-property-running",
        "linenr": 108,
        "protected": false,
        "static": false,
        "private": false,
        "deprecated": null,
        "name": "running",
        "tagname": "property",
        "filename": "/Users/jamieavins/git/SDK/charts/src/fx/Animator.js"
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
        "type": "Number",
        "doc": "<p>Time to delay before starting the animation. Defaults to 0.</p>\n",
        "owner": "Ext.fx.Animator",
        "html_filename": "Animator.html",
        "inheritable": false,
        "href": "Animator.html#Ext-fx-Animator-cfg-delay",
        "linenr": 68,
        "protected": false,
        "static": false,
        "private": false,
        "deprecated": null,
        "shortDoc": "Time to delay before starting the animation. ...",
        "name": "delay",
        "tagname": "cfg",
        "filename": "/Users/jamieavins/git/SDK/charts/src/fx/Animator.js"
      },
      {
        "alias": null,
        "type": "Number",
        "doc": "<p>Time in milliseconds for the animation to last. Defaults to 250.</p>\n",
        "owner": "Ext.fx.Animator",
        "html_filename": "Animator.html",
        "inheritable": false,
        "href": "Animator.html#Ext-fx-Animator-cfg-duration",
        "linenr": 62,
        "protected": false,
        "static": false,
        "private": false,
        "deprecated": null,
        "shortDoc": "Time in milliseconds for the animation to last. ...",
        "name": "duration",
        "tagname": "cfg",
        "filename": "/Users/jamieavins/git/SDK/charts/src/fx/Animator.js"
      },
      {
        "alias": null,
        "type": "Boolean",
        "doc": "<p>Currently only for Component Animation: Only set a component's outer element size bypassing layouts.  Set to true to do full layouts for every frame of the animation.  Defaults to false.</p>\n",
        "owner": "Ext.fx.Animator",
        "html_filename": "Animator.html",
        "inheritable": false,
        "href": "Animator.html#Ext-fx-Animator-cfg-dynamic",
        "linenr": 77,
        "protected": false,
        "static": false,
        "private": false,
        "deprecated": null,
        "shortDoc": "Currently only for Component Animation: Only set a component's outer element size bypassing layouts. ...",
        "name": "dynamic",
        "tagname": "cfg",
        "filename": "/Users/jamieavins/git/SDK/charts/src/fx/Animator.js"
      },
      {
        "alias": null,
        "type": "String",
        "doc": "<p>This describes how the intermediate values used during a transition will be calculated. It allows for a transition to change\nspeed over its duration.</p>\n\n<ul>\n<li>backIn</li>\n<li>backOut</li>\n<li>bounceIn</li>\n<li>bounceOut</li>\n<li>ease</li>\n<li>easeIn</li>\n<li>easeOut</li>\n<li>easeInOut</li>\n<li>elasticIn</li>\n<li>elasticOut</li>\n<li>cubic-bezier(x1, y1, x2, y2)</li>\n</ul>\n\n\n<p>Note that cubic-bezier will create a custom easing curve following the CSS3 transition-timing-function specification <code>http://www.w3.org/TR/css3-transitions/.function_tag</code>. The four values specify points P1 and P2 of the curve\nas (x1, y1, x2, y2). All values must be in the range [0, 1] or the definition is invalid.</p>\n",
        "owner": "Ext.fx.Animator",
        "html_filename": "Animator.html",
        "inheritable": false,
        "href": "Animator.html#Ext-fx-Animator-cfg-easing",
        "linenr": 83,
        "protected": false,
        "static": false,
        "private": false,
        "deprecated": null,
        "shortDoc": "This describes how the intermediate values used during a transition will be calculated. ...",
        "name": "easing",
        "tagname": "cfg",
        "filename": "/Users/jamieavins/git/SDK/charts/src/fx/Animator.js"
      },
      {
        "alias": null,
        "type": "Number",
        "doc": "<p>Number of times to execute the animation. Defaults to 1.</p>\n",
        "owner": "Ext.fx.Animator",
        "html_filename": "Animator.html",
        "inheritable": false,
        "href": "Animator.html#Ext-fx-Animator-cfg-iterations",
        "linenr": 128,
        "protected": false,
        "static": false,
        "private": false,
        "deprecated": null,
        "shortDoc": "Number of times to execute the animation. ...",
        "name": "iterations",
        "tagname": "cfg",
        "filename": "/Users/jamieavins/git/SDK/charts/src/fx/Animator.js"
      },
      {
        "alias": null,
        "type": "Object",
        "doc": "<p>Animation keyframes follow the CSS3 Animation configuration pattern. 'from' is always considered '0%' and 'to'\nis considered '100%'.<b>Every keyframe declaration must have a keyframe rule for 0% and 100%, possibly defined using\n\"from\" or \"to\"</b>.  A keyframe declaration without these keyframe selectors is invalid and will not be available for\nanimation.  The keyframe declaration for a keyframe rule consists of properties and values. Properties that are unable to\nbe animated are ignored in these rules, with the exception of 'easing' which can be changed at each keyframe. For example:</p>\n\n<pre><code>keyframes : {\n    '0%': {\n        left: 100\n    },\n    '40%': {\n        left: 150\n    },\n    '60%': {\n        left: 75\n    },\n    '100%': {\n        left: 100\n    }\n}\n </code></pre>\n\n",
        "owner": "Ext.fx.Animator",
        "html_filename": "Animator.html",
        "inheritable": false,
        "href": "Animator.html#Ext-fx-Animator-cfg-keyframes",
        "linenr": 159,
        "protected": false,
        "static": false,
        "private": false,
        "deprecated": null,
        "shortDoc": "Animation keyframes follow the CSS3 Animation configuration pattern. ...",
        "name": "keyframes",
        "tagname": "cfg",
        "filename": "/Users/jamieavins/git/SDK/charts/src/fx/Animator.js"
      },
      {
        "alias": null,
        "type": "Ext.fx.target",
        "doc": "<p>The Ext.fx.target to apply the animation to.  If not specified during initialization, this can be passed to the applyAnimator\nmethod to apply the same animation to many targets.</p>\n",
        "owner": "Ext.fx.Animator",
        "html_filename": "Animator.html",
        "inheritable": false,
        "href": "Animator.html#Ext-fx-Animator-cfg-target",
        "linenr": 153,
        "protected": false,
        "static": false,
        "private": false,
        "deprecated": null,
        "shortDoc": "The Ext.fx.target to apply the animation to. ...",
        "name": "target",
        "tagname": "cfg",
        "filename": "/Users/jamieavins/git/SDK/charts/src/fx/Animator.js"
      }
    ],
    "event": [
      {
        "alias": null,
        "doc": "<p>Fires when the animation is complete.</p>\n",
        "params": [
          {
            "doc": "\n",
            "type": "Ext.fx.Animator",
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
        "owner": "Ext.fx.Animator",
        "html_filename": "Animator.html",
        "inheritable": false,
        "href": "Animator.html#Ext-fx-Animator-event-afteranimate",
        "linenr": 202,
        "protected": false,
        "static": false,
        "private": false,
        "deprecated": null,
        "shortDoc": "Fires when the animation is complete. ...",
        "name": "afteranimate",
        "tagname": "event",
        "filename": "/Users/jamieavins/git/SDK/charts/src/fx/Animator.js"
      },
      {
        "alias": null,
        "doc": "<p>Fires before the animation starts. A handler can return false to cancel the animation.</p>\n",
        "params": [
          {
            "doc": "\n",
            "type": "Ext.fx.Animator",
            "name": "this",
            "optional": false
          }
        ],
        "owner": "Ext.fx.Animator",
        "html_filename": "Animator.html",
        "inheritable": false,
        "href": "Animator.html#Ext-fx-Animator-event-beforeanimate",
        "linenr": 189,
        "protected": false,
        "static": false,
        "private": false,
        "deprecated": null,
        "shortDoc": "Fires before the animation starts. ...",
        "name": "beforeanimate",
        "tagname": "event",
        "filename": "/Users/jamieavins/git/SDK/charts/src/fx/Animator.js"
      },
      {
        "alias": null,
        "doc": "<p>Fires at each keyframe.</p>\n",
        "params": [
          {
            "doc": "\n",
            "type": "Ext.fx.Animator",
            "name": "this",
            "optional": false
          },
          {
            "doc": "<p>step number</p>\n",
            "type": "Number",
            "name": "keyframe",
            "optional": false
          }
        ],
        "owner": "Ext.fx.Animator",
        "html_filename": "Animator.html",
        "inheritable": false,
        "href": "Animator.html#Ext-fx-Animator-event-keyframe",
        "linenr": 195,
        "protected": false,
        "static": false,
        "private": false,
        "deprecated": null,
        "shortDoc": "Fires at each keyframe. ...",
        "name": "keyframe",
        "tagname": "event",
        "filename": "/Users/jamieavins/git/SDK/charts/src/fx/Animator.js"
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
  "name": "Ext.fx.Animator",
  "component": false,
  "tagname": "class",
  "singleton": false,
  "filename": "/Users/jamieavins/git/SDK/charts/src/fx/Animator.js"
});