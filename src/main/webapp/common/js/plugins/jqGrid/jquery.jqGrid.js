/* 
* jqGrid  3.6.4 - jQuery Grid 
* Copyright (c) 2008, Tony Tomov, tony@trirand.com 
* Dual licensed under the MIT and GPL licenses 
* http://www.opensource.org/licenses/mit-license.php 
* http://www.gnu.org/licenses/gpl.html 
* Date:2010-02-14 
* Modules: grid.base.js; jquery.fmatter.js; grid.custom.js; grid.common.js; grid.formedit.js; jquery.searchFilter.js; grid.inlinedit.js; grid.celledit.js; jqModal.js; jqDnR.js; grid.subgrid.js; grid.treegrid.js; grid.import.js; JsonXml.js; grid.setcolumns.js; grid.postext.js; grid.tbltogrid.js; grid.jqueryui.js; 
*/
 (function(b) {
    b.jgrid = b.jgrid || {};
    b.extend(b.jgrid, {
        htmlDecode: function(f) {
            if (f == "&nbsp;" || f == "&#160;" || f.length == 1 && f.charCodeAt(0) == 160) return "";
            return ! f ? f: String(f).replace(/&amp;/g, "&").replace(/&gt;/g, ">").replace(/&lt;/g, "<").replace(/&quot;/g, '"')
        },
        htmlEncode: function(f) {
            return ! f ? f: String(f).replace(/&/g, "&amp;").replace(/>/g, "&gt;").replace(/</g, "&lt;").replace(/\"/g, "&quot;")
        },
        format: function(f) {
            var k = b.makeArray(arguments).slice(1);
            if (f === undefined) f = "";
            return f.replace(/\{(\d+)\}/g, 
            function(i, 
            h) {
                return k[h]
            })
        },
        getCellIndex: function(f) {
            f = b(f);
            f = (!f.is("td") && !f.is("th") ? f.closest("td,th") : f)[0];
            if (b.browser.msie) return b.inArray(f, f.parentNode.cells);
            return f.cellIndex
        },
        stripHtml: function(f) {
            f += "";
            var k = /<("[^"]*"|'[^']*'|[^'">])*>/gi;
            if (f) return (f = f.replace(k, "")) && f !== "&nbsp;" && f !== "&#160;" ? f: "";
            else return f
        },
        stringToDoc: function(f) {
            var k;
            if (typeof f !== "string") return f;
            try {
                k = (new DOMParser).parseFromString(f, "text/xml")
            } catch(i) {
                k = new ActiveXObject("Microsoft.XMLDOM");
                k.async = false;
                k.loadXML(f)
            }
            return k && k.documentElement && k.documentElement.tagName != "parsererror" ? k: null
        },
        parse: function(f) {
            f = f;
            if (f.substr(0, 9) == "while(1);") f = f.substr(9);
            if (f.substr(0, 2) == "/*") f = f.substr(2, f.length - 4);
            f || (f = "{}");
            f = b.jgrid.useJSON === true && typeof JSON === "object" && typeof JSON.parse === "function" ? JSON.parse(f) : eval("(" + f + ")");
            return f.hasOwnProperty("d") ? f.d: f
        },
        empty: function() {
            for (; this.firstChild;) this.removeChild(this.firstChild)
        },
        jqID: function(f) {
            f += "";
            return f.replace(/([\.\:\[\]])/g, "\\$1")
        },
        ajaxOptions: {},
        extend: function(f) {
            b.extend(b.fn.jqGrid, f);
            this.no_legacy_api || b.fn.extend(f)
        }
    });
    b.fn.jqGrid = function(f) {
        if (typeof f == "string") {
            var k = b.fn.jqGrid[f];
            if (!k) throw "jqGrid - No such method: " + f;
            var i = b.makeArray(arguments).slice(1);
            return k.apply(this, i)
        }
        return this.each(function() {
            if (!this.grid) {
                var h = b.extend(true, {
                    url: "",
                    height: 150,
                    page: 1,
                    rowNum: 20,
                    records: 0,
                    pager: "",
                    pgbuttons: true,
                    pginput: true,
                    colModel: [],
                    rowList: [],
                    colNames: [],
                    sortorder: "asc",
                    sortname: "",
                    datatype: "xml",
                    mtype: "GET",
                    altRows: false,
                    selarrrow: [],
                    savedRow: [],
                    shrinkToFit: true,
                    xmlReader: {},
                    jsonReader: {},
                    subGrid: false,
                    subGridModel: [],
                    reccount: 0,
                    lastpage: 0,
                    lastsort: 0,
                    selrow: null,
                    beforeSelectRow: null,
                    onSelectRow: null,
                    onSortCol: null,
                    ondblClickRow: null,
                    onRightClickRow: null,
                    onPaging: null,
                    onSelectAll: null,
                    loadComplete: null,
                    gridComplete: null,
                    loadError: null,
                    loadBeforeSend: null,
                    afterInsertRow: null,
                    beforeRequest: null,
                    onHeaderClick: null,
                    viewrecords: false,
                    loadonce: false,
                    multiselect: false,
                    multikey: false,
                    editurl: null,
                    search: false,
                    caption: "",
                    hidegrid: true,
                    hiddengrid: false,
                    postData: {},
                    userData: {},
                    treeGrid: false,
                    treeGridModel: "nested",
                    treeReader: {},
                    treeANode: -1,
                    ExpandColumn: null,
                    tree_root_level: 0,
                    prmNames: {
                        page: "page",
                        rows: "rows",
                        sort: "sidx",
                        order: "sord",
                        search: "_search",
                        nd: "nd",
                        id: "id",
                        oper: "oper",
                        editoper: "edit",
                        addoper: "add",
                        deloper: "del"
                    },
                    forceFit: false,
                    gridstate: "visible",
                    cellEdit: false,
                    cellsubmit: "remote",
                    nv: 0,
                    loadui: "enable",
                    toolbar: [false, ""],
                    scroll: false,
                    multiboxonly: false,
                    deselectAfterSort: true,
                    scrollrows: false,
                    autowidth: false,
                    scrollOffset: 18,
                    cellLayout: 5,
                    subGridWidth: 20,
                    multiselectWidth: 20,
                    gridview: false,
                    rownumWidth: 25,
                    rownumbers: false,
                    pagerpos: "center",
                    recordpos: "right",
                    footerrow: false,
                    userDataOnFooter: false,
                    hoverrows: true,
                    altclass: "ui-priority-secondary",
                    viewsortcols: [false, "vertical", true],
                    resizeclass: "",
                    autoencode: false,
                    remapColumns: [],
                    ajaxGridOptions: {},
                    direction: "ltr",
                    toppager: false
                },
                b.jgrid.defaults, f || {}),
                g = {
                    headers: [],
                    cols: [],
                    footers: [],
                    dragStart: function(c, d, e) {
                        this.resizing = {
                            idx: c,
                            startX: d.clientX,
                            sOL: e[0]
                        };
                        this.hDiv.style.cursor = "col-resize";
                        this.curGbox = b("#rs_m" + h.id, "#gbox_" + h.id);
                        this.curGbox.css({
                            display: "block",
                            left: e[0],
                            top: e[1],
                            height: e[2]
                        });
                        b.isFunction(h.resizeStart) && h.resizeStart.call(this, d, c);
                        document.onselectstart = new Function("return false")
                    },
                    dragMove: function(c) {
                        if (this.resizing) {
                            var d = c.clientX - this.resizing.startX;
                            c = this.headers[this.resizing.idx];
                            var e = h.direction === "ltr" ? c.width + d: c.width - d,
                            l;
                            if (e > 33) {
                                this.curGbox.css({
                                    left: this.resizing.sOL + d
                                });
                                if (h.forceFit === true) {
                                    l = this.headers[this.resizing.idx + 
                                    h.nv];
                                    d = h.direction === "ltr" ? l.width - d: l.width + d;
                                    if (d > 33) {
                                        c.newWidth = e;
                                        l.newWidth = d
                                    }
                                } else {
                                    this.newWidth = h.direction === "ltr" ? h.tblwidth + d: h.tblwidth - d;
                                    c.newWidth = e
                                }
                            }
                        }
                    },
                    dragEnd: function() {
                        this.hDiv.style.cursor = "default";
                        if (this.resizing) {
                            var c = this.resizing.idx,
                            d = this.headers[c].newWidth || this.headers[c].width;
                            d = parseInt(d, 10);
                            this.resizing = false;
                            b("#rs_m" + h.id).css("display", "none");
                            h.colModel[c].width = d;
                            this.headers[c].width = d;
                            this.headers[c].el.style.width = d + "px";
                            if (this.cols.length > 0) this.cols[c].style.width = 
                            d + "px";
                            if (this.footers.length > 0) this.footers[c].style.width = d + "px";
                            if (h.forceFit === true) {
                                d = this.headers[c + h.nv].newWidth || this.headers[c + h.nv].width;
                                this.headers[c + h.nv].width = d;
                                this.headers[c + h.nv].el.style.width = d + "px";
                                if (this.cols.length > 0) this.cols[c + h.nv].style.width = d + "px";
                                if (this.footers.length > 0) this.footers[c + h.nv].style.width = d + "px";
                                h.colModel[c + h.nv].width = d
                            } else {
                                h.tblwidth = this.newWidth || h.tblwidth;
                                b("table:first", this.bDiv).css("width", h.tblwidth + "px");
                                b("table:first", this.hDiv).css("width", 
                                h.tblwidth + "px");
                                this.hDiv.scrollLeft = this.bDiv.scrollLeft;
                                if (h.footerrow) {
                                    b("table:first", this.sDiv).css("width", h.tblwidth + "px");
                                    this.sDiv.scrollLeft = this.bDiv.scrollLeft
                                }
                            }
                            b.isFunction(h.resizeStop) && h.resizeStop.call(this, d, c)
                        }
                        this.curGbox = null;
                        document.onselectstart = new Function("return true")
                    },
                    populateVisible: function() {
                        g.timer && clearTimeout(g.timer);
                        g.timer = null;
                        var c = b(g.bDiv).height();
                        if (c) {
                            var d = b("table:first", g.bDiv),
                            e = b("> tbody > tr:visible:first", d).outerHeight() || g.prevRowHeight;
                            if (e) {
                                g.prevRowHeight = 
                                e;
                                var l = h.rowNum,
                                n = g.scrollTop = g.bDiv.scrollTop,
                                s = Math.round(d.position().top) - n,
                                p = s + d.height();
                                e = e * l;
                                var w,
                                r,
                                o;
                                if (s <= 0 && p < c && (h.lastpage == null || parseInt((p + n + e - 1) / e, 10) < h.lastpage)) {
                                    r = parseInt((c - p + e - 1) / e, 10);
                                    if (p >= 0 || r < 2 || h.scroll === true) {
                                        w = Math.round((p + n) / e) + 1;
                                        s = -1
                                    } else s = 1
                                }
                                if (s > 0) {
                                    w = parseInt(n / e, 10) + 1;
                                    r = parseInt((n + c) / e, 10) + 2 - w;
                                    o = true
                                }
                                if (r) if (! (h.lastpage && w > h.lastpage)) if (g.hDiv.loading) g.timer = setTimeout(g.populateVisible, 200);
                                else {
                                    h.page = w;
                                    if (o) {
                                        g.selectionPreserver(d[0]);
                                        g.emptyRows(g.bDiv)
                                    }
                                    g.populate(r)
                                }
                            }
                        }
                    },
                    scrollGrid: function() {
                        if (h.scroll) {
                            var c = g.bDiv.scrollTop;
                            if (c != g.scrollTop) {
                                g.scrollTop = c;
                                g.timer && clearTimeout(g.timer);
                                g.timer = setTimeout(g.populateVisible, 200)
                            }
                        }
                        g.hDiv.scrollLeft = g.bDiv.scrollLeft;
                        if (h.footerrow) g.sDiv.scrollLeft = g.bDiv.scrollLeft
                    },
                    selectionPreserver: function(c) {
                        var d = c.p,
                        e = d.selrow,
                        l = d.selarrrow ? b.makeArray(d.selarrrow) : null,
                        n = c.grid.bDiv.scrollLeft,
                        s = d.gridComplete;
                        d.gridComplete = function() {
                            d.selrow = null;
                            d.selarrrow = [];
                            if (d.multiselect && l && l.length > 0) for (var p = 0; p < l.length; p++) l[p] != 
                            e && b(c).jqGrid("setSelection", l[p], false);
                            e && b(c).jqGrid("setSelection", e, false);
                            c.grid.bDiv.scrollLeft = n;
                            if (d.gridComplete = s) s()
                        }
                    }
                };
                this.p = h;
                var j,
                m,
                a;
                if (this.p.colNames.length === 0) for (j = 0; j < this.p.colModel.length; j++) this.p.colNames[j] = this.p.colModel[j].label || this.p.colModel[j].name;
                if (this.p.colNames.length !== this.p.colModel.length) alert(b.jgrid.errors.model);
                else {
                    var q = b("<div class='ui-jqgrid-view'></div>"),
                    u,
                    y = b.browser.msie ? true: false,
                    B = b.browser.safari ? true: false;
                    a = this;
                    a.p.direction = b.trim(a.p.direction.toLowerCase());
                    if (b.inArray(a.p.direction, ["ltr", "rtl"]) == -1) a.p.direction = "ltr";
                    m = a.p.direction;
                    b(q).insertBefore(this);
                    b(this).appendTo(q).removeClass("scroll");
                    var K = b("<div class='ui-jqgrid ui-widget ui-widget-content ui-corner-all'></div>");
                    b(K).insertBefore(q).attr({
                        id: "gbox_" + this.id,
                        dir: m
                    });
                    b(q).appendTo(K).attr("id", "gview_" + this.id);
                    u = y && b.browser.version <= 6 ? '<iframe style="display:block;position:absolute;z-index:-1;filter:Alpha(Opacity=\'0\');" src="javascript:false;"></iframe>': "";
                    b("<div class='ui-widget-overlay jqgrid-overlay' id='lui_" + 
                    this.id + "'></div>").append(u).insertBefore(q);
                    b("<div class='loading ui-state-default ui-state-active' id='load_" + this.id + "'>" + this.p.loadtext + "</div>").insertBefore(q);
                    b(this).attr({
                        cellSpacing: "0",
                        cellPadding: "0",
                        border: "0",
                        role: "grid",
                        "aria-multiselectable": !!this.p.multiselect,
                        "aria-labelledby": "gbox_" + this.id
                    });
                    var J = function(c, d) {
                        c = parseInt(c, 10);
                        return isNaN(c) ? d ? d: 0: c
                    },
                    F = function(c, d) {
                        var e = a.p.colModel[c].align,
                        l = 'style="',
                        n = a.p.colModel[c].classes;
                        if (e) l += "text-align:" + e + ";";
                        if (a.p.colModel[c].hidden === 
                        true) l += "display:none;";
                        if (d === 0) l += "width: " + g.headers[c].width + "px;";
                        return l + '"' + (n !== undefined ? ' class="' + n + '"': "")
                    },
                    S = function(c, d, e, l, n) {
                        c = M(c, d, e, n, "add");
                        return '<td role="gridcell" ' + F(e, l) + ' title="' + b.jgrid.stripHtml(c) + '">' + c + "</td>"
                    },
                    M = function(c, d, e, l, n) {
                        e = a.p.colModel[e];
                        if (typeof e.formatter !== "undefined") {
                            c = {
                                rowId: c,
                                colModel: e,
                                gid: a.p.id
                            };
                            d = b.isFunction(e.formatter) ? e.formatter.call(a, d, c, l, n) : b.fmatter ? b.fn.fmatter(e.formatter, d, c, l, n) : t(d)
                        } else d = t(d);
                        return d
                    },
                    t = function(c) {
                        return c === 
                        undefined || c === null || c === "" ? "&#160;": a.p.autoencode ? b.jgrid.htmlEncode(c) : c + ""
                    },
                    ia = function(c, d, e) {
                        c = '<input type="checkbox" id="jqg_' + c + '" class="cbox" name="jqg_' + c + '"/>';
                        return "<td role='gridcell' " + F(d, e) + ">" + c + "</td>"
                    },
                    aa = function(c, d, e, l) {
                        e = (parseInt(e, 10) - 1) * parseInt(l, 10) + 1 + d;
                        return '<td role="gridcell" class="ui-state-default jqgrid-rownum" ' + F(c, d) + ">" + e + "</td>"
                    },
                    ja = function(c) {
                        var d,
                        e = [],
                        l = 0,
                        n;
                        for (n = 0; n < a.p.colModel.length; n++) {
                            d = a.p.colModel[n];
                            if (d.name !== "cb" && d.name !== "subgrid" && d.name !== 
                            "rn") {
                                e[l] = c == "xml" ? d.xmlmap || d.name: d.jsonmap || d.name;
                                l++
                            }
                        }
                        return e
                    },
                    pa = function(c) {
                        var d = a.p.remapColumns;
                        if (!d || !d.length) d = b.map(a.p.colModel, 
                        function(e, l) {
                            return l
                        });
                        if (c) d = b.map(d, 
                        function(e) {
                            return e < c ? null: e - c
                        });
                        return d
                    },
                    $ = function(c, d) {
                        var e = b("tbody:first", c);
                        if (!a.p.gridview || a.p.jqgdnd) b("*", e).children().unbind();
                        if (y) b.jgrid.empty.apply(e[0]);
                        else e[0].innerHTML = "";
                        if (d && a.p.scroll) {
                            b(">div:first", c).css({
                                height: "auto"
                            }).children("div:first").css({
                                height: 0,
                                display: "none"
                            });
                            c.scrollTop = 
                            0
                        }
                    },
                    T = function(c, d) {
                        var e,
                        l,
                        n;
                        e = c[d];
                        if (e === undefined) {
                            if (typeof d === "string") n = d.split(".");
                            try {
                                if (n.length) for (e = c; e && n.length;) {
                                    l = n.shift();
                                    e = e[l]
                                }
                            } catch(s) {}
                        }
                        return e
                    },
                    qa = function(c, d, e, l, n) {
                        var s = new Date;
                        a.p.reccount = 0;
                        if (b.isXMLDoc(c)) {
                            if (a.p.treeANode === -1 && !a.p.scroll) {
                                $(d);
                                e = 0
                            } else e = e > 0 ? e: 0;
                            var p,
                            w = 0,
                            r,
                            o,
                            v = 0,
                            x = 0,
                            z = 0,
                            D,
                            N,
                            L = [],
                            P,
                            G = {},
                            ba = a.rows.length,
                            E,
                            V,
                            C = [],
                            Q = 0,
                            da = a.p.altRows === true ? " " + a.p.altclass: "";
                            a.p.xmlReader.repeatitems || (L = ja("xml"));
                            D = a.p.keyIndex === false ? a.p.xmlReader.id: a.p.keyIndex;
                            if (L.length > 0 && !isNaN(D)) {
                                if (a.p.remapColumns && a.p.remapColumns.length) D = b.inArray(D, a.p.remapColumns);
                                D = L[D]
                            }
                            N = (D + "").indexOf("[") === -1 ? L.length ? 
                            function(W, U) {
                                return b(D, W).text() || U
                            }: function(W, U) {
                                return b(a.p.xmlReader.cell, W).eq(D).text() || U
                            }: function(W, U) {
                                return W.getAttribute(D.replace(/[\[\]]/g, "")) || U
                            };
                            b(a.p.xmlReader.page, c).each(function() {
                                a.p.page = this.textContent || this.text || 1
                            });
                            b(a.p.xmlReader.total, c).each(function() {
                                a.p.lastpage = this.textContent || this.text;
                                if (a.p.lastpage === undefined) a.p.lastpage = 
                                1
                            });
                            b(a.p.xmlReader.records, c).each(function() {
                                a.p.records = this.textContent || this.text || 0
                            });
                            b(a.p.xmlReader.userdata, c).each(function() {
                                a.p.userData[this.getAttribute("name")] = this.textContent || this.text
                            });
                            c = b(a.p.xmlReader.root + " " + a.p.xmlReader.row, c);
                            var ea = c.length,
                            O = 0;
                            if (c && ea) {
                                var ka = parseInt(a.p.rowNum, 10),
                                wa = a.p.scroll ? (parseInt(a.p.page, 10) - 1) * ka + 1: 1;
                                if (n) ka *= n + 1;
                                for (n = b.isFunction(a.p.afterInsertRow); O < ea;) {
                                    E = c[O];
                                    V = N(E, wa + O);
                                    p = e == 0 ? 0: e + 1;
                                    p = (p + O) % 2 == 1 ? da: "";
                                    C[Q++] = '<tr id="' + V + '" role="row" class ="ui-widget-content jqgrow ui-row-' + 
                                    a.p.direction + "" + p + '">';
                                    if (a.p.rownumbers === true) {
                                        C[Q++] = aa(0, O, a.p.page, a.p.rowNum);
                                        z = 1
                                    }
                                    if (a.p.multiselect === true) {
                                        C[Q++] = ia(V, z, O);
                                        v = 1
                                    }
                                    if (a.p.subGrid === true) {
                                        C[Q++] = b(a).jqGrid("addSubGridCell", v + z, O + e);
                                        x = 1
                                    }
                                    if (a.p.xmlReader.repeatitems) {
                                        P || (P = pa(v + x + z));
                                        var Aa = b(a.p.xmlReader.cell, E);
                                        b.each(P, 
                                        function(W) {
                                            var U = Aa[this];
                                            if (!U) return false;
                                            r = U.textContent || U.text;
                                            G[a.p.colModel[W + v + x + z].name] = r;
                                            C[Q++] = S(V, r, W + v + x + z, O + e, E)
                                        })
                                    } else for (p = 0; p < L.length; p++) {
                                        r = b(L[p], E).text();
                                        G[a.p.colModel[p + v + x + z].name] = 
                                        r;
                                        C[Q++] = S(V, r, p + v + x + z, O + e, E)
                                    }
                                    C[Q++] = "</tr>";
                                    if (a.p.gridview === false) {
                                        if (a.p.treeGrid === true) {
                                            p = a.p.treeANode >= -1 ? a.p.treeANode: 0;
                                            o = b(C.join(""))[0];
                                            try {
                                                b(a).jqGrid("setTreeNode", G, o)
                                            } catch(Ga) {}
                                            ba === 0 ? b("tbody:first", d).append(o) : b(a.rows[O + p + e]).after(o)
                                        } else b("tbody:first", d).append(C.join(""));
                                        if (a.p.subGrid === true) try {
                                            b(a).jqGrid("addSubGrid", a.rows[a.rows.length - 1], v + z)
                                        } catch(Ha) {}
                                        n && a.p.afterInsertRow.call(a, V, G, E);
                                        C = [];
                                        Q = 0
                                    }
                                    G = {};
                                    w++;
                                    O++;
                                    if (w == ka) break
                                }
                            }
                            a.p.gridview === true && b("tbody:first", 
                            d).append(C.join(""));
                            a.p.totaltime = new Date - s;
                            if (w > 0) {
                                a.grid.cols = a.rows[0].cells;
                                if (a.p.records === 0) a.p.records = ea
                            }
                            C = null;
                            if (!a.p.treeGrid && !a.p.scroll) a.grid.bDiv.scrollTop = 0;
                            a.p.reccount = w;
                            a.p.treeANode = -1;
                            a.p.userDataOnFooter && b(a).jqGrid("footerData", "set", a.p.userData, true);
                            l || la(false, true)
                        }
                    },
                    ra = function(c, d, e, l, n) {
                        var s = new Date;
                        a.p.reccount = 0;
                        if (c) {
                            if (a.p.treeANode === -1 && !a.p.scroll) {
                                $(d);
                                e = 0
                            } else e = e > 0 ? e: 0;
                            var p = 0,
                            w,
                            r,
                            o,
                            v = [],
                            x,
                            z = 0,
                            D = 0,
                            N = 0,
                            L,
                            P,
                            G,
                            ba = {},
                            E,
                            V = a.rows.length,
                            C;
                            o = [];
                            E = 0;
                            var Q = 
                            a.p.altRows === true ? " " + a.p.altclass: "";
                            a.p.page = T(c, a.p.jsonReader.page) || 1;
                            G = T(c, a.p.jsonReader.total);
                            a.p.lastpage = G === undefined ? 1: G;
                            a.p.records = T(c, a.p.jsonReader.records) || 0;
                            a.p.userData = T(c, a.p.jsonReader.userdata) || {};
                            a.p.jsonReader.repeatitems || (x = v = ja("json"));
                            G = a.p.keyIndex === false ? a.p.jsonReader.id: a.p.keyIndex;
                            if (v.length > 0 && !isNaN(G)) {
                                if (a.p.remapColumns && a.p.remapColumns.length) G = b.inArray(G, a.p.remapColumns);
                                G = v[G]
                            }
                            if (P = T(c, a.p.jsonReader.root)) {
                                L = P.length;
                                c = 0;
                                var da = parseInt(a.p.rowNum, 
                                10),
                                ea = a.p.scroll ? (parseInt(a.p.page, 10) - 1) * da + 1: 1;
                                if (n) da *= n + 1;
                                for (var O = b.isFunction(a.p.afterInsertRow); c < L;) {
                                    n = P[c];
                                    C = n[G];
                                    if (C === undefined) {
                                        C = ea + c;
                                        if (v.length === 0) if (a.p.jsonReader.cell) C = n[a.p.jsonReader.cell][G] || C
                                    }
                                    w = e == 0 ? 0: e + 1;
                                    w = (w + c) % 2 == 1 ? Q: "";
                                    o[E++] = '<tr id="' + C + '" role="row" class= "ui-widget-content jqgrow ui-row-' + a.p.direction + "" + w + '">';
                                    if (a.p.rownumbers === true) {
                                        o[E++] = aa(0, c, a.p.page, a.p.rowNum);
                                        N = 1
                                    }
                                    if (a.p.multiselect) {
                                        o[E++] = ia(C, N, c);
                                        z = 1
                                    }
                                    if (a.p.subGrid) {
                                        o[E++] = b(a).jqGrid("addSubGridCell", 
                                        z + N, c + e);
                                        D = 1
                                    }
                                    if (a.p.jsonReader.repeatitems) {
                                        if (a.p.jsonReader.cell) n = T(n, a.p.jsonReader.cell);
                                        x || (x = pa(z + D + N))
                                    }
                                    for (r = 0; r < x.length; r++) {
                                        w = T(n, x[r]);
                                        o[E++] = S(C, w, r + z + D + N, c + e, n);
                                        ba[a.p.colModel[r + z + D + N].name] = w
                                    }
                                    o[E++] = "</tr>";
                                    if (a.p.gridview === false) {
                                        if (a.p.treeGrid === true) {
                                            E = a.p.treeANode >= -1 ? a.p.treeANode: 0;
                                            o = b(o.join(""))[0];
                                            try {
                                                b(a).jqGrid("setTreeNode", ba, o)
                                            } catch(ka) {}
                                            V === 0 ? b("tbody:first", d).append(o) : b(a.rows[c + E + e]).after(o)
                                        } else b("tbody:first", d).append(o.join(""));
                                        if (a.p.subGrid === true) try {
                                            b(a).jqGrid("addSubGrid", 
                                            a.rows[a.rows.length - 1], z + N)
                                        } catch(wa) {}
                                        O && a.p.afterInsertRow.call(a, C, ba, n);
                                        o = [];
                                        E = 0
                                    }
                                    ba = {};
                                    p++;
                                    c++;
                                    if (p == da) break
                                }
                                a.p.gridview === true && b("tbody:first", d).append(o.join(""));
                                a.p.totaltime = new Date - s;
                                if (p > 0) {
                                    a.grid.cols = a.rows[0].cells;
                                    if (a.p.records === 0) a.p.records = L
                                }
                            }
                            if (!a.p.treeGrid && !a.p.scroll) a.grid.bDiv.scrollTop = 0;
                            a.p.reccount = p;
                            a.p.treeANode = -1;
                            a.p.userDataOnFooter && b(a).jqGrid("footerData", "set", a.p.userData, true);
                            l || la(false, true)
                        }
                    },
                    la = function(c, d) {
                        var e,
                        l,
                        n,
                        s,
                        p,
                        w,
                        r,
                        o = "";
                        n = (parseInt(a.p.page, 
                        10) - 1) * parseInt(a.p.rowNum, 10);
                        p = n + a.p.reccount;
                        if (a.p.scroll) {
                            e = b("tbody:first > tr", a.grid.bDiv);
                            n = p - e.length;
                            if (l = e.outerHeight()) {
                                e = n * l;
                                l = parseInt(a.p.records, 10) * l;
                                b(">div:first", a.grid.bDiv).css({
                                    height: l
                                }).children("div:first").css({
                                    height: e,
                                    display: e ? "": "none"
                                })
                            }
                        }
                        o = a.p.pager ? a.p.pager: "";
                        o += a.p.toppager ? o ? "," + a.p.toppager: a.p.toppager: "";
                        if (o) {
                            r = b.jgrid.formatter.integer || {};
                            if (a.p.loadonce) {
                                e = l = 1;
                                a.p.lastpage = a.page = 1;
                                b(".selbox", o).attr("disabled", true)
                            } else {
                                e = J(a.p.page, 1);
                                l = J(a.p.lastpage, 
                                1);
                                b(".selbox", o).attr("disabled", false)
                            }
                            if (a.p.pginput === true) {
                                b(".ui-pg-input", o).val(a.p.page);
                                b("#sp_1", o).html(b.fmatter ? b.fmatter.util.NumberFormat(a.p.lastpage, r) : a.p.lastpage)
                            }
                            if (a.p.viewrecords) if (a.p.reccount === 0) b(".ui-paging-info", o).html(a.p.emptyrecords);
                            else {
                                s = n + 1;
                                w = a.p.records;
                                if (b.fmatter) {
                                    s = b.fmatter.util.NumberFormat(s, r);
                                    p = b.fmatter.util.NumberFormat(p, r);
                                    w = b.fmatter.util.NumberFormat(w, r)
                                }
                                b(".ui-paging-info", o).html(b.jgrid.format(a.p.recordtext, s, p, w))
                            }
                            if (a.p.pgbuttons === true) {
                                if (e <= 
                                0) e = l = 1;
                                if (e == 1) {
                                    b("#first, #prev", a.p.pager).addClass("ui-state-disabled").removeClass("ui-state-hover");
                                    a.p.toppager && b("#first_t, #prev_t", a.p.toppager).addClass("ui-state-disabled").removeClass("ui-state-hover")
                                } else {
                                    b("#first, #prev", a.p.pager).removeClass("ui-state-disabled");
                                    a.p.toppager && b("#first_t, #prev_t", a.p.toppager).removeClass("ui-state-disabled")
                                }
                                if (e == l) {
                                    b("#next, #last", a.p.pager).addClass("ui-state-disabled").removeClass("ui-state-hover");
                                    a.p.toppager && b("#next_t, #last_t", a.p.toppager).addClass("ui-state-disabled").removeClass("ui-state-hover")
                                } else {
                                    b("#next, #last", 
                                    a.p.pager).removeClass("ui-state-disabled");
                                    a.p.toppager && b("#next_t, #last_t", a.p.toppager).removeClass("ui-state-disabled")
                                }
                            }
                        }
                        c === true && a.p.rownumbers === true && b("td.jqgrid-rownum", a.rows).each(function(v) {
                            b(this).html(n + 1 + v)
                        });
                        d && a.p.jqgdnd && b(a).jqGrid("gridDnD", "updateDnD");
                        b.isFunction(a.p.gridComplete) && a.p.gridComplete.call(a)
                    },
                    X = function(c) {
                        if (!a.grid.hDiv.loading) {
                            var d = a.p.scroll && c == false,
                            e = {},
                            l,
                            n = a.p.prmNames;
                            if (n.search !== null) e[n.search] = a.p.search;
                            if (n.nd != null) e[n.nd] = (new Date).getTime();
                            if (n.rows !== null) e[n.rows] = a.p.rowNum;
                            if (n.page !== null) e[n.page] = a.p.page;
                            if (n.sort !== null) e[n.sort] = a.p.sortname;
                            if (n.order !== null) e[n.order] = a.p.sortorder;
                            var s = a.p.loadComplete,
                            p = b.isFunction(s);
                            p || (s = null);
                            var w = 0;
                            c = c || 1;
                            if (c > 1) if (n.npage != null) {
                                e[n.npage] = c;
                                w = c - 1;
                                c = 1
                            } else s = function(o) {
                                p && a.p.loadComplete.call(a, o);
                                a.grid.hDiv.loading = false;
                                a.p.page++;
                                X(c - 1)
                            };
                            else n.npage != null && delete a.p.postData[n.npage];
                            b.extend(a.p.postData, e);
                            var r = !a.p.scroll ? 0: a.rows.length - 1;
                            if (b.isFunction(a.p.datatype)) a.p.datatype.call(a, 
                            a.p.postData, "load_" + a.p.id);
                            else {
                                b.isFunction(a.p.beforeRequest) && a.p.beforeRequest.call(a);
                                l = a.p.datatype.toLowerCase();
                                switch (l) {
                                case "json":
                                case "jsonp":
                                case "xml":
                                case "script":
                                    b.ajax(b.extend({
                                        url:
                                        a.p.url,
                                        type: a.p.mtype,
                                        dataType: l,
                                        data: b.isFunction(a.p.serializeGridData) ? a.p.serializeGridData.call(a, a.p.postData) : a.p.postData,
                                        complete: function(o, v) {
                                            if (v == "success" || o.statusText == "OK" && o.status == "200") {
                                                l === "xml" ? qa(o.responseXML, a.grid.bDiv, r, c > 1, w) : ra(b.jgrid.parse(o.responseText), a.grid.bDiv, 
                                                r, c > 1, w);
                                                s && s.call(a, o);
                                                d && a.grid.populateVisible()
                                            }
                                            fa()
                                        },
                                        error: function(o, v, x) {
                                            b.isFunction(a.p.loadError) && a.p.loadError.call(a, o, v, x);
                                            fa()
                                        },
                                        beforeSend: function(o) {
                                            ma();
                                            b.isFunction(a.p.loadBeforeSend) && a.p.loadBeforeSend.call(a, o)
                                        }
                                    },
                                    b.jgrid.ajaxOptions, a.p.ajaxGridOptions));
                                    if (a.p.loadonce || a.p.treeGrid) a.p.datatype = "local";
                                    break;
                                case "xmlstring":
                                    ma();
                                    e = b.jgrid.stringToDoc(a.p.datastr);
                                    p && a.p.loadComplete.call(a, e);
                                    qa(e, a.grid.bDiv);
                                    a.p.datatype = "local";
                                    a.p.datastr = null;
                                    fa();
                                    break;
                                case "jsonstring":
                                    ma();
                                    e = typeof a.p.datastr == "string" ? b.jgrid.parse(a.p.datastr) : a.p.datastr;
                                    p && a.p.loadComplete.call(a, e);
                                    ra(e, a.grid.bDiv);
                                    a.p.datatype = "local";
                                    a.p.datastr = null;
                                    fa();
                                    break;
                                case "local":
                                case "clientside":
                                    ma();
                                    a.p.datatype = "local";
                                    p && a.p.loadComplete.call(a, "");
                                    Ba();
                                    la(true, true);
                                    fa();
                                    break
                                }
                            }
                        }
                    },
                    ma = function() {
                        a.grid.hDiv.loading = true;
                        if (!a.p.hiddengrid) switch (a.p.loadui) {
                        case "disable":
                            break;
                        case "enable":
                            b("#load_" + a.p.id).show();
                            break;
                        case "block":
                            b("#lui_" + a.p.id).show();
                            b("#load_" + a.p.id).show();
                            break
                        }
                    },
                    fa = function() {
                        a.grid.hDiv.loading = false;
                        switch (a.p.loadui) {
                        case "disable":
                            break;
                        case "enable":
                            b("#load_" + a.p.id).hide();
                            break;
                        case "block":
                            b("#lui_" + a.p.id).hide();
                            b("#load_" + a.p.id).hide();
                            break
                        }
                    },
                    Ba = function() {
                        var c = /[\$,%]/g,
                        d = [],
                        e = 0,
                        l,
                        n,
                        s,
                        p = a.p.sortorder == "asc" ? 1: -1;
                        b.each(a.p.colModel, 
                        function(r) {
                            if (this.index == a.p.sortname || this.name == a.p.sortname) {
                                e = a.p.lastsort = r;
                                l = this.sorttype;
                                return false
                            }
                        });
                        s = l == "float" || l == "number" || l == "currency" ? 
                        function(r) {
                            r = parseFloat(r.replace(c, ""));
                            return isNaN(r) ? 
                            0: r
                        }: l == "int" || l == "integer" ? 
                        function(r) {
                            return J(r.replace(c, ""), 0)
                        }: l == "date" || l == "datetime" ? 
                        function(r) {
                            return Ca(a.p.colModel[e].datefmt || "Y-m-d", r).getTime()
                        }: function(r) {
                            return b.trim(r.toUpperCase())
                        };
                        b.each(a.rows, 
                        function(r, o) {
                            try {
                                n = b.unformat(b(o).children("td").eq(e), {
                                    rowId: o.id,
                                    colModel: a.p.colModel[e]
                                },
                                e, true)
                            } catch(v) {
                                n = b(o).children("td").eq(e).text()
                            }
                            o.sortKey = s(n);
                            d[r] = this
                        });
                        if (a.p.treeGrid) b(a).jqGrid("SortTree", p);
                        else {
                            d.sort(function(r, o) {
                                if (r.sortKey < o.sortKey) return - p;
                                if (r.sortKey > 
                                o.sortKey) return p;
                                return 0
                            });
                            if (d[0]) {
                                b("td", d[0]).each(function(r) {
                                    b(this).css("width", g.headers[r].width + "px")
                                });
                                a.grid.cols = d[0].cells
                            }
                            var w = "";
                            if (a.p.altRows) w = a.p.altclass;
                            b.each(d, 
                            function(r, o) {
                                if (w) r % 2 == 1 ? b(o).addClass(w) : b(o).removeClass(w);
                                b("tbody", a.grid.bDiv).append(o);
                                o.sortKey = null
                            })
                        }
                        a.grid.bDiv.scrollTop = 0
                    },
                    Ca = function(c, d) {
                        var e = {
                            m: 1,
                            d: 1,
                            y: 1970,
                            h: 0,
                            i: 0,
                            s: 0
                        },
                        l,
                        n,
                        s;
                        d = d.split(/[\\\/:_;.\t\T\s-]/);
                        c = c.split(/[\\\/:_;.\t\T\s-]/);
                        var p = b.jgrid.formatter.date.monthNames;
                        l = 0;
                        for (n = c.length; l < 
                        n; l++) {
                            if (c[l] == "M") {
                                s = b.inArray(d[l], p);
                                if (s !== -1 && s < 12) d[l] = s + 1
                            }
                            if (c[l] == "F") {
                                s = b.inArray(d[l], p);
                                if (s !== -1 && s > 11) d[l] = s + 1 - 12
                            }
                            e[c[l].toLowerCase()] = parseInt(d[l], 10)
                        }
                        e.m = parseInt(e.m, 10) - 1;
                        c = e.y;
                        if (c >= 70 && c <= 99) e.y = 1900 + e.y;
                        else if (c >= 0 && c <= 69) e.y = 2E3 + e.y;
                        return new Date(e.y, e.m, e.d, e.h, e.i, e.s, 0)
                    };
                    u = function(c, d) {
                        var e = "",
                        l = "<table cellspacing='0' cellpadding='0' border='0' style='table-layout:auto;' class='ui-pg-table'><tbody><tr>",
                        n = "",
                        s,
                        p,
                        w,
                        r,
                        o = function(v) {
                            a.p.selrow = null;
                            if (a.p.multiselect) {
                                a.p.selarrrow = 
                                [];
                                b("#cb_" + b.jgrid.jqID(a.p.id), a.grid.hDiv).attr("checked", false)
                            }
                            a.p.savedRow = [];
                            if (b.isFunction(a.p.onPaging)) if (a.p.onPaging.call(a, v) == "stop") return false;
                            return true
                        };
                        c = c.substr(1);
                        s = "pg_" + c;
                        p = c + "_left";
                        w = c + "_center";
                        r = c + "_right";
                        b("#" + c).append("<div id='" + s + "' class='ui-pager-control' role='group'><table cellspacing='0' cellpadding='0' border='0' class='ui-pg-table' style='width:100%;table-layout:fixed;' role='row'><tbody><tr><td id='" + p + "' align='left'></td><td id='" + w + "' align='center' style='white-space:pre;'></td><td id='" + 
                        r + "' align='right'></td></tr></tbody></table></div>").attr("dir", "ltr");
                        if (a.p.rowList.length > 0) {
                            n = "<td dir='" + m + "'>";
                            n += "<select class='ui-pg-selbox' role='listbox'>";
                            for (p = 0; p < a.p.rowList.length; p++) n += "<option role='option' value='" + a.p.rowList[p] + "'" + (a.p.rowNum == a.p.rowList[p] ? " selected": "") + ">" + a.p.rowList[p] + "</option>";
                            n += "</select></td>"
                        }
                        if (m == "rtl") l += n;
                        if (a.p.pginput === true) e = "<td dir='" + m + "'>" + b.jgrid.format(a.p.pgtext || "", "<input class='ui-pg-input' type='text' size='2' maxlength='7' value='0' role='textbox'/>", 
                        "<span id='sp_1'></span>") + "</td>";
                        if (a.p.pgbuttons === true) {
                            p = ["first" + d, "prev" + d, "next" + d, "last" + d];
                            m == "rtl" && p.reverse();
                            l += "<td id='" + p[0] + "' class='ui-pg-button ui-corner-all'><span class='ui-icon ui-icon-seek-first'></span></td>";
                            l += "<td id='" + p[1] + "' class='ui-pg-button ui-corner-all'><span class='ui-icon ui-icon-seek-prev'></span></td>";
                            l += e != "" ? "<td class='ui-pg-button ui-state-disabled' style='width:4px;'><span class='ui-separator'></span></td>" + e + "<td class='ui-pg-button ui-state-disabled' style='width:4px;'><span class='ui-separator'></span></td>": 
                            "";
                            l += "<td id='" + p[2] + "' class='ui-pg-button ui-corner-all'><span class='ui-icon ui-icon-seek-next'></span></td>";
                            l += "<td id='" + p[3] + "' class='ui-pg-button ui-corner-all'><span class='ui-icon ui-icon-seek-end'></span></td>"
                        } else if (e != "") l += e;
                        if (m == "ltr") l += n;
                        l += "</tr></tbody></table>";
                        a.p.viewrecords === true && b("td#" + c + "_" + a.p.recordpos, "#" + s).append("<div dir='" + m + "' style='text-align:" + a.p.recordpos + "' class='ui-paging-info'></div>");
                        b("td#" + c + "_" + a.p.pagerpos, "#" + s).append(l);
                        n = b(".ui-jqgrid").css("font-size") || 
                        "11px";
                        b("body").append("<div id='testpg' class='ui-jqgrid ui-widget ui-widget-content' style='font-size:" + n + ";visibility:hidden;' ></div>");
                        l = b(l).clone().appendTo("#testpg").width();
                        b("#testpg").remove();
                        if (l > 0) {
                            if (e != "") l += 50;
                            b("td#" + c + "_" + a.p.pagerpos, "#" + s).width(l)
                        }
                        a.p._nvtd = [];
                        a.p._nvtd[0] = l ? Math.floor((a.p.width - l) / 2) : Math.floor(a.p.width / 3);
                        a.p._nvtd[1] = 0;
                        l = null;
                        b(".ui-pg-selbox", "#" + s).bind("change", 
                        function() {
                            a.p.page = Math.round(a.p.rowNum * (a.p.page - 1) / this.value - 0.5) + 1;
                            a.p.rowNum = this.value;
                            if (d) b(".ui-pg-selbox", a.p.pager).val(this.value);
                            else a.p.toppager && b(".ui-pg-selbox", a.p.toppager).val(this.value);
                            if (!o("records")) return false;
                            X();
                            return false
                        });
                        if (a.p.pgbuttons === true) {
                            b(".ui-pg-button", "#" + s).hover(function() {
                                if (b(this).hasClass("ui-state-disabled")) this.style.cursor = "default";
                                else {
                                    b(this).addClass("ui-state-hover");
                                    this.style.cursor = "pointer"
                                }
                            },
                            function() {
                                if (!b(this).hasClass("ui-state-disabled")) {
                                    b(this).removeClass("ui-state-hover");
                                    this.style.cursor = "default"
                                }
                            });
                            b("#first" + 
                            d + ", #prev" + d + ", #next" + d + ", #last" + d, "#" + c).click(function() {
                                var v = J(a.p.page, 1),
                                x = J(a.p.lastpage, 1),
                                z = false,
                                D = true,
                                N = true,
                                L = true,
                                P = true;
                                if (x === 0 || x === 1) P = L = N = D = false;
                                else if (x > 1 && v >= 1) if (v === 1) N = D = false;
                                else {
                                    if (! (v > 1 && v < x)) if (v === x) P = L = false
                                } else if (x > 1 && v === 0) {
                                    P = L = false;
                                    v = x - 1
                                }
                                if (this.id === "first" + d && D) {
                                    a.p.page = 1;
                                    z = true
                                }
                                if (this.id === "prev" + d && N) {
                                    a.p.page = v - 1;
                                    z = true
                                }
                                if (this.id === "next" + d && L) {
                                    a.p.page = v + 1;
                                    z = true
                                }
                                if (this.id === "last" + d && P) {
                                    a.p.page = x;
                                    z = true
                                }
                                if (z) {
                                    if (!o(this.id)) return false;
                                    X()
                                }
                                return false
                            })
                        }
                        a.p.pginput === 
                        true && b("input.ui-pg-input", "#" + s).keypress(function(v) {
                            if ((v.charCode ? v.charCode: v.keyCode ? v.keyCode: 0) == 13) {
                                a.p.page = b(this).val() > 0 ? b(this).val() : a.p.page;
                                if (!o("user")) return false;
                                X();
                                return false
                            }
                            return this
                        })
                    };
                    var xa = function(c, d, e, l) {
                        if (a.p.colModel[d].sortable) if (! (a.p.savedRow.length > 0)) {
                            if (!e) {
                                if (a.p.lastsort == d) if (a.p.sortorder == "asc") a.p.sortorder = "desc";
                                else {
                                    if (a.p.sortorder == "desc") a.p.sortorder = "asc"
                                } else a.p.sortorder = "asc";
                                a.p.page = 1
                            }
                            if (l) if (a.p.lastsort == d && a.p.sortorder == l) return;
                            else a.p.sortorder = l;
                            e = b("thead:first", a.grid.hDiv).get(0);
                            b("tr th:eq(" + a.p.lastsort + ") span.ui-grid-ico-sort", e).addClass("ui-state-disabled");
                            b("tr th:eq(" + a.p.lastsort + ")", e).attr("aria-selected", "false");
                            b("tr th:eq(" + d + ") span.ui-icon-" + a.p.sortorder, e).removeClass("ui-state-disabled");
                            b("tr th:eq(" + d + ")", e).attr("aria-selected", "true");
                            if (!a.p.viewsortcols[0]) if (a.p.lastsort != d) {
                                b("tr th:eq(" + a.p.lastsort + ") span.s-ico", e).hide();
                                b("tr th:eq(" + d + ") span.s-ico", e).show()
                            }
                            a.p.lastsort = d;
                            c = c.substring(5);
                            a.p.sortname = a.p.colModel[d].index || c;
                            e = a.p.sortorder;
                            if (b.isFunction(a.p.onSortCol)) if (a.p.onSortCol.call(a, c, d, e) == "stop") return;
                            if (a.p.datatype == "local") a.p.deselectAfterSort && b(a).jqGrid("resetSelection");
                            else {
                                a.p.selrow = null;
                                a.p.multiselect && b("#cb_" + b.jgrid.jqID(a.p.id), a.grid.hDiv).attr("checked", false);
                                a.p.selarrrow = [];
                                a.p.savedRow = [];
                                a.p.scroll && $(a.grid.bDiv, true)
                            }
                            a.p.subGrid && a.p.datatype == "local" && b("td.sgexpanded", "#" + a.p.id).each(function() {
                                b(this).trigger("click")
                            });
                            X();
                            if (a.p.sortname != 
                            c && d) a.p.lastsort = d
                        }
                    },
                    Da = function(c) {
                        var d = c,
                        e;
                        for (e = c + 1; e < a.p.colModel.length; e++) if (a.p.colModel[e].hidden !== true) {
                            d = e;
                            break
                        }
                        return d - c
                    },
                    Ea = function(c) {
                        var d,
                        e = {},
                        l = B ? 0: a.p.cellLayout;
                        for (d = e[0] = e[1] = e[2] = 0; d <= c; d++) if (a.p.colModel[d].hidden === false) e[0] += a.p.colModel[d].width + l;
                        if (a.p.direction == "rtl") e[0] = a.p.width - e[0];
                        e[0] -= a.grid.bDiv.scrollLeft;
                        if (b(a.grid.cDiv).is(":visible")) e[1] += b(a.grid.cDiv).height() + parseInt(b(a.grid.cDiv).css("padding-top"), 10) + parseInt(b(a.grid.cDiv).css("padding-bottom"), 
                        10);
                        if (a.p.toolbar[0] == true && (a.p.toolbar[1] == "top" || a.p.toolbar[1] == "both")) e[1] += b(a.grid.uDiv).height() + parseInt(b(a.grid.uDiv).css("border-top-width"), 10) + parseInt(b(a.grid.uDiv).css("border-bottom-width"), 10);
                        if (a.p.toppager) e[1] += b(a.grid.topDiv).height() + parseInt(b(a.grid.topDiv).css("border-bottom-width"), 10);
                        e[2] += b(a.grid.bDiv).height() + b(a.grid.hDiv).height();
                        return e
                    };
                    this.p.id = this.id;
                    if (b.inArray(a.p.multikey, ["shiftKey", "altKey", "ctrlKey"]) == -1) a.p.multikey = false;
                    a.p.keyIndex = false;
                    for (j = 0; j < a.p.colModel.length; j++) if (a.p.colModel[j].key === true) {
                        a.p.keyIndex = j;
                        break
                    }
                    a.p.sortorder = a.p.sortorder.toLowerCase();
                    if (this.p.treeGrid === true) try {
                        b(this).jqGrid("setTreeGrid")
                    } catch(Ia) {}
                    if (this.p.subGrid) try {
                        b(a).jqGrid("setSubGrid")
                    } catch(Ja) {}
                    if (this.p.multiselect) {
                        this.p.colNames.unshift("<input id='cb_" + this.p.id + "' class='cbox' type='checkbox'/>");
                        this.p.colModel.unshift({
                            name: "cb",
                            width: B ? a.p.multiselectWidth + a.p.cellLayout: a.p.multiselectWidth,
                            sortable: false,
                            resizable: false,
                            hidedlg: true,
                            search: false,
                            align: "center",
                            fixed: true
                        })
                    }
                    if (this.p.rownumbers) {
                        this.p.colNames.unshift("");
                        this.p.colModel.unshift({
                            name: "rn",
                            width: a.p.rownumWidth,
                            sortable: false,
                            resizable: false,
                            hidedlg: true,
                            search: false,
                            align: "center",
                            fixed: true
                        })
                    }
                    a.p.xmlReader = b.extend(true, {
                        root: "rows",
                        row: "row",
                        page: "rows>page",
                        total: "rows>total",
                        records: "rows>records",
                        repeatitems: true,
                        cell: "cell",
                        id: "[id]",
                        userdata: "userdata",
                        subgrid: {
                            root: "rows",
                            row: "row",
                            repeatitems: true,
                            cell: "cell"
                        }
                    },
                    a.p.xmlReader);
                    a.p.jsonReader = b.extend(true, 
                    {
                        root: "rows",
                        page: "page",
                        total: "total",
                        records: "records",
                        repeatitems: true,
                        cell: "cell",
                        id: "id",
                        userdata: "userdata",
                        subgrid: {
                            root: "rows",
                            repeatitems: true,
                            cell: "cell"
                        }
                    },
                    a.p.jsonReader);
                    if (a.p.scroll) {
                        a.p.pgbuttons = false;
                        a.p.pginput = false;
                        a.p.rowList = []
                    }
                    var H = "<thead><tr class='ui-jqgrid-labels' role='rowheader'>",
                    ya,
                    ga,
                    sa,
                    ha,
                    na,
                    I,
                    A,
                    ca;
                    ga = ca = "";
                    if (a.p.shrinkToFit === true && a.p.forceFit === true) for (j = a.p.colModel.length - 1; j >= 0; j--) if (!a.p.colModel[j].hidden) {
                        a.p.colModel[j].resizable = false;
                        break
                    }
                    if (a.p.viewsortcols[1] == 
                    "horizontal") {
                        ca = " ui-i-asc";
                        ga = " ui-i-desc"
                    }
                    ya = y ? "class='ui-th-div-ie'": "";
                    ca = "<span class='s-ico' style='display:none'><span sort='asc' class='ui-grid-ico-sort ui-icon-asc" + ca + " ui-state-disabled ui-icon ui-icon-triangle-1-n ui-sort-" + m + "'></span>";
                    ca += "<span sort='desc' class='ui-grid-ico-sort ui-icon-desc" + ga + " ui-state-disabled ui-icon ui-icon-triangle-1-s ui-sort-" + m + "'></span></span>";
                    for (j = 0; j < this.p.colNames.length; j++) {
                        H += "<th role='columnheader' class='ui-state-default ui-th-column ui-th-" + 
                        m + "'>";
                        ga = a.p.colModel[j].index || a.p.colModel[j].name;
                        H += "<div id='jqgh_" + a.p.colModel[j].name + "' " + ya + ">" + a.p.colNames[j];
                        if (ga == a.p.sortname) a.p.lastsort = j;
                        H += ca + "</div></th>"
                    }
                    H += "</tr></thead>";
                    b(this).append(H);
                    b("thead tr:first th", this).hover(function() {
                        b(this).addClass("ui-state-hover")
                    },
                    function() {
                        b(this).removeClass("ui-state-hover")
                    });
                    if (this.p.multiselect) {
                        var za = true,
                        ta = [],
                        oa;
                        if (typeof a.p.onSelectAll !== "function") za = false;
                        b("#cb_" + b.jgrid.jqID(a.p.id), this).bind("click", 
                        function() {
                            if (this.checked) {
                                b("[id^=jqg_]", 
                                a.rows).attr("checked", true);
                                b(a.rows).each(function(c) {
                                    if (!b(this).hasClass("subgrid")) {
                                        b(this).addClass("ui-state-highlight").attr("aria-selected", "true");
                                        a.p.selarrrow[c] = a.p.selrow = this.id
                                    }
                                });
                                oa = true;
                                ta = []
                            } else {
                                b("[id^=jqg_]", a.rows).attr("checked", false);
                                b(a.rows).each(function(c) {
                                    if (!b(this).hasClass("subgrid")) {
                                        b(this).removeClass("ui-state-highlight").attr("aria-selected", "false");
                                        ta[c] = this.id
                                    }
                                });
                                a.p.selarrrow = [];
                                a.p.selrow = null;
                                oa = false
                            }
                            if (za) a.p.onSelectAll.call(a, oa ? a.p.selarrrow: ta, oa)
                        })
                    }
                    b.each(a.p.colModel, 
                    function() {
                        if (!this.width) this.width = 150;
                        this.width = parseInt(this.width, 10)
                    });
                    if (a.p.autowidth === true) {
                        H = b(K).innerWidth();
                        a.p.width = H > 0 ? H: "nw"
                    } (function() {
                        var c = 0,
                        d = a.p.cellLayout,
                        e = 0,
                        l,
                        n = a.p.scrollOffset,
                        s,
                        p = false,
                        w,
                        r = 0,
                        o = 0,
                        v = 0,
                        x;
                        if (B) d = 0;
                        b.each(a.p.colModel, 
                        function() {
                            if (typeof this.hidden === "undefined") this.hidden = false;
                            if (this.hidden === false) {
                                c += J(this.width, 0);
                                if (this.fixed) {
                                    r += this.width;
                                    o += this.width + d
                                } else e++;
                                v++
                            }
                        });
                        if (isNaN(a.p.width)) a.p.width = g.width = c;
                        else g.width = a.p.width;
                        a.p.tblwidth = 
                        c;
                        if (a.p.shrinkToFit === false && a.p.forceFit === true) a.p.forceFit = false;
                        if (a.p.shrinkToFit === true && e > 0) {
                            w = g.width - d * e - o;
                            if (!isNaN(a.p.height)) {
                                w -= n;
                                p = true
                            }
                            c = 0;
                            b.each(a.p.colModel, 
                            function(z) {
                                if (this.hidden === false && !this.fixed) {
                                    this.width = s = Math.floor(w / (a.p.tblwidth - r) * this.width);
                                    c += s;
                                    l = z
                                }
                            });
                            x = 0;
                            if (p) {
                                if (g.width - o - (c + d * e) !== n) x = g.width - o - (c + d * e) - n
                            } else if (!p && Math.abs(g.width - o - (c + d * e)) !== 1) x = g.width - o - (c + d * e);
                            a.p.colModel[l].width += x;
                            a.p.tblwidth = c + x + r + v * d
                        }
                    })();
                    b(K).css("width", g.width + "px").append("<div class='ui-jqgrid-resize-mark' id='rs_m" + 
                    a.p.id + "'>&#160;</div>");
                    b(q).css("width", g.width + "px");
                    H = b("thead:first", a).get(0);
                    var ua = "<table role='grid' style='width:" + a.p.tblwidth + "px' class='ui-jqgrid-ftable' cellspacing='0' cellpadding='0' border='0'><tbody><tr role='row' class='ui-widget-content footrow footrow-" + m + "'>";
                    q = b("tr:first", H);
                    a.p.disableClick = false;
                    b("th", q).each(function(c) {
                        b("div", this);
                        sa = a.p.colModel[c].width;
                        if (typeof a.p.colModel[c].resizable === "undefined") a.p.colModel[c].resizable = true;
                        if (a.p.colModel[c].resizable) {
                            ha = 
                            document.createElement("span");
                            b(ha).html("&#160;").addClass("ui-jqgrid-resize ui-jqgrid-resize-" + m); ! b.browser.opera && b(ha).css("cursor", "col-resize");
                            b(this).addClass(a.p.resizeclass)
                        } else ha = "";
                        b(this).css("width", sa + "px").prepend(ha);
                        a.p.colModel[c].hidden && b(this).css("display", "none");
                        g.headers[c] = {
                            width: sa,
                            el: this
                        };
                        na = a.p.colModel[c].sortable;
                        if (typeof na !== "boolean") na = a.p.colModel[c].sortable = true;
                        var d = a.p.colModel[c].name;
                        d == "cb" || d == "subgrid" || d == "rn" || a.p.viewsortcols[2] && b("div", this).addClass("ui-jqgrid-sortable");
                        if (na) if (a.p.viewsortcols[0]) {
                            b("div span.s-ico", this).show();
                            c == a.p.lastsort && b("div span.ui-icon-" + a.p.sortorder, this).removeClass("ui-state-disabled")
                        } else if (c == a.p.lastsort) {
                            b("div span.s-ico", this).show();
                            b("div span.ui-icon-" + a.p.sortorder, this).removeClass("ui-state-disabled")
                        }
                        ua += "<td role='gridcell' " + F(c, 0) + ">&#160;</td>"
                    }).mousedown(function(c) {
                        if (b(c.target).closest("th>span.ui-jqgrid-resize").length == 1) {
                            var d = b.jgrid.getCellIndex(this);
                            if (a.p.forceFit === true) a.p.nv = Da(d);
                            g.dragStart(d, 
                            c, Ea(d));
                            return false
                        }
                    }).click(function(c) {
                        if (a.p.disableClick) return a.p.disableClick = false;
                        var d = "th>div.ui-jqgrid-sortable",
                        e,
                        l;
                        a.p.viewsortcols[2] || (d = "th>div>span>span.ui-grid-ico-sort");
                        c = b(c.target).closest(d);
                        if (c.length == 1) {
                            d = b.jgrid.getCellIndex(this);
                            if (!a.p.viewsortcols[2]) {
                                e = true;
                                l = c.attr("sort")
                            }
                            xa(b("div", this)[0].id, d, e, l);
                            return false
                        }
                    });
                    if (a.p.sortable && b.fn.sortable) try {
                        b(a).jqGrid("sortableColumns", q)
                    } catch(Ka) {}
                    ua += "</tr></tbody></table>";
                    this.appendChild(document.createElement("tbody"));
                    b(this).addClass("ui-jqgrid-btable");
                    q = b("<table class='ui-jqgrid-htable' style='width:" + a.p.tblwidth + "px' role='grid' aria-labelledby='gbox_" + this.id + "' cellspacing='0' cellpadding='0' border='0'></table>").append(H);
                    var R = a.p.caption && a.p.hiddengrid === true ? true: false;
                    H = b("<div class='ui-jqgrid-hbox" + (m == "rtl" ? "-rtl": "") + "'></div>");
                    g.hDiv = document.createElement("div");
                    b(g.hDiv).css({
                        width: g.width + "px"
                    }).addClass("ui-state-default ui-jqgrid-hdiv").append(H);
                    b(H).append(q);
                    R && b(g.hDiv).hide();
                    if (a.p.pager) {
                        if (typeof a.p.pager == 
                        "string") {
                            if (a.p.pager.substr(0, 1) != "#") a.p.pager = "#" + a.p.pager
                        } else a.p.pager = "#" + b(a.p.pager).attr("id");
                        b(a.p.pager).css({
                            width: g.width + "px"
                        }).appendTo(K).addClass("ui-state-default ui-jqgrid-pager ui-corner-bottom");
                        R && b(a.p.pager).hide();
                        u(a.p.pager, "")
                    }
                    a.p.cellEdit === false && a.p.hoverrows === true && b(a).bind("mouseover", 
                    function(c) {
                        A = b(c.target).closest("tr.jqgrow");
                        b(A).attr("class") !== "subgrid" && b(A).addClass("ui-state-hover");
                        return false
                    }).bind("mouseout", 
                    function(c) {
                        A = b(c.target).closest("tr.jqgrow");
                        b(A).removeClass("ui-state-hover");
                        return false
                    });
                    var Y,
                    Z;
                    b(a).before(g.hDiv).click(function(c) {
                        I = c.target;
                        var d = b(I).hasClass("cbox");
                        A = b(I, a.rows).closest("tr.jqgrow");
                        if (b(A).length === 0) return this;
                        var e = true;
                        if (b.isFunction(a.p.beforeSelectRow)) e = a.p.beforeSelectRow.call(a, A[0].id, c);
                        if (I.tagName == "A" || (I.tagName == "INPUT" || I.tagName == "TEXTAREA" || I.tagName == "OPTION" || I.tagName == "SELECT") && !d) return true;
                        if (e === true) {
                            if (a.p.cellEdit === true) if (a.p.multiselect && d) b(a).jqGrid("setSelection", A[0].id, 
                            true);
                            else {
                                Y = A[0].rowIndex;
                                Z = b.jgrid.getCellIndex(I);
                                try {
                                    b(a).jqGrid("editCell", Y, Z, true)
                                } catch(l) {}
                            } else if (a.p.multikey) if (c[a.p.multikey]) b(a).jqGrid("setSelection", A[0].id, true);
                            else {
                                if (a.p.multiselect && d) {
                                    d = b("[id^=jqg_]", A).attr("checked");
                                    b("[id^=jqg_]", A).attr("checked", !d)
                                }
                            } else {
                                if (a.p.multiselect && a.p.multiboxonly) if (!d) {
                                    b(a.p.selarrrow).each(function(n, s) {
                                        n = a.rows.namedItem(s);
                                        b(n).removeClass("ui-state-highlight");
                                        b("#jqg_" + b.jgrid.jqID(s), n).attr("checked", false)
                                    });
                                    a.p.selarrrow = [];
                                    b("#cb_" + 
                                    b.jgrid.jqID(a.p.id), a.grid.hDiv).attr("checked", false)
                                }
                                b(a).jqGrid("setSelection", A[0].id, true)
                            }
                            if (b.isFunction(a.p.onCellSelect)) {
                                Y = A[0].id;
                                Z = b.jgrid.getCellIndex(I);
                                a.p.onCellSelect.call(a, Y, Z, b(I).html(), c)
                            }
                        }
                        c.stopPropagation()
                    }).bind("reloadGrid", 
                    function(c, d) {
                        if (a.p.treeGrid === true) a.p.datatype = a.p.treedatatype;
                        d && d.current && a.grid.selectionPreserver(a);
                        if (a.p.datatype == "local") b(a).jqGrid("resetSelection");
                        else if (!a.p.treeGrid) {
                            a.p.selrow = null;
                            if (a.p.multiselect) {
                                a.p.selarrrow = [];
                                b("#cb_" + 
                                b.jgrid.jqID(a.p.id), a.grid.hDiv).attr("checked", false)
                            }
                            a.p.savedRow = [];
                            a.p.scroll && $(a.grid.bDiv)
                        }
                        if (d && d.page) {
                            c = d.page;
                            if (c > a.p.lastpage) c = a.p.lastpage;
                            if (c < 1) c = 1;
                            a.p.page = c;
                            a.grid.bDiv.scrollTop = a.grid.prevRowHeight ? (c - 1) * a.grid.prevRowHeight * a.p.rowNum: 0
                        }
                        if (a.grid.prevRowHeight && a.p.scroll) {
                            delete a.p.lastpage;
                            a.grid.populateVisible()
                        } else a.grid.populate();
                        return false
                    });
                    b.isFunction(this.p.ondblClickRow) && b(this).dblclick(function(c) {
                        I = c.target;
                        A = b(I, a.rows).closest("tr.jqgrow");
                        if (b(A).length === 
                        0) return false;
                        Y = A[0].rowIndex;
                        Z = b.jgrid.getCellIndex(I);
                        a.p.ondblClickRow.call(a, b(A).attr("id"), Y, Z, c);
                        return false
                    });
                    b.isFunction(this.p.onRightClickRow) && b(this).bind("contextmenu", 
                    function(c) {
                        I = c.target;
                        A = b(I, a.rows).closest("tr.jqgrow");
                        if (b(A).length === 0) return false;
                        a.p.multiselect || b(a).jqGrid("setSelection", A[0].id, true);
                        Y = A[0].rowIndex;
                        Z = b.jgrid.getCellIndex(I);
                        a.p.onRightClickRow.call(a, b(A).attr("id"), Y, Z, c);
                        return false
                    });
                    g.bDiv = document.createElement("div");
                    b(g.bDiv).append(b('<div style="position:relative;' + 
                    (y && b.browser.version < 8 ? "height:0.01%;": "") + '"></div>').append("<div></div>").append(this)).addClass("ui-jqgrid-bdiv").css({
                        height: a.p.height + (isNaN(a.p.height) ? "": "px"),
                        width: g.width + "px"
                    }).scroll(g.scrollGrid);
                    b("table:first", g.bDiv).css({
                        width: a.p.tblwidth + "px"
                    });
                    if (y) {
                        b("tbody", this).size() == 2 && b("tbody:first", this).remove();
                        a.p.multikey && b(g.bDiv).bind("selectstart", 
                        function() {
                            return false
                        })
                    } else a.p.multikey && b(g.bDiv).bind("mousedown", 
                    function() {
                        return false
                    });
                    R && b(g.bDiv).hide();
                    g.cDiv = document.createElement("div");
                    var va = a.p.hidegrid === true ? b("<a role='link' href='javascript:void(0)'/>").addClass("ui-jqgrid-titlebar-close HeaderButton").hover(function() {
                        va.addClass("ui-state-hover")
                    },
                    function() {
                        va.removeClass("ui-state-hover")
                    }).append("<span class='ui-icon ui-icon-circle-triangle-n'></span>").css(m == "rtl" ? "left": "right", "0px") : "";
                    b(g.cDiv).append(va).append("<span class='ui-jqgrid-title" + (m == "rtl" ? "-rtl": "") + "'>" + a.p.caption + "</span>").addClass("ui-jqgrid-titlebar ui-widget-header ui-corner-top ui-helper-clearfix");
                    b(g.cDiv).insertBefore(g.hDiv);
                    if (a.p.toolbar[0]) {
                        g.uDiv = document.createElement("div");
                        if (a.p.toolbar[1] == "top") b(g.uDiv).insertBefore(g.hDiv);
                        else a.p.toolbar[1] == "bottom" && b(g.uDiv).insertAfter(g.hDiv);
                        if (a.p.toolbar[1] == "both") {
                            g.ubDiv = document.createElement("div");
                            b(g.uDiv).insertBefore(g.hDiv).addClass("ui-userdata ui-state-default").attr("id", "t_" + this.id);
                            b(g.ubDiv).insertAfter(g.hDiv).addClass("ui-userdata ui-state-default").attr("id", "tb_" + this.id);
                            R && b(g.ubDiv).hide()
                        } else b(g.uDiv).width(g.width).addClass("ui-userdata ui-state-default").attr("id", 
                        "t_" + this.id);
                        R && b(g.uDiv).hide()
                    }
                    if (a.p.toppager) {
                        a.p.toppager = a.p.id + "_toppager";
                        g.topDiv = b("<div id='" + a.p.toppager + "'></div>")[0];
                        a.p.toppager = "#" + a.p.toppager;
                        b(g.topDiv).insertBefore(g.hDiv).addClass("ui-state-default ui-jqgrid-toppager").width(g.width);
                        u(a.p.toppager, "_t")
                    }
                    if (a.p.footerrow) {
                        g.sDiv = b("<div class='ui-jqgrid-sdiv'></div>")[0];
                        H = b("<div class='ui-jqgrid-hbox" + (m == "rtl" ? "-rtl": "") + "'></div>");
                        b(g.sDiv).append(H).insertAfter(g.hDiv).width(g.width);
                        b(H).append(ua);
                        g.footers = b(".ui-jqgrid-ftable", 
                        g.sDiv)[0].rows[0].cells;
                        if (a.p.rownumbers) g.footers[0].className = "ui-state-default jqgrid-rownum";
                        R && b(g.sDiv).hide()
                    }
                    if (a.p.caption) {
                        var Fa = a.p.datatype;
                        if (a.p.hidegrid === true) {
                            b(".ui-jqgrid-titlebar-close", g.cDiv).click(function(c) {
                                var d = b.isFunction(a.p.onHeaderClick);
                                if (a.p.gridstate == "visible") {
                                    b(".ui-jqgrid-bdiv, .ui-jqgrid-hdiv", "#gview_" + a.p.id).slideUp("fast");
                                    a.p.pager && b(a.p.pager).slideUp("fast");
                                    a.p.toppager && b(a.p.toppager).slideUp("fast");
                                    if (a.p.toolbar[0] === true) {
                                        a.p.toolbar[1] == 
                                        "both" && b(g.ubDiv).slideUp("fast");
                                        b(g.uDiv).slideUp("fast")
                                    }
                                    a.p.footerrow && b(".ui-jqgrid-sdiv", "#gbox_" + a.p.id).slideUp("fast");
                                    b("span", this).removeClass("ui-icon-circle-triangle-n").addClass("ui-icon-circle-triangle-s");
                                    a.p.gridstate = "hidden";
                                    if (d) R || a.p.onHeaderClick.call(a, a.p.gridstate, c)
                                } else if (a.p.gridstate == "hidden") {
                                    b(".ui-jqgrid-hdiv, .ui-jqgrid-bdiv", "#gview_" + a.p.id).slideDown("fast");
                                    a.p.pager && b(a.p.pager).slideDown("fast");
                                    a.p.toppager && b(a.p.toppager).slideDown("fast");
                                    if (a.p.toolbar[0] === 
                                    true) {
                                        a.p.toolbar[1] == "both" && b(g.ubDiv).slideDown("fast");
                                        b(g.uDiv).slideDown("fast")
                                    }
                                    a.p.footerrow && b(".ui-jqgrid-sdiv", "#gbox_" + a.p.id).slideDown("fast");
                                    b("span", this).removeClass("ui-icon-circle-triangle-s").addClass("ui-icon-circle-triangle-n");
                                    if (R) {
                                        a.p.datatype = Fa;
                                        X();
                                        R = false
                                    }
                                    a.p.gridstate = "visible";
                                    d && a.p.onHeaderClick.call(a, a.p.gridstate, c)
                                }
                                return false
                            });
                            if (R) {
                                a.p.datatype = "local";
                                b(".ui-jqgrid-titlebar-close", g.cDiv).trigger("click")
                            }
                        }
                    } else b(g.cDiv).hide();
                    b(g.hDiv).after(g.bDiv).mousemove(function(c) {
                        if (g.resizing) {
                            g.dragMove(c);
                            return false
                        }
                    });
                    b(".ui-jqgrid-labels", g.hDiv).bind("selectstart", 
                    function() {
                        return false
                    });
                    b(document).mouseup(function() {
                        if (g.resizing) {
                            g.dragEnd();
                            return false
                        }
                        return true
                    });
                    this.updateColumns = function() {
                        var c = this.rows[0],
                        d = this;
                        if (c) {
                            b("td", c).each(function(e) {
                                b(this).css("width", d.grid.headers[e].width + "px")
                            });
                            this.grid.cols = c.cells
                        }
                        return this
                    };
                    a.formatCol = F;
                    a.sortData = xa;
                    a.updatepager = la;
                    a.formatter = function(c, d, e, l, n) {
                        return M(c, d, e, l, n)
                    };
                    b.extend(g, {
                        populate: X,
                        emptyRows: $
                    });
                    this.grid = g;
                    a.addXmlData = 
                    function(c) {
                        qa(c, a.grid.bDiv)
                    };
                    a.addJSONData = function(c) {
                        ra(c, a.grid.bDiv)
                    };
                    X();
                    a.p.hiddengrid = false;
                    b(window).unload(function() {
                        b(this).empty();
                        this.p = this.grid = null
                    })
                }
            }
        })
    };
    b.jgrid.extend({
        getGridParam: function(f) {
            var k = this[0];
            if (k.grid) return f ? typeof k.p[f] != "undefined" ? k.p[f] : null: k.p
        },
        setGridParam: function(f) {
            return this.each(function() {
                this.grid && typeof f === "object" && b.extend(true, this.p, f)
            })
        },
        getDataIDs: function() {
            var f = [],
            k = 0,
            i;
            this.each(function() {
                if ((i = this.rows.length) && i > 0) for (; k < i;) {
                    f[k] = 
                    this.rows[k].id;
                    k++
                }
            });
            return f
        },
        setSelection: function(f, k) {
            return this.each(function() {
                function i(a, q) {
                    var u = b(h.grid.bDiv)[0].clientHeight,
                    y = b(h.grid.bDiv)[0].scrollTop,
                    B = h.rows[a].offsetTop + h.rows[a].clientHeight;
                    a = h.rows[a].offsetTop;
                    if (q == "d") if (B >= u) b(h.grid.bDiv)[0].scrollTop = y + B - a;
                    if (q == "u") if (a < y) b(h.grid.bDiv)[0].scrollTop = y - B + a
                }
                var h = this,
                g,
                j,
                m;
                if (f !== undefined) {
                    k = k === false ? false: true;
                    j = h.rows.namedItem(f + "");
                    if (j !== null) {
                        if (h.p.selrow && h.p.scrollrows === true) {
                            g = h.rows.namedItem(h.p.selrow).rowIndex;
                            m = h.rows.namedItem(f).rowIndex;
                            if (m >= 0) m > g ? i(m, "d") : i(m, "u")
                        }
                        if (h.p.multiselect) {
                            h.p.selrow = j.id;
                            m = b.inArray(h.p.selrow, h.p.selarrrow);
                            if (m === -1) {
                                j.className !== "ui-subgrid" && b(j).addClass("ui-state-highlight").attr("aria-selected", "true");
                                g = true;
                                b("#jqg_" + b.jgrid.jqID(h.p.selrow), h.rows[j.rowIndex]).attr("checked", g);
                                h.p.selarrrow.push(h.p.selrow);
                                h.p.onSelectRow && k && h.p.onSelectRow.call(h, h.p.selrow, g)
                            } else {
                                j.className !== "ui-subgrid" && b(j).removeClass("ui-state-highlight").attr("aria-selected", "false");
                                g = false;
                                b("#jqg_" + b.jgrid.jqID(h.p.selrow), h.rows[j.rowIndex]).attr("checked", g);
                                h.p.selarrrow.splice(m, 1);
                                h.p.onSelectRow && k && h.p.onSelectRow.call(h, h.p.selrow, g);
                                j = h.p.selarrrow[0];
                                h.p.selrow = j === undefined ? null: j
                            }
                        } else if (j.className !== "ui-subgrid") {
                            h.p.selrow && b("tr#" + b.jgrid.jqID(h.p.selrow), h.grid.bDiv).removeClass("ui-state-highlight").attr("aria-selected", "false");
                            h.p.selrow = j.id;
                            b(j).addClass("ui-state-highlight").attr("aria-selected", "true");
                            h.p.onSelectRow && k && h.p.onSelectRow.call(h, h.p.selrow, 
                            true)
                        }
                    }
                }
            })
        },
        resetSelection: function() {
            return this.each(function() {
                var f = this,
                k;
                if (f.p.multiselect) {
                    b(f.p.selarrrow).each(function(i, h) {
                        k = f.rows.namedItem(h);
                        b(k).removeClass("ui-state-highlight").attr("aria-selected", "false");
                        b("#jqg_" + b.jgrid.jqID(h), k).attr("checked", false)
                    });
                    b("#cb_" + b.jgrid.jqID(f.p.id), f.grid.hDiv).attr("checked", false);
                    f.p.selarrrow = []
                } else if (f.p.selrow) {
                    b("tr#" + b.jgrid.jqID(f.p.selrow), f.grid.bDiv).removeClass("ui-state-highlight").attr("aria-selected", "false");
                    f.p.selrow = 
                    null
                }
                f.p.savedRow = []
            })
        },
        getRowData: function(f) {
            var k = {},
            i,
            h = false,
            g,
            j = 0;
            this.each(function() {
                var m = this,
                a,
                q;
                if (typeof f == "undefined") {
                    h = true;
                    i = [];
                    g = m.rows.length
                } else {
                    q = m.rows.namedItem(f);
                    if (!q) return k;
                    g = 1
                }
                for (; j < g;) {
                    if (h) q = m.rows[j];
                    b("td", q).each(function(u) {
                        a = m.p.colModel[u].name;
                        if (a !== "cb" && a !== "subgrid") if (m.p.treeGrid === true && a == m.p.ExpandColumn) k[a] = b.jgrid.htmlDecode(b("span:first", this).html());
                        else try {
                            k[a] = b.unformat(this, {
                                rowId: q.id,
                                colModel: m.p.colModel[u]
                            },
                            u)
                        } catch(y) {
                            k[a] = b.jgrid.htmlDecode(b(this).html())
                        }
                    });
                    j++;
                    if (h) {
                        i.push(k);
                        k = {}
                    }
                }
            });
            return i ? i: k
        },
        delRowData: function(f) {
            var k = false,
            i,
            h,
            g;
            this.each(function() {
                var j = this;
                if (i = j.rows.namedItem(f)) {
                    g = i.rowIndex;
                    b(i).remove();
                    j.p.records--;
                    j.p.reccount--;
                    j.updatepager(true, false);
                    k = true;
                    if (j.p.multiselect) {
                        h = b.inArray(f, j.p.selarrrow);
                        h != -1 && j.p.selarrrow.splice(h, 1)
                    }
                    if (f == j.p.selrow) j.p.selrow = null
                } else return false;
                g == 0 && k && j.updateColumns();
                if (j.p.altRows === true && k) {
                    var m = j.p.altclass;
                    b(j.rows).each(function(a) {
                        a % 2 == 1 ? b(this).addClass(m) : b(this).removeClass(m)
                    })
                }
            });
            return k
        },
        setRowData: function(f, k, i) {
            var h,
            g = false;
            this.each(function() {
                var j = this,
                m,
                a,
                q = typeof i;
                if (!j.grid) return false;
                a = j.rows.namedItem(f);
                if (!a) return false;
                k && b(this.p.colModel).each(function(u) {
                    h = this.name;
                    if (k[h] != undefined) {
                        m = j.formatter(f, k[h], u, k, "edit");
                        j.p.treeGrid === true && h == j.p.ExpandColumn ? b("td:eq(" + u + ") > span:first", a).html(m).attr("title", b.jgrid.stripHtml(m)) : b("td:eq(" + u + ")", a).html(m).attr("title", b.jgrid.stripHtml(m));
                        g = true
                    }
                });
                if (q === "string") b(a).addClass(i);
                else q === "object" && 
                b(a).css(i)
            });
            return g
        },
        addRowData: function(f, k, i, h) {
            i || (i = "last");
            var g = false,
            j,
            m,
            a,
            q,
            u,
            y,
            B,
            K,
            J = "",
            F,
            S,
            M;
            if (k) {
                if (b.isArray(k)) {
                    F = true;
                    i = "last";
                    S = f
                } else {
                    k = [k];
                    F = false
                }
                this.each(function() {
                    var t = this,
                    ia = k.length;
                    u = t.p.rownumbers === true ? 1: 0;
                    a = t.p.multiselect === true ? 1: 0;
                    q = t.p.subGrid === true ? 1: 0;
                    if (!F) if (typeof f != "undefined") f += "";
                    else {
                        f = t.p.records + 1 + "";
                        if (t.p.keyIndex !== false) {
                            cmn = t.p.colModel[t.p.keyIndex + a + q + u].name;
                            if (typeof k[0][cmn] != "undefined") f = k[0][cmn]
                        }
                    }
                    M = t.p.altclass;
                    for (var aa = 0, ja = b.isFunction(t.p.afterInsertRow) ? 
                    true: false; aa < ia;) {
                        data = k[aa];
                        m = "";
                        if (F) {
                            try {
                                f = data[S]
                            } catch(pa) {
                                f = t.p.records + 1
                            }
                            var $ = t.p.altRows === true ? (t.rows.length - 1) % 2 == 0 ? M: "": ""
                        }
                        if (u) {
                            J = t.formatCol(u, 1);
                            m += '<td role="gridcell" class="ui-state-default jqgrid-rownum" ' + J + ">0</td>"
                        }
                        if (a) {
                            K = '<input type="checkbox" id="jqg_' + f + '" class="cbox"/>';
                            J = t.formatCol(u, 1);
                            m += '<td role="gridcell" ' + J + ">" + K + "</td>"
                        }
                        if (q) m += b(t).jqGrid("addSubGridCell", a + u, 1);
                        for (B = a + q + u; B < this.p.colModel.length; B++) {
                            j = this.p.colModel[B].name;
                            K = t.formatter(f, data[j], B, 
                            data, "add");
                            J = t.formatCol(B, 1);
                            m += '<td role="gridcell" ' + J + ' title="' + b.jgrid.stripHtml(K) + '">' + K + "</td>"
                        }
                        m = '<tr id="' + f + '" role="row" class="ui-widget-content jqgrow ui-row-' + t.p.direction + " " + $ + '">' + m + "</tr>";
                        if (t.p.subGrid === true) {
                            m = b(m)[0];
                            b(t).jqGrid("addSubGrid", m, a + u)
                        }
                        if (t.rows.length === 0) b("table:first", t.grid.bDiv).append(m);
                        else switch (i) {
                        case "last":
                            b(t.rows[t.rows.length - 1]).after(m);
                            break;
                        case "first":
                            b(t.rows[0]).before(m);
                            break;
                        case "after":
                            if (y = t.rows.namedItem(h)) b(t.rows[y.rowIndex + 
                            1]).hasClass("ui-subgrid") ? b(t.rows[y.rowIndex + 1]).after(m) : b(y).after(m);
                            break;
                        case "before":
                            if (y = t.rows.namedItem(h)) {
                                b(y).before(m);
                                y = y.rowIndex
                            }
                            break
                        }
                        t.p.records++;
                        t.p.reccount++;
                        if (!t.grid.cols || !t.grid.cols.length) t.grid.cols = t.rows[0].cells;
                        if (i === "first" || i === "before" && y <= 1 || t.rows.length === 1) t.updateColumns();
                        ja && t.p.afterInsertRow(t, f, data);
                        aa++
                    }
                    if (t.p.altRows === true && !F) if (i == "last")(t.rows.length - 1) % 2 == 1 && b(t.rows[t.rows.length - 1]).addClass(M);
                    else b(t.rows).each(function(T) {
                        T % 2 == 1 ? b(this).addClass(M) : 
                        b(this).removeClass(M)
                    });
                    t.updatepager(true, true);
                    g = true
                })
            }
            return g
        },
        footerData: function(f, k, i) {
            function h(a) {
                for (var q in a) return false;
                return true
            }
            var g,
            j = false,
            m = {};
            if (typeof f == "undefined") f = "get";
            if (typeof i != "boolean") i = true;
            f = f.toLowerCase();
            this.each(function() {
                var a = this,
                q;
                if (!a.grid || !a.p.footerrow) return false;
                if (f == "set") if (h(k)) return false;
                j = true;
                b(this.p.colModel).each(function(u) {
                    g = this.name;
                    if (f == "set") {
                        if (k[g] != undefined) {
                            q = i ? a.formatter("", k[g], u, k, "edit") : k[g];
                            b("tr.footrow td:eq(" + 
                            u + ")", a.grid.sDiv).html(q).attr("title", b.jgrid.stripHtml(q));
                            j = true
                        }
                    } else if (f == "get") m[g] = b("tr.footrow td:eq(" + u + ")", a.grid.sDiv).html()
                })
            });
            return f == "get" ? m: j
        },
        ShowHideCol: function(f, k) {
            return this.each(function() {
                var i = this,
                h = false;
                if (i.grid) {
                    if (typeof f === "string") f = [f];
                    k = k != "none" ? "": "none";
                    var g = k == "" ? true: false;
                    b(this.p.colModel).each(function(j) {
                        if (b.inArray(this.name, f) !== -1 && this.hidden === g) {
                            b("tr", i.grid.hDiv).each(function() {
                                b("th:eq(" + j + ")", this).css("display", k)
                            });
                            b(i.rows).each(function(m) {
                                b("td:eq(" + 
                                j + ")", i.rows[m]).css("display", k)
                            });
                            i.p.footerrow && b("td:eq(" + j + ")", i.grid.sDiv).css("display", k);
                            if (k == "none") i.p.tblwidth -= this.width;
                            else i.p.tblwidth += this.width;
                            this.hidden = !g;
                            h = true
                        }
                    });
                    if (h === true) {
                        b("table:first", i.grid.hDiv).width(i.p.tblwidth);
                        b("table:first", i.grid.bDiv).width(i.p.tblwidth);
                        i.grid.hDiv.scrollLeft = i.grid.bDiv.scrollLeft;
                        if (i.p.footerrow) {
                            b("table:first", i.grid.sDiv).width(i.p.tblwidth);
                            i.grid.sDiv.scrollLeft = i.grid.bDiv.scrollLeft
                        }
                    }
                }
            })
        },
        hideCol: function(f) {
            return this.each(function() {
                b(this).jqGrid("ShowHideCol", 
                f, "none")
            })
        },
        showCol: function(f) {
            return this.each(function() {
                b(this).jqGrid("ShowHideCol", f, "")
            })
        },
        remapColumns: function(f, k, i) {
            function h(m) {
                var a;
                a = m.length ? b.makeArray(m) : b.extend({},
                m);
                b.each(f, 
                function(q) {
                    m[q] = a[this]
                })
            }
            function g(m, a) {
                b(">tr" + (a || ""), m).each(function() {
                    var q = this,
                    u = b.makeArray(q.cells);
                    b.each(f, 
                    function() {
                        var y = u[this];
                        y && q.appendChild(y)
                    })
                })
            }
            var j = this.get(0);
            h(j.p.colModel);
            h(j.p.colNames);
            h(j.grid.headers);
            g(b("thead:first", j.grid.hDiv), i && ":not(.ui-jqgrid-labels)");
            k && g(b("tbody:first", 
            j.grid.bDiv), ".jqgrow");
            j.p.footerrow && g(b("tbody:first", j.grid.sDiv));
            if (j.p.remapColumns) if (j.p.remapColumns.length) h(j.p.remapColumns);
            else j.p.remapColumns = b.makeArray(f);
            j.p.lastsort = b.inArray(j.p.lastsort, f);
            if (j.p.treeGrid) j.p.expColInd = b.inArray(j.p.expColInd, f)
        },
        setGridWidth: function(f, k) {
            return this.each(function() {
                var i = this,
                h,
                g = 0,
                j = i.p.cellLayout,
                m,
                a = 0,
                q = false,
                u = i.p.scrollOffset,
                y,
                B = 0,
                K = 0,
                J = 0,
                F;
                if (i.grid) {
                    if (typeof k != "boolean") k = i.p.shrinkToFit;
                    if (!isNaN(f)) {
                        f = parseInt(f, 10);
                        i.grid.width = 
                        i.p.width = f;
                        b("#gbox_" + i.p.id).css("width", f + "px");
                        b("#gview_" + i.p.id).css("width", f + "px");
                        b(i.grid.bDiv).css("width", f + "px");
                        b(i.grid.hDiv).css("width", f + "px");
                        i.p.pager && b(i.p.pager).css("width", f + "px");
                        if (i.p.toolbar[0] === true) {
                            b(i.grid.uDiv).css("width", f + "px");
                            i.p.toolbar[1] == "both" && b(i.grid.ubDiv).css("width", f + "px")
                        }
                        i.p.footerrow && b(i.grid.sDiv).css("width", f + "px");
                        if (k === false && i.p.forceFit == true) i.p.forceFit = false;
                        if (k === true) {
                            if (b.browser.safari) j = 0;
                            b.each(i.p.colModel, 
                            function() {
                                if (this.hidden === 
                                false) {
                                    g += parseInt(this.width, 10);
                                    if (this.fixed) {
                                        K += this.width;
                                        B += this.width + j
                                    } else a++;
                                    J++
                                }
                            });
                            if (a != 0) {
                                i.p.tblwidth = g;
                                y = f - j * a - B;
                                if (!isNaN(i.p.height)) if (b(i.grid.bDiv)[0].clientHeight < b(i.grid.bDiv)[0].scrollHeight) {
                                    q = true;
                                    y -= u
                                }
                                g = 0;
                                var S = i.grid.cols.length > 0;
                                b.each(i.p.colModel, 
                                function(M) {
                                    if (this.hidden === false && !this.fixed) {
                                        this.width = h = Math.floor(y / (i.p.tblwidth - K) * this.width);
                                        g += h;
                                        i.grid.headers[M].width = h;
                                        i.grid.headers[M].el.style.width = h + "px";
                                        if (i.p.footerrow) i.grid.footers[M].style.width = 
                                        h + "px";
                                        if (S) i.grid.cols[M].style.width = h + "px";
                                        m = M
                                    }
                                });
                                F = 0;
                                if (q) {
                                    if (f - B - (g + j * a) !== u) F = f - B - (g + j * a) - u
                                } else if (Math.abs(f - B - (g + j * a)) !== 1) F = f - B - (g + j * a);
                                i.p.colModel[m].width += F;
                                h = i.p.colModel[m].width;
                                i.grid.headers[m].width = h;
                                i.grid.headers[m].el.style.width = h + "px";
                                if (S) i.grid.cols[m].style.width = h + "px";
                                i.p.tblwidth = g + F + K + j * J;
                                b("table:first", i.grid.bDiv).css("width", i.p.tblwidth + "px");
                                b("table:first", i.grid.hDiv).css("width", i.p.tblwidth + "px");
                                i.grid.hDiv.scrollLeft = i.grid.bDiv.scrollLeft;
                                if (i.p.footerrow) {
                                    i.grid.footers[m].style.width = 
                                    h + "px";
                                    b("table:first", i.grid.sDiv).css("width", i.p.tblwidth + "px")
                                }
                            }
                        }
                    }
                }
            })
        },
        setGridHeight: function(f) {
            return this.each(function() {
                var k = this;
                if (k.grid) {
                    b(k.grid.bDiv).css({
                        height: f + (isNaN(f) ? "": "px")
                    });
                    k.p.height = f;
                    k.p.scroll && k.grid.populateVisible()
                }
            })
        },
        setCaption: function(f) {
            return this.each(function() {
                this.p.caption = f;
                b("span.ui-jqgrid-title", this.grid.cDiv).html(f);
                b(this.grid.cDiv).show()
            })
        },
        setLabel: function(f, k, i, h) {
            return this.each(function() {
                var g = this,
                j = -1;
                if (g.grid) {
                    if (isNaN(f)) b(g.p.colModel).each(function(q) {
                        if (this.name == 
                        f) {
                            j = q;
                            return false
                        }
                    });
                    else j = parseInt(f, 10);
                    if (j >= 0) {
                        var m = b("tr.ui-jqgrid-labels th:eq(" + j + ")", g.grid.hDiv);
                        if (k) {
                            var a = b(".s-ico", m);
                            b("[id^=jqgh_]", m).empty().html(k).append(a);
                            g.p.colNames[j] = k
                        }
                        if (i) typeof i === "string" ? b(m).addClass(i) : b(m).css(i);
                        typeof h === "object" && b(m).attr(h)
                    }
                }
            })
        },
        setCell: function(f, k, i, h, g) {
            return this.each(function() {
                var j = this,
                m = -1,
                a;
                if (j.grid) {
                    if (isNaN(k)) b(j.p.colModel).each(function(u) {
                        if (this.name == k) {
                            m = u;
                            return false
                        }
                    });
                    else m = parseInt(k, 10);
                    if (m >= 0) if (a = j.rows.namedItem(f)) {
                        var q = 
                        b("td:eq(" + m + ")", a);
                        if (i !== "") {
                            a = j.formatter(f, i, m, a, "edit");
                            j.p.treeGrid && b(".tree-wrap", b(q)).length > 0 ? b("span", b(q)).html(a).attr("title", b.jgrid.stripHtml(a)) : b(q).html(a).attr("title", b.jgrid.stripHtml(a))
                        }
                        if (typeof h === "string") h ? b(q).addClass(h) : b(q).removeClass();
                        else h && b(q).css(h);
                        typeof g === "object" && b(q).attr(g)
                    }
                }
            })
        },
        getCell: function(f, k) {
            var i = false;
            this.each(function() {
                var h = this,
                g = -1;
                if (h.grid) {
                    if (isNaN(k)) b(h.p.colModel).each(function(a) {
                        if (this.name === k) {
                            g = a;
                            return false
                        }
                    });
                    else g = 
                    parseInt(k, 10);
                    if (g >= 0) {
                        var j = h.rows.namedItem(f);
                        if (j) try {
                            i = b.unformat(b("td:eq(" + g + ")", j), {
                                rowId: j.id,
                                colModel: h.p.colModel[g]
                            },
                            g)
                        } catch(m) {
                            i = b.jgrid.htmlDecode(b("td:eq(" + g + ")", j).html())
                        }
                    }
                }
            });
            return i
        },
        getCol: function(f, k, i) {
            var h = [],
            g,
            j = 0;
            k = typeof k != "boolean" ? false: k;
            if (typeof i == "undefined") i = false;
            this.each(function() {
                var m = this,
                a = -1;
                if (m.grid) {
                    if (isNaN(f)) b(m.p.colModel).each(function(B) {
                        if (this.name === f) {
                            a = B;
                            return false
                        }
                    });
                    else a = parseInt(f, 10);
                    if (a >= 0) {
                        var q = m.rows.length,
                        u = 0;
                        if (q && q > 
                        0) {
                            for (; u < q;) {
                                try {
                                    g = b.unformat(b(m.rows[u].cells[a]), {
                                        rowId: m.rows[u].id,
                                        colModel: m.p.colModel[a]
                                    },
                                    a)
                                } catch(y) {
                                    g = b.jgrid.htmlDecode(m.rows[u].cells[a].innerHTML)
                                }
                                i ? (j += parseFloat(g)) : k ? h.push({
                                    id: m.rows[u].id,
                                    value: g
                                }) : (h[u] = g);
                                u++
                            }
                            if (i) switch (i.toLowerCase()) {
                            case "sum":
                                h = j;
                                break;
                            case "avg":
                                h = j / q;
                                break;
                            case "count":
                                h = q;
                                break
                            }
                        }
                    }
                }
            });
            return h
        },
        clearGridData: function(f) {
            return this.each(function() {
                var k = this;
                if (k.grid) {
                    if (typeof f != "boolean") f = false;
                    b("tbody:first tr", k.grid.bDiv).remove();
                    k.p.footerrow && 
                    f && b(".ui-jqgrid-ftable td", k.grid.sDiv).html("&#160;");
                    k.p.selrow = null;
                    k.p.selarrrow = [];
                    k.p.savedRow = [];
                    k.p.records = 0;
                    k.p.page = "0";
                    k.p.lastpage = "0";
                    k.p.reccount = 0;
                    k.updatepager(true, false)
                }
            })
        },
        getInd: function(f, k) {
            var i = false,
            h;
            this.each(function() {
                if (h = this.rows.namedItem(f)) i = k === true ? h: h.rowIndex
            });
            return i
        }
    })
})(jQuery);
 (function(c) {
    function u(a, b, d, e, h) {
        var g = b;
        if (c.fn.fmatter[a]) g = c.fn.fmatter[a](b, d, e, h);
        return g
    }
    c.fmatter = {};
    c.fn.fmatter = function(a, b, d, e, h) {
        d = c.extend({},
        c.jgrid.formatter, d);
        return u(a, b, d, e, h)
    };
    c.fmatter.util = {
        NumberFormat: function(a, b) {
            isNumber(a) || (a *= 1);
            if (isNumber(a)) {
                var d = a < 0,
                e = a + "",
                h = b.decimalSeparator ? b.decimalSeparator: ".";
                if (isNumber(b.decimalPlaces)) {
                    var g = b.decimalPlaces;
                    e = Math.pow(10, g);
                    e = Math.round(a * e) / e + "";
                    a = e.lastIndexOf(".");
                    if (g > 0) {
                        if (a < 0) {
                            e += h;
                            a = e.length - 1
                        } else if (h !== ".") e = 
                        e.replace(".", h);
                        for (; e.length - 1 - a < g;) e += "0"
                    }
                }
                if (b.thousandsSeparator) {
                    g = b.thousandsSeparator;
                    a = e.lastIndexOf(h);
                    a = a > -1 ? a: e.length;
                    h = e.substring(a);
                    for (var f = -1, i = a; i > 0; i--) {
                        f++;
                        if (f % 3 === 0 && i !== a && (!d || i > 1)) h = g + h;
                        h = e.charAt(i - 1) + h
                    }
                    e = h
                }
                e = b.prefix ? b.prefix + e: e;
                return e = b.suffix ? e + b.suffix: e
            } else return a
        },
        DateFormat: function(a, b, d, e) {
            var h = function(m, r) {
                m = String(m);
                for (r = parseInt(r) || 2; m.length < r;) m = "0" + m;
                return m
            },
            g = {
                m: 1,
                d: 1,
                y: 1970,
                h: 0,
                i: 0,
                s: 0
            },
            f = 0,
            i,
            k,
            j = ["i18n"];
            j.i18n = {
                dayNames: e.dayNames,
                monthNames: e.monthNames
            };
            if (a in e.masks) a = e.masks[a];
            b = b.split(/[\\\/:_;.\t\T\s-]/);
            a = a.split(/[\\\/:_;.\t\T\s-]/);
            i = 0;
            for (k = a.length; i < k; i++) {
                if (a[i] == "M") {
                    f = c.inArray(b[i], j.i18n.monthNames);
                    if (f !== -1 && f < 12) b[i] = f + 1
                }
                if (a[i] == "F") {
                    f = c.inArray(b[i], j.i18n.monthNames);
                    if (f !== -1 && f > 11) b[i] = f + 1 - 12
                }
                g[a[i].toLowerCase()] = parseInt(b[i], 10)
            }
            g.m = parseInt(g.m) - 1;
            f = g.y;
            if (f >= 70 && f <= 99) g.y = 1900 + g.y;
            else if (f >= 0 && f <= 69) g.y = 2E3 + g.y;
            f = new Date(g.y, g.m, g.d, g.h, g.i, g.s, 0);
            if (d in e.masks) d = e.masks[d];
            else d || (d = "Y-m-d");
            g = f.getHours();
            a = f.getMinutes();
            b = f.getDate();
            i = f.getMonth() + 1;
            k = f.getTimezoneOffset();
            var l = f.getSeconds(),
            o = f.getMilliseconds(),
            n = f.getDay(),
            p = f.getFullYear(),
            q = (n + 6) % 7 + 1,
            s = (new Date(p, i - 1, b) - new Date(p, 0, 1)) / 864E5,
            t = {
                d: h(b),
                D: j.i18n.dayNames[n],
                j: b,
                l: j.i18n.dayNames[n + 7],
                N: q,
                S: e.S(b),
                w: n,
                z: s,
                W: q < 5 ? Math.floor((s + q - 1) / 7) + 1: Math.floor((s + q - 1) / 7) || (((new Date(p - 1, 0, 1)).getDay() + 6) % 7 < 4 ? 53: 52),
                F: j.i18n.monthNames[i - 1 + 12],
                m: h(i),
                M: j.i18n.monthNames[i - 1],
                n: i,
                t: "?",
                L: "?",
                o: "?",
                Y: p,
                y: String(p).substring(2),
                a: g < 12 ? e.AmPm[0] : 
                e.AmPm[1],
                A: g < 12 ? e.AmPm[2] : e.AmPm[3],
                B: "?",
                g: g % 12 || 12,
                G: g,
                h: h(g % 12 || 12),
                H: h(g),
                i: h(a),
                s: h(l),
                u: o,
                e: "?",
                I: "?",
                O: (k > 0 ? "-": "+") + h(Math.floor(Math.abs(k) / 60) * 100 + Math.abs(k) % 60, 4),
                P: "?",
                T: (String(f).match(/\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g) || [""]).pop().replace(/[^-+\dA-Z]/g, ""),
                Z: "?",
                c: "?",
                r: "?",
                U: Math.floor(f / 1E3)
            };
            return d.replace(/\\.|[dDjlNSwzWFmMntLoYyaABgGhHisueIOPTZcrU]/g, 
            function(m) {
                return m in 
                t ? t[m] : m.substring(1)
            })
        }
    };
    c.fn.fmatter.defaultFormat = function(a, b) {
        return isValue(a) && a !== "" ? a: b.defaultValue ? b.defaultValue: "&#160;"
    };
    c.fn.fmatter.email = function(a, b) {
        return isEmpty(a) ? c.fn.fmatter.defaultFormat(a, b) : '<a href="mailto:' + a + '">' + a + "</a>"
    };
    c.fn.fmatter.checkbox = function(a, b) {
        var d = c.extend({},
        b.checkbox);
        isUndefined(b.colModel.formatoptions) || (d = c.extend({},
        d, b.colModel.formatoptions));
        b = d.disabled === true ? "disabled": "";
        if (isEmpty(a) || isUndefined(a)) a = c.fn.fmatter.defaultFormat(a, d);
        a += "";
        a = a.toLowerCase();
        return '<input type="checkbox" ' + (a.search(/(false|0|no|off)/i) < 0 ? " checked='checked' ": "") + ' value="' + a + '" offval="no" ' + b + "/>"
    };
    c.fn.fmatter.link = function(a, b) {
        var d = {
            target: b.target
        },
        e = "";
        isUndefined(b.colModel.formatoptions) || (d = c.extend({},
        d, b.colModel.formatoptions));
        if (d.target) e = "target=" + d.target;
        return isEmpty(a) ? c.fn.fmatter.defaultFormat(a, b) : "<a " + e + ' href="' + a + '">' + a + "</a>"
    };
    c.fn.fmatter.showlink = function(a, b) {
        var d = {
            baseLinkUrl: b.baseLinkUrl,
            showAction: b.showAction,
            addParam: b.addParam || "",
            target: b.target,
            idName: b.idName
        },
        e = "";
        isUndefined(b.colModel.formatoptions) || (d = c.extend({},
        d, b.colModel.formatoptions));
        if (d.target) e = "target=" + d.target;
        idUrl = d.baseLinkUrl + d.showAction + "?" + d.idName + "=" + b.rowId + d.addParam;
        return isString(a) ? "<a " + e + ' href="' + idUrl + '">' + a + "</a>": c.fn.fmatter.defaultFormat(a, b)
    };
    c.fn.fmatter.integer = function(a, b) {
        var d = c.extend({},
        b.integer);
        isUndefined(b.colModel.formatoptions) || (d = c.extend({},
        d, b.colModel.formatoptions));
        if (isEmpty(a)) return d.defaultValue;
        return c.fmatter.util.NumberFormat(a, d)
    };
    c.fn.fmatter.number = function(a, b) {
        var d = c.extend({},
        b.number);
        isUndefined(b.colModel.formatoptions) || (d = c.extend({},
        d, b.colModel.formatoptions));
        if (isEmpty(a)) return d.defaultValue;
        return c.fmatter.util.NumberFormat(a, d)
    };
    c.fn.fmatter.currency = function(a, b) {
        var d = c.extend({},
        b.currency);
        isUndefined(b.colModel.formatoptions) || (d = c.extend({},
        d, b.colModel.formatoptions));
        if (isEmpty(a)) return d.defaultValue;
        return c.fmatter.util.NumberFormat(a, d)
    };
    c.fn.fmatter.date = 
    function(a, b, d, e) {
        d = c.extend({},
        b.date);
        isUndefined(b.colModel.formatoptions) || (d = c.extend({},
        d, b.colModel.formatoptions));
        return ! d.reformatAfterEdit && e == "edit" ? c.fn.fmatter.defaultFormat(a, b) : isEmpty(a) ? c.fn.fmatter.defaultFormat(a, b) : c.fmatter.util.DateFormat(d.srcformat, a, d.newformat, d)
    };
    c.fn.fmatter.select = function(a, b) {
        a += "";
        var d = false,
        e = [];
        if (!isUndefined(b.colModel.editoptions)) d = b.colModel.editoptions.value;
        if (d) {
            var h = b.colModel.editoptions.multiple === true ? true: false,
            g = [],
            f;
            if (h) {
                g = a.split(",");
                g = c.map(g, 
                function(l) {
                    return c.trim(l)
                })
            }
            if (isString(d)) for (var i = d.split(";"), k = 0, j = 0; j < i.length; j++) {
                f = i[j].split(":");
                if (f.length > 2) f[1] = jQuery.map(f, 
                function(l, o) {
                    if (o > 0) return l
                }).join(":");
                if (h) {
                    if (jQuery.inArray(f[0], g) > -1) {
                        e[k] = f[1];
                        k++
                    }
                } else if (c.trim(f[0]) == c.trim(a)) {
                    e[0] = f[1];
                    break
                }
            } else if (isObject(d)) if (h) e = jQuery.map(g, 
            function(l) {
                return d[l]
            });
            else e[0] = d[a] || ""
        }
        a = e.join(", ");
        return a == "" ? c.fn.fmatter.defaultFormat(a, b) : a
    };
    c.fn.fmatter.rowactions = function(a, b, d, e) {
        switch (d) {
        case "edit":
            d = 
            function() {
                c(".ui-inline-edit, .ui-inline-del", "#" + a).show();
                c(".ui-inline-save, .ui-inline-cancel", "#" + a).hide()
            };
            c("#" + b).jqGrid("editRow", a, e, null, null, null, {
                oper: "edit"
            },
            d, null, d);
            c(".ui-inline-edit, .ui-inline-del", "#" + a).hide();
            c(".ui-inline-save, .ui-inline-cancel", "#" + a).show();
            break;
        case "save":
            c("#" + b).jqGrid("saveRow", a, null, null, {
                oper: "edit"
            });
            c(".ui-inline-edit, .ui-inline-del", "#" + a).show();
            c(".ui-inline-save, .ui-inline-cancel", "#" + a).hide();
            break;
        case "cancel":
            c("#" + b).jqGrid("restoreRow", 
            a);
            c(".ui-inline-edit, .ui-inline-del", "#" + a).show();
            c(".ui-inline-save, .ui-inline-cancel", "#" + a).hide();
            break
        }
    };
    c.fn.fmatter.actions = function(a, b) {
        var d = {
            keys: false
        };
        isUndefined(b.colModel.formatoptions) || (d = c.extend(d, b.colModel.formatoptions));
        a = b.rowId;
        if (typeof a == "undefined" || isEmpty(a)) return "";
        d = "onclick=$.fn.fmatter.rowactions('" + a + "','" + b.gid + "','edit'," + d.keys + ");";
        var e = "<div style='margin-left:8px;'><div title='" + c.jgrid.nav.edittitle + "' style='float:left;cursor:pointer;' class='ui-pg-div ui-inline-edit' " + 
        d + "><span class='ui-icon ui-icon-pencil'></span></div>";
        d = "onclick=jQuery('#" + b.gid + "').jqGrid('delGridRow','" + a + "');";
        e = e + "<div title='" + c.jgrid.nav.deltitle + "' style='float:left;margin-left:5px;' class='ui-pg-div ui-inline-del' " + d + "><span class='ui-icon ui-icon-trash'></span></div>";
        d = "onclick=$.fn.fmatter.rowactions('" + a + "','" + b.gid + "','save',false);";
        e = e + "<div title='" + c.jgrid.edit.bSubmit + "' style='float:left;display:none' class='ui-pg-div ui-inline-save'><span class='ui-icon ui-icon-disk' " + 
        d + "></span></div>";
        d = "onclick=$.fn.fmatter.rowactions('" + a + "','" + b.gid + "','cancel',false);";
        return e = e + "<div title='" + c.jgrid.edit.bCancel + "' style='float:left;display:none;margin-left:5px;' class='ui-pg-div ui-inline-cancel'><span class='ui-icon ui-icon-cancel' " + d + "></span></div></div>"
    };
    c.unformat = function(a, b, d, e) {
        var h,
        g = b.colModel.formatter,
        f = b.colModel.formatoptions || {},
        i = /([\.\*\_\'\(\)\{\}\+\?\\])/g;
        unformatFunc = b.colModel.unformat || c.fn.fmatter[g] && c.fn.fmatter[g].unformat;
        if (typeof unformatFunc !== 
        "undefined" && isFunction(unformatFunc)) h = unformatFunc(c(a).text(), b, a);
        else if (typeof g !== "undefined" && isString(g)) {
            h = c.jgrid.formatter || {};
            switch (g) {
            case "integer":
                f = c.extend({},
                h.integer, f);
                b = f.thousandsSeparator.replace(i, "\\$1");
                b = new RegExp(b, "g");
                h = c(a).text().replace(b, "");
                break;
            case "number":
                f = c.extend({},
                h.number, f);
                b = f.thousandsSeparator.replace(i, "\\$1");
                b = new RegExp(b, "g");
                h = c(a).text().replace(b, "").replace(f.decimalSeparator, ".");
                break;
            case "currency":
                f = c.extend({},
                h.currency, f);
                b = f.thousandsSeparator.replace(i, 
                "\\$1");
                b = new RegExp(b, "g");
                h = c(a).text().replace(b, "").replace(f.decimalSeparator, ".").replace(f.prefix, "").replace(f.suffix, "");
                break;
            case "checkbox":
                f = b.colModel.editoptions ? b.colModel.editoptions.value.split(":") : ["Yes", "No"];
                h = c("input", a).attr("checked") ? f[0] : f[1];
                break;
            case "select":
                h = c.unformat.select(a, b, d, e);
                break;
            case "actions":
                return "";
            default:
                h = c(a).text()
            }
        }
        return h ? h: e === true ? c(a).text() : c.jgrid.htmlDecode(c(a).html())
    };
    c.unformat.select = function(a, b, d, e) {
        d = [];
        a = c(a).text();
        if (e == true) return a;
        b = c.extend({},
        b.colModel.editoptions);
        if (b.value) {
            var h = b.value;
            b = b.multiple === true ? true: false;
            e = [];
            var g;
            if (b) {
                e = a.split(",");
                e = c.map(e, 
                function(j) {
                    return c.trim(j)
                })
            }
            if (isString(h)) for (var f = h.split(";"), i = 0, k = 0; k < f.length; k++) {
                g = f[k].split(":");
                if (b) {
                    if (jQuery.inArray(g[1], e) > -1) {
                        d[i] = g[0];
                        i++
                    }
                } else if (c.trim(g[1]) == c.trim(a)) {
                    d[0] = g[0];
                    break
                }
            } else if (isObject(h)) {
                b || (e[0] = a);
                d = jQuery.map(e, 
                function(j) {
                    var l;
                    c.each(h, 
                    function(o, n) {
                        if (n == j) {
                            l = o;
                            return false
                        }
                    });
                    if (l) return l
                })
            }
            return d.join(", ")
        } else return a || 
        ""
    };
    isValue = function(a) {
        return isObject(a) || isString(a) || isNumber(a) || isBoolean(a)
    };
    isBoolean = function(a) {
        return typeof a === "boolean"
    };
    isNull = function(a) {
        return a === null
    };
    isNumber = function(a) {
        return typeof a === "number" && isFinite(a)
    };
    isString = function(a) {
        return typeof a === "string"
    };
    isEmpty = function(a) {
        if (!isString(a) && isValue(a)) return false;
        else if (!isValue(a)) return true;
        a = c.trim(a).replace(/\&nbsp\;/ig, "").replace(/\&#160\;/ig, "");
        return a === ""
    };
    isUndefined = function(a) {
        return typeof a === "undefined"
    };
    isObject = function(a) {
        return a && (typeof a === "object" || isFunction(a)) || false
    };
    isFunction = function(a) {
        return typeof a === "function"
    }
})(jQuery);
 (function(a) {
    a.jgrid.extend({
        getColProp: function(d) {
            var o = {},
            b = this[0];
            if (b.grid) {
                b = b.p.colModel;
                for (var l = 0; l < b.length; l++) if (b[l].name == d) {
                    o = b[l];
                    break
                }
                return o
            }
        },
        setColProp: function(d, o) {
            return this.each(function() {
                if (this.grid) if (o) for (var b = this.p.colModel, l = 0; l < b.length; l++) if (b[l].name == d) {
                    a.extend(this.p.colModel[l], o);
                    break
                }
            })
        },
        sortGrid: function(d, o, b) {
            return this.each(function() {
                var l = this,
                s = -1;
                if (l.grid) {
                    if (!d) d = l.p.sortname;
                    for (var p = 0; p < l.p.colModel.length; p++) if (l.p.colModel[p].index == 
                    d || l.p.colModel[p].name == d) {
                        s = p;
                        break
                    }
                    if (s != -1) {
                        p = l.p.colModel[s].sortable;
                        if (typeof p !== "boolean") p = true;
                        if (typeof o !== "boolean") o = false;
                        p && l.sortData("jqgh_" + d, s, o, b)
                    }
                }
            })
        },
        GridDestroy: function() {
            return this.each(function() {
                if (this.grid) {
                    this.p.pager && a(this.p.pager).remove();
                    var d = this.id;
                    try {
                        a("#gbox_" + d).remove()
                    } catch(o) {}
                }
            })
        },
        GridUnload: function() {
            return this.each(function() {
                if (this.grid) {
                    var d = {
                        id: a(this).attr("id"),
                        cl: a(this).attr("class")
                    };
                    this.p.pager && a(this.p.pager).empty().removeClass("ui-state-default ui-jqgrid-pager corner-bottom");
                    var o = document.createElement("table");
                    a(o).attr({
                        id: d.id
                    });
                    o.className = d.cl;
                    d = this.id;
                    a(o).removeClass("ui-jqgrid-btable");
                    if (a(this.p.pager).parents("#gbox_" + d).length === 1) {
                        a(o).insertBefore("#gbox_" + d).show();
                        a(this.p.pager).insertBefore("#gbox_" + d)
                    } else a(o).insertBefore("#gbox_" + d).show();
                    a("#gbox_" + d).remove()
                }
            })
        },
        setGridState: function(d) {
            return this.each(function() {
                if (this.grid) {
                    $t = this;
                    if (d == "hidden") {
                        a(".ui-jqgrid-bdiv, .ui-jqgrid-hdiv", "#gview_" + $t.p.id).slideUp("fast");
                        $t.p.pager && a($t.p.pager).slideUp("fast");
                        if ($t.p.toolbar[0] === true) {
                            $t.p.toolbar[1] == "both" && a($t.grid.ubDiv).slideUp("fast");
                            a($t.grid.uDiv).slideUp("fast")
                        }
                        $t.p.footerrow && a(".ui-jqgrid-sdiv", "#gbox_" + $s.p.id).slideUp("fast");
                        a(".ui-jqgrid-titlebar-close span", $t.grid.cDiv).removeClass("ui-icon-circle-triangle-n").addClass("ui-icon-circle-triangle-s");
                        $t.p.gridstate = "hidden"
                    } else if (d == "visible") {
                        a(".ui-jqgrid-hdiv, .ui-jqgrid-bdiv", "#gview_" + $t.p.id).slideDown("fast");
                        $t.p.pager && a($t.p.pager).slideDown("fast");
                        if ($t.p.toolbar[0] === true) {
                            $t.p.toolbar[1] == 
                            "both" && a($t.grid.ubDiv).slideDown("fast");
                            a($t.grid.uDiv).slideDown("fast")
                        }
                        $t.p.footerrow && a(".ui-jqgrid-sdiv", "#gbox_" + $t.p.id).slideDown("fast");
                        a(".ui-jqgrid-titlebar-close span", $t.grid.cDiv).removeClass("ui-icon-circle-triangle-s").addClass("ui-icon-circle-triangle-n");
                        $t.p.gridstate = "visible"
                    }
                }
            })
        },
        updateGridRows: function(d, o, b) {
            var l,
            s = false;
            this.each(function() {
                var p = this,
                f,
                k,
                m,
                e;
                if (!p.grid) return false;
                o || (o = "id");
                d && d.length > 0 && a(d).each(function() {
                    m = this;
                    if (k = p.rows.namedItem(m[o])) {
                        e = 
                        m[o];
                        if (b === true) if (p.p.jsonReader.repeatitems === true) {
                            if (p.p.jsonReader.cell) m = m[p.p.jsonReader.cell];
                            for (var c = 0; c < m.length; c++) {
                                f = p.formatter(e, m[c], c, m, "edit");
                                p.p.treeGrid === true && l == p.p.ExpandColumn ? a("td:eq(" + c + ") > span:first", k).html(f).attr("title", a.jgrid.stripHtml(f)) : a("td:eq(" + c + ")", k).html(f).attr("title", a.jgrid.stripHtml(f))
                            }
                            return s = true
                        }
                        a(p.p.colModel).each(function(g) {
                            l = b === true ? this.jsonmap || this.name: this.name;
                            if (m[l] != undefined) {
                                f = p.formatter(e, m[l], g, m, "edit");
                                p.p.treeGrid === 
                                true && l == p.p.ExpandColumn ? a("td:eq(" + g + ") > span:first", k).html(f).attr("title", a.jgrid.stripHtml(f)) : a("td:eq(" + g + ")", k).html(f).attr("title", a.jgrid.stripHtml(f));
                                s = true
                            }
                        })
                    }
                })
            });
            return s
        },
        filterGrid: function(d, o) {
            o = a.extend({
                gridModel: false,
                gridNames: false,
                gridToolbar: false,
                filterModel: [],
                formtype: "horizontal",
                autosearch: true,
                formclass: "filterform",
                tableclass: "filtertable",
                buttonclass: "filterbutton",
                searchButton: "Search",
                clearButton: "Clear",
                enableSearch: false,
                enableClear: false,
                beforeSearch: null,
                afterSearch: null,
                beforeClear: null,
                afterClear: null,
                url: "",
                marksearched: true
            },
            o || {});
            return this.each(function() {
                var b = this;
                this.p = o;
                if (this.p.filterModel.length == 0 && this.p.gridModel === false) alert("No filter is set");
                else if (d) {
                    this.p.gridid = d.indexOf("#") != -1 ? d: "#" + d;
                    var l = a(this.p.gridid).jqGrid("getGridParam", "colModel");
                    if (l) {
                        if (this.p.gridModel === true) {
                            var s = a(this.p.gridid)[0],
                            p;
                            a.each(l, 
                            function(c) {
                                var g = [];
                                this.search = this.search === false ? false: true;
                                p = this.editrules && this.editrules.searchhidden === 
                                true ? true: this.hidden === true ? false: true;
                                if (this.search === true && p === true) {
                                    g.label = b.p.gridNames === true ? s.p.colNames[c] : "";
                                    g.name = this.name;
                                    g.index = this.index || this.name;
                                    g.stype = this.edittype || "text";
                                    if (g.stype != "select") g.stype = "text";
                                    g.defval = this.defval || "";
                                    g.surl = this.surl || "";
                                    g.sopt = this.editoptions || {};
                                    g.width = this.width;
                                    b.p.filterModel.push(g)
                                }
                            })
                        } else a.each(b.p.filterModel, 
                        function() {
                            for (var c = 0; c < l.length; c++) if (this.name == l[c].name) {
                                this.index = l[c].index || this.name;
                                break
                            }
                            if (!this.index) this.index = 
                            this.name
                        });
                        var f = function() {
                            var c = {},
                            g = 0,
                            n,
                            h = a(b.p.gridid)[0],
                            j;
                            h.p.searchdata = {};
                            a.isFunction(b.p.beforeSearch) && b.p.beforeSearch();
                            a.each(b.p.filterModel, 
                            function() {
                                j = this.index;
                                switch (this.stype) {
                                case "select":
                                    if (n = a("select[name=" + j + "]", b).val()) {
                                        c[j] = n;
                                        b.p.marksearched && a("#jqgh_" + this.name, h.grid.hDiv).addClass("dirty-cell");
                                        g++
                                    } else {
                                        b.p.marksearched && a("#jqgh_" + this.name, h.grid.hDiv).removeClass("dirty-cell");
                                        try {
                                            delete h.p.postData[this.index]
                                        } catch(r) {}
                                    }
                                    break;
                                default:
                                    if (n = a("input[name=" + 
                                    j + "]", b).val()) {
                                        c[j] = n;
                                        b.p.marksearched && a("#jqgh_" + this.name, h.grid.hDiv).addClass("dirty-cell");
                                        g++
                                    } else {
                                        b.p.marksearched && a("#jqgh_" + this.name, h.grid.hDiv).removeClass("dirty-cell");
                                        try {
                                            delete h.p.postData[this.index]
                                        } catch(u) {}
                                    }
                                }
                            });
                            var q = g > 0 ? true: false;
                            a.extend(h.p.postData, c);
                            var i;
                            if (b.p.url) {
                                i = a(h).jqGrid("getGridParam", "url");
                                a(h).jqGrid("setGridParam", {
                                    url: b.p.url
                                })
                            }
                            a(h).jqGrid("setGridParam", {
                                search: q
                            }).trigger("reloadGrid", [{
                                page: 1
                            }]);
                            i && a(h).jqGrid("setGridParam", {
                                url: i
                            });
                            a.isFunction(b.p.afterSearch) && 
                            b.p.afterSearch()
                        },
                        k = function() {
                            var c = {},
                            g,
                            n = 0,
                            h = a(b.p.gridid)[0],
                            j;
                            a.isFunction(b.p.beforeClear) && b.p.beforeClear();
                            a.each(b.p.filterModel, 
                            function() {
                                j = this.index;
                                g = this.defval ? this.defval: "";
                                if (!this.stype) this.stype = "text";
                                switch (this.stype) {
                                case "select":
                                    var r;
                                    a("select[name=" + j + "] option", b).each(function(v) {
                                        if (v == 0) this.selected = true;
                                        if (a(this).text() == g) {
                                            this.selected = true;
                                            r = a(this).val();
                                            return false
                                        }
                                    });
                                    if (r) {
                                        c[j] = r;
                                        b.p.marksearched && a("#jqgh_" + this.name, h.grid.hDiv).addClass("dirty-cell");
                                        n++
                                    } else {
                                        b.p.marksearched && a("#jqgh_" + this.name, h.grid.hDiv).removeClass("dirty-cell");
                                        try {
                                            delete h.p.postData[this.index]
                                        } catch(u) {}
                                    }
                                    break;
                                case "text":
                                    a("input[name=" + j + "]", b).val(g);
                                    if (g) {
                                        c[j] = g;
                                        b.p.marksearched && a("#jqgh_" + this.name, h.grid.hDiv).addClass("dirty-cell");
                                        n++
                                    } else {
                                        b.p.marksearched && a("#jqgh_" + this.name, h.grid.hDiv).removeClass("dirty-cell");
                                        try {
                                            delete h.p.postData[this.index]
                                        } catch(t) {}
                                    }
                                    break
                                }
                            });
                            var q = n > 0 ? true: false;
                            a.extend(h.p.postData, c);
                            var i;
                            if (b.p.url) {
                                i = a(h).jqGrid("getGridParam", 
                                "url");
                                a(h).jqGrid("setGridParam", {
                                    url: b.p.url
                                })
                            }
                            a(h).jqGrid("setGridParam", {
                                search: q
                            }).trigger("reloadGrid", [{
                                page: 1
                            }]);
                            i && a(h).jqGrid("setGridParam", {
                                url: i
                            });
                            a.isFunction(b.p.afterClear) && b.p.afterClear()
                        },
                        m = a("<form name='SearchForm' style=display:inline;' class='" + this.p.formclass + "'></form>"),
                        e = a("<table class='" + this.p.tableclass + "' cellspacing='0' cellpading='0' border='0'><tbody></tbody></table>");
                        a(m).append(e); (function() {
                            var c = document.createElement("tr"),
                            g,
                            n,
                            h,
                            j;
                            b.p.formtype == "horizontal" && 
                            a(e).append(c);
                            a.each(b.p.filterModel, 
                            function(q) {
                                h = document.createElement("td");
                                a(h).append("<label for='" + this.name + "'>" + this.label + "</label>");
                                j = document.createElement("td");
                                var i = this;
                                if (!this.stype) this.stype = "text";
                                switch (this.stype) {
                                case "select":
                                    if (this.surl) a(j).load(this.surl, 
                                    function() {
                                        i.defval && a("select", this).val(i.defval);
                                        a("select", this).attr({
                                            name: i.index || i.name,
                                            id: "sg_" + i.name
                                        });
                                        i.sopt && a("select", this).attr(i.sopt);
                                        b.p.gridToolbar === true && i.width && a("select", this).width(i.width);
                                        b.p.autosearch === true && a("select", this).change(function() {
                                            f();
                                            return false
                                        })
                                    });
                                    else if (i.sopt.value) {
                                        var r = i.sopt.value,
                                        u = document.createElement("select");
                                        a(u).attr({
                                            name: i.index || i.name,
                                            id: "sg_" + i.name
                                        }).attr(i.sopt);
                                        if (typeof r === "string") {
                                            q = r.split(";");
                                            for (var t, v = 0; v < q.length; v++) {
                                                r = q[v].split(":");
                                                t = document.createElement("option");
                                                t.value = r[0];
                                                t.innerHTML = r[1];
                                                if (r[1] == i.defval) t.selected = "selected";
                                                u.appendChild(t)
                                            }
                                        } else if (typeof r === "object") for (v in r) {
                                            q++;
                                            t = document.createElement("option");
                                            t.value = v;
                                            t.innerHTML = r[v];
                                            if (r[v] == i.defval) t.selected = "selected";
                                            u.appendChild(t)
                                        }
                                        b.p.gridToolbar === true && i.width && a(u).width(i.width);
                                        a(j).append(u);
                                        b.p.autosearch === true && a(u).change(function() {
                                            f();
                                            return false
                                        })
                                    }
                                    break;
                                case "text":
                                    u = this.defval ? this.defval: "";
                                    a(j).append("<input type='text' name='" + (this.index || this.name) + "' id='sg_" + this.name + "' value='" + u + "'/>");
                                    i.sopt && a("input", j).attr(i.sopt);
                                    if (b.p.gridToolbar === true && i.width) a.browser.msie ? a("input", j).width(i.width - 4) : a("input", j).width(i.width - 
                                    2);
                                    b.p.autosearch === true && a("input", j).keypress(function(w) {
                                        if ((w.charCode ? w.charCode: w.keyCode ? w.keyCode: 0) == 13) {
                                            f();
                                            return false
                                        }
                                        return this
                                    });
                                    break
                                }
                                if (b.p.formtype == "horizontal") {
                                    b.p.gridToolbar === true && b.p.gridNames === false ? a(c).append(j) : a(c).append(h).append(j);
                                    a(c).append(j)
                                } else {
                                    g = document.createElement("tr");
                                    a(g).append(h).append(j);
                                    a(e).append(g)
                                }
                            });
                            j = document.createElement("td");
                            if (b.p.enableSearch === true) {
                                n = "<input type='button' id='sButton' class='" + b.p.buttonclass + "' value='" + b.p.searchButton + 
                                "'/>";
                                a(j).append(n);
                                a("input#sButton", j).click(function() {
                                    f();
                                    return false
                                })
                            }
                            if (b.p.enableClear === true) {
                                n = "<input type='button' id='cButton' class='" + b.p.buttonclass + "' value='" + b.p.clearButton + "'/>";
                                a(j).append(n);
                                a("input#cButton", j).click(function() {
                                    k();
                                    return false
                                })
                            }
                            if (b.p.enableClear === true || b.p.enableSearch === true) if (b.p.formtype == "horizontal") a(c).append(j);
                            else {
                                g = document.createElement("tr");
                                a(g).append("<td>&#160;</td>").append(j);
                                a(e).append(g)
                            }
                        })();
                        a(this).append(m);
                        this.triggerSearch = 
                        f;
                        this.clearSearch = k
                    } else alert("Could not get grid colModel")
                } else alert("No target grid is set!")
            })
        },
        filterToolbar: function(d) {
            d = a.extend({
                autosearch: true,
                searchOnEnter: true,
                beforeSearch: null,
                afterSearch: null,
                beforeClear: null,
                afterClear: null,
                searchurl: "",
                stringResult: false,
                groupOp: "AND"
            },
            d || {});
            return this.each(function() {
                function o(f, k) {
                    var m = a(f);
                    m[0] != null && jQuery.each(k, 
                    function() {
                        this.data != null ? m.bind(this.type, this.data, this.fn) : m.bind(this.type, this.fn)
                    })
                }
                var b = this,
                l = function() {
                    var f = {},
                    k = 0,
                    m,
                    e,
                    c = {};
                    a.each(b.p.colModel, 
                    function() {
                        e = this.index || this.name;
                        var i = this.searchoptions && this.searchoptions.sopt ? this.searchoptions.sopt[0] : "bw";
                        switch (this.stype) {
                        case "select":
                            if (m = a("select[name=" + e + "]", b.grid.hDiv).val()) {
                                f[e] = m;
                                c[e] = i;
                                k++
                            } else try {
                                delete b.p.postData[e]
                            } catch(r) {}
                            break;
                        case "text":
                            if (m = a("input[name=" + e + "]", b.grid.hDiv).val()) {
                                f[e] = m;
                                c[e] = i;
                                k++
                            } else try {
                                delete b.p.postData[e]
                            } catch(u) {}
                            break
                        }
                    });
                    var g = k > 0 ? true: false;
                    if (d.stringResult) {
                        var n = '{"groupOp":"' + d.groupOp + '","rules":[',
                        h = 0;
                        a.each(f, 
                        function(i, r) {
                            if (h > 0) n += ",";
                            n += '{"field":"' + i + '",';
                            n += '"op":"' + c[i] + '",';
                            n += '"data":"' + r + '"}';
                            h++
                        });
                        n += "]}";
                        a.extend(b.p.postData, {
                            filters: n
                        })
                    } else a.extend(b.p.postData, f);
                    var j;
                    if (b.p.searchurl) {
                        j = b.p.url;
                        a(b).jqGrid("setGridParam", {
                            url: b.p.searchurl
                        })
                    }
                    var q = false;
                    if (a.isFunction(d.beforeSearch)) q = d.beforeSearch.call(b);
                    q || a(b).jqGrid("setGridParam", {
                        search: g
                    }).trigger("reloadGrid", [{
                        page: 1
                    }]);
                    j && a(b).jqGrid("setGridParam", {
                        url: j
                    });
                    a.isFunction(d.afterSearch) && d.afterSearch()
                },
                s = a("<tr class='ui-search-toolbar' role='rowheader'></tr>"),
                p;
                a.each(b.p.colModel, 
                function() {
                    var f = this,
                    k,
                    m,
                    e,
                    c;
                    m = a("<th role='columnheader' class='ui-state-default ui-th-column ui-th-" + b.p.direction + "'></th>");
                    k = a("<div style='width:100%;position:relative;height:100%;padding-right:0.3em;'></div>");
                    this.hidden === true && a(m).css("display", "none");
                    this.search = this.search === false ? false: true;
                    if (typeof this.stype == "undefined") this.stype = "text";
                    e = a.extend({},
                    this.searchoptions || {});
                    if (this.search) switch (this.stype) {
                    case "select":
                        if (c = this.surl || e.dataUrl) a.ajax(a.extend({
                            url: c,
                            dataType: "html",
                            complete: function(q) {
                                if (e.buildSelect != null)(q = e.buildSelect(q)) && a(k).append(q);
                                else a(k).append(q.responseText);
                                e.defaultValue && a("select", k).val(e.defaultValue);
                                a("select", k).attr({
                                    name: f.index || f.name,
                                    id: "gs_" + f.name
                                });
                                e.attr && a("select", k).attr(e.attr);
                                a("select", k).css({
                                    width: "100%"
                                });
                                e.dataInit != null && e.dataInit(a("select", k)[0]);
                                e.dataEvents != null && o(a("select", k)[0], e.dataEvents);
                                d.autosearch === true && a("select", k).change(function() {
                                    l();
                                    return false
                                });
                                q = null
                            }
                        },
                        a.jgrid.ajaxOptions, 
                        b.p.ajaxSelectOptions || {}));
                        else {
                            var g;
                            if (f.searchoptions && f.searchoptions.value) g = f.searchoptions.value;
                            else if (f.editoptions && f.editoptions.value) g = f.editoptions.value;
                            if (g) {
                                c = document.createElement("select");
                                c.style.width = "100%";
                                a(c).attr({
                                    name: f.index || f.name,
                                    id: "gs_" + f.name
                                });
                                if (typeof g === "string") {
                                    g = g.split(";");
                                    for (var n, h, j = 0; j < g.length; j++) {
                                        n = g[j].split(":");
                                        h = document.createElement("option");
                                        h.value = n[0];
                                        h.innerHTML = n[1];
                                        c.appendChild(h)
                                    }
                                } else if (typeof g === "object") for (n in g) {
                                    h = document.createElement("option");
                                    h.value = n;
                                    h.innerHTML = g[n];
                                    c.appendChild(h)
                                }
                                e.defaultValue && a(c).val(e.defaultValue);
                                e.attr && a(c).attr(e.attr);
                                e.dataInit != null && e.dataInit(c);
                                e.dataEvents != null && o(c, e.dataEvents);
                                a(k).append(c);
                                d.autosearch === true && a(c).change(function() {
                                    l();
                                    return false
                                })
                            }
                        }
                        break;
                    case "text":
                        c = e.defaultValue ? e.defaultValue: "";
                        a(k).append("<input type='text' style='width:95%;padding:0px;' name='" + (f.index || f.name) + "' id='gs_" + f.name + "' value='" + c + "'/>");
                        e.attr && a("input", k).attr(e.attr);
                        e.dataInit != null && e.dataInit(a("input", 
                        k)[0]);
                        e.dataEvents != null && o(a("input", k)[0], e.dataEvents);
                        if (d.autosearch === true) d.searchOnEnter ? a("input", k).keypress(function(q) {
                            if ((q.charCode ? q.charCode: q.keyCode ? q.keyCode: 0) == 13) {
                                l();
                                return false
                            }
                            return this
                        }) : a("input", k).keydown(function(q) {
                            switch (q.which) {
                            case 9:
                            case 16:
                            case 37:
                            case 38:
                            case 39:
                            case 40:
                            case 27:
                                break;
                            default:
                                p && clearTimeout(p);
                                p = setTimeout(function() {
                                    l()
                                },
                                500)
                            }
                        });
                        break
                    }
                    a(m).append(k);
                    a(s).append(m)
                });
                a("table thead", b.grid.hDiv).append(s);
                this.triggerToolbar = l;
                this.clearToolbar = 
                function(f) {
                    var k = {},
                    m,
                    e = 0,
                    c;
                    f = typeof f != "boolean" ? true: f;
                    a.each(b.p.colModel, 
                    function() {
                        m = this.searchoptions && this.searchoptions.defaultValue ? this.searchoptions.defaultValue: "";
                        c = this.index || this.name;
                        switch (this.stype) {
                        case "select":
                            var i;
                            a("select[name=" + c + "] option", b.grid.hDiv).each(function(t) {
                                if (t == 0) this.selected = true;
                                if (a(this).text() == m) {
                                    this.selected = true;
                                    i = a(this).val();
                                    return false
                                }
                            });
                            if (i) {
                                k[c] = i;
                                e++
                            } else try {
                                delete b.p.postData[c]
                            } catch(r) {}
                            break;
                        case "text":
                            a("input[name=" + c + "]", b.grid.hDiv).val(m);
                            if (m) {
                                k[c] = m;
                                e++
                            } else try {
                                delete b.p.postData[c]
                            } catch(u) {}
                            break
                        }
                    });
                    var g = e > 0 ? true: false;
                    if (d.stringResult) {
                        var n = '{"groupOp":"' + d.groupOp + '","rules":[',
                        h = 0;
                        a.each(k, 
                        function(i, r) {
                            if (h > 0) n += ",";
                            n += '{"field":"' + i + '",';
                            n += '"op":"eq",';
                            n += '"data":"' + r + '"}';
                            h++
                        });
                        n += "]}";
                        a.extend(b.p.postData, {
                            filters: n
                        })
                    } else a.extend(b.p.postData, k);
                    var j;
                    if (b.p.searchurl) {
                        j = b.p.url;
                        a(b).jqGrid("setGridParam", {
                            url: b.p.searchurl
                        })
                    }
                    var q = false;
                    if (a.isFunction(d.beforeClear)) q = d.beforeClear.call(b);
                    q || f && a(b).jqGrid("setGridParam", 
                    {
                        search: g
                    }).trigger("reloadGrid", [{
                        page: 1
                    }]);
                    j && a(b).jqGrid("setGridParam", {
                        url: j
                    });
                    a.isFunction(d.afterClear) && d.afterClear()
                };
                this.toggleToolbar = function() {
                    var f = a("tr.ui-search-toolbar", b.grid.hDiv);
                    f.css("display") == "none" ? f.show() : f.hide()
                }
            })
        }
    })
})(jQuery);
var showModal = function(a) {
    a.w.show()
},
closeModal = function(a) {
    a.w.hide().attr("aria-hidden", "true");
    a.o && a.o.remove()
},
createModal = function(a, b, c, e, f, h) {
    var d = document.createElement("div"),
    g;
    g = jQuery(c.gbox).attr("dir") == "rtl" ? true: false;
    d.className = "ui-widget ui-widget-content ui-corner-all ui-jqdialog";
    d.id = a.themodal;
    var i = document.createElement("div");
    i.className = "ui-jqdialog-titlebar ui-widget-header ui-corner-all ui-helper-clearfix";
    i.id = a.modalhead;
    jQuery(i).append("<span class='ui-jqdialog-title'>" + 
    c.caption + "</span>");
    var j = jQuery("<a href='javascript:void(0)' class='ui-jqdialog-titlebar-close ui-corner-all'></a>").hover(function() {
        j.addClass("ui-state-hover")
    },
    function() {
        j.removeClass("ui-state-hover")
    }).append("<span class='ui-icon ui-icon-closethick'></span>");
    jQuery(i).append(j);
    if (g) {
        d.dir = "rtl";
        jQuery(".ui-jqdialog-title", i).css("float", "right");
        jQuery(".ui-jqdialog-titlebar-close", i).css("left", "0.3em")
    } else {
        d.dir = "ltr";
        jQuery(".ui-jqdialog-title", i).css("float", "left");
        jQuery(".ui-jqdialog-titlebar-close", 
        i).css("right", "0.3em")
    }
    var l = document.createElement("div");
    jQuery(l).addClass("ui-jqdialog-content ui-widget-content").attr("id", a.modalcontent);
    jQuery(l).append(b);
    d.appendChild(l);
    jQuery(d).prepend(i);
    h === true ? jQuery("body").append(d) : jQuery(d).insertBefore(e);
    if (typeof c.jqModal === "undefined") c.jqModal = true;
    b = {};
    if (jQuery.fn.jqm && c.jqModal === true) {
        if (c.left == 0 && c.top == 0) {
            e = [];
            e = findPos(f);
            c.left = e[0] + 4;
            c.top = e[1] + 4
        }
        b.top = c.top + "px";
        b.left = c.left
    } else if (c.left != 0 || c.top != 0) {
        b.left = c.left;
        b.top = 
        c.top + "px"
    }
    jQuery("a.ui-jqdialog-titlebar-close", i).click(function() {
        var n = jQuery("#" + a.themodal).data("onClose") || c.onClose,
        k = jQuery("#" + a.themodal).data("gbox") || c.gbox;
        hideModal("#" + a.themodal, {
            gb: k,
            jqm: c.jqModal,
            onClose: n
        });
        return false
    });
    if (c.width == 0 || !c.width) c.width = 300;
    if (c.height == 0 || !c.height) c.height = 200;
    if (!c.zIndex) c.zIndex = 950;
    f = 0;
    if (g && b.left && !h) {
        f = jQuery(c.gbox).width() - (!isNaN(c.width) ? parseInt(c.width) : 0) - 8;
        b.left = parseInt(b.left) + parseInt(f)
    }
    if (b.left) b.left += "px";
    jQuery(d).css(jQuery.extend({
        width: isNaN(c.width) ? 
        "auto": c.width + "px",
        height: isNaN(c.height) ? "auto": c.height + "px",
        zIndex: c.zIndex,
        overflow: "hidden"
    },
    b)).attr({
        tabIndex: "-1",
        role: "dialog",
        "aria-labelledby": a.modalhead,
        "aria-hidden": "true"
    });
    if (typeof c.drag == "undefined") c.drag = true;
    if (typeof c.resize == "undefined") c.resize = true;
    if (c.drag) {
        jQuery(i).css("cursor", "move");
        if (jQuery.fn.jqDrag) jQuery(d).jqDrag(i);
        else try {
            jQuery(d).draggable({
                handle: jQuery("#" + i.id)
            })
        } catch(q) {}
    }
    if (c.resize) if (jQuery.fn.jqResize) {
        jQuery(d).append("<div class='jqResize ui-resizable-handle ui-resizable-se ui-icon ui-icon-gripsmall-diagonal-se ui-icon-grip-diagonal-se'></div>");
        jQuery("#" + a.themodal).jqResize(".jqResize", a.scrollelm ? "#" + a.scrollelm: false)
    } else try {
        jQuery(d).resizable({
            handles: "se, sw",
            alsoResize: a.scrollelm ? "#" + a.scrollelm: false
        })
    } catch(o) {}
    c.closeOnEscape === true && jQuery(d).keydown(function(n) {
        if (n.which == 27) {
            n = jQuery("#" + a.themodal).data("onClose") || c.onClose;
            hideModal(this, {
                gb: c.gbox,
                jqm: c.jqModal,
                onClose: n
            })
        }
    })
},
viewModal = function(a, b) {
    b = jQuery.extend({
        toTop: true,
        overlay: 10,
        modal: false,
        onShow: showModal,
        onHide: closeModal,
        gbox: "",
        jqm: true,
        jqM: true
    },
    b || 
    {});
    if (jQuery.fn.jqm && b.jqm == true) b.jqM ? jQuery(a).attr("aria-hidden", "false").jqm(b).jqmShow() : jQuery(a).attr("aria-hidden", "false").jqmShow();
    else {
        if (b.gbox != "") {
            jQuery(".jqgrid-overlay:first", b.gbox).show();
            jQuery(a).data("gbox", b.gbox)
        }
        jQuery(a).show().attr("aria-hidden", "false");
        try {
            jQuery(":input:visible", a)[0].focus()
        } catch(c) {}
    }
},
hideModal = function(a, b) {
    b = jQuery.extend({
        jqm: true,
        gb: ""
    },
    b || {});
    if (b.onClose) {
        var c = b.onClose(a);
        if (typeof c == "boolean" && !c) return
    }
    if (jQuery.fn.jqm && b.jqm === true) jQuery(a).attr("aria-hidden", 
    "true").jqmHide();
    else {
        if (b.gb != "") try {
            jQuery(".jqgrid-overlay:first", b.gb).hide()
        } catch(e) {}
        jQuery(a).hide().attr("aria-hidden", "true")
    }
};
function info_dialog(a, b, c, e) {
    var f = {
        width: 290,
        height: "auto",
        dataheight: "auto",
        drag: true,
        resize: false,
        caption: "<b>" + a + "</b>",
        left: 250,
        top: 170,
        zIndex: 1E3,
        jqModal: true,
        modal: false,
        closeOnEscape: true,
        align: "center",
        buttonalign: "center",
        buttons: []
    };
    jQuery.extend(f, e || {});
    var h = f.jqModal;
    if (jQuery.fn.jqm && !h) h = false;
    a = "";
    if (f.buttons.length > 0) for (e = 0; e < f.buttons.length; e++) {
        if (typeof f.buttons[e].id == "undefined") f.buttons[e].id = "info_button_" + e;
        a += "<a href='javascript:void(0)' id='" + f.buttons[e].id + "' class='fm-button ui-state-default ui-corner-all'>" + 
        f.buttons[e].text + "</a>"
    }
    e = isNaN(f.dataheight) ? f.dataheight: f.dataheight + "px";
    var d = "<div id='info_id'>";
    d += "<div id='infocnt' style='margin:0px;padding-bottom:1em;width:100%;overflow:auto;position:relative;height:" + e + ";" + ("text-align:" + f.align + ";") + "'>" + b + "</div>";
    d += c ? "<div class='ui-widget-content ui-helper-clearfix' style='text-align:" + f.buttonalign + ";padding-bottom:0.8em;padding-top:0.5em;background-image: none;border-width: 1px 0 0 0;'><a href='javascript:void(0)' id='closedialog' class='fm-button ui-state-default ui-corner-all'>" + 
    c + "</a>" + a + "</div>": "";
    d += "</div>";
    try {
        jQuery("#info_dialog").attr("aria-hidden") == "false" && hideModal("#info_dialog", {
            jqm: h
        });
        jQuery("#info_dialog").remove()
    } catch(g) {}
    createModal({
        themodal: "info_dialog",
        modalhead: "info_head",
        modalcontent: "info_content",
        scrollelm: "infocnt"
    },
    d, f, "", "", true);
    a && jQuery.each(f.buttons, 
    function(j) {
        jQuery("#" + this.id, "#info_id").bind("click", 
        function() {
            f.buttons[j].onClick.call(jQuery("#info_dialog"));
            return false
        })
    });
    jQuery("#closedialog", "#info_id").click(function(j) {
        hideModal("#info_dialog", 
        {
            jqm: h
        });
        return false
    });
    jQuery(".fm-button", "#info_dialog").hover(function() {
        jQuery(this).addClass("ui-state-hover")
    },
    function() {
        jQuery(this).removeClass("ui-state-hover")
    });
    viewModal("#info_dialog", {
        onHide: function(j) {
            j.w.hide().remove();
            j.o && j.o.remove()
        },
        modal: f.modal,
        jqm: h
    });
    try {
        $("#info_dialog").focus()
    } catch(i) {}
}
function findPos(a) {
    var b = curtop = 0;
    if (a.offsetParent) {
        do {
            b += a.offsetLeft;
            curtop += a.offsetTop
        }
        while (a = a.offsetParent)
    }
    return [b, curtop]
}
function isArray(a) {
    return a.constructor.toString().indexOf("Array") == -1 ? false: true
}
function createEl(a, b, c, e, f) {
    function h(k, m) {
        if (jQuery.isFunction(m.dataInit)) {
            k.id = m.id;
            m.dataInit(k);
            delete m.id;
            delete m.dataInit
        }
        if (m.dataEvents) {
            jQuery.each(m.dataEvents, 
            function() {
                this.data != null ? jQuery(k).bind(this.type, this.data, this.fn) : jQuery(k).bind(this.type, this.fn)
            });
            delete m.dataEvents
        }
        return m
    }
    var d = "";
    b.defaultValue && delete b.defaultValue;
    switch (a) {
    case "textarea":
        d = document.createElement("textarea");
        if (e) b.cols || jQuery(d).css({
            width: "98%"
        });
        else if (!b.cols) b.cols = 20;
        if (!b.rows) b.rows = 
        2;
        if (c == "&nbsp;" || c == "&#160;" || c.length == 1 && c.charCodeAt(0) == 160) c = "";
        d.value = c;
        b = h(d, b);
        jQuery(d).attr(b);
        break;
    case "checkbox":
        d = document.createElement("input");
        d.type = "checkbox";
        if (b.value) {
            var g = b.value.split(":");
            if (c === g[0]) {
                d.checked = true;
                d.defaultChecked = true
            }
            d.value = g[0];
            jQuery(d).attr("offval", g[1]);
            try {
                delete b.value
            } catch(i) {}
        } else {
            g = c.toLowerCase();
            if (g.search(/(false|0|no|off|undefined)/i) < 0 && g !== "") {
                d.checked = true;
                d.defaultChecked = true;
                d.value = c
            } else d.value = "on";
            jQuery(d).attr("offval", 
            "off")
        }
        b = h(d, b);
        jQuery(d).attr(b);
        break;
    case "select":
        d = document.createElement("select");
        var j,
        l = [];
        if (b.multiple === true) {
            j = true;
            d.multiple = "multiple"
        } else j = false;
        if (b.dataUrl != null) jQuery.ajax(jQuery.extend({
            url: b.dataUrl,
            type: "GET",
            complete: function(k, m) {
                try {
                    delete b.dataUrl;
                    delete b.value
                } catch(r) {}
                if (b.buildSelect != null) {
                    k = b.buildSelect(k);
                    k = jQuery(k).html();
                    delete b.buildSelect
                } else k = jQuery(k.responseText).html();
                if (k) {
                    jQuery(d).append(k);
                    b = h(d, b);
                    if (typeof b.size === "undefined") b.size = j ? 3: 
                    1;
                    if (j) {
                        l = c.split(",");
                        l = jQuery.map(l, 
                        function(p) {
                            return jQuery.trim(p)
                        })
                    } else l[0] = c;
                    jQuery(d).attr(b);
                    setTimeout(function() {
                        jQuery("option", d).each(function(p) {
                            if (p == 0) this.selected = "";
                            if (jQuery.inArray(jQuery(this).text(), l) > -1 || jQuery.inArray(jQuery(this).val(), l) > -1) {
                                this.selected = "selected";
                                if (!j) return false
                            }
                        })
                    },
                    0)
                }
            }
        },
        f || {}));
        else if (b.value) {
            if (j) {
                l = c.split(",");
                l = jQuery.map(l, 
                function(k) {
                    return jQuery.trim(k)
                });
                if (typeof b.size === "undefined") b.size = 3
            } else b.size = 1;
            if (typeof b.value === "function") b.value = 
            b.value();
            if (typeof b.value === "string") {
                e = b.value.split(";");
                for (g = 0; g < e.length; g++) {
                    f = e[g].split(":");
                    if (f.length > 2) f[1] = jQuery.map(f, 
                    function(k, m) {
                        if (m > 0) return k
                    }).join(":");
                    a = document.createElement("option");
                    a.value = f[0];
                    a.innerHTML = f[1];
                    if (!j && (f[0] == c || f[1] == c)) a.selected = "selected";
                    if (j && (jQuery.inArray(f[1], l) > -1 || jQuery.inArray(f[0], l) > -1)) a.selected = "selected";
                    d.appendChild(a)
                }
            } else if (typeof b.value === "object") {
                e = b.value;
                for (g in e) {
                    a = document.createElement("option");
                    a.value = g;
                    a.innerHTML = 
                    e[g];
                    if (!j && (g == c || e[g] == c)) a.selected = "selected";
                    if (j && (jQuery.inArray(e[g], l) > -1 || jQuery.inArray(g, l) > -1)) a.selected = "selected";
                    d.appendChild(a)
                }
            }
            b = h(d, b);
            try {
                delete b.value
            } catch(q) {}
            jQuery(d).attr(b)
        }
        break;
    case "text":
    case "password":
    case "button":
        d = document.createElement("input");
        d.type = a;
        d.value = c;
        b = h(d, b);
        if (a != "button") if (e) b.size || jQuery(d).css({
            width: "98%"
        });
        else if (!b.size) b.size = 20;
        jQuery(d).attr(b);
        break;
    case "image":
    case "file":
        d = document.createElement("input");
        d.type = a;
        b = h(d, b);
        jQuery(d).attr(b);
        break;
    case "custom":
        d = document.createElement("span");
        try {
            if (jQuery.isFunction(b.custom_element)) {
                var o = b.custom_element.call(this, c, b);
                if (o) {
                    o = jQuery(o).addClass("customelement").attr({
                        id: b.id,
                        name: b.name
                    });
                    jQuery(d).empty().append(o)
                } else throw "e2";
            } else throw "e1";
        } catch(n) {
            n == "e1" && info_dialog(jQuery.jgrid.errors.errcap, "function 'custom_element' " + jQuery.jgrid.edit.msg.nodefined, jQuery.jgrid.edit.bClose);
            n == "e2" ? info_dialog(jQuery.jgrid.errors.errcap, "function 'custom_element' " + jQuery.jgrid.edit.msg.novalue, 
            jQuery.jgrid.edit.bClose) : info_dialog(jQuery.jgrid.errors.errcap, n.message, jQuery.jgrid.edit.bClose)
        }
        break
    }
    return d
}
function checkValues(a, b, c) {
    var e,
    f,
    h;
    if (typeof b == "string") {
        f = 0;
        for (len = c.p.colModel.length; f < len; f++) if (c.p.colModel[f].name == b) {
            e = c.p.colModel[f].editrules;
            b = f;
            try {
                h = c.p.colModel[f].formoptions.label
            } catch(d) {}
            break
        }
    } else if (b >= 0) e = c.p.colModel[b].editrules;
    if (e) {
        h || (h = c.p.colNames[b]);
        if (e.required === true) if (a.match(/^s+$/) || a == "") return [false, h + ": " + jQuery.jgrid.edit.msg.required, ""];
        f = e.required === false ? false: true;
        if (e.number === true) if (! (f === false && isEmpty(a))) if (isNaN(a)) return [false, h + ": " + 
        jQuery.jgrid.edit.msg.number, ""];
        if (typeof e.minValue != "undefined" && !isNaN(e.minValue)) if (parseFloat(a) < parseFloat(e.minValue)) return [false, h + ": " + jQuery.jgrid.edit.msg.minValue + " " + e.minValue, ""];
        if (typeof e.maxValue != "undefined" && !isNaN(e.maxValue)) if (parseFloat(a) > parseFloat(e.maxValue)) return [false, h + ": " + jQuery.jgrid.edit.msg.maxValue + " " + e.maxValue, ""];
        var g;
        if (e.email === true) if (! (f === false && isEmpty(a))) {
            g = /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i;
            if (!g.test(a)) return [false, h + ": " + jQuery.jgrid.edit.msg.email, ""]
        }
        if (e.integer === true) if (! (f === false && isEmpty(a))) {
            if (isNaN(a)) return [false, h + ": " + jQuery.jgrid.edit.msg.integer, ""];
            if (a % 1 != 0 || a.indexOf(".") != -1) return [false, h + ": " + jQuery.jgrid.edit.msg.integer, ""]
        }
        if (e.date === true) if (! (f === false && isEmpty(a))) {
            b = c.p.colModel[b].datefmt || "Y-m-d";
            if (!checkDate(b, a)) return [false, h + ": " + jQuery.jgrid.edit.msg.date + " - " + b, ""]
        }
        if (e.time === true) if (! (f === false && isEmpty(a))) if (!checkTime(a)) return [false, h + 
        ": " + jQuery.jgrid.edit.msg.date + " - hh:mm (am/pm)", ""];
        if (e.url === true) if (! (f === false && isEmpty(a))) {
            g = /^(((https?)|(ftp)):\/\/([\-\w]+\.)+\w{2,3}(\/[%\-\w]+(\.\w{2,})?)*(([\w\-\.\?\\\/+@&#;`~=%!]*)(\.\w{2,})?)*\/?)/i;
            if (!g.test(a)) return [false, h + ": " + jQuery.jgrid.edit.msg.url, ""]
        }
        if (e.custom === true) if (! (f === false && isEmpty(a))) if (jQuery.isFunction(e.custom_func)) {
            a = e.custom_func.call(c, a, h);
            return jQuery.isArray(a) ? a: [false, jQuery.jgrid.edit.msg.customarray, ""]
        } else return [false, jQuery.jgrid.edit.msg.customfcheck, 
        ""]
    }
    return [true, "", ""]
}
function checkDate(a, b) {
    var c = {},
    e;
    a = a.toLowerCase();
    e = a.indexOf("/") != -1 ? "/": a.indexOf("-") != -1 ? "-": a.indexOf(".") != -1 ? ".": "/";
    a = a.split(e);
    b = b.split(e);
    if (b.length != 3) return false;
    e = -1;
    for (var f, h = -1, d = -1, g = 0; g < a.length; g++) {
        f = isNaN(b[g]) ? 0: parseInt(b[g], 10);
        c[a[g]] = f;
        f = a[g];
        if (f.indexOf("y") != -1) e = g;
        if (f.indexOf("m") != -1) d = g;
        if (f.indexOf("d") != -1) h = g
    }
    f = a[e] == "y" || a[e] == "yyyy" ? 4: a[e] == "yy" ? 2: -1;
    g = DaysArray(12);
    var i;
    if (e === -1) return false;
    else {
        i = c[a[e]].toString();
        if (f == 2 && i.length == 1) f = 1;
        if (i.length != 
        f || c[a[e]] == 0 && b[e] != "00") return false
    }
    if (d === -1) return false;
    else {
        i = c[a[d]].toString();
        if (i.length < 1 || c[a[d]] < 1 || c[a[d]] > 12) return false
    }
    if (h === -1) return false;
    else {
        i = c[a[h]].toString();
        if (i.length < 1 || c[a[h]] < 1 || c[a[h]] > 31 || c[a[d]] == 2 && c[a[h]] > daysInFebruary(c[a[e]]) || c[a[h]] > g[c[a[d]]]) return false
    }
    return true
}
function daysInFebruary(a) {
    return a % 4 == 0 && (a % 100 != 0 || a % 400 == 0) ? 29: 28
}
function DaysArray(a) {
    for (var b = 1; b <= a; b++) {
        this[b] = 31;
        if (b == 4 || b == 6 || b == 9 || b == 11) this[b] = 30;
        if (b == 2) this[b] = 29
    }
    return this
}
function isEmpty(a) {
    return a.match(/^s+$/) || a == "" ? true: false
}
function checkTime(a) {
    var b = /^(\d{1,2}):(\d{2})([ap]m)?$/;
    if (!isEmpty(a)) if (a = a.match(b)) {
        if (a[3]) {
            if (a[1] < 1 || a[1] > 12) return false
        } else if (a[1] > 23) return false;
        if (a[2] > 59) return false
    } else return false;
    return true
};
 (function(a) {
    var d = null;
    a.jgrid.extend({
        searchGrid: function(h) {
            h = a.extend({
                recreateFilter: false,
                drag: true,
                sField: "searchField",
                sValue: "searchString",
                sOper: "searchOper",
                sFilter: "filters",
                beforeShowSearch: null,
                afterShowSearch: null,
                onInitializeSearch: null,
                closeAfterSearch: false,
                closeOnEscape: false,
                multipleSearch: false,
                sopt: null,
                onClose: null
            },
            a.jgrid.search, h || {});
            return this.each(function() {
                function b(r) {
                    var v = r !== undefined,
                    B = a("#" + w.p.id),
                    I = {};
                    if (h.multipleSearch === false) {
                        I[h.sField] = r.rules[0].field;
                        I[h.sValue] = r.rules[0].data;
                        I[h.sOper] = r.rules[0].op
                    } else I[h.sFilter] = r;
                    B[0].p.search = v;
                    a.extend(B[0].p.postData, I);
                    B.trigger("reloadGrid", [{
                        page: 1
                    }]);
                    h.closeAfterSearch && x(a("#" + q))
                }
                function o(r) {
                    r = r !== undefined;
                    var v = a("#" + w.p.id),
                    B = [];
                    v[0].p.search = r;
                    if (h.multipleSearch === false) B[h.sField] = B[h.sValue] = B[h.sOper] = "";
                    else B[h.sFilter] = "";
                    a.extend(v[0].p.postData, B);
                    v.trigger("reloadGrid", [{
                        page: 1
                    }])
                }
                function x(r) {
                    if (h.onClose) {
                        var v = h.onClose(r);
                        if (typeof v == "boolean" && !v) return
                    }
                    r.hide();
                    a(".jqgrid-overlay:first", 
                    "#gbox_" + w.p.id).hide()
                }
                function s() {
                    var r = a(".ui-searchFilter").length;
                    if (r > 1) {
                        var v = a("#" + q).css("zIndex");
                        a("#" + q).css({
                            zIndex: parseInt(v) + r
                        })
                    }
                    a("#" + q).show();
                    a(".jqgrid-overlay:first", "#gbox_" + w.p.id).show();
                    try {
                        a(":input:visible", "#" + q)[0].focus()
                    } catch(B) {}
                }
                var w = this;
                if (w.grid) if (a.fn.searchFilter) {
                    var q = "fbox_" + w.p.id;
                    h.recreateFilter === true && a("#" + q).remove();
                    if (a("#" + q).html() != null) {
                        a.isFunction(h.beforeShowSearch) && h.beforeShowSearch(a("#" + q));
                        s();
                        a.isFunction(h.afterShowSearch) && h.afterShowSearch(a("#" + 
                        q))
                    } else {
                        var n = [],
                        m = a("#" + w.p.id).jqGrid("getGridParam", "colNames"),
                        F = a("#" + w.p.id).jqGrid("getGridParam", "colModel"),
                        f = ["eq", "ne", "lt", "le", "gt", "ge", "bw", "bn", "in", "ni", "ew", "en", "cn", "nc"],
                        e,
                        j,
                        i,
                        k;
                        k = jQuery.fn.searchFilter.defaults.operators;
                        if (h.sopt != null) {
                            k = [];
                            for (e = i = 0; e < h.sopt.length; e++) if ((j = a.inArray(h.sopt[e], f)) != -1) {
                                k[i] = {
                                    op: h.sopt[e],
                                    text: h.odata[j]
                                };
                                i++
                            }
                        }
                        var u;
                        a.each(F, 
                        function(r, v) {
                            u = typeof v.search === "undefined" ? true: v.search;
                            hidden = v.hidden === true;
                            soptions = a.extend({},
                            {
                                text: m[r],
                                itemval: v.index || v.name
                            },
                            this.searchoptions);
                            ignoreHiding = soptions.searchhidden === true;
                            if (typeof soptions.sopt == "undefined") soptions.sopt = h.sopt || f;
                            i = 0;
                            soptions.ops = [];
                            if (soptions.sopt.length > 0) for (e = 0; e < soptions.sopt.length; e++) if ((j = a.inArray(soptions.sopt[e], f)) != -1) {
                                soptions.ops[i] = {
                                    op: soptions.sopt[e],
                                    text: h.odata[j]
                                };
                                i++
                            }
                            if (typeof this.stype === "undefined") this.stype = "text";
                            if (this.stype == "select") if (soptions.dataUrl == null) {
                                var B;
                                if (soptions.value) B = soptions.value;
                                else if (this.editoptions) B = 
                                this.editoptions.value;
                                if (B) {
                                    soptions.dataValues = [];
                                    if (typeof B === "string") {
                                        r = B.split(";");
                                        for (e = 0; e < r.length; e++) {
                                            v = r[e].split(":");
                                            soptions.dataValues[e] = {
                                                value: v[0],
                                                text: v[1]
                                            }
                                        }
                                    } else if (typeof B === "object") {
                                        e = 0;
                                        for (var I in B) {
                                            soptions.dataValues[e] = {
                                                value: I,
                                                text: B[I]
                                            };
                                            e++
                                        }
                                    }
                                }
                            }
                            if (ignoreHiding && u || u && !hidden) n.push(soptions)
                        });
                        if (n.length > 0) {
                            a("<div id='" + q + "' role='dialog' tabindex='-1'></div>").insertBefore("#gview_" + w.p.id);
                            a("#" + q).searchFilter(n, {
                                groupOps: h.groupOps,
                                operators: k,
                                onClose: x,
                                resetText: h.Reset,
                                searchText: h.Find,
                                windowTitle: h.caption,
                                rulesText: h.rulesText,
                                matchText: h.matchText,
                                onSearch: b,
                                onReset: o,
                                stringResult: h.multipleSearch,
                                ajaxSelectOptions: a.extend({},
                                a.jgrid.ajaxOptions, w.p.ajaxSelectOptions || {})
                            });
                            a(".ui-widget-overlay", "#" + q).remove();
                            w.p.direction == "rtl" && a(".ui-closer", "#" + q).css("float", "left");
                            if (h.drag === true) {
                                a("#" + q + " table thead tr:first td:first").css("cursor", "move");
                                if (jQuery.fn.jqDrag) a("#" + q).jqDrag(a("#" + q + " table thead tr:first td:first"));
                                else try {
                                    a("#" + q).draggable({
                                        handle: a("#" + 
                                        q + " table thead tr:first td:first")
                                    })
                                } catch(P) {}
                            }
                            if (h.multipleSearch === false) {
                                a(".ui-del, .ui-add, .ui-del, .ui-add-last, .matchText, .rulesText", "#" + q).hide();
                                a("select[name='groupOp']", "#" + q).hide()
                            }
                            a.isFunction(h.onInitializeSearch) && h.onInitializeSearch(a("#" + q));
                            a.isFunction(h.beforeShowSearch) && h.beforeShowSearch(a("#" + q));
                            s();
                            a.isFunction(h.afterShowSearch) && h.afterShowSearch(a("#" + q));
                            h.closeOnEscape === true && a("#" + q).keydown(function(r) {
                                r.which == 27 && x(a("#" + q))
                            })
                        }
                    }
                }
            })
        },
        editGridRow: function(h, 
        b) {
            d = b = a.extend({
                top: 0,
                left: 0,
                width: 300,
                height: "auto",
                dataheight: "auto",
                modal: false,
                drag: true,
                resize: true,
                url: null,
                mtype: "POST",
                clearAfterAdd: true,
                closeAfterEdit: false,
                reloadAfterSubmit: true,
                onInitializeForm: null,
                beforeInitData: null,
                beforeShowForm: null,
                afterShowForm: null,
                beforeSubmit: null,
                afterSubmit: null,
                onclickSubmit: null,
                afterComplete: null,
                onclickPgButtons: null,
                afterclickPgButtons: null,
                editData: {},
                recreateForm: false,
                jqModal: true,
                closeOnEscape: false,
                addedrow: "first",
                topinfo: "",
                bottominfo: "",
                saveicon: [],
                closeicon: [],
                savekey: [false, 13],
                navkeys: [false, 38, 40],
                checkOnSubmit: false,
                checkOnUpdate: false,
                _savedData: {},
                processing: false,
                onClose: null,
                ajaxEditOptions: {},
                serializeEditData: null,
                viewPagerButtons: true
            },
            a.jgrid.edit, b || {});
            return this.each(function() {
                function o(g, l) {
                    g == 0 ? a("#pData", "#" + i + "_2").addClass("ui-state-disabled") : a("#pData", "#" + i + "_2").removeClass("ui-state-disabled");
                    g == l ? a("#nData", "#" + i + "_2").addClass("ui-state-disabled") : a("#nData", "#" + i + "_2").removeClass("ui-state-disabled")
                }
                function x() {
                    var g = 
                    a(f).jqGrid("getDataIDs"),
                    l = a("#id_g", "#" + i).val();
                    return [a.inArray(l, g), g]
                }
                function s() {
                    var g = true;
                    a("#FormError", "#" + i).hide();
                    if (d.checkOnUpdate) {
                        c = {};
                        t = {};
                        w();
                        J = a.extend({},
                        c, t);
                        if (S = F(J, d._savedData)) {
                            a("#" + j).data("disabled", true);
                            a(".confirm", "#" + k.themodal).show();
                            g = false
                        }
                    }
                    return g
                }
                function w() {
                    a(".FormElement", "#" + i).each(function() {
                        var g = a(".customelement", this);
                        if (g.length) {
                            var l = g[0].name;
                            a.each(f.p.colModel, 
                            function() {
                                if (this.name == l && this.editoptions && a.isFunction(this.editoptions.custom_value)) {
                                    try {
                                        c[l] = 
                                        this.editoptions.custom_value(a("#" + l, "#" + i), "get");
                                        if (c[l] === undefined) throw "e1";
                                    } catch(p) {
                                        p == "e1" ? info_dialog(jQuery.jgrid.errors.errcap, "function 'custom_value' " + a.jgrid.edit.msg.novalue, jQuery.jgrid.edit.bClose) : info_dialog(jQuery.jgrid.errors.errcap, p.message, jQuery.jgrid.edit.bClose)
                                    }
                                    return true
                                }
                            })
                        } else {
                            switch (a(this).get(0).type) {
                            case "checkbox":
                                if (a(this).attr("checked")) c[this.name] = a(this).val();
                                else {
                                    g = a(this).attr("offval");
                                    c[this.name] = g
                                }
                                break;
                            case "select-one":
                                c[this.name] = a("option:selected", 
                                this).val();
                                t[this.name] = a("option:selected", this).text();
                                break;
                            case "select-multiple":
                                c[this.name] = a(this).val();
                                c[this.name] = c[this.name] ? c[this.name].join(",") : "";
                                var C = [];
                                a("option:selected", this).each(function(p, E) {
                                    C[p] = a(E).text()
                                });
                                t[this.name] = C.join(",");
                                break;
                            case "password":
                            case "text":
                            case "textarea":
                            case "button":
                                c[this.name] = a(this).val();
                                break
                            }
                            if (f.p.autoencode) c[this.name] = a.jgrid.htmlEncode(c[this.name])
                        }
                    });
                    return true
                }
                function q(g, l, C, p) {
                    for (var E, z, A, K = 0, y, L, G, Q = [], H = false, X, R, 
                    ba = "", W = 1; W <= p; W++) ba += "<td class='CaptionTD ui-widget-content'>&#160;</td><td class='DataTD ui-widget-content' style='white-space:pre'>&#160;</td>";
                    if (g != "_empty") H = a(l).jqGrid("getInd", g);
                    a(l.p.colModel).each(function(Y) {
                        E = this.name;
                        L = (z = this.editrules && this.editrules.edithidden == true ? false: this.hidden === true ? true: false) ? "style='display:none'": "";
                        if (E !== "cb" && E !== "subgrid" && this.editable === true && E !== "rn") {
                            if (H === false) y = "";
                            else if (E == l.p.ExpandColumn && l.p.treeGrid === true) y = a("td:eq(" + Y + ")", l.rows[H]).text();
                            else try {
                                y = a.unformat(a("td:eq(" + Y + ")", l.rows[H]), {
                                    rowId: g,
                                    colModel: this
                                },
                                Y)
                            } catch(da) {
                                y = a("td:eq(" + Y + ")", l.rows[H]).html()
                            }
                            var U = a.extend({},
                            this.editoptions || {},
                            {
                                id: E,
                                name: E
                            });
                            frmopt = a.extend({},
                            {
                                elmprefix: "",
                                elmsuffix: "",
                                rowabove: false,
                                rowcontent: ""
                            },
                            this.formoptions || {});
                            X = parseInt(frmopt.rowpos) || K + 1;
                            R = parseInt((parseInt(frmopt.colpos) || 1) * 2);
                            if (g == "_empty" && U.defaultValue) y = a.isFunction(U.defaultValue) ? U.defaultValue() : U.defaultValue;
                            if (!this.edittype) this.edittype = "text";
                            if (f.p.autoencode) y = 
                            a.jgrid.htmlDecode(y);
                            G = createEl(this.edittype, U, y, false, a.extend({},
                            a.jgrid.ajaxOptions, l.p.ajaxSelectOptions || {}));
                            if (y == "" && this.edittype == "checkbox") y = a(G).attr("offval");
                            if (d.checkOnSubmit || d.checkOnUpdate) d._savedData[E] = y;
                            a(G).addClass("FormElement");
                            A = a(C).find("tr[rowpos=" + X + "]");
                            if (frmopt.rowabove) {
                                U = a("<tr><td class='contentinfo' colspan='" + p * 2 + "'>" + frmopt.rowcontent + "</td></tr>");
                                a(C).append(U);
                                U[0].rp = X
                            }
                            if (A.length == 0) {
                                A = a("<tr " + L + " rowpos='" + X + "'></tr>").addClass("FormData").attr("id", 
                                "tr_" + E);
                                a(A).append(ba);
                                a(C).append(A);
                                A[0].rp = X
                            }
                            a("td:eq(" + (R - 2) + ")", A[0]).html(typeof frmopt.label === "undefined" ? l.p.colNames[Y] : frmopt.label);
                            a("td:eq(" + (R - 1) + ")", A[0]).append(frmopt.elmprefix).append(G).append(frmopt.elmsuffix);
                            Q[K] = Y;
                            K++
                        }
                    });
                    if (K > 0) {
                        W = a("<tr class='FormData' style='display:none'><td class='CaptionTD'></td><td colspan='" + (p * 2 - 1) + "' class='DataTD'><input class='FormElement' id='id_g' type='text' name='" + l.p.id + "_id' value='" + g + "'/></td></tr>");
                        W[0].rp = K + 999;
                        a(C).append(W);
                        if (d.checkOnSubmit || 
                        d.checkOnUpdate) d._savedData.id = g
                    }
                    return Q
                }
                function n(g, l, C) {
                    var p,
                    E = 0,
                    z,
                    A,
                    K,
                    y,
                    L;
                    if (d.checkOnSubmit || d.checkOnUpdate) {
                        d._savedData = {};
                        d._savedData.id = g
                    }
                    var G = l.p.colModel;
                    if (g == "_empty") {
                        a(G).each(function() {
                            p = this.name;
                            K = a.extend({},
                            this.editoptions || {});
                            A = a("#" + a.jgrid.jqID(p), "#" + C);
                            if (A[0] != null) {
                                y = "";
                                if (K.defaultValue) {
                                    y = a.isFunction(K.defaultValue) ? K.defaultValue() : K.defaultValue;
                                    if (A[0].type == "checkbox") {
                                        L = y.toLowerCase();
                                        if (L.search(/(false|0|no|off|undefined)/i) < 0 && L !== "") {
                                            A[0].checked = true;
                                            A[0].defaultChecked = true;
                                            A[0].value = y
                                        } else A.attr({
                                            checked: "",
                                            defaultChecked: ""
                                        })
                                    } else A.val(y)
                                } else if (A[0].type == "checkbox") {
                                    A[0].checked = false;
                                    A[0].defaultChecked = false;
                                    y = a(A).attr("offval")
                                } else if (A[0].type.substr(0, 6) == "select") A[0].selectedIndex = 0;
                                else A.val(y);
                                if (d.checkOnSubmit === true || d.checkOnUpdate) d._savedData[p] = y
                            }
                        });
                        a("#id_g", "#" + C).val(g)
                    } else {
                        var Q = a(l).jqGrid("getInd", g, true);
                        if (Q) {
                            a("td", Q).each(function(H) {
                                p = G[H].name;
                                if (p !== "cb" && p !== "subgrid" && p !== "rn" && G[H].editable === true) {
                                    if (p == 
                                    l.p.ExpandColumn && l.p.treeGrid === true) z = a(this).text();
                                    else try {
                                        z = a.unformat(this, {
                                            rowId: g,
                                            colModel: G[H]
                                        },
                                        H)
                                    } catch(X) {
                                        z = a(this).html()
                                    }
                                    if (f.p.autoencode) z = a.jgrid.htmlDecode(z);
                                    if (d.checkOnSubmit === true || d.checkOnUpdate) d._savedData[p] = z;
                                    p = a.jgrid.jqID(p);
                                    switch (G[H].edittype) {
                                    case "password":
                                    case "text":
                                    case "button":
                                    case "image":
                                        a("#" + p, "#" + C).val(z);
                                        break;
                                    case "textarea":
                                        if (z == "&nbsp;" || z == "&#160;" || z.length == 1 && z.charCodeAt(0) == 160) z = "";
                                        a("#" + p, "#" + C).val(z);
                                        break;
                                    case "select":
                                        var R = z.split(",");
                                        R = a.map(R, 
                                        function(W) {
                                            return a.trim(W)
                                        });
                                        a("#" + p + " option", "#" + C).each(function() {
                                            this.selected = !G[H].editoptions.multiple && (R[0] == a(this).text() || R[0] == a(this).val()) ? true: G[H].editoptions.multiple ? a.inArray(a(this).text(), R) > -1 || a.inArray(a(this).val(), R) > -1 ? true: false: false
                                        });
                                        break;
                                    case "checkbox":
                                        z += "";
                                        z = z.toLowerCase();
                                        if (z.search(/(false|0|no|off|undefined)/i) < 0 && z !== "") {
                                            a("#" + p, "#" + C).attr("checked", true);
                                            a("#" + p, "#" + C).attr("defaultChecked", true)
                                        } else {
                                            a("#" + p, "#" + C).attr("checked", false);
                                            a("#" + p, "#" + C).attr("defaultChecked", "")
                                        }
                                        break;
                                    case "custom":
                                        try {
                                            if (G[H].editoptions && a.isFunction(G[H].editoptions.custom_value)) G[H].editoptions.custom_value(a("#" + p, "#" + C), "set", z);
                                            else throw "e1";
                                        } catch(ba) {
                                            ba == "e1" ? info_dialog(jQuery.jgrid.errors.errcap, "function 'custom_value' " + a.jgrid.edit.msg.nodefined, jQuery.jgrid.edit.bClose) : info_dialog(jQuery.jgrid.errors.errcap, ba.message, jQuery.jgrid.edit.bClose)
                                        }
                                        break
                                    }
                                    E++
                                }
                            });
                            E > 0 && a("#id_g", "#" + i).val(g)
                        }
                    }
                }
                function m() {
                    var g,
                    l = [true, "", ""],
                    C = {},
                    p = f.p.prmNames,
                    E,
                    z;
                    if (a.isFunction(d.beforeCheckValues)) {
                        var A = d.beforeCheckValues(c, a("#" + j), c[f.p.id + "_id"] == "_empty" ? p.addoper: p.editoper);
                        if (A && typeof A === "object") c = A
                    }
                    for (var K in c) {
                        l = checkValues(c[K], K, f);
                        if (l[0] == false) break
                    }
                    if (l[0]) {
                        if (a.isFunction(d.onclickSubmit)) C = d.onclickSubmit(d, c) || {};
                        if (a.isFunction(d.beforeSubmit)) l = d.beforeSubmit(c, a("#" + j))
                    }
                    Z = d.url ? d.url: a(f).jqGrid("getGridParam", "editurl");
                    if (l[0]) if (!Z) {
                        l[0] = false;
                        l[1] += " " + a.jgrid.errors.nourl
                    }
                    if (l[0] === false) {
                        a("#FormError>td", "#" + i).html(l[1]);
                        a("#FormError", "#" + i).show()
                    } else if (!d.processing) {
                        d.processing = true;
                        a("#sData", "#" + i + "_2").addClass("ui-state-active");
                        z = p.oper;
                        E = p.id;
                        c[z] = a.trim(c[f.p.id + "_id"]) == "_empty" ? p.addoper: p.editoper;
                        if (c[z] != p.addoper) c[E] = c[f.p.id + "_id"];
                        else if (c[E] === undefined) c[E] = c[f.p.id + "_id"];
                        delete c[f.p.id + "_id"];
                        c = a.extend(c, d.editData, C);
                        a.ajax(a.extend({
                            url: Z,
                            type: d.mtype,
                            data: a.isFunction(d.serializeEditData) ? d.serializeEditData(c) : c,
                            complete: function(y, L) {
                                if (L != "success") {
                                    l[0] = false;
                                    l[1] = a.isFunction(d.errorTextFormat) ? 
                                    d.errorTextFormat(y) : L + " Status: '" + y.statusText + "'. Error code: " + y.status
                                } else if (a.isFunction(d.afterSubmit)) l = d.afterSubmit(y, c);
                                if (l[0] === false) {
                                    a("#FormError>td", "#" + i).html(l[1]);
                                    a("#FormError", "#" + i).show()
                                } else {
                                    a.each(f.p.colModel, 
                                    function() {
                                        if (t[this.name] && this.formatter && this.formatter == "select") try {
                                            delete t[this.name]
                                        } catch(Q) {}
                                    });
                                    c = a.extend(c, t);
                                    f.p.autoencode && a.each(c, 
                                    function(Q, H) {
                                        c[Q] = a.jgrid.htmlDecode(H)
                                    });
                                    if (c[z] == p.addoper) {
                                        l[2] || (l[2] = parseInt(f.p.records) + 1);
                                        c[E] = l[2];
                                        if (d.closeAfterAdd) {
                                            if (d.reloadAfterSubmit) a(f).trigger("reloadGrid");
                                            else {
                                                a(f).jqGrid("addRowData", l[2], c, b.addedrow);
                                                a(f).jqGrid("setSelection", l[2])
                                            }
                                            hideModal("#" + k.themodal, {
                                                gb: "#gbox_" + e,
                                                jqm: b.jqModal,
                                                onClose: d.onClose
                                            })
                                        } else if (d.clearAfterAdd) {
                                            d.reloadAfterSubmit ? a(f).trigger("reloadGrid") : a(f).jqGrid("addRowData", l[2], c, b.addedrow);
                                            n("_empty", f, j)
                                        } else d.reloadAfterSubmit ? a(f).trigger("reloadGrid") : a(f).jqGrid("addRowData", l[2], c, b.addedrow)
                                    } else {
                                        if (d.reloadAfterSubmit) {
                                            a(f).trigger("reloadGrid");
                                            d.closeAfterEdit || setTimeout(function() {
                                                a(f).jqGrid("setSelection", 
                                                c[E])
                                            },
                                            1E3)
                                        } else f.p.treeGrid === true ? a(f).jqGrid("setTreeRow", c[E], c) : a(f).jqGrid("setRowData", c[E], c);
                                        d.closeAfterEdit && hideModal("#" + k.themodal, {
                                            gb: "#gbox_" + e,
                                            jqm: b.jqModal,
                                            onClose: d.onClose
                                        })
                                    }
                                    if (a.isFunction(d.afterComplete)) {
                                        g = y;
                                        setTimeout(function() {
                                            d.afterComplete(g, c, a("#" + j));
                                            g = null
                                        },
                                        500)
                                    }
                                }
                                d.processing = false;
                                if (d.checkOnSubmit || d.checkOnUpdate) {
                                    a("#" + j).data("disabled", false);
                                    if (d._savedData.id != "_empty") d._savedData = c
                                }
                                a("#sData", "#" + i + "_2").removeClass("ui-state-active");
                                try {
                                    a(":input:visible", 
                                    "#" + j)[0].focus()
                                } catch(G) {}
                            },
                            error: function(y, L, G) {
                                a("#FormError>td", "#" + i).html(L + " : " + G);
                                a("#FormError", "#" + i).show();
                                d.processing = false;
                                a("#" + j).data("disabled", false);
                                a("#sData", "#" + i + "_2").removeClass("ui-state-active")
                            }
                        },
                        a.jgrid.ajaxOptions, d.ajaxEditOptions))
                    }
                }
                function F(g, l) {
                    var C = false,
                    p;
                    for (p in g) if (g[p] != l[p]) {
                        C = true;
                        break
                    }
                    return C
                }
                var f = this;
                if (f.grid && h) {
                    var e = f.p.id,
                    j = "FrmGrid_" + e,
                    i = "TblGrid_" + e,
                    k = {
                        themodal: "editmod" + e,
                        modalhead: "edithd" + e,
                        modalcontent: "editcnt" + e,
                        scrollelm: j
                    },
                    u = 
                    a.isFunction(d.beforeShowForm) ? d.beforeShowForm: false,
                    P = a.isFunction(d.afterShowForm) ? d.afterShowForm: false,
                    r = a.isFunction(d.beforeInitData) ? d.beforeInitData: false,
                    v = a.isFunction(d.onInitializeForm) ? d.onInitializeForm: false,
                    B = 1,
                    I = 0,
                    Z,
                    c,
                    t,
                    J,
                    S;
                    if (h == "new") {
                        h = "_empty";
                        b.caption = b.addCaption
                    } else b.caption = b.editCaption;
                    b.recreateForm === true && a("#" + k.themodal).html() != null && a("#" + k.themodal).remove();
                    var M = true;
                    if (b.checkOnUpdate && b.jqModal && !b.modal) M = false;
                    if (a("#" + k.themodal).html() != null) {
                        a(".ui-jqdialog-title", 
                        "#" + k.modalhead).html(b.caption);
                        a("#FormError", "#" + i).hide();
                        if (d.topinfo) {
                            a(".topinfo", "#" + i + "_2").html(d.topinfo);
                            a(".tinfo", "#" + i + "_2").show()
                        } else a(".tinfo", "#" + i + "_2").hide();
                        if (d.bottominfo) {
                            a(".bottominfo", "#" + i + "_2").html(d.bottominfo);
                            a(".binfo", "#" + i + "_2").show()
                        } else a(".binfo", "#" + i + "_2").hide();
                        r && r(a("#" + j));
                        n(h, f, j);
                        h == "_empty" || !d.viewPagerButtons ? a("#pData, #nData", "#" + i + "_2").hide() : a("#pData, #nData", "#" + i + "_2").show();
                        if (d.processing === true) {
                            d.processing = false;
                            a("#sData", "#" + 
                            i + "_2").removeClass("ui-state-active")
                        }
                        if (a("#" + j).data("disabled") === true) {
                            a(".confirm", "#" + k.themodal).hide();
                            a("#" + j).data("disabled", false)
                        }
                        u && u(a("#" + j));
                        a("#" + k.themodal).data("onClose", d.onClose);
                        viewModal("#" + k.themodal, {
                            gbox: "#gbox_" + e,
                            jqm: b.jqModal,
                            jqM: false,
                            closeoverlay: M,
                            modal: b.modal
                        });
                        M || a(".jqmOverlay").click(function() {
                            if (!s()) return false;
                            hideModal("#" + k.themodal, {
                                gb: "#gbox_" + e,
                                jqm: b.jqModal,
                                onClose: d.onClose
                            });
                            return false
                        });
                        P && P(a("#" + j))
                    } else {
                        a(f.p.colModel).each(function() {
                            var g = 
                            this.formoptions;
                            B = Math.max(B, g ? g.colpos || 0: 0);
                            I = Math.max(I, g ? g.rowpos || 0: 0)
                        });
                        var N = isNaN(b.dataheight) ? b.dataheight: b.dataheight + "px",
                        D;
                        N = a("<form name='FormPost' id='" + j + "' class='FormGrid' style='width:100%;overflow:auto;position:relative;height:" + N + ";'></form>").data("disabled", false);
                        var O = a("<table id='" + i + "' class='EditTable' cellspacing='0' cellpading='0' border='0'><tbody></tbody></table>");
                        a(N).append(O);
                        D = a("<tr id='FormError' style='display:none'><td class='ui-state-error' colspan='" + 
                        B * 2 + "'></td></tr>");
                        D[0].rp = 0;
                        a(O).append(D);
                        D = a("<tr style='display:none' class='tinfo'><td class='topinfo' colspan='" + B * 2 + "'>" + d.topinfo + "</td></tr>");
                        D[0].rp = 0;
                        a(O).append(D);
                        r && r(a("#" + j));
                        D = (r = f.p.direction == "rtl" ? true: false) ? "nData": "pData";
                        var T = r ? "pData": "nData";
                        q(h, f, O, B);
                        D = "<a href='javascript:void(0)' id='" + D + "' class='fm-button ui-state-default ui-corner-left'><span class='ui-icon ui-icon-triangle-1-w'></span></div>";
                        T = "<a href='javascript:void(0)' id='" + T + "' class='fm-button ui-state-default ui-corner-right'><span class='ui-icon ui-icon-triangle-1-e'></span></div>";
                        var $ = "<a href='javascript:void(0)' id='sData' class='fm-button ui-state-default ui-corner-all'>" + b.bSubmit + "</a>",
                        aa = "<a href='javascript:void(0)' id='cData' class='fm-button ui-state-default ui-corner-all'>" + b.bCancel + "</a>";
                        D = "<table border='0' class='EditTable' id='" + i + "_2'><tbody><tr id='Act_Buttons'><td class='navButton ui-widget-content'>" + (r ? T + D: D + T) + "</td><td class='EditButton ui-widget-content'>" + $ + aa + "</td></tr>";
                        D += "<tr style='display:none' class='binfo'><td class='bottominfo' colspan='2'>" + 
                        d.bottominfo + "</td></tr>";
                        D += "</tbody></table>";
                        if (I > 0) {
                            var V = [];
                            a.each(a(O)[0].rows, 
                            function(g, l) {
                                V[g] = l
                            });
                            V.sort(function(g, l) {
                                if (g.rp > l.rp) return 1;
                                if (g.rp < l.rp) return - 1;
                                return 0
                            });
                            a.each(V, 
                            function(g, l) {
                                a("tbody", O).append(l)
                            })
                        }
                        b.gbox = "#gbox_" + e;
                        var ca = false;
                        if (b.closeOnEscape === true) {
                            b.closeOnEscape = false;
                            ca = true
                        }
                        N = a("<span></span>").append(N).append(D);
                        createModal(k, N, b, "#gview_" + f.p.id, a("#gview_" + f.p.id)[0]);
                        if (r) {
                            a("#pData, #nData", "#" + i + "_2").css("float", "right");
                            a(".EditButton", "#" + i + "_2").css("text-align", 
                            "left")
                        }
                        d.topinfo && a(".tinfo", "#" + i + "_2").show();
                        d.bottominfo && a(".binfo", "#" + i + "_2").show();
                        D = N = null;
                        a("#" + k.themodal).keydown(function(g) {
                            var l = g.target;
                            if (a("#" + j).data("disabled") === true) return false;
                            if (d.savekey[0] === true && g.which == d.savekey[1]) if (l.tagName != "TEXTAREA") {
                                a("#sData", "#" + i + "_2").trigger("click");
                                return false
                            }
                            if (g.which === 27) {
                                if (!s()) return false;
                                ca && hideModal(this, {
                                    gb: b.gbox,
                                    jqm: b.jqModal,
                                    onClose: d.onClose
                                });
                                return false
                            }
                            if (d.navkeys[0] === true) {
                                if (a("#id_g", "#" + i).val() == "_empty") return true;
                                if (g.which == d.navkeys[1]) {
                                    a("#pData", "#" + i + "_2").trigger("click");
                                    return false
                                }
                                if (g.which == d.navkeys[2]) {
                                    a("#nData", "#" + i + "_2").trigger("click");
                                    return false
                                }
                            }
                        });
                        if (b.checkOnUpdate) {
                            a("a.ui-jqdialog-titlebar-close span", "#" + k.themodal).removeClass("jqmClose");
                            a("a.ui-jqdialog-titlebar-close", "#" + k.themodal).unbind("click").click(function() {
                                if (!s()) return false;
                                hideModal("#" + k.themodal, {
                                    gb: "#gbox_" + e,
                                    jqm: b.jqModal,
                                    onClose: d.onClose
                                });
                                return false
                            })
                        }
                        b.saveicon = a.extend([true, "left", "ui-icon-disk"], 
                        b.saveicon);
                        b.closeicon = a.extend([true, "left", "ui-icon-close"], b.closeicon);
                        if (b.saveicon[0] == true) a("#sData", "#" + i + "_2").addClass(b.saveicon[1] == "right" ? "fm-button-icon-right": "fm-button-icon-left").append("<span class='ui-icon " + b.saveicon[2] + "'></span>");
                        if (b.closeicon[0] == true) a("#cData", "#" + i + "_2").addClass(b.closeicon[1] == "right" ? "fm-button-icon-right": "fm-button-icon-left").append("<span class='ui-icon " + b.closeicon[2] + "'></span>");
                        if (d.checkOnSubmit || d.checkOnUpdate) {
                            $ = "<a href='javascript:void(0)' id='sNew' class='fm-button ui-state-default ui-corner-all' style='z-index:1002'>" + 
                            b.bYes + "</a>";
                            T = "<a href='javascript:void(0)' id='nNew' class='fm-button ui-state-default ui-corner-all' style='z-index:1002'>" + b.bNo + "</a>";
                            aa = "<a href='javascript:void(0)' id='cNew' class='fm-button ui-state-default ui-corner-all' style='z-index:1002'>" + b.bExit + "</a>";
                            N = b.zIndex || 999;
                            N++;
                            a("<div class='ui-widget-overlay jqgrid-overlay confirm' style='z-index:" + N + ";display:none;'>&#160;" + (a.browser.msie && a.browser.version == 6 ? '<iframe style="display:block;position:absolute;z-index:-1;filter:Alpha(Opacity=\'0\');" src="javascript:false;"></iframe>': 
                            "") + "</div><div class='confirm ui-widget-content ui-jqconfirm' style='z-index:" + (N + 1) + "'>" + b.saveData + "<br/><br/>" + $ + T + aa + "</div>").insertAfter("#" + j);
                            a("#sNew", "#" + k.themodal).click(function() {
                                m();
                                a("#" + j).data("disabled", false);
                                a(".confirm", "#" + k.themodal).hide();
                                return false
                            });
                            a("#nNew", "#" + k.themodal).click(function() {
                                a(".confirm", "#" + k.themodal).hide();
                                a("#" + j).data("disabled", false);
                                setTimeout(function() {
                                    a(":input", "#" + j)[0].focus()
                                },
                                0);
                                return false
                            });
                            a("#cNew", "#" + k.themodal).click(function() {
                                a(".confirm", 
                                "#" + k.themodal).hide();
                                a("#" + j).data("disabled", false);
                                hideModal("#" + k.themodal, {
                                    gb: "#gbox_" + e,
                                    jqm: b.jqModal,
                                    onClose: d.onClose
                                });
                                return false
                            })
                        }
                        v && v(a("#" + j));
                        h == "_empty" || !d.viewPagerButtons ? a("#pData,#nData", "#" + i + "_2").hide() : a("#pData,#nData", "#" + i + "_2").show();
                        u && u(a("#" + j));
                        a("#" + k.themodal).data("onClose", d.onClose);
                        viewModal("#" + k.themodal, {
                            gbox: "#gbox_" + e,
                            jqm: b.jqModal,
                            closeoverlay: M,
                            modal: b.modal
                        });
                        M || a(".jqmOverlay").click(function() {
                            if (!s()) return false;
                            hideModal("#" + k.themodal, {
                                gb: "#gbox_" + 
                                e,
                                jqm: b.jqModal,
                                onClose: d.onClose
                            });
                            return false
                        });
                        P && P(a("#" + j));
                        a(".fm-button", "#" + k.themodal).hover(function() {
                            a(this).addClass("ui-state-hover")
                        },
                        function() {
                            a(this).removeClass("ui-state-hover")
                        });
                        a("#sData", "#" + i + "_2").click(function() {
                            c = {};
                            t = {};
                            a("#FormError", "#" + i).hide();
                            w();
                            if (c[f.p.id + "_id"] == "_empty") m();
                            else if (b.checkOnSubmit === true) {
                                J = a.extend({},
                                c, t);
                                if (S = F(J, d._savedData)) {
                                    a("#" + j).data("disabled", true);
                                    a(".confirm", "#" + k.themodal).show()
                                } else m()
                            } else m();
                            return false
                        });
                        a("#cData", 
                        "#" + i + "_2").click(function() {
                            if (!s()) return false;
                            hideModal("#" + k.themodal, {
                                gb: "#gbox_" + e,
                                jqm: b.jqModal,
                                onClose: d.onClose
                            });
                            return false
                        });
                        a("#nData", "#" + i + "_2").click(function() {
                            if (!s()) return false;
                            a("#FormError", "#" + i).hide();
                            var g = x();
                            g[0] = parseInt(g[0]);
                            if (g[0] != -1 && g[1][g[0] + 1]) {
                                a.isFunction(b.onclickPgButtons) && b.onclickPgButtons("next", a("#" + j), g[1][g[0]]);
                                n(g[1][g[0] + 1], f, j);
                                a(f).jqGrid("setSelection", g[1][g[0] + 1]);
                                a.isFunction(b.afterclickPgButtons) && b.afterclickPgButtons("next", a("#" + j), 
                                g[1][g[0] + 1]);
                                o(g[0] + 1, g[1].length - 1)
                            }
                            return false
                        });
                        a("#pData", "#" + i + "_2").click(function() {
                            if (!s()) return false;
                            a("#FormError", "#" + i).hide();
                            var g = x();
                            if (g[0] != -1 && g[1][g[0] - 1]) {
                                a.isFunction(b.onclickPgButtons) && b.onclickPgButtons("prev", a("#" + j), g[1][g[0]]);
                                n(g[1][g[0] - 1], f, j);
                                a(f).jqGrid("setSelection", g[1][g[0] - 1]);
                                a.isFunction(b.afterclickPgButtons) && b.afterclickPgButtons("prev", a("#" + j), g[1][g[0] - 1]);
                                o(g[0] - 1, g[1].length - 1)
                            }
                            return false
                        })
                    }
                    u = x();
                    o(u[0], u[1].length - 1)
                }
            })
        },
        viewGridRow: function(h, 
        b) {
            b = a.extend({
                top: 0,
                left: 0,
                width: 0,
                height: "auto",
                dataheight: "auto",
                modal: false,
                drag: true,
                resize: true,
                jqModal: true,
                closeOnEscape: false,
                labelswidth: "30%",
                closeicon: [],
                navkeys: [false, 38, 40],
                onClose: null,
                beforeShowForm: null,
                viewPagerButtons: true
            },
            a.jgrid.view, b || {});
            return this.each(function() {
                function o() {
                    if (b.closeOnEscape === true || b.navkeys[0] === true) setTimeout(function() {
                        a(".ui-jqdialog-titlebar-close", "#" + e.modalhead).focus()
                    },
                    0)
                }
                function x(c, t) {
                    c == 0 ? a("#pData", "#" + f + "_2").addClass("ui-state-disabled") : 
                    a("#pData", "#" + f + "_2").removeClass("ui-state-disabled");
                    c == t ? a("#nData", "#" + f + "_2").addClass("ui-state-disabled") : a("#nData", "#" + f + "_2").removeClass("ui-state-disabled")
                }
                function s() {
                    var c = a(n).jqGrid("getDataIDs"),
                    t = a("#id_g", "#" + f).val();
                    return [a.inArray(t, c), c]
                }
                function w(c, t, J, S) {
                    for (var M, N, D, O = 0, T, $, aa = [], V = false, ca = "<td class='CaptionTD form-view-label ui-widget-content' width='" + b.labelswidth + "'>&#160;</td><td class='DataTD form-view-data ui-helper-reset ui-widget-content'>&#160;</td>", g = 
                    "", l = ["integer", "number", "currency"], C = 0, p = 0, E, z, A, K = 1; K <= S; K++) g += K == 1 ? ca: "<td class='CaptionTD form-view-label ui-widget-content'>&#160;</td><td class='DataTD form-view-data ui-widget-content'>&#160;</td>";
                    a(t.p.colModel).each(function() {
                        N = this.editrules && this.editrules.edithidden === true ? false: this.hidden === true ? true: false;
                        if (!N && this.align === "right") if (this.formatter && a.inArray(this.formatter, l) !== -1) C = Math.max(C, parseInt(this.width, 10));
                        else p = Math.max(p, parseInt(this.width, 10))
                    });
                    E = C !== 0 ? C: p !== 
                    0 ? p: 0;
                    V = a(t).jqGrid("getInd", c);
                    a(t.p.colModel).each(function(y) {
                        M = this.name;
                        z = false;
                        $ = (N = this.editrules && this.editrules.edithidden === true ? false: this.hidden === true ? true: false) ? "style='display:none'": "";
                        A = typeof this.viewable != "boolean" ? true: this.viewable;
                        if (M !== "cb" && M !== "subgrid" && M !== "rn" && A) {
                            T = V === false ? "": M == t.p.ExpandColumn && t.p.treeGrid === true ? a("td:eq(" + y + ")", t.rows[V]).text() : a("td:eq(" + y + ")", t.rows[V]).html();
                            z = this.align === "right" && E !== 0 ? true: false;
                            a.extend({},
                            this.editoptions || {},
                            {
                                id: M,
                                name: M
                            });
                            var L = a.extend({},
                            {
                                rowabove: false,
                                rowcontent: ""
                            },
                            this.formoptions || {}),
                            G = parseInt(L.rowpos) || O + 1,
                            Q = parseInt((parseInt(L.colpos) || 1) * 2);
                            if (L.rowabove) {
                                var H = a("<tr><td class='contentinfo' colspan='" + S * 2 + "'>" + L.rowcontent + "</td></tr>");
                                a(J).append(H);
                                H[0].rp = G
                            }
                            D = a(J).find("tr[rowpos=" + G + "]");
                            if (D.length == 0) {
                                D = a("<tr " + $ + " rowpos='" + G + "'></tr>").addClass("FormData").attr("id", "trv_" + M);
                                a(D).append(g);
                                a(J).append(D);
                                D[0].rp = G
                            }
                            a("td:eq(" + (Q - 2) + ")", D[0]).html("<b>" + (typeof L.label === "undefined" ? 
                            t.p.colNames[y] : L.label) + "</b>");
                            a("td:eq(" + (Q - 1) + ")", D[0]).append("<span>" + T + "</span>").attr("id", "v_" + M);
                            z && a("td:eq(" + (Q - 1) + ") span", D[0]).css({
                                "text-align": "right",
                                width: E + "px"
                            });
                            aa[O] = y;
                            O++
                        }
                    });
                    if (O > 0) {
                        c = a("<tr class='FormData' style='display:none'><td class='CaptionTD'></td><td colspan='" + (S * 2 - 1) + "' class='DataTD'><input class='FormElement' id='id_g' type='text' name='id' value='" + c + "'/></td></tr>");
                        c[0].rp = O + 99;
                        a(J).append(c)
                    }
                    return aa
                }
                function q(c, t) {
                    var J,
                    S,
                    M = 0,
                    N,
                    D;
                    if (D = a(t).jqGrid("getInd", 
                    c, true)) {
                        a("td", D).each(function(O) {
                            J = t.p.colModel[O].name;
                            S = t.p.colModel[O].editrules && t.p.colModel[O].editrules.edithidden === true ? false: t.p.colModel[O].hidden === true ? true: false;
                            if (J !== "cb" && J !== "subgrid" && J !== "rn") {
                                N = J == t.p.ExpandColumn && t.p.treeGrid === true ? a(this).text() : a(this).html();
                                a.extend({},
                                t.p.colModel[O].editoptions || {});
                                J = a.jgrid.jqID("v_" + J);
                                a("#" + J + " span", "#" + f).html(N);
                                S && a("#" + J, "#" + f).parents("tr:first").hide();
                                M++
                            }
                        });
                        M > 0 && a("#id_g", "#" + f).val(c)
                    }
                }
                var n = this;
                if (n.grid && h) {
                    if (!b.imgpath) b.imgpath = 
                    n.p.imgpath;
                    var m = n.p.id,
                    F = "ViewGrid_" + m,
                    f = "ViewTbl_" + m,
                    e = {
                        themodal: "viewmod" + m,
                        modalhead: "viewhd" + m,
                        modalcontent: "viewcnt" + m,
                        scrollelm: F
                    },
                    j = 1,
                    i = 0;
                    if (a("#" + e.themodal).html() != null) {
                        a(".ui-jqdialog-title", "#" + e.modalhead).html(b.caption);
                        a("#FormError", "#" + f).hide();
                        q(h, n);
                        a.isFunction(b.beforeShowForm) && b.beforeShowForm(a("#" + F));
                        viewModal("#" + e.themodal, {
                            gbox: "#gbox_" + m,
                            jqm: b.jqModal,
                            jqM: false,
                            modal: b.modal
                        });
                        o()
                    } else {
                        a(n.p.colModel).each(function() {
                            var c = this.formoptions;
                            j = Math.max(j, c ? c.colpos || 
                            0: 0);
                            i = Math.max(i, c ? c.rowpos || 0: 0)
                        });
                        var k = isNaN(b.dataheight) ? b.dataheight: b.dataheight + "px",
                        u = a("<form name='FormPost' id='" + F + "' class='FormGrid' style='width:100%;overflow:auto;position:relative;height:" + k + ";'></form>"),
                        P = a("<table id='" + f + "' class='EditTable' cellspacing='1' cellpading='2' border='0' style='table-layout:fixed'><tbody></tbody></table>");
                        a(u).append(P);
                        w(h, n, P, j);
                        k = n.p.direction == "rtl" ? true: false;
                        var r = "<a href='javascript:void(0)' id='" + (k ? "nData": "pData") + "' class='fm-button ui-state-default ui-corner-left'><span class='ui-icon ui-icon-triangle-1-w'></span></div>",
                        v = "<a href='javascript:void(0)' id='" + (k ? "pData": "nData") + "' class='fm-button ui-state-default ui-corner-right'><span class='ui-icon ui-icon-triangle-1-e'></span></div>",
                        B = "<a href='javascript:void(0)' id='cData' class='fm-button ui-state-default ui-corner-all'>" + b.bClose + "</a>";
                        if (i > 0) {
                            var I = [];
                            a.each(a(P)[0].rows, 
                            function(c, t) {
                                I[c] = t
                            });
                            I.sort(function(c, t) {
                                if (c.rp > t.rp) return 1;
                                if (c.rp < t.rp) return - 1;
                                return 0
                            });
                            a.each(I, 
                            function(c, t) {
                                a("tbody", P).append(t)
                            })
                        }
                        b.gbox = "#gbox_" + m;
                        var Z = false;
                        if (b.closeOnEscape === 
                        true) {
                            b.closeOnEscape = false;
                            Z = true
                        }
                        u = a("<span></span>").append(u).append("<table border='0' class='EditTable' id='" + f + "_2'><tbody><tr id='Act_Buttons'><td class='navButton ui-widget-content' width='" + b.labelswidth + "'>" + (k ? v + r: r + v) + "</td><td class='EditButton ui-widget-content'>" + B + "</td></tr></tbody></table>");
                        createModal(e, u, b, "#gview_" + n.p.id, a("#gview_" + n.p.id)[0]);
                        if (k) {
                            a("#pData, #nData", "#" + f + "_2").css("float", "right");
                            a(".EditButton", "#" + f + "_2").css("text-align", "left")
                        }
                        b.viewPagerButtons || 
                        a("#pData, #nData", "#" + f + "_2").hide();
                        u = null;
                        a("#" + e.themodal).keydown(function(c) {
                            if (c.which === 27) {
                                Z && hideModal(this, {
                                    gb: b.gbox,
                                    jqm: b.jqModal,
                                    onClose: b.onClose
                                });
                                return false
                            }
                            if (b.navkeys[0] === true) {
                                if (c.which === b.navkeys[1]) {
                                    a("#pData", "#" + f + "_2").trigger("click");
                                    return false
                                }
                                if (c.which === b.navkeys[2]) {
                                    a("#nData", "#" + f + "_2").trigger("click");
                                    return false
                                }
                            }
                        });
                        b.closeicon = a.extend([true, "left", "ui-icon-close"], b.closeicon);
                        if (b.closeicon[0] == true) a("#cData", "#" + f + "_2").addClass(b.closeicon[1] == "right" ? 
                        "fm-button-icon-right": "fm-button-icon-left").append("<span class='ui-icon " + b.closeicon[2] + "'></span>");
                        a.isFunction(b.beforeShowForm) && b.beforeShowForm(a("#" + F));
                        viewModal("#" + e.themodal, {
                            gbox: "#gbox_" + m,
                            jqm: b.jqModal,
                            modal: b.modal
                        });
                        a(".fm-button:not(.ui-state-disabled)", "#" + f + "_2").hover(function() {
                            a(this).addClass("ui-state-hover")
                        },
                        function() {
                            a(this).removeClass("ui-state-hover")
                        });
                        o();
                        a("#cData", "#" + f + "_2").click(function() {
                            hideModal("#" + e.themodal, {
                                gb: "#gbox_" + m,
                                jqm: b.jqModal,
                                onClose: b.onClose
                            });
                            return false
                        });
                        a("#nData", "#" + f + "_2").click(function() {
                            a("#FormError", "#" + f).hide();
                            var c = s();
                            c[0] = parseInt(c[0]);
                            if (c[0] != -1 && c[1][c[0] + 1]) {
                                a.isFunction(b.onclickPgButtons) && b.onclickPgButtons("next", a("#" + F), c[1][c[0]]);
                                q(c[1][c[0] + 1], n);
                                a(n).jqGrid("setSelection", c[1][c[0] + 1]);
                                a.isFunction(b.afterclickPgButtons) && b.afterclickPgButtons("next", a("#" + F), c[1][c[0] + 1]);
                                x(c[0] + 1, c[1].length - 1)
                            }
                            o();
                            return false
                        });
                        a("#pData", "#" + f + "_2").click(function() {
                            a("#FormError", "#" + f).hide();
                            var c = s();
                            if (c[0] != 
                            -1 && c[1][c[0] - 1]) {
                                a.isFunction(b.onclickPgButtons) && b.onclickPgButtons("prev", a("#" + F), c[1][c[0]]);
                                q(c[1][c[0] - 1], n);
                                a(n).jqGrid("setSelection", c[1][c[0] - 1]);
                                a.isFunction(b.afterclickPgButtons) && b.afterclickPgButtons("prev", a("#" + F), c[1][c[0] - 1]);
                                x(c[0] - 1, c[1].length - 1)
                            }
                            o();
                            return false
                        })
                    }
                    k = s();
                    x(k[0], k[1].length - 1)
                }
            })
        },
        delGridRow: function(h, b) {
            d = b = a.extend({
                top: 0,
                left: 0,
                width: 240,
                height: "auto",
                dataheight: "auto",
                modal: false,
                drag: true,
                resize: true,
                url: "",
                mtype: "POST",
                reloadAfterSubmit: true,
                beforeShowForm: null,
                afterShowForm: null,
                beforeSubmit: null,
                onclickSubmit: null,
                afterSubmit: null,
                jqModal: true,
                closeOnEscape: false,
                delData: {},
                delicon: [],
                cancelicon: [],
                onClose: null,
                ajaxDelOptions: {},
                processing: false,
                serializeDelData: null
            },
            a.jgrid.del, b || {});
            return this.each(function() {
                var o = this;
                if (o.grid) if (h) {
                    var x = typeof b.beforeShowForm === "function" ? true: false,
                    s = typeof b.afterShowForm === "function" ? true: false,
                    w = o.p.id,
                    q = {},
                    n = "DelTbl_" + w,
                    m,
                    F,
                    f,
                    e,
                    j = {
                        themodal: "delmod" + w,
                        modalhead: "delhd" + w,
                        modalcontent: "delcnt" + w,
                        scrollelm: n
                    };
                    if (isArray(h)) h = h.join();
                    if (a("#" + j.themodal).html() != null) {
                        a("#DelData>td", "#" + n).text(h);
                        a("#DelError", "#" + n).hide();
                        if (d.processing === true) {
                            d.processing = false;
                            a("#dData", "#" + n).removeClass("ui-state-active")
                        }
                        x && b.beforeShowForm(a("#" + n));
                        viewModal("#" + j.themodal, {
                            gbox: "#gbox_" + w,
                            jqm: b.jqModal,
                            jqM: false,
                            modal: b.modal
                        })
                    } else {
                        var i = isNaN(b.dataheight) ? b.dataheight: b.dataheight + "px";
                        i = "<div id='" + n + "' class='formdata' style='width:100%;overflow:auto;position:relative;height:" + i + ";'>";
                        i += "<table class='DelTable'><tbody>";
                        i += "<tr id='DelError' style='display:none'><td class='ui-state-error'></td></tr>";
                        i += "<tr id='DelData' style='display:none'><td >" + h + "</td></tr>";
                        i += '<tr><td class="delmsg" style="white-space:pre;">' + b.msg + "</td></tr><tr><td >&#160;</td></tr>";
                        i += "</tbody></table></div>";
                        i += "<table cellspacing='0' cellpadding='0' border='0' class='EditTable' id='" + n + "_2'><tbody><tr><td class='DataTD ui-widget-content'></td></tr><tr style='display:block;height:3px;'><td></td></tr><tr><td class='DelButton EditButton'>" + 
                        ("<a href='javascript:void(0)' id='dData' class='fm-button ui-state-default ui-corner-all'>" + b.bSubmit + "</a>") + "&#160;" + ("<a href='javascript:void(0)' id='eData' class='fm-button ui-state-default ui-corner-all'>" + b.bCancel + "</a>") + "</td></tr></tbody></table>";
                        b.gbox = "#gbox_" + w;
                        createModal(j, i, b, "#gview_" + o.p.id, a("#gview_" + o.p.id)[0]);
                        a(".fm-button", "#" + n + "_2").hover(function() {
                            a(this).addClass("ui-state-hover")
                        },
                        function() {
                            a(this).removeClass("ui-state-hover")
                        });
                        b.delicon = a.extend([true, "left", "ui-icon-scissors"], 
                        b.delicon);
                        b.cancelicon = a.extend([true, "left", "ui-icon-cancel"], b.cancelicon);
                        if (b.delicon[0] == true) a("#dData", "#" + n + "_2").addClass(b.delicon[1] == "right" ? "fm-button-icon-right": "fm-button-icon-left").append("<span class='ui-icon " + b.delicon[2] + "'></span>");
                        if (b.cancelicon[0] == true) a("#eData", "#" + n + "_2").addClass(b.cancelicon[1] == "right" ? "fm-button-icon-right": "fm-button-icon-left").append("<span class='ui-icon " + b.cancelicon[2] + "'></span>");
                        a("#dData", "#" + n + "_2").click(function() {
                            var k = [true, ""];
                            q = {};
                            var u = a("#DelData>td", "#" + n).text();
                            if (typeof b.onclickSubmit === "function") q = b.onclickSubmit(d) || {};
                            if (typeof b.beforeSubmit === "function") k = b.beforeSubmit(u);
                            if (k[0]) {
                                var P = d.url ? d.url: a(o).jqGrid("getGridParam", "editurl");
                                if (!P) {
                                    k[0] = false;
                                    k[1] += " " + a.jgrid.errors.nourl
                                }
                            }
                            if (k[0] === false) {
                                a("#DelError>td", "#" + n).html(k[1]);
                                a("#DelError", "#" + n).show()
                            } else if (!d.processing) {
                                d.processing = true;
                                a(this).addClass("ui-state-active");
                                f = o.p.prmNames;
                                m = a.extend({},
                                d.delData, q);
                                e = f.oper;
                                m[e] = f.deloper;
                                F = f.id;
                                m[F] = u;
                                a.ajax(a.extend({
                                    url: P,
                                    type: b.mtype,
                                    data: a.isFunction(b.serializeDelData) ? b.serializeDelData(m) : m,
                                    complete: function(r, v) {
                                        if (v != "success") {
                                            k[0] = false;
                                            k[1] = a.isFunction(d.errorTextFormat) ? d.errorTextFormat(r) : v + " Status: '" + r.statusText + "'. Error code: " + r.status
                                        } else if (typeof d.afterSubmit === "function") k = d.afterSubmit(r, m);
                                        if (k[0] === false) {
                                            a("#DelError>td", "#" + n).html(k[1]);
                                            a("#DelError", "#" + n).show()
                                        } else {
                                            if (d.reloadAfterSubmit) a(o).trigger("reloadGrid");
                                            else {
                                                v = [];
                                                v = u.split(",");
                                                if (o.p.treeGrid === 
                                                true) try {
                                                    a(o).jqGrid("delTreeNode", v[0])
                                                } catch(B) {} else for (var I = 0; I < v.length; I++) a(o).jqGrid("delRowData", v[I]);
                                                o.p.selrow = null;
                                                o.p.selarrrow = []
                                            }
                                            a.isFunction(d.afterComplete) && setTimeout(function() {
                                                d.afterComplete(r, u)
                                            },
                                            500)
                                        }
                                        d.processing = false;
                                        a("#dData", "#" + n + "_2").removeClass("ui-state-active");
                                        k[0] && hideModal("#" + j.themodal, {
                                            gb: "#gbox_" + w,
                                            jqm: b.jqModal,
                                            onClose: d.onClose
                                        })
                                    },
                                    error: function(r, v, B) {
                                        a("#DelError>td", "#" + n).html(v + " : " + B);
                                        a("#DelError", "#" + n).show();
                                        d.processing = false;
                                        a("#dData", 
                                        "#" + n + "_2").removeClass("ui-state-active")
                                    }
                                },
                                a.jgrid.ajaxOptions, b.ajaxDelOptions))
                            }
                            return false
                        });
                        a("#eData", "#" + n + "_2").click(function() {
                            hideModal("#" + j.themodal, {
                                gb: "#gbox_" + w,
                                jqm: b.jqModal,
                                onClose: d.onClose
                            });
                            return false
                        });
                        x && b.beforeShowForm(a("#" + n));
                        viewModal("#" + j.themodal, {
                            gbox: "#gbox_" + w,
                            jqm: b.jqModal,
                            modal: b.modal
                        })
                    }
                    s && b.afterShowForm(a("#" + n));
                    b.closeOnEscape === true && setTimeout(function() {
                        a(".ui-jqdialog-titlebar-close", "#" + j.modalhead).focus()
                    },
                    0)
                }
            })
        },
        navGrid: function(h, b, o, x, s, w, q) {
            b = 
            a.extend({
                edit: true,
                editicon: "ui-icon-pencil",
                add: true,
                addicon: "ui-icon-plus",
                del: true,
                delicon: "ui-icon-trash",
                search: true,
                searchicon: "ui-icon-search",
                refresh: true,
                refreshicon: "ui-icon-refresh",
                refreshstate: "firstpage",
                view: false,
                viewicon: "ui-icon-document",
                position: "left",
                closeOnEscape: true,
                beforeRefresh: null,
                afterRefresh: null,
                cloneToTop: false
            },
            a.jgrid.nav, b || {});
            return this.each(function() {
                var n = {
                    themodal: "alertmod",
                    modalhead: "alerthd",
                    modalcontent: "alertcnt"
                },
                m = this,
                F,
                f,
                e;
                if (! (!m.grid || typeof h != 
                "string")) {
                    if (a("#" + n.themodal).html() == null) {
                        if (typeof window.innerWidth != "undefined") {
                            F = window.innerWidth;
                            f = window.innerHeight
                        } else if (typeof document.documentElement != "undefined" && typeof document.documentElement.clientWidth != "undefined" && document.documentElement.clientWidth != 0) {
                            F = document.documentElement.clientWidth;
                            f = document.documentElement.clientHeight
                        } else {
                            F = 1024;
                            f = 768
                        }
                        createModal(n, "<div>" + b.alerttext + "</div><span tabindex='0'><span tabindex='-1' id='jqg_alrt'></span></span>", {
                            gbox: "#gbox_" + 
                            m.p.id,
                            jqModal: true,
                            drag: true,
                            resize: true,
                            caption: b.alertcap,
                            top: f / 2 - 25,
                            left: F / 2 - 100,
                            width: 200,
                            height: "auto",
                            closeOnEscape: b.closeOnEscape
                        },
                        "", "", true)
                    }
                    F = 1;
                    if (b.cloneToTop && m.p.toppager) F = 2;
                    for (f = 0; f < F; f++) {
                        var j = a("<table cellspacing='0' cellpadding='0' border='0' class='ui-pg-table navtable' style='float:left;table-layout:auto;'><tbody><tr></tr></tbody></table>"),
                        i,
                        k;
                        if (f == 0) {
                            i = h;
                            k = m.p.id;
                            if (i == m.p.toppager) {
                                k += "_top";
                                F = 1
                            }
                        } else {
                            i = m.p.toppager;
                            k = m.p.id + "_top"
                        }
                        m.p.direction == "rtl" && a(j).attr("dir", 
                        "rtl").css("float", "right");
                        if (b.add) {
                            x = x || {};
                            e = a("<td class='ui-pg-button ui-corner-all'></td>");
                            a(e).append("<div class='ui-pg-div'><span class='ui-icon " + b.addicon + "'></span>" + b.addtext + "</div>");
                            a("tr", j).append(e);
                            a(e, j).attr({
                                title: b.addtitle || "",
                                id: x.id || "add_" + k
                            }).click(function() {
                                typeof b.addfunc == "function" ? b.addfunc() : a(m).jqGrid("editGridRow", "new", x);
                                return false
                            }).hover(function() {
                                a(this).addClass("ui-state-hover")
                            },
                            function() {
                                a(this).removeClass("ui-state-hover")
                            });
                            e = null
                        }
                        if (b.edit) {
                            e = 
                            a("<td class='ui-pg-button ui-corner-all'></td>");
                            o = o || {};
                            a(e).append("<div class='ui-pg-div'><span class='ui-icon " + b.editicon + "'></span>" + b.edittext + "</div>");
                            a("tr", j).append(e);
                            a(e, j).attr({
                                title: b.edittitle || "",
                                id: o.id || "edit_" + k
                            }).click(function() {
                                var u = m.p.selrow;
                                if (u) typeof b.editfunc == "function" ? b.editfunc(u) : a(m).jqGrid("editGridRow", u, o);
                                else {
                                    viewModal("#" + n.themodal, {
                                        gbox: "#gbox_" + m.p.id,
                                        jqm: true
                                    });
                                    a("#jqg_alrt").focus()
                                }
                                return false
                            }).hover(function() {
                                a(this).addClass("ui-state-hover")
                            },
                            function() {
                                a(this).removeClass("ui-state-hover")
                            });
                            e = null
                        }
                        if (b.view) {
                            e = a("<td class='ui-pg-button ui-corner-all'></td>");
                            q = q || {};
                            a(e).append("<div class='ui-pg-div'><span class='ui-icon " + b.viewicon + "'></span>" + b.viewtext + "</div>");
                            a("tr", j).append(e);
                            a(e, j).attr({
                                title: b.viewtitle || "",
                                id: q.id || "view_" + k
                            }).click(function() {
                                var u = m.p.selrow;
                                if (u) a(m).jqGrid("viewGridRow", u, q);
                                else {
                                    viewModal("#" + n.themodal, {
                                        gbox: "#gbox_" + m.p.id,
                                        jqm: true
                                    });
                                    a("#jqg_alrt").focus()
                                }
                                return false
                            }).hover(function() {
                                a(this).addClass("ui-state-hover")
                            },
                            function() {
                                a(this).removeClass("ui-state-hover")
                            });
                            e = null
                        }
                        if (b.del) {
                            e = a("<td class='ui-pg-button ui-corner-all'></td>");
                            s = s || {};
                            a(e).append("<div class='ui-pg-div'><span class='ui-icon " + b.delicon + "'></span>" + b.deltext + "</div>");
                            a("tr", j).append(e);
                            a(e, j).attr({
                                title: b.deltitle || "",
                                id: s.id || "del_" + k
                            }).click(function() {
                                var u;
                                if (m.p.multiselect) {
                                    u = m.p.selarrrow;
                                    if (u.length == 0) u = null
                                } else u = m.p.selrow;
                                if (u) a(m).jqGrid("delGridRow", u, s);
                                else {
                                    viewModal("#" + n.themodal, {
                                        gbox: "#gbox_" + m.p.id,
                                        jqm: true
                                    });
                                    a("#jqg_alrt").focus()
                                }
                                return false
                            }).hover(function() {
                                a(this).addClass("ui-state-hover")
                            },
                            function() {
                                a(this).removeClass("ui-state-hover")
                            });
                            e = null
                        }
                        if (b.add || b.edit || b.del || b.view) a("tr", j).append("<td class='ui-pg-button ui-state-disabled' style='width:4px;'><span class='ui-separator'></span></td>");
                        if (b.search) {
                            e = a("<td class='ui-pg-button ui-corner-all'></td>");
                            w = w || {};
                            a(e).append("<div class='ui-pg-div'><span class='ui-icon " + b.searchicon + "'></span>" + b.searchtext + "</div>");
                            a("tr", j).append(e);
                            a(e, j).attr({
                                title: b.searchtitle || "",
                                id: w.id || "search_" + k
                            }).click(function() {
                                a(m).jqGrid("searchGrid", 
                                w);
                                return false
                            }).hover(function() {
                                a(this).addClass("ui-state-hover")
                            },
                            function() {
                                a(this).removeClass("ui-state-hover")
                            });
                            e = null
                        }
                        if (b.refresh) {
                            e = a("<td class='ui-pg-button ui-corner-all'></td>");
                            a(e).append("<div class='ui-pg-div'><span class='ui-icon " + b.refreshicon + "'></span>" + b.refreshtext + "</div>");
                            a("tr", j).append(e);
                            a(e, j).attr({
                                title: b.refreshtitle || "",
                                id: "refresh_" + k
                            }).click(function() {
                                a.isFunction(b.beforeRefresh) && b.beforeRefresh();
                                m.p.search = false;
                                try {
                                    a("#fbox_" + m.p.id).searchFilter().reset();
                                    m.clearToolbar(false)
                                } catch(u) {}
                                switch (b.refreshstate) {
                                case "firstpage":
                                    a(m).trigger("reloadGrid", [{
                                        page: 1
                                    }]);
                                    break;
                                case "current":
                                    a(m).trigger("reloadGrid", [{
                                        current: true
                                    }]);
                                    break
                                }
                                a.isFunction(b.afterRefresh) && b.afterRefresh();
                                return false
                            }).hover(function() {
                                a(this).addClass("ui-state-hover")
                            },
                            function() {
                                a(this).removeClass("ui-state-hover")
                            });
                            e = null
                        }
                        e = a(".ui-jqgrid").css("font-size") || "11px";
                        a("body").append("<div id='testpg2' class='ui-jqgrid ui-widget ui-widget-content' style='font-size:" + e + ";visibility:hidden;' ></div>");
                        e = a(j).clone().appendTo("#testpg2").width();
                        a("#testpg2").remove();
                        a(i + "_" + b.position, i).append(j);
                        if (m.p._nvtd) {
                            if (e > m.p._nvtd[0]) {
                                a(i + "_" + b.position, i).width(e);
                                m.p._nvtd[0] = e
                            }
                            m.p._nvtd[1] = e
                        }
                        j = e = e = null
                    }
                }
            })
        },
        navButtonAdd: function(h, b) {
            b = a.extend({
                caption: "newButton",
                title: "",
                buttonicon: "ui-icon-newwin",
                onClickButton: null,
                position: "last",
                cursor: "pointer"
            },
            b || {});
            return this.each(function() {
                if (this.grid) {
                    if (h.indexOf("#") != 0) h = "#" + h;
                    var o = a(".navtable", h)[0],
                    x = this;
                    if (o) {
                        var s = a("<td></td>");
                        a(s).addClass("ui-pg-button ui-corner-all").append("<div class='ui-pg-div'><span class='ui-icon " + 
                        b.buttonicon + "'></span>" + b.caption + "</div>");
                        b.id && a(s).attr("id", b.id);
                        if (b.position == "first") o.rows[0].cells.length === 0 ? a("tr", o).append(s) : a("tr td:eq(0)", o).before(s);
                        else a("tr", o).append(s);
                        a(s, o).attr("title", b.title || "").click(function(w) {
                            a.isFunction(b.onClickButton) && b.onClickButton.call(x, w);
                            return false
                        }).hover(function() {
                            a(this).addClass("ui-state-hover")
                        },
                        function() {
                            a(this).removeClass("ui-state-hover")
                        }).css("cursor", b.cursor ? b.cursor: "normal")
                    }
                }
            })
        },
        navSeparatorAdd: function(h, b) {
            b = 
            a.extend({
                sepclass: "ui-separator",
                sepcontent: ""
            },
            b || {});
            return this.each(function() {
                if (this.grid) {
                    if (h.indexOf("#") != 0) h = "#" + h;
                    var o = a(".navtable", h)[0];
                    if (o) {
                        var x = "<td class='ui-pg-button ui-state-disabled' style='width:4px;'><span class='" + b.sepclass + "'></span>" + b.sepcontent + "</td>";
                        a("tr", o).append(x)
                    }
                }
            })
        },
        GridToForm: function(h, b) {
            return this.each(function() {
                var o = this;
                if (o.grid) {
                    var x = a(o).jqGrid("getRowData", h);
                    if (x) for (var s in x) a("[name=" + s + "]", b).is("input:radio") || a("[name=" + s + "]", b).is("input:checkbox") ? 
                    a("[name=" + s + "]", b).each(function() {
                        a(this).val() == x[s] ? a(this).attr("checked", "checked") : a(this).attr("checked", "")
                    }) : a("[name=" + s + "]", b).val(x[s])
                }
            })
        },
        FormToGrid: function(h, b, o, x) {
            return this.each(function() {
                var s = this;
                if (s.grid) {
                    o || (o = "set");
                    x || (x = "first");
                    var w = a(b).serializeArray(),
                    q = {};
                    a.each(w, 
                    function(n, m) {
                        q[m.name] = m.value
                    });
                    if (o == "add") a(s).jqGrid("addRowData", h, q, x);
                    else o == "set" && a(s).jqGrid("setRowData", h, q)
                }
            })
        }
    })
})(jQuery);
jQuery.fn.searchFilter = function(h, B) {
    function C(c, i, k) {
        this.$ = c;
        this.add = function(a) {
            a == null ? c.find(".ui-add-last").click() : c.find(".sf:eq(" + a + ") .ui-add").click();
            return this
        };
        this.del = function(a) {
            a == null ? c.find(".sf:last .ui-del").click() : c.find(".sf:eq(" + a + ") .ui-del").click();
            return this
        };
        this.search = function() {
            c.find(".ui-search").click();
            return this
        };
        this.reset = function() {
            c.find(".ui-reset").click();
            return this
        };
        this.close = function() {
            c.find(".ui-closer").click();
            return this
        };
        if (i != null) {
            function w() {
                jQuery(this).toggleClass("ui-state-hover");
                return false
            }
            function x(a) {
                jQuery(this).toggleClass("ui-state-active", a.type == "mousedown");
                return false
            }
            function l(a, b) {
                return "<option value='" + a + "'>" + b + "</option>"
            }
            function t(a, b, e) {
                return "<select class='" + a + "'" + (e ? " style='display:none;'": "") + ">" + b + "</select>"
            }
            function y(a, b) {
                a = c.find("tr.sf td.data " + a);
                a[0] != null && b(a)
            }
            function z(a, b) {
                var e = c.find("tr.sf td.data " + a);
                e[0] != null && jQuery.each(b, 
                function() {
                    this.data != null ? e.bind(this.type, this.data, this.fn) : e.bind(this.type, this.fn)
                })
            }
            var d = jQuery.extend({},
            jQuery.fn.searchFilter.defaults, k),
            m = -1,
            q = "";
            jQuery.each(d.groupOps, 
            function() {
                q += l(this.op, this.text)
            });
            q = "<select name='groupOp'>" + q + "</select>";
            c.html("").addClass("ui-searchFilter").append("<div class='ui-widget-overlay' style='z-index: -1'>&#160;</div><table class='ui-widget-content ui-corner-all'><thead><tr><td colspan='5' class='ui-widget-header ui-corner-all' style='line-height: 18px;'><div class='ui-closer ui-state-default ui-corner-all ui-helper-clearfix' style='float: right;'><span class='ui-icon ui-icon-close'></span></div>" + 
            d.windowTitle + "</td></tr></thead><tbody><tr class='sf'><td class='fields'></td><td class='ops'></td><td class='data'></td><td><div class='ui-del ui-state-default ui-corner-all'><span class='ui-icon ui-icon-minus'></span></div></td><td><div class='ui-add ui-state-default ui-corner-all'><span class='ui-icon ui-icon-plus'></span></div></td></tr><tr><td colspan='5' class='divider'><div>&#160;</div></td></tr></tbody><tfoot><tr><td colspan='3'><span class='ui-reset ui-state-default ui-corner-all' style='display: inline-block; float: left;'><span class='ui-icon ui-icon-arrowreturnthick-1-w' style='float: left;'></span><span style='line-height: 18px; padding: 0 7px 0 3px;'>" + 
            d.resetText + "</span></span><span class='ui-search ui-state-default ui-corner-all' style='display: inline-block; float: right;'><span class='ui-icon ui-icon-search' style='float: left;'></span><span style='line-height: 18px; padding: 0 7px 0 3px;'>" + d.searchText + "</span></span><span class='matchText'>" + d.matchText + "</span> " + q + " <span class='rulesText'>" + d.rulesText + "</span></td><td>&#160;</td><td><div class='ui-add-last ui-state-default ui-corner-all'><span class='ui-icon ui-icon-plusthick'></span></div></td></tr></tfoot></table>");
            k = c.find("tr.sf");
            var A = k.find("td.fields"),
            u = k.find("td.ops"),
            n = k.find("td.data"),
            r = "";
            jQuery.each(d.operators, 
            function() {
                r += l(this.op, this.text)
            });
            r = t("default", r, true);
            u.append(r);
            n.append("<input type='text' class='default' style='display:none;' />");
            var s = "",
            v = false,
            o = false;
            jQuery.each(i, 
            function(a) {
                s += l(this.itemval, this.text);
                if (this.ops != null) {
                    v = true;
                    var b = "";
                    jQuery.each(this.ops, 
                    function() {
                        b += l(this.op, this.text)
                    });
                    b = t("field" + a, b, true);
                    u.append(b)
                }
                if (this.dataUrl != null) {
                    if (a > m) m = a;
                    o = true;
                    var e = this.dataEvents,
                    j = this.dataInit,
                    p = this.buildSelect;
                    jQuery.ajax(jQuery.extend({
                        url: this.dataUrl,
                        complete: function(f) {
                            f = p != null ? jQuery("<div />").append(p(f)) : jQuery("<div />").append(f.responseText);
                            f.find("select").addClass("field" + a).hide();
                            n.append(f.html());
                            j && y(".field" + a, j);
                            e && z(".field" + a, e);
                            a == m && c.find("tr.sf td.fields select[name='field']").change()
                        }
                    },
                    d.ajaxSelectOptions))
                } else if (this.dataValues != null) {
                    o = true;
                    var g = "";
                    jQuery.each(this.dataValues, 
                    function() {
                        g += l(this.value, this.text)
                    });
                    g = t("field" + a, g, true);
                    n.append(g)
                } else if (this.dataEvents != null || this.dataInit != null) {
                    o = true;
                    g = "<input type='text' class='field" + a + "' />";
                    n.append(g)
                }
                this.dataInit != null && a != m && y(".field" + a, this.dataInit);
                this.dataEvents != null && a != m && z(".field" + a, this.dataEvents)
            });
            s = "<select name='field'>" + s + "</select>";
            A.append(s);
            i = A.find("select[name='field']");
            v ? i.change(function(a) {
                var b = a.target.selectedIndex;
                a = jQuery(a.target).parents("tr.sf").find("td.ops");
                a.find("select").removeAttr("name").hide();
                b = a.find(".field" + 
                b);
                if (b[0] == null) b = a.find(".default");
                b.attr("name", "op").show()
            }) : u.find(".default").attr("name", "op").show();
            o ? i.change(function(a) {
                var b = a.target.selectedIndex;
                a = jQuery(a.target).parents("tr.sf").find("td.data");
                a.find("select,input").removeClass("vdata").hide();
                b = a.find(".field" + b);
                if (b[0] == null) b = a.find(".default");
                b.show().addClass("vdata")
            }) : n.find(".default").show().addClass("vdata");
            if (v || o) i.change();
            c.find(".ui-state-default").hover(w, w).mousedown(x).mouseup(x);
            c.find(".ui-closer").click(function() {
                d.onClose(jQuery(c.selector));
                return false
            });
            c.find(".ui-del").click(function(a) {
                a = jQuery(a.target).parents(".sf");
                if (a.siblings(".sf").length > 0) {
                    d.datepickerFix === true && jQuery.fn.datepicker !== undefined && a.find(".hasDatepicker").datepicker("destroy");
                    a.remove()
                } else {
                    a.find("select[name='field']")[0].selectedIndex = 0;
                    a.find("select[name='op']")[0].selectedIndex = 0;
                    a.find(".data input").val("");
                    a.find(".data select").each(function() {
                        this.selectedIndex = 0
                    });
                    a.find("select[name='field']").change()
                }
                return false
            });
            c.find(".ui-add").click(function(a) {
                a = 
                jQuery(a.target).parents(".sf");
                var b = a.clone(true).insertAfter(a);
                b.find(".ui-state-default").removeClass("ui-state-hover ui-state-active");
                if (d.clone) {
                    b.find("select[name='field']")[0].selectedIndex = a.find("select[name='field']")[0].selectedIndex;
                    if (b.find("select[name='op']")[0] != null) b.find("select[name='op']").focus()[0].selectedIndex = a.find("select[name='op']")[0].selectedIndex;
                    var e = b.find("select.vdata");
                    if (e[0] != null) e[0].selectedIndex = a.find("select.vdata")[0].selectedIndex
                } else {
                    b.find(".data input").val("");
                    b.find("select[name='field']").focus()
                }
                d.datepickerFix === true && jQuery.fn.datepicker !== undefined && a.find(".hasDatepicker").each(function() {
                    var j = jQuery.data(this, "datepicker").settings;
                    b.find("#" + this.id).unbind().removeAttr("id").removeClass("hasDatepicker").datepicker(j)
                });
                b.find("select[name='field']").change();
                return false
            });
            c.find(".ui-search").click(function() {
                var a = jQuery(c.selector),
                b,
                e = a.find("select[name='groupOp'] :selected").val();
                b = d.stringResult ? '{"groupOp":"' + e + '","rules":[': {
                    groupOp: e,
                    rules: []
                };
                a.find(".sf").each(function(j) {
                    var p = jQuery(this).find("select[name='field'] :selected").val(),
                    g = jQuery(this).find("select[name='op'] :selected").val(),
                    f = jQuery(this).find("input.vdata,select.vdata :selected").val();
                    f += "";
                    f = f.replace(/\\/g, "\\\\").replace(/\"/g, '\\"');
                    if (d.stringResult) {
                        if (j > 0) b += ",";
                        b += '{"field":"' + p + '",';
                        b += '"op":"' + g + '",';
                        b += '"data":"' + f + '"}'
                    } else b.rules.push({
                        field: p,
                        op: g,
                        data: f
                    })
                });
                if (d.stringResult) b += "]}";
                d.onSearch(b);
                return false
            });
            c.find(".ui-reset").click(function() {
                var a = 
                jQuery(c.selector);
                a.find(".ui-del").click();
                a.find("select[name='groupOp']")[0].selectedIndex = 0;
                d.onReset();
                return false
            });
            c.find(".ui-add-last").click(function() {
                var a = jQuery(c.selector + " .sf:last"),
                b = a.clone(true).insertAfter(a);
                b.find(".ui-state-default").removeClass("ui-state-hover ui-state-active");
                b.find(".data input").val("");
                b.find("select[name='field']").focus();
                d.datepickerFix === true && jQuery.fn.datepicker !== undefined && a.find(".hasDatepicker").each(function() {
                    var e = jQuery.data(this, "datepicker").settings;
                    b.find("#" + this.id).unbind().removeAttr("id").removeClass("hasDatepicker").datepicker(e)
                });
                b.find("select[name='field']").change();
                return false
            })
        }
    }
    return new C(this, h, B)
};
jQuery.fn.searchFilter.version = "1.2.9";
jQuery.fn.searchFilter.defaults = {
    clone: true,
    datepickerFix: true,
    onReset: function(h) {
        alert("Reset Clicked. Data Returned: " + h)
    },
    onSearch: function(h) {
        alert("Search Clicked. Data Returned: " + h)
    },
    onClose: function(h) {
        h.hide()
    },
    groupOps: [{
        op: "AND",
        text: "all"
    },
    {
        op: "OR",
        text: "any"
    }],
    operators: [{
        op: "eq",
        text: "is equal to"
    },
    {
        op: "ne",
        text: "is not equal to"
    },
    {
        op: "lt",
        text: "is less than"
    },
    {
        op: "le",
        text: "is less or equal to"
    },
    {
        op: "gt",
        text: "is greater than"
    },
    {
        op: "ge",
        text: "is greater or equal to"
    },
    {
        op: "in",
        text: "is in"
    },
    {
        op: "ni",
        text: "is not in"
    },
    {
        op: "bw",
        text: "begins with"
    },
    {
        op: "bn",
        text: "does not begin with"
    },
    {
        op: "ew",
        text: "ends with"
    },
    {
        op: "en",
        text: "does not end with"
    },
    {
        op: "cn",
        text: "contains"
    },
    {
        op: "nc",
        text: "does not contain"
    }],
    matchText: "match",
    rulesText: "rules",
    resetText: "Reset",
    searchText: "Search",
    stringResult: true,
    windowTitle: "Search Rules",
    ajaxSelectOptions: {}
};
 (function(a) {
    a.jgrid.extend({
        editRow: function(d, t, i, q, n, u, s, c, f) {
            return this.each(function() {
                var b = this,
                k,
                l,
                r = 0,
                o = null,
                p = {},
                h,
                g;
                if (b.grid) {
                    h = a(b).jqGrid("getInd", d, true);
                    if (h != false) if ((a(h).attr("editable") || "0") == "0" && !a(h).hasClass("not-editable-row")) {
                        g = b.p.colModel;
                        a("td", h).each(function(j) {
                            k = g[j].name;
                            var v = b.p.treeGrid === true && k == b.p.ExpandColumn;
                            if (v) l = a("span:first", this).html();
                            else try {
                                l = a.unformat(this, {
                                    rowId: d,
                                    colModel: g[j]
                                },
                                j)
                            } catch(m) {
                                l = a(this).html()
                            }
                            if (k != "cb" && k != "subgrid" && k != 
                            "rn") {
                                if (b.p.autoencode) l = a.jgrid.htmlDecode(l);
                                p[k] = l;
                                if (g[j].editable === true) {
                                    if (o === null) o = j;
                                    v ? a("span:first", this).html("") : a(this).html("");
                                    var e = a.extend({},
                                    g[j].editoptions || {},
                                    {
                                        id: d + "_" + k,
                                        name: k
                                    });
                                    if (!g[j].edittype) g[j].edittype = "text";
                                    e = createEl(g[j].edittype, e, l, true, a.extend({},
                                    a.jgrid.ajaxOptions, b.p.ajaxSelectOptions || {}));
                                    a(e).addClass("editable");
                                    v ? a("span:first", this).append(e) : a(this).append(e);
                                    g[j].edittype == "select" && g[j].editoptions.multiple === true && a.browser.msie && a(e).width(a(e).width());
                                    r++
                                }
                            }
                        });
                        if (r > 0) {
                            p.id = d;
                            b.p.savedRow.push(p);
                            a(h).attr("editable", "1");
                            a("td:eq(" + o + ") input", h).focus();
                            t === true && a(h).bind("keydown", 
                            function(j) {
                                j.keyCode === 27 && a(b).jqGrid("restoreRow", d, f);
                                if (j.keyCode === 13) {
                                    if (j.target.tagName == "TEXTAREA") return true;
                                    a(b).jqGrid("saveRow", d, q, n, u, s, c, f);
                                    return false
                                }
                                j.stopPropagation()
                            });
                            a.isFunction(i) && i(d)
                        }
                    }
                }
            })
        },
        saveRow: function(d, t, i, q, n, u, s) {
            return this.each(function() {
                var c = this,
                f,
                b = {},
                k = {},
                l,
                r,
                o,
                p;
                if (c.grid) {
                    p = a(c).jqGrid("getInd", d, true);
                    if (p != false) {
                        l = 
                        a(p).attr("editable");
                        i = i ? i: c.p.editurl;
                        if (l === "1" && i) {
                            var h;
                            a("td", p).each(function(m) {
                                h = c.p.colModel[m];
                                f = h.name;
                                if (f != "cb" && f != "subgrid" && h.editable === true && f != "rn") {
                                    switch (h.edittype) {
                                    case "checkbox":
                                        var e = ["Yes", "No"];
                                        if (h.editoptions) e = h.editoptions.value.split(":");
                                        b[f] = a("input", this).attr("checked") ? e[0] : e[1];
                                        break;
                                    case "text":
                                    case "password":
                                    case "textarea":
                                    case "button":
                                        b[f] = a("input, textarea", this).val();
                                        break;
                                    case "select":
                                        if (h.editoptions.multiple) {
                                            e = a("select", this);
                                            var x = [];
                                            b[f] = 
                                            a(e).val();
                                            b[f] = b[f] ? b[f].join(",") : "";
                                            a("select > option:selected", this).each(function(y, z) {
                                                x[y] = a(z).text()
                                            });
                                            k[f] = x.join(",")
                                        } else {
                                            b[f] = a("select>option:selected", this).val();
                                            k[f] = a("select>option:selected", this).text()
                                        }
                                        if (h.formatter && h.formatter == "select") k = {};
                                        break;
                                    case "custom":
                                        try {
                                            if (h.editoptions && a.isFunction(h.editoptions.custom_value)) {
                                                b[f] = h.editoptions.custom_value(a(".customelement", this), "get");
                                                if (b[f] === undefined) throw "e2";
                                            } else throw "e1";
                                        } catch(w) {
                                            w == "e1" && info_dialog(jQuery.jgrid.errors.errcap, 
                                            "function 'custom_value' " + a.jgrid.edit.msg.nodefined, jQuery.jgrid.edit.bClose);
                                            w == "e2" ? info_dialog(jQuery.jgrid.errors.errcap, "function 'custom_value' " + a.jgrid.edit.msg.novalue, jQuery.jgrid.edit.bClose) : info_dialog(jQuery.jgrid.errors.errcap, w.message, jQuery.jgrid.edit.bClose)
                                        }
                                        break
                                    }
                                    o = checkValues(b[f], m, c);
                                    if (o[0] === false) {
                                        o[1] = b[f] + " " + o[1];
                                        return false
                                    }
                                    if (c.p.autoencode) b[f] = a.jgrid.htmlEncode(b[f])
                                }
                            });
                            if (o[0] === false) try {
                                var g = findPos(a("#" + d)[0]);
                                info_dialog(a.jgrid.errors.errcap, o[1], a.jgrid.edit.bClose, 
                                {
                                    left: g[0],
                                    top: g[1]
                                })
                            } catch(j) {
                                alert(o[1])
                            } else {
                                if (b) {
                                    var v;
                                    g = c.p.prmNames;
                                    v = g.oper;
                                    l = g.id;
                                    b[v] = g.editoper;
                                    b[l] = d;
                                    if (q) b = a.extend({},
                                    b, q)
                                }
                                if (i == "clientArray") {
                                    b = a.extend({},
                                    b, k);
                                    c.p.autoencode && a.each(b, 
                                    function(m, e) {
                                        b[m] = a.jgrid.htmlDecode(e)
                                    });
                                    l = a(c).jqGrid("setRowData", d, b);
                                    a(p).attr("editable", "0");
                                    for (g = 0; g < c.p.savedRow.length; g++) if (c.p.savedRow[g].id == d) {
                                        r = g;
                                        break
                                    }
                                    r >= 0 && c.p.savedRow.splice(r, 1);
                                    a.isFunction(n) && n(d, l)
                                } else {
                                    a("#lui_" + c.p.id).show();
                                    a.ajax(a.extend({
                                        url: i,
                                        data: a.isFunction(c.p.serializeRowData) ? 
                                        c.p.serializeRowData(b) : b,
                                        type: "POST",
                                        complete: function(m, e) {
                                            a("#lui_" + c.p.id).hide();
                                            if (e === "success") if ((a.isFunction(t) ? t(m) : true) === true) {
                                                c.p.autoencode && a.each(b, 
                                                function(x, w) {
                                                    b[x] = a.jgrid.htmlDecode(w)
                                                });
                                                b = a.extend({},
                                                b, k);
                                                a(c).jqGrid("setRowData", d, b);
                                                a(p).attr("editable", "0");
                                                for (e = 0; e < c.p.savedRow.length; e++) if (c.p.savedRow[e].id == d) {
                                                    r = e;
                                                    break
                                                }
                                                r >= 0 && c.p.savedRow.splice(r, 1);
                                                a.isFunction(n) && n(d, m)
                                            } else a(c).jqGrid("restoreRow", d, s)
                                        },
                                        error: function(m, e) {
                                            a("#lui_" + c.p.id).hide();
                                            a.isFunction(u) ? 
                                            u(d, m, e) : alert("Error Row: " + d + " Result: " + m.status + ":" + m.statusText + " Status: " + e)
                                        }
                                    },
                                    a.jgrid.ajaxOptions, c.p.ajaxRowOptions || {}))
                                }
                                a(p).unbind("keydown")
                            }
                        }
                    }
                }
            })
        },
        restoreRow: function(d, t) {
            return this.each(function() {
                var i = this,
                q,
                n,
                u = {};
                if (i.grid) {
                    n = a(i).jqGrid("getInd", d, true);
                    if (n != false) {
                        for (var s = 0; s < i.p.savedRow.length; s++) if (i.p.savedRow[s].id == d) {
                            q = s;
                            break
                        }
                        if (q >= 0) {
                            if (a.isFunction(a.fn.datepicker)) try {
                                a("input.hasDatepicker", "#" + n.id).datepicker("hide")
                            } catch(c) {}
                            a.each(i.p.colModel, 
                            function() {
                                if (this.editable == 
                                true && this.name in i.p.savedRow[q]) u[this.name] = i.p.savedRow[q][this.name]
                            });
                            a(i).jqGrid("setRowData", d, u);
                            a(n).attr("editable", "0").unbind("keydown");
                            i.p.savedRow.splice(q, 1)
                        }
                        a.isFunction(t) && t(d)
                    }
                }
            })
        }
    })
})(jQuery);
 (function(b) {
    b.jgrid.extend({
        editCell: function(d, e, a) {
            return this.each(function() {
                var c = this,
                h,
                f,
                g;
                if (! (!c.grid || c.p.cellEdit !== true)) {
                    e = parseInt(e, 10);
                    c.p.selrow = c.rows[d].id;
                    c.p.knv || b(c).jqGrid("GridNav");
                    if (c.p.savedRow.length > 0) {
                        if (a === true) if (d == c.p.iRow && e == c.p.iCol) return;
                        b(c).jqGrid("saveCell", c.p.savedRow[0].id, c.p.savedRow[0].ic)
                    } else window.setTimeout(function() {
                        b("#" + c.p.knv).attr("tabindex", "-1").focus()
                    },
                    0);
                    h = c.p.colModel[e].name;
                    if (! (h == "subgrid" || h == "cb" || h == "rn")) {
                        g = b("td:eq(" + e + 
                        ")", c.rows[d]);
                        if (c.p.colModel[e].editable === true && a === true && !g.hasClass("not-editable-cell")) {
                            if (parseInt(c.p.iCol) >= 0 && parseInt(c.p.iRow) >= 0) {
                                b("td:eq(" + c.p.iCol + ")", c.rows[c.p.iRow]).removeClass("edit-cell ui-state-highlight");
                                b(c.rows[c.p.iRow]).removeClass("selected-row ui-state-hover")
                            }
                            b(g).addClass("edit-cell ui-state-highlight");
                            b(c.rows[d]).addClass("selected-row ui-state-hover");
                            try {
                                f = b.unformat(g, {
                                    rowId: c.rows[d].id,
                                    colModel: c.p.colModel[e]
                                },
                                e)
                            } catch(k) {
                                f = b(g).html()
                            }
                            if (c.p.autoencode) f = 
                            b.jgrid.htmlDecode(f);
                            if (!c.p.colModel[e].edittype) c.p.colModel[e].edittype = "text";
                            c.p.savedRow.push({
                                id: d,
                                ic: e,
                                name: h,
                                v: f
                            });
                            if (b.isFunction(c.p.formatCell)) {
                                var j = c.p.formatCell(c.rows[d].id, h, f, d, e);
                                if (j != undefined) f = j
                            }
                            j = b.extend({},
                            c.p.colModel[e].editoptions || {},
                            {
                                id: d + "_" + h,
                                name: h
                            });
                            var i = createEl(c.p.colModel[e].edittype, j, f, true, b.extend({},
                            b.jgrid.ajaxOptions, c.p.ajaxSelectOptions || {}));
                            b.isFunction(c.p.beforeEditCell) && c.p.beforeEditCell(c.rows[d].id, h, f, d, e);
                            b(g).html("").append(i).attr("tabindex", 
                            "0");
                            window.setTimeout(function() {
                                b(i).focus()
                            },
                            0);
                            b("input, select, textarea", g).bind("keydown", 
                            function(l) {
                                if (l.keyCode === 27) if (b("input.hasDatepicker", g).length > 0) b(".ui-datepicker").is(":hidden") ? b(c).jqGrid("restoreCell", d, e) : b("input.hasDatepicker", g).datepicker("hide");
                                else b(c).jqGrid("restoreCell", d, e);
                                l.keyCode === 13 && b(c).jqGrid("saveCell", d, e);
                                if (l.keyCode == 9) if (c.grid.hDiv.loading) return false;
                                else l.shiftKey ? b(c).jqGrid("prevCell", d, e) : b(c).jqGrid("nextCell", d, e);
                                l.stopPropagation()
                            });
                            b.isFunction(c.p.afterEditCell) && c.p.afterEditCell(c.rows[d].id, h, f, d, e)
                        } else {
                            if (parseInt(c.p.iCol) >= 0 && parseInt(c.p.iRow) >= 0) {
                                b("td:eq(" + c.p.iCol + ")", c.rows[c.p.iRow]).removeClass("edit-cell ui-state-highlight");
                                b(c.rows[c.p.iRow]).removeClass("selected-row ui-state-hover")
                            }
                            g.addClass("edit-cell ui-state-highlight");
                            b(c.rows[d]).addClass("selected-row ui-state-hover");
                            if (b.isFunction(c.p.onSelectCell)) {
                                f = g.html().replace(/\&#160\;/ig, "");
                                c.p.onSelectCell(c.rows[d].id, h, f, d, e)
                            }
                        }
                        c.p.iCol = e;
                        c.p.iRow = 
                        d
                    }
                }
            })
        },
        saveCell: function(d, e) {
            return this.each(function() {
                var a = this,
                c;
                if (! (!a.grid || a.p.cellEdit !== true)) {
                    c = a.p.savedRow.length >= 1 ? 0: null;
                    if (c != null) {
                        var h = b("td:eq(" + e + ")", a.rows[d]),
                        f,
                        g,
                        k = a.p.colModel[e],
                        j = k.name,
                        i = b.jgrid.jqID(j);
                        switch (k.edittype) {
                        case "select":
                            if (k.editoptions.multiple) {
                                i = b("#" + d + "_" + i, a.rows[d]);
                                var l = [];
                                if (f = b(i).val()) f.join(",");
                                else f = "";
                                b("option:selected", i).each(function(m, p) {
                                    l[m] = b(p).text()
                                });
                                g = l.join(",")
                            } else {
                                f = b("#" + d + "_" + i + ">option:selected", a.rows[d]).val();
                                g = 
                                b("#" + d + "_" + i + ">option:selected", a.rows[d]).text()
                            }
                            if (k.formatter) g = f;
                            break;
                        case "checkbox":
                            var n = ["Yes", "No"];
                            if (k.editoptions) n = k.editoptions.value.split(":");
                            g = f = b("#" + d + "_" + i, a.rows[d]).attr("checked") ? n[0] : n[1];
                            break;
                        case "password":
                        case "text":
                        case "textarea":
                        case "button":
                            g = f = b("#" + d + "_" + i, a.rows[d]).val();
                            break;
                        case "custom":
                            try {
                                if (k.editoptions && b.isFunction(k.editoptions.custom_value)) {
                                    f = k.editoptions.custom_value(b(".customelement", h), "get");
                                    if (f === undefined) throw "e2";
                                    else g = f
                                } else throw "e1";

                            } catch(q) {
                                q == "e1" && info_dialog(jQuery.jgrid.errors.errcap, "function 'custom_value' " + b.jgrid.edit.msg.nodefined, jQuery.jgrid.edit.bClose);
                                q == "e2" ? info_dialog(jQuery.jgrid.errors.errcap, "function 'custom_value' " + b.jgrid.edit.msg.novalue, jQuery.jgrid.edit.bClose) : info_dialog(jQuery.jgrid.errors.errcap, q.message, jQuery.jgrid.edit.bClose)
                            }
                            break
                        }
                        if (g != a.p.savedRow[c].v) {
                            if (b.isFunction(a.p.beforeSaveCell)) if (c = a.p.beforeSaveCell(a.rows[d].id, j, f, d, e)) f = c;
                            var r = checkValues(f, e, a);
                            if (r[0] === true) {
                                c = {};
                                if (b.isFunction(a.p.beforeSubmitCell))(c = a.p.beforeSubmitCell(a.rows[d].id, j, f, d, e)) || (c = {});
                                if (g == "") g = " ";
                                b("input.hasDatepicker", h).length > 0 && b("input.hasDatepicker", h).datepicker("hide");
                                if (a.p.cellsubmit == "remote") if (a.p.cellurl) {
                                    var o = {};
                                    if (a.p.autoencode) f = b.jgrid.htmlEncode(f);
                                    o[j] = f;
                                    n = a.p.prmNames;
                                    k = n.id;
                                    i = n.oper;
                                    o[k] = a.rows[d].id;
                                    o[i] = n.editoper;
                                    o = b.extend(c, o);
                                    b("#lui_" + a.p.id).show();
                                    a.grid.hDiv.loading = true;
                                    b.ajax(b.extend({
                                        url: a.p.cellurl,
                                        data: b.isFunction(a.p.serializeCellData) ? a.p.serializeCellData(o) : 
                                        o,
                                        type: "POST",
                                        complete: function(m, p) {
                                            b("#lui_" + a.p.id).hide();
                                            a.grid.hDiv.loading = false;
                                            if (p == "success") if (b.isFunction(a.p.afterSubmitCell)) {
                                                m = a.p.afterSubmitCell(m, o.id, j, f, d, e);
                                                if (m[0] === true) {
                                                    b(h).empty();
                                                    b(a).jqGrid("setCell", a.rows[d].id, e, g);
                                                    b(h).addClass("dirty-cell");
                                                    b(a.rows[d]).addClass("edited");
                                                    b.isFunction(a.p.afterSaveCell) && a.p.afterSaveCell(a.rows[d].id, j, f, d, e);
                                                    a.p.savedRow.splice(0, 1)
                                                } else {
                                                    info_dialog(b.jgrid.errors.errcap, m[1], b.jgrid.edit.bClose);
                                                    b(a).jqGrid("restoreCell", d, e)
                                                }
                                            } else {
                                                b(h).empty();
                                                b(a).jqGrid("setCell", a.rows[d].id, e, g);
                                                b(h).addClass("dirty-cell");
                                                b(a.rows[d]).addClass("edited");
                                                b.isFunction(a.p.afterSaveCell) && a.p.afterSaveCell(a.rows[d].id, j, f, d, e);
                                                a.p.savedRow.splice(0, 1)
                                            }
                                        },
                                        error: function(m, p) {
                                            b("#lui_" + a.p.id).hide();
                                            a.grid.hDiv.loading = false;
                                            b.isFunction(a.p.errorCell) ? a.p.errorCell(m, p) : info_dialog(b.jgrid.errors.errcap, m.status + " : " + m.statusText + "<br/>" + p, b.jgrid.edit.bClose);
                                            b(a).jqGrid("restoreCell", d, e)
                                        }
                                    },
                                    b.jgrid.ajaxOptions, a.p.ajaxCellOptions || {}))
                                } else try {
                                    info_dialog(b.jgrid.errors.errcap, 
                                    b.jgrid.errors.nourl, b.jgrid.edit.bClose);
                                    b(a).jqGrid("restoreCell", d, e)
                                } catch(s) {}
                                if (a.p.cellsubmit == "clientArray") {
                                    b(h).empty();
                                    b(a).jqGrid("setCell", a.rows[d].id, e, g);
                                    b(h).addClass("dirty-cell");
                                    b(a.rows[d]).addClass("edited");
                                    b.isFunction(a.p.afterSaveCell) && a.p.afterSaveCell(a.rows[d].id, j, f, d, e);
                                    a.p.savedRow.splice(0, 1)
                                }
                            } else try {
                                window.setTimeout(function() {
                                    info_dialog(b.jgrid.errors.errcap, f + " " + r[1], b.jgrid.edit.bClose)
                                },
                                100);
                                b(a).jqGrid("restoreCell", d, e)
                            } catch(t) {}
                        } else b(a).jqGrid("restoreCell", 
                        d, e)
                    }
                    b.browser.opera ? b("#" + a.p.knv).attr("tabindex", "-1").focus() : window.setTimeout(function() {
                        b("#" + a.p.knv).attr("tabindex", "-1").focus()
                    },
                    0)
                }
            })
        },
        restoreCell: function(d, e) {
            return this.each(function() {
                var a = this,
                c;
                if (! (!a.grid || a.p.cellEdit !== true)) {
                    c = a.p.savedRow.length >= 1 ? 0: null;
                    if (c != null) {
                        var h = b("td:eq(" + e + ")", a.rows[d]);
                        if (b.isFunction(b.fn.datepicker)) try {
                            b("input.hasDatepicker", h).datepicker("hide")
                        } catch(f) {}
                        b(h).empty().attr("tabindex", "-1");
                        b(a).jqGrid("setCell", a.rows[d].id, e, a.p.savedRow[c].v);
                        a.p.savedRow.splice(0, 1)
                    }
                    window.setTimeout(function() {
                        b("#" + a.p.knv).attr("tabindex", "-1").focus()
                    },
                    0)
                }
            })
        },
        nextCell: function(d, e) {
            return this.each(function() {
                var a = this,
                c = false;
                if (! (!a.grid || a.p.cellEdit !== true)) {
                    for (var h = e + 1; h < a.p.colModel.length; h++) if (a.p.colModel[h].editable === true) {
                        c = h;
                        break
                    }
                    if (c !== false) b(a).jqGrid("editCell", d, c, true);
                    else a.p.savedRow.length > 0 && b(a).jqGrid("saveCell", d, e)
                }
            })
        },
        prevCell: function(d, e) {
            return this.each(function() {
                var a = this,
                c = false;
                if (! (!a.grid || a.p.cellEdit !== 
                true)) {
                    for (var h = e - 1; h >= 0; h--) if (a.p.colModel[h].editable === true) {
                        c = h;
                        break
                    }
                    if (c !== false) b(a).jqGrid("editCell", d, c, true);
                    else a.p.savedRow.length > 0 && b(a).jqGrid("saveCell", d, e)
                }
            })
        },
        GridNav: function() {
            return this.each(function() {
                function d(g, k, j) {
                    if (j.substr(0, 1) == "v") {
                        var i = b(a.grid.bDiv)[0].clientHeight,
                        l = b(a.grid.bDiv)[0].scrollTop,
                        n = a.rows[g].offsetTop + a.rows[g].clientHeight,
                        q = a.rows[g].offsetTop;
                        if (j == "vd") if (n >= i) b(a.grid.bDiv)[0].scrollTop = b(a.grid.bDiv)[0].scrollTop + a.rows[g].clientHeight;
                        if (j == "vu") if (q < l) b(a.grid.bDiv)[0].scrollTop = b(a.grid.bDiv)[0].scrollTop - a.rows[g].clientHeight
                    }
                    if (j == "h") {
                        j = b(a.grid.bDiv)[0].clientWidth;
                        i = b(a.grid.bDiv)[0].scrollLeft;
                        l = a.rows[g].cells[k].offsetLeft;
                        if (a.rows[g].cells[k].offsetLeft + a.rows[g].cells[k].clientWidth >= j + parseInt(i)) b(a.grid.bDiv)[0].scrollLeft = b(a.grid.bDiv)[0].scrollLeft + a.rows[g].cells[k].clientWidth;
                        else if (l < i) b(a.grid.bDiv)[0].scrollLeft = b(a.grid.bDiv)[0].scrollLeft - a.rows[g].cells[k].clientWidth
                    }
                }
                function e(g, k) {
                    var j,
                    i;
                    if (k == 
                    "lft") {
                        j = g + 1;
                        for (i = g; i >= 0; i--) if (a.p.colModel[i].hidden !== true) {
                            j = i;
                            break
                        }
                    }
                    if (k == "rgt") {
                        j = g - 1;
                        for (i = g; i < a.p.colModel.length; i++) if (a.p.colModel[i].hidden !== true) {
                            j = i;
                            break
                        }
                    }
                    return j
                }
                var a = this;
                if (! (!a.grid || a.p.cellEdit !== true)) {
                    a.p.knv = a.p.id + "_kn";
                    var c = b("<span style='width:0px;height:0px;background-color:black;' tabindex='0'><span tabindex='-1' style='width:0px;height:0px;background-color:grey' id='" + a.p.knv + "'></span></span>"),
                    h,
                    f;
                    b(c).insertBefore(a.grid.cDiv);
                    b("#" + a.p.knv).focus().keydown(function(g) {
                        f = 
                        g.keyCode;
                        if (a.p.direction == "rtl") if (f == 37) f = 39;
                        else if (f == 39) f = 37;
                        switch (f) {
                        case 38:
                            if (a.p.iRow - 1 >= 0) {
                                d(a.p.iRow - 1, a.p.iCol, "vu");
                                b(a).jqGrid("editCell", a.p.iRow - 1, a.p.iCol, false)
                            }
                            break;
                        case 40:
                            if (a.p.iRow + 1 <= a.rows.length - 1) {
                                d(a.p.iRow + 1, a.p.iCol, "vd");
                                b(a).jqGrid("editCell", a.p.iRow + 1, a.p.iCol, false)
                            }
                            break;
                        case 37:
                            if (a.p.iCol - 1 >= 0) {
                                h = e(a.p.iCol - 1, "lft");
                                d(a.p.iRow, h, "h");
                                b(a).jqGrid("editCell", a.p.iRow, h, false)
                            }
                            break;
                        case 39:
                            if (a.p.iCol + 1 <= a.p.colModel.length - 1) {
                                h = e(a.p.iCol + 1, "rgt");
                                d(a.p.iRow, 
                                h, "h");
                                b(a).jqGrid("editCell", a.p.iRow, h, false)
                            }
                            break;
                        case 13:
                            parseInt(a.p.iCol, 10) >= 0 && parseInt(a.p.iRow, 10) >= 0 && b(a).jqGrid("editCell", a.p.iRow, a.p.iCol, true);
                            break
                        }
                        return false
                    })
                }
            })
        },
        getChangedCells: function(d) {
            var e = [];
            d || (d = "all");
            this.each(function() {
                var a = this,
                c; ! a.grid || a.p.cellEdit !== true || b(a.rows).each(function(h) {
                    var f = {};
                    if (b(this).hasClass("edited")) {
                        b("td", this).each(function(g) {
                            c = a.p.colModel[g].name;
                            if (c !== "cb" && c !== "subgrid") if (d == "dirty") {
                                if (b(this).hasClass("dirty-cell")) try {
                                    f[c] = 
                                    b.unformat(this, {
                                        rowId: a.rows[h].id,
                                        colModel: a.p.colModel[g]
                                    },
                                    g)
                                } catch(k) {
                                    f[c] = b.jgrid.htmlDecode(b(this).html())
                                }
                            } else try {
                                f[c] = b.unformat(this, {
                                    rowId: a.rows[h].id,
                                    colModel: a.p.colModel[g]
                                },
                                g)
                            } catch(j) {
                                f[c] = b.jgrid.htmlDecode(b(this).html())
                            }
                        });
                        f.id = this.id;
                        e.push(f)
                    }
                })
            });
            return e
        }
    })
})(jQuery);
 (function(b) {
    b.fn.jqm = function(a) {
        var f = {
            overlay: 50,
            closeoverlay: true,
            overlayClass: "jqmOverlay",
            closeClass: "jqmClose",
            trigger: ".jqModal",
            ajax: e,
            ajaxText: "",
            target: e,
            modal: e,
            toTop: e,
            onShow: e,
            onHide: e,
            onLoad: e
        };
        return this.each(function() {
            if (this._jqm) return i[this._jqm].c = b.extend({},
            i[this._jqm].c, a);
            l++;
            this._jqm = l;
            i[l] = {
                c: b.extend(f, b.jqm.params, a),
                a: e,
                w: b(this).addClass("jqmID" + l),
                s: l
            };
            f.trigger && b(this).jqmAddTrigger(f.trigger)
        })
    };
    b.fn.jqmAddClose = function(a) {
        return o(this, a, "jqmHide")
    };
    b.fn.jqmAddTrigger = 
    function(a) {
        return o(this, a, "jqmShow")
    };
    b.fn.jqmShow = function(a) {
        return this.each(function() {
            b.jqm.open(this._jqm, a)
        })
    };
    b.fn.jqmHide = function(a) {
        return this.each(function() {
            b.jqm.close(this._jqm, a)
        })
    };
    b.jqm = {
        hash: {},
        open: function(a, f) {
            var c = i[a],
            d = c.c,
            h = "." + d.closeClass,
            g = parseInt(c.w.css("z-index"));
            g = g > 0 ? g: 3E3;
            var j = b("<div></div>").css({
                height: "100%",
                width: "100%",
                position: "fixed",
                left: 0,
                top: 0,
                "z-index": g - 1,
                opacity: d.overlay / 100
            });
            if (c.a) return e;
            c.t = f;
            c.a = true;
            c.w.css("z-index", g);
            if (d.modal) {
                k[0] || 
                setTimeout(function() {
                    p("bind")
                },
                1);
                k.push(a)
            } else if (d.overlay > 0) d.closeoverlay && c.w.jqmAddClose(j);
            else j = e;
            c.o = j ? j.addClass(d.overlayClass).prependTo("body") : e;
            if (q) {
                b("html,body").css({
                    height: "100%",
                    width: "100%"
                });
                if (j) {
                    j = j.css({
                        position: "absolute"
                    })[0];
                    for (var m in {
                        Top: 1,
                        Left: 1
                    }) j.style.setExpression(m.toLowerCase(), "(_=(document.documentElement.scroll" + m + " || document.body.scroll" + m + "))+'px'")
                }
            }
            if (d.ajax) {
                a = d.target || c.w;
                g = d.ajax;
                a = typeof a == "string" ? b(a, c.w) : b(a);
                g = g.substr(0, 1) == "@" ? b(f).attr(g.substring(1)) : 
                g;
                a.html(d.ajaxText).load(g, 
                function() {
                    d.onLoad && d.onLoad.call(this, c);
                    h && c.w.jqmAddClose(b(h, c.w));
                    r(c)
                })
            } else h && c.w.jqmAddClose(b(h, c.w));
            d.toTop && c.o && c.w.before('<span id="jqmP' + c.w[0]._jqm + '"></span>').insertAfter(c.o);
            d.onShow ? d.onShow(c) : c.w.show();
            r(c);
            return e
        },
        close: function(a) {
            a = i[a];
            if (!a.a) return e;
            a.a = e;
            if (k[0]) {
                k.pop();
                k[0] || p("unbind")
            }
            a.c.toTop && a.o && b("#jqmP" + a.w[0]._jqm).after(a.w).remove();
            if (a.c.onHide) a.c.onHide(a);
            else {
                a.w.hide();
                a.o && a.o.remove()
            }
            return e
        },
        params: {}
    };
    var l = 
    0,
    i = b.jqm.hash,
    k = [],
    q = b.browser.msie && b.browser.version == "6.0",
    e = false,
    r = function(a) {
        var f = b('<iframe src="javascript:false;document.write(\'\');" class="jqm"></iframe>').css({
            opacity: 0
        });
        if (q) if (a.o) a.o.html('<p style="width:100%;height:100%"/>').prepend(f);
        else b("iframe.jqm", a.w)[0] || a.w.prepend(f);
        s(a)
    },
    s = function(a) {
        try {
            b(":input:visible", a.w)[0].focus()
        } catch(f) {}
    },
    p = function(a) {
        b(document)[a]("keypress", n)[a]("keydown", n)[a]("mousedown", n)
    },
    n = function(a) {
        var f = i[k[k.length - 1]]; (a = !b(a.target).parents(".jqmID" + 
        f.s)[0]) && s(f);
        return ! a
    },
    o = function(a, f, c) {
        return a.each(function() {
            var d = this._jqm;
            b(f).each(function() {
                if (!this[c]) {
                    this[c] = [];
                    b(this).click(function() {
                        for (var h in {
                            jqmShow: 1,
                            jqmHide: 1
                        }) for (var g in this[h]) i[this[h][g]] && i[this[h][g]].w[h](this);
                        return e
                    })
                }
                this[c].push(d)
            })
        })
    }
})(jQuery);
 (function(b) {
    b.fn.jqDrag = function(a) {
        return l(this, a, "d")
    };
    b.fn.jqResize = function(a, e) {
        return l(this, a, "r", e)
    };
    b.jqDnR = {
        dnr: {},
        e: 0,
        drag: function(a) {
            if (c.k == "d") d.css({
                left: c.X + a.pageX - c.pX,
                top: c.Y + a.pageY - c.pY
            });
            else {
                d.css({
                    width: Math.max(a.pageX - c.pX + c.W, 0),
                    height: Math.max(a.pageY - c.pY + c.H, 0)
                });
                M1 && f.css({
                    width: Math.max(a.pageX - M1.pX + M1.W, 0),
                    height: Math.max(a.pageY - M1.pY + M1.H, 0)
                })
            }
            return false
        },
        stop: function() {
            b(document).unbind("mousemove", i.drag).unbind("mouseup", i.stop)
        }
    };
    var i = b.jqDnR,
    c = i.dnr,
    d = i.e,
    f,
    l = function(a, e, n, m) {
        return a.each(function() {
            e = e ? b(e, a) : a;
            e.bind("mousedown", {
                e: a,
                k: n
            },
            function(g) {
                var j = g.data,
                h = {};
                d = j.e;
                f = m ? b(m) : false;
                if (d.css("position") != "relative") try {
                    d.position(h)
                } catch(o) {}
                c = {
                    X: h.left || k("left") || 0,
                    Y: h.top || k("top") || 0,
                    W: k("width") || d[0].scrollWidth || 0,
                    H: k("height") || d[0].scrollHeight || 0,
                    pX: g.pageX,
                    pY: g.pageY,
                    k: j.k
                };
                M1 = f && j.k != "d" ? {
                    X: h.left || f1("left") || 0,
                    Y: h.top || f1("top") || 0,
                    W: f[0].offsetWidth || f1("width") || 0,
                    H: f[0].offsetHeight || f1("height") || 0,
                    pX: g.pageX,
                    pY: g.pageY,
                    k: j.k
                }: false;
                b(document).mousemove(b.jqDnR.drag).mouseup(b.jqDnR.stop);
                return false
            })
        })
    },
    k = function(a) {
        return parseInt(d.css(a)) || false
    };
    f1 = function(a) {
        return parseInt(f.css(a)) || false
    }
})(jQuery);
 (function(a) {
    a.jgrid.extend({
        setSubGrid: function() {
            return this.each(function() {
                var d = this;
                d.p.colNames.unshift("");
                d.p.colModel.unshift({
                    name: "subgrid",
                    width: a.browser.safari ? d.p.subGridWidth + d.p.cellLayout: d.p.subGridWidth,
                    sortable: false,
                    resizable: false,
                    hidedlg: true,
                    search: false,
                    fixed: true
                });
                d = d.p.subGridModel;
                if (d[0]) {
                    d[0].align = a.extend([], d[0].align || []);
                    for (i = 0; i < d[0].name.length; i++) d[0].align[i] = d[0].align[i] || "left"
                }
            })
        },
        addSubGridCell: function(d, e) {
            var b = "",
            o;
            this.each(function() {
                b = this.formatCol(d, 
                e);
                o = this.p.gridview
            });
            return o === false ? "<td role='grid' class='ui-sgcollapsed sgcollapsed' " + b + "><a href='javascript:void(0);'><span class='ui-icon ui-icon-plus'></span></a></td>": "<td role='grid' " + b + "></td>"
        },
        addSubGrid: function(d, e) {
            return this.each(function() {
                var b = this;
                if (b.grid) {
                    var o,
                    n,
                    q,
                    u,
                    t,
                    v,
                    p;
                    a("td:eq(" + e + ")", d).click(function() {
                        if (a(this).hasClass("sgcollapsed")) {
                            q = b.p.id;
                            o = a(this).parent();
                            u = e >= 1 ? "<td colspan='" + e + "'>&#160;</td>": "";
                            n = a(o).attr("id");
                            p = true;
                            if (a.isFunction(b.p.subGridBeforeExpand)) p = 
                            b.p.subGridBeforeExpand(q + "_" + n, n);
                            if (p === false) return false;
                            t = 0;
                            a.each(b.p.colModel, 
                            function() {
                                if (this.hidden === true || this.name == "rn" || this.name == "cb") t++
                            });
                            v = "<tr role='row' class='ui-subgrid'>" + u + "<td class='ui-widget-content subgrid-cell'><span class='ui-icon ui-icon-carat-1-sw'/></td><td colspan='" + parseInt(b.p.colNames.length - 1 - t) + "' class='ui-widget-content subgrid-data'><div id=" + q + "_" + n + " class='tablediv'>";
                            a(this).parent().after(v + "</div></td></tr>");
                            a.isFunction(b.p.subGridRowExpanded) ? 
                            b.p.subGridRowExpanded(q + "_" + n, n) : y(o);
                            a(this).html("<a href='javascript:void(0);'><span class='ui-icon ui-icon-minus'></span></a>").removeClass("sgcollapsed").addClass("sgexpanded")
                        } else if (a(this).hasClass("sgexpanded")) {
                            p = true;
                            if (a.isFunction(b.p.subGridRowColapsed)) {
                                o = a(this).parent();
                                n = a(o).attr("id");
                                p = b.p.subGridRowColapsed(q + "_" + n, n)
                            }
                            if (p === false) return false;
                            a(this).parent().next().remove(".ui-subgrid");
                            a(this).html("<a href='javascript:void(0);'><span class='ui-icon ui-icon-plus'></span></a>").removeClass("sgexpanded").addClass("sgcollapsed")
                        }
                        return false
                    });
                    var y = function(g) {
                        var j,
                        f,
                        c,
                        h;
                        j = a(g).attr("id");
                        f = {
                            nd_: (new Date).getTime()
                        };
                        f[b.p.idName] = j;
                        if (!b.p.subGridModel[0]) return false;
                        if (b.p.subGridModel[0].params) for (h = 0; h < b.p.subGridModel[0].params.length; h++) for (c = 0; c < b.p.colModel.length; c++) if (b.p.colModel[c].name == b.p.subGridModel[0].params[h]) f[b.p.colModel[c].name] = a("td:eq(" + c + ")", g).text().replace(/\&#160\;/ig, "");
                        if (!b.grid.hDiv.loading) {
                            b.grid.hDiv.loading = true;
                            a("#load_" + b.p.id).show();
                            if (!b.p.subgridtype) b.p.subgridtype = b.p.datatype;
                            if (a.isFunction(b.p.subgridtype)) b.p.subgridtype(f);
                            else b.p.subgridtype = b.p.subgridtype.toLowerCase();
                            switch (b.p.subgridtype) {
                            case "xml":
                            case "json":
                                a.ajax(a.extend({
                                    type:
                                    b.p.mtype,
                                    url: b.p.subGridUrl,
                                    dataType: b.p.subgridtype,
                                    data: a.isFunction(b.p.serializeSubGridData) ? b.p.serializeSubGridData(f) : f,
                                    complete: function(m) {
                                        b.p.subgridtype == "xml" ? w(m.responseXML, j) : x(a.jgrid.parse(m.responseText), j)
                                    }
                                },
                                a.jgrid.ajaxOptions, b.p.ajaxSubgridOptions || {}));
                                break
                            }
                        }
                        return false
                    },
                    s = function(g, j, f) {
                        j = a("<td align='" + b.p.subGridModel[0].align[f] + "'></td>").html(j);
                        a(g).append(j)
                    },
                    w = function(g, j) {
                        var f,
                        c,
                        h,
                        m = a("<table cellspacing='0' cellpadding='0' border='0'><tbody></tbody></table>"),
                        k = a("<tr></tr>");
                        for (c = 0; c < b.p.subGridModel[0].name.length; c++) {
                            f = a("<th class='ui-state-default ui-th-subgrid ui-th-column ui-th-" + b.p.direction + "'></th>");
                            a(f).html(b.p.subGridModel[0].name[c]);
                            a(f).width(b.p.subGridModel[0].width[c]);
                            a(k).append(f)
                        }
                        a(m).append(k);
                        if (g) {
                            h = b.p.xmlReader.subgrid;
                            a(h.root + " " + h.row, g).each(function() {
                                k = a("<tr class='ui-widget-content ui-subtblcell'></tr>");
                                if (h.repeatitems === true) a(h.cell, this).each(function(r) {
                                    s(k, a(this).text() || "&#160;", r)
                                });
                                else {
                                    var l = b.p.subGridModel[0].mapping || b.p.subGridModel[0].name;
                                    if (l) for (c = 0; c < l.length; c++) s(k, a(l[c], this).text() || "&#160;", c)
                                }
                                a(m).append(k)
                            })
                        }
                        g = a("table:first", b.grid.bDiv).attr("id") + "_";
                        a("#" + g + j).append(m);
                        b.grid.hDiv.loading = false;
                        a("#load_" + b.p.id).hide();
                        return false
                    },
                    x = function(g, j) {
                        var f,
                        c,
                        h,
                        m = a("<table cellspacing='0' cellpadding='0' border='0'><tbody></tbody></table>"),
                        k = a("<tr></tr>");
                        for (c = 0; c < 
                        b.p.subGridModel[0].name.length; c++) {
                            f = a("<th class='ui-state-default ui-th-subgrid ui-th-column ui-th-" + b.p.direction + "'></th>");
                            a(f).html(b.p.subGridModel[0].name[c]);
                            a(f).width(b.p.subGridModel[0].width[c]);
                            a(k).append(f)
                        }
                        a(m).append(k);
                        if (g) {
                            f = b.p.jsonReader.subgrid;
                            g = g[f.root];
                            if (typeof g !== "undefined") for (c = 0; c < g.length; c++) {
                                h = g[c];
                                k = a("<tr class='ui-widget-content ui-subtblcell'></tr>");
                                if (f.repeatitems === true) {
                                    if (f.cell) h = h[f.cell];
                                    for (var l = 0; l < h.length; l++) s(k, h[l] || "&#160;", l)
                                } else {
                                    var r = 
                                    b.p.subGridModel[0].mapping || b.p.subGridModel[0].name;
                                    if (r.length) for (l = 0; l < r.length; l++) s(k, h[r[l]] || "&#160;", l)
                                }
                                a(m).append(k)
                            }
                        }
                        c = a("table:first", b.grid.bDiv).attr("id") + "_";
                        a("#" + c + j).append(m);
                        b.grid.hDiv.loading = false;
                        a("#load_" + b.p.id).hide();
                        return false
                    };
                    b.subGridXml = function(g, j) {
                        w(g, j)
                    };
                    b.subGridJson = function(g, j) {
                        x(g, j)
                    }
                }
            })
        },
        expandSubGridRow: function(d) {
            return this.each(function() {
                var e = this;
                if (e.grid || d) if (e.p.subGrid === true) if (e = a(this).jqGrid("getInd", d, true))(e = a("td.sgcollapsed", e)[0]) && 
                a(e).trigger("click")
            })
        },
        collapseSubGridRow: function(d) {
            return this.each(function() {
                var e = this;
                if (e.grid || d) if (e.p.subGrid === true) if (e = a(this).jqGrid("getInd", d, true))(e = a("td.sgexpanded", e)[0]) && a(e).trigger("click")
            })
        },
        toggleSubGridRow: function(d) {
            return this.each(function() {
                var e = this;
                if (e.grid || d) if (e.p.subGrid === true) if (e = a(this).jqGrid("getInd", d, true)) {
                    var b = a("td.sgcollapsed", e)[0];
                    if (b) a(b).trigger("click");
                    else(b = a("td.sgexpanded", e)[0]) && a(b).trigger("click")
                }
            })
        }
    })
})(jQuery);
 (function(d) {
    d.jgrid.extend({
        setTreeNode: function(a, c) {
            return this.each(function() {
                var b = this;
                if (b.grid && b.p.treeGrid) {
                    var e = b.p.expColInd,
                    f = b.p.treeReader.expanded_field,
                    i = b.p.treeReader.leaf_field,
                    j = b.p.treeReader.level_field;
                    c.level = a[j];
                    if (b.p.treeGridModel == "nested") {
                        c.lft = a[b.p.treeReader.left_field];
                        c.rgt = a[b.p.treeReader.right_field];
                        a[i] || (a[i] = parseInt(c.rgt, 10) === parseInt(c.lft, 10) + 1 ? "true": "false")
                    } else c.parent_id = a[b.p.treeReader.parent_id_field];
                    var k = parseInt(c.level, 10),
                    h;
                    if (b.p.tree_root_level === 
                    0) {
                        h = k + 1;
                        k = k
                    } else {
                        h = k;
                        k = k - 1
                    }
                    h = "<div class='tree-wrap tree-wrap-" + b.p.direction + "' style='width:" + h * 18 + "px;'>";
                    h += "<div style='" + (b.p.direction == "rtl" ? "right:": "left:") + k * 18 + "px;' class='ui-icon ";
                    if (a[i] == "true" || a[i] == true) {
                        h += b.p.treeIcons.leaf + " tree-leaf'";
                        c.isLeaf = true
                    } else {
                        if (a[f] == "true" || a[f] == true) {
                            h += b.p.treeIcons.minus + " tree-minus treeclick'";
                            c.expanded = true
                        } else {
                            h += b.p.treeIcons.plus + " tree-plus treeclick'";
                            c.expanded = false
                        }
                        c.isLeaf = false
                    }
                    h += "</div></div>";
                    if (parseInt(a[j], 10) !== parseInt(b.p.tree_root_level, 
                    10)) d(b).jqGrid("isVisibleNode", c) || d(c).css("display", "none");
                    d("td:eq(" + e + ")", c).wrapInner("<span></span>").prepend(h);
                    d(".treeclick", c).bind("click", 
                    function(g) {
                        g = d(g.target || g.srcElement, b.rows).parents("tr.jqgrow")[0].rowIndex;
                        if (!b.rows[g].isLeaf) if (b.rows[g].expanded) {
                            d(b).jqGrid("collapseRow", b.rows[g]);
                            d(b).jqGrid("collapseNode", b.rows[g])
                        } else {
                            d(b).jqGrid("expandRow", b.rows[g]);
                            d(b).jqGrid("expandNode", b.rows[g])
                        }
                        return false
                    });
                    b.p.ExpandColClick === true && d("span", c).css("cursor", "pointer").bind("click", 
                    function(g) {
                        g = d(g.target || g.srcElement, b.rows).parents("tr.jqgrow")[0].rowIndex;
                        if (!b.rows[g].isLeaf) if (b.rows[g].expanded) {
                            d(b).jqGrid("collapseRow", b.rows[g]);
                            d(b).jqGrid("collapseNode", b.rows[g])
                        } else {
                            d(b).jqGrid("expandRow", b.rows[g]);
                            d(b).jqGrid("expandNode", b.rows[g])
                        }
                        d(b).jqGrid("setSelection", b.rows[g].id);
                        return false
                    })
                }
            })
        },
        setTreeGrid: function() {
            return this.each(function() {
                var a = this,
                c = 0;
                if (a.p.treeGrid) {
                    a.p.treedatatype || d.extend(a.p, {
                        treedatatype: a.p.datatype
                    });
                    a.p.subGrid = false;
                    a.p.altRows = 
                    false;
                    a.p.pgbuttons = false;
                    a.p.pginput = false;
                    a.p.multiselect = false;
                    a.p.rowList = [];
                    a.p.treeIcons = d.extend({
                        plus: "ui-icon-triangle-1-" + (a.p.direction == "rtl" ? "w": "e"),
                        minus: "ui-icon-triangle-1-s",
                        leaf: "ui-icon-radio-off"
                    },
                    a.p.treeIcons || {});
                    if (a.p.treeGridModel == "nested") a.p.treeReader = d.extend({
                        level_field: "level",
                        left_field: "lft",
                        right_field: "rgt",
                        leaf_field: "isLeaf",
                        expanded_field: "expanded"
                    },
                    a.p.treeReader);
                    else if (a.p.treeGridModel == "adjacency") a.p.treeReader = d.extend({
                        level_field: "level",
                        parent_id_field: "parent",
                        leaf_field: "isLeaf",
                        expanded_field: "expanded"
                    },
                    a.p.treeReader);
                    for (var b in a.p.colModel) {
                        if (a.p.colModel[b].name == a.p.ExpandColumn) {
                            a.p.expColInd = c;
                            break
                        }
                        c++
                    }
                    if (!a.p.expColInd) a.p.expColInd = 0;
                    d.each(a.p.treeReader, 
                    function(e, f) {
                        if (f) {
                            a.p.colNames.push(f);
                            a.p.colModel.push({
                                name: f,
                                width: 1,
                                hidden: true,
                                sortable: false,
                                resizable: false,
                                hidedlg: true,
                                editable: true,
                                search: false
                            })
                        }
                    })
                }
            })
        },
        expandRow: function(a) {
            this.each(function() {
                var c = this;
                if (c.grid && c.p.treeGrid) {
                    var b = d(c).jqGrid("getNodeChildren", a);
                    d(b).each(function() {
                        d(this).css("display", 
                        "");
                        this.expanded && d(c).jqGrid("expandRow", this)
                    })
                }
            })
        },
        collapseRow: function(a) {
            this.each(function() {
                var c = this;
                if (c.grid && c.p.treeGrid) {
                    var b = d(c).jqGrid("getNodeChildren", a);
                    d(b).each(function() {
                        d(this).css("display", "none");
                        this.expanded && d(c).jqGrid("collapseRow", this)
                    })
                }
            })
        },
        getRootNodes: function() {
            var a = [];
            this.each(function() {
                var c = this;
                if (c.grid && c.p.treeGrid) switch (c.p.treeGridModel) {
                case "nested":
                    var b = c.p.treeReader.level_field;
                    d(c.rows).each(function() {
                        parseInt(this[b], 10) === parseInt(c.p.tree_root_level, 
                        10) && a.push(this)
                    });
                    break;
                case "adjacency":
                    d(c.rows).each(function() {
                        if (this.parent_id == null || this.parent_id.toLowerCase() == "null") a.push(this)
                    });
                    break
                }
            });
            return a
        },
        getNodeDepth: function(a) {
            var c = null;
            this.each(function() {
                var b = this;
                if (this.grid && this.p.treeGrid) switch (b.p.treeGridModel) {
                case "nested":
                    c = parseInt(a.level, 10) - parseInt(this.p.tree_root_level, 10);
                    break;
                case "adjacency":
                    c = d(b).jqGrid("getNodeAncestors", a).length;
                    break
                }
            });
            return c
        },
        getNodeParent: function(a) {
            var c = null;
            this.each(function() {
                var b = 
                this;
                if (b.grid && b.p.treeGrid) switch (b.p.treeGridModel) {
                case "nested":
                    var e = parseInt(a.lft, 10),
                    f = parseInt(a.rgt, 10),
                    i = parseInt(a.level, 10);
                    d(this.rows).each(function() {
                        if (parseInt(this.level, 10) === i - 1 && parseInt(this.lft) < e && parseInt(this.rgt) > f) {
                            c = this;
                            return false
                        }
                    });
                    break;
                case "adjacency":
                    d(this.rows).each(function() {
                        if (this.id == a.parent_id) {
                            c = this;
                            return false
                        }
                    });
                    break
                }
            });
            return c
        },
        getNodeChildren: function(a) {
            var c = [];
            this.each(function() {
                var b = this;
                if (b.grid && b.p.treeGrid) switch (b.p.treeGridModel) {
                case "nested":
                    var e = 
                    parseInt(a.lft, 10),
                    f = parseInt(a.rgt, 10),
                    i = parseInt(a.level, 10);
                    d(this.rows).each(function() {
                        parseInt(this.level, 10) === i + 1 && parseInt(this.lft, 10) > e && parseInt(this.rgt, 10) < f && c.push(this)
                    });
                    break;
                case "adjacency":
                    d(this.rows).each(function() {
                        this.parent_id == a.id && c.push(this)
                    });
                    break
                }
            });
            return c
        },
        getFullTreeNode: function(a) {
            var c = [];
            this.each(function() {
                var b = this;
                if (b.grid && b.p.treeGrid) switch (b.p.treeGridModel) {
                case "nested":
                    var e = parseInt(a.lft, 10),
                    f = parseInt(a.rgt, 10),
                    i = parseInt(a.level, 10);
                    d(this.rows).each(function() {
                        parseInt(this.level, 
                        10) >= i && parseInt(this.lft, 10) >= e && parseInt(this.lft, 10) <= f && c.push(this)
                    });
                    break;
                case "adjacency":
                    c.push(a);
                    d(this.rows).each(function(j) {
                        len = c.length;
                        for (j = 0; j < len; j++) if (c[j].id == this.parent_id) {
                            c.push(this);
                            break
                        }
                    });
                    break
                }
            });
            return c
        },
        getNodeAncestors: function(a) {
            var c = [];
            this.each(function() {
                if (this.grid && this.p.treeGrid) for (var b = d(this).jqGrid("getNodeParent", a); b;) {
                    c.push(b);
                    b = d(this).jqGrid("getNodeParent", b)
                }
            });
            return c
        },
        isVisibleNode: function(a) {
            var c = true;
            this.each(function() {
                var b = this;
                if (b.grid && b.p.treeGrid) {
                    b = d(b).jqGrid("getNodeAncestors", a);
                    d(b).each(function() {
                        c = c && this.expanded;
                        if (!c) return false
                    })
                }
            });
            return c
        },
        isNodeLoaded: function(a) {
            var c;
            this.each(function() {
                var b = this;
                if (b.grid && b.p.treeGrid) c = a.loaded !== undefined ? a.loaded: a.isLeaf || d(b).jqGrid("getNodeChildren", a).length > 0 ? true: false
            });
            return c
        },
        expandNode: function(a) {
            return this.each(function() {
                if (this.grid && this.p.treeGrid) if (!a.expanded) if (d(this).jqGrid("isNodeLoaded", a)) {
                    a.expanded = true;
                    d("div.treeclick", a).removeClass(this.p.treeIcons.plus + 
                    " tree-plus").addClass(this.p.treeIcons.minus + " tree-minus")
                } else {
                    a.expanded = true;
                    d("div.treeclick", a).removeClass(this.p.treeIcons.plus + " tree-plus").addClass(this.p.treeIcons.minus + " tree-minus");
                    this.p.treeANode = a.rowIndex;
                    this.p.datatype = this.p.treedatatype;
                    this.p.treeGridModel == "nested" ? d(this).jqGrid("setGridParam", {
                        postData: {
                            nodeid: a.id,
                            n_left: a.lft,
                            n_right: a.rgt,
                            n_level: a.level
                        }
                    }) : d(this).jqGrid("setGridParam", {
                        postData: {
                            nodeid: a.id,
                            parentid: a.parent_id,
                            n_level: a.level
                        }
                    });
                    d(this).trigger("reloadGrid");
                    this.p.treeGridModel == "nested" ? d(this).jqGrid("setGridParam", {
                        postData: {
                            nodeid: "",
                            n_left: "",
                            n_right: "",
                            n_level: ""
                        }
                    }) : d(this).jqGrid("setGridParam", {
                        postData: {
                            nodeid: "",
                            parentid: "",
                            n_level: ""
                        }
                    })
                }
            })
        },
        collapseNode: function(a) {
            return this.each(function() {
                if (this.grid && this.p.treeGrid) if (a.expanded) {
                    a.expanded = false;
                    d("div.treeclick", a).removeClass(this.p.treeIcons.minus + " tree-minus").addClass(this.p.treeIcons.plus + " tree-plus")
                }
            })
        },
        SortTree: function(a) {
            return this.each(function() {
                if (this.grid && this.p.treeGrid) {
                    var c,
                    b,
                    e,
                    f = [],
                    i = this,
                    j = d(this).jqGrid("getRootNodes");
                    j.sort(function(k, h) {
                        if (k.sortKey < h.sortKey) return - a;
                        if (k.sortKey > h.sortKey) return a;
                        return 0
                    });
                    if (j[0]) {
                        d("td", j[0]).each(function(k) {
                            d(this).css("width", i.grid.headers[k].width + "px")
                        });
                        i.grid.cols = j[0].cells
                    }
                    c = 0;
                    for (b = j.length; c < b; c++) {
                        e = j[c];
                        f.push(e);
                        d(this).jqGrid("collectChildrenSortTree", f, e, a)
                    }
                    d.each(f, 
                    function(k, h) {
                        d("tbody", i.grid.bDiv).append(h);
                        h.sortKey = null
                    })
                }
            })
        },
        collectChildrenSortTree: function(a, c, b) {
            return this.each(function() {
                if (this.grid && 
                this.p.treeGrid) {
                    var e,
                    f,
                    i,
                    j = d(this).jqGrid("getNodeChildren", c);
                    j.sort(function(k, h) {
                        if (k.sortKey < h.sortKey) return - b;
                        if (k.sortKey > h.sortKey) return b;
                        return 0
                    });
                    e = 0;
                    for (f = j.length; e < f; e++) {
                        i = j[e];
                        a.push(i);
                        d(this).jqGrid("collectChildrenSortTree", a, i, b)
                    }
                }
            })
        },
        setTreeRow: function(a, c) {
            var b = false;
            this.each(function() {
                var e = this;
                if (e.grid && e.p.treeGrid) b = d(e).jqGrid("setRowData", a, c)
            });
            return b
        },
        delTreeNode: function(a) {
            return this.each(function() {
                var c = this;
                if (c.grid && c.p.treeGrid) {
                    var b = d(c).jqGrid("getInd", 
                    a, true);
                    if (b) {
                        var e = d(c).jqGrid("getNodeChildren", b);
                        if (e.length > 0) for (var f = 0; f < e.length; f++) d(c).jqGrid("delRowData", e[f].id);
                        d(c).jqGrid("delRowData", b.id)
                    }
                }
            })
        }
    })
})(jQuery);
 (function(b) {
    b.jgrid.extend({
        jqGridImport: function(a) {
            a = b.extend({
                imptype: "xml",
                impstring: "",
                impurl: "",
                mtype: "GET",
                impData: {},
                xmlGrid: {
                    config: "roots>grid",
                    data: "roots>rows"
                },
                jsonGrid: {
                    config: "grid",
                    data: "data"
                },
                ajaxOptions: {}
            },
            a || {});
            return this.each(function() {
                var e = this,
                c = function(d, g) {
                    var f = b(g.xmlGrid.config, d)[0];
                    g = b(g.xmlGrid.data, d)[0];
                    if (xmlJsonClass.xml2json && b.jgrid.parse) {
                        f = xmlJsonClass.xml2json(f, " ");
                        f = b.jgrid.parse(f);
                        for (var i in f) var k = f[i];
                        if (g) {
                            i = f.grid.datatype;
                            f.grid.datatype = 
                            "xmlstring";
                            f.grid.datastr = d;
                            b(e).jqGrid(k).jqGrid("setGridParam", {
                                datatype: i
                            })
                        } else b(e).jqGrid(k)
                    } else alert("xml2json or parse are not present")
                },
                j = function(d, g) {
                    if (d && typeof d == "string") {
                        var f = b.jgrid.parse(d);
                        d = f[g.jsonGrid.config];
                        if (g = f[g.jsonGrid.data]) {
                            f = d.datatype;
                            d.datatype = "jsonstring";
                            d.datastr = g;
                            b(e).jqGrid(d).jqGrid("setGridParam", {
                                datatype: f
                            })
                        } else b(e).jqGrid(d)
                    }
                };
                switch (a.imptype) {
                case "xml":
                    b.ajax(b.extend({
                        url:
                        a.impurl,
                        type: a.mtype,
                        data: a.impData,
                        dataType: "xml",
                        complete: function(d, 
                        g) {
                            if (g == "success") {
                                c(d.responseXML, a);
                                b.isFunction(a.importComplete) && a.importComplete(d)
                            }
                        }
                    },
                    a.ajaxOptions));
                    break;
                case "xmlstring":
                    if (a.impstring && typeof a.impstring == "string") {
                        var h = b.jgrid.stringToDoc(a.impstring);
                        if (h) {
                            c(h, a);
                            b.isFunction(a.importComplete) && a.importComplete(h);
                            a.impstring = null
                        }
                        h = null
                    }
                    break;
                case "json":
                    b.ajax(b.extend({
                        url:
                        a.impurl,
                        type: a.mtype,
                        data: a.impData,
                        dataType: "json",
                        complete: function(d, g) {
                            if (g == "success") {
                                j(d.responseText, a);
                                b.isFunction(a.importComplete) && a.importComplete(d)
                            }
                        }
                    },
                    a.ajaxOptions));
                    break;
                case "jsonstring":
                    if (a.impstring && typeof a.impstring == "string") {
                        j(a.impstring, a);
                        b.isFunction(a.importComplete) && a.importComplete(a.impstring);
                        a.impstring = null
                    }
                    break
                }
            })
        },
        jqGridExport: function(a) {
            a = b.extend({
                exptype: "xmlstring",
                root: "grid",
                ident: "\t"
            },
            a || {});
            var e = null;
            this.each(function() {
                if (this.grid) {
                    var c = b.extend({},
                    b(this).jqGrid("getGridParam"));
                    if (c.rownumbers) {
                        c.colNames.splice(0, 1);
                        c.colModel.splice(0, 1)
                    }
                    if (c.multiselect) {
                        c.colNames.splice(0, 1);
                        c.colModel.splice(0, 1)
                    }
                    if (c.subgrid) {
                        c.colNames.splice(0, 
                        1);
                        c.colModel.splice(0, 1)
                    }
                    if (c.treeGrid) for (var j in c.treeReader) {
                        c.colNames.splice(c.colNames.length - 1);
                        c.colModel.splice(c.colModel.length - 1)
                    }
                    switch (a.exptype) {
                    case "xmlstring":
                        e = "<" + a.root + ">" + xmlJsonClass.json2xml(c, a.ident) + "</" + a.root + ">";
                        break;
                    case "jsonstring":
                        e = "{" + xmlJsonClass.toJson(c, a.root, a.ident) + "}";
                        if (c.postData.filters != undefined) {
                            e = e.replace(/filters":"/, 'filters":');
                            e = e.replace(/}]}"/, "}]}")
                        }
                        break
                    }
                }
            });
            return e
        },
        excelExport: function(a) {
            a = b.extend({
                exptype: "remote",
                url: null,
                oper: "oper",
                tag: "excel",
                exportOptions: {}
            },
            a || {});
            return this.each(function() {
                $t = this;
                if (this.grid) if (a.exptype == "remote") {
                    var e = b.extend({},
                    this.p.postData);
                    e[a.oper] = a.tag;
                    e = jQuery.param(e);
                    window.location = a.url + "?" + e
                }
            })
        }
    })
})(jQuery);
var xmlJsonClass = {
    xml2json: function(a, b) {
        if (a.nodeType === 9) a = a.documentElement;
        a = this.toJson(this.toObj(this.removeWhite(a)), a.nodeName, "\t");
        return "{\n" + b + (b ? a.replace(/\t/g, b) : a.replace(/\t|\n/g, "")) + "\n}"
    },
    json2xml: function(a, b) {
        var g = function(d, c, j) {
            var i = "",
            k,
            h;
            if (d instanceof Array) if (d.length === 0) i += j + "<" + c + ">__EMPTY_ARRAY_</" + c + ">\n";
            else {
                k = 0;
                for (h = d.length; k < h; k += 1) {
                    var l = j + g(d[k], c, j + "\t") + "\n";
                    i += l
                }
            } else if (typeof d === "object") {
                k = false;
                i += j + "<" + c;
                for (h in d) if (d.hasOwnProperty(h)) if (h.charAt(0) === 
                "@") i += " " + h.substr(1) + '="' + d[h].toString() + '"';
                else k = true;
                i += k ? ">": "/>";
                if (k) {
                    for (h in d) if (d.hasOwnProperty(h)) if (h === "#text") i += d[h];
                    else if (h === "#cdata") i += "<![CDATA[" + d[h] + "]]\>";
                    else if (h.charAt(0) !== "@") i += g(d[h], h, j + "\t");
                    i += (i.charAt(i.length - 1) === "\n" ? j: "") + "</" + c + ">"
                }
            } else i += typeof d === "function" ? j + "<" + c + "><![CDATA[" + d + "]]\></" + c + ">": d.toString() === '""' || d.toString().length === 0 ? j + "<" + c + ">__EMPTY_STRING_</" + c + ">": j + "<" + c + ">" + d.toString() + "</" + c + ">";
            return i
        },
        e = "",
        f;
        for (f in a) if (a.hasOwnProperty(f)) e += 
        g(a[f], f, "");
        return b ? e.replace(/\t/g, b) : e.replace(/\t|\n/g, "")
    },
    toObj: function(a) {
        var b = {},
        g = /function/i;
        if (a.nodeType === 1) {
            if (a.attributes.length) {
                var e;
                for (e = 0; e < a.attributes.length; e += 1) b["@" + a.attributes[e].nodeName] = (a.attributes[e].nodeValue || "").toString()
            }
            if (a.firstChild) {
                var f = e = 0,
                d = false,
                c;
                for (c = a.firstChild; c; c = c.nextSibling) if (c.nodeType === 1) d = true;
                else if (c.nodeType === 3 && c.nodeValue.match(/[^ \f\n\r\t\v]/)) e += 1;
                else if (c.nodeType === 4) f += 1;
                if (d) if (e < 2 && f < 2) {
                    this.removeWhite(a);
                    for (c = 
                    a.firstChild; c; c = c.nextSibling) if (c.nodeType === 3) b["#text"] = this.escape(c.nodeValue);
                    else if (c.nodeType === 4) if (g.test(c.nodeValue)) b[c.nodeName] = [b[c.nodeName], c.nodeValue];
                    else b["#cdata"] = this.escape(c.nodeValue);
                    else if (b[c.nodeName]) if (b[c.nodeName] instanceof Array) b[c.nodeName][b[c.nodeName].length] = this.toObj(c);
                    else b[c.nodeName] = [b[c.nodeName], this.toObj(c)];
                    else b[c.nodeName] = this.toObj(c)
                } else if (a.attributes.length) b["#text"] = this.escape(this.innerXml(a));
                else b = this.escape(this.innerXml(a));
                else if (e) if (a.attributes.length) b["#text"] = this.escape(this.innerXml(a));
                else {
                    b = this.escape(this.innerXml(a));
                    if (b === "__EMPTY_ARRAY_") b = "[]";
                    else if (b === "__EMPTY_STRING_") b = ""
                } else if (f) if (f > 1) b = this.escape(this.innerXml(a));
                else for (c = a.firstChild; c; c = c.nextSibling) if (g.test(a.firstChild.nodeValue)) {
                    b = a.firstChild.nodeValue;
                    break
                } else b["#cdata"] = this.escape(c.nodeValue)
            }
            if (!a.attributes.length && !a.firstChild) b = null
        } else if (a.nodeType === 9) b = this.toObj(a.documentElement);
        else alert("unhandled node type: " + 
        a.nodeType);
        return b
    },
    toJson: function(a, b, g) {
        var e = b ? '"' + b + '"': "";
        if (a === "[]") e += b ? ":[]": "[]";
        else if (a instanceof Array) {
            var f,
            d,
            c = [];
            d = 0;
            for (f = a.length; d < f; d += 1) c[d] = this.toJson(a[d], "", g + "\t");
            e += (b ? ":[": "[") + (c.length > 1 ? "\n" + g + "\t" + c.join(",\n" + g + "\t") + "\n" + g: c.join("")) + "]"
        } else if (a === null) e += (b && ":") + "null";
        else if (typeof a === "object") {
            f = [];
            for (d in a) if (a.hasOwnProperty(d)) f[f.length] = this.toJson(a[d], d, g + "\t");
            e += (b ? ":{": "{") + (f.length > 1 ? "\n" + g + "\t" + f.join(",\n" + g + "\t") + "\n" + g: f.join("")) + 
            "}"
        } else if (typeof a === "string") {
            g = /function/i;
            f = a.toString();
            e += /(^-?\d+\.?\d*$)/.test(f) || g.test(f) || f === "false" || f === "true" ? (b && ":") + f: (b && ":") + '"' + a + '"'
        } else e += (b && ":") + a.toString();
        return e
    },
    innerXml: function(a) {
        var b = "";
        if ("innerHTML" in a) b = a.innerHTML;
        else {
            var g = function(e) {
                var f = "",
                d;
                if (e.nodeType === 1) {
                    f += "<" + e.nodeName;
                    for (d = 0; d < e.attributes.length; d += 1) f += " " + e.attributes[d].nodeName + '="' + (e.attributes[d].nodeValue || "").toString() + '"';
                    if (e.firstChild) {
                        f += ">";
                        for (d = e.firstChild; d; d = d.nextSibling) f += 
                        g(d);
                        f += "</" + e.nodeName + ">"
                    } else f += "/>"
                } else if (e.nodeType === 3) f += e.nodeValue;
                else if (e.nodeType === 4) f += "<![CDATA[" + e.nodeValue + "]]\>";
                return f
            };
            for (a = a.firstChild; a; a = a.nextSibling) b += g(a)
        }
        return b
    },
    escape: function(a) {
        return a.replace(/[\\]/g, "\\\\").replace(/[\"]/g, '\\"').replace(/[\n]/g, "\\n").replace(/[\r]/g, "\\r")
    },
    removeWhite: function(a) {
        a.normalize();
        var b;
        for (b = a.firstChild; b;) if (b.nodeType === 3) if (b.nodeValue.match(/[^ \f\n\r\t\v]/)) b = b.nextSibling;
        else {
            var g = b.nextSibling;
            a.removeChild(b);
            b = g
        } else {
            b.nodeType === 1 && this.removeWhite(b);
            b = b.nextSibling
        }
        return a
    }
};
 (function(b) {
    b.jgrid.extend({
        setColumns: function(a) {
            a = b.extend({
                top: 0,
                left: 0,
                width: 200,
                height: "auto",
                dataheight: "auto",
                modal: false,
                drag: true,
                beforeShowForm: null,
                afterShowForm: null,
                afterSubmitForm: null,
                closeOnEscape: true,
                ShrinkToFit: false,
                jqModal: false,
                saveicon: [true, "left", "ui-icon-disk"],
                closeicon: [true, "left", "ui-icon-close"],
                onClose: null,
                colnameview: true,
                closeAfterSubmit: true,
                updateAfterCheck: false,
                recreateForm: false
            },
            b.jgrid.col, a || {});
            return this.each(function() {
                var c = this;
                if (c.grid) {
                    var j = typeof a.beforeShowForm === 
                    "function" ? true: false,
                    k = typeof a.afterShowForm === "function" ? true: false,
                    l = typeof a.afterSubmitForm === "function" ? true: false,
                    e = c.p.id,
                    d = "ColTbl_" + e,
                    f = {
                        themodal: "colmod" + e,
                        modalhead: "colhd" + e,
                        modalcontent: "colcnt" + e,
                        scrollelm: d
                    };
                    a.recreateForm === true && b("#" + f.themodal).html() != null && b("#" + f.themodal).remove();
                    if (b("#" + f.themodal).html() != null) {
                        j && a.beforeShowForm(b("#" + d));
                        viewModal("#" + f.themodal, {
                            gbox: "#gbox_" + e,
                            jqm: a.jqModal,
                            jqM: false,
                            modal: a.modal
                        })
                    } else {
                        var g = isNaN(a.dataheight) ? a.dataheight: a.dataheight + 
                        "px";
                        g = "<div id='" + d + "' class='formdata' style='width:100%;overflow:auto;position:relative;height:" + g + ";'>";
                        g += "<table class='ColTable' cellspacing='1' cellpading='2' border='0'><tbody>";
                        for (i = 0; i < this.p.colNames.length; i++) c.p.colModel[i].hidedlg || (g += "<tr><td style='white-space: pre;'><input type='checkbox' style='margin-right:5px;' id='col_" + this.p.colModel[i].name + "' class='cbox' value='T' " + (this.p.colModel[i].hidden === false ? "checked": "") + "/><label for='col_" + this.p.colModel[i].name + "'>" + this.p.colNames[i] + 
                        (a.colnameview ? " (" + this.p.colModel[i].name + ")": "") + "</label></td></tr>");
                        g += "</tbody></table></div>";
                        g += "<table border='0' class='EditTable' id='" + d + "_2'><tbody><tr style='display:block;height:3px;'><td></td></tr><tr><td class='DataTD ui-widget-content'></td></tr><tr><td class='ColButton EditButton'>" + (!a.updateAfterCheck ? "<a href='javascript:void(0)' id='dData' class='fm-button ui-state-default ui-corner-all'>" + a.bSubmit + "</a>": "") + "&#160;" + ("<a href='javascript:void(0)' id='eData' class='fm-button ui-state-default ui-corner-all'>" + 
                        a.bCancel + "</a>") + "</td></tr></tbody></table>";
                        a.gbox = "#gbox_" + e;
                        createModal(f, g, a, "#gview_" + c.p.id, b("#gview_" + c.p.id)[0]);
                        if (a.saveicon[0] == true) b("#dData", "#" + d + "_2").addClass(a.saveicon[1] == "right" ? "fm-button-icon-right": "fm-button-icon-left").append("<span class='ui-icon " + a.saveicon[2] + "'></span>");
                        if (a.closeicon[0] == true) b("#eData", "#" + d + "_2").addClass(a.closeicon[1] == "right" ? "fm-button-icon-right": "fm-button-icon-left").append("<span class='ui-icon " + a.closeicon[2] + "'></span>");
                        a.updateAfterCheck ? 
                        b(":input", "#" + d).click(function() {
                            var h = this.id.substr(4);
                            if (h) {
                                this.checked ? b(c).jqGrid("showCol", h) : b(c).jqGrid("hideCol", h);
                                a.ShrinkToFit === true && b(c).jqGrid("setGridWidth", c.grid.width - 0.0010, true)
                            }
                            return this
                        }) : b("#dData", "#" + d + "_2").click(function() {
                            for (i = 0; i < c.p.colModel.length; i++) if (!c.p.colModel[i].hidedlg) {
                                var h = c.p.colModel[i].name.replace(".", "\\.");
                                if (b("#col_" + h, "#" + d).attr("checked")) {
                                    b(c).jqGrid("showCol", c.p.colModel[i].name);
                                    b("#col_" + h, "#" + d).attr("defaultChecked", true)
                                } else {
                                    b(c).jqGrid("hideCol", 
                                    c.p.colModel[i].name);
                                    b("#col_" + h, "#" + d).attr("defaultChecked", "")
                                }
                            }
                            a.ShrinkToFit === true && b(c).jqGrid("setGridWidth", c.grid.width - 0.0010, true);
                            a.closeAfterSubmit && hideModal("#" + f.themodal, {
                                gb: "#gbox_" + e,
                                jqm: a.jqModal,
                                onClose: a.onClose
                            });
                            l && a.afterSubmitForm(b("#" + d));
                            return false
                        });
                        b("#eData", "#" + d + "_2").click(function() {
                            hideModal("#" + f.themodal, {
                                gb: "#gbox_" + e,
                                jqm: a.jqModal,
                                onClose: a.onClose
                            });
                            return false
                        });
                        b("#dData, #eData", "#" + d + "_2").hover(function() {
                            b(this).addClass("ui-state-hover")
                        },
                        function() {
                            b(this).removeClass("ui-state-hover")
                        });
                        j && a.beforeShowForm(b("#" + d));
                        viewModal("#" + f.themodal, {
                            gbox: "#gbox_" + e,
                            jqm: a.jqModal,
                            jqM: true,
                            modal: a.modal
                        })
                    }
                    k && a.afterShowForm(b("#" + d))
                }
            })
        }
    })
})(jQuery);
 (function(c) {
    c.jgrid.extend({
        getPostData: function() {
            var a = this[0];
            if (a.grid) return a.p.postData
        },
        setPostData: function(a) {
            var b = this[0];
            if (b.grid) if (typeof a === "object") b.p.postData = a;
            else alert("Error: cannot add a non-object postData value. postData unchanged.")
        },
        appendPostData: function(a) {
            var b = this[0];
            if (b.grid) typeof a === "object" ? c.extend(b.p.postData, a) : alert("Error: cannot append a non-object postData value. postData unchanged.")
        },
        setPostDataItem: function(a, b) {
            var d = this[0];
            if (d.grid) d.p.postData[a] = 
            b
        },
        getPostDataItem: function(a) {
            var b = this[0];
            if (b.grid) return b.p.postData[a]
        },
        removePostDataItem: function(a) {
            var b = this[0];
            b.grid && delete b.p.postData[a]
        },
        getUserData: function() {
            var a = this[0];
            if (a.grid) return a.p.userData
        },
        getUserDataItem: function(a) {
            var b = this[0];
            if (b.grid) return b.p.userData[a]
        }
    })
})(jQuery);
function tableToGrid(o, p) {
    jQuery(o).each(function() {
        if (!this.grid) {
            jQuery(this).width("99%");
            var a = jQuery(this).width(),
            f = jQuery("input[type=checkbox]:first", jQuery(this)),
            l = jQuery("input[type=radio]:first", jQuery(this)),
            b = f.length > 0,
            q = !b && l.length > 0,
            m = b || q;
            f = f.attr("name") || l.attr("name");
            var c = [],
            g = [];
            jQuery("th", jQuery(this)).each(function() {
                if (c.length == 0 && m) {
                    c.push({
                        name: "__selection__",
                        index: "__selection__",
                        width: 0,
                        hidden: true
                    });
                    g.push("__selection__")
                } else {
                    c.push({
                        name: jQuery(this).attr("id") || 
                        jQuery.trim(jQuery.jgrid.stripHtml(jQuery(this).html())).split(" ").join("_"),
                        index: jQuery(this).attr("id") || jQuery.trim(jQuery.jgrid.stripHtml(jQuery(this).html())).split(" ").join("_"),
                        width: jQuery(this).width() || 150
                    });
                    g.push(jQuery(this).html())
                }
            });
            var e = [],
            h = [],
            i = [];
            jQuery("tbody > tr", jQuery(this)).each(function() {
                var j = {},
                d = 0;
                jQuery("td", jQuery(this)).each(function() {
                    if (d == 0 && m) {
                        var k = jQuery("input", jQuery(this)),
                        n = k.attr("value");
                        h.push(n || e.length);
                        k.attr("checked") && i.push(n);
                        j[c[d].name] = 
                        k.attr("value")
                    } else j[c[d].name] = jQuery(this).html();
                    d++
                });
                d > 0 && e.push(j)
            });
            jQuery(this).empty();
            jQuery(this).addClass("scroll");
            jQuery(this).jqGrid($.extend({
                datatype: "local",
                width: a,
                colNames: g,
                colModel: c,
                multiselect: b
            },
            p || {}));
            for (a = 0; a < e.length; a++) {
                b = null;
                if (h.length > 0) if ((b = h[a]) && b.replace) b = encodeURIComponent(b).replace(/[.\-%]/g, "_");
                if (b == null) b = a + 1;
                jQuery(this).jqGrid("addRowData", b, e[a])
            }
            for (a = 0; a < i.length; a++) jQuery(this).jqGrid("setSelection", i[a])
        }
    })
};
 (function(a) {
    if (a.browser.msie && a.browser.version == 8) a.expr[":"].hidden = function(b) {
        return b.offsetWidth === 0 || b.offsetHeight === 0 || b.style.display == "none"
    };
    if (a.ui && a.ui.multiselect && a.ui.multiselect.prototype._setSelected) {
        var q = a.ui.multiselect.prototype._setSelected;
        a.ui.multiselect.prototype._setSelected = function(b, i) {
            b = q.call(this, b, i);
            if (i && this.selectedList) {
                var c = this.element;
                this.selectedList.find("li").each(function() {
                    a(this).data("optionLink") && a(this).data("optionLink").remove().appendTo(c)
                })
            }
            return b
        }
    }
    a.jgrid.extend({
        sortableColumns: function(b) {
            return this.each(function() {
                function i() {
                    c.p.disableClick = 
                    true
                }
                var c = this,
                g = {
                    tolerance: "pointer",
                    axis: "x",
                    items: ">th:not(:has(#jqgh_cb,#jqgh_rn,#jqgh_subgrid),:hidden)",
                    placeholder: {
                        element: function(e) {
                            return a(document.createElement(e[0].nodeName)).addClass(e[0].className + " ui-sortable-placeholder ui-state-highlight").removeClass("ui-sortable-helper")[0]
                        },
                        update: function(e, h) {
                            h.height(e.currentItem.innerHeight() - parseInt(e.currentItem.css("paddingTop") || 0, 10) - parseInt(e.currentItem.css("paddingBottom") || 0, 10));
                            h.width(e.currentItem.innerWidth() - parseInt(e.currentItem.css("paddingLeft") || 
                            0, 10) - parseInt(e.currentItem.css("paddingRight") || 0, 10))
                        }
                    },
                    update: function(e, h) {
                        e = a(h.item).parent();
                        e = a(">th", e);
                        var j = {};
                        a.each(c.p.colModel, 
                        function(m) {
                            j[this.name] = m
                        });
                        var l = [];
                        e.each(function() {
                            var m = a(">div", this).get(0).id.replace(/^jqgh_/, "");
                            m in j && l.push(j[m])
                        });
                        a(c).jqGrid("remapColumns", l, true, true);
                        a.isFunction(c.p.sortable.update) && c.p.sortable.update(l);
                        setTimeout(function() {
                            c.p.disableClick = false
                        },
                        50)
                    }
                };
                if (c.p.sortable.options) a.extend(g, c.p.sortable.options);
                else if (a.isFunction(c.p.sortable)) c.p.sortable = 
                {
                    update: c.p.sortable
                };
                if (g.start) {
                    var d = g.start;
                    g.start = function(e, h) {
                        i();
                        d.call(this, e, h)
                    }
                } else g.start = i;
                if (c.p.sortable.exclude) g.items += ":not(" + c.p.sortable.exclude + ")";
                b.sortable(g).data("sortable").floating = true
            })
        },
        columnChooser: function(b) {
            function i(f, k, o) {
                if (k >= 0) {
                    var p = f.slice(),
                    r = p.splice(k);
                    if (k > f.length) k = f.length;
                    p[k] = o;
                    return p.concat(r)
                }
            }
            function c(f, k) {
                if (f) if (typeof f == "string") a.fn[f] && a.fn[f].apply(k, a.makeArray(arguments).slice(2));
                else a.isFunction(f) && f.apply(k, a.makeArray(arguments).slice(2))
            }
            var g = this;
            if (!a("#colchooser_" + g[0].p.id).length) {
                var d = a('<div id="colchooser_' + g[0].p.id + '" style="position:relative;overflow:hidden"><div><select multiple="multiple"></select></div></div>'),
                e = a("select", d);
                b = a.extend({
                    width: 420,
                    height: 240,
                    classname: null,
                    done: function(f) {
                        f && g.jqGrid("remapColumns", f, true)
                    },
                    msel: "multiselect",
                    dlog: "dialog",
                    dlog_opts: function(f) {
                        var k = {};
                        k[f.bSubmit] = function() {
                            f.apply_perm();
                            f.cleanup(false)
                        };
                        k[f.bCancel] = function() {
                            f.cleanup(true)
                        };
                        return {
                            buttons: k,
                            close: function() {
                                f.cleanup(true)
                            },
                            modal: false,
                            resizable: false,
                            width: f.width + 20
                        }
                    },
                    apply_perm: function() {
                        a("option", e).each(function() {
                            this.selected ? g.jqGrid("showCol", h[this.value].name) : g.jqGrid("hideCol", h[this.value].name)
                        });
                        var f = [];
                        a("option[selected]", e).each(function() {
                            f.push(parseInt(this.value))
                        });
                        a.each(f, 
                        function() {
                            delete l[h[parseInt(this)].name]
                        });
                        a.each(l, 
                        function() {
                            var k = parseInt(this);
                            f = i(f, k, k)
                        });
                        b.done && b.done.call(g, f)
                    },
                    cleanup: function(f) {
                        c(b.dlog, d, "destroy");
                        c(b.msel, e, "destroy");
                        d.remove();
                        f && b.done && b.done.call(g)
                    },
                    msel_opts: {}
                },
                a.jgrid.col, b || {});
                b.caption && d.attr("title", b.caption);
                if (b.classname) {
                    d.addClass(classname);
                    e.addClass(classname)
                }
                if (b.width) {
                    a(">div", d).css({
                        width: b.width,
                        margin: "0 auto"
                    });
                    e.css("width", b.width)
                }
                if (b.height) {
                    a(">div", d).css("height", b.height);
                    e.css("height", b.height - 10)
                }
                var h = g.jqGrid("getGridParam", "colModel"),
                j = g.jqGrid("getGridParam", "colNames"),
                l = {},
                m = [];
                e.empty();
                a.each(h, 
                function(f) {
                    l[this.name] = f;
                    if (this.hidedlg) this.hidden || m.push(f);
                    else e.append("<option value='" + f + "' " + 
                    (this.hidden ? "": "selected='selected'") + ">" + j[f] + "</option>")
                });
                var n = a.isFunction(b.dlog_opts) ? b.dlog_opts.call(g, b) : b.dlog_opts;
                c(b.dlog, d, n);
                n = a.isFunction(b.msel_opts) ? b.msel_opts.call(g, b) : b.msel_opts;
                c(b.msel, e, n)
            }
        },
        sortableRows: function(b) {
            return this.each(function() {
                var i = this;
                if (i.grid) if (!i.p.treeGrid) if (a.fn.sortable) {
                    b = a.extend({
                        cursor: "move",
                        axis: "y",
                        items: ".jqgrow"
                    },
                    b || {});
                    if (b.start && a.isFunction(b.start)) {
                        b._start_ = b.start;
                        delete b.start
                    } else b._start_ = false;
                    if (b.update && a.isFunction(b.update)) {
                        b._update_ = 
                        b.update;
                        delete b.update
                    } else b._update_ = false;
                    b.start = function(c, g) {
                        a(g.item).css("border-width", "0px");
                        a("td", g.item).each(function(h) {
                            this.style.width = i.grid.cols[h].style.width
                        });
                        if (i.p.subGrid) {
                            var d = a(g.item).attr("id");
                            try {
                                a(i).jqGrid("collapseSubGridRow", d)
                            } catch(e) {}
                        }
                        b._start_ && b._start_.apply(this, [c, g])
                    };
                    b.update = function(c, g) {
                        a(g.item).css("border-width", "");
                        i.updateColumns();
                        i.p.rownumbers === true && a("td.jqgrid-rownum", i.rows).each(function(d) {
                            a(this).html(d + 1)
                        });
                        b._update_ && b._update_.apply(this, 
                        [c, g])
                    };
                    a("tbody:first", i).sortable(b)
                }
            })
        },
        gridDnD: function(b) {
            return this.each(function() {
                function i() {
                    var d = a.data(c, "dnd");
                    a("tr.jqgrow:not(.ui-draggable)", c).draggable(a.isFunction(d.drag) ? d.drag.call(a(c), d) : d.drag)
                }
                var c = this;
                if (c.grid) if (!c.p.treeGrid) if (a.fn.draggable && a.fn.droppable) {
                    a("#jqgrid_dnd").html() == null && a("body").append("<table id='jqgrid_dnd' class='ui-jqgrid-dnd'></table>");
                    if (typeof b == "string" && b == "updateDnD" && c.p.jqgdnd == true) i();
                    else {
                        b = a.extend({
                            drag: function(d) {
                                return a.extend({
                                    start: function(e, 
                                    h) {
                                        if (c.p.subGrid) {
                                            var j = a(h.helper).attr("id");
                                            try {
                                                a(c).jqGrid("collapseSubGridRow", j)
                                            } catch(l) {}
                                        }
                                        for (j = 0; j < a.data(c, "dnd").connectWith.length; j++) a(a.data(c, "dnd").connectWith[j]).jqGrid("getGridParam", "reccount") == "0" && a(a.data(c, "dnd").connectWith[j]).jqGrid("addRowData", "jqg_empty_row", {});
                                        h.helper.addClass("ui-state-highlight");
                                        a("td", h.helper).each(function(m) {
                                            this.style.width = c.grid.headers[m].width + "px"
                                        });
                                        d.onstart && a.isFunction(d.onstart) && d.onstart.call(a(c), e, h)
                                    },
                                    stop: function(e, h) {
                                        if (h.helper.dropped) {
                                            var j = 
                                            a(h.helper).attr("id");
                                            a(c).jqGrid("delRowData", j)
                                        }
                                        for (j = 0; j < a.data(c, "dnd").connectWith.length; j++) a(a.data(c, "dnd").connectWith[j]).jqGrid("delRowData", "jqg_empty_row");
                                        d.onstop && a.isFunction(d.onstop) && d.onstop.call(a(c), e, h)
                                    }
                                },
                                d.drag_opts || {})
                            },
                            drop: function(d) {
                                return a.extend({
                                    accept: function(e) {
                                        var h = a(e).closest("table.ui-jqgrid-btable");
                                        if (a.data(h[0], "dnd") != undefined) {
                                            e = a.data(h[0], "dnd").connectWith;
                                            return a.inArray("#" + this.id, e) != -1 ? true: false
                                        }
                                        return e
                                    },
                                    drop: function(e, h) {
                                        var j = a(h.draggable).attr("id");
                                        j = a("#" + c.id).jqGrid("getRowData", j);
                                        if (!d.dropbyname) {
                                            var l = 0,
                                            m = {},
                                            n,
                                            f = a("#" + this.id).jqGrid("getGridParam", "colModel");
                                            try {
                                                for (key in j) {
                                                    if (f[l]) {
                                                        n = f[l].name;
                                                        m[n] = j[key]
                                                    }
                                                    l++
                                                }
                                                j = m
                                            } catch(k) {}
                                        }
                                        h.helper.dropped = true;
                                        if (d.beforedrop && a.isFunction(d.beforedrop)) {
                                            n = d.beforedrop.call(this, e, h, j, a("#" + c.id), a(this));
                                            if (typeof n != "undefined" && n !== null && typeof n == "object") j = n
                                        }
                                        if (h.helper.dropped) {
                                            var o;
                                            if (d.autoid) if (a.isFunction(d.autoid)) o = d.autoid.call(this, j);
                                            else {
                                                o = Math.ceil(Math.random() * 1E3);
                                                o = d.autoidprefix + 
                                                o
                                            }
                                            a("#" + this.id).jqGrid("addRowData", o, j, d.droppos)
                                        }
                                        d.ondrop && a.isFunction(d.ondrop) && d.ondrop.call(this, e, h, j)
                                    }
                                },
                                d.drop_opts || {})
                            },
                            onstart: null,
                            onstop: null,
                            beforedrop: null,
                            ondrop: null,
                            drop_opts: {
                                activeClass: "ui-state-active",
                                hoverClass: "ui-state-hover"
                            },
                            drag_opts: {
                                revert: "invalid",
                                helper: "clone",
                                cursor: "move",
                                appendTo: "#jqgrid_dnd",
                                zIndex: 5E3
                            },
                            dropbyname: false,
                            droppos: "first",
                            autoid: true,
                            autoidprefix: "dnd_"
                        },
                        b || {});
                        if (b.connectWith) {
                            b.connectWith = b.connectWith.split(",");
                            b.connectWith = a.map(b.connectWith, 
                            function(d) {
                                return a.trim(d)
                            });
                            a.data(c, "dnd", b);
                            c.p.reccount != "0" && !c.p.jqgdnd && i();
                            c.p.jqgdnd = true;
                            for (var g = 0; g < b.connectWith.length; g++) a(b.connectWith[g]).droppable(a.isFunction(b.drop) ? b.drop.call(a(c), b) : b.drop)
                        }
                    }
                }
            })
        },
        gridResize: function(b) {
            return this.each(function() {
                var i = this;
                if (i.grid && a.fn.resizable) {
                    b = a.extend({},
                    b || {});
                    if (b.alsoResize) {
                        b._alsoResize_ = b.alsoResize;
                        delete b.alsoResize
                    } else b._alsoResize_ = false;
                    if (b.stop && a.isFunction(b.stop)) {
                        b._stop_ = b.stop;
                        delete b.stop
                    } else b._stop_ = 
                    false;
                    b.stop = function(c, g) {
                        a(i).jqGrid("setGridParam", {
                            height: a("#gview_" + i.p.id + " .ui-jqgrid-bdiv").height()
                        });
                        a(i).jqGrid("setGridWidth", g.size.width, b.shrinkToFit);
                        b._stop_ && b._stop_.call(i, c, g)
                    };
                    b.alsoResize = b._alsoResize_ ? eval("(" + ("{'#gview_" + i.p.id + " .ui-jqgrid-bdiv':true,'" + b._alsoResize_ + "':true}") + ")") : a(".ui-jqgrid-bdiv", "#gview_" + i.p.id);
                    delete b._alsoResize_;
                    a("#gbox_" + i.p.id).resizable(b)
                }
            })
        }
    })
})(jQuery);