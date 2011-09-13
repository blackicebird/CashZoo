/**
 * @class Ext.fx.Queue
 * Animation Queue mixin to handle chaining and queueing by target.
 * @private
 */

Ext.ns('Ext.fx.target');

Ext.fx.Queue = {

    constructor: function() {
        this.targets = new Ext.util.HashMap();
        this.fxQueue = {};
    },

    // @private
    getFxDefaults: function(targetId) {
        var target = this.targets.get(targetId);
        if (target) {
            return target.fxDefaults;
        }
        return {};
    },

    // @private
    setFxDefaults: function(targetId, obj) {
        var target = this.targets.get(targetId);
        if (target) {
            target.fxDefaults = Ext.apply(target.fxDefaults || {}, obj);
        }
    },

    // @private
    stopAnimation: function(targetId) {
        var me = this,
            queue = me.getFxQueue(targetId),
            ln = queue.length;
        while (ln) {
            queue[ln - 1].end();
            ln--;
        }
    },

    /**
     * @private
     * Returns current animation object if the element has any effects actively running or queued, else returns false.
     */
    getActiveAnimation: function(targetId) {
        var queue = this.getFxQueue(targetId);
        return (queue && !!queue.length) ? queue[0] : false;
    },

    // @private
    hasFxBlock: function(targetId) {
        var queue = this.getFxQueue(targetId);
        return queue && queue[0] && queue[0].block;
    },

    // @private get fx queue for passed target, create if needed.
    getFxQueue: function(targetId) {
        if (!targetId) {
            return false;
        }
        var me = this,
            queue = me.fxQueue[targetId],
            target = me.targets.get(targetId);

        if (!target) {
            return false;
        }

        if (!queue) {
            me.fxQueue[targetId] = [];
            // GarbageCollector will need to clean up Elements since they aren't currently observable
            if (target.type != 'element') {
                target.target.on('destroy', function() {
                    me.fxQueue[targetId] = [];
                });
            }
        }
        return me.fxQueue[targetId];
    },

    // @private
    queueFx: function(anim) {
        var me = this,
            target = anim.target,
            queue, ln;

        if (!target) {
            return;
        }

        queue = me.getFxQueue(target.getId());
        ln = queue.length;

        if (ln) {
            if (anim.concurrent) {
                anim.paused = false;
            }
            else {
                queue[ln - 1].on('afteranimate', function() {
                    anim.paused = false;
                });
            }
        }
        else {
            anim.paused = false;
        }
        anim.on('afteranimate', function() {
            // COMPAT 
            queue.remove(anim);
            if (anim.remove) {
                if (target.type == 'element') {
                    var el = Ext.get(target.id);
                    if (el) {
                        el.remove();
                    }
                }
            }
        }, this);
        queue.push(anim);
    }
};
/**
 * @class Ext.fx.Manager
 * Animation Manager which keeps track of all current animations and manages them on a frame by frame basis.
 * @private
 * @singleton
 */

Ext.fx.Manager = {

    constructor: function() {
        var me = this;
        me.items = new Ext.util.MixedCollection();
        me.addEvents(
            /**
             * @event framebegin
             * Fires before the frame starts.
             */
            'framebegin',
             /**
              * @event frameend
              * Fires when the frame ends.
              */
            'frameend'
        );
        Ext.util.Observable.constructor.call(me);
        Ext.fx.Queue.constructor.call(me);
    },

    /**
     * @cfg {Number} interval Default interval in miliseconds to calculate each frame.  Defaults to 16ms (~60fps)
     */
    interval: 32,

    // @private Target factory
    createTarget: function(target) {
        var me = this,
            targetObj;

        if (Ext.isObject(target)) {
            // Draw Sprite
            if (target.isSprite) {
                targetObj = new Ext.fx.target.Sprite(target);
            }
            // Draw Sprite Composite
            else if (target.isCompositeSprite) {
                targetObj = new Ext.fx.target.CompositeSprite(target);
            }
            else if (target.isAnimTarget) {
                return target;
            }
            else {
                return null;
            }
            me.targets.add(targetObj);
            return targetObj;
        }
        else {
            return null;
        }
    },

    /**
     * Add an Anim to the manager. This is done automatically when an Anim instance is created.
     * @param {Ext.fx.Anim} anim
     */
    addAnim: function(anim) {
        var me = this,
            items = me.items,
            task = me.task;

        items.add(anim);

        // Start the timer if not already running
        if (!task && items.length) {
            me.task = setInterval(me.runner, me.interval);
        }
    },

    /**
     * Remove an Anim from the manager. This is done automatically when an Anim ends.
     * @param {Ext.fx.Anim} anim
     */
    removeAnim: function(anim) {
        var me = this,
            items = me.items,
            task = me.task;

        items.remove(anim);

        // Stop the timer if there are no more managed Anims
        if (task && !items.length) {
            clearInterval(task);
            delete me.task;
        }
    },

    /**
     * @private
     * Filter function to determine which animations need to be started
     */
    startingFilter: function(o) {
        return o.paused === false && o.running === false && o.iterations > 0;
    },

    /**
     * @private
     * Filter function to determine which animations are still running
     */
    runningFilter: function(o) {
        return o.paused === false && o.running === true && o.isAnimator !== true;
    },

    /**
     * @private
     * Runner function being called each frame
     */
    runner: function() {
        var me = Ext.fx.Manager,
            items = me.items;
        if (!me.running) {
            me.fireEvent('framebegin');
            me.running = true;
            me.targetData = {};
            me.targetArr = {};

            // Single timestamp for all animations this interval
            me.timestamp = new Date();

            // Start any items not current running
            items.filterBy(me.startingFilter).each(me.startAnim, me);

            // Build the new attributes to be applied for all targets in this frame
            items.filterBy(me.runningFilter).each(me.runAnim, me);

            // Apply all the pending changes to their targets
            me.applyPendingAttrs();
            me.fireEvent('frameend');
            me.running = false;
        }
    },

    /**
     * @private
     * Start the individual animation (initialization)
     */
    startAnim: function(anim) {
        anim.start(this.timestamp);
    },

    /**
     * @private
     * Run the individual animation for this frame
     */
    runAnim: function(anim) {
        if (!anim) {
            return;
        }
        var me = this,
            targetId = anim.target.getId(),
            elapsedTime = me.timestamp - anim.startTime;

        this.collectTargetData(anim, elapsedTime);

        // For JS animation, trigger the lastFrame handler if this is the final frame
        if (elapsedTime >= anim.duration) {
            me.applyPendingAttrs(true);
            delete me.targetData[targetId];
            delete me.targetArr[targetId];
            anim.lastFrame();
        }
    },

    /**
     * Collect target attributes for the given Anim object at the given timestamp
     * @param {Ext.fx.Anim} anim The Anim instance
     * @param {Number} elapsedTime Time after the anim's start time
     */
    collectTargetData: function(anim, elapsedTime) {
        var me = this,
            targetId = anim.target.getId(),
            targetData = me.targetData[targetId],
            data;

        if (!targetData) {
            targetData = me.targetData[targetId] = [];
            me.targetArr[targetId] = anim.target;
        }

        data = {
            duration: anim.duration,
            easing: anim.easing,
            attrs: {}
        };
        Ext.apply(data.attrs, anim.runAnim(elapsedTime));
        targetData.push(data);
    },

    /**
     * @private
     * Apply all pending attribute changes to their targets
     */
    applyPendingAttrs: function(isLastFrame) {
        var targetData = this.targetData,
            targetArr = this.targetArr,
            targetId;
        for (targetId in targetData) {
            if (targetData.hasOwnProperty(targetId)) {
                targetArr[targetId].setAttr(targetData[targetId], false, isLastFrame);
            }
        }
    }
};

Ext.applyIf(Ext.fx.Manager, Ext.fx.Queue);
Ext.applyIf(Ext.fx.Manager, Ext.util.Observable.prototype);
Ext.fx.Manager.constructor();

