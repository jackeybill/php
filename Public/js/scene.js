﻿/**
 * 
 *
 *
 * Copyright (c) 2015
 * Licensed MIT <>
 */
+ function(a, b, c) {
	/*  日本電話番号チェック */
	function checkphone(value) {
		data1 = value.match(/^[0-9-]{6,9}$|^[0-9-]{12}$/);
		data2 = value.match(/^\d{1,4}-\d{4}$|^\d{2,5}-\d{1,4}-\d{4}$/);
		data3 = value.match(/^\d{3}-\d{4}-\d{4}$|^\d{11}$/);
		return (!data1 && !data2 && !data3);
	}

    function d(a) {
        this.mode = j.MODE_8BIT_BYTE, this.data = a
    }

    function e(a, b) {
        this.typeNumber = a, 
        this.errorCorrectLevel = b, 
        this.modules = null, 
        this.moduleCount = 0, 
        this.dataCache = null, 
        this.dataList = new Array
    }


    function f(a, b) {
        if (a.length == c) throw new Error(a.length + "/" + b);
        for (var d = 0; d < a.length && 0 == a[d];) d++;
        this.num = new Array(a.length - d + b);
        for (var e = 0; e < a.length - d; e++) this.num[e] = a[e + d]
    }

    function g(a, b) {
        this.totalCount = a, this.dataCount = b
    }

    function h() {
        this.buffer = new Array, this.length = 0
    }

    function i(a) {
            for (var b = 0, c = 0; c < a.length; c++) {
                var d = a.charCodeAt(c);
                d >= 1 && 126 >= d || d >= 65376 && 65439 >= d ? b++ : b += 2
            }
            return b
        }+ function(a) {
            function b(a) {
                function b(a, b, c) {
                    return a[b] || (a[b] = c())
                }
                var c = b(a, "eqShow", Object);
                return b(c, "templateParser", function() {
                    var a = {};
                    return function(c, d) {
                        if ("hasOwnProperty" === c) throw new Error("hasOwnProperty is not a valid name");
                        return d && a.hasOwnProperty(c) && (a[c] = null), b(a, c, d)
                    }
                })
            }

            function c() {
                templateParser = b(a)
            }
            var d = a.eqShow || (a.eqShow = {});
            c(d)
        }(a, document),
        
    function(a) {
            a.fn.qrcode = function(b) {
                "string" == typeof b && (b = {
                    text: b
                }), b = a.extend({}, {
                    render: "canvas",
                    width: 256,
                    height: 256,
                    typeNumber: -1,
                    correctLevel: k.H,
                    background: "#ffffff",
                    foreground: "#000000"
                }, b);
                var c = function() {
                        var a = new e(b.typeNumber, b.correctLevel);
                        a.addData(b.text), a.make();
                        var c = document.createElement("canvas");
                        c.width = b.width, c.height = b.height;
                        for (var d = c.getContext("2d"), f = b.width / a.getModuleCount(), g = b.height / a.getModuleCount(), h = 0; h < a.getModuleCount(); h++)
                            for (var i = 0; i < a.getModuleCount(); i++) {
                                d.fillStyle = a.isDark(h, i) ? b.foreground : b.background;
                                var j = Math.ceil((i + 1) * f) - Math.floor(i * f),
                                    k = Math.ceil((h + 1) * f) - Math.floor(h * f);
                                d.fillRect(Math.round(i * f), Math.round(h * g), j, k)
                            }
                        return c
                    },
                    d = function() {
                        var c = new e(b.typeNumber, b.correctLevel);
                        c.addData(b.text), c.make();
                        for (var d = a("<table></table>").css("width", b.width + "px").css("height", b.height + "px").css("border", "0px").css("border-collapse", "collapse").css("background-color", b.background), f = b.width / c.getModuleCount(), g = b.height / c.getModuleCount(), h = 0; h < c.getModuleCount(); h++)
                            for (var i = a("<tr></tr>").css("height", g + "px").appendTo(d), j = 0; j < c.getModuleCount(); j++) a("<td></td>").css("width", f + "px").css("background-color", c.isDark(h, j) ? b.foreground : b.background).appendTo(i);
                        return d
                    };
                
                return this.each(function() {
                                     var e = "canvas" == b.render ? c() : d();
                                     a(e).appendTo(this)
                                 })
            }
        }(jQuery), d.prototype = {
            getLength: function() {
                return this.data.length
            },
            write: function(a) {
                for (var b = 0; b < this.data.length; b++) a.put(this.data.charCodeAt(b), 8)
            }
        }, e.prototype = {
            addData: function(a) {
                var b = new d(a);
                this.dataList.push(b), this.dataCache = null
            },
            isDark: function(a, b) {
                if (0 > a || this.moduleCount <= a || 0 > b || this.moduleCount <= b) throw new Error(a + "," + b);
                return this.modules[a][b]
            },
            getModuleCount: function() {
                return this.moduleCount
            },
            make: function() {
                if (this.typeNumber < 1) {
                    var a = 1;
                    for (a = 1; 40 > a; a++) {
                        for (var b = g.getRSBlocks(a, this.errorCorrectLevel), c = new h, d = 0, e = 0; e < b.length; e++) d += b[e].dataCount;
                        for (var e = 0; e < this.dataList.length; e++) {
                            var f = this.dataList[e];
                            c.put(f.mode, 4), c.put(f.getLength(), m.getLengthInBits(f.mode, a)), f.write(c)
                        }
                        if (c.getLengthInBits() <= 8 * d) break
                    }
                    this.typeNumber = a
                }
                this.makeImpl(!1, this.getBestMaskPattern())
            },
            makeImpl: function(a, b) {
                this.moduleCount = 4 * this.typeNumber + 17, this.modules = new Array(this.moduleCount);
                for (var c = 0; c < this.moduleCount; c++) {
                    this.modules[c] = new Array(this.moduleCount);
                    for (var d = 0; d < this.moduleCount; d++) this.modules[c][d] = null
                }
                this.setupPositionProbePattern(0, 0), this.setupPositionProbePattern(this.moduleCount - 7, 0), this.setupPositionProbePattern(0, this.moduleCount - 7), this.setupPositionAdjustPattern(), this.setupTimingPattern(), this.setupTypeInfo(a, b), this.typeNumber >= 7 && this.setupTypeNumber(a), null == this.dataCache && (this.dataCache = e.createData(this.typeNumber, this.errorCorrectLevel, this.dataList)), this.mapData(this.dataCache, b)
            },
            setupPositionProbePattern: function(a, b) {
                for (var c = -1; 7 >= c; c++)
                    if (!(-1 >= a + c || this.moduleCount <= a + c))
                        for (var d = -1; 7 >= d; d++) - 1 >= b + d || this.moduleCount <= b + d || (this.modules[a + c][b + d] = c >= 0 && 6 >= c && (0 == d || 6 == d) || d >= 0 && 6 >= d && (0 == c || 6 == c) || c >= 2 && 4 >= c && d >= 2 && 4 >= d ? !0 : !1)
            },
            getBestMaskPattern: function() {
                for (var a = 0, b = 0, c = 0; 8 > c; c++) {
                    this.makeImpl(!0, c);
                    var d = m.getLostPoint(this);
                    (0 == c || a > d) && (a = d, b = c)
                }
                return b
            },
            createMovieClip: function(a, b, c) {
                var d = a.createEmptyMovieClip(b, c),
                    e = 1;
                this.make();
                for (var f = 0; f < this.modules.length; f++)
                    for (var g = f * e, h = 0; h < this.modules[f].length; h++) {
                        var i = h * e,
                            j = this.modules[f][h];
                        j && (d.beginFill(0, 100), d.moveTo(i, g), d.lineTo(i + e, g), d.lineTo(i + e, g + e), d.lineTo(i, g + e), d.endFill())
                    }
                return d
            },
            setupTimingPattern: function() {
                for (var a = 8; a < this.moduleCount - 8; a++) null == this.modules[a][6] && (this.modules[a][6] = a % 2 == 0);
                for (var b = 8; b < this.moduleCount - 8; b++) null == this.modules[6][b] && (this.modules[6][b] = b % 2 == 0)
            },
            setupPositionAdjustPattern: function() {
                for (var a = m.getPatternPosition(this.typeNumber), b = 0; b < a.length; b++)
                    for (var c = 0; c < a.length; c++) {
                        var d = a[b],
                            e = a[c];
                        if (null == this.modules[d][e])
                            for (var f = -2; 2 >= f; f++)
                                for (var g = -2; 2 >= g; g++) this.modules[d + f][e + g] = -2 == f || 2 == f || -2 == g || 2 == g || 0 == f && 0 == g ? !0 : !1
                    }
            },
            setupTypeNumber: function(a) {
                for (var b = m.getBCHTypeNumber(this.typeNumber), c = 0; 18 > c; c++) {
                    var d = !a && 1 == (b >> c & 1);
                    this.modules[Math.floor(c / 3)][c % 3 + this.moduleCount - 8 - 3] = d
                }
                for (var c = 0; 18 > c; c++) {
                    var d = !a && 1 == (b >> c & 1);
                    this.modules[c % 3 + this.moduleCount - 8 - 3][Math.floor(c / 3)] = d
                }
            },
            setupTypeInfo: function(a, b) {
                for (var c = this.errorCorrectLevel << 3 | b, d = m.getBCHTypeInfo(c), e = 0; 15 > e; e++) {
                    var f = !a && 1 == (d >> e & 1);
                    6 > e ? this.modules[e][8] = f : 8 > e ? this.modules[e + 1][8] = f : this.modules[this.moduleCount - 15 + e][8] = f
                }
                for (var e = 0; 15 > e; e++) {
                    var f = !a && 1 == (d >> e & 1);
                    8 > e ? this.modules[8][this.moduleCount - e - 1] = f : 9 > e ? this.modules[8][15 - e - 1 + 1] = f : this.modules[8][15 - e - 1] = f
                }
                this.modules[this.moduleCount - 8][8] = !a
            },
            mapData: function(a, b) {
                for (var c = -1, d = this.moduleCount - 1, e = 7, f = 0, g = this.moduleCount - 1; g > 0; g -= 2)
                    for (6 == g && g--;;) {
                        for (var h = 0; 2 > h; h++)
                            if (null == this.modules[d][g - h]) {
                                var i = !1;
                                f < a.length && (i = 1 == (a[f] >>> e & 1));
                                var j = m.getMask(b, d, g - h);
                                j && (i = !i), this.modules[d][g - h] = i, e--, -1 == e && (f++, e = 7)
                            }
                        if (d += c, 0 > d || this.moduleCount <= d) {
                            d -= c, c = -c;
                            break
                        }
                    }
            }
        }, e.PAD0 = 236, e.PAD1 = 17, e.createData = function(a, b, c) {
            for (var d = g.getRSBlocks(a, b), f = new h, i = 0; i < c.length; i++) {
                var j = c[i];
                f.put(j.mode, 4), f.put(j.getLength(), m.getLengthInBits(j.mode, a)), j.write(f)
            }
            for (var k = 0, i = 0; i < d.length; i++) k += d[i].dataCount;
            if (f.getLengthInBits() > 8 * k) throw new Error("code length overflow. (" + f.getLengthInBits() + ">" + 8 * k + ")");
            for (f.getLengthInBits() + 4 <= 8 * k && f.put(0, 4); f.getLengthInBits() % 8 != 0;) f.putBit(!1);
            for (;;) {
                if (f.getLengthInBits() >= 8 * k) break;
                if (f.put(e.PAD0, 8), f.getLengthInBits() >= 8 * k) break;
                f.put(e.PAD1, 8)
            }
            return e.createBytes(f, d)
        }, e.createBytes = function(a, b) {
            for (var c = 0, d = 0, e = 0, g = new Array(b.length), h = new Array(b.length), i = 0; i < b.length; i++) {
                var j = b[i].dataCount,
                    k = b[i].totalCount - j;
                d = Math.max(d, j), e = Math.max(e, k), g[i] = new Array(j);
                for (var l = 0; l < g[i].length; l++) g[i][l] = 255 & a.buffer[l + c];
                c += j;
                var n = m.getErrorCorrectPolynomial(k),
                    o = new f(g[i], n.getLength() - 1),
                    p = o.mod(n);
                h[i] = new Array(n.getLength() - 1);
                for (var l = 0; l < h[i].length; l++) {
                    var q = l + p.getLength() - h[i].length;
                    h[i][l] = q >= 0 ? p.get(q) : 0
                }
            }
            for (var r = 0, l = 0; l < b.length; l++) r += b[l].totalCount;
            for (var s = new Array(r), t = 0, l = 0; d > l; l++)
                for (var i = 0; i < b.length; i++) l < g[i].length && (s[t++] = g[i][l]);
            for (var l = 0; e > l; l++)
                for (var i = 0; i < b.length; i++) l < h[i].length && (s[t++] = h[i][l]);
            return s
        };
    
    for (var j = {
        MODE_NUMBER: 1,
        MODE_ALPHA_NUM: 2,
        MODE_8BIT_BYTE: 4,
        MODE_KANJI: 8
    }, k = {
        L: 1,
        M: 0,
        Q: 3,
        H: 2
    }, l = {
        PATTERN000: 0,
        PATTERN001: 1,
        PATTERN010: 2,
        PATTERN011: 3,
        PATTERN100: 4,
        PATTERN101: 5,
        PATTERN110: 6,
        PATTERN111: 7
    }, m = {
        PATTERN_POSITION_TABLE: [
            [],
            [6, 18],
            [6, 22],
            [6, 26],
            [6, 30],
            [6, 34],
            [6, 22, 38],
            [6, 24, 42],
            [6, 26, 46],
            [6, 28, 50],
            [6, 30, 54],
            [6, 32, 58],
            [6, 34, 62],
            [6, 26, 46, 66],
            [6, 26, 48, 70],
            [6, 26, 50, 74],
            [6, 30, 54, 78],
            [6, 30, 56, 82],
            [6, 30, 58, 86],
            [6, 34, 62, 90],
            [6, 28, 50, 72, 94],
            [6, 26, 50, 74, 98],
            [6, 30, 54, 78, 102],
            [6, 28, 54, 80, 106],
            [6, 32, 58, 84, 110],
            [6, 30, 58, 86, 114],
            [6, 34, 62, 90, 118],
            [6, 26, 50, 74, 98, 122],
            [6, 30, 54, 78, 102, 126],
            [6, 26, 52, 78, 104, 130],
            [6, 30, 56, 82, 108, 134],
            [6, 34, 60, 86, 112, 138],
            [6, 30, 58, 86, 114, 142],
            [6, 34, 62, 90, 118, 146],
            [6, 30, 54, 78, 102, 126, 150],
            [6, 24, 50, 76, 102, 128, 154],
            [6, 28, 54, 80, 106, 132, 158],
            [6, 32, 58, 84, 110, 136, 162],
            [6, 26, 54, 82, 110, 138, 166],
            [6, 30, 58, 86, 114, 142, 170]
        ],
        G15: 1335,
        G18: 7973,
        G15_MASK: 21522,
        getBCHTypeInfo: function(a) {
            for (var b = a << 10; m.getBCHDigit(b) - m.getBCHDigit(m.G15) >= 0;) b ^= m.G15 << m.getBCHDigit(b) - m.getBCHDigit(m.G15);
            return (a << 10 | b) ^ m.G15_MASK
        },
        getBCHTypeNumber: function(a) {
            for (var b = a << 12; m.getBCHDigit(b) - m.getBCHDigit(m.G18) >= 0;) b ^= m.G18 << m.getBCHDigit(b) - m.getBCHDigit(m.G18);
            return a << 12 | b
        },
        getBCHDigit: function(a) {
            for (var b = 0; 0 != a;) b++, a >>>= 1;
            return b
        },
        getPatternPosition: function(a) {
            return m.PATTERN_POSITION_TABLE[a - 1]
        },
        getMask: function(a, b, c) {
            switch (a) {
                case l.PATTERN000:
                    return (b + c) % 2 == 0;
                case l.PATTERN001:
                    return b % 2 == 0;
                case l.PATTERN010:
                    return c % 3 == 0;
                case l.PATTERN011:
                    return (b + c) % 3 == 0;
                case l.PATTERN100:
                    return (Math.floor(b / 2) + Math.floor(c / 3)) % 2 == 0;
                case l.PATTERN101:
                    return b * c % 2 + b * c % 3 == 0;
                case l.PATTERN110:
                    return (b * c % 2 + b * c % 3) % 2 == 0;
                case l.PATTERN111:
                    return (b * c % 3 + (b + c) % 2) % 2 == 0;
                default:
                    throw new Error("bad maskPattern:" + a)
            }
        },
        getErrorCorrectPolynomial: function(a) {
            for (var b = new f([1], 0), c = 0; a > c; c++) b = b.multiply(new f([1, n.gexp(c)], 0));
            return b
        },
        getLengthInBits: function(a, b) {
            if (b >= 1 && 10 > b) switch (a) {
                case j.MODE_NUMBER:
                    return 10;
                case j.MODE_ALPHA_NUM:
                    return 9;
                case j.MODE_8BIT_BYTE:
                    return 8;
                case j.MODE_KANJI:
                    return 8;
                default:
                    throw new Error("mode:" + a)
            } else if (27 > b) switch (a) {
                case j.MODE_NUMBER:
                    return 12;
                case j.MODE_ALPHA_NUM:
                    return 11;
                case j.MODE_8BIT_BYTE:
                    return 16;
                case j.MODE_KANJI:
                    return 10;
                default:
                    throw new Error("mode:" + a)
            } else {
                if (!(41 > b)) throw new Error("type:" + b);
                switch (a) {
                    case j.MODE_NUMBER:
                        return 14;
                    case j.MODE_ALPHA_NUM:
                        return 13;
                    case j.MODE_8BIT_BYTE:
                        return 16;
                    case j.MODE_KANJI:
                        return 12;
                    default:
                        throw new Error("mode:" + a)
                }
            }
        },
        getLostPoint: function(a) {
            for (var b = a.getModuleCount(), c = 0, d = 0; b > d; d++)
                for (var e = 0; b > e; e++) {
                    for (var f = 0, g = a.isDark(d, e), h = -1; 1 >= h; h++)
                        if (!(0 > d + h || d + h >= b))
                            for (var i = -1; 1 >= i; i++) 0 > e + i || e + i >= b || (0 != h || 0 != i) && g == a.isDark(d + h, e + i) && f++;
                    f > 5 && (c += 3 + f - 5)
                }
            for (var d = 0; b - 1 > d; d++)
                for (var e = 0; b - 1 > e; e++) {
                    var j = 0;
                    a.isDark(d, e) && j++, a.isDark(d + 1, e) && j++, a.isDark(d, e + 1) && j++, a.isDark(d + 1, e + 1) && j++, (0 == j || 4 == j) && (c += 3)
                }
            for (var d = 0; b > d; d++)
                for (var e = 0; b - 6 > e; e++) a.isDark(d, e) && !a.isDark(d, e + 1) && a.isDark(d, e + 2) && a.isDark(d, e + 3) && a.isDark(d, e + 4) && !a.isDark(d, e + 5) && a.isDark(d, e + 6) && (c += 40);
            for (var e = 0; b > e; e++)
                for (var d = 0; b - 6 > d; d++) a.isDark(d, e) && !a.isDark(d + 1, e) && a.isDark(d + 2, e) && a.isDark(d + 3, e) && a.isDark(d + 4, e) && !a.isDark(d + 5, e) && a.isDark(d + 6, e) && (c += 40);
            for (var k = 0, e = 0; b > e; e++)
                for (var d = 0; b > d; d++) a.isDark(d, e) && k++;
            var l = Math.abs(100 * k / b / b - 50) / 5;
            return c += 10 * l
        }
    }, n = {
        glog: function(a) {
            if (1 > a) throw new Error("glog(" + a + ")");
            return n.LOG_TABLE[a]
        },
        gexp: function(a) {
            for (; 0 > a;) a += 255;
            for (; a >= 256;) a -= 255;
            return n.EXP_TABLE[a]
        },
        EXP_TABLE: new Array(256),
        LOG_TABLE: new Array(256)
    }, o = 0; 8 > o; o++) n.EXP_TABLE[o] = 1 << o;
    for (var o = 8; 256 > o; o++) n.EXP_TABLE[o] = n.EXP_TABLE[o - 4] ^ n.EXP_TABLE[o - 5] ^ n.EXP_TABLE[o - 6] ^ n.EXP_TABLE[o - 8];
    for (var o = 0; 255 > o; o++) n.LOG_TABLE[n.EXP_TABLE[o]] = o;
    f.prototype = {
            get: function(a) {
                return this.num[a]
            },
            getLength: function() {
                return this.num.length
            },
            multiply: function(a) {
                for (var b = new Array(this.getLength() + a.getLength() - 1), c = 0; c < this.getLength(); c++)
                    for (var d = 0; d < a.getLength(); d++) b[c + d] ^= n.gexp(n.glog(this.get(c)) + n.glog(a.get(d)));
                return new f(b, 0)
            },
            mod: function(a) {
                if (this.getLength() - a.getLength() < 0) return this;
                for (var b = n.glog(this.get(0)) - n.glog(a.get(0)), c = new Array(this.getLength()), d = 0; d < this.getLength(); d++) c[d] = this.get(d);
                for (var d = 0; d < a.getLength(); d++) c[d] ^= n.gexp(n.glog(a.get(d)) + b);
                return new f(c, 0).mod(a)
            }
        }, g.RS_BLOCK_TABLE = [
            [1, 26, 19],
            [1, 26, 16],
            [1, 26, 13],
            [1, 26, 9],
            [1, 44, 34],
            [1, 44, 28],
            [1, 44, 22],
            [1, 44, 16],
            [1, 70, 55],
            [1, 70, 44],
            [2, 35, 17],
            [2, 35, 13],
            [1, 100, 80],
            [2, 50, 32],
            [2, 50, 24],
            [4, 25, 9],
            [1, 134, 108],
            [2, 67, 43],
            [2, 33, 15, 2, 34, 16],
            [2, 33, 11, 2, 34, 12],
            [2, 86, 68],
            [4, 43, 27],
            [4, 43, 19],
            [4, 43, 15],
            [2, 98, 78],
            [4, 49, 31],
            [2, 32, 14, 4, 33, 15],
            [4, 39, 13, 1, 40, 14],
            [2, 121, 97],
            [2, 60, 38, 2, 61, 39],
            [4, 40, 18, 2, 41, 19],
            [4, 40, 14, 2, 41, 15],
            [2, 146, 116],
            [3, 58, 36, 2, 59, 37],
            [4, 36, 16, 4, 37, 17],
            [4, 36, 12, 4, 37, 13],
            [2, 86, 68, 2, 87, 69],
            [4, 69, 43, 1, 70, 44],
            [6, 43, 19, 2, 44, 20],
            [6, 43, 15, 2, 44, 16],
            [4, 101, 81],
            [1, 80, 50, 4, 81, 51],
            [4, 50, 22, 4, 51, 23],
            [3, 36, 12, 8, 37, 13],
            [2, 116, 92, 2, 117, 93],
            [6, 58, 36, 2, 59, 37],
            [4, 46, 20, 6, 47, 21],
            [7, 42, 14, 4, 43, 15],
            [4, 133, 107],
            [8, 59, 37, 1, 60, 38],
            [8, 44, 20, 4, 45, 21],
            [12, 33, 11, 4, 34, 12],
            [3, 145, 115, 1, 146, 116],
            [4, 64, 40, 5, 65, 41],
            [11, 36, 16, 5, 37, 17],
            [11, 36, 12, 5, 37, 13],
            [5, 109, 87, 1, 110, 88],
            [5, 65, 41, 5, 66, 42],
            [5, 54, 24, 7, 55, 25],
            [11, 36, 12],
            [5, 122, 98, 1, 123, 99],
            [7, 73, 45, 3, 74, 46],
            [15, 43, 19, 2, 44, 20],
            [3, 45, 15, 13, 46, 16],
            [1, 135, 107, 5, 136, 108],
            [10, 74, 46, 1, 75, 47],
            [1, 50, 22, 15, 51, 23],
            [2, 42, 14, 17, 43, 15],
            [5, 150, 120, 1, 151, 121],
            [9, 69, 43, 4, 70, 44],
            [17, 50, 22, 1, 51, 23],
            [2, 42, 14, 19, 43, 15],
            [3, 141, 113, 4, 142, 114],
            [3, 70, 44, 11, 71, 45],
            [17, 47, 21, 4, 48, 22],
            [9, 39, 13, 16, 40, 14],
            [3, 135, 107, 5, 136, 108],
            [3, 67, 41, 13, 68, 42],
            [15, 54, 24, 5, 55, 25],
            [15, 43, 15, 10, 44, 16],
            [4, 144, 116, 4, 145, 117],
            [17, 68, 42],
            [17, 50, 22, 6, 51, 23],
            [19, 46, 16, 6, 47, 17],
            [2, 139, 111, 7, 140, 112],
            [17, 74, 46],
            [7, 54, 24, 16, 55, 25],
            [34, 37, 13],
            [4, 151, 121, 5, 152, 122],
            [4, 75, 47, 14, 76, 48],
            [11, 54, 24, 14, 55, 25],
            [16, 45, 15, 14, 46, 16],
            [6, 147, 117, 4, 148, 118],
            [6, 73, 45, 14, 74, 46],
            [11, 54, 24, 16, 55, 25],
            [30, 46, 16, 2, 47, 17],
            [8, 132, 106, 4, 133, 107],
            [8, 75, 47, 13, 76, 48],
            [7, 54, 24, 22, 55, 25],
            [22, 45, 15, 13, 46, 16],
            [10, 142, 114, 2, 143, 115],
            [19, 74, 46, 4, 75, 47],
            [28, 50, 22, 6, 51, 23],
            [33, 46, 16, 4, 47, 17],
            [8, 152, 122, 4, 153, 123],
            [22, 73, 45, 3, 74, 46],
            [8, 53, 23, 26, 54, 24],
            [12, 45, 15, 28, 46, 16],
            [3, 147, 117, 10, 148, 118],
            [3, 73, 45, 23, 74, 46],
            [4, 54, 24, 31, 55, 25],
            [11, 45, 15, 31, 46, 16],
            [7, 146, 116, 7, 147, 117],
            [21, 73, 45, 7, 74, 46],
            [1, 53, 23, 37, 54, 24],
            [19, 45, 15, 26, 46, 16],
            [5, 145, 115, 10, 146, 116],
            [19, 75, 47, 10, 76, 48],
            [15, 54, 24, 25, 55, 25],
            [23, 45, 15, 25, 46, 16],
            [13, 145, 115, 3, 146, 116],
            [2, 74, 46, 29, 75, 47],
            [42, 54, 24, 1, 55, 25],
            [23, 45, 15, 28, 46, 16],
            [17, 145, 115],
            [10, 74, 46, 23, 75, 47],
            [10, 54, 24, 35, 55, 25],
            [19, 45, 15, 35, 46, 16],
            [17, 145, 115, 1, 146, 116],
            [14, 74, 46, 21, 75, 47],
            [29, 54, 24, 19, 55, 25],
            [11, 45, 15, 46, 46, 16],
            [13, 145, 115, 6, 146, 116],
            [14, 74, 46, 23, 75, 47],
            [44, 54, 24, 7, 55, 25],
            [59, 46, 16, 1, 47, 17],
            [12, 151, 121, 7, 152, 122],
            [12, 75, 47, 26, 76, 48],
            [39, 54, 24, 14, 55, 25],
            [22, 45, 15, 41, 46, 16],
            [6, 151, 121, 14, 152, 122],
            [6, 75, 47, 34, 76, 48],
            [46, 54, 24, 10, 55, 25],
            [2, 45, 15, 64, 46, 16],
            [17, 152, 122, 4, 153, 123],
            [29, 74, 46, 14, 75, 47],
            [49, 54, 24, 10, 55, 25],
            [24, 45, 15, 46, 46, 16],
            [4, 152, 122, 18, 153, 123],
            [13, 74, 46, 32, 75, 47],
            [48, 54, 24, 14, 55, 25],
            [42, 45, 15, 32, 46, 16],
            [20, 147, 117, 4, 148, 118],
            [40, 75, 47, 7, 76, 48],
            [43, 54, 24, 22, 55, 25],
            [10, 45, 15, 67, 46, 16],
            [19, 148, 118, 6, 149, 119],
            [18, 75, 47, 31, 76, 48],
            [34, 54, 24, 34, 55, 25],
            [20, 45, 15, 61, 46, 16]
        ], g.getRSBlocks = function(a, b) {
            var d = g.getRsBlockTable(a, b);
            if (d == c) throw new Error("bad rs block @ typeNumber:" + a + "/errorCorrectLevel:" + b);
            for (var e = d.length / 3, f = new Array, h = 0; e > h; h++)
                for (var i = d[3 * h + 0], j = d[3 * h + 1], k = d[3 * h + 2], l = 0; i > l; l++) f.push(new g(j, k));
            return f
        }, g.getRsBlockTable = function(a, b) {
            switch (b) {
                case k.L:
                    return g.RS_BLOCK_TABLE[4 * (a - 1) + 0];
                case k.M:
                    return g.RS_BLOCK_TABLE[4 * (a - 1) + 1];
                case k.Q:
                    return g.RS_BLOCK_TABLE[4 * (a - 1) + 2];
                case k.H:
                    return g.RS_BLOCK_TABLE[4 * (a - 1) + 3];
                default:
                    return c
            }
        }, h.prototype = {
            get: function(a) {
                var b = Math.floor(a / 8);
                return 1 == (this.buffer[b] >>> 7 - a % 8 & 1)
            },
            put: function(a, b) {
                for (var c = 0; b > c; c++) this.putBit(1 == (a >>> b - c - 1 & 1))
            },
            getLengthInBits: function() {
                return this.length
            },
            putBit: function(a) {
                var b = Math.floor(this.length / 8);
                this.buffer.length <= b && this.buffer.push(0), a && (this.buffer[b] |= 128 >>> this.length % 8), this.length++
            }
        },
        function(a) {
            a.fn.slides = function(b) {
                return b = a.extend({}, a.fn.slides.option, b), this.each(function() {
                    function c() {
                        clearInterval(j.data("interval"))
                    }

                    function d() {
                        b.pause ? (clearTimeout(j.data("pause")), clearInterval(j.data("interval")), pauseTimeout = setTimeout(function() {
                            clearTimeout(j.data("pause")), playInterval = setInterval(function() {
                                e("next", p)
                            }, b.play), j.data("interval", playInterval)
                        }, b.pause), j.data("pause", pauseTimeout)) : c()
                    }

                    function e(c, d, e) {
                        if (!g && f) {
                            switch (g = !0, c) {
                                case "next":
                                    s = u, r = u + 1, r = l === r ? 0 : r, i = 2 * m, c = 2 * -m, u = r;
                                    break;
                                case "prev":
                                    s = u, r = u - 1, r = -1 === r ? l - 1 : r, i = 0, c = 0, u = r;
                                    break;
                                case "pagination":
                                    r = parseInt(e, 10), s = a("." + b.paginationClass + " li.current a", j).attr("rel"), r > s ? (i = 2 * m, c = 2 * -m) : (i = 0, c = 0), u = r
                            }
                            "fade" === d ? (b.animationStart(), b.crossfade ? k.children(":eq(" + r + ")", j).css({
                                zIndex: 10
                            }).fadeIn(b.fadeSpeed, function() {
                                k.children(":eq(" + s + ")", j).css({
                                    display: "none",
                                    zIndex: 0
                                }), a(this).css({
                                    zIndex: 0
                                }), b.animationComplete(r + 1), g = !1
                            }) : (b.animationStart(), k.children(":eq(" + s + ")", j).fadeOut(b.fadeSpeed, function() {
                                b.autoHeight ? k.animate({
                                    height: k.children(":eq(" + r + ")", j).outerHeight()
                                }, b.autoHeightSpeed, function() {
                                    k.children(":eq(" + r + ")", j).fadeIn(b.fadeSpeed)
                                }) : k.children(":eq(" + r + ")", j).fadeIn(b.fadeSpeed, function() {
                                    a.browser.msie && a(this).get(0).style.removeAttribute("filter")
                                }), b.animationComplete(r + 1), g = !1
                            }))) : (k.children(":eq(" + r + ")").css({
                                left: i,
                                display: "block"
                            }), b.autoHeight ? (b.animationStart(), k.animate({
                                left: c,
                                height: k.children(":eq(" + r + ")").outerHeight()
                            }, b.slideSpeed, function() {
                                k.css({
                                    left: -m
                                }), k.children(":eq(" + r + ")").css({
                                    left: m,
                                    zIndex: 5
                                }), k.children(":eq(" + s + ")").css({
                                    left: m,
                                    display: "none",
                                    zIndex: 0
                                }), b.animationComplete(r + 1), g = !1
                            })) : (b.animationStart(), k.animate({
                                left: c
                            }, b.slideSpeed, function() {
                                k.css({
                                    left: -m
                                }), k.children(":eq(" + r + ")").css({
                                    left: m,
                                    zIndex: 5
                                }), k.children(":eq(" + s + ")").css({
                                    left: m,
                                    display: "none",
                                    zIndex: 0
                                }), b.animationComplete(r + 1), g = !1
                            }))), b.pagination && (a("." + b.paginationClass + " li.current", j).removeClass("current"), a("." + b.paginationClass + " li a:eq(" + r + ")", j).parent().addClass("current"))
                        }
                    }
                    a("." + b.container, a(this)).children().wrapAll('<div class="slides_control"/>');
                    var f, g, h, i, j = a(this),
                        k = a(".slides_control", j),
                        l = k.children().size(),
                        m = k.children().outerWidth(),
                        n = k.children().outerHeight(),
                        o = b.start - 1,
                        p = b.effect.indexOf(",") < 0 ? b.effect : b.effect.replace(" ", "").split(",")[0],
                        q = b.effect.indexOf(",") < 0 ? p : b.effect.replace(" ", "").split(",")[1],
                        r = 0,
                        s = 0,
                        t = 0,
                        u = 0;
                    if (!(2 > l)) {
                        if (0 > o && (o = 0), o > l && (o = l - 1), b.start && (u = o), b.randomize && k.randomize(), a("." + b.container, j).css({
                            overflow: "hidden",
                            position: "relative"
                        }), k.css({
                            position: "relative",
                            width: 3 * m,
                            height: n,
                            left: -m
                        }), k.children().css({
                            position: "absolute",
                            top: 0,
                            left: m,
                            zIndex: 0,
                            display: "none"
                        }), b.autoHeight && k.animate({
                            height: k.children(":eq(" + o + ")").outerHeight()
                        }, b.autoHeightSpeed), b.preload && "IMG" == k.children()[0].tagName) {
                            j.css({
                                background: "url(" + b.preloadImage + ") no-repeat 50% 50%"
                            });
                            var v = a("img:eq(" + o + ")", j).attr("src") + "?" + (new Date).getTime();
                            a("img:eq(" + o + ")", j).attr("src", v).load(function() {
                                a(this).fadeIn(b.fadeSpeed, function() {
                                    a(this).css({
                                        zIndex: 5
                                    }), j.css({
                                        background: ""
                                    }), f = !0
                                })
                            })
                        } else k.children(":eq(" + o + ")").fadeIn(b.fadeSpeed, function() {
                            f = !0
                        });
                        b.bigTarget && (k.children().css({
                            cursor: "pointer"
                        }), k.children().click(function() {
                            return e("next", p), !1
                        })), b.hoverPause && b.play && (k.children().bind("mouseover", function() {
                            c()
                        }), k.children().bind("mouseleave", function() {
                            d()
                        })), b.generateNextPrev && (a("." + b.container, j).after('<a href="#" class="' + b.prev + '">Prev</a>'), a("." + b.prev, j).after('<a href="#" class="' + b.next + '">Next</a>')), a("." + b.next, j).click(function(a) {
                            a.preventDefault(), b.play && d(), e("next", p)
                        }), a("." + b.prev, j).click(function(a) {
                            a.preventDefault(), b.play && d(), e("prev", p)
                        }), b.generatePagination ? (j.append("<ul class=" + b.paginationClass + "></ul>"), k.children().each(function() {
                            a("." + b.paginationClass, j).append("<li><a rel=" + t + ' href="#">' + (t + 1) + "</a></li>"), t++
                        })) : a("." + b.paginationClass + " li a", j).each(function() {
                            a(this).attr("rel", t), t++
                        }), a("." + b.paginationClass + " li a:eq(" + o + ")", j).parent().addClass("current"), a("." + b.paginationClass + " li a", j).click(function() {
                            return b.play && d(), h = a(this).attr("rel"), u != h && e("pagination", q, h), !1
                        }), b.play && (playInterval = setInterval(function() {
                            e("next", p)
                        }, b.play), j.data("interval", playInterval))
                    }
                })
            }, a.fn.slides.option = {
                preload: !1,
                preloadImage: "/img/loading.gif",
                container: "slides_container",
                generateNextPrev: !1,
                next: "next",
                prev: "prev",
                pagination: !0,
                generatePagination: !0,
                paginationClass: "pagination",
                fadeSpeed: 350,
                slideSpeed: 350,
                start: 1,
                effect: "slide",
                crossfade: !1,
                randomize: !1,
                play: 0,
                pause: 0,
                hoverPause: !1,
                autoHeight: !1,
                autoHeightSpeed: 350,
                bigTarget: !1,
                animationStart: function() {},
                animationComplete: function() {}
            }, a.fn.randomize = function(b) {
                function d() {
                    return Math.round(Math.random()) - .5
                }
                return a(this).each(function() {
                    var e = a(this),
                        f = e.children(),
                        g = f.length;
                    if (g > 1) {
                        f.hide();
                        var h = [];
                        for (o = 0; g > o; o++) h[h.length] = o;
                        h = h.sort(d), a.each(h, function(a, d) {
                            var g = f.eq(d),
                                h = g.clone(!0);
                            h.show().appendTo(e), b !== c && b(g, h), g.remove()
                        })
                    }
                })
            }
        }(jQuery),
    function(b) {
            function c(a, b, c, d) {
                var e = {},
                    f = a / b,
                    g = c / d;
                return f > g ? (e.width = c, e.height = c / f) : (e.height = d, e.width = d * f), e
            }
            var d = b.templateParser("jsonParser", function() {
                function a(a) {
                    return function(b, c) {
                        a[b] = c
                    }
                }

                function b(a, b) {
                    var c = i[("" + a.type).charAt(0)](a);
                    if (c) {
                        var d = $('<li comp-drag comp-rotate class="comp-resize comp-rotate inside" id="inside_' + c.id + '" num="' + a.num + '" ctype="' + a.type + '"></li>');
                        3 != ("" + a.type).charAt(0) && 1 != ("" + a.type).charAt(0) && d.attr("comp-resize", ""), "p" == ("" + a.type).charAt(0) && d.removeAttr("comp-rotate"), 1 == ("" + a.type).charAt(0) && d.removeAttr("comp-drag"), 2 == ("" + a.type).charAt(0) && d.addClass("wsite-text"), 4 == ("" + a.type).charAt(0) && (a.properties.imgStyle && $(c).css(a.properties.imgStyle), d.addClass("wsite-image")), 5 == ("" + a.type).charAt(0) && d.addClass("wsite-input"), 6 == ("" + a.type).charAt(0) && d.addClass("wsite-button"), 8 == ("" + a.type).charAt(0) && d.addClass("wsite-button"), "v" == ("" + a.type).charAt(0) && d.addClass("wsite-video"), d.mouseenter(function() {
                            $(this).addClass("inside-hover")
                        }), d.mouseleave(function() {
                            $(this).removeClass("inside-hover")
                        });
                        var e = $('<div class="element-box">').append($('<div class="element-box-contents">').append(c));
                        return d.append(e), 5 != ("" + a.type).charAt(0) && 6 != ("" + a.type).charAt(0) || "edit" != b || $(c).before($('<div class="element" style="position: absolute; height: 100%; width: 100%;">')), a.css && (d.css({
                            width: 320 - parseInt(a.css.left)
                        }), d.css({
                            width: a.css.width,
                            height: a.css.height,
                            left: a.css.left,
                            top: a.css.top,
                            zIndex: a.css.zIndex,
                            bottom: a.css.bottom,
                            transform: a.css.transform
                        }), e.css(a.css).css({
                            width: "100%",
                            height: "100%",
                            transform: "none"
                        }), e.children(".element-box-contents").css({
                            width: "100%",
                            height: "100%"
                        }), 4 != ("" + a.type).charAt(0) && "p" != ("" + a.type).charAt(0) && $(c).css({
                            width: a.css.width,
                            height: a.css.height
                        })), d
                    }
                }

                function c(a) {
                    for (var b = 0; b < a.length - 1; b++)
                        for (var c = b + 1; c < a.length; c++)
                            if (parseInt(a[b].css.zIndex, 10) > parseInt(a[c].css.zIndex, 10)) {
                                var d = a[b];
                                a[b] = a[c], a[c] = d
                            }
                    for (var e = 0; e < a.length; e++) a[e].css.zIndex = e + 1 + "";
                    return a
                }

                function d(a, d, e) {
                    d = d.find(".edit_area").css({
                        overflow: "hidden"
                    });
                    var f, g = a.elements;
                    if (g)
                        for (g = c(g), f = 0; f < g.length; f++)
                            if (3 == g[f].type) {
                                var h = i[("" + g[f].type).charAt(0)](g[f]);
                                "edit" == e && j[("" + g[f].type).charAt(0)] && j[("" + g[f].type).charAt(0)](h, g[f])
                            } else {
                                var m = b(g[f], e);
                                if (!m) continue;
                                d.append(m);
                                for (var n = 0; n < l.length; n++) l[n](m, g[f]);
                                k[("" + g[f].type).charAt(0)] && k[("" + g[f].type).charAt(0)](m, g[f]), "edit" == e && j[("" + g[f].type).charAt(0)] && j[("" + g[f].type).charAt(0)](m, g[f])
                            }
                }

                function e() {
                    return j
                }

                function f() {
                    return i
                }

                function g(a) {
                    l.push(a)
                }

                function h() {
                    return l
                }
                var i = {},
                    j = {},
                    k = {},
                    l = [],
                    m = containerWidth = 320,
                    n = containerHeight = 486,
                    o = 1,
                    q = 1,
                    r = {
                        getComponents: f,
                        getEventHandlers: e,
                        addComponent: a(i),
                        bindEditEvent: a(j),
                        bindAfterRenderEvent: a(k),
                        addInterceptor: g,
                        getInterceptors: h,
                        wrapComp: b,
                        mode: "view",
                        parse: function(a) {
                            var b = $('<div class="edit_wrapper"><ul id="edit_area' + a.def.id + '" comp-droppable paste-element class="edit_area weebly-content-area weebly-area-active"></div>'),
                                c = this.mode = a.mode;
                            this.def = a.def, "view" == c && p++;
                            var e = $(a.appendTo);
                            return containerWidth = e.width(), containerHeight = e.height(), o = m / containerWidth, q = n / containerHeight, d(a.def, b.appendTo($(a.appendTo)), c)
                        }
                    };
                return r
            });
            d.addInterceptor(function(a, b) {
                function c(a, b, c) {
                    a.css("animation", b + " " + c.duration + "s ease " + c.delay + "s " + (c.countNum ? c.countNum : "")), "view" == d.mode ? (c.count && a.css("animation-iteration-count", "infinite"), a.css("animation-fill-mode", "both")) : (a.css("animation-iteration-count", "1"), a.css("animation-fill-mode", "backwards")), c.linear && a.css("animation-timing-function", "linear")
                }
                if (b.properties && b.properties.anim) {
                    var e = b.properties.anim,
                        f = $(".element-box", a),
                        g = "";
                    0 === e.type && (g = "fadeIn"), 1 === e.type && (0 === e.direction && (g = "fadeInLeft"), 1 === e.direction && (g = "fadeInDown"), 2 === e.direction && (g = "fadeInRight"), 3 === e.direction && (g = "fadeInUp")), 6 === e.type && (g = "wobble"), 5 === e.type && (g = "rubberBand"), 7 === e.type && (g = "rotateIn"), 8 === e.type && (g = "flip"), 9 === e.type && (g = "swing"), 2 === e.type && (0 === e.direction && (g = "bounceInLeft"), 1 === e.direction && (g = "bounceInDown"), 2 === e.direction && (g = "bounceInRight"), 3 === e.direction && (g = "bounceInUp")), 3 === e.type && (g = "bounceIn"), 4 === e.type && (g = "zoomIn"), 10 === e.type && (g = "fadeOut"), 11 === e.type && (g = "flipOutY"), 12 === e.type && (g = "rollIn"), 13 === e.type && (g = "lightSpeedIn"), b.properties.anim.trigger ? a.click(function() {
                        c(f, g, b.properties.anim)
                    }) : c(f, g, b.properties.anim)
                }
            }), d.addComponent("1", function(a) {
                var b = document.createElement("div");
                if (b.id = a.id, b.setAttribute("class", "element comp_title"), a.content && (b.textContent = a.content), a.css) {
                    var c, d = a.css;
                    for (c in d) b.style[c] = d[c]
                }
                if (a.properties.labels)
                    for (var e = a.properties.labels, f = 0; f < e.length; f++) $('<a class = "label_content" style = "display: inline-block;">').appendTo($(b)).html(e[f].title).css(e[f].color).css("width", 100 / e.length + "%");
                return b
            }), d.addComponent("2", function(a) {
                var b = document.createElement("div");
                return b.id = a.id, b.setAttribute("ctype", a.type), b.setAttribute("class", "element comp_paragraph editable-text"), a.content && (b.innerHTML = a.content), b.style.cursor = "default", b
            }), d.addComponent("3", function(a) {
                var b = document.getElementsByClassName("edit_area")[0];
                return "view" == d.mode && (b = document.getElementById("edit_area" + d.def.id)), b = $(b).parent()[0], a.properties.bgColor && (b.style.backgroundColor = a.properties.bgColor), a.properties.imgSrc && (b.style.backgroundImage = /^http.*/.test(a.properties.imgSrc) ? "url(" + a.properties.imgSrc + ")" : "url(" + ((a.properties.imgSrc.indexOf('syspic/') >=0) ? PREFIXSYS_FILE_HOST : USER_FILE_HOST) + "" + a.properties.imgSrc + ")", b.style.backgroundOrigin = "element content-box", b.style.backgroundSize = "cover", b.style.backgroundPosition = "50% 50%"), b
            }), d.addComponent("4", function(a) {
                var b = document.createElement("img");
                return b.id = a.id, b.setAttribute("ctype", a.type), b.setAttribute("class", "element comp_image editable-image"), b.src = /^http.*/.test(a.properties.src) ? a.properties.src : ((a.properties.src.indexOf('syspic/') >=0) ? PREFIXSYS_FILE_HOST : USER_FILE_HOST) + a.properties.src, b
            }), d.addComponent("v", function(a) {
                var b = document.createElement("a");
                return b.setAttribute("class", "element video_area"), b.id = a.id, b.setAttribute("ctype", a.type), a.properties.src && b.setAttribute("videourl", a.properties.src), b
            }), d.addComponent("5", function(a) {
                var b = document.createElement("textarea");
                return b.id = a.id, b.setAttribute("ctype", a.type), b.setAttribute("class", "element comp_input editable-text"), a.properties.required && b.setAttribute("required", a.properties.required), a.properties.placeholder && b.setAttribute("placeholder", a.properties.placeholder), b.setAttribute("name", "eq[f_" + a.id + "]"), b.style.width = "100%", b
            }), d.addComponent("p", function(a) {
                if (a.properties && a.properties.children) {
                    var b = 320,
                        d = 160,
                        e = a.css.width || b,
                        f = a.css.height || d,
                        g = $('<div id="' + a.id + '" class="slide element" ctype="' + a.type + '"></div>'),
                        h = $("<ul>").appendTo(g),
                        i = $('<div class="dot">').appendTo(g);
                    for (var j in a.properties.children) {
                        var k = c(a.properties.children[j].width, a.properties.children[j].height, e, f),
                            l = $('<img data-src="' + ((a.properties.children[j].src.indexOf('syspic/') >=0) ? PREFIXSYS_FILE_HOST : USER_FILE_HOST) + a.properties.children[j].src + '" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAANSURBVBhXYzh8+PB/AAffA0nNPuCLAAAAAElFTkSuQmCC">');
                        l.css({
                            width: k.width,
                            height: k.height
                        });
                        var m = $("<li>").css({
                            lineHeight: f + "px"
                        });
                        m.append(l), h.append(m), i.append($("<span>"))
                    }
                    return INTERVAL_OBJ[a.id] && (clearInterval(INTERVAL_OBJ[a.id]), delete INTERVAL_OBJ[a.id]), g.attr("length", a.properties.children.length).attr("autoscroll", a.properties.autoPlay).attr("interval", a.properties.interval), g.swipeSlide({
                        autoSwipe: a.properties.autoPlay,
                        continuousScroll: !0,
                        speed: a.properties.interval,
                        transitionType: "cubic-bezier(0.22, 0.69, 0.72, 0.88)",
                        lazyLoad: !0,
                        width: e
                    }, function(b, c) {
                        i.children().eq(b).addClass("cur").siblings().removeClass("cur"), c && (INTERVAL_OBJ[a.id] = c)
                    }), g.get(0)
                }
            }), d.addComponent("6", function(a) {
                var b = document.createElement("button");
                if (b.id = a.id, b.setAttribute("ctype", a.type), b.setAttribute("class", "element comp_button editable-text"), a.properties.title) {
                    var c = a.properties.title.replace(/ /g, "&nbsp;");
                    b.innerHTML = c
                }
                return b.style.width = "100%", b
            }), d.addComponent("8", function(a) {
                var b = document.createElement("a");
                if (b.id = a.id, b.setAttribute("ctype", a.type), b.setAttribute("class", "element comp_anchor editable-text"), a.properties.title) {
                    var c = a.properties.title.replace(/ /g, "&nbsp;");
                    $(b).html(c), "view" == d.mode && $(b).attr("href", "tel:" + a.properties.number)
                }
                return b.style.cursor = "default", b.style.width = "100%", b
            }), d.addComponent("7", function(a) {
                var b = document.createElement("div");
                if (b.id = "map_" + a.id, b.setAttribute("class", "element comp_map_wrapper"), a.content && (b.textContent = a.content), a.css) {
                    var c, d = a.css;
                    for (c in d) b.style[c] = d[c]
                }
                return b.style.height = "250px", b
            }), d.bindAfterRenderEvent("1", function(a, b) {
                if (a = $("div", a)[0], "view" == d.mode && 1 == b.type) {
                    var c = b.properties.labels;
                    for (key in c)! function(b) {
                        $($(a).find(".label_content")[b]).on("click", function() {
                            pageScroll(c[b])
                        })
                    }(key)
                }
            }), d.bindAfterRenderEvent("8", function(a, b) {
                a = $("a", a)[0];
                var c = {
                    id: b.sceneId,
                    num: b.properties.number
                };
                if ("view" == d.mode) {
                    var e = function() {
                        $.ajax({
                            cache: !0,
                            type: "POST",
                            url: PREFIX_S1_URL + "index-jumpgo",
                            data: $.param(c),
                            async: !1,
                            error: function() {
                                alert("Connection error")
                            },
                            success: function() {}
                        })
                    };
                    a.addEventListener("click", e)
                }
            }), d.bindAfterRenderEvent("4", function(b, c) {
                "view" == d.mode && c.properties.url && $(b).click(function() {
                    {
                        var b = c.properties.url;
                        isNaN(b) ? a.open(b) : pageScroll(b)
                    }
                })
            }), d.bindAfterRenderEvent("v", function(a, b) {
                "view" == d.mode && $(a).click(function() {
                    $(a).hide(), $("#audio_btn").hasClass("video_exist") && ($("#audio_btn").hide(), $("#media")[0].pause()), $('<div class="video_mask" id="mask_' + b.id + '"></div>').appendTo($(a).closest(".m-img")), $('<a class = "close_mask" id="close_' + b.id + '"></a>').appendTo($(a).closest(".m-img")), $(b.properties.src).appendTo($("#mask_" + b.id)).attr("style", "position: absolute;top:0; min-height: 45%; max-height: 100%; top: 20%;").attr("width", "100%").removeAttr("height"), $("#close_" + b.id).bind("click", function() {
                        $(a).show(), $("#mask_" + b.id).remove(), $("#close_" + b.id).remove(), $("#audio_btn").hasClass("video_exist") && $("#audio_btn").show(function() {
                            $(this).hasClass("off") || $("#media")[0].play()
                        })
                    })
                })
            }), d.bindAfterRenderEvent("2", function(a) {
                for (var b = $(a).find("a[data]"), c = 0; c < b.length; c++)
                    if (b[c] && "view" == d.mode) {
                        $(b[c]).css("color", "#428bca").css("cursor", "pointer");
                        var e = $(b[c]).attr("data");
                        ! function(a) {
                            $(b[c]).click(function() {
                                pageScroll(a)
                            })
                        }(e)
                    }
            }), d.bindAfterRenderEvent("6", function(a) {
                if (a = $("button", a)[0], "view" == d.mode) {
                    var b = function(b, c) {
                            var d = !0,
                                e = $(a).parents("ul"),
                                f = {};
                            $("textarea", e).each(function() {
                                if (d) {
                                    if ("required" == $(this).attr("required") && "" == $(this).val().trim()) return alert($(this).attr("placeholder") + "为必填项"), void(d = !1);
                                    if ("502" == $(this).attr("ctype")) {
                                        var a = new RegExp(/(\d{11})|^((\d{7,8})|(\d{4}|\d{3})-(\d{7,8})|(\d{4}|\d{3})-(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1})|(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1}))$/g);
                                        if (!a.test($(this).val())) return alert("手机号码格式错误"), void(d = !1)
                                    }
                                    if ("503" == $(this).attr("ctype")) {
                                        var b = new RegExp(/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/g);
                                        if (!b.test($(this).val())) return alert("邮箱格式错误"), void(d = !1)
                                    }
                                    f[$(this).attr("name")] = $(this).val()
                                }
                            }), d && $.ajax({
                                cache: !0,
                                type: "POST",
                                url: JSON_URL + "?c=scenedata&a=add&id=" + c,
                                data: $.param(f),
                                async: !1,
                                error: function() {
                                    alert("Connection error")
                                },
                                success: function() {
                                    $(b).unbind("click").click(function() {
                                        alert("请不要重复提交")
                                    }), alert("提交成功")
                                }
                            })
                        },
                        c = d.def.sceneId;
                    $(a).bind("click", function() {
                        b(this, c)
                    })
                }
            }), d.bindAfterRenderEvent("7", function(a, b) {
                var c = new BMap.Map("map_" + b.id, {
                        enableMapClick: !1
                    }),
                    d = new BMap.Point(b.properties.x, b.properties.y),
                    e = new BMap.Marker(d);
                c.addOverlay(e);
                var f = new BMap.Label(b.properties.markTitle, {
                    offset: new BMap.Size(20, -10)
                });
                e.setLabel(f), c.disableDoubleClickZoom(), c.centerAndZoom(d, 15)
            })
        }(a.eqShow);
    var p = 0,
        q = !1;
    b.module("app", ["ngRoute", "home", "sample", "main", "scenefirst", "reg", "scene", "my", "data", "error", "usercenter",
        "ui.bootstrap", "ui.grid", "ui.grid.selection", "ngSanitize", "ui.select", "services.i18nNotifications",
        "services.httpRequestTracker", "services.sample", "security", "app.upload", "templates-app", "templates-common",
        "ui.sortable", "I18N.MESSAGES", "app.directives.notification"]),
    b.module("app").config(["$routeProvider", "$locationProvider", "securityAuthorizationProvider", "uiSelectConfig",
            function(a, b, c, d) {
                d.theme = "bootstrap", a.when("/home", {
                    templateUrl: "main/main.tpl.html",
                    controller: "MainCtrl"
                }).when("/home/:id", {
                    templateUrl: "main/page.tpl.html",
                    controller: "MainCtrl"
                }).when("/page", {
                    templateUrl: "main/page.tpl.html",
                    controller: "PageCtrl"
                }).when("/reg", {
                    templateUrl: "reg/reg.tpl.html",
                    controller: "RegCtrl"
                }).when("/otherRegister", {
                    templateUrl: "common/security/register/otherRegister.tpl.html"
                }).when("/agreement", {
                    templateUrl: "reg/agreement.tpl.html"
                }).when("/about", {
                    templateUrl: "about.tpl.html"
                }).when("/error/:codeid", {
                    templateUrl: "error/error.tpl.html",
                    controller: "ErrorCtrl"
                }).when("/sample", {
                    templateUrl: "sample/sample.tpl.html",
                    controller: "SampleCtrl"
                }).when("/main", {
                    templateUrl: "main/main.tpl.html",
                    controller: "MainCtrl",
                    resolve: {
                        authenticatedUser: c.requireAuthenticatedUser
                    }
                }).when("/main/spread", {
                    templateUrl: "main/spread.tpl.html",
                    controller: "SpreadCtrl",
                    resolve: {
                        authenticatedUser: c.requireAuthenticatedUser
                    }
                }).when("/main/customer", {
                    templateUrl: "main/customer.tpl.html",
                    controller: "CustomerCtrl",
                    resolve: {
                        authenticatedUser: c.requireAuthenticatedUser
                    }
                }).when("/main/device/:deviceId", {
                    templateUrl: "main/deviceDetail.tpl.html",
                    controller: "SpreadDetailCtrl",
                    reloadOnSearch: !0,
                    resolve: {
                        authenticatedUser: c.requireAuthenticatedUser
                    }
                }).when("/main/spread/:sceneId", {
                    templateUrl: "main/spreadDetail.tpl.html",
                    controller: "SpreadDetailCtrl",
                    reloadOnSearch: !0,
                    resolve: {
                        authenticatedUser: c.requireAuthenticatedUser
                    }
                }).when("/scenefirst", {
                    templateUrl: "scene/scenefirst.tpl.html",
                    controller: "SceneFirstCtrl",
                    resolve: {
                        authenticatedUser: c.requireAuthenticatedUser
                    }
                }).when("/usercenter/:id", {
                    templateUrl: "usercenter/usercenter.tpl.html",
                    controller: "UserCenterCtrl",
                    resolve: {
                        authenticatedUser: c.requireAuthenticatedUser
                    }
                }).when("/scene", {
                    templateUrl: "scene/scene.tpl.html",
                    controller: "SceneCtrl",
                    resolve: {
                        authenticatedUser: c.requireAuthenticatedUser
                    }
                }).when("/scene/create/:sceneId", {
                    templateUrl: "scene/create.tpl.html",
                    controller: "CreateSceneCtrl",
                    reloadOnSearch: !1,
                    resolve: {
                        authenticatedUser: c.requireAuthenticatedUser
                    }
                }).when("/my/scene/:sceneId", {
                    templateUrl: "my/myscene.tpl.html",
                    controller: "MySceneCtrl",
                    reloadOnSearch: !1,
                    resolve: {
                        authenticatedUser: c.requireAuthenticatedUser
                    }
                }).when("/my/sceneSetting/:sceneId", {
                    templateUrl: "my/sceneSetting.tpl.html",
                    controller: "SceneSettingCtrl",
                    resolve: {
                        authenticatedUser: c.requireAuthenticatedUser
                    }
                }).otherwise({
                    redirectTo: "/main"
                })
            }
        ]), b.module("app").run(["security", "$rootScope",
            function(a, b) {
                b.CLIENT_CDN = CLIENT_CDN, a.requestCurrentUser()
            }
        ]), b.module("app").run(["$route", "$rootScope", "$location",
            function(a, b, c) {
                var d = c.path;
                c.path = function(e, f) {
                    if (f === !1) var g = a.current,
                        h = b.$on("$locationChangeSuccess", function() {
                            a.current = g, h()
                        });
                    return d.apply(c, [e])
                }
            }
        ]), b.module("app").controller("AppCtrl", ["SpreadService", "$window", "$scope", "$rootScope", "$location", "$modal", "security", "sceneService", "$routeParams", "$timeout", "i18nNotifications",
            function(a, b, c, d, e, f, g, h, i, j, k) {
                c.notifications = k, c.removeNotification = function(a) {
                    k.remove(a)
                }, c.weiChatCode = e.absUrl().split("&")[0].split("=")[1], c.$on("$locationChangeStart", function() {
                    if ("/home/login" != e.path() || g.currentUser ? "/home/register" != e.path() || g.currentUser || g.showRegister() : g.showLogin(), e.search().resetToken) {
                        var a = e.search().resetToken;
                        g.requestResetPassword(a)
                    }
                });
                var l = new RegExp("token"),
                    m = new RegExp("uid"),
                    n = b.location.hash;
                if (m.test(n)) {
                    var o = n.split("=");
                    c.weiboAccessToken = o[1].split("&")[0], c.weiboRemindIn = o[2].split("&")[0], c.weiboExpires = o[3].split("&")[0], c.weiboUId = o[4].split("&")[0]
                } else l.test(n) && (c.accessToken = n.split("&")[0].split("=")[1], c.expiresIn = n.split("&")[1].split("=")[1]);
                c.openLogin = function() {
                    e.path("/home/login", !1)
                }, c.openRegister = function() {
                    e.path("/home/register", !1)
                }, c.isAuthenticated = g.isAuthenticated, c.$watch(function() {
                    return g.currentUser
                }, function(b) {
                    b && (c.user = b, d.user = b, c.isEditor = g.isEditor(), d.isEditor = g.isEditor(), c.isAdvancedUser = g.isAdvancedUser(), d.isAdvancedUser = g.isAdvancedUser(), c.isVendorUser = g.isVendorUser(), d.isVendorUser = g.isVendorUser(), a.getActivityDetail("001").then(function(a) {
                        var b = a.data.obj;
                        if (b) {
                            d.sendXd = b;
                            var c = (new Date).getTime();
                            c >= b.startDate && c <= b.endDate && (d.sendXd.state = 1)
                        }
                    }))
                }, !0), c.openReg = function() {
                    f.open({
                        windowClass: "request_contain",
                        templateUrl: "usercenter/request_reg.tpl.html",
                        controller: "UsercenterrequestCtrl",
                        resolve: {}
                    }).result.then(function() {}, function() {})
                }, c.login = function() {
                    g.showLogin()
                }, c.register = function() {
                    g.showRegister()
                }, c.showToolBar = function() {
                    return e.$$path.indexOf("/scene/create") >= 0 ? !1 : !0
                }, c.showPanel = function() {
                    $("#helpPanel").stop().animate({
                        right: "0"
                    }, 500)
                }, c.hidePanel = function() {
                    $("#helpPanel").stop().animate({
                        right: "-120"
                    }, 500)
                }, c.suggestionUrl = "javascript:void(0);",
                    c.feedbackUrl = "javascript:void(0);",
                    c.qqChatUrl = "http://shang.qq.com/wpa/qunwpa?idkey=4a2d63670009360b878aa9a1e1437ef4caec132f74a0e2c4df4a686168cc73dc",
                    c.helpUrl = "javascript:void(0);",
                    c.createSkillUrl = "javascript:void(0);"
            }
        ]).filter("fixnum", function() {
            return function(a) {
                var b = a;
                return a >= 1e4 && 1e8 > a ? b = (a / 1e4).toFixed(1) + "万" : a >= 1e8 && (b = (a / 1e8).toFixed(1) + "亿"), b
            }
        }), b.module("data.associate", []), b.module("data.associate").controller("AssociateFieldCtrl", ["$scope", "dataService",
            function(a, b) {
                a.staticFileds = [{
                    id: "name",
                    name: "姓名"
                }, {
                    id: "mobile",
                    name: "手机"
                }, {
                    id: "email",
                    name: "邮箱"
                }, {
                    id: "sex",
                    name: "性别"
                }, {
                    id: "company",
                    name: "公司"
                }, {
                    id: "job",
                    name: "职位"
                }, {
                    id: "address",
                    name: "地址"
                }, {
                    id: "tel",
                    name: "电话"
                }, {
                    id: "website",
                    name: "个人网站"
                }, {
                    id: "qq",
                    name: "QQ"
                }, {
                    id: "weixin",
                    name: "微信"
                }, {
                    id: "remark",
                    name: "其它"
                }], a.associateMap = [], a.person = {}, a.selectScene = function(c) {
                    b.getSceneField(c).then(function(b) {
                        a.fields = b.data.list
                    })
                }, a.associate = function(b) {
                    for (var c = 0; c < a.associateMap.length; c++) c != b && a.associateMap[c].id == a.associateMap[b].id && (a.associateMap[c] = null)
                }, a.confirm = function() {
                    for (var c = {}, d = 0, e = a.associateMap; d < e.length; d++) e[d] && (c[e[d].id] = a.fields[d].id);
                    b.mergeSceneData(a.person.selected.ID, c).then(function() {
                        a.$close()
                    }, function() {
                        a.$dismiss()
                    })
                }, a.cancel = function() {
                    a.$dismiss()
                }, b.getPremergeScenes().then(function(b) {
                    a.PremergeScenes = b.data.list
                })
            }
        ]).filter("propsFilter", function() {
            return function(a, c) {
                var d = [];
                return b.isArray(a) ? a.forEach(function(a) {
                    for (var b = !1, e = Object.keys(c), f = 0; f < e.length; f++) {
                        var g = e[f],
                            h = c[g].toLowerCase();
                        if (-1 !== a[g].toString().toLowerCase().indexOf(h)) {
                            b = !0;
                            break
                        }
                    }
                    b && d.push(a)
                }) : d = a, d
            }
        }),
        b.module("device", ["data.associate","services.usercenter"]),
        b.module("device").controller("deviceCtrl", ["$rootScope", "$scope", "$window","$http","device",
            function(rootScope, scope, win, http, deviceInfo) {
                scope.Device = deviceInfo;
                scope.saveData = function() {
                    var data = $.param(scope.Device);

                    var c = JSON_URL + "?c=device&a=save",
                        d = http.post(c, data, {
                            withCredentials: !0,
                            headers: {
                                "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
                            }
                        });
                    return d.then(function(a) {
                        200 === a.status && scope.$dismiss();
                    }, function() {});
                    scope.$close(data);
                }
            }]),
        b.module("data", ["data.associate"]),
        b.module("data", ["services.usercenter"]),
        b.module("data").controller("editDataCtrl", ["$rootScope", "$scope", "$window", "$routeParams", "usercenterService",
            "security", "$modal", "ModalService", "$location", "dataService", "id",
            function(a, b, c, d, e, f, g, h, i, j, k) {
                b.PREFIX_FILE_HOST = PREFIX_FILE_HOST, b.PREFIX_SERVER_HOST = PREFIX_URL, b.PREFIX_CLIENT_HOST = PREFIX_HOST, b.sexOptions = [{
                    id: 0,
                    name: "请选择性别"
                }, {
                    id: 1,
                    name: "男"
                }, {
                    id: 2,
                    name: "女"
                }], b.sex = b.sexOptions[0];
                var l = {};
                b.getDataDetail = function(a) {
                    b.dataId = a, j.getDataDetail(a).then(function(a) {
                        b.dataDetail = a.data.obj, l = a.data.obj;
                        var c = b.dataDetail.email,
                            d = b.dataDetail.sex,
                            e = b.dataDetail.mobile,
                            f = b.dataDetail.tel;
                        b.formEmails = c ? c.split(",") : [""], b.formMobiles = e ? e.split(",") : [""], b.formTels = f ? f.split(",") : [""], d && (b.sex = "男" == d ? b.sexOptions[1] : b.sexOptions[2])
                    })
                }, b.getDataDetail(k), b.updateData = function(a, c) {
                    var d = a.name,
                        e = {};
                    if ("email" == d || "mobile" == d || "tel" == d) {
                        e[d] = "";
                        var f, g = [];
                        for (f = 0; f < c.length; f++) c[f] && g.push(c[f]);
                        for (f = 0; f < g.length - 1; f++) e[d] += g[f] + ",";
                        e[d] += g[f]
                    } else e[d] = b.dataDetail[d];
                    l[d] = e[d]
                }, b.updateSex = function(a) {
                    var c = {};
                    c.id = b.dataId, c.sex = 0 !== a.id ? a.name : "", l.sex = c.sex
                }, b.formEmails = [""], b.formMobiles = [""], b.formTels = [""], b.removeInputs = function(a, c, d) {
                    if (d.length > 1) {
                        if (!d[a]) return void d.splice(a, 1);
                        d.splice(a, 1), b.updateData({
                            name: c
                        }, d)
                    } else 1 === d.length && "" !== d[0] && (d[a] = "", b.updateData({
                        name: c
                    }, d))
                }, b.addInputs = function(a) {
                    a.push("")
                }, b.saveData = function() {
                    b.$close(l), j.saveData($.param(l))
                }
            }
        ]), b.module("confirm-dialog", []).controller("ConfirmDialogCtrl", ["$scope", "confirmObj",
            function(a, b) {
                a.confirmObj = b, a.ok = function() {
                    a.$close()
                }, a.cancel = function() {
                    a.$dismiss()
                }
            }
        ]), b.module("message-dialog", []).controller("MessageDialogCtrl", ["$scope", "msgObj",
            function(a, b) {
                a.msgObj = b, a.close = function() {
                    a.$close()
                }, a.cancel = function() {
                    a.$dismiss()
                }
            }
        ]), b.module("error", ["services.sample"]), b.module("error").controller("ErrorCtrl", ["$rootScope", "$http", "$scope", "$timeout", "security", "$window", "sampleService",
            function() {}
        ]), b.module("home", ["services.sample", "app.directives.addelement", "services.scene", "app.directives.qrcode", "app.directives.loading"]), b.module("home").controller("HomeCtrl", ["$rootScope", "$http", "$scope", "$timeout", "security", "$window", "sampleService", "sceneService", "$routeParams", "$route", "$location",
            function(a, b, c, d, e, f, g, h, i, j, k) {
                c.showCode = !1, c.isAuthenticated = e.isAuthenticated, c.PREFIX_FILE_HOST = PREFIX_FILE_HOST, c.PREFIX_CLIENT_HOST = PREFIX_HOST,
                    c.PREFIX_SERVER_HOST = PREFIX_URL, c.scene || (c.scene = {}), c.weiChatCode && e.weiChatLogin(c.weiChatCode).then(function(a) {
                    200 == a.data.code && k.path("main")
                }), c.typeindex = "all", c.pageSize = 9, c.pageNo = 1, c.getHomes = function(a, b, d, e) {
                    c.typeindex = a, g.getSamples(b, d, e).then(function(a) {
                        c.homes = a.data.list
                    }, function() {})
                }, c.getSceneType = function() {
                    h.getSceneType().then(function(a) {
                        c.sceneTypes = a.data.list
                    })
                }, c.getSceneType(), c.getHomes("all", null, 1, 9);
                if (c.accessToken && c.expiresIn) {
                    var l = "https://graph.qq.com/oauth2.0/me?access_token=" + c.accessToken;
                    $.ajax({
                        type: "get",
                        url: l,
                        dataType: "jsonp",
                        jsonp: "jsoncallback",
                        jsonpCallback: "callback",
                        xhrFields: {
                            withCredentials: !0
                        },
                        success: function(a) {
                            c.openId = a.openid, c.appId = a.client_id;
                            var b = {
                                email: "",
                                password: "",
                                openId: c.openId,
                                accessToken: c.accessToken,
                                type: "qq",
                                expires: c.expiresIn
                            };
                            e.thirdPartLogin(b)
                        }
                    })
                }
                if (c.weiboAccessToken && c.weiboRemindIn && c.weiboExpires && c.weiboUId) {
                    var m = {
                        email: "",
                        password: "",
                        type: "weibo",
                        openId: c.weiboUId,
                        accessToken: c.weiboAccessToken,
                        expires: c.weiboExpires
                    };
                    e.thirdPartLogin(m)
                }
                c.getBannerStyle = function() {
                    return {
                        width: 255 * c.imgArr.length + "px"
                    }
                }, c.goLeft = function() {
                    $(".img_box").is(":animated") || $(".img_box").css("left").split("px")[0] >= 0 || $(".img_box").animate({
                        left: "+=255"
                    }, 1e3)
                }, c.goRight = function() {
                    $(".img_box").is(":animated") || parseInt($(".img_box").css("left").split("px")[0], 10) <= -($(".img_box").width() - 20 - 1e3) || $(".img_box").animate({
                        left: "-=255"
                    }, 1e3)
                }, d(function() {
                    $(".banner1").animate({
                        right: "0px"
                    }, 200)
                }, 700), d(function() {
                    $(".banner2").animate({
                        right: "0px"
                    }, 200)
                }, 1e3), d(function() {
                    $(".banner3").animate({
                        right: "0px"
                    }, 200, function() {
                        $(".banner_left").fadeIn(800)
                    })
                }, 1300), c.load2 = function() {
                    $("#eq_main").scroll(function() {
                        s = $("#eq_main").scrollTop(), s > 100 ? $(".scroll").css("display", "block") : $(".scroll").css("display", "none")
                    })
                }, c.getSamplesPV = function() {
                    g.getSamplesPV().then(function(a) {
                        c.SamplesPVs = a.data, c.dayTop = c.SamplesPVs.obj.dayTop, c.monthTop = c.SamplesPVs.obj.monthTop, c.weekTop = c.SamplesPVs.obj.weekTop, c.page = "month"
                    }, function() {})
                }
            }
        ]), b.module("main.data", ["app.directives.dataDraggable"]), b.module("main.data").controller("CustomerCtrl", ["$scope", "$route", "$location", "dataService", "$modal", "ModalService",
            function(a, b, c, d, e, f) {
                function g(b) {
                    b || (b = 1), d.getAllData(b).then(function(b) {
                        a.customerDatas = b.data.list, a.totalItems = b.data.map.count, a.currentPage = b.data.map.pageNo, a.toPage = ""
                    })
                }
                a.PREFIX_URL = PREFIX_URL, a.isActive = "customer", a.select = 0, a.staticFileds = [{
                    id: "name",
                    name: "姓名"
                }, {
                    id: "mobile",
                    name: "手机"
                }, {
                    id: "email",
                    name: "邮箱"
                }, {
                    id: "sex",
                    name: "性别"
                }, {
                    id: "company",
                    name: "公司"
                }, {
                    id: "job",
                    name: "职位"
                }, {
                    id: "address",
                    name: "地址"
                }, {
                    id: "tel",
                    name: "电话"
                }, {
                    id: "website",
                    name: "个人网站"
                }, {
                    id: "qq",
                    name: "QQ"
                }, {
                    id: "weixin",
                    name: "微信"
                }, {
                    id: "remark",
                    name: "其它"
                }], a.selectScene = function(b, c) {
                    a.selectedSceneId = b, d.getSceneField(b).then(function(b) {
                        a.fields = b.data.list, a.select = c, $(".list_attribute").html("拖拽到此处")
                    })
                }, a.clickScene = function() {
                    c.path("main")
                }, a.clickSpread = function() {
                    c.path("main/spread")
                }, a.clickCustomer = function() {
                    c.path("main/customer")
                }, a.editCustomer = function(b) {
                    a.getDataDetail(b.id), a.editData = !0
                }, a.removeCustomer = function(b) {
                    f.openConfirmDialog({
                        msg: "确定删除此条数据?"
                    }, function() {
                        d.deleteDataById(b.id).then(function() {
                            g(1 === a.customerDatas.length && a.currentPage > 1 ? a.currentPage - 1 : a.currentPage), i()
                        })
                    })
                }, a.addColor = function(b) {
                    a.trIndex = b
                }, a.removeColor = function() {
                    a.trIndex = -1
                }, a.totalItems = 0, a.currentPage = 0, a.toPage = "", a.pageChanged = function(b) {
                    return 1 > b || b > a.totalItems / 10 + 1 ? void alert("此页超出范围") : void g(b)
                }, a.editCustom = function(b, c) {
                    e.open({
                        windowClass: "addCustom",
                        templateUrl: "data/editData.tpl.html",
                        controller: "editDataCtrl",
                        resolve: {
                            id: function() {
                                return b.id
                            }
                        }
                    }).result.then(function(b) {
                        a.customerDatas[c].name = b.name, a.customerDatas[c].mobile = b.mobile
                    }, function() {})
                };
                var h = function() {
                        d.getProspectDataAccount().then(function(b) {
                            a.prospectDataAccount = b.data.obj
                        })
                    },
                    i = function() {
                        d.getAllDataCount().then(function(b) {
                            a.allDataCount = b.data.obj
                        })
                    };
                a.importDatas = function() {
                    d.getPremergeScenes().then(function(b) {
                        a.importDatas = b.data.list, b.data.list.length > 0 && a.selectScene(b.data.list[0].ID, 0)
                    })
                }, a.associateData = {};
                var j = !0;
                a.confirm = function() {
                    j ? jQuery.isEmptyObject(a.associateData, {}) ? (alert("请导入数据！"), j = !0) : (d.mergeSceneData(a.selectedSceneId, a.associateData).then(function() {
                        alert("你已成功导入客户！"), b.reload()
                    }, function() {}), j = !1) : alert("请不要重复提交！")
                }, a.importDatas(), h(), i(), g(0)
            }
        ]),
    b.module("main", ["services.mine", "services.data", "app.directives.pageTplTypes",
        "app.directives.addelement", "main.spread", "main.data", "main.spread.detail",
        "services.usercenter", "main.userGuide", "app.directives.qrcode", "services.i18nNotifications","device"]),
    b.module("main").controller("MainCtrl", ["$rootScope", "$scope", "$location", "security", "MineService",
        "dataService", "sceneService", "ModalService", "$modal", "usercenterService", "i18nNotifications","$routeParams",
            function(a, b, c, d, e, f, g, h, i, j, k,routePara) {
                b.PREFIX_URL = PREFIX_URL, b.PREFIX_CLIENT_HOST = PREFIX_HOST, b.client_cdn = CLIENT_CDN, b.scene = {
                    type: {}
                }, b.pageSize = 12, b.showCloseStatus = [], b.showOpenStatus = [], routePara.id==1?(b.isActive = "page",b.showPage=true,b.pageSize=15):b.isActive = "main",
                    b.editScene = function(a) {
                    c.path("scene/create/" + a).search("pageId", 1)
                }, b.openScene = function(a, b) {
                    b ? g.openScene(a.id).then(function() {
                        a.status = 1, g.publishScene(a.id).then(function() {})
                    }) : g.closeScene(a.id).then(function() {
                        a.status = 2
                    })
                }, b.addColor = function(a) {
                    b.trIndex = a
                }, b.removeColor = function() {
                    b.trIndex = -1
                }, b.sceneSettings = function(a) {
                    c.path("my/sceneSetting/" + a)
                }, b.clickScene = function() {
                    c.path("main")
                }, b.clickSpread = function() {
                    c.path("main/spread")
                }, b.clickCustomer = function() {
                    c.path("main/customer")
                }, b.register = d.getRegisterInfo(), b.logout = function() {
                    d.logout()
                }, b.copyScene = function(a) {
                    h.openConfirmDialog({
                        msg: "确定复制此场景?"
                    }, function() {
                        g.copySceneById(a).then(function(a) {
							if(a.data.code == 1006){
								alert("您的"+a.data.msg+"次创建场景次数已经用完，请联系管理员！")
								return false;
							}
                            c.path("scene/create/" + a.data.obj).search("pageId", 1)
                        })
                    })
                }, b.deleteScene = function(a) {
                    h.openConfirmDialog({
                        msg: "确定删除此场景?"
                    }, function() {
                        g.deleteSceneById(a).then(function() {
                            b.getMyScenes()
                        })
                    })
                }, b.getStyle = function(a) {
                    return {
                        "background-image": "url(" + ((a.indexOf('syspic/') >= 0) ? PREFIXSYS_FILE_HOST : USER_FILE_HOST) + a + ")"
                    }
                }, b.showPageView = function(a) {
                    b.showPage = a;
                    a?b.scene.type.value='':b.scene.device.id='';
                    b.getMyScenes();
                }, b.editDevice = function(deviceInfo) {
                    t = i.open({
                        windowClass: "login-container",
                        keyboard: !1,
                        templateUrl: "main/device.tpl.html",
                        controller: "deviceCtrl",
                        resolve: {
                            device: function() {
                                return deviceInfo
                            }
                        }
                    }), t.result.then(function() {
                        t = null
                    }, k)
                }, b.getMyScenes = function(a,deviceId) {
                    e.getMyScenes(b.scene.type ? b.scene.type.value : "0", a, b.pageSize, deviceId, b.showPage).then(function(a) {
                        b.devices= a.data.map.devices;
                        b.deviceInfo= a.data.obj;
                        a.data.list && a.data.list.length > 0 ? (b.myScenes = a.data.list,
                                                                 b.totalItems = a.data.map.count, 
                                                                 b.currentPage = a.data.map.pageNo, 
                                                                 b.allPageCount = a.data.map.count,
                                                                 b.allDeviceCount = a.data.map.deviceCount,
                                                                 b.toPage = "") : (b.myScenes = [], b.allPageCount = 0);
                        //if(a.data.map && !b.scene.device) b.scene.device=b.scene.devices[0];//a.data.map.devices[0];
                                                                                               })
                }, b.pageChanged = function(a) {
                    return 1 > a || a > b.totalItems / 10 + 1 ? void alert("此页超出范围") : void b.getMyScenes(a)
                }, b.getTdStyle = function(a) {
                    var b = $(".header_table td:eq(" + a + ")").outerWidth();
                    return {
                        width: b + "px",
                        maxWidth: b + "px"
                    }
                };
                var l = function() {
                        f.getAllDataCount().then(function(a) {
                            b.allDataCount = a.data.obj
                        })
                    },
                    m = function() {
                        f.getAllSceneDataCount().then(function(a) {
                            b.allSceneDataCount = a.data.obj
                        })
                    };
                m(), b.getMyScenes(), l(), g.getSceneType().then(function(a) {
                    b.scene.types = a.data.list;
                    b.scene.devices= a.data.devices;
                }), b.dataDetail = {};
                var n = function() {
                    f.getProspectDataAccount().then(function(a) {
                        b.prospectDataAccount = a.data.obj
                    })
                };
                n();
                var o = function() {
                    f.getAllPageView().then(function(a) {
                        b.allPageView = a.data.obj
                    })
                };
                o(), b.showDetail = function(a) {
                    c.path("my/scene/" + a)
                }, b.publishScene = function(a, b) {
                    b && b.stopPropagation(), g.publishScene(a.id).then(function(b) {
                        b.data.success && (a.publishTime = (new Date).getTime(), k.pushForCurrentRoute("scene.publish.success", "notify.success"))
                    })
                }, b.totalItems = 0, b.currentPage = 0, b.toPage = ""
            }
        ]),
        b.module("scenefirst", ["services.mine", "services.data", "app.directives.pageTplTypes", "app.directives.addelement", "main.spread", "main.data", "main.spread.detail", "services.usercenter", "main.userGuide", "app.directives.qrcode", "services.i18nNotifications"]),
        b.module("scenefirst").controller("SceneFirstCtrl", ["$rootScope", "$scope", "$location", "security", "MineService", "dataService", "sceneService", "ModalService", "$modal", "usercenterService", "i18nNotifications",
            function(a, b, c, d, e, f, g, h, i, j, k) {
                b.PREFIX_URL = PREFIX_URL, b.PREFIX_CLIENT_HOST = PREFIX_HOST, b.client_cdn = CLIENT_CDN, b.scene = {
                    type: {}
                }, b.pageSize = 12, b.showCloseStatus = [], b.showOpenStatus = [], b.isActive = "scenefirst", b.editScene = function(a) {
                    c.path("scene/create/" + a).search("pageId", 1)
                }, b.openScene = function(a, b) {
                    b ? g.openScene(a.id).then(function() {
                        a.status = 1, g.publishScene(a.id).then(function() {})
                    }) : g.closeScene(a.id).then(function() {
                        a.status = 2
                    })
                }, b.addColor = function(a) {
                    b.trIndex = a
                }, b.removeColor = function() {
                    b.trIndex = -1
                }, b.sceneSettings = function(a) {
                    c.path("my/sceneSetting/" + a)
                }, b.clickScene = function() {
                    c.path("main")
                }, b.clickSpread = function() {
                    c.path("main/spread")
                }, b.clickCustomer = function() {
                    c.path("main/customer")
                }, b.register = d.getRegisterInfo(), b.logout = function() {
                    d.logout()
                }, b.copyScene = function(a) {
                    h.openConfirmDialog({
                        msg: "确定复制此场景?"
                    }, function() {
                        g.copySceneById(a).then(function(a) {
                            if(a.data.code == 1006){
                                alert("您的"+a.data.msg+"次创建场景次数已经用完，请联系管理员！")
                                return false;
                            }
                            c.path("scene/create/" + a.data.obj).search("pageId", 1)
                        })
                    })
                }, b.deleteScene = function(a) {
                    h.openConfirmDialog({
                        msg: "确定删除此场景?"
                    }, function() {
                        g.deleteSceneById(a).then(function() {
                            b.getMyScenes()
                        })
                    })
                }, b.getStyle = function(a) {
                    return {
                        "background-image": "url(" + ((a.indexOf('syspic/') >= 0) ? PREFIXSYS_FILE_HOST : USER_FILE_HOST) + a + ")"
                    }
                }, b.showPageView = function(a) {
                    b.showPage = a;
                    a?b.scene.type.value='':b.scene.device.id='';
                    b.getMyScenes();
                }, b.getMyScenes = function(a,deviceId) {
                    e.getMyScenes(b.scene.type ? b.scene.type.value : "0", a, b.pageSize, deviceId, b.showPage).then(function(a) {
                        b.devices= a.data.map.devices;
                        b.deviceInfo= a.data.obj;
                        a.data.list && a.data.list.length > 0 ? (b.myScenes = a.data.list,
                            b.totalItems = a.data.map.count,
                            b.currentPage = a.data.map.pageNo,
                            b.allPageCount = a.data.map.count,
                            b.allDeviceCount = a.data.map.deviceCount,
                            b.toPage = "") : (b.myScenes = [], b.allPageCount = 0);
                        //if(a.data.map && !b.scene.device) b.scene.device=b.scene.devices[0];//a.data.map.devices[0];
                    })
                }, b.pageChanged = function(a) {
                    return 1 > a || a > b.totalItems / 10 + 1 ? void alert("此页超出范围") : void b.getMyScenes(a)
                }, b.getTdStyle = function(a) {
                    var b = $(".header_table td:eq(" + a + ")").outerWidth();
                    return {
                        width: b + "px",
                        maxWidth: b + "px"
                    }
                };
                var l = function() {
                        f.getAllDataCount().then(function(a) {
                            b.allDataCount = a.data.obj
                        })
                    },
                    m = function() {
                        f.getAllSceneDataCount().then(function(a) {
                            b.allSceneDataCount = a.data.obj
                        })
                    };
                m(), b.getMyScenes(), l(), g.getSceneType().then(function(a) {
                    b.scene.types = a.data.list;
                    b.scene.devices= a.data.devices;
                }), b.dataDetail = {};
                var n = function() {
                    f.getProspectDataAccount().then(function(a) {
                        b.prospectDataAccount = a.data.obj
                    })
                };
                n();
                var o = function() {
                    f.getAllPageView().then(function(a) {
                        b.allPageView = a.data.obj
                    })
                };
                o(), b.showDetail = function(a) {
                    c.path("my/scene/" + a)
                }, b.publishScene = function(a, b) {
                    b && b.stopPropagation(), g.publishScene(a.id).then(function(b) {
                        b.data.success && (a.publishTime = (new Date).getTime(), k.pushForCurrentRoute("scene.publish.success", "notify.success"))
                    })
                }, b.totalItems = 0, b.currentPage = 0, b.toPage = ""
            }
        ]),
        b.module("main.spread", ["app.directives.pieChart", "app.directives.numChangeAnim"]),
        b.module("main.spread").controller("SpreadCtrl", ["$scope", "$location", "MineService", "dataService",
            function(a, b, c, d) {
                a.isActive = "spread", a.clickScene = function() {
                    b.path("main")
                }, a.clickSpread = function() {
                    b.path("main/spread")
                }, a.clickCustomer = function() {
                    b.path("main/customer")
                }, a.addColor = function(b) {
                    a.trIndex = b
                }, a.removeColor = function() {
                    a.trIndex = -1
                }, a.getMyScenes = function(d) {
                    c.getMyScenes(null, d, 10, null).then(function(c) {
                        c.data.list && c.data.list.length > 0 && (a.allPageCount = c.data.map.count, (!c.data.list || c.data.list.length <= 0) && b.path("scene"), a.spreadDatas = c.data.list, a.totalItems = c.data.map.count, a.currentPage = c.data.map.pageNo, a.toPage = "")
                    })
                }, a.pageChanged = function(b) {
                    return 1 > b || b > a.totalItems / 10 + 1 ? void alert("此页超出范围") : void a.getMyScenes(b)
                }, a.viewDetail = function(a) {
                    b.path("/main/spread/" + a.id)
                }, d.getOpenCount().then(function(b) {
                    a.openCount = b.data.obj
                }), d.getAllPageView().then(function(b) {
                    a.allPageView = b.data.obj, a.allPageViewData = [{
                        value: b.data.obj,
                        color: "#08a1ef",
                        highlight: "#78cbf5",
                        label: "场景展示"
                    }], d.getAllSceneDataCount().then(function(b) {
                        a.allSceneDataCount = b.data.obj, a.dataRatio = 0 == a.allPageView ? 0 : 100 * (a.allSceneDataCount / a.allPageView).toFixed(2), a.allSceneDataCountData = [{
                            value: a.allSceneDataCount,
                            color: "#9ad64b",
                            highlight: "#c3f286",
                            label: "收集数据"
                        }], a.dataConversionRateData = [{
                            value: (a.allSceneDataCount / a.allPageView).toFixed(2),
                            color: "#68dcc7",
                            highlight: "#92f5e3",
                            label: "转化率"
                        }]
                    })
                }), a.totalItems = 0, a.currentPage = 0, a.toPage = "", a.getMyScenes()
            }
        ]),
        b.module("main.spread.detail", ["services.spread", "app.directives.lineChart", "app.directives.pieChart", "app.directives.numChangeAnim"]),
        b.module("main.spread.detail").controller("SpreadDetailCtrl", ["$scope", "$location", "$routeParams", "sceneService", "SpreadService",
            function(a, b, c, d, e) {
                a.PREFIX_FILE_HOST = PREFIX_FILE_HOST, a.PREFIX_CLIENT_HOST = PREFIX_HOST, a.PREFIX_SERVER_HOST = PREFIX_URL;
                var f = c.sceneId;
                if(!f) f = c.deviceId;
                a.spreadViewGridOptions = {
                    headerRowHeight: 50,
                    rowHeight: 50,
                    enableScrollbars: !1,
                    enableColumnMenu: !1,
                    disableColumnMenu: !0
                }, a.spreadViewGridOptions.columnDefs = [{
                    name: "ftime",
                    displayName: "统计时间"
                }, {
                    name: "click_pv",
                    displayName: "点击摇周边消息的次数"
                }, {
                    name: "click_uv",
                    displayName: "点击摇周边消息的人数"
                }, {
                    name: "shake_pv",
                    displayName: "摇周边的次数"
                }, {
                    name: "shake_uv",
                    displayName: "摇周边的人数"
                }], a.spreadMobileGridOptions = {
                    headerRowHeight: 50,
                    rowHeight: 50,
                    enableScrollbars: !1,
                    enableColumnMenu: !1,
                    disableColumnMenu: !0
                }, a.spreadMobileGridOptions.columnDefs = [{
                    name: "STAT_DATE",
                    displayName: "统计时间"
                }, {
                    name: "S_WX_TIMELINE",
                    displayName: "朋友圈"
                }, {
                    name: "S_WX_GROUP",
                    displayName: "微信群"
                }, {
                    name: "S_WX_SINGLE",
                    displayName: "微信朋友"
                }], a.spreadClickGridOptions = {
                    headerRowHeight: 50,
                    rowHeight: 50,
                    enableScrollbars: !1,
                    enableColumnMenu: !1,
                    disableColumnMenu: !0
                }, a.spreadClickGridOptions.columnDefs = [{
                    name: "STAT_DATE",
                    displayName: "统计时间"
                }, {
                    name: "LINK",
                    displayName: "链接点击"
                }, {
                    name: "TEL",
                    displayName: "电话直拨点击"
                }];
                var g = function() {
                        d.getSceneDetail(f).then(function(b) {
                            a.scene = b.data.obj,
                            a.scene && (a.url = VIEW_URL + "v-" + a.scene.code),
                            a.getLast7dayStats()
                        }, function() {})
                    },
                    h = function(b, c) {
                        e.getDataBySceneId(f, b, c, 30, 0).then(function(b) {
                            a.pageView = 0,
                            a.stats = b.data.list,
                            a.spreadViewGridOptions.data = a.stats,
                            a.spreadMobileGridOptions.data = a.stats,
                            a.spreadClickGridOptions.data = a.stats,
                                a.viewLineChartOptions = {scaleShowLabels:true},
                                a.viewLineChartData = {
                                labels: [],
                                datasets: [{
                                    label: "click_pv",
                                    fillColor: "rgba(220,220,220,0.25)",
                                    strokeColor: "rgba(220,220,220,1)",
                                    pointColor: "rgba(220,220,220,1)",
                                    pointStrokeColor: "#fff",
                                    pointHighlightFill: "#fff",
                                    pointHighlightStroke: "rgba(220,220,220,1)",
                                    data: []
                                },
                                {
                                    label: "click_uv",
                                    fillColor: "rgba(151,187,205,0.25)",
                                    strokeColor: "rgba(151,187,205,1)",
                                    ///pointColor: "rgba(220,220,220,1)",
                                    //pointStrokeColor: "#fff",
                                    //pointHighlightFill: "#fff",
                                    //pointHighlightStroke: "rgba(220,220,220,1)",
                                    data: []
                                },
                                {
                                    label: "3",
                                    fillColor: "rgba(51,87,205,0.25)",
                                    strokeColor: "rgba(51,87,205,1)",
                                    data: []
                                },
                                {
                                    label: "4",
                                    fillColor: "rgba(15,187,20,0.25)",
                                    strokeColor: "rgba(15,187,20,1)",
                                    data: []
                                }]
                            }, a.dataLineChartData = {
                                labels: [],
                                datasets: [{
                                    label: "6",
                                    fillColor: "rgba(220,220,220,0.2)",
                                    strokeColor: "rgba(220,220,220,1)",
                                    pointColor: "rgba(220,220,220,1)",
                                    pointStrokeColor: "#fff",
                                    pointHighlightFill: "#fff",
                                    pointHighlightStroke: "rgba(220,220,220,1)",
                                    data: []
                                }]
                            };
                            var c = 0;
                            cntTimeline = 0, cntWeixin = 0, cntWeixinGroup = 0, cntOther = 0;
                            for (var d = 0; d < a.stats.length; d++)
                                a.viewLineChartData.labels.push(a.stats[d].ftime),
                                    a.viewLineChartData.datasets[0].data.push(a.stats[d].click_pv),
                                    a.viewLineChartData.datasets[1].data.push(a.stats[d].click_uv),
                                    a.viewLineChartData.datasets[2].data.push(a.stats[d].shake_pv),
                                    a.viewLineChartData.datasets[3].data.push(a.stats[d].shake_uv),
                                a.dataLineChartData.labels.push(a.stats[d].ftime),
                                a.dataLineChartData.datasets[0].data.push(a.stats[d].click_pv),
                                a.pageView += a.stats[d].shake_pv,
                                c += a.stats[d].S_MOBILE,
                                cntTimeline += a.stats[d].S_WX_TIMELINE,
                                cntWeixin += a.stats[d].S_WX_SINGLE,
                                cntWeixinGroup += a.stats[d].S_WX_GROUP;
                            a.viewLineChartData.labels && 1 == a.viewLineChartData.labels.length && (a.viewLineChartData.labels.unshift("更早"),
                            a.viewLineChartData.datasets[0].data.unshift(0)),
                            a.dataLineChartData.labels && 1 == a.dataLineChartData.labels.length && (a.dataLineChartData.labels.unshift("更早"),
                                a.dataLineChartData.datasets[0].data.unshift(0)),
                                cntOther = c - cntTimeline - cntWeixin - cntWeixinGroup,
                                a.timelineData = cntTimeline,
                                a.weixinData = cntWeixin,
                                a.weixinGroupData = cntWeixinGroup,
                                $(".myGrid1").height(50 * (a.stats.length + 1) + 1),
                                $(".myGrid1 .ui-grid-viewport").height(50 * a.stats.length + 1)
                        }, function() {})
                    },
                    i = function(a) {
                        var b = new Date;
                        return b.setDate(b.getDate() + a), b.setHours(0), b.setMinutes(0), b.setSeconds(0), b.setMilliseconds(0), b.getTime()
                    },formatDate = function(date){
                        var d = new Date(date*1000);
                        var str = ''+d.getFullYear()+d.getMonth()+d.getDate();
                        return str;
                    };
                a.getAllStats = function() {
                    h()
                }, a.getLastdayStats = function() {
                    h(i(-1), i(0))
                }, a.getLast7dayStats = function() {
                    h(i(-6), i(1))
                }, a.getLast30dayStats = function() {
                    h(i(-29), i(0))
                }, a.clickScene = function() {
                    b.path("main")
                }, a.clickSpread = function() {
                    b.path("main/spread")
                }, a.clickCustomer = function() {
                    b.path("main/customer")
                }, g()
            }
        ]),
        function() {
            b.module("main.userGuide", []).controller("userGuideCtrl", ["$rootScope", "$scope",
                function(b, c) {
                    if (a.localStorage) {
                        var d = JSON.parse(localStorage.getItem("loginInfo"));
                        d && d[b.user.id] ? c.firstLogin = !1 : (c.firstLogin = !0, d = d || {}, d[b.user.id] = 1, localStorage.setItem("loginInfo", JSON.stringify(d)))
                    }
                }
            ])
        }(), b.module("my", ["my.scene", "my.scenesetting"]), b.module("my.scene", ["services.scene", "services.mine", "services.data", "scene.create.console", "app.directives.addelement", "services.usercenter", "app.directives.qrcode"]), b.module("my.scene").controller("MySceneCtrl", ["$anchorScroll", "$route", "$location", "$rootScope", "$window", "$scope", "$routeParams", "sceneService", "MineService", "dataService", "$sce", "$modal", "usercenterService", "security", "pageTplService",
            function(b, c, d, e, f, g, h, i, j, k, l, m, n, o) {
                function p(a, b, c) {
                    k.getDataBySceneId(a, b, c).then(function(a) {
                        g.dataHeader = a.data.list.shift(), g.dataList = a.data.list, g.totalItems = a.data.map.count, g.currentPage = a.data.map.pageNo
                    })
                }
                g.loading = !1, g.url = "", g.sceneId = h.sceneId, g.isVendorUser = e.isVendorUser, g.isAllowToAccessLastPageSetting = o.isAllowToAccess(2);
                var q = 0;
                g.PREFIX_FILE_HOST = PREFIX_FILE_HOST, g.PREFIX_URL = PREFIX_URL, g.alwaysOpen = !0;
                if (g.scene || (g.scene = {}), document.getElementById("sharescript")) {
                    $("#sharescript").remove();
                    var r = document.getElementsByTagName("head")[0],
                        s = document.createElement("script");
                    s.id = "sharescript", s.src = "http://bdimg.share.baidu.com/static/api/js/share.js?cdnversion=" + ~(-new Date / 36e5), r.appendChild(s)
                } else {
                    var r = document.getElementsByTagName("head")[0],
                        s = document.createElement("script");
                    s.id = "sharescript", s.src = "http://bdimg.share.baidu.com/static/api/js/share.js?cdnversion=" + ~(-new Date / 36e5), r.appendChild(s)
                }
                g.getSceneDetail = function() {
                    i.getSceneDetail(g.sceneId).then(function(b) {
                        g.scene = b.data.obj, g.scene.applyPromotion = "" + g.scene.applyPromotion, g.scene.applyTemplate = "" + g.scene.applyTemplate, g.code = PREFIX_URL + "eqs/qrcode/" + g.scene.code + ".png", g.url = VIEW_URL + "v-" + g.scene.code, g.customUrl = l.trustAsResourceUrl(VIEW_URL + "v-" + g.scene.id + "?preview=preview"), g.scene.image.isAdvancedUser = e.isAdvancedUser || e.isVendorUser ? !0 : !1, a._bd_share_config = {
                            common: {
                                bdText: g.scene.name,
                                bdDesc: g.scene.name,
                                bdUrl: g.url,
                                bdSign: "on",
                                bdSnsKey: {}
                            },
                            share: [{
                                bdSize: 32
                            }],
                            slide: [{
                                bdImg: 0,
                                bdPos: "right",
                                bdTop: 100
                            }]
                        }, q = g.scene.pageCount, 2 == g.scene.status ? (g.showOpenSceneBtn = !0, g.showCloseSceneBtn = !1) : 1 == g.scene.status && (g.showOpenSceneBtn = !1, g.showCloseSceneBtn = !0)
                    })
                }, g.getSceneDetail(), g.publishScene = function(a) {
                    g.scene.publishTime && g.scene.publishTime >= g.scene.updateTime ? alert("场景已发布！") : i.publishScene(a).then(function(a) {
                        a.data.success && alert("场景发布成功")
                    })
                }, g.closeScene = function(a) {
                    i.closeScene(a).then(function() {
                        g.showOpenSceneBtn = !0, g.showCloseSceneBtn = !1
                    })
                }, g.openScene = function(a) {
                    i.openScene(a).then(function() {
                        g.showOpenSceneBtn = !1, g.showCloseSceneBtn = !0
                    })
                }, g.totalItems = 0, g.currentPage = 1, g.toPage = "", g.pageChanged = function(a) {
                    return 1 > a || a > g.totalItems / 10 + 1 ? void alert("此页超出范围") : void p(g.sceneId, a, 10)
                }, g.getTdStyle = function(a) {
                    var b = $(".header_table td:eq(" + a + ")").outerWidth();
                    return {
                        width: b + "px",
                        maxWidth: b + "px"
                    }
                }, p(g.sceneId, g.currentPage, 10);
                var t = new ZeroClipboard(document.getElementById("copy-button"), {
                    moviePath: CLIENT_CDN+"images/ZeroClipboard.swf"
                });
                t.on("dataRequested", function(a) {
                    a.setText(g.url), setTimeout(function() {
                        alert("复制成功")
                    }, 500)
                }), g.goData = function() {
                    d.hash("collectData"), b()
                }
            }
        ]), b.module("my.scenesetting", ["services.scene", "services.mine", "services.data", "scene.create.console", "app.directives.addelement", "services.usercenter"]), b.module("my.scenesetting").controller("SceneSettingCtrl", ["$route", "$location", "$rootScope", "$window", "$scope", "$routeParams", "sceneService", "MineService", "dataService", "$sce", "$modal", "usercenterService", "security", "pageTplService",
            function(a, c, d, e, f, g, h, j, k, l, m, n, o, p) {
                f.loading = !1, f.url = "", f.sceneId = g.sceneId, f.isVendorUser = d.isVendorUser, f.isAllowToAccessLastPageSetting = o.isAllowToAccess(2);
                var q = 0;
                f.PREFIX_FILE_HOST = PREFIX_FILE_HOST, f.alwaysOpen = !0;
                var r;
                f.scene || (f.scene = {}), f.switchOpen = function() {
                    f.alwaysOpen && (f.startDate = null, f.endDate = null)
                }, f.openImageModal = function() {
                    m.open({
                        windowClass: "img_console console",
                        templateUrl: "scene/console/bg.tpl.html",
                        controller: "BgConsoleCtrl",
                        resolve: {
                            obj: function() {
                                return {
                                    fileType: 1,
                                    elemDef: null,
                                    coverImage: "coverImage"
                                }
                            }
                        }
                    }).result.then(function(a) {
                        f.newCoverImage = a, f.newCoverImage.tmbPath = a.data, f.newCoverImage.path = a.data, f.coverImages.unshift(f.newCoverImage), f.scene.image.imgSrc = f.newCoverImage.path
                    }, function() {})
                }, f.chooseCover = function(a) {
                    f.scene.image.imgSrc = a.path
                }, f.openmin = function(a) {
                    a.preventDefault(), a.stopPropagation(), f.openedmax = !1, f.openedmin = !0, f.minDateStart = new Date, f.maxDateStart = f.endDate ? new Date(new Date(f.endDate).getTime() - 864e5) : null
                }, f.openmax = function(a) {
                    a.preventDefault(), a.stopPropagation(), f.openedmin = !1, f.openedmax = !0, f.minDateEnd = f.startDate ? new Date(new Date(f.startDate).getTime() + 864e5) : new Date
                }, f.dateOptions = {
                    formatYear: "yy",
                    startingDay: 1
                }, f.formats = ["dd-MMMM-yyyy", "yyyy/MM/dd", "dd.MM.yyyy", "shortDate"], f.format = f.formats[1], f.saveSceneSettings = function() {
                    if (f.startDate && !f.endDate) return void(f.invalidText = "请选择结束时间");
                    if (f.endDate && !f.startDate) return void(f.invalidText = "请选择结束时间");
                    if (f.scene.description && f.scene.description.trim().length > 30) return void(f.invalidText = "场景描述不能超过30个字");
                    if (!f.scene.name || !f.scene.name.trim()) return void(f.invalidText = "请填写场景名称");
                    var a = i(f.scene.name.trim());
                    return a > 48 ? void alert("场景名称不能超过48个字符或24个汉字") : (f.startDate && f.endDate && (f.scene.startDate = f.startDate.getTime(), f.scene.endDate = f.endDate.getTime()), f.startDate && f.endDate || (f.scene.startDate = null, f.scene.endDate = null), f.scene.type = f.scene.type.value, f.scene.pageMode = f.scene.pageMode.id, void h.saveSceneSettings(f.scene).then(function() {
                        c.path("my/scene/" + f.sceneId).search({}), d.showSetScenePanel = !1
                    }, function() {}))
                }, f.getSceneDetail = function() {
                    h.getSceneDetail(f.sceneId).then(function(a) {
                        f.scene = a.data.obj, f.scene.applyPromotion = "" + f.scene.applyPromotion, f.scene.applyTemplate = "" + f.scene.applyTemplate, 2 == a.data.obj.pageMode && (a.data.obj.pageMode = 0), b.forEach(f.pagemodes, function(b) {
                            a.data.obj.pageMode == b.id && (f.scene.pageMode = b)
                        }), f.code = PREFIX_URL + "eqs/qrcode/" + f.scene.code + ".png", f.url = VIEW_URL + "v-" + f.scene.code, f.customUrl = l.trustAsResourceUrl(VIEW_URL + "v-" + f.scene.id + "?preview=preview"), f.scene.image.isAdvancedUser = d.isAdvancedUser || d.isVendorUser ? !0 : !1, f.hideAd = f.scene.image.hideEqAd ? !0 : !1, q = f.scene.pageCount, f.scene.startDate && f.scene.endDate && (f.startDate = new Date(f.scene.startDate), f.endDate = new Date(f.scene.endDate), f.alwaysOpen = !1), h.getSceneType().then(function(a) {
                            f.types = a.data.list, b.forEach(f.types, function(a) {
                                a.value == f.scene.type && (f.scene.type = a)
                            })
                        }), h.getCoverImages().then(function(a) {
                            f.coverImages = a.data.list;
                            for (var b, c = 0; c < f.coverImages.length; c++) {
                                if (f.scene.image.imgSrc == f.coverImages[c].path) {
                                    r = f.coverImages[c], f.coverImages.splice(c, 1), b = 0;
                                    break
                                }
                                r = {
                                    tmbPath: f.scene.image.imgSrc,
                                    path: f.scene.image.imgSrc
                                }, b = 1
                            }
                            f.coverImages.unshift(r)
                        })
                    })
                }, f.getSceneDetail(), f.pagemodes = [{
                    id: 0,
                    name: "上下翻页"
                }, {
                    id: 1,
                    name: "上下惯性翻页"
                }, {
                    id: 4,
                    name: "左右翻页"
                }, {
                    id: 3,
                    name: "左右惯性翻页"
                }, {
                    id: 5,
                    name: "左右连续翻页"
                }], f.scene.pageMode = f.pagemodes[0], f.getUserXd = function() {
                    n.getUserXd().then(function(a) {
                        f.userXd = a.data.obj
                    })
                }, f.getUserXd(), f.hideAdd = function() {
                    f.scene.image.hideEqAd && f.userXd < 100 && (alert("积分不足！"), f.scene.image.hideEqAd = !1)
                }, p.getPageTpls(1301).then(function(a) {
                    f.pageTpls = a.data.list && a.data.list.length > 0 ? a.data.list : []
                }), f.chooseLastPage = function(a) {
                    f.scene.image.lastPageId = a
                }
            }
        ]), b.module("scene.my.upload", ["angularFileUpload"]), b.module("scene.my.upload").controller("UploadCtrl", ["$scope", "FileUploader", "fileService", "category", "$timeout", "$interval",
            function(a, b, c, d, e, f) {
                a.category = d;
                var g;
                g = a.uploader = new b(a.category.scratch || a.category.headerImage ? {
                    url: JSON_URL+"?c=upfile&a=upload&ID=" + getCookie("USERID") + "&keycode=" + getCookie("MD5STR") + "&bizType=" + d.categoryId + "&fileType=" + d.fileType,
                    withCredentials: !0,
                    queueLimit: 1,
                    onSuccessItem: function(b, c) {
                        function d() {
                            f.cancel(e), alert("上传完毕"), a.$close(c.obj.path)
                        }
                        a.progressNum = 0;
                        var e = f(function() {
                            a.progressNum < 100 ? a.progressNum += 15 : d()
                        }, 100)
                    }
                } : {
                    url: JSON_URL+"?c=upfile&a=upload&ID=" + getCookie("USERID") + "&keycode=" + getCookie("MD5STR") + "&bizType=" + d.categoryId + "&fileType=" + d.fileType,
                    withCredentials: !0,
                    queueLimit: 5,
                    onCompleteAll: function() {
                        function b() {
                            f.cancel(c), alert("上传完毕"), a.$close()
                        }
                        a.progressNum = 0;
                        var c = f(function() {
                            a.progressNum < 100 ? a.progressNum += 15 : b()
                        }, 100)
                    }
                });
                var h;
                ("0" == d.fileType || "1" == d.fileType) && (h = "|jpg|png|jpeg|bmp|gif|", limitSize = 3145728), "2" == d.fileType && (h = "|mp3|mpeg|", limitSize = 3145728), g.filters.push({
                    name: "imageFilter",
                    fn: function(a) {
                        var b = "|" + a.type.slice(a.type.lastIndexOf("/") + 1) + "|";
                        return -1 !== h.indexOf(b)
                    }
                }), g.filters.push({
                    name: "imageSizeFilter",
                    fn: function(a) {
                        var b = a.size;
                        return b >= limitSize && alert("上传文件大小限制在" + limitSize / 1024 / 1024 + "M以内"), b < limitSize
                    }
                }), g.filters.push({
                    name: "fileNameFilter",
                    fn: function(a) {
                        return a.name.length > 50 && alert("文件名应限制在50字符以内"), a.name.length <= 50
                    }
                });
                var i = function() {
                    c.listFileCategory().then(function(b) {
                        a.categoryList = b.data.list, a.categoryList || (a.categoryList = []), a.categoryList.push({
                            name: "我的背景",
                            value: "0"
                        })
                    })
                };
                i(), a.removeQueue = function() {}
            }
        ]), b.module("reg", []), b.module("reg").controller("TestLoginCtrl", ["$rootScope", "$scope",
            function(a, b) {
                b.weiChatUrl = "https://open.weixin.qq.com/connect/qrconnect?appid=wxc5f1bbae4bb93ced&redirect_uri=http://www.hjtmt.com/testlogin.html&response_type=code&scope=snsapi_login&state=STATE#wechat_redirect"
            }
        ]), b.module("sample", ["services.sample", "services.mine", "services.scene", "app.directives.addelement", "app.directives.qrcode"]), b.module("sample").controller("SampleCtrl", ["$rootScope", "$http", "$scope", "$timeout", "security", "$window", "sampleService", "MineService", "sceneService", "$routeParams",
            function(a, b, c, d, e, f, g, h, i) {
                c.PREFIX_FILE_HOST = PREFIX_FILE_HOST, c.PREFIX_SERVER_HOST = PREFIX_URL, c.PREFIX_CLIENT_HOST = PREFIX_HOST, c.load = function() {
                    t = $(".fixed").offset().top, mh = $(".mains").height(), fh = $(".fixed").height(), $("#eq_main").scroll(function() {
                        s = $("#eq_main").scrollTop(), s > t - 10 ? ($(".fixed").css("position", "fixed"), s + fh > mh && $(".fixed").css("top", "0px")) : $(".fixed").css("position", "")
                    })
                }, c.$on("$destroy", function() {
                    $("#eq_main").unbind("scroll")
                }), c.pageNo = 1, c.pageSize = 9, c.scene || (c.scene = {}), c.typeindex = "all", c.getHomes = function(a, b, d, e) {
                    c.pageNo = 1, c.typeindex = a, c.currentType = b, c.showMoreButton = !0, g.getSamples(b, d, e).then(function(a) {
                        c.homes = a.data.list
                    }, function() {})
                }, c.getSceneType = function() {
                    i.getSceneType().then(function(a) {
                        c.sceneTypes = a.data.list
                    })
                }, c.showMore = function() {
                    c.pageNo++, g.getSamples(c.currentType, c.pageNo, c.pageSize).then(function(a) {
                        a.data.list.length > 0 ? c.homes = c.homes.concat(a.data.list) : c.showMoreButton = !1
                    }, function() {})
                }, c.getSceneType(), c.getHomes("all", null, 1, 9), c.getSamplesPV = function() {
                    g.getSamplesPV().then(function(a) {
                        c.SamplesPVs = a.data, c.dayTop = c.SamplesPVs.obj.dayTop, c.monthTop = c.SamplesPVs.obj.monthTop, c.weekTop = c.SamplesPVs.obj.weekTop, c.page = "month"
                    }, function() {})
                }
            }
        ]), b.module("scene.create.console", ["scene.create.console.bg", "scene.create.console.map", "scene.create.console.input", "scene.create.console.button", "scene.create.console.setting", "scene.create.console.audio", "scene.create.console.tel", "scene.create.console.fake", "scene.create.console.pic_lunbo", "scene.create.console.micro", "scene.create.console.link", "scene.create.console.video", "scene.create.console.category", "scene.create.console.cropImage"]), b.module("scene.create.console").controller("ConsoleCtrl", ["$scope",
            function() {}
        ]), b.module("scene.create.console.setting.anim", ["app.directives.uislider", "app.directives.limitInput"]), b.module("scene.create.console.setting.anim").controller("AnimConsoleCtrl", ["$scope", "sceneService",
            function(a, b) {
                var c = a.elemDef = b.currentElemDef,
                    d = $("#inside_" + a.elemDef.id + " .element-box");
                if (a.animTypeEnum = [{
                    id: -1,
                    name: "无"
                }, {
                    id: 0,
                    name: "淡入"
                }, {
                    id: 1,
                    name: "移入"
                }, {
                    id: 2,
                    name: "弹入"
                }, {
                    id: 3,
                    name: "中心弹入"
                }, {
                    id: 4,
                    name: "中心放大"
                }, {
                    id: 12,
                    name: "翻滚进入"
                }, {
                    id: 13,
                    name: "光速进入"
                }, {
                    id: 6,
                    name: "摇摆"
                }, {
                    id: 5,
                    name: "抖动"
                }, {
                    id: 7,
                    name: "旋转"
                }, {
                    id: 8,
                    name: "翻转"
                }, {
                    id: 9,
                    name: "悬摆"
                }, {
                    id: 10,
                    name: "淡出"
                }, {
                    id: 11,
                    name: "翻转消失"
                }], a.animDirectionEnum = [{
                    id: 0,
                    name: "从左向右"
                }, {
                    id: 1,
                    name: "从上到下"
                }, {
                    id: 2,
                    name: "从右向左"
                }, {
                    id: 3,
                    name: "从下到上"
                }], c.properties || (c.properties = {}), c.properties.anim && null != c.properties.anim.type) {
                    var e;
                    for (e = 0; e < a.animTypeEnum.length; e++) a.animTypeEnum[e].id == c.properties.anim.type && (a.activeAnim = a.animTypeEnum[e]);
                    a.model = {
                        type: c.properties.anim.type,
                        direction: c.properties.anim.direction,
                        duration: parseFloat(c.properties.anim.duration),
                        delay: parseFloat(c.properties.anim.delay),
                        countNum: parseInt(c.properties.anim.countNum, 10) || 1,
                        count: c.properties.anim.count,
                        linear: c.properties.anim.linear
                    }, a.direction = null != c.properties.anim.direction ? a.animDirectionEnum[c.properties.anim.direction] : a.animDirectionEnum[0]
                } else a.activeAnim = a.animTypeEnum[0], a.direction = a.animDirectionEnum[0], a.model = {
                    type: null,
                    direction: null,
                    duration: 2,
                    delay: 0,
                    countNum: 1,
                    count: null
                };
                a.$watch("model", function() {
                    a.direction && (a.model.direction = a.direction.id), c.properties.anim = a.model, f()
                }, !0), a.$watch("direction", function() {
                    a.direction && (a.model.direction = a.direction.id), c.properties.anim = a.model, f()
                }, !0), a.confirm = function() {
                    a.cancel()
                };
                var f = function() {
                    d.css("animation", ""), d.css("animation", a.animationClass + " " + a.model.duration + "s ease 0s"), d.css("animation-fill-mode", "backwards")
                };
                a.changeAnimation = function() {
                    a.animationClass = "";
                    var b = a.model;
                    0 === b.type && (a.animationClass = "fadeIn"), 1 === b.type && (0 === a.direction.id && (a.animationClass = "fadeInLeft"), 1 === a.direction.id && (a.animationClass = "fadeInDown"), 2 === a.direction.id && (a.animationClass = "fadeInRight"), 3 === a.direction.id && (a.animationClass = "fadeInUp")), 6 === b.type && (a.animationClass = "wobble"), 5 === b.type && (a.animationClass = "rubberBand"), 7 === b.type && (a.animationClass = "rotateIn"), 8 === b.type && (a.animationClass = "flip"), 9 === b.type && (a.animationClass = "swing"), 2 === b.type && (0 === a.direction.id && (a.animationClass = "bounceInLeft"), 1 === a.direction.id && (a.animationClass = "bounceInDown"), 2 === a.direction.id && (a.animationClass = "bounceInRight"), 3 === a.direction.id && (a.animationClass = "bounceInUp")), 3 === b.type && (a.animationClass = "bounceIn"), 4 === b.type && (a.animationClass = "zoomIn"), 10 === b.type && (a.animationClass = "fadeOut"), 11 === b.type && (a.animationClass = "flipOutY"), 12 === b.type && (a.animationClass = "rollIn"), 13 === b.type && (a.animationClass = "lightSpeedIn")
                }
            }
        ]), b.module("scene.create.console.audio", []), b.module("scene.create.console.audio").controller("AudioConsoleCtrl", ["$scope", "$sce", "$timeout", "$modal", "fileService", "obj",
            function(a, b, c, d, e, f) {
                function g() {
                    e.getFileByCategory(1, 30, "1", "2").then(function(b) {
                        a.reservedAudios = b.data.list;
                        for (var c = 0; c < a.reservedAudios.length; c++) "3" == a.model.bgAudio.type && PREFIX_FILE_HOST + a.reservedAudios[c].path == a.model.type3 && (a.model.selectedAudio = a.reservedAudios[c])
                    })
                }

                function h() {
                    e.getFileByCategory(1, 10, "0", "2").then(function(b) {
                        a.myAudios = b.data.list;
                        for (var c = 0; c < a.myAudios.length; c++) "2" == a.model.bgAudio.type && PREFIX_FILE_HOST + a.myAudios[c].path == a.model.type2 && (a.model.selectedMyAudio = a.myAudios[c])
                    })
                }
                a.PREFIX_FILE_HOST = PREFIX_FILE_HOST, a.model = {
                    bgAudio: {
                        url: f.url ? f.url : "",
                        type: f.type ? f.type : "3"
                    },
                    compType: "bgAudio"
                }, c(function() {
                    "1" == f.type && f.url && (a.model.type1 = f.url), "2" == f.type && f.url && (a.model.type2 = b.trustAsResourceUrl(((f.url.indexOf('syspic/') >= 0) ? PREFIXSYS_FILE_HOST : USER_FILE_HOST) + f.url)), "3" == f.type && f.url && (a.model.type3 = b.trustAsResourceUrl(((f.url.indexOf('syspic/') >= 0) ? PREFIXSYS_FILE_HOST : USER_FILE_HOST) + f.url))
                }), a.categoryList = [{
                    name: "音乐库",
                    value: "3"
                }, {
                    name: "外部链接",
                    value: "1"
                }, {
                    name: "我的音乐",
                    value: "2"
                }], a.goUpload = function() {
                    d.open({
                        windowClass: "upload-console",
                        templateUrl: "my/upload.tpl.html",
                        controller: "UploadCtrl",
                        resolve: {
                            category: function() {
                                return {
                                    categoryId: 0,
                                    fileType: 2
                                }
                            }
                        }
                    }).result.then(function() {
                        h()
                    })
                }, a.selectAudio = function(c) {
                    "3" == c && (a.model.type3 = a.model.selectedAudio ? b.trustAsResourceUrl(PREFIX_FILE_HOST + a.model.selectedAudio.path) : null), "2" == c && (a.model.type2 = a.model.selectedMyAudio ? b.trustAsResourceUrl(PREFIX_FILE_HOST + a.model.selectedMyAudio.path) : null)
                }, a.playAudio = function(a) {
                    $("#audition" + a)[0].play()
                }, a.pauseAudio = function(a) {
                    $("#audition" + a)[0].pause()
                }, a.confirm = function() {
                    "1" == a.model.bgAudio.type && (a.model.bgAudio.url = a.model.type1), "2" == a.model.bgAudio.type && (a.model.bgAudio.url = a.model.selectedMyAudio.path), "3" == a.model.bgAudio.type && (a.model.bgAudio.url = a.model.selectedAudio.path), a.$close(a.model)
                }, a.cancel = function() {
                    a.$dismiss()
                }, g(), h()
            }
        ]), b.module("scene.create.console.bg", ["services.file", "scene.my.upload", "app.directives.responsiveImage", "app.directives.rightclick"]), b.module("scene.create.console.bg").controller("BgConsoleCtrl", ["$scope", "$timeout", "$rootScope", "$modal", "ModalService", "sceneService", "fileService", "localizedMessages", "obj",
            function(a, b, c, d, e, f, g, h, i) {
                a.PREFIX_FILE_HOST = PREFIX_FILE_HOST, a.first = !0, a.categoryList = [], a.imgList = [], a.otherCategory = [], a.categoryId = "1", a.fileType = i.fileType, a.pageSize = h.get("file.bg.pageSize"), a.myTags = [], a.selectedImgs = [], a.selectedImages = [], a.toPage = 1, a.isEditor = c.isEditor;
                var j = function() {
                    g.listFileCategory(a.fileType).then(function(b) {
                        a.categoryList = b.data.list, a.changeCategory("0", 1)
                    })
                };
                a.totalItems = 0, a.currentPage = 1;
                var k = function(b, c) {
                    if ("c" == b) {
                        a.numPages = 2, a.totalItems = 35;
                        var d = [{
                            color: "#6366C3"
                        }, {
                            color: "#29A1D6"
                        }, {
                            color: "#332E42"
                        }, {
                            color: "#DBF3FF"
                        }, {
                            color: "#434A54"
                        }, {
                            color: "#000000"
                        }, {
                            color: "#F1F03E"
                        }, {
                            color: "#FCF08E"
                        }, {
                            color: "#972D53"
                        }, {
                            color: "#724192"
                        }, {
                            color: "#967BDC"
                        }, {
                            color: "#EC87C1"
                        }, {
                            color: "#D870AF"
                        }, {
                            color: "#F6F7FB"
                        }, {
                            color: "#666C78"
                        }, {
                            color: "#ABB1BD"
                        }, {
                            color: "#CCD0D9"
                        }, {
                            color: "#E6E9EE"
                        }, {
                            color: "#48CFAE"
                        }, {
                            color: "#36BC9B"
                        }, {
                            color: "#3BAEDA"
                        }, {
                            color: "#50C1E9"
                        }, {
                            color: "#AC92ED"
                        }, {
                            color: "#4B89DC"
                        }, {
                            color: "#4B89DC"
                        }, {
                            color: "#5D9CEC"
                        }, {
                            color: "#8DC153"
                        }, {
                            color: "#ED5564"
                        }, {
                            color: "#DB4453"
                        }, {
                            color: "#FB6E52"
                        }, {
                            color: "#FFCE55"
                        }, {
                            color: "#F6BB43"
                        }, {
                            color: "#E9573E"
                        }, {
                            color: "#9FF592"
                        }, {
                            color: "#A0D468"
                        }];
                        a.toPage = c, a.imgList = c && 1 != c ? d.slice(18) : d.slice(0, 18), a.currentPage = c
                    } else "all" == b && (b = ""), g.getFileByCategory(c ? c : 1, a.pageSize, b, a.fileType).then(function(b) {
                        a.imgList = b.data.list, a.totalItems = b.data.map.count, a.currentPage = b.data.map.pageNo, a.allPageCount = b.data.map.count, a.toPage = b.data.map.pageNo, a.numPages = Math.ceil(a.totalItems / a.pageSize)
                    })
                };
                a.replaceImage = function() {
                    if (a.selectedImages.length > 1) return alert("只能选择一张图片进行替换！"), !1;
                    if (!a.selectedImages.length) return alert("还没有选择替换图片"), !1;
                    if ("c" != a.categoryId) {
                        var b = a.selectedImages[0].path,
                            c = $(".hovercolor").children("img")[0];
                        a.$close({
                            type: "imgSrc",
                            data: b,
                            width: c.width,
                            height: c.height
                        })
                    } else {
                        var d = a.selectedImages[0].color;
                        a.$close({
                            type: "backgroundColor",
                            color: d
                        })
                    }
                }, a.getImagesByPage = function(b, c) {
                    a.currentPage = c, 0 == b ? isNaN(a.tagIndex) || -1 == a.tagIndex ? a.changeCategory(b, c) : a.getImagesByTag(a.myTags[a.tagIndex].id, a.tagIndex, c) : isNaN(a.sysTagIndex) || -1 == a.sysTagIndex ? a.changeCategory(b, c) : a.getImagesBySysTag(a.childCatrgoryList[a.sysTagIndex].id, a.sysTagIndex, c, b)
                }, a.replaceBgImage = function(b, c) {
                    var d, e = c.target;
                    d = "IMG" == e.nodeName.toUpperCase() ? e : $("img", e)[0], a.$close({
                        type: "imgSrc",
                        data: b,
                        width: d.width,
                        height: d.height
                    })
                }, a.replaceBgColor = function(b) {
                    a.$close({
                        type: "backgroundColor",
                        color: b
                    })
                }, a.changeCategory = function(b, c) {
                    return ("c" == b || "all" == b || "0" == b) && (a.allImages.checked = !1, a.sysTagIndex = -1), a.selectedImages = [], 1 > c || c > a.totalItems / a.pageSize + 1 ? void alert("此页超出范围") : (a.imgList = [], b || (b = "0"), a.categoryId = b, void(0 == b ? (a.pageSize = h.get("file.bg.pageSize") - 1, a.getImagesByTag("", a.tagIndex, c), a.tagIndex = -1) : (a.pageSize = h.get("file.bg.pageSize"), k(b, c))))
                };
                var l = null;
                a.createCategory = function() {
                    return a.myTags.length >= 8 ? void alert("最多能创建8个自定义标签！") : void(l = d.open({
                        windowClass: "console",
                        templateUrl: "scene/console/category.tpl.html",
                        controller: "CategoryConsoleCtrl"
                    }).result.then(function(b) {
                        a.myTags.push(b)
                    }, function() {}))
                }, a.getCustomTags = function() {
                    g.getCustomTags().then(function(b) {
                        a.myTags = b.data.list
                    }, function() {
                        alert("服务器异常")
                    })
                }, a.getCustomTags(), a.deleteTag = function(b, c) {
                    g.deleteTag(b).then(function() {
                        a.myTags.splice(c, 1)
                    }, function() {
                        alert("服务器异常")
                    })
                }, a.hover = function(a) {
                    a.showOp = !a.showOp
                }, a.switchSelect = function(b, c) {
                    if (c.target.id != b.id)
                        if (b.selected = !b.selected, b.selected) a.selectedImages.push(b);
                        else
                            for (var d in a.selectedImages) a.selectedImages[d] == b && a.selectedImages.splice(d, 1)
                }, a.selectTag = function(b, c) {
                    a.dropTagIndex = c, a.id = a.myTags[c].id
                }, a.setCategory = function(b, c) {
                    a.dropTagIndex = -1;
                    var d = [];
                    if (!c)
                        for (var e in a.selectedImages) d.push(a.selectedImages[e].id);
                    var f = c ? c : d.join(",");
                    g.setCategory(a.id, f).then(function() {}, function() {})
                }, a.hoverTag = function(a) {
                    a.hovered = !a.hovered
                }, a.prevent = function(b) {
                    b.selected || (b.selected = !0, a.selectedImages.push(b))
                }, a.prevent = function() {}, a.unsetTag = function() {
                    var b = [];
                    for (var c in a.selectedImages) b.push(a.selectedImages[c].id);
                    g.unsetTag(a.myTags[a.tagIndex].id, b.join(",")).then(function() {
                        a.getImagesByTag(a.myTags[a.tagIndex].id, a.tagIndex, a.currentPage)
                    }, function() {})
                }, a.setIndex = function(b) {
                    a.dropTagIndex = -1, a.selectedImages.length || (alert("请您选中图片再进行分类！"), b.stopPropagation())
                }, a.getChildCategory = function(b) {
                    g.getChildCategory(b).then(function(b) {
                        a.sysTagIndex = -1, 200 == b.data.code && (a.childCatrgoryList = b.data.list)
                    }, function() {})
                }, a.goUpload = function() {
                    d.open({
                        windowClass: "upload-console",
                        templateUrl: "my/upload.tpl.html",
                        controller: "UploadCtrl",
                        resolve: {
                            category: function() {
                                return {
                                    categoryId: a.categoryId,
                                    fileType: a.fileType,
                                    coverImage: i.coverImage
                                }
                            }
                        }
                    }).result.then(function() {
                        a.changeCategory(a.categoryId)
                    }, function() {})
                }, a.allImages = {
                    checked: !1
                }, a.selectAll = function() {
                    for (var b in a.imgList) a.allImages.checked ? (a.imgList[b].selected = !0, a.selectedImages.push(a.imgList[b])) : (a.imgList[b].selected = !1, a.selectedImages = [])
                }, a.getImagesByTag = function(b, c, d) {
                    return 1 > d || d > a.totalItems / a.pageSize + 1 ? void alert("此页超出范围") : (a.allImages.checked = !1, a.selectedImages = [], a.tagIndex = c, void g.getImagesByTag(b, a.fileType, d, a.pageSize).then(function(b) {
                        a.imgList = b.data.list, a.totalItems = b.data.map.count, a.currentPage = b.data.map.pageNo, a.allPageCount = b.data.map.count, a.toPage = b.data.map.pageNo, a.numPages = Math.ceil(a.totalItems / a.pageSize)
                    }, function() {
                        alert("服务器异常")
                    }))
                }, a.getImagesBySysTag = function(b, c, d, e) {
                    return 1 > d || d > a.totalItems / a.pageSize + 1 ? void alert("此页超出范围") : (a.allImages.checked = !1, a.selectedImages = [], a.sysTagIndex = c, void g.getImagesBySysTag(b, a.fileType, d, a.pageSize, e).then(function(b) {
                        a.imgList = b.data.list, a.totalItems = b.data.map.count, a.currentPage = b.data.map.pageNo, a.allPageCount = b.data.map.count, a.toPage = b.data.map.pageNo, a.numPages = Math.ceil(a.totalItems / a.pageSize)
                    }, function() {
                        alert("服务器异常")
                    }))
                }, a.deleteImage = function(b, c) {
                    var d = [];
                    if (!b && 0 == a.selectedImages.length) return void alert("请您选中图片后再进行删除操作！");
                    c && c.stopPropagation();
                    var f = b ? "确定删除此图片？" : "确定删除所选图片？";
                    if (!b)
                        for (var h in a.imgList) a.imgList[h].selected && d.push(a.imgList[h].id);
                    var i = b ? b : d.join(",");
                    e.openConfirmDialog({
                        msg: f
                    }, function() {
                        g.deleteFile(i).then(function() {
                            isNaN(a.tagIndex) || -1 == a.tagIndex ? a.changeCategory("0", a.currentPage) : a.getImagesByTag(a.myTags[a.tagIndex].id, a.tagIndex, a.currentPage)
                        })
                    })
                }, j()
            }
        ]), b.module("scene.create.console.button", []), b.module("scene.create.console.button").controller("ButtonConsoleCtrl", ["$scope", "$timeout", "localizedMessages", "obj",
            function(a, b, c, d) {
                a.model = {
                    title: d.properties.title
                }, a.confirm = function() {
                    return a.model.title && 0 !== a.model.title.length ? void a.$close(a.model) : (alert("按钮名称不能为空"), void $('.bg_console input[type="text"]').focus())
                }, a.cancel = function() {
                    a.$dismiss()
                }
            }
        ]), b.module("scene.create.console.category", ["services.file"]), b.module("scene.create.console.category").controller("CategoryConsoleCtrl", ["$scope", "$timeout", "localizedMessages", "fileService",
            function(a, c, d, e) {
                a.category = {}, a.confirm = function() {
                    return a.category.name && a.category.name.trim() ? i(a.category.name) > 16 ? void alert("类别字数不能超过16个字符！") : void e.createCategory(b.copy(a.category.name)).then(function(c) {
                        a.category.id = c.data.obj, a.$close(b.copy(a.category))
                    }, function() {
                        alert("创建失败")
                    }) : void alert("类别不能为空！")
                }, a.cancel = function() {
                    a.$dismiss()
                }
            }
        ]), b.module("scene.create.console.cropImage", ["services.file"]).directive("cropImage", ["sceneService", "fileService", "$compile",
            function(a, b) {
                return {
                    restrict: "EAC",
                    scope: {},
                    replace: !0,
                    templateUrl: "scene/console/cropimage.tpl.html",
                    link: function(c, d) {
                        c.PREFIX_FILE_HOST = PREFIX_FILE_HOST;
                        var e, f = a.currentElemDef,
                            g = a.currentElemDef.properties.src;
                        c.$on("changeElemDef", function(b, d) {
                            d = a.currentElemDef, g = a.currentElemDef.properties.src, c.preSelectImage(g)
                        }), c.preSelectImage = function(a) {
                            var b = $("#target");
                            e ? (b.attr("src", PREFIX_FILE_HOST + a), e.setImage(PREFIX_FILE_HOST + a), e.setSelect([0, 0, 100, 100])) : b.attr("src", PREFIX_FILE_HOST + a).load(function() {
                                b.Jcrop({
                                    keySupport: !1,
                                    setSelect: [0, 0, 100, 100],
                                    boxHeight: 200,
                                    boxWidth: 300
                                }, function() {
                                    e = this
                                }), a && b.Jcrop({
                                    keySupport: !1,
                                    aspectRatio: f.css.width / f.css.height,
                                    setSelect: [-f.properties.imgStyle.marginLeft.split("px")[0], -f.properties.imgStyle.marginTop.split("px")[0], f.css.width, f.css.height]
                                })
                            })
                        }, c.preSelectImage(g), c.crop = function() {
                            var c = a.currentElemDef,
                                f = e.tellSelect();
                            f.x = parseInt(f.x, 10), f.y = parseInt(f.y, 10), f.w = parseInt(f.w, 10), f.h = parseInt(f.h, 10), f.x2 = parseInt(f.x2, 10), f.y2 = parseInt(f.y2, 10), f.src = $("#target").attr("src").split(PREFIX_FILE_HOST)[1], b.cropImage(f).then(function(a) {
                                var b = {
                                    type: "imgSrc",
                                    data: a.data.obj,
                                    width: f.w,
                                    height: f.h
                                };
                                c.properties.src = b.data;
                                var e = b.width / b.height,
                                    g = $("#" + c.id),
                                    h = $("#inside_" + c.id).width(),
                                    i = $("#inside_" + c.id).height(),
                                    j = h / i;
                                e >= j ? (g.outerHeight(i), g.outerWidth(i * e), g.css("marginLeft", -(g.outerWidth() - h) / 2), g.css("marginTop", 0)) : (g.outerWidth(h), g.outerHeight(h / e), g.css("marginTop", -(g.outerHeight() - i) / 2), g.css("marginLeft", 0)), g.attr("src", PREFIX_FILE_HOST + b.data), c.properties.imgStyle = {}, c.properties.imgStyle.width = g.outerWidth(), c.properties.imgStyle.height = g.outerHeight(), c.properties.imgStyle.marginTop = g.css("marginTop"), c.properties.imgStyle.marginLeft = g.css("marginLeft"), $(d).hide()
                            }, function() {
                                c.properties.src || (elements.splice(elements.indexOf(elementsMap[c.id]), 1), delete elementsMap[c.id])
                            })
                        }, c.cancel = function() {
                            $(d).hide()
                        }
                    }
                }
            }
        ]), b.module("scene.create.console.fake", []), b.module("scene.create.console.fake").controller("FakeConsoleCtrl", ["$scope", "type",
            function(a, b) {
                a.type = b
            }
        ]), b.module("scene.create.console.input", []), b.module("scene.create.console.input").controller("InputConsoleCtrl", ["$scope", "$timeout", "localizedMessages", "obj",
            function(a, b, c, d) {
                a.model = {
                    title: d.title,
                    type: d.type,
                    required: d.properties.required
                }, a.confirm = function() {
                    return a.model.title && 0 !== a.model.title.length ? void a.$close(a.model) : (alert("输入框名称不能为空"), void $('.bg_console input[type="text"]').focus())
                }, a.cancel = function() {
                    a.$dismiss()
                }
            }
        ]), b.module("scene.create.console.link", ["services.scene"]), b.module("scene.create.console.link").controller("LinkConsoleCtrl", ["$scope", "$timeout", "obj", "sceneService",
            function(a, c, d, e) {
                a.url = {}, a.url.externalLink = "http://";
                var f;
                a.confirm = function() {
                    "external" == a.url.link ? f = a.url.externalLink : "internal" == a.url.link && (f = a.url.internalLink.num), a.$close(f)
                }, a.cancel = function() {
                    a.$dismiss()
                }, a.removeLink = function(b) {
                    "external" == b ? a.url.externalLink = "http://" : "internal" == b && (a.url.internalLink = a.pageList[0]), a.url.link = ""
                }, a.changed = function() {
                    "external" == a.url.link ? a.url.internalLink = a.pageList[0] : a.url.externalLink = "http://"
                }, a.selectRadio = function(b) {
                    a.url.link || ("external" == b ? a.url.link = "external" : "internal" == b && (a.url.link = "internal"))
                }, a.getPageNames = function() {
                    var c = d.sceneId;
                    e.getPageNames(c).then(function(c) {
                        a.pageList = c.data.list, a.pageList.unshift({
                            id: 0,
                            name: "无"
                        }), b.forEach(a.pageList, function(a) {
                            a.name || (a.name = "第" + a.num + "页")
                        }), a.url.internalLink = a.pageList[0], d.properties.url && (isNaN(d.properties.url) ? (a.url.link = "external", a.url.externalLink = decodeURIComponent(d.properties.url.split("=")[2])) : (a.url.link = "internal", a.url.internalLink = a.pageList[d.properties.url]))
                    })
                }, a.getPageNames()
            }
        ]), b.module("scene.create.console.map", ["app.directives.comp.editor"]), b.module("scene.create.console.map").controller("MapConsoleCtrl", ["$scope", "sceneService", "$timeout",
            function(a, b, c) {
                var d = null,
                    e = null;
                a.address = {
                    address: "",
                    lat: "",
                    lng: ""
                }, a.search = {
                    address: ""
                }, a.searchResult = [], c(function() {
                    d = new BMap.Map("l-map"), d.addControl(new BMap.NavigationControl), d.centerAndZoom(new BMap.Point(116.404, 39.915), 12);
                    var b = {
                        onSearchComplete: function(b) {
                            e.getStatus() == BMAP_STATUS_SUCCESS && (a.searchResult = b.Fn, a.$apply())
                        }
                    };
                    e = new BMap.LocalSearch(d, b)
                }), a.searchAddress = function() {
                    e.search(a.search.address)
                }, a.setPoint = function(b, c, e) {
                    a.address.address = e, a.address.lat = b, a.address.lng = c, d.clearOverlays();
                    var f = new BMap.Point(c, b),
                        g = new BMap.Marker(f);
                    d.addOverlay(g);
                    var h = new BMap.Label(e, {
                        offset: new BMap.Size(20, -10)
                    });
                    g.setLabel(h), d.centerAndZoom(f, 12)
                }, a.resetAddress = function() {
                    a.$close(a.address)
                }, a.cancel = function() {
                    a.$dismiss()
                }
            }
        ]), b.module("scene.create.console.micro", ["app.directives.addelement", "services.scene"]), b.module("scene.create.console.micro").controller("MicroConsoleCtrl", ["$scope", "$timeout", "localizedMessages", "obj", "sceneService",
            function(a, c, d, e, f) {
                a.model || (a.model = {});
                var g = [];
                a.isSelected = [], a.backgroundColors = [{
                    backgroundColor: "#D34141"
                }, {
                    backgroundColor: "#000"
                }, {
                    backgroundColor: "#23A3D3"
                }, {
                    backgroundColor: "#79C450"
                }, {
                    backgroundColor: "#fafafa"
                }], a.labelNames = [{
                    id: 1,
                    title: "栏目一",
                    color: {
                        backgroundColor: ""
                    }
                }, {
                    id: 2,
                    title: "栏目二",
                    color: {
                        backgroundColor: ""
                    }
                }, {
                    id: 3,
                    title: "栏目三",
                    color: {
                        backgroundColor: ""
                    }
                }, {
                    id: 4,
                    title: "栏目四",
                    color: {
                        backgroundColor: ""
                    }
                }], a.model.color = e.properties.labels[0].color.backgroundColor, a.selectColor = function(c) {
                    a.model.color = c.backgroundColor, b.forEach(a.labelNames, function(a) {
                        a.color.backgroundColor && (a.color.backgroundColor = c.backgroundColor)
                    })
                }, b.forEach(e.properties.labels, function(c) {
                    b.forEach(a.labelNames, function(a) {
                        c.id == a.id && (a.title = c.title, a.color.backgroundColor = c.color.backgroundColor, a.link = c.link, a.selected = !0, c.mousedown = !1)
                    })
                }), a.confirm = function() {
                    g = [];
                    var c = 0,
                        d = 0;
                    b.forEach(a.labelNames, function(a) {
                        a.selected && (a.link ? g.push(a) : d++, c++)
                    }), 2 > c ? alert("导航标签不能少于两个！") : d > 0 ? alert("每个导航必须有链接页面！") : a.$close(g)
                }, a.cancel = function() {
                    a.$dismiss()
                }, a.switchLabel = function(b, c) {
                    a.label = b, b.selected ? a.labelIndex == c ? (b.color.backgroundColor = "", b.selected = !1, b.mousedown = !1) : (a.labelIndex = c, b.mousedown = !0) : (b.color.backgroundColor = a.model.color, a.labelIndex = c, b.selected = !0, b.mousedown = !0), b.mousedown ? (a.model.title = b.title, a.model.link = b.link ? a.pageList[b.link] : a.pageList[0]) : (a.model.title = "", a.model.link = a.pageList[0])
                }, a.selectLink = function(b) {
                    a.label.mousedown && (a.label.link = b.num, console.log(a.labelNames))
                }, a.changeLabelName = function() {
                    a.label.mousedown && (a.label.title = a.model.title)
                }, a.getPageNames = function() {
                    var c = e.sceneId;
                    f.getPageNames(c).then(function(c) {
                        a.pageList = c.data.list, a.pageList.unshift({
                            id: 0,
                            name: "无"
                        }), b.forEach(a.pageList, function(a) {
                            a.name || (a.name = "第" + a.num + "页")
                        }), a.model.link = a.pageList[0]
                    })
                }, a.getPageNames()
            }
        ]), b.module("scene.create.console.pic_lunbo", ["scene.my.upload"]), b.module("scene.create.console.pic_lunbo").controller("picsCtrl", ["$scope", "$timeout", "$rootScope", "$modal", "ModalService", "sceneService", "fileService", "obj",
            function(a, b, d, e, f, g, h, i) {
                var j = {
                        lunBo: 1,
                        jiuGongGe: 2
                    },
                    k = {
                        autoPlay: i.properties.autoPlay == c ? !0 : i.properties.autoPlay,
                        interval: i.properties.interval == c ? 3e3 : i.properties.interval,
                        picStyle: i.properties.picStyle == c ? j.lunBo : i.properties.picStyle,
                        children: []
                    },
                    l = i.properties.children;
                if (l && l.length > 0)
                    for (var m in l) k.children.push(l[m]);
                a.imgList = k.children, a.isAutoPlay = k.autoPlay, a.fileDomain = PREFIX_FILE_HOST, a.autoPlay = function(b) {
                    a.isAutoPlay = k.autoPlay = b
                }, a.choosePic = function() {
                    return k.children.length >= 6 ? void alert("最多选择6张图片") : void e.open({
                        windowClass: "console img_console",
                        templateUrl: "scene/console/bg.tpl.html",
                        controller: "BgConsoleCtrl",
                        resolve: {
                            obj: function() {
                                return {
                                    fileType: 1,
                                    elemDef: i
                                }
                            }
                        }
                    }).result.then(function(b) {
                        a.imgList.push({
                            src: b.data,
                            desc: "",
                            height: b.height,
                            width: b.width
                        })
                    }, function() {})
                }, a.remove = function(b) {
                    a.imgList.splice(b, 1)
                }, a.ok = function() {
                    return 0 == k.children.length ? void alert("请选择图片") : (i.properties = k, void a.$close(k))
                }, a.cancel = function() {
                    a.$dismiss()
                }
            }
        ]), b.module("scene.create.console.setting", ["scene.create.console.setting.style", "scene.create.console.setting.anim"]), b.module("scene.create.console.setting").directive("styleModal", ["sceneService", "$compile",
            function() {
                return {
                    restrict: "AE",
                    replace: !0,
                    scope: {},
                    templateUrl: "scene/console/setting.tpl.html",
                    link: function(a, b, c) {
                        var d = "style";
                        a.$on("showStylePanel", function(b, c) {
                            d = a.activeTab, a.activeTab = "", a.$apply(), a.activeTab = c && c.activeTab ? c.activeTab : d, a.$apply()
                        }), a.activeTab = c.activeTab, a.cancel = function() {
                            $(b).hide()
                        }, a.$on("$locationChangeStart", function() {
                            a.cancel()
                        })
                    },
                    controller: ["$scope",
                        function() {}
                    ]
                }
            }
        ]), b.module("scene.create.console.setting.style", ["colorpicker.module", "app.directives.style", "app.directives.uislider", "app.directives.limitInput"]), b.module("scene.create.console.setting.style").controller("StyleConsoleCtrl", ["$scope", "sceneService",
            function(a, b) {
                var c = a.elemDef = b.currentElemDef;
                delete c.css.borderTopLeftRadius, delete c.css.borderTopRightRadius, delete c.css.borderBottomLeftRadius, delete c.css.borderBottomRightRadius, delete c.css.border;
                var d = c.css,
                    e = $("#inside_" + a.elemDef.id + " > .element-box");
                if (a.model = {
                    backgroundColor: d.backgroundColor || "",
                    opacity: 100 - 100 * d.opacity || 0,
                    color: d.color || "#676767",
                    borderWidth: parseInt(d.borderWidth, 10) || 0,
                    borderStyle: d.borderStyle || "solid",
                    borderColor: d.borderColor || "rgba(0,0,0,1)",
                    paddingBottom: parseInt(d.paddingBottom, 10) || 0,
                    paddingTop: parseInt(d.paddingTop, 10) || 0,
                    lineHeight: +d.lineHeight || 1,
                    borderRadius: parseInt(d.borderRadius, 10) || 0,
                    transform: d.transform && parseInt(d.transform.replace("rotateZ(", "").replace("deg)", ""), 10) || 0
                }, a.maxRadius = Math.min(e.outerWidth(), e.outerHeight()) / 2 + 10, d.borderRadiusPerc ? a.model.borderRadiusPerc = parseInt(d.borderRadiusPerc, 10) : d.borderRadius ? "999px" == d.borderRadius ? a.model.borderRadiusPerc = 100 : (a.model.borderRadiusPerc = parseInt(100 * parseInt(d.borderRadius, 10) * 2 / Math.min(e.outerWidth(), e.outerHeight()), 10), a.model.borderRadiusPerc > 100 && (a.model.borderRadiusPerc = 100)) : a.model.borderRadiusPerc = 0, a.tmpModel = {
                    boxShadowDirection: 0,
                    boxShadowX: 0,
                    boxShadowY: 0,
                    boxShadowBlur: 0,
                    boxShadowSize: 0,
                    boxShadowColor: "rgba(0,0,0,0.5)"
                }, d.boxShadow) {
                    var f = d.boxShadow.split(" ");
                    a.tmpModel.boxShadowX = parseInt(f[0], 10), a.tmpModel.boxShadowY = parseInt(f[1], 10), a.tmpModel.boxShadowDirection = parseInt(d.boxShadowDirection, 10) || 0, a.tmpModel.boxShadowBlur = parseInt(f[2], 10), a.tmpModel.boxShadowColor = f[3], a.tmpModel.boxShadowSize = parseInt(d.boxShadowSize, 10) || 0
                }
                a.clear = function() {
                    a.model = {
                        backgroundColor: "",
                        opacity: 0,
                        color: "#676767",
                        borderWidth: 0,
                        borderStyle: "solid",
                        borderColor: "rgba(0,0,0,1)",
                        paddingBottom: 0,
                        paddingTop: 0,
                        lineHeight: 1,
                        borderRadius: 0,
                        transform: 0
                    }, a.tmpModel = {
                        boxShadowDirection: 0,
                        boxShadowX: 0,
                        boxShadowY: 0,
                        boxShadowBlur: 0,
                        boxShadowSize: 0,
                        boxShadowColor: "rgba(0,0,0,0.5)"
                    }
                }, a.$watch("tmpModel", function() {
                    var b = {};
                    $.extend(!0, b, a.model), b.borderRadius += "px", b.borderTopLeftRadius = b.borderTopRightRadius = b.borderBottomLeftRadius = b.borderBottomRightRadius = b.borderRadius, b.opacity = (100 - a.model.opacity) / 100, b.boxShadow = Math.round(a.tmpModel.boxShadowX) + "px " + Math.round(a.tmpModel.boxShadowY) + "px " + a.tmpModel.boxShadowBlur + "px " + a.tmpModel.boxShadowColor, b.boxShadowDirection = a.tmpModel.boxShadowDirection, b.boxShadowSize = a.tmpModel.boxShadowSize, b.transform = "rotateZ(" + a.model.transform + "deg)", $.extend(!0, c.css, b)
                }, !0), a.$watch("model", function() {
                    var b = {};
                    $.extend(!0, b, a.model), b.borderRadius += "px", b.borderTopLeftRadius = b.borderTopRightRadius = b.borderBottomLeftRadius = b.borderBottomRightRadius = b.borderRadius, b.opacity = (100 - a.model.opacity) / 100, b.boxShadow = Math.round(a.tmpModel.boxShadowX) + "px " + Math.round(a.tmpModel.boxShadowY) + "px " + a.tmpModel.boxShadowBlur + "px " + a.tmpModel.boxShadowColor, b.boxShadowDirection = a.tmpModel.boxShadowDirection, b.boxShadowSize = a.tmpModel.boxShadowSize, b.transform = "rotateZ(" + a.model.transform + "deg)", $.extend(!0, c.css, b)
                }, !0)
            }
        ]).directive("styleInput", function() {
            return {
                restrict: "AE",
                link: function(a, b, c) {
                    var d = $("#inside_" + a.elemDef.id + " > .element-box");
                    a.$watch(function() {
                        return $(b).val()
                    }, function() {
                        if ("borderWidth" == c.cssItem) {
                            d.css({
                                borderStyle: a.model.borderStyle,
                                borderWidth: $(b).val()
                            });
                            var e = {
                                width: d.width(),
                                height: d.height()
                            };
                            if (4 == a.elemDef.type) {
                                var f = d.find("img"),
                                    g = f.width() / f.height(),
                                    h = e.width / e.height;
                                g >= h ? (f.outerHeight(e.height), f.outerWidth(e.height * g), f.css("marginLeft", -(f.outerWidth() - e.width) / 2), f.css("marginTop", 0)) : (f.outerWidth(e.width), f.outerHeight(e.width / g), f.css("marginTop", -(f.outerHeight() - e.height) / 2), f.css("marginLeft", 0)), a.elemDef.properties.imgStyle.marginTop = f.css("marginTop"), a.elemDef.properties.imgStyle.marginLeft = f.css("marginLeft"), a.elemDef.properties.imgStyle.width = f.outerWidth(), a.elemDef.properties.imgStyle.height = f.outerHeight()
                            }
                        }
                        "borderRadius" == c.cssItem && d.css({
                            borderRadius: a.model.borderRadius
                        }), "opacity" == c.cssItem && d.css({
                            opacity: (100 - $(b).val()) / 100
                        }), "backgroundColor" == c.cssItem && d.css({
                            backgroundColor: $(b).val()
                        }), "color" == c.cssItem && d.css({
                            color: $(b).val()
                        }), "borderStyle" == c.cssItem && d.css({
                            borderStyle: a.model.borderStyle
                        }), "borderColor" == c.cssItem && d.css({
                            borderColor: a.model.borderColor
                        }), "padding" == c.cssItem && d.css({
                            paddingTop: a.model.paddingTop,
                            marginTop: -a.model.paddingBottom
                        }), "lineHeight" == c.cssItem && d.css({
                            lineHeight: a.model.lineHeight
                        }), "transform" == c.cssItem && d.parents("li").css({
                            transform: "rotateZ(" + a.model.transform + "deg)"
                        }), "boxShadow" == c.cssItem && (a.tmpModel.boxShadowX = -Math.sin(a.tmpModel.boxShadowDirection * Math.PI / 180) * a.tmpModel.boxShadowSize, a.tmpModel.boxShadowY = Math.cos(a.tmpModel.boxShadowDirection * Math.PI / 180) * a.tmpModel.boxShadowSize, d.css({
                            boxShadow: Math.round(a.tmpModel.boxShadowX) + "px " + Math.round(a.tmpModel.boxShadowY) + "px " + a.tmpModel.boxShadowBlur + "px " + a.tmpModel.boxShadowColor
                        }))
                    })
                }
            }
        }).directive("angleKnob", function() {
            return {
                restrict: "AE",
                templateUrl: "scene/console/angle-knob.tpl.html",
                link: function(a, b) {
                    function c(a, b) {
                        var c = Math.sqrt((a - 28) * (a - 28) + (b - 28) * (b - 28)) / 28,
                            d = 28 + (a - 28) / c,
                            e = 28 + (b - 28) / c;
                        f.css({
                            top: Math.round(e),
                            left: Math.round(d)
                        })
                    }

                    function d(a, b) {
                        var c = a - 28,
                            d = 28 - b,
                            e = 180 * Math.atan(c / d) / Math.PI;
                        return b > 28 && (e += 180), 28 >= b && 28 > a && (e += 360), Math.round(e)
                    }
                    var e = $(b).find(".sliderContainer"),
                        f = $(b).find(".sliderKnob");
                    a.$watch(function() {
                        return a.tmpModel.boxShadowDirection
                    }, function(a) {
                        f.css({
                            top: 28 - 28 * Math.cos(a * Math.PI / 180),
                            left: 28 + 28 * Math.sin(a * Math.PI / 180)
                        })
                    }), 0 != a.tmpModel.boxShadowDirection && f.css({
                        top: 28 - 28 * Math.cos(a.tmpModel.boxShadowDirection * Math.PI / 180),
                        left: 28 + 28 * Math.sin(a.tmpModel.boxShadowDirection * Math.PI / 180)
                    }), e.bind("mousedown", function(b) {
                        b.stopPropagation();
                        var f = e.offset().left,
                            g = e.offset().top;
                        c(b.pageX - f, b.pageY - g);
                        var h = d(b.pageX - f, b.pageY - g);
                        a.tmpModel.boxShadowDirection = h, a.$apply(), $(this).bind("mousemove", function(b) {
                            b.stopPropagation(), c(b.pageX - f, b.pageY - g);
                            var e = d(b.pageX - f, b.pageY - g);
                            a.tmpModel.boxShadowDirection = e, a.$apply()
                        }), $(this).bind("mouseup", function() {
                            $(this).unbind("mousemove"), $(this).unbind("mouseup")
                        })
                    })
                }
            }
        }), b.module("scene.create.console.tel", ["app.directives.addelement"]), b.module("scene.create.console.tel").controller("TelConsoleCtrl", ["$scope", "$timeout", "localizedMessages", "obj",
            function(a, c, d, e) {
                a.model = {
                    title: e.properties.title,
                    number: e.properties.number
                }, a.confirm = function() {
                    if (!a.model.title || 0 === a.model.title.length) return alert("按钮名称不能为空"), void $('.bg_console input[type="text"]').focus();
                    if (!a.model.number || 0 === a.model.title.number) return alert("电话号码不能为空"), void $('.bg_console input[type="text"]').focus();
                    var b = new RegExp(/(\d{11})|^((\d{7,8})|(^400[0-9]\d{6})|(\d{4}|\d{3})-(\d{7,8})|(\d{4}|\d{3})-(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1})|(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1}))$/g);
                    return b.test(a.model.number) ? void a.$close(a.model) : void alert("手机号码格式错误")
                }, a.cancel = function() {
                    a.$dismiss()
                }, a.removePlaceHolder = function() {
                    $(".tel-button").attr("placeholder", "")
                }, a.addPlaceHolder = function() {
                    $(".tel-button").attr("placeholder", "010-88888888")
                }, a.chooseTelButton = function(b, c, d) {
                    a.model.title = b.text, "A" == d.target.nodeName && (a.model.btnStyle = b.btnStyle), a.btnIndex = c
                }, a.buttons = [{
                    id: 1,
                    text: "一键拨号",
                    btnStyle: {
                        width: "90px",
                        backgroundColor: "rgb(244, 113, 31)",
                        height: "30px",
                        "text-algn": "center",
                        "line-height": "30px",
                        color: "rgb(255, 255, 255)",
                        "-webkit-border-radius": "5px",
                        "-moz-border-radius": "5px",
                        "border-radius": "3px"
                    }
                }, {
                    id: 2,
                    text: "热线电话",
                    btnStyle: {
                        width: "90px",
                        backgroundColor: "rgb(253, 175, 7)",
                        height: "30px",
                        "text-algn": "center",
                        "line-height": "30px",
                        color: "rgb(255, 255, 255)",
                        "-webkit-border-radius": "40px",
                        "-moz-border-radius": "40px",
                        "border-radius": "3px"
                    }
                }, {
                    id: 3,
                    text: "拨打电话",
                    btnStyle: {
                        width: "90px",
                        backgroundColor: "rgb(121, 196, 80)",
                        height: "30px",
                        "text-algn": "center",
                        "line-height": "30px",
                        color: "rgb(255, 255, 255)",
                        "-webkit-border-radius": "5px",
                        "-moz-border-radius": "5px",
                        "border-radius": "3px"
                    }
                }, {
                    id: 4,
                    text: "一键拨号",
                    btnStyle: {
                        width: "90px",
                        height: "30px",
                        backgroundColor: "#fff",
                        "text-algn": "center",
                        border: "1px solid #3FB816",
                        "line-height": "30px",
                        color: "rgb(0, 0, 0)",
                        "-webkit-border-radius": "5px",
                        "-moz-border-radius": "5px",
                        "border-radius": "3px"
                    }
                }], b.forEach(a.buttons, function(b, c) {
                    e.css.background && e.css.background == b.btnStyle.background && (a.btnIndex = c)
                })
            }
        ]), b.module("scene.create.console.video", []), b.module("scene.create.console.video").controller("VideoCtrl", ["$scope", "$timeout", "obj",
            function(a, b, c) {
                a.model || (a.model = {}), a.model.src = c.properties.src, a.confirm = function() {
                    return a.model.src ? void a.$close(a.model.src) : void alert("请输入视频地址")
                }, a.cancel = function() {
                    a.$dismiss()
                }
            }
        ]), b.module("scene.create", ["app.directives.editor", "services.scene", "confirm-dialog", "services.modal", "app.directives.component", "services.pagetpl", "scene.create.console", "app.directives.comp.editor", "app.directives.addelement", "scene.my.upload", "services.i18nNotifications"]), b.module("scene.create").controller("CreateSceneCtrl", ["$timeout", "$compile", "$rootScope", "$scope", "$routeParams", "$route", "$location", "sceneService", "pageTplService", "$modal", "ModalService", "security", "$window", "i18nNotifications",
            function(c, d, e, f, g, h, j, k, l, m, n, o, p, r) {
                function s(a, c, d) {
                    f.loading = !0, $("#editBG").hide(), f.pageId = f.pages[a - 1].id, k.getSceneByPage(f.pageId, c, d).then(function(g) {
                        f.loading = !1, f.tpl = g.data, w = JSON.stringify(f.tpl), f.sceneId = f.tpl.obj.sceneId, f.tpl.obj.properties && (f.tpl.obj.properties.image || f.tpl.obj.properties.scratch) ? (f.tpl.obj.properties.scratch ? f.scratch = f.tpl.obj.properties.scratch : f.tpl.obj.properties.image && (f.scratch.image = f.tpl.obj.properties.image, f.scratch.percentage = f.tpl.obj.properties.percentage, f.tpl.obj.properties.tip && (f.scratch.tip = f.tpl.obj.properties.tip)), f.effectName = "涂抹", b.forEach(f.scratches, function(a) {
                            a.path == f.scratch.image.path && (f.scratch.image = a)
                        }), b.forEach(f.percentages, function(a) {
                            a.value == f.scratch.percentage.value && (f.scratch.percentage = a)
                        })) : (f.scratch = {}, f.scratch.image = f.scratches[0], f.scratch.percentage = f.percentages[0]), f.tpl.obj.properties && f.tpl.obj.properties.finger ? (f.finger = f.tpl.obj.properties.finger, f.effectName = "指纹", b.forEach(f.fingerZws, function(a) {
                            a.path == f.finger.zwImage.path && (f.finger.zwImage = a)
                        }), b.forEach(f.fingerBackgrounds, function(a) {
                            a.path == f.finger.bgImage.path && (f.finger.bgImage = a)
                        })) : (f.finger = {}, f.finger.zwImage = f.fingerZws[0], f.finger.bgImage = f.fingerBackgrounds[0]), f.tpl.obj.properties && f.tpl.obj.properties.effect && "money" == f.tpl.obj.properties.effect.name && (f.effectName = "数钱", f.money = {
                            tip: f.tpl.obj.properties.effect.tip
                        }), f.tpl.obj.properties && f.tpl.obj.properties.fallingObject ? (f.falling = f.tpl.obj.properties.fallingObject, b.forEach(f.fallings, function(a) {
                            a.path == f.falling.src.path && (f.falling.src = a)
                        }), f.effectName = "环境") : f.falling = {
                            src: f.fallings[0],
                            density: 2
                        }, (c || d) && (j.$$search = {}, j.search("pageId", ++a), f.getPageNames()), f.pageNum = a, v = f.tpl.obj.scene.name, $(".nr").empty(), k.templateEditor.parse({
                            def: f.tpl.obj,
                            appendTo: ".nr",
                            mode: "edit"
                        }), e.$broadcast("dom.changed")
                    }, function() {
                        f.loading = !1
                    })
                }

                function t() {
                    r.pushForCurrentRoute("scene.save.success.nopublish", "notify.success")
                }
                f.loading = !1, f.PREFIX_FILE_HOST = PREFIX_FILE_HOST, f.tpl = {};
                var u, v = "",
                    w = "",
                    x = "";
                f.templateType = 1, f.categoryId = -1, f.isEditor = e.isEditor, f.createComp = k.createComp, f.createCompGroup = k.createCompGroup, f.updateCompPosition = k.updateCompPosition, f.updateCompAngle = k.updateCompAngle, f.updateCompSize = k.updateCompSize, f.openAudioModal = k.openAudioModal, f.isAllowToAccessScrollImage = o.isAllowToAccess(4);
                var y = null;
                f.scratch || (f.scratch = {}), f.finger || (f.finger = {}), f.effectList = [{
                    type: "scratch",
                    name: "涂抹",
                    src: CLIENT_CDN + "images/create/waterdrop.jpg"
                }, {
                    type: "finger",
                    name: "指纹",
                    src: CLIENT_CDN + "images/create/fingers/zhiwen1.png"
                }, {
                    type: "money",
                    name: "数钱",
                    src: CLIENT_CDN + "images/create/money_thumb1.jpg"
                }, {
                    type: "fallingObject",
                    name: "环境",
                    src: CLIENT_CDN + "images/create/falling.png"
                }], f.scratches = [{
                    name: "水滴",
                    path: CLIENT_CDN + "images/create/waterdrop.jpg"
                }, {
                    name: "细沙",
                    path: CLIENT_CDN + "images/create/sand.jpg"
                }, {
                    name: "花瓣",
                    path: CLIENT_CDN + "images/create/flowers.jpg"
                }, {
                    name: "金沙",
                    path: CLIENT_CDN + "images/create/goldsand.jpg"
                }, {
                    name: "白雪",
                    path: CLIENT_CDN + "images/create/snowground.jpg"
                }, {
                    name: "模糊",
                    path: CLIENT_CDN + "images/create/mohu.jpg"
                }, {
                    name: "落叶",
                    path: CLIENT_CDN + "images/create/leaves.jpg"
                }, {
                    name: "薄雾",
                    path: CLIENT_CDN + "images/create/smoke.png"
                }], f.percentages = [{
                    id: 1,
                    value: .15,
                    name: "15%"
                }, {
                    id: 2,
                    value: .3,
                    name: "30%"
                }, {
                    id: 3,
                    value: .6,
                    name: "60%"
                }], f.fingerZws = [{
                    name: "粉色指纹",
                    path: CLIENT_CDN + "images/create/fingers/zhiwen1.png"
                }, {
                    name: "白色指纹",
                    path: CLIENT_CDN + "images/create/fingers/zhiwen2.png"
                }, {
                    name: "蓝色指纹",
                    path: CLIENT_CDN + "images/create/fingers/zhiwen3.png"
                }], f.fingerBackgrounds = [{
                    name: "粉红回忆",
                    path: CLIENT_CDN + "images/create/fingers/bg1.jpg"
                }, {
                    name: "深蓝花纹",
                    path: CLIENT_CDN + "images/create/fingers/bg2.jpg"
                }, {
                    name: "淡绿清新",
                    path: CLIENT_CDN + "images/create/fingers/bg3.jpg"
                }, {
                    name: "深紫典雅",
                    path: CLIENT_CDN + "images/create/fingers/bg4.jpg"
                }, {
                    name: "淡紫水滴",
                    path: CLIENT_CDN + "images/create/fingers/bg5.jpg"
                }, {
                    name: "蓝白晶格",
                    path: CLIENT_CDN + "images/create/fingers/bg6.jpg"
                }, {
                    name: "蓝色水滴",
                    path: CLIENT_CDN + "images/create/fingers/bg7.jpg"
                }, {
                    name: "朦胧绿光",
                    path: CLIENT_CDN + "images/create/fingers/bg8.jpg"
                }, {
                    name: "灰色金属",
                    path: CLIENT_CDN + "images/create/fingers/bg9.jpg"
                }], f.fallings = [{
                    name: "福字",
                    path: CLIENT_CDN + "images/create/fallings/fuzi1.png",
                    rotate: 180,
                    vy: 3
                }, {
                    name: "红包",
                    path: CLIENT_CDN + "images/create/fallings/hongbao2.png",
                    rotate: 180,
                    vy: 3
                }, {
                    name: "绿枫叶",
                    path: CLIENT_CDN + "images/create/fallings/lvfengye.png",
                    rotate: 180,
                    vy: 3
                }, {
                    name: "星星",
                    path: CLIENT_CDN + "images/create/fallings/xing.png",
                    rotate: 180,
                    vy: 3
                }, {
                    name: "雪花",
                    path: CLIENT_CDN + "images/create/fallings/snow.png",
                    rotate: 0,
                    vy: 1
                }], f.scratch.image = f.scratches[0], f.scratch.percentage = f.percentages[0], f.finger.zwImage = f.fingerZws[0], f.finger.bgImage = f.fingerBackgrounds[0], f.$on("dom.changed", function() {
                    d($(".nr"))(f)
                }), f.openUploadModal = function() {
                    y || (y = m.open({
                        windowClass: "upload-console",
                        templateUrl: "my/upload.tpl.html",
                        controller: "UploadCtrl",
                        resolve: {
                            category: function() {
                                return {
                                    categoryId: "0",
                                    fileType: "1",
                                    scratch: "scratch"
                                }
                            }
                        }
                    }).result.then(function(a) {
                        f.scratch.image.path = f.PREFIX_FILE_HOST + a, f.scratch.image.name = "", y = null
                    }, function() {
                        y = null
                    }))
                }, f.cancel = function() {}, f.cancelEffect = function() {
                    f.effectType = "", $("#modalBackdrop1").remove()
                };
                var z = null;
                f.$on("showCropPanel", function(a, b) {
                    var c = $(".content").eq(0);
                    z ? (e.$broadcast("changeElemDef", b), z.show()) : z = d("<div crop-image></div>")(f), c.append(z)
                }), f.saveEffect = function(a) {
                    if (f.tpl.obj.properties = {}, "scratch" == f.effectType) f.tpl.obj.properties.scratch = a, f.effectName = "涂抹";
                    else if ("finger" == f.effectType) f.tpl.obj.properties.finger = a, f.effectName = "指纹";
                    else if ("money" == f.effectType) {
                        if (a && a.tip && i(a.tip) > 24) return alert("提示文字不能超过24个字符！"), void(f.tpl.obj.properties = null);
                        a || (a = {
                            tip: "握紧钱币，数到手抽筋吧！"
                        }), f.tpl.obj.properties.effect = {
                            name: "money",
                            tip: a.tip
                        }, f.effectName = "数钱"
                    }
                    "fallingObject" == f.effectType && (f.tpl.obj.properties.fallingObject = a, f.effectName = "环境"), f.saveScene(), f.cancelEffect()
                };
                var A = null;
                f.$on("showStylePanel", function(a, b) {
                    var c = $(".content").eq(0);
                    A ? A.show() : "style" == b.activeTab ? A = d('<div style-modal active-tab="style"></div>')(f) : "anim" == b.activeTab && (A = d('<div style-modal active-tab="anim"></div>')(f)), c.append(A)
                }), f.$on("hideStylePanel", function() {
                    A && A.hide()
                });
                var z = null;
                f.$on("showCropPanel", function(a, b) {
                    var c = $(".content").eq(0);
                    z ? (e.$broadcast("changeElemDef", b), z.show()) : z = d("<div crop-image></div>")(f), c.append(z)
                }), f.navTo = function(a, b) {
                    f.pageList = !0, !f.isEditor || 1101 !== f.sceneId && 1102 !== f.sceneId && 1103 !== f.sceneId || (f.pageLabelAll.length = 0, f.pageIdTag = a.id, f.getPageTagLabel()), a.id != f.tpl.obj.id && f.saveScene(null, function() {
                        s(b + 1), j.$$search = {}, j.search("pageId", a.num)
                    })
                }, f.stopCopy = function() {
                    q = !1
                }, f.getOriginPageName = function(a) {
                    x = a.name
                }, f.getPageNames = function() {
                    var a = g.sceneId;
                    k.getPageNames(a).then(function(a) {
                        f.pages = a.data.list, b.forEach(f.pages, function(a, b) {
                            a.name || (a.name = "第" + (b + 1) + "页")
                        }), s(j.search().pageId ? j.search().pageId : f.pages[0].num)
                    })
                }, f.getPageNames(), f.editableStatus = [], f.savePageNames = function(a, b) {
                    a.name || (a.name = "第" + (b + 1) + "页"), f.tpl.obj.name = a.name, x != a.name && k.savePageNames(f.tpl.obj).then(function() {})
                }, f.stopCopy = function() {
                    q = !1
                }, f.removeScratch = function(a) {
                    a.stopPropagation(), f.tpl.obj.properties = null
                }, f.$on("text.click", function(a, b) {
                    $("#btn-toolbar").remove(), $("body").append(d("<toolbar></toolbar>")(f));
                    var e = $(b).offset().top;
                    c(function() {
                        $("#btn-toolbar").css("top", e - 50), $("#btn-toolbar").show(), $("#btn-toolbar").bind("click mousedown", function(a) {
                            a.stopPropagation()
                        }), $(b).wysiwyg_destroy(), $(b).wysiwyg(), b.focus()
                    })
                }), f.updatePosition = function(a) {
                    var b, c, d = f.tpl.obj.elements,
                        e = [];
                    for (c = 0; c < d.length; c++)
                        if ("3" == d[c].type) {
                            d[c].num = 0, e.push(d[c]), d.splice(c, 1);
                            break
                        }
                    for (b = 0; b < a.length; b++)
                        for (c = 0; c < d.length; c++)
                            if (d[c].num == a[b]) {
                                d[c].num = b + 1, e.push(d[c]), d.splice(c, 1);
                                break
                            }
                    f.tpl.obj.elements = e
                }, f.updateEditor = function() {
                    $(".nr").empty(), k.templateEditor.parse({
                        def: f.tpl.obj,
                        appendTo: ".nr",
                        mode: "edit"
                    }), d($(".nr"))(f)
                }, f.saveScene = function(a, c) {
                    return w == JSON.stringify(f.tpl) ? (c && c(), void(a && (!f.tpl.obj.scene.publishTime || f.tpl.obj.scene.updateTime > f.tpl.obj.scene.publishTime ? t() : r.pushForCurrentRoute("scene.save.success.published", "notify.success")))) : ("" === f.tpl.obj.scene.name && (f.tpl.obj.scene.name = v), f.tpl.obj.scene.name = f.tpl.obj.scene.name.replace(/(<([^>]+)>)/gi, ""), k.getSceneObj().obj.scene.image && k.getSceneObj().obj.scene.image.bgAudio && (f.tpl.obj.scene.image || (f.tpl.obj.scene.image = {}), f.tpl.obj.scene.image.bgAudio = k.getSceneObj().obj.scene.image.bgAudio), k.resetCss(), f.tpl.obj.scene.image.isAdvancedUser = e.isAdvancedUser || e.isVendorUser ? !0 : !1, void k.saveScene(f.tpl.obj).then(function() {
                        f.tpl.obj.scene.updateTime = (new Date).getTime(), w = b.toJson(f.tpl), u && (k.recordTplUsage(u), u = null), c && c(), a && t()
                    }, function() {}))
                }, f.publishScene = function() {
                    return f.tpl.obj.scene.publishTime && f.tpl.obj.scene.updateTime <= f.tpl.obj.scene.publishTime && w == b.toJson(f.tpl) ? void j.path("my/scene/" + f.sceneId) : void f.saveScene(null, function() {
                        k.publishScene(f.tpl.obj.sceneId).then(function(a) {
                            a.data.success && (r.pushForNextRoute("scene.publish.success", "notify.success"), q = !1, j.path(f.tpl.obj.scene.publishTime ? "my/scene/" + f.sceneId : "my/sceneSetting/" + f.sceneId))
                        })
                    })
                }, f.exitScene = function() {
                    q = !1, w == b.toJson(f.tpl) ? p.history.back() : n.openConfirmDialog({
                        msg: "是否保存更改内容？",
                        confirmName: "保存",
                        cancelName: "不保存"
                    }, function() {
                        f.saveScene(), p.history.back()
                    }, function() {
                        p.history.back()
                    })
                }, f.duplicatePage = function() {
                    f.saveScene(null, function() {
                        s(f.pageNum, !1, !0)
                    })
                }, f.insertPage = function() {
                    f.saveScene(null, function() {
                        s(f.pageNum, !0, !1)
                    }), $("#pageList").height() >= 360 && c(function() {
                        var a = document.getElementById("pageList");
                        a.scrollTop = a.scrollHeight
                    }, 200)
                }, f.deletePage = function(a) {
                    a.stopPropagation(), f.loading || (f.loading = !0, k.deletePage(f.tpl.obj.id).then(function() {
                        f.loading = !1, j.$$search = {}, f.pages.length == f.pageNum ? (f.pages.pop(), j.search("pageId", --f.pageNum), s(f.pageNum, !1, !1)) : (f.pages.splice(f.pageNum - 1, 1), j.search("pageId", f.pageNum), s(f.pageNum, !1, !1))
                    }, function() {
                        f.loading = !1
                    }))
                }, f.removeBG = function(a) {
                    a.stopPropagation();
                    var b, c = f.tpl.obj.elements;
                    for (b = 0; b < c.length; b++)
                        if (3 == c[b].type) {
                            c.splice(b, 1);
                            var d;
                            for (d = b; d < c.length; d++) c[d].num--;
                            break
                        }
                    $(".edit_area").parent().css({
                        backgroundColor: "transparent",
                        backgroundImage: "none"
                    }), $("#editBG").hide()
                }, f.removeBGAudio = function(a) {
                    a.stopPropagation(), delete f.tpl.obj.scene.image.bgAudio
                }, $(".scene_title").on("paste", function(a) {
                    a.preventDefault();
                    var b = (a.originalEvent || a).clipboardData.getData("text/plain") || prompt("Paste something..");
                    document.execCommand("insertText", !1, b)
                }), f.showPageEffect = !1, f.openPageSetPanel = function() {
                    f.showPageEffect || (f.showPageEffect = !0, $('<div id="modalBackdrop" class="modal-backdrop fade in" ng-class="{in: animate}" ng-style="{\'z-index\': 1040 + (index &amp;&amp; 1 || 0) + index*10}" modal-backdrop="" style="z-index: 1040;"></div>').appendTo("body").click(function() {
                        f.showPageEffect = !1, f.$apply(), $(this).remove()
                    }))
                }, f.openOneEffectPanel = function(a) {
                    f.showPageEffect = !1, $("#modalBackdrop").remove(), f.effectType = a.type ? a.type : a.image || a.scratch ? "scratch" : a.finger ? "finger" : a.fallingObject ? "fallingObject" : a.effect.name, $('<div id="modalBackdrop1" class="modal-backdrop fade in" ng-class="{in: animate}" ng-style="{\'z-index\': 1040 + (index &amp;&amp; 1 || 0) + index*10}" modal-backdrop="" style="z-index: 1040;"></div>').appendTo("body").click(function() {
                        f.effectType = "", f.$apply(), $(this).remove()
                    })
                }, f.getPageTplsByType = function(a) {
                    D(a)
                };
                var B = function() {
                        var a = "1" == f.type ? 3 : 4;
                        f.childCatrgoryList && f.childCatrgoryList.length > a ? (f.otherCategory = f.childCatrgoryList.slice(a), f.childCatrgoryList = f.childCatrgoryList.slice(0, a)) : f.otherCategory = []
                    },
                    C = {},
                    D = function(a) {
                        C[a] ? (f.childCatrgoryList = C[a], B(), f.getPageTplTypestemp(f.childCatrgoryList[0].id, a)) : l.getPageTagLabel(a).then(function(b) {
                            f.childCatrgoryList = C[a] = b.data.list, B(), f.getPageTplTypestemp(f.childCatrgoryList[0].id, a)
                        })
                    },
                    E = {};
                f.getPageTagLabel = function(a) {
                    E[a] ? (f.pageLabel = E[a], G()) : l.getPageTagLabel(a).then(function(b) {
                        f.pageLabel = E[a] = b.data.list, G()
                    })
                }, f.pageLabelAll = [];
                var F, G = function() {
                    l.getPageTagLabelCheck(f.pageIdTag).then(function(a) {
                        F = a.data.list;
                        for (var b = 0; b < f.pageLabel.length; b++) {
                            for (var c = {
                                id: f.pageLabel[b].id,
                                name: f.pageLabel[b].name
                            }, d = 0; d < F.length; d++) {
                                if (F[d].id === f.pageLabel[b].id) {
                                    c.ischecked = !0;
                                    break
                                }
                                c.ischecked = !1
                            }
                            f.pageLabelAll.push(c)
                        }
                    })
                };
                f.pageChildLabel = function() {
                    var a, b = [];
                    for (a = 0; a < f.pageLabelAll.length; a++) f.pageLabelAll[a].ischecked && b.push(f.pageLabelAll[a].id);
                    l.updataChildLabel(b, f.pageIdTag).then(function() {
                        alert("分配成功！"), h.reload()
                    }, function() {})
                }, f.getPageTplTypestemp = function(a, b) {
                    l.getPageTplTypestemp(a, b).then(function(b) {
                        if (f.categoryId = a, f.pageTpls = b.data.list && b.data.list.length > 0 ? b.data.list : [], f.otherCategory.length > 0) {
                            var c;
                            c = f.childCatrgoryList[0];
                            for (var d = 0; d < f.otherCategory.length; d++) f.categoryId == f.otherCategory[d].id && (f.childCatrgoryList[0] = f.otherCategory[d], f.otherCategory[d] = c)
                        }
                    })
                }, l.getPageTplTypes().then(function(a) {
                    f.pageTplTypes = a.data.list && a.data.list.length > 0 ? a.data.list.splice(0, 3) : []
                }).then(function() {
                    f.getPageTplsByType(f.pageTplTypes[0].value)
                }), f.exitPageTplPreview = function() {
                    $(".nr").empty(), k.templateEditor.parse({
                        def: f.tpl.obj,
                        appendTo: ".nr",
                        mode: "edit"
                    }), e.$broadcast("dom.changed")
                }, f.insertPageTpl = function(a) {
                    f.loading = !0;
                    var b = function(a) {
                        k.getSceneTpl(a).then(function(a) {
                            f.loading = !1, u = a.data.obj.id, f.tpl.obj.elements = k.getElements(), $(".nr").empty(), k.templateEditor.parse({
                                def: f.tpl.obj,
                                appendTo: ".nr",
                                mode: "edit"
                            }), e.$broadcast("dom.changed")
                        }, function() {
                            f.loading = !1
                        })
                    };
                    f.tpl.obj.elements && f.tpl.obj.elements.length > 0 ? n.openConfirmDialog({
                        msg: "页面模板会覆盖编辑区域已有组件，是否继续？",
                        confirmName: "是",
                        cancelName: "取消"
                    }, function() {
                        b(a)
                    }) : b(a)
                }, f.chooseThumb = function() {
                    m.open({
                        windowClass: "console",
                        templateUrl: "scene/console/bg.tpl.html",
                        controller: "BgConsoleCtrl",
                        resolve: {
                            obj: function() {
                                return {
                                    fileType: "0"
                                }
                            }
                        }
                    }).result.then(function(a) {
                        f.tpl.obj.properties || (f.tpl.obj.properties = {}), f.tpl.obj.properties.thumbSrc = a.data
                    }, function() {
                        f.tpl.obj.properties.thumbSrc = null
                    })
                }, $(a).bind("beforeunload", function() {
                    return "请确认您的场景已保存"
                }), f.$on("$destroy", function() {
                    $(a).unbind("beforeunload")
                }), f.sortableOptions = {
                    placeholder: "ui-state-highlight ui-sort-position",
                    containment: "#containment",
                    update: function(a, b) {
                        var c = b.item.sortable.dropindex + 1,
                            d = f.pages[b.item.sortable.index].id;
                        f.saveScene(null, function() {
                            k.changePageSort(c, d).then(function() {
                                s(c, !1, !1, !0), j.$$search = {}, j.search("pageId", c), f.pageNum = c
                            })
                        })
                    }
                }
            }
        ]).directive("changeColor", function() {
            return {
                link: function(a, b) {
                    b.bind("click", function() {
                        $(b).addClass("current")
                    })
                }
            }
        }), b.module("scene.create.new", ["services.scene"]), b.module("scene.create.new").controller("SceneNewCtrl", ["$scope", "$location", "sceneService", "items",
            function(a, c, d, e) {
                a.scene = {
                    name: ""
                }, e && (a.scene.name = e.name), d.getSceneType().then(function(c) {
                    a.scene.devices= c.data.devices;
                    a.scene.deviceID=c.data.devices[0];
                    a.scene.types = c.data.list, e ? b.forEach(a.scene.types, function(b) {
                        var c = "" + e.type;
                        b.value === c && (a.scene.type = b)
                    }) : a.scene.type = c.data.list[0]
                }), a.create = function() {
                    if ("" === a.scene.name.trim()) return void alert("请输入场景名称");
                    var b = i(a.scene.name.trim());
                    if (b > 12) return void alert("场景名称不能超过12个字符或6个汉字");
                    b = i(a.scene.subtitle.trim());
                    if (b > 14) return void alert("场景名称不能超过14个字符或7个汉字");
                    if (e) {
                        var f = {
                            id: e.id,
                            name: a.scene.name,
                            type: a.scene.type.value,
                            subtitle: a.scene.subtitle,
                            deviceID: a.scene.deviceID.id,
                            pageMode: a.scene.pageMode.id
                        };
                        d.createByTpl(f).then(function(a) {
							if(a.data.code == 1006){
								alert("您的"+a.data.msg+"次创建场景次数已经用完，请联系管理员！")
								return false;
							}
                            c.path("scene/create/" + a.data.obj), c.search("pageId", 1)
                        }, function() {})
                    } else d.createBlankScene(a.scene.name, a.scene.type.value, a.scene.pageMode.id).then(function(a) {
						if(a.data.code == 1006){
								alert("您的"+a.data.msg+"次创建场景次数已经用完，请联系管理员！")
								return false;
							}
                        c.path("scene/create/" + a.data.obj), c.search("pageId", 1)
                    });
                    a.$close()
                }, a.cancel = function() {
                    a.$dismiss()
                }, a.pagemodes = [{
                    id: 2,
                    name: "上下翻页"
                }, {
                    id: 1,
                    name: "左右翻页"
                }], a.scene.pageMode = a.pagemodes[0]
            }
        ]), b.module("scene", ["scene.create", "services.scene", "scene.create.new", "app.directives.addelement"]), b.module("scene").controller("SceneCtrl", ["$window", "$scope", "$location", "sceneService", "$modal",
            function(b, c, d, e, f) {
                c.PREFIX_FILE_HOST = PREFIX_FILE_HOST, c.PREFIX_CLIENT_HOST = PREFIX_HOST, c.isActive = "scene", c.scene = {
                    type: null
                }, c.totalItems = 0, c.currentPage = 1, c.toPage = "", c.tabindex = 0, c.childcat = 0, c.order = "new";
                var g = 12,
                    h = 0;
                c.pageChanged = function(a) {
                    return i.targetPage = a, 1 > a || a > c.totalItems / 11 + 1 ? void alert("此页超出范围") : void c.getPageTpls(1, i.sceneType, i.tagId, a, g, c.order)
                }, c.preview = function(b) {
                    var c = VIEW_URL + "v-" + b;
                    a.open(c, "_blank")
                }, c.createScene = function(a) {
                    f.open({
                        windowClass: "login-container",
                        templateUrl: "scene/createNew.tpl.html",
                        controller: "SceneNewCtrl",
                        resolve: {
                            items: function() {
                                return a
                            }
                        }
                    })
                }, c.getStyle = function(a) {
                    return {
                        "background-image": "url(" + ((a.indexOf('syspic/') >= 0) ? PREFIXSYS_FILE_HOST : USER_FILE_HOST) + a + ")"
                    }
                }, c.show = function(a) {
                    console.log(a.target), $(a.target).children(".cc").css("display", "block")
                }, e.getSceneType().then(function(a) {
                    c.pageTplTypes = a.data.list && a.data.list.length > 0 ? a.data.list : []
                }).then(function() {}), c.tplnew = function(a) {
                    c.order = a, i.orderby = a, i.tagId ? c.getPageTpls(null, i.sceneType, i.tagId, h, g, a) : c.getPageTpls(1)
                };
                var i = {
                        sceneType: null,
                        tagId: "",
                        orderby: "new",
                        pageNo: "0",
                        targetPage: ""
                    },
                    j = {};
                c.getPageTplsByType = function(a) {
                    i.sceneType = a, c.childcat = a, c.categoryId = 0, j[a] ? (c.childCatrgoryList = j[a], c.getPageTpls(1, i.sceneType, c.childCatrgoryList[0].id, h, g, c.order)) : e.getPageTplTypesTwo(a, a).then(function(b) {
                        c.childCatrgoryList = j[a] = b.data.list, c.getPageTpls(1, i.sceneType, c.childCatrgoryList[0].id, h, g, c.order)
                    })
                }, c.allpage = function(a) {
                    i.sceneType = a, c.childcat = 0, c.getPageTpls(1), c.childCatrgoryList = []
                }, c.getPageTpls = function(a, b, d, f, g) {
                    var g = 11;
                    c.categoryId = d, i.tagId = d, e.getPageTpls(a, b, d, f, g, i.orderby).then(function(a) {
                        a.data.list && a.data.list.length > 0 ? (c.tpls = a.data.list, c.totalItems = a.data.map.count, c.currentPage = a.data.map.pageNo, c.allPageCount = a.data.map.count, c.toPage = "") : c.tpls = []
                    })
                }, c.getPageTpls(1)
            }
        ]), b.module("usercenter.relAccount", ["services.usercenter"]), b.module("usercenter.relAccount").controller("RelAccountCtrl", ["$rootScope", "$scope", "$window", "$routeParams", "usercenterService", "security", "$modal", "ModalService", "$location", "userinfo",
            function(a, c, d, e, f, g, h, i, j, k) {
                c.relAccount = function() {
                    var d = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
                    return d.test(c.user.email) ? c.user.password.trim() ? void f.relAccount(k.id, c.user.email, c.user.password).then(function(d) {
                        if (200 == d.data.code) {
                            alert("绑定成功！"), /qq/gi.test(d.data.msg) && (c.relType = "qq"), /weixin/gi.test(d.data.msg) && (c.relType = "weixin"), /weibo/gi.test(d.data.msg) && (c.relType = "weibo");
                            var e = {
                                type: c.relType,
                                email: b.copy(c.user.email)
                            };
                            c.$close(e), a.$broadcast
                        } else c.relErr = d.data.msg
                    }, function() {
                        c.$dismiss()
                    }) : void alert("密码不能为空！") : void alert("请输入正确得邮箱格式")
                }, c.checkUpperCase = function() {
                    /[A-Z]/g.test(c.user.email) && (c.user.email = c.user.email.toLowerCase(), alert("请用小写字母邮箱注册，已将邮箱中的大写字母自动转换成小写"))
                }, c.cancel = function() {
                    c.$dismiss()
                }
            }
        ]), b.module("usercenter.request", ["services.usercenter", "app.directives.qrcode"]), b.module("usercenter.request").controller("UsercenterrequestCtrl", ["$rootScope", "$scope", "$window", "$routeParams", "usercenterService", "security", "$modal", "ModalService", "$location",
            function(a, b, c, d, e, f) {
                b.PREFIX_CLIENT_HOST = PREFIX_HOST, b.currentUser = f.currentUser, b.cancel = function() {
                    b.$dismiss()
                }
            }
        ]), b.module("usercenter.transfer", ["services.usercenter"]), b.module("usercenter.transfer").controller("UsercentertransferCtrl", ["$rootScope", "$scope", "$window", "$routeParams", "usercenterService", "security", "$modal", "ModalService", "$location", "username",
            function(a, b, c, d, e, f, g, h, i, j) {
                b.actionerror = !1, b.retrieverror = !1, b.transfer = !0, b.userXd = {
                    toUser: "",
                    xdCount: ""
                }, b.submit = !1, b.getUserXd = function() {
                    e.getUserXd().then(function(a) {
                        a.data.success && (b.xdCount = a.data.obj)
                    })
                }, b.getUserXd(), b.confirm = function() {
                    b.submit = !0, b.getgiveXd()
                }, b.getgiveXd = function() {
                    return b.userXd.toUser ? b.userXd.toUser == j ? void(b.actionerror = "不能把积分转送给自己") : /^\+?[1-9][0-9]*$/.test(b.userXd.xdCount) ? (b.userXd.xdCount > b.xdCount && (b.retrieverror = "积分不足"), void e.getgiveXd(b.userXd).then(function(a) {
                        200 == a.data.code ? b.transfer = !1 : 1003 == a.data.code ? (b.actionerror = a.data.msg, b.retrieverror = "") : 1010 == a.data.code && (b.retrieverror = a.data.msg, b.actionerror = "")
                    })) : void(b.retrieverror = "正确填写积分数目") : void(b.actionerror = "账号不能为空")
                }, b.cancel = function() {
                    b.$dismiss()
                }
            }
        ]), b.module("usercenter", ["usercenter.transfer", "usercenter.request", "services.usercenter", "services.localizedMessages", "security.service", "app.directives.addelement", "services.modal", "usercenter.relAccount"]), b.module("usercenter").controller("UserCenterCtrl", ["$rootScope", "$scope", "$window", "$routeParams", "usercenterService", "security", "$modal", "ModalService", "$location", "$filter", "fixnumFilter",
            function(a, c, d, e, f, g, h, i, j) {
                c.PREFIX_FILE_HOST = PREFIX_FILE_HOST, c.PREFIX_SERVER_HOST = PREFIX_URL, c.PREFIX_CLIENT_HOST = PREFIX_HOST, c.isVendorUser = g.isVendorUser(), c.password = {}, c.pageSize = 5, c.XdpageSize = 10, c.XdpageNo = 1, c.XdtoPage = "", c.pageNo = 1, c.XdcurrentPage = 1, c.msgCurrentPage = 1, c.toPage = 1, c.getUserInfo = function() {
                    f.getUserInfo().then(function(a) {
                        c.userinfo = a.data.obj, c.master = b.copy(c.userinfo), c.userinfo.headImg ? /^http.*/.test(c.userinfo.headImg) && (c.headImg = c.userinfo.headImg) : c.headImg = CLIENT_CDN + "images/defaultuser.jpg";
                        var d = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
                        "eqs" != c.userinfo.loginName.substr(0, 3) || d.test(c.userinfo.loginName) || (c.userinfo.noRel = "未绑定", c.showRelButton = !0), /qq/gi.test(c.userinfo.relType) && (c.qqRel = !0), /weixin/gi.test(c.userinfo.relType) && (c.wxRel = !0), /weibo/gi.test(c.userinfo.relType) && (c.wbRel = !0)
                    })
                }, c.getUserInfo(), c.saveUserInfo = function(a) {
                    var b = /^1\d{10}$/;
                    if (a.phone && !b.test(a.phone)) return alert("手机号码格式错误"), void(a.phone = "");
                    var d = /(^[1-9]\d*$)/;
                    if (a.qq && !d.test(a.qq)) return alert("qq号码格式错误"), void(a.qq = "");
                    if (a.tel && !d.test(a.tel)) return alert("电话号码格式错误"), void(a.tel = "");
                    var e = {
                        id: a.id,
                        name: a.name,
                        sex: a.sex,
                        phone: a.phone,
                        tel: a.tel,
                        qq: a.qq,
                        headImg: a.headImg
                    };
                    f.saveUserInfo(e).then(function(a) {
                        a.data.success && (c.isEditable = !1, alert("保存成功"))
                    })
                }, c.tabid = e.id, c.getUserXd = function() {
                    f.getUserXd().then(function(a) {
                        a.data.success && (c.xdCounts = a.data.obj)
                    })
                }, c.getUserXd(), c.getXdlog = function(a) {
                    var b = a;
                    f.getXdlog(b, c.XdpageSize).then(function(a) {
                        a.data.success && (c.xdLogs = a.data.list, c.XdCount = a.data.map.count, c.XdcurrentPage = a.data.map.pageNo, c.XdNumPages = Math.ceil(c.XdCount / c.XdpageSize))
                    })
                }, c.getXdlog(c.XdpageNo), c.XdpageChanged = function(a) {
                    c.XdcurrentPage = a, c.getXdlog(a)
                }, c.getXdStat = function() {
                    f.getXdStat().then(function(a) {
                        c.getXdStat = a.data.map
                    })
                }, c.getXdStat(), c.reset = function() {
                    return c.password.newPw != c.password.confirm ? (c.authError = "新密码与重复密码不一致", c.password.newPw = "", c.password.confirm = "", void $('input[name="newPassword"]').focus()) : b.equals(c.master, c.password) ? void alert("请不要重复提交！") : void g.resetPassword(c.password.old, c.password.newPw).then(function(a) {
                        a.data.success ? (c.authError = "", alert("修改成功"), c.master = b.copy(c.password)) : c.authError = a.data.msg
                    })
                }, c.openXd = function() {
                    h.open({
                        windowClass: "transfer_contain",
                        templateUrl: "usercenter/transfer.tpl.html",
                        controller: "UsercentertransferCtrl",
                        resolve: {
                            username: function() {
                                return c.userinfo.loginName
                            }
                        }
                    }).result.then(function() {}, function() {})
                }, c.customerUpload = function() {
                    h.open({
                        windowClass: "upload-console",
                        templateUrl: "my/upload.tpl.html",
                        controller: "UploadCtrl",
                        resolve: {
                            category: function() {
                                return {
                                    categoryId: "0",
                                    fileType: "1",
                                    headerImage: "headerImage"
                                }
                            }
                        }
                    }).result.then(function(a) {
                        $showCustomButton = !1, c.userinfo.headImg = a;
                        var b = {
                            headImg: a,
                            id: c.userinfo.id
                        };
                        f.saveUserInfo(b).then(function(a) {
                            a.data.success && (c.isEditable = !1, alert("保存成功"))
                        })
                    }, function() {})
                }, c.cancel = function() {
                    c.userinfo = b.copy(c.master), c.isEditable = !1
                }, c.getUserMsg = function(a) {
                    var d = a;
                    f.getNewMessage(d, c.pageSize).then(function(a) {
                        b.forEach(a.data.list, function(a) {
                            1 == a.bizType ? a.type = "系统通知" : 2 == a.bizType ? a.type = "审核通知" : 3 == a.bizType && (a.type = "活动通知")
                        }), c.newMsgs = a.data.list, c.msgCount = a.data.map.count, c.msgNumPages = Math.ceil(c.msgCount / c.pageSize)
                    })
                }, c.getUserMsg(c.pageNo), c.$watch("msgCurrentPage", function(a, b) {
                    a != b && (c.getUserMsg(a), c.toPage = a)
                }), c.pageChanged = function(a) {
                    c.msgCurrentPage = a
                }, c.setRead = function(c) {
                    var d = [];
                    b.forEach(c, function(a) {
                        1 == a.status && this.push(a.id)
                    }, d);
                    var e = d.join();
                    f.setRead(e).then(function(e) {
                        200 == e.data.code && (a.$broadcast("minusCount", d.length), b.forEach(c, function(a) {
                            a.status = 2
                        }))
                    })
                }, c.goBaseInfo = function() {
                    j.path("/usercenter/userinfo", !1), c.tabid = "userinfo"
                }, c.goXd = function() {
                    j.path("/usercenter/xd", !1), c.tabid = "xd"
                }, c.goReset = function() {
                    j.path("/usercenter/reset", !1), c.tabid = "reset"
                }, c.goMessage = function() {
                    j.path("/usercenter/message", !1), c.tabid = "message"
                }, c.goAccount = function() {
                    j.path("/usercenter/account", !1), c.tabid = "account"
                }, c.relAccount = function() {
                    h.open({
                        windowClass: "transfer_contain",
                        templateUrl: "usercenter/console/relAccount.tpl.html",
                        controller: "RelAccountCtrl",
                        resolve: {
                            userinfo: function() {
                                return {
                                    id: c.userinfo.id
                                }
                            }
                        }
                    }).result.then(function(a) {
                        console.log(a), c.userinfo.noRel = null, c.userinfo.loginName = a.email, /qq/gi.test(a.type) && (c.qqRel = !0), /weixin/gi.test(a.type) && (c.wxRel = !0), /weibo/gi.test(a.type) && (c.wbRel = !0)
                    }, function() {})
                }
            }
        ]), b.module("app.directives.addelement", []).directive("addElement", ["$compile",
            function(a) {
                return {
                    restrict: "EA",
                    link: function(c, d, e) {
                        var f = $("#emailAddress"),
                            g = $("#emailAddress").size() + 1;
                        d.bind("click", function() {
                            var d = b.element('<div><input type="text" id="p_scnt" style="width:100%; height: 30px; margin-top: 15px;" ng-model="attrs.addElement" name="p_scnt_' + g + '" placeholder="Input Value" /></div>');
                            f.append(d);
                            var h = d.find("input");
                            console.log(e.addElement), a(h)(c), g++
                        })
                    }
                }
            }
        ]).directive("showIcon", ["$compile", "$timeout",
            function(a) {
                return {
                    restrict: "EA",
                    require: "ngModel",
                    scope: {
                        check: "&callbackFn"
                    },
                    link: function(b, c, d, e) {
                        var f, g, h = a('<a><span class = "glyphicon glyphicon-ok-circle" ng-show="enabled" style = "margin-top: 8px; color: #9ad64b; font-size: 15px;"></span></a>')(b);
                        b.update = function() {
                            c[0].blur(), b.check({
                                arg1: {
                                    name: e.$name
                                }
                            })
                        }, c.bind("focus", function() {
                            f = e.$viewValue, c.parent().after(h), b.enabled = !0, ("email" === d.name || "mobile" === d.name || "tel" === d.name) && (b.enabled = !1), b.$apply()
                        }).bind("blur", function() {
                            b.enabled = !1, g = e.$viewValue;
                            var a = new RegExp(/(\d{11})|^((\d{7,8})|(\d{4}|\d{3})-(\d{7,8})|(\d{4}|\d{3})-(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1})|(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1}))$/g);
                            if ("mobile" === d.name && g && !a.test(c.val())) return void alert("手机号码格式错误");
                            if ("email" === d.name && g) {
                                var h = new RegExp(/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/g);
                                if (!h.test(c.val())) return void alert("邮箱格式错误")
                            }(g || f) && f !== g && b.update(), b.$apply()
                        })
                    }
                }
            }
        ]).directive("ngHover", function() {
            return {
                restrict: "EA",
                link: function(a, b) {
                    $(b).hover(function() {
                        $(b.children()[0]).css("display", "block"), $(b.children()[3]).css("display", "block"), $(b.children()[4]).css("display", "block")
                    }, function() {
                        $(b.children()[0]).css("display", "none"), $(b.children()[3]).css("display", "none"), $(b.children()[4]).css("display", "none")
                    })
                }
            }
        }).directive("imgClick", function() {
            return {
                restrict: "EA",
                link: function(a, b) {
                    $(b).bind("click", function() {
                        $(b).find("img").css("border", "4px solid #F60"), $(b).siblings().find("img").css("border", 0)
                    })
                }
            }
        }).directive("customFocus", function() {
            return {
                restrict: "EA",
                link: function(a, b) {
                    $(b).siblings().bind("click", function() {
                        b[0].focus()
                    })
                }
            }
        }).directive("blurChildren", function() {
            return {
                restrict: "EA",
                link: function(a, b) {
                    $(b).on("click", function(a) {
                        (a.target == b[0] || $(a.target).hasClass("badge")) && $(".blurClass").find("input:visible").blur()
                    })
                }
            }
        }).directive("forbiddenClose", function() {
            return {
                restrict: "EA",
                link: function(a, b) {
                    $(b).on("click", function(a) {
                        a.stopPropagation()
                    })
                }
            }
        }).directive("customeImage", function() {
            return {
                restrict: "EA",
                link: function(a, b) {
                    $(b).hover(function() {
                        $("<div><a></a></div>")
                    }, function() {})
                }
            }
        }).directive("slides", function() {
            return {
                restrict: "EA",
                link: function(a, b) {
                    $(b).slides({
                        preload: !0,
                        play: 5e3,
                        pause: 2500,
                        hoverPause: !0
                    })
                }
            }
        }).directive("addClass", function() {
            return {
                restrict: "EA",
                link: function(a, b) {
                    $(b).closest(".textbox-wrap").find("[autofocus]").focus(), $(b).on("blur", function() {
                        $(b).closest(".textbox-wrap").removeClass("focused")
                    }).on("focus", function() {
                        $(b).closest(".textbox-wrap").addClass("focused")
                    })
                }
            }
        }).directive("loadScript", ["$http", "$timeout", "$rootScope",
            function(a) {
                return {
                    link: function(c, d) {
                        var e = function() {
                            c.captchaLoaded = !0
                        };
                        c.$watch(function() {
                            return d[0].getAttribute("src")
                        }, function(b) {
                            b && a.jsonp(d[0].getAttribute("src")).success(e).error(e)
                        }), c.$on("$destroy", function() {
                            b.element(".gt_widget").remove()
                        })
                    }
                }
            }
        ]), b.module("colorpicker.module", []).factory("Helper", function() {
            return {
                closestSlider: function(a) {
                    var b = a.matches || a.webkitMatchesSelector || a.mozMatchesSelector || a.msMatchesSelector;
                    return b.bind(a)("I") ? a.parentNode : a
                },
                getOffset: function(a, b) {
                    for (var c = 0, d = 0, e = 0, f = 0; a && !isNaN(a.offsetLeft) && !isNaN(a.offsetTop);) c += a.offsetLeft, d += a.offsetTop, b || "BODY" !== a.tagName ? (e += a.scrollLeft, f += a.scrollTop) : (e += document.documentElement.scrollLeft || a.scrollLeft, f += document.documentElement.scrollTop || a.scrollTop), a = a.offsetParent;
                    return {
                        top: d,
                        left: c,
                        scrollX: e,
                        scrollY: f
                    }
                },
                stringParsers: [{
                    re: /rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*(?:,\s*(\d+(?:\.\d+)?)\s*)?\)/,
                    parse: function(a) {
                        return [a[1], a[2], a[3], a[4]]
                    }
                }, {
                    re: /rgba?\(\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d+(?:\.\d+)?)\s*)?\)/,
                    parse: function(a) {
                        return [2.55 * a[1], 2.55 * a[2], 2.55 * a[3], a[4]]
                    }
                }, {
                    re: /#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/,
                    parse: function(a) {
                        return [parseInt(a[1], 16), parseInt(a[2], 16), parseInt(a[3], 16)]
                    }
                }, {
                    re: /#([a-fA-F0-9])([a-fA-F0-9])([a-fA-F0-9])/,
                    parse: function(a) {
                        return [parseInt(a[1] + a[1], 16), parseInt(a[2] + a[2], 16), parseInt(a[3] + a[3], 16)]
                    }
                }]
            }
        }).factory("Color", ["Helper",
            function(a) {
                return {
                    value: {
                        h: 1,
                        s: 1,
                        b: 1,
                        a: 1
                    },
                    rgb: function() {
                        var a = this.toRGB();
                        return "rgb(" + a.r + "," + a.g + "," + a.b + ")"
                    },
                    rgba: function() {
                        var a = this.toRGB();
                        return "rgba(" + a.r + "," + a.g + "," + a.b + "," + a.a + ")"
                    },
                    hex: function() {
                        return this.toHex()
                    },
                    RGBtoHSB: function(a, b, c, d) {
                        a /= 255, b /= 255, c /= 255;
                        var e, f, g, h;
                        return g = Math.max(a, b, c), h = g - Math.min(a, b, c), e = 0 === h ? null : g === a ? (b - c) / h : g === b ? (c - a) / h + 2 : (a - b) / h + 4, e = (e + 360) % 6 * 60 / 360, f = 0 === h ? 0 : h / g, {
                            h: e || 1,
                            s: f,
                            b: g,
                            a: d || 1
                        }
                    },
                    setColor: function(b) {
                        b = b.toLowerCase();
                        for (var c in a.stringParsers)
                            if (a.stringParsers.hasOwnProperty(c)) {
                                var d = a.stringParsers[c],
                                    e = d.re.exec(b),
                                    f = e && d.parse(e);
                                if (f) return this.value = this.RGBtoHSB.apply(null, f), !1
                            }
                    },
                    setHue: function(a) {
                        this.value.h = 1 - a
                    },
                    setSaturation: function(a) {
                        this.value.s = a
                    },
                    setLightness: function(a) {
                        this.value.b = 1 - a
                    },
                    setAlpha: function(a) {
                        this.value.a = parseInt(100 * (1 - a), 10) / 100
                    },
                    toRGB: function(a, b, c, d) {
                        a || (a = this.value.h, b = this.value.s, c = this.value.b), a *= 360;
                        var e, f, g, h, i;
                        return a = a % 360 / 60, i = c * b, h = i * (1 - Math.abs(a % 2 - 1)), e = f = g = c - i, a = ~~a, e += [i, h, 0, 0, h, i][a], f += [h, i, i, h, 0, 0][a], g += [0, 0, h, i, i, h][a], {
                            r: Math.round(255 * e),
                            g: Math.round(255 * f),
                            b: Math.round(255 * g),
                            a: d || this.value.a
                        }
                    },
                    toHex: function(a, b, c, d) {
                        var e = this.toRGB(a, b, c, d);
                        return "#" + (1 << 24 | parseInt(e.r, 10) << 16 | parseInt(e.g, 10) << 8 | parseInt(e.b, 10)).toString(16).substr(1)
                    }
                }
            }
        ]).factory("Slider", ["Helper",
            function(b) {
                var c = {
                        maxLeft: 0,
                        maxTop: 0,
                        callLeft: null,
                        callTop: null,
                        knob: {
                            top: 0,
                            left: 0
                        }
                    },
                    d = {};
                return {
                    getSlider: function() {
                        return c
                    },
                    getLeftPosition: function(a) {
                        return Math.max(0, Math.min(c.maxLeft, c.left + ((a.pageX || d.left) - d.left)))
                    },
                    getTopPosition: function(a) {
                        return Math.max(0, Math.min(c.maxTop, c.top + ((a.pageY || d.top) - d.top)))
                    },
                    setSlider: function(e, f) {
                        var g = b.closestSlider(e.target),
                            h = b.getOffset(g, f);
                        c.knob = g.children[0].style, c.left = e.pageX - h.left - a.pageXOffset + h.scrollX, c.top = e.pageY - h.top - a.pageYOffset + h.scrollY, d = {
                            left: e.pageX,
                            top: e.pageY
                        }
                    },
                    setSaturation: function(a, b) {
                        c = {
                            maxLeft: 100,
                            maxTop: 100,
                            callLeft: "setSaturation",
                            callTop: "setLightness"
                        }, this.setSlider(a, b)
                    },
                    setHue: function(a, b) {
                        c = {
                            maxLeft: 0,
                            maxTop: 100,
                            callLeft: !1,
                            callTop: "setHue"
                        }, this.setSlider(a, b)
                    },
                    setAlpha: function(a, b) {
                        c = {
                            maxLeft: 0,
                            maxTop: 100,
                            callLeft: !1,
                            callTop: "setAlpha"
                        }, this.setSlider(a, b)
                    },
                    setKnob: function(a, b) {
                        c.knob.top = a + "px", c.knob.left = b + "px"
                    }
                }
            }
        ]).directive("colorpicker", ["$document", "$compile", "Color", "Slider", "Helper",
            function(a, c, d, e, f) {
                return {
                    require: "?ngModel",
                    restrict: "A",
                    link: function(g, h, i, j) {
                        var k, l = i.colorpicker ? i.colorpicker : "hex",
                            m = b.isDefined(i.colorpickerPosition) ? i.colorpickerPosition : "bottom",
                            n = b.isDefined(i.colorpickerInline) ? i.colorpickerInline : !1,
                            o = b.isDefined(i.colorpickerFixedPosition) ? i.colorpickerFixedPosition : !1,
                            p = b.isDefined(i.colorpickerParent) ? h.parent() : b.element(document.body),
                            q = b.isDefined(i.colorpickerWithInput) ? i.colorpickerWithInput : !1,
                            r = q ? '<input type="text" name="colorpicker-input">' : "",
                            s = n ? "" : '<button type="button" class="close close-colorpicker">&times;</button>',
                            t = '<div class="colorpicker dropdown"><div class="dropdown-menu"><colorpicker-saturation><i></i></colorpicker-saturation><colorpicker-hue><i></i></colorpicker-hue><colorpicker-alpha><i></i></colorpicker-alpha><colorpicker-preview></colorpicker-preview>' + r + s + "</div></div>",
                            u = b.element(t),
                            v = d,
                            w = u.find("colorpicker-hue"),
                            x = u.find("colorpicker-saturation"),
                            y = u.find("colorpicker-preview"),
                            z = u.find("i");
                        if (c(u)(g), q) {
                            var A = u.find("input");
                            A.on("mousedown", function(a) {
                                a.stopPropagation()
                            }).on("keyup", function(a) {
                                var b = this.value;
                                h.val(b), j && g.$apply(j.$setViewValue(b)), a.stopPropagation(), a.preventDefault()
                            }), h.on("keyup", function() {
                                A.val(h.val())
                            })
                        }
                        var B = function() {
                            a.on("mousemove", D), a.on("mouseup", E)
                        };
                        "rgba" === l && (u.addClass("alpha"), k = u.find("colorpicker-alpha"), k.on("click", function(a) {
                            e.setAlpha(a, o), D(a)
                        }).on("mousedown", function(a) {
                            e.setAlpha(a, o), B()
                        })), w.on("click", function(a) {
                            e.setHue(a, o), D(a)
                        }).on("mousedown", function(a) {
                            e.setHue(a, o), B()
                        }), x.on("click", function(a) {
                            e.setSaturation(a, o), D(a)
                        }).on("mousedown", function(a) {
                            e.setSaturation(a, o), B()
                        }), o && u.addClass("colorpicker-fixed-position"), u.addClass("colorpicker-position-" + m), "true" === n && u.addClass("colorpicker-inline"), p.append(u), j && (j.$render = function() {
                            h.val(j.$viewValue)
                        }, g.$watch(i.ngModel, function() {
                            F()
                        })), h.on("$destroy", function() {
                            u.remove()
                        });
                        var C = function() {
                                try {
                                    y.css("backgroundColor", v[l]())
                                } catch (a) {
                                    y.css("backgroundColor", v.toHex())
                                }
                                x.css("backgroundColor", v.toHex(v.value.h, 1, 1, 1)), "rgba" === l && (k.css.backgroundColor = v.toHex())
                            },
                            D = function(a) {
                                var b = e.getLeftPosition(a),
                                    c = e.getTopPosition(a),
                                    d = e.getSlider();
                                e.setKnob(c, b), d.callLeft && v[d.callLeft].call(v, b / 100), d.callTop && v[d.callTop].call(v, c / 100), C();
                                var f = v[l]();
                                return h.val(f), j && g.$apply(j.$setViewValue(f)), q && A.val(f), !1
                            },
                            E = function() {
                                a.off("mousemove", D), a.off("mouseup", E)
                            },
                            F = function() {
                                v.setColor(h.val()), z.eq(0).css({
                                    left: 100 * v.value.s + "px",
                                    top: 100 - 100 * v.value.b + "px"
                                }), z.eq(1).css("top", 100 * (1 - v.value.h) + "px"), z.eq(2).css("top", 100 * (1 - v.value.a) + "px"), C()
                            },
                            G = function() {
                                var a, c = f.getOffset(h[0]);
                                return b.isDefined(i.colorpickerParent) && (c.left = 0, c.top = 0), "top" === m ? a = {
                                    top: c.top - 147,
                                    left: c.left
                                } : "right" === m ? a = {
                                    top: c.top,
                                    left: c.left + 126
                                } : "bottom" === m ? a = {
                                    top: c.top + h[0].offsetHeight + 2,
                                    left: c.left
                                } : "left" === m && (a = {
                                    top: c.top,
                                    left: c.left - 150
                                }), {
                                    top: a.top + "px",
                                    left: a.left + "px"
                                }
                            },
                            H = function() {
                                J()
                            };
                        n === !1 ? h.on("click", function() {
                            F(), u.addClass("colorpicker-visible").css(G()), a.on("mousedown", H)
                        }) : (F(), u.addClass("colorpicker-visible").css(G())), u.on("mousedown", function(a) {
                            a.stopPropagation(), a.preventDefault()
                        });
                        var I = function(a) {
                                j && g.$emit(a, {
                                    name: i.ngModel,
                                    value: j.$modelValue
                                })
                            },
                            J = function() {
                                u.hasClass("colorpicker-visible") && (u.removeClass("colorpicker-visible"), I("colorpicker-closed"), a.off("mousedown", H))
                            };
                        u.find("button").on("click", function() {
                            J()
                        })
                    }
                }
            }
        ]), b.module("app.directives.rightclick", []).directive("rightClick", ["$compile",
            function(a) {
                return {
                    restrict: "EA",
                    link: function(b, c) {
                        var d;
                        $(c).on("contextmenu", function(e) {
                            if (e.preventDefault(), d && d[0] && d.remove(), "0" == b.categoryId) {
                                d = $('<ul class="right-menu dropdown-menu"></ul>'), d.appendTo($(c)), d.css({
                                    left: e.pageX - $(c).offset().left,
                                    top: e.pageY - $(c).offset().top
                                }).show();
                                for (var f in b.myTags) {
                                    var g = '<li class="tag_list" ng-class="{selected: dropTagIndex == ' + f + '}" ng-click="selectTag(' + b.myTags[f].id + "," + f + ')">' + b.myTags[f].name + "</li>",
                                        h = a(g)(b);
                                    d.append(h)
                                }
                                var i = a('<li class="tag_list add_cate clearfix" style="border-top:1px solid #ccc;margin-bottom:0px;" ng-click="createCategory()"><em>+</em><span>创建分类</span></li>')(b);
                                d.append(i);
                                var j = a('<li class="btn-main" style="width:100%; padding:0px; border: 0;margin:0px;height:25px; line-height:25px;"><a style="height:25px;line-height:25px;text-indent:0;color:#FFF;padding:0px;text-align:center;" ng-click="setCategory(' + b.dropTagIndex + "," + b.img.id + ')">确定</a></li>')(b);
                                d.append(j), $(j).on("click", function() {
                                    d.hide()
                                }), $(document).mousemove(function(a) {
                                    (a.pageX < d.offset().left - 20 || a.pageX > d.offset().left + d.width() + 20 || a.pageY < d.offset().top - 20 || a.pageY > d.offset().top + d.height() + 20) && (d.hide(), $(this).unbind("mousemove"))
                                })
                            }
                        })
                    }
                }
            }
        ]), b.module("app.directives.dataDraggable", []).directive("itemDraggable", function() {
            return {
                restrict: "A",
                link: function(a, b) {
                    $(b).draggable({
                        zIndex: 2700,
                        scroll: !1,
                        iframeFix: !1,
                        revert: !1,
                        helper: "clone"
                    })
                }
            }
        }).directive("itemDroppable", function() {
            return {
                restrict: "A",
                link: function(a, b) {
                    $(b).droppable({
                        hoverClass: "active",
                        out: function() {},
                        drop: function(b, c) {
                            a.$parent.associateData[$(b.target).attr("item-id")] = c.draggable.attr("item-id");
                            var d = $(b.target).find(".list_darggable");
                            d.length > 0 && (delete a.$parent.associateData[$(b.target).attr("item-id")], $(".item_remove_droppable").append(d)), c.draggable.css({
                                left: 0,
                                top: 0
                            }).prependTo(this)
                        }
                    })
                }
            }
        }).directive("itemRemoveDroppable", function() {
            return {
                restrict: "A",
                link: function(a, b) {
                    $(b).droppable({
                        hoverClass: "active",
                        drop: function(b, c) {
                            $(c.draggable).parents(".list_attribute").length > 0 && delete a.$parent.associateData[$(c.draggable).parents(".list_attribute").attr("item-id")], c.draggable.css({
                                left: 0,
                                top: 0
                            }).appendTo(this)
                        }
                    })
                }
            }
        }), b.module("app.directives.limitInput", []).directive("limitInput", function() {
            return {
                require: "ngModel",
                link: function(a, b, c, d) {
                    "transform" == c.cssItem && a.$on("updateTransform", function(a, b) {
                        d.$setViewValue(parseInt(b, 10)), d.$render()
                    }), "borderRadius" == c.cssItem && a.$on("updateMaxRadius", function(b, c) {
                        a.maxRadius = parseInt(Math.min($(c).outerWidth(), $(c).outerHeight()) / 2 + 10, 10), a.maxRadius < a.model.borderRadius && (d.$setViewValue(a.maxRadius), d.$render()), a.$apply()
                    }), a.$watch(function() {
                        return $(b).val()
                    }, function(a) {
                        +a > c.max && (d.$setViewValue(c.max), d.$render()), +a < c.min && (d.$setViewValue(c.min), d.$render())
                    })
                }
            }
        }), b.module("app.directives.lineChart", []).directive("lineChart", ["$compile",
            function() {
                return {
                    restrict: "EA",
                    link: function(a, b, c) {
                        var d, e;
                        a.$watch(function() {
                            return c.data
                        }, function() {
                            c.data && (d = JSON.parse(c.data)), e ? (e.destroy(), e = new Chart(b[0].getContext("2d")).Line(d,{scaleShowLabels:true})) : e = new Chart(b[0].getContext("2d")).Line(d,{scaleShowLabels:true})
                        })
                    }
                }
            }
        ]), b.module("app.directives.loading", []).directive("loginLoading", function() {
            return {
                restrict: "EA",
                link: function(a, b) {
                    a.$on("loginLoading", function() {
                        var a = $('<div class="homeMask" style="position: absolute;width: 100%;top:0;bottom:0;background-color:#ccc;opacity:0.8;">正在跳转，请稍后...</div>');
                        a.appendTo($(b))
                    })
                }
            }
        }), b.module("app.directives.comp.editor", []).directive("mapEditor", function() {
            return {
                restrict: "AE",
                templateUrl: "directives/mapeditor.tpl.html",
                link: function(a) {
                    var b = new BMap.Map("l-map");
                    b.centerAndZoom(new BMap.Point(116.404, 39.915), 15);
                    var c = {
                            onSearchComplete: function(a) {
                                if (d.getStatus() == BMAP_STATUS_SUCCESS) {
                                    for (var b = [], c = 0; c < a.getCurrentNumPois(); c++) b.push(a.getPoi(c).title + ", " + a.getPoi(c).address);
                                    document.getElementById("r-result").innerHTML = b.join("<br/>")
                                }
                            }
                        },
                        d = new BMap.LocalSearch(b, c);
                    a.searchAddress = function() {
                        d.search(a.address)
                    }
                }
            }
        }), b.module("app.directives.notification", []).directive("notificationFadeout", ["i18nNotifications",
            function(a) {
                return {
                    restrict: "EA",
                    link: function(b, c) {
                        var d = $(c);
                        d.fadeOut(4e3, function() {
                            a.remove(b.notification)
                        })
                    }
                }
            }
        ]), b.module("app.directives.pageTplTypes", []).directive("pageTplTypes", ["pageTplService",
            function(a) {
                return {
                    restrict: "EA",
                    replace: !0,
                    templateUrl: "directives/page-tpl-types.tpl.html",
                    link: function(b) {
                        a.getPageTplTypes().then(function(a) {
                            b.pageTplTypes = a.data.list && a.data.list.length > 0 ? a.data.list : []
                        })
                    }
                }
            }
        ]), b.module("app.directives.pieChart", []).directive("pieChart", ["$compile",
            function() {
                return {
                    restrict: "EA",
                    link: function(a, b, c) {
                        var d, e;
                        a.$watch(function() {
                            return c.data
                        }, function() {
                            c.data && (e = JSON.parse(c.data)), d ? (d.destroy(), d = new Chart(b[0].getContext("2d")).Pie(e)) : d = new Chart(b[0].getContext("2d")).Pie(e)
                        })
                    }
                }
            }
        ]), b.module("app.directives.qrcode", []).directive("qrCode", function() {
            return {
                restrict: "A",
                link: function(a, b, c) {
                    a.$watch(function() {
                        return c.qrUrl
                    }, function() {
                        $("canvas", b).length > 0 && $("canvas", b).remove(), c.qrUrl && $(b).qrcode({
                            render: "canvas",
                            width: 200,
                            height: 200,
                            text: c.qrUrl + (/\?/.test(c.qrUrl) ? "&" : "?") + "eqrcode=1"
                        })
                    })
                }
            }
        }), b.module("app.directives.register", []).directive("qqButton", function() {
            return {
                restrict: "EA",
                scope: {
                    someCtrlFn: "&callbackFn",
                    openid: "=",
                    accesstoken: "="
                },
                link: function(a, b, c) {
                    QC.Login({
                        btnId: c.id,
                        scope: "all"
                    }, function(b) {
                        var c = b;
                        QC.Login.check() && QC.Login.getMe(function(b, d) {
                            a.openid = b, a.accesstoken = d, a.someCtrlFn({
                                arg1: {
                                    openId: b,
                                    accessToken: d,
                                    type: "qq",
                                    userInfo: c
                                }
                            })
                        })
                    }, function() {
                        alert("QQ登录 注销成功")
                    }), $("#qqLoginBtn a").removeAttr("onclick").click(function() {
                        alert("第三方注册功能即将开放")
                    })
                }
            }
        }).directive("wbButton", function() {
            return {
                restrict: "EA",
                link: function() {
                    WB2.anyWhere(function(a) {
                        a.widget.connectButton({
                            id: "wb_connect_btn",
                            type: "3,2",
                            callback: {
                                login: function() {},
                                logout: function() {}
                            }
                        })
                    }), $("#wb_connect_btn").removeAttr("onclick").click(function(a) {
                        return a.stopPropagation(), a.preventDefault(), alert("新浪微博注册功能即将开放"), !1
                    })
                }
            }
        }), b.module("app.directives.responsiveImage", []).directive("responsiveImage", ["$compile",
            function() {
                return {
                    restrict: "EA",
                    link: function(a, b) {
                        "0" != a.fileType && $(b).bind("load", function() {
                            $(this).removeAttr("style");
                            var a = $(this).parent().width(),
                                b = $(this).parent().height();
                            this.width > this.height ? (this.style.width = a + "px", this.style.height = this.height * a / this.width + "px", this.style.top = "50%", this.style.marginTop = "-" + this.height / 2 + "px") : (this.style.height = b + "px", this.style.width = this.width * b / this.height + "px", this.style.left = "50%", this.style.marginLeft = "-" + this.width / 2 + "px")
                        })
                    }
                }
            }
        ]), b.module("app.directives.numChangeAnim", []).directive("numChangeAnim", ["$filter",
            function(a) {
                return {
                    restrict: "A",
                    scope: {
                        content: "@"
                    },
                    link: function(b, c) {
                        function d(a, b) {
                            return Math.floor(a + Math.random() * (b - a))
                        }

                        function e(a, b) {
                            a = a > 0 ? a : 1;
                            for (var c = Math.floor(Math.log10(a)), e = Math.floor(a / Math.pow(10, c)), f = 0, g = 10, h = 0; g > h; h++)! function(h) {
                                setTimeout(function() {
                                    if (10 > g) f = h;
                                    else {
                                        var i = c > h ? h : c,
                                            j = Math.pow(10, i) * e;
                                        j = j.toString().length == a.toString().length ? a : j, f = d(f, j)
                                    }
                                    b(f, 9 == h)
                                }, (h * h + h + 2) / 2 * 30)
                            }(h)
                        }

                        function f(b, c) {
                            $(b).children("span").text(a("number")(c))
                        }
                        b.$watch("content", function(a) {
                            if (a) {
                                var b = parseInt(a, 10);
                                e(b, function(a, d) {
                                    f(c, a), d && (f(c, b), $(c).addClass("heartbeat").css({
                                        "animation-duration": "1s"
                                    }))
                                })
                            }
                        })
                    }
                }
            }
        ]), b.module("app.directives.style", []).directive("panelDraggable", function() {
            return {
                restrict: "A",
                link: function(a, b) {
                    a.$on("$destroy", function() {
                        $(b).draggable(), $(b).draggable("destroy"), b = null
                    }), b.on("$destroy", function() {
                        $(b).draggable(), $(b).draggable("destroy"), b = null
                    }), $(b).draggable()
                }
            }
        }), b.module("app.directives.component", ["services.scene"]).directive("compDraggable", function() {
            return {
                restrict: "A",
                link: function(a, b, c) {
                    a.$on("$destroy", function() {
                        $(b).draggable(), $(b).draggable("destroy"), b = null
                    }), b.on("$destroy", function() {
                        $(b).draggable(), $(b).draggable("destroy"), b = null
                    }), $(b).draggable({
                        revert: !1,
                        stack: ".comp-draggable",
                        helper: "panel" == c.compDraggable || "page" == c.compDraggable ? "clone" : "",
                        appendTo: "parent",
                        containment: "panel" == c.compDraggable || "page" == c.compDraggable ? "" : "parent",
                        zIndex: 1049,
                        opacity: .35,
                        stop: function(a) {
                            $(a.toElement).one("click", function(a) {
                                a.stopImmediatePropagation()
                            })
                        }
                    })
                }
            }
        }).directive("compDroppable", function() {
            return {
                restrict: "A",
                link: function(a, b) {
                    a.$on("$destroy", function() {
                        $(b).droppable(), $(b).droppable("destroy"), b = null
                    }), b.on("$destroy", function() {
                        $(b).droppable(), $(b).droppable("destroy"), b = null
                    }), $(b).droppable({
                        accept: ".comp-draggable",
                        hoverClass: "drop-hover",
                        drop: function(b, c) {
                            if (3 != c.draggable.attr("ctype")) {
                                var d = {
                                    left: c.offset.left - $(this).offset().left + "px",
                                    top: c.offset.top - $(this).offset().top + "px"
                                };
                                "panel" == c.draggable.attr("comp-draggable") ? a.createComp(c.draggable.attr("ctype"), d) : a.updateCompPosition(c.draggable.attr("id"), d)
                            } else a.createComp(3)
                        }
                    })
                }
            }
        }).directive("compSortable", function() {
            return {
                restrict: "A",
                link: function(a, b) {
                    $(b).sortable({
                        axis: "y",
                        update: function() {}
                    })
                }
            }
        }).directive("compResizable", function() {
            return {
                restrict: "A",
                link: function(a, b) {
                    $(b).resizable({
                        autoHide: !1,
                        containment: "parent",
                        stop: function(b, c) {
                            if ("4" == $(c.element).attr("ctype").charAt(0)) {
                                var d = {
                                    width: c.size.width,
                                    height: c.size.height,
                                    imgStyle: {
                                        width: c.element.find("img").width(),
                                        height: c.element.find("img").height(),
                                        marginTop: c.element.find("img").css("marginTop"),
                                        marginLeft: c.element.find("img").css("marginLeft")
                                    }
                                };
                                a.updateCompSize(c.element.attr("id"), d)
                            } else a.updateCompSize(c.element.attr("id"), c.size);
                            $(b.toElement).one("click", function(a) {
                                a.stopImmediatePropagation()
                            })
                        },
                        resize: function(a, c) {
                            var d = $(b).find("img").width() / $(b).find("img").height();
                            if ("4" == $(c.element).attr("ctype").charAt(0)) {
                                var e = c.size.width / c.size.height,
                                    f = c.element.find("img");
                                d >= e ? (f.outerHeight(c.size.height), f.outerWidth(c.size.height * d), f.css("marginLeft", -(f.outerWidth() - c.size.width) / 2), f.css("marginTop", 0)) : (f.outerWidth(c.size.width), f.outerHeight(c.size.width / d), f.css("marginTop", -(f.outerHeight() - c.size.height) / 2), f.css("marginLeft", 0))
                            } else c.element.find(".element").outerWidth(c.size.width), c.element.find(".element").outerHeight(c.size.height)
                        }
                    })
                }
            }
        }).directive("photoDraggable", function() {
            return {
                restrict: "A",
                link: function(a, b) {
                    a.$on("$destroy", function() {
                        $(b).draggable(), $(b).draggable("destroy"), b = null
                    }), b.on("$destroy", function() {
                        $(b).draggable(), $(b).draggable("destroy"), b = null
                    }), $(b).draggable({
                        revert: !1,
                        helper: "clone",
                        appendTo: ".img_list",
                        zIndex: 1049,
                        opacity: .35,
                        stop: function(a) {
                            $(a.toElement).one("click", function(a) {
                                a.stopImmediatePropagation()
                            })
                        }
                    })
                }
            }
        }).directive("cropDroppable", function() {
            return {
                restrict: "A",
                link: function(a, b) {
                    a.$on("$destroy", function() {
                        $(b).droppable(), $(b).droppable("destroy"), b = null
                    }), b.on("$destroy", function() {
                        $(b).droppable(), $(b).droppable("destroy"), b = null
                    }), $(b).droppable({
                        accept: "li",
                        hoverClass: "drop-hover",
                        drop: function(b, c) {
                            a.preSelectImage(c.draggable.attr("photo-draggable"))
                        }
                    })
                }
            }
        }).directive("compRotate", function() {
            return {
                restrict: "A",
                link: function(a, b) {
                    var c = $(b),
                        d = $('<div class="bar bar-rotate bar-radius">');
                    c.append(d).append('<div class="bar bar-line">');
                    var e, f = {},
                        g = new Hammer(d.get(0));
                    g.get("pan").set({
                        threshold: 0
                    }), g.on("panstart", function() {
                        c.addClass("no-drag"), $("body").css({
                            "user-select": "none"
                        });
                        var a = c.parent();
                        f = {
                            x: parseFloat(c.css("left")) + a.offset().left + c.width() / 2,
                            y: parseFloat(c.css("top")) + a.offset().top + c.height() / 2
                        }
                    }), g.on("panmove", function(a) {
                        var b = a.center,
                            d = b.x - f.x,
                            g = b.y - f.y,
                            h = Math.abs(d / g);
                        e = Math.atan(h) / (2 * Math.PI) * 360, d > 0 && 0 > g ? e = 360 + e : d > 0 && g > 0 ? e = 180 - e : 0 > d && g > 0 ? e = 180 + e : 0 > d && 0 > g && (e = 360 - e), e > 360 && (e -= 360), c.css({
                            transform: "rotateZ(" + e + "deg)"
                        })
                    }), g.on("panend", function() {
                        c.removeClass("no-drag"), $("body").css({
                            "user-select": "initial",
                            cursor: "default"
                        }), a.updateCompAngle(c.attr("id"), e), a.$broadcast("updateTransform", e)
                    })
                }
            }
        }).directive("compDrag", function() {
            return {
                restrict: "A",
                link: function(a, b) {
                    var c, d = 0,
                        e = 0,
                        f = {},
                        g = {},
                        h = {},
                        i = {},
                        j = $(b),
                        k = j.parent(),
                        l = {
                            width: k.width(),
                            height: k.height()
                        },
                        m = new Hammer(j.get(0));
                    m.get("pan").set({
                        threshold: 0
                    }), m.on("panstart", function(a) {
                        if (a.preventDefault(), a.srcEvent.preventDefault(), !j.hasClass("no-drag")) {
                            j.css("opacity", .35), $("body").css({
                                "user-select": "none",
                                cursor: "default"
                            }), c = k.offset();
                            var b = {
                                width: j.width(),
                                height: j.height()
                            };
                            d = j.get(0).style.transform || j.get(0).style.webkitTransform || 0, d = d && d.replace("rotateZ(", "").replace("deg)", ""), d = d && parseFloat(d), d >= 90 && 180 > d && (d = 180 - d), d >= 180 && 270 > d && (d = 270 - d), d >= 270 && 360 > d && (d = 360 - d), e = 2 * d * Math.PI / 360;
                            var m = 0 == e ? b.height : (b.width / 2 + b.height / 2 / Math.tan(e)) * Math.sin(e) * 2,
                                n = 0 == e ? b.width : (b.width / 2 + b.height / 2 / Math.tan(Math.PI / 2 - e)) * Math.sin(Math.PI / 2 - e) * 2;
                            i = {
                                height: m,
                                width: n
                            }, h = j.offset();
                            var o = j.position();
                            g = a.center, g.top = g.y - o.top, g.bottom = g.y + l.height - (o.top + i.height), g.left = g.x - o.left, g.right = g.x + l.width - (o.left + i.width), f.x = a.center.x - (parseFloat(j.css("left")) + c.left), f.y = a.center.y - (parseFloat(j.css("top")) + c.top)
                        }
                    }), m.on("panmove", function(a) {
                        a.preventDefault(), "img" == a.target.tagName.toLowerCase() && (a.target.ondragstart = function() {
                            return !1
                        }), j.hasClass("no-drag") || (a.center.y >= g.top && a.center.y <= g.bottom && j.css("top", a.center.y - c.top - f.y), a.center.x >= g.left && a.center.x <= g.right && j.css("left", a.center.x - c.left - f.x))
                    }), m.on("panend", function(b) {
                        j.css("opacity", 1), $("body").css({
                            "user-select": "initial",
                            cursor: "default"
                        });
                        var c = (j.position(), {
                            top: j.css("top"),
                            left: j.css("left")
                        });
                        a.updateCompPosition(j.attr("id"), c), $(b.srcEvent.target).one("click", function(a) {
                            return a.stopImmediatePropagation(), a.stopPropagation(), a.preventDefault(), !1
                        })
                    })
                }
            }
        }).directive("compResize", function() {
            function a(a, b, c, d) {
                var e = {},
                    f = a / b,
                    g = c / d;
                return f > g ? (e.width = c, e.height = c / f) : (e.height = d, e.width = d * f), e
            }

            function b(b) {
                var c = b.children(".element-box"),
                    d = {
                        width: c.width(),
                        height: c.height()
                    };
                if ("4" == b.attr("ctype").charAt(0)) {
                    var e = b.find("img"),
                        f = e.width() / e.height(),
                        g = d.width / d.height;
                    f >= g ? (e.outerHeight(d.height), e.outerWidth(d.height * f), e.css("marginLeft", -(e.outerWidth() - d.width) / 2), e.css("marginTop", 0)) : (e.outerWidth(d.width), e.outerHeight(d.width / f), e.css("marginTop", -(e.outerHeight() - d.height) / 2), e.css("marginLeft", 0))
                } else if ("p" == b.attr("ctype").charAt(0)) {
                    var h = b.find("li"),
                        i = b.find("img");
                    i.each(function(b) {
                        var c = $(this),
                            e = a(c.width(), c.height(), d.width, d.height);
                        c.css({
                            width: e.width,
                            height: e.height
                        }), h.eq(b).css({
                            lineHeight: d.height + "px"
                        })
                    })
                } else b.find(".element").css({
                    width: d.width,
                    height: d.height
                })
            }

            function c(a, b) {
                var c = {
                    width: b.width(),
                    height: b.height()
                };
                if ("4" == b.attr("ctype").charAt(0)) {
                    var d = b.find("img"),
                        e = {
                            width: c.width,
                            height: c.height,
                            imgStyle: {
                                width: d.width(),
                                height: d.height(),
                                marginTop: d.css("marginTop"),
                                marginLeft: d.css("marginLeft")
                            }
                        };
                    a.updateCompSize(b.attr("id"), e)
                } else if ("p" == b.attr("ctype").charAt(0)) {
                    var f = b.find(".slide"),
                        g = f.find(".dot"),
                        h = f.attr("id"),
                        i = f.attr("length");
                    INTERVAL_OBJ[h] && (clearInterval(INTERVAL_OBJ[h]), delete INTERVAL_OBJ[h]), f.swipeSlide({
                        autoSwipe: "true" == f.attr("autoscroll"),
                        continuousScroll: !0,
                        speed: f.attr("interval"),
                        transitionType: "cubic-bezier(0.22, 0.69, 0.72, 0.88)",
                        lazyLoad: !0,
                        clone: !1,
                        length: i
                    }, function(a, b) {
                        --a < 0 && (a = i - 1), g.children().eq(a).addClass("cur").siblings().removeClass("cur"), b && (INTERVAL_OBJ[h] = b)
                    }), a.updateCompSize(b.attr("id"), c)
                } else a.updateCompSize(b.attr("id"), c)
            }

            function d(a, d, f, g) {
                var h, i, j, k, l = $(d),
                    m = l.closest("ul"),
                    n = 0,
                    o = 0,
                    p = parseFloat(l.css("min-width") || 50),
                    q = parseFloat(l.css("min-height") || 30),
                    r = new Hammer($(f).get(0));
                r.get("pan").set({
                    threshold: 0,
                    direction: Hammer.DIRECTION_ALL
                }), r.on("panstart", function() {
                    l.addClass("no-drag"), h = l.width(), i = l.height(), j = parseFloat(l.css("left")), k = parseFloat(l.css("top")), m.css("cursor", g), $("body").css({
                        "user-select": "none",
                        cursor: "default"
                    }), n = l.get(0).style.transform, n = n && n.replace("rotateZ(", "").replace("deg)", ""), n = n && parseFloat(n), o = 2 * n * Math.PI / 360
                }), r.on("panmove", function(a) {
                    switch (g) {
                        case e.RESIZE_W:
                            if (h - a.deltaX <= p) break;
                            l.css({
                                left: j + a.deltaX,
                                width: h - a.deltaX
                            });
                            break;
                        case e.RESIZE_E:
                            l.css({
                                width: h + a.deltaX
                            });
                            break;
                        case e.RESIZE_N:
                            if (i - a.deltaY <= q) break;
                            l.css({
                                top: k + a.deltaY,
                                height: i - a.deltaY
                            });
                            break;
                        case e.RESIZE_S:
                            l.css({
                                height: i + a.deltaY
                            });
                            break;
                        case e.RESIZE_SE:
                            l.css({
                                height: i + a.deltaY,
                                width: h + a.deltaX
                            });
                            break;
                        case e.RESIZE_SW:
                            if (h - a.deltaX <= p) break;
                            l.css({
                                left: j + a.deltaX,
                                height: i + a.deltaY,
                                width: h - a.deltaX
                            });
                            break;
                        case e.RESIZE_NE:
                            if (i - a.deltaY <= q) break;
                            l.css({
                                top: k + a.deltaY,
                                height: i - a.deltaY,
                                width: h + a.deltaX
                            });
                            break;
                        case e.RESIZE_NW:
                            i - a.deltaY > q && l.css("top", k + a.deltaY), h - a.deltaX > p && l.css("left", j + a.deltaX), l.css({
                                height: i - a.deltaY,
                                width: h - a.deltaX
                            })
                    }
                    a.deltaX > 0 && l.width() > 320 - parseFloat(l.css("left")) && l.width(320 - parseFloat(l.css("left"))), a.deltaX < 0 && l.width() > j + h && (l.width(j + h), l.css("left", 0)), a.deltaY > 0 && l.height() > 486 - parseFloat(l.css("top")) && l.height(486 - parseFloat(l.css("top"))), a.deltaY < 0 && l.height() > k + i && (l.height(k + i), l.css("top", 0)), b(l)
                }), r.on("panend", function() {
                    l.removeClass("no-drag"), m.css("cursor", "default"), $("body").css({
                        "user-select": "initial",
                        cursor: "default"
                    }), c(a, l), a.$broadcast("updateMaxRadius", l)
                })
            }
            var e = {
                RESIZE_W: "w-resize",
                RESIZE_E: "e-resize",
                RESIZE_N: "n-resize",
                RESIZE_S: "s-resize",
                RESIZE_SE: "se-resize",
                RESIZE_SW: "sw-resize",
                RESIZE_NE: "ne-resize",
                RESIZE_NW: "nw-resize"
            };
            return {
                restrict: "A",
                link: function(a, b) {
                    var c = b,
                        f = $('<div class="bar bar-n" >'),
                        g = $('<div class="bar bar-s" >'),
                        h = $('<div class="bar bar-e" >'),
                        i = $('<div class="bar bar-w" >'),
                        j = $('<div class="bar bar-ne bar-radius">'),
                        k = $('<div class="bar bar-nw bar-radius">'),
                        l = $('<div class="bar bar-se bar-radius">'),
                        m = $('<div class="bar bar-sw bar-radius">');
                    c.append(f).append(g).append(h).append(i).append(j).append(k).append(l).append(m).unbind("mousedown").mousedown(function() {
                        $(this).children(".bar").show().end().siblings().children(".bar").hide()
                    }), c.parent().unbind("mousedown").mousedown(function(b) {
                        $(b.target).closest("li").length || ($(this).children("li").find(".bar").hide(), a.$emit("hideStylePanel"))
                    }), d(a, c, h, e.RESIZE_E), d(a, c, i, e.RESIZE_W), d(a, c, f, e.RESIZE_N), d(a, c, g, e.RESIZE_S), d(a, c, j, e.RESIZE_NE), d(a, c, k, e.RESIZE_NW), d(a, c, l, e.RESIZE_SE), d(a, c, m, e.RESIZE_SW)
                }
            }
        }).directive("pasteElement", ["sceneService",
            function(a) {
                function b() {
                    var b = $('<ul id="pasteMenu" class="dropdown-menu" style="min-width: 100px; display: block;" role="menu" aria-labelledby="dropdownMenu1">                            <li class="paste" role="presentation"><a role="menuitem" tabindex="-1"><div class="fa fa-paste" style="color: #08a1ef;"></div>&nbsp;&nbsp;粘贴</a></li>                    </ul>').css({
                        position: "absolute",
                        "user-select": "none"
                    });
                    return b.find(".paste").on("click", function() {
                        a.pasteElement(a.originalElemDef, a.copyElemDef, a.sameCopyCount), b.hide()
                    }), b
                }
                return {
                    restrict: "EA",
                    link: function(a, c) {
                        var d = $(c);
                        d.on("contextmenu", function(a) {
                            if (q) {
                                var c = b(),
                                    d = $("#pasteMenu");
                                d.length > 0 && d.remove(), $("#eq_main").append(c), c.css({
                                    left: a.pageX + $("#eq_main").scrollLeft() + 15,
                                    top: a.pageY + $("#eq_main").scrollTop()
                                }).show(), $("#eq_main").mousemove(function(a) {
                                    (a.pageX < $("#pasteMenu").offset().left - 20 || a.pageX > $("#pasteMenu").offset().left + $("#pasteMenu").width() + 20 || a.pageY < $("#pasteMenu").offset().top - 20 || a.pageY > $("#pasteMenu").offset().top + $("#pasteMenu").height() + 20) && ($("#pasteMenu").hide(), $(this).unbind("mousemove"))
                                })
                            }
                            return !1
                        })
                    }
                }
            }
        ]), b.module("app.directives.editor", []).directive("toolbar", ["$compile",
            function(a) {
                return {
                    restrict: "EA",
                    replace: !0,
                    templateUrl: "directives/toolbar.tpl.html",
                    link: function(c) {
                        c.internalLinks = b.copy(c.pages), c.internalLink || c.externalLink || (c.internalLink = c.internalLinks[0], c.externalLink = "http://");
                        var d = ["#000000", "#7e2412", "#ff5400", "#225801", "#0c529e", "#333333", "#b61b52", "#f4711f", "#3bbc1e", "#23a3d3", "#888888", "#d34141", "#f7951e", "#29b16a", "#97daf3", "#cccccc", "#ec7c7c", "#fdea02", "#79c450", "#563679", "#ffffff", "#ffcccc", "#d9ef7f", "#c3f649"],
                            e = $(".color-menu"),
                            f = $(".bgcolor-menu");
                        $.each(d, function(a, b) {
                            e.append($('<li><a dropdown-toggle class="btn" data-edit="foreColor ' + b + '" style="background-color: ' + b + '"></a></li>'))
                        }), a(e.append($('<li><a dropdown-toggle class="btn glyphicon glyphicon-remove" data-edit="foreColor transparent" style="background-color: transparent"></a></li>')))(c);
                        var g = function(a) {
                            var b = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
                            a = a.replace(b, function(a, b, c, d) {
                                return b + b + c + c + d + d
                            });
                            var c = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(a);
                            return c ? {
                                r: parseInt(c[1], 16),
                                g: parseInt(c[2], 16),
                                b: parseInt(c[3], 16)
                            } : null
                        };
                        $.each(d, function(a, b) {
                            var c = g(b);
                            f.append($('<li><a dropdown-toggle class="btn" data-edit="backColor rgba(' + c.r + "," + c.g + "," + c.b + ', 0.3)" style="background-color: rgba(' + c.r + "," + c.g + "," + c.b + ', 0.3)"></a></li>'))
                        }), a(f.append($('<li><a dropdown-toggle class="btn glyphicon glyphicon-remove" data-edit="backColor transparent" style="background-color: transparent"></a></li>')))(c)
                    }
                }
            }
        ]), b.module("app.directives.uislider", []).value("uiSliderConfig", {}).directive("uiSlider", ["uiSliderConfig", "$timeout",
            function(a, d) {
                return a = a || {}, {
                    require: "ngModel",
                    compile: function() {
                        return function(e, f, g, h) {
                            function i(a, b) {
                                return b ? parseFloat(a) : parseInt(a, 10)
                            }

                            function j() {
                                f.slider("destroy")
                            }
                            var k = b.extend(e.$eval(g.uiSlider) || {}, a),
                                l = {
                                    min: null,
                                    max: null
                                },
                                m = ["min", "max", "step"],
                                n = b.isUndefined(g.useDecimals) ? !1 : !0,
                                o = function() {
                                    b.isArray(h.$viewValue) && k.range !== !0 && (console.warn("Change your range option of ui-slider. When assigning ngModel an array of values then the range option should be set to true."), k.range = !0), b.forEach(m, function(a) {
                                        b.isDefined(g[a]) && (k[a] = i(g[a], n))
                                    }), f.slider(k), o = b.noop
                                };
                            b.forEach(m, function(a) {
                                g.$observe(a, function(b) {
                                    b && (o(), k[a] = i(b, n), f.slider("option", a, i(b, n)), h.$render())
                                })
                            }), g.$observe("disabled", function(a) {
                                o(), f.slider("option", "disabled", !!a)
                            }), e.$watch(g.uiSlider, function(a) {
                                o(), a !== c && f.slider("option", a)
                            }, !0), d(o, 0, !0), f.bind("slide", function(a, b) {
                                h.$setViewValue(b.values || b.value), e.$apply()
                            }), h.$render = function() {
                                o();
                                var a = k.range === !0 ? "values" : "value";
                                k.range || !isNaN(h.$viewValue) || h.$viewValue instanceof Array ? k.range && !b.isDefined(h.$viewValue) && (h.$viewValue = [0, 0]) : h.$viewValue = 0, k.range === !0 && (b.isDefined(k.min) && k.min > h.$viewValue[0] && (h.$viewValue[0] = k.min), b.isDefined(k.max) && k.max < h.$viewValue[1] && (h.$viewValue[1] = k.max), h.$viewValue[0] > h.$viewValue[1] && (l.min >= h.$viewValue[1] && (h.$viewValue[0] = l.min), l.max <= h.$viewValue[0] && (h.$viewValue[1] = l.max)), l.min = h.$viewValue[0], l.max = h.$viewValue[1]), f.slider(a, h.$viewValue)
                            }, e.$watch(g.ngModel, function() {
                                k.range === !0 && h.$render()
                            }, !0), f.bind("$destroy", j)
                        }
                    }
                }
            }
        ]), b.module("security.authorization", ["security.service"]).provider("securityAuthorization", {
            requireAdminUser: ["securityAuthorization",
                function(a) {
                    return a.requireAdminUser()
                }
            ],
            requireAuthenticatedUser: ["securityAuthorization",
                function(a) {
                    return a.requireAuthenticatedUser()
                }
            ],
            $get: ["security", "securityRetryQueue",
                function(a, b) {
                    var c = {
                        requireAuthenticatedUser: function() {
                            var d = a.requestCurrentUser().then(function() {
                                return a.isAuthenticated() ? void 0 : b.pushRetryFn("unauthenticated-client", c.requireAuthenticatedUser)
                            });
                            return d
                        },
                        requireAdminUser: function() {
                            var d = a.requestCurrentUser().then(function() {
                                return a.isAdmin() ? void 0 : b.pushRetryFn("unauthorized-client", c.requireAdminUser)
                            });
                            return d
                        }
                    };
                    return c
                }
            ]
        }), b.module("security", ["security.service", "security.interceptor", "security.login", "security.authorization"]), b.module("security.interceptor", ["security.retryQueue"]).factory("securityInterceptor", ["$injector", "$location", "securityRetryQueue",
            function(a, b, c) {
                return function(d) {
                    return d.then(null, function(e) {
                        if (401 === e.status) {
                            if ("/home" == b.path() || "/home/login" == b.path() || "/home/register" == b.path() || "/home/reset" == b.path() || "/agreement" == b.path() || "/reg" == b.path() || "/sample" == b.path() || "/error" == b.path()) return;
                            d = c.pushRetryFn("unauthorized-server", function() {
                                return a.get("$http")(e.config)
                            })
                        }
                        return 403 === e.status && (alert("对不起，您没有查看此内容的权限"), b.path("/home")), d
                    })
                }
            }
        ]).config(["$httpProvider",
            function(a) {
                a.responseInterceptors.push("securityInterceptor")
            }
        ]), b.module("security.login.form", ["services.localizedMessages", "app.directives.addelement"]).controller("LoginFormController", ["$scope", "$timeout", "security", "localizedMessages", "$location", "$sce",
            function(a, b, c, d, e, f) {
                a.user = {}, a.retrieve = {}, a.showLogin = !0, a.sendPassword = !1, a.unExist = !1, a.weiChatUrl = c.thirdPartyUrl.weiChatUrl, a.qqUrl = c.thirdPartyUrl.qqUrl, a.weiboUrl = c.thirdPartyUrl.weiboUrl, a.openWeibo = function() {
                    alert("新浪微博注册功能即将开放!")
                }, a.authError = null, a.isValidateCodeLogin = c.isValidateCodeLogin, a.validateCodeSrc = PREFIX_URL + "servlet/validateCodeServlet", a.authReason = null, c.getLoginReason() && (a.authReason = d.get(c.isAuthenticated() ? "login.reason.notAuthorized" : "login.reason.notAuthenticated")), a.rotate = function(c) {
                    $(".modal-content").addClass("flip"), $(".login-form-section").fadeOut(600), b(function() {
                        a.showLogin = !c, $(".login-form-section").fadeIn(0), $(".modal-content").removeClass("flip")
                    }, 600)
                }, a.login = function() {
                    a.authError = null;
                    var b = {
                        username: a.user.email,
                        password: a.user.password,
                        rememberMe: a.user.rememberMe
                    };
                    return !a.isValidateCodeLogin || (b.geetest_challenge = challenge, b.geetest_validate = validate, b.geetest_seccode = seccode, challenge && validate && seccode) ? a.user.email ? a.user.password ? void c.login($.param(b)).then(function(b) {
                        challenge = null, validate = null, seccode = null, b ? (selectorA && selectorA(".gt_refresh_button").click(), 1005 === b.code, a.isValidateCodeLogin = b.map.isValidateCodeLogin, a.authReason = "", a.authError = b.msg) : (a.authError = d.get("login.error.invalidCredentials"), submit = !1)
                    }, function(b) {
                        a.authError = d.get("login.error.serverError", {
                            exception: b
                        })
                    }) : (a.authReason = "", void(a.authError = "密码不能为空")) : (a.authReason = "", void(a.authError = "帐号不能为空")) : (a.authReason = "", void(a.authError = "验证码不能为空"))
                }, a.openRegister = function() {
                    e.path("/home/register", !1)
                }, a.clearForm = function() {
                    a.user = {}
                }, a.cancelLogin = function() {
                    c.cancelLogin()
                }, a.reset = function() {
                    a.user = {}, a.retrieve = {}
                };
                var g = "http://api.geetest.com/get.php?gt=1ebc844c9e3a8c23e2ea4b567a8afd2d&time=" + (new Date).getTime();
                a.validateCodeUrl = f.trustAsResourceUrl(g), b(function() {
                    $('input[name="userEmail"]').focus()
                }, 300), a.retrievePassword = function() {
                    return a.retrieve.email ? submit ? challenge && validate && seccode ? void c.retrievePassword(a.retrieve.email, challenge, validate, seccode).then(function(b) {
                        challenge = "", validate = "", seccode = "", 200 == b.data.code ? (a.sendPassword = !0, submit = !1) : (selectorA && selectorA(".gt_refresh_button").click(), 1003 == b.data.code ? a.retrieveError = "账号不存在" : 1005 == b.data.code && (a.retrieveError = "验证码错误"))
                    }) : void(a.retrieveError = "验证码不能为空") : void(a.retrieveError = "验证码匹配错误") : void(a.retrieveError = "邮箱不能为空")
                }
            }
        ]), b.module("security.login.reset", ["services.localizedMessages"]).controller("ResetFormController", ["$scope", "security", "localizedMessages", "$location", "resetKey",
            function(a, b, c, d, e) {
                a.password = {}, a.reset = function() {
                    return a.password.newPw != a.password.confirm ? (a.authError = c.get("login.reset.notmatch"), a.password.newPw = "", a.password.confirm = "", void $('input[name="newPassword"]').focus()) : void b.resetPassByKey(a.password.newPw, e).then(function(b) {
                        200 == b.data.code ? (alert("修改成功"), a.$close(), d.path("/main").search({})) : 1011 == b.data.code && (a.authError = b.data.msg)
                    })
                }, a.cancel = function() {
                    a.$dismiss()
                }
            }
        ]).directive("equals", function() {
            return {
                restrict: "A",
                require: "?ngModel",
                link: function(a, b, c, d) {
                    if (d) {
                        a.$watch(c.ngModel, function() {
                            e()
                        }), c.$observe("equals", function() {
                            e()
                        });
                        var e = function() {
                            var a = d.$viewValue,
                                b = c.equals;
                            d.$setValidity("equals", a === b)
                        }
                    }
                }
            }
        }), b.module("security.login", ["security.login.form", "security.login.reset", "security.login.toolbar"]), b.module("security.login.toolbar", ["services.usercenter"]).directive("loginToolbar", ["security", "$rootScope", "usercenterService",
            function(a, b, c) {
                var d = {
                    templateUrl: "security/login/toolbar.tpl.html",
                    restrict: "E",
                    replace: !0,
                    scope: !0,
                    link: function(d) {
                        d.PREFIX_FILE_HOST = PREFIX_FILE_HOST, d.isAuthenticated = a.isAuthenticated, d.login = a.showLogin, d.logout = a.logout, d.requestResetPassword = a.requestResetPassword, d.isAdvancedUser = b.isAdvancedUser, d.isEditor = b.isEditor, d.isVendorUser = b.isVendorUser, d.$watch(function() {
                            return a.currentUser
                        }, function(a) {
                            d.currentUser = a, d.currentUser.headImg ? /^http.*/.test(a.headImg) && (d.headImg = a.headImg) : d.headImg = CLIENT_CDN + "images/defaultuser.jpg"
                        }), d.$on("minusCount", function(a, b) {
                            d.count -= b, d.newMsgCount = d.count > 9 ? "9+" : d.count
                        }), d.getNewMessage = function(a, b, e) {
                            c.getNewMessage(a, b, e).then(function(a) {
                                d.newMsgs = a.data.list, d.count = a.data.map.count, d.newMsgCount = a.data.map.count > 9 ? "9+" : a.data.map.count
                            })
                        }, d.getNewMessage(1, 4, !0), d.openMsgPanel = function() {
                            $(".mes_con").hasClass("open") || d.getNewMessage(1, 4, !0)
                        }
                    }
                };
                return d
            }
        ]), b.module("security.otherregister.form", ["services.localizedMessages", "app.directives.register"]), b.module("security.otherregister.form").controller("OtherRegisterFormController", ["$scope", "$timeout", "security", "localizedMessages", "$location", "$http", "$window", "otherRegisterInfo",
            function(a, b, c, d, e, f, g, h) {
                a.user = {}, a.user.agreement = !0, a.getUserDetail = function() {
                    var b = {
                        type: "qq",
                        openId: h.openId,
                        accessToken: h.accessToken
                    };
                    c.getUserDetail(b.type, b.openId, b.accessToken).then(function(b) {
                        a.otherUserInfo = b.data.obj
                    })
                }, a.getUserDetail()
            }
        ]), b.module("security.register.form", ["services.localizedMessages", "app.directives.register"]), b.module("security.register.form").controller("RegisterFormController", ["$scope", "$timeout", "security", "localizedMessages", "$location", "$http", "$window",
            function(a, b, c, d, e) {
                a.user = {}, a.user.agreement = !0, a.weiChatUrl = c.thirdPartyUrl.weiChatUrl, a.qqUrl = c.thirdPartyUrl.qqUrl, a.weiboUrl = c.thirdPartyUrl.weiboUrl, a.openWeibo = function() {
                    alert("新浪微博注册功能即将开放!")
                }, a.register = function() {
                    var b = {
                            /* 店舗名称・屋号（法人名）*/
                    		shopname: a.user.shopname,
                    		/* 営業内容（商品・業態等）*/
                    		business: a.user.business,
                    		/* 店舗住所 */
                    		address: a.user.address,
                    		/* 責任者氏名 */
                    		officername: a.user.officername,
                    		/* 店舗電話番号 */
                    		phone: a.user.phone,
                    		/* メールアドレス（登録用）*/
                            email: a.user.email,
                            /* パスワード */
                            password: a.user.password
                        },
                        e = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;

                    if(!a.user.shopname){
						void(a.regErr = "「店舗名称・屋号（法人名）」を入力してください。");
						a.user.shopname.focus();
						return false;
					}
                    if(!a.user.business){
						void(a.regErr = "「営業内容（商品・業態等）」を入力してください。");
						a.user.business.focus();
						return false;
					}
                    if(!a.user.address){
						void(a.regErr = "「店舗住所 ）」を入力してください。");
						a.user.address.focus();
						return false;
					}
                    if(!a.user.officername){
						void(a.regErr = "「責任者氏名」を入力してください。");
						a.user.officername.focus();
						return false;
					}
                    if(!a.user.phone){
						void(a.regErr = "「店舗電話番号」を入力してください。");
						a.user.phone.focus();
						return false;
					} else if (checkphone(a.user.phone)) {
						void(a.regErr = "電話番号が不正です。");
						a.user.phone.focus();
						return false;
					}
					
					if (!e.test(a.user.email)) {
						void(a.regErr = "请输入正确的邮箱格式。");
						a.user.phone.focus();
						return false;
					}
					
					if (!a.user.password) {
						void(a.regErr = "「パスワード」を入力してください。");
						a.user.phone.focus();
						return false;
					}
					
					
					/*
					if (a.user.password != a.user.repeatPassword) {
						a.regErr = d.get("register.error.match");
						return false;
					} else if (!a.user.agreement) {
						a.regErr = d.get("register.error.agreement");
						return false;
					}*/

					return c.register($.param(b)).then(function(b) {
                        b && (a.regErr = b.msg)
                    }, function(b) {
                        a.regErr = d.get("register.error.serverError", {
                            exception: b
                        })
                    })
                }, a.checkUpperCase = function() {
                    /[A-Z]/g.test(a.user.email) && (a.user.email = a.user.email.toLowerCase(), alert("请用小写字母邮箱注册，已将邮箱中的大写字母自动转换成小写"))
                }, a.openLogin = function() {
                    e.path("/home/login", !1)
                }, a.reset = function() {
                    a.user = {}
                }
            }
        ]).controller("BindingController", ["$rootScope", "$scope", "$timeout", "security", "localizedMessages", "$location", "$http", "$window",
            function(a, b) {
                b.qq_url = "https://graph.qq.com/oauth2.0/authorize?response_type=token&client_id=101149132&redirect_uri=" + redirect_uri + "&display=pc", b.weibo_url = "https://api.weibo.com/oauth2/authorize?client_id=3508809852&response_type=token&redirect_uri=" + PREFIX_HOST
            }
        ]), b.module("security.register", ["security.register.form", "security.otherregister.form"]), b.module("security.retryQueue", []).factory("securityRetryQueue", ["$q", "$log",
            function(a, d) {
                var e = [],
                    f = {
                        onItemAddedCallbacks: [],
                        hasMore: function() {
                            return e.length > 0
                        },
                        push: function(a) {
                            e.push(a), b.forEach(f.onItemAddedCallbacks, function(b) {
                                try {
                                    b(a)
                                } catch (c) {
                                    d.error("securityRetryQueue.push(retryItem): callback threw an error" + c)
                                }
                            })
                        },
                        pushRetryFn: function(b, d) {
                            1 === arguments.length && (d = b, b = c);
                            var e = a.defer(),
                                g = {
                                    reason: b,
                                    retry: function() {
                                        a.when(d()).then(function(a) {
                                            e.resolve(a)
                                        }, function(a) {
                                            e.reject(a)
                                        })
                                    },
                                    cancel: function() {
                                        e.reject()
                                    }
                                };
                            return f.push(g), e.promise
                        },
                        retryReason: function() {
                            return f.hasMore() && e[0].reason
                        },
                        cancelAll: function() {
                            for (; f.hasMore();) e.shift().cancel()
                        },
                        retryAll: function() {
                            for (; f.hasMore();) e.shift().retry()
                        }
                    };
                return f
            }
        ]), b.module("security.service", ["security.retryQueue", "security.login", "security.register", "ui.bootstrap.modal"]).factory("security", ["$http", "$q", "$location", "securityRetryQueue", "$modal", "ModalService",
            function(b, c, d, e, f, g) {
                function h(b) {
                    b = b || "/", a.location.href = b
                }

                function i() {
                    if (t && (j(t, !1), t = null), r) throw new Error("Trying to open a dialog that is already open!");
                    r = f.open({
                        windowClass: "login-container",
                        keyboard: !1,
                        templateUrl: "security/login/form.tpl.html",
                        controller: "LoginFormController"
                    }), r.result.then(k, k)
                }

                function j(a, b) {
                    a.close(b)
                }

                function k(a) {
                    r = null, a ? ("/home/login" == d.path() && d.path("/home", !1), e.retryAll()) : (e.cancelAll(), h())
                }

                function l(a) {
                    if (s) throw new Error("Trying to open a dialog that is already open!");
                    s = f.open({
                        windowClass: "login-container",
                        keyboard: !1,
                        templateUrl: "security/login/reset.tpl.html",
                        controller: "ResetFormController",
                        resolve: {
                            resetKey: function() {
                                return a
                            }
                        }
                    }), s.result.then(function() {
                        s = null
                    }, function() {
                        alert("cancel"), w.currentUser || d.path("/home", !1).search({}), s = null
                    })
                }

                function m() {
                    if (r && (j(r, !0), r = null), t) throw new Error("Trying to open a dialog that is already open!");
                    t = f.open({
                        windowClass: "login-container",
                        keyboard: !1,
                        templateUrl: "security/register/register.tpl.html",
                        controller: "RegisterFormController"
                    }), t.result.then(function() {
                        t = null
                    }, k)
                }

                function n(a) {
                    if (u) throw new Error("Trying to open a dialog that is already open!");
                    u = f.open({
                        windowClass: "login-container",
                        keyboard: !1,
                        templateUrl: "security/register/otherregister.tpl.html",
                        controller: "OtherRegisterFormController",
                        resolve: {
                            otherRegisterInfo: function() {
                                return a
                            }
                        }
                    })
                }

                function o(a) {
                    v = a
                }

                function p() {
                    return v
                }
                var q = {
                        2: {
                            code: 5,
                            name: "普通用户"
                        },
                        3: {
                            code: 5,
                            name: "运维用户"
                        },
                        4: {
                            code: 7,
                            name: "编辑用户"
                        },
                        5: {
                            code: 5,
                            name: "编辑用户"
                        },
                        10: {
                            code: 7,
                            name: "高级用户"
                        },
                        11: {
                            code: 7,
                            name: "服务商用户"
                        }
                    },
                    r = null,
                    s = null,
                    t = null,
                    u = null;
                e.onItemAddedCallbacks.push(function() {
                    e.hasMore() && ("unauthorized-server" == e.retryReason() && w.showLogin(), "down-server" == e.retryReason() && g.openMsgDialog({
                        msg: "服务器忙碌，请稍后再试！"
                    }))
                });
                var v = {},
                    w = {
                        getLoginReason: function() {
                            return e.retryReason()
                        },
                        showLogin: function() {
                            i()
                        },
                        showRegister: function() {
                            m()
                        },
                        showOtherRegister: function() {
                            n()
                        },
                        getUserDetail: function(a, c, d) {
                            var e = PREFIX_URL + "base/relUserInfo?type=" + a + "&openId=" + c + "&accessToken=" + d,
                                f = new Date;
                            return e += "&date=" + f.getTime(), b({
                                method: "GET",
                                url: e,
                                withCredentials: !0
                            })
                        },
                        addRegisterInfo: o,
                        getRegisterInfo: p,
                        login: function(a) {
                            var c = this,
                                e = b.post(JSON_URL + "?c=user&a=login", a, {
                                    withCredentials: !0,
                                    headers: {
                                        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
                                    }
                                });
                            return e.then(function(a) {
                                if (200 === a.data.code) {
                                    if (c.isValidateCodeLogin = !1, a.data.success !== !0) return a.data;
                                    ("/home" == d.path() || "/home/login" == d.path()) && d.path("main"), w.requestCurrentUser(), j(r, !0)
                                } else{
									w.isAuthenticated()
								}
                            }, function() {
                                w.isAuthenticated()
                            })
                        },
                        register: function(a) {
                            var c = b.post(JSON_URL + "?c=user&a=register", a, {
                                withCredentials: !0,
                                headers: {
                                    "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
                                }
                            });
                            return c.then(function(a) {
                                if (200 === a.status) {
                                    if (a.data.success !== !0) return a.data;
                                    ("/home" == d.path() || "/home/register" == d.path()) && d.path("main"), w.requestCurrentUser(), j(t, !0)
                                } else w.isAuthenticated()
                            }, function() {
                                w.isAuthenticated()
                            })
                        },
                        thirdPartLogin: function(a) {
                            var c = b.post(PREFIX_URL + "eqs/relAccount", $.param(a), {
                                withCredentials: !0,
                                headers: {
                                    "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
                                }
                            });
                            return c.then(function(a) {
                                if (200 === a.status) {
                                    if (a.data.success !== !0) return a.data;
                                    ("/home" == d.path() || "/home/login" == d.path()) && d.path("main"), w.requestCurrentUser(), j(u, !0)
                                } else w.isAuthenticated()
                            }, function() {
                                w.isAuthenticated()
                            })
                        },
                        weiChatLogin: function(a) {
                            return b.post(PREFIX_URL + "eqs/relWechatAccount?code=" + a + "&isMobile=1&time=" + (new Date).getTime(), {}, {
                                withCredentials: !0,
                                headers: {
                                    "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
                                }
                            })
                        },
                        cancelRegister: function() {
                            j(t, !1), h("#/reg")
                        },
                        hasRel: function(a) {
                            t && j(t, !1);
                            var c = new Date,
                                e = PREFIX_URL + "base/user/hasRel?type=" + a.type + "&openId=" + a.openId + "&time=" + c.getTime(),
                                f = b.get(e, {
                                    withCredentials: !0
                                });
                            f.then(function(b) {
                                200 === b.status ? b.data.success === !0 ? (("/home" == d.path() || "/home/login" == d.path()) && d.path("main"), w.requestCurrentUser()) : "未关联账号" == b.data.msg && n(a) : w.isAuthenticated()
                            }, function() {
                                w.isAuthenticated()
                            })
                        },
                        cancelLogin: function() {
                            j(r, !1), h()
                        },
                        logout: function(a) {
                            b({
                                withCredentials: !0,
                                method: "GET",
                                url: PREFIX_URL + "logout"
                            }).then(function() {
                                w.currentUser = null, h(a)
                            }, function() {
                                w.currentUser = null, h(a)
                            })
                        },
                        requestCurrentUser: function() {
                            if (w.isAuthenticated()) return c.when(w.currentUser);
                            var a = new Date;
                            return b.get(JSON_URL + "?c=user&a=check&time=" + a.getTime(), {
                                withCredentials: !0
                            }).then(function(a) {
                                return a && (w.currentUser = a.data.obj, (!w.currentUser.roleIdList || w.currentUser.roleIdList.length <= 0) && (w.currentUser.roleIdList = [2])), w.currentUser
                            })
                        },
                        resetPassByKey: function(a, c) {
                            var d = {
                                key: c,
                                newPwd: a
                            };
                            return b.post(PREFIX_URL + "eqs/pwd/reset", $.param(d), {
                                withCredentials: !0,
                                headers: {
                                    "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
                                }
                            })
                        },
                        currentUser: null,
                        isAuthenticated: function() {
                            return !!w.currentUser
                        },
                        accessDef: {
                            CREATE_STYLE_SETTING: 1,
                            SCENE_HIDE_LASTPAGE_SETTING: 2,
                            CREATE_SCROLL_IMAGE: 4
                        },
                        thirdPartyUrl: {
                            weiChatUrl: "https://open.weixin.qq.com/connect/qrconnect?appid=wxc5f1bbae4bb93ced&redirect_uri=http%3A%2F%2Fpzhwc.com&response_type=code&scope=snsapi_login&state=STATE#wechat_redirect",
                            qqUrl: "https://graph.qq.com/oauth2.0/authorize?response_type=token&client_id=101149132&redirect_uri=http%3A%2F%2Fpzhwc.com&scope=get_user_info",
                            weiboUrl: "https://api.weibo.com/oauth2/authorize?client_id=3508809852&response_type=token&redirect_uri=http://pzhwc.com"
                        },
                        isAllowToAccess: function(a) {
                            for (var b = 0; b < w.currentUser.roleIdList.length; b++)
                                if (q[w.currentUser.roleIdList[b]]) {
                                    var c = q[w.currentUser.roleIdList[b]].code;
                                    if ((c & a) > 0) return !0
                                }
                            return !1
                        },
                        isEditor: function() {
                            if (!w.currentUser) return !1;
                            var a = w.currentUser.roleIdList;
                            if (!a) return !1;
                            for (var b = 0; b < a.length; b++)
                                if ("4" == a[b]) return !0;
                            return !1
                        },
                        isAdvancedUser: function() {
                            if (!w.currentUser) return !1;
                            var a = w.currentUser.roleIdList;
                            if (!a) return !1;
                            for (var b = 0; b < a.length; b++)
                                if ("10" == a[b]) return !0;
                            return !1
                        },
                        isVendorUser: function() {
                            if (!w.currentUser) return !1;
                            var a = w.currentUser.roleIdList;
                            if (!a) return !1;
                            for (var b = 0; b < a.length; b++)
                                if ("11" == a[b]) return !0;
                            return !1
                        },
                        requestResetPassword: function(a) {
                            l(a)
                        },
                        validateToken: function(a) {
                            var c = "changepw?token=" + a;
                            return b.get(PREFIX_URL + c, {
                                withCredentials: !0
                            })
                        },
                        resetPassword: function(a, c) {
                            var d = PREFIX_URL + "m/base/user/changePwd",
                                e = {
                                    oldPwd: a,
                                    newPwd: c
                                };
                            return b.post(d, $.param(e), {
                                withCredentials: !0,
                                headers: {
                                    "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
                                }
                            })
                        },
                        retrievePassword: function(a, c, d, e) {
                            var f = PREFIX_URL + "eqs/pwd/retrieve",
                                g = {
                                    email: a,
                                    geetest_challenge: c,
                                    geetest_validate: d,
                                    geetest_seccode: e
                                };
                            return b.post(f, $.param(g), {
                                withCredentials: !0,
                                headers: {
                                    "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
                                }
                            })
                        }
                    };
                return w
            }
        ]), b.module("services.breadcrumbs", []), b.module("services.breadcrumbs").factory("breadcrumbs", ["$rootScope", "$location",
            function(a, b) {
                var c = [],
                    d = {};
                return a.$on("$routeChangeSuccess", function() {
                    var a, d = b.path().split("/"),
                        e = [],
                        f = function(a) {
                            return "/" + d.slice(0, a + 1).join("/")
                        };
                    for (d.shift(), a = 0; a < d.length; a++) e.push({
                        name: d[a],
                        path: f(a)
                    });
                    c = e
                }), d.getAll = function() {
                    return c
                }, d.getFirst = function() {
                    return c[0] || {}
                }, d
            }
        ]), b.module("services.crud", ["services.crudRouteProvider"]), b.module("services.crud").factory("crudEditMethods", function() {
            return function(a, c, d, e, f) {
                var g = {};
                return g[a] = c, g[a + "Copy"] = b.copy(c), g.save = function() {
                    this[a].$saveOrUpdate(e, e, f, f)
                }, g.canSave = function() {
                    return this[d].$valid && !b.equals(this[a], this[a + "Copy"])
                }, g.revertChanges = function() {
                    this[a] = b.copy(this[a + "Copy"])
                }, g.canRevert = function() {
                    return !b.equals(this[a], this[a + "Copy"])
                }, g.remove = function() {
                    this[a].$id() ? this[a].$remove(e, f) : e()
                }, g.canRemove = function() {
                    return c.$id()
                }, g.getCssClasses = function(a) {
                    var b = this[d][a];
                    return {
                        error: b.$invalid && b.$dirty,
                        success: b.$valid && b.$dirty
                    }
                }, g.showError = function(a, b) {
                    return this[d][a].$error[b]
                }, g
            }
        }), b.module("services.crud").factory("crudListMethods", ["$location",
            function(a) {
                return function(b) {
                    var c = {};
                    return c["new"] = function() {
                        a.path(b + "/new")
                    }, c.edit = function(c) {
                        a.path(b + "/" + c)
                    }, c
                }
            }
        ]),
        function() {
            function a(a) {
                this.$get = b.noop, this.routesFor = function(d, e, f) {
                    var g = d.toLowerCase(),
                        h = "/" + d.toLowerCase();
                    f = f || e, b.isString(e) && "" !== e && (g = e + "/" + g), null !== f && f !== c && "" !== f && (h = "/" + f + h);
                    var i = function(a) {
                            return g + "/" + d.toLowerCase() + "-" + a.toLowerCase() + ".tpl.html"
                        },
                        j = function(a) {
                            return d + a + "Ctrl"
                        },
                        k = {
                            whenList: function(a) {
                                return k.when(h, {
                                    templateUrl: i("List"),
                                    controller: j("List"),
                                    resolve: a
                                }), k
                            },
                            whenNew: function(a) {
                                return k.when(h + "/new", {
                                    templateUrl: i("Edit"),
                                    controller: j("Edit"),
                                    resolve: a
                                }), k
                            },
                            whenEdit: function(a) {
                                return k.when(h + "/:itemId", {
                                    templateUrl: i("Edit"),
                                    controller: j("Edit"),
                                    resolve: a
                                }), k
                            },
                            when: function(b, c) {
                                return a.when(b, c), k
                            },
                            otherwise: function(b) {
                                return a.otherwise(b), k
                            },
                            $routeProvider: a
                        };
                    return k
                }
            }
            a.$inject = ["$routeProvider"], b.module("services.crudRouteProvider", ["ngRoute"]).provider("crudRoute", a)
        }(), b.module("services.data", []), b.module("services.data").factory("dataService", ["$http",
            function(a) {
                var b = {};
                return b.getDataBySceneId = function(b, c, d) {
                    c = c || 1, d = d || 10;
                    var e = "?c=scenedata&a=getdata&id=" + b + "&pageNo=" + c + "&pageSize=" + d,
                        f = new Date;
                    return e += "&time=" + f.getTime(), a({
                        withCredentials: !0,
                        method: "GET",
                        url: JSON_URL + e
                    })
                }, b.getDataDetail = function(b) {
                    var c = "m/c/detail/" + b,
                        d = new Date;
                    return c += "?time=" + d.getTime(), a({
                        withCredentials: !0,
                        method: "GET",
                        url: PREFIX_URL + c
                    })
                }, b.getAllData = function(b) {
                    var c = "m/c/data?pageSize=10&pageNo=" + b,
                        d = new Date;
                    return c += "&time=" + d.getTime(), a({
                        withCredentials: !0,
                        method: "GET",
                        url: PREFIX_URL + c
                    })
                }, b.getProspectDataAccount = function() {
                    var b = "m/c/prospectCount?time=" + (new Date).getTime();
                    return a('')
                }, b.getAllPageView = function() {
                    var b = "?c=scene&a=pvcount&time=" + (new Date).getTime();
                    return a({
                        withCredentials: !0,
                        method: "GET",
                        url: JSON_URL + b
                    })
                }, b.deleteDataById = function(b) {
                    var c = "m/c/delete/" + b;
                    return a({
                        withCredentials: !0,
                        method: "GET",
                        url: PREFIX_URL + c
                    })
                }, b.getAllDataCount = function() {
                    var b = "c-count.php",
                        c = new Date;
                    return b += "?time=" + c.getTime(), a({
                        withCredentials: !0,
                        method: "GET",
                        url: PREFIX_URL + b
                    })
                }, b.getOpenCount = function() {
                    var b = "?c=scene&a=opencount",
                        c = new Date;
                    return b += "&time=" + c.getTime(), a({
                        withCredentials: !0,
                        method: "GET",
                        url: JSON_URL + b
                    })
                }, b.getAllSceneDataCount = function() {
                    var b = "?c=scenedata&a=getcount",
                        c = new Date;
                    return b += "&time=" + c.getTime(), a({
                        withCredentials: !0,
                        method: "GET",
                        url: JSON_URL + b
                    })
                }, b.saveData = function(b) {
                    var c = PREFIX_URL + "m/c/save",
                        d = a.post(c, b, {
                            withCredentials: !0,
                            headers: {
                                "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
                            }
                        });
                    return d.then(function(a) {
                        200 === a.status && (a.data.success === !0 || alert(a.data.msg))
                    }, function() {})
                }, b.getSceneField = function(b) {
                    var c = "m/c/formField/" + b,
                        d = new Date;
                    return c += "?time=" + d.getTime(), a({
                        withCredentials: !0,
                        method: "GET",
                        url: PREFIX_URL + c
                    })
                }, b.getPremergeScenes = function() {
                    var b = "m/scene/newDataScene",
                        c = new Date;
                    return b += "?time=" + c.getTime(), a({
                        withCredentials: !0,
                        method: "GET",
                        url: PREFIX_URL + b
                    })
                }, b.mergeSceneData = function(b, c) {
                    var d = "m/c/imps/" + b;
                    return a({
                        withCredentials: !0,
                        method: "POST",
                        url: PREFIX_URL + d,
                        headers: {
                            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
                        },
                        data: $.param(c)
                    })
                }, b
            }
        ]), b.module("services.exceptionHandler", ["services.i18nNotifications"]), b.module("services.exceptionHandler").factory("exceptionHandlerFactory", ["$injector",
            function(a) {
                return function(b) {
                    return function(c, d) {
                        var e = a.get("i18nNotifications");
                        b(c, d), e.pushForCurrentRoute("error.fatal", "error", {}, {
                            exception: c,
                            cause: d
                        })
                    }
                }
            }
        ]), b.module("services.exceptionHandler").config(["$provide",
            function(a) {
                a.decorator("$exceptionHandler", ["$delegate", "exceptionHandlerFactory",
                    function(a, b) {
                        return b(a)
                    }
                ])
            }
        ]), b.module("services.file", []), b.module("services.file").factory("fileService", ["$http",
            function(a) {
                var b = {};
                return b.listFileCategory = function(b) {
                    var c = "class-" + ("1" == b ? "tpType" : "bgType")+".htm",
                        d = new Date;
                    return c += "?time=" + d.getTime(), a({
                        withCredentials: !0,
                        method: "GET",
                        url: PREFIX_URL + c
                    })
                }, b.deleteFile = function(b) {
                    var c = JSON_URL+"?c=upfile&a=delete",
                        d = {
                            id: b,
                            keycode: getCookie("MD5STR"),
                            UID: getCookie("USERID")
                        };
                    return a({
                        withCredentials: !0,
                        method: "POST",
                        url: c,
                        headers: {
                            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
                        },
                        data: $.param(d)
                    })
                }, b.createCategory = function(b) {
                    var c = "?c=tag&a=create",
                        d = {
                            tagName: b
                        };
                    return a({
                        withCredentials: !0,
                        method: "POST",
                        url: JSON_URL + c,
                        headers: {
                            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
                        },
                        data: $.param(d)
                    })
                }, b.getCustomTags = function() {
                    var b = "?c=tag&a=my&?time" + (new Date).getTime();
                    return a({
                        withCredentials: !0,
                        method: "GET",
                        url: JSON_URL + b
                    })
                }, b.deleteTag = function(b) {
                    var c = "?c=tag&a=delete",
                        d = {
                            id: b
                        };
                    return a({
                        withCredentials: !0,
                        method: "POST",
                        url: JSON_URL + c,
                        headers: {
                            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
                        },
                        data: $.param(d)
                    })
                }, b.setCategory = function(b, c) {
                    var d = "?c=tag&a=set",
                        e = {
                            tagId: b,
                            fileIds: c
                        };
                    return a({
                        withCredentials: !0,
                        method: "POST",
                        url: JSON_URL + d,
                        headers: {
                            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
                        },
                        data: $.param(e)
                    })
                }, b.getImagesByTag = function(b, c, d, e) {
                    var f = "?c=upfile&a=userlist&";
                    return f += "fileType=" + c, b && (f += "&tagId=" + b), f += "&pageNo=" + (d ? d : 1), f += "&pageSize=" + (e ? e : 12), f += "&time=" + (new Date).getTime(), a({
                        withCredentials: !0,
                        method: "GET",
                        url: JSON_URL + f
                    })
                }, b.getImagesBySysTag = function(b, c, d, e, f) {
                    var g = "?c=upfile&a=syslist&";
                    return g += "tagId=" + b, g += "&fileType=" + c, g += "&bizType=" + f, g += "&pageNo=" + (d ? d : 1), g += "&pageSize=" + (e ? e : 12), g += "&time=" + (new Date).getTime(), a({
                        withCredentials: !0,
                        method: "GET",
                        url: JSON_URL + g
                    })
                }, b.unsetTag = function(b, c) {
                    var d = "m/base/file/tag/unset",
                        e = {
                            tagId: b,
                            fileIds: c
                        };
                    return a({
                        withCredentials: !0,
                        method: "POST",
                        url: PREFIX_URL + d,
                        headers: {
                            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
                        },
                        data: $.param(e)
                    })
                }, b.getChildCategory = function(b) {
                    var c = "?c=upfile&a=systag&type=11";
                    return b && (c += "&bizType=" + b), c += (/\?/.test(c) ? "&" : "?") + "time=" + (new Date).getTime(), a({
                        withCredentials: !0,
                        method: "GET",
                        url: JSON_URL + c
                    })
                }, b.getFileByCategory = function(b, c, d, e) {
                    var f = "?c=upfile&a=syslist&";
                    0 == d && 2 == e && (f = "?c=upfile&a=userlist&"), f += "pageNo=" + (b ? b : 1), f += "&pageSize=" + (c ? c : 12), d && "all" != d && (f += "&bizType=" + (d ? d : -1)), f += "&fileType=" + (e ? e : -1);
                    var g = new Date;
                    return f += "&time=" + g.getTime(), a({
                        withCredentials: !0,
                        method: "GET",
                        url: JSON_URL + f
                    })
                }, b.cropImage = function(b) {
                    var c = "m/base/file/crop";
                    return a({
                        withCredentials: !0,
                        method: "POST",
                        url: PREFIX_URL + c,
                        headers: {
                            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
                        },
                        data: $.param(b)
                    })
                }, b
            }
        ]), b.module("services.httpRequestTracker", []), b.module("services.httpRequestTracker").factory("httpRequestTracker", ["$http",
            function(a) {
                var b = {};
                return b.hasPendingRequests = function() {
                    return a.pendingRequests.length > 0
                }, b
            }
        ]), b.module("services.i18nNotifications", ["services.notifications", "services.localizedMessages"]), b.module("services.i18nNotifications").factory("i18nNotifications", ["localizedMessages", "notifications",
            function(a, c) {
                var d = function(c, d, e, f) {
                        return b.extend({
                            message: a.get(c, e),
                            type: a.get(d, e)
                        }, f)
                    },
                    e = {
                        pushSticky: function(a, b, e, f) {
                            return c.pushSticky(d(a, b, e, f))
                        },
                        pushForCurrentRoute: function(a, b, e, f) {
                            return c.pushForCurrentRoute(d(a, b, e, f))
                        },
                        pushForNextRoute: function(a, b, e, f) {
                            return c.pushForNextRoute(d(a, b, e, f))
                        },
                        getCurrent: function() {
                            return c.getCurrent()
                        },
                        remove: function(a) {
                            return c.remove(a)
                        }
                    };
                return e
            }
        ]), b.module("services.localizedMessages", []).factory("localizedMessages", ["$interpolate", "I18N.MESSAGES",
            function(a, b) {
                var c = function(a, b) {
                    return a || "?" + b + "?"
                };
                return {
                    get: function(d, e) {
                        var f = b[d];
                        return f ? a(f)(e) : c(f, d)
                    }
                }
            }
        ]), b.module("services.mine", []), b.module("services.mine").factory("MineService", ["$http",
            function(a) {
                var b = {};
                return b.getMyScenes = function(b, c, d, deviceId, showPage) {
                    var e = "?c=scene&a=my&type";
                    b && (e += "=" + b), e += "&deviceId=" + (deviceId ? deviceId : 0), e += "&pageNo=" + (c ? c : 1), e += "&pageSize=" + (d ? d : 12),showPage && (e+="&showPage=1");
                    var f = new Date;
                    return e += (/\?/.test(e) ? "&" : "?") + "time=" + f.getTime(), a({
                        withCredentials: !0,
                        method: "GET",
                        url: JSON_URL + e
                    })
                }, b
            }
        ]), b.module("services.modal", ["confirm-dialog", "message-dialog"]).factory("ModalService", ["$modal",
            function(a) {
                var b = {};
                return b.openConfirmDialog = function(b, c, d) {
                    a.open({
                        backdrop: "static",
                        keyboard: !1,
                        backdropClick: !1,
                        windowClass: "confirm-dialog",
                        templateUrl: "dialog/confirm.tpl.html",
                        controller: "ConfirmDialogCtrl",
                        resolve: {
                            confirmObj: function() {
                                return b
                            }
                        }
                    }).result.then(c, d)
                }, b.openMsgDialog = function(b, c, d) {
                    a.open({
                        backdrop: "static",
                        keyboard: !1,
                        backdropClick: !1,
                        windowClass: "message-dialog",
                        templateUrl: "dialog/message.tpl.html",
                        controller: "MessageDialogCtrl",
                        resolve: {
                            msgObj: function() {
                                return b
                            }
                        }
                    }).result.then(c, d)
                }, b
            }
        ]), b.module("I18N.MESSAGES", []).constant("I18N.MESSAGES", {
            "notify.success": "success",
            "notify.info": "info",
            "notify.danger": "danger",
            "notify.warning": "warning",
            "errors.route.changeError": "Route change error",
            "crud.user.save.success": "A user with id '{{id}}' was saved successfully.",
            "crud.user.remove.success": "A user with id '{{id}}' was removed successfully.",
            "crud.user.remove.error": "Something went wrong when removing user with id '{{id}}'.",
            "crud.user.save.error": "Something went wrong when saving a user...",
            "crud.project.save.success": "A project with id '{{id}}' was saved successfully.",
            "crud.project.remove.success": "A project with id '{{id}}' was removed successfully.",
            "crud.project.save.error": "Something went wrong when saving a project...",
            "login.reason.notAuthorized": "离开久了，麻烦再登录一次吧！",
            "login.reason.notAuthenticated": "离开久了，麻烦再登录一次吧！",
            "login.error.invalidCredentials": "登录失败，帐号和密码不正确或者用户已到期。",
            "login.error.serverError": "There was a problem with authenticating: {{exception}}.",
            "register.error.serverError": "There was a problem with authenticating: {{exception}}.",
            "login.reset.notmatch": "新密码和重复密码不匹配",
            "register.error.match": "两次输入密码不一致",
            "register.error.agreement": "请先同意注册协议再完成注册",
            "file.bg.pageSize": "18",
            "scene.save.success.published": "场景已保存成功！",
            "scene.save.success.nopublish": "保存成功，还需要发布哦！",
            "scene.publish.success": "发布成功！"
        }), b.module("services.notifications", []).factory("notifications", ["$rootScope",
            function(a) {
                var c = {
                        STICKY: [],
                        ROUTE_CURRENT: [],
                        ROUTE_NEXT: []
                    },
                    d = {},
                    e = function(a, c) {
                        if (!b.isObject(c)) throw new Error("Only object can be added to the notification service");
                        return a.push(c), c
                    };
                return a.$on("$routeChangeSuccess", function() {
                    c.ROUTE_CURRENT.length = 0, c.ROUTE_CURRENT = b.copy(c.ROUTE_NEXT), c.ROUTE_NEXT.length = 0
                }), d.getCurrent = function() {
                    return [].concat(c.STICKY, c.ROUTE_CURRENT)
                }, d.pushSticky = function(a) {
                    return e(c.STICKY, a)
                }, d.pushForCurrentRoute = function(a) {
                    return e(c.ROUTE_CURRENT, a)
                }, d.pushForNextRoute = function(a) {
                    return e(c.ROUTE_NEXT, a)
                }, d.remove = function(a) {
                    b.forEach(c, function(b) {
                        var c = b.indexOf(a);
                        c > -1 && b.splice(c, 1)
                    })
                }, d.removeAll = function() {
                    b.forEach(c, function(a) {
                        a.length = 0
                    })
                }, d
            }
        ]), b.module("services.pagetpl", []), b.module("services.pagetpl").factory("pageTplService", ["$http", "$rootScope", "$modal", "$q",
            function(a) {
                var b = {};
                return b.getPageTpls = function(b) {
                    var c = "?c=scene&a=syspagetpl&id=" + b,
                        d = new Date;
                    return c += (/\?/.test(c) ? "&" : "?") + "time=" + d.getTime(), a({
                        withCredentials: !0,
                        method: "GET",
                        url: JSON_URL + c
                    })
                }, b.getPageTplTypes = function() {
                    var b = "pageTplType.htm",
                        c = new Date;
                    return b += (/\?/.test(b) ? "&" : "?") + "time=" + c.getTime(), a({
                        withCredentials: !0,
                        method: "GET",
                        url: PREFIX_URL + b
                    })
                }, b.getPageTagLabel = function(b) {
                    var c = "?c=upfile&a=systag&type=1";
                    null != b && (c += (/\?/.test(c) ? "&" : "?") + "bizType=" + b);
                    var d = new Date;
                    return c += (/\?/.test(c) ? "&" : "?") + "time=" + d.getTime(), a({
                        withCredentials: !0,
                        method: "GET",
                        url: JSON_URL + c
                    })
                }, b.getPageTagLabelCheck = function(b) {
                    var c = "/m/scene/tag/page/list?id=" + b,
                        d = new Date;
                    return c += (/\?/.test(c) ? "&" : "?") + "time=" + d.getTime(), a({
                        withCredentials: !0,
                        method: "GET",
                        url: PREFIX_URL + c
                    })
                }, b.getPageTplTypestemp = function(b, c) {
                    var d = "?c=scene&a=syspagetpl",
                        e = new Date;
                    return null != b && (d += (/\?/.test(d) ? "&" : "?") + "tagId=" + b), null != c && (d += (/\?/.test(d) ? "&" : "?") + "bizType=" + c), d += (/\?/.test(d) ? "&" : "?") + "time=" + e.getTime(), a({
                        withCredentials: !0,
                        method: "GET",
                        url: JSON_URL + d
                    })
                }, b.updataChildLabel = function(b, c) {
                    var d = "/m/eqs/tag/page/set/?ids=" + b;
                    null != c && (d += (/\?/.test(d) ? "&" : "?") + "pageId=" + c);
                    var e = new Date;
                    return d += (/\?/.test(d) ? "&" : "?") + "time=" + e.getTime(), a({
                        withCredentials: !0,
                        method: "POST",
                        url: PREFIX_URL + d
                    })
                }, b
            }
        ]), b.module("services.sample", []).factory("sampleService", ["$rootScope", "$http",
            function(a, b) {
                var c = {};
                return c.getSamples = function(a, c, d) {
                    var e = PREFIX_S1_URL + "eqs/promotion";
                    return a && (e += "?type=" + a), c && (e += /\?/.test(e) ? "&" : "?", e += "pageNo=" + c), d && (e += /\?/.test(e) ? "&" : "?", e += "pageSize=" + d), e += (/\?/.test(e) ? "&" : "?") + "time=" + (new Date).getTime(), b({
                        withCredentials: !0,
                        method: "GET",
                        url: e
                    })
                }, c.getSamplesPV = function() {
                    var a = PREFIX_S1_URL + "eqs/topThree?time=" + (new Date).getTime();
                    return b({
                        withCredentials: !0,
                        method: "GET",
                        url: a
                    })
                }, c
            }
        ]), b.module("services.scene", ["scene.create.console"]), b.module("services.scene").factory("sceneService", ["$http", "$rootScope", "$modal", "$q", "security", "$cacheFactory",
            function(a, c, d, e, f, g) {
                function h(a, b) {
                    var c = {},
                        d = $(".edit_area"),
                        e = d.children().last(),
                        f = d.children(".maxIndex"),
                        g = 0;
                    if (g = f.length > 0 ? parseInt(f.css("z-index")) + 1 : e.length > 0 ? parseInt(e.css("z-index")) + 1 : 101, b) return b.zIndex = g, b;
                    var h = e;
                    return c = h.length <= 0 ? {
                        top: "30px",
                        left: "0px"
                    } : h.position().top + h.outerHeight() > $(".edit_area").outerHeight() - 10 ? {
                        top: h.position().top,
                        left: h.position().left + 10 + "px"
                    } : {
                        top: h.position().top + h.outerHeight() + 10 + "px",
                        left: h.position().left + "px"
                    }, c.zIndex = g, c
                }

                function i(a, b) {
                    var c = parseInt(a.css.top.substring(0, a.css.top.length - 2)) + 34 * C.sameCopyCount,
                        d = parseInt(a.css.left.substring(0, a.css.left.length - 2));
                    c + 34 > $(".edit_area").outerHeight() ? (b.css.top = c + "px", b.css.left = d + 10 + "px") : (b.css.top = c + 34 + "px", b.css.left = a.css.left, C.sameCopyCount++)
                }

                function j(a, b, c) {
                    var d, e = {};
                    if (3 == ("" + a).charAt(0)) {
                        if ($("#editBG:visible").length > 0) {
                            var f;
                            for (f = 0; f < F.length; f++)
                                if (3 == F[f].type) {
                                    e = F[f];
                                    break
                                }
                            return e
                        }
                        e = {
                            content: null,
                            css: {},
                            id: 100 * Math.random(),
                            num: 0,
                            pageId: E.obj.id,
                            properties: {
                                bgColor: null,
                                imgSrc: null
                            },
                            sceneId: E.obj.sceneId,
                            title: null,
                            type: 3
                        }
                    }
                    return 1 == ("" + a).charAt(0) && (e = {
                        id: Math.ceil(100 * Math.random()),
                        properties: {
                            title: "提交"
                        },
                        type: 1,
                        pageId: E.obj.id,
                        sceneId: E.obj.sceneId
                    }), 8 == ("" + a).charAt(0) && (d = h(a, b), $.extend(!0, d, {
                        color: "#676767",
                        borderWidth: "1",
                        borderStyle: "solid",
                        borderColor: "#ccc",
                        borderRadius: "5",
                        backgroundColor: "#f9f9f9"
                    }), e = {
                        content: "",
                        css: d,
                        id: Math.ceil(100 * Math.random()),
                        num: 1,
                        pageId: E.obj.id,
                        properties: {
                            title: "一键拨号",
                            number: ""
                        },
                        sceneId: E.obj.sceneId,
                        title: null,
                        type: 8
                    }), 2 == ("" + a).charAt(0) && (d = h(a, b), e = {
                        content: "点击此处进行编辑",
                        css: d,
                        id: Math.ceil(100 * Math.random()),
                        num: 1,
                        pageId: E.obj.id,
                        properties: {},
                        sceneId: E.obj.sceneId,
                        title: null,
                        type: 2
                    }), 4 == ("" + a).charAt(0) && (d = h(a, b), d.width = "100px", d.height = "100px", e = {
                        content: "",
                        css: d,
                        id: Math.ceil(100 * Math.random()),
                        num: 1,
                        pageId: E.obj.id,
                        properties: {
                            width: "100px",
                            height: "100px",
                            src: ""
                        },
                        sceneId: E.obj.sceneId,
                        title: null,
                        type: 4
                    }), 5 == ("" + a).charAt(0) && (d = h(a, b), $.extend(!0, d, {
                        color: "#676767",
                        borderWidth: "1",
                        borderStyle: "solid",
                        borderColor: "#ccc",
                        borderRadius: "5",
                        backgroundColor: "#f9f9f9"
                    }), e = {
                        content: "",
                        css: d,
                        id: Math.ceil(100 * Math.random()),
                        num: 1,
                        pageId: E.obj.id,
                        properties: {
                            placeholder: "请命名"
                        },
                        isInput: 1,
                        sceneId: E.obj.sceneId,
                        title: "请命名",
                        type: 5
                    }), 6 == ("" + a).charAt(0) && (d = h(a, b), $.extend(!0, d, {
                        color: "#676767",
                        borderWidth: "1",
                        borderStyle: "solid",
                        borderColor: "#ccc",
                        borderRadius: "5",
                        backgroundColor: "#f9f9f9"
                    }), e = {
                        content: "",
                        css: d,
                        id: Math.ceil(100 * Math.random()),
                        num: 1,
                        pageId: E.obj.id,
                        properties: {
                            title: "提交"
                        },
                        sceneId: E.obj.sceneId,
                        title: null,
                        type: 6
                    }), "p" == a && (d = h(a, b), e = {
                        content: "",
                        css: d,
                        id: Math.ceil(100 * Math.random()),
                        num: 1,
                        pageId: E.obj.id,
                        properties: {
                            title: "图集"
                        },
                        sceneId: E.obj.sceneId,
                        title: null,
                        type: "p"
                    }), "v" == a && (d = h(a, b), d.width = "48px", d.height = "48px", e = {
                        content: "",
                        css: d,
                        id: Math.ceil(100 * Math.random()),
                        num: 1,
                        pageId: E.obj.id,
                        properties: {
                            src: ""
                        },
                        sceneId: E.obj.sceneId,
                        title: null,
                        type: "v"
                    }), c && $.extend(!0, e, c), F.push(e), G[e.id] = e, e
                }

                function k(a, b) {
                    var d = D.wrapComp(b, "edit");
                    $(".edit_area").append(d);
                    for (var e = D.getInterceptors(), f = 0; f < e.length; f++) e[f](d, b);
                    D.getEventHandlers()[("" + a).charAt(0)](d, b), c.$broadcast("dom.changed")
                }

                function l(a) {
                    var b = [];
                    return "g101" == a && (b.push(I("501")), b.push(I("502")), b.push(I("503")), b.push(I("601"))), b
                }

                function m(a, b) {
                    $(a).css("cursor", "text"), $(a).parents("li").hasClass("inside-active") || ($(a).bind("click", function(a) {
                        a.stopPropagation()
                    }), $(document).bind("mousedown", function() {
                        $(a).css("cursor", "default"), $("#btn-toolbar").find("input[type=text][data-edit]").blur(), $("#btn-toolbar") && $("#btn-toolbar").remove(), $(a).unbind("click"), b.content = $(a).html(), $(a).parents("li").removeClass("inside-active").css("user-select", "none"), $(a).removeAttr("contenteditable"), $(document).unbind("mousedown")
                    }), $(a).parents("li").addClass("inside-active").css("user-select", "initial"), c.$broadcast("text.click", a))
                }

                function n(a) {
                    x(a, function(b) {
                        a.properties.src = b.data;
                        var c = b.width / b.height,
                            d = $("#" + a.id);
                        if (d.length > 0) {
                            var e = $("#inside_" + a.id).width(),
                                f = $("#inside_" + a.id).height(),
                                g = e / f;
                            c >= g ? (d.outerHeight(f), d.outerWidth(f * c), d.css("marginLeft", -(d.outerWidth() - e) / 2), d.css("marginTop", 0)) : (d.outerWidth(e), d.outerHeight(e / c), d.css("marginTop", -(d.outerHeight() - f) / 2), d.css("marginLeft", 0)), d.attr("src", PREFIX_FILE_HOST + b.data), a.properties.imgStyle = {}, a.properties.imgStyle.width = d.outerWidth(), a.properties.imgStyle.height = d.outerHeight(), a.properties.imgStyle.marginTop = d.css("marginTop"), a.properties.imgStyle.marginLeft = d.css("marginLeft")
                        } else b.width > $(".edit_area").width() && (b.width = $(".edit_area").width(), b.height = b.width / c), b.height > $(".edit_area").height() && (b.height = $(".edit_area").height(), b.width = b.height * c), a.css.width = b.width, a.css.height = b.height, a.properties.imgStyle = {}, a.properties.imgStyle.width = b.width, a.properties.imgStyle.height = b.height, a.properties.imgStyle.marginTop = "0", a.properties.imgStyle.marginLeft = "0", k(a.type, a)
                    }, function() {
                        a.properties.src || (F.splice(F.indexOf(G[a.id]), 1), delete G[a.id])
                    })
                }

                function o(a) {
                    d.open({
                        windowClass: "console",
                        templateUrl: "scene/console/button.tpl.html",
                        controller: "ButtonConsoleCtrl",
                        resolve: {
                            obj: function() {
                                return a
                            }
                        }
                    }).result.then(function(b) {
                        a.properties.title = b.title;
                        var c = b.title.replace(/ /g, "&nbsp;");
                        $("#" + a.id).html(c)
                    })
                }

                function p(a) {
                    J || (J = d.open({
                        windowClass: "console",
                        templateUrl: "scene/console/tel.tpl.html",
                        controller: "TelConsoleCtrl",
                        resolve: {
                            obj: function() {
                                return a
                            }
                        }
                    }).result.then(function(b) {
                        J = null, a.properties.title = b.title, a.properties.number = b.number;
                        b.title.replace(/ /g, "&nbsp;");
                        $.extend(!0, a.css, b.btnStyle), $("#" + a.id).length > 0 && $("#" + a.id).parents("li").remove(), k(a.type, a)
                    }, function() {
                        J = null, $("#" + a.id).length || (F.splice(F.indexOf(G[a.id]), 1), delete G[a.id])
                    }))
                }

                function r(a) {
                    J || (J = d.open({
                        windowClass: "console",
                        templateUrl: "scene/console/input.tpl.html",
                        controller: "InputConsoleCtrl",
                        resolve: {
                            obj: function() {
                                return a
                            }
                        }
                    }).result.then(function(b) {
                        J = null, b.type && (a.type = b.type), a.properties.placeholder = b.title, a.properties.required = b.required, a.title = b.title, $("#" + a.id).length > 0 ? ($("#" + a.id).attr("placeholder", b.title), $("#" + a.id).attr("required", b.required)) : k(a.type, a)
                    }, function() {
                        J = null, $("#" + a.id).length || (F.splice(F.indexOf(G[a.id]), 1), delete G[a.id])
                    }))
                }

                function s(a) {
                    J || (J = d.open({
                        windowClass: "console",
                        templateUrl: "scene/console/pic_lunbo.tpl.html",
                        controller: "picsCtrl",
                        resolve: {
                            obj: function() {
                                return a
                            }
                        }
                    }).result.then(function(b) {
                        J = null, a.properties = b;
                        var c = $("#inside_" + a.id);
                        c.length && c.remove(), k(a.type, a)
                    }, function() {
                        J = null, $("#" + a.id).length || (F.splice(F.indexOf(G[a.id]), 1), delete G[a.id])
                    }))
                }

                function t(a) {
                    J || (J = d.open({
                        windowClass: "console",
                        templateUrl: "scene/console/video.tpl.html",
                        controller: "VideoCtrl",
                        resolve: {
                            obj: function() {
                                return a
                            }
                        }
                    }).result.then(function(b) {
                        J = null, a.properties.src = b, $("#" + a.id).length || k(a.type, a)
                    }, function() {
                        J = null, $("#" + a.id).length || (F.splice(F.indexOf(G[a.id]), 1), delete G[a.id])
                    }))
                }

                function u(a) {
                    d.open({
                        windowClass: "console",
                        templateUrl: "scene/console/microweb.tpl.html",
                        controller: "MicroConsoleCtrl",
                        resolve: {
                            obj: function() {
                                return a.properties.labels || (a.properties.labels = [{
                                    id: 1,
                                    title: "栏目一",
                                    color: {
                                        backgroundColor: "#23A3D3",
                                        color: ""
                                    },
                                    link: ""
                                }, {
                                    id: 2,
                                    title: "栏目二",
                                    color: {
                                        backgroundColor: "#23A3D3",
                                        color: ""
                                    },
                                    link: ""
                                }]), a
                            }
                        }
                    }).result.then(function(c) {
                        $("#" + a.id).length > 0 ? (a.properties.labels = [], b.forEach(c, function(b) {
                            delete b.selected, delete b.mousedown, delete b.$$hashKey, a.properties.labels.push(b)
                        }), $("#" + a.id).parents("li").remove(), k(a.type, a)) : (a.css = {
                            left: "0px",
                            width: "100%",
                            bottom: "0px",
                            height: "50px",
                            zIndex: 999
                        }, a.properties.labels = [], b.forEach(c, function(b) {
                            delete b.selected, delete b.mousedown, delete b.$$hashKey, a.properties.labels.push(b)
                        }), position = null, k(a.type, a))
                    }, function() {
                        $("#" + a.id).length || (F.splice(F.indexOf(G[a.id]), 1), delete G[a.id]), console.log(a)
                    })
                }

                function v(a) {
                    x(a, function(b) {
                        var c = document.getElementsByClassName("edit_area")[0];
                        if (c = $(c).parent()[0], "imgSrc" == b.type) {
                            var d = b.data;
                            c.style.backgroundImage = "url(" + ((d.indexOf('syspic/') >=0) ? PREFIXSYS_FILE_HOST : USER_FILE_HOST) + d + ")", a.properties.bgColor = null, a.properties.imgSrc = d
                        }
                        "backgroundColor" == b.type && (c.style.backgroundImage = "none", c.style.backgroundColor = b.color, a.properties.imgSrc = null, a.properties.bgColor = b.color), $("#editBG").unbind("click"), $("#editBG").show().bind("click", function() {
                            v(a)
                        })
                    }, function() {})
                }

                function w() {
                    J || (J = d.open({
                        windowClass: "console",
                        templateUrl: "scene/console/audio.tpl.html",
                        controller: "AudioConsoleCtrl",
                        resolve: {
                            obj: function() {
                                return E.obj.scene.image && E.obj.scene.image.bgAudio ? E.obj.scene.image.bgAudio : {}
                            }
                        }
                    }).result.then(function(a) {
                        J = null, "bgAudio" == a.compType && (E.obj.scene.image || (E.obj.scene.image = {}), E.obj.scene.image.bgAudio = a.bgAudio)
                    }, function() {
                        J = null
                    }))
                }

                function x(a, b, c) {
                    if (!J) {
                        var e = "0";
                        3 == a.type && (e = "0"), 4 == a.type && (e = "1"), J = d.open({
                            windowClass: "console img_console",
                            templateUrl: "scene/console/bg.tpl.html",
                            controller: "BgConsoleCtrl",
                            resolve: {
                                obj: function() {
                                    return {
                                        fileType: e,
                                        elemDef: a
                                    }
                                }
                            }
                        }).result.then(function(a) {
                            J = null, b(a)
                        }, function(a) {
                            J = null, c(a)
                        })
                    }
                }

                function y(a) {
                    C.currentElemDef = a, c.$broadcast("showStylePanel", {
                        activeTab: "style"
                    })
                }

                function z(a) {
                    C.currentElemDef = a, c.$broadcast("showStylePanel", {
                        activeTab: "anim"
                    })
                }

                function A(a) {
                    console.log(a), C.currentElemDef = a, K = c.$broadcast("showCropPanel", a)
                }

                function B(a) {
                    d.open({
                        windowClass: "console",
                        templateUrl: "scene/console/link.tpl.html",
                        controller: "LinkConsoleCtrl",
                        resolve: {
                            obj: function() {
                                return a
                            }
                        }
                    }).result.then(function(b) {
                        b && "http://" != b ? (a.properties.url = isNaN(b) ? PREFIX_S1_URL + "index-jumpgo?id=" + a.sceneId + "&url=" + encodeURIComponent(b) : b, $("#inside_" + a.id).find(".fa-link").removeClass("fa-link").addClass("fa-anchor")) : (delete a.properties.url, $("#inside_" + a.id).find(".fa-anchor").removeClass("fa-anchor").addClass("fa-link"))
                    })
                }
                var C = {},
                    D = eqShow.templateParser("jsonParser"),
                    E = null,
                    F = null,
                    G = {},
                    H = ($(".edit_area"), C.createCompGroup = function(a, b) {
                        for (var c = l(a), d = 0; d < c.length; d++) {
                            var e = j(c[d].type, b, c[d]);
                            b = null, k(c[d].type, e)
                        }
                    }),
                    I = function(a) {
                        var b;
                        return "501" == a && (b = {
                            properties: {
                                placeholder: "姓名"
                            },
                            title: "姓名",
                            type: 501
                        }), "502" == a && (b = {
                            properties: {
                                placeholder: "手机"
                            },
                            title: "手机",
                            type: 502
                        }), "503" == a && (b = {
                            properties: {
                                placeholder: "邮箱"
                            },
                            title: "邮箱",
                            type: 503
                        }), "601" == a && (b = {
                            properties: {
                                title: "提交"
                            },
                            type: 601
                        }), b
                    };
                C.createComp = function(a, b) {
                    if ("g" == ("" + a).charAt(0)) return void H(a, b);
                    if ("9" == ("" + a).charAt(0)) return void w();
                    if (1 == a) {
                        if ($(".comp_title").length > 0) return void alert("已存在一个标签");
                        var c = j(a, b);
                        return void u(c)
                    }
                    var c = j(a, b);
                    if (4 == a) return void n(c);
                    if (5 == a) return void r(c);
                    if (8 == a) return void p(c);
                    if ("p" == a) return void s(c);
                    if ("v" == a) return void t(c);
                    if (3 == a) v(c);
                    else {
                        k(a, c)
                    }
                }, C.updateCompPosition = function(a, b) {
                    for (var c = 0; c < F.length; c++) "inside_" + F[c].id == a && (F[c].css ? (F[c].css.left = b.left, F[c].css.top = b.top) : F[c].css = b)
                }, C.updateCompAngle = function(a, b) {
                    for (var c = 0; c < F.length; c++) "inside_" + F[c].id == a && (F[c].css ? F[c].css.transform = "rotateZ(" + b + "deg)" : F[c].css = {})
                }, C.getPageNames = function(b) {
                    var c = "?c=scene&a=pageList&id=" + b + "&date=" + (new Date).getTime();
                    return a({
                        withCredentials: !0,
                        method: "GET",
                        url: JSON_URL + c
                    })
                }, C.changePageSort = function(b, c) {
                    var d = "m/scene/pageSort?id=" + c + "&pos=" + b + "&date=" + (new Date).getTime();
                    return a({
                        withCredentials: !0,
                        method: "GET",
                        url: PREFIX_URL + d
                    })
                }, C.updateCompSize = function(a, b) {
                    for (var c = 0; c < F.length; c++) "inside_" + F[c].id == a && (F[c].css || (F[c].css = {}), F[c].css.width = b.width, F[c].css.height = b.height, F[c].properties.width = b.width, F[c].properties.height = b.height, b.imgStyle && (F[c].properties.imgStyle = b.imgStyle))
                }, C.savePageNames = function(b) {
                    var c = "m/scene/savePage",
                        d = {
                            id: b.id,
                            sceneId: b.sceneId,
                            name: b.name
                        };
                    return a({
                        withCredentials: !0,
                        method: "POST",
                        url: PREFIX_URL + c,
                        headers: {
                            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
                        },
                        data: $.param(d)
                    })
                }, C.resetCss = function() {
                    $(".edit_area li").each(function(a, b) {
                        var c = G[b.id.replace(/inside_/g, "")];
                        c && (c.css || (c.css = {}), c.css.zIndex = b.style.zIndex ? b.style.zIndex : "0")
                    })
                }, C.copyElement = function(a) {
                    var c = b.copy(a);
                    q = !0, C.originalElemDef = a, C.copyElemDef = c
                }, C.pasteElement = function(a, c) {
                    c.id = Math.ceil(100 * Math.random()), c.pageId = E.obj.id, c.id = Math.ceil(100 * Math.random()), C.pageId == c.pageId ? i(a, c) : (C.sameCopyCount = 0, c.css = b.copy(a.css));
                    var d = b.copy(c);
                    F.push(d), G[d.id] = d, k(d.type, d), C.pageId = E.obj.id
                };
                var J = null,
                    K = null;
                return D.addInterceptor(function(a, e) {
                    function g() {
                        var b = $('<ul id="popMenu" class="dropdown-menu" style="min-width: 100px; display: block;" role="menu" aria-labelledby="dropdownMenu1">                                <li class="edit" role="presentation"><a role="menuitem" tabindex="-1"><div class="glyphicon glyphicon-edit" style="color: #08a1ef;"></div>&nbsp;&nbsp;编辑</a></li>                                <li class="style" role="presentation"><a role="menuitem" tabindex="-1"><div class="fa fa-paint-brush" style="color: #08a1ef;"></div>&nbsp;&nbsp;样式</a></li>                                <li class="animation" role="presentation"><a role="menuitem" tabindex="-1"><div class="fa fa-video-camera" style="color: #08a1ef;"></div>&nbsp;&nbsp;动画</a></li>                                <li class="link" role="presentation"><a role="menuitem" tabindex="-1"><div class="fa fa-link" style="color: #08a1ef;"></div>&nbsp;&nbsp;链接</a></li>                                <li class="copy" role="presentation" style="margin-bottom:5px;"><a role="menuitem" tabindex="-1"><div class="fa fa-copy" style="color: #08a1ef;"></div>&nbsp;&nbsp;复制</a></li>                                <li class="cut" role="presentation" style="margin-bottom:5px;"><a role="menuitem" tabindex="-1"><div class="fa fa-cut" style="color: #08a1ef;"></div>&nbsp;&nbsp;裁剪</a></li>                                <li role="presentation" class="bottom_bar">                                    <a title="上移一层"><div class="up" style="display: inline-block; width: 26px;height: 22px; background: url(http://static.parastorage.com/services/skins/2.1127.3/images/wysiwyg/core/themes/editor_web/button/fpp-buttons-icons4.png) 0px -26px no-repeat;"></div></a>                                    <a title="下移一层"><div class="down" style="display: inline-block; width: 26px;height: 22px; background: url(http://static.parastorage.com/services/skins/2.1127.3/images/wysiwyg/core/themes/editor_web/button/fpp-buttons-icons4.png) 0px -80px no-repeat;"></div></a>                                    <a title="删除"><div class="remove" style="display: inline-block; width: 26px;height: 22px; background: url(http://static.parastorage.com/services/skins/2.1127.3/images/wysiwyg/core/themes/editor_web/button/fpp-buttons-icons4.png) 0px -1px no-repeat;"></div></a>                                </li>                            </ul>').css({
                            position: "absolute",
                            "user-select": "none"
                        });
                        return q && b.find(".copy").after($('<li class="paste" role="presentation"><a role="menuitem" tabindex="-1"><div class="fa fa-paste" style="color: #08a1ef;"></div>&nbsp;&nbsp;粘贴</a></li>')), b.find(".edit").click(function(c) {
                            switch (c.stopPropagation(), e.type.toString().charAt(0)) {
                                case "1":
                                    break;
                                case "2":
                                    m(a.find(".element").get(0), e);
                                    break;
                                case "3":
                                    break;
                                case "4":
                                    n(e);
                                    break;
                                case "5":
                                    r(e);
                                    break;
                                case "6":
                                    o(e);
                                    break;
                                case "7":
                                    break;
                                case "8":
                                    p(e);
                                    break;
                                case "9":
                                    break;
                                case "g":
                                    break;
                                case "p":
                                    s(e);
                                    break;
                                case "v":
                                    t(e)
                            }
                            b.hide()
                        }), b.find(".style").click(function(c) {
                            f.isAllowToAccess(f.accessDef.CREATE_STYLE_SETTING) ? (c.stopPropagation(), y(e, function(b) {
                                if (1 == e.type)
                                    for (var c in e.properties.labels) b.backgroundColor && (e.properties.labels[c].color.backgroundColor = b.backgroundColor, $(".label_content").css("background-color", b.backgroundColor)), b.color && (e.properties.labels[c].color.color = b.color, $(".label_content").css("color", b.color));
                                else $(".element-box", a).css(b), $.extend(!0, e.css, b)
                            })) : (c.stopPropagation(), d.open({
                                windowClass: "console",
                                templateUrl: "scene/console/fake.tpl.html",
                                controller: "FakeConsoleCtrl",
                                resolve: {
                                    type: function() {
                                        return "style"
                                    }
                                }
                            })), b.hide()
                        }), b.find(".animation").click(function(a) {
                            a.stopPropagation(), z(e, function(a) {
                                e.properties.anim = a
                            }), b.hide()
                        }), b.find(".link").click(function(a) {
                            a.stopPropagation(), B(e), b.hide()
                        }), b.find(".remove").click(function(d) {
                            d.stopPropagation(), a.remove(), F.splice(F.indexOf(G[e.id]), 1), INTERVAL_OBJ[e.id] && (clearInterval(INTERVAL_OBJ[e.id]), delete INTERVAL_OBJ[e.id]), b.hide(), c.$broadcast("hideStylePanel")
                        }), b.find(".down").click(function() {
                            var b = a.prev();
                            if (!(b.length <= 0)) {
                                var c = a.css("zIndex");
                                a.css("zIndex", b.css("zIndex")), b.css("zIndex", c), b.before(a);
                                for (var d = 0; d < F.length; d++)
                                    if (F[d].id == e.id && d > 0) {
                                        var c = F[d].css.zIndex;
                                        F[d].css.zIndex = F[d - 1].css.zIndex, F[d - 1].css.zIndex = c;
                                        break
                                    }
                            }
                        }), b.find(".up").click(function() {
                            var b = a.next();
                            if (!(b.length <= 0)) {
                                var c = a.css("zIndex");
                                a.css("zIndex", b.css("zIndex")), b.css("zIndex", c), b.after(a);
                                for (var d = 0; d < F.length; d++)
                                    if (F[d].id == e.id && d < F.length - 1) {
                                        var c = F[d].css.zIndex;
                                        F[d].css.zIndex = F[d + 1].css.zIndex, F[d + 1].css.zIndex = c;
                                        break
                                    }
                            }
                        }), b.find(".copy").click(function(a) {
                            a.stopPropagation(), C.sameCopyCount = 0, C.pageId = E.obj.id, $(".modal-dialog")[0] || C.copyElement(e), b.hide()
                        }), b.find(".paste").click(function(a) {
                            a.stopPropagation(), $(".modal-dialog")[0] || C.pasteElement(C.originalElemDef, C.copyElemDef), b.hide()
                        }), b.find(".cut").click(function(a) {
                            a.stopPropagation(), A(e), b.hide()
                        }), 4 != e.type && (b.find(".link").hide(), b.find(".cut").hide()), "p" == e.type && (b.find(".animation").hide(), b.find(".style").hide()), b
                    }
                    var h = $("#eq_main");
                    a.on("click contextmenu", ".element-box", function(a) {
                        a.stopPropagation(), $("#btn-toolbar")[0] || (C.elemDefTpl = b.copy(e)), $("#comp_setting:visible").length > 0 && "p" != e.type && (C.currentElemDef = e, c.$broadcast("showStylePanel"));
                        var d = g(),
                            f = $("#popMenu");
                        return f.length > 0 && f.remove(), h.append(d), d.css({
                            left: a.pageX + h.scrollLeft() + 15,
                            top: a.pageY + h.scrollTop()
                        }).show(), h.mousemove(function(a) {
                            (a.pageX < d.offset().left - 20 || a.pageX > d.offset().left + d.width() + 20 || a.pageY < d.offset().top - 20 || a.pageY > d.offset().top + d.height() + 20) && (d.hide(), $(this).unbind("mousemove"))
                        }), !1
                    }), a.attr("title", "按住鼠标进行拖动，点击鼠标进行编辑")
                }), $(document).on("keydown", function(a) {
                    !a.ctrlKey && !a.metaKey || 86 != a.keyCode || !C.elemDefTpl || $("#btn-toolbar")[0] || $(".modal-dialog")[0] || (a.preventDefault(), q && (a.preventDefault(), C.pasteElement(C.originalElemDef, C.copyElemDef)))
                }), $(document).keydown(function(a) {
                    !a.ctrlKey && !a.metaKey || 67 != a.keyCode || !C.elemDefTpl || $("#btn-toolbar")[0] || $(".modal-dialog")[0] || (a.preventDefault(), C.pageId = E.obj.id, C.sameCopyCount = 0, C.copyElement(C.elemDefTpl))
                }), D.bindEditEvent("1", function(a, b) {
                    $(a).unbind("dblclick"), $(a).show().bind("dblclick", function() {
                        u(b)
                    })
                }), D.bindEditEvent("2", function(a, b) {
                    var c = $(".element", a)[0];
                    $(c).mousedown(function(a) {
                        $(this).parents("li").hasClass("inside-active") && a.stopPropagation()
                    }), $(c).bind("contextmenu", function(a) {
                        $(this).parents("li").hasClass("inside-active") ? a.stopPropagation() : $(this).blur()
                    }), c.addEventListener("dblclick", function(a) {
                        m(c, b), $("#popMenu").hide(), a.stopPropagation()
                    })
                }), D.bindEditEvent("3", function(a, b) {
                    $("#editBG").unbind("click"), $("#editBG").show().bind("click", function() {
                        v(b)
                    })
                }), D.bindEditEvent("v", function(a, b) {
                    var c = $(".element", a)[0];
                    $(c).unbind("dblclick"), $(c).bind("dblclick", function() {
                        t(b), $("#popMenu").hide()
                    })
                }), D.bindEditEvent("4", function(a, b) {
                    var c = $(".element", a)[0];
                    $(c).unbind("dblclick"), $(c).bind("dblclick", function() {
                        n(b), $("#popMenu").hide()
                    })
                }), D.bindEditEvent("5", function(a, b) {
                    var c = $(".element", a)[0];
                    $(c).unbind("dblclick"), $(c).bind("dblclick", function() {
                        r(b), $("#popMenu").hide()
                    })
                }), D.bindEditEvent("p", function(a, b) {
                    var c = $(".element", a)[0];
                    $(c).unbind("dblclick"), $(c).bind("dblclick", function() {
                        s(b), $("#popMenu").hide()
                    })
                }), D.bindEditEvent("6", function(a, b) {
                    var c = $(".element", a)[0];
                    $(c).unbind("dblclick"), $(c).bind("dblclick", function() {
                        o(b), $("#popMenu").hide()
                    })
                }), D.bindEditEvent("8", function(a, b) {
                    var c = $(".element", a)[0];
                    $(c).unbind("dblclick"), $(c).bind("dblclick", function() {
                        p(b), $("#popMenu").hide()
                    })
                }), D.bindEditEvent("7", function(a, b) {
                    var c = $(".element", a)[0];
                    c.addEventListener("click", function() {
                        J || d.open({
                            windowClass: "",
                            templateUrl: "scene/console/map.tpl.html",
                            controller: "MapConsoleCtrl"
                        }).result.then(function(a) {
                            var c = new BMap.Map("map_" + b.id);
                            c.clearOverlays();
                            var d = new BMap.Point(a.lng, a.lat),
                                e = new BMap.Marker(d);
                            c.addOverlay(e);
                            var f = new BMap.Label(a.address, {
                                offset: new BMap.Size(20, -10)
                            });
                            e.setLabel(f), c.centerAndZoom(d, 12), b.properties.pointX = a.lng, b.properties.pointY = a.lat, b.properties.x = a.lng, b.properties.y = a.lat, b.properties.markTitle = a.address
                        })
                    })
                }), C.templateEditor = D, C.getTplById = function(b) {
                    var c = "m/scene/select?id=" + b,
                        d = new Date;
                    return c += "&time=" + d.getTime(), a({
                        withCredentials: !0,
                        method: "GET",
                        url: PREFIX_URL + c
                    })
                }, C.createByTpl = function(b) {
                    var c = JSON_URL + "?c=scene&a=createBySys";
                    return a({
                        withCredentials: !0,
                        method: "POST",
                        url: c,
                        headers: {
                            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
                        },
                        data: $.param(b)
						
                    })
                }, C.getSceneDetail = function(b) {
                    var c = "?c=scene&a=detail&id=" + b;
                    return a({
                        withCredentials: !0,
                        method: "GET",
                        url: JSON_URL + c
                    })
                }, C.saveSceneSettings = function(b) {
                    var c = "?c=scene&a=saveSettings";
                    return a({
                        withCredentials: !0,
                        method: "POST",
                        url: JSON_URL + c,
                        headers: {
                            "Content-Type": "text/plain; charset=UTF-8"
                        },
                        data: JSON.stringify(b)
                    })
                }, C.publishScene = function(b) {
                    var c = "?c=scene&a=publish&id=" + b,
                        d = new Date;
                    return c += "&time=" + d.getTime(), a({
                        withCredentials: !0,
                        method: "POST",
                        url: JSON_URL + c
                    })
                }, C.closeScene = function(b) {
                    var c = "?c=scene&a=off&id=" + b,
                        d = new Date;
                    return c += "&time=" + d.getTime(), a({
                        withCredentials: !0,
                        method: "GET",
                        url: JSON_URL + c
                    })
                }, C.openScene = function(b) {
                    var c = "?c=scene&a=on&id=" + b,
                        d = new Date;
                    return c += "&time=" + d.getTime(), a({
                        withCredentials: !0,
                        method: "GET",
                        url: JSON_URL + c
                    })
                }, C.createBlankScene = function(b, c, d) {
                    var e = {
                            name: b,
                            type: c,
                            pageMode: d
                        },
                        f = "?c=scene&a=create";
                    return a({
                        withCredentials: !0,
                        method: "POST",
                        url: JSON_URL + f,
                        headers: {
                            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
                        },
                        data: $.param(e)
                    })
                }, C.copySceneById = function(b) {
                    var c = "?c=scene&a=createByCopy&id=" + b;
                    return a({
                        withCredentials: !0,
                        method: "GET",
                        url: JSON_URL + c
                    })
                }, C.deleteSceneById = function(b) {
                    var c = "?c=scene&a=delscene&id=" + b;
                    return a({
                        withCredentials: !0,
                        method: "GET",
                        url: JSON_URL + c
                    })
                }, C.getCoverImages = function() {
                    var b = "?c=upfile&a=userlist&bizType=99&fileType=1&time=" + (new Date).getTime();
                    return a({
                        withCredentials: !0,
                        method: "GET",
                        url: JSON_URL + b
                    })
                }, C.getSceneByPage = function(b, c, d) {
                    var f = "";
                    c || d ? (f = "?c=scene&a=createPage&id=" + b, d && (f += "&copy=true")) : f = "?c=scene&a=design&id=" + b;
                    var g = e.defer(),
                        h = new Date;
                    return f += (/\?/.test(f) ? "&" : "?") + "time=" + h.getTime(), a({
                        withCredentials: !0,
                        method: "GET",
                        url: JSON_URL + f
                    }).then(function(a) {
                        g.resolve(a), E = a.data, E.obj.elements || (E.obj.elements = []), F = E.obj.elements;
                        for (var b = 0; F && b < F.length; b++) G[F[b].id] = F[b]
                    }, function(a) {
                        g.reject(a)
                    }), g.promise
                }, C.previewSceneTpl = function(b) {
                    var c = "?c=scene&a=syspageinfo&id=" + b,
                        d = (e.defer(), new Date);
                    return c += (/\?/.test(c) ? "&" : "?") + "time=" + d.getTime(), a({
                        withCredentials: !0,
                        method: "GET",
                        url: JSON_URL + c
                    })
                }, C.recordTplUsage = function(b) {
                    var c = "?c=scene&a=usepage&id=" + b;
                    return a({
                        withCredentials: !0,
                        method: "POST",
                        url: JSON_URL + c
                    })
                }, C.getSceneTpl = function(b) {
                    var c = g.get("tplCache") ? g.get("tplCache") : g("tplCache"),
                        d = e.defer();
                    if (c.get(b)) {
                        var f = $.extend(!0, {}, c.get(b));
                        f.data.obj.scene && f.data.obj.scene.image && f.data.obj.scene.image.bgAudio && (E.obj.scene.image || (E.obj.scene.image = {}), E.obj.scene.image.bgAudio = f.data.obj.scene.image.bgAudio);
                        for (var h = 0; h < f.data.obj.elements.length; h++) {
                            var i = f.data.obj.elements[h];
                            i.id = Math.ceil(100 * Math.random()), i.sceneId = E.obj.sceneId, i.pageId = E.obj.id
                        }
                        F = f.data.obj.elements;
                        for (var j = 0; j < F.length; j++) G[F[j].id] = F[j];
                        d.resolve(f)
                    } else {
                        var k = "?c=scene&a=syspageinfo&id=" + b,
                            l = new Date;
                        k += (/\?/.test(k) ? "&" : "?") + "time=" + l.getTime(), a({
                            withCredentials: !0,
                            method: "GET",
                            url: JSON_URL + k
                        }).then(function(a) {
                            c.put(a.data.obj.id, $.extend(!0, {}, a)), a.data.obj.scene && a.data.obj.scene.image && a.data.obj.scene.image.bgAudio && (E.obj.scene.image || (E.obj.scene.image = {}), E.obj.scene.image.bgAudio = a.data.obj.scene.image.bgAudio);
                            for (var b = 0; b < a.data.obj.elements.length; b++) {
                                var e = a.data.obj.elements[b];
                                e.id = Math.ceil(100 * Math.random()), e.sceneId = E.obj.sceneId, e.pageId = E.obj.id
                            }
                            F = a.data.obj.elements;
                            for (var f = 0; f < F.length; f++) G[F[f].id] = F[f];
                            d.resolve(a)
                        }, function(a) {
                            d.reject(a)
                        })
                    }
                    return d.promise
                }, C.saveScene = function(b) {
                    var c = "?c=scene&a=savepage";
                    return a({
                        withCredentials: !0,
                        method: "POST",
                        url: JSON_URL + c,
                        headers: {
                            "Content-Type": "text/plain; charset=UTF-8"
                        },
                        data: JSON.stringify(b)
                    })
                }, C.deletePage = function(b) {
                    var c = "?c=scene&a=delPage&id=" + b;
                    return a({
                        withCredentials: !0,
                        method: "GET",
                        url: JSON_URL + c
                    })
                }, C.getBgImages = function(b) {
                    var c = "m/scene/gallery/" + b,
                        d = new Date;
                    return c += (/\?/.test(c) ? "&" : "?") + "time=" + d.getTime(), a({
                        withCredentials: !0,
                        method: "GET",
                        url: PREFIX_URL + c
                    })
                }, C.createCustomComp = I, C.openAudioModal = w, C.getElements = function() {
                    return F
                }, C.getSceneObj = function() {
                    return E
                }, C.getTpls = function(b, c, d, e) {
                    var f = "?c=scene&a=syslist";
                    null != b && (f += (/\?/.test(f) ? "&" : "?") + "sceneType=" + b), f += (/\?/.test(f) ? "&" : "?") + "pageNo=" + (c ? c : 1), f += (/\?/.test(f) ? "&" : "?") + "pageSize=" + (d ? d : 12), e && (f += (/\?/.test(f) ? "&" : "?") + "orderBy=" + e);
                    var g = new Date;
                    return f += (/\?/.test(f) ? "&" : "?") + "time=" + g.getTime(), a({
                        withCredentials: !0,
                        method: "GET",
                        url: JSON_URL + f
                    })
                }, C.getSceneType = function() {
                    var b = "?c=statics&a=typelist";
                    return a({
                        withCredentials: !0,
                        method: "GET",
                        url: JSON_URL + b
                    })
                }, C.getPageTpls = function(b, c, d, e, f, g) {
                    var h = "?c=scene&a=syslist";
                    b && (h += (/\?/.test(h) ? "&" : "?") + "tplType=1"), c && (h += (/\?/.test(h) ? "&" : "?") + "bizType=" + c), d && (h += (/\?/.test(h) ? "&" : "?") + "tagId=" + d), g && (h += (/\?/.test(h) ? "&" : "?") + "orderBy=" + g);
                    var i = new Date;
                    return h += (/\?/.test(h) ? "&" : "?") + "pageNo=" + (e ? e : 1), h += (/\?/.test(h) ? "&" : "?") + "pageSize=" + (f ? f : 12), h += (/\?/.test(h) ? "&" : "?") + "time=" + i.getTime(), a({
                        withCredentials: !0,
                        method: "GET",
                        url: JSON_URL + h
                    })
                }, C.getPageTplTypesTwo = function(b, c) {
                    var d = "?c=upfile&a=systag&type=2&bizType=" + c,
                        e = new Date;
                    return d += (/\?/.test(d) ? "&" : "?") + "time=" + e.getTime(), a({
                        withCredentials: !0,
                        method: "GET",
                        url: JSON_URL + d
                    })
                }, C
            }
        ]), b.module("services.spread", []), b.module("services.spread").factory("SpreadService", ["$http",
            function(a) {
                var b = {};
				
                return b.getDataBySceneId = function(b, c, d, e, f) {
                    var g = "?c=statics&a=stat&id=" + b;
                    c && (g += "&startDate=" + c), d && (g += "&endDate=" + d), e && (g += "&pageSize=" + e), f && (g += "&pageNo=" + f);
                    var h = new Date;
                    return g += "&time=" + h.getTime(), a({
                        withCredentials: !0,
                        method: "GET",
                        url: JSON_URL + g
                    })
                }, b.getActivities = function() {
                    var b = new Date;
                    return a({
                        withCredentials: !0,
                        method: "GET",
                        url: PREFIX_URL + "m/u/promotion/list?type=pc&time=" + b.getTime()
                    })
                }, b.getActivityDetail = function(b) {
                    var c = new Date;
                    return a({
                        withCredentials: !0,
                        method: "GET",
                        url: JSON_URL + "?c=statics&a=all&line=7174&code=" + b + "&time=" + c.getTime()
                    })
                }, b
            }
        ]), b.module("services.usercenter", []).factory("usercenterService", ["$http",
            function(a) {
                var b = {};
                return b.getUserInfo = function() {
                    var b = PREFIX_URL + "m/u/info";
                    return b += "?time=" + (new Date).getTime(), a({
                        withCredentials: !0,
                        method: "GET",
                        url: b
                    })
                }, b.saveUserInfo = function(b) {
                    var c = PREFIX_URL + "m/u/save";
                    return a({
                        withCredentials: !0,
                        method: "POST",
                        url: c,
                        headers: {
                            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
                        },
                        data: $.param(b)
                    })
                }, b.getUserXd = function() {
                    var b = PREFIX_URL + "m/u/xd";
                    return b += "?time=" + (new Date).getTime(), a('')
                }, b.getgiveXd = function(b) {
                    var c = PREFIX_URL + "m/u/giveXd";
                    return c += "?toUser=" + b.toUser, c += "&xdCount=" + b.xdCount, c += "&time=" + (new Date).getTime(), a({
                        withCredentials: !0,
                        method: "POST",
                        url: c
                    })
                }, b.getXdlog = function(b, c) {
                    var d = PREFIX_URL + "m/u/xdlog?pageNo=" + b + "&pageSize=" + c;
                    return d += "?time=" + (new Date).getTime(), a({
                        withCredentials: !0,
                        method: "POST",
                        url: d
                    })
                }, b.getXdStat = function() {
                    var b = PREFIX_URL + "m/u/xdStat";
                    return b += "?time=" + (new Date).getTime(), a({
                        withCredentials: !0,
                        method: "GET",
                        url: b
                    })
                }, b.relAccount = function(b, c, d) {
                    var e = PREFIX_URL + "eqs/bindAccount?relUser=" + b + "&loginName=" + c + "&loginPassword=" + d;
                    return e += "&time=" + (new Date).getTime(), a({
                        withCredentials: !0,
                        method: "POST",
                        url: e,
                        headers: {
                            "Content-Type": "text/plain; charset=UTF-8"
                        }
                    })
                }, b.setRead = function(b) {
                    var c = PREFIX_URL + "m/u/markRead?ids=" + b;
                    return c += "&time=" + (new Date).getTime(), a({
                        withCredentials: !0,
                        method: "POST",
                        url: c,
                        headers: {
                            "Content-Type": "text/plain; charset=UTF-8"
                        }
                    })
                }, b.getNewMessage = function(b, c, d) {
                    var e = JSON_URL + "?c=statics&a=all&line=7248&pageNo=" + b + "&pageSize=" + c;
                    return d && (e += "&unread=" + d), e += "&time=" + (new Date).getTime(), a({
                        withCredentials: !0,
                        method: "GET",
                        url: e
                    })
                }, b
            }
        ]), b.module("templates-app", ["about.tpl.html", "data/associateData.tpl.html", "data/editData.tpl.html", "dialog/confirm.tpl.html", "dialog/message.tpl.html", "error.tpl.html", "error/error.tpl.html", "footer.tpl.html", "header.tpl.html", "help.tpl.html", "home/home.tpl.html", "main/customer.tpl.html", "main/main.tpl.html", "main/spread.tpl.html", "scene/scenefirst.tpl.html", "main/spreadDetail.tpl.html", "main/userGuide.tpl.html", "my/myscene.tpl.html", "my/sceneSetting.tpl.html", "my/upload.tpl.html", "notifications.tpl.html", "reg/agreement.tpl.html", "reg/reg.tpl.html", "sample/sample.tpl.html", "scene/console.tpl.html", "scene/console/angle-knob.tpl.html", "scene/console/anim.tpl.html", "scene/console/audio.tpl.html", "scene/console/bg.tpl.html", "scene/console/button.tpl.html", "scene/console/category.tpl.html", "scene/console/cropimage.tpl.html", "scene/console/fake.tpl.html", "scene/console/input.tpl.html", "scene/console/link.tpl.html", "scene/console/map.tpl.html", "scene/console/microweb.tpl.html", "scene/console/pic_lunbo.tpl.html", "scene/console/setting.tpl.html", "scene/console/style.tpl.html", "scene/console/tel.tpl.html", "scene/console/video.tpl.html", "scene/create.tpl.html", "scene/createNew.tpl.html", "scene/effect/falling.tpl.html", "scene/scene.tpl.html", "usercenter/console/relAccount.tpl.html", "usercenter/request_reg.tpl.html", "usercenter/transfer.tpl.html", "usercenter/usercenter.tpl.html"]), b.module("about.tpl.html", []).run(["$templateCache",
            function(a) {
                //a.put("about.tpl.html", '')
            }
        ]), b.module("data/associateData.tpl.html", []).run(["$templateCache",
            function(a) {
                //a.put("data/associateData.tpl.html", '')
            }
        ]), b.module("data/editData.tpl.html", []).run(["$templateCache",
            function(a) {
                //a.put("data/editData.tpl.html", '')
            }
        ]), b.module("dialog/confirm.tpl.html", []).run(["$templateCache",
            function(a) {
                //a.put("dialog/confirm.tpl.html", '')
            }
        ]), b.module("dialog/message.tpl.html", []).run(["$templateCache",
            function(a) {
                //a.put("dialog/message.tpl.html", '')
            }
        ]), b.module("error.tpl.html", []).run(["$templateCache",
            function(a) {
                a.put("error.tpl.html", '<div class="error">\n    <div class="header">\n        <div class="content">\n            <div class="logo"><img ng-src="{{CLIENT_CDN}}images/logo.png" alt=""></div>\n        </div>\n    </div>\n    <div class="error_contain">\n        <div class="error_con">\n            <img ng-src="{{CLIENT_CDN}}images/404_03.png" alt="" />\n            <p style="font-size:24px;margin-top:30px;margin-bottom:15px;">对不起，您想要进入的页面已经去火星了！</p>\n            <p style="text-align:left;"><a href="#/home">返回地球</a></p>\n        </div>\n    </div>\n</div>\n<div ng-include="\'footer.tpl.html\'"></div>')
            }
        ]), b.module("error/error.tpl.html", []).run(["$templateCache",
            function(a) {
                //a.put("error/error.tpl.html", '')
            }
        ]), b.module("footer.tpl.html", []).run(["$templateCache",
            function(a) {
                //a.put("footer.tpl.html", '')
            }
        ]), b.module("header.tpl.html", []).run(["$templateCache",
            function(a) {
                //a.put("header.tpl.html", '')
            }
        ]), b.module("help.tpl.html", []).run(["$templateCache",
            function(a) {
                //a.put("help.tpl.html", '')
            }
        ]), b.module("home/home.tpl.html", []).run(["$templateCache",
            function(a) {
                a.put("home/home.tpl.html", '<div ng-include="\'footer.tpl.html\'"></div>')
            }
        ]), b.module("main/customer.tpl.html", []).run(["$templateCache",
            function(a) {
                //a.put("main/customer.tpl.html", '')
            }
        ]), b.module("main/main.tpl.html", []).run(["$templateCache",
            function(a) {
                //a.put("main/main.tpl.html", '')
            }
        ]),
        b.module("main/spread.tpl.html", []).run(["$templateCache",
            function(a) {
                //a.put("main/spread.tpl.html", '')
            }
        ]), b.module("scene/scenefirst.tpl.html", []).run(["$templateCache",
            function(a) {
                //a.put("scene/scenefirst.tpl.html", '')
            }
        ]), b.module("main/spreadDetail.tpl.html", []).run(["$templateCache",
            function(a) {
                //a.put("main/spreadDetail.tpl.html", '')
            }
        ]), b.module("main/userGuide.tpl.html", []).run(["$templateCache",
            function(a) {
                a.put("main/userGuide.tpl.html", '<div style="position: fixed; left: 0; top: 0; bottom: 0; right: 0; background: rgba(0,0,0,0.8); z-index: 10000;" ng-show="firstLogin" ng-click="firstLogin = false;" ng-controller="userGuideCtrl">\n    <div style="width: 1000px; margin: 0 auto;">\n        <img style="margin: 109px 66px 0 30px; float: right;" ng-src="{{CLIENT_CDN}}images/chuangjian.png">\n        <img style="margin: 140px 0 0 0; float: right;" ng-src="{{CLIENT_CDN}}images/guide_main.png">\n    </div>\n</div>')
            }
        ]), b.module("my/myscene.tpl.html", []).run(["$templateCache",
            function(a) {
                //a.put("my/myscene.tpl.html", '')
            }
        ]), b.module("my/sceneSetting.tpl.html", []).run(["$templateCache",
            function(a) {
                //a.put("my/sceneSetting.tpl.html", '')
            }
        ]), b.module("my/upload.tpl.html", []).run(["$templateCache",
            function(a) {
                //a.put("my/upload.tpl.html", '')
            }
        ]), b.module("notifications.tpl.html", []).run(["$templateCache",
            function(a) {
                a.put("notifications.tpl.html", '<div ng-class="[\'alert\', \'alert-\'+notification.type]" ng-repeat="notification in notifications.getCurrent()" notification-fadeout>\n    <button class="close" ng-click="removeNotification(notification)">x</button>\n    {{notification.message}}\n</div>\n')
            }
        ]), b.module("reg/agreement.tpl.html", []).run(["$templateCache",
            function(a) {
                //a.put("reg/agreement.tpl.html", '')
            }
        ]), b.module("reg/reg.tpl.html", []).run(["$templateCache",
            function(a) {
                a.put("reg/reg.tpl.html", '<div><a ng-href="{{weiChatUrl}}">登录测试</a></div>')
            }
        ]), b.module("sample/sample.tpl.html", []).run(["$templateCache",
            function(a) {
                //a.put("sample/sample.tpl.html", '')
            }
        ]), b.module("scene/console.tpl.html", []).run(["$templateCache",
            function(a) {
                a.put("scene/console.tpl.html", '<div>\n<div ng-show="comp_type==\'bg\'" ng-include="\'scene/console/bg.tpl.html\'" ng-controller="BgConsoleCtrl"></div>\n</div>')
            }
        ]), b.module("scene/console/angle-knob.tpl.html", []).run(["$templateCache",
            function(a) {
                a.put("scene/console/angle-knob.tpl.html", '<div class="sliderContainer">\n	<div class="sliderKnob"></div>\n</div>')
            }
        ]), b.module("scene/console/anim.tpl.html", []).run(["$templateCache",
            function(a) {
                //a.put("scene/console/anim.tpl.html", '')
            }
        ]), b.module("scene/console/audio.tpl.html", []).run(["$templateCache",
            function(a) {
                //a.put("scene/console/audio.tpl.html", '')
            }
        ]), b.module("scene/console/bg.tpl.html", []).run(["$templateCache",
            function(a) {
                //a.put("scene/console/bg.tpl.html", '')
            }
        ]), b.module("scene/console/button.tpl.html", []).run(["$templateCache",
            function(a) {
                //a.put("scene/console/button.tpl.html", '')
            }
        ]), b.module("scene/console/category.tpl.html", []).run(["$templateCache",
            function(a) {
                //a.put("scene/console/category.tpl.html", '')
            }
        ]), b.module("scene/console/cropimage.tpl.html", []).run(["$templateCache",
            function(a) {
                //a.put("scene/console/cropimage.tpl.html", '')
            }
        ]), b.module("scene/console/fake.tpl.html", []).run(["$templateCache",
            function(a) {
                //a.put("scene/console/fake.tpl.html", '')
            }
        ]), b.module("scene/console/input.tpl.html", []).run(["$templateCache",
            function(a) {
                //a.put("scene/console/input.tpl.html", '')
            }
        ]), b.module("scene/console/link.tpl.html", []).run(["$templateCache",
            function(a) {
                //a.put("scene/console/link.tpl.html", '')
            }
        ]), b.module("scene/console/map.tpl.html", []).run(["$templateCache",
            function(a) {
                //a.put("scene/console/map.tpl.html", '')
            }
        ]), b.module("scene/console/microweb.tpl.html", []).run(["$templateCache",
            function(a) {
                //a.put("scene/console/microweb.tpl.html", '')
            }
        ]), b.module("scene/console/pic_lunbo.tpl.html", []).run(["$templateCache",
            function(a) {
                //a.put("scene/console/pic_lunbo.tpl.html", '')
            }
        ]), b.module("scene/console/setting.tpl.html", []).run(["$templateCache",
            function(a) {
                //a.put("scene/console/setting.tpl.html", '')
            }
        ]), b.module("scene/console/style.tpl.html", []).run(["$templateCache",
            function(a) {
                //a.put("scene/console/style.tpl.html", '')
            }
        ]), b.module("scene/console/tel.tpl.html", []).run(["$templateCache",
            function(a) {
                //a.put("scene/console/tel.tpl.html", '')
            }
        ]), b.module("scene/console/video.tpl.html", []).run(["$templateCache",
            function(a) {
                //a.put("scene/console/video.tpl.html", '')
            }
        ]), b.module("scene/create.tpl.html", []).run(["$templateCache",
            function(a) {
                //a.put("scene/create.tpl.html", '')
            }
        ]), b.module("scene/createNew.tpl.html", []).run(["$templateCache",
            function(a) {
                //a.put("scene/createNew.tpl.html", '')
            }
        ]), b.module("scene/effect/falling.tpl.html", []).run(["$templateCache",
            function(a) {
                //a.put("scene/effect/falling.tpl.html", '')
            }
        ]), b.module("scene/scene.tpl.html", []).run(["$templateCache",
            function(a) {
                //a.put("scene/scene.tpl.html", '')
            }
        ]), b.module("usercenter/console/relAccount.tpl.html", []).run(["$templateCache",
            function(a) {
                //a.put("usercenter/console/relAccount.tpl.html", '')
            }
        ]), b.module("usercenter/request_reg.tpl.html", []).run(["$templateCache",
            function(a) {
                //a.put("usercenter/request_reg.tpl.html", '')
            }
        ]), b.module("usercenter/transfer.tpl.html", []).run(["$templateCache",
            function(a) {
                //a.put("usercenter/transfer.tpl.html", '')
            }
        ]), b.module("usercenter/usercenter.tpl.html", []).run(["$templateCache",
            function(a) {
                //a.put("usercenter/usercenter.tpl.html", '')
            }
        ]),
        b.module("templates-common", ["directives/lineChart.tpl.html",
                                            "directives/mapeditor.tpl.html", "directives/page-tpl-types.tpl.html",
                                            "directives/pieChart.tpl.html", "directives/toolbar.tpl.html", "security/login/form.tpl.html",
                                            "security/login/reset.tpl.html", "security/login/toolbar.tpl.html", "security/register/otherregister.tpl.html",
                                            "security/register/register.tpl.html"]),
        b.module("directives/lineChart.tpl.html", []).run(["$templateCache",
            function(a) {
                //a.put("directives/lineChart.tpl.html", '<canvas id="chart-area" width="300" height="300"/>')
            }
        ]), b.module("directives/mapeditor.tpl.html", []).run(["$templateCache",
            function(a) {
                //a.put("directives/mapeditor.tpl.html", '')
            }
        ]), b.module("directives/page-tpl-types.tpl.html", []).run(["$templateCache",
            function(a) {
                //a.put("directives/page-tpl-types.tpl.html", '')
            }
        ]), b.module("directives/pieChart.tpl.html", []).run(["$templateCache",
            function(a) {
                a.put("directives/pieChart.tpl.html", '<canvas id="chart-area" width="300" height="300"/>')
            }
        ]), b.module("directives/toolbar.tpl.html", []).run(["$templateCache",
            function(a) {
                //a.put("directives/toolbar.tpl.html", '')
            }
        ]), b.module("security/login/form.tpl.html", []).run(["$templateCache",
            function(a) {
                //a.put("security/login/form.tpl.html", '')
			}
        ]), b.module("security/login/reset.tpl.html", []).run(["$templateCache",
            function(a) {
                //a.put("security/login/reset.tpl.html", '')
            }
        ]), b.module("security/login/toolbar.tpl.html", []).run(["$templateCache",
            function(a) {
                //a.put("security/login/toolbar.tpl.html", '')
            }
        ]), b.module("security/register/otherregister.tpl.html", []).run(["$templateCache",
            function(a) {
                //a.put("security/register/otherregister.tpl.html", '')
            }
        ]), b.module("security/register/register.tpl.html", []).run(["$templateCache",
            function(a) {
                //a.put("security/register/register.tpl.html",'')
            }
        ])
}(window, window.angular);