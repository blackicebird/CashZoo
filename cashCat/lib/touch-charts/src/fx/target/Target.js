/**
 * @class Ext.fx.target.Target

This class specifies a generic target for an animation. It provides a wrapper around a
series of different types of objects to allow for a generic animation API.
A target can be a single object or a Composite object containing other objects that are
to be animated. This class and it's subclasses are generally not created directly, the
underlying animation will create the appropriate Ext.fx.target.Target object by passing
the instance to be animated.

The following types of objects can be animated:
- {@link #Ext.fx.target.Component Components}
- {@link #Ext.fx.target.Element Elements}
- {@link #Ext.fx.target.Sprite Sprites}

 * @markdown
 * @abstract
 * @constructor
 * @param {Mixed} target The object to be animated
 */

Ext.fx.target.Target = Ext.extend(Object, {

    isAnimTarget: true,

    constructor: function(target) {
        this.target = target;
        this.id = this.getId();
    },

    getId: function() {
        return this.target.id;
    }
});