/**
 * @class Ext.fx.CubicBezier
 * @ignore
 */
Ext.fx.CubicBezier = {

    cubicBezierAtTime: function(t, p1x, p1y, p2x, p2y, duration) {
        var cx = 3 * p1x,
            bx = 3 * (p2x - p1x) - cx,
            ax = 1 - cx - bx,
            cy = 3 * p1y,
            by = 3 * (p2y - p1y) - cy,
            ay = 1 - cy - by;
        function sampleCurveX(t) {
            return ((ax * t + bx) * t + cx) * t;
        }
        function solve(x, epsilon) {
            var t = solveCurveX(x, epsilon);
            return ((ay * t + by) * t + cy) * t;
        }
        function solveCurveX(x, epsilon) {
            var t0, t1, t2, x2, d2, i;
            for (t2 = x, i = 0; i < 8; i++) {
                x2 = sampleCurveX(t2) - x;
                if (Math.abs(x2) < epsilon) {
                    return t2;
                }
                d2 = (3 * ax * t2 + 2 * bx) * t2 + cx;
                if (Math.abs(d2) < 1e-6) {
                    break;
                }
                t2 = t2 - x2 / d2;
            }
            t0 = 0;
            t1 = 1;
            t2 = x;
            if (t2 < t0) {
                return t0;
            }
            if (t2 > t1) {
                return t1;
            }
            while (t0 < t1) {
                x2 = sampleCurveX(t2);
                if (Math.abs(x2 - x) < epsilon) {
                    return t2;
                }
                if (x > x2) {
                    t0 = t2;
                } else {
                    t1 = t2;
                }
                t2 = (t1 - t0) / 2 + t0;
            }
            return t2;
        }
        return solve(t, 1 / (200 * duration));
    },

    cubicBezier: function(x1, y1, x2, y2) {
        var fn = function(pos) {
            return Ext.fx.CubicBezier.cubicBezierAtTime(pos, x1, y1, x2, y2, 1);
        };
        fn.toCSS3 = function() {
            return 'cubic-bezier(' + [x1, y1, x2, y2].join(',') + ')';
        };
        fn.reverse = function() {
            return Ext.fx.CubicBezier.cubicBezier(1 - x2, 1 - y2, 1 - x1, 1 - y1);
        };
        return fn;
    }
};
/**
 * @class Ext.fx.Easing
 *
This class contains a series of function definitions used to modify values during an animation.
They describe how the intermediate values used during a transition will be calculated. It allows for a transition to change
speed over its duration. The following options are available:

- linear The default easing type
- backIn
- backOut
- bounceIn
- bounceOut
- ease
- easeIn
- easeOut
- easeInOut
- elasticIn
- elasticOut
- cubic-bezier(x1, y1, x2, y2)

Note that cubic-bezier will create a custom easing curve following the CSS3 transition-timing-function specification `{@link http://www.w3.org/TR/css3-transitions/#transition-timing-function_tag}`. The four values specify points P1 and P2 of the curve
as (x1, y1, x2, y2). All values must be in the range [0, 1] or the definition is invalid.
 * @markdown
 * @singleton
 */

(Ext.fx.Easing = function() {
    var math = Math,
        pi = math.PI,
        pow = math.pow,
        sin = math.sin,
        sqrt = math.sqrt,
        abs = math.abs,
        backInSeed = 1.70158;

    Ext.apply(Ext.fx.Easing, {
        linear: function(n) {
            return n;
        },
        ease: function(n) {
            var q = 0.07813 - n / 2,
                Q = sqrt(0.0066 + q * q),
                x = Q - q,
                X = pow(abs(x), 1/3) * (x < 0 ? -1 : 1),
                y = -Q - q,
                Y = pow(abs(y), 1/3) * (y < 0 ? -1 : 1),
                t = X + Y + 0.25;
            return pow(1 - t, 2) * 3 * t * 0.1 + (1 - t) * 3 * t * t + t * t * t;
        },
        easeIn: function (n) {
            return pow(n, 1.7);
        },
        easeOut: function (n) {
            return pow(n, 0.48);
        },
        easeInOut: function(n) {
            var q = 0.48 - n / 1.04,
                Q = sqrt(0.1734 + q * q),
                x = Q - q,
                X = pow(abs(x), 1/3) * (x < 0 ? -1 : 1),
                y = -Q - q,
                Y = pow(abs(y), 1/3) * (y < 0 ? -1 : 1),
                t = X + Y + 0.5;
            return (1 - t) * 3 * t * t + t * t * t;
        },
        backIn: function (n) {
            return n * n * ((backInSeed + 1) * n - backInSeed);
        },
        backOut: function (n) {
            n = n - 1;
            return n * n * ((backInSeed + 1) * n + backInSeed) + 1;
        },
        elasticIn: function (n) {
            if (n === 0 || n === 1) {
                return n;
            }
            var p = 0.3,
                s = p / 4;
            return pow(2, -10 * n) * sin((n - s) * (2 * pi) / p) + 1;
        },
        elasticOut: function (n) {
            return 1 - Ext.fx.Easing.elasticIn(1 - n);
        },
        bounceIn: function (n) {
            return 1 - Ext.fx.Easing.bounceOut(1 - n);
        },
        bounceOut: function (n) {
            var s = 7.5625,
                p = 2.75,
                l;
            if (n < (1 / p)) {
                l = s * n * n;
            } else {
                if (n < (2 / p)) {
                    n -= (1.5 / p);
                    l = s * n * n + 0.75;
                } else {
                    if (n < (2.5 / p)) {
                        n -= (2.25 / p);
                        l = s * n * n + 0.9375;
                    } else {
                        n -= (2.625 / p);
                        l = s * n * n + 0.984375;
                    }
                }
            }
            return l;
        }
    });
    Ext.apply(Ext.fx.Easing, {
        'back-in': Ext.fx.Easing.backIn.prototype,
        'back-out': Ext.fx.Easing.backOut.prototype,
        'ease-in': Ext.fx.Easing.easeIn.prototype,
        'ease-out': Ext.fx.Easing.easeOut.prototype,
        'elastic-in': Ext.fx.Easing.elasticIn.prototype,
        'elastic-out': Ext.fx.Easing.elasticIn.prototype,
        'bounce-in': Ext.fx.Easing.bounceIn.prototype,
        'bounce-out': Ext.fx.Easing.bounceOut.prototype,
        'ease-in-out': Ext.fx.Easing.easeInOut.prototype
    });
})();
/**
 * @class Ext.fx.PropertyHandler
 * @ignore
 */
