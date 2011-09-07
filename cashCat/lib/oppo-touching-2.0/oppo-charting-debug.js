
Ext.apply(Ext, {
    
    baseCSSPrefix: 'x-',
    
    capitalize: function(string) {
        return string.charAt(0).toUpperCase() + string.substr(1);
    },
    
    /**
    * Copies a set of named properties fom the source object to the destination object.
    * <p>example:<pre><code>
        ImageComponent = Ext.extend(Ext.Component, {
            initComponent: function() {
                this.autoEl = { tag: 'img' };
                MyComponent.superclass.initComponent.apply(this, arguments);
                this.initialBox = Ext.copyTo({}, this.initialConfig, 'x,y,width,height');
            }
        });
    * </code></pre>
    * @param {Object} dest The destination object.
    * @param {Object} source The source object.
    * @param {Array/String} names Either an Array of property names, or a comma-delimited list
    * of property names to copy.
    * @param {Boolean} usePrototypeKeys (Optional) Defaults to false. Pass true to copy keys off of the prototype as well as the instance.
    * @return {Object} The modified object.
   */
   copyTo : function(dest, source, names, usePrototypeKeys){
       if(typeof names == 'string'){
           names = names.split(/[,;\s]/);
       }
       Ext.each(names, function(name){
           if(usePrototypeKeys || source.hasOwnProperty(name)){
               dest[name] = source[name];
           }
       }, this);
       return dest;
   },
   
    /**
    * Used internally by the mixins pre-processor
    * @private
    */
   mixin: function(scope, name, cls) {
       var me =  scope;
       var mixinPrototype = cls.prototype,
           myPrototype = me.prototype,
           i;

       for (i in mixinPrototype) {
           if (mixinPrototype.hasOwnProperty(i)) {
               if (myPrototype[i] === undefined) {
                   /*if (Ext.isFunction(mixinPrototype[i])) {
                       me.borrowMethod(i, mixinPrototype[i]);
                   }
                   else {
                       myPrototype[i] = mixinPrototype[i];
                   }*/
                   myPrototype[i] = mixinPrototype[i];
               }
               // don't support 'config' in touch framework
               /*else if (i === 'config' && Ext.isObject(myPrototype[i]) && Ext.isObject(mixinPrototype[i])) {
                   Ext.Object.merge(myPrototype[i], mixinPrototype[i]);
               }*/
           }
       }

       if (!myPrototype.mixins) {
           myPrototype.mixins = {};
       }

       myPrototype.mixins[name] = mixinPrototype;
   }
});

Ext.Number = Ext.util.Numbers;

Ext.ns(
    'Ext.fx',
    'Ext.fx.target',
    'Ext.chart',
    'Ext.chart.axis',
    'Ext.chart.series',
    'Ext.chart.theme',
    'Ext.draw',
    'Ext.draw.engine'
);/**
 * @class Ext.Array
 *
 * A set of useful static methods to deal with arrays; provide missing methods for older browsers
 * @singleton
 */
(function() {

    var arrayPrototype = Array.prototype,
        supportsForEach = 'forEach' in arrayPrototype,
        supportsMap = 'map' in arrayPrototype,
        supportsIndexOf = 'indexOf' in arrayPrototype,
        supportsEvery = 'every' in arrayPrototype,
        supportsSome = 'some' in arrayPrototype,
        supportsFilter = 'filter' in arrayPrototype;

    Ext.Array = {
        /**
         * Iterates an array calling the supplied function.
         * @param {Array/NodeList/Mixed} array The array to be iterated. If this
         * argument is not really an array, the supplied function is called once.
         * @param {Function} fn The function to be called with each item. If the
         * supplied function returns false, iteration stops and this method returns
         * the current <tt>index</tt>. This function is called with
         * the following arguments:
         * <ul>
         * <li><tt>item</tt> : <i>Mixed</i> The item at the current <tt>index</tt> in the passed <tt>array</tt></li>
         * <li><tt>index</tt> : <i>Number</i> The current index within the array</li>
         * <li><tt>allItems</tt> : <i>Array</i> The <tt>array</tt> passed as the first
         * argument to <tt>Ext.each</tt>.</li>
         * </ul>
         * @param {Object} scope The scope (<tt>this</tt> reference) in which the specified function is executed.
         * Defaults to the <tt>item</tt> at the current <tt>index</tt>
         * within the passed <tt>array</tt>.
         * @return {Boolean} See description for the fn parameter.
         */
        each: function(array, fn, scope) {
            if (Ext.isEmpty(array, true)) {
                return 0;
            }

            if (!Ext.isIterable(array) || Ext.isPrimitive(array)) {
                array = [array];
            }

            for (var i = 0, len = array.length; i < len; i++) {
                if (fn.call(scope || array[i], array[i], i, array) === false) {
                    return i;
                }
            }

            return true;
        },

        /**
         * Executes the provided function (callback) once for each element present in the array.
         * Note that this will delegate to the native forEach method in Array.prototype if the current
         * browser supports it. It doesn't support breaking out of the iteration by returning false
         * in the callback function like {@link Ext.Array#each}. Use this method when you don't need
         * that feature for a <b>huge</b> performance boost on modern browsers
         *
         * @param {Array} array The array to loop through
         * @param {Function} fn The function callback, to be invoked with three arguments: the value of the element,
         * the index of the element, and the Array object being traversed.
         * @param {Object} scope The scope (<code>this</code> reference) in which the specified function is executed.
         */
        forEach: function(array, fn, scope) {
            if (supportsForEach) {
                return array.forEach(fn, scope);
            }

            return Ext.Array.each(array, fn, scope);
        },

        /**
         * Get the index of the provided <code>item</code> in the given <code>array</code>, a supplement for the
         * missing Array.prototype.indexOf in Internet Explorer.
         *
         * @param {Array} array The array to check
         * @param {Mixed} item The item to look for
         * @param {Number} from (Optional) The index at which to begin the search
         * @return {Number} The index of item in the array (or -1 if it is not found)
         */
        indexOf: function(array, item, from) {
            if (supportsIndexOf) {
                return array.indexOf(item, from);
            }

            var i, length = array.length;

            for (i = (from < 0) ? Math.max(0, length + from) : from || 0; i < length; i++) {
                if (array[i] === item) {
                    return i;
                }
            }

            return -1;
        },

        /**
         * Checks whether or not the given <code>array</code> contains the specified <code>item</code>
         *
         * @param {Array} array The array to check
         * @param {Mixed} item The item to look for
         * @return {Boolean} True if the array contains the item, false otherwise
         */
        contains: function(array, item) {
            return (Ext.Array.indexOf(array, item) !== -1);
        },

        /**
         * Converts any iterable (numeric indices and a length property) into a true array
         * Don't use this on strings. IE doesn't support "abc"[0] which this implementation depends on.
         * For strings, use this instead: <code>"abc".match(/./g) => [a,b,c];</code>
         *
         * @param {Iterable} array the iterable object to be turned into a true Array.
         * @param {Number} start a number that specifies where to start the selection.
         * @param {Number} end a number that specifies where to end the selection.
         * @return {Array} array
         */
        toArray: function(array, start, end) {
            return Array.prototype.slice.call(array, start || 0, end || array.length);
        },

        /**
         * Plucks the value of a property from each item in the Array
         * Example:
         * <pre><code>
         * Ext.pluck(Ext.query("p"), "className"); // [el1.className, el2.className, ..., elN.className]
         * </code></pre>
         *
         * @param {Array|NodeList} arr The Array of items to pluck the value from.
         * @param {String} prop The property name to pluck from each element.
         * @return {Array} The value from each item in the Array.
         */
        pluck: function(arr, prop) {
            var ret = [];
            Ext.each(arr, function(v) {
                ret.push(v[prop]);
            });
            return ret;
        },

        /**
         * Creates a new array with the results of calling a provided function on every element in this array.
         * @param {Array} array
         * @param {Function} fn Callback function for each item
         * @param {Object} scope Callback function scope
         * @return {Array} results
         */
        map: function(array, fn, scope) {
            if (!fn) {
                throw new Error("[Ext.Array.map] fn must be a valid callback function");
            }

            if (supportsMap) {
                return array.map(fn, scope);
            }

            var results = [],
                i = 0,
                len = array.length;

            for (; i < len; i++) {
                if (i in array) {
                    results[i] = fn.call(scope, array[i], i, array);
                }
            }

            return results;
        },

        /**
         * Executes the specified function for each array element until the function returns a falsy value.
         * If such an item is found, the function will return false immediately.
         * Otherwise, it will return true.
         * @param {Array} array
         * @param {Function} fn Callback function for each item
         * @param {Object} scope Callback function scope
         * @return {Boolean} True if no false value is returned by the callback function.
         */
        every: function(array, fn, scope) {
            if (supportsEvery) {
                return array.every(fn, scope);
            }

            var i = 0,
                len = array.length;

            for (; i < len; ++i) {
                if (i in array && !fn.call(scope, array[i], i, array)) {
                    return false;
                }
            }
            return true;
        },

        /**
         * Executes the specified function for each array element until the function returns a truthy value.
         * If such an item is found, the function will return true immediately. Otherwise, it will return false.
         * @param {Array} array
         * @param {Function} fn Callback function for each item
         * @param {Object} scope Callback function scope
         * @return {Boolean} True if the callback function returns a truthy value.
         */
        some: function(array, fn, scope) {
            if (supportsSome) {
                return array.some(fn, scope);
            }

            var i = 0,
                len = array.length;

            for (; i < len; ++i) {
                if (i in array && fn.call(scope, array[i], i, array)) {
                    return true;
                }
            }
            return false;
        },

        /**
         * Filter through an array and remove empty item as defined in {@link Ext#isEmpty Ext.isEmpty}
         * @see Ext.Array.filter
         * @param {Array} array
         * @return {Array} results
         */
        clean: function(array) {
            var results = [],
                i, ln, item;

            for (i = 0, ln = array.length; i < ln; i++) {
                item = array[i];

                if (!Ext.isEmpty(item)) {
                    results.push(item);
                }
            }

            return results;
        },

        /**
         * Returns a new array with unique items
         * @param {Array} array
         * @return {Array} results
         */
        unique: function(array) {
            var clone = [],
                me = Ext.Array;

            me.forEach(array, function(item) {
                if (!me.contains(clone, item)) {
                    clone.push(item);
                }
            });

            return clone;
        },

        /**
         * Creates a new array with all of the elements of this array for which
         * the provided filtering function returns true.
         * @param {Array} array
         * @param {Function} fn Callback function for each item
         * @param {Object} scope Callback function scope
         * @return {Array} results
         */
        filter: function(array, fn, scope) {
            if (!fn) {
                throw new Error("[Ext.Array.filter] fn must be a valid callback function");
            }

            if (supportsFilter) {
                return array.filter(fn, scope);
            }

            var results = [],
                i = 0,
                len = array.length;

            for (; i < len; i++) {
                if ((i in array) && fn.call(scope, array[i], i, array)) {
                    results.push(array[i]);
                }
            }

            return results;
        },

        /**
         * Converts a value to an array if it's not already an array
         *
         * @param {Array/Mixed} value The value to convert to an array if it is defined and not already an array.
         * @return {Array} array
         */
        from: function(value) {
            if (Ext.isIterable(value)) {
                return Ext.Array.toArray(value);
            }

            if (Ext.isDefined(value) && value !== null) {
                return [value];
            }

            return [];
        },

        /**
         * Removes the specified item from the array if it exists
         *
         * @param {Array} array The array
         * @param {Mixed} item The item to remove
         * @return {Array} The passed array itself
         */
        remove: function(array, item) {
            var index = Ext.Array.indexOf(array, item);

            if (index !== -1) {
                array.splice(index, 1);
            }

            return array;
        },

        /**
         * Push an item into the array only if the array doesn't contain it yet
         *
         * @param {Array} array The array
         * @param {Mixed} item The item to include
         * @return {Array} The passed array itself
         */
        include: function(array, item) {
            if (!Ext.Array.contains(array, item)) {
                array.push(item);
            }
        },

        /**
         * Clone a flat array without referencing the previous one. Note that this is different
         * from Ext.clone since it doesn't handle recursive cloning. Simply a convenient, easy-to-remember method
         * for Array.prototype.slice.call(array)
         *
         * @param {Array} array The array
         * @return {Array} The clone array
         */
        clone: function(array) {
            return arrayPrototype.slice.call(array);
        },

        /**
         * Merge multiple arrays into one with unique items. Alias to {@link Ext.Array#union}.
         *
         * @param {Array} array,...
         * @return {Array} merged
         */
        merge: function() {
            var me = Ext.Array,
                source = me.unique(arguments[0]),
                toMerge = arrayPrototype.slice.call(arguments, 1),
                i, j, ln, subLn, array;

            for (i = 0, ln = toMerge.length; i < ln; i++) {
                array = toMerge[i];

                for (j = 0, subLn = array.length; j < subLn; j++) {
                    me.include(source, array[j]);
                }
            }

            return source;
        },
        
        /**
         * Merge multiple arrays into one with unique items that exist in all of the arrays.
         * 
         * @param {Array} array,...
         * @return {Array} intersect
         */
        intersect: function() {
            var intersect = [],
                arrays = arrayPrototype.slice.call(arguments),
                i, j, k, minArray, array, x, y, ln, arraysLn, arrayLn;
                
            if (!arrays.length) {
                return intersect;
            }
            
            // Find the smallest array
            for (i = x = 0, ln = arrays.length; i < ln, array = arrays[i]; i++) {
                if (!minArray || array.length < minArray.length) {
                    minArray = array;
                    x = i;
                }
            }
            minArray = Ext.Array.unique(minArray);
            arrays.splice(x, 1);
            
            // Use the smallest unique'd array as the anchor loop. If the other array(s) do contain
            // an item in the small array, we're likely to find it before reaching the end
            // of the inner loop and can terminate the search early.
            for (i = 0, ln = minArray.length; i < ln, x = minArray[i]; i++) {
                var count = 0;
                
                for (j = 0, arraysLn = arrays.length; j < arraysLn, array = arrays[j]; j++) {
                    for (k = 0, arrayLn = array.length; k < arrayLn, y = array[k]; k++) {
                        if (x === y) {
                            count++;
                            break;
                        }
                    }
                }
                
                if (count == arraysLn) {
                    intersect.push(x);
                }
            }
            
            return intersect;
        },
        
        /**
         * Perform a set difference A-B by subtracting all items in array B from array A.
         * 
         * @param {Array} array A
         * @param {Array} array B
         * @return {Array} difference
         */
        difference: function(arrayA, arrayB) {
            var clone = Ext.Array.clone(arrayA),
                ln = clone.length,
                i, j, lnB;
            
            for (i = 0, lnB = arrayB.length; i < lnB; i++) {
                for (j = 0; j < ln; j++) {
                    if (clone[j] === arrayB[i]) {
                        clone.splice(j, 1);
                        j--;
                        ln--;
                    }
                }
            }
            
            return clone;
        }
    };
    
    /**
     * Merge multiple arrays into one with unique items. Alias to {@link Ext.Array#merge}.
     * 
     * @param {Array} array,...
     * @return {Array} union
     * @member Ext.Array
     * @method union
     */
    Ext.Array.union = Ext.Array.merge;

    

})();
/**
 * @class Ext.Date
 * A set of useful static methods to deal with date
 * Note that if Ext.util.Date is required and loaded, it will copy all methods / properties to
 * this object for convenience
 * @singleton
 */
Ext.Date = {
    /**
     * Returns the current timestamp
     * @return {Date} The current timestamp
     */
    now: Date.now || function() {
        return +new Date();
    },

    /**
     * Returns the number of milliseconds between two dates
     * @param {Date} dateA
     * @param {Date} dateB (optional) Defaults to now
     * @return {Number} The diff in milliseconds
     */
    getElapsed: function(dateA, dateB) {
        return Math.abs(dateA - (dateB || new Date()));
    }
};
/**
 * @class Ext.fx.target.Sprite
 * @private
 * @extends Object
 */

Ext.fx.target.Sprite = Ext.extend(Object, {

    isAnimTarget: true,

    constructor: function(target) {
        this.target = target;
        this.id = this.getId();
    },

    type: 'draw',

    getId: function() {
        return this.target.id;
    },

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
                    if (attr == 'translate') {
                        value = {
                            x: attPtr.x,
                            y: attPtr.y
                        };
                    }
                    else if (attr == 'rotate') {
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
                    else {
                        value = attPtr;
                    }
                    idx = Ext.Array.indexOf(spriteArr, spritePtr);
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
        this.target.redraw();
    }
});/**
 * @class Ext.fx.target.SpriteGroup
 * @extends Ext.fx.target.Sprite
 * @private
 */

Ext.fx.target.SpriteGroup = Ext.extend(Ext.fx.target.Sprite, {

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
};/**
 * @class Ext.fx.Easing
 * @singleton
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
(function() {
    var math = Math,
        pi = math.PI,
        pow = math.pow,
        sin = math.sin,
        sqrt = math.sqrt,
        abs = math.abs,
        backInSeed = 1.70158;
    Ext.fx.Easing = {
        // ease: Ext.fx.CubicBezier.cubicBezier(0.25, 0.1, 0.25, 1),
        // linear: Ext.fx.CubicBezier.cubicBezier(0, 0, 1, 1),
        // 'ease-in': Ext.fx.CubicBezier.cubicBezier(0.42, 0, 1, 1),
        // 'ease-out': Ext.fx.CubicBezier.cubicBezier(0, 0.58, 1, 1),
        // 'ease-in-out': Ext.fx.CubicBezier.cubicBezier(0.42, 0, 0.58, 1),
        // 'easeIn': Ext.fx.CubicBezier.cubicBezier(0.42, 0, 1, 1),
        // 'easeOut': Ext.fx.CubicBezier.cubicBezier(0, 0.58, 1, 1),
        // 'easeInOut': Ext.fx.CubicBezier.cubicBezier(0.42, 0, 0.58, 1)
    };

    Ext.apply(Ext.fx.Easing, {
        linear: function(n) {
            return n;
        },
        ease: function(n) {
            var q = 0.07813 - n / 2,
                alpha = -0.25,
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
            if (n == 0 || n == 1) {
                return n;
            }
            var p = 0.3,
                s = p / 4;
            return pow(2, -10 * n) * sin((n - s) * (2 * pi) / p) + 1;
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
        'back-in': Ext.fx.Easing.backIn,
        'back-out': Ext.fx.Easing.backOut,
        'ease-in': Ext.fx.Easing.easeIn,
        'ease-out': Ext.fx.Easing.easeOut,
        'bounce-out': Ext.fx.Easing.bounceOut,
        'elastic-in': Ext.fx.Easing.elasticIn,
        'easeInOut': Ext.fx.Easing.easeInOut,
        'ease-in-out': Ext.fx.Easing.easeInOut,
        // TODO
        'bounceIn': Ext.fx.Easing.bounceOut,
        'bounce-in': Ext.fx.Easing.bounceOut,
        'elastic-out': Ext.fx.Easing.elasticIn,
        'elasticOut': Ext.fx.Easing.elasticIn
    });
})();/**
 * @class Ext.fx.PropHandler
 * @ignore
 */

Ext.fx.PropHandler = {

//    requires: ['Ext.draw.Draw'],

        defaultHandler: {
            unitRE: /^(-?\d*\.?\d*){1}(em|ex|px|in|cm|mm|pt|pc|%)*$/,

            computeDelta: function(from, end, damper, initial) {
                damper = (typeof damper == 'number') ? damper : 1;
                var match = this.unitRE.exec(from),
                    start,
                    units;
                if (match) {
                    from = match[1];
                    units = match[2];
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

            get: function(from, end, damper, initialFrom) {
                var i,
                    initial,
                    ln = from.length,
                    out = [];
                for (i = 0; i < ln; i++) {
                    if (initialFrom) {
                        initial = initialFrom[i][1].from;
                    }
                    if (Ext.isArray(from[i][1]) && Ext.isArray(end)) {
                        var res = [];
                        for (var j = 0, len = from[i][1].length; j < len; j++) {
                            res.push(this.computeDelta(from[i][1][j], end[j], damper, initial));
                        }
                        out.push([from[i][0], res]);
                    } else {
                        out.push([from[i][0], this.computeDelta(from[i][1], end, damper, initial)]);
                    }
                }
                return out;
            },

            set: function(values, easing) {
                var i,
                    ln = values.length,
                    out = [],
                    val;
                for (i = 0; i < ln; i++) {
                    val  = values[i][1];
                    if (Ext.isArray(val)) {
                        var res = [];
                        for (var j = 0, len = val.length; j < len; j++) {
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
                var out = {};
                for(var p in prop) {
                    out[p] = parseInt(prop[p], 10) * damper;
                }
                return out;
            },

            computeDelta: function(from, end, damper, initial) {
                from = this.interpolate(from);
                end = this.interpolate(end, damper);
                var start = initial ? initial : from,
                    delta = {};

                for(var p in end) {
                    delta[p] = end[p] - start[p];
                }
                return {
                    from:  from,
                    delta: delta
                };
            },

            get: function(start, end, damper, initialFrom) {
                var i,
                    initial,
                    ln = start.length,
                    out = [];
                for (i = 0; i < ln; i++) {
                    if (initialFrom) {
                        initial = initialFrom[i][1].from;
                    }
                    out.push([start[i][0], this.computeDelta(start[i][1], end, damper, initial)]);
                }
                return out;
            },

            set: function(values, easing) {
                var i,
                    ln = values.length,
                    out = [],
                    outObject = {},
                    from, delta, val;
                for (i = 0; i < ln; i++) {
                    val  = values[i][1];
                    from = val.from;
                    delta = val.delta;
                    for(var p in from) {
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
                var i,
                    j,
                    k,
                    path,
                    startPath,
                    endPath = this.forcePath(end),
                    deltaPath,
                    initial,
                    out = [],
                    startLn = start.length,
                    startPathLn,
                    pointsLn;
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
                var i,
                    j,
                    k,
                    newPath,
                    calcPath,
                    deltaPath,
                    deltaPathLn,
                    pointsLn,
                    ln = values.length,
                    out = [];
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
        /* End Definitions */
//    }
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
        this[prop] = this.color;
    }, Ext.fx.PropHandler);
/**
 * Singleton that holds configurations for PseudoEasing paths.
 * @private
 * @class Ext.fx.PseudoEasing
 * PseudoEasing combines multiple cubic-bezier curves and creates an Ext.fx.Animation to achieve more complex effects.
 * <h2>Extended Pseudo Easing Values:</h2>
 * <div class="mdetail-params"><ul>
 * <li><b><tt>back-in</tt></b></li>
 * <li><b><tt>back-out</tt></b></li>
 * <li><b><tt>bounce-in</tt></b></li>
 * <li><b><tt>bounce-out</tt></b></li>
 * <li><b><tt>elastic-in</tt></b></li>
 * <li><b><tt>elastic-out</tt></b></li>
 * </ul></div>
 * @singleton
 */

Ext.fx.PseudoEasing = {

    'back-in': {
        isPseudoEasing: true,
        '40%': {
            easing: 'ease-in-out',
            damper: -0.1
        },
        '100%': {
            easing: 'ease-in',
            damper: 1.1
        }
    },
    'back-out': {
        isPseudoEasing: true,
        '60%': {
            easing: 'ease-out',
            damper: 1.1
        },
        '100%': {
            easing: 'ease-in-out',
            damper: -0.1
        }
    },
    'bounce-out': {
        isPseudoEasing: true,
        '36%': {
            easing: 'ease-in',
            damper: 1
        },
        '54%': {
            easing: 'ease-out',
            damper: -0.25
        },
        '72%': {
            easing: 'ease-in',
            damper: 0.25
        },
        '81%': {
            easing: 'ease-out',
            damper: -0.0625
        },
        '90%': {
            easing: 'ease-in',
            damper: 0.0625
        },
        '95%': {
            easing: 'ease-out',
            damper: -0.015
        },
        '100%': {
            easing: 'ease-in',
            damper: 0.015
        }
    },
    'bounce-in': {
        isPseudoEasing: true,
        '5%': {
            easing: 'ease-in',
            damper: 0.015
        },
        '10%': {
            easing: 'ease-out',
            damper: -0.015
        },
        '19%': {
            easing: 'ease-in',
            damper: 0.0625
        },
        '28%': {
            easing: 'ease-out',
            damper: -0.0625
        },
        '46%': {
            easing: 'ease-in',
            damper: 0.25
        },
        '64%': {
            easing: 'ease-out',
            damper: -0.25
        },
        '100%': {
            easing: 'ease-in',
            damper: 1
        }
    },
    'elastic-in': {
        isPseudoEasing: true,
        '14%': {
            easing: 'ease-in',
            damper: 0.005
        },
        '29%': {
            easing: 'ease-in-out',
            damper: -0.015
        },
        '43%': {
            easing: 'ease-in-out',
            damper: 0.025
        },
        '57%': {
            easing: 'ease-in-out',
            damper: -0.065
        },
        '71%': {
            easing: 'ease-in-out',
            damper: 0.19
        },
        '86%': {
            easing: 'ease-in-out',
            damper: -0.51
        },
        '100%': {
            easing: 'ease-out',
            damper: 1.37
        }
    },
    'elastic-out': {
        isPseudoEasing: true,
        '14%': {
            easing: 'ease-in',
            damper: 1.37
        },
        '29%': {
            easing: 'ease-in-out',
            damper: -0.51
        },
        '43%': {
            easing: 'ease-in-out',
            damper: 0.19
        },
        '57%': {
            easing: 'ease-in-out',
            damper: -0.065
        },
        '71%': {
            easing: 'ease-in-out',
            damper: 0.025
        },
        '86%': {
            easing: 'ease-in-out',
            damper: -0.015
        },
        '100%': {
            easing: 'ease-out',
            damper: 0.005
        }
    }
};/**
 * @class Ext.fx.Queue
 * Animation Queue mixin to handle chaining and queueing by target.
 * @private
 */

Ext.fx.Queue = Ext.extend(Object, {
    //requires: ['Ext.util.HashMap'],

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
    stopFx: function(targetId) {
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
    hasActiveFx: function(targetId) {
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
                    me.stopFx(targetId);
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
            Ext.Array.remove(queue, anim);
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
});/**
 * @class Ext.fx.Animator
 * Animation instance
 * @ignore
 */
Ext.fx.Animator = Ext.extend(Ext.util.Observable, {

    //requires: ['Ext.fx.Manager'],

    /* End Definitions */

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
            prevMs, ms, i, ln, pct, anim, nextAnim, attr;

        if (keyframes.isPseudoEasing) {
            me.isPseudoEasing = true;
        }
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
            reverse = me.reverse,
            isPseudoEasing = me.isPseudoEasing,
            ln = timeline.length,
            anim, easing, damper, initial, attrs, lastAttrs, i;

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
});/**
 * @class Ext.fx.Anim
 * Animation instance...
 */

Ext.fx.Anim = Ext.extend(Ext.util.Observable, {

    //requires: ['Ext.fx.Manager', 'Ext.fx.Animator', 'Ext.fx.Easing', 'Ext.fx.CubicBezier', 'Ext.fx.PropHandler'],
   
    /* End Definitions */

    isAnimation: true,
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
     * @cfg {string/object} target
     * The Ext.fx.target to apply the animation to.  This should only be specified when creating an Ext.fx.Anim directly.
     */

    /**
     * @cfg {Object} from
     * An object containing property/value pairs for the beginning of the animation.  If not specified, the current state of the
     * Ext.fx.target will be used. For example:
<pre><code>
from : {
    opactiy: 0,       // Transparent
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
     opactiy: 1,       // Opaque
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
        if (me.from == undefined) {
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
            'afteranimate'
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
                if (!Ext.fx.PropHandler[attr]) {
                    if (Ext.isObject(end)) {
                        propHandler = me.propHandlers[attr] = Ext.fx.PropHandler.object;
                    } else {
                        propHandler = me.propHandlers[attr] = Ext.fx.PropHandler.defaultHandler;
                    }
                }
                // Use custom handler
                else {
                    propHandler = me.propHandlers[attr] = Ext.fx.PropHandler[attr];
                }
                out[attr] = propHandler.get(start, end, me.damper, initialFrom[attr]);
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
 * @class Ext.util.TaskRunner
 * Provides the ability to execute one or more arbitrary tasks in a multithreaded
 * manner.  Generally, you can use the singleton {@link Ext.TaskMgr} instead, but
 * if needed, you can create separate instances of TaskRunner.  Any number of
 * separate tasks can be started at any time and will run independently of each
 * other. Example usage:
 * <pre><code>
// Start a simple clock task that updates a div once per second
var updateClock = function(){
    Ext.fly('clock').update(new Date().format('g:i:s A'));
} 
var task = {
    run: updateClock,
    interval: 1000 //1 second
}
var runner = new Ext.util.TaskRunner();
runner.start(task);

// equivalent using TaskMgr
Ext.TaskMgr.start({
    run: updateClock,
    interval: 1000
});

 * </code></pre>
 * <p>See the {@link #start} method for details about how to configure a task object.</p>
 * Also see {@link Ext.util.DelayedTask}. 
 * 
 * @constructor
 * @param {Number} interval (optional) The minimum precision in milliseconds supported by this TaskRunner instance
 * (defaults to 10)
 */

Ext.util.TaskRunner = function(interval) {
    interval = interval || 10;
    var tasks = [],
    removeQueue = [],
    id = 0,
    running = false,

    // private
    stopThread = function() {
        running = false;
        clearInterval(id);
        id = 0;
    },

    // private
    startThread = function() {
        if (!running) {
            running = true;
            id = setInterval(runTasks, interval);
        }
    },

    // private
    removeTask = function(t) {
        removeQueue.push(t);
        if (t.onStop) {
            t.onStop.apply(t.scope || t);
        }
    },

    // private
    runTasks = function() {
        var rqLen = removeQueue.length,
            now = new Date().getTime(),
            i;

        if (rqLen > 0) {
            for (i = 0; i < rqLen; i++) {
                Ext.Array.remove(tasks, removeQueue[i]);
            }
            removeQueue = [];
            if (tasks.length < 1) {
                stopThread();
                return;
            }
        }
        i = 0;
        var t,
            itime,
            rt,
            len = tasks.length;
        for (; i < len; ++i) {
            t = tasks[i];
            itime = now - t.taskRunTime;
            if (t.interval <= itime) {
                rt = t.run.apply(t.scope || t, t.args || [++t.taskRunCount]);
                t.taskRunTime = now;
                if (rt === false || t.taskRunCount === t.repeat) {
                    removeTask(t);
                    return;
                }
            }
            if (t.duration && t.duration <= (now - t.taskStartTime)) {
                removeTask(t);
            }
        }
    };

    /**
     * Starts a new task.
     * @method start
     * @param {Object} task <p>A config object that supports the following properties:<ul>
     * <li><code>run</code> : Function<div class="sub-desc"><p>The function to execute each time the task is invoked. The
     * function will be called at each interval and passed the <code>args</code> argument if specified, and the
     * current invocation count if not.</p>
     * <p>If a particular scope (<code>this</code> reference) is required, be sure to specify it using the <code>scope</code> argument.</p>
     * <p>Return <code>false</code> from this function to terminate the task.</p></div></li>
     * <li><code>interval</code> : Number<div class="sub-desc">The frequency in milliseconds with which the task
     * should be invoked.</div></li>
     * <li><code>args</code> : Array<div class="sub-desc">(optional) An array of arguments to be passed to the function
     * specified by <code>run</code>. If not specified, the current invocation count is passed.</div></li>
     * <li><code>scope</code> : Object<div class="sub-desc">(optional) The scope (<tt>this</tt> reference) in which to execute the
     * <code>run</code> function. Defaults to the task config object.</div></li>
     * <li><code>duration</code> : Number<div class="sub-desc">(optional) The length of time in milliseconds to invoke
     * the task before stopping automatically (defaults to indefinite).</div></li>
     * <li><code>repeat</code> : Number<div class="sub-desc">(optional) The number of times to invoke the task before
     * stopping automatically (defaults to indefinite).</div></li>
     * </ul></p>
     * <p>Before each invocation, Ext injects the property <code>taskRunCount</code> into the task object so
     * that calculations based on the repeat count can be performed.</p>
     * @return {Object} The task
     */
    this.start = function(task) {
        tasks.push(task);
        task.taskStartTime = new Date().getTime();
        task.taskRunTime = 0;
        task.taskRunCount = 0;
        startThread();
        return task;
    };

    /**
     * Stops an existing running task.
     * @method stop
     * @param {Object} task The task to stop
     * @return {Object} The task
     */
    this.stop = function(task) {
        removeTask(task);
        return task;
    };

    /**
     * Stops all tasks that are currently running.
     * @method stopAll
     */
    this.stopAll = function() {
        stopThread();
        for (var i = 0, len = tasks.length; i < len; i++) {
            if (tasks[i].onStop) {
                tasks[i].onStop();
            }
        }
        tasks = [];
        removeQueue = [];
    };
};

/**
 * @class Ext.TaskMgr
 * @extends Ext.util.TaskRunner
 * A static {@link Ext.util.TaskRunner} instance that can be used to start and stop arbitrary tasks.  See
 * {@link Ext.util.TaskRunner} for supported methods and task config properties.
 * <pre><code>
// Start a simple clock task that updates a div once per second
var task = {
    run: function(){
        Ext.fly('clock').update(new Date().format('g:i:s A'));
    },
    interval: 1000 //1 second
}
Ext.TaskMgr.start(task);
</code></pre>
 * <p>See the {@link #start} method for details about how to configure a task object.</p>
 * @singleton
 */
Ext.TaskMgr = new Ext.util.TaskRunner();/**
 * @class Ext.fx.Manager
 * Animation Manager which keeps track of all current animations and manages them on a frame by frame basis.
 * @private
 * @singleton
 */

Ext.fx.AnimateQueue = Ext.extend(Ext.fx.Queue, {
    /*
    requires: ['Ext.util.MixedCollection',
               'Ext.fx.target.Element',
               'Ext.fx.target.CompositeElement',
               'Ext.fx.target.Sprite',
               'Ext.fx.target.SpriteGroup',
               'Ext.fx.target.Component'],
    */

    constructor: function() {
        this.items = new Ext.util.MixedCollection();
        Ext.fx.AnimateQueue.superclass.constructor.call(this);
    },

    /**
     * @cfg {Number} interval Default interval in miliseconds to calculate each frame.  Defaults to 16ms (~60fps)
     */
    interval: 16,

    /**
     * @cfg {Boolean} forceJS Turn off to not use CSS3 transitions when they are available
     */
    forceJS: true,

    // @private Target factory
    createTarget: function(target) {
        var me = this,
            useCSS3 = !me.forceJS && Ext.supports.Transitions,
            targetObj;

        me.useCSS3 = useCSS3;

        // dom id
        if (Ext.isString(target)) {
            target = Ext.get(target);
        }
        if (Ext.isObject(target)) {
            // dom element
            if (target.tagName) {
                targetObj = Ext.get(target);
                me.targets.add(targetObj);
                return targetObj;
            }
            // Element
            else if (target.dom) {
                //console.log("It is Element in animate, don't support it");
                var cla = 'Ext.fx.target.' + 'Element' + (useCSS3 ? 'CSS' : '');
                targetObj = new cla(target);
            }
            // Element Composite
            else if (target.isComposite) {
                console.log("It is Element Composite in animate, don't support it");
                //targetObj = Ext.create('Ext.fx.target.' + 'CompositeElement' + (useCSS3 ? 'CSS' : ''), target);
            }
            // Draw Sprite
            else if (target.isSprite) {
                targetObj = new Ext.fx.target.Sprite(target);
            }
            // Draw Sprite Composite
            else if (target.isSpriteGroup) {
                targetObj = Ext.fx.target.SpriteGroup(target);
            }
            // Component
            else if (target.isComponent) {
                //console.log("It is Component in animate, don't support it");
                targetObj = new Ext.fx.target.Component(target);
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
        var items = this.items,
            task = this.task;
        // var me = this,
        //     items = me.items,
        //     cb = function() {
        //         if (items.length) {
        //             me.task = true;
        //             me.runner();
        //             me.requestAnimFrame(cb);
        //         }
        //         else {
        //             me.task = false;
        //         }
        //     };

        items.add(anim);

        // Start the timer if not already running
        if (!task && items.length) {
            task = this.task = {
                run: this.runner,
                interval: this.interval,
                scope: this
            };
            Ext.TaskMgr.start(task);
        }

        // //Start the timer if not already running
        // if (!me.task && items.length) {
        //     me.requestAnimFrame(cb);
        // }
    },

    /**
     * Remove an Anim from the manager. This is done automatically when an Anim ends.
     * @param {Ext.fx.Anim} anim
     */
    removeAnim: function(anim) {
        // this.items.remove(anim);
        var items = this.items,
            task = this.task;
        items.remove(anim);
        // Stop the timer if there are no more managed Anims
        if (task && !items.length) {
            Ext.TaskMgr.stop(task);
            delete this.task;
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
        var me = this,
            items = me.items;

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
            useCSS3 = me.useCSS3 && anim.target.type == 'element',
            elapsedTime = me.timestamp - anim.startTime,
            target, o;

        this.collectTargetData(anim, elapsedTime, useCSS3);

        // For CSS3 animation, we need to immediately set the first frame's attributes without any transition
        // to get a good initial state, then add the transition properties and set the final attributes.
        if (useCSS3) {
            // Flush the collected attributes, without transition
            anim.target.setAttr(me.targetData[targetId], true);

            // Add the end frame data
            me.targetData[targetId] = [];
            me.collectTargetData(anim, anim.duration, useCSS3);

            // Pause the animation so runAnim doesn't keep getting called
            anim.paused = true;

            target = anim.target.target;
            // We only want to attach an event on the last element in a composite
            if (anim.target.isComposite) {
                target = anim.target.target.last();
            }

            // Listen for the transitionend event
            o = {};
            o[Ext.supports.CSS3TransitionEnd] = anim.lastFrame;
            o.scope = anim;
            o.single = true;
            target.on(o);
        }
        // For JS animation, trigger the lastFrame handler if this is the final frame
        else if (elapsedTime >= anim.duration) {
            me.applyPendingAttrs(true);
            delete me.targetData[targetId];
            delete me.targetArr[targetId];
            anim.lastFrame();
        }
    },

    /**
     * Collect target attributes for the given Anim object at the given timestamp
     * @param {Ext.fx.Anim} anim The Anim instance
     * @param {Number} timestamp Time after the anim's start time
     */
    collectTargetData: function(anim, elapsedTime, useCSS3) {
        var targetId = anim.target.getId(),
            targetData = this.targetData[targetId],
            data;
        
        if (!targetData) {
            targetData = this.targetData[targetId] = [];
            this.targetArr[targetId] = anim.target;
        }

        data = {
            duration: anim.duration,
            easing: (useCSS3 && anim.reverse) ? anim.easingFn.reverse().toCSS3() : anim.easing,
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
});

Ext.fx.Manager = new Ext.fx.AnimateQueue();/**
 * @class Ext.util.Animate
 * A mixin to add animation capabilities to Elements/CompositeElements/Sprites/SpriteGroups/Components
 */
Ext.util.Animate = Ext.extend(Object, {
    
    //uses: ['Ext.fx.Manager', 'Ext.fx.Anim'],

    /**
     * Perform custom animation on this element.
     * @param {Ext.fx.Anim} animObj An Ext.fx Anim object
     * @return {Ext.core.Element} this
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

        if (config.stopFx) {
            me.stopFx();
        }

        Ext.applyIf(config, Ext.fx.Manager.getFxDefaults(me.id));

        return Ext.apply({
            target: me,
            paused: true
        }, config);
    },

    /**
     * Stops any running effects and clears the element's internal effects queue if it contains
     * any additional effects that haven't started yet.
     * @return {Ext.core.Element} The Element
     */
    stopFx: function() {
        Ext.fx.Manager.stopFx(this.id);
    },

    /**
     * Ensures that all effects queued after syncFx is called on the element are
     * run concurrently.  This is the opposite of {@link #sequenceFx}.
     * @return {Ext.core.Element} The Element
     */
    syncFx: function() {
        Ext.fx.Manager.setFxDefaults(this.id, {
            concurrent: true
        });
    },

    /**
     * Ensures that all effects queued after sequenceFx is called on the element are
     * run in sequence.  This is the opposite of {@link #syncFx}.
     * @return {Ext.core.Element} The Element
     */
    sequenceFx: function() {
        Ext.fx.Manager.setFxDefaults(this.id, {
            concurrent: false
        });
    },

    /**
     * Returns thq current animation if the element has any effects actively running or queued, else returns false.
     * @return {Mixed} anim if element has active effects, else false
     */
    hasActiveFx: function() {
        return Ext.fx.Manager.hasActiveFx(this.id);
    }
});

/**
 * @class Ext.layout.component.Draw
 * @extends Ext.layout.Component
 * @private
 *
 */

Ext.layout.Draw = Ext.extend(Ext.layout.AutoComponentLayout , {

    type: 'draw',

    onLayout : function(width, height) {
        this.owner.surface.setSize(width, height);
        Ext.layout.Draw.superclass.onLayout.apply(this, arguments);
    }
});

Ext.regLayout('draw', Ext.layout.Draw);
/**
 * @class Ext.chart.Callouts
 * @ignore
 */
Ext.chart.Callouts = Ext.extend(Object, {

    constructor: function(config) {
        if (config.callouts) {
            config.callouts.styles = Ext.applyIf(config.callouts.styles || {}, {
                color: "#000",
                font: "11px Helvetica, sans-serif"
            });
            this.callouts = Ext.apply(this.callouts || {}, config.callouts);
            this.calloutsArray = [];
        }
    },

    renderCallouts: function() {
        if (!this.callouts) {
            return;
        }

        var me = this,
            items = me.items,
            animate = me.chart.animate,
            config = me.callouts,
            styles = config.styles,
            group = me.calloutsArray,
            store = me.chart.store,
            len = store.getCount(),
            ratio = items.length / len,
            previouslyPlacedCallouts = [],
            i,
            count,
            j,
            p;
            
        for (i = 0, count = 0; i < len; i++) {
            for (j = 0; j < ratio; j++) {
                var item = items[count],
                    label = group[count],
                    storeItem = store.getAt(i),
                    display;
                
                display = config.filter(storeItem);
                
                if (!display && !label) {
                    count++;
                    continue;               
                }
                
                if (!label) {
                    group[count] = label = me.onCreateCallout(storeItem, item, i, display, j, count);
                }
                for (p in label) {
                    if (label[p] && label[p].setAttributes) {
                        label[p].setAttributes(styles, true);
                    }
                }
                if (!display) {
                    for (p in label) {
                        if (label[p]) {
                            if (label[p].setAttributes) {
                                label[p].setAttributes({
                                    hidden: true
                                }, true);
                            } else if(label[p].setVisible) {
                                label[p].setVisible(false);
                            }
                        }
                    }
                }
                config.renderer(label, storeItem);
                me.onPlaceCallout(label, storeItem, item, i, display, animate,
                                  j, count, previouslyPlacedCallouts);
                previouslyPlacedCallouts.push(label);
                count++;
            }
        }
        this.hideCallouts(count);
    },

    onCreateCallout: function(storeItem, item, i, display) {
        var me = this,
            group = me.calloutsGroup,
            config = me.callouts,
            styles = config.styles,
            width = styles.width,
            height = styles.height,
            chart = me.chart,
            surface = chart.surface,
            calloutObj = {
                //label: false,
                //box: false,
                lines: false
            };

        calloutObj.lines = surface.add(Ext.apply({},
        {
            type: 'path',
            path: 'M0,0',
            stroke: me.getLegendColor() || '#555'
        },
        styles));

        if (config.items) {
            calloutObj.panel = new Ext.Panel({
                style: "position: absolute;",    
                width: width,
                height: height,
                items: config.items,
                renderTo: chart.el
            });
        }

        return calloutObj;
    },

    hideCallouts: function(index) {
        var calloutsArray = this.calloutsArray,
            len = calloutsArray.length,
            co,
            p;
        while (len-->index) {
            co = calloutsArray[len];
            for (p in co) {
                if (co[p]) {
                    co[p].hide(true);
                }
            }
        }
    }
});
/**
 * @class Ext.chart.Mask
 *
 * Defines a mask for a chart's series.
 * The 'chart' member must be set prior to rendering.
 *
 * @constructor
 */
Ext.chart.Mask = Ext.extend(Ext.util.Observable, {
    
    constructor: function(config) {
        var me = this;

        me.addEvents('select');

        if (config) {
            Ext.apply(me, config);
        }
        if (me.mask) {
            me.on('afterrender', function() {
                //create a mask layer component
                var comp = new Ext.chart.MaskLayer({
                    renderTo: me.el
                });
                comp.el.on({
                    'mousemove': function(e) {
                        me.onMouseMove(e);
                    },
                    'mouseup': function(e) {
                        me.resized(e);
                    }
                });
                //create a resize handler for the component
                var resizeHandler = new Ext.resizer.Resizer({
                    el: comp.el,
                    handles: 'all',
                    pinned: true
                });
                resizeHandler.on({
                    'resize': function(e) {
                        me.resized(e);    
                    }    
                });
                comp.initDraggable();
                
                me.mask = comp;
                me.maskSprite = me.surface.add({
                    type: 'path',
                    path: ['M', 0, 0],
                    zIndex: 1001,
                    opacity: 0.7,
                    hidden: true,
                    stroke: '#444'
                });
            }, me, { single: true });
        }
    },
    
    resized: function(e) {
        var me = this,
            bbox = me.bbox || me.chartBBox,
            x = bbox.x,
            y = bbox.y,
            width = bbox.width,
            height = bbox.height,
            box = me.mask.getBox(true),
            max = Math.max,
            min = Math.min,
            staticX = box.x - x,
            staticY = box.y - y;
        
        staticX = max(staticX, x);
        staticY = max(staticY, y);
        staticX = min(staticX, width);
        staticY = min(staticY, height);
        box.x = staticX;
        box.y = staticY;
        me.fireEvent('select', me, box);
    },

    onMouseUp: function(e) {
        var me = this,
            bbox = me.bbox || me.chartBBox,
            sel = me.maskSelection;
        me.maskMouseDown = false;
        me.mouseDown = false;
        if (me.mouseMoved) {
            me.onMouseMove(e);
            me.mouseMoved = false;
            me.fireEvent('select', me, {
                x: sel.x - bbox.x,
                y: sel.y - bbox.y,
                width: sel.width,
                height: sel.height
            });
        }
    },

    onMouseDown: function(e) {
        var me = this;
        me.mouseDown = true;
        me.mouseMoved = false;
        me.maskMouseDown = {
            x: e.getPageX() - me.el.getX(),
            y: e.getPageY() - me.el.getY()
        };
    },

    onMouseMove: function(e) {
        var me = this,
            mask = me.mask,
            bbox = me.bbox || me.chartBBox,
            x = bbox.x,
            y = bbox.y,
            math = Math,
            floor = math.floor,
            abs = math.abs,
            min = math.min,
            max = math.max,
            height = floor(y + bbox.height),
            width = floor(x + bbox.width),
            posX = e.getPageX(),
            posY = e.getPageY(),
            staticX = posX - me.el.getX(),
            staticY = posY - me.el.getY(),
            maskMouseDown = me.maskMouseDown,
            path;
        
        me.mouseMoved = me.mouseDown;
        staticX = max(staticX, x);
        staticY = max(staticY, y);
        staticX = min(staticX, width);
        staticY = min(staticY, height);
        if (maskMouseDown && me.mouseDown) {
            if (mask == 'horizontal') {
                staticY = y;
                maskMouseDown.y = height;
            }
            else if (mask == 'vertical') {
                staticX = x;
                maskMouseDown.x = width;
            }
            width = maskMouseDown.x - staticX;
            height = maskMouseDown.y - staticY;
            path = ['M', staticX, staticY, 'l', width, 0, 0, height, -width, 0, 'z'];
            me.mask
            me.maskSelection = {
                x: width > 0 ? staticX : staticX + width,
                y: height > 0 ? staticY : staticY + height,
                width: abs(width),
                height: abs(height)
            };
            me.mask.updateBox({
                x: posX - abs(width),
                y: posY - abs(height),
                width: abs(width),
                height: abs(height)
            });
            me.mask.show();
            me.maskSprite.setAttributes({
                hidden: true    
            }, true);
        }
        else {
            if (mask == 'horizontal') {
                path = ['M', staticX, y, 'L', staticX, height];
            }
            else if (mask == 'vertical') {
                path = ['M', x, staticY, 'L', width, staticY];
            }
            else {
                path = ['M', staticX, y, 'L', staticX, height, 'M', x, staticY, 'L', width, staticY];
            }
            me.maskSprite.setAttributes({
                path: path,
                fill: me.maskMouseDown ? me.maskSprite.stroke : false,
                'stroke-width': mask === true ? 1 : 3,
                hidden: false
            }, true);
        }
    },

    onMouseLeave: function(e) {
        var me = this;
        me.mouseMoved = false;
        me.mouseDown = false;
        me.maskMouseDown = false;
        me.mask.hide();
        me.maskSprite.hide(true);
    }
});
    /**
 * @class Ext.chart.Shapes
 * @ignore
 */
Ext.chart.Shapes = {

    //singleton: true,

    circle: function (surface, opts) {
        return surface.add(Ext.apply({
            type: 'circle',
            x: opts.x,
            y: opts.y,
            stroke: null,
            radius: opts.radius
        }, opts));
    },
    line: function (surface, opts) {
        return surface.add(Ext.apply({
            type: 'rect',
            x: opts.x - opts.radius,
            y: opts.y - opts.radius,
            height: 2 * opts.radius,
            width: 2 * opts.radius / 5
        }, opts));
    },
    square: function (surface, opts) {
        return surface.add(Ext.applyIf({
            type: 'rect',
            x: opts.x - opts.radius,
            y: opts.y - opts.radius,
            height: 2 * opts.radius,
            width: 2 * opts.radius,
            radius: null
        }, opts));
    },
    triangle: function (surface, opts) {
        opts.radius *= 1.75;
        return surface.add(Ext.apply({
            type: 'path',
            stroke: null,
            path: "M".concat(opts.x, ",", opts.y, "m0-", opts.radius * 0.58, "l", opts.radius * 0.5, ",", opts.radius * 0.87, "-", opts.radius, ",0z")
        }, opts));
    },
    diamond: function (surface, opts) {
        var r = opts.radius;
        r *= 1.5;
        return surface.add(Ext.apply({
            type: 'path',
            stroke: null,
            path: ["M", opts.x, opts.y - r, "l", r, r, -r, r, -r, -r, r, -r, "z"]
        }, opts));
    },
    cross: function (surface, opts) {
        var r = opts.radius;
        r = r / 1.7;
        return surface.add(Ext.apply({
            type: 'path',
            stroke: null,
            path: "M".concat(opts.x - r, ",", opts.y, "l", [-r, -r, r, -r, r, r, r, -r, r, r, -r, r, r, r, -r, r, -r, -r, -r, r, -r, -r, "z"])
        }, opts));
    },
    plus: function (surface, opts) {
        var r = opts.radius / 1.3;
        return surface.add(Ext.apply({
            type: 'path',
            stroke: null,
            path: "M".concat(opts.x - r / 2, ",", opts.y - r / 2, "l", [0, -r, r, 0, 0, r, r, 0, 0, r, -r, 0, 0, r, -r, 0, 0, -r, -r, 0, 0, -r, "z"])
        }, opts));
    },
    arrow: function (surface, opts) {
        var r = opts.radius;
        return surface.add(Ext.apply({
            type: 'path',
            path: "M".concat(opts.x - r * 0.7, ",", opts.y - r * 0.4, "l", [r * 0.6, 0, 0, -r * 0.4, r, r * 0.8, -r, r * 0.8, 0, -r * 0.4, -r * 0.6, 0], "z")
        }, opts));
    },
    drop: function (surface, x, y, text, size, angle) {
        size = size || 30;
        angle = angle || 0;
        surface.add({
            type: 'path',
            path: ['M', x, y, 'l', size, 0, 'A', size * 0.4, size * 0.4, 0, 1, 0, x + size * 0.7, y - size * 0.7, 'z'],
            fill: '#000',
            stroke: 'none',
            rotate: {
                degrees: 22.5 - angle,
                x: x,
                y: y
            }
        });
        angle = (angle + 90) * Math.PI / 180;
        surface.add({
            type: 'text',
            x: x + size * Math.sin(angle) - 10, // Shift here, Not sure why.
            y: y + size * Math.cos(angle) + 5,
            text:  text,
            'font-size': size * 12 / 40,
            stroke: 'none',
            fill: '#fff'
        });
    }
};/**
 * @class Ext.draw.Color
 * @extends Object
 *
 * Represents an RGB color and provides helper functions get
 * color components in HSL color space.
 */
Ext.draw.Color = Ext.extend(Object, {

    colorToHexRe: /(.*?)rgb\((\d+),\s*(\d+),\s*(\d+)\)/,
    rgbRe: /\s*rgb\s*\(\s*([0-9]+)\s*,\s*([0-9]+)\s*,\s*([0-9]+)\s*\)\s*/,
    hexRe: /\s*#([0-9a-fA-F][0-9a-fA-F]?)([0-9a-fA-F][0-9a-fA-F]?)([0-9a-fA-F][0-9a-fA-F]?)\s*/,

    /**
     * @cfg {Number} lightnessFactor
     *
     * The default factor to compute the lighter or darker color. Defaults to 0.2.
     */
    lightnessFactor: 0.2,

    /**
     * @constructor
     * @param {Number} red Red component (0..255)
     * @param {Number} green Green component (0..255)
     * @param {Number} blue Blue component (0..255)
     */
    constructor : function(red, green, blue) {
        var me = this,
            clamp = Ext.Number.constrain;
        me.r = clamp(red, 0, 255);
        me.g = clamp(green, 0, 255);
        me.b = clamp(blue, 0, 255);
    },

    /**
     * Get the red component of the color, in the range 0..255.
     * @return {Number}
     */
    getRed: function() {
        return this.r;
    },

    /**
     * Get the green component of the color, in the range 0..255.
     * @return {Number}
     */
    getGreen: function() {
        return this.g;
    },

    /**
     * Get the blue component of the color, in the range 0..255.
     * @return {Number}
     */
    getBlue: function() {
        return this.b;
    },

    /**
     * Get the RGB values.
     * @return {Array}
     */
    getRGB: function() {
        var me = this;
        return [me.r, me.g, me.b];
    },

    /**
     * Get the equivalent HSL components of the color.
     * @return {Array}
     */
    getHSL: function() {
        var me = this,
            r = me.r / 255,
            g = me.g / 255,
            b = me.b / 255,
            max = Math.max(r, g, b),
            min = Math.min(r, g, b),
            delta = max - min,
            h,
            s = 0,
            l = 0.5 * (max + min);

        // min==max means achromatic (hue is undefined)
        if (min != max) {
            s = (l < 0.5) ? delta / (max + min) : delta / (2 - max - min);
            if (r == max) {
                h = 60 * (g - b) / delta;
            } else if (g == max) {
                h = 120 + 60 * (b - r) / delta;
            } else {
                h = 240 + 60 * (r - g) / delta;
            }
            if (h < 0) {
                h += 360;
            }
            if (h >= 360) {
                h -= 360;
            }
        }
        return [h, s, l];
    },

    /**
     * Return a new color that is lighter than this color.
     * @param {Number} factor Lighter factor (0..1), default to 0.2
     * @return Ext.draw.Color
     */
    getLighter: function(factor) {
        var hsl = this.getHSL();
        factor = factor || this.lightnessFactor;
        hsl[2] = Ext.Number.constrain(hsl[2] + factor, 0, 1);
        return this.fromHSL(hsl[0], hsl[1], hsl[2]);
    },

    /**
     * Return a new color that is darker than this color.
     * @param {Number} factor Darker factor (0..1), default to 0.2
     * @return Ext.draw.Color
     */
    getDarker: function(factor) {
        factor = factor || this.lightnessFactor;
        return this.getLighter(-factor);
    },

    /**
     * Return the color in the hex format, i.e. '#rrggbb'.
     * @return {String}
     */
    toString: function() {
        var me = this,
            round = Math.round,
            r = round(me.r).toString(16),
            g = round(me.g).toString(16),
            b = round(me.b).toString(16);
        r = (r.length == 1) ? '0' + r : r;
        g = (g.length == 1) ? '0' + g : g;
        b = (b.length == 1) ? '0' + b : b;
        return ['#', r, g, b].join('');
    },

    /**
     * Convert a color to hexadecimal format.
     *
     * @param {String|Array} color The color value (i.e 'rgb(255, 255, 255)', 'color: #ffffff').
     * Can also be an Array, in this case the function handles the first member.
     * @returns {String} The color in hexadecimal format.
     */
    toHex: function(color) {
        if (Ext.isArray(color)) {
            color = color[0];
        }
        if (!Ext.isString(color)) {
            return '';
        }
        if (color.substr(0, 1) === '#') {
            return color;
        }
        var digits = this.colorToHexRe.exec(color);

        if (Ext.isArray(digits)) {
            var red = parseInt(digits[2], 10),
                green = parseInt(digits[3], 10),
                blue = parseInt(digits[4], 10),
                rgb = blue | (green << 8) | (red << 16);
            return digits[1] + '#' + ("000000" + rgb.toString(16)).slice(-6);
        }
        else {
            return '';
        }
    },

    /**
     * Parse the string and create a new color.
     *
     * Supported formats: '#rrggbb', '#rgb', and 'rgb(r,g,b)'.
     *
     * If the string is not recognized, an undefined will be returned instead.
     *
     * @param {String} str Color in string.
     * @returns Ext.draw.Color
     */
    fromString: function(str) {
        var values, r, g, b,
            parse = parseInt;

        if ((str.length == 4 || str.length == 7) && str.substr(0, 1) === '#') {
            values = str.match(this.hexRe);
            if (values) {
                r = parse(values[1], 16) >> 0;
                g = parse(values[2], 16) >> 0;
                b = parse(values[3], 16) >> 0;
                if (str.length == 4) {
                    r += (r * 16);
                    g += (g * 16);
                    b += (b * 16);
                }
            }
        }
        else {
            values = str.match(this.rgbRe);
            if (values) {
                r = values[1];
                g = values[2];
                b = values[3];
            }
        }

        return (typeof r == 'undefined') ? undefined : new Ext.draw.Color(r, g, b);
    },

    /**
     * Returns the gray value (0 to 255) of the color.
     *
     * The gray value is calculated using the formula r*0.3 + g*0.59 + b*0.11.
     *
     * @returns {Number}
     */
    getGrayscale: function() {
        // http://en.wikipedia.org/wiki/Grayscale#Converting_color_to_grayscale
        return this.r * 0.3 + this.g * 0.59 + this.b * 0.11;
    },

    /**
     * Create a new color based on the specified HSL values.
     *
     * @param {Number} h Hue component (0..359)
     * @param {Number} s Saturation component (0..1)
     * @param {Number} l Lightness component (0..1)
     * @returns Ext.draw.Color
     */
    fromHSL: function(h, s, l) {
        var C, X, m, i, rgb = [],
            abs = Math.abs,
            floor = Math.floor;

        if (s == 0 || h == null) {
            // achromatic
            rgb = [l, l, l];
        }
        else {
            // http://en.wikipedia.org/wiki/HSL_and_HSV#From_HSL
            // C is the chroma
            // X is the second largest component
            // m is the lightness adjustment
            h /= 60;
            C = s * (1 - abs(2 * l - 1));
            X = C * (1 - abs(h - 2 * floor(h / 2) - 1));
            m = l - C / 2;
            switch (floor(h)) {
                case 0:
                    rgb = [C, X, 0];
                    break;
                case 1:
                    rgb = [X, C, 0];
                    break;
                case 2:
                    rgb = [0, C, X];
                    break;
                case 3:
                    rgb = [0, X, C];
                    break;
                case 4:
                    rgb = [X, 0, C];
                    break;
                case 5:
                    rgb = [C, 0, X];
                    break;
            }
            rgb = [rgb[0] + m, rgb[1] + m, rgb[2] + m];
        }
        return new Ext.draw.Color(rgb[0] * 255, rgb[1] * 255, rgb[2] * 255);
    }
});

Ext.draw.Color.fromHSL = function() {
    return Ext.draw.Color.prototype.fromHSL.apply(Ext.draw.Color.prototype, arguments);
};
Ext.draw.Color.fromString = function() {
    return Ext.draw.Color.prototype.fromString.apply(Ext.draw.Color.prototype, arguments);
};
Ext.draw.Color.toHex = function() {
    return Ext.draw.Color.prototype.toHex.apply(Ext.draw.Color.prototype, arguments);
};
/*
 * @class Ext.draw.Draw
 * Base Drawing class.  Provides base drawing functions.
 */
Ext.draw.Draw = Ext.extend(Object, {});
Ext.apply(Ext.draw.Draw, {

    //singleton: true,
    //requires: ['Ext.draw.Color'],

    pathToStringRE: /,?([achlmqrstvxz]),?/gi,
    pathCommandRE: /([achlmqstvz])[\s,]*((-?\d*\.?\d*(?:e[-+]?\d+)?\s*,?\s*)+)/ig,
    pathValuesRE: /(-?\d*\.?\d*(?:e[-+]?\d+)?)\s*,?\s*/ig,
    stopsRE: /^(\d+%?)$/,
    radian: Math.PI / 180,

    availableAnimAttrs: {
        along: "along",
        blur: null,
        "clip-rect": "csv",
        cx: null,
        cy: null,
        fill: "colour",
        "fill-opacity": null,
        "font-size": null,
        height: null,
        opacity: null,
        path: "path",
        r: null,
        rotation: "csv",
        rx: null,
        ry: null,
        scale: "csv",
        stroke: "colour",
        "stroke-opacity": null,
        "stroke-width": null,
        translation: "csv",
        width: null,
        x: null,
        y: null
    },

    is: function(o, type) {
        type = String(type).toLowerCase();
        return (type == "object" && o === Object(o)) ||
            (type == "undefined" && typeof o == type) ||
            (type == "null" && o == null) ||
            (type == "array" && Array.isArray && Array.isArray(o)) ||
            (Object.prototype.toString.call(o).toLowerCase().slice(8, -1)) == type;
    },

    ellipsePath: function(sprite) {
        var attr = sprite.attr;
        return Ext.String.format("M{0},{1}A{2},{3},0,1,1,{0},{4}A{2},{3},0,1,1,{0},{1}z", attr.x, attr.y - attr.ry, attr.rx, attr.ry, attr.y + attr.ry);
    },

    rectPath: function(sprite) {
        var attr = sprite.attr;
        if (attr.radius) {
            return Ext.String.format("M{0},{1}l{2},0a{3},{3},0,0,1,{3},{3}l0,{5}a{3},{3},0,0,1,{4},{3}l{6},0a{3},{3},0,0,1,{4},{4}l0,{7}a{3},{3},0,0,1,{3},{4}z", attr.x + attr.radius, attr.y, attr.width - attr.radius * 2, attr.radius, -attr.radius, attr.height - attr.radius * 2, attr.radius * 2 - attr.width, attr.radius * 2 - attr.height);
        }
        else {
            return Ext.String.format("M{0},{1}l{2},0,0,{3},{4},0z", attr.x, attr.y, attr.width, attr.height, -attr.width);
        }
    },

    path2string: function () {
        return this.join(",").replace(Ext.draw.Draw.pathToStringRE, "$1");
    },

    parsePathString: function (pathString) {
        if (!pathString) {
            return null;
        }
        var paramCounts = {a: 7, c: 6, h: 1, l: 2, m: 2, q: 4, s: 4, t: 2, v: 1, z: 0},
            data = [],
            me = this;
        if (me.is(pathString, "array") && me.is(pathString[0], "array")) { // rough assumption
            data = me.pathClone(pathString);
        }
        if (!data.length) {
            String(pathString).replace(me.pathCommandRE, function (a, b, c) {
                var params = [],
                    name = b.toLowerCase();
                c.replace(me.pathValuesRE, function (a, b) {
                    b && params.push(+b);
                });
                if (name == "m" && params.length > 2) {
                    data.push([b].concat(params.splice(0, 2)));
                    name = "l";
                    b = (b == "m") ? "l" : "L";
                }
                while (params.length >= paramCounts[name]) {
                    data.push([b].concat(params.splice(0, paramCounts[name])));
                    if (!paramCounts[name]) {
                        break;
                    }
                }
            });
        }
        data.toString = me.path2string;
        return data;
    },

    mapPath: function (path, matrix) {
        if (!matrix) {
            return path;
        }
        var x, y, i, ii, j, jj, pathi;
        path = this.path2curve(path);
        for (i = 0, ii = path.length; i < ii; i++) {
            pathi = path[i];
            for (j = 1, jj = pathi.length; j < jj-1; j += 2) {
                x = matrix.x(pathi[j], pathi[j + 1]);
                y = matrix.y(pathi[j], pathi[j + 1]);
                pathi[j] = x;
                pathi[j + 1] = y;
            }
        }
        return path;
    },

    pathClone: function(pathArray) {
        var res = [],
            j,
            jj,
            i,
            ii;
        if (!this.is(pathArray, "array") || !this.is(pathArray && pathArray[0], "array")) { // rough assumption
            pathArray = this.parsePathString(pathArray);
        }
        for (i = 0, ii = pathArray.length; i < ii; i++) {
            res[i] = [];
            for (j = 0, jj = pathArray[i].length; j < jj; j++) {
                res[i][j] = pathArray[i][j];
            }
        }
        res.toString = this.path2string;
        return res;
    },

    pathToAbsolute: function (pathArray) {
        if (!this.is(pathArray, "array") || !this.is(pathArray && pathArray[0], "array")) { // rough assumption
            pathArray = this.parsePathString(pathArray);
        }
        var res = [],
            x = 0,
            y = 0,
            mx = 0,
            my = 0,
            start = 0,
            i,
            ii,
            r,
            pa,
            j,
            jj,
            k,
            kk;
        if (pathArray[0][0] == "M") {
            x = +pathArray[0][1];
            y = +pathArray[0][2];
            mx = x;
            my = y;
            start++;
            res[0] = ["M", x, y];
        }
        for (i = start, ii = pathArray.length; i < ii; i++) {
            r = res[i] = [];
            pa = pathArray[i];
            if (pa[0] != pa[0].toUpperCase()) {
                r[0] = pa[0].toUpperCase();
                switch (r[0]) {
                    case "A":
                        r[1] = pa[1];
                        r[2] = pa[2];
                        r[3] = pa[3];
                        r[4] = pa[4];
                        r[5] = pa[5];
                        r[6] = +(pa[6] + x);
                        r[7] = +(pa[7] + y);
                        break;
                    case "V":
                        r[1] = +pa[1] + y;
                        break;
                    case "H":
                        r[1] = +pa[1] + x;
                        break;
                    case "M":
                        mx = +pa[1] + x;
                        my = +pa[2] + y;
                    default:
                        for (j = 1, jj = pa.length; j < jj; j++) {
                            r[j] = +pa[j] + ((j % 2) ? x : y);
                        }
                }
            } else {
                for (k = 0, kk = pa.length; k < kk; k++) {
                    res[i][k] = pa[k];
                }
            }
            switch (r[0]) {
                case "Z":
                    x = mx;
                    y = my;
                    break;
                case "H":
                    x = r[1];
                    break;
                case "V":
                    y = r[1];
                    break;
                case "M":
                    mx = res[i][res[i].length - 2];
                    my = res[i][res[i].length - 1];
                default:
                    x = res[i][res[i].length - 2];
                    y = res[i][res[i].length - 1];
            }
        }
        res.toString = this.path2string;
        return res;
    },

    pathToRelative: function (pathArray) {
        if (!this.is(pathArray, "array") || !this.is(pathArray && pathArray[0], "array")) {
            pathArray = this.parsePathString(pathArray);
        }
        var res = [],
            x = 0,
            y = 0,
            mx = 0,
            my = 0,
            start = 0;
        if (pathArray[0][0] == "M") {
            x = pathArray[0][1];
            y = pathArray[0][2];
            mx = x;
            my = y;
            start++;
            res.push(["M", x, y]);
        }
        for (var i = start, ii = pathArray.length; i < ii; i++) {
            var r = res[i] = [],
                pa = pathArray[i];
            if (pa[0] != pa[0].toLowerCase()) {
                r[0] = pa[0].toLowerCase();
                switch (r[0]) {
                    case "a":
                        r[1] = pa[1];
                        r[2] = pa[2];
                        r[3] = pa[3];
                        r[4] = pa[4];
                        r[5] = pa[5];
                        r[6] = +(pa[6] - x).toFixed(3);
                        r[7] = +(pa[7] - y).toFixed(3);
                        break;
                    case "v":
                        r[1] = +(pa[1] - y).toFixed(3);
                        break;
                    case "m":
                        mx = pa[1];
                        my = pa[2];
                    default:
                        for (var j = 1, jj = pa.length; j < jj; j++) {
                            r[j] = +(pa[j] - ((j % 2) ? x : y)).toFixed(3);
                        }
                }
            } else {
                r = res[i] = [];
                if (pa[0] == "m") {
                    mx = pa[1] + x;
                    my = pa[2] + y;
                }
                for (var k = 0, kk = pa.length; k < kk; k++) {
                    res[i][k] = pa[k];
                }
            }
            var len = res[i].length;
            switch (res[i][0]) {
                case "z":
                    x = mx;
                    y = my;
                    break;
                case "h":
                    x += +res[i][len - 1];
                    break;
                case "v":
                    y += +res[i][len - 1];
                    break;
                default:
                    x += +res[i][len - 2];
                    y += +res[i][len - 1];
            }
        }
        res.toString = this.path2string;
        return res;
    },

    //Returns a path converted to a set of curveto commands
    path2curve: function (path) {
        var me = this,
            points = me.pathToAbsolute(path),
            ln = points.length,
            attrs = {x: 0, y: 0, bx: 0, by: 0, X: 0, Y: 0, qx: null, qy: null},
            i, seg, segLn, point;
            
        for (i = 0; i < ln; i++) {
            points[i] = me.command2curve(points[i], attrs);
            if (points[i].length > 7) {
                    points[i].shift();
                    point = points[i];
                    while (point.length) {
                        points.splice(i++, 0, ["C"].concat(point.splice(0, 6)));
                    }
                    points.splice(i, 1);
                    ln = points.length;
                }
            seg = points[i];
            segLn = seg.length;
            attrs.x = seg[segLn - 2];
            attrs.y = seg[segLn - 1];
            attrs.bx = parseFloat(seg[segLn - 4]) || attrs.x;
            attrs.by = parseFloat(seg[segLn - 3]) || attrs.y;
        }
        return points;
    },
    
    interpolatePaths: function (path, path2) {
        var me = this,
            p = me.pathToAbsolute(path),
            p2 = me.pathToAbsolute(path2),
            attrs = {x: 0, y: 0, bx: 0, by: 0, X: 0, Y: 0, qx: null, qy: null},
            attrs2 = {x: 0, y: 0, bx: 0, by: 0, X: 0, Y: 0, qx: null, qy: null},
            fixArc = function (pp, i) {
                if (pp[i].length > 7) {
                    pp[i].shift();
                    var pi = pp[i];
                    while (pi.length) {
                        pp.splice(i++, 0, ["C"].concat(pi.splice(0, 6)));
                    }
                    pp.splice(i, 1);
                    ii = Math.max(p.length, p2.length || 0);
                }
            },
            fixM = function (path1, path2, a1, a2, i) {
                if (path1 && path2 && path1[i][0] == "M" && path2[i][0] != "M") {
                    path2.splice(i, 0, ["M", a2.x, a2.y]);
                    a1.bx = 0;
                    a1.by = 0;
                    a1.x = path1[i][1];
                    a1.y = path1[i][2];
                    ii = Math.max(p.length, p2.length || 0);
                }
            };
        for (var i = 0, ii = Math.max(p.length, p2.length || 0); i < ii; i++) {
            p[i] = me.command2curve(p[i], attrs);
            fixArc(p, i);
            (p2[i] = me.command2curve(p2[i], attrs2));
            fixArc(p2, i);
            fixM(p, p2, attrs, attrs2, i);
            fixM(p2, p, attrs2, attrs, i);
            var seg = p[i],
                seg2 = p2[i],
                seglen = seg.length,
                seg2len = seg2.length;
            attrs.x = seg[seglen - 2];
            attrs.y = seg[seglen - 1];
            attrs.bx = parseFloat(seg[seglen - 4]) || attrs.x;
            attrs.by = parseFloat(seg[seglen - 3]) || attrs.y;
            attrs2.bx = (parseFloat(seg2[seg2len - 4]) || attrs2.x);
            attrs2.by = (parseFloat(seg2[seg2len - 3]) || attrs2.y);
            attrs2.x = seg2[seg2len - 2];
            attrs2.y = seg2[seg2len - 1];
        }
        return [p, p2];
    },
    
    //Returns any path command as a curveto command based on the attrs passed
    command2curve: function (pathCommand, d) {
        var me = this;
        if (!pathCommand) {
            return ["C", d.x, d.y, d.x, d.y, d.x, d.y];
        }
        if (pathCommand[0] != "T" && pathCommand[0] != "Q") {
            d.qx = d.qy = null;
        }
        switch (pathCommand[0]) {
            case "M":
                d.X = pathCommand[1];
                d.Y = pathCommand[2];
                break;
            case "A":
                pathCommand = ["C"].concat(me.arc2curve.apply(me, [d.x, d.y].concat(pathCommand.slice(1))));
                break;
            case "S":
                pathCommand = ["C", d.x + (d.x - (d.bx || d.x)), d.y + (d.y - (d.by || d.y))].concat(pathCommand.slice(1));
                break;
            case "T":
                d.qx = d.x + (d.x - (d.qx || d.x));
                d.qy = d.y + (d.y - (d.qy || d.y));
                pathCommand = ["C"].concat(me.quadratic2curve(d.x, d.y, d.qx, d.qy, pathCommand[1], pathCommand[2]));
                break;
            case "Q":
                d.qx = pathCommand[1];
                d.qy = pathCommand[2];
                pathCommand = ["C"].concat(me.quadratic2curve(d.x, d.y, pathCommand[1], pathCommand[2], pathCommand[3], pathCommand[4]));
                break;
            case "L":
                pathCommand = ["C"].concat(d.x, d.y, pathCommand[1], pathCommand[2], pathCommand[1], pathCommand[2]);
                break;
            case "H":
                pathCommand = ["C"].concat(d.x, d.y, pathCommand[1], d.y, pathCommand[1], d.y);
                break;
            case "V":
                pathCommand = ["C"].concat(d.x, d.y, d.x, pathCommand[1], d.x, pathCommand[1]);
                break;
            case "Z":
                pathCommand = ["C"].concat(d.x, d.y, d.X, d.Y, d.X, d.Y);
                break;
        }
        return pathCommand;
    },

    quadratic2curve: function (x1, y1, ax, ay, x2, y2) {
        var _13 = 1 / 3,
            _23 = 2 / 3;
        return [
                _13 * x1 + _23 * ax,
                _13 * y1 + _23 * ay,
                _13 * x2 + _23 * ax,
                _13 * y2 + _23 * ay,
                x2,
                y2
            ];
    },
    
    rotate: function (x, y, rad) {
        var cos = Math.cos(rad),
            sin = Math.sin(rad),
            X = x * cos - y * sin,
            Y = x * sin + y * cos;
        return {x: X, y: Y};
    },

    arc2curve: function (x1, y1, rx, ry, angle, large_arc_flag, sweep_flag, x2, y2, recursive) {
        // for more information of where this Math came from visit:
        // http://www.w3.org/TR/SVG11/implnote.html#ArcImplementationNotes
        var me = this,
            PI = Math.PI,
            radian = me.radian,
            _120 = PI * 120 / 180,
            rad = radian * (+angle || 0),
            res = [],
            math = Math,
            mcos = math.cos,
            msin = math.sin,
            msqrt = math.sqrt,
            mabs = math.abs,
            masin = math.asin,
            xy, cos, sin, x, y, h, rx2, ry2, k, cx, cy, f1, f2, df, c1, s1, c2, s2,
            t, hx, hy, m1, m2, m3, m4, newres, i, ln, f2old, x2old, y2old;
        if (!recursive) {
            xy = me.rotate(x1, y1, -rad);
            x1 = xy.x;
            y1 = xy.y;
            xy = me.rotate(x2, y2, -rad);
            x2 = xy.x;
            y2 = xy.y;
            cos = mcos(radian * angle);
            sin = msin(radian * angle);
            x = (x1 - x2) / 2;
            y = (y1 - y2) / 2;
            h = (x * x) / (rx * rx) + (y * y) / (ry * ry);
            if (h > 1) {
                h = msqrt(h);
                rx = h * rx;
                ry = h * ry;
            }
            rx2 = rx * rx;
            ry2 = ry * ry;
            k = (large_arc_flag == sweep_flag ? -1 : 1) *
                    msqrt(mabs((rx2 * ry2 - rx2 * y * y - ry2 * x * x) / (rx2 * y * y + ry2 * x * x)));
            cx = k * rx * y / ry + (x1 + x2) / 2;
            cy = k * -ry * x / rx + (y1 + y2) / 2;
            f1 = masin(((y1 - cy) / ry).toFixed(7));
            f2 = masin(((y2 - cy) / ry).toFixed(7));

            f1 = x1 < cx ? PI - f1 : f1;
            f2 = x2 < cx ? PI - f2 : f2;
            if (f1 < 0) {
                f1 = PI * 2 + f1;
            }
            if (f2 < 0) {
                f2 = PI * 2 + f2;
            }
            if (sweep_flag && f1 > f2) {
                f1 = f1 - PI * 2;
            }
            if (!sweep_flag && f2 > f1) {
                f2 = f2 - PI * 2;
            }
        }
        else {
            f1 = recursive[0];
            f2 = recursive[1];
            cx = recursive[2];
            cy = recursive[3];
        }
        df = f2 - f1;
        if (mabs(df) > _120) {
            f2old = f2;
            x2old = x2;
            y2old = y2;
            f2 = f1 + _120 * (sweep_flag && f2 > f1 ? 1 : -1);
            x2 = cx + rx * mcos(f2);
            y2 = cy + ry * msin(f2);
            res = me.arc2curve(x2, y2, rx, ry, angle, 0, sweep_flag, x2old, y2old, [f2, f2old, cx, cy]);
        }
        df = f2 - f1;
        c1 = mcos(f1);
        s1 = msin(f1);
        c2 = mcos(f2);
        s2 = msin(f2);
        t = math.tan(df / 4);
        hx = 4 / 3 * rx * t;
        hy = 4 / 3 * ry * t;
        m1 = [x1, y1];
        m2 = [x1 + hx * s1, y1 - hy * c1];
        m3 = [x2 + hx * s2, y2 - hy * c2];
        m4 = [x2, y2];
        m2[0] = 2 * m1[0] - m2[0];
        m2[1] = 2 * m1[1] - m2[1];
        if (recursive) {
            return [m2, m3, m4].concat(res);
        }
        else {
            res = [m2, m3, m4].concat(res).join().split(",");
            newres = [];
            ln = res.length;
            for (i = 0;  i < ln; i++) {
                newres[i] = i % 2 ? me.rotate(res[i - 1], res[i], rad).y : me.rotate(res[i], res[i + 1], rad).x;
            }
            return newres;
        }
    },
    
    rotatePoint: function (x, y, alpha, cx, cy) {
        if (!alpha) {
            return {
                x: x,
                y: y
            };
        }
        cx = cx || 0;
        cy = cy || 0;
        x = x - cx;
        y = y - cy;
        alpha = alpha * this.radian;
        var cos = Math.cos(alpha),
            sin = Math.sin(alpha);
        return {
            x: x * cos - y * sin + cx,
            y: x * sin + y * cos + cy
        };
    },

    rotateAndTranslatePath: function (sprite) {
        var alpha = sprite.rotation.degrees,
            cx = sprite.rotation.x,
            cy = sprite.rotation.y,
            dx = sprite.translation.x,
            dy = sprite.translation.y,
            path,
            i,
            p,
            xy,
            j,
            res = [];
        if (!alpha && !dx && !dy) {
            return this.pathToAbsolute(sprite.attr.path);
        }
        dx = dx || 0;
        dy = dy || 0;
        path = this.pathToAbsolute(sprite.attr.path);
        for (i = path.length; i--;) {
            p = res[i] = path[i].slice();
            if (p[0] == "A") {
                xy = this.rotatePoint(p[6], p[7], alpha, cx, cy);
                p[6] = xy.x + dx;
                p[7] = xy.y + dy;
            } else {
                j = 1;
                while (p[j + 1] != null) {
                    xy = this.rotatePoint(p[j], p[j + 1], alpha, cx, cy);
                    p[j] = xy.x + dx;
                    p[j + 1] = xy.y + dy;
                    j += 2;
                }
            }
        }
        return res;
    },
    
    pathDimensions: function (path) {
        if (!path || !(path + "")) {
            return {x: 0, y: 0, width: 0, height: 0};
        }
        path = this.path2curve(path);
        var x = 0, 
            y = 0,
            X = [],
            Y = [],
            p,
            i,
            ii,
            xmin,
            ymin,
            dim;
        for (i = 0, ii = path.length; i < ii; i++) {
            p = path[i];
            if (p[0] == "M") {
                x = p[1];
                y = p[2];
                X.push(x);
                Y.push(y);
            }
            else {
                dim = this.curveDim(x, y, p[1], p[2], p[3], p[4], p[5], p[6]);
                X = X.concat(dim.min.x, dim.max.x);
                Y = Y.concat(dim.min.y, dim.max.y);
                x = p[5];
                y = p[6];
            }
        }
        xmin = Math.min.apply(0, X);
        ymin = Math.min.apply(0, Y);
        return {
            x: xmin,
            y: ymin,
            width: Math.max.apply(0, X) - xmin,
            height: Math.max.apply(0, Y) - ymin
        };
    },
    
    curveDim: function (p1x, p1y, c1x, c1y, c2x, c2y, p2x, p2y) {
        var a = (c2x - 2 * c1x + p1x) - (p2x - 2 * c2x + c1x),
            b = 2 * (c1x - p1x) - 2 * (c2x - c1x),
            c = p1x - c1x,
            t1 = (-b + Math.sqrt(b * b - 4 * a * c)) / 2 / a,
            t2 = (-b - Math.sqrt(b * b - 4 * a * c)) / 2 / a,
            y = [p1y, p2y],
            x = [p1x, p2x],
            dot;
        if (Math.abs(t1) > 1e12) {
            t1 = 0.5;
        }
        if (Math.abs(t2) > 1e12) {
            t2 = 0.5;
        }
        if (t1 > 0 && t1 < 1) {
            dot = this.findDotAtSegment(p1x, p1y, c1x, c1y, c2x, c2y, p2x, p2y, t1);
            x.push(dot.x);
            y.push(dot.y);
        }
        if (t2 > 0 && t2 < 1) {
            dot = this.findDotAtSegment(p1x, p1y, c1x, c1y, c2x, c2y, p2x, p2y, t2);
            x.push(dot.x);
            y.push(dot.y);
        }
        a = (c2y - 2 * c1y + p1y) - (p2y - 2 * c2y + c1y);
        b = 2 * (c1y - p1y) - 2 * (c2y - c1y);
        c = p1y - c1y;
        t1 = (-b + Math.sqrt(b * b - 4 * a * c)) / 2 / a;
        t2 = (-b - Math.sqrt(b * b - 4 * a * c)) / 2 / a;
        if (Math.abs(t1) > 1e12) {
            t1 = 0.5;
        }
        if (Math.abs(t2) > 1e12) {
            t2 = 0.5;
        }
        if (t1 > 0 && t1 < 1) {
            dot = this.findDotAtSegment(p1x, p1y, c1x, c1y, c2x, c2y, p2x, p2y, t1);
            x.push(dot.x);
            y.push(dot.y);
        }
        if (t2 > 0 && t2 < 1) {
            dot = this.findDotAtSegment(p1x, p1y, c1x, c1y, c2x, c2y, p2x, p2y, t2);
            x.push(dot.x);
            y.push(dot.y);
        }
        return {
            min: {x: Math.min.apply(0, x), y: Math.min.apply(0, y)},
            max: {x: Math.max.apply(0, x), y: Math.max.apply(0, y)}
        };
    },

    getAnchors: function (p1x, p1y, p2x, p2y, p3x, p3y, value) {
        value = value || 4;
        var l = Math.min(Math.sqrt(Math.pow(p1x - p2x, 2) + Math.pow(p1y - p2y, 2)) / value, Math.sqrt(Math.pow(p3x - p2x, 2) + Math.pow(p3y - p2y, 2)) / value),
            a = Math.atan((p2x - p1x) / Math.abs(p2y - p1y)),
            b = Math.atan((p3x - p2x) / Math.abs(p2y - p3y)),
            pi = Math.PI;
        a = p1y < p2y ? pi - a : a;
        b = p3y < p2y ? pi - b : b;
        var alpha = pi / 2 - ((a + b) % (pi * 2)) / 2;
        alpha > pi / 2 && (alpha -= pi);
        var dx1 = l * Math.sin(alpha + a),
            dy1 = l * Math.cos(alpha + a),
            dx2 = l * Math.sin(alpha + b),
            dy2 = l * Math.cos(alpha + b),
            out = {
                x1: p2x - dx1,
                y1: p2y + dy1,
                x2: p2x + dx2,
                y2: p2y + dy2
            };
        return out;
    },

    /* Smoothing function for a path.  Converts a path into cubic beziers.  Value defines the divider of the distance between points.
     * Defaults to a value of 4.
     */
    smooth: function (originalPath, value) {
        var path = this.path2curve(originalPath),
            newp = [path[0]],
            x = path[0][1],
            y = path[0][2],
            j,
            points,
            i = 1,
            ii = path.length,
            beg = 1,
            mx = x,
            my = y,
            cx = 0,
            cy = 0;
        for (; i < ii; i++) {
            var pathi = path[i],
                pathil = pathi.length,
                pathim = path[i - 1],
                pathiml = pathim.length,
                pathip = path[i + 1],
                pathipl = pathip && pathip.length;
            if (pathi[0] == "M") {
                mx = pathi[1];
                my = pathi[2];
                j = i + 1;
                while (path[j][0] != "C") {
                    j++;
                }
                cx = path[j][5];
                cy = path[j][6];
                newp.push(["M", mx, my]);
                beg = newp.length;
                x = mx;
                y = my;
                continue;
            }
            if (pathi[pathil - 2] == mx && pathi[pathil - 1] == my && (!pathip || pathip[0] == "M")) {
                var begl = newp[beg].length;
                points = this.getAnchors(pathim[pathiml - 2], pathim[pathiml - 1], mx, my, newp[beg][begl - 2], newp[beg][begl - 1], value);
                newp[beg][1] = points.x2;
                newp[beg][2] = points.y2;
            }
            else if (!pathip || pathip[0] == "M") {
                points = {
                    x1: pathi[pathil - 2],
                    y1: pathi[pathil - 1]
                };
            } else {
                points = this.getAnchors(pathim[pathiml - 2], pathim[pathiml - 1], pathi[pathil - 2], pathi[pathil - 1], pathip[pathipl - 2], pathip[pathipl - 1], value);
            }
            newp.push(["C", x, y, points.x1, points.y1, pathi[pathil - 2], pathi[pathil - 1]]);
            x = points.x2;
            y = points.y2;
        }
        return newp;
    },

    findDotAtSegment: function (p1x, p1y, c1x, c1y, c2x, c2y, p2x, p2y, t) {
        var t1 = 1 - t;
        return {
            x: Math.pow(t1, 3) * p1x + Math.pow(t1, 2) * 3 * t * c1x + t1 * 3 * t * t * c2x + Math.pow(t, 3) * p2x,
            y: Math.pow(t1, 3) * p1y + Math.pow(t1, 2) * 3 * t * c1y + t1 * 3 * t * t * c2y + Math.pow(t, 3) * p2y
        };
    },

    snapEnds: function (from, to, stepsMax) {
        var step = (to - from) / stepsMax,
            level = Math.floor(Math.log(step) / Math.LN10) + 1,
            m = Math.pow(10, level),
            cur,
            modulo = Math.round((step % m) * Math.pow(10, 2 - level)),
            interval = [[0, 15], [20, 4], [30, 2], [40, 4], [50, 9], [60, 4], [70, 2], [80, 4], [100, 15]],
            stepCount = 0,
            value,
            weight,
            i,
            topValue,
            topWeight = 1e9,
            ln = interval.length;
        cur = from = Math.floor(from / m) * m;
        for (i = 0; i < ln; i++) {
            value = interval[i][0];
            weight = (value - modulo) < 0 ? 1e6 : (value - modulo) / interval[i][1];
            if (weight < topWeight) {
                topValue = value;
                topWeight = weight;
            }
        }
        step = Math.floor(step * Math.pow(10, -level)) * Math.pow(10, level) + topValue * Math.pow(10, level - 2);
        while (cur < to) {
            cur += step;
            stepCount++;
        }
        to = +cur.toFixed(10);
        return {
            from: from,
            to: to,
            power: level,
            step: step,
            steps: stepCount
        };
    },

    sorter: function (a, b) {
        return a.offset - b.offset;
    },

    rad: function(degrees) {
        return degrees % 360 * Math.PI / 180;
    },

    degrees: function(radian) {
        return radian * 180 / Math.PI % 360;
    },

    withinBox: function(x, y, bbox) {
        bbox = bbox || {};
        return (x >= bbox.x && x <= (bbox.x + bbox.width) && y >= bbox.y && y <= (bbox.y + bbox.height));
    },

    parseGradient: function(gradient) {
        var me = this,
            type = gradient.type || 'linear',
            angle = gradient.angle || 0,
            radian = me.radian,
            stops = gradient.stops,
            stopsArr = [],
            stop,
            vector,
            max,
            stopObj;

        if (type == 'linear') {
            vector = [0, 0, Math.cos(angle * radian), Math.sin(angle * radian)];
            max = 1 / (Math.max(Math.abs(vector[2]), Math.abs(vector[3])) || 1);
            vector[2] *= max;
            vector[3] *= max;
            if (vector[2] < 0) {
                vector[0] = -vector[2];
                vector[2] = 0;
            }
            if (vector[3] < 0) {
                vector[1] = -vector[3];
                vector[3] = 0;
            }
        }

        for (stop in stops) {
            if (stops.hasOwnProperty(stop) && me.stopsRE.test(stop)) {
                stopObj = {
                    offset: parseInt(stop, 10),
                    color: Ext.draw.Color.toHex(stops[stop].color) || '#ffffff',
                    opacity: stops[stop].opacity || 1
                };
                stopsArr.push(stopObj);
            }
        }
        // Sort by pct property
        stopsArr.sort(me.sorter);
        if (type == 'linear') {
            return {
                id: gradient.id,
                type: type,
                vector: vector,
                stops: stopsArr
            };
        }
        else {
            return {
                id: gradient.id,
                type: type,
                centerX: gradient.centerX,
                centerY: gradient.centerY,
                focalX: gradient.focalX,
                focalY: gradient.focalY,
                radius: gradient.radius,
                vector: vector,
                stops: stopsArr
            };
        }
    }
});
/*
 * @class Ext.draw.Matrix
 * @private
 */
Ext.draw.Matrix = Ext.extend(Object, {

    //requires: ['Ext.draw.Draw'],

    constructor: function(a, b, c, d, e, f) {
        if (a != null) {
            this.matrix = [[a, c, e], [b, d, f], [0, 0, 1]];
        }
        else {
            this.matrix = [[1, 0, 0], [0, 1, 0], [0, 0, 1]];
        }
    },

    add: function(a, b, c, d, e, f) {
        var me = this,
            out = [[], [], []],
            matrix = [[a, c, e], [b, d, f], [0, 0, 1]],
            x,
            y,
            z,
            res;

        for (x = 0; x < 3; x++) {
            for (y = 0; y < 3; y++) {
                res = 0;
                for (z = 0; z < 3; z++) {
                    res += me.matrix[x][z] * matrix[z][y];
                }
                out[x][y] = res;
            }
        }
        me.matrix = out;
    },

    prepend: function(a, b, c, d, e, f) {
        var me = this,
            out = [[], [], []],
            matrix = [[a, c, e], [b, d, f], [0, 0, 1]],
            x,
            y,
            z,
            res;

        for (x = 0; x < 3; x++) {
            for (y = 0; y < 3; y++) {
                res = 0;
                for (z = 0; z < 3; z++) {
                    res += matrix[x][z] * me.matrix[z][y];
                }
                out[x][y] = res;
            }
        }
        me.matrix = out;
    },

    invert: function() {
        var matrix = this.matrix,
            a = matrix[0][0],
            b = matrix[1][0],
            c = matrix[0][1],
            d = matrix[1][1],
            e = matrix[0][2],
            f = matrix[1][2],
            x = a * d - b * c;
        return new Ext.draw.Matrix(d / x, -b / x, -c / x, a / x, (c * f - d * e) / x, (b * e - a * f) / x);
    },

    clone: function() {
        var matrix = this.matrix,
            a = matrix[0][0],
            b = matrix[1][0],
            c = matrix[0][1],
            d = matrix[1][1],
            e = matrix[0][2],
            f = matrix[1][2];
        return new Ext.draw.Matrix(a, b, c, d, e, f);
    },

    translate: function(x, y) {
        this.prepend(1, 0, 0, 1, x, y);
    },

    scale: function(x, y, cx, cy) {
        var me = this;
        if (y == null) {
            y = x;
        }
        me.add(1, 0, 0, 1, cx, cy);
        me.add(x, 0, 0, y, 0, 0);
        me.add(1, 0, 0, 1, -cx, -cy);
    },

    rotate: function(a, x, y) {
        a = Ext.draw.Draw.rad(a);
        var me = this,
            cos = +Math.cos(a).toFixed(9),
            sin = +Math.sin(a).toFixed(9);
        me.add(cos, sin, -sin, cos, x, y);
        me.add(1, 0, 0, 1, -x, -y);
    },

    x: function(x, y) {
        var matrix = this.matrix;
        return x * matrix[0][0] + y * matrix[0][1] + matrix[0][2];
    },

    y: function(x, y) {
        var matrix = this.matrix;
        return x * matrix[1][0] + y * matrix[1][1] + matrix[1][2];
    },

    get: function(i, j) {
        return + this.matrix[i][j].toFixed(4);
    },

    toString: function() {
        var me = this;
        return [me.get(0, 0), me.get(0, 1), me.get(1, 0), me.get(1, 1), 0, 0].join();
    },

    toSVG: function() {
        var me = this;
        return "matrix(" + [me.get(0, 0), me.get(1, 0), me.get(0, 1), me.get(1, 1), me.get(0, 2), me.get(1, 2)].join() + ")";
    },

    toFilter: function() {
        var me = this;
        return "progid:DXImageTransform.Microsoft.Matrix(M11=" + me.get(0, 0) +
            ", M12=" + me.get(0, 1) + ", M21=" + me.get(1, 0) + ", M22=" + me.get(1, 1) +
            ", Dx=" + me.get(0, 2) + ", Dy=" + me.get(1, 2) + ")";
    },

    offset: function() {
        var matrix = this.matrix;
        return [matrix[0][2].toFixed(4), matrix[1][2].toFixed(4)];
    }
});/**
 * @class Ext.chart.Labels
 *
 * Labels is a mixin whose methods are appended onto the Series class. Labels is an interface with methods implemented
 * in each of the Series (Pie, Bar, etc) for label creation and label placement.
 *
 * The methods implemented by the Series are:
    
    <ul>
    <li><b>onCreateLabel(storeItem, item, i, display)</b> Called each time a new label is created.
    The arguments of the method are:
      <ul>
      <li><em>storeItem</em> The element of the store that is related to the label sprite.</li>
      <li><em>item</em> The item related to the label sprite. An item is an object containing the position of the shape
      used to describe the visualization and also pointing to the actual shape (circle, rectangle, path, etc).</li>
      <li><em>i</em> The index of the element created (i.e the first created label, second created label, etc)</li>
      <li><em>display</em> The display type. May be <b>false</b> if the label is hidden</li>
      </ul>
    </li>
    <li><b>onPlaceLabel(label, storeItem, item, i, display, animate)</b> Called for updating the position of the label.
    The arguments of the method are:
        <ul>
        <li><em>label</em> The sprite label.</li>
        <li><em>storeItem</em> The element of the store that is related to the label sprite</li>
        <li><em>item</em> The item related to the label sprite. An item is an object containing the position of the shape
    used to describe the visualization and also pointing to the actual shape (circle, rectangle, path, etc).</li>
        <li><em>i</em> The index of the element to be updated (i.e. whether it is the first, second, third from the labelGroup)</li>
        <li><em>display</em> The display type. May be <b>false</b> if the label is hidden.</li>
        <li><em>animate</em> A boolean value to set or unset animations for the labels.</li>
        </ul>
    </li>
    </ul>
  
 */
Ext.chart.Labels = Ext.extend(Object, {

    //requires: ['Ext.draw.Color'],

    /**
     * @cfg {String} labelDisplay
     * Specifies the presence and position of labels for each pie slice. Either "rotate", "middle", "insideStart",
     * "insideEnd", "outside", "over", "under", or "none" to prevent label rendering.
     */

    /**
     * @cfg {String} labelColor
     * The color of the label text
     */

    /**
     * @cfg {String} labelField
     * The name of the field to be displayed in the label
     */

    /**
     * @cfg {Number} labelMinMargin
     * Specifies the minimum distance from a label to the origin of the visualization.
     * This parameter is useful when using PieSeries width variable pie slice lengths.
     * Default value is 50.
     */

    /**
     * @cfg {String} labelFont
     * The font used for the labels
     */

    /**
     * @cfg {String} labelOrientation
     * Either "horizontal" or "vertical"
     */

    /**
     * @cfg {Function} labelRenderer
     * Optional function for formatting the label into a displayable value
     * @param v
     */

    //@private a regex to parse url type colors.
    colorStringRe: /url\s*\(\s*#([^\/)]+)\s*\)/,
    
    //@private the mixin constructor. Used internally by Series.
    constructor: function(config) {
        var me = this;
        me.label = Ext.applyIf(me.label || {},
        {
            display: "none",
            color: "#000",
            field: "name",
            minMargin: 50,
            font: "11px Helvetica, sans-serif",
            orientation: "horizontal",
            renderer: function(v) {
                return v;
            }
        });

        if (me.label.display !== 'none') {
            me.labelsGroup = me.chart.surface.getGroup(me.seriesId + '-labels');
        }
    },

    //@private a method to render all labels in the labelGroup
    renderLabels: function() {
        var me = this,
            chart = me.chart,
            gradients = chart.gradients,
            gradient,
            items = me.items,
            animate = chart.animate,
            config = me.label,
            display = config.display,
            color = config.color,
            field = [].concat(config.field),
            group = me.labelsGroup,
            store = me.chart.store,
            len = store.getCount(),
            ratio = items.length / len,
            i, count, j, 
            k, gradientsCount = (gradients || 0) && gradients.length,
            colorStopTotal, colorStopIndex, colorStop,
            item, label, storeItem,
            sprite, spriteColor, spriteBrightness, labelColor,
            Color = Ext.draw.Color,
            colorString;

        if (display == 'none') {
            return;
        }

        for (i = 0, count = 0; i < len; i++) {
            for (j = 0; j < ratio; j++) {
                item = items[count];
                label = group.getAt(count);
                storeItem = store.getAt(i);

                if (!item && label) {
                    label.hide(true);
                }

                if (item && field[j]) {
                    if (!label) {
                        label = me.onCreateLabel(storeItem, item, i, display, j, count);
                    }
                    me.onPlaceLabel(label, storeItem, item, i, display, animate, j, count);

                    //set contrast
                    if (config.contrast && item.sprite) {
                        sprite = item.sprite;
                        colorString = sprite._to && sprite._to.fill || sprite.attr.fill;
                        spriteColor = Color.fromString(colorString);
                        //color wasn't parsed property maybe because it's a gradient id
                        if (colorString && !spriteColor) {
                            colorString = colorString.match(me.colorStringRe)[1];
                            for (k = 0; k < gradientsCount; k++) {
                                gradient = gradients[k];
                                if (gradient.id == colorString) {
                                    //avg color stops
                                    colorStop = 0; colorStopTotal = 0;
                                    for (colorStopIndex in gradient.stops) {
                                        colorStop++;
                                        colorStopTotal += Color.fromString(gradient.stops[colorStopIndex].color).getGrayscale();
                                    }
                                    spriteBrightness = (colorStopTotal / colorStop) / 255;
                                    break;
                                }
                            }
                        }
                        else {
                            spriteBrightness = spriteColor.getGrayscale() / 255;
                        }
                        labelColor = Color.fromString(label.attr.color || label.attr.fill).getHSL();
                        
                        labelColor[2] = spriteBrightness > 0.5? 0.2 : 0.8;
                        label.setAttributes({
                            fill: String(Color.fromHSL.apply({}, labelColor))
                        }, true);
                    }
                }
                count++;
            }
        }
        me.hideLabels(count);
    },

    //@private a method to hide labels.
    hideLabels: function(index) {
        var labelsGroup = this.labelsGroup, len;
        if (labelsGroup) {
            len = labelsGroup.getCount();
            while (len-->index) {
                labelsGroup.getAt(len).hide(true);
            }
        }
    }
});/**
 * @class Ext.chart.theme.Base
 * Provides default colors for non-specified things. Should be sub-classed when creating new themes.
 * @ignore
 */
Ext.chart.theme = function(config, base) {
        config = config || {};
        var i = 0, l, colors, color,
            seriesThemes, markerThemes,
            seriesTheme, markerTheme, 
            key, gradients = [],
            midColor, midL;
        
        if (config.baseColor) {
            midColor = Ext.draw.Color.fromString(config.baseColor);
            midL = midColor.getHSL()[2];
            if (midL < 0.15) {
                midColor = midColor.getLighter(0.3);
            } else if (midL < 0.3) {
                midColor = midColor.getLighter(0.15);
            } else if (midL > 0.85) {
                midColor = midColor.getDarker(0.3);
            } else if (midL > 0.7) {
                midColor = midColor.getDarker(0.15);
            }
            config.colors = [ midColor.getDarker(0.3).toString(),
                              midColor.getDarker(0.15).toString(),
                              midColor.toString(),
                              midColor.getLighter(0.15).toString(),
                              midColor.getLighter(0.3).toString()];

            delete config.baseColor;
        }
        if (config.colors) {
            colors = config.colors.slice();
            markerThemes = base.markerThemes;
            seriesThemes = base.seriesThemes;
            l = colors.length;
            base.colors = colors;
            for (; i < l; i++) {
                color = colors[i];
                markerTheme = markerThemes[i] || {};
                seriesTheme = seriesThemes[i] || {};
                markerTheme.fill = seriesTheme.fill = markerTheme.stroke = seriesTheme.stroke = color;
                markerThemes[i] = markerTheme;
                seriesThemes[i] = seriesTheme;
            }
            base.markerThemes = markerThemes.slice(0, l);
            base.seriesThemes = seriesThemes.slice(0, l);
        //the user is configuring something in particular (either markers, series or pie slices)
        }
        for (key in base) {
            if (key in config) {
                if (Ext.isObject(config[key]) && Ext.isObject(base[key])) {
                    Ext.apply(base[key], config[key]);
                } else {
                    base[key] = config[key];
                }
            }
        }
        if (config.useGradients) {
            colors = base.colors || (function () {
                var ans = [];
                for (i = 0, seriesThemes = base.seriesThemes, l = seriesThemes.length; i < l; i++) {
                    ans.push(seriesThemes[i].fill || seriesThemes[i].stroke);
                }
                return ans;
            })();
            for (i = 0, l = colors.length; i < l; i++) {
                midColor = Ext.draw.Color.fromString(colors[i]);
                if (midColor) {
                    color = midColor.getDarker(0.1).toString();
                    midColor = midColor.toString();
                    key = 'theme-' + midColor.substr(1) + '-' + color.substr(1);
                    gradients.push({
                        id: key,
                        angle: 45,
                        stops: {
                            0: {
                                color: midColor.toString()
                            },
                            100: {
                                color: color.toString()
                            }
                        }
                    });
                    colors[i] = 'url(#' + key + ')'; 
                }
            }
            base.gradients = gradients;
            base.colors = colors;
        }
        /*
        base.axis = Ext.apply(base.axis || {}, config.axis || {});
        base.axisLabel = Ext.apply(base.axisLabel || {}, config.axisLabel || {});
        base.axisTitle = Ext.apply(base.axisTitle || {}, config.axisTitle || {});
        */
        Ext.apply(this, base);
    };

Ext.chart.theme.Theme = Ext.extend(Object, {
    /* Begin Definitions */

    //requires: ['Ext.draw.Color'],

    /* End Definitions */

    theme: 'Base',
    themeAttrs: false,
    
    initTheme: function(theme) {
        var me = this,
            themes = Ext.chart.theme,
            key, gradients;
        if (theme) {
            theme = theme.split(':');
            for (key in themes) {
                if (key == theme[0]) {
                    gradients = theme[1] == 'gradients';
                    me.themeAttrs = new themes[key]({
                        useGradients: gradients
                    });
                    if (gradients) {
                        me.gradients = me.themeAttrs.gradients;
                    }
                    if (me.themeAttrs.background) {
                        me.background = me.themeAttrs.background;
                    }
                    return;
                }
            }
            throw "No theme found named " + theme;
        }
    }
});

Ext.chart.theme.Base = Ext.extend(Object, {

    //requires: ['Ext.chart.theme.Theme'],

    constructor: function(config) {
        Ext.chart.theme.call(this, config, {
            background: false,
            axis: {
                stroke: '#444',
                'stroke-width': 1
            },
            axisLabelTop: {
                fill: '#444',
                font: '12px Arial, Helvetica, sans-serif',
                spacing: 2,
                padding: 5,
                renderer: function(v) { return v; }
            },
            axisLabelRight: {
                fill: '#444',
                font: '12px Arial, Helvetica, sans-serif',
                spacing: 2,
                padding: 5,
                renderer: function(v) { return v; }
            },
            axisLabelBottom: {
                fill: '#444',
                font: '12px Arial, Helvetica, sans-serif',
                spacing: 2,
                padding: 5,
                renderer: function(v) { return v; }
            },
            axisLabelLeft: {
                fill: '#444',
                font: '12px Arial, Helvetica, sans-serif',
                spacing: 2,
                padding: 5,
                renderer: function(v) { return v; }
            },
            axisTitleTop: {
                font: 'bold 18px Arial',
                fill: '#444'
            },
            axisTitleRight: {
                font: 'bold 18px Arial',
                fill: '#444',
                rotate: {
                    x:0, y:0,
                    degrees: 270
                }
            },
            axisTitleBottom: {
                font: 'bold 18px Arial',
                fill: '#444'
            },
            axisTitleLeft: {
                font: 'bold 18px Arial',
                fill: '#444',
                rotate: {
                    x:0, y:0,
                    degrees: 270
                }
            },
            series: {
                'stroke-width': 0
            },
            seriesLabel: {
                font: '12px Arial',
                fill: '#333'
            },
            marker: {
                stroke: '#555',
                fill: '#000',
                radius: 3,
                size: 3
            },
            colors: [ "#94ae0a", "#115fa6","#a61120", "#ff8809", "#ffd13e", "#a61187", "#24ad9a", "#7c7474", "#a66111"],
            seriesThemes: [{
                fill: "#115fa6"
            }, {
                fill: "#94ae0a"
            }, {
                fill: "#a61120"
            }, {
                fill: "#ff8809"
            }, {
                fill: "#ffd13e"
            }, {
                fill: "#a61187"
            }, {
                fill: "#24ad9a"
            }, {
                fill: "#7c7474"
            }, {
                fill: "#a66111"
            }],
            markerThemes: [{
                fill: "#115fa6",
                type: 'circle' 
            }, {
                fill: "#94ae0a",
                type: 'cross'
            }, {
                fill: "#a61120",
                type: 'plus'
            }]
        });
    }
});

Ext.onReady(function() {
    var palette = ['#b1da5a', '#4ce0e7', '#e84b67', '#da5abd', '#4d7fe6', '#fec935'],
        names = ['Green', 'Sky', 'Red', 'Purple', 'Blue', 'Yellow'],
        i = 0, j = 0, l = palette.length, themes = Ext.chart.theme,
        categories = [['#f0a50a', '#c20024', '#2044ba', '#810065', '#7eae29'],
                      ['#6d9824', '#87146e', '#2a9196', '#d39006', '#1e40ac'],
                      ['#fbbc29', '#ce2e4e', '#7e0062', '#158b90', '#57880e'],
                      ['#ef5773', '#fcbd2a', '#4f770d', '#1d3eaa', '#9b001f'],
                      ['#7eae29', '#fdbe2a', '#910019', '#27b4bc', '#d74dbc'],
                      ['#44dce1', '#0b2592', '#996e05', '#7fb325', '#b821a1']],
        cats = categories.length;
    
    //Create themes from base colors
    for (; i < l; i++) {
        themes[names[i]] = (function(color) {
            return Ext.extend(themes.Base, {
                constructor: function(config) {
                    themes.Base.prototype.constructor.call(this, Ext.apply({
                        baseColor: color
                    }, config));
                }
            });
        })(palette[i]);
    }
    
    //Create theme from color array
    for (i = 0; i < cats; i++) {
        themes['Category' + (i + 1)] = (function(category) {
            return Ext.extend(themes.Base, {
                constructor: function(config) {
                    themes.Base.prototype.constructor.call(this, Ext.apply({
                        colors: category
                    }, config));
                }
            });
        })(categories[i]);
    }
});
/**
 * @class Ext.draw.Sprite
 * @extends Object
 * Base drawing spriteitive class.  Provides bucket for all spriteitive attributes and basic methods for updating them.
 */
Ext.draw.Sprite = Ext.extend(Ext.util.Observable, {

    dirty: false,
    dirtyHidden: false,
    dirtyTransform: false,
    dirtyPath: true,
    dirtyFont: true,
    zIndexDirty: true,
    isSprite: true,
    zIndex: 0,
    fontProperties: [
        'font',
        'font-size',
        'font-weight',
        'font-style',
        'font-family',
        'text-anchor',
        'text'
    ],
    pathProperties: [
        'x',
        'y',
        'd',
        'path',
        'height',
        'width',
        'radius',
        'r',
        'rx',
        'ry',
        'cx',
        'cy'
    ],
    constructor: function(config) {
        config = config || {};
        this.id = Ext.id(null, 'ext-sprite-');
        this.transformations = [];
        Ext.copyTo(this, config, 'surface,group,type');
        //attribute bucket
        this.bbox = {};
        this.attr = {
            zIndex: 0,
            translation: {
                x: null,
                y: null
            },
            rotation: {
                degrees: null,
                x: null,
                y: null
            },
            scaling: {
                x: null,
                y: null,
                cx: null,
                cy: null
            }
        };
        //delete not bucket attributes
        delete config.surface;
        delete config.group;
        delete config.type;
        this.setAttributes(config);
        this.addEvents(
            'render',
            'mousedown',
            'mouseup',
            'mouseover',
            'mouseout',
            'click'
        );
        Ext.draw.Sprite.superclass.constructor.apply(this, arguments);
    },

    /**
     * Change the attributes of the sprite.
     * @param {Object} attrs attributes to be changed on the sprite.
     * @param {Boolean} redraw Flag to immediatly draw the change.
     * @return {Ext.draw.Sprite} this
     */
    setAttributes: function(attrs, redraw) {
        var me = this,
            fontProps = me.fontProperties,
            fontPropsLength = fontProps.length,
            pathProps = me.pathProperties,
            pathPropsLength = pathProps.length,
            custom = me.surface.customAttributes,
            spriteAttrs = me.attr,
            attr, i, translate, translation, rotate, rotation, scale, scaling;
        if(typeof attrs == 'undefined')
            return this;
        for (attr in custom) {
            if (attrs.hasOwnProperty(attr) && typeof custom[attr] == "function") {
                Ext.apply(attrs, custom[attr].apply(me, [].concat(attrs[attr])));
            }
        }

        // Flag a change in hidden
        if (!!attrs.hidden !== !!spriteAttrs.hidden) {
            me.dirtyHidden = true;
        }

        // Flag path change
        for (i = 0; i < pathPropsLength; i++) {
            attr = pathProps[i];
            if (attr in attrs && attrs[attr] !== spriteAttrs[attr]) {
                me.dirtyPath = true;
                break;
            }
        }

        // Flag zIndex change
        if ('zIndex' in attrs) {
            me.zIndexDirty = true;
        }

        // Flag font/text change
        for (i = 0; i < fontPropsLength; i++) {
            attr = fontProps[i];
            if (attr in attrs && attrs[attr] !== spriteAttrs[attr]) {
                me.dirtyFont = true;
                break;
            }
        }

        translate = attrs.translate;
        translation = spriteAttrs.translation;
        if (translate) {
            if ((translate.x && translate.x !== translation.x) ||
                (translate.y && translate.y !== translation.y)) {
                Ext.apply(translation, translate);
                me.dirtyTransform = true;
            }
            delete attrs.translate;
        }

        rotate = attrs.rotate;
        rotation = spriteAttrs.rotation;
        if (rotate) {
            if ((rotate.x && rotate.x !== rotation.x) || 
                (rotate.y && rotate.y !== rotation.y) ||
                (rotate.degrees && rotate.degrees !== rotation.degrees)) {
                Ext.apply(rotation, rotate);
                me.dirtyTransform = true;
            }
            delete attrs.rotate;
        }

        scale = attrs.scale;
        scaling = spriteAttrs.scaling;
        if (scale) {
            if ((scale.x && scale.x !== scaling.x) || 
                (scale.y && scale.y !== scaling.y) ||
                (scale.cx && scale.cx !== scaling.cx) ||
                (scale.cy && scale.cy !== scaling.cy)) {
                Ext.apply(scaling, scale);
                me.dirtyTransform = true;
            }
            delete attrs.scale;
        }

        Ext.apply(spriteAttrs, attrs);
        me.dirty = true;

        if (redraw === true) {
            me.redraw();
        }
        return this;
    },

    /**
     * Retrieve the bounding box of the sprite. This will be returned as an object with x, y, width, and height properties.
     * @return {Object} bbox
     */
    getBBox: function() {
        return this.surface.getBBox(this);
    },

    /**
     * Hide the sprite.
     * @param {Boolean} redraw Flag to immediatly draw the change.
     * @return {Ext.draw.Sprite} this
     */
    hide: function(redraw) {
        this.setAttributes({
            hidden: true
        }, redraw);
        return this;
    },

    /**
     * Show the sprite.
     * @param {Boolean} redraw Flag to immediatly draw the change.
     * @return {Ext.draw.Sprite} this
     */
    show: function(redraw) {
        this.setAttributes({
            hidden: false
        }, redraw);
        return this;
    },

    /**
     * Redraw the sprite.
     * @return {Ext.draw.Sprite} this
     */
    redraw: function() {
        this.surface.renderItem(this);
        return this;
    },

    /**
     * Wrapper for setting style properties, also takes single object parameter of multiple styles.
     * @param {String/Object} property The style property to be set, or an object of multiple styles.
     * @param {String} value (optional) The value to apply to the given property, or null if an object was passed.
     * @return {Ext.draw.Sprite} this
     */
    setStyle: function() {
        this.el.setStyle.apply(this.el, arguments);
        return this;
    },

    /**
     * Adds one or more CSS classes to the element. Duplicate classes are automatically filtered out.  Note this method
     * is severly limited in VML.
     * @param {String/Array} className The CSS class to add, or an array of classes
     * @return {Ext.draw.Sprite} this
     */
    addCls: function(obj) {
        this.surface.addCls(this, obj);
        return this;
    },

    /**
     * Removes one or more CSS classes from the element.
     * @param {String/Array} className The CSS class to remove, or an array of classes.  Note this method
     * is severly limited in VML.
     * @return {Ext.draw.Sprite} this
     */
    removeCls: function(obj) {
        this.surface.removeCls(this, obj);
        return this;
    }
});

Ext.mixin(Ext.draw.Sprite, 'animate', Ext.util.Animate);
/**
 * @class Ext.draw.SpriteGroup
 * @extends Ext.util.MixedCollection
 */
Ext.draw.SpriteGroup = Ext.extend(Ext.util.MixedCollection, {

    isSpriteGroup: true,
    constructor: function(config) {
        var me = this;
        
        config = config || {};
        Ext.apply(me, config);

        me.addEvents(
            'mousedown',
            'mouseup',
            'mouseover',
            'mouseout',
            'click'
        );
        me.id = Ext.id(null, 'ext-sprite-group-');
        //me.callParent();
        Ext.draw.SpriteGroup.superclass.constructor.call(this);
    },

    // private
    onClick: function(e) {
        this.fireEvent('click', e);
    },

    // private
    onMouseUp: function(e) {
        this.fireEvent('mouseup', e);
    },

    // private
    onMouseDown: function(e) {
        this.fireEvent('mousedown', e);
    },

    // private
    onMouseOver: function(e) {
        this.fireEvent('mouseover', e);
    },

    // private
    onMouseOut: function(e) {
        this.fireEvent('mouseout', e);
    },

    attachEvents: function(o) {
        var me = this;
        
        o.on({
            scope: me,
            mousedown: me.onMouseDown,
            mouseup: me.onMouseUp,
            mouseover: me.onMouseOver,
            mouseout: me.onMouseOut,
            click: me.onClick
        });
    },

    add: function(key, o) {
        //var result = this.callParent(arguments);
        var result = Ext.draw.SpriteGroup.superclass.add.apply(this, arguments);
        this.attachEvents(result);
        return result;
    },

    insert: function(index, key, o) {
        //return this.callParent(arguments);
        return Ext.draw.SpriteGroup.superclass.insert.apply(this, arguments);
    },

    remove: function(o) {
        var me = this;
        
        o.un({
            scope: me,
            mousedown: me.onMouseDown,
            mouseup: me.onMouseUp,
            mouseover: me.onMouseOver,
            mouseout: me.onMouseOut,
            click: me.onClick
        });
        //me.callParent(arguments);
        Ext.draw.SpriteGroup.superclass.remove.apply(this, arguments);
    },
    // Returns the group bounding box.
    getBBox: function() {
        var i = 0,
            sprite,
            bb,
            items = this.items,
            len = this.length,
            infinity = Infinity,
            minX = infinity,
            maxHeight = -infinity,
            minY = infinity,
            maxWidth = -infinity,
            maxWidthBBox, maxHeightBBox;
        
        for (; i < len; i++) {
            sprite = items[i];
            if (sprite.el) {
                bb = sprite.getBBox();
                minX = Math.min(minX, bb.x);
                minY = Math.min(minY, bb.y);
                maxHeight = Math.max(maxHeight, bb.height + bb.y);
                maxWidth = Math.max(maxWidth, bb.width + bb.x);
            }
        }
        
        return {
            x: minX,
            y: minY,
            height: maxHeight - minY,
            width: maxWidth - minX
        };
    },

    setAttributes: function(attrs, redraw) {
        var i = 0,
            items = this.items,
            len = this.length;
            
        for (; i < len; i++) {
            items[i].setAttributes(attrs, redraw);
        }
        return this;
    },

    hide: function(attrs) {
        var i = 0,
            items = this.items,
            len = this.length;
            
        for (; i < len; i++) {
            items[i].hide();
        }
        return this;
    },

    show: function(attrs) {
        var i = 0,
            items = this.items,
            len = this.length;
            
        for (; i < len; i++) {
            items[i].show();
        }
        return this;
    },

    redraw: function() {
        var me = this,
            i = 0,
            items = me.items,
            surface = me.getSurface(),
            len = me.length;
        
        if (surface) {
            for (; i < len; i++) {
                surface.renderItem(items[i]);
            }
        }
        return me;
    },

    setStyle: function(obj) {
        var i = 0,
            items = this.items,
            len = this.length,
            item;
            
        for (; i < len; i++) {
            item = items[i];
            if (item.el) {
                el.setStyle(obj);
            }
        }
    },

    addCls: function(obj) {
        var i = 0,
            items = this.items,
            surface = this.getSurface(),
            len = this.length;
        
        if (surface) {
            for (; i < len; i++) {
                surface.addCls(items[i], obj);
            }
        }
    },

    removeCls: function(obj) {
        var i = 0,
            items = this.items,
            surface = this.getSurface(),
            len = this.length;
        
        if (surface) {
            for (; i < len; i++) {
                surface.removeCls(items[i], obj);
            }
        }
    },
    
    /**
     * Grab the surface from the items
     * @private
     * @return {Ext.draw.Surface} The surface, null if not found
     */
    getSurface: function(){
        var first = this.first();
        if (first) {
            return first.surface;
        }
        return null;
    },
    
    /**
     * Destroys the SpriteGroup
     */
    destroy: function(){
        var me = this,
            surface = me.getSurface(),
            item;
            
        if (surface) {
            while (me.getCount() > 0) {
                item = me.first();
                me.remove(item);
                surface.remove(item);
            }
        }
        me.clearListeners();
    }
});

Ext.mixin(Ext.draw.SpriteGroup, 'animate', Ext.util.Animate);
/**
 * @class Ext.chart.LegendItem
 * @extends Ext.draw.SpriteGroup
 * A single item of a legend (marker plus label)
 * @constructor
 */
Ext.chart.LegendItem = Ext.extend(Ext.draw.SpriteGroup, {

    //requires: ['Ext.chart.Shapes'],

    // Position of the item, relative to the upper-left corner of the legend box
    x: 0,
    y: 0,
    zIndex: 500,

    constructor: function(config) {
        //this.callParent(arguments);
        Ext.chart.LegendItem.superclass.constructor.apply(this, arguments);
        this.createSprites(config);
    },

    /**
     * Creates all the individual sprites for this legend item
     */
    createSprites: function(config) {
        var me = this,
            index = config.yFieldIndex,
            series = me.series,
            seriesType = series.type,
            idx = me.yFieldIndex,
            legend = me.legend,
            surface = me.surface,
            refX = legend.x + me.x,
            refY = legend.y + me.y,
            bbox, z = me.zIndex,
            markerCfg, label, mask,
            radius, toggle = false,
            seriesStyle = Ext.apply(series.seriesStyle, series.style);

        function getSeriesProp(name) {
            var val = series[name];
            return (Ext.isArray(val) ? val[idx] : val);
        }
        
        label = me.add('label', surface.add({
            type: 'text',
            x: 20,
            y: 0,
            zIndex: z || 0,
            font: legend.labelFont,
            text: getSeriesProp('title') || getSeriesProp('yField')
        }));

        // Line series - display as short line with optional marker in the middle
        if (seriesType === 'line' || seriesType === 'scatter') {
            if(seriesType === 'line') {
                me.add('line', surface.add({
                    type: 'path',
                    path: 'M0.5,0.5L16.5,0.5',
                    zIndex: z,
                    "stroke-width": series.lineWidth,
                    "stroke-linejoin": "round",
                    "stroke-dasharray": series.dash,
                    stroke: seriesStyle.stroke || '#000',
                    style: {
                        cursor: 'pointer'
                    }
                }));
            }
            if (series.showMarkers || seriesType === 'scatter') {
                markerCfg = Ext.apply(series.markerStyle, series.markerCfg || {});
                me.add('marker', Ext.chart.Shapes[markerCfg.type](surface, {
                    fill: markerCfg.fill,
                    x: 8.5,
                    y: 0.5,
                    zIndex: z,
                    radius: markerCfg.radius || markerCfg.size,
                    style: {
                        cursor: 'pointer'
                    }
                }));
            }
        }
        // All other series types - display as filled box
        else {
            me.add('box', surface.add({
                type: 'rect',
                zIndex: z,
                x: 0,
                y: 0,
                width: 12,
                height: 12,
                fill: series.getLegendColor(index),
                style: {
                    cursor: 'pointer'
                }
            }));
        }
        
        me.setAttributes({
            hidden: false
        }, true);
        
        bbox = me.getBBox();
        
        mask = me.add('mask', surface.add({
            type: 'rect',
            x: bbox.x,
            y: bbox.y,
            width: bbox.width || 20,
            height: bbox.height || 20,
            zIndex: (z || 0) + 1000,
            fill: '#f00',
            opacity: 0,
            style: {
                'cursor': 'pointer'
            }
        }));

        //add toggle listener
        me.on('mouseover', function() {
            label.setStyle({
                'font-weight': 'bold'
            });
            mask.setStyle({
                'cursor': 'pointer'
            });
            series._index = index;
            series.highlightItem();
        }, me);

        me.on('mouseout', function() {
            label.setStyle({
                'font-weight': 'normal'
            });
            series._index = index;
            series.unHighlightItem();
        }, me);
        
        if (!series.visibleInLegend(index)) {
            toggle = true;
            label.setAttributes({
               opacity: 0.5
            }, true);
        }

        me.on('mousedown', function() {
            if (!toggle) {
                series.hideAll();
                label.setAttributes({
                    opacity: 0.5
                }, true);
            } else {
                series.showAll();
                label.setAttributes({
                    opacity: 1
                }, true);
            }
            toggle = !toggle;
        }, me);
        me.updatePosition({x:0, y:0}); //Relative to 0,0 at first so that the bbox is calculated correctly
    },

    /**
     * Update the positions of all this item's sprites to match the root position
     * of the legend box.
     * @param {Object} relativeTo (optional) If specified, this object's 'x' and 'y' values will be used
     *                 as the reference point for the relative positioning. Defaults to the Legend.
     */
    updatePosition: function(relativeTo) {
        var me = this,
            items = me.items,
            ln = items.length,
            i = 0,
            item;
        if (!relativeTo) {
            relativeTo = me.legend;
        }
        for (; i < ln; i++) {
            item = items[i];
            switch (item.type) {
                case 'text':
                    item.setAttributes({
                        x: 20 + relativeTo.x + me.x,
                        y: relativeTo.y + me.y
                    }, true);
                    break;
                case 'rect':
                    item.setAttributes({
                        translate: {
                            x: relativeTo.x + me.x,
                            y: relativeTo.y + me.y - 6
                        }
                    }, true);
                    break;
                default:
                    item.setAttributes({
                        translate: {
                            x: relativeTo.x + me.x,
                            y: relativeTo.y + me.y
                        }
                    }, true);
            }
        }
    }
});/**
 * @class Ext.chart.Legend
 *
 * Defines a legend for a chart's series.
 * The 'chart' member must be set prior to rendering.
 * The legend class displays a list of legend items each of them related with a
 * series being rendered. In order to render the legend item of the proper series
 * the series configuration object must have <code>showInSeries</code> set to
 * true.
 *
 * The legend configuration object accepts a <code>position</code> as parameter.
 * The <code>position</code> parameter can be <code>left</code>, <code>right</code>
 * <code>top</code> or <code>bottom</code>. For example:
 *
   <pre><code>
        legend: {
            position: 'right'
        },
    </code></pre>
 *
 * @constructor
 */
Ext.chart.Legend = Ext.extend(Object, {

    //requires: ['Ext.chart.LegendItem'],

    /**
     * @cfg {Boolean} visible
     * Whether or not the legend should be displayed.
     */
    visible: true,

    /**
     * @cfg {String} position
     * The position of the legend in relation to the chart. One of: "top",
     * "bottom", "left", "right", or "float". If set to "float", then the legend
     * box will be positioned at the point denoted by the x and y parameters.
     */
    position: 'bottom',

    /**
     * @cfg {Number} x
     * X-position of the legend box. Used directly if position is set to "float", otherwise 
     * it will be calculated dynamically.
     */
    x: 0,

    /**
     * @cfg {Number} y
     * Y-position of the legend box. Used directly if position is set to "float", otherwise
     * it will be calculated dynamically.
     */
    y: 0,

    /**
     * @cfg {String} labelFont
     * Font to be used for the legend labels.
     */
    labelFont: '12px Helvetica, sans-serif',

    /**
     * @cfg {String} boxStroke
     * Style of the stroke for the legend box
     */
    boxStroke: '#000',

    /**
     * @cfg {String} boxStrokeWidth
     * Width of the stroke for the legend box
     */
    boxStrokeWidth: 1,

    /**
     * @cfg {String} boxFill
     * Fill style for the legend box
     */
    boxFill: '#FFF',

    /**
     * @cfg {Number} itemSpacing
     * Amount of space between legend items
     */
    itemSpacing: 10,

    /**
     * @cfg {Number} padding
     * Amount of padding between the legend box's border and its items
     */
    padding: 5,

    // @private
    width: 0,
    // @private
    height: 0,

    /**
     * @cfg {Number} boxZIndex
     * Sets the z-index for the legend. Defaults to 100.
     */
    boxZIndex: 100,

    constructor: function(config) {
        var me = this;
        if (config) {
            Ext.apply(me, config);
        }
        me.items = [];
        /**
         * Whether the legend box is oriented vertically, i.e. if it is on the left or right side or floating.
         * @type {Boolean}
         */
        me.isVertical = ("left|right|float".indexOf(me.position) !== -1);
        
        // cache these here since they may get modified later on
        me.origX = me.x;
        me.origY = me.y;
    },

    /**
     * @private Create all the sprites for the legend
     */
    create: function() {
        var me = this;
        me.createItems();
        if (!me.created && me.isDisplayed()) {
            me.createBox();
            me.created = true;
        }
    },

    /**
     * @private Determine whether the legend should be displayed. Looks at the legend's 'visible' config,
     * and also the 'showInLegend' config for each of the series.
     */
    isDisplayed: function() {
        return this.visible && this.chart.series.findIndex('showInLegend', true) !== -1;
    },

    /**
     * @private Create the series markers and labels
     */
    createItems: function() {
        var me = this,
            chart = me.chart,
            surface = chart.surface,
            items = me.items,
            padding = me.padding,
            itemSpacing = me.itemSpacing,
            spacingOffset = 2,
            maxWidth = 0,
            maxHeight = 0,
            totalWidth = 0,
            totalHeight = 0,
            vertical = me.isVertical,
            math = Math,
            mfloor = math.floor,
            mmax = math.max,
            index = 0, 
            i = 0, 
            len = items ? items.length : 0,
            x, y, spacing, item, bbox, height, width;

        //remove all legend items
        if (len) {
            for (; i < len; i++) {
                items[i].destroy();
            }
        }
        //empty array
        items.length = [];
        // Create all the item labels, collecting their dimensions and positioning each one
        // properly in relation to the previous item
        chart.series.each(function(series, i) {
            if (series.showInLegend) {
                Ext.each([].concat(series.yField), function(field, j) {
                    item = new Ext.chart.LegendItem({
                        legend: this,
                        series: series,
                        surface: chart.surface,
                        yFieldIndex: j
                    });
                    bbox = item.getBBox();

                    //always measure from x=0, since not all markers go all the way to the left
                    width = bbox.width; 
                    height = bbox.height;

                    if (i + j === 0) {
                        spacing = vertical ? padding + height / 2 : padding;
                    }
                    else {
                        spacing = itemSpacing / (vertical ? 2 : 1);
                    }
                    // Set the item's position relative to the legend box
                    item.x = mfloor(vertical ? padding : totalWidth + spacing);
                    item.y = mfloor(vertical ? totalHeight + spacing : padding + height / 2);

                    // Collect cumulative dimensions
                    totalWidth += width + spacing;
                    totalHeight += height + spacing;
                    maxWidth = mmax(maxWidth, width);
                    maxHeight = mmax(maxHeight, height);

                    items.push(item);
                }, this);
            }
        }, me);

        // Store the collected dimensions for later
        me.width = mfloor((vertical ? maxWidth : totalWidth) + padding * 2);
        if (vertical && items.length === 1) {
            spacingOffset = 1;
        }
        me.height = mfloor((vertical ? totalHeight - spacingOffset * spacing : maxHeight) + (padding * 2));
        me.itemHeight = maxHeight;
    },

    /**
     * @private Get the bounds for the legend's outer box
     */
    getBBox: function() {
        var me = this;
        return {
            x: Math.round(me.x) - me.boxStrokeWidth / 2,
            y: Math.round(me.y) - me.boxStrokeWidth / 2,
            width: me.width,
            height: me.height
        };
    },

    /**
     * @private Create the box around the legend items
     */
    createBox: function() {
        var me = this,
            box = me.boxSprite = me.chart.surface.add(Ext.apply({
                type: 'rect',
                stroke: me.boxStroke,
                "stroke-width": me.boxStrokeWidth,
                fill: me.boxFill,
                zIndex: me.boxZIndex
            }, me.getBBox()));
        box.redraw();
    },

    /**
     * @private Update the position of all the legend's sprites to match its current x/y values
     */
    updatePosition: function() {
        var me = this,
            x, y,
            legendWidth = me.width,
            legendHeight = me.height,
            padding = me.padding,
            chart = me.chart,
            chartBBox = chart.chartBBox,
            insets = chart.insetPadding,
            chartWidth = chartBBox.width - (insets * 2),
            chartHeight = chartBBox.height - (insets * 2),
            chartX = chartBBox.x + insets,
            chartY = chartBBox.y + insets,
            surface = chart.surface,
            mfloor = Math.floor;
        
        if (me.isDisplayed()) {
            // Find the position based on the dimensions
            switch(me.position) {
                case "left":
                    x = insets;
                    y = mfloor(chartY + chartHeight / 2 - legendHeight / 2);
                    break;
                case "right":
                    x = mfloor(surface.width - legendWidth) - insets;
                    y = mfloor(chartY + chartHeight / 2 - legendHeight / 2);
                    break;
                case "top":
                    x = mfloor(chartX + chartWidth / 2 - legendWidth / 2);
                    y = insets;
                    break;
                case "bottom":
                    x = mfloor(chartX + chartWidth / 2 - legendWidth / 2);
                    y = mfloor(surface.height - legendHeight) - insets;
                    break;
                default:
                    x = mfloor(me.origX) + insets;
                    y = mfloor(me.origY) + insets;
            }
            me.x = x;
            me.y = y;

            // Update the position of each item
            Ext.each(me.items, function(item) {
                item.updatePosition();
            });
            // Update the position of the outer box
            me.boxSprite.setAttributes(me.getBBox(), true);
        }
    }
});/**
 * @class Ext.draw.Surface
 * @extends Object
 */

Ext.draw.Surface = Ext.extend(Ext.util.Observable, {

    //requires: ['Ext.draw.SpriteGroup'],
    //uses: ['Ext.draw.engine.SVG', 'Ext.draw.engine.VML', 'Ext.draw.engine.Canvas'],

    separatorRe: /[, ]+/,

    // statics: {
        /**
         * Create and return a new concrete Surface instance appropriate for the current environment.
         * @param {Object} config Initial configuration for the Surface instance
         * @param {Array} implOrder Optional order of implementations to use; the first one that is
         *                available in the current environment will be used. Defaults to
         *                <code>['SVG', 'Canvas', 'VML']</code>.
         *
        newInstance: function(config, implOrder) {
            implOrder = implOrder || ['SVG', 'Canvas', 'VML'];

            var i = 0,
                len = implOrder.length,
                surfaceClass;

            for (; i < len; i++) {
                if (Ext.supports[implOrder[i]]) {
                    surfaceClass = Ext.draw.engine[implOrder[i]];
                    if (surfaceClass) {
                        return new surfaceClass(config);
                    }
                }
            }
            return false;
        }
    },*/

    /* End Definitions */

    availableAttrs: {
        blur: 0,
        "clip-rect": "0 0 1e9 1e9",
        cursor: "default",
        cx: 0,
        cy: 0,
        'dominant-baseline': 'auto',
        fill: "none",
        "fill-opacity": 1,
        font: '10px "Arial"',
        "font-family": '"Arial"',
        "font-size": "10",
        "font-style": "normal",
        "font-weight": 400,
        gradient: "",
        height: 0,
        hidden: false,
        href: "http://sencha.com/",
        opacity: 1,
        path: "M0,0",
        radius: 0,
        rx: 0,
        ry: 0,
        scale: "1 1",
        src: "",
        stroke: "#000",
        "stroke-dasharray": "",
        "stroke-linecap": "butt",
        "stroke-linejoin": "butt",
        "stroke-miterlimit": 0,
        "stroke-opacity": 1,
        "stroke-width": 1,
        target: "_blank",
        text: "",
        "text-anchor": "middle",
        title: "Ext Draw",
        width: 0,
        x: 0,
        y: 0,
        zIndex: 0
    },

 /**
  * @cfg {Number} height
  * The height of this component in pixels (defaults to auto).
  * <b>Note</b> to express this dimension as a percentage or offset see {@link Ext.Component#anchor}.
  */
 /**
  * @cfg {Number} width
  * The width of this component in pixels (defaults to auto).
  * <b>Note</b> to express this dimension as a percentage or offset see {@link Ext.Component#anchor}.
  */
    container: undefined,
    height: 352,
    width: 512,
    x: 0,
    y: 0,
    constructor: function(config) {
        var me = this;
        config = config || {};
        Ext.apply(me, config);

        me.domRef = Ext.getDoc().dom;
        
        me.customAttributes = {};

        me.addEvents(
            'mousedown',
            'mouseup',
            'mouseover',
            'mouseout',
            'mousemove',
            'mouseenter',
            'mouseleave',
            'click'
        );

        Ext.draw.Surface.superclass.constructor.call(me);
        
        me.getId();
        me.initGradients();
        me.initItems();
        if (me.renderTo) {
            me.render(me.renderTo);
            delete me.renderTo;
        }
        me.initBackground(config.background);
    },

    initSurface: Ext.emptyFn,

    renderItem: Ext.emptyFn,

    renderItems: Ext.emptyFn,

    setViewBox: Ext.emptyFn,

    /**
     * Adds one or more CSS classes to the element. Duplicate classes are automatically filtered out.
     * @param {String} sprite The sprite to add, or an array of classes to
     * @param {String/Array} className The CSS class to add, or an array of classes
     * @return {Ext.draw.Sprite} this
     */
    addCls: Ext.emptyFn,

    /**
     * Removes one or more CSS classes from the element.
     * @param {String} sprite The sprite to add, or an array of classes to
     * @param {String/Array} className The CSS class to remove, or an array of classes
     * @return {Ext.draw.Sprite} this
     */
    removeCls: Ext.emptyFn,

    setStyle: Ext.emptyFn,

    initGradients: function() {
        var gradients = this.gradients;
        if (gradients) {
            Ext.each(gradients, this.addGradient, this);
        }
    },

    initItems: function() {
        var items = this.items;
        this.items = new Ext.draw.SpriteGroup();
        this.groups = new Ext.draw.SpriteGroup();
        if (items) {
            this.add(items);
        }
    },
    
    initBackground: function(config) {
        var gradientId, 
            gradient,
            backgroundSprite,
            width = this.width,
            height = this.height;
        if (config) {
            if (config.gradient) {
                gradient = config.gradient;
                gradientId = gradient.id;
                this.addGradient(gradient);
                this.background = this.add({
                    type: 'rect',
                    x: 0,
                    y: 0,
                    width: width,
                    height: height,
                    fill: 'url(#' + gradientId + ')'
                });
            } else if (config.fill) {
                this.background = this.add({
                    type: 'rect',
                    x: 0,
                    y: 0,
                    width: width,
                    height: height,
                    fill: config.fill
                });
            } else if (config.image) {
                this.background = this.add({
                    type: 'image',
                    x: 0,
                    y: 0,
                    width: width,
                    height: height,
                    src: config.image
                });
            }
        }
    },
    
    setSize: function(w, h) {
        if (this.background) {
            this.background.setAttributes({
                width: w,
                height: h,
                hidden: false
            }, true);
        }
    },

    scrubAttrs: function(sprite) {
        var i,
            attrs = {},
            exclude = {},
            sattr = sprite.attr;
        for (i in sattr) {    
            // Narrow down attributes to the main set
            if (this.translateAttrs.hasOwnProperty(i)) {
                // Translated attr
                attrs[this.translateAttrs[i]] = sattr[i];
                exclude[this.translateAttrs[i]] = true;
            }
            else if (this.availableAttrs.hasOwnProperty(i) && !exclude[i]) {
                // Passtrhough attr
                attrs[i] = sattr[i];
            }
        }
        return attrs;
    },

    // private
    onClick: function(e) {
        this.processEvent('click', e);
    },

    // private
    onMouseUp: function(e) {
        this.processEvent('mouseup', e);
    },

    // private
    onMouseDown: function(e) {
        this.processEvent('mousedown', e);
    },

    // private
    onMouseOver: function(e) {
        this.processEvent('mouseover', e);
    },

    // private
    onMouseOut: function(e) {
        this.processEvent('mouseout', e);
    },

    // private
    onMouseMove: function(e) {
        this.fireEvent('mousemove', e);
    },

    // private
    onMouseEnter: Ext.emptyFn,

    // private
    onMouseLeave: Ext.emptyFn,

    /**
     * Add a gradient definition to the Surface. Note that in some surface engines, adding
     * a gradient via this method will not take effect if the surface has already been rendered.
     * Therefore, it is preferred to pass the gradients as an item to the surface config, rather
     * than calling this method, especially if the surface is rendered immediately (e.g. due to
     * 'renderTo' in its config).
     */
    addGradient: Ext.emptyFn,

    add: function() {
        var args = Array.prototype.slice.call(arguments),
            sprite,
            index;

        var hasMultipleArgs = args.length > 1;
        if (hasMultipleArgs || Ext.isArray(args[0])) {
            var items = hasMultipleArgs ? args : args[0],
                results = [],
                i, ln, item;

            for (i = 0, ln = items.length; i < ln; i++) {
                item = items[i];
                item = this.add(item);
                results.push(item);
            }

            return results;
        }
        sprite = this.prepareItems(args[0], true)[0];
        this.positionSpriteInList(sprite);
        this.onAdd(sprite);
        return sprite;
    },

    /**
     * Insert or move a given sprite into the correct position in the items
     * MixedCollection, according to its zIndex. Will be inserted at the end of
     * an existing series of sprites with the same or lower zIndex. If the sprite
     * is already positioned within an appropriate zIndex group, it will not be moved.
     * This ordering can be used by subclasses to assist in rendering the sprites in
     * the correct order for proper z-index stacking.
     * @param {Ext.draw.Sprite} sprite
     * @return {Number} the sprite's new index in the list
     */
    positionSpriteInList: function(sprite) {
        var items = this.items,
            zIndex = sprite.attr.zIndex,
            idx = items.indexOf(sprite);

        if (idx < 0 || (idx > 0 && items.getAt(idx - 1).attr.zIndex > zIndex) ||
                (idx < items.length - 1 && items.getAt(idx + 1).attr.zIndex < zIndex)) {
            items.removeAt(idx);
            idx = items.findIndexBy(function(otherSprite) {
                return otherSprite.attr.zIndex > zIndex;
            });
            if (idx < 0) {
                idx = items.length;
            }
            items.insert(idx, sprite);
        }
        return idx;
    },

    onAdd: function(sprite) {
        var group = sprite.group,
            groups, ln, i;
        if (group) {
            groups = [].concat(group);
            ln = groups.length;
            for (i = 0; i < ln; i++) {
                group = groups[i];
                this.getGroup(group).add(sprite);
            }
            delete sprite.group;
        }
    },
    
    remove: function(sprite) {
        if (sprite) {
            this.items.remove(sprite);
            this.onRemove(sprite);
            this.groups.each(function(item) {
                item.remove(sprite);
            });
        }
    },
    
    removeAll : function() {
        var items = this.items.items,
            ln = items.length,
            i;
        for (i = ln; i > -1; i--) {
            this.remove(items[i]);
        }
    },

    onRemove: Ext.emptyFn,

    applyTransformations: function(sprite) {
            sprite.bbox.transform = 0;
            this.transform(sprite);
        var me = this,
            dirty = false,
            attr = sprite.attr;

        if (attr.translation.x != null || attr.translation.y != null) {
            me.translate(sprite);
            dirty = true;
        }
        if (attr.scaling.x != null || attr.scaling.y != null) {
            me.scale(sprite);
            dirty = true;
        }
        if (attr.rotation.degrees != null) {
            me.rotate(sprite);
            dirty = true;
        }
        if (dirty) {
            sprite.bbox.transform = 0;
            this.transform(sprite);
            sprite.transformations = [];
        }
    },

    rotate: function (sprite) {
        var bbox,
            deg = sprite.attr.rotation.degrees,
            centerX = sprite.attr.rotation.x,
            centerY = sprite.attr.rotation.y;

        if (!Ext.isNumber(centerX) || !Ext.isNumber(centerY)) {
            bbox = this.getBBox(sprite);
            centerX = !Ext.isNumber(centerX) ? bbox.x + bbox.width / 2 : centerX;
            centerY = !Ext.isNumber(centerY) ? bbox.y + bbox.height / 2 : centerY;
        }
        sprite.transformations.push({
            type: "rotate",
            degrees: deg,
            x: centerX,
            y: centerY
        });
    },

    translate: function(sprite) {
        var x = sprite.attr.translation.x || 0,
            y = sprite.attr.translation.y || 0;
        sprite.transformations.push({
            type: "translate",
            x: x,
            y: y
        });
    },

    scale: function(sprite) {
        var bbox,
            x = sprite.attr.scaling.x || 1,
            y = sprite.attr.scaling.y || 1,
            centerX = sprite.attr.scaling.centerX,
            centerY = sprite.attr.scaling.centerY;

        if (!Ext.isNumber(centerX) || !Ext.isNumber(centerY)) {
            bbox = this.getBBox(sprite);
            centerX = !Ext.isNumber(centerX) ? bbox.x + bbox.width / 2 : centerX;
            centerY = !Ext.isNumber(centerY) ? bbox.y + bbox.height / 2 : centerY;
        }
        sprite.transformations.push({
            type: "scale",
            x: x,
            y: y,
            centerX: centerX,
            centerY: centerY
        });
    },

    rectPath: function (x, y, w, h, r) {
        if (r) {
            return [["M", x + r, y], ["l", w - r * 2, 0], ["a", r, r, 0, 0, 1, r, r], ["l", 0, h - r * 2], ["a", r, r, 0, 0, 1, -r, r], ["l", r * 2 - w, 0], ["a", r, r, 0, 0, 1, -r, -r], ["l", 0, r * 2 - h], ["a", r, r, 0, 0, 1, r, -r], ["z"]];
        }
        return [["M", x, y], ["l", w, 0], ["l", 0, h], ["l", -w, 0], ["z"]];
    },

    ellipsePath: function (x, y, rx, ry) {
        if (ry == null) {
            ry = rx;
        }
        return [["M", x, y], ["m", 0, -ry], ["a", rx, ry, 0, 1, 1, 0, 2 * ry], ["a", rx, ry, 0, 1, 1, 0, -2 * ry], ["z"]];
    },

    getPathpath: function (el) {
        return el.attr.path;
    },

    getPathcircle: function (el) {
        var a = el.attr;
        return this.ellipsePath(a.x, a.y, a.radius, a.radius);
    },

    getPathellipse: function (el) {
        var a = el.attr;
        return this.ellipsePath(a.x, a.y, a.radiusX, a.radiusY);
    },

    getPathrect: function (el) {
        var a = el.attr;
        return this.rectPath(a.x, a.y, a.width, a.height, a.r);
    },

    getPathimage: function (el) {
        var a = el.attr;
        return this.rectPath(a.x, a.y, a.width, a.height);
    },

    getPathtext: function (el) {
        var bbox = this.getBBoxText(el);
        return this.rectPath(bbox.x, bbox.y, bbox.width, bbox.height);
    },

    createGroup: function(id) {
        var group = this.groups.get(id);
        if (!group) {
            group = new Ext.draw.SpriteGroup({
                surface: this
            });
            group.id = id || Ext.id(null, 'ext-surface-group-');
            this.groups.add(group);
        }
        return group;
    },

    // Returns the group mixed collection with the given id
    getGroup: function(id) {
        if (typeof id == "string") {
            var group = this.groups.get(id);
            if (!group) {
                group = this.createGroup(id);
            }
        } else {
            group = id;
        }
        return group;
    },

    prepareItems: function(items, applyDefaults) {
        items = [].concat(items);
        // Make sure defaults are applied and item is initialized
        var item, i, ln;
        for (i = 0, ln = items.length; i < ln; i++) {
            item = items[i];
            // Temporary, just take in configs...
            item.surface = this;
            items[i] = this.createItem(item);
        }
        return items;
    },

    createItem: Ext.emptyFn,

    /**
     * Retrieves the id of this component.
     * Will autogenerate an id if one has not already been set.
     */
    getId: function() {
        return this.id || (this.id = Ext.id(null, 'ext-surface-'));
    },

    destroy: function() {
        delete this.domRef;
        this.removeAll();
    }
});

Ext.draw.Surface.newInstance = function(config, implOrder) {
            implOrder = implOrder || ['SVG', 'Canvas', 'VML'];

            var i = 0,
                len = implOrder.length,
                surfaceClass;

            for (; i < len; i++) {
                if (Ext.supports[implOrder[i]]) {
                    surfaceClass = Ext.draw.engine[implOrder[i]];
                    if (surfaceClass) {
                        return new surfaceClass(config);
                    }
                }
            }
            return false;
        }/*
 * @class Ext.draw.engine.Canvas
 * @extends Ext.draw.Surface
 * Provides specific methods to draw with Canvas.
 */
Ext.draw.engine.Canvas = Ext.extend(Ext.draw.Surface, {

    //requires: ['Ext.draw.Draw', 'Ext.draw.Sprite', 'Ext.core.Element'],

    fontSizeRE: /(?:^|\s)(\d+)px(?:\s|$)/,
    fontWeightRE: /(?:^|\s)(normal|bold|bolder|lighter|[1-9]00)(?:\s|$)/,
    fontStyleRE: /(?:^|\s)(normal|italic)(?:\s|$)/,
    fontFamilyRE: /^\s+|\s+$/g,
    urlRE: /^url\(['"]?([^\)]+?)['"]?\)$/i,
    separatorRE: /[, ]+/,
    
    constructor: function(config) {
        this.translateAttrs = {
            rotate: "rotation",
            stroke: "strokeStyle",
            fill: "fillStyle",
            "text-anchor": "textAlign",
            "stroke-width": "lineWidth",
            "stroke-linecap": "lineCap",
            "stroke-linejoin": "lineJoin",
            "stroke-miterlimit": "miterLimit",
            opacity: "globalAlpha"
        };
        this.attrDefaults = {
            strokeStyle: "#000",
            fillStyle: "#000",
            lineWidth: 1,
            lineCap: "square",
            lineJoin: "miter",
            miterLimit: 1,
            shadowColor: "none",
            shadowOffsetX: 0,
            shadowOffsetY: 0,
            shadowBlur: 0,
            rotate: null,
            font: "10px Helvetica, sans-serif",
            translation: null,
            "font-size": null,
            "font-family": null,
            "font-weight": null,
            "font-style": null,
            textAlign: "left",
            globalAlpha: 1
        };
        Ext.draw.engine.Canvas.superclass.constructor.call(this, config);
    },

    updateMaxBoundingBox: function(sprite) {
        if (sprite.type == "image" || sprite.type == "text") {
            delete sprite.realPath;
            Ext.draw.Draw.rectPath(this.getBBox(sprite));
            sprite.realPath = Ext.draw.Draw.rotateAndTranslatePath(sprite);
        }
        var newBBox = this.getBBox(sprite),
            oldBBox = sprite.curBBox,
            x,
            y;
        if (!oldBBox) {
            sprite.maxBBox = newBBox;
        }
        else {
            x = Math.min(newBBox.x, oldBBox.x);
            y = Math.min(newBBox.y, oldBBox.y);
            sprite.maxBBox = {
                x: x,
                y: y,
                width: Math.max(newBBox.x + newBBox.width, oldBBox.x + oldBBox.width) - x,
                height: Math.max(newBBox.y + newBBox.height, oldBBox.y + oldBBox.height) - y
            };
        }    
        sprite.curBBox = newBBox;
    },

    getBBox: function(sprite) {
        var bb,
            textAlign;
        if (sprite.realPath) {
            bb = Ext.draw.Draw.pathDimensions(sprite.realPath);
        } else {
            switch (sprite.type) {
                case "rect":
                case "image":
                    bb = {
                        x: sprite.x,
                        y: sprite.y,
                        width: sprite.width,
                        height: sprite.height
                    };
                break;
                case "circle":
                    bb = {
                        x: sprite.x - sprite.radius,
                        y: sprite.y - sprite.radius,
                        width: sprite.radius * 2,
                        height: sprite.radius * 2
                    };
                break;
                case "ellipse":
                    bb = {
                        x: sprite.x - sprite.radiusX,
                        y: sprite.y - sprite.radiusY,
                        width: sprite.radiusX * 2,
                        height: sprite.radiusY * 2
                    };
                break;
                case "path":
                    bb = Ext.draw.Draw.pathDimensions(sprite.path);
                break;
                case "text":
                    var shadow = this.shadow;
                    shadow.save();
                    // Normalize middle to center for Canvas
                    textAlign = sprite["text-anchor"] || this.attrDefaults.textAlign;
                    if (textAlign == 'middle') {
                        textAlign = 'center';
                    }
                    shadow.textAlign = textAlign;
                    shadow.font = sprite.font || this.attrDefaults.font;
                    var width = 0,
                        rows = (sprite.text + "").split("\n"),
                        rlength = rows.length,
                        i = rlength,
                        height = sprite["font-size"] * 1.2,
                        x = sprite.x,
                        y = sprite.y - rlength * height / 2;
                    while (i--) {
                        width = Math.max(width, shadow.measureText(rows[i]).width);
                    }
                    switch (shadow.textAlign) {
                        case "center":
                            x -= width / 2;
                        break;
                        case "end":
                            x -= width;
                        break;
                    }
                    bb = {
                        x: x,
                        y: y,
                        width: width,
                        height: height * rlength
                    };
                break;
            }
        }
        bb.x2 = bb.x + bb.width;
        bb.y2 = bb.y + bb.height;
        return bb;
    },

    setSize: function(w, h) {
        if (typeof w == 'object') {
            h = w.height;
            w = w.width;
        }
        this.el.width = this.shadow.width = w;
        this.el.height = this.shadow.height = h;
        this.width = w;
        this.height = h;
    },

    render: function(container) {
        var doc = Ext.getDoc().dom,
            el,
            shadow,
            span,
            containerHeight = Ext.get(container).getHeight(),
            containerWidth = Ext.get(container).getWidth();
        this.container = Ext.get(container);
        el = doc.createElement("canvas");
        el.id = this.id;

        shadow = doc.createElement("canvas").getContext("2d");
        span = doc.createElement("span");
        span.style.cssText = "position:absolute;left:-9999em;top:-9999em;padding:0;margin:0;line-height:1;display:inline;";

        shadow.save();

        container.appendChild(el);
        container.appendChild(span);
        this.el = el;
        this.context = el.getContext("2d");
        this.shadow = shadow;
        this.span = span;
        this.renderAll();
    },

    createItem: function(config) {
        config.context = Ext.getDoc().dom.createElement("canvas").getContext("2d");
        config.context.canvas.width = this.width;
        config.context.canvas.height = this.height;
        var sprite = Ext.apply(new Ext.draw.Sprite(config), {change: this.change});
        // Update the maxBBox when there's a change to the spriteitive
        //sprite.on('change', this.updateMaxBoundingBox, sprite);
        return sprite;
    },

    renderItem: function() {
        this.renderAll();
    },

    renderAll: function() {
        //var maxBBox = spriteitive.maxBBox,
        //    bbox = {
        //        x: Math.round(maxBBox.x - 5),
        //        y: Math.round(maxBBox.y - 5),
        //        width: Math.round(maxBBox.width + 10),
        //        height: Math.round(maxBBox.height + 10)
        //    },
        var context = this.context;
        context.restore();
        context.save();
        //context.beginPath();
        //canvas.rect(bbox.x, bbox.y, bbox.width, bbox.height);
        //canvas.clip();
        context.clearRect(0, 0, this.width, this.height);
        context.restore();
        context.save();

        this.items.each(this.renderItems, this);
        //while (bot) {
        //    (!bb || isOverlap(bb, bot._maxbbox)) && bot.draw(cnv, bb);
        //    bot = bot.next;
        //}
    },

    updateSprite: function(sprite) {
        //if (this.fireEvent('beforechange', this) !== false) {
            this.applyChange(sprite);
            this.updateMaxBoundingBox(sprite);
        //}
    },

    applyChange: function(sprite) {
        var oldPath = sprite.path;
        // Handle Attributes
        this.cleanAttrs(sprite, this.scrubAttrs(sprite));

        // Handle Path
        switch (sprite.type) {
            case "circle":
                sprite.radiusX = sprite.radiusY = sprite.radius;
                sprite.path = Ext.draw.Draw.path2curve(Ext.draw.Draw.ellipsePath(sprite));
            break;
            case "ellipse":
                sprite.path = Ext.draw.Draw.path2curve(Ext.draw.Draw.ellipsePath(sprite));
                break;
            case "path":
                sprite.path = Ext.draw.Draw.path2curve(sprite.path);
                break;
            case "rect":
                sprite.path = Ext.draw.Draw.path2curve(Ext.draw.Draw.rectPath(sprite));
                break;
            case "text":
                sprite.path = Ext.draw.Draw.path2curve(Ext.draw.Draw.rectPath(sprite));
                break;
        }

        if (sprite.path && sprite.path.length) {
            sprite.realPath = Ext.draw.Draw.rotateAndTranslatePath(sprite);
        }
        if (oldPath != sprite.path) {
            sprite.dirty = true;
        }
    },

    drawPath: function(context, path) {
        if (!path) {
            return;
        }
        var x,
            y,
            i,
            ln = path.length;
        context.beginPath();
        for (i = 0; i < ln; i++) {
            switch (path[i][0]) {
                case "M":
                    context.moveTo(path[i][1], path[i][2]);
                    if (x == null) {
                        x = path[i][1];
                    }
                    if (y == null) {
                        y = path[i][2];
                    }
                break;
                case "C":
                    context.bezierCurveTo(path[i][1], path[i][2], path[i][3], path[i][4], path[i][5], path[i][6]);
                break;
                case "Z":
                    context.lineTo(x, y);
                break;
            }
        }
    },

    scrubAttrs: function(sprite) {
        var attrs = Ext.draw.engine.Canvas.superclass.scrubAttrs.apply(this, [sprite]);
        if (attrs.hasOwnProperty('textAlign') && attrs.textAlign == 'middle') {
            attrs.textAlign = 'center';
        }
        return attrs;
    },

    renderItems: function(sprite) {
        this.updateSprite(sprite);
        var context = this.context,
            cache = sprite.context,
            clipbox,
            i;
        if (sprite.hidden || sprite.opacity == 0) {
            return;
        }
        context.restore();
        context.save();
        if (clipbox) {
            context.beginPath();
            context.rect(clipbox.x, clipbox.y, clipbox.width, clipbox.height);
            context.clip();
        }
        if (sprite.dirty) {
            cache.restore();
            cache.save();
            cache.clearRect(-1e3, -1e3, this.width + 2e3, this.height + 2e3);
            var attrs = this.scrubAttrs(sprite);
            for (i in attrs) {
                cache[i] = attrs[i];
            }

            var rotate = sprite.rotation,
                radians = rotate.degrees * Math.PI / 180,
                tx = sprite.translation.x,
                ty = sprite.translation.y,
                scale = this.scaling;
            // Apply Rotation
            if (rotate.degrees) {
                cache.translate(rotate.x, rotate.y);
                cache.rotate(radians);
                cache.translate(-rotate.x, -rotate.y);
                // Translation AND Rotation requires a bit more work
                if (tx !== 0 || ty !== 0) {
                    var x = tx,
                        y = ty,
                        cos = Math.cos(-radians),
                        sin = Math.sin(-radians);
                    tx = x * cos - y * sin;
                    ty = x * sin + y * cos;
                    cache.translate(tx, ty);
                }
            // Apply only Translation
            } else {
                cache.translate(tx, ty);
            }
            // special case: image

            if (this.type == "image") {
                if (!(this._imgdata && this._imgdata[attrs.src])) {
                    var img = R.doc.createElement("img"),
                        el = this,
                        paper = this.m;
                    img.src = attrs.src;
                    img.style.cssText = "position:absolute;left:-9999em;top-9999em";
                    img.onload = function () {
                        var cn = R.doc.createElement("canvas"),
                            c = cn.getContext("2d");
                        cn.width = img.offsetWidth;
                        cn.height = img.offsetHeight;
                        c.drawImage(img, 0, 0, cn.width, cn.height);
                        el._imgdata = el._imgdata || {};
                        el._imgdatacount = el._imgdatacount || [];
                        el._imgdatacount.push(el._imgdata[el.attrs.src] = cn);
                        el._imgdatacount[length] > 1e3 && delete el._imgdata[el._imgdatacount.shift()];
                        img.parentNode.removeChild(img);
                        paper.refresh(this);
                    };
                    this.m.canvas.parentNode.appendChild(img);
                } else {
                    // scale
                    if (sc.x || sc.y) {
                        c.scale(sc.x, sc.y);
                        c.translate(sc.cx / sc.x - sc.cx, sc.cy / sc.y - sc.cy);
                    }
                    c.drawImage(this._imgdata[attrs.src], attrs.x, attrs.y, attrs.width, attrs.height);
                    c.restore();
                    return;
                }
            }
            else if (sprite.type == "text") {
                var fill,
                    stroke,
                    j,
                    jj,
                    top,
                    rows = (sprite.text + "").split("\n"),
                    textAlign;
                // Normalize middle to center for Canvas
                textAlign = sprite["text-anchor"] || this.attrDefaults.textAlign;
                if (textAlign == 'middle') {
                    textAlign = 'center';
                }
                cache.textAlign = textAlign;
                cache.font = sprite.font || this.attrDefaults.font;
                cache.textBaseline = "middle";
                //"fill-opacity" in attrs && (c.globalAlpha = attrs["fill-opacity"] * (attrs.opacity || 1));
                fill = sprite.fillStyle && sprite.fillStyle != "none";
                //"stroke-opacity" in attrs && (c.globalAlpha = attrs["stroke-opacity"] * (attrs.opacity || 1));
                stroke = sprite.strokeStyle && sprite.strokeStyle != "none";
                top = sprite.y - (rows.length - 1) * sprite["font-size"] * 1.2 / 2;
                for (j = 0, jj = rows.length; j < jj; j++) {
                    if (fill) {
                        cache.fillText(rows[j], sprite.x, top + sprite["font-size"] * 1.2 * j);
                    }
                    if (stroke) {
                        cache.strokeText(rows[j], sprite.x, top + sprite["font-size"] * 1.2 * j);
                    }
                }
            } else {
                this.drawPath(cache, sprite.path);
            }

            cache.save();
            if (this.type != "text") {
                // Gradient
                var grad = attrs.gradient;
                if (grad) {
                    var g;
                    if (grad.type == "linear") {
                        var bb = this.getBBox();
                        g = cache.createLinearGradient(bb.x + grad.vector[0] * bb.width, bb.y + grad.vector[1] * bb.height, bb.x + grad.vector[2] * bb.width, bb.y + grad.vector[3] * bb.height);
                    } else {
                        // TODO: Make it work for ellipses with transformation
                        var rx = attrs.rx || attrs.r,
                            ry = attrs.ry || attrs.r;
                        g = cache.createRadialGradient(attrs.cx - rx + rx * 2 * grad.fx, attrs.cy - ry + ry * 2 * grad.fy, 0, attrs.cx, attrs.cy, mmax(rx, ry));
                    }
                    var opacity = (isNaN(attrs["fill-opacity"]) ? 1 : attrs["fill-opacity"]) * (isNaN(attrs.opacity) ? 1 : attrs.opacity),
                        dot = grad.dots[grad.dots[length] - 1],
                        lastcolor = dot.color;
                    dot.color = "rgba(" + [lastcolor.r, lastcolor.g, lastcolor.b, opacity] + ")";
                    for (i = grad.dots.length; i--;) {
                        dot = grad.dots[i];
                        g.addColorStop(toFloat(dot.offset) / 100, dot.color);
                    }
                    cache.globalAlpha = 1;
                    cache.fillStyle = g;
                    cache.fill();
                } else {
                    //"fill-opacity" in attrs && (cache.globalAlpha = attrs["fill-opacity"] * (attrs.opacity || 1));
                    if (attrs.fillStyle && attrs.fillStyle != "none") {
                        cache.fill();
                    }
                }
                //"stroke-opacity" in attrs && (cache.globalAlpha = attrs["stroke-opacity"] * (attrs.opacity || 1));
                if (attrs.strokeStyle && attrs.strokeStyle != "none") {
                    cache.stroke();
                }
            }
            cache.restore();

            cache.translate(-tx, -ty);
            sprite.dirty = false;
        }
        context.drawImage(cache.canvas, 0, 0);
    },

    cleanAttrs: function(sprite, attrs) {
        var value,
            color,
            xy,
            i;
        for (i in attrs) {
            value = attrs[i];
            switch (i) {
                case "translate":
                    // this.translate(value);
                    xy = (value + "").split(this.separatorRE);
                    sprite.translation.x += +xy[0];
                    sprite.translation.y += +xy[1];
                break;
                case "font-size":
                    sprite["font-size"] = parseInt(value, 10);
                case "font-family":
                case "font-weight":
                case "font-style":
                    sprite.font = (sprite["font-weight"] || "") + " " + (sprite["font-style"] || "") + " " + (sprite["font-size"] ? sprite["font-size"] + "px " : "") + (sprite["font-family"] || "");
                break;
                case "font":
                    value = value.replace(this.fontSizeRE, function (all, size) {
                        sprite["font-size"] = size;
                        return "";
                    });
                    value = value.replace(this.fontWeightRE, function (all, weight) {
                        sprite["font-weight"] = weight;
                        return "";
                    });
                    value = value.replace(this.fontStyleRE, function (all, style) {
                        sprite["font-style"] = style;
                        return "";
                    });
                    sprite["font-family"] = value.replace(this.fontFamilyRE, "") || sprite["font-family"];
                case "stroke":
                case "strokeStyle":
                    //color = Ext.draw.Color.getRGB(value);
                    sprite.stroke = sprite.strokeStyle = value;
                break;
                case "fill":
                case "fillStyle":
                    //color = Ext.draw.Color.getRGB(value);
                    sprite.fill = sprite.fillStyle = value;
                break;
                case "rotate":
                case "rotation":
                    this.rotate(sprite, value);
                break;
                case "scale":
                break;
                /*
                case "gradient":
                    var isURL = (value + "").match(this.urlRE);
                    if (false && isURL) {
                        // TODO: Pattern
                        el = $("pattern");
                        var ig = $("image");
                        el.id = "r" + (R._id++)[toString](36);
                        $(el, {x: 0, y: 0, patternUnits: "userSpaceOnUse", height: 1, width: 1});
                        $(ig, {x: 0, y: 0});
                        ig.setAttributeNS(o.paper.xlink, "href", isURL[1]);
                        el[appendChild](ig);

                        var img = R.doc.createElement("img");
                        img.style.cssText = "position:absolute;left:-9999em;top-9999em";
                        img.onload = function () {
                            $(el, {width: this.offsetWidth, height: this.offsetHeight});
                            $(ig, {width: this.offsetWidth, height: this.offsetHeight});
                            R.doc.body.removeChild(this);
                            o.paper.safari();
                        };
                        R.doc.body[appendChild](img);
                        img.src = isURL[1];
                        o.paper.defs[appendChild](el);
                        node.style.fill = "url(#" + el.id + ")";
                        $(node, {fill: "url(#" + el.id + ")"});
                        o.pattern = el;
                        o.pattern && updatePosition(o);
                        break;
                    }
                    if (!clr.error) {
                        delete attrs.gradient;
                        delete this.attrs.gradient;
                        this.attrs.fill = clr.hex;
                    } else if ((({circle: 1, ellipse: 1})[has](this.type) || (value + E).charAt() != "r") && (this.attrs.gradient = gradientParser(value))) {
                        this.attrs.fill = "none";
                        break;
                    }
                    clr[has]("o") && (this.attrs["fill-opacity"] = clr.o / 100);
                break;
                */
            }
        }
    },

    change: function () {
        var oldPath = this.path;
        // Handle Attributes
        this.surface.cleanAttrs(this, this.surface.scrubAttrs(this));

        // Handle Path
        switch (this.type) {
            case "circle":
                this.radiusX = this.radiusY = this.radius;
                this.path = Ext.draw.Draw.path2curve(Ext.draw.Draw.ellipsePath(this));
            break;
            case "ellipse":
                this.path = Ext.draw.Draw.path2curve(Ext.draw.Draw.ellipsePath(this));
                break;
            case "rect":
                this.path = Ext.draw.Draw.path2curve(Ext.draw.Draw.rectPath(this));
                break;
            case "text":
                this.path = Ext.draw.Draw.path2curve(Ext.draw.Draw.rectPath(this));
                break;
        }

        if (this.path && this.path.length) {
            this.realPath = Ext.draw.Draw.rotateAndTranslatePath(this);
        }
        if (oldPath != this.path) {
            this.dirty = true;
            return true;
        }
    },

    rotate: function(sprite, rotate) {
        if (typeof rotate.x == 'number') {
            sprite.rotation = {
                degrees: rotate.degrees,
                x: rotate.x,
                y: rotate.y
            };
        }
        else if (typeof rotate.degrees == 'number') {
            var bbox = this.getBBox(sprite);
            sprite.rotation = {
                degrees: parseFloat(rotate.degrees),
                x: bbox.x + bbox.width / 2,
                y: bbox.y + bbox.height / 2 
            };
        }
        sprite.dirty = true;
    },

    getRegion: function() {
        return Ext.fly(this.el).getRegion();
    }
});
/**
 * @class Ext.draw.engine.SVG
 * @extends Ext.draw.Surface
 * Provides specific methods to draw with SVG.
 */
Ext.draw.engine.SVG = Ext.extend(Ext.draw.Surface, {

    //requires: ['Ext.draw.Draw', 'Ext.draw.Sprite', 'Ext.draw.Matrix', 'Ext.core.Element'],

    engine: 'SVG',

    trimRe: /^\s+|\s+$/g,
    spacesRe: /\s+/,
    xlink: "http:/" + "/www.w3.org/1999/xlink",

    translateAttrs: {
        radius: "r",
        radiusX: "rx",
        radiusY: "ry",
        path: "d",
        lineWidth: "stroke-width",
        fillOpacity: "fill-opacity",
        strokeOpacity: "stroke-opacity",
        strokeLinejoin: "stroke-linejoin"
    },

    minDefaults: {
        circle: {
            cx: 0,
            cy: 0,
            r: 0,
            fill: "none",
            stroke: null,
            "stroke-width": null,
            opacity: null,
            "fill-opacity": null,
            "stroke-opacity": null
        },
        ellipse: {
            cx: 0,
            cy: 0,
            rx: 0,
            ry: 0,
            fill: "none",
            stroke: null,
            "stroke-width": null,
            opacity: null,
            "fill-opacity": null,
            "stroke-opacity": null
        },
        rect: {
            x: 0,
            y: 0,
            width: 0,
            height: 0,
            rx: 0,
            ry: 0,
            fill: "none",
            stroke: null,
            "stroke-width": null,
            opacity: null,
            "fill-opacity": null,
            "stroke-opacity": null
        },
        text: {
            x: 0,
            y: 0,
            "text-anchor": "start",
            "font-family": null,
            "font-size": null,
            "font-weight": null,
            "font-style": null,
            fill: "#000",
            stroke: null,
            "stroke-width": null,
            opacity: null,
            "fill-opacity": null,
            "stroke-opacity": null
        },
        path: {
            d: "M0,0",
            fill: "none",
            stroke: null,
            "stroke-width": null,
            opacity: null,
            "fill-opacity": null,
            "stroke-opacity": null
        },
        image: {
            x: 0,
            y: 0,
            width: 0,
            height: 0,
            preserveAspectRatio: "none",
            opacity: null
        }
    },

    createSVGElement: function(type, attrs) {
        var el = this.domRef.createElementNS("http:/" + "/www.w3.org/2000/svg", type),
            key;
        if (attrs) {
            for (key in attrs) {
                el.setAttribute(key, String(attrs[key]));
            }
        }
        return el;
    },

    createSprite: function(sprite) {
        // Create svg element and append to the DOM.
        var el = this.createSVGElement(sprite.type);
        el.id = sprite.id;
        el.style.webkitTapHighlightColor = "rgba(0,0,0,0)";
        sprite.el = Ext.get(el);
        this.applyZIndex(sprite); //performs the insertion
        sprite.matrix = new Ext.draw.Matrix;
        sprite.bbox = {
            plain: 0,
            transform: 0
        };
        sprite.fireEvent("render", sprite);
        return el;
    },

    getBBox: function (sprite, isWithoutTransform) {
        var realPath = this["getPath" + sprite.type](sprite);
        if (isWithoutTransform) {
            sprite.bbox.plain = sprite.bbox.plain || Ext.draw.Draw.pathDimensions(realPath);
            return sprite.bbox.plain;
        }
        sprite.bbox.transform = sprite.bbox.transform || Ext.draw.Draw.pathDimensions(Ext.draw.Draw.mapPath(realPath, sprite.matrix));
        return sprite.bbox.transform;
    },
    
    getBBoxText: function (sprite) {
        var bbox = {},
            bb, height, width, i, ln, el;
        if (sprite && sprite.el) {
            el = sprite.el.dom;
            try {
                bbox = el.getBBox();
                return bbox;
            } catch(e) {
                // Firefox 3.0.x plays badly here
            }
            bbox = {x: bbox.x, y: Infinity, width: 0, height: 0};
            ln = el.getNumberOfChars();
            for (i = 0; i < ln; i++) {
                bb = el.getExtentOfChar(i);
                bbox.y = Math.min(bb.y, bbox.y);
                height = bb.y + bb.height - bbox.y;
                bbox.height = Math.max(bbox.height, height);
                width = bb.x + bb.width - bbox.x;
                bbox.width = Math.max(bbox.width, width);
            }
            return bbox;
        }
    },

    hide: function() {
        Ext.get(this.el).hide();
    },

    show: function() {
        Ext.get(this.el).show();
    },

    hidePrim: function(sprite) {
        this.addCls(sprite, Ext.baseCSSPrefix + 'hide-visibility');
    },

    showPrim: function(sprite) {
        this.removeCls(sprite, Ext.baseCSSPrefix + 'hide-visibility');
    },

    getDefs: function() {
        return this._defs || (this._defs = this.createSVGElement("defs"));
    },

    transform: function(sprite) {
        var me = this,
            matrix = new Ext.draw.Matrix,
            transforms = sprite.transformations,
            transformsLength = transforms.length,
            i = 0,
            transform, type;

        for (; i < transformsLength; i++) {
            transform = transforms[i];
            type = transform.type;
            if (type == "translate") {
                matrix.translate(transform.x, transform.y);
            }
            else if (type == "rotate") {
                matrix.rotate(transform.degrees, transform.x, transform.y);
            }
            else if (type == "scale") {
                matrix.scale(transform.x, transform.y, transform.centerX, transform.centerY);
            }
        }
        sprite.matrix = matrix;
        sprite.el.set({transform: matrix.toSVG()});
    },

    setSize: function(w, h) {
        var me = this,
            el = me.el;
        
        w = +w || me.width;
        h = +h || me.height;
        me.width = w;
        me.height = h;

        el.setSize(w, h);
        el.set({
            width: w,
            height: h
        });
        //me.callParent([w, h]);
        Ext.draw.engine.SVG.superclass.setSize.apply(this, arguments);
    },

    /**
     * Get the region for the surface's canvas area
     * @returns {Ext.util.Region}
     */
    getRegion: function() {
        // Mozilla requires using the background rect because the svg element returns an
        // incorrect region. Webkit gives no region for the rect and must use the svg element.
        var svgXY = this.el.getXY(),
            rectXY = this.bgRect.getXY(),
            max = Math.max,
            x = max(svgXY[0], rectXY[0]),
            y = max(svgXY[1], rectXY[1]);
        return {
            left: x,
            top: y,
            right: x + this.width,
            bottom: y + this.height
        };
    },

    onRemove: function(item) {
        if (item.el) {
            item.el.remove();
            delete item.el;
        }
        //this.callParent(arguments);
        Ext.draw.engine.SVG.superclass.onRemove.apply(this, arguments);
    },
    
    setViewBox: function(x, y, width, height) {
        //this.callParent(arguments);
        Ext.draw.engine.SVG.superclass.setViewBox.apply(this, arguments);
        this.el.dom.setAttribute("viewBox", [x, y, width, height].join(" "));
    },

    render: function (container) {
        var me = this;
        if (!me.el) {
            var width = me.width || 10,
                height = me.height || 10,
                el = me.createSVGElement('svg', {
                    xmlns: "http:/" + "/www.w3.org/2000/svg",
                    version: 1.1,
                    width: width,
                    height: height
                }),
                defs = me.getDefs(),

                // Create a rect that is always the same size as the svg root; this serves 2 purposes:
                // (1) It allows mouse events to be fired over empty areas in Webkit, and (2) we can
                // use it rather than the svg element for retrieving the correct client rect of the
                // surface in Mozilla (see https://bugzilla.mozilla.org/show_bug.cgi?id=530985)
                bgRect = me.createSVGElement("rect", {
                    width: "100%",
                    height: "100%",
                    fill: "#000",
                    stroke: "none",
                    opacity: 0
                });
            el.appendChild(defs);
            el.appendChild(bgRect);
            container.appendChild(el);
            me.el = Ext.get(el);
            me.bgRect = Ext.get(bgRect);
            me.el.on({
                scope: me,
                mouseup: me.onMouseUp,
                mousedown: me.onMouseDown,
                mouseover: me.onMouseOver,
                mouseout: me.onMouseOut,
                mousemove: me.onMouseMove,
                mouseenter: me.onMouseEnter,
                mouseleave: me.onMouseLeave,
                click: me.onClick
            });
        }
        me.renderAll();
    },

    // private
    onMouseEnter: function(e) {
        if (this.el.parent().getRegion().contains(e.getPoint())) {
            this.fireEvent('mouseenter', e);
        }
    },

    // private
    onMouseLeave: function(e) {
        if (!this.el.parent().getRegion().contains(e.getPoint())) {
            this.fireEvent('mouseleave', e);
        }
    },
    // @private - Normalize a delegated single event from the main container to each sprite and sprite group
    processEvent: function(name, e) {
        var target = e.getTarget(),
            surface = this.surface,
            sprite;

        this.fireEvent(name, e);
        // We wrap text types in a tspan, sprite is the parent.
        if (target.nodeName == "tspan" && target.parentNode) {
            target = target.parentNode;
        }
        sprite = this.items.get(target.id);
        if (sprite) {
            sprite.fireEvent(name, sprite, e);
        }
    },

    /* @private - Wrap SVG text inside a tspan to allow for line wrapping.  In addition this normallizes
     * the baseline for text the vertical middle of the text to be the same as VML.
     */
    
     tuneText: function (sprite, attrs) {
         var el = sprite.el.dom,
             x = el.getAttribute("x"),
             tspans = [],
             height, tspan, text, i, ln, texts;

         if (attrs.hasOwnProperty("text")) {
             while (el.firstChild) {
                 el.removeChild(el.firstChild);
             }
             // Wrap each row into tspan to emulate rows
             texts = String(attrs.text).split("\n");
             for (i = 0, ln = texts.length; i < ln; i++) {
                 text = texts[i];
                 if (text) {
                     tspan = this.createSVGElement("tspan");
                     tspan.appendChild(Ext.getDoc().dom.createTextNode(text));
                     tspan.setAttribute("x", x);
                     el.appendChild(tspan);
                     tspans[i] = tspan;
                 }
             }
         }
         // Normalize baseline via a DY shift of first tspan. Shift other rows by height * line height (1.2)
         if (tspans.length) {
             height = this.getBBoxText(sprite).height;
             for (i = 0, ln = tspans.length; i < ln; i++) {
                 tspans[i].setAttribute("dy", i ? height * 1.2 : height / 4);
             }
             sprite.dirty = true;
         }
     },

    renderAll: function() {
        this.items.each(this.renderItem, this);
    },

    renderItem: function (sprite) {
        if (!this.el) {
            return;
        }
        if (!sprite.el) {
            this.createSprite(sprite);
        }
        if (sprite.zIndexDirty) {
            this.applyZIndex(sprite);
        }
        if (sprite.dirty) {
            this.applyAttrs(sprite);
            this.applyTransformations(sprite);
        }
    },

    redraw: function(sprite) {
        sprite.dirty = sprite.zIndexDirty = true;
        this.renderItem(sprite);
    },

    applyAttrs: function (sprite) {
        var me = this,
            el = sprite.el,
            group = sprite.group,
            sattr = sprite.attr,
            groups, i, ln, attrs, font, key, style, name, rect;

        if (group) {
            groups = [].concat(group);
            ln = groups.length;
            for (i = 0; i < ln; i++) {
                group = groups[i];
                me.getGroup(group).add(sprite);
            }
            delete sprite.group;
        }
        attrs = me.scrubAttrs(sprite) || {};

        // if (sprite.dirtyPath) {
        sprite.bbox.plain = 0;
        sprite.bbox.transform = 0;
            if (sprite.type == "circle" || sprite.type == "ellipse") {
                attrs.cx = attrs.cx || attrs.x;
                attrs.cy = attrs.cy || attrs.y;
            }
            else if (sprite.type == "rect") {
                attrs.rx = attrs.ry = attrs.r;
            }
            else if (sprite.type == "path" && attrs.d) {
                attrs.d = Ext.draw.Draw.pathToAbsolute(attrs.d);
            }
            sprite.dirtyPath = false;
        // }

        if (attrs['clip-rect']) {
            me.setClip(sprite, attrs);
            delete attrs['clip-rect'];
        }
        if (sprite.type == 'text' && attrs.font && sprite.dirtyFont) {
            el.set({ style: "font: " + attrs.font});
            sprite.dirtyFont = false;
        }
        if (sprite.type == "image") {
            el.dom.setAttributeNS(me.xlink, "href", attrs.src);
        }
        Ext.applyIf(attrs, me.minDefaults[sprite.type]);

        if (sprite.dirtyHidden) {
            (sattr.hidden) ? me.hidePrim(sprite) : me.showPrim(sprite);
            sprite.dirtyHidden = false;
        }
        for (key in attrs) {
            if (attrs.hasOwnProperty(key) && attrs[key] != null) {
                el.dom.setAttribute(key, String(attrs[key]));
            }
        }
        if (sprite.type == 'text') {
            me.tuneText(sprite, attrs);
        }

        //set styles
        style = sattr.style;
        if (style) {
            el.setStyle(style);
        }

        sprite.dirty = false;
    },

    setClip: function(sprite, params) {
        var me = this,
            rect = params["clip-rect"],
            clipEl, clipPath;
        if (rect) {
            if (sprite.clip) {
                sprite.clip.parentNode.parentNode.removeChild(sprite.clip.parentNode);
            }
            clipEl = me.createSVGElement('clipPath');
            clipPath = me.createSVGElement('rect');
            clipEl.id = Ext.id(null, 'ext-clip-');
            clipPath.setAttribute("x", rect.x);
            clipPath.setAttribute("y", rect.y);
            clipPath.setAttribute("width", rect.width);
            clipPath.setAttribute("height", rect.height);
            clipEl.appendChild(clipPath);
            me.getDefs().appendChild(clipEl);
            sprite.el.dom.setAttribute("clip-path", "url(#" + clipEl.id + ")");
            sprite.clip = clipPath;
        }
        // if (!attrs[key]) {
        //     var clip = Ext.getDoc().dom.getElementById(sprite.el.getAttribute("clip-path").replace(/(^url\(#|\)$)/g, ""));
        //     clip && clip.parentNode.removeChild(clip);
        //     sprite.el.setAttribute("clip-path", "");
        //     delete attrss.clip;
        // }
    },

    /**
     * Insert or move a given sprite's element to the correct place in the DOM list for its zIndex
     * @param {Ext.draw.Sprite} sprite
     */
    applyZIndex: function(sprite) {
        var idx = this.positionSpriteInList(sprite),
            el = sprite.el,
            prevEl;
        if (this.el.dom.childNodes[idx + 2] !== el.dom) { //shift by 2 to account for defs and bg rect 
            if (idx > 0) {
                // Find the first previous sprite which has its DOM element created already
                do {
                    prevEl = this.items.getAt(--idx).el;
                } while (!prevEl && idx > 0);
            }
            el.insertAfter(prevEl || this.bgRect);
        }
        sprite.zIndexDirty = false;
    },

    createItem: function (config) {
        var sprite = new Ext.draw.Sprite(config);
        sprite.surface = this;
        return sprite;
    },

    addGradient: function(gradient) {
        gradient = Ext.draw.Draw.parseGradient(gradient);
        var ln = gradient.stops.length,
            vector = gradient.vector,
            gradientEl,
            stop,
            stopEl,
            i;
        if (gradient.type == "linear") {
            gradientEl = this.createSVGElement("linearGradient");
            gradientEl.setAttribute("x1", vector[0]);
            gradientEl.setAttribute("y1", vector[1]);
            gradientEl.setAttribute("x2", vector[2]);
            gradientEl.setAttribute("y2", vector[3]);
        }
        else {
            gradientEl = this.createSVGElement("radialGradient");
            gradientEl.setAttribute("cx", gradient.centerX);
            gradientEl.setAttribute("cy", gradient.centerY);
            gradientEl.setAttribute("r", gradient.radius);
            if (Ext.isNumber(gradient.focalX) && Ext.isNumber(gradient.focalY)) {
                gradientEl.setAttribute("fx", gradient.focalX);
                gradientEl.setAttribute("fy", gradient.focalY);
            }
        }    
        gradientEl.id = gradient.id;
        this.getDefs().appendChild(gradientEl);

        for (i = 0; i < ln; i++) {
            stop = gradient.stops[i];
            stopEl = this.createSVGElement("stop");
            stopEl.setAttribute("offset", stop.offset + "%");
            stopEl.setAttribute("stop-color", stop.color);
            stopEl.setAttribute("stop-opacity",stop.opacity);
            gradientEl.appendChild(stopEl);
        }
    },

    /**
     * Checks if the specified CSS class exists on this element's DOM node.
     * @param {String} className The CSS class to check for
     * @return {Boolean} True if the class exists, else false
     */
    hasCls: function(sprite, className) {
        return className && (' ' + (sprite.el.dom.getAttribute('class') || '') + ' ').indexOf(' ' + className + ' ') != -1;
    },

    addCls: function(sprite, className) {
        var el = sprite.el,
            i,
            len,
            v,
            cls = [],
            curCls =  el.getAttribute('class') || '';
        // Separate case is for speed
        if (!Ext.isArray(className)) {
            if (typeof className == 'string' && !this.hasCls(sprite, className)) {
                el.set({ 'class': curCls + ' ' + className });
            }
        }
        else {
            for (i = 0, len = className.length; i < len; i++) {
                v = className[i];
                if (typeof v == 'string' && (' ' + curCls + ' ').indexOf(' ' + v + ' ') == -1) {
                    cls.push(v);
                }
            }
            if (cls.length) {
                el.set({ 'class': ' ' + cls.join(' ') });
            }
        }
    },

    removeCls: function(sprite, className) {
        var me = this,
            el = sprite.el,
            curCls =  el.getAttribute('class') || '',
            i, idx, len, cls, elClasses;
        if (!Ext.isArray(className)){
            className = [className];
        }
        if (curCls) {
            elClasses = curCls.replace(me.trimRe, ' ').split(me.spacesRe);
            for (i = 0, len = className.length; i < len; i++) {
                cls = className[i];
                if (typeof cls == 'string') {
                    cls = cls.replace(me.trimRe, '');
                    idx = Ext.Array.indexOf(elClasses, cls);
                    if (idx != -1) {
                        elClasses.splice(idx, 1);
                    }
                }
            }
            el.set({ 'class': elClasses.join(' ') });
        }
    },

    destroy: function() {
        var me = this;
        
        //me.callParent();
        Ext.draw.engine.SVG.superclass.destroy.call(this);
        if (me.el) {
            me.el.remove();
        }
        /*
        this.un({
            scope: this,
            mousedown: this.onMouseDown,
            click: this.onClick,
            dblclick: this.onDblClick,
            contextmenu: this.onContextMenu
        });
        */
        delete me.el;
    }
});/**
 * @class Ext.draw.engine.VML
 * @extends Ext.draw.Surface
 * Provides specific methods to draw with VML.
 */

Ext.draw.engine.VML = Ext.extend(Ext.draw.Surface, {

    //requires: ['Ext.draw.Draw', 'Ext.draw.Color', 'Ext.draw.Sprite', 'Ext.draw.Matrix', 'Ext.core.Element'],

    engine: 'VML',

    map: {M: "m", L: "l", C: "c", Z: "x", m: "t", l: "r", c: "v", z: "x"},
    bitesRe: /([clmz]),?([^clmz]*)/gi,
    valRe: /-?[^,\s-]+/g,
    fillUrlRe: /^url\(\s*['"]?([^\)]+?)['"]?\s*\)$/i,
    pathlike: /^(path|rect)$/,
    NonVMLPathRe: /[ahqstv]/ig, // Non-VML Pathing ops
    partialPathRe: /[clmz]/g,
    fontFamilyRe: /^['"]+|['"]+$/g,
    baseVMLCls: Ext.baseCSSPrefix + 'vml-base',
    vmlGroupCls: Ext.baseCSSPrefix + 'vml-group',
    spriteCls: Ext.baseCSSPrefix + 'vml-sprite',
    measureSpanCls: Ext.baseCSSPrefix + 'vml-measure-span',
    zoom: 21600,
    coordsize: 1000,
    coordorigin: '0 0',

    // @private
    // Convert an SVG standard path into a VML path
    path2vml: function (path) {
        var me = this,
            nonVML =  me.NonVMLPathRe,
            map = me.map,
            val = me.valRe,
            zoom = me.zoom,
            bites = me.bitesRe,
            command = Ext.Function.bind(Ext.draw.Draw.pathToAbsolute, Ext.draw.Draw),
            res, pa, p, r, i, ii, j, jj;
        if (String(path).match(nonVML)) {
            command = Ext.Function.bind(Ext.draw.Draw.path2curve, Ext.draw.Draw);
        } else if (!String(path).match(me.partialPathRe)) {
            res = String(path).replace(bites, function (all, command, args) {
                var vals = [],
                    isMove = command.toLowerCase() == "m",
                    res = map[command];
                args.replace(val, function (value) {
                    if (isMove && vals[length] == 2) {
                        res += vals + map[command == "m" ? "l" : "L"];
                        vals = [];
                    }
                    vals.push(Math.round(value * zoom));
                });
                return res + vals;
            });
            return res;
        }
        pa = command(path);
        res = [];
        for (i = 0, ii = pa.length; i < ii; i++) {
            p = pa[i];
            r = pa[i][0].toLowerCase();
            if (r == "z") {
                r = "x";
            }
            for (j = 1, jj = p.length; j < jj; j++) {
                r += Math.round(p[j] * me.zoom) + (j != jj - 1 ? "," : "");
            }
            res.push(r);
        }
        return res.join(" ");
    },

    // @private - set of attributes which need to be translated from the sprite API to the native browser API
    translateAttrs: {
        radius: "r",
        radiusX: "rx",
        radiusY: "ry",
        lineWidth: "stroke-width",
        fillOpacity: "fill-opacity",
        strokeOpacity: "stroke-opacity",
        strokeLinejoin: "stroke-linejoin"
    },

    // @private - Minimun set of defaults for different types of sprites.
    minDefaults: {
        circle: {
            fill: "none",
            stroke: null,
            "stroke-width": null,
            opacity: null,
            "fill-opacity": null,
            "stroke-opacity": null
        },
        ellipse: {
            cx: 0,
            cy: 0,
            rx: 0,
            ry: 0,
            fill: "none",
            stroke: null,
            "stroke-width": null,
            opacity: null,
            "fill-opacity": null,
            "stroke-opacity": null
        },
        rect: {
            x: 0,
            y: 0,
            width: 0,
            height: 0,
            rx: 0,
            ry: 0,
            fill: "none",
            stroke: null,
            "stroke-width": null,
            opacity: null,
            "fill-opacity": null,
            "stroke-opacity": null
        },
        text: {
            x: 0,
            y: 0,
            "text-anchor": "start",
            font: '10px "Arial"',
            fill: "#000",
            stroke: null,
            "stroke-width": null,
            opacity: null,
            "fill-opacity": null,
            "stroke-opacity": null
        },
        path: {
            d: "M0,0",
            fill: "none",
            stroke: null,
            "stroke-width": null,
            opacity: null,
            "fill-opacity": null,
            "stroke-opacity": null
        },
        image: {
            x: 0,
            y: 0,
            width: 0,
            height: 0,
            preserveAspectRatio: "none",
            opacity: null
        }
    },

    // private
    onMouseEnter: function(e) {
        this.fireEvent("mouseenter", e);
    },

    // private
    onMouseLeave: function(e) {
        this.fireEvent("mouseleave", e);
    },

    // @private - Normalize a delegated single event from the main container to each sprite and sprite group
    processEvent: function(name, e) {
        var target = e.getTarget(),
            surface = this.surface,
            sprite;
        this.fireEvent(name, e);
        sprite = this.items.get(target.id);
        if (sprite) {
            sprite.fireEvent(name, sprite, e);
        }
    },

    // Create the VML element/elements and append them to the DOM
    createElement: function(sprite) {
        var me = this,
            attr = sprite.attr,
            type = sprite.type,
            zoom = me.zoom,
            vml = sprite.vml || (sprite.vml = {}),
            round = Math.round,
            el = me.createNode("shape"),
            skew = me.createNode("skew"),
            path,
            textPath;

        el.coordsize = zoom + ' ' + zoom;
        el.coordorigin = attr.coordorigin || "0 0";
        Ext.get(el).addCls(me.spriteCls);
        if (type == "text") {
            vml.path = path = me.createNode("path");
            path.textpathok = true;
            vml.textpath = textPath = me.createNode("textpath");
            textPath.on = true;
            el.appendChild(textPath);
            el.appendChild(path);
        }
        el.id = sprite.id;
        sprite.el = Ext.get(el);
        me.el.appendChild(el);
        skew.on = true;
        el.appendChild(skew);
        sprite.skew = skew;
        sprite.matrix = new Ext.draw.Matrix;
        sprite.bbox = {
            plain: null,
            transform: null
        };
        sprite.fireEvent("render", sprite);
        return sprite.el;
    },

    // @private - Get bounding box for the sprite.  The Sprite itself has the public method.
    getBBox: function (sprite, isWithoutTransform) {
        var realPath = this["getPath" + sprite.type](sprite);
        if (isWithoutTransform) {
            sprite.bbox.plain = sprite.bbox.plain || Ext.draw.Draw.pathDimensions(realPath);
            return sprite.bbox.plain;
        }
        sprite.bbox.transform = sprite.bbox.transform || Ext.draw.Draw.pathDimensions(Ext.draw.Draw.mapPath(realPath, sprite.matrix));
        return sprite.bbox.transform;
    },

    getBBoxText: function (sprite) {
        var vml = sprite.vml;
        return {
            x: vml.X + (vml.bbx || 0) - vml.W / 2,
            y: vml.Y - vml.H / 2,
            width: vml.W,
            height: vml.H
        };
    },

    applyAttrs: function (sprite) {
        var me = this,
            vml = sprite.vml,
            group = sprite.group,
            spriteAttr = sprite.attr,
            el = sprite.el,
            dom = el.dom,
            style, name, groups, i, ln, scrubbedAttrs, font, key;

        if (group) {
            groups = [].concat(group);
            ln = groups.length;
            for (i = 0; i < ln; i++) {
                group = groups[i];
                me.getGroup(group).add(sprite);
            }
            delete sprite.group;
        }
        scrubbedAttrs = me.scrubAttrs(sprite) || {};

        if (sprite.zIndexDirty) {
            me.setZIndex(sprite);
        }

        if (sprite.type == 'image') {
            dom.src = scrubbedAttrs.src;
        }

        // Apply minimum default attributes
        Ext.applyIf(scrubbedAttrs, me.minDefaults[sprite.type]);

        if (dom.href) {
            dom.href = scrubbedAttrs.href;
        }
        if (dom.title) {
            dom.title = scrubbedAttrs.title;
        }
        if (dom.target) {
            dom.target = scrubbedAttrs.target;
        }
        if (dom.cursor) {
            dom.cursor = scrubbedAttrs.cursor;
        }

        // Change visibility
        if (sprite.dirtyHidden) {
            (scrubbedAttrs.hidden) ? me.hidePrim(sprite) : me.showPrim(sprite);
            sprite.dirtyHidden = false;
        }

        // Update path
        if (sprite.dirtyPath) {
            if (sprite.type == "circle" || sprite.type == "ellipse") {
                var cx = scrubbedAttrs.x,
                    cy = scrubbedAttrs.y,
                    rx = scrubbedAttrs.rx || scrubbedAttrs.r || 0,
                    ry = scrubbedAttrs.ry || scrubbedAttrs.r || 0;
                dom.path = Ext.String.format("ar{0},{1},{2},{3},{4},{1},{4},{1}",
                            Math.round((cx - rx) * me.zoom),
                            Math.round((cy - ry) * me.zoom),
                            Math.round((cx + rx) * me.zoom),
                            Math.round((cy + ry) * me.zoom),
                            Math.round(cx * me.zoom));
                sprite.dirtyPath = false;
            } else if (sprite.type != "text") {
                sprite.attr.path = scrubbedAttrs.path = me.setPaths(sprite, scrubbedAttrs) || scrubbedAttrs.path;
                dom.path = me.path2vml(scrubbedAttrs.path);
                sprite.dirtyPath = false;
            }
        }

        // Apply clipping
        if ("clip-rect" in scrubbedAttrs) {
            me.setClip(sprite, scrubbedAttrs);
        }

        // Handle text (special handling required)
        if (sprite.type == "text") {
            me.setText(sprite, scrubbedAttrs);
        }

        // Handle fill and opacity
        if (scrubbedAttrs.opacity || scrubbedAttrs.fill) {
            me.setFill(sprite, scrubbedAttrs);
        }

        // Handle stroke (all fills require a stroke element)
        if (scrubbedAttrs.stroke || scrubbedAttrs.fill) {
            me.setStroke(sprite, scrubbedAttrs);
        }
        
        //set styles
        style = spriteAttr.style;
        if (style) {
            el.setStyle(style);
        }

        sprite.dirty = false;
    },

    setZIndex: function(sprite) {
        if (sprite.el) {
            if (sprite.attr.zIndex != undefined) {
                sprite.el.setStyle('zIndex', sprite.attr.zIndex);
            }
            sprite.zIndexDirty = false;
        }
    },

    // Normalize all virtualized types into paths.
    setPaths: function(sprite, params) {
        var spriteAttr = sprite.attr;
        // Clear bbox cache
        sprite.bbox.plain = null;
        sprite.bbox.transform = null;
        if (sprite.type == 'circle') {
            spriteAttr.rx = spriteAttr.ry = params.r;
            return Ext.draw.Draw.ellipsePath(sprite);
        }
        else if (sprite.type == 'ellipse') {
            spriteAttr.rx = params.rx;
            spriteAttr.ry = params.ry;
            return Ext.draw.Draw.ellipsePath(sprite);
        }
        else if (sprite.type == 'rect') {
            spriteAttr.rx = spriteAttr.ry = params.r;
            return Ext.draw.Draw.rectPath(sprite);
        }
        else if (sprite.type == 'path' && spriteAttr.path) {
            return Ext.draw.Draw.pathToAbsolute(spriteAttr.path);
        }
        else if (sprite.type == 'image') {
            return Ext.draw.Draw.rectPath(sprite);
        }
        return false;
    },

    setFill: function(sprite, params) {
        var me = this,
            el = sprite.el.dom,
            fillEl = el.fill,
            newfill = false,
            opacity, gradient, fillUrl, rotation;

        if (!fillEl) {
            // NOT an expando (but it sure looks like one)...
            fillEl = el.fill = me.createNode("fill");
            newfill = true;
        }
        if (Ext.isArray(params.fill)) {
            params.fill = params.fill[0];
        }
        if (params.fill == "none") {
            fillEl.on = false;
        }
        else {
            if (typeof params.opacity == "number") {
                fillEl.opacity = params.opacity;
            }
            if (typeof params["fill-opacity"] == "number") {
                fillEl.opacity = params["fill-opacity"];
            }
            fillEl.on = true;
            if (typeof params.fill == "string") {
                fillUrl = params.fill.match(me.fillUrlRe);
                if (fillUrl) {
                    fillUrl = fillUrl[1];
                    // If the URL matches one of the registered gradients, render that gradient
                    if (fillUrl.charAt(0) == "#") {
                        gradient = me.gradientsColl.getByKey(fillUrl.substring(1));
                    }
                    if (gradient) {
                        // VML angle is offset and inverted from standard, and must be adjusted to match rotation transform
                        rotation = params.rotation;
                        fillEl.angle = -(gradient.angle + 270 + (rotation ? rotation.degrees : 0)) % 360;
                        fillEl.type = "gradient";
                        fillEl.method = "sigma";
                        fillEl.colors.value = gradient.colors;
                    }
                    // Otherwise treat it as an image
                    else {
                        fillEl.src = fillUrl;
                        fillEl.type = "tile";
                    }
                }
                else {
                    fillEl.color = Ext.draw.Color.toHex(params.fill);
                    fillEl.src = "";
                    fillEl.type = "solid";
                }
            }
        }
        if (newfill) {
            el.appendChild(fillEl);
        }
    },

    setStroke: function(sprite, params) {
        var me = this,
            el = sprite.el.dom,
            strokeEl = sprite.strokeEl,
            newStroke = false,
            width, opacity;

        if (!strokeEl) {
            strokeEl = sprite.strokeEl = me.createNode("stroke");
            newStroke = true;
        }
        if (Ext.isArray(params.stroke)) {
            params.stroke = params.stroke[0];
        }
        if (!params.stroke || params.stroke == "none" || params.stroke == 0 || params["stroke-width"] == 0) {
            strokeEl.on = false;
        }
        else {
            strokeEl.on = true;
            if (params.stroke && !params.stroke.match(me.fillUrlRe)) {
                // VML does NOT support a gradient stroke :(
                strokeEl.color = Ext.draw.Color.toHex(params.stroke);
            }
            strokeEl.joinstyle = params["stroke-linejoin"];
            strokeEl.endcap = params["stroke-linecap"] || "round";
            strokeEl.miterlimit = params["stroke-miterlimit"] || 8;
            width = parseFloat(params["stroke-width"] || 1) * 0.75;
            opacity = params["stroke-opacity"] || 1;
            // VML Does not support stroke widths under 1, so we're going to fiddle with stroke-opacity instead.
            if (Ext.isNumber(width) && width < 1) {
                strokeEl.weight = 1;
                strokeEl.opacity = opacity * width;
            }
            else {
                strokeEl.weight = width;
                strokeEl.opacity = opacity;
            }
        }
        if (newStroke) {
            el.appendChild(strokeEl);
        }
    },

    setClip: function(sprite, params) {
        var me = this,
            el = sprite.el,
            clipEl = sprite.clipEl,
            rect = String(params["clip-rect"]).split(me.separatorRe);
        if (!clipEl) {
            clipEl = sprite.clipEl = me.el.insertFirst(Ext.getDoc().dom.createElement("div"));
            clipEl.addCls(Ext.baseCSSPrefix + 'vml-sprite');
        }
        if (rect.length == 4) {
            rect[2] = +rect[2] + (+rect[0]);
            rect[3] = +rect[3] + (+rect[1]);
            clipEl.setStyle("clip", Ext.String.format("rect({1}px {2}px {3}px {0}px)", rect[0], rect[1], rect[2], rect[3]));
            clipEl.setSize(me.el.width, me.el.height);
        }
        else {
            clipEl.setStyle("clip", "");
        }
    },

    setText: function(sprite, params) {
        var me = this,
            vml = sprite.vml,
            textStyle = vml.textpath.style,
            spanCacheStyle = me.span.style,
            zoom = me.zoom,
            round = Math.round,
            fontObj = {
                fontSize: "font-size",
                fontWeight: "font-weight",
                fontStyle: "font-style"
            },
            fontProp,
            paramProp;
        if (sprite.dirtyFont) {
            if (params.font) {
                textStyle.font = spanCacheStyle.font = params.font;
            }
            if (params["font-family"]) {
                textStyle.fontFamily = '"' + params["font-family"].split(",")[0].replace(me.fontFamilyRe, "") + '"';
                spanCacheStyle.fontFamily = params["font-family"];
            }

            for (fontProp in fontObj) {
                paramProp = params[fontObj[fontProp]];
                if (paramProp) {
                    textStyle[fontProp] = spanCacheStyle[fontProp] = paramProp;
                }
            }

            vml.textpath.string = params.text;
            if (vml.textpath.string) {
                me.span.innerHTML = String(vml.textpath.string).replace(/</g, "&#60;").replace(/&/g, "&#38;").replace(/\n/g, "<br>");
            }
            vml.W = me.span.offsetWidth;
            vml.H = me.span.offsetHeight + 2; // TODO handle baseline differences and offset in VML Textpath

            // text-anchor emulation
            if (params["text-anchor"] == "middle") {
                textStyle["v-text-align"] = "center";
            }
            else if (params["text-anchor"] == "end") {
                textStyle["v-text-align"] = "right";
                vml.bbx = -Math.round(vml.W / 2);
            }
            else {
                textStyle["v-text-align"] = "left";
                vml.bbx = Math.round(vml.W / 2);
            }
        }
        vml.X = params.x;
        vml.Y = params.y;
        vml.path.v = Ext.String.format("m{0},{1}l{2},{1}", Math.round(vml.X * zoom), Math.round(vml.Y * zoom), Math.round(vml.X * zoom) + 1);
        // Clear bbox cache
        sprite.bbox.plain = null;
        sprite.bbox.transform = null;
        sprite.dirtyFont = false;
    },

    hide: function() {
        this.el.hide();
    },

    show: function() {
        this.el.show();
    },

    hidePrim: function(sprite) {
        sprite.el.addCls(Ext.baseCSSPrefix + 'hide-visibility');
    },

    showPrim: function(sprite) {
        sprite.el.removeCls(Ext.baseCSSPrefix + 'hide-visibility');
    },

    setSize: function(width, height) {
        var me = this,
            viewBox = me.viewBox,
            scaleX, scaleY, items, i, len;
        width = width || me.width;
        height = height || me.height;
        me.width = width;
        me.height = height;

        if (!me.el) {
            return;
        }

        // Size outer div
        if (width != undefined) {
            me.el.setWidth(width);
        }
        if (height != undefined) {
            me.el.setHeight(height);
        }

        // Handle viewBox sizing
        if (viewBox && (width || height)) {
            var viewBoxX = viewBox.x,
                viewBoxY = viewBox.y,
                viewBoxWidth = viewBox.width,
                viewBoxHeight = viewBox.height,
                relativeHeight = height / viewBoxHeight,
                relativeWidth = width / viewBoxWidth,
                size;
            if (viewBoxWidth * relativeHeight < width) {
                viewBoxX -= (width - viewBoxWidth * relativeHeight) / 2 / relativeHeight;
            }
            if (viewBoxHeight * relativeWidth < height) {
                viewBoxY -= (height - viewBoxHeight * relativeWidth) / 2 / relativeWidth;
            }
            size = 1 / Math.max(viewBoxWidth / width, viewBoxHeight / height);
            // Scale and translate group
            me.viewBoxShift = {
                dx: -viewBoxX,
                dy: -viewBoxY,
                scale: size
            };
            items = me.items.items;
            for (i = 0, len = items.length; i < len; i++) {
                me.transform(items[i]);
            }
        }
        //this.callParent(arguments);
        Ext.draw.engine.VML.superclass.setSize.apply(this, arguments);
    },

    setViewBox: function(x, y, width, height) {
        //this.callParent(arguments);
        Ext.draw.engine.VML.superclass.setViewBox.apply(this, arguments);
        this.viewBox = {
            x: x,
            y: y,
            width: width,
            height: height
        };
    },

    onAdd: function(item) {
        //this.callParent(arguments);
        Ext.draw.engine.VML.superclass.onAdd.apply(this, arguments);
        if (this.el) {
            this.renderItem(item);
        }
    },

    onRemove: function(item) {
        if (item.el) {
            item.el.remove();
            delete item.el;
        }
        //this.callParent(arguments);
        Ext.draw.engine.VML.superclass.onRemove.apply(this, arguments);
    },

    render: function (container) {
        var me = this,
            doc = Ext.getDoc().dom;
        // VML Node factory method (createNode)
        if (!me.createNode) {
            try {
                if (!doc.namespaces.rvml) {
                    doc.namespaces.add("rvml", "urn:schemas-microsoft-com:vml");
                }
                me.createNode = function (tagName) {
                    return doc.createElement("<rvml:" + tagName + ' class="rvml">');
                };
            } catch (e) {
                me.createNode = function (tagName) {
                    return doc.createElement("<" + tagName + ' xmlns="urn:schemas-microsoft.com:vml" class="rvml">');
                };
            }
        }

        if (!me.el) {
            var el = doc.createElement("div");
            me.el = Ext.get(el);
            me.el.addCls(me.baseVMLCls);

            // Measuring span (offscrren)
            me.span = doc.createElement("span");
            Ext.get(me.span).addCls(me.measureSpanCls);
            el.appendChild(me.span);
            me.el.setSize(me.width || 10, me.height || 10);
            container.appendChild(el);
            me.el.on({
                scope: me,
                mouseup: me.onMouseUp,
                mousedown: me.onMouseDown,
                mouseover: me.onMouseOver,
                mouseout: me.onMouseOut,
                mousemove: me.onMouseMove,
                mouseenter: me.onMouseEnter,
                mouseleave: me.onMouseLeave,
                click: me.onClick
            });
        }
        me.renderAll();
    },

    renderAll: function() {
        this.items.each(this.renderItem, this);
    },

    redraw: function(sprite) {
        sprite.dirty = true;
        this.renderItem(sprite);
    },

    renderItem: function (sprite) {
        // Does the surface element exist?
        if (!this.el) {
            return;
        }

        // Create sprite element if necessary
        if (!sprite.el) {
            this.createElement(sprite);
        }

        if (sprite.dirty) {
            this.applyAttrs(sprite);
            if (sprite.dirtyTransform) {
                this.applyTransformations(sprite);
            }
        }
    },

    rotationCompensation: function (deg, dx, dy) {
        var matrix = new Ext.draw.Matrix;
        matrix.rotate(-deg, 0.5, 0.5);
        return {
            x: matrix.x(dx, dy),
            y: matrix.y(dx, dy)
        };
    },

    transform: function(sprite) {
        var me = this,
            matrix = new Ext.draw.Matrix,
            transforms = sprite.transformations,
            transformsLength = transforms.length,
            i = 0,
            deltaDegrees = 0,
            deltaScaleX = 1,
            deltaScaleY = 1,
            flip = "",
            el = sprite.el,
            dom = el.dom,
            domStyle = dom.style,
            zoom = me.zoom,
            skew = sprite.skew,
            deltaX, deltaY, transform, type, compensate, y, fill, newAngle,zoomScaleX, zoomScaleY, newOrigin;

        for (; i < transformsLength; i++) {
            transform = transforms[i];
            type = transform.type;
            if (type == "translate") {
                matrix.translate(transform.x, transform.y);
            }
            else if (type == "rotate") {
                matrix.rotate(transform.degrees, transform.x, transform.y);
                deltaDegrees += transform.degrees;
            }
            else if (type == "scale") {
                matrix.scale(transform.x, transform.y, transform.centerX, transform.centerY);
                deltaScaleX *= transform.x;
                deltaScaleY *= transform.y;
            }
        }

        if (me.viewBoxShift) {
            matrix.scale(me.viewBoxShift.scale, me.viewBoxShift.scale, 0, 0);
            matrix.add(1, 0, 0, 1, me.viewBoxShift.dx, me.viewBoxShift.dy);
        }

        sprite.matrix = matrix;


        // Hide element while we transform

        if (me.type != "image" && skew) {
            // matrix transform via VML skew
            skew.matrix = matrix.toString();
            skew.offset = matrix.offset();
        } else {
            deltaX = matrix.m[0][2];
            deltaY = matrix.m[1][2];
            // Scale via coordsize property
            zoomScaleX = zoom / deltaScaleX;
            zoomScaleY = zoom / deltaScaleY;

            dom.coordsize = Math.abs(zoomScaleX) + " " + Math.abs(zoomScaleY);

            // Rotate via rotation property
            newAngle = deltaDegrees * (deltaScaleX * ((deltaScaleY < 0) ? -1 : 1));
            if (newAngle != domStyle.rotation && !(newAngle === 0 && !domStyle.rotation)) {
                domStyle.rotation = newAngle;
            }
            if (deltaDegrees) {
                // Compensate x/y position due to rotation
                compensate = me.rotationCompensation(deltaDegrees, deltaX, deltaY);
                deltaX = compensate.x;
                deltaY = compensate.y;
            }

            // Handle negative scaling via flipping
            if (deltaScaleX < 0) {
                flip += "x";
            }
            if (deltaScaleY < 0) {
                flip += " y";
                y = -1;
            }
            if (flip != "" && !dom.style.flip) {
                domStyle.flip = flip;
            }

            // Translate via coordorigin property
            newOrigin = (deltaX * -zoomScaleX) + " " + (deltaY * -zoomScaleY);
            if (newOrigin != dom.coordorigin) {
                dom.coordorigin = (deltaX * -zoomScaleX) + " " + (deltaY * -zoomScaleY);
            }
        }
    },

    createItem: function (config) {
        return new Ext.draw.Sprite(config);
    },

    getRegion: function() {
        return this.el.getRegion();
    },

    addCls: function(sprite, className) {
        if (sprite && sprite.el) {
            sprite.el.addCls(className);
        }
    },

    removeCls: function(sprite, className) {
        if (sprite && sprite.el) {
            sprite.el.removeCls(className);
        }
    },

    /**
     * Adds a definition to this Surface for a linear gradient. We convert the gradient definition
     * to its corresponding VML attributes and store it for later use by individual sprites.
     * @param {Object} gradient
     */
    addGradient: function(gradient) {
        var gradients = this.gradientsColl || (this.gradientsColl = new Ext.util.MixedCollection()),
            colors = [],
            stops = new Ext.util.MixedCollection();

        // Build colors string
        stops.addAll(gradient.stops);
        stops.sortByKey("ASC", function(a, b) {
            a = parseInt(a, 10);
            b = parseInt(b, 10);
            return a > b ? 1 : (a < b ? -1 : 0);
        });
        stops.eachKey(function(k, v) {
            colors.push(k + "% " + v.color);
        });

        gradients.add(gradient.id, {
            colors: colors.join(","),
            angle: gradient.angle
        });
    },

    destroy: function() {
        var me = this;
        
        //me.callParent(arguments);
        Ext.draw.engine.VML.superclass.destroy.call(this);
        if (me.el) {
            me.el.remove();
        }
        delete me.el;
    }
});
/**
 * @class Ext.chart.Highlights
 * @ignore
 */
Ext.chart.Highlights = Ext.extend(Object, {

    //requires: ['Ext.fx.Anim'],

    /**
     * Highlight the given series item.
     * @param {Boolean|Object} Default's false. Can also be an object width style properties (i.e fill, stroke, radius) 
     * or just use default styles per series by setting highlight = true.
     */
    highlight: false,

    highlightCfg : null,

    constructor: function(config) {
        if (config.highlight) {
            if (config.highlight !== true) { //is an object
                this.highlightCfg = Ext.apply({}, config.highlight);
            }
            else {
                this.highlightCfg = {
                    fill: '#fdd',
                    radius: 20,
                    lineWidth: 5,
                    stroke: '#f55'
                };
            }
        }
    },

    /**
     * Highlight the given series item.
     * @param {Object} item Info about the item; same format as returned by #getItemForPoint.
     */
    highlightItem: function(item) {
        if (!item) {
            return;
        }
        
        var me = this,
            sprite = item.sprite,
            opts = me.highlightCfg,
            surface = me.chart.surface,
            animate = me.chart.animate,
            p,
            from,
            to,
            pi;

        if (!me.highlight || !sprite || sprite._highlighted) {
            return;
        }
        if (sprite._anim) {
            sprite._anim.paused = true;
        }
        sprite._highlighted = true;
        if (!sprite._defaults) {
            sprite._defaults = Ext.apply(sprite._defaults || {},
            sprite.attr);
            from = {};
            to = {};
            for (p in opts) {
                if (! (p in sprite._defaults)) {
                    sprite._defaults[p] = surface.availableAttrs[p];
                }
                from[p] = sprite._defaults[p];
                to[p] = opts[p];
                if (Ext.isObject(opts[p])) {
                    from[p] = {};
                    to[p] = {};
                    Ext.apply(sprite._defaults[p], sprite.attr[p]);
                    Ext.apply(from[p], sprite._defaults[p]);
                    for (pi in sprite._defaults[p]) {
                        if (! (pi in opts[p])) {
                            to[p][pi] = from[p][pi];
                        } else {
                            to[p][pi] = opts[p][pi];
                        }
                    }
                    for (pi in opts[p]) {
                        if (! (pi in to[p])) {
                            to[p][pi] = opts[p][pi];
                        }
                    }
                }
            }
            sprite._from = from;
            sprite._to = to;
        }
        if (animate) {
            sprite._anim = new Ext.fx.Anim({
                target: sprite,
                from: sprite._from,
                to: sprite._to,
                duration: 150
            });
        } else {
            sprite.setAttributes(sprite._to, true);
        }
    },

    /**
     * Un-highlight any existing highlights
     */
    unHighlightItem: function() {
        if (!this.highlight || !this.items) {
            return;
        }

        var me = this,
            items = me.items,
            len = items.length,
            opts = me.highlightCfg,
            animate = me.chart.animate,
            i = 0,
            obj,
            p,
            sprite;

        for (; i < len; i++) {
            if (!items[i]) {
                continue;
            }
            sprite = items[i].sprite;
            if (sprite && sprite._highlighted) {
                if (sprite._anim) {
                    sprite._anim.paused = true;
                }
                obj = {};
                for (p in opts) {
                    if (Ext.isObject(sprite._defaults[p])) {
                        obj[p] = {};
                        Ext.apply(obj[p], sprite._defaults[p]);
                    }
                    else {
                        obj[p] = sprite._defaults[p];
                    }
                }
                if (animate) {
                    sprite._anim = new Ext.fx.Anim({
                        target: sprite,
                        to: obj,
                        duration: 150
                    });
                }
                else {
                    sprite.setAttributes(obj, true);
                }
                delete sprite._highlighted;
                //delete sprite._defaults;
            }
        }
    },

    cleanHighlights: function() {
        if (!this.highlight) {
            return;
        }

        var group = this.group,
            markerGroup = this.markerGroup,
            i = 0,
            l;
        for (l = group.getCount(); i < l; i++) {
            delete group.getAt(i)._defaults;
        }
        if (markerGroup) {
            for (l = markerGroup.getCount(); i < l; i++) {
                delete markerGroup.getAt(i)._defaults;
            }
        }
    }
});Ext.chart.MaskLayer = Ext.extend(Ext.Component, {
    
    constructor: function(config) {
        config = Ext.apply(config || {}, {
            style: 'position:absolute;background-color:#888;cursor:move;opacity:0.6;border:1px solid #222;'
        });
        // this.callParent([config]);
        Ext.chart.MaskLayer.superclass.constructor.apply(this, [config]);
    },
    
    initComponent: function() {
        var me = this;
        // me.callParent(arguments);
        Ext.chart.MaskLayer.superclass.initComponent.call(this);
        me.addEvents(
            'mousedown',
            'mouseup',
            'mousemove',
            'mouseenter',
            'mouseleave'
        );
    },

    initDraggable: function() {
        // this.callParent(arguments);
        Ext.chart.MaskLayer.superclass.initDraggable.apply(this, arguments);
        this.dd.onStart = function (e) {
            var me = this,
                comp = me.comp;
    
            // Cache the start [X, Y] array
            this.startPosition = comp.getPosition(true);
    
            // If client Component has a ghost method to show a lightweight version of itself
            // then use that as a drag proxy unless configured to liveDrag.
            if (comp.ghost && !comp.liveDrag) {
                 me.proxy = comp.ghost();
                 me.dragTarget = me.proxy.header.el;
            }
    
            // Set the constrainTo Region before we start dragging.
            if (me.constrain || me.constrainDelegate) {
                me.constrainTo = me.calculateConstrainRegion();
            }
        };
    }
});/**
 * @class Ext.draw.Component
 * @extends Ext.Component
 */

Ext.draw.Component = Ext.extend(Ext.Component, {
    
    //requires: ['Ext.draw.Surface', 'Ext.layout.component.Draw' ],
    
    /**
     * @cfg {Array} implOrder
     * Defines the priority order for which Surface implementation to use. The first
     * one supported by the current environment will be used.
     */
    implOrder: ['SVG', 'Canvas', 'VML'],

    baseCls:  'x-surface',

    componentLayout: 'draw',

    /**
     * @cfg {Boolean} viewBox
     * Turn on view box support which will scale and position items in the draw component to fit to the component while
     * maintaining aspect ratio. Defaults to true.
     */
    viewBox: true,

    /**
     * @cfg {Boolean} autoSize
     * Turn on autoSize support which will set the bounding div's size to the natural size of the contents. Defaults to false.
     */
    autoSize: false,

    initComponent: function() {
        //this.callParent(arguments);
        Ext.draw.Component.superclass.initComponent.call(this);
        this.addEvents(
            'mousedown',
            'mouseup',
            'mousemove',
            'mouseenter',
            'mouseleave',
            'click'
        );
    },

    /**
     * Create the Surface on initial render
     */
    //onRender: function() { // old API of EXT JS4
    // With Touch API
    onRender: function(container, position) {
        var me = this,
            viewBox = me.viewBox,
            autoSize = me.autoSize,
            bbox, items, width, height, x, y;
        //me.callParent(arguments);
        Ext.draw.Component.superclass.onRender.apply(this, arguments);
        me.createSurface();

        items = me.surface.items;

        if (viewBox || autoSize) {
            bbox = items.getBBox();
            width = bbox.width;
            height = bbox.height;
            x = bbox.x;
            y = bbox.y;
            if (me.viewBox) {
                me.surface.setViewBox(x, y, width, height);
            }
            else {
                // AutoSized
                me.autoSizeSurface();
            }
        }
    },

    autoSizeSurface: function() {
        var me = this,
            items = me.surface.items,
            bbox = items.getBBox(),
            width = bbox.width,
            height = bbox.height;
        items.setAttributes({
            translate: {
                x: -bbox.x,
                y: -bbox.y
            }
        }, true);
        if (me.rendered) {
            me.setSize(width, height);
        }
        else {
            me.surface.setSize(width, height);
        }
        me.el.setSize(width, height);
    },

    /**
     * Create the Surface instance. Resolves the correct Surface implementation to
     * instantiate based on the 'implOrder' config.
     */
    createSurface: function() {
        var surface = Ext.draw.Surface.newInstance(Ext.apply({}, {
                width: this.width,
                height: this.height,
                renderTo: this.el
            }, this.initialConfig));
        this.surface = surface;

        function refire(eventName) {
            return function(e) {
                this.fireEvent(eventName, e);
            };
        }

        surface.on({
            scope: this,
            mouseup: refire('mouseup'),
            mousedown: refire('mousedown'),
            mousemove: refire('mousemove'),
            mouseenter: refire('mouseenter'),
            mouseleave: refire('mouseleave'),
            click: refire('click')
        });
    },


    /**
     * Clean up the Surface instance on component destruction
     */
    onDestroy: function() {
        var surface = this.surface;
        if (surface) {
            surface.destroy();
        }
        // this.callParent(arguments);
        Ext.draw.Component.superclass.onDestroy.call(this);
    }

});
/**
 * @class Ext.chart.Chart
 * @extends Ext.draw.Component
 * 
 * The Ext.chart package provides the capability to visualize data.
 * Each chart binds directly to an Ext.data.Store enabling automatic updates of the chart.
 * A chart configuration object has some overall styling options as well as an array of axes 
 * and series. A chart instance example could look like:
 * 
  <pre><code>
    var chart = new Ext.chart.Chart({
        renderTo: Ext.getBody(),
        width: 800,
        height: 600,
        animate: true,
        store: store1,
        shadow: true,
        theme: 'Category1',
        legend: {
            position: 'right'
        },
        axes: [ ...some axes options... ],
        series: [ ...some series options... ]
    });
  </code></pre>
 * 
 * In this example we set the `width` and `height` of the chart, we decide whether our series are 
 * animated or not and we select a store to be bound to the chart. We also turn on shadows for all series, 
 * select a color theme `Category1` for coloring the series, set the legend to the right part of the chart and 
 * then tell the chart to render itself in the body element of the document. For more information about the axes and 
 * series configurations please check the documentation of each series (Line, Bar, Pie, etc).
 * 
 * @xtype chart
 */

Ext.chart.Chart = Ext.extend(Ext.draw.Component, {
    
    // @private
    viewBox: false,

    /**
     * @cfg {Boolean/Object} animate (optional) true for the default animation (easing: 'ease' and duration: 500)
     * or a standard animation config object to be used for default chart animations. Defaults to false.
     */
    animate: false,

    /**
     * @cfg {Boolean/Object} legend (optional) true for the default legend display or a legend config object. Defaults to false.
     */
    legend: false,

    /**
     * @cfg {integer} insetPadding (optional) Set the amount of inset padding in pixels for the chart. Defaults to 10.
     */
    insetPadding: 10,

    /**
     * @cfg {Array} implOrder
     * Defines the priority order for which Surface implementation to use. The first
     * one supported by the current environment will be used.
     */
    implOrder: ['SVG', 'VML', 'Canvas'],

    /**
     * @cfg {string} background (optional) Set the chart background. This can be a gradient name, image, or color.
     * Defaults to false for no background.
     */
    background: false,

    constructor: function(config) {
        var me = this,
            defaultAnim;
        me.initTheme(config.theme || me.theme);
        if (me.gradients) {
            Ext.apply(config, { gradients: me.gradients });
        }
        if (me.background) {
            Ext.apply(config, { background: me.background });
        }
        if (config.animate) {
            defaultAnim = {                
                easing: 'ease',
                duration: 500
            };
            if (Ext.isObject(config.animate)) {
                config.animate = Ext.applyIf(config.animate, defaultAnim);
            }
            else {
                config.animate = defaultAnim;
            }
        }
        //me.mixins.mask.constructor.call(me, config);
        //me.callParent([config]);
        Ext.chart.Chart.superclass.constructor.apply(this, arguments);
    },
    
    initComponent: function() {
        var me = this,
            axes,
            series;
        //me.callParent();
        Ext.chart.Chart.superclass.initComponent.call(this);
        me.addEvents(
            'itemmousedown',
            'itemmouseup',
            'itemmouseover',
            'itemmouseout',
            'itemclick',
            'itemdoubleclick',
            'itemdragstart',
            'itemdrag',
            'itemdragend',
            /**
                 * @event beforerefresh
                 * Fires before a refresh to the chart data is called.  If the beforerefresh handler returns
                 * <tt>false</tt> the {@link #refresh} action will be cancelled.
                 * @param {Chart} this
                 */
            'beforerefresh',
            /**
                 * @event refresh
                 * Fires after the chart data has been refreshed.
                 * @param {Chart} this
                 */
            'refresh'
        );
        Ext.applyIf(me, {
            zoom: {
                width: 1,
                height: 1,
                x: 0,
                y: 0
            }
        });
        me.maxGutter = [0, 0];
        me.store = Ext.StoreMgr.lookup(me.store);
        axes = me.axes;
        me.axes = new Ext.util.MixedCollection(false, function(a) { return a.position; });
        if (axes) {
            me.axes.addAll(axes);
        }
        series = me.series;
        me.series = new Ext.util.MixedCollection(false, function(a) { return a.seriesId || (a.seriesId = Ext.id(null, 'ext-chart-series-')); });
        if (series) {
            me.series.addAll(series);
        }
        if (me.legend !== false) {
            me.legend = new Ext.chart.Legend(Ext.applyIf({chart:me}, me.legend));
        }

        me.on({
            mousemove: me.onMouseMove,
            mouseleave: me.onMouseLeave,
            mousedown: me.onMouseDown,
            mouseup: me.onMouseUp,
            scope: me
        });
    },

    // @private overrides the component method to set the correct dimensions to the chart.
    doComponentLayout: function(width, height) {
        var me = this;
        if (Ext.isNumber(width) && Ext.isNumber(height)) {
            me.curWidth = width;
            me.curHeight = height;
            me.redraw(true);
        }
        Ext.chart.Chart.superclass.doComponentLayout.apply(me, arguments);
    },
    
    /**
     * Redraw the chart. If animations are set this will animate the chart too.
     * @cfg {boolean} resize Optional flag which changes the default origin points of the chart for animations.
     */
    redraw: function(resize) {
        var me = this,
            chartBBox = me.chartBBox = {
                x: 0,
                y: 0,
                height: me.curHeight,
                width: me.curWidth
            },
            legend = me.legend;
        me.surface.setSize(chartBBox.width, chartBBox.height);
        // Instantiate Series and Axes
        me.series.each(me.initializeSeries, me);
        me.axes.each(me.initializeAxis, me);

        // Create legend if not already created
        if (legend !== false) {
            legend.create();
        }

        // Place axes properly, including influence from each other
        me.alignAxes();

        // Reposition legend based on new axis alignment
        if (me.legend !== false) {
            legend.updatePosition();
        }

        // Find the max gutter
        me.getMaxGutter();

        // Draw axes and series
        me.resizing = !!resize;
        me.axes.each(me.drawAxis, me);
        me.series.each(me.drawCharts, me);
        me.resizing = false;
    },

    // @private set the store after rendering the chart.
    afterRender: function() {
        var ref,
            me = this;
        Ext.chart.Chart.superclass.afterRender.call(me);

        if (me.categoryNames) {
            me.setCategoryNames(me.categoryNames);
        }

        if (me.tipRenderer) {
            ref = me.getFunctionRef(me.tipRenderer);
            me.setTipRenderer(ref.fn, ref.scope);
        }
        me.bindStore(me.store, true);
        me.refresh();
    },

    // @private get x and y position of the mouse cursor.
    getEventXY: function(e) {
        var me = this,
            box = this.surface.getRegion(),
            pageXY = e.getXY(),
            x = pageXY[0] - box.left,
            y = pageXY[1] - box.top;
        return [x, y];
    },

    // @private wrap the mouse down position to delegate the event to the series.
    onClick: function(e) {
        var me = this,
            position = me.getEventXY(e),
            item;

        // Ask each series if it has an item corresponding to (not necessarily exactly
        // on top of) the current mouse coords. Fire itemclick event.
        me.series.each(function(series) {
            if (Ext.draw.Draw.withinBox(position[0], position[1], series.bbox)) {
                if (series.getItemForPoint) {
                    item = series.getItemForPoint(position[0], position[1]);
                    if (item) {
                        me.fireEvent('itemclick', item);
                    }
                }
            }
        }, me);
    },

    // @private wrap the mouse down position to delegate the event to the series.
    onMouseDown: function(e) {
        var me = this,
            position = me.getEventXY(e),
            item;

        if (me.mask) {
            me.mixins.mask.onMouseDown.call(me, e);
        }
        // Ask each series if it has an item corresponding to (not necessarily exactly
        // on top of) the current mouse coords. Fire mousedown event.
        me.series.each(function(series) {
            if (Ext.draw.Draw.withinBox(position[0], position[1], series.bbox)) {
                if (series.getItemForPoint) {
                    item = series.getItemForPoint(position[0], position[1]);
                    if (item) {
                        me.fireEvent('itemmousedown', item);
                    }
                }
            }
        }, me);
    },

    // @private wrap the mouse up event to delegate it to the series.
    onMouseUp: function(e) {
        var me = this,
            position = me.getEventXY(e),
            item;

        if (me.mask) {
            me.mixins.mask.onMouseUp.call(me, e);
        }
        // Ask each series if it has an item corresponding to (not necessarily exactly
        // on top of) the current mouse coords. Fire mousedown event.
        me.series.each(function(series) {
            if (Ext.draw.Draw.withinBox(position[0], position[1], series.bbox)) {
                if (series.getItemForPoint) {
                    item = series.getItemForPoint(position[0], position[1]);
                    if (item) {
                        me.fireEvent('itemmouseup', item);
                    }
                }
            }
        }, me);
    },

    // @private wrap the mouse move event so it can be delegated to the series.
    onMouseMove: function(e) {
        var me = this,
            position = me.getEventXY(e),
            item, last, storeItem, storeField;

        if (me.mask) {
            me.mixins.mask.onMouseMove.call(me, e);
        }
        // Ask each series if it has an item corresponding to (not necessarily exactly
        // on top of) the current mouse coords. Fire itemmouseover/out events.
        me.series.each(function(series) {
            if (Ext.draw.Draw.withinBox(position[0], position[1], series.bbox)) {
                if (series.getItemForPoint) {
                    item = series.getItemForPoint(position[0], position[1]);
                    last = series._lastItemForPoint;
                    storeItem = series._lastStoreItem;
                    storeField = series._lastStoreField;


                    if (item !== last || item && (item.storeItem != storeItem || item.storeField != storeField)) {
                        if (last) {
                            me.fireEvent('itemmouseout', last);
                            delete series._lastItemForPoint;
                            delete series._lastStoreField;
                            delete series._lastStoreItem;
                        }
                        if (item) {
                            me.fireEvent('itemmouseover', item);
                            series._lastItemForPoint = item;
                            series._lastStoreItem = item.storeItem;
                            series._lastStoreField = item.storeField;
                        }
                    }
                }
            }
        }, me);
    },

    // @private handle mouse leave event.
    onMouseLeave: function(e) {
        var me = this;
        if (me.mask) {
            me.mixins.mask.onMouseLeave.call(me, e);
        }
        me.series.each(function(series) {
            delete series._lastItemForPoint;
        });
    },

    // @private buffered refresh for when we update the store 
    delayRefresh: function() {
        var me = this;
        if (!me.refreshTask) {
            me.refreshTask = new Ext.util.DelayedTask(me.refresh, me);
        }
        me.refreshTask.delay(me.refreshBuffer);
    },

    // @private
    refresh: function() {
        var me = this;
        if (me.rendered && me.curWidth != undefined && me.curHeight != undefined) {
            if (me.fireEvent('beforerefresh', me) !== false) {
                me.redraw();
                me.fireEvent('refresh', me);
            }
        }
    },

    /**
     * Changes the data store bound to this chart and refreshes it.
     * @param {Store} store The store to bind to this chart
     */
    bindStore: function(store, initial) {
        var me = this;
        if (!initial && me.store) {
            if (store !== me.store && me.store.autoDestroy) {
                me.store.destroy();
            }
            else {
                me.store.un('datachanged', me.refresh, me);
                me.store.un('add', me.delayRefresh, me);
                me.store.un('remove', me.delayRefresh, me);
                me.store.un('update', me.delayRefresh, me);
                me.store.un('clear', me.refresh, me);
            }
        }
        if (store) {
            store = Ext.StoreMgr.lookup(store);
            store.on({
                scope: me,
                datachanged: me.refresh,
                add: me.delayRefresh,
                remove: me.delayRefresh,
                update: me.delayRefresh,
                clear: me.refresh
            });
        }
        me.store = store;
        if (store && !initial) {
            me.refresh();
        }
    },

    // @private Create Axis
    initializeAxis: function(axis) {
        var me = this,
            chartBBox = me.chartBBox,
            w = chartBBox.width,
            h = chartBBox.height,
            x = chartBBox.x,
            y = chartBBox.y,
            themeAttrs = me.themeAttrs,
            config = {
                chart: me
            };
        if (themeAttrs) {
            config.axisStyle = Ext.apply({}, themeAttrs.axis);
            config.axisLabelLeftStyle = Ext.apply({}, themeAttrs.axisLabelLeft);
            config.axisLabelRightStyle = Ext.apply({}, themeAttrs.axisLabelRight);
            config.axisLabelTopStyle = Ext.apply({}, themeAttrs.axisLabelTop);
            config.axisLabelBottomStyle = Ext.apply({}, themeAttrs.axisLabelBottom);
            config.axisTitleLeftStyle = Ext.apply({}, themeAttrs.axisTitleLeft);
            config.axisTitleRightStyle = Ext.apply({}, themeAttrs.axisTitleRight);
            config.axisTitleTopStyle = Ext.apply({}, themeAttrs.axisTitleTop);
            config.axisTitleBottomStyle = Ext.apply({}, themeAttrs.axisTitleBottom);
        }
        switch (axis.position) {
            case 'top':
                Ext.apply(config, {
                    length: w,
                    width: h,
                    x: x,
                    y: y
                });
            break;
            case 'bottom':
                Ext.apply(config, {
                    length: w,
                    width: h,
                    x: x,
                    y: h
                });
            break;
            case 'left':
                Ext.apply(config, {
                    length: h,
                    width: w,
                    x: x,
                    y: h
                });
            break;
            case 'right':
                Ext.apply(config, {
                    length: h,
                    width: w,
                    x: w,
                    y: h
                });
            break;
        }
        if (!axis.chart) {
            Ext.apply(config, axis);
            var claz = 'Ext.chart.axis.' + axis.type;
            var obj = eval("new "+claz+ "(config)");
            axis = me.axes.replace(obj);
        }
        else {
            Ext.apply(axis, config);
        }
        axis.drawAxis(true);
    },


    /**
     * @private Adjust the dimensions and positions of each axis and the chart body area after accounting
     * for the space taken up on each side by the axes and legend.
     */
    alignAxes: function() {
        var me = this,
            axes = me.axes,
            legend = me.legend,
            edges = ['top', 'right', 'bottom', 'left'],
            chartBBox,
            insetPadding = me.insetPadding,
            insets = {
                top: insetPadding,
                right: insetPadding,
                bottom: insetPadding,
                left: insetPadding
            };

        function getAxis(edge) {
            var i = axes.findIndex('position', edge);
            return (i < 0) ? null : axes.getAt(i);
        }

        // Find the space needed by axes and legend as a positive inset from each edge
        Ext.each(edges, function(edge) {
            var isVertical = (edge === 'left' || edge === 'right'),
                axis = getAxis(edge),
                bbox;

            // Add legend size if it's on this edge
            if (legend !== false) {
                if (legend.position === edge) {
                    bbox = legend.getBBox();
                    insets[edge] += (isVertical ? bbox.width : bbox.height) + insets[edge];
                }
            }

            // Add axis size if there's one on this edge only if it has been
            //drawn before.
            if (axis && axis.bbox) {
                bbox = axis.bbox;
                insets[edge] += (isVertical ? bbox.width : bbox.height);
            }
        });
        // Build the chart bbox based on the collected inset values
        chartBBox = {
            x: insets.left,
            y: insets.top,
            width: me.curWidth - insets.left - insets.right,
            height: me.curHeight - insets.top - insets.bottom
        };
        me.chartBBox = chartBBox;

        // Go back through each axis and set its length and position based on the
        // corresponding edge of the chartBBox
        axes.each(function(axis) {
            var pos = axis.position,
                isVertical = (pos === 'left' || pos === 'right');

            axis.x = (pos === 'right' ? chartBBox.x + chartBBox.width : chartBBox.x);
            axis.y = (pos === 'top' ? chartBBox.y : chartBBox.y + chartBBox.height);
            axis.width = (isVertical ? chartBBox.width : chartBBox.height);
            axis.length = (isVertical ? chartBBox.height : chartBBox.width);
        });
    },

    // @private initialize the series.
    initializeSeries: function(series, idx) {
        var me = this,
            themeAttrs = me.themeAttrs,
            seriesObj, markerObj, seriesThemes, st,
            markerThemes, colorArrayStyle = [],
            i = 0, l,
            config = {
                chart: me,
                seriesId: series.seriesId
            };
        if (themeAttrs) {
            seriesThemes = themeAttrs.seriesThemes;
            markerThemes = themeAttrs.markerThemes;
            seriesObj = Ext.apply({}, themeAttrs.series);
            markerObj = Ext.apply({}, themeAttrs.marker);
            config.seriesStyle = Ext.apply(seriesObj, seriesThemes[idx % seriesThemes.length]);
            config.seriesLabelStyle = Ext.apply({}, themeAttrs.seriesLabel);
            config.markerStyle = Ext.apply(markerObj, markerThemes[idx % markerThemes.length]);
            if (themeAttrs.colors) {
                config.colorArrayStyle = themeAttrs.colors;
            } else {
                colorArrayStyle = [];
                for (l = seriesThemes.length; i < l; i++) {
                    st = seriesThemes[i];
                    if (st.fill || st.stroke) {
                        colorArrayStyle.push(st.fill || st.stroke);
                    }
                }
                if (colorArrayStyle.length) {
                    config.colorArrayStyle = colorArrayStyle;
                }
            }
            config.seriesIdx = idx;
        }
        if (!series.chart) {
            Ext.applyIf(config, series);
            var cla = 'Ext.chart.series.' + Ext.capitalize(series.type);
            var classObj = eval("new "+cla+"(config)");
            series = me.series.replace(classObj);
        } else {
            Ext.apply(series, config);
        }
        if (series.initialize) {
            series.initialize();
        }
    },

    // @private
    getMaxGutter: function() {
        var me = this,
            maxGutter = [0, 0];
        me.series.each(function(s) {
            var gutter = s.getGutters && s.getGutters() || [0, 0];
            maxGutter[0] = Math.max(maxGutter[0], gutter[0]);
            maxGutter[1] = Math.max(maxGutter[1], gutter[1]);
        });
        me.maxGutter = maxGutter;
    },

    // @private draw axis.
    drawAxis: function(axis) {
        axis.drawAxis();
    },

    // @private draw series.
    drawCharts: function(series) {
        series.drawSeries();
    },

    // @private remove gently.
    destroy: function() {
        this.surface.destroy();
        this.bindStore(null);
        Ext.chart.Chart.superclass.destroy.call(this);
    },
    
    /**
     * Added by Kui, for set curWidth/curHeight correctly
     */
    setSize : function(width, height) {
        var me = this;
        me.curWidth = width;
        me.curHeight = height;
        Ext.chart.Chart.superclass.setSize.apply(me, arguments);
    }
});
Ext.reg('chart', Ext.chart.Chart);
Ext.mixin(Ext.chart.Chart, 'themeMgr', Ext.chart.theme.Theme);
Ext.mixin(Ext.chart.Chart, 'mask', Ext.chart.Mask);
/**
 * @class Ext.chart.TipSurface
 * @ignore
 */

Ext.chart.TipSurface = Ext.extend(Ext.draw.Component, {

    spriteArray: false,
    renderFirst: true,

    constructor: function(config) {
        Ext.chart.TipSurface.superclass.constructor.apply(this, arguments);
        if (config.sprites) {
            this.spriteArray = [].concat(config.sprites);
            delete config.sprites;
        }
    },

    onRender: function() {
        var me = this,
            i = 0,
            l = 0,
            sp,
            sprites;
            Ext.chart.TipSurface.superclass.onRender.apply(me, arguments);
        sprites = me.spriteArray;
        if (me.renderFirst && sprites) {
            me.renderFirst = false;
            for (l = sprites.length; i < l; i++) {
                sp = me.surface.add(sprites[i]);
                sp.setAttributes({
                    hidden: false
                },
                true);
            }
        }
    }
});/**
 * @class Ext.chart.axis.Abstract
 * @ignore
 */
Ext.chart.axis.Abstract = Ext.extend(Ext.util.Observable, {

    constructor: function(config) {
        config = config || {};

        var me = this,
            pos = config.position || 'left';
    
        pos = pos.charAt(0).toUpperCase() + pos.substring(1);
        //axisLabel(Top|Bottom|Right|Left)Style
        config.label = Ext.apply(config['axisLabel' + pos + 'Style'] || {}, config.label || {});
        config.axisTitleStyle = Ext.apply(config['axisTitle' + pos + 'Style'] || {}, config.labelTitle || {});
        Ext.apply(me, config);
        me.fields = [].concat(me.fields);
        Ext.chart.axis.Abstract.superclass.constructor.call(me);
        me.labels = [];
        me.getId();
        me.labelGroup = me.chart.surface.getGroup(me.axisId + "-labels");
    },

    alignment: null,
    grid: false,
    steps: 10,
    x: 0,
    y: 0,
    minValue: 0,
    maxValue: 0,

    getId: function() {
        return this.axisId || (this.axisId = Ext.id(null, 'ext-axis-'));
    },

    drawAxis: Ext.emptyFn,
    addDisplayAndLabels: Ext.emptyFn
});/**
 * @class Ext.chart.axis.Axis
 * @extends Ext.chart.axis.Abstract
 * 
 * Defines axis for charts. The axis position, type, style can be configured.
 * The axes are defined in an axes array of configuration objects where the type, 
 * field, grid and other configuration options can be set. To know more about how 
 * to create a Chart please check the Chart class documentation. Here's an example for the axes part:
 * An example of axis for a series (in this case for an area chart that has multiple layers of yFields) could be:
 * 
  <pre><code>
    axes: [{
        type: 'Numeric',
        grid: true,
        position: 'left',
        fields: ['data1', 'data2', 'data3'],
        title: 'Number of Hits',
        grid: {
            odd: {
                opacity: 1,
                fill: '#ddd',
                stroke: '#bbb',
                'stroke-width': 1
            }
        },
        minimum: 0,
        adjustMinimumByMajorUnit: 0
    }, {
        type: 'Category',
        position: 'bottom',
        fields: ['name'],
        title: 'Month of the Year',
        grid: true,
        label: {
            rotate: {
                degrees: 315
            }
        }
    }]
   </code></pre>
 * 
 * In this case we use a `Numeric` axis for displaying the values of the Area series and a `Category` axis for displaying the names of
 * the store elements. The numeric axis is placed on the left of the screen, while the category axis is placed at the bottom of the chart. 
 * Both the category and numeric axes have `grid` set, which means that horizontal and vertical lines will cover the chart background. In the 
 * category axis the labels will be rotated so they can fit the space better.
 * 
 */
Ext.chart.axis.Axis = Ext.extend(Ext.chart.axis.Abstract, {

    //requires: ['Ext.draw.Draw'],

    /**
     * @cfg {Number} dashSize 
     * The size of the dash marker. Default's 3.
     */
    dashSize: 3,
    
    /**
     * @cfg {String} position
     * Where to set the axis. Available options are `left`, `bottom`, `right`, `top`. Default's `bottom`.
     */
    position: 'bottom',
    
    // @private
    skipFirst: false,
    
    /**
     * @cfg {Number} length
     * Offset axis position. Default's 0.
     */
    length: 0,
    
    /**
     * @cfg {Number} width
     * Offset axis width. Default's 0.
     */
    width: 0,

    // @private
    applyData: Ext.emptyFn,

    // @private creates a structure with start, end and step points.
    calcEnds: function() {
        var me = this,
            math = Math,
            mmax = math.max,
            mmin = math.min,
            store = me.chart.store,
            series = me.chart.series.items,
            fields = me.fields,
            ln = fields.length,
            min = isNaN(me.minimum) ? Infinity : me.minimum,
            max = isNaN(me.maximum) ? -Infinity : me.maximum,
            prevMin = me.prevMin,
            prevMax = me.prevMax,
            aggregate = false,
            total = 0,
            excludes = [],
            i, l, value, out;

        //if one series is stacked I have to aggregate the values
        //for the scale.
        for (i = 0, l = series.length; !aggregate && i < l; i++) {
            aggregate = aggregate || series[i].stacked;
            excludes = series[i].__excludes || excludes;
        }
        store.each(function(record) {
            if (aggregate) {
                if (!isFinite(min)) {
                    min = 0;
                }
                for (value = 0, i = 0; i < ln; i++) {
                   if (excludes[i]) {
                       continue;
                   }
                   value += record.get(fields[i]);
                }               
                max = mmax(max, value);
                min = mmin(min, value);
            }
            else {
                for (i = 0; i < ln; i++) {
                    if (excludes[i]) {
                        continue;
                    }
                    value = record.get(fields[i]);
                    max = mmax(max, value);
                    min = mmin(min, value);
                }
            }
        });
        if (!isFinite(max)) {
            max = me.prevMax || 0;
        }
        if (!isFinite(min)) {
            min = me.prevMin || 0;
        }
        //normalize min max for snapEnds.
        if (min != max) {
            max = (max >> 0) + 1;
        }
        out = Ext.draw.Draw.snapEnds(min, max, me.steps);
        if (!isNaN(me.maximum)) {
            out.to = mmax(out.to, me.maximum);
        }
        if (!isNaN(me.minimum)) {
            out.from = mmin(out.from, me.minimum);
        }
        if (me.adjustMaximumByMajorUnit) {
            out.to += out.step;
        }
        if (me.adjustMinimumByMajorUnit) {
            out.from -= out.step;
        }
        me.prevMin = min;
        me.prevMax = max;
        return out;
    },

    /**
     * Renders the axis into the screen and updates it's position.
     */
    drawAxis: function (init) {
        var me = this,
            x = me.x,
            y = me.y,
            gutterX = me.chart.maxGutter[0],
            gutterY = me.chart.maxGutter[1],
            dashSize = me.dashSize,
            length = me.length,
            position = me.position,
            inflections = [],
            calcLabels = false,
            stepCalcs = me.applyData(),
            step = stepCalcs.step,
            steps = stepCalcs.steps,
            from = stepCalcs.from,
            to = stepCalcs.to,
            trueLength,
            currentX,
            currentY,
            path,
            prev,
            delta;
        
        //If no steps are specified
        //then don't draw the axis. This generally happens
        //when an empty store.
        if (me.hidden || isNaN(step) || (from == to)) {
            return;
        }

        me.from = stepCalcs.from;
        me.to = stepCalcs.to;
        if (position == 'left' || position == 'right') {
            currentX = Math.floor(x) + 0.5;
            path = ["M", currentX, y, "l", 0, -length];
            trueLength = length - (gutterY * 2);
        }
        else {
            currentY = Math.floor(y) + 0.5;
            path = ["M", x, currentY, "l", length, 0];
            trueLength = length - (gutterX * 2);
        }
        
        delta = trueLength / (steps || 1);
        if (me.type == 'Numeric') {
            calcLabels = true;
            me.labels = [stepCalcs.from];
        }
        if (position == 'right' || position == 'left') {
            currentY = y - gutterY;
            currentX = x - ((position == 'left') * dashSize * 2);
            while (currentY >= y - gutterY - trueLength) {
                path = path.concat(["M", currentX, Math.floor(currentY) + 0.5, "l", dashSize * 2 + 1, 0]);
                inflections.push([ Math.floor(x), Math.floor(currentY) ]);
                currentY -= delta;
                if (calcLabels) {
                    me.labels.push(me.labels[me.labels.length -1] + step);
                }
                if (delta === 0) {
                    break;
                }
            }
            if (Math.round(currentY + delta - (y - gutterY - trueLength))) {
                path = path.concat(["M", currentX, Math.floor(y - length + gutterY) + 0.5, "l", dashSize * 2 + 1, 0]);
                inflections.push([ Math.floor(x), Math.floor(currentY) ]);
                if (calcLabels) {
                    me.labels.push(me.labels[me.labels.length -1] + step);
                }
            }
        } else {
            currentX = x + gutterX;
            currentY = y - (!!(position == 'top') * dashSize * 2);
            while (currentX <= x + gutterX + trueLength) {
                path = path.concat(["M", Math.floor(currentX) + 0.5, currentY, "l", 0, dashSize * 2 + 1]);
                inflections.push([ Math.floor(currentX), Math.floor(y) ]);
                currentX += delta;
                if (calcLabels) {
                    me.labels.push(me.labels[me.labels.length -1] + step);
                }
                if (delta === 0) {
                    break;
                }
            }
            if (Math.round(currentX - delta - (x + gutterX + trueLength))) {
                path = path.concat(["M", Math.floor(x + length - gutterX) + 0.5, currentY, "l", 0, dashSize * 2 + 1]);
                inflections.push([ Math.floor(currentX), Math.floor(y) ]);
                if (calcLabels) {
                    me.labels.push(me.labels[me.labels.length -1] + step);
                }
            }
        }
        if (!me.axis) {
            me.axis = me.chart.surface.add(Ext.apply({
                type: 'path',
                path: path
            }, me.axisStyle));
        }
        me.axis.setAttributes({
            path: path
        }, true);
        me.inflections = inflections;
        if (!init && me.grid) {
            me.drawGrid();
        }
        me.axisBBox = me.axis.getBBox();
        me.drawLabels();
    },

    /**
     * Renders an horizontal and/or vertical grid into the Surface.
     */
    drawGrid: function() {
        var me = this,
            surface = me.chart.surface, 
            grid = me.grid,
            odd = grid.odd,
            even = grid.even,
            inflections = me.inflections,
            ln = inflections.length - ((odd || even)? 0 : 1),
            position = me.position,
            gutter = me.chart.maxGutter,
            width = me.width - 2,
            vert = false,
            point, prevPoint,
            i = 1,
            path = [], styles, lineWidth, dlineWidth,
            oddPath = [], evenPath = [];
        
        if ((gutter[1] !== 0 && (position == 'left' || position == 'right')) ||
            (gutter[0] !== 0 && (position == 'top' || position == 'bottom'))) {
            i = 0;
            ln++;
        }
        for (; i < ln; i++) {
            point = inflections[i];
            prevPoint = inflections[i - 1];
            if (odd || even) {
                path = (i % 2)? oddPath : evenPath;
                styles = ((i % 2)? odd : even) || {};
                lineWidth = (styles.lineWidth || styles['stroke-width'] || 0) / 2;
                dlineWidth = 2 * lineWidth;
                if (position == 'left') {
                    path.push("M", prevPoint[0] + 1 + lineWidth, prevPoint[1] + 0.5 - lineWidth, 
                              "L", prevPoint[0] + 1 + width - lineWidth, prevPoint[1] + 0.5 - lineWidth,
                              "L", point[0] + 1 + width - lineWidth, point[1] + 0.5 + lineWidth,
                              "L", point[0] + 1 + lineWidth, point[1] + 0.5 + lineWidth, "Z");
                }
                else if (position == 'right') {
                    path.push("M", prevPoint[0] - lineWidth, prevPoint[1] + 0.5 - lineWidth, 
                              "L", prevPoint[0] - width + lineWidth, prevPoint[1] + 0.5 - lineWidth,
                              "L", point[0] - width + lineWidth, point[1] + 0.5 + lineWidth,
                              "L", point[0] - lineWidth, point[1] + 0.5 + lineWidth, "Z");
                }
                else if (position == 'top') {
                    path.push("M", prevPoint[0] + 0.5 + lineWidth, prevPoint[1] + 1 + lineWidth, 
                              "L", prevPoint[0] + 0.5 + lineWidth, prevPoint[1] + 1 + width - lineWidth,
                              "L", point[0] + 0.5 - lineWidth, point[1] + 1 + width - lineWidth,
                              "L", point[0] + 0.5 - lineWidth, point[1] + 1 + lineWidth, "Z");
                }
                else {
                    path.push("M", prevPoint[0] + 0.5 + lineWidth, prevPoint[1] - lineWidth, 
                            "L", prevPoint[0] + 0.5 + lineWidth, prevPoint[1] - width + lineWidth,
                            "L", point[0] + 0.5 - lineWidth, point[1] - width + lineWidth,
                            "L", point[0] + 0.5 - lineWidth, point[1] - lineWidth, "Z");
                }
            } else {
                if (position == 'left') {
                    path = path.concat(["M", point[0] + 0.5, point[1] + 0.5, "l", width, 0]);
                }
                else if (position == 'right') {
                    path = path.concat(["M", point[0] - 0.5, point[1] + 0.5, "l", -width, 0]);
                }
                else if (position == 'top') {
                    path = path.concat(["M", point[0] + 0.5, point[1] + 0.5, "l", 0, width]);
                }
                else {
                    path = path.concat(["M", point[0] + 0.5, point[1] - 0.5, "l", 0, -width]);
                }
            }
        }
        if (odd || even) {
            if (oddPath.length) {
                if (!me.gridOdd && oddPath.length) {
                    me.gridOdd = surface.add({
                        type: 'path',
                        path: oddPath
                    });
                }
                me.gridOdd.setAttributes(Ext.apply({
                    path: oddPath,
                    hidden: false
                }, odd || {}), true);
            }
            if (evenPath.length) {
                if (!me.gridEven) {
                    me.gridEven = surface.add({
                        type: 'path',
                        path: evenPath
                    });
                } 
                me.gridEven.setAttributes(Ext.apply({
                    path: evenPath,
                    hidden: false
                }, even || {}), true);
            }
        }
        else {
            if (path.length) {
                if (!me.gridLines) {
                    me.gridLines = me.chart.surface.add({
                        type: 'path',
                        path: path,
                        "stroke-width": me.lineWidth || 1,
                        stroke: me.gridColor || '#ccc'
                    });
                }
                me.gridLines.setAttributes({
                    hidden: false,
                    path: path
                }, true);
            }
            else if (me.gridLines) {
                me.gridLines.hide(true);
            }
        }
    },

    /**
     * Renders the labels in the axes.
     */
    drawLabels: function() {
        var me = this,
            inflections = me.inflections,
            ln = inflections.length,
            chart = me.chart,
            position = me.position,
            labels = me.labels,
            surface = chart.surface,
            labelGroup = me.labelGroup,
            maxWidth = 0,
            maxHeight = 0,
            gutterY = me.chart.maxGutter[1],
            bbox, point, prevX, prevY, prevLabel, textLabel, labelAttr, textRight, text, label, last, x, y, i;

        if (position == 'left' || position == 'right') {
            last = ln;
            for (i = 0; i < last; i++) {
                point = inflections[i];
                text = me.label.renderer(labels[i]);
                // Re-use existing textLabel or create a new one
                textLabel = labelGroup.getAt(i);
                if (textLabel) {
                    if (text != textLabel.attr.text) {
                        textLabel.setAttributes(Ext.apply({
                            text: text
                        }, me.label), true);
                        textLabel._bbox = textLabel.getBBox();
                    }
                }
                else {
                    textLabel = surface.add(Ext.apply({
                        group: labelGroup,
                        type: 'text',
                        x: 0,
                        y: 0,
                        text: text
                    }, me.label));
                    surface.renderItem(textLabel);
                    textLabel._bbox = textLabel.getBBox();
                }
                labelAttr = textLabel.attr;
                bbox = textLabel._bbox;
                maxWidth = Math.max(maxWidth, bbox.width + me.dashSize + me.label.padding);

                y = point[1];
                if (gutterY < bbox.height / 2) {
                    if (i == last - 1 && chart.axes.findIndex('position', 'top') == -1) {
                        y = me.y - me.length + Math.ceil(bbox.height / 2);
                    }
                    else if (i == 0 && chart.axes.findIndex('position', 'bottom') == -1) {
                        y = me.y - Math.floor(bbox.height / 2);
                    }
                }

                if (position == 'left') {
                    x = point[0] - bbox.width - me.dashSize - me.label.padding - 2;
                }
                else {
                    x = point[0] + me.dashSize + me.label.padding + 2;
                }    
                if (x != labelAttr.x || y != labelAttr.y || labelAttr.hidden) {
                    textLabel.setAttributes(Ext.apply({
                        hidden: false,
                        x: x,
                        y: y
                    }, me.label), true);
                }
                // Skip label if there isn't available minimum space
                if (i != 0 && (i != last) && (y + bbox.height > prevY) && !(labelAttr.rotation && labelAttr.rotation.degrees)) {
                    textLabel.hide(true);
                }
                prevY = y;
            }
        }
        else {
            last = ln - 1;
            for (i = last; i >= 0; i--) {
                point = inflections[i];
                text = me.label.renderer(labels[i]);
                // Re-use existing textLabel or create a new one
                textLabel = labelGroup.getAt(last - i);
                if (textLabel) {
                    if (text != textLabel.attr.text) {
                        textLabel.setAttributes({
                            text: text
                        }, true);
                        textLabel._bbox = textLabel.getBBox();
                    }
                }
                else {
                    textLabel = surface.add(Ext.apply({
                        group: labelGroup,
                        type: 'text',
                        x: 0,
                        y: 0,
                        text: text
                    }, me.label));
                    
                    surface.renderItem(textLabel);
                    textLabel._bbox = textLabel.getBBox();
                }
                labelAttr = textLabel.attr;
                bbox = textLabel._bbox;

                maxHeight = Math.max(maxHeight, bbox.height + me.dashSize + me.label.padding);
                x = Math.floor(point[0] - (bbox.width / 2) - bbox.x * Math.abs(Math.sin(((labelAttr.rotation && labelAttr.rotation.degrees || 0) * Math.PI / 180) || 0)));
                if (me.chart.maxGutter[0] == 0) {
                    if (i == 0 && chart.axes.findIndex('position', 'left') == -1) {
                        x = point[0];
                    }
                    else if (i == last && chart.axes.findIndex('position', 'right') == -1) {
                        x = point[0] - bbox.width;
                    }
                }
                textRight = x + bbox.width + me.label.padding;
                // Skip label if there isn't available minimum space
                if (i != 0 && (i != last) && textRight > prevX && !(labelAttr.rotation && labelAttr.rotation.degrees)) {
                    if (!me.elipsis(textLabel, text, prevX - x, 35, point[0])) {
                        textLabel.hide(true);
                        continue;
                    }
                }
                if (i == 0 && prevX < textRight) {
                    if (labelGroup.getCount() > 2) {
                        prevLabel = labelGroup.getAt((last - i) - 1);
                        me.elipsis(prevLabel, prevLabel.attr.text, labelGroup.getAt((last - i) - 2).getBBox().x - textRight, 35, inflections[i + 1][0]);
                    }
                }
                prevX = x;
                if (position == 'top') {
                    y = point[1] - (me.dashSize * 2) - me.label.padding - (bbox.height / 2);
                }
                else {
                    y = point[1] + (me.dashSize * 2) + me.label.padding + (bbox.height / 2);
                }
                textLabel.setAttributes({
                    hidden: false,
                    x: x,
                    y: y
                }, true);
            }
        }

        // Hide unused bars
        ln = labelGroup.getCount();
        i = inflections.length;
        for (; i < ln; i++) {
            labelGroup.getAt(i).hide(true);
        }

        me.bbox = {};
        Ext.apply(me.bbox, me.axisBBox);
        me.bbox.height = maxHeight;
        me.bbox.width = maxWidth;
        if (Ext.isString(me.title)) {
            me.drawTitle(maxWidth, maxHeight);
        }
    },

    // @private creates the elipsis for the text.
    elipsis: function(sprite, text, desiredWidth, minWidth, center) {
        var bbox,
            x;

        if (desiredWidth < minWidth) {
            sprite.hide(true);
            return false;
        }
        while (text.length > 4) {
            text = text.substr(0, text.length - 4) + "...";
            sprite.setAttributes({
                text: text
            }, true);
            bbox = sprite.getBBox();
            if (bbox.width < desiredWidth) {
                if (typeof center == 'number') {
                    sprite.setAttributes({
                        x: Math.floor(center - (bbox.width / 2))
                    }, true);
                }
                break;
            }
        }
        return true;
    },

    // @private draws the title for the axis.
    drawTitle: function(maxWidth, maxHeight) {
        var me = this,
            position = me.position,
            surface = me.chart.surface,
            rotate = (position == 'left' || position == 'right'),
            x = me.x,
            y = me.y,
            base, bbox, pad;

        if (!me.displaySprite) {
            base = {
                type: 'text',
                x: 0,
                y: 0,
                text: me.title
            };
            me.displaySprite = surface.add(Ext.apply(base, me.axisTitleStyle, me.labelTitle));
            surface.renderItem(me.displaySprite);
        }
        bbox = me.displaySprite.getBBox();
        pad = me.dashSize + me.label.padding;

        if (rotate) {
            y -= ((me.length / 2) - (bbox.height / 2));
            if (position == 'left') {
                x -= (maxWidth + pad + (bbox.width / 2));
            }
            else {
                x += (maxWidth + pad + bbox.width - (bbox.width / 2));
            }
            me.bbox.width += bbox.width + 10;
        }
        else {
            x += (me.length / 2) - (bbox.width * 0.5);
            if (position == 'top') {
                y -= (maxHeight + pad + (bbox.height * 0.3));
            }
            else {
                y += (maxHeight + pad + (bbox.height * 0.8));
            }
            me.bbox.height += bbox.height + 10;
        }
        me.displaySprite.setAttributes({
            translate: {
                x: x,
                y: y
            }
        }, true);
    }
});/**
 * @class Ext.chart.axis.Category
 * @extends Ext.chart.axis.Axis
 * 
 * A type of axis that displays items in categories. This axis is generally used to
 * display categorical information like names of items, month names, quarters, etc.
 * but no quantitative values. For that other type of information <em>Number</em>
 * axis are more suitable.
 *
 * As with other axis you can set the position of the axis and its title. For example:
 *
    <pre><code>
    {
        type: 'Category',
        position: 'bottom',
        fields: ['name'],
        title: 'Month of the Year'
    }    
    </code></pre>
    
    In this example with set the category axis to the bottom of the surface, bound the axis to
    the <em>name</em> property and set as title <em>Month of the Year</em>.
 */
Ext.chart.axis.Category = Ext.extend(Ext.chart.axis.Axis, {

    /**
     * A list of category names to display along this axis.
     *
     * @property categoryNames
     * @type Array
     */
    categoryNames: null,

    /**
     * Indicates whether or not to calculate the number of categories (ticks and
     * labels) when there is not enough room to display all labels on the axis.
     * If set to true, the axis will determine the number of categories to plot.
     * If not, all categories will be plotted.
     *
     * @property calculateCategoryCount
     * @type Boolean
     */
    calculateCategoryCount: false,

    // @private creates an array of labels to be used when rendering.
    setLabels: function() {
        var store = this.chart.store,
            fields = this.fields,
            ln = fields.length,
            i;

        this.labels = [];
        store.each(function(record) {
            for (i = 0; i < ln; i++) {
                this.labels.push(record.get(fields[i]));
            }
        }, this);
    },

    // @private calculates labels positions and marker positions for rendering.
    applyData: function() {
        Ext.chart.axis.Category.superclass.applyData.call(this);
        this.setLabels();
        var count = this.chart.store.getCount();
        return {
            from: 0,
            to: count,
            power: 1,
            step: 1,
            steps: count - 1
        };
    }
});/**
 * @class Ext.chart.axis.Numeric
 * @extends Ext.chart.axis.Axis
 *
 * An axis to handle numeric values. This axis is used for quantitative data as
 * opposed to the category axis. You can set mininum and maximum values to the
 * axis so that the values are bound to that. If no values are set, then the
 * scale will auto-adjust to the values.
 *
 * For example:
 
    <pre><code>
    axes: [{
        type: 'Numeric',
        minimum: 0,
        position: 'left',
        fields: ['data1', 'data2', 'data3'],
        title: 'Number of Hits',
        grid: {
            odd: {
                opacity: 1,
                fill: '#ddd',
                stroke: '#bbb',
                'stroke-width': 0.5
            }
        }
    }]
    </code></pre>
 
 *
 * In this example we create an axis of Numeric type. We set a minimum value so that
 * even if all series have values greater than zero, the grid starts at zero. We bind
 * the axis onto the left part of the surface by setting <em>position</em> to <em>left</em>. 
 * We bind three different store fields to this axis by setting <em>fields</em> to an array.
 * We set the title of the axis to <em>Number of Hits</em> by using the <em>title</em> property.
 * We use a <em>grid</em> configuration to set odd background rows to a certain style and even rows
 * to be transparent/ignored.
 *
 *
 * @constructor
 */

Ext.chart.axis.Numeric = Ext.extend(Ext.chart.axis.Axis, {

    type: "numeric",

    /**
     * The minimum value drawn by the axis. If not set explicitly, the axis
     * minimum will be calculated automatically.
     *
     * @property minimum
     * @type Number
     */
    minimum: NaN,

    /**
     * The maximum value drawn by the axis. If not set explicitly, the axis
     * maximum will be calculated automatically.
     *
     * @property maximum
     * @type Number
     */
    maximum: NaN,

    /**
     * The spacing between major intervals on this axis.
     *
     * @property majorUnit
     * @type Number
     */
    majorUnit: NaN,

    /**
     * The spacing between minor intervals on this axis.
     *
     * @property minorUnit
     * @type Number
     */
    minorUnit: NaN,

    /**
     * If true, the labels, ticks, gridlines, and other objects will snap to the
     * nearest major or minor unit. If false, their position will be based on
     * the minimum value.
     *
     * @property snapToUnits
     * @type Boolean
     */
    snapToUnits: true,

    /**
     * If true, and the bounds are calculated automatically, either the minimum
     * or maximum will be set to zero.
     *
     * @property alwaysShowZero
     * @type Boolean
     */
    alwaysShowZero: true,

    /**
     * The scaling algorithm to use on this axis. May be "linear" or
     * "logarithmic".
     *
     * @property scale
     * @type String
     */
    scale: "linear",

    /**
     * Indicates whether to round the major unit.
     *
     * @property roundMajorUnit
     * @type Boolean
     */
    roundMajorUnit: true,

    /**
     * Indicates whether to factor in the size of the labels when calculating a
     * major unit.
     *
     * @property calculateByLabelSize
     * @type Boolean
     */
    calculateByLabelSize: true,

    /**
     * Indicates the position of the axis relative to the chart
     *
     * @property position
     * @type String
     */
    position: 'left',

    /**
     * Indicates whether to extend maximum beyond data's maximum to the nearest
     * majorUnit.
     *
     * @property adjustMaximumByMajorUnit
     * @type Boolean
     */
    adjustMaximumByMajorUnit: false,

    /**
     * Indicates whether to extend the minimum beyond data's minimum to the
     * nearest majorUnit.
     *
     * @property adjustMinimumByMajorUnit
     * @type Boolean
     */
    adjustMinimumByMajorUnit: false,

    // @private apply data.
    applyData: function() {
        Ext.chart.axis.Numeric.superclass.applyData.call(this);
        return this.calcEnds();
    }
});/**
 * @class Ext.chart.axis.Radial
 * @extends Ext.chart.axis.Abstract
 * @ignore
 */
Ext.chart.axis.Radial = Ext.extend(Ext.chart.axis.Abstract, {

    position: 'radial',

    drawAxis: function(init) {
        var chart = this.chart,
            surface = chart.surface,
            bbox = chart.chartBBox,
            store = chart.store,
            l = store.getCount(),
            centerX = bbox.x + (bbox.width / 2),
            centerY = bbox.y + (bbox.height / 2),
            rho = Math.min(bbox.width, bbox.height) /2,
            sprites = [], sprite,
            steps = this.steps,
            i, j, pi2 = Math.PI * 2,
            cos = Math.cos, sin = Math.sin;

        if (this.sprites && !chart.resizing) {
            this.drawLabels();
            return;
        }

        if (!this.sprites) {
            //draw circles
            for (i = 1; i <= steps; i++) {
                sprite = surface.add({
                    type: 'circle',
                    x: centerX,
                    y: centerY,
                    radius: Math.max(rho * i / steps, 0),
                    stroke: '#ccc'
                });
                sprite.setAttributes({
                    hidden: false
                }, true);
                sprites.push(sprite);
            }
            //draw lines
            store.each(function(rec, i) {
                sprite = surface.add({
                    type: 'path',
                    path: ['M', centerX, centerY, 'L', centerX + rho * cos(i / l * pi2), centerY + rho * sin(i / l * pi2), 'Z'],
                    stroke: '#ccc'
                });
                sprite.setAttributes({
                    hidden: false
                }, true);
                sprites.push(sprite);
            });
        } else {
            sprites = this.sprites;
            //draw circles
            for (i = 0; i < steps; i++) {
                sprites[i].setAttributes({
                    x: centerX,
                    y: centerY,
                    radius: Math.max(rho * (i + 1) / steps, 0),
                    stroke: '#ccc'
                }, true);
            }
            //draw lines
            store.each(function(rec, j) {
                sprites[i + j].setAttributes({
                    path: ['M', centerX, centerY, 'L', centerX + rho * cos(j / l * pi2), centerY + rho * sin(j / l * pi2), 'Z'],
                    stroke: '#ccc'
                }, true);
            });
        }
        this.sprites = sprites;

        this.drawLabels();
    },

    drawLabels: function() {
        var chart = this.chart,
            surface = chart.surface,
            bbox = chart.chartBBox,
            store = chart.store,
            centerX = bbox.x + (bbox.width / 2),
            centerY = bbox.y + (bbox.height / 2),
            rho = Math.min(bbox.width, bbox.height) /2,
            max = Math.max, round = Math.round,
            labelArray = [], label,
            fields = [], nfields,
            categories = [], xField,
            maxValue = 0,
            steps = this.steps, i = 0, j, dx, dy,
            pi2 = Math.PI * 2,
            cos = Math.cos, sin = Math.sin,
            display = this.label.display,
            draw = display !== 'none',
            margin = 10;

        if (!draw) {
            return;
        }

        //get all rendered fields
        chart.series.each(function(series) {
            fields.push(series.yField);
            xField = series.xField;
        });
        //get maxValue to interpolate
        store.each(function(record, i) {
            for (i = 0, nfields = fields.length; i < nfields; i++) {
                maxValue = max(+record.get(fields[i]), maxValue);
            }
            categories.push(record.get(xField));
        });

        if (!this.labelArray) {
            if (display != 'categories') {
                //draw scale
                for (i = 1; i <= steps; i++) {
                    label = surface.add({
                        type: 'text',
                        text: round(i / steps * maxValue),
                        x: centerX,
                        y: centerY - rho * i / steps,
                        'text-anchor': 'middle',
                        'stroke-width': 0.1,
                        stroke: '#333'
                    });
                    label.setAttributes({
                        hidden: false
                    }, true);
                    labelArray.push(label);
                }
            }
            if (display != 'scale') {
                //draw text
                for (j = 0, steps = categories.length; j < steps; j++) {
                    dx = cos(j / steps * pi2) * (rho + margin);
                    dy = sin(j / steps * pi2) * (rho + margin);
                    label = surface.add({
                        type: 'text',
                        text: categories[j],
                        x: centerX + dx,
                        y: centerY + dy,
                        'text-anchor': dx * dx <= 0.001? 'middle' : (dx < 0? 'end' : 'start')
                    });
                    label.setAttributes({
                        hidden: false
                    }, true);
                    labelArray.push(label);
                }
            }
        }
        else {
            labelArray = this.labelArray;
            if (display != 'categories') {
                //draw values
                for (i = 0; i < steps; i++) {
                    labelArray[i].setAttributes({
                        text: round((i + 1) / steps * maxValue),
                        x: centerX,
                        y: centerY - rho * (i + 1) / steps,
                        'text-anchor': 'middle',
                        'stroke-width': 0.1,
                        stroke: '#333'
                    }, true);
                }
            }
            if (display != 'scale') {
                //draw text
                for (j = 0, steps = categories.length; j < steps; j++) {
                    dx = cos(j / steps * pi2) * (rho + margin);
                    dy = sin(j / steps * pi2) * (rho + margin);
                    if (labelArray[i + j]) {
                        labelArray[i + j].setAttributes({
                            type: 'text',
                            text: categories[j],
                            x: centerX + dx,
                            y: centerY + dy,
                            'text-anchor': dx * dx <= 0.001? 'middle' : (dx < 0? 'end' : 'start')
                        }, true);
                    }
                }
            }
        }
        this.labelArray = labelArray;
    }
});/**
 * @class Ext.chart.axis.Time
 * @extends Ext.chart.axis.Axis
 *
 * A type of axis whose units are measured in time values. Use this axis
 * for listing dates that you will want to group or dynamically change.
 * If you just want to display dates as categories then use the
 * Category class for axis instead.
 *
 * For example:
 *
  <pre><code>
    axes: [{
        type: 'Time',
        position: 'bottom',
        fields: 'date',
        title: 'Day',
        dateFormat: 'M d',
        groupBy: 'year,month,day',
        aggregateOp: 'sum',

        constrain: true,
        fromDate: '1/1/11',
        toDate: '1/7/11'
    }]
  </code></pre>
 *
 * In this example we're creating a time axis that has as title <em>Day</em>.
 * The field the axis is bound to is <em>date</em>.
 * The date format to use to display the text for the axis labels is <em>M d</em>
 * which is a three letter month abbreviation followed by the day number.
 * The time axis will show values for dates betwee <em>fromDate</em> and <em>toDate</em>.
 * Since <em>constrain</em> is set to true all other values for other dates not between
 * the fromDate and toDate will not be displayed.
 * 
 * @constructor
 */
Ext.chart.axis.Time = Ext.extend(Ext.chart.axis.Category, {

    //requires: ['Ext.data.Store', 'Ext.data.JsonStore'],

     /**
      * The minimum value drawn by the axis. If not set explicitly, the axis
      * minimum will be calculated automatically.
      * @property calculateByLabelSize
      * @type Boolean
      */
    calculateByLabelSize: true,
    
     /**
     * Indicates the format the date will be rendered on. 
     * For example: 'M d' will render the dates as 'Jan 30', etc.
      *
     * @property dateFormat
     * @type {String|Boolean}
      */
    dateFormat: false,
    
     /**
     * Indicates the time unit to use for each step. Can be 'day', 'month', 'year' or a comma-separated combination of all of them.
     * Default's 'year,month,day'.
     *
     * @property timeUnit
     * @type {String}
     */
    groupBy: 'year,month,day',
    
    /**
     * Aggregation operation when grouping. Possible options are 'sum', 'avg', 'max', 'min'. Default's 'sum'.
     * 
     * @property aggregateOp
     * @type {String}
      */
    aggregateOp: 'sum',
    
    /**
     * The starting date for the time axis.
     * @property fromDate
     * @type Date
     */
    fromDate: false,
    
    /**
     * The ending date for the time axis.
     * @property toDate
     * @type Date
     */
    toDate: false,
    
    /**
     * An array with two components: The first is the unit of the step (day, month, year, etc). The second one is the number of units for the step (1, 2, etc.).
     * Default's [Ext.Date.DAY, 1].
     * 
     * @property step 
     * @type Array
     */
    step: [Ext.Date.DAY, 1],
    
    /**
     * If true, the values of the chart will be rendered only if they belong between the fromDate and toDate. 
     * If false, the time axis will adapt to the new values by adding/removing steps.
     * Default's [Ext.Date.DAY, 1].
     * 
     * @property constrain 
     * @type Boolean
     */
    constrain: false,
    
    // @private a wrapper for date methods.
    dateMethods: {
        'year': function(date) {
            return date.getFullYear();
        },
        'day': function(date) {
            return date.getDate();
        },
        'month': function(date) {
            return date.getMonth() + 1;
        }
    },
    
    // @private holds aggregate functions.
    aggregateFn: {
        'sum': function(list) {
            var i = 0, l = list.length, acum = 0;
            if (!list.length || isNaN(list[0])) {
                return list[0];
            }
            for (; i < l; i++) {
                acum += list[i];
            }
            return acum;
        },
        'max': function(list) {
            if (!list.length || isNaN(list[0])) {
                return list[0];
            }
            return Math.max.apply(Math, list);
        },
        'min': function(list) {
            if (!list.length || isNaN(list[0])) {
                return list[0];
            }
            return Math.min.apply(Math, list);
        },
        'avg': function(list) {
            var i = 0, l = list.length, acum = 0;
            if (!list.length || isNaN(list[0])) {
                return list[0];
            }
            for (; i < l; i++) {
                acum += list[i];
            }
            return acum / l;
        }
    },
    
    // @private normalized the store to fill date gaps in the time interval.
    constrainDates: function() {
        var fromDate = new Date(this.fromDate),
            toDate = new Date(this.toDate),
            step = this.step,
            field = this.fields,
            store = this.chart.store,
            record, recObj, fieldNames = [], 
            newStore = new Ext.data.Store({
                model: store.model
            });
        
        var getRecordByDate = (function() {
            var index = 0, l = store.getCount();
            return function(date) {
                var rec, recDate;
                for (; index < l; index++) {
                    rec = store.getAt(index);
                    recDate = new Date(rec.get(field));
                    if (+recDate > +date) {
                        return false;
                    } else if (+recDate == +date) {
                        return rec;
                    }
                }
                return false;
            };
        })();
        
        if (!this.constrain) {
            this.chart.filteredStore = this.chart.store;
            return;
        }
        
        while(+fromDate <= +toDate) {
            record = getRecordByDate(fromDate);
            recObj = {};
            if (record) {
                newStore.add(record.data);
            } else {
                newStore.model.prototype.fields.each(function(f) {
                    recObj[f.name] = false;
                });
                recObj.date = fromDate;
                newStore.add(recObj);
            }
            fromDate = fromDate.add(step[0], step[1]);
        }
        
        this.chart.filteredStore = newStore;
    },
    
    // @private aggregates values if multiple store elements belong to the same time step.
    aggregate: function() {
        var aggStore = {}, 
            aggKeys = [], key, value,
            op = this.aggregateOp,
            field = this.fields, i,
            fields = this.groupBy.split(','),
            curField,
            recFields = [],
            recFieldsLen = 0,
            obj,
            dates = [],
            json = [],
            l = fields.length,
            dateMethods = this.dateMethods,
            aggregateFn = this.aggregateFn,
            store = this.chart.filteredStore || this.chart.store;
        
        store.each(function(rec) {
            //get all record field names in a simple array
            if (!recFields.length) {
                rec.fields.each(function(f) {
                    recFields.push(f.name);
                });
                recFieldsLen = recFields.length;
            }
            //get record date value
            value = new Date(rec.get(field));
            //generate key for grouping records
            for (i = 0; i < l; i++) {
                if (i == 0) {
                    key = String(dateMethods[fields[i]](value));
                } else {
                    key += '||' + dateMethods[fields[i]](value);
                }
            }
            //get aggregation record from hash
            if (key in aggStore) {
                obj = aggStore[key];
            } else {
                obj = aggStore[key] = {};
                aggKeys.push(key);
                dates.push(value);
            }
            //append record values to an aggregation record
            for (i = 0; i < recFieldsLen; i++) {
                curField = recFields[i];
                if (!obj[curField]) {
                    obj[curField] = [];
                }
                if (rec.get(curField) !== undefined) {
                    obj[curField].push(rec.get(curField));
                }
            }
        });
        //perform aggregation operations on fields
        for (key in aggStore) {
            obj = aggStore[key];
            for (i = 0; i < recFieldsLen; i++) {
                curField = recFields[i];
                obj[curField] = aggregateFn[op](obj[curField]);
            }
            json.push(obj);
        }
        
        this.chart.substore = new Ext.data.JsonStore({
            fields: recFields,
            data: json
        });
        
        this.dates = dates;
    },
    
    // @private creates a label array to be used as the axis labels.
     setLabels: function() {
        var store = this.chart.substore,
            fields = this.fields,
            format = this.dateFormat,
            labels, i, dates = this.dates,
            formatFn = Ext.Date.format;
    
        this.labels = labels = [];
        store.each(function(record, i) {
            if (!format) {
                labels.push(record.get(fields));
            } else {
                labels.push(formatFn(dates[i], format));
            }
         }, this);
     },

     // @private modifies the store and creates the labels for the axes.
     applyData: function() {
         //TODO(nico): fix this eventually...
         if (this.constrain) {
             this.constrainDates();
             this.aggregate();
             this.chart.substore = this.chart.filteredStore;
         } else {
             this.aggregate();
         }
         this.setLabels();
        var count = this.chart.substore.getCount();
         return {
             from: 0,
             to: count,
             steps: count - 1
         };
     }
 });

/**
 * @class Ext.chart.Tips
 * @ignore
 */
Ext.chart.Tips = Ext.extend(Object, {

    //requires: ['Ext.tip.ToolTip', 'Ext.chart.TipSurface'],

    constructor: function(config) {
        var me = this,
            surface,
            sprites,
            tipSurface;
        if (config.tips) {
            this.tipTimeout = null;
            me.tipConfig = Ext.apply({},
            config.tips, {
                renderer: Ext.emptyFn
            });
            me.tooltip = new Ext.tip.ToolTip(me.tipConfig);
            Ext.getBody().on('mousemove', me.tooltip.onMouseMove, me.tooltip);
            if (me.tipConfig.surface) {
                //initialize a surface
                surface = me.tipConfig.surface;
                sprites = surface.sprites;
                tipSurface = new Ext.chart.TipSurface({
                    id: 'tipSurfaceComponent',
                    sprites: sprites
                });
                if (surface.width && surface.height) {
                    tipSurface.setSize(surface.width, surface.height);
                }
                me.tooltip.add(tipSurface);
                this.spriteTip = tipSurface;
            }
        }
    },

    showTip: function(item) {
        var me = this;
        if (!me.tooltip) {
            return;
        }
        clearTimeout(me.tipTimeout);
        var tooltip = me.tooltip,
            spriteTip = me.spriteTip,
            tipConfig = me.tipConfig,
            trackMouse = tooltip.trackMouse,
            sprite,
            surface,
            surfaceExt,
            pos,
            x,
            y;
        if (!trackMouse) {
            tooltip.trackMouse = true;
            sprite = item.sprite;
            surface = sprite.surface;
            surfaceExt = Ext.get(surface.getId());
            pos = surfaceExt.getXY();
            x = pos[0] + (sprite.attr.x || 0) + (sprite.attr.translation && sprite.attr.translation.x || 0);
            y = pos[1] + (sprite.attr.y || 0) + (sprite.attr.translation && sprite.attr.translation.y || 0);
            tooltip.targetXY = [x, y];
        }
        if (spriteTip) {
            tipConfig.renderer.call(tooltip, item.storeItem, item, spriteTip.surface);
        } else {
            tipConfig.renderer.call(tooltip, item.storeItem, item);
        }
        tooltip.show();
        tooltip.trackMouse = trackMouse;
    },

    hideTip: function(item) {
        var tooltip = this.tooltip;
        if (!tooltip) {
            return;
        }
        clearTimeout(this.tipTimeout);
        this.tipTimeout = setTimeout(function() {
            tooltip.hide();
        }, 0);
    }
});/**
 * @class Ext.chart.series.Series
 * 
 * Series is the abstract class containing the common logic to all chart series. Series includes 
 * methods from Labels, Highlights, Tips and Callouts mixins. This class implements the logic of handling 
 * mouse events, animating, hiding, showing all elements and returning the color of the series to be used as a legend item.
 */
Ext.chart.series.Series = Ext.extend(Ext.util.Observable, {

    /**
     * @cfg {String} type
     * The type of series. Set in subclasses.
     */
    type: null,

    /**
     * @cfg {String} title
     * The human-readable name of the series.
     */
    title: null,

    /**
     * @cfg {Boolean} showInLegend
     * Whether to show this series in the legend.
     */
    showInLegend: true,

    /**
     * @cfg {Function} renderer
     * A function that can be overridden to set custom styling properties to each rendered element.
     * Passes in (sprite, record, attributes, index, store) to the function.
     */
    renderer: function(sprite, record, attributes, index, store) {
        return attributes;
    },

    /**
     * @cfg {Array} shadowAttributes
     * An array with shadow attributes
     */
    shadowAttributes: null,

    /**
     * @cfg {Object} listeners  
     * An (optional) object with event callbacks. All event callbacks get the target *item* as first parameter. The callback functions are:
     *  
     *  <ul>
     *      <li>itemmouseover</li>
     *      <li>itemmouseout</li>
     *      <li>itemmousedown</li>
     *      <li>itemmouseup</li>
     *  </ul>
     */
    
    constructor: function(config) {
        var me = this;
        if (config) {
            Ext.apply(me, config);
        }
        
        me.listeners = Ext.applyIf(config.listeners || {}, {
            itemmouseover: Ext.emptyFn,
            itemmouseout: Ext.emptyFn,
            itemmousedown: Ext.emptyFn,
            itemmouseup: Ext.emptyFn
        });
        
        me.shadowGroups = [];

        me.mixins.labels.constructor.call(me, config);
        me.mixins.highlights.constructor.call(me, config);
        //me.mixins.tips.constructor.call(me, config);
        me.mixins.callouts.constructor.call(me, config);

        me.chart.on({
            scope: me,
            itemmouseover: me.onItemMouseOver,
            itemmouseout: me.onItemMouseOut,
            itemmousedown: me.onItemMouseDown,
            itemmouseup: me.onItemMouseUp,
            mouseleave: me.onMouseLeave
        });
    },

    // @private set the bbox and clipBox for the series
    setBBox: function(noGutter) {
        var me = this,
            chart = me.chart,
            chartBBox = chart.chartBBox,
            gutterX = noGutter ? 0 : chart.maxGutter[0],
            gutterY = noGutter ? 0 : chart.maxGutter[1],
            clipBox, bbox;

        clipBox = {
            x: chartBBox.x,
            y: chartBBox.y,
            width: chartBBox.width,
            height: chartBBox.height
        };
        me.clipBox = clipBox;

        bbox = {
            x: (clipBox.x + gutterX) - (chart.zoom.x * chart.zoom.width),
            y: (clipBox.y + gutterY) - (chart.zoom.y * chart.zoom.height),
            width: (clipBox.width - (gutterX * 2)) * chart.zoom.width,
            height: (clipBox.height - (gutterY * 2)) * chart.zoom.height
        };
        me.bbox = bbox;
    },

    // @private set the animation for the sprite
    onAnimate: function(sprite, attr) {
        sprite.stopFx();
        return sprite.animate(Ext.applyIf(attr, this.chart.animate));
    },

    // @private return the gutter.
    getGutters: function() {
        return [0, 0];
    },

    // @private wrapper for the itemmouseup event.
    onItemMouseUp: function(item) {
        this.listeners.itemmouseup(item);
    },
    // @private wrapper for the itemmousedown event.
    onItemMouseDown: function(item) {
        this.listeners.itemmousedown(item);
    },

    // @private wrapper for the itemmouseover event.
    onItemMouseOver: function(item) { 
        var me = this;
        if (item.series === me) {
            if (me.highlight) {
                me.highlightItem(item);
            }
            if (me.tooltip) {
                me.showTip(item);
            }
        }
        me.listeners.itemmouseover(item);
    },

    // @private wrapper for the itemmouseout event.
    onItemMouseOut: function(item) {
        var me = this;
        if (item.series === me) {
            me.unHighlightItem();
            if (me.tooltip) {
                me.hideTip(item);
            }
        }
        me.listeners.itemmouseout(item);
    },

    // @private wrapper for the mouseleave event.
    onMouseLeave: function() {
        var me = this;
        me.unHighlightItem();
        if (me.tooltip) {
            me.hideTip();
        }
    },

    /**
     * For a given x/y point relative to the Surface, find a corresponding item from this
     * series, if any.
     * @param {Number} x
     * @param {Number} y
     * @return {Object} An object describing the item, or null if there is no matching item. The exact contents of
     *                  this object will vary by series type, but should always contain at least the following:
     *                  <ul>
     *                    <li>{Ext.chart.series.Series} series - the Series object to which the item belongs</li>
     *                    <li>{Object} value - the value(s) of the item's data point</li>
     *                    <li>{Array} point - the x/y coordinates relative to the chart box of a single point
     *                        for this data item, which can be used as e.g. a tooltip anchor point.</li>
     *                    <li>{Ext.draw.Sprite} sprite - the item's rendering Sprite.
     *                  </ul>
     */
    getItemForPoint: function(x, y) {
        //if there are no items to query just return null.
        if (!this.items || !this.items.length || this.seriesIsHidden) {
            return null;
        }
        var me = this,
            items = me.items,
            bbox = me.bbox,
            item, i, ln;

        // Check bounds
        if (!Ext.draw.Draw.withinBox(x, y, bbox)) {
            return null;
        }
        
        for (i = 0, ln = items.length; i < ln; i++) {
            if (items[i] && this.isItemInPoint(x, y, items[i], i)) {
                return items[i];
            }
        }
        
        return null;
    },
    
    isItemInPoint: function(x, y, item, i) {
        return false;
    },

    /**
     * Hides all the elements in the series.
     */
    hideAll: function() {
        var me = this,
            items = me.items,
            item, len, i, sprite;

        me.seriesIsHidden = true;
        me._prevShowMarkers = me.showMarkers;

        me.showMarkers = false;
        //hide all labels
        me.hideLabels(0);
        //hide all sprites
        for (i = 0, len = items.length; i < len; i++) {
            item = items[i];
            sprite = item.sprite;
            if (sprite) {
                sprite.setAttributes({
                    hidden: true
                }, true);
            }
        }
    },

    /**
     * Shows all the elements in the series.
     */
    showAll: function() {
        var me = this,
            prevAnimate = me.chart.animate;
        me.chart.animate = false;
        me.seriesIsHidden = false;
        me.showMarkers = me._prevShowMarkers;
        me.drawSeries();
        me.chart.animate = prevAnimate;
    },
    
    /**
     * Returns a string with the color to be used for the series legend item. 
     */
    getLegendColor: function(index) {
        var me = this, fill, stroke;
        if (me.seriesStyle) {
            fill = me.seriesStyle.fill;
            stroke = me.seriesStyle.stroke;
            if (fill && fill != 'none') {
                return fill;
            }
            return stroke;
        }
        return '#000';
    },
    
    /**
     * Checks whether the data field should be visible in the legend
     * @private
     * @param {Number} index The index of the current item
     */
    visibleInLegend: function(index){
        var excludes = this.__excludes;
        if (excludes) {
            return !excludes[index];
        }
        return !this.seriesIsHidden;
    }
});

Ext.mixin(Ext.chart.series.Series, 'labels', Ext.chart.Labels);
Ext.mixin(Ext.chart.series.Series, 'highlights', Ext.chart.Highlights);
Ext.mixin(Ext.chart.series.Series, 'tips', Ext.chart.Tips);
Ext.mixin(Ext.chart.series.Series, 'callouts', Ext.chart.Callouts);
/**
 * @class Ext.chart.series.Cartesian
 * @extends Ext.chart.series.Series
 *
 * Common base class for series implementations which plot values using x/y coordinates.
 *
 * @constructor
 */

Ext.chart.series.Cartesian = Ext.extend(Ext.chart.series.Series, {

    /**
     * The field used to access the x axis value from the items from the data
     * source.
     *
     * @property xField
     * @type String
     */
    xField: null,

    /**
     * The field used to access the y-axis value from the items from the data
     * source.
     *
     * @property yField
     * @type String
     */
    yField: null,

    /**
     * Indicates which axis the series will bind to
     *
     * @property axis
     * @type String
     */
    axis: 'left'
});
/**
 * @class Ext.chart.series.Area
 * @extends Ext.chart.series.Cartesian
 * 
 <p>
    Creates a Stacked Area Chart. The stacked area chart is useful when displaying multiple aggregated layers of information.
    As with all other series, the Area Series must be appended in the *series* Chart array configuration. See the Chart 
    documentation for more information. A typical configuration object for the area series could be:
 </p>
 
  <pre><code>
   series: [{
       type: 'area',
       highlight: true,
       axis: 'left',
       xField: 'name',
       yField: ['data1', 'data2', 'data3', 'data4', 'data5', 'data6', 'data7'],
       style: {
           opacity: 0.93
       }
   }]
   </code></pre>
 
  
 <p>
  In this configuration we set `area` as the type for the series, set highlighting options to true for highlighting elements on hover, 
  take the left axis to measure the data in the area series, set as xField (x values) the name field of each element in the store, 
  and as yFields (aggregated layers) seven data fields from the same store. Then we override some theming styles by adding some opacity 
  to the style object.
 </p>
  
 * @xtype area
 * 
 */

Ext.chart.series.Area = Ext.extend(Ext.chart.series.Cartesian, {

    //requires: ['Ext.chart.axis.Axis', 'Ext.draw.Color', 'Ext.fx.Anim'],

    type: 'area',

    /**
     * @cfg {Object} style 
     * Append styling properties to this object for it to override theme properties.
     */
    style: {},

    constructor: function(config) {
        //this.callParent(arguments);
        Ext.chart.series.Area.superclass.constructor.apply(this, arguments);
        var me = this,
            surface = me.chart.surface,
            i, l;
        Ext.apply(me, config, {
            __excludes: [],
            highlightCfg: {
                lineWidth: 3,
                stroke: '#55c',
                opacity: 0.8,
                color: '#f00'
            }
        });
        if (me.highlight) {
            me.highlightSprite = surface.add({
                type: 'path',
                path: ['M', 0, 0],
                zIndex: 1000,
                opacity: 0.3,
                lineWidth: 5,
                hidden: true,
                stroke: '#444'
            });
        }
        me.group = surface.getGroup(me.seriesId);
    },

    // @private Shrinks dataSets down to a smaller size
    shrink: function(xValues, yValues, size) {
        var len = xValues.length,
            ratio = Math.floor(len / size),
            i, j,
            xSum = 0,
            yCompLen = this.areas.length,
            ySum = [],
            xRes = [],
            yRes = [];
        //initialize array
        for (j = 0; j < yCompLen; ++j) {
            ySum[j] = 0;
        }
        for (i = 0; i < len; ++i) {
            xSum += xValues[i];
            for (j = 0; j < yCompLen; ++j) {
                ySum[j] += yValues[i][j];
            }
            if (i % ratio == 0) {
                //push averages
                xRes.push(xSum/ratio);
                for (j = 0; j < yCompLen; ++j) {
                    ySum[j] /= ratio;
                }
                yRes.push(ySum);
                //reset sum accumulators
                xSum = 0;
                for (j = 0, ySum = []; j < yCompLen; ++j) {
                    ySum[j] = 0;
                }
            }
        }
        return {
            x: xRes,
            y: yRes
        };
    },

    // @private Get chart and data boundaries
    getBounds: function() {
        var me = this,
            chart = me.chart,
            store = chart.substore || chart.store,
            areas = [].concat(me.yField),
            areasLen = areas.length,
            xValues = [],
            yValues = [],
            infinity = Infinity,
            minX = infinity,
            minY = infinity,
            maxX = -infinity,
            maxY = -infinity,
            math = Math,
            mmin = math.min,
            mmax = math.max,
            bbox, xScale, yScale, xValue, yValue, areaIndex, acumY, ln, sumValues, clipBox, areaElem;

        me.setBBox();
        bbox = me.bbox;

        store.each(function(record, i) {
            xValue = record.get(me.xField);
            yValue = [];
            if (typeof xValue != 'number') {
                xValue = i;
            }
            xValues.push(xValue);
            acumY = 0;
            for (areaIndex = 0; areaIndex < areasLen; areaIndex++) {
                areaElem = record.get(areas[areaIndex]);
                if (typeof areaElem == 'number') {
                    minY = mmin(minY, areaElem);
                    yValue.push(areaElem);
                    acumY += areaElem;
                }
            }
            minX = mmin(minX, xValue);
            maxX = mmax(maxX, xValue);
            maxY = mmax(maxY, acumY);
            yValues.push(yValue);
        }, me);

        xScale = bbox.width / (maxX - minX);
        yScale = bbox.height / (maxY - minY);

        ln = xValues.length;
        if ((ln > bbox.width) && me.areas) {
            sumValues = me.shrink(xValues, yValues, bbox.width);
            xValues = sumValues.x;
            yValues = sumValues.y;
        }

        return {
            bbox: bbox,
            minX: minX,
            minY: minY,
            xValues: xValues,
            yValues: yValues,
            xScale: xScale,
            yScale: yScale,
            areasLen: areasLen
        };
    },

    // @private Build an array of paths for the chart
    getPaths: function() {
        var me = this,
            chart = me.chart,
            store = chart.substore || chart.store,
            first = true,
            bounds = me.getBounds(),
            bbox = bounds.bbox,
            items = me.items = [],
            componentPaths = [],
            componentPath,
            paths = [],
            i, ln, x, y, xValue, yValue, acumY, areaIndex, prevAreaIndex, areaElem, path;

        ln = bounds.xValues.length;
        // Start the path
        for (i = 0; i < ln; i++) {
            xValue = bounds.xValues[i];
            yValue = bounds.yValues[i];
            x = bbox.x + (xValue - bounds.minX) * bounds.xScale;
            acumY = 0;
            for (areaIndex = 0; areaIndex < bounds.areasLen; areaIndex++) {
                // Excluded series
                if (me.__excludes[areaIndex]) {
                    continue;
                }
                if (!componentPaths[areaIndex]) {
                    componentPaths[areaIndex] = [];
                }
                areaElem = yValue[areaIndex];
                acumY += areaElem;
                y = bbox.y + bbox.height - (acumY - bounds.minY) * bounds.yScale;
                if (!paths[areaIndex]) {
                    paths[areaIndex] = ['M', x, y];
                    componentPaths[areaIndex].push(['L', x, y]);
                } else {
                    paths[areaIndex].push('L', x, y);
                    componentPaths[areaIndex].push(['L', x, y]);
                }
                if (!items[areaIndex]) {
                    items[areaIndex] = {
                        pointsUp: [],
                        pointsDown: [],
                        series: me
                    };
                }
                items[areaIndex].pointsUp.push([x, y]);
            }
        }
        
        // Close the paths
        for (areaIndex = 0; areaIndex < bounds.areasLen; areaIndex++) {
            // Excluded series
            if (me.__excludes[areaIndex]) {
                continue;
            }
            path = paths[areaIndex];
            // Close bottom path to the axis
            if (areaIndex == 0 || first) {
                first = false;
                path.push('L', x, bbox.y + bbox.height,
                          'L', bbox.x, bbox.y + bbox.height,
                          'Z');
            }
            // Close other paths to the one before them
            else {
                componentPath = componentPaths[prevAreaIndex];
                componentPath.reverse();
                path.push('L', x, componentPath[0][2]);
                for (i = 0; i < ln; i++) {
                    path.push(componentPath[i][0],
                              componentPath[i][1],
                              componentPath[i][2]);
                    items[areaIndex].pointsDown[ln -i -1] = [componentPath[i][1], componentPath[i][2]];
                }
                path.push('L', bbox.x, path[2], 'Z');
            }
            prevAreaIndex = areaIndex;
        }
        return {
            paths: paths,
            areasLen: bounds.areasLen
        };
    },

    /**
     * Draws the series for the current chart.
     */
    drawSeries: function() {
        var me = this,
            chart = me.chart,
            store = chart.substore || chart.store,
            surface = chart.surface,
            animate = chart.animate,
            group = me.group,
            endLineStyle = Ext.apply(me.seriesStyle, me.style),
            colorArrayStyle = me.colorArrayStyle,
            colorArrayLength = colorArrayStyle && colorArrayStyle.length || 0,
            areaIndex, areaElem, paths, path, rendererAttributes;

        me.unHighlightItem();
        me.cleanHighlights();

        if (!store || !store.getCount()) {
            return;
        }
        
        paths = me.getPaths();

        if (!me.areas) {
            me.areas = [];
        }

        for (areaIndex = 0; areaIndex < paths.areasLen; areaIndex++) {
            // Excluded series
            if (me.__excludes[areaIndex]) {
                continue;
            }
            if (!me.areas[areaIndex]) {
                me.items[areaIndex].sprite = me.areas[areaIndex] = surface.add(Ext.apply({}, {
                    type: 'path',
                    group: group,
                    // 'clip-rect': me.clipBox,
                    path: paths.paths[areaIndex],
                    stroke: endLineStyle.stroke || colorArrayStyle[areaIndex % colorArrayLength],
                    fill: colorArrayStyle[areaIndex % colorArrayLength]
                }, endLineStyle || {}));
            }
            areaElem = me.areas[areaIndex];
            path = paths.paths[areaIndex];
            if (animate) {
                //Add renderer to line. There is not a unique record associated with this.
                rendererAttributes = me.renderer(areaElem, false, { 
                    path: path,
                    // 'clip-rect': me.clipBox,
                    fill: colorArrayStyle[areaIndex % colorArrayLength],
                    stroke: endLineStyle.stroke || colorArrayStyle[areaIndex % colorArrayLength]
                }, areaIndex, store);
                //fill should not be used here but when drawing the special fill path object
                me.animation = me.onAnimate(areaElem, {
                    to: rendererAttributes
                });
            } else {
                rendererAttributes = me.renderer(areaElem, false, { 
                    path: path,
                    // 'clip-rect': me.clipBox,
                    hidden: false,
                    fill: colorArrayStyle[areaIndex % colorArrayLength],
                    stroke: endLineStyle.stroke || colorArrayStyle[areaIndex % colorArrayLength]
                }, areaIndex, store);
                me.areas[areaIndex].setAttributes(rendererAttributes, true);
            }
        }
        me.renderLabels();
        me.renderCallouts();
    },

    // @private
    onAnimate: function(sprite, attr) {
        sprite.show();
        //return this.callParent(arguments);
        var res = Ext.chart.series.Area.superclass.onAnimate.apply(this, arguments);
        return res;
    },

    // @private
    onCreateLabel: function(storeItem, item, i, display) {
        var me = this,
            group = me.labelsGroup,
            config = me.label,
            bbox = me.bbox,
            endLabelStyle = Ext.apply(config, me.seriesLabelStyle);

        return me.chart.surface.add(Ext.apply({
            'type': 'text',
            'text-anchor': 'middle',
            'group': group,
            'x': item.point[0],
            'y': bbox.y + bbox.height / 2
        }, endLabelStyle || {}));
    },

    // @private
    onPlaceLabel: function(label, storeItem, item, i, display, animate, index) {
        var me = this,
            chart = me.chart,
            resizing = chart.resizing,
            config = me.label,
            format = config.renderer,
            field = config.field,
            bbox = me.bbox,
            x = item.point[0],
            y = item.point[1],
            bb, width, height;
        
        label.setAttributes({
            text: format(storeItem.get(field[index])),
            hidden: true
        }, true);
        
        bb = label.getBBox();
        width = bb.width / 2;
        height = bb.height / 2;
        
        x = x - width < bbox.x? bbox.x + width : x;
        x = (x + width > bbox.x + bbox.width) ? (x - (x + width - bbox.x - bbox.width)) : x;
        y = y - height < bbox.y? bbox.y + height : y;
        y = (y + height > bbox.y + bbox.height) ? (y - (y + height - bbox.y - bbox.height)) : y;

        if (me.chart.animate && !me.chart.resizing) {
            label.show(true);
            me.onAnimate(label, {
                to: {
                    x: x,
                    y: y
                }
            });
        } else {
            label.setAttributes({
                x: x,
                y: y
            }, true);
            if (resizing) {
                me.animation.on('afteranimate', function() {
                    label.show(true);
                });
            } else {
                label.show(true);
            }
        }
    },

    // @private
    onPlaceCallout : function(callout, storeItem, item, i, display, animate, index) {
        var me = this,
            chart = me.chart,
            surface = chart.surface,
            resizing = chart.resizing,
            config = me.callouts,
            items = me.items,
            prev = (i == 0) ? false : items[i -1].point,
            next = (i == items.length -1) ? false : items[i +1].point,
            cur = item.point,
            dir, norm, normal, a, aprev, anext,
            bbox = callout.label.getBBox(),
            offsetFromViz = 30,
            offsetToSide = 10,
            offsetBox = 3,
            boxx, boxy, boxw, boxh,
            p, clipRect = me.clipRect,
            x, y;

        //get the right two points
        if (!prev) {
            prev = cur;
        }
        if (!next) {
            next = cur;
        }
        a = (next[1] - prev[1]) / (next[0] - prev[0]);
        aprev = (cur[1] - prev[1]) / (cur[0] - prev[0]);
        anext = (next[1] - cur[1]) / (next[0] - cur[0]);
        
        norm = Math.sqrt(1 + a * a);
        dir = [1 / norm, a / norm];
        normal = [-dir[1], dir[0]];
        
        //keep the label always on the outer part of the "elbow"
        if (aprev > 0 && anext < 0 && normal[1] < 0 || aprev < 0 && anext > 0 && normal[1] > 0) {
            normal[0] *= -1;
            normal[1] *= -1;
        } else if (Math.abs(aprev) < Math.abs(anext) && normal[0] < 0 || Math.abs(aprev) > Math.abs(anext) && normal[0] > 0) {
            normal[0] *= -1;
            normal[1] *= -1;
        }

        //position
        x = cur[0] + normal[0] * offsetFromViz;
        y = cur[1] + normal[1] * offsetFromViz;
        
        //box position and dimensions
        boxx = x + (normal[0] > 0? 0 : -(bbox.width + 2 * offsetBox));
        boxy = y - bbox.height /2 - offsetBox;
        boxw = bbox.width + 2 * offsetBox;
        boxh = bbox.height + 2 * offsetBox;
        
        //now check if we're out of bounds and invert the normal vector correspondingly
        //this may add new overlaps between labels (but labels won't be out of bounds).
        if (boxx < clipRect[0] || (boxx + boxw) > (clipRect[0] + clipRect[2])) {
            normal[0] *= -1;
        }
        if (boxy < clipRect[1] || (boxy + boxh) > (clipRect[1] + clipRect[3])) {
            normal[1] *= -1;
        }

        //update positions
        x = cur[0] + normal[0] * offsetFromViz;
        y = cur[1] + normal[1] * offsetFromViz;
        
        //update box position and dimensions
        boxx = x + (normal[0] > 0? 0 : -(bbox.width + 2 * offsetBox));
        boxy = y - bbox.height /2 - offsetBox;
        boxw = bbox.width + 2 * offsetBox;
        boxh = bbox.height + 2 * offsetBox;
        
        //set the line from the middle of the pie to the box.
        callout.lines.setAttributes({
            path: ["M", cur[0], cur[1], "L", x, y, "Z"]
        }, true);
        //set box position
        callout.box.setAttributes({
            x: boxx,
            y: boxy,
            width: boxw,
            height: boxh
        }, true);
        //set text position
        callout.label.setAttributes({
            x: x + (normal[0] > 0? offsetBox : -(bbox.width + offsetBox)),
            y: y
        }, true);
        for (p in callout) {
            callout[p].show(true);
        }
    },
    
    isItemInPoint: function(x, y, item, i) {
        var me = this,
            pointsUp = item.pointsUp,
            pointsDown = item.pointsDown,
            abs = Math.abs,
            dist = Infinity, p, pln, point;
        
        for (p = 0, pln = pointsUp.length; p < pln; p++) {
            point = [pointsUp[p][0], pointsUp[p][1]];
            if (dist > abs(x - point[0])) {
                dist = abs(x - point[0]);
            } else {
                point = pointsUp[p -1];
                if (y >= point[1] && (!pointsDown.length || y <= (pointsDown[p -1][1]))) {
                    item.storeIndex = p -1;
                    item.storeField = me.yField[i];
                    item.storeItem = me.chart.store.getAt(p -1);
                    item._points = pointsDown.length? [point, pointsDown[p -1]] : [point];
                    return true;
                } else {
                    break;
                }
            }
        }
        return false;
    },

    /**
     * Highlight this entire series.
     * @param {Object} item Info about the item; same format as returned by #getItemForPoint.
     */
    highlightSeries: function() {
        var area, to, fillColor;
        if (this._index !== undefined) {
            area = this.areas[this._index];
            if (area.__highlightAnim) {
                area.__highlightAnim.paused = true;
            }
            area.__highlighted = true;
            area.__prevOpacity = area.__prevOpacity || area.attr.opacity || 1;
            area.__prevFill = area.__prevFill || area.attr.fill;
            area.__prevLineWidth = area.__prevLineWidth || area.attr.lineWidth;
            fillColor = Ext.draw.Color.fromString(area.__prevFill);
            to = {
                lineWidth: (area.__prevLineWidth || 0) + 2
            };
            if (fillColor) {
                to.fill = fillColor.getLighter(0.2).toString();
            }
            else {
                to.opacity = Math.max(area.__prevOpacity - 0.3, 0);
            }
            if (this.chart.animate) {
                area.__highlightAnim = new Ext.fx.Anim(Ext.apply({
                    target: area,
                    to: to
                }, this.chart.animate));
            }
            else {
                area.setAttributes(to, true);
            }
        }
    },

    /**
     * UnHighlight this entire series.
     * @param {Object} item Info about the item; same format as returned by #getItemForPoint.
     */
    unHighlightSeries: function() {
        var area;
        if (this._index !== undefined) {
            area = this.areas[this._index];
            if (area.__highlightAnim) {
                area.__highlightAnim.paused = true;
            }
            if (area.__highlighted) {
                area.__highlighted = false;
                area.__highlightAnim = new Ext.fx.Anim({
                    target: area,
                    to: {
                        fill: area.__prevFill,
                        opacity: area.__prevOpacity,
                        lineWidth: area.__prevLineWidth
                    }
                });
            }
        }
    },

    /**
     * Highlight the specified item. If no item is provided the whole series will be highlighted.
     * @param item {Object} Info about the item; same format as returned by #getItemForPoint
     */
    highlightItem: function(item) {
        var me = this,
            points, path;
        if (!item) {
            this.highlightSeries();
            return;
        }
        points = item._points;
        path = points.length == 2? ['M', points[0][0], points[0][1], 'L', points[1][0], points[1][1]]
                : ['M', points[0][0], points[0][1], 'L', points[0][0], me.bbox.y + me.bbox.height];
        me.highlightSprite.setAttributes({
            path: path,
            hidden: false
        }, true);
    },

    /**
     * un-highlights the specified item. If no item is provided it will un-highlight the entire series.
     * @param item {Object} Info about the item; same format as returned by #getItemForPoint
     */
    unHighlightItem: function(item) {
        if (!item) {
            this.unHighlightSeries();
        }

        if (this.highlightSprite) {
            this.highlightSprite.hide(true);
        }
    },

    // @private
    hideAll: function() {
        if (!isNaN(this._index)) {
            this.__excludes[this._index] = true;
            this.areas[this._index].hide(true);
            this.drawSeries();
        }
    },

    // @private
    showAll: function() {
        if (!isNaN(this._index)) {
            this.__excludes[this._index] = false;
            this.areas[this._index].show(true);
            this.drawSeries();
        }
    },

    /**
     * Returns the color of the series (to be displayed as color for the series legend item).
     * @param item {Object} Info about the item; same format as returned by #getItemForPoint
     */
    getLegendColor: function(index) {
        var me = this;
        return me.colorArrayStyle[index % me.colorArrayStyle.length];
    }
});
/**
 * @class Ext.chart.series.Bar
 * @extends Ext.chart.series.Cartesian
 * 
  <p> 
   Creates a Bar Chart. A Bar Chart is a useful visualization technique to display quantitative information for different 
   categories that can show some progression (or regression) in the dataset.
   As with all other series, the Bar Series must be appended in the *series* Chart array configuration. See the Chart 
   documentation for more information. A typical configuration object for the bar series could be:
  </p>
  
  <pre><code>
    series: [{
        type: 'bar',
        axis: 'bottom',
        xField: 'name',
        yField: 'data1',
        highlight: true,
        label: {
            display: 'insideEnd',
            field: 'data1',
            renderer: Ext.util.Format.numberRenderer('0'),
            orientation: 'horizontal',
            color: '#333',
           'text-anchor': 'middle'
        }
    }]
   </code></pre>
 
  
   <p>
    In this configuration we set `bar` as the series type, bind the values of the bar to the bottom axis and set the xField or category field to 
    the `name` parameter of the store. We also set `highlight` to true which enables smooth animations when bars are hovered. We also set some configuration
    for the bar labels to be displayed inside the bar, to display the information found in the `data1` property of each element store, to render a 
    formated text with the `Ext.util.Format` we pass in, to have an `horizontal` orientation (as opposed to a vertical one) and we also set other styles 
    like `color`, `text-anchor`, etc.
   </p>
 */
Ext.chart.series.Bar = Ext.extend(Ext.chart.series.Cartesian, {

    //requires: ['Ext.chart.axis.Axis', 'Ext.fx.Anim'],

    type: 'bar',

    /**
     * @cfg {Boolean} column
     * Whether to set the visualization as column chart or horizontal bar chart.
     */
    column: false,
    
    /**
     * @cfg {Object} style
     * Style properties that will override the theming series styles.
     */
    style: {},
    
    /**
     * @cfg {Number} gutter
     * The gutter space between single bars, as a percentage of the bar width
     */
    gutter: 38.2,

    /**
     * @cfg {Number} groupGutter
     * The gutter space between groups of bars, as a percentage of the bar width
     */
    groupGutter: 38.2,

    /**
     * @cfg {Number} xpadding
     * Padding between the left/right axes and the bars
     */
    xpadding: 0,

    /**
     * @cfg {Number} ypadding
     * Padding between the top/bottom axes and the bars
     */
    ypadding: 10,

    constructor: function(config) {
        //this.callParent(arguments);
        Ext.chart.series.Bar.superclass.constructor.apply(this, arguments);
        var me = this,
            surface = me.chart.surface,
            shadow = me.chart.shadow,
            i, l;
        Ext.apply(me, config, {
            highlightCfg: {
                lineWidth: 3,
                stroke: '#55c',
                opacity: 0.8,
                color: '#f00'
            },
            
            shadowAttributes: [{
                "stroke-width": 6,
                "stroke-opacity": 0.05,
                stroke: 'rgb(200, 200, 200)',
                translate: {
                    x: 1.2,
                    y: 1.2
                }
            }, {
                "stroke-width": 4,
                "stroke-opacity": 0.1,
                stroke: 'rgb(150, 150, 150)',
                translate: {
                    x: 0.9,
                    y: 0.9
                }
            }, {
                "stroke-width": 2,
                "stroke-opacity": 0.15,
                stroke: 'rgb(100, 100, 100)',
                translate: {
                    x: 0.6,
                    y: 0.6
                }
            }]
        });
        me.group = surface.getGroup(me.seriesId + '-bars');
        if (shadow) {
            for (i = 0, l = me.shadowAttributes.length; i < l; i++) {
                me.shadowGroups.push(surface.getGroup(me.seriesId + '-shadows' + i));
            }
        }
    },

    // @private sets the bar girth.
    getBarGirth: function() {
        var me = this,
            store = me.chart.store,
            column = me.column,
            ln = store.getCount(),
            gutter = me.gutter / 100;
        
        return (me.chart.chartBBox[column ? 'width' : 'height'] - me[column ? 'xpadding' : 'ypadding'] * 2) / (ln * (gutter + 1) - gutter);
    },

    // @private returns the gutters.
    getGutters: function() {
        var me = this,
            column = me.column,
            gutter = Math.ceil(me[column ? 'xpadding' : 'ypadding'] + me.getBarGirth() / 2);
        return me.column ? [gutter, 0] : [0, gutter];
    },

    // @private Get chart and data boundaries
    getBounds: function() {
        var me = this,
            chart = me.chart,
            store = chart.substore || chart.store,
            bars = [].concat(me.yField),
            barsLen = bars.length,
            groupBarsLen = barsLen,
            groupGutter = me.groupGutter / 100,
            column = me.column,
            xpadding = me.xpadding,
            ypadding = me.ypadding,
            stacked = me.stacked,
            barWidth = me.getBarGirth(),
            math = Math,
            mmax = math.max,
            mabs = math.abs,
            groupBarWidth, bbox, minY, maxY, axis, scale, zero, total, rec, j, plus, minus;

        me.setBBox(true);
        bbox = me.bbox;

        //Skip excluded series
        if (me.__excludes) {
            for (j = 0, total = me.__excludes.length; j < total; j++) {
                if (me.__excludes[j]) {
                    groupBarsLen--;
                }
            }
        }

        if (me.axis) {
            axis = chart.axes.get(me.axis);
            if (axis) {
                minY = axis.from;
                maxY = mmax(axis.to, 0);
            }
        }
        if (me.yField && !Ext.isNumber(minY)) {
            axis = new Ext.chart.axis.Axis({
                chart: chart,
                fields: [].concat(me.yField)
            }).calcEnds();
            minY = axis.from;
            maxY = mmax(axis.to, 0);
        }
        if (!Ext.isNumber(minY)) {
            minY = 0;
        }
        if (!Ext.isNumber(maxY)) {
            maxY = 0;
        }

        scale = (column ? bbox.height - ypadding * 2 : bbox.width - xpadding * 2) / (maxY - minY);
        groupBarWidth = barWidth / ((stacked ? 1 : groupBarsLen) * (groupGutter + 1) - groupGutter);
        zero = (column) ? bbox.y + bbox.height - ypadding : bbox.x + xpadding;

        if (stacked) {
            total = [[], []];
            store.each(function(record, i) {
                total[0][i] = total[0][i] || 0;
                total[1][i] = total[1][i] || 0;
                for (j = 0; j < barsLen; j++) {
                    if (me.__excludes && me.__excludes[j]) {
                        continue;
                    }
                    rec = record.get(bars[j]);
                    total[+(rec > 0)][i] += mabs(rec);
                }
            });
            plus = mmax.apply(math, total[0]);
            minus = mmax.apply(math, total[1]);
            scale = (column ? bbox.height - ypadding * 2 : bbox.width - xpadding * 2) / (plus + minus);
            zero = zero + plus * scale * (column ? -1 : 1);
        }
        else if (minY / maxY < 0) {
            zero = zero - minY * scale * (column ? -1 : 1);
        }
        return {
            bars: bars,
            bbox: bbox,
            barsLen: barsLen,
            groupBarsLen: groupBarsLen,
            barWidth: barWidth,
            groupBarWidth: groupBarWidth,
            scale: scale,
            zero: zero,
            xpadding: xpadding,
            ypadding: ypadding,
            signed: minY / maxY < 0,
            minY: minY,
            maxY: maxY
        };
    },

    // @private Build an array of paths for the chart
    getPaths: function() {
        var me = this,
            chart = me.chart,
            store = chart.substore || chart.store,
            bounds = me.bounds = me.getBounds(),
            items = me.items = [],
            gutter = me.gutter / 100,
            groupGutter = me.groupGutter / 100,
            animate = chart.animate,
            column = me.column,
            group = me.group,
            enableShadows = chart.shadow,
            shadowGroups = me.shadowGroups,
            shadowAttributes = me.shadowAttributes,
            shadowGroupsLn = shadowGroups.length,
            bbox = bounds.bbox,
            xpadding = me.xpadding,
            ypadding = me.ypadding,
            stacked = me.stacked,
            barsLen = bounds.barsLen,
            colors = me.colorArrayStyle,
            colorLength = colors && colors.length || 0,
            math = Math,
            mmax = math.max,
            mmin = math.min,
            mabs = math.abs,
            j, yValue, height, totalDim, totalNegDim, bottom, top, hasShadow, barAttr, attrs, counter,
            shadowIndex, shadow, sprite, offset;

        store.each(function(record, i, total) {
            bottom = bounds.zero;
            top = bounds.zero;
            totalDim = 0;
            totalNegDim = 0;
            hasShadow = false; 
            for (j = 0, counter = 0; j < barsLen; j++) {
                // Excluded series
                if (me.__excludes && me.__excludes[j]) {
                    continue;
                }
                yValue = record.get(bounds.bars[j]);
                height = Math.round((yValue - ((bounds.minY < 0) ? 0 : bounds.minY)) * bounds.scale);
                barAttr = {
                    fill: colors[(barsLen > 1 ? j : 0) % colorLength]
                };
                if (column) {
                    Ext.apply(barAttr, {
                        height: height,
                        width: mmax(bounds.groupBarWidth, 0),
                        x: (bbox.x + xpadding + i * bounds.barWidth * (1 + gutter) + counter * bounds.groupBarWidth * (1 + groupGutter) * !stacked),
                        y: bottom - height
                    });
                }
                else {
                    // draw in reverse order
                    offset = (total - 1) - i;
                    Ext.apply(barAttr, {
                        height: mmax(bounds.groupBarWidth, 0),
                        width: height + (bottom == bounds.zero),
                        x: bottom + (bottom != bounds.zero),
                        y: (bbox.y + ypadding + offset * bounds.barWidth * (1 + gutter) + counter * bounds.groupBarWidth * (1 + groupGutter) * !stacked + 1)
                    });
                }
                if (height < 0) {
                    if (column) {
                        barAttr.y = top;
                        barAttr.height = mabs(height);
                    } else {
                        barAttr.x = top + height;
                        barAttr.width = mabs(height);
                    }
                }
                if (stacked) {
                    if (height < 0) {
                        top += height * (column ? -1 : 1);
                    } else {
                        bottom += height * (column ? -1 : 1);
                    }
                    totalDim += mabs(height);
                    if (height < 0) {
                        totalNegDim += mabs(height);
                    }
                }
                barAttr.x = Math.round(barAttr.x) + 1;
                barAttr.y = Math.round(barAttr.y);
                barAttr.width = Math.floor(barAttr.width);
                barAttr.height = Math.floor(barAttr.height);
                items.push({
                    series: me,
                    storeItem: record,
                    value: [record.get(me.xField), yValue],
                    attr: barAttr,
                    point: column ? [barAttr.x + barAttr.width / 2, yValue >= 0 ? barAttr.y : barAttr.y + barAttr.height] :
                                    [yValue >= 0 ? barAttr.x + barAttr.width : barAttr.x, barAttr.y + barAttr.height / 2]
                });
                // When resizing, reset before animating
                if (animate && chart.resizing) {
                    attrs = column ? {
                        x: barAttr.x,
                        y: bounds.zero,
                        width: barAttr.width,
                        height: 0
                    } : {
                        x: bounds.zero,
                        y: barAttr.y,
                        width: 0,
                        height: barAttr.height
                    };
                    if (enableShadows && (stacked && !hasShadow || !stacked)) {
                        hasShadow = true;
                        //update shadows
                        for (shadowIndex = 0; shadowIndex < shadowGroupsLn; shadowIndex++) {
                            shadow = shadowGroups[shadowIndex].getAt(stacked ? i : (i * barsLen + j));
                            if (shadow) {
                                shadow.setAttributes(attrs, true);
                            }
                        }
                    }
                    //update sprite position and width/height
                    sprite = group.getAt(i * barsLen + j);
                    if (sprite) {
                        sprite.setAttributes(attrs, true);
                    }
                }
                counter++;
            }
            if (stacked && items.length) {
                items[i * counter].totalDim = totalDim;
                items[i * counter].totalNegDim = totalNegDim;
            }
        }, me);
    },

    // @private render/setAttributes on the shadows
    renderShadows: function(i, barAttr, baseAttrs, bounds) {
        var me = this,
            chart = me.chart,
            surface = chart.surface,
            animate = chart.animate,
            stacked = me.stacked,
            shadowGroups = me.shadowGroups,
            shadowAttributes = me.shadowAttributes,
            shadowGroupsLn = shadowGroups.length,
            store = chart.substore || chart.store,
            column = me.column,
            items = me.items,
            shadows = [],
            zero = bounds.zero,
            shadowIndex, shadowBarAttr, shadow, totalDim, totalNegDim, j, rendererAttributes;

        if ((stacked && (i % bounds.groupBarsLen === 0)) || !stacked) {
            j = i / bounds.groupBarsLen;
            //create shadows
            for (shadowIndex = 0; shadowIndex < shadowGroupsLn; shadowIndex++) {
                shadowBarAttr = Ext.apply({}, shadowAttributes[shadowIndex]);
                shadow = shadowGroups[shadowIndex].getAt(stacked ? j : i);
                Ext.copyTo(shadowBarAttr, barAttr, 'x,y,width,height');
                if (!shadow) {
                    shadow = surface.add(Ext.apply({
                        type: 'rect',
                        group: shadowGroups[shadowIndex]
                    }, Ext.apply({}, baseAttrs, shadowBarAttr)));
                }
                if (stacked) {
                    totalDim = items[i].totalDim;
                    totalNegDim = items[i].totalNegDim;
                    if (column) {
                        shadowBarAttr.y = zero - totalNegDim;
                        shadowBarAttr.height = totalDim;
                    }
                    else {
                        shadowBarAttr.x = zero - totalNegDim;
                        shadowBarAttr.width = totalDim;
                    }
                }
                if (animate) {
                    if (!stacked) {
                        rendererAttributes = me.renderer(shadow, store.getAt(j), shadowBarAttr, i, store);
                        me.onAnimate(shadow, { to: rendererAttributes });
                    }
                    else {
                        rendererAttributes = me.renderer(shadow, store.getAt(j), Ext.apply(shadowBarAttr, { hidden: true }), i, store);
                        shadow.setAttributes(rendererAttributes, true);
                    }
                }
                else {
                    rendererAttributes = me.renderer(shadow, store.getAt(j), Ext.apply(shadowBarAttr, { hidden: false }), i, store);
                    shadow.setAttributes(rendererAttributes, true);
                }
                shadows.push(shadow);
            }
        }
        return shadows;
    },

    /**
     * Draws the series for the current chart.
     */
    drawSeries: function() {
        var me = this,
            chart = me.chart,
            store = chart.substore || chart.store,
            surface = chart.surface,
            animate = chart.animate,
            stacked = me.stacked,
            column = me.column,
            enableShadows = chart.shadow,
            shadowGroups = me.shadowGroups,
            shadowGroupsLn = shadowGroups.length,
            group = me.group,
            seriesStyle = me.seriesStyle,
            items, ln, i, j, baseAttrs, sprite, rendererAttributes, shadowIndex, shadowGroup,
            bounds, endSeriesStyle, barAttr, attrs, anim;
        
        if (!store || !store.getCount()) {
            return;
        }
        
        //fill colors are taken from the colors array.
        delete seriesStyle.fill;
        endSeriesStyle = Ext.apply(seriesStyle, this.style);
        me.unHighlightItem();
        me.cleanHighlights();

        me.getPaths();
        bounds = me.bounds;
        items = me.items;

        baseAttrs = column ? {
            y: bounds.zero,
            height: 0
        } : {
            x: bounds.zero,
            width: 0
        };
        ln = items.length;
        // Create new or reuse sprites and animate/display
        for (i = 0; i < ln; i++) {
            sprite = group.getAt(i);
            barAttr = items[i].attr;

            if (enableShadows) {
                items[i].shadows = me.renderShadows(i, barAttr, baseAttrs, bounds);
            }

            // Create a new sprite if needed (no height)
            if (!sprite) {
                attrs = Ext.apply({}, baseAttrs, barAttr);
                attrs = Ext.apply(attrs, endSeriesStyle || {});
                sprite = surface.add(Ext.apply({}, {
                    type: 'rect',
                    group: group
                }, attrs));
            }
            if (animate) {
                rendererAttributes = me.renderer(sprite, store.getAt(i), barAttr, i, store);
                sprite._to = rendererAttributes;
                anim = me.onAnimate(sprite, { to: Ext.apply(rendererAttributes, endSeriesStyle) });
                if (enableShadows && stacked && (i % bounds.barsLen === 0)) {
                    j = i / bounds.barsLen;
                    for (shadowIndex = 0; shadowIndex < shadowGroupsLn; shadowIndex++) {
                        anim.on('afteranimate', function() {
                            this.show(true);
                        }, shadowGroups[shadowIndex].getAt(j));
                    }
                }
            }
            else {
                rendererAttributes = me.renderer(sprite, store.getAt(i), Ext.apply(barAttr, { hidden: false }), i, store);
                sprite.setAttributes(Ext.apply(rendererAttributes, endSeriesStyle), true);
            }
            items[i].sprite = sprite;
        }

        // Hide unused sprites
        ln = group.getCount();
        for (j = i; j < ln; j++) {
            group.getAt(j).hide(true);
        }
        // Hide unused shadows
        if (enableShadows) {
            for (shadowIndex = 0; shadowIndex < shadowGroupsLn; shadowIndex++) {
                shadowGroup = shadowGroups[shadowIndex];
                ln = shadowGroup.getCount();
                for (j = i; j < ln; j++) {
                    shadowGroup.getAt(j).hide(true);
                }
            }
        }
        me.renderLabels();
    },
    
    // @private handled when creating a label.
    onCreateLabel: function(storeItem, item, i, display) {
        var me = this,
            surface = me.chart.surface,
            group = me.labelsGroup,
            config = me.label,
            endLabelStyle = Ext.apply({}, config, me.seriesLabelStyle || {}),
            sprite;
        return surface.add(Ext.apply({
            type: 'text',
            group: group
        }, endLabelStyle || {}));
    },
    
    // @private callback used when placing a label.
    onPlaceLabel: function(label, storeItem, item, i, display, animate, index) {
        // Determine the label's final position. Starts with the configured preferred value but
        // may get flipped from inside to outside or vice-versa depending on space.
        var me = this,
            opt = me.bounds,
            groupBarWidth = opt.groupBarWidth,
            column = me.column,
            chart = me.chart,
            chartBBox = chart.chartBBox,
            resizing = chart.resizing,
            xValue = item.value[0],
            yValue = item.value[1],
            attr = item.attr,
            config = me.label,
            rotate = config.orientation == 'vertical',
            field = [].concat(config.field),
            format = config.renderer,
            text = format(storeItem.get(field[index])),
            size = me.getLabelSize(text),
            width = size.width,
            height = size.height,
            zero = opt.zero,
            outside = 'outside',
            insideStart = 'insideStart',
            insideEnd = 'insideEnd',
            offsetX = 10,
            offsetY = 6,
            signed = opt.signed,
            x, y, finalAttr;

        label.setAttributes({
            text: text
        });

        if (column) {
            if (display == outside) {
                if (height + offsetY + attr.height > (yValue >= 0 ? zero - chartBBox.y : chartBBox.y + chartBBox.height - zero)) {
                    display = insideEnd;
                }
            } else {
                if (height + offsetY > attr.height) {
                    display = outside;
                }
            }
            x = attr.x + groupBarWidth / 2;
            y = display == insideStart ?
                    (zero + ((height / 2 + 3) * (yValue >= 0 ? -1 : 1))) :
                    (yValue >= 0 ? (attr.y + ((height / 2 + 3) * (display == outside ? -1 : 1))) :
                                   (attr.y + attr.height + ((height / 2 + 3) * (display === outside ? 1 : -1))));
        }
        else {
            if (display == outside) {
                if (width + offsetX + attr.width > (yValue >= 0 ? chartBBox.x + chartBBox.width - zero : zero - chartBBox.x)) {
                    display = insideEnd;
                }
            }
            else {
                if (width + offsetX > attr.width) {
                    display = outside;
                }
            }
            x = display == insideStart ?
                (zero + ((width / 2 + 5) * (yValue >= 0 ? 1 : -1))) :
                (yValue >= 0 ? (attr.x + attr.width + ((width / 2 + 5) * (display === outside ? 1 : -1))) :
                (attr.x + ((width / 2 + 5) * (display === outside ? -1 : 1))));
            y = attr.y + groupBarWidth / 2;
        }
        //set position
        finalAttr = {
            x: x,
            y: y
        };
        //rotate
        if (rotate) {
            finalAttr.rotate = {
                x: x,
                y: y,
                degrees: 270
            };
        }
        //check for resizing
        if (animate && resizing) {
            if (column) {
                x = attr.x + attr.width / 2;
                y = zero;
            } else {
                x = zero;
                y = attr.y + attr.height / 2;
            }
            label.setAttributes({
                x: x,
                y: y
            }, true);
            if (rotate) {
                label.setAttributes({
                    rotate: {
                        x: x,
                        y: y,
                        degrees: 270
                    }
                }, true);
            }
        }
        //handle animation
        if (animate) {
            me.onAnimate(label, { to: finalAttr });
        }
        else {
            label.setAttributes(Ext.apply(finalAttr, {
                hidden: false
            }), true);
        }
    },

    /* @private
     * Gets the dimensions of a given bar label. Uses a single hidden sprite to avoid
     * changing visible sprites.
     * @param value
     */
    getLabelSize: function(value) {
        var tester = this.testerLabel,
            config = this.label,
            endLabelStyle = Ext.apply({}, config, this.seriesLabelStyle || {}),
            rotated = config.orientation === 'vertical',
            bbox, w, h,
            undef;
        if (!tester) {
            tester = this.testerLabel = this.chart.surface.add(Ext.apply({
                type: 'text',
                opacity: 0
            }, endLabelStyle));
        }
        tester.setAttributes({
            text: value
        }, true);

        // Flip the width/height if rotated, as getBBox returns the pre-rotated dimensions
        bbox = tester.getBBox();
        w = bbox.width;
        h = bbox.height;
        return {
            width: rotated ? h : w,
            height: rotated ? w : h
        };
    },

    // @private used to animate label, markers and other sprites.
    onAnimate: function(sprite, attr) {
        sprite.show();
        // return this.callParent(arguments);
        var res = Ext.chart.series.Bar.superclass.onAnimate.apply(this, arguments);
        return res;
    },
    
    isItemInPoint: function(x, y, item) {
        var bbox = item.sprite.getBBox();
        return bbox.x <= x && bbox.y <= y
            && (bbox.x + bbox.width) >= x
            && (bbox.y + bbox.height) >= y;
    },
    
    // @private hide all markers
    hideAll: function() {
        var axes = this.chart.axes;
        if (!isNaN(this._index)) {
            if (!this.__excludes) {
                this.__excludes = [];
            }
            this.__excludes[this._index] = true;
            this.drawSeries();
            axes.each(function(axis) {
                axis.drawAxis();
            });
        }
    },

    // @private show all markers
    showAll: function() {
        var axes = this.chart.axes;
        if (!isNaN(this._index)) {
            if (!this.__excludes) {
                this.__excludes = [];
            }
            this.__excludes[this._index] = false;
            this.drawSeries();
            axes.each(function(axis) {
                axis.drawAxis();
            });
        }
    },
    
    /**
     * Returns a string with the color to be used for the series legend item. 
     */
    getLegendColor: function(index) {
        var me = this;
        return me.colorArrayStyle[index % me.colorArrayStyle.length];
    }
});/**
 * @class Ext.chart.series.Column
 * @extends Ext.chart.series.Bar
 * 
  <p>
  Creates a Column Chart. Much of the methods are inherited from Bar. A Column Chart is a useful visualization technique to display quantitative information for different 
  categories that can show some progression (or regression) in the data set.
  As with all other series, the Column Series must be appended in the *series* Chart array configuration. See the Chart 
  documentation for more information. A typical configuration object for the column series could be:
  </p>
  
  <pre><code>
    series: [{
        type: 'column',
        axis: 'bottom',
        highlight: true,
        xField: 'name',
        yField: 'data1'
    }]
   </code></pre>
 
  <p>
  In this configuration we set `column` as the series type, bind the values of the bars to the bottom axis, set `highlight` to true so that bars are smoothly highlighted
  when hovered and bind the `xField` or category field to the data store `name` property and the `yField` as the data1 property of a store element. 
  </p>
 */

Ext.chart.series.Column = Ext.extend(Ext.chart.series.Bar, {

    type: 'column',
    column: true,

    /**
     * @cfg {Number} xpadding
     * Padding between the left/right axes and the bars
     */
    xpadding: 10,

    /**
     * @cfg {Number} ypadding
     * Padding between the top/bottom axes and the bars
     */
    ypadding: 0,
    
    constructor: function(config) {
        //this.callParent(arguments);
        Ext.chart.series.Column.superclass.constructor.apply(this, arguments);
    }
});/**
 * @class Ext.chart.series.Line
 * @extends Ext.chart.series.Cartesian
 * 
 <p> 
  Creates a Line Chart. A Line Chart is a useful visualization technique to display quantitative information for different 
  categories or other real values (as opposed to the bar chart), that can show some progression (or regression) in the dataset.
  As with all other series, the Line Series must be appended in the *series* Chart array configuration. See the Chart 
  documentation for more information. A typical configuration object for the line series could be:
 </p>
  
  <pre><code>
    series: [{
        type: 'line',
        highlight: {
            size: 7,
            radius: 7
        },
        axis: 'left',
        xField: 'name',
        yField: 'data1',
        markerCfg: {
            type: 'cross',
            size: 4,
            radius: 4,
            'stroke-width': 0
        }
    }, {
        type: 'line',
        highlight: {
            size: 7,
            radius: 7
        },
        axis: 'left',
        fill: true,
        xField: 'name',
        yField: 'data3',
        markerCfg: {
            type: 'circle',
            size: 4,
            radius: 4,
            'stroke-width': 0
        }
    }]
   </code></pre>
 
 <p> 
  In this configuration we're adding two series (or lines), one bound to the `data1` property of the store and the other to `data3`. The type for both configurations is 
  `line`. The `xField` for both series is the same, the name propert of the store. Both line series share the same axis, the left axis. You can set particular marker 
  configuration by adding properties onto the markerCfg object. Both series have an object as highlight so that markers animate smoothly to the properties in highlight 
  when hovered. The second series has `fill=true` which means that the line will also have an area below it of the same color.
 </p>
 */

Ext.chart.series.Line = Ext.extend(Ext.chart.series.Cartesian, {

    //requires: ['Ext.chart.axis.Axis', 'Ext.chart.Shapes', 'Ext.draw.Draw', 'Ext.fx.Anim'],

    type: 'line',

    /**
     * @cfg {Number} selectionTolerance
     * The offset distance from the cursor position to the line series to trigger events (then used for highlighting series, etc).
     */
    selectionTolerance: 20,
    
    /**
     * @cfg {Boolean} showMarkers
     * Whether markers should be displayed at the date points along the line. If true,
     * then the {@link #markerCfg} config item will determine the markers' styling.
     */
    showMarkers: true,

    /**
     * @cfg {Object} markerCfg
     * The display style for the markers. Only used if {@link #showMarkers} is true.
     */
    markerCfg: {},

    /**
     * @cfg {Object} style
     * An object containing styles for the visualization lines. These styles will override the theme styles. 
     * Some options contained within the style object will are described next.
     */
    style: {},
    
    /**
     * @cfg {String} dash
     * Optional dash array for the line.
     */
    dash: '',

    /**
     * @cfg {Boolean} smooth
     * If true, the line will be smoothed/rounded around its points, otherwise straight line
     * segments will be drawn. Defaults to false.
     */
    //smooth: false,

    /**
     * @cfg {Boolean} fill
     * If true, the area below the line will be filled in using the {@link #style.eefill} and
     * {@link #style.opacity} config properties. Defaults to false.
     */
    fill: false,

    constructor: function(config) {
        //this.callParent(arguments);
        Ext.chart.series.Line.superclass.constructor.apply(this, arguments);
        var me = this,
            surface = me.chart.surface,
            shadow = me.chart.shadow,
            i, l;
        Ext.apply(me, config, {
            highlightCfg: {
                lineWidth: 3
            },
            shadowAttributes: [{
                "stroke-width": 6,
                "stroke-opacity": 0.05,
                stroke: 'rgb(0, 0, 0)',
                translate: {
                    x: 1,
                    y: 1
                }
            }, {
                "stroke-width": 4,
                "stroke-opacity": 0.1,
                stroke: 'rgb(0, 0, 0)',
                translate: {
                    x: 1,
                    y: 1
                }
            }, {
                "stroke-width": 2,
                "stroke-opacity": 0.15,
                stroke: 'rgb(0, 0, 0)',
                translate: {
                    x: 1,
                    y: 1
                }
            }]
        });
        me.group = surface.getGroup(me.seriesId);
        if (me.showMarkers) {
            me.markerGroup = surface.getGroup(me.seriesId + '-markers');
        }
        if (shadow) {
            for (i = 0, l = this.shadowAttributes.length; i < l; i++) {
                me.shadowGroups.push(surface.getGroup(me.seriesId + '-shadows' + i));
            }
        }
    },
    
    // @private makes an average of points when there are more data points than pixels to be rendered.
    shrink: function(xValues, yValues, size) {
        // Start at the 2nd point...
        var len = xValues.length,
            ratio = Math.floor(len / size),
            i = 1,
            xSum = 0,
            ySum = 0,
            xRes = [xValues[0]],
            yRes = [yValues[0]];
        
        for (; i < len; ++i) {
            xSum += xValues[i] || 0;
            ySum += yValues[i] || 0;
            if (i % ratio == 0) {
                xRes.push(xSum/ratio);
                yRes.push(ySum/ratio);
                xSum = 0;
                ySum = 0;
            }
        }
        return {
            x: xRes,
            y: yRes
        };
    },

    /**
     * Draws the series for the current chart.
     */
    drawSeries: function() {
        var me = this,
            chart = me.chart,
            store = chart.substore || chart.store,
            surface = chart.surface,
            chartBBox = chart.chartBBox,
            bbox = {},
            group = me.group,
            gutterX = chart.maxGutter[0],
            gutterY = chart.maxGutter[1],
            showMarkers = me.showMarkers,
            markerGroup = me.markerGroup,
            enableShadows = chart.shadow,
            shadowGroups = me.shadowGroups,
            shadowAttributes = this.shadowAttributes,
            lnsh = shadowGroups.length,
            dummyPath = ["M"],
            path = ["M"],
            markerIndex = chart.markerIndex,
            axes = [].concat(me.axis),
            shadowGroup,
            shadowBarAttr,
            xValues = [],
            yValues = [],
            onbreak = false,
            markerStyle = me.markerStyle,
            seriesStyle = me.seriesStyle,
            seriesLabelStyle = me.seriesLabelStyle,
            colorArrayStyle = me.colorArrayStyle,
            colorArrayLength = colorArrayStyle && colorArrayStyle.length || 0,
            seriesIdx = me.seriesIdx, shadows, shadow, shindex, fromPath, fill, fillPath, rendererAttributes,
            x, y, prevX, prevY, firstY, markerCount, i, j, ln, axis, ends, marker, markerAux, item, xValue,
            yValue, coords, xScale, yScale, minX, maxX, minY, maxY, line, animation, endMarkerStyle,
            endLineStyle, type, props, firstMarker;

        //if store is empty then there's nothing to draw.
        if (!store || !store.getCount()) {
            return;
        }
        
        //prepare style objects for line and markers
        endMarkerStyle = Ext.apply(markerStyle, me.markerCfg);
        type = endMarkerStyle.type;
        delete endMarkerStyle.type;
        endLineStyle = Ext.apply(seriesStyle, me.style);
        //if no stroke with is specified force it to 0.5 because this is
        //about making *lines*
        if (!endLineStyle['stroke-width']) {
            endLineStyle['stroke-width'] = 0.5;
        }
        //If we're using a time axis and we need to translate the points,
        //then reuse the first markers as the last markers.
        if (markerIndex && markerGroup && markerGroup.getCount()) {
            for (i = 0; i < markerIndex; i++) {
                marker = markerGroup.getAt(i);
                markerGroup.remove(marker);
                markerGroup.add(marker);
                markerAux = markerGroup.getAt(markerGroup.getCount() - 2);
                marker.setAttributes({
                    x: 0,
                    y: 0,
                    translate: {
                        x: markerAux.attr.translation.x,
                        y: markerAux.attr.translation.y
                    }
                });
            }
        }
        
        me.unHighlightItem();
        me.cleanHighlights();

        me.setBBox();
        bbox = me.bbox;

        me.clipRect = [bbox.x, bbox.y, bbox.width, bbox.height];

        for (i = 0, ln = axes.length; i < ln; i++) { 
            axis = chart.axes.get(axes[i]);
            if (axis) {
                if (axis.position == 'top' || axis.position == 'bottom') {
                    minX = axis.from;
                    maxX = axis.to;
                }
                else {
                    minY = axis.from;
                    maxY = axis.to;
                }
            }
        }
        // If a field was specified without a corresponding axis, create one to get bounds
        if (me.xField && !Ext.isNumber(minX)) {
            axis = new Ext.chart.axis.Axis({
                chart: chart,
                fields: [].concat(me.xField)
            }).calcEnds();
            minX = axis.from;
            maxX = axis.to;
        }
        if (me.yField && !Ext.isNumber(minY)) {
            axis = new Ext.chart.axis.Axis({
                chart: chart,
                fields: [].concat(me.yField)
            }).calcEnds();
            minY = axis.from;
            maxY = axis.to;
        }

        if (isNaN(minX)) {
            minX = 0;
            xScale = bbox.width / (store.getCount() - 1);
        }
        else {
            xScale = bbox.width / (maxX - minX);
        }

        if (isNaN(minY)) {
            minY = 0;
            yScale = bbox.height / (store.getCount() - 1);
        } 
        else {
            yScale = bbox.height / (maxY - minY);
        }

        store.each(function(record, i) {
            xValue = record.get(me.xField);
            yValue = record.get(me.yField);
            // Ensure a value
            if (typeof xValue == 'string' || typeof xValue == 'object') {
                xValue = i;
            }
            if (typeof yValue == 'string') {
                yValue = i;
            }
            xValues.push(xValue);
            yValues.push(yValue);
        }, me);

        ln = xValues.length;
        if (ln > bbox.width) {
            coords = me.shrink(xValues, yValues, bbox.width);
            xValues = coords.x;
            yValues = coords.y;
        }

        me.items = [];

        ln = xValues.length;
        for (i = 0; i < ln; i++) {
            xValue = xValues[i];
            yValue = yValues[i];
            if (yValue === false) {
                if (path.length == 1) {
                    path = [];
                }
                onbreak = true;
                continue;
            } else {
                x = (bbox.x + (xValue - minX) * xScale).toFixed(2);
                y = ((bbox.y + bbox.height) - (yValue - minY) * yScale).toFixed(2);
                if (onbreak) {
                    onbreak = false;
                    path.push('M');
                } 
                path = path.concat([x, y]);
            }
            if ((typeof firstY == 'undefined') && (typeof y != 'undefined')) {
                firstY = y;
            }
            // If this is the first line, create a dummypath to animate in from.
            if (!me.line || chart.resizing) {
                dummyPath = dummyPath.concat([x, bbox.y + bbox.height / 2]);
            }

            // When resizing, reset before animating
            if (chart.animate && chart.resizing && me.line) {
                me.line.setAttributes({
                    path: dummyPath
                }, true);
                if (me.fillPath) {
                    me.fillPath.setAttributes({
                        path: dummyPath,
                        opacity: 0.2
                    }, true);
                }
                if (me.line.shadows) {
                    shadows = me.line.shadows;
                    for (j = 0, lnsh = shadows.length; j < lnsh; j++) {
                        shadow = shadows[j];
                        shadow.setAttributes({
                            path: dummyPath
                        }, true);
                    }
                }
            }
            if (showMarkers) {
                marker = markerGroup.getAt(i);
                if (!marker) {
                    marker = Ext.chart.Shapes[type](surface, Ext.apply({
                        group: [group, markerGroup],
                        x: 0, y: 0,
                        translate: {
                            x: prevX || x, 
                            y: prevY || (bbox.y + bbox.height / 2)
                        },
                        value: '"' + xValue + ', ' + yValue + '"'
                    }, endMarkerStyle));
                    marker._to = {
                        translate: {
                            x: x,
                            y: y
                        }
                    };
                } else {
                    marker.setAttributes({
                        value: '"' + xValue + ', ' + yValue + '"',
                        x: 0, y: 0,
                        hidden: false
                    }, true);
                    marker._to = {
                        translate: {
                            x: x, y: y
                        }
                    };
                }
            }
            me.items.push({
                series: me,
                value: [xValue, yValue],
                point: [x, y],
                sprite: marker,
                storeItem: store.getAt(i)
            });
            prevX = x;
            prevY = y;
        }
        
        if (path.length <= 1) {
            //nothing to be rendered
            return;    
        }
        
        if (me.smooth) {
            path = Ext.draw.Draw.smooth(path, 6);
        }
        
        //Correct path if we're animating timeAxis intervals
        if (chart.markerIndex && me.previousPath) {
            fromPath = me.previousPath;
            fromPath.splice(1, 2);
        } else {
            fromPath = path;
        }

        // Only create a line if one doesn't exist.
        if (!me.line) {
            me.line = surface.add(Ext.apply({
                type: 'path',
                group: group,
                path: dummyPath,
                stroke: endLineStyle.stroke || endLineStyle.fill
            }, endLineStyle || {}));
            //unset fill here (there's always a default fill withing the themes).
            me.line.setAttributes({
                fill: 'none'
            });
            if (!endLineStyle.stroke && colorArrayLength) {
                me.line.setAttributes({
                    stroke: colorArrayStyle[seriesIdx % colorArrayLength]
                }, true);
            }
            if (enableShadows) {
                //create shadows
                shadows = me.line.shadows = [];                
                for (shindex = 0; shindex < lnsh; shindex++) {
                    shadowBarAttr = shadowAttributes[shindex];
                    shadowBarAttr = Ext.apply({}, shadowBarAttr, { path: dummyPath });
                    shadow = chart.surface.add(Ext.apply({}, {
                        type: 'path',
                        group: shadowGroups[shindex]
                    }, shadowBarAttr));
                    shadows.push(shadow);
                }
            }
        }
        if (me.fill) {
            fillPath = path.concat([
                ["L", x, bbox.y + bbox.height],
                ["L", bbox.x, bbox.y + bbox.height],
                ["L", bbox.x, firstY]
            ]);
            if (!me.fillPath) {
                me.fillPath = surface.add({
                    group: group,
                    type: 'path',
                    opacity: endLineStyle.opacity || 0.3,
                    fill: colorArrayStyle[seriesIdx % colorArrayLength] || endLineStyle.fill,
                    path: dummyPath
                });
            }
        }
        markerCount = showMarkers && markerGroup.getCount();
        if (chart.animate) {
            fill = me.fill;
            line = me.line;
            //Add renderer to line. There is not unique record associated with this.
            rendererAttributes = me.renderer(line, false, { path: path }, i, store);
            Ext.apply(rendererAttributes, endLineStyle || {}, {
                stroke: endLineStyle.stroke || endLineStyle.fill
            });
            //fill should not be used here but when drawing the special fill path object
            delete rendererAttributes.fill;
            if (chart.markerIndex && me.previousPath) {
                me.animation = animation = me.onAnimate(line, {
                    to: rendererAttributes,
                    from: {
                        path: fromPath
                    }
                });
            } else {
                me.animation = animation = me.onAnimate(line, {
                    to: rendererAttributes
                });
            }
            //animate shadows
            if (enableShadows) {
                shadows = line.shadows;
                for(j = 0; j < lnsh; j++) {
                    if (chart.markerIndex && me.previousPath) {
                        me.onAnimate(shadows[j], {
                            to: { path: path },
                            from: { path: fromPath }
                        });
                    } else {
                        me.onAnimate(shadows[j], {
                            to: { path: path }
                        });
                    }
                }
            }
            //animate fill path
            if (fill) {
                me.onAnimate(me.fillPath, {
                    to: Ext.apply({}, {
                        path: fillPath,
                        fill: colorArrayStyle[seriesIdx % colorArrayLength] || endLineStyle.fill
                    }, endLineStyle || {})
                });
            }
            //animate markers
            if (showMarkers) {
                for(i = 0; i < ln; i++) {
                    item = markerGroup.getAt(i);
                    if (item) {
                        rendererAttributes = me.renderer(item, store.getAt(i), item._to, i, store);
                        me.onAnimate(item, {
                            to: Ext.apply(rendererAttributes, endMarkerStyle || {})
                        });
                    }
                }
                for(; i < markerCount; i++) {
                    item = markerGroup.getAt(i);
                    item.hide(true);
                }
//                for(i = 0; i < (chart.markerIndex || 0)-1; i++) {
//                    item = markerGroup.getAt(i);
//                    item.hide(true);
//                }
            }
        } else {
            rendererAttributes = me.renderer(me.line, false, { path: path, hidden: false }, i, store);
            Ext.apply(rendererAttributes, endLineStyle || {}, {
                stroke: endLineStyle.stroke || endLineStyle.fill
            });
            //fill should not be used here but when drawing the special fill path object
            delete rendererAttributes.fill;
            me.line.setAttributes(rendererAttributes, true);
            //set path for shadows
            if (enableShadows) {
                shadows = me.line.shadows;
                for(j = 0; j < lnsh; j++) {
                    shadows[j].setAttributes({
                        path: path
                    }, true);
                }
            }
            if (me.fill) {
                me.fillPath.setAttributes({
                    path: fillPath
                }, true);
            }
            if (showMarkers) {
                for(i = 0; i < ln; i++) {
                    item = markerGroup.getAt(i);
                    if (item) {
                        rendererAttributes = me.renderer(item, store.getAt(i), item._to, i, store);
                        item.setAttributes(Ext.apply(endMarkerStyle || {}, rendererAttributes || {}), true);
//                        me.onAnimate(item, {
//                            to: Ext.apply(rendererAttributes, endMarkerStyle || {})
//                        });
                    }
                }
                for(; i < markerCount; i++) {
                    item = markerGroup.getAt(i);
                    item.hide(true);
                }
//                for(i = 0; i < (chart.markerIndex || 0); i++) {
//                    item = markerGroup.getAt(i);
//                    item.hide(true);
//                }
            }
        }

        if (chart.markerIndex) {
            path.splice(1, 0, path[1], path[2]);
            me.previousPath = path;
        }

        me.renderLabels();
        me.renderCallouts();
    },
    
    // @private called when a label is to be created.
    onCreateLabel: function(storeItem, item, i, display) {
        var me = this,
            group = me.labelsGroup,
            config = me.label,
            bbox = me.bbox,
            endLabelStyle = Ext.apply(config, me.seriesLabelStyle);

        return me.chart.surface.add(Ext.apply({
            'type': 'text',
            'text-anchor': 'middle',
            'group': group,
            'x': item.point[0],
            'y': bbox.y + bbox.height / 2
        }, endLabelStyle || {}));
    },
    
    // @private called when a label is to be created.
    onPlaceLabel: function(label, storeItem, item, i, display, animate) {
        var me = this,
            chart = me.chart,
            resizing = chart.resizing,
            config = me.label,
            format = config.renderer,
            field = config.field,
            bbox = me.bbox,
            x = item.point[0],
            y = item.point[1],
            radius = item.sprite.attr.radius,
            bb, width, height;
        
        label.setAttributes({
            text: format(storeItem.get(field)),
            hidden: true
        }, true);
        
        if (display == 'rotate') {
            label.setAttributes({
                'text-anchor': 'start',
                'rotation': {
                    x: x,
                    y: y,
                    degrees: -45
                }
            }, true);
            //correct label position to fit into the box
            bb = label.getBBox();
            width = bb.width;
            height = bb.height;
            x = x < bbox.x? bbox.x : x;
            x = (x + width > bbox.x + bbox.width)? (x - (x + width - bbox.x - bbox.width)) : x;
            y = (y - height < bbox.y)? bbox.y + height : y;
        
        } else if (display == 'under' || display == 'over') {
            //TODO(nicolas): find out why width/height values in circle bounding boxes are undefined.
            bb = item.sprite.getBBox();
            bb.width = bb.width || (radius * 2);
            bb.height = bb.height || (radius * 2);
            y = y + (display == 'over'? -bb.height : bb.height);
            //correct label position to fit into the box
            bb = label.getBBox();
            width = bb.width/2;
            height = bb.height/2;
            x = x - width < bbox.x? bbox.x + width : x;
            x = (x + width > bbox.x + bbox.width) ? (x - (x + width - bbox.x - bbox.width)) : x;
            y = y - height < bbox.y? bbox.y + height : y;
            y = (y + height > bbox.y + bbox.height) ? (y - (y + height - bbox.y - bbox.height)) : y;
        }
        
        if (me.chart.animate && !me.chart.resizing) {
            label.show(true);
            me.onAnimate(label, {
                to: {
                    x: x,
                    y: y
                }
            });
        } else {
            label.setAttributes({
                x: x,
                y: y
            }, true);
            if (resizing) {
                me.animation.on('afteranimate', function() {
                    label.show(true);
                });
            } else {
                label.show(true);
            }
        }
    },

    //@private Overriding highlights.js highlightItem method.
    highlightItem: function() {
        var me = this;
        //me.callParent(arguments);
        Ext.chart.series.Line.superclass.highlightItem.apply(me, arguments);
        if (this.line && !this.highlighted) {
            if (!('__strokeWidth' in this.line)) {
                this.line.__strokeWidth = this.line.attr['stroke-width'] || 0;
            }
            if (this.line.__anim) {
                this.line.__anim.paused = true;
            }
            this.line.__anim = new Ext.fx.Anim({
                target: this.line,
                to: {
                    'stroke-width': this.line.__strokeWidth + 3
                }
            });
            this.highlighted = true;
        }
    },

    //@private Overriding highlights.js unHighlightItem method.
    unHighlightItem: function() {
        var me = this;
        //me.callParent(arguments);
        Ext.chart.series.Line.superclass.unHighlightItem.apply(me, arguments);
        if (this.line && this.highlighted) {
            this.line.__anim = new Ext.fx.Anim({
                target: this.line,
                to: {
                    'stroke-width': this.line.__strokeWidth
                }
            });
            this.highlighted = false;
        }
    },

    //@private called when a callout needs to be placed.
    onPlaceCallout : function(callout, storeItem, item, i, display, animate, index) {
        if (!display) {
            return;
        }
        
        var me = this,
            chart = me.chart,
            surface = chart.surface,
            resizing = chart.resizing,
            config = me.callouts,
            items = me.items,
            prev = i == 0? false : items[i -1].point,
            next = (i == items.length -1)? false : items[i +1].point,
            cur = [+item.point[0], +item.point[1]],
            dir, norm, normal, a, aprev, anext,
            offsetFromViz = config.offsetFromViz || 30,
            offsetToSide = config.offsetToSide || 10,
            offsetBox = config.offsetBox || 3,
            boxx, boxy, boxw, boxh,
            p, clipRect = me.clipRect,
            bbox = {
                width: config.styles.width || 10,
                height: config.styles.height || 10
            },
            x, y;

        //get the right two points
        if (!prev) {
            prev = cur;
        }
        if (!next) {
            next = cur;
        }
        a = (next[1] - prev[1]) / (next[0] - prev[0]);
        aprev = (cur[1] - prev[1]) / (cur[0] - prev[0]);
        anext = (next[1] - cur[1]) / (next[0] - cur[0]);
        
        norm = Math.sqrt(1 + a * a);
        dir = [1 / norm, a / norm];
        normal = [-dir[1], dir[0]];
        
        //keep the label always on the outer part of the "elbow"
        if (aprev > 0 && anext < 0 && normal[1] < 0
            || aprev < 0 && anext > 0 && normal[1] > 0) {
            normal[0] *= -1;
            normal[1] *= -1;
        } else if (Math.abs(aprev) < Math.abs(anext) && normal[0] < 0
                   || Math.abs(aprev) > Math.abs(anext) && normal[0] > 0) {
            normal[0] *= -1;
            normal[1] *= -1;
        }
        //position
        x = cur[0] + normal[0] * offsetFromViz;
        y = cur[1] + normal[1] * offsetFromViz;

        //box position and dimensions
        boxx = x + (normal[0] > 0? 0 : -(bbox.width + 2 * offsetBox));
        boxy = y - bbox.height /2 - offsetBox;
        boxw = bbox.width + 2 * offsetBox;
        boxh = bbox.height + 2 * offsetBox;
        
        //now check if we're out of bounds and invert the normal vector correspondingly
        //this may add new overlaps between labels (but labels won't be out of bounds).
        if (boxx < clipRect[0] || (boxx + boxw) > (clipRect[0] + clipRect[2])) {
            normal[0] *= -1;
        }
        if (boxy < clipRect[1] || (boxy + boxh) > (clipRect[1] + clipRect[3])) {
            normal[1] *= -1;
        }

        //update positions
        x = cur[0] + normal[0] * offsetFromViz;
        y = cur[1] + normal[1] * offsetFromViz;
        
        //update box position and dimensions
        boxx = x + (normal[0] > 0? 0 : -(bbox.width + 2 * offsetBox));
        boxy = y - bbox.height /2 - offsetBox;
        boxw = bbox.width + 2 * offsetBox;
        boxh = bbox.height + 2 * offsetBox;
        
        if (chart.animate) {
            //set the line from the middle of the pie to the box.
            me.onAnimate(callout.lines, {
                to: {
                    path: ["M", cur[0], cur[1], "L", x, y, "Z"]
                }
            });
            //set component position
            if (callout.panel) {
                callout.panel.setPosition(boxx, boxy, true);
            }
        }
        else {
            //set the line from the middle of the pie to the box.
            callout.lines.setAttributes({
                path: ["M", cur[0], cur[1], "L", x, y, "Z"]
            }, true);
            //set component position
            if (callout.panel) {
                callout.panel.setPosition(boxx, boxy);
            }
        }
        for (p in callout) {
            callout[p].show(true);
        }
    },
    
    isItemInPoint: function(x, y, item, i) {
        var me = this,
            items = me.items,
            tolerance = me.selectionTolerance,
            result = null,
            prevItem,
            nextItem,
            prevPoint,
            nextPoint,
            ln,
            x1,
            y1,
            x2,
            y2,
            xIntersect,
            yIntersect,
            dist1, dist2, dist, midx, midy,
            sqrt = Math.sqrt, abs = Math.abs;
        
        nextItem = items[i];
        prevItem = i && items[i - 1];
        
        if (i >= ln) {
            prevItem = items[ln - 1];
        }
        prevPoint = prevItem && prevItem.point;
        nextPoint = nextItem && nextItem.point;
        x1 = prevItem ? prevPoint[0] : nextPoint[0] - tolerance;
        y1 = prevItem ? prevPoint[1] : nextPoint[1];
        x2 = nextItem ? nextPoint[0] : prevPoint[0] + tolerance;
        y2 = nextItem ? nextPoint[1] : prevPoint[1];
        dist1 = sqrt((x - x1) * (x - x1) + (y - y1) * (y - y1));
        dist2 = sqrt((x - x2) * (x - x2) + (y - y2) * (y - y2));
        dist = Math.min(dist1, dist2);
        
        if (dist <= tolerance) {
            return dist == dist1? prevItem : nextItem;
        }
        return false;
    },
    
    // @private toggle visibility of all series elements (markers, sprites).
    toggleAll: function(show) {
        var me = this,
            i, ln, shadow, shadows;
        if (!show) {
            Ext.chart.series.Line.superclass.hideAll.call(me);
        }
        else {
            Ext.chart.series.Line.superclass.showAll.call(me);
        }
        if (me.line) {
            me.line.setAttributes({
                hidden: !show
            }, true);
            //hide shadows too
            if (me.line.shadows) {
                for (i = 0, shadows = me.line.shadows, ln = shadows.length; i < ln; i++) {
                    shadow = shadows[i];
                    shadow.setAttributes({
                        hidden: !show
                    }, true);
                }
            }
        }
        if (me.fillPath) {
            me.fillPath.setAttributes({
                hidden: !show
            }, true);
        }
    },
    
    // @private hide all series elements (markers, sprites).
    hideAll: function() {
        this.toggleAll(false);
    },
    
    // @private hide all series elements (markers, sprites).
    showAll: function() {
        this.toggleAll(true);
    }
});/**
 * @class Ext.chart.series.Pie
 * @extends Ext.chart.series.Series
 * 
 * Creates a Pie Chart. A Pie Chart is a useful visualization technique to display quantitative information for different 
 * categories that also have a meaning as a whole.
 * As with all other series, the Pie Series must be appended in the *series* Chart array configuration. See the Chart 
 * documentation for more information. A typical configuration object for the pie series could be:
 * 
  <pre><code>
    series: [{
        type: 'pie',
        field: 'data1',
        showInLegend: true,
        highlight: {
          segment: {
            margin: 20
          }
        },
        label: {
            field: 'name',
            display: 'rotate',
            contrast: true,
            font: '18px Arial'
        }
    }]
   </code></pre>
 
 * 
 * In this configuration we set `pie` as the type for the series, set an object with specific style properties for highlighting options 
 * (triggered when hovering elements). We also set true to `showInLegend` so all the pie slices can be represented by a legend item. 
 * We set `data1` as the value of the field to determine the angle span for each pie slice. We also set a label configuration object 
 * where we set the field name of the store field to be renderer as text for the label. The labels will also be displayed rotated. 
 * We set `contrast` to `true` to flip the color of the label if it is to similar to the background color. Finally, we set the font family 
 * and size through the `font` parameter. 
 * 
 * @xtype pie
 *
 */
Ext.chart.series.Pie = Ext.extend(Ext.chart.series.Series, {

    //extend: 'Ext.chart.series.Series',

    type: "pie",
    rad: Math.PI / 180,

    /**
     * @cfg {Number} highlightDuration
     * The duration for the pie slice highlight effect.
     */
    highlightDuration: 150,

    /**
     * @cfg {String} angleField
     * The store record field name to be used for the pie angles.
     * The values bound to this field name must be positive real numbers.
     * This parameter is required.
     */
    angleField: false,

    /**
     * @cfg {String} lengthField
     * The store record field name to be used for the pie slice lengths.
     * The values bound to this field name must be positive real numbers.
     * This parameter is optional.
     */
    lengthField: false,

    /**
     * @cfg {Boolean|Number} donut
     * Whether to set the pie chart as donut chart.
     * Default's false. Can be set to a particular percentage to set the radius
     * of the donut chart.
     */
    donut: false,

    /**
     * @cfg {Boolean} showInLegend
     * Whether to add the pie chart elements as legend items. Default's false.
     */
    showInLegend: false,

    /**
     * @cfg {Array} colorSet
     * An array of color values which will be used, in order, as the pie slice fill colors.
     */
    
    /**
     * @cfg {Object} style
     * An object containing styles for overriding series styles from Theming.
     */
    style: {},
    
    constructor: function(config) {
        //this.callParent(arguments);
        Ext.chart.series.Pie.superclass.constructor.apply(this, arguments);
        var me = this,
            chart = me.chart,
            surface = chart.surface,
            store = chart.store,
            shadow = chart.shadow, i, l, cfg;
        Ext.applyIf(me, {
            highlightCfg: {
                segment: {
                    margin: 20
                }
            }
        });
        Ext.apply(me, config, {            
            shadowAttributes: [{
                "stroke-width": 6,
                "stroke-opacity": 1,
                stroke: 'rgb(200, 200, 200)',
                translate: {
                    x: 1.2,
                    y: 2
                }
            },
            {
                "stroke-width": 4,
                "stroke-opacity": 1,
                stroke: 'rgb(150, 150, 150)',
                translate: {
                    x: 0.9,
                    y: 1.5
                }
            },
            {
                "stroke-width": 2,
                "stroke-opacity": 1,
                stroke: 'rgb(100, 100, 100)',
                translate: {
                    x: 0.6,
                    y: 1
                }
            }]
        });
        me.group = surface.getGroup(me.seriesId);
        if (shadow) {
            for (i = 0, l = me.shadowAttributes.length; i < l; i++) {
                me.shadowGroups.push(surface.getGroup(me.seriesId + '-shadows' + i));
            }
        }
        surface.customAttributes.segment = function(opt) {
            return me.getSegment(opt);
        };
    },
    
    //@private updates some onbefore render parameters.
    initialize: function() {
        var me = this,
            store = me.chart.substore || me.chart.store;
        //Add yFields to be used in Legend.js
        me.yField = [];
        if (me.label.field) {
            store.each(function(rec) {
                me.yField.push(rec.get(me.label.field));
            });
        }
    },

    // @private returns an object with properties for a PieSlice.
    getSegment: function(opt) {
        var me = this,
            rad = me.rad,
            cos = Math.cos,
            sin = Math.sin,
            abs = Math.abs,
            x = me.centerX,
            y = me.centerY,
            x1 = 0, x2 = 0, x3 = 0, x4 = 0,
            y1 = 0, y2 = 0, y3 = 0, y4 = 0,
            delta = 1e-2,
            r = opt.endRho - opt.startRho,
            startAngle = opt.startAngle,
            endAngle = opt.endAngle,
            midAngle = (startAngle + endAngle) / 2 * rad,
            margin = opt.margin || 0,
            flag = abs(endAngle - startAngle) > 180,
            a1 = Math.min(startAngle, endAngle) * rad,
            a2 = Math.max(startAngle, endAngle) * rad,
            singleSlice = false;

        x += margin * cos(midAngle);
        y += margin * sin(midAngle);

        x1 = x + opt.startRho * cos(a1);
        y1 = y + opt.startRho * sin(a1);

        x2 = x + opt.endRho * cos(a1);
        y2 = y + opt.endRho * sin(a1);

        x3 = x + opt.startRho * cos(a2);
        y3 = y + opt.startRho * sin(a2);

        x4 = x + opt.endRho * cos(a2);
        y4 = y + opt.endRho * sin(a2);

        if (abs(x1 - x3) <= delta && abs(y1 - y3) <= delta) {
            singleSlice = true;
        }
        //Solves mysterious clipping bug with IE
        if (singleSlice) {
            return {
                path: [
                ["M", x1, y1],
                ["L", x2, y2],
                ["A", opt.endRho, opt.endRho, 0, +flag, 1, x4, y4],
                ["Z"]]
            };
        } else {
            return {
                path: [
                ["M", x1, y1],
                ["L", x2, y2],
                ["A", opt.endRho, opt.endRho, 0, +flag, 1, x4, y4],
                ["L", x3, y3],
                ["A", opt.startRho, opt.startRho, 0, +flag, 0, x1, y1],
                ["Z"]]
            };
        }
    },

    // @private utility function to calculate the middle point of a pie slice.
    calcMiddle: function(item) {
        var me = this,
            rad = me.rad,
            slice = item.slice,
            x = me.centerX,
            y = me.centerY,
            startAngle = slice.startAngle,
            endAngle = slice.endAngle,
            radius = Math.max(('rho' in slice) ? slice.rho: me.radius, me.label.minMargin),
            donut = +me.donut,
            a1 = Math.min(startAngle, endAngle) * rad,
            a2 = Math.max(startAngle, endAngle) * rad,
            midAngle = -(a1 + (a2 - a1) / 2),
            xm = x + (item.endRho + item.startRho) / 2 * Math.cos(midAngle),
            ym = y - (item.endRho + item.startRho) / 2 * Math.sin(midAngle);

        item.middle = {
            x: xm,
            y: ym
        };
    },

    /**
     * Draws the series for the current chart.
     */
    drawSeries: function() {
        var me = this,
            store = me.chart.substore || me.chart.store,
            group = me.group,
            animate = me.chart.animate,
            field = me.angleField || me.field || me.xField,
            lenField = [].concat(me.lengthField),
            totalLenField = 0,
            colors = me.colorSet,
            chart = me.chart,
            surface = chart.surface,
            chartBBox = chart.chartBBox,
            enableShadows = chart.shadow,
            shadowGroups = me.shadowGroups,
            shadowAttributes = me.shadowAttributes,
            lnsh = shadowGroups.length,
            rad = me.rad,
            layers = lenField.length,
            rhoAcum = 0,
            donut = +me.donut,
            layerTotals = [],
            values = {},
            fieldLength,
            items = [],
            passed = false,
            totalField = 0,
            maxLenField = 0,
            cut = 9,
            defcut = true,
            angle = 0,
            seriesStyle = me.seriesStyle,
            seriesLabelStyle = me.seriesLabelStyle,
            colorArrayStyle = me.colorArrayStyle,
            colorArrayLength = colorArrayStyle && colorArrayStyle.length || 0,
            gutterX = chart.maxGutter[0],
            gutterY = chart.maxGutter[1],
            rendererAttributes,
            shadowGroup,
            shadowAttr,
            shadows,
            shadow,
            shindex,
            centerX,
            centerY,
            deltaRho,
            first = 0,
            slice,
            slices,
            sprite,
            value,
            item,
            lenValue,
            ln,
            record,
            i,
            j,
            startAngle,
            endAngle,
            middleAngle,
            sliceLength,
            path,
            p,
            spriteOptions, bbox;
        
        Ext.apply(seriesStyle, me.style || {});

        me.setBBox();
        bbox = me.bbox;

        //override theme colors
        if (me.colorSet) {
            colorArrayStyle = me.colorSet;
            colorArrayLength = colorArrayStyle.length;
        }
        
        //if not store or store is empty then there's nothing to draw
        if (!store || !store.getCount()) {
            return;
        }
        
        me.unHighlightItem();
        me.cleanHighlights();

        centerX = me.centerX = chartBBox.x + (chartBBox.width / 2);
        centerY = me.centerY = chartBBox.y + (chartBBox.height / 2);
        me.radius = Math.min(centerX - chartBBox.x, centerY - chartBBox.y);
        me.slices = slices = [];
        me.items = items = [];

        store.each(function(record, i) {
            if (this.__excludes && this.__excludes[i]) {
                //hidden series
                return;
            }
            totalField += +record.get(field);
            if (lenField[0]) {
                for (j = 0, totalLenField = 0; j < layers; j++) {
                    totalLenField += +record.get(lenField[j]);
                }
                layerTotals[i] = totalLenField;
                maxLenField = Math.max(maxLenField, totalLenField);
            }
        }, this);

        store.each(function(record, i) {
            if (this.__excludes && this.__excludes[i]) {
                //hidden series
                return;
            } 
            value = record.get(field);
            middleAngle = angle - 360 * value / totalField / 2;
            // First slice
            if (!i || first == 0) {
                angle = 360 - middleAngle;
                me.firstAngle = angle;
                middleAngle = angle - 360 * value / totalField / 2;
            }
            endAngle = angle - 360 * value / totalField;
            slice = {
                series: me,
                value: value,
                startAngle: angle,
                endAngle: endAngle,
                storeItem: record
            };
            if (lenField[0]) {
                lenValue = layerTotals[i];
                slice.rho = me.radius * (lenValue / maxLenField);
            } else {
                slice.rho = me.radius;
            }
            slices[i] = slice;
            if((slice.startAngle % 360) == (slice.endAngle % 360)) {
                slice.startAngle -= 0.0001;
            }
            angle = endAngle;
            first++;
        }, me);
        
        //do all shadows first.
        if (enableShadows) {
            for (i = 0, ln = slices.length; i < ln; i++) {
                if (this.__excludes && this.__excludes[i]) {
                    //hidden series
                    continue;
                }
                slice = slices[i];
                slice.shadowAttrs = [];
                for (j = 0, rhoAcum = 0, shadows = []; j < layers; j++) {
                    sprite = group.getAt(i * layers + j);
                    deltaRho = lenField[j] ? store.getAt(i).get(lenField[j]) / layerTotals[i] * slice.rho: slice.rho;
                    //set pie slice properties
                    rendererAttributes = {
                        segment: {
                            startAngle: slice.startAngle,
                            endAngle: slice.endAngle,
                            margin: 0,
                            rho: slice.rho,
                            startRho: rhoAcum + (deltaRho * donut / 100),
                            endRho: rhoAcum + deltaRho
                        }
                    };
                    //create shadows
                    for (shindex = 0, shadows = []; shindex < lnsh; shindex++) {
                        shadowAttr = shadowAttributes[shindex];
                        shadow = shadowGroups[shindex].getAt(i);
                        if (!shadow) {
                            shadow = chart.surface.add(Ext.apply({},
                            {
                                type: 'path',
                                group: shadowGroups[shindex],
                                strokeLinejoin: "round"
                            },
                            rendererAttributes, shadowAttr));
                        }
                        if (animate) {
                            rendererAttributes = me.renderer(shadow, store.getAt(i), Ext.apply({},
                            rendererAttributes, shadowAttr), i, store);
                            me.onAnimate(shadow, {
                                to: rendererAttributes
                            });
                        } else {
                            rendererAttributes = me.renderer(shadow, store.getAt(i), Ext.apply(shadowAttr, {
                                hidden: false
                            }), i, store);
                            shadow.setAttributes(rendererAttributes, true);
                        }
                        shadows.push(shadow);
                    }
                    slice.shadowAttrs[j] = shadows;
                }
            }
        }
        //do pie slices after.
        for (i = 0, ln = slices.length; i < ln; i++) {
            if (this.__excludes && this.__excludes[i]) {
                //hidden series
                continue;
            }
            slice = slices[i];
            for (j = 0, rhoAcum = 0; j < layers; j++) {
                sprite = group.getAt(i * layers + j);
                deltaRho = lenField[j] ? store.getAt(i).get(lenField[j]) / layerTotals[i] * slice.rho: slice.rho;
                //set pie slice properties
                rendererAttributes = Ext.apply({
                    segment: {
                        startAngle: slice.startAngle,
                        endAngle: slice.endAngle,
                        margin: 0,
                        rho: slice.rho,
                        startRho: rhoAcum + (deltaRho * donut / 100),
                        endRho: rhoAcum + deltaRho
                    } 
                }, Ext.apply(seriesStyle, colorArrayStyle && { fill: colorArrayStyle[(layers > 1? j : i) % colorArrayLength] } || {}));
                item = Ext.apply({},
                rendererAttributes.segment, {
                    slice: slice,
                    series: me,
                    storeItem: slice.storeItem,
                    index: i
                });
                me.calcMiddle(item);
                if (enableShadows) {
                    item.shadows = slice.shadowAttrs[j];
                }
                items[i] = item;
                // Create a new sprite if needed (no height)
                if (!sprite) {
                    spriteOptions = Ext.apply({
                        type: "path",
                        group: group,
                        middle: item.middle
                    }, Ext.apply(seriesStyle, colorArrayStyle && { fill: colorArrayStyle[(layers > 1? j : i) % colorArrayLength] } || {}));
                    sprite = surface.add(Ext.apply(spriteOptions, rendererAttributes));
                }
                slice.sprite = slice.sprite || [];
                item.sprite = sprite;
                slice.sprite.push(sprite);
                slice.point = [item.middle.x, item.middle.y];
                if (animate) {
                    rendererAttributes = me.renderer(sprite, store.getAt(i), rendererAttributes, i, store);
                    sprite._to = rendererAttributes;
                    sprite._animating = true;
                    me.onAnimate(sprite, {
                        to: rendererAttributes,
                        listeners: {
                            afteranimate: {
                                fn: function() {
                                    this._animating = false;
                                },
                                scope: sprite
                            }
                        }
                    });
                } else {
                    rendererAttributes = me.renderer(sprite, store.getAt(i), Ext.apply(rendererAttributes, {
                        hidden: false
                    }), i, store);
                    sprite.setAttributes(rendererAttributes, true);
                }
                rhoAcum += deltaRho;
            }
        }
        
        // Hide unused bars
        ln = group.getCount();
        for (i = 0; i < ln; i++) {
            if (!slices[(i / layers) >> 0] && group.getAt(i)) {
                group.getAt(i).hide(true);
            }
        }
        if (enableShadows) {
            lnsh = shadowGroups.length;
            for (shindex = 0; shindex < ln; shindex++) {
                if (!slices[(shindex / layers) >> 0]) {
                    for (j = 0; j < lnsh; j++) {
                        if (shadowGroups[j].getAt(shindex)) {
                            shadowGroups[j].getAt(shindex).hide(true);
                        }
                    }
                }
            }
        }
        me.renderLabels();
        me.renderCallouts();
    },

    // @private callback for when creating a label sprite.
    onCreateLabel: function(storeItem, item, i, display) {
        var me = this,
            group = me.labelsGroup,
            config = me.label,
            centerX = me.centerX,
            centerY = me.centerY,
            middle = item.middle,
            endLabelStyle = Ext.apply(me.seriesLabelStyle || {}, config || {});
        
        return me.chart.surface.add(Ext.apply({
            'type': 'text',
            'text-anchor': 'middle',
            'group': group,
            'x': middle.x,
            'y': middle.y
        }, endLabelStyle));
    },

    // @private callback for when placing a label sprite.
    onPlaceLabel: function(label, storeItem, item, i, display, animate, index) {
        var me = this,
            chart = me.chart,
            resizing = chart.resizing,
            config = me.label,
            format = config.renderer,
            field = [].concat(config.field),
            centerX = me.centerX,
            centerY = me.centerY,
            middle = item.middle,
            opt = {
                x: middle.x,
                y: middle.y
            },
            x = middle.x - centerX,
            y = middle.y - centerY,
            from = {},
            rho = 1,
            theta = Math.atan2(y, x || 1),
            dg = theta * 180 / Math.PI,
            prevDg;

        function fixAngle(a) {
            if (a < 0) a += 360;
            return a % 360;
        }

        label.setAttributes({
            text: format(storeItem.get(field[index]))
        }, true);

        switch (display) {
        case 'outside':
            rho = Math.sqrt(x * x + y * y) * 2;
            //update positions
            opt.x = rho * Math.cos(theta) + centerX;
            opt.y = rho * Math.sin(theta) + centerY;
            break;

        case 'rotate':
            dg = fixAngle(dg);
            dg = (dg > 90 && dg < 270) ? dg + 180: dg;

            prevDg = label.attr.rotation.degrees;
            if (prevDg != null && Math.abs(prevDg - dg) > 180) {
                if (dg > prevDg) {
                    dg -= 360;
                } else {
                    dg += 360;
                }
                dg = dg % 360;
            } else {
                dg = fixAngle(dg);
            }
            //update rotation angle
            opt.rotate = {
                degrees: dg,
                x: opt.x,
                y: opt.y
            };
            break;

        default:
            break;
        }
        //ensure the object has zero translation
        opt.translate = {
            x: 0, y: 0    
        };
        if (animate && !resizing && (display != 'rotate' || prevDg != null)) {
            me.onAnimate(label, {
                to: opt
            });
        } else {
            label.setAttributes(opt, true);
        }
        label._from = from;
    },

    // @private callback for when placing a callout sprite.
    onPlaceCallout: function(callout, storeItem, item, i, display, animate, index) {
        var me = this,
            chart = me.chart,
            resizing = chart.resizing,
            config = me.callouts,
            centerX = me.centerX,
            centerY = me.centerY,
            middle = item.middle,
            opt = {
                x: middle.x,
                y: middle.y
            },
            x = middle.x - centerX,
            y = middle.y - centerY,
            rho = 1,
            rhoCenter,
            theta = Math.atan2(y, x || 1),
            bbox = callout.label.getBBox(),
            offsetFromViz = 20,
            offsetToSide = 10,
            offsetBox = 10,
            p;

        //should be able to config this.
        rho = item.endRho + offsetFromViz;
        rhoCenter = (item.endRho + item.startRho) / 2 + (item.endRho - item.startRho) / 3;
        //update positions
        opt.x = rho * Math.cos(theta) + centerX;
        opt.y = rho * Math.sin(theta) + centerY;

        x = rhoCenter * Math.cos(theta);
        y = rhoCenter * Math.sin(theta);

        if (chart.animate) {
            //set the line from the middle of the pie to the box.
            me.onAnimate(callout.lines, {
                to: {
                    path: ["M", x + centerX, y + centerY, "L", opt.x, opt.y, "Z", "M", opt.x, opt.y, "l", x > 0 ? offsetToSide: -offsetToSide, 0, "z"]
                }
            });
            //set box position
            me.onAnimate(callout.box, {
                to: {
                    x: opt.x + (x > 0 ? offsetToSide: -(offsetToSide + bbox.width + 2 * offsetBox)),
                    y: opt.y + (y > 0 ? ( - bbox.height - offsetBox / 2) : ( - bbox.height - offsetBox / 2)),
                    width: bbox.width + 2 * offsetBox,
                    height: bbox.height + 2 * offsetBox
                }
            });
            //set text position
            me.onAnimate(callout.label, {
                to: {
                    x: opt.x + (x > 0 ? (offsetToSide + offsetBox) : -(offsetToSide + bbox.width + offsetBox)),
                    y: opt.y + (y > 0 ? -bbox.height / 4: -bbox.height / 4)
                }
            });
        } else {
            //set the line from the middle of the pie to the box.
            callout.lines.setAttributes({
                path: ["M", x + centerX, y + centerY, "L", opt.x, opt.y, "Z", "M", opt.x, opt.y, "l", x > 0 ? offsetToSide: -offsetToSide, 0, "z"]
            },
            true);
            //set box position
            callout.box.setAttributes({
                x: opt.x + (x > 0 ? offsetToSide: -(offsetToSide + bbox.width + 2 * offsetBox)),
                y: opt.y + (y > 0 ? ( - bbox.height - offsetBox / 2) : ( - bbox.height - offsetBox / 2)),
                width: bbox.width + 2 * offsetBox,
                height: bbox.height + 2 * offsetBox
            },
            true);
            //set text position
            callout.label.setAttributes({
                x: opt.x + (x > 0 ? (offsetToSide + offsetBox) : -(offsetToSide + bbox.width + offsetBox)),
                y: opt.y + (y > 0 ? -bbox.height / 4: -bbox.height / 4)
            },
            true);
        }
        for (p in callout) {
            callout[p].show(true);
        }
    },

    // @private handles sprite animation for the series.
    onAnimate: function(sprite, attr) {
        sprite.show();
        //return this.callParent(arguments);
        var re = Ext.chart.series.Pie.superclass.onAnimate.apply(this, arguments);
        return re;
    },

    isItemInPoint: function(x, y, item, i) {
        var me = this,
            cx = me.centerX,
            cy = me.centerY,
            abs = Math.abs,
            dx = abs(x - cx),
            dy = abs(y - cy),
            startAngle = item.startAngle,
            endAngle = item.endAngle,
            rho = Math.sqrt(dx * dx + dy * dy),
            angle = Math.atan2(y - cy, x - cx) / me.rad + 360;
        
        // normalize to the same range of angles created by drawSeries
        if (angle > me.firstAngle) {
            angle -= 360;
        }
        return (angle <= startAngle && angle > endAngle
                && rho >= item.startRho && rho <= item.endRho);
    },
    
    // @private hides all elements in the series.
    hideAll: function() {
        var i, l, shadow, shadows, sh, lsh, sprite;
        if (!isNaN(this._index)) {
            this.__excludes = this.__excludes || [];
            this.__excludes[this._index] = true;
            sprite = this.slices[this._index].sprite;
            for (sh = 0, lsh = sprite.length; sh < lsh; sh++) {
                sprite[sh].setAttributes({
                    hidden: true
                }, true);
            }
            if (this.slices[this._index].shadowAttrs) {
                for (i = 0, shadows = this.slices[this._index].shadowAttrs, l = shadows.length; i < l; i++) {
                    shadow = shadows[i];
                    for (sh = 0, lsh = shadow.length; sh < lsh; sh++) {
                        shadow[sh].setAttributes({
                            hidden: true
                        }, true);
                    }
                }
            }
            this.drawSeries();
        }
    },
    
    // @private shows all elements in the series.
    showAll: function() {
        if (!isNaN(this._index)) {
            this.__excludes[this._index] = false;
            this.drawSeries();
        }
    },

    /**
     * Highlight the specified item. If no item is provided the whole series will be highlighted.
     * @param item {Object} Info about the item; same format as returned by #getItemForPoint
     */
    highlightItem: function(item) {
        var me = this,
            rad = me.rad;
        item = item || this.items[this._index];
        if (!item || item.sprite && item.sprite._animating) {
            return;
        }
        //me.callParent([item]);
        Ext.chart.series.Pie.superclass.highlightItem.call(me, item);
        if (!me.highlight) {
            return;
        }
        if ('segment' in me.highlightCfg) {
            var highlightSegment = me.highlightCfg.segment,
                animate = me.chart.animate,
                attrs, i, shadows, shadow, ln, to, itemHighlightSegment, prop;
            //animate labels
            if (me.labelsGroup) {
                var group = me.labelsGroup,
                    display = me.label.display,
                    label = group.getAt(item.index),
                    middle = (item.startAngle + item.endAngle) / 2 * rad,
                    r = highlightSegment.margin || 0,
                    x = r * Math.cos(middle),
                    y = r * Math.sin(middle);


                if (animate) {
                    label.stopFx();
                    label.animate({
                        to: {
                            translate: {
                                x: x,
                                y: y
                            }
                        },
                        duration: me.highlightDuration
                    });
                }
                else {
                    label.setAttributes({
                        translate: {
                            x: x,
                            y: y
                        }
                    }, true);
                }
            }
            //animate shadows
            if (me.chart.shadow && item.shadows) {
                i = 0;
                shadows = item.shadows;
                ln = shadows.length;
                for (; i < ln; i++) {
                    shadow = shadows[i];
                    to = {};
                    itemHighlightSegment = item.sprite._from.segment;
                    for (prop in itemHighlightSegment) {
                        if (! (prop in highlightSegment)) {
                            to[prop] = itemHighlightSegment[prop];
                        }
                    }
                    attrs = {
                        segment: Ext.apply(to, me.highlightCfg.segment)
                    };
                    if (animate) {
                        shadow.stopFx();
                        shadow.animate({
                            to: attrs,
                            duration: me.highlightDuration
                        });
                    }
                    else {
                        shadow.setAttributes(attrs, true);
                    }
                }
            }
        }
    },

    /**
     * un-highlights the specified item. If no item is provided it will un-highlight the entire series.
     * @param item {Object} Info about the item; same format as returned by #getItemForPoint
     */
    unHighlightItem: function() {
        var me = this;
        if (!me.highlight) {
            return;
        }

        if (('segment' in me.highlightCfg) && me.items) {
            var items = me.items,
                animate = me.chart.animate,
                shadowsEnabled = !!me.chart.shadow,
                group = me.labelsGroup,
                len = items.length,
                i = 0,
                j = 0,
                display = me.label.display,
                shadowLen, p, to, ihs, hs, sprite, shadows, shadow, item, label, attrs;

            for (; i < len; i++) {
                item = items[i];
                if (!item) {
                    continue;
                }
                sprite = item.sprite;
                if (sprite && sprite._highlighted) {
                    //animate labels
                    if (group) {
                        label = group.getAt(item.index);
                        attrs = Ext.apply({
                            translate: {
                                x: 0,
                                y: 0
                            }
                        },
                        display == 'rotate' ? {
                            rotate: {
                                x: label.attr.x,
                                y: label.attr.y,
                                degrees: label.attr.rotation.degrees
                            }
                        }: {});
                        if (animate) {
                            label.stopFx();
                            label.animate({
                                to: attrs,
                                duration: me.highlightDuration
                            });
                        }
                        else {
                            label.setAttributes(attrs, true);
                        }
                    }
                    if (shadowsEnabled) {
                        shadows = item.shadows;
                        shadowLen = shadows.length;
                        for (; j < shadowLen; j++) {
                            to = {};
                            ihs = item.sprite._to.segment;
                            hs = item.sprite._from.segment;
                            Ext.apply(to, hs);
                            for (p in ihs) {
                                if (! (p in hs)) {
                                    to[p] = ihs[p];
                                }
                            }
                            shadow = shadows[j];
                            if (shadow) {
                                shadow.stopFx();
                                shadow.animate({
                                    to: {
                                        segment: to
                                    },
                                    duration: me.highlightDuration
                                });
                            }
                            else {
                                shadow.setAttributes({ segment: to }, true);
                            }
                        }
                    }
                }
            }
        }
        //me.callParent(arguments);
        Ext.chart.series.Pie.superclass.unHighlightItem.call(me);
    },
    
    /**
     * Returns the color of the series (to be displayed as color for the series legend item).
     * @param item {Object} Info about the item; same format as returned by #getItemForPoint
     */
    getLegendColor: function(index) {
        var me = this;
        return me.colorArrayStyle[index % me.colorArrayStyle.length];
    }
});

/**
 * @class Ext.chart.series.Radar
 * @extends Ext.chart.series.Series
 * 
 * Creates a Radar Chart. A Radar Chart is a useful visualization technique for comparing different quantitative values for 
 * a constrained number of categories.
 * As with all other series, the Radar series must be appended in the *series* Chart array configuration. See the Chart 
 * documentation for more information. A typical configuration object for the radar series could be:
 * 
  <pre><code>
        series: [{
            type: 'radar',
            xField: 'name',
            yField: 'data1',
            showMarkers: true,
            markerCfg: {
                radius: 5,
                size: 5
            },
            style: {
                'stroke-width': 2,
                fill: 'none'
            }
        },{
            type: 'radar',
            xField: 'name',
            yField: 'data2',
            showMarkers: true,
            markerCfg: {
                radius: 5,
                size: 5
            },
            style: {
                'stroke-width': 2,
                fill: 'none'
            }
        },{
            type: 'radar',
            xField: 'name',
            yField: 'data3',
            showMarkers: true,
            markerCfg: {
                radius: 5,
                size: 5
            },
            style: {
                'stroke-width': 2,
                fill: 'none'
            }
        }]
   </code></pre>
 * 
 * In this configuration we add three series to the chart. Each of these series is bound to the same categories field, `name` but bound to different properties for each category,
 * `data1`, `data2` and `data3` respectively. All series display markers by having `showMarkers` enabled. The configuration for the markers of each series can be set by adding properties onto 
 * the markerCfg object. Finally we override some theme styling properties by adding properties to the `style` object.
 * 
 * @xtype radar
 * 
 */
Ext.chart.series.Radar = Ext.extend(Ext.chart.series.Series, {

    //requires: ['Ext.chart.Shapes', 'Ext.fx.Anim'],

    type: "pie",
    rad: Math.PI / 180,

    showInLegend: false,

    /**
     * @cfg {Object} style
     * An object containing styles for overriding series styles from Theming.
     */
    style: {},
    
    constructor: function(config) {
        //this.callParent(arguments);
        Ext.chart.series.Radar.superclass.constructor.call(this, config);
        var me = this,
            surface = me.chart.surface, i, l;
        me.group = surface.getGroup(me.seriesId);
        if (me.showMarkers) {
            me.markerGroup = surface.getGroup(me.seriesId + '-markers');
        }
    },

    /**
     * Draws the series for the current chart.
     */
    drawSeries: function() {
        var me = this,
            store = me.chart.substore || me.chart.store,
            group = me.group,
            sprite,
            chart = me.chart,
            animate = chart.animate,
            field = me.field || me.yField,
            surface = chart.surface,
            chartBBox = chart.chartBBox,
            rendererAttributes,
            centerX, centerY,
            items,
            radius,
            maxValue = 0,
            fields = [],
            max = Math.max,
            cos = Math.cos,
            sin = Math.sin,
            pi2 = Math.PI * 2,
            l = store.getCount(),
            startPath, path, x, y, rho,
            i, nfields,
            seriesStyle = me.seriesStyle,
            seriesLabelStyle = me.seriesLabelStyle,
            first = chart.resizing || !me.radar;
        
        Ext.apply(seriesStyle, me.style || {});
        
        //if the store is empty then there's nothing to draw
        if (!store || !store.getCount()) {
            return;
        }
        
        me.unHighlightItem();
        me.cleanHighlights();

        centerX = me.centerX = chartBBox.x + (chartBBox.width / 2);
        centerY = me.centerY = chartBBox.y + (chartBBox.height / 2);
        me.radius = radius = Math.min(chartBBox.width, chartBBox.height) /2;
        me.items = items = [];

        //get all renderer fields
        chart.series.each(function(series) {
            fields.push(series.yField);
        });
        //get maxValue to interpolate
        store.each(function(record, i) {
            for (i = 0, nfields = fields.length; i < nfields; i++) {
                maxValue = max(+record.get(fields[i]), maxValue);
            }
        });
        //create path and items
        startPath = []; path = [];
        store.each(function(record, i) {
            rho = radius * record.get(field) / maxValue;
            x = rho * cos(i / l * pi2);
            y = rho * sin(i / l * pi2);
            if (i == 0) {
                path.push('M', x + centerX, y + centerY);
                startPath.push('M', 0.01 * x + centerX, 0.01 * y + centerY);
            } else {
                path.push('L', x + centerX, y + centerY);
                startPath.push('L', 0.01 * x + centerX, 0.01 * y + centerY);
            }
            items.push({
                sprite: false, //TODO(nico): add markers
                point: [centerX + x, centerY + y]
            });
        });
        path.push('Z');
        //create path sprite
        if (!me.radar) {
            me.radar = surface.add(Ext.apply({
                type: 'path',
                group: group,
                path: startPath
            }, seriesStyle || {}));
        }
        //reset on resizing
        if (chart.resizing) {
            me.radar.setAttributes({
                path: startPath
            }, true);
        }
        //render/animate
        if (chart.animate) {
            me.onAnimate(me.radar, {
                to: Ext.apply({
                    path: path
                }, seriesStyle || {})
            });
        } else {
            me.radar.setAttributes(Ext.apply({
                path: path
            }, seriesStyle || {}), true);
        }
        //render markers, labels and callouts
        if (me.showMarkers) {
            me.drawMarkers();
        }
        me.renderLabels();
        me.renderCallouts();
    },
    
    // @private draws the markers for the lines (if any).
    drawMarkers: function() {
        var me = this,
            chart = me.chart,
            surface = chart.surface,
            markerStyle = Ext.apply({}, me.markerStyle || {}),
            endMarkerStyle = Ext.apply(markerStyle, me.markerCfg),
            items = me.items, 
            type = endMarkerStyle.type,
            markerGroup = me.markerGroup,
            centerX = me.centerX,
            centerY = me.centerY,
            item, i, l, marker;
        
        delete endMarkerStyle.type;
        
        for (i = 0, l = items.length; i < l; i++) {
            item = items[i];
            marker = markerGroup.getAt(i);
            if (!marker) {
                marker = Ext.chart.Shapes[type](surface, Ext.apply({
                    group: markerGroup,
                    x: 0,
                    y: 0,
                    translate: {
                        x: centerX,
                        y: centerY
                    }
                }, endMarkerStyle));
            }
            else {
                marker.show();
            }
            if (chart.resizing) {
                marker.setAttributes({
                    x: 0,
                    y: 0,
                    translate: {
                        x: centerX,
                        y: centerY
                    }
                }, true);
            }
            marker._to = {
                translate: {
                    x: item.point[0],
                    y: item.point[1]
                }
            };
            //render/animate
            if (chart.animate) {
                me.onAnimate(marker, {
                    to: marker._to
                });
            }
            else {
                marker.setAttributes(Ext.apply(marker._to, endMarkerStyle || {}), true);
            }
        }
    },

    // @private callback for when creating a label sprite.
    onCreateLabel: function(storeItem, item, i, display) {
        var me = this,
            group = me.labelsGroup,
            config = me.label,
            centerX = me.centerX,
            centerY = me.centerY,
            point = item.point,
            endLabelStyle = Ext.apply(me.seriesLabelStyle || {}, config);
        
        return me.chart.surface.add(Ext.apply({
            'type': 'text',
            'text-anchor': 'middle',
            'group': group,
            'x': centerX,
            'y': centerY
        }, config || {}));
    },

    // @private callback for when placing a label sprite.
    onPlaceLabel: function(label, storeItem, item, i, display, animate) {
        var me = this,
            chart = me.chart,
            resizing = chart.resizing,
            config = me.label,
            format = config.renderer,
            field = config.field,
            centerX = me.centerX,
            centerY = me.centerY,
            opt = {
                x: item.point[0],
                y: item.point[1]
            },
            x = opt.x - centerX,
            y = opt.y - centerY;

        label.setAttributes({
            text: format(storeItem.get(field)),
            hidden: true
        },
        true);
        
        if (resizing) {
            label.setAttributes({
                x: centerX,
                y: centerY
            }, true);
        }
        
        if (animate) {
            label.show(true);
            me.onAnimate(label, {
                to: opt
            });
        } else {
            label.setAttributes(opt, true);
            label.show(true);
        }
    },

    // @private for toggling (show/hide) series. 
    toggleAll: function(show) {
        var me = this,
            i, ln, shadow, shadows;
        if (!show) {
            Ext.chart.series.Radar.superclass.hideAll.call(me);
        }
        else {
            Ext.chart.series.Radar.superclass.showAll.call(me);
        }
        if (me.radar) {
            me.radar.setAttributes({
                hidden: !show
            }, true);
            //hide shadows too
            if (me.radar.shadows) {
                for (i = 0, shadows = me.radar.shadows, ln = shadows.length; i < ln; i++) {
                    shadow = shadows[i];
                    shadow.setAttributes({
                        hidden: !show
                    }, true);
                }
            }
        }
    },
    
    // @private hide all elements in the series.
    hideAll: function() {
        this.toggleAll(false);
        this.hideMarkers(0);
    },
    
    // @private show all elements in the series.
    showAll: function() {
        this.toggleAll(true);
    },
    
    // @private hide all markers that belong to `markerGroup`
    hideMarkers: function(index) {
        var me = this,
            count = me.markerGroup && me.markerGroup.getCount() || 0,
            i = index || 0;
        for (; i < count; i++) {
            me.markerGroup.getAt(i).hide(true);
        }
    }
});

/**
 * @class Ext.chart.series.Scatter
 * @extends Ext.chart.series.Cartesian
 * 
 * Creates a Scatter Chart. The scatter plot is useful when trying to display more than two variables in the same visualization. 
 * These variables can be mapped into x, y coordinates and also to an element's radius/size, color, etc.
 * As with all other series, the Scatter Series must be appended in the *series* Chart array configuration. See the Chart 
 * documentation for more information on creating charts. A typical configuration object for the scatter could be:
 * 
  <pre><code>
        series: [{
            type: 'scatter',
            markerCfg: {
                radius: 5,
                size: 5
            },
            axis: 'left',
            xField: 'name',
            yField: 'data1'
        }, {
            type: 'scatter',
            markerCfg: {
                radius: 5,
                size: 5
            },
            axis: 'left',
            xField: 'name',
            yField: 'data2'
        }, {
            type: 'scatter',
            markerCfg: {
                radius: 5,
                size: 5
            },
            axis: 'left',
            xField: 'name',
            yField: 'data3'
        }]
   </code></pre>
 
 * 
 * In this configuration we add three different categories of scatter series. Each of them is bound to a different field of the same data store, 
 * `data1`, `data2` and `data3` respectively. All x-fields for the series must be the same field, in this case `name`. 
 * Each scatter series has a different styling configuration for markers, specified by the `markerCfg` object. Finally we set the left axis as 
 * axis to show the current values of the elements.
 * 
 * @xtype scatter
 * 
 */
Ext.chart.series.Scatter = Ext.extend(Ext.chart.series.Cartesian, {

    //requires: ['Ext.chart.axis.Axis', 'Ext.chart.Shapes', 'Ext.fx.Anim'],

    type: 'scatter',

    /**
     * @cfg {Object} markerCfg
     * The display style for the scatter series markers.
     */
    
    /**
     * @cfg {Object} style 
     * Append styling properties to this object for it to override theme properties.
     */

    constructor: function(config) {
        //this.callParent(arguments);
        Ext.chart.series.Scatter.superclass.constructor.call(this, config);
        var me = this,
            shadow = me.chart.shadow,
            surface = me.chart.surface, i, l;
        Ext.apply(me, config, {
            style: {},
            markerCfg: {},
            shadowAttributes: [{
                "stroke-width": 6,
                "stroke-opacity": 0.05,
                stroke: 'rgb(0, 0, 0)'
            }, {
                "stroke-width": 4,
                "stroke-opacity": 0.1,
                stroke: 'rgb(0, 0, 0)'
            }, {
                "stroke-width": 2,
                "stroke-opacity": 0.15,
                stroke: 'rgb(0, 0, 0)'
            }]
        });
        me.group = surface.getGroup(me.seriesId);
        if (shadow) {
            for (i = 0, l = me.shadowAttributes.length; i < l; i++) {
                me.shadowGroups.push(surface.getGroup(me.seriesId + '-shadows' + i));
            }
        }
    },

    // @private Get chart and data boundaries
    getBounds: function() {
        var me = this,
            chart = me.chart,
            store = chart.substore || chart.store,
            axes = [].concat(me.axis),
            bbox, xScale, yScale, ln, minX, minY, maxX, maxY, i, axis;

        me.setBBox();
        bbox = me.bbox;

        for (i = 0, ln = axes.length; i < ln; i++) { 
            axis = chart.axes.get(axes[i]);
            if (axis) {
                if (axis.position == 'top' || axis.position == 'bottom') {
                    minX = axis.from;
                    maxX = axis.to;
                }
                else {
                    minY = axis.from;
                    maxY = axis.to;
                }
            }
        }
        // If a field was specified without a corresponding axis, create one to get bounds
        if (me.xField && !Ext.isNumber(minX)) {
            axis = new Ext.chart.axis.Axis({
                chart: chart,
                fields: [].concat(me.xField)
            }).calcEnds();
            minX = axis.from;
            maxX = axis.to;
        }
        if (me.yField && !Ext.isNumber(minY)) {
            axis = new Ext.chart.axis.Axis({
                chart: chart,
                fields: [].concat(me.yField)
            }).calcEnds();
            minY = axis.from;
            maxY = axis.to;
        }

        if (isNaN(minX)) {
            minX = 0;
            xScale = bbox.width / (store.getCount() - 1);
        }
        else {
            xScale = bbox.width / (maxX - minX);
        }

        if (isNaN(minY)) {
            minY = 0;
            yScale = bbox.height / (store.getCount() - 1);
        } 
        else {
            yScale = bbox.height / (maxY - minY);
        }

        return {
            bbox: bbox,
            minX: minX,
            minY: minY,
            xScale: xScale,
            yScale: yScale
        };
    },

    // @private Build an array of paths for the chart
    getPaths: function() {
        var me = this,
            chart = me.chart,
            enableShadows = chart.shadow,
            store = chart.substore || chart.store,
            group = me.group,
            bounds = me.bounds = me.getBounds(),
            bbox = me.bbox,
            xScale = bounds.xScale,
            yScale = bounds.yScale,
            minX = bounds.minX,
            minY = bounds.minY,
            boxX = bbox.x,
            boxY = bbox.y,
            boxHeight = bbox.height,
            items = me.items = [],
            attrs = [],
            x, y, xValue, yValue, sprite;

        store.each(function(record, i) {
            xValue = record.get(me.xField);
            yValue = record.get(me.yField);

            // Ensure a value
            if (typeof xValue == 'string') {
                xValue = i;
            }
            if (typeof yValue == 'string') {
                yValue = i;
            }
            x = boxX + (xValue - minX) * xScale;
            y = boxY + boxHeight - (yValue - minY) * yScale;
            attrs.push({
                x: x,
                y: y
            });

            me.items.push({
                series: me,
                value: [xValue, yValue],
                point: [x, y],
                storeItem: record
            });

            // When resizing, reset before animating
            if (chart.animate && chart.resizing) {
                sprite = group.getAt(i);
                if (sprite) {
                    me.resetPoint(sprite);
                    if (enableShadows) {
                        me.resetShadow(sprite);
                    }
                }
            }
        });
        return attrs;
    },

    // @private translate point to the center
    resetPoint: function(sprite) {
        var bbox = this.bbox;
        sprite.setAttributes({
            translate: {
                x: (bbox.x + bbox.width) / 2,
                y: (bbox.y + bbox.height) / 2
            }
        }, true);
    },

    // @private translate shadows of a sprite to the center
    resetShadow: function(sprite) {
        var me = this,
            shadows = sprite.shadows,
            shadowAttributes = me.shadowAttributes,
            ln = me.shadowGroups.length,
            bbox = me.bbox,
            i, attr;
        for (i = 0; i < ln; i++) {
            attr = Ext.apply({}, shadowAttributes[i]);
            if (attr.translate) {
                attr.translate.x += (bbox.x + bbox.width) / 2;
                attr.translate.y += (bbox.y + bbox.height) / 2;
            }
            else {
                attr.translate = {
                    x: (bbox.x + bbox.width) / 2,
                    y: (bbox.y + bbox.height) / 2
                };
            }
            shadows[i].setAttributes(attr, true);
        }
    },

    // @private create a new point
    createPoint: function(attr, type) {
        var me = this,
            chart = me.chart,
            group = me.group,
            bbox = me.bbox;

        return Ext.chart.Shapes[type](chart.surface, Ext.apply({}, {
            x: 0,
            y: 0,
            group: group,
            translate: {
                x: (bbox.x + bbox.width) / 2,
                y: (bbox.y + bbox.height) / 2
            }
        }, attr));
    },

    // @private create a new set of shadows for a sprite
    createShadow: function(sprite) {
        var me = this,
            chart = me.chart,
            shadowGroups = me.shadowGroups,
            shadowAttributes = me.shadowAttributes,
            lnsh = shadowGroups.length,
            bbox = me.bbox,
            i, shadow, shadows, attr, endMarkerStyle, type;

        endMarkerStyle = Ext.apply(me.markerStyle, me.markerCfg);
        type = endMarkerStyle.type;
        delete endMarkerStyle.type;

        sprite.shadows = shadows = [];

        for (i = 0; i < lnsh; i++) {
            attr = Ext.apply({}, shadowAttributes[i]);
            if (attr.translate) {
                attr.translate.x += (bbox.x + bbox.width) / 2;
                attr.translate.y += (bbox.y + bbox.height) / 2;
            }
            else {
                Ext.apply(attr, {
                    translate: {
                        x: (bbox.x + bbox.width) / 2,
                        y: (bbox.y + bbox.height) / 2
                    }
                });
            }
            Ext.apply(attr, endMarkerStyle);
            shadow = Ext.chart.Shapes[type](chart.surface, Ext.apply({}, {
                x: 0,
                y: 0,
                group: shadowGroups[i]
            }, attr));
            shadows.push(shadow);
        }
    },

    /**
     * Draws the series for the current chart.
     */
    drawSeries: function() {
        var me = this,
            chart = me.chart,
            store = chart.substore || chart.store,
            group = me.group,
            enableShadows = chart.shadow,
            shadowGroups = me.shadowGroups,
            shadowAttributes = me.shadowAttributes,
            lnsh = shadowGroups.length,
            sprite, attrs, attr, ln, i, endMarkerStyle, shindex, type, shadows,
            rendererAttributes, shadowAttribute;

        endMarkerStyle = Ext.apply(me.markerStyle, me.markerCfg);
        type = endMarkerStyle.type;
        delete endMarkerStyle.type;

        //if the store is empty then there's nothing to be rendered
        if (!store || !store.getCount()) {
            return;
        }

        me.unHighlightItem();
        me.cleanHighlights();

        attrs = me.getPaths();
        ln = attrs.length;
        for (i = 0; i < ln; i++) {
            attr = attrs[i];
            sprite = group.getAt(i);
            Ext.apply(attr, endMarkerStyle);

            // Create a new sprite if needed (no height)
            if (!sprite) {
                sprite = me.createPoint(attr, type);
                if (enableShadows) {
                    me.createShadow(sprite);
                }
            }

            shadows = sprite.shadows;
            if (chart.animate) {
                rendererAttributes = me.renderer(sprite, store.getAt(i), { translate: attr }, i, store);
                sprite._to = rendererAttributes;
                me.onAnimate(sprite, {
                    to: rendererAttributes
                });
                //animate shadows
                for (shindex = 0; shindex < lnsh; shindex++) {
                    shadowAttribute = Ext.apply({}, shadowAttributes[shindex]);
                    rendererAttributes = me.renderer(shadows[shindex], store.getAt(i), Ext.apply({}, { 
                        translate: {
                            x: attr.x + (shadowAttribute.translate? shadowAttribute.translate.x : 0),
                            y: attr.y + (shadowAttribute.translate? shadowAttribute.translate.y : 0)
                        } 
                    }, shadowAttribute), i, store);
                    me.onAnimate(shadows[shindex], { to: rendererAttributes });
                }
            }
            else {
                rendererAttributes = me.renderer(sprite, store.getAt(i), Ext.apply({ translate: attr }, { hidden: false }), i, store);
                sprite.setAttributes(rendererAttributes, true);
                //update shadows
                for (shindex = 0; shindex < lnsh; shindex++) {
                    shadowAttribute = shadowAttributes[shindex];
                    rendererAttributes = me.renderer(shadows[shindex], store.getAt(i), Ext.apply({ 
                        x: attr.x,
                        y: attr.y
                    }, shadowAttribute), i, store);
                    shadows[shindex].setAttributes(rendererAttributes, true);
                }
            }
            me.items[i].sprite = sprite;
        }

        // Hide unused sprites
        ln = group.getCount();
        for (i = attrs.length; i < ln; i++) {
            group.getAt(i).hide(true);
        }
        me.renderLabels();
        me.renderCallouts();
    },
    
    // @private callback for when creating a label sprite.
    onCreateLabel: function(storeItem, item, i, display) {
        var me = this,
            group = me.labelsGroup,
            config = me.label,
            endLabelStyle = Ext.apply({}, config, me.seriesLabelStyle),
            bbox = me.bbox;
        
        return me.chart.surface.add(Ext.apply({
            type: 'text',
            group: group,
            x: item.point[0],
            y: bbox.y + bbox.height / 2
        }, endLabelStyle));
    },
    
    // @private callback for when placing a label sprite.
    onPlaceLabel: function(label, storeItem, item, i, display, animate) {
        var me = this,
            chart = me.chart,
            resizing = chart.resizing,
            config = me.label,
            format = config.renderer,
            field = config.field,
            bbox = me.bbox,
            x = item.point[0],
            y = item.point[1],
            radius = item.sprite.attr.radius,
            bb, width, height, anim;
        
        label.setAttributes({
            text: format(storeItem.get(field)),
            hidden: true
        }, true);
        
        if (display == 'rotate') {
            label.setAttributes({
                'text-anchor': 'start',
                'rotation': {
                    x: x,
                    y: y,
                    degrees: -45
                }
            }, true);
            //correct label position to fit into the box
            bb = label.getBBox();
            width = bb.width;
            height = bb.height;
            x = x < bbox.x? bbox.x : x;
            x = (x + width > bbox.x + bbox.width)? (x - (x + width - bbox.x - bbox.width)) : x;
            y = (y - height < bbox.y)? bbox.y + height : y;
        
        } else if (display == 'under' || display == 'over') {
            //TODO(nicolas): find out why width/height values in circle bounding boxes are undefined.
            bb = item.sprite.getBBox();
            bb.width = bb.width || (radius * 2);
            bb.height = bb.height || (radius * 2);
            y = y + (display == 'over'? -bb.height : bb.height);
            //correct label position to fit into the box
            bb = label.getBBox();
            width = bb.width/2;
            height = bb.height/2;
            x = x - width < bbox.x ? bbox.x + width : x;
            x = (x + width > bbox.x + bbox.width) ? (x - (x + width - bbox.x - bbox.width)) : x;
            y = y - height < bbox.y? bbox.y + height : y;
            y = (y + height > bbox.y + bbox.height) ? (y - (y + height - bbox.y - bbox.height)) : y;
        }

        if (!chart.animate) {
            label.setAttributes({
                x: x,
                y: y
            }, true);
            label.show(true);
        }
        else {
            if (resizing) {
                anim = item.sprite.hasActiveFx();
                if (anim) {
                    anim.on('afteranimate', function() {
                        label.setAttributes({
                            x: x,
                            y: y
                        }, true);
                        label.show(true);
                    });   
                }
                else {
                    label.show(true);
                }
            }
            else {
                me.onAnimate(label, {
                    to: {
                        x: x,
                        y: y
                    }
                });
            }
        }
    },
    
    // @private callback for when placing a callout sprite.    
    onPlaceCallout: function(callout, storeItem, item, i, display, animate, index) {
        var me = this,
            chart = me.chart,
            surface = chart.surface,
            resizing = chart.resizing,
            config = me.callouts,
            items = me.items,
            cur = item.point,
            normal,
            bbox = callout.label.getBBox(),
            offsetFromViz = 30,
            offsetToSide = 10,
            offsetBox = 3,
            boxx, boxy, boxw, boxh,
            p, clipRect = me.bbox,
            x, y;
    
        //position
        normal = [Math.cos(Math.PI /4), -Math.sin(Math.PI /4)];
        x = cur[0] + normal[0] * offsetFromViz;
        y = cur[1] + normal[1] * offsetFromViz;
        
        //box position and dimensions
        boxx = x + (normal[0] > 0? 0 : -(bbox.width + 2 * offsetBox));
        boxy = y - bbox.height /2 - offsetBox;
        boxw = bbox.width + 2 * offsetBox;
        boxh = bbox.height + 2 * offsetBox;
        
        //now check if we're out of bounds and invert the normal vector correspondingly
        //this may add new overlaps between labels (but labels won't be out of bounds).
        if (boxx < clipRect[0] || (boxx + boxw) > (clipRect[0] + clipRect[2])) {
            normal[0] *= -1;
        }
        if (boxy < clipRect[1] || (boxy + boxh) > (clipRect[1] + clipRect[3])) {
            normal[1] *= -1;
        }
    
        //update positions
        x = cur[0] + normal[0] * offsetFromViz;
        y = cur[1] + normal[1] * offsetFromViz;
        
        //update box position and dimensions
        boxx = x + (normal[0] > 0? 0 : -(bbox.width + 2 * offsetBox));
        boxy = y - bbox.height /2 - offsetBox;
        boxw = bbox.width + 2 * offsetBox;
        boxh = bbox.height + 2 * offsetBox;
        
        if (chart.animate) {
            //set the line from the middle of the pie to the box.
            me.onAnimate(callout.lines, {
                to: {
                    path: ["M", cur[0], cur[1], "L", x, y, "Z"]
                }
            }, true);
            //set box position
            me.onAnimate(callout.box, {
                to: {
                    x: boxx,
                    y: boxy,
                    width: boxw,
                    height: boxh
                }
            }, true);
            //set text position
            me.onAnimate(callout.label, {
                to: {
                    x: x + (normal[0] > 0? offsetBox : -(bbox.width + offsetBox)),
                    y: y
                }
            }, true);
        } else {
            //set the line from the middle of the pie to the box.
            callout.lines.setAttributes({
                path: ["M", cur[0], cur[1], "L", x, y, "Z"]
            }, true);
            //set box position
            callout.box.setAttributes({
                x: boxx,
                y: boxy,
                width: boxw,
                height: boxh
            }, true);
            //set text position
            callout.label.setAttributes({
                x: x + (normal[0] > 0? offsetBox : -(bbox.width + offsetBox)),
                y: y
            }, true);
        }
        for (p in callout) {
            callout[p].show(true);
        }
    },

    // @private handles sprite animation for the series.
    onAnimate: function(sprite, attr) {
        sprite.show();
        //return this.callParent(arguments);
        var re = Ext.chart.series.Scatter.superclass.onAnimate.apply(this, arguments);
        return re;
    },

    isItemInPoint: function(x, y, item) {
        var point,
            tolerance = 10,
            abs = Math.abs;

        function dist(point) {
            var dx = abs(point[0] - x),
                dy = abs(point[1] - y);
            return Math.sqrt(dx * dx + dy * dy);
        }
        point = item.point;
        return (point[0] - tolerance <= x && point[0] + tolerance >= x &&
            point[1] - tolerance <= y && point[1] + tolerance >= y);
    }
});

