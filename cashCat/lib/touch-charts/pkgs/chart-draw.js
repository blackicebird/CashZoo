/**
 * @class Ext.layout.component.Draw
 * @extends Ext.layout.component.Component
 * @private
 *
 */

Ext.layout.DrawLayout = Ext.extend(Ext.layout.AutoComponentLayout, {
    type: 'draw',

    onLayout : function(width, height) {
        this.owner.surface.setSize(width, height);
        Ext.layout.DrawLayout.superclass.onLayout.apply(this, arguments);
    }
});
Ext.regLayout('draw', Ext.layout.DrawLayout);

/**
 * @class Ext.draw.Color
 * @extends Object
 *
 * Represents an RGB color and provides helper functions get
 * color components in HSL color space.
 */
Ext.ns('Ext.draw.engine');

Ext.draw.Color = Ext.extend(Object, {

    colorToHexRe: /(.*?)rgb\((\d+),\s*(\d+),\s*(\d+)\)/,
    rgbRe: /\s*rgba?\s*\(\s*([0-9]+)\s*,\s*([0-9]+)\s*,\s*([0-9]+)\s*(,\s*[0-9\.]+\s*)?\)\s*/,
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
    // COMPAT Ext.util.Numbers -> Ext.Number
    constructor : function(red, green, blue) {
        var me = this,
            clamp = Ext.util.Numbers.constrain;
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
        // COMPAT Ext.util.Numbers -> Ext.Number
        hsl[2] = Ext.util.Numbers.constrain(hsl[2] + factor, 0, 1);
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
        var C, X, m, rgb = [],
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

(function() {
    var prototype = Ext.draw.Color.prototype;
    Ext.draw.Color.fromHSL = function() {
        return prototype.fromHSL.apply(prototype, arguments);
    };
    Ext.draw.Color.fromString = function() {
        return prototype.fromString.apply(prototype, arguments);
    };
    Ext.draw.Color.toHex = function() {
        return prototype.toHex.apply(prototype, arguments);
    };
})();

/**
 * @class Ext.draw.Draw
 * Base Drawing class.  Provides base drawing functions.
 */

Ext.draw.Draw = {

    pathToStringRE: /,?([achlmqrstvxz]),?/gi,
    pathCommandRE: /([achlmqstvz])[\s,]*((-?\d*\.?\d*(?:e[-+]?\d+)?\s*,?\s*)+)/ig,
    pathValuesRE: /(-?\d*\.?\d*(?:e[-+]?\d+)?)\s*,?\s*/ig,
    stopsRE: /^(\d+%?)$/,
    radian: Math.PI / 180,
    pi2: Math.PI * 2,
    snapEndsIntervalWeights: [[0, 15], [20, 4], [30, 2], [40, 4], [50, 9], [60, 4], [70, 2], [80, 4], [100, 15]],

    is: function(o, type) {
        type = String(type).toLowerCase();
        return (type == "object" && o === Object(o)) ||
            (type == "undefined" && typeof o == type) ||
            (type == "null" && o === null) ||
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

    // Convert the passed arrayPath to a proper SVG path string (d attribute)
    pathToString: function(arrayPath) {
        if (Ext.isArray(arrayPath)) {
            arrayPath = arrayPath.join(',');
        }
        return arrayPath.replace(Ext.draw.Draw.pathToStringRE, "$1");
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
            Ext.draw.Draw.pathToString(pathString).replace(me.pathCommandRE, function (a, b, c) {
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
            j, jj, i, ii;
        if (!this.is(pathArray, "array") || !this.is(pathArray && pathArray[0], "array")) { // rough assumption
            pathArray = this.parsePathString(pathArray);
        }
        for (i = 0, ii = pathArray.length; i < ii; i++) {
            res[i] = [];
            for (j = 0, jj = pathArray[i].length; j < jj; j++) {
                res[i][j] = pathArray[i][j];
            }
        }
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
            i = 0,
            ln = pathArray.length,
            r, pathSegment, j, ln2;
        // MoveTo initial x/y position
        if (pathArray[0][0] == "M") {
            x = +pathArray[0][1];
            y = +pathArray[0][2];
            mx = x;
            my = y;
            i++;
            res[0] = ["M", x, y];
        }
        for (; i < ln; i++) {
            r = res[i] = [];
            pathSegment = pathArray[i];
            if (pathSegment[0] != pathSegment[0].toUpperCase()) {
                r[0] = pathSegment[0].toUpperCase();
                switch (r[0]) {
                    // Elliptical Arc
                    case "A":
                        r[1] = pathSegment[1];
                        r[2] = pathSegment[2];
                        r[3] = pathSegment[3];
                        r[4] = pathSegment[4];
                        r[5] = pathSegment[5];
                        r[6] = +(pathSegment[6] + x);
                        r[7] = +(pathSegment[7] + y);
                        break;
                    // Vertical LineTo
                    case "V":
                        r[1] = +pathSegment[1] + y;
                        break;
                    // Horizontal LineTo
                    case "H":
                        r[1] = +pathSegment[1] + x;
                        break;
                    case "M":
                    // MoveTo
                        mx = +pathSegment[1] + x;
                        my = +pathSegment[2] + y;
                    default:
                        j = 1;
                        ln2 = pathSegment.length;
                        for (; j < ln2; j++) {
                            r[j] = +pathSegment[j] + ((j % 2) ? x : y);
                        }
                }
            }
            else {
                j = 0;
                ln2 = pathSegment.length;
                for (; j < ln2; j++) {
                    res[i][j] = pathSegment[j];
                }
            }
            switch (r[0]) {
                // ClosePath
                case "Z":
                    x = mx;
                    y = my;
                    break;
                // Horizontal LineTo
                case "H":
                    x = r[1];
                    break;
                // Vertical LineTo
                case "V":
                    y = r[1];
                    break;
                // MoveTo
                case "M":
                    pathSegment = res[i];
                    ln2 = pathSegment.length;
                    mx = pathSegment[ln2 - 2];
                    my = pathSegment[ln2 - 1];
                default:
                    pathSegment = res[i];
                    ln2 = pathSegment.length;
                    x = pathSegment[ln2 - 2];
                    y = pathSegment[ln2 - 1];
            }
        }
        return res;
    },

    // Returns a path converted to a set of curveto commands
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

    pathDimensions: function (path) {
        if (!path || !path.length) {
            return {x: 0, y: 0, width: 0, height: 0};
        }
        path = this.path2curve(path);
        var x = 0,
            y = 0,
            X = [],
            Y = [],
            i = 0,
            ln = path.length,
            p, xmin, ymin, dim;
        for (; i < ln; i++) {
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
            path: path,
            width: Math.max.apply(0, X) - xmin,
            height: Math.max.apply(0, Y) - ymin
        };
    },

    intersectInside: function(path, cp1, cp2) {
        return (cp2[0] - cp1[0]) * (path[1] - cp1[1]) > (cp2[1] - cp1[1]) * (path[0] - cp1[0]);
    },

    intersectIntersection: function(s, e, cp1, cp2) {
        var p = [],
            dcx = cp1[0] - cp2[0],
            dcy = cp1[1] - cp2[1],
            dpx = s[0] - e[0],
            dpy = s[1] - e[1],
            n1 = cp1[0] * cp2[1] - cp1[1] * cp2[0],
            n2 = s[0] * e[1] - s[1] * e[0],
            n3 = 1 / (dcx * dpy - dcy * dpx);

        p[0] = (n1 * dpx - n2 * dcx) * n3;
        p[1] = (n1 * dpy - n2 * dcy) * n3;
        return p;
    },

    intersect: function(subjectPolygon, clipPolygon) {
        var me = this,
            i = 0,
            ln = clipPolygon.length,
            cp1 = clipPolygon[ln - 1],
            outputList = subjectPolygon,
            cp2, s, e, ln2, inputList, j;
        for (; i < ln; ++i) {
            cp2 = clipPolygon[i];
            inputList = outputList;
            outputList = [];
            s = inputList[inputList.length - 1];
            j = 0;
            ln2 = inputList.length;
            for (; j < ln2; j++) {
                e = inputList[j];
                if (me.intersectInside(e, cp1, cp2)) {
                    if (!me.intersectInside(s, cp1, cp2)) {
                        outputList.push(me.intersectIntersection(s, e, cp1, cp2));
                    }
                    outputList.push(e);
                }
                else if (me.intersectInside(s, cp1, cp2)) {
                    outputList.push(me.intersectIntersection(s, e, cp1, cp2));
                }
                s = e;
            }
            cp1 = cp2;
        }
        return outputList;
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

    /**
     * @private
     *
     * Calculates bezier curve control anchor points for a particular point in a path, with a
     * smoothing curve applied. The smoothness of the curve is controlled by the 'value' parameter.
     * Note that this algorithm assumes that the line being smoothed is normalized going from left
     * to right; it makes special adjustments assuming this orientation.
     *
     * @param {Number} prevX X coordinate of the previous point in the path
     * @param {Number} prevY Y coordinate of the previous point in the path
     * @param {Number} curX X coordinate of the current point in the path
     * @param {Number} curY Y coordinate of the current point in the path
     * @param {Number} nextX X coordinate of the next point in the path
     * @param {Number} nextY Y coordinate of the next point in the path
     * @param {Number} value A value to control the smoothness of the curve; this is used to
     *                 divide the distance between points, so a value of 2 corresponds to
     *                 half the distance between points (a very smooth line) while higher values
     *                 result in less smooth curves. Defaults to 4.
     * @return {Object} Object containing x1, y1, x2, y2 bezier control anchor points; x1 and y1
     *                  are the control point for the curve toward the previous path point, and
     *                  x2 and y2 are the control point for the curve toward the next path point.
     */
    getAnchors: function (prevX, prevY, curX, curY, nextX, nextY, value) {
        value = value || 4;
        var math = Math,
            PI = math.PI,
            halfPI = PI / 2,
            abs = math.abs,
            sin = math.sin,
            cos = math.cos,
            atan = math.atan,
            control1Length, control2Length, control1Angle, control2Angle,
            control1X, control1Y, control2X, control2Y, alpha;

        // Find the length of each control anchor line, by dividing the horizontal distance
        // between points by the value parameter.
        control1Length = (curX - prevX) / value;
        control2Length = (nextX - curX) / value;

        // Determine the angle of each control anchor line. If the middle point is a vertical
        // turnaround then we force it to a flat horizontal angle to prevent the curve from
        // dipping above or below the middle point. Otherwise we use an angle that points
        // toward the previous/next target point.
        if ((curY >= prevY && curY >= nextY) || (curY <= prevY && curY <= nextY)) {
            control1Angle = control2Angle = halfPI;
        } else {
            control1Angle = atan((curX - prevX) / abs(curY - prevY));
            if (prevY < curY) {
                control1Angle = PI - control1Angle;
            }
            control2Angle = atan((nextX - curX) / abs(curY - nextY));
            if (nextY < curY) {
                control2Angle = PI - control2Angle;
            }
        }

        // Adjust the calculated angles so they point away from each other on the same line
        alpha = halfPI - ((control1Angle + control2Angle) % (PI * 2)) / 2;
        if (alpha > halfPI) {
            alpha -= PI;
        }
        control1Angle += alpha;
        control2Angle += alpha;

        // Find the control anchor points from the angles and length
        control1X = curX - control1Length * sin(control1Angle);
        control1Y = curY + control1Length * cos(control1Angle);
        control2X = curX + control2Length * sin(control2Angle);
        control2Y = curY + control2Length * cos(control2Angle);

        // One last adjustment, make sure that no control anchor point extends vertically past
        // its target prev/next point, as that results in curves dipping above or below and
        // bending back strangely. If we find this happening we keep the control angle but
        // reduce the length of the control line so it stays within bounds.
        if ((curY > prevY && control1Y < prevY) || (curY < prevY && control1Y > prevY)) {
            control1X += abs(prevY - control1Y) * (control1X - curX) / (control1Y - curY);
            control1Y = prevY;
        }
        if ((curY > nextY && control2Y < nextY) || (curY < nextY && control2Y > nextY)) {
            control2X -= abs(nextY - control2Y) * (control2X - curX) / (control2Y - curY);
            control2Y = nextY;
        }

        return {
            x1: control1X,
            y1: control1Y,
            x2: control2X,
            y2: control2Y
        };
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


    /**
     * snapEnds is a utility function that gives you axis ticks information based on start, end
     * and preferred number of steps. It happens quite often that you have just a dataset and need to
     * build an axis. If you simply take min and max and divide delta to number of steps you could get
     * very ugly numbers. Lets say you have min = 0.532 and max = 0.823 and you want to draw axis
     * across 20 steps. Simple calculation like (max - min) / steps will give us: 0.014549(9), so
     * your axis will look like this:
     *
     *     0.532, 0.5465499, 0.5610998, 0.5756497, etc
     *
     * Not pretty at all. snapEnds will give different set of numbers for the same values:
     *
     *     0.5, 0.52, 0.54, 0.56, 0.58, 0.6, 0.62, ... 0.8, 0.82, 0.84
     *
     * It starts a bit earlier and ends a bit later and trying to find a step which will look nice.
     *
     * @param {Number} from The minimum value in the data
     * @param {Number} to The maximum value in the data
     * @param {Number} stepsMax The maximum number of ticks
     * @param {Number} endsLocked If true, the 'from' and 'to' parameters will be used as fixed end values
     *        and will not be adjusted
     * @return {Object} The calculated step and ends info; properties are:
     *     - from: The result start value, which may be lower than the original start value
     *     - to: The result end value, which may be higher than the original end value
     *     - power: The power of 10 used in the step calculation
     *     - step: The value size of each step
     *     - steps: The number of steps. NOTE: the steps may not divide the from/to range perfectly evenly;
     *              there may be a smaller distance between the last step and the end value than between prior
     *              steps, particularly when the `endsLocked` param is true. Therefore it is best to not use
     *              the `steps` result when finding the axis tick points, instead use the `step`, `to`, and
     *              `from` to find the correct point for each tick.
     */
    snapEnds: function (from, to, stepsMax, endsLocked) {
        var math = Math,
            pow = math.pow,
            floor = math.floor,

            // start with a precise step size
            step = (to - from) / stepsMax,

            // power is a power of 10 of the step. For axis 1, 2, 3 or 10, 20, 30 or
            // 0.1, 0.2, 0.3 power will be 0, 1 and -1 respectively.
            power = floor(math.log(step) / math.LN10) + 1,
            tenToPower = pow(10, power),

            // modulo will translate rounded value of the step to the 0 - 100 range. We will need it later.
            modulo = math.round((step % tenToPower) * pow(10, 2 - power)),

            // interval is an array of value/weight pairs
            interval = Ext.draw.Draw.snapEndsIntervalWeights,
            ln = interval.length,
            stepCount = 0,
            topWeight = 1e9,
            cur, value, weight, i, topValue;

        // round the start value by the power, so e.g. 0.532 will become 0.5.
        if (!endsLocked) {
            from = floor(from / tenToPower) * tenToPower;
        }
        cur = from;

        // find what is our step going to be to be closer to "pretty" numbers. This is done taking into
        // account the interval weights. This way we figure out topValue.
        for (i = 0; i < ln; i++) {
            value = interval[i][0];
            weight = (value - modulo) < 0 ? 1e6 : (value - modulo) / interval[i][1];
            if (weight < topWeight) {
                topValue = value;
                topWeight = weight;
            }
        }

        // with the new topValue, calculate the final step size
        step = floor(step * pow(10, -power)) * pow(10, power) + topValue * pow(10, power - 2);
        while (cur < to) {
            cur += step;
            stepCount++;
        }

        // Cut everything that is after tenth digit after floating point. This is to get rid of
        // rounding errors, i.e. 12.00000000000121212.
        if (!endsLocked) {
            to = +cur.toFixed(10);
        }

        return {
            from: from,
            to: to,
            power: power,
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
};

/**
 * @class Ext.draw.CompositeSprite
 * @extends Ext.util.MixedCollection
 *
 * A composite Sprite handles a group of sprites with common methods to a sprite
 * such as `hide`, `show`, `setAttributes`. These methods are applied to the set of sprites
 * added to the group.
 *
 * CompositeSprite extends {@link Ext.util.MixedCollection} so you can use the same methods
 * in `MixedCollection` to iterate through sprites, add and remove elements, etc.
 *
 * In order to create a CompositeSprite, one has to provide a handle to the surface where it is
 * rendered:
 *
 *     var group = Ext.create('Ext.draw.CompositeSprite', {
 *         surface: drawComponent.surface
 *     });
 *
 * Then just by using `MixedCollection` methods it's possible to add {@link Ext.draw.Sprite}s:
 *
 *     group.add(sprite1);
 *     group.add(sprite2);
 *     group.add(sprite3);
 *
 * And then apply common Sprite methods to them:
 *
 *     group.setAttributes({
 *         fill: '#f00'
 *     }, true);
 */
Ext.draw.CompositeSprite = Ext.extend(Ext.util.MixedCollection, {

    /* End Definitions */
    isCompositeSprite: true,
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
        Ext.draw.CompositeSprite.superclass.constructor.apply(this, arguments);
    },

    // @private
    onClick: function(e) {
        this.fireEvent('click', e);
    },

    // @private
    onMouseUp: function(e) {
        this.fireEvent('mouseup', e);
    },

    // @private
    onMouseDown: function(e) {
        this.fireEvent('mousedown', e);
    },

    // @private
    onMouseOver: function(e) {
        this.fireEvent('mouseover', e);
    },

    // @private
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

    /** Add a Sprite to the Group */
    add: function(key, o) {
        var result = Ext.draw.CompositeSprite.superclass.add.apply(this, arguments);
        this.attachEvents(result);
        return result;
    },

    insert: function(index, key, o) {
        return Ext.draw.CompositeSprite.superclass.insert.apply(this, arguments);
    },

    /** Remove a Sprite from the Group */
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
        Ext.draw.CompositeSprite.superclass.remove.apply(this, arguments);
    },

    /**
     * Returns the group bounding box.
     * Behaves like {@link Ext.draw.Sprite} getBBox method.
    */
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
            maxWidth = -infinity;

        for (; i < len; i++) {
            sprite = items[i];
            bb = sprite.getBBox();
            minX = Math.min(minX, bb.x);
            minY = Math.min(minY, bb.y);
            maxHeight = Math.max(maxHeight, bb.height + bb.y);
            maxWidth = Math.max(maxWidth, bb.width + bb.x);
        }

        return {
            x: minX,
            y: minY,
            height: maxHeight - minY,
            width: maxWidth - minX
        };
    },

    /**
     *  Iterates through all sprites calling
     *  `setAttributes` on each one. For more information
     *  {@link Ext.draw.Sprite} provides a description of the
     *  attributes that can be set with this method.
     */
    setAttributes: function(attrs, redraw) {
        var i = 0,
            items = this.items,
            len = this.length;

        for (; i < len; i++) {
            items[i].setAttributes(attrs, redraw);
        }
        return this;
    },

    /**
     * Hides all sprites. If the first parameter of the method is true
     * then a redraw will be forced for each sprite.
     */
    hide: function(redraw) {
        var i = 0,
            items = this.items,
            len = this.length;

        for (; i < len; i++) {
            items[i].hide(redraw);
        }
        return this;
    },

    /**
     * Shows all sprites. If the first parameter of the method is true
     * then a redraw will be forced for each sprite.
     */
    show: function(redraw) {
        var i = 0,
            items = this.items,
            len = this.length;

        for (; i < len; i++) {
            items[i].show(redraw);
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
            item, el;

        for (; i < len; i++) {
            item = items[i];
            el = item.el;
            if (el) {
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

Ext.applyIf(Ext.draw.CompositeSprite.prototype, Ext.util.Animate.prototype);
/**
 * @class Ext.draw.Sprite
 * @extends Object
 *
 * A Sprite is an object rendered in a Drawing surface. There are different options and types of sprites.
 * The configuration of a Sprite is an object with the following properties:
 *
 * - **type** - (String) The type of the sprite. Possible options are 'circle', 'path', 'rect', 'text', 'square', 'image'. 
 * - **width** - (Number) Used in rectangle sprites, the width of the rectangle.
 * - **height** - (Number) Used in rectangle sprites, the height of the rectangle.
 * - **size** - (Number) Used in square sprites, the dimension of the square.
 * - **radius** - (Number) Used in circle sprites, the radius of the circle.
 * - **x** - (Number) The position along the x-axis.
 * - **y** - (Number) The position along the y-axis.
 * - **path** - (Array) Used in path sprites, the path of the sprite written in SVG-like path syntax.
 * - **opacity** - (Number) The opacity of the sprite.
 * - **fill** - (String) The fill color.
 * - **stroke** - (String) The stroke color.
 * - **stroke-width** - (Number) The width of the stroke.
 * - **font** - (String) Used with text type sprites. The full font description. Uses the same syntax as the CSS `font` parameter.
 * - **text** - (String) Used with text type sprites. The text itself.
 * 
 * Additionally there are three transform objects that can be set with `setAttributes` which are `translate`, `rotate` and
 * `scale`.
 * 
 * For translate, the configuration object contains x and y attributes that indicate where to
 * translate the object. For example:
 * 
 *     sprite.setAttributes({
 *       translate: {
 *        x: 10,
 *        y: 10
 *       }
 *     }, true);
 * 
 * For rotation, the configuration object contains x and y attributes for the center of the rotation (which are optional),
 * and a `degrees` attribute that specifies the rotation in degrees. For example:
 * 
 *     sprite.setAttributes({
 *       rotate: {
 *        degrees: 90
 *       }
 *     }, true);
 * 
 * For scaling, the configuration object contains x and y attributes for the x-axis and y-axis scaling. For example:
 * 
 *     sprite.setAttributes({
 *       scale: {
 *        x: 10,
 *        y: 3
 *       }
 *     }, true);
 *
 * Sprites can be created with a reference to a {@link Ext.draw.Surface}
 *
 *      var drawComponent = Ext.create('Ext.draw.Component', options here...);
 *
 *      var sprite = Ext.create('Ext.draw.Sprite', {
 *          type: 'circle',
 *          fill: '#ff0',
 *          surface: drawComponent.surface,
 *          radius: 5
 *      });
 *
 * Sprites can also be added to the surface as a configuration object:
 *
 *      var sprite = drawComponent.surface.add({
 *          type: 'circle',
 *          fill: '#ff0',
 *          radius: 5
 *      });
 *
 * In order to properly apply properties and render the sprite we have to
 * `show` the sprite setting the option `redraw` to `true`:
 *
 *      sprite.show(true);
 *
 * The constructor configuration object of the Sprite can also be used and passed into the {@link Ext.draw.Surface}
 * add method to append a new sprite to the canvas. For example:
 *
 *     drawComponent.surface.add({
 *         type: 'circle',
 *         fill: '#ffc',
 *         radius: 100,
 *         x: 100,
 *         y: 100
 *     });
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

    minDefaults: {
        circle: {
            cx: 0,
            cy: 0,
            r: 0,
            fill: "none"
        },
        ellipse: {
            cx: 0,
            cy: 0,
            rx: 0,
            ry: 0,
            fill: "none"
        },
        rect: {
            x: 0,
            y: 0,
            width: 0,
            height: 0,
            rx: 0,
            ry: 0,
            fill: "none"
        },
        text: {
            x: 0,
            y: 0,
            "text-anchor": "start",
            fill: "#000"
        },
        path: {
            d: "M0,0",
            fill: "none"
        },
        image: {
            x: 0,
            y: 0,
            width: 0,
            height: 0,
            preserveAspectRatio: "none"
        }
    },

    constructor: function(config) {
        var me = this;
        config = config || {};
        me.id = Ext.id(null, 'ext-sprite-');
        me.transformations = [];
        me.surface = config.surface;
        me.group = config.group;
        me.type = config.type;
        //attribute bucket
        me.bbox = {};
        me.attr = {
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
        Ext.applyIf(config, me.minDefaults[me.type]);
        me.setAttributes(config);
        me.addEvents(
            'beforedestroy',
            'destroy',
            'render',
            'mousedown',
            'mouseup',
            'mouseover',
            'mouseout',
            'mousemove',
            'click',
            'rightclick',
            'mouseenter',
            'mouseleave',
            'touchstart',
            'touchmove',
            'touchend'
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
            hasSurface = !!me.surface,
            custom = hasSurface && me.surface.customAttributes || {},
            spriteAttrs = me.attr,
            attr, i, translate, translation, rotate, rotation, scale, scaling;

        attrs = Ext.apply({}, attrs);
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
            if ((!rotate.x || rotate.x !== rotation.x) || 
                (!rotate.y || rotate.y !== rotation.y) ||
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

        if (redraw === true && hasSurface) {
            me.redraw();
        }
        return this;
    },

    /**
     * Retrieve the bounding box of the sprite. This will be returned as an object with x, y, width, and height properties.
     * @return {Object} bbox
     */
    getBBox: function(isWithoutTransform) {
        return this.surface.getBBox(this, isWithoutTransform);
    },
    
    setText: function(text) {
        return this.surface.setText(this, text);
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
     * Remove the sprite.
     */
    remove: function() {
        if (this.surface) {
            this.surface.remove(this);
            return true;
        }
        return false;
    },

    onRemove: function() {
        this.surface.onRemove(this);
    },

    /**
     * Removes the sprite and clears all listeners.
     */
    destroy: function() {
        var me = this;
        if (me.fireEvent('beforedestroy', me) !== false) {
            me.remove();
            me.surface.onDestroy(me);
            me.clearListeners();
            me.fireEvent('destroy');
        }
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
     * Draw a sprite Tween (animation interpolation).
     * @return {Ext.draw.Sprite} this
     */
    tween: function() {
        this.surface.tween(this);
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

Ext.applyIf(Ext.draw.Sprite.prototype, Ext.util.Animate);

/**
 * @class Ext.draw.Matrix
 * @private
 */
Ext.draw.Matrix = Ext.extend(Object, {

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
            x, y, z, res;

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
        return me;
    },

    prepend: function(a, b, c, d, e, f) {
        var me = this,
            out = [[], [], []],
            matrix = [[a, c, e], [b, d, f], [0, 0, 1]],
            x, y, z, res;

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
        return me;
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
        var matrix = this.matrix;
        return new Ext.draw.Matrix(matrix[0][0], matrix[1][0], matrix[0][1], matrix[1][1], matrix[0][2], matrix[1][2]);
    },

    translate: function(x, y) {
        this.prepend(1, 0, 0, 1, x, y);
        return this;
    },

    scale: function(x, y, cx, cy) {
        var me = this;
        if (y == null) {
            y = x;
        }
        me.add(1, 0, 0, 1, cx, cy);
        me.add(x, 0, 0, y, 0, 0);
        me.add(1, 0, 0, 1, -cx, -cy);
        return me;
    },

    rotate: function(a, x, y) {
        a = Ext.draw.Draw.rad(a);
        var me = this,
            cos = +Math.cos(a).toFixed(9),
            sin = +Math.sin(a).toFixed(9);
        me.add(cos, sin, -sin, cos, x, y);
        me.add(1, 0, 0, 1, -x, -y);
        return me;
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

    /**
     * Determines whether this matrix is an identity matrix (no transform)
     * @return {Boolean}
     */
    isIdentity: function() {
        return this.equals(new Ext.draw.Matrix());
    },

    /**
     * Determines if this matrix has the same values as another matrix
     * @param {Ext.draw.Matrix} matrix
     * @return {Boolean}
     */
    equals: function(matrix) {
        var thisMatrix = this.matrix,
            otherMatrix = matrix.matrix;
        return thisMatrix[0][0] === otherMatrix[0][0] &&
               thisMatrix[0][1] === otherMatrix[0][1] &&
               thisMatrix[0][2] === otherMatrix[0][2] &&
               thisMatrix[1][0] === otherMatrix[1][0] &&
               thisMatrix[1][1] === otherMatrix[1][1] &&
               thisMatrix[1][2] === otherMatrix[1][2];
    },

    toString: function() {
        var me = this;
        return [me.get(0, 0), me.get(0, 1), me.get(1, 0), me.get(1, 1), 0, 0].join();
    },

    toCanvas: function(ctx) {
        var matrix = this.matrix;
        ctx.transform(matrix[0][0], matrix[1][0], matrix[0][1], matrix[1][1], matrix[0][2], matrix[1][2]);
    },

    toSvg: function() {
        var matrix = this.matrix;
        return "matrix(" + [matrix[0][0], matrix[1][0], matrix[0][1], matrix[1][1], matrix[0][2], matrix[1][2]].join() + ")";
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
    },

    // Split matrix into Translate Scale, Shear, and Rotate
    split: function () {
        function norm(a) {
            return a[0] * a[0] + a[1] * a[1];
        }
        function normalize(a) {
            var mag = Math.sqrt(norm(a));
            a[0] /= mag;
            a[1] /= mag;
        }
        var matrix = this.matrix,
            out = {
                translateX: matrix[0][2],
                translateY: matrix[1][2]
            },
            row;

        // scale and shear
        row = [[matrix[0][0], matrix[0][1]], [matrix[1][1], matrix[1][1]]];
        out.scaleX = Math.sqrt(norm(row[0]));
        normalize(row[0]);

        out.shear = row[0][0] * row[1][0] + row[0][1] * row[1][1];
        row[1] = [row[1][0] - row[0][0] * out.shear, row[1][1] - row[0][1] * out.shear];

        out.scaleY = Math.sqrt(norm(row[1]));
        normalize(row[1]);
        out.shear /= out.scaleY;

        // rotation
        out.rotate = Math.asin(-row[0][1]);

        out.isSimple = !+out.shear.toFixed(9) && (out.scaleX.toFixed(9) == out.scaleY.toFixed(9) || !out.rotate);

        return out;
    }
});
/**
 * @class Ext.draw.Surface
 * @extends Object
 *
 * A Surface is an interface to render methods inside a draw {@link Ext.draw.Component}.
 * A Surface contains methods to render sprites, get bounding boxes of sprites, add
 * sprites to the canvas, initialize other graphic components, etc. One of the most used
 * methods for this class is the `add` method, to add Sprites to the surface.
 *
 * Most of the Surface methods are abstract and they have a concrete implementation
 * in VML or SVG engines.
 *
 * A Surface instance can be accessed as a property of a draw component. For example:
 *
 *     drawComponent.surface.add({
 *         type: 'circle',
 *         fill: '#ffc',
 *         radius: 100,
 *         x: 100,
 *         y: 100
 *     });
 *
 * The configuration object passed in the `add` method is the same as described in the {@link Ext.draw.Sprite}
 * class documentation.
 *
 * ### Listeners
 *
 * You can also add event listeners to the surface using the `Observable` listener syntax. Supported events are:
 *
 * - 'mouseup'
 * - 'mousedown'
 * - 'mouseover'
 * - 'mouseout'
 * - 'mousemove'
 * - 'mouseenter'
 * - 'mouseleave'
 * - 'click'
 * - 'dblclick'
 * - 'tap'
 * - 'tapstart'
 * - 'tapend'
 * - 'tapcancel'
 * - 'taphold'
 * - 'doubletap'
 * - 'singletap'
 * - 'touchstart'
 * - 'touchmove'
 * - 'touchend'
 * - 'drag'
 * - 'dragstart'
 * - 'dragend'
 * - 'pinch'
 * - 'pinchstart'
 * - 'pinchend'
 * - 'swipe'
 *
 * For example:
 *
 *     drawComponent.surface.on({
 *        'mousemove': function() {
 *             console.log('moving the mouse over the surface');
 *         }
 *     });
 *
 * ## Example
 *
 *     drawComponent.surface.add([
 *         {
 *             type: 'circle',
 *             radius: 10,
 *             fill: '#f00',
 *             x: 10,
 *             y: 10,
 *             group: 'circles'
 *         },
 *         {
 *             type: 'circle',
 *             radius: 10,
 *             fill: '#0f0',
 *             x: 50,
 *             y: 50,
 *             group: 'circles'
 *         },
 *         {
 *             type: 'circle',
 *             radius: 10,
 *             fill: '#00f',
 *             x: 100,
 *             y: 100,
 *             group: 'circles'
 *         },
 *         {
 *             type: 'rect',
 *             radius: 10,
 *             x: 10,
 *             y: 10,
 *             group: 'rectangles'
 *         },
 *         {
 *             type: 'rect',
 *             radius: 10,
 *             x: 50,
 *             y: 50,
 *             group: 'rectangles'
 *         },
 *         {
 *             type: 'rect',
 *             radius: 10,
 *             x: 100,
 *             y: 100,
 *             group: 'rectangles'
 *         }
 *     ]);
 *
 *     // Get references to my groups
 *     my circles = surface.getGroup('circles');
 *     my rectangles = surface.getGroup('rectangles');
 *
 *     // Animate the circles down
 *     circles.animate({
 *         duration: 1000,
 *         translate: {
 *             y: 200
 *         }
 *     });
 *
 *     // Animate the rectangles across
 *     rectangles.animate({
 *         duration: 1000,
 *         translate: {
 *             x: 200
 *         }
 *     });
 */
// COMPAT set Ext.baseCSSPrefix
Ext.baseCSSPrefix = 'x-';

(function() {

function createProcessEventMethod(name) {
    return function(e) {
        this.processEvent(name, e);
    }
}

Ext.draw.Surface = Ext.extend(Ext.util.Observable, {
    // @private
    zoomX: 1,
    zoomY: 1,
    panX: 0,
    panY: 0,

    // @private
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

        me.addEvents.apply(me, Ext.draw.Surface.eventNames);

        Ext.draw.Surface.superclass.constructor.apply(me, arguments);

        me.getId();
        me.initGradients();
        me.initItems();
        if (me.renderTo) {
            me.render(me.renderTo);
            delete me.renderTo;
        }
        me.initBackground(config.background);
    },

    /**
     * @private initializes surface events. Should be called after render.
     */
    initializeEvents: function() {
        //NOTE: drag events have been moved to a deferred function.
      
        var me = this;
        me.mon(me.el, {
            scope: me,
            mouseover: me.onMouseOver,
            mouseout: me.onMouseOut,
            mouseenter: me.onMouseEnter,
            mouseleave: me.onMouseLeave,
            mousemove: me.onMouseMove,
            mouseup: me.onMouseUp,
            mousedown: me.onMouseDown,
            click: me.onClick,
            doubleclick: me.onDoubleClick,
            tap: me.onTap,
            tapstart: me.onTapStart,
            tapend: me.onTapEnd,
            tapcancel: me.onTapCancel,
            taphold: me.onTapHold,
            doubletap: me.onDoubleTap,
            singletap: me.onSingleTap,
            touchstart: me.onTouchStart,
            touchmove: me.onTouchMove,
            touchend: me.onTouchEnd,
            pinchstart: me.onPinchStart,
            pinch: me.onPinch,
            pinchend: me.onPinchEnd,
            swipe: me.onSwipe
        });
    },

    initializeDragEvents: function() {
        var me = this;

        if (me.dragEventsInitialized) {
            return;
        }

        me.dragEventsInitialized = true;

        me.mon(me.el, {
            scope: me,
            dragstart: me.onDragStart,
            drag: me.onDrag,
            dragend: me.onDragEnd
        });
    },

    // @private called to initialize components in the surface
    // this is dependent on the underlying implementation.
    initSurface: Ext.emptyFn,

    // @private called to setup the surface to render an item
    //this is dependent on the underlying implementation.
    renderItem: Ext.emptyFn,

    // @private
    renderItems: Ext.emptyFn,

    renderFrame: Ext.emptyFn,

    // @private
    setViewBox: Ext.emptyFn,

    // @private
    tween: Ext.emptyFn,

    /**
     * Adds one or more CSS classes to the element. Duplicate classes are automatically filtered out.
     *
     * For example:
     *
     *          drawComponent.surface.addCls(sprite, 'x-visible');
     *
     * @param {Object} sprite The sprite to add the class to.
     * @param {String/Array} className The CSS class to add, or an array of classes
     */
    addCls: Ext.emptyFn,

    /**
     * Removes one or more CSS classes from the element.
     *
     * For example:
     *
     *      drawComponent.surface.removeCls(sprite, 'x-visible');
     *
     * @param {Object} sprite The sprite to remove the class from.
     * @param {String/Array} className The CSS class to remove, or an array of classes
     */
    removeCls: Ext.emptyFn,

    /**
     * Sets CSS style attributes to an element.
     *
     * For example:
     *
     *      drawComponent.surface.setStyle(sprite, {
     *          'cursor': 'pointer'
     *      });
     *
     * @param {Object} sprite The sprite to add, or an array of classes to
     * @param {Object} styles An Object with CSS styles.
     */
    setStyle: Ext.emptyFn,

    // @private
    createWrapEl: function(container) {
        return Ext.fly(container).createChild({tag: 'div', cls: Ext.baseCSSPrefix + 'surface-wrap', style: 'overflow:hidden'});
    },

    // @private
    initGradients: function() {
        var gradients = this.gradients;
        if (gradients) {
            Ext.each(gradients, this.addGradient, this);
        }
    },

    // @private
    initItems: function() {
        var me = this,
            items = me.items;
        me.items = new Ext.draw.CompositeSprite();
        me.groups = new Ext.draw.CompositeSprite();
        if (items) {
            me.add(items);
        }
    },

    // @private
    initBackground: function(config) {
        var me = this,
            gradientId,
            gradient,
            width = me.width,
            height = me.height;
        if (config) {
            if (config.gradient) {
                gradient = config.gradient;
                gradientId = gradient.id;
                me.addGradient(gradient);
                me.background = me.add({
                    type: 'rect',
                    x: 0,
                    y: 0,
                    width: width,
                    height: height,
                    fill: 'url(#' + gradientId + ')',
                    zIndex: -100
                });
            } else if (config.fill) {
                me.background = me.add({
                    type: 'rect',
                    x: 0,
                    y: 0,
                    width: width,
                    height: height,
                    fill: config.fill,
                    zIndex: -100
                });
            } else if (config.image) {
                me.background = me.add({
                    type: 'image',
                    x: 0,
                    y: 0,
                    width: width,
                    height: height,
                    src: config.image,
                    zIndex: -100
                });
            }
        }
    },

    /**
     * Sets the size of the surface. Accomodates the background (if any) to fit the new size too.
     *
     * For example:
     *
     *      drawComponent.surface.setSize(500, 500);
     *
     * This method is generally called when also setting the size of the draw Component.
     *
     * @param {Number} w The new width of the canvas.
     * @param {Number} h The new height of the canvas.
     */
    setSize: function(w, h) {
        if (this.background) {
            this.background.setAttributes({
                width: w,
                height: h,
                hidden: false
            }, true);
        }
        this.width = w;
        this.height = h;
        this.updateSurfaceElBox();
    },

    // @private
    scrubAttrs: function(sprite) {
        var me = this,
            attrs = {},
            exclude = {},
            sattr = sprite.attr,
            i;
        for (i in sattr) {
            // Narrow down attributes to the main set
            if (me.translateAttrs.hasOwnProperty(i)) {
                // Translated attr
                attrs[me.translateAttrs[i]] = sattr[i];
                exclude[me.translateAttrs[i]] = true;
            }
            else if (me.availableAttrs.hasOwnProperty(i) && !exclude[i]) {
                // Passtrhough attr
                attrs[i] = sattr[i];
            }
        }
        return attrs;
    },

    onMouseMove: createProcessEventMethod('mousemove'),
    onMouseOver: createProcessEventMethod('mouseover'),
    onMouseOut: createProcessEventMethod('mouseout'),
    onMouseEnter: createProcessEventMethod('mouseenter'),
    onMouseLeave: createProcessEventMethod('mouseleave'),
    onMouseUp: createProcessEventMethod('mouseup'),
    onMouseDown: createProcessEventMethod('mousedown'),
    onClick: createProcessEventMethod('click'),
    onDoubleClick: createProcessEventMethod('doubleclick'),
    onTap: createProcessEventMethod('tap'),
    onTapStart: createProcessEventMethod('tapstart'),
    onTapEnd: createProcessEventMethod('tapend'),
    onTapCancel: createProcessEventMethod('tapcancel'),
    onTapHold: createProcessEventMethod('taphold'),
    onDoubleTap: createProcessEventMethod('doubletap'),
    onSingleTap: createProcessEventMethod('singletap'),
    onTouchStart: createProcessEventMethod('touchstart'),
    onTouchMove: createProcessEventMethod('touchmove'),
    onTouchEnd: createProcessEventMethod('touchend'),
    onDragStart: createProcessEventMethod('dragstart'),
    onDrag: createProcessEventMethod('drag'),
    onDragEnd: createProcessEventMethod('dragend'),
    onPinchStart: createProcessEventMethod('pinchstart'),
    onPinch: createProcessEventMethod('pinch'),
    onPinchEnd: createProcessEventMethod('pinchend'),
    onSwipe: createProcessEventMethod('swipe'),

    // @private - Normalize a delegated single event from the main container to each sprite and sprite group
    processEvent: function(name, e) {
        var me = this,
            sprite = me.getSpriteForEvent(e);
        if (sprite) {
            sprite.fireEvent(name, sprite, e);
        }
        me.fireEvent(name, e);
    },

    /**
     * @protected - For a given event, find the Sprite corresponding to it if any.
     * @return {Ext.draw.Sprite} The sprite instance, or null if none found.
     */
    getSpriteForEvent: function(e) {
        return null;
    },

    /**
     * Add a gradient definition to the Surface. Note that in some surface engines, adding
     * a gradient via this method will not take effect if the surface has already been rendered.
     * Therefore, it is preferred to pass the gradients as an item to the surface config, rather
     * than calling this method, especially if the surface is rendered immediately (e.g. due to
     * 'renderTo' in its config). For more information on how to create gradients in the Chart
     * configuration object please refer to {@link Ext.chart.Chart}.
     *
     * The gradient object to be passed into this method is composed by:
     *
     *
     *  - **id** - string - The unique name of the gradient.
     *  - **angle** - number, optional - The angle of the gradient in degrees.
     *  - **stops** - object - An object with numbers as keys (from 0 to 100) and style objects as values.
     *
     *
     For example:
                drawComponent.surface.addGradient({
                    id: 'gradientId',
                    angle: 45,
                    stops: {
                        0: {
                            color: '#555'
                        },
                        100: {
                            color: '#ddd'
                        }
                    }
                });
     */
    addGradient: Ext.emptyFn,

    /**
     * Add a Sprite to the surface. See {@link Ext.draw.Sprite} for the configuration object to be passed into this method.
     *
     * For example:
     *
     *     drawComponent.surface.add({
     *         type: 'circle',
     *         fill: '#ffc',
     *         radius: 100,
     *         x: 100,
     *         y: 100
     *     });
     *
    */
    add: function() {
        var me = this,
            args = Array.prototype.slice.call(arguments),
            hasMultipleArgs = args.length > 1,
            sprite, items, i, ln, item, results;

        if (hasMultipleArgs || Ext.isArray(args[0])) {
            items = hasMultipleArgs ? args : args[0];
            results = [];

            for (i = 0, ln = items.length; i < ln; i++) {
                item = items[i];
                item = me.add(item);
                results.push(item);
            }

            return results;
        }
        sprite = me.prepareItems(args[0], true)[0];
        me.normalizeSpriteCollection(sprite);
        me.onAdd(sprite);
        return sprite;
    },

    /**
     * @private
     * Insert or move a given sprite into the correct position in the items
     * MixedCollection, according to its zIndex. Will be inserted at the end of
     * an existing series of sprites with the same or lower zIndex. If the sprite
     * is already positioned within an appropriate zIndex group, it will not be moved.
     * This ordering can be used by subclasses to assist in rendering the sprites in
     * the correct order for proper z-index stacking.
     * @param {Ext.draw.Sprite} sprite
     * @return {Number} the sprite's new index in the list
     */
    normalizeSpriteCollection: function(sprite) {
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
            draggable = sprite.draggable,
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
        if (draggable) {
            sprite.initDraggable();
        }
    },

    /**
     * Remove a given sprite from the surface, optionally destroying the sprite in the process.
     * You can also call the sprite own `remove` method.
     *
     * For example:
     *
     *      drawComponent.surface.remove(sprite);
     *      //or...
     *      sprite.remove();
     *
     * @param {Ext.draw.Sprite} sprite
     * @param {Boolean} destroySprite
     * @return {Number} the sprite's new index in the list
     */
    remove: function(sprite, destroySprite) {
        if (sprite) {
            this.items.remove(sprite);
            this.groups.each(function(item) {
                item.remove(sprite);
            });
            sprite.onRemove();
            if (destroySprite === true) {
                sprite.destroy();
            }
        }
    },

    /**
     * Remove all sprites from the surface, optionally destroying the sprites in the process.
     *
     * For example:
     *
     *      drawComponent.surface.removeAll();
     *
     * @param {Boolean} destroySprites Whether to destroy all sprites when removing them.
     * @return {Number} The sprite's new index in the list.
     */
    removeAll: function(destroySprites) {
        var items = this.items.items,
            ln = items.length,
            i;
        for (i = ln - 1; i > -1; i--) {
            this.remove(items[i], destroySprites);
        }
    },

    onRemove: Ext.emptyFn,

    onDestroy: Ext.emptyFn,

    // @private
    applyTransformations: function(sprite) {
        sprite.bbox.transform = 0;
        sprite.dirtyTransform = false;

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
            me.transform(sprite);
            sprite.transformations = [];
        }
    },

    // @private
    rotate: function (sprite) {
        var bbox,
            deg = sprite.attr.rotation.degrees,
            centerX = sprite.attr.rotation.x,
            centerY = sprite.attr.rotation.y,
            trans = sprite.attr.translation,
            dx = trans && trans.x || 0,
            dy = trans && trans.y || 0;
        if (!Ext.isNumber(centerX) || !Ext.isNumber(centerY)) {
            bbox = this.getBBox(sprite, true); //isWithoutTransform=true
            centerX = !Ext.isNumber(centerX) ? (bbox.x + dx) + bbox.width / 2 : centerX;
            centerY = !Ext.isNumber(centerY) ? (bbox.y + dy) + bbox.height / 2 : centerY;
        }
        sprite.transformations.push({
            type: "rotate",
            degrees: deg,
            x: centerX,
            y: centerY
        });
    },

    // @private
    translate: function(sprite) {
        var x = sprite.attr.translation.x || 0,
            y = sprite.attr.translation.y || 0;
        sprite.transformations.push({
            type: "translate",
            x: x,
            y: y
        });
    },

    // @private
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

    // @private
    rectPath: function (x, y, w, h, r) {
        if (r) {
            return [["M", x + r, y], ["l", w - r * 2, 0], ["a", r, r, 0, 0, 1, r, r], ["l", 0, h - r * 2], ["a", r, r, 0, 0, 1, -r, r], ["l", r * 2 - w, 0], ["a", r, r, 0, 0, 1, -r, -r], ["l", 0, r * 2 - h], ["a", r, r, 0, 0, 1, r, -r], ["z"]];
        }
        return [["M", x, y], ["l", w, 0], ["l", 0, h], ["l", -w, 0], ["z"]];
    },

    // @private
    ellipsePath: function (x, y, rx, ry) {
        if (ry == null) {
            ry = rx;
        }
        return [["M", x, y], ["m", 0, -ry], ["a", rx, ry, 0, 1, 1, 0, 2 * ry], ["a", rx, ry, 0, 1, 1, 0, -2 * ry], ["z"]];
    },

    // @private
    getPathpath: function (el) {
        return el.attr.path;
    },

    // @private
    getPathcircle: function (el) {
        var a = el.attr;
        return this.ellipsePath(a.x, a.y, a.radius, a.radius);
    },

    // @private
    getPathellipse: function (el) {
        var a = el.attr;
        return this.ellipsePath(a.x, a.y, a.radiusX, a.radiusY);
    },

    // @private
    getPathrect: function (el) {
        var a = el.attr;
        return this.rectPath(a.x, a.y, a.width, a.height, a.r);
    },

    // @private
    getPathimage: function (el) {
        var a = el.attr;
        return this.rectPath(a.x || 0, a.y || 0, a.width, a.height);
    },

    // @private
    getPathtext: function (el) {
        var bbox = this.getBBoxText(el);
        return this.rectPath(bbox.x, bbox.y, bbox.width, bbox.height);
    },

    createGroup: function(id) {
        var group = this.groups.get(id);
        if (!group) {
            group = new Ext.draw.CompositeSprite({
                surface: this
            });
            group.id = id || Ext.id(null, 'ext-surface-group-');
            this.groups.add(group);
        }
        return group;
    },

    /**
     * Returns a new group or an existent group associated with the current surface.
     * The group returned is a {@link Ext.draw.CompositeSprite} group.
     *
     * For example:
     *
     *      var spriteGroup = drawComponent.surface.getGroup('someGroupId');
     *
     * @param {String} id The unique identifier of the group.
     * @return {Object} The {@link Ext.draw.CompositeSprite}.
     */
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

    // @private
    prepareItems: function(items, applyDefaults) {
        items = [].concat(items);
        // Make sure defaults are applied and item is initialized
        var item, i, ln;
        for (i = 0, ln = items.length; i < ln; i++) {
            item = items[i];
            if (!(item instanceof Ext.draw.Sprite)) {
                // Temporary, just take in configs...
                item.surface = this;
                items[i] = this.createItem(item);
            } else {
                item.surface = this;
            }
        }
        return items;
    },

    /**
     * Changes the text in the sprite element. The sprite must be a `text` sprite.
     * This method can also be called from {@link Ext.draw.Sprite}.
     *
     * For example:
     *
     *      var spriteGroup = drawComponent.surface.setText(sprite, 'my new text');
     *
     * @param {Object} sprite The Sprite to change the text.
     * @param {String} text The new text to be set.
     */
    setText: Ext.emptyFn,

    //@private Creates an item and appends it to the surface. Called
    //as an internal method when calling `add`.
    createItem: Ext.emptyFn,

    /**
     * Retrieves the id of this component.
     * Will autogenerate an id if one has not already been set.
     */
    getId: function() {
        return this.id || (this.id = Ext.id(null, 'ext-surface-'));
    },

    /**
     * Destroys the surface. This is done by removing all components from it and
     * also removing its reference to a DOM element.
     *
     * For example:
     *
     *      drawComponent.surface.destroy();
     */
    destroy: function() {
        delete this.domRef;
        this.removeAll();
    },

    //Empty the surface (without destroying it)
    clear: Ext.emtpyFn,


    /**
     * @private update the position/size/clipping of the series surface to match the current
     * chartBBox and the stored zoom/pan properties.
     */
    updateSurfaceElBox: function() {
        var me = this,
            floor = Math.floor,
            width = floor(me.width * me.zoomX),
            height = floor(me.height * me.zoomY),
            panX = me.panX,
            panY = me.panY,
            maxWidth = 2000,
            maxHeight = 1500,
            surfaceEl = me.surfaceEl,
            surfaceDom = surfaceEl.dom,
            surfaceWidth = me.width,
            surfaceHeight = me.height,
            ctx = me.surfaceEl.dom.getContext('2d'),
            setTranslation = false,
            newWidth, newHeight,
            diffX, diffY;

        if (width * height > maxWidth * maxHeight) {

            setTranslation = true;

            //maintain aspect ratio.
            newHeight = height * maxWidth / width;

            if (newHeight > height) {
                newHeight = maxHeight;
            }

            newWidth = width * newHeight / height;

            panX = (surfaceWidth - newWidth) / 2;
            panY = (surfaceHeight - newHeight) / 2;

            diffX = me.panX - panX;
            diffY = me.panY - panY;

            width = newWidth;
            height = newHeight;
        }

        // adjust the surfaceEl to match current zoom/pan; only if the size is changing to prevent
        // the canvas from getting cleared as happens when width/height are set.
        if (surfaceDom.width != width || surfaceDom.height != height) {
            surfaceEl.setSize(width, height);
            surfaceDom.width = width;
            surfaceDom.height = height;

            //TODO(nico): this is canvas specific.
            //this with the pixel check should be moved to
            //Canvas.js.
            if (setTranslation) {
                ctx.translate(diffX, diffY);
            }
        }

        surfaceEl.setTopLeft(panY, panX);
    },

    /**
     * Sets the persistent transform and updates the surfaceEl's size and position to match.
     * @param {Number} panX
     * @param {Number} panY
     * @param {Number} zoomX
     * @param {Number} zoomY
     */
    setSurfaceTransform: function(panX, panY, zoomX, zoomY) {
        var me = this;
        me.panX = panX;
        me.panY = panY;
        me.zoomX = zoomX;
        me.zoomY = zoomY;
        me.setSurfaceFastTransform(null);
        me.updateSurfaceElBox();
    },

    /**
     * Sets a fast CSS3 transform on the surfaceEl.
     * @param {Ext.draw.Matrix} matrix
     */
    setSurfaceFastTransform: function(matrix) {
        this.transformMatrix = matrix;
        this.surfaceEl.setStyle({
            webkitTransformOrigin: '0 0',
            webkitTransform: matrix ? matrix.toSvg() : ''
        });
    }

});
})();

/**
 * Create and return a new concrete Surface instance appropriate for the current environment.
 * @param {Object} config Initial configuration for the Surface instance
 * @param {Array} enginePriority Optional order of implementations to use; the first one that is
 *                available in the current environment will be used. Defaults to
 *                <code>['Svg', 'Vml']</code>.
 */
Ext.draw.Surface.create = function(config, enginePriority) {
    return new Ext.draw.engine.Canvas(config);
    enginePriority = enginePriority || ['Canvas', 'Svg'];

    var i = 0,
        len = enginePriority.length;

    for (; i < len; i++) {
        //if (Ext.supports[enginePriority[i]]) {
            //return new Ext.draw.engine[enginePriority[i]](config);
            //return new Ext.draw.engine.Svg(config);
        //}
    }
    return false;
};

/**
 * A list of all event names that should be relayed by a Surface object from its inner surfaceEl.
 */
Ext.draw.Surface.eventNames = [
    'mouseup',
    'mousedown',
    'mouseover',
    'mouseout',
    'mousemove',
    'mouseenter',
    'mouseleave',
    'click',
    'dblclick',
    'tap',
    'tapstart',
    'tapend',
    'tapcancel',
    'taphold',
    'doubletap',
    'singletap',
    'touchstart',
    'touchmove',
    'touchend',
    'drag',
    'dragstart',
    'dragend',
    'pinch',
    'pinchstart',
    'pinchend',
    'swipe'
];

/**
 * @class Ext.draw.Canvas
 * @extends Ext.draw.Surface
 *<p>Provides specific methods to draw with Canvas.</p>
 */

Ext.draw.engine.Canvas = Ext.extend(Ext.draw.Surface, {

    //read only style attribute canvas property mapping.
    attributeMap: {
        rotate: "rotation",
        stroke: "strokeStyle",
        fill: "fillStyle",
        lineWidth: "lineWidth",
        "text-anchor": "textAlign",
        "stroke-width": "lineWidth",
        "stroke-linecap": "lineCap",
        "stroke-linejoin": "lineJoin",
        "stroke-miterlimit": "miterLimit",
        opacity: "globalAlpha",
        font: 'font',
        shadowColor: "shadowColor",
        shadowOffsetX: "shadowOffsetX",
        shadowOffsetY: "shadowOffsetY",
        shadowBlur: "shadowBlur"
    },

    //read only default canvas property value map.
    attributeDefaults: {
        strokeStyle: "rgba(0, 0, 0, 0)",
        fillStyle: "rgba(0, 0, 0, 0)",
        lineWidth: 1,
        lineCap: "square",
        lineJoin: "miter",
        miterLimit: 1,
        shadowColor: "none",
        shadowOffsetX: 0,
        shadowOffsetY: 0,
        shadowBlur: 0,
        font: "10px Helvetica, sans-serif",
        textAlign: "start",
        globalAlpha: 1
    },

    gradientRe: /\s*url\s*\(#([^\)]+)\)\s*/,

    //read-only map of value convertions
    //used to convert a gradient id string into a gradient object
    //in a generic way
    attributeParsers: {
        fillStyle: function(value, sprite, me) {
            if (!value) {
                return value;
            }
            //is a gradient object
            if (Ext.isObject(value)) {
                me.addGradient(value);
                value = 'url(#' + value.id + ')';
            }
            var id = value.match(me.gradientRe);
            if (id) {
                return me.createGradient(me._gradients[id[1]], sprite);
            } else {
                return value == 'none'? 'rgba(0, 0, 0, 0)' : value;
            }
        },
        strokeStyle: function(value, sprite, me) {
            if (!value) {
                return value;
            }
            //is a gradient object
            if (Ext.isObject(value)) {
                me.addGradient(value);
                value = 'url(#' + value.id + ')';
            }
            var id = value.match(me.gradientRe);
            if (id) {
                return me.createGradient(me._gradients[id[1]], sprite);
            } else {
                return value == 'none'? 'rgba(0, 0, 0, 0)' : value;
            }
        },
        textAlign: function(value, sprite) {
            if (value === 'middle') {
                return 'center';
            }
            return value;
        }
    },

    constructor: function(config) {
        var me = this;
        //whether to add an event system to the canvas or not
        me.initEvents = 'initEvents' in config ? config.initEvents : true;
        //store a hash of gradient configurations
        me._gradients = {};
        Ext.draw.engine.Canvas.superclass.constructor.apply(this, arguments);
        me.initCanvas(config.renderTo);

        // Redraw after each animation frame event
        Ext.fx.Manager.addListener('frameend', function() {
            // Only render a frame on frameend if we were changed via tween
            if (me.animatedFrame) {
                me.animatedFrame = false;
                me.renderFrame();
            }
        });

        //disable context menu
        //TODO(nico): This should be configurable.
        this.canvas.oncontextmenu = function() { return false; };
    },

    //initializes the only canvas instance to draw the shapes to.
    initCanvas: function(container) {
        if (this.ctx) {
            return;
        }

        var me = this,
            domContainer = Ext.get(container),
            width = domContainer.getWidth(),
            height = domContainer.getHeight(),
            div = me.createWrapEl(container),
            canvas = document.createElement('canvas'),
            ctx = canvas.getContext('2d');

        div.setSize(width, height);
        //add an id to the dom div element.
        div.dom.id = me.id + '-wrap';
        canvas.id = me.id + '-canvas';
        canvas.width = width;
        canvas.height = height;

        div.appendChild(canvas);

        me.el = div;
        me.surfaceEl = Ext.get(canvas);
        me.canvas = canvas;
        me.ctx = ctx;

        //Add event manager for canvas class
        if (me.initEvents) {
            me.initializeEvents();
        }

    },

    getSpriteForEvent: function() {
        return null; //TODO!!!
    },

    //stores the gradient configuration into a hashmap
    addGradient: function(gradient) {
        var me = this;
        gradient = Ext.draw.Draw.parseGradient(gradient);
        me._gradients[gradient.id] = gradient;
    },

    //applies the current transformations to the element's matrix
    //TODO(nico): similar to what's found in Svg engine
    transform: function(sprite) {
        var matrix = new Ext.draw.Matrix,
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
    },

    setSize: function(w, h) {
        var width, height,
            me = this,
            canvas = me.canvas;
        if (typeof w == 'object') {
            width = w.width;
            height = w.height;
        } else {
            width = w;
            height = h;
        }
        if (width !== canvas.width || height !== canvas.height) {
            me.el.setSize(width, height);
            me.surfaceEl.setSize(width, height);
            canvas.width = width;
            canvas.height = height;

            me.width = width;
            me.height = height;
        }

        Ext.draw.engine.Canvas.superclass.setSize.call(this, w, h);
    },

    tween: function() {
        this.animatedFrame = true;
        Ext.draw.engine.Canvas.superclass.tween.apply(this);
    },

    //Rendering
    renderFrame: function() {
        this.render();
    },

    render: function(container) {
        var me = this;
        if (!me.canvas) {
            me.initCanvas(container);
        }
        me.renderAll();
    },

    createItem: function (config) {
        var sprite = new Ext.draw.Sprite(config);
        sprite.surface = this;
        sprite.matrix = new Ext.draw.Matrix;
        sprite.bbox = {
            plain: 0,
            transform: 0
        };
        return sprite;
    },

    // @private
    //TODO(nico): should sort also by abstract concept: "priority"
    zIndexSort: function(a, b) {
        var aAttr = a.attr,
            bAttr = b.attr,
            aIndex = aAttr && aAttr.zIndex || -1,
            bIndex = bAttr && bAttr.zIndex || -1,
            val = aIndex - bIndex;
        if (!val) {
            return (a.id > b.id) ? 1 :  -1;
        }
        else {
            return val;
        }
    },

    renderAll: function() {
        var me = this;
        me.clear();
        //sort by zIndex
        me.items.items.sort(me.zIndexSort);
        me.items.each(me.renderSprite, me);
    },

    renderSprite: function (sprite) {
        // Clear dirty flags that aren't used by the Canvas renderer
        sprite.dirtyHidden = sprite.dirtyPath = sprite.zIndexDirty = sprite.dirtyFont = sprite.dirty = false;

        if (sprite.attr.hidden) {
            return;
        }
        if (!sprite.matrix) {
            sprite.matrix = new Ext.draw.Matrix();
        }
        var me = this,
            ctx = me.ctx,
            attr = sprite.attr,
            attributeMap = me.attributeMap,
            attributeDefaults = me.attributeDefaults,
            attributeParsers = me.attributeParsers,
            prop, val, propertyValue;

        if (sprite.dirtyTransform) {
            me.applyTransformations(sprite);
        }
        ctx.save();

        //set matrix state
        sprite.matrix.toCanvas(ctx);

        //set styles
        for (prop in attributeMap) {
            val = attributeMap[prop];
            if (val in attributeParsers) {
                propertyValue = attributeParsers[val](attr[prop], sprite, me);
                if (propertyValue !== undefined) {
                    ctx[val] = propertyValue;
                } else {
                    ctx[val] = attributeDefaults[val];
                }
            }
            else {
                propertyValue = attr[prop];
                if (propertyValue !== undefined) {
                    ctx[val] = propertyValue;
                } else {
                    ctx[val] = attributeDefaults[val];
                }
            }
        }

        //render shape
        me[sprite.type + 'Render'](sprite);
        ctx.restore();
    },

    circleRender: function(sprite) {
        var me = this,
            ctx = me.ctx,
            attr = sprite.attr,
            x = +(attr.x || 0),
            y = +(attr.y || 0),
            radius = attr.radius,
            pi2 = Ext.draw.Draw.pi2;

        //draw fill circle
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, pi2, true);
		ctx.closePath();
        ctx.fill();

        //draw stroke circle
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, pi2, true);
		ctx.closePath();
        ctx.stroke();
    },

    ellipseRender: function(sprite) {
        var me = this,
            ctx = me.ctx,
            attr = sprite.attr,
            width = attr.width,
            height = attr.height,
            x = +(attr.x || 0),
            y = +(attr.y || 0),
            scaleX = 1,
            scaleY = 1,
            scalePosX = 1,
            scalePosY = 1,
            radius = 0,
            pi2 = Ext.draw.Draw.pi2;

        if (width > height) {
            radius = width / 2;
            scaleY = height / width;
            scalePosY = width / height;
        }
        else {
            radius = height / 2;
            scaleX = width / height;
            scalePosX = height / width;
        }
        ctx.scale(scaleX, scaleY);

        //make fill ellipse
        ctx.beginPath();
        ctx.arc(x * scalePosX, y * scalePosY, radius, 0, pi2, true);
        ctx.closePath();
        ctx.fill();

        //make stroke ellipse
        ctx.beginPath();
        ctx.arc(x * scalePosX, y * scalePosY, radius, 0, pi2, true);
        ctx.closePath();
        ctx.stroke();
    },

    imageRender: function(sprite) {
        var me = this,
            ctx = me.ctx,
            attr = sprite.attr,
            width = attr.width,
            height = attr.height,

            x = +(attr.x || 0),
            y = +(attr.y || 0),
            src = attr.src,
            img;

        if (sprite._img) {
            img = sprite._img;
        }
        else {
            sprite._img = img = new Image();
            img.height = height;
            img.width = width;
            img._loading = true;
            img.onload = function() {
                img._loading = false;
                me.renderFrame();
            };
            img.src = src.slice(1, src.length -1);
        }

        if (!img._loading) {
            ctx.drawImage(img, x - width / 2, y - height / 2, width, height);
        }
    },

    rectRender: function(sprite) {
        var me = this,
            ctx = me.ctx,
            attr = sprite.attr,
            width = attr.width,
            height = attr.height,
            x = +(attr.x || 0),
            y = +(attr.y || 0);

        if (isFinite(x) && isFinite(y) && isFinite(width) && isFinite(height)) {
            ctx.fillRect(x, y, width, height);
            ctx.strokeRect(x, y, width, height);
        }
    },

    textRender: function(sprite) {
        var me = this,
            ctx = me.ctx,
            attr = sprite.attr,
            x = +(attr.x || 0),
            y = +(attr.y || 0),
            text = attr.text;
        if (isFinite(x) && isFinite(y)) {
            ctx.textBaseline = 'middle';
            ctx.fillText(text, x, y);
        }
    },

    pathRender: function(sprite) {
        if (!sprite.attr.path) {
            return;
        }

        var me = this,
            ctx = me.ctx,
            attr = sprite.attr,
            path = Ext.draw.Draw.path2curve(attr.path),
            ln = path.length,
            x, y, i;

        ctx.beginPath();
        for (i = 0; i < ln; i++) {
            switch (path[i][0]) {
                case "M":
                    ctx.moveTo(path[i][1], path[i][2]);
                    if (x == null) {
                        x = path[i][1];
                    }
                    if (y == null) {
                        y = path[i][2];
                    }
                break;
                case "C":
                    ctx.bezierCurveTo(path[i][1],
                                      path[i][2],
                                      path[i][3],
                                      path[i][4],
                                      path[i][5],
                                      path[i][6]);
                break;
                case "Z":
                    ctx.lineTo(x, y);
                break;
            }
        }
        //if stroke is not transparent then draw it
        if (attr.stroke && attr.stroke != 'none' && attr.stroke != 'rgba(0, 0, 0, 0)') {
            ctx.stroke();
        }
        //if fill is not transparent then draw it
        if (attr.fill && attr.fill != 'none' && attr.fill != 'rgba(0, 0, 0, 0)') {
            ctx.fill();
        }
        ctx.closePath();
    },

    //Contains method used for event handling.
    //Returns the target pointed by the mouse or
    //false otherwise.
    contains: function(x, y) {
        var me = this,
            items = me.items.items,
            l = items.length,
            sprite;

        while (l--) {
            sprite = items[l];
            if (me.bboxContains(x, y, sprite)) {
                if (me[sprite.type + 'Contains'](x, y, sprite)) {
                    //TODO(nico): not returning just the sprite because a
                    //more complex object with more informaiton on the event
                    //may be returned.
                    return {
                        target: sprite
                    };
                }
            }
        }

        return false;
    },

    //Whether the point is in the BBox of the shape
    bboxContains: function(x, y, sprite) {
        var bbox = sprite.getBBox();

        return (x >= bbox.x && x <= (bbox.x + bbox.width)
            && (y >= bbox.y && y <= (bbox.y + bbox.height)));
    },

    //Whether the point is in the shape
    circleContains: function(x, y, sprite) {
        var attr = sprite.attr,
            trans = attr.translation,
            cx = (attr.x || 0) + (trans && trans.x || 0),
            cy = (attr.y || 0) + (trans && trans.y || 0),
            dx = x - cx,
            dy = y - cy,
            radius = attr.radius;

        return (dx * dx + dy * dy) <= (radius * radius);
    },

    //Whether the point is in the shape
    ellipseContains: function(x, y, sprite) {
        var attr = sprite.attr,
            trans = attr.translation,
            cx = (attr.x || 0) + (trans && trans.x || 0),
            cy = (attr.y || 0) + (trans && trans.y || 0),
            radiusX = attr.radiusX || (attr.width  / 2) || 0,
            radiusY = attr.radiusY || (attr.height / 2) || 0,
            radius = 0,
            scaleX = 1,
            scaleY = 1,
            dx, dy;

        if (radiusX > radiusY) {
                radius = radiusX;
                scaleY = radiusY / radiusX;
        } else {
            radius = radiusY;
            scaleY = radiusX / radiusY;
        }

        dx = (x - cx) / scaleX;
        dy = (y - cy) / scaleY;

        return (dx * dx + dy * dy) <= (radius * radius);
    },

    //Same behavior as the BBox check, so return true.
    imageContains: function(x, y, sprite) {
        return true;
    },

    //Same behavior as the BBox check, so return true.
    rectContains: function(x, y, sprite) {
        return true;
    },

    //Same behavior as the BBox check, so return true.
    textContains: function(x, y, sprite) {
        return true;
    },

    //TODO(nico): to be implemented later.
    pathContains: function(x, y, sprite) {
        return false;
    },

    createGradient: function(gradient, sprite) {
        var ctx = this.ctx,
            bbox = sprite.getBBox(),
            x1 = bbox.x,
            y1 = bbox.y,
            width = bbox.width,
            height = bbox.height,
            x2 = x1 + width,
            y2 = y1 + height,
            a = Math.round(Math.abs(gradient.degrees || gradient.angle || 0) % 360),
            stops = gradient.stops,
            stop, canvasGradient;

        if (a <= 0) {
            canvasGradient = ctx.createLinearGradient(x1, y1, x1, y2);
        } else if (a <= 45) {
            canvasGradient = ctx.createLinearGradient(x1, y1, x2, y2);
        } else if (a <= 90) {
            canvasGradient = ctx.createLinearGradient(x1, y1, x2, y1);
        } else if (a <= 135) {
            canvasGradient = ctx.createLinearGradient(x2, y1, x1, y2);
        } else if (a <= 180) {
            canvasGradient = ctx.createLinearGradient(x1, y2, x1, y1);
        } else if (a <= 225) {
            canvasGradient = ctx.createLinearGradient(x2, y2, x1, y1);
        } else if (a <= 270) {
            canvasGradient = ctx.createLinearGradient(x2, y1, x1, y1);
        } else if (a <= 315) {
            canvasGradient = ctx.createLinearGradient(x1, y2, x2, y1);
        } else {
            canvasGradient = ctx.createLinearGradient(x1, y1, x2, y2);
        }

        for (stop in stops) {
            if (stops.hasOwnProperty(stop)) {
                canvasGradient.addColorStop(stop, stops[stop].color || '#000');
            }
        }

        return canvasGradient;
    },

    //getBBox
    getBBox: function (sprite, isWithoutTransform) {
        if (sprite.type == 'text') {
            return this.getBBoxText(sprite, isWithoutTransform);
        }
        var realPath = this["getPath" + sprite.type](sprite);
        if (isWithoutTransform) {
            sprite.bbox.plain = sprite.bbox.plain || Ext.draw.Draw.pathDimensions(realPath);
            return sprite.bbox.plain;
        }
        //sprite.bbox.transform = sprite.bbox.transform || Ext.draw.Draw.pathDimensions(Ext.draw.Draw.mapPath(realPath, sprite.matrix));
        //caching the bounding box causes problems :(
        sprite.bbox.transform = Ext.draw.Draw.pathDimensions(Ext.draw.Draw.mapPath(realPath, sprite.matrix));
        return sprite.bbox.transform;
    },

    getBBoxText: function(sprite, isWithoutTransform) {
        var me = this,
            ctx = me.ctx,
            attr = sprite.attr,
            matrix,
            x = attr.x || 0,
            y = attr.y || 0,
            x1, x2, y1, y2,
            x1t, x2t, x3t, x4t,
            y1t, y2t, y3t, y4t,
            width, height,
            trans = sprite.attr.translation,
            dx = trans && trans.x || 0,
            dy = trans && trans.y || 0,
            font = attr.font,
            fontSize = +(font && font.match(/[0-9]+/)[0]) || 10,
            text = attr.text,
            measure;

        ctx.save();
        if (font) {
            ctx.font = font;
        }
        measure = ctx.measureText(text);
        ctx.restore();

        if (sprite.dirtyTransform) {
            me.applyTransformations(sprite);
        }
        matrix = sprite.matrix;

        x1 = x + dx;
        y1 = y + dy;
        x2 = x1 + (measure.width || fontSize);
        y2 = y1 + (measure.height || fontSize);

        if (isWithoutTransform) {
            return {
                x: x,
                y: y,
                width: (measure.width || fontSize),
                height: (measure.height || fontSize)
            };
        }

        x1t = matrix.x(x1, y1);
        y1t = matrix.y(x1, y1);

        x2t = matrix.x(x1, y2);
        y2t = matrix.y(x1, y2);

        x3t = matrix.x(x2, y1);
        y3t = matrix.y(x2, y1);

        x4t = matrix.x(x2, y2);
        y4t = matrix.y(x2, y2);

        x = Math.min(x1t, x2t, x3t, x4t);
        y = Math.min(y1t, y2t, y3t, y4t);

        width = Math.abs(x - Math.max(x1t, x2t, x3t, x4t));
        height = Math.abs(y - Math.max(y1t, y2t, y3t, y4t));

        return {
            x: x,
            y: y,
            width: width,
            height: height
        };
    },

    getRegion: function() {
        var canvas = this.canvas,
            xy = Ext.get(canvas).getXY();

        return {
            left: xy[0],
            top: xy[1],
            right: xy[0] + canvas.width,
            bottom: xy[1] + canvas.height
        };
    },

    //force will force the method to return a value.
    getShadowAttributesArray: function(force) {
        if (force) {
            return [{
                    "stroke-width": 6,
                    "stroke-opacity": 1,
                    stroke: 'rgba(200, 200, 200, 0.5)',
                    translate: {
                        x: 1.2,
                        y: 2
                    }
                },
                {
                    "stroke-width": 4,
                    "stroke-opacity": 1,
                    stroke: 'rgba(150, 150, 150, 0.5)',
                    translate: {
                        x: 0.9,
                        y: 1.5
                    }
                },
                {
                    "stroke-width": 2,
                    "stroke-opacity": 1,
                    stroke: 'rgba(100, 100, 100, 0.5)',
                    translate: {
                        x: 0.6,
                        y: 1
                    }
                }];
        } else {
            return [];
        }
    },

    //force will force the method to return a value.
    getShadowOptions: function(force) {
        return {
            shadowOffsetX: 2,
            //http://code.google.com/p/android/issues/detail?id=16025
            shadowOffsetY: Ext.is.Android ? -2 : 2,
            shadowBlur: 3,
            shadowColor: '#444'
        };
    },

    clear: function() {
        var me = this,
            canvas = me.canvas,
            ctx = me.ctx,
            width = canvas.width,
            height = canvas.height;

        ctx.clearRect(0, 0, width, height);
    }
});



/**
 * @class Ext.draw.Component
 * @extends Ext.Component
 *
 * The Draw Component is a surface in which sprites can be rendered. The Draw Component
 * manages and holds a `Surface` instance: an interface that has
 * an SVG or VML implementation depending on the browser capabilities and where
 * Sprites can be appended.
 * {@img Ext.draw.Component/Ext.draw.Component.png Ext.draw.Component component}
 * One way to create a draw component is:
 *
 *     var drawComponent = Ext.create('Ext.draw.Component', {
 *         viewBox: false,
 *         items: [{
 *             type: 'circle',
 *             fill: '#79BB3F',
 *             radius: 100,
 *             x: 100,
 *             y: 100
 *         }]
 *     });
 *
 *     Ext.create('Ext.Window', {
 *         width: 215,
 *         height: 235,
 *         layout: 'fit',
 *         items: [drawComponent]
 *     }).show();
 *
 * In this case we created a draw component and added a sprite to it.
 * The *type* of the sprite is *circle* so if you run this code you'll see a yellow-ish
 * circle in a Window. When setting `viewBox` to `false` we are responsible for setting the object's position and
 * dimensions accordingly.
 *
 * You can also add sprites by using the surface's add method:
 *
 *     drawComponent.surface.add({
 *         type: 'circle',
 *         fill: '#79BB3F',
 *         radius: 100,
 *         x: 100,
 *         y: 100
 *     });
 *
 * For more information on Sprites, the core elements added to a draw component's surface,
 * refer to the Ext.draw.Sprite documentation.
 */
Ext.draw.Component = Ext.extend(Ext.Component, {

    /**
     * @cfg {Array} enginePriority
     * Defines the priority order for which Surface implementation to use. The first
     * one supported by the current environment will be used.
     */
    enginePriority: ['Canvas'],

    baseCls: 'ext-surface',

    componentLayout: 'draw',

    /**
     * @cfg {Boolean} viewBox
     * Turn on view box support which will scale and position items in the draw component to fit to the component while
     * maintaining aspect ratio. Note that this scaling can override other sizing settings on yor items. Defaults to true.
     */
    viewBox: true,

    /**
     * @cfg {Boolean} autoSize
     * Turn on autoSize support which will set the bounding div's size to the natural size of the contents. Defaults to false.
     */
    autoSize: false,

    /**
     * @cfg {Array} gradients (optional) Define a set of gradients that can be used as `fill` property in sprites.
     * The gradients array is an array of objects with the following properties:
     *
     * <ul>
     * <li><strong>id</strong> - string - The unique name of the gradient.</li>
     * <li><strong>angle</strong> - number, optional - The angle of the gradient in degrees.</li>
     * <li><strong>stops</strong> - object - An object with numbers as keys (from 0 to 100) and style objects
     * as values</li>
     * </ul>
     *

     For example:

     <pre><code>
        gradients: [{
            id: 'gradientId',
            angle: 45,
            stops: {
                0: {
                    color: '#555'
                },
                100: {
                    color: '#ddd'
                }
            }
        },  {
            id: 'gradientId2',
            angle: 0,
            stops: {
                0: {
                    color: '#590'
                },
                20: {
                    color: '#599'
                },
                100: {
                    color: '#ddd'
                }
            }
        }]
     </code></pre>

     Then the sprites can use `gradientId` and `gradientId2` by setting the fill attributes to those ids, for example:

     <pre><code>
        sprite.setAttributes({
            fill: 'url(#gradientId)'
        }, true);
     </code></pre>

     */

    cls: 'x-draw-component',

    initComponent: function() {
        var me = this;
        Ext.draw.Component.superclass.initComponent.call(me);

        // Expose all mouse/touch events fired by the Surface
        me.addEvents.apply(me, Ext.draw.Surface.eventNames);
    },

    /**
     * @private
     *
     * Create the Surface on initial render
     */
    onRender: function() {
        var me = this,
            viewBox = me.viewBox,
            autoSize = me.autoSize,
            bbox, items, width, height, x, y;
        Ext.draw.Component.superclass.onRender.apply(this, arguments);

        me.surface = me.createSurface();

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

    /**
     * @private Return a reference to the {@link Ext.draw.Surface} instance from which events
     * should be relayed.
     */
    getEventsSurface: function() {
        return this.surface;
    },

    initEvents: function() {
        var me = this;
        Ext.draw.Component.superclass.initEvents.call(me);

        // Relay all mouse/touch events from the surface
        me.relayEvents(me.getEventsSurface(), Ext.draw.Surface.eventNames);
    },

    //@private
    autoSizeSurface: function() {
        var me = this,
            items = me.surface.items,
            bbox = items.getBBox(),
            width = bbox.width,
            height = bbox.height;
        items.setAttributes({
            translate: {
                x: -bbox.x,
                //Opera has a slight offset in the y axis.
                y: -bbox.y + (+Ext.isOpera)
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
     * instantiate based on the 'enginePriority' config. Once the Surface instance is
     * created you can use the handle to that instance to add sprites. For example:
     *
     <pre><code>
        drawComponent.surface.add(sprite);
     </code></pre>
     */
    createSurface: function(config) {
        var me = this,
            apply = Ext.apply;

        return Ext.draw.Surface.create(apply({}, apply({
                width: me.width,
                height: me.height,
                renderTo: me.el,
                id: Ext.id()
            }, config), me.initialConfig));
    },


    /**
     * @private
     *
     * Clean up the Surface instance on component destruction
     */
    onDestroy: function() {
        var surface = this.surface;
        if (surface) {
            surface.destroy();
        }
        Ext.draw.Component.superclass.onDestroy.call(this);
    }

});

Ext.reg('draw', Ext.draw.Component);