Ext.fx.PropertyHandler = {

    defaultHandler: {
        pixelDefaults: ['width', 'height', 'top', 'left'],
        unitRE: /^(-?\d*\.?\d*){1}(em|ex|px|in|cm|mm|pt|pc|%)*$/,

        computeDelta: function(from, end, damper, initial, attr) {
            damper = (typeof damper == 'number') ? damper : 1;
            var match = this.unitRE.exec(from),
                start, units;
            if (match) {
                from = match[1];
                units = match[2];
                // COMPAT Ext.Array.contains
                if (!units && this.pixelDefaults.indexOf(attr) !== -1) {
                    units = 'px';
                }
            }
            from = +from || 0;

            match = this.unitRE.exec(end);
            if (match) {
                end = match[1];
                units = match[2] || units;
            }
            end = +end || 0;
            start = (initial != null) ? initial : from;
            return {
                from: from,
                delta: (end - start) * damper,
                units: units
            };
        },

        get: function(from, end, damper, initialFrom, attr) {
            var ln = from.length,
                out = [],
                i, initial, res, j, len;
            for (i = 0; i < ln; i++) {
                if (initialFrom) {
                    initial = initialFrom[i][1].from;
                }
                if (Ext.isArray(from[i][1]) && Ext.isArray(end)) {
                    res = [];
                    j = 0;
                    len = from[i][1].length;
                    for (; j < len; j++) {
                        res.push(this.computeDelta(from[i][1][j], end[j], damper, initial, attr));
                    }
                    out.push([from[i][0], res]);
                }
                else {
                    out.push([from[i][0], this.computeDelta(from[i][1], end, damper, initial, attr)]);
                }
            }
            return out;
        },

        set: function(values, easing) {
            var ln = values.length,
                out = [],
                i, val, res, len, j;
            for (i = 0; i < ln; i++) {
                val  = values[i][1];
                if (Ext.isArray(val)) {
                    res = [];
                    j = 0;
                    len = val.length;
                    for (; j < len; j++) {
                        res.push(val[j].from + (val[j].delta * easing) + (val[j].units || 0));
                    }
                    out.push([values[i][0], res]);
                } else {
                    out.push([values[i][0], val.from + (val.delta * easing) + (val.units || 0)]);
                }
            }
            return out;
        }
    },
    color: {
        rgbRE: /^rgb\(([0-9]+)\s*,\s*([0-9]+)\s*,\s*([0-9]+)\)$/i,
        hexRE: /^#?([0-9A-F]{2})([0-9A-F]{2})([0-9A-F]{2})$/i,
        hex3RE: /^#?([0-9A-F]{1})([0-9A-F]{1})([0-9A-F]{1})$/i,

        parseColor : function(color, damper) {
            damper = (typeof damper == 'number') ? damper : 1;
            var base,
                out = false,
                match;

            Ext.each([this.hexRE, this.rgbRE, this.hex3RE], function(re, idx) {
                base = (idx % 2 == 0) ? 16 : 10;
                match = re.exec(color);
                if (match && match.length == 4) {
                    if (idx == 2) {
                        match[1] += match[1];
                        match[2] += match[2];
                        match[3] += match[3];
                    }
                    out = {
                        red: parseInt(match[1], base),
                        green: parseInt(match[2], base),
                        blue: parseInt(match[3], base)
                    };
                    return false;
                }
            });
            return out || color;
        },

        computeDelta: function(from, end, damper, initial) {
            from = this.parseColor(from);
            end = this.parseColor(end, damper);
            var start = initial ? initial : from,
                tfrom = typeof start,
                tend = typeof end;
            //Extra check for when the color string is not recognized.
            if (tfrom == 'string' ||  tfrom == 'undefined'
              || tend == 'string' || tend == 'undefined') {
                return end || start;
            }
            return {
                from:  from,
                delta: {
                    red: Math.round((end.red - start.red) * damper),
                    green: Math.round((end.green - start.green) * damper),
                    blue: Math.round((end.blue - start.blue) * damper)
                }
            };
        },

        get: function(start, end, damper, initialFrom) {
            var ln = start.length,
                out = [],
                i, initial;
            for (i = 0; i < ln; i++) {
                if (initialFrom) {
                    initial = initialFrom[i][1].from;
                }
                out.push([start[i][0], this.computeDelta(start[i][1], end, damper, initial)]);
            }
            return out;
        },

        set: function(values, easing) {
            var ln = values.length,
                out = [],
                i, val, parsedString, from, delta;
            for (i = 0; i < ln; i++) {
                val = values[i][1];
                if (val) {
                    from = val.from;
                    delta = val.delta;
                    //multiple checks to reformat the color if it can't recognized by computeDelta.
                    val = (typeof val == 'object' && 'red' in val)?
                            'rgb(' + val.red + ', ' + val.green + ', ' + val.blue + ')' : val;
                    val = (typeof val == 'object' && val.length)? val[0] : val;
                    if (typeof val == 'undefined') {
                        return [];
                    }
                    parsedString = typeof val == 'string'? val :
                        'rgb(' + [
                              (from.red + Math.round(delta.red * easing)) % 256,
                              (from.green + Math.round(delta.green * easing)) % 256,
                              (from.blue + Math.round(delta.blue * easing)) % 256
                          ].join(',') + ')';
                    out.push([
                        values[i][0],
                        parsedString
                    ]);
                }
            }
            return out;
        }
    },
    object: {
        interpolate: function(prop, damper) {
            damper = (typeof damper == 'number') ? damper : 1;
            var out = {},
                p;
            for(p in prop) {
                out[p] = parseFloat(prop[p], 10) * damper;
            }
            return out;
        },

        computeDelta: function(from, end, damper, initial) {
            from = this.interpolate(from);
            end = this.interpolate(end, damper);
            var start = initial ? initial : from,
                delta = {},
                p;

            for(p in end) {
                delta[p] = end[p] - start[p];
            }
            return {
                from:  from,
                delta: delta
            };
        },

        get: function(start, end, damper, initialFrom) {
            var ln = start.length,
                out = [],
                i, initial;
            for (i = 0; i < ln; i++) {
                if (initialFrom) {
                    initial = initialFrom[i][1].from;
                }
                out.push([start[i][0], this.computeDelta(start[i][1], end, damper, initial)]);
            }
            return out;
        },

        set: function(values, easing) {
            var ln = values.length,
                out = [],
                outObject = {},
                i, from, delta, val, p;
            for (i = 0; i < ln; i++) {
                val  = values[i][1];
                from = val.from;
                delta = val.delta;
                for (p in from) {
                    outObject[p] = Math.round(from[p] + delta[p] * easing);
                }
                out.push([
                    values[i][0],
                    outObject
                ]);
            }
            return out;
        }
    },

    path: {
        computeDelta: function(from, end, damper, initial) {
            damper = (typeof damper == 'number') ? damper : 1;
            var start;
            from = +from || 0;
            end = +end || 0;
            start = (initial != null) ? initial : from;
            return {
                from: from,
                delta: (end - start) * damper
            };
        },

        forcePath: function(path) {
            if (!Ext.isArray(path) && !Ext.isArray(path[0])) {
                path = Ext.draw.Draw.parsePathString(path);
            }
            return path;
        },

        get: function(start, end, damper, initialFrom) {
            var endPath = this.forcePath(end),
                out = [],
                startLn = start.length,
                startPathLn, pointsLn, i, deltaPath, initial, j, k, path, startPath;
            for (i = 0; i < startLn; i++) {
                startPath = this.forcePath(start[i][1]);

                deltaPath = Ext.draw.Draw.interpolatePaths(startPath, endPath);
                startPath = deltaPath[0];
                endPath = deltaPath[1];

                startPathLn = startPath.length;
                path = [];
                for (j = 0; j < startPathLn; j++) {
                    deltaPath = [startPath[j][0]];
                    pointsLn = startPath[j].length;
                    for (k = 1; k < pointsLn; k++) {
                        initial = initialFrom && initialFrom[0][1][j][k].from;
                        deltaPath.push(this.computeDelta(startPath[j][k], endPath[j][k], damper, initial));
                    }
                    path.push(deltaPath);
                }
                out.push([start[i][0], path]);
            }
            return out;
        },

        set: function(values, easing) {
            var ln = values.length,
                out = [],
                i, j, k, newPath, calcPath, deltaPath, deltaPathLn, pointsLn;
            for (i = 0; i < ln; i++) {
                deltaPath = values[i][1];
                newPath = [];
                deltaPathLn = deltaPath.length;
                for (j = 0; j < deltaPathLn; j++) {
                    calcPath = [deltaPath[j][0]];
                    pointsLn = deltaPath[j].length;
                    for (k = 1; k < pointsLn; k++) {
                        calcPath.push(deltaPath[j][k].from + deltaPath[j][k].delta * easing);
                    }
                    newPath.push(calcPath.join(','));
                }
                out.push([values[i][0], newPath.join(',')]);
            }
            return out;
        }
    }
};

Ext.each([
    'outlineColor',
    'backgroundColor',
    'borderColor',
    'borderTopColor',
    'borderRightColor',
    'borderBottomColor',
    'borderLeftColor',
    'fill',
    'stroke'
], function(prop) {
    Ext.fx.PropertyHandler[prop] = Ext.fx.PropertyHandler.color;
}, Ext.fx.PropertyHandler);
/**
 * @class Ext.fx.Animator
 * Animation instance

This class is used to run keyframe based animations, which follows the CSS3 based animation structure.
Keyframe animations differ from typical from/to animations in that they offer the ability to specify values
at various points throughout the animation.

__Using Keyframes__
The {@link #keyframes} option is the most important part of specifying an animation when using this
class. A key frame is a point in a particular animation. We represent this as a percentage of the
total animation duration. At each key frame, we can specify the target values at that time. Note that
you *must* specify the values at 0% and 100%, the start and ending values. There is also a {@link keyframe}
event that fires after each key frame is reached.

__Example Usage__
In the example below, we modify the values of the element at each fifth throughout the animation.

    Ext.create('Ext.fx.Animator', {
        target: Ext.getBody().createChild({
            style: {
                width: '100px',
                height: '100px',
                'background-color': 'red'
            }
        }),
        duration: 10000, // 10 seconds
        keyframes: {
            0: {
                opacity: 1,
                backgroundColor: 'FF0000'
            },
            20: {
                x: 30,
                opacity: 0.5
            },
            40: {
                x: 130,
                backgroundColor: '0000FF'
            },
            60: {
                y: 80,
                opacity: 0.3
            },
            80: {
                width: 200,
                y: 200
            },
            100: {
                opacity: 1,
                backgroundColor: '00FF00'
            }
        }
    });

 * @markdown
 */
Ext.fx.Animator = Ext.extend(Ext.util.Observable, {

    isAnimator: true,

    /**
     * @cfg {Number} duration
     * Time in milliseconds for the animation to last. Defaults to 250.
     */
    duration: 250,

    /**
     * @cfg {Number} delay
     * Time to delay before starting the animation. Defaults to 0.
     */
    delay: 0,

    /* private used to track a delayed starting time */
    delayStart: 0,

    /**
     * @cfg {Boolean} dynamic
     * Currently only for Component Animation: Only set a component's outer element size bypassing layouts.  Set to true to do full layouts for every frame of the animation.  Defaults to false.
     */
    dynamic: false,

    /**
     * @cfg {String} easing

This describes how the intermediate values used during a transition will be calculated. It allows for a transition to change
speed over its duration.

- backIn
- backOut
- bounceIn
- bounceOut
- ease
- easeIn
- easeOut
- easeInOut
- elasticIn
- elasticOut
- cubic-bezier(x1, y1, x2, y2)

Note that cubic-bezier will create a custom easing curve following the CSS3 transition-timing-function specification `{@link http://www.w3.org/TR/css3-transitions/#transition-timing-function_tag}`. The four values specify points P1 and P2 of the curve
as (x1, y1, x2, y2). All values must be in the range [0, 1] or the definition is invalid.

     * @markdown
     */
    easing: 'ease',

    /**
     * Flag to determine if the animation has started
     * @property running
     * @type boolean
     */
    running: false,

    /**
     * Flag to determine if the animation is paused. Only set this to true if you need to
     * keep the Anim instance around to be unpaused later; otherwise call {@link #end}.
     * @property paused
     * @type boolean
     */
    paused: false,

    /**
     * @private
     */
    damper: 1,

    /**
     * @cfg {Number} iterations
     * Number of times to execute the animation. Defaults to 1.
     */
    iterations: 1,

    /**
     * Current iteration the animation is running.
     * @property currentIteration
     * @type int
     */
    currentIteration: 0,

    /**
     * Current keyframe step of the animation.
     * @property keyframeStep
     * @type Number
     */
    keyframeStep: 0,

    /**
     * @private
     */
    animKeyFramesRE: /^(from|to|\d+%?)$/,

    /**
     * @cfg {Ext.fx.target} target
     * The Ext.fx.target to apply the animation to.  If not specified during initialization, this can be passed to the applyAnimator
     * method to apply the same animation to many targets.
     */

     /**
      * @cfg {Object} keyframes
      * Animation keyframes follow the CSS3 Animation configuration pattern. 'from' is always considered '0%' and 'to'
      * is considered '100%'.<b>Every keyframe declaration must have a keyframe rule for 0% and 100%, possibly defined using
      * "from" or "to"</b>.  A keyframe declaration without these keyframe selectors is invalid and will not be available for
      * animation.  The keyframe declaration for a keyframe rule consists of properties and values. Properties that are unable to
      * be animated are ignored in these rules, with the exception of 'easing' which can be changed at each keyframe. For example:
 <pre><code>
keyframes : {
    '0%': {
        left: 100
    },
    '40%': {
        left: 150
    },
    '60%': {
        left: 75
    },
    '100%': {
        left: 100
    }
}
 </code></pre>
      */
    constructor: function(config) {
        var me = this;
        config = Ext.apply(me, config || {});
        me.config = config;
        me.id = Ext.id(null, 'ext-animator-');
        me.addEvents(
            /**
             * @event beforeanimate
             * Fires before the animation starts. A handler can return false to cancel the animation.
             * @param {Ext.fx.Animator} this
             */
            'beforeanimate',
            /**
              * @event keyframe
              * Fires at each keyframe.
              * @param {Ext.fx.Animator} this
              * @param {Number} keyframe step number
              */
            'keyframe',
            /**
             * @event afteranimate
             * Fires when the animation is complete.
             * @param {Ext.fx.Animator} this
             * @param {Date} startTime
             */
            'afteranimate'
        );
        Ext.fx.Animator.superclass.constructor.call(me, config);
        me.timeline = [];
        me.createTimeline(me.keyframes);
        if (me.target) {
            me.applyAnimator(me.target);
            Ext.fx.Manager.addAnim(me);
        }
    },

    /**
     * @private
     */
    sorter: function (a, b) {
        return a.pct - b.pct;
    },

    /**
     * @private
     * Takes the given keyframe configuration object and converts it into an ordered array with the passed attributes per keyframe
     * or applying the 'to' configuration to all keyframes.  Also calculates the proper animation duration per keyframe.
     */
    createTimeline: function(keyframes) {
        var me = this,
            attrs = [],
            to = me.to || {},
            duration = me.duration,
            prevMs, ms, i, ln, pct, attr;

        for (pct in keyframes) {
            if (keyframes.hasOwnProperty(pct) && me.animKeyFramesRE.test(pct)) {
                attr = {attrs: Ext.apply(keyframes[pct], to)};
                // CSS3 spec allow for from/to to be specified.
                if (pct == "from") {
                    pct = 0;
                }
                else if (pct == "to") {
                    pct = 100;
                }
                // convert % values into integers
                attr.pct = parseInt(pct, 10);
                attrs.push(attr);
            }
        }
        // Sort by pct property
        // COMPAT Array
        attrs.sort(me.sorter);
        // Only an end
        //if (attrs[0].pct) {
        //    attrs.unshift({pct: 0, attrs: element.attrs});
        //}

        ln = attrs.length;
        for (i = 0; i < ln; i++) {
            prevMs = (attrs[i - 1]) ? duration * (attrs[i - 1].pct / 100) : 0;
            ms = duration * (attrs[i].pct / 100);
            me.timeline.push({
                duration: ms - prevMs,
                attrs: attrs[i].attrs
            });
        }
    },

    /**
     * Applies animation to the Ext.fx.target
     * @private
     * @param target
     * @type string/object
     */
    applyAnimator: function(target) {
        var me = this,
            anims = [],
            timeline = me.timeline,
            ln = timeline.length,
            anim, easing, damper, attrs, i;

        if (me.fireEvent('beforeanimate', me) !== false) {
            for (i = 0; i < ln; i++) {
                anim = timeline[i];
                attrs = anim.attrs;
                easing = attrs.easing || me.easing;
                damper = attrs.damper || me.damper;
                delete attrs.easing;
                delete attrs.damper;
                anim = new Ext.fx.Anim({
                    target: target,
                    easing: easing,
                    damper: damper,
                    duration: anim.duration,
                    paused: true,
                    to: attrs
                });
                anims.push(anim);
            }
            me.animations = anims;
            me.target = anim.target;
            for (i = 0; i < ln - 1; i++) {
                anim = anims[i];
                anim.nextAnim = anims[i + 1];
                anim.on('afteranimate', function() {
                    this.nextAnim.paused = false;
                });
                anim.on('afteranimate', function() {
                    this.fireEvent('keyframe', this, ++this.keyframeStep);
                }, me);
            }
            anims[ln - 1].on('afteranimate', function() {
                this.lastFrame();
            }, me);
        }
    },

    /*
     * @private
     * Fires beforeanimate and sets the running flag.
     */
    start: function(startTime) {
        var me = this,
            delay = me.delay,
            delayStart = me.delayStart,
            delayDelta;
        if (delay) {
            if (!delayStart) {
                me.delayStart = startTime;
                return;
            }
            else {
                delayDelta = startTime - delayStart;
                if (delayDelta < delay) {
                    return;
                }
                else {
                    // Compensate for frame delay;
                    startTime = new Date(delayStart.getTime() + delay);
                }
            }
        }
        if (me.fireEvent('beforeanimate', me) !== false) {
            me.startTime = startTime;
            me.running = true;
            me.animations[me.keyframeStep].paused = false;
        }
    },

    /*
     * @private
     * Perform lastFrame cleanup and handle iterations
     * @returns a hash of the new attributes.
     */
    lastFrame: function() {
        var me = this,
            iter = me.iterations,
            iterCount = me.currentIteration;

        iterCount++;
        if (iterCount < iter) {
            me.startTime = new Date();
            me.currentIteration = iterCount;
            me.keyframeStep = 0;
            me.applyAnimator(me.target);
            me.animations[me.keyframeStep].paused = false;
        }
        else {
            me.currentIteration = 0;
            me.end();
        }
    },

    /*
     * Fire afteranimate event and end the animation. Usually called automatically when the
     * animation reaches its final frame, but can also be called manually to pre-emptively
     * stop and destroy the running animation.
     */
    end: function() {
        var me = this;
        me.fireEvent('afteranimate', me, me.startTime, new Date() - me.startTime);
    }
});
/**
 * @class Ext.fx.Anim
 *
 * This class manages animation for a specific {@link #target}. The animation allows
 * animation of various properties on the target, such as size, position, color and others.
 *
 * ## Starting Conditions
 * The starting conditions for the animation are provided by the {@link #from} configuration.
 * Any/all of the properties in the {@link #from} configuration can be specified. If a particular
 * property is not defined, the starting value for that property will be read directly from the target.
 *
 * ## End Conditions
 * The ending conditions for the animation are provided by the {@link #to} configuration. These mark
 * the final values once the animations has finished. The values in the {@link #from} can mirror
 * those in the {@link #to} configuration to provide a starting point.
 *
 * ## Other Options
 *  - {@link #duration}: Specifies the time period of the animation.
 *  - {@link #easing}: Specifies the easing of the animation.
 *  - {@link #iterations}: Allows the animation to repeat a number of times.
 *  - {@link #alternate}: Used in conjunction with {@link #iterations}, reverses the direction every second iteration.
 *
 * ## Example Code
 *
 *     var myComponent = Ext.create('Ext.Component', {
 *         renderTo: document.body,
 *         width: 200,
 *         height: 200,
 *         style: 'border: 1px solid red;'
 *     });
 *
 *     new Ext.fx.Anim({
 *         target: myComponent,
 *         duration: 1000,
 *         from: {
 *             width: 400 //starting width 400
 *         },
 *         to: {
 *             width: 300, //end width 300
 *             height: 300 // end width 300
 *         }
 *     });
 */
Ext.fx.Anim = Ext.extend(Ext.util.Observable, {

    isAnimation: true,
    /**
     * @cfg {Number} duration
     * Time in milliseconds for a single animation to last. Defaults to 250. If the {@link #iterations} property is
     * specified, then each animate will take the same duration for each iteration.
     */
    duration: 250,

    /**
     * @cfg {Number} delay
     * Time to delay before starting the animation. Defaults to 0.
     */
    delay: 0,

    /* private used to track a delayed starting time */
    delayStart: 0,

    /**
     * @cfg {Boolean} dynamic
     * Currently only for Component Animation: Only set a component's outer element size bypassing layouts.  Set to true to do full layouts for every frame of the animation.  Defaults to false.
     */
    dynamic: false,

    /**
     * @cfg {String} easing
This describes how the intermediate values used during a transition will be calculated. It allows for a transition to change
speed over its duration.

         -backIn
         -backOut
         -bounceIn
         -bounceOut
         -ease
         -easeIn
         -easeOut
         -easeInOut
         -elasticIn
         -elasticOut
         -cubic-bezier(x1, y1, x2, y2)

Note that cubic-bezier will create a custom easing curve following the CSS3 transition-timing-function specification `{@link http://www.w3.org/TR/css3-transitions/#transition-timing-function_tag}`. The four values specify points P1 and P2 of the curve
as (x1, y1, x2, y2). All values must be in the range [0, 1] or the definition is invalid.
     * @markdown
     */
    easing: 'ease',

     /**
      * @cfg {Object} keyframes
      * Animation keyframes follow the CSS3 Animation configuration pattern. 'from' is always considered '0%' and 'to'
      * is considered '100%'.<b>Every keyframe declaration must have a keyframe rule for 0% and 100%, possibly defined using
      * "from" or "to"</b>.  A keyframe declaration without these keyframe selectors is invalid and will not be available for
      * animation.  The keyframe declaration for a keyframe rule consists of properties and values. Properties that are unable to
      * be animated are ignored in these rules, with the exception of 'easing' which can be changed at each keyframe. For example:
 <pre><code>
keyframes : {
    '0%': {
        left: 100
    },
    '40%': {
        left: 150
    },
    '60%': {
        left: 75
    },
    '100%': {
        left: 100
    }
}
 </code></pre>
      */

    /**
     * @private
     */
    damper: 1,

    /**
     * @private
     */
    bezierRE: /^(?:cubic-)?bezier\(([^,]+),([^,]+),([^,]+),([^\)]+)\)/,

    /**
     * Run the animation from the end to the beginning
     * Defaults to false.
     * @cfg {Boolean} reverse
     */
    reverse: false,

    /**
     * Flag to determine if the animation has started
     * @property running
     * @type boolean
     */
    running: false,

    /**
     * Flag to determine if the animation is paused. Only set this to true if you need to
     * keep the Anim instance around to be unpaused later; otherwise call {@link #end}.
     * @property paused
     * @type boolean
     */
    paused: false,

    /**
     * Number of times to execute the animation. Defaults to 1.
     * @cfg {int} iterations
     */
    iterations: 1,

    /**
     * Used in conjunction with iterations to reverse the animation each time an iteration completes.
     * @cfg {Boolean} alternate
     * Defaults to false.
     */
    alternate: false,

    /**
     * Current iteration the animation is running.
     * @property currentIteration
     * @type int
     */
    currentIteration: 0,

    /**
     * Starting time of the animation.
     * @property startTime
     * @type Date
     */
    startTime: 0,

    /**
     * Contains a cache of the interpolators to be used.
     * @private
     * @property propHandlers
     * @type Object
     */

    /**
     * @cfg {String/Object} target
     * The {@link Ext.fx.target.Target} to apply the animation to.  This should only be specified when creating an Ext.fx.Anim directly.
     * The target does not need to be a {@link Ext.fx.target.Target} instance, it can be the underlying object. For example, you can
     * pass a Component, Element or Sprite as the target and the Anim will create the appropriate {@link Ext.fx.target.Target} object
     * automatically.
     */

    /**
     * @cfg {Object} from
     * An object containing property/value pairs for the beginning of the animation.  If not specified, the current state of the
     * Ext.fx.target will be used. For example:
<pre><code>
from : {
    opacity: 0,       // Transparent
    color: '#ffffff', // White
    left: 0
}
</code></pre>
     */

    /**
     * @cfg {Object} to
     * An object containing property/value pairs for the end of the animation. For example:
 <pre><code>
 to : {
     opacity: 1,       // Opaque
     color: '#00ff00', // Green
     left: 500
 }
 </code></pre>
     */

    // @private
    constructor: function(config) {
        var me = this;
        config = config || {};
        // If keyframes are passed, they really want an Animator instead.
        if (config.keyframes) {
            return new Ext.fx.Animator(config);
        }
        config = Ext.apply(me, config);
        if (me.from === undefined) {
            me.from = {};
        }
        me.propHandlers = {};
        me.config = config;
        me.target = Ext.fx.Manager.createTarget(me.target);
        me.easingFn = Ext.fx.Easing[me.easing];
        me.target.dynamic = me.dynamic;

        // If not a pre-defined curve, try a cubic-bezier
        if (!me.easingFn) {
            me.easingFn = String(me.easing).match(me.bezierRE);
            if (me.easingFn && me.easingFn.length == 5) {
                var curve = me.easingFn;
                me.easingFn = Ext.fx.cubicBezier(+curve[1], +curve[2], +curve[3], +curve[4]);
            }
        }
        me.id = Ext.id(null, 'ext-anim-');
        Ext.fx.Manager.addAnim(me);
        me.addEvents(
            /**
             * @event beforeanimate
             * Fires before the animation starts. A handler can return false to cancel the animation.
             * @param {Ext.fx.Anim} this
             */
            'beforeanimate',
             /**
              * @event afteranimate
              * Fires when the animation is complete.
              * @param {Ext.fx.Anim} this
              * @param {Date} startTime
              */
            'afteranimate',
             /**
              * @event lastframe
              * Fires when the animation's last frame has been set.
              * @param {Ext.fx.Anim} this
              * @param {Date} startTime
              */
            'lastframe'
        );
        Ext.fx.Anim.superclass.constructor.call(me, config);
        if (config.callback) {
            me.on('afteranimate', config.callback, config.scope);
        }
        return me;
    },

    /**
     * @private
     * Helper to the target
     */
    setAttr: function(attr, value) {
        return Ext.fx.Manager.items.get(this.id).setAttr(this.target, attr, value);
    },

    /*
     * @private
     * Set up the initial currentAttrs hash.
     */
    initAttrs: function() {
        var me = this,
            from = me.from,
            to = me.to,
            initialFrom = me.initialFrom || {},
            out = {},
            start, end, propHandler, attr;

        for (attr in to) {
            if (to.hasOwnProperty(attr)) {
                start = me.target.getAttr(attr, from[attr]);
                end = to[attr];
                // Use default (numeric) property handler
                if (!Ext.fx.PropertyHandler[attr]) {
                    if (Ext.isObject(end)) {
                        propHandler = me.propHandlers[attr] = Ext.fx.PropertyHandler.object;
                    } else {
                        propHandler = me.propHandlers[attr] = Ext.fx.PropertyHandler.defaultHandler;
                    }
                }
                // Use custom handler
                else {
                    propHandler = me.propHandlers[attr] = Ext.fx.PropertyHandler[attr];
                }
                out[attr] = propHandler.get(start, end, me.damper, initialFrom[attr], attr);
            }
        }
        me.currentAttrs = out;
    },

    /*
     * @private
     * Fires beforeanimate and sets the running flag.
     */
    start: function(startTime) {
        var me = this,
            delay = me.delay,
            delayStart = me.delayStart,
            delayDelta;
        if (delay) {
            if (!delayStart) {
                me.delayStart = startTime;
                return;
            }
            else {
                delayDelta = startTime - delayStart;
                if (delayDelta < delay) {
                    return;
                }
                else {
                    // Compensate for frame delay;
                    startTime = new Date(delayStart.getTime() + delay);
                }
            }
        }
        if (me.fireEvent('beforeanimate', me) !== false) {
            me.startTime = startTime;
            if (!me.paused && !me.currentAttrs) {
                me.initAttrs();
            }
            me.running = true;
        }
    },

    /*
     * @private
     * Calculate attribute value at the passed timestamp.
     * @returns a hash of the new attributes.
     */
    runAnim: function(elapsedTime) {
        var me = this,
            attrs = me.currentAttrs,
            duration = me.duration,
            easingFn = me.easingFn,
            propHandlers = me.propHandlers,
            ret = {},
            easing, values, attr, lastFrame;

        if (elapsedTime >= duration) {
            elapsedTime = duration;
            lastFrame = true;
        }
        if (me.reverse) {
            elapsedTime = duration - elapsedTime;
        }

        for (attr in attrs) {
            if (attrs.hasOwnProperty(attr)) {
                values = attrs[attr];
                easing = lastFrame ? 1 : easingFn(elapsedTime / duration);
                ret[attr] = propHandlers[attr].set(values, easing);
            }
        }
        return ret;
    },

    /*
     * @private
     * Perform lastFrame cleanup and handle iterations
     * @returns a hash of the new attributes.
     */
    lastFrame: function() {
        var me = this,
            iter = me.iterations,
            iterCount = me.currentIteration;

        iterCount++;
        if (iterCount < iter) {
            if (me.alternate) {
                me.reverse = !me.reverse;
            }
            me.startTime = new Date();
            me.currentIteration = iterCount;
            // Turn off paused for CSS3 Transitions
            me.paused = false;
        }
        else {
            me.currentIteration = 0;
            me.end();
            me.fireEvent('lastframe', me, me.startTime);
        }
    },

    /*
     * Fire afteranimate event and end the animation. Usually called automatically when the
     * animation reaches its final frame, but can also be called manually to pre-emptively
     * stop and destroy the running animation.
     */
    end: function() {
        var me = this;
        me.startTime = 0;
        me.paused = false;
        me.running = false;
        Ext.fx.Manager.removeAnim(me);
        me.fireEvent('afteranimate', me, me.startTime);
    }
});
// Set flag to indicate that Fx is available. Class might not be available immediately.
Ext.enableFx = true;

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

/**
 * @class Ext.fx.target.Sprite
 * @extends Ext.fx.target.Target

This class represents a animation target for a {@link Ext.draw.Sprite}. In general this class will not be
created directly, the {@link Ext.draw.Sprite} will be passed to the animation and
and the appropriate target will be created.

 * @markdown
 */

Ext.fx.target.Sprite = Ext.extend(Ext.fx.target.Target, {

    type: 'draw',

    getFromPrim: function(sprite, attr) {
        var o;
        if (attr == 'translate') {
            o = {
                x: sprite.attr.translation.x || 0,
                y: sprite.attr.translation.y || 0
            };
        }
        else if (attr == 'rotate') {
            o = {
                degrees: sprite.attr.rotation.degrees || 0,
                x: sprite.attr.rotation.x,
                y: sprite.attr.rotation.y
            };
        }
        else {
            o = sprite.attr[attr];
        }
        return o;
    },

    getAttr: function(attr, val) {
        return [[this.target, val != undefined ? val : this.getFromPrim(this.target, attr)]];
    },

    setAttr: function(targetData) {
        var ln = targetData.length,
            spriteArr = [],
            attrs, attr, attrArr, attPtr, spritePtr, idx, value, i, j, x, y, ln2;
        for (i = 0; i < ln; i++) {
            attrs = targetData[i].attrs;
            for (attr in attrs) {
                attrArr = attrs[attr];
                ln2 = attrArr.length;
                for (j = 0; j < ln2; j++) {
                    spritePtr = attrArr[j][0];
                    attPtr = attrArr[j][1];
                    if (attr === 'translate') {
                        value = {
                            x: attPtr.x,
                            y: attPtr.y
                        };
                    }
                    else if (attr === 'rotate') {
                        x = attPtr.x;
                        if (isNaN(x)) {
                            x = null;
                        }
                        y = attPtr.y;
                        if (isNaN(y)) {
                            y = null;
                        }
                        value = {
                            degrees: attPtr.degrees,
                            x: x,
                            y: y
                        };
                    }
                    else if (attr === 'width' || attr === 'height' || attr === 'x' || attr === 'y') {
                        value = parseFloat(attPtr);
                    }
                    else {
                        value = attPtr;
                    }
                    // COMPAT indexOf
                    idx = spriteArr.indexOf(spritePtr);
                    if (idx == -1) {
                        spriteArr.push([spritePtr, {}]);
                        idx = spriteArr.length - 1;
                    }
                    spriteArr[idx][1][attr] = value;
                }
            }
        }
        ln = spriteArr.length;
        for (i = 0; i < ln; i++) {
            spritePtr = spriteArr[i];
            spritePtr[0].setAttributes(spritePtr[1]);
        }
        this.target.tween();
    }
});

/**
 * @class Ext.fx.target.CompositeSprite
 * @extends Ext.fx.target.Sprite

This class represents a animation target for a {@link Ext.draw.CompositeSprite}. It allows
each {@link Ext.draw.Sprite} in the group to be animated as a whole. In general this class will not be
created directly, the {@link Ext.draw.CompositeSprite} will be passed to the animation and
and the appropriate target will be created.

 * @markdown
 */

Ext.fx.target.CompositeSprite = Ext.extend(Ext.fx.target.Sprite, {

    getAttr: function(attr, val) {
        var out = [],
            target = this.target;
        target.each(function(sprite) {
            out.push([sprite, val != undefined ? val : this.getFromPrim(sprite, attr)]);
        }, this);
        return out;
    }
});

/**
 * @class Ext.util.Animate
 * This animation class is a mixin.
 *
 * Ext.util.Animate provides an API for the creation of animated transitions of properties and styles.
 * This class is used as a mixin and currently applied to {@link Ext.core.Element}, {@link Ext.CompositeElement},
 * {@link Ext.draw.Sprite}, {@link Ext.draw.CompositeSprite}, and {@link Ext.Component}.  Note that Components
 * have a limited subset of what attributes can be animated such as top, left, x, y, height, width, and
 * opacity (color, paddings, and margins can not be animated).
 *
 * ## Animation Basics
 *
 * All animations require three things - `easing`, `duration`, and `to` (the final end value for each property)
 * you wish to animate. Easing and duration are defaulted values specified below.
 * Easing describes how the intermediate values used during a transition will be calculated.
 * {@link Ext.fx.Anim#easing Easing} allows for a transition to change speed over its duration.
 * You may use the defaults for easing and duration, but you must always set a
 * {@link Ext.fx.Anim#to to} property which is the end value for all animations.
 *
 * Popular element 'to' configurations are:
 *
 *  - opacity
 *  - x
 *  - y
 *  - color
 *  - height
 *  - width
 *
 * Popular sprite 'to' configurations are:
 *
 *  - translation
 *  - path
 *  - scale
 *  - stroke
 *  - rotation
 *
 * The default duration for animations is 250 (which is a 1/4 of a second).  Duration is denoted in
 * milliseconds.  Therefore 1 second is 1000, 1 minute would be 60000, and so on. The default easing curve
 * used for all animations is 'ease'.  Popular easing functions are included and can be found in {@link Ext.fx.Anim#easing Easing}.
 *
 * For example, a simple animation to fade out an element with a default easing and duration:
 *
 *     var p1 = Ext.get('myElementId');
 *
 *     p1.animate({
 *         to: {
 *             opacity: 0
 *         }
 *     });
 *
 * To make this animation fade out in a tenth of a second:
 *
 *     var p1 = Ext.get('myElementId');
 *
 *     p1.animate({
 *        duration: 100,
 *         to: {
 *             opacity: 0
 *         }
 *     });
 *
 * ## Animation Queues
 *
 * By default all animations are added to a queue which allows for animation via a chain-style API.
 * For example, the following code will queue 4 animations which occur sequentially (one right after the other):
 *
 *     p1.animate({
 *         to: {
 *             x: 500
 *         }
 *     }).animate({
 *         to: {
 *             y: 150
 *         }
 *     }).animate({
 *         to: {
 *             backgroundColor: '#f00'  //red
 *         }
 *     }).animate({
 *         to: {
 *             opacity: 0
 *         }
 *     });
 *
 * You can change this behavior by calling the {@link Ext.util.Animate#syncFx syncFx} method and all
 * subsequent animations for the specified target will be run concurrently (at the same time).
 *
 *     p1.syncFx();  //this will make all animations run at the same time
 *
 *     p1.animate({
 *         to: {
 *             x: 500
 *         }
 *     }).animate({
 *         to: {
 *             y: 150
 *         }
 *     }).animate({
 *         to: {
 *             backgroundColor: '#f00'  //red
 *         }
 *     }).animate({
 *         to: {
 *             opacity: 0
 *         }
 *     });
 *
 * This works the same as:
 *
 *     p1.animate({
 *         to: {
 *             x: 500,
 *             y: 150,
 *             backgroundColor: '#f00'  //red
 *             opacity: 0
 *         }
 *     });
 *
 * The {@link Ext.util.Animate#stopAnimation stopAnimation} method can be used to stop any
 * currently running animations and clear any queued animations.
 *
 * ## Animation Keyframes
 *
 * You can also set up complex animations with {@link Ext.fx.Anim#keyframe keyframe} which follows the
 * CSS3 Animation configuration pattern. Note rotation, translation, and scaling can only be done for sprites.
 * The previous example can be written with the following syntax:
 *
 *     p1.animate({
 *         duration: 1000,  //one second total
 *         keyframes: {
 *             25: {     //from 0 to 250ms (25%)
 *                 x: 0
 *             },
 *             50: {   //from 250ms to 500ms (50%)
 *                 y: 0
 *             },
 *             75: {  //from 500ms to 750ms (75%)
 *                 backgroundColor: '#f00'  //red
 *             },
 *             100: {  //from 750ms to 1sec
 *                 opacity: 0
 *             }
 *         }
 *     });
 *
 * ## Animation Events
 *
 * Each animation you create has events for {@link Ext.fx.Anim#beforeanimation beforeanimation},
 * {@link Ext.fx.Anim#afteranimate afteranimate}, and {@link Ext.fx.Anim#lastframe lastframe}.
 * Keyframed animations adds an additional {@link Ext.fx.Animator#keyframe keyframe} event which
 * fires for each keyframe in your animation.
 *
 * All animations support the {@link Ext.util.Observable#listeners listeners} configuration to attact functions to these events.
 *
 *     startAnimate: function() {
 *         var p1 = Ext.get('myElementId');
 *         p1.animate({
 *            duration: 100,
 *             to: {
 *                 opacity: 0
 *             },
 *             listeners: {
 *                 beforeanimate:  function() {
 *                     // Execute my custom method before the animation
 *                     this.myBeforeAnimateFn();
 *                 },
 *                 afteranimate: function() {
 *                     // Execute my custom method after the animation
 *                     this.myAfterAnimateFn();
 *                 },
 *                 scope: this
 *         });
 *     },
 *     myBeforeAnimateFn: function() {
 *       // My custom logic
 *     },
 *     myAfterAnimateFn: function() {
 *       // My custom logic
 *     }
 *
 * Due to the fact that animations run asynchronously, you can determine if an animation is currently
 * running on any target by using the {@link Ext.util.Animate#getActiveAnimation getActiveAnimation}
 * method.  This method will return false if there are no active animations or return the currently
 * running {@link Ext.fx.Anim} instance.
 *
 * In this example, we're going to wait for the current animation to finish, then stop any other
 * queued animations before we fade our element's opacity to 0:
 *
 *     var curAnim = p1.getActiveAnimation();
 *     if (curAnim) {
 *         curAnim.on('afteranimate', function() {
 *             p1.stopAnimation();
 *             p1.animate({
 *                 to: {
 *                     opacity: 0
 *                 }
 *             });
 *         });
 *     }
 *
 * @docauthor Jamie Avins <jamie@sencha.com>
 */
Ext.util.Animate = {

    /**
     * <p>Perform custom animation on this object.<p>
     * <p>This method is applicable to both the the {@link Ext.Component Component} class and the {@link Ext.core.Element Element} class.
     * It performs animated transitions of certain properties of this object over a specified timeline.</p>
     * <p>The sole parameter is an object which specifies start property values, end property values, and properties which
     * describe the timeline. Of the properties listed below, only <b><code>to</code></b> is mandatory.</p>
     * <p>Properties include<ul>
     * <li><code>from</code> <div class="sub-desc">An object which specifies start values for the properties being animated.
     * If not supplied, properties are animated from current settings. The actual properties which may be animated depend upon
     * ths object being animated. See the sections below on Element and Component animation.<div></li>
     * <li><code>to</code> <div class="sub-desc">An object which specifies end values for the properties being animated.</div></li>
     * <li><code>duration</code><div class="sub-desc">The duration <b>in milliseconds</b> for which the animation will run.</div></li>
     * <li><code>easing</code> <div class="sub-desc">A string value describing an easing type to modify the rate of change from the default linear to non-linear. Values may be one of:<code><ul>
     * <li>ease</li>
     * <li>easeIn</li>
     * <li>easeOut</li>
     * <li>easeInOut</li>
     * <li>backIn</li>
     * <li>backOut</li>
     * <li>elasticIn</li>
     * <li>elasticOut</li>
     * <li>bounceIn</li>
     * <li>bounceOut</li>
     * </ul></code></div></li>
     * <li><code>keyframes</code> <div class="sub-desc">This is an object which describes the state of animated properties at certain points along the timeline.
     * it is an object containing properties who's names are the percentage along the timeline being described and who's values specify the animation state at that point.</div></li>
     * <li><code>listeners</code> <div class="sub-desc">This is a standard {@link Ext.util.Observable#listeners listeners} configuration object which may be used
     * to inject behaviour at either the <code>beforeanimate</code> event or the <code>afteranimate</code> event.</div></li>
     * </ul></p>
     * <h3>Animating an {@link Ext.core.Element Element}</h3>
     * When animating an Element, the following properties may be specified in <code>from</code>, <code>to</code>, and <code>keyframe</code> objects:<ul>
     * <li><code>x</code> <div class="sub-desc">The page X position in pixels.</div></li>
     * <li><code>y</code> <div class="sub-desc">The page Y position in pixels</div></li>
     * <li><code>left</code> <div class="sub-desc">The element's CSS <code>left</code> value. Units must be supplied.</div></li>
     * <li><code>top</code> <div class="sub-desc">The element's CSS <code>top</code> value. Units must be supplied.</div></li>
     * <li><code>width</code> <div class="sub-desc">The element's CSS <code>width</code> value. Units must be supplied.</div></li>
     * <li><code>height</code> <div class="sub-desc">The element's CSS <code>height</code> value. Units must be supplied.</div></li>
     * <li><code>scrollLeft</code> <div class="sub-desc">The element's <code>scrollLeft</code> value.</div></li>
     * <li><code>scrollTop</code> <div class="sub-desc">The element's <code>scrollLeft</code> value.</div></li>
     * <li><code>opacity</code> <div class="sub-desc">The element's <code>opacity</code> value. This must be a value between <code>0</code> and <code>1</code>.</div></li>
     * </ul>
     * <p><b>Be aware than animating an Element which is being used by an Ext Component without in some way informing the Component about the changed element state
     * will result in incorrect Component behaviour. This is because the Component will be using the old state of the element. To avoid this problem, it is now possible to
     * directly animate certain properties of Components.</b></p>
     * <h3>Animating a {@link Ext.Component Component}</h3>
     * When animating an Element, the following properties may be specified in <code>from</code>, <code>to</code>, and <code>keyframe</code> objects:<ul>
     * <li><code>x</code> <div class="sub-desc">The Component's page X position in pixels.</div></li>
     * <li><code>y</code> <div class="sub-desc">The Component's page Y position in pixels</div></li>
     * <li><code>left</code> <div class="sub-desc">The Component's <code>left</code> value in pixels.</div></li>
     * <li><code>top</code> <div class="sub-desc">The Component's <code>top</code> value in pixels.</div></li>
     * <li><code>width</code> <div class="sub-desc">The Component's <code>width</code> value in pixels.</div></li>
     * <li><code>width</code> <div class="sub-desc">The Component's <code>width</code> value in pixels.</div></li>
     * <li><code>dynamic</code> <div class="sub-desc">Specify as true to update the Component's layout (if it is a Container) at every frame
     * of the animation. <i>Use sparingly as laying out on every intermediate size change is an expensive operation</i>.</div></li>
     * </ul>
     * <p>For example, to animate a Window to a new size, ensuring that its internal layout, and any shadow is correct:</p>
     * <pre><code>
myWindow = Ext.create('Ext.window.Window', {
    title: 'Test Component animation',
    width: 500,
    height: 300,
    layout: {
        type: 'hbox',
        align: 'stretch'
    },
    items: [{
        title: 'Left: 33%',
        margins: '5 0 5 5',
        flex: 1
    }, {
        title: 'Left: 66%',
        margins: '5 5 5 5',
        flex: 2
    }]
});
myWindow.show();
myWindow.header.el.on('click', function() {
    myWindow.animate({
        to: {
            width: (myWindow.getWidth() == 500) ? 700 : 500,
            height: (myWindow.getHeight() == 300) ? 400 : 300,
        }
    });
});
</code></pre>
     * <p>For performance reasons, by default, the internal layout is only updated when the Window reaches its final <code>"to"</code> size. If dynamic updating of the Window's child
     * Components is required, then configure the animation with <code>dynamic: true</code> and the two child items will maintain their proportions during the animation.</p>
     * @param {Object} config An object containing properties which describe the animation's start and end states, and the timeline of the animation.
     * @return {Object} this
     */
    animate: function(animObj) {
        var me = this;
        if (Ext.fx.Manager.hasFxBlock(me.id)) {
            return me;
        }
        Ext.fx.Manager.queueFx(new Ext.fx.Anim(me.anim(animObj)));
        return this;
    },

    // @private - process the passed fx configuration.
    anim: function(config) {
        if (!Ext.isObject(config)) {
            return (config) ? {} : false;
        }

        var me = this;

        if (config.stopAnimation) {
            me.stopAnimation();
        }

        Ext.applyIf(config, Ext.fx.Manager.getFxDefaults(me.id));

        return Ext.apply({
            target: me,
            paused: true
        }, config);
    },

    /**
     * Stops any running effects and clears this object's internal effects queue if it contains
     * any additional effects that haven't started yet.
     * @return {Ext.core.Element} The Element
     */
    stopAnimation: function() {
        Ext.fx.Manager.stopAnimation(this.id);
        return this;
    },

    /**
     * Ensures that all effects queued after syncFx is called on this object are
     * run concurrently.  This is the opposite of {@link #sequenceFx}.
     * @return {Object} this
     */
    syncFx: function() {
        Ext.fx.Manager.setFxDefaults(this.id, {
            concurrent: true
        });
        return this;
    },

    /**
     * Ensures that all effects queued after sequenceFx is called on this object are
     * run in sequence.  This is the opposite of {@link #syncFx}.
     * @return {Object} this
     */
    sequenceFx: function() {
        Ext.fx.Manager.setFxDefaults(this.id, {
            concurrent: false
        });
        return this;
    },

    /**
     * Returns thq current animation if this object has any effects actively running or queued, else returns false.
     * @return {Mixed} anim if element has active effects, else false
     */
    getActiveAnimation: function() {
        return Ext.fx.Manager.getActiveAnimation(this.id);
    }
};
