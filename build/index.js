!function(e){function t(e){Object.defineProperty(this,e,{enumerable:!0,get:function(){return this[v][e]}})}function r(e){if("undefined"!=typeof System&&System.isModule?System.isModule(e):"[object Module]"===Object.prototype.toString.call(e))return e;var t={default:e,__useDefault:e};if(e&&e.__esModule)for(var r in e)Object.hasOwnProperty.call(e,r)&&(t[r]=e[r]);return new o(t)}function o(e){Object.defineProperty(this,v,{value:e}),Object.keys(e).forEach(t,this)}function n(e){return"@node/"===e.substr(0,6)?c(e,r(m(e.substr(6))),{}):p[e]}function u(e){var t=n(e);if(!t)throw new Error('Module "'+e+'" expected, but not contained in build.');if(t.module)return t.module;var r=t.linkRecord;return i(t,r),a(t,r,[]),t.module}function i(e,t){if(!t.depLoads){t.declare&&d(e,t),t.depLoads=[];for(var r=0;r<t.deps.length;r++){var o=n(t.deps[r]);t.depLoads.push(o),o.linkRecord&&i(o,o.linkRecord);var u=t.setters&&t.setters[r];u&&(u(o.module||o.linkRecord.moduleObj),o.importerSetters.push(u))}return e}}function d(t,r){var o=r.moduleObj,n=t.importerSetters,u=!1,i=r.declare.call(e,function(e,t){if(!u){if("object"==typeof e)for(var r in e)"__useDefault"!==r&&(o[r]=e[r]);else o[e]=t;u=!0;for(var i=0;i<n.length;i++)n[i](o);return u=!1,t}},{id:t.key});"function"!=typeof i?(r.setters=i.setters,r.execute=i.execute):(r.setters=[],r.execute=i)}function l(e,t,r){return p[e]={key:e,module:void 0,importerSetters:[],linkRecord:{deps:t,depLoads:void 0,declare:r,setters:void 0,execute:void 0,moduleObj:{}}}}function f(e,t,r,o){var n={};return p[e]={key:e,module:void 0,importerSetters:[],linkRecord:{deps:t,depLoads:void 0,declare:void 0,execute:o,executingRequire:r,moduleObj:{default:n,__useDefault:n},setters:void 0}}}function s(e,t,r){return function(o){for(var n=0;n<e.length;n++)if(e[n]===o){var u,i=t[n],d=i.linkRecord;return u=d?-1===r.indexOf(i)?a(i,d,r):d.moduleObj:i.module,"__useDefault"in u?u.__useDefault:u}}}function a(t,r,n){if(n.push(t),t.module)return t.module;var u;if(r.setters){for(var i=0;i<r.deps.length;i++){var d=r.depLoads[i],l=d.linkRecord;l&&-1===n.indexOf(d)&&(u=a(d,l,l.setters?n:[]))}r.execute.call(y)}else{var f={id:t.key},c=r.moduleObj;Object.defineProperty(f,"exports",{configurable:!0,set:function(e){c.default=c.__useDefault=e},get:function(){return c.__useDefault}});var p=s(r.deps,r.depLoads,n);if(!r.executingRequire)for(var i=0;i<r.deps.length;i++)p(r.deps[i]);var v=r.execute.call(e,p,c.__useDefault,f);void 0!==v&&(c.default=c.__useDefault=v);var m=c.__useDefault;if(m&&m.__esModule)for(var b in m)Object.hasOwnProperty.call(m,b)&&(c[b]=m[b])}var f=t.module=new o(r.moduleObj);if(!r.setters)for(var i=0;i<t.importerSetters.length;i++)t.importerSetters[i](f);return f}function c(e,t){return p[e]={key:e,module:t,importerSetters:[],linkRecord:void 0}}var p={},v="undefined"!=typeof Symbol?Symbol():"@@baseObject";o.prototype=Object.create(null),"undefined"!=typeof Symbol&&Symbol.toStringTag&&(o.prototype[Symbol.toStringTag]="Module");var m="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,y={};return Object.freeze&&Object.freeze(y),function(e,t,n,i){return function(d){d(function(d){var s={_nodeRequire:m,register:l,registerDynamic:f,registry:{get:function(e){return p[e].module},set:c},newModule:function(e){return new o(e)}};c("@empty",new o({}));for(var a=0;a<t.length;a++)c(t[a],r(arguments[a],{}));i(s);var v=u(e[0]);if(e.length>1)for(var a=1;a<e.length;a++)u(e[a]);return n?v.__useDefault:(v instanceof o&&Object.defineProperty(v,"__esModule",{value:!0}),v)})}}}("undefined"!=typeof self?self:"undefined"!=typeof global?global:this)

(["a"], [], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
!function(e){function r(e,r){for(var n=e.split(".");n.length;)r=r[n.shift()];return r}function n(n){if("string"==typeof n)return r(n,e);if(!(n instanceof Array))throw new Error("Global exports must be a string or array.");for(var t={},o=0;o<n.length;o++)t[n[o].split(".").pop()]=r(n[o],e);return t}function t(r){if(-1===a.indexOf(r)){try{var n=e[r]}catch(e){a.push(r)}this(r,n)}}var o,i=$__System,a=["_g","sessionStorage","localStorage","clipboardData","frames","frameElement","external","mozAnimationStartTime","webkitStorageInfo","webkitIndexedDB","mozInnerScreenY","mozInnerScreenX"];i.registry.set("@@global-helpers",i.newModule({prepareGlobal:function(r,i,a){var f=e.define;e.define=void 0;var s;if(a){s={};for(var l in a)s[l]=e[l],e[l]=a[l]}return i||(o={},Object.keys(e).forEach(t,function(e,r){o[e]=r})),function(){var r,a=i?n(i):{},l=!!i;if(i||Object.keys(e).forEach(t,function(e,n){o[e]!==n&&void 0!==n&&(i||(a[e]=n,void 0!==r?l||r===n||(l=!0):r=n))}),a=l?a:r,s)for(var c in s)e[c]=s[c];return e.define=f,a}}}))}("undefined"!=typeof self?self:global);
$__System.registerDynamic("b", [], false, function ($__require, $__exports, $__module) {
  var _retrieveGlobal = $__System.registry.get("@@global-helpers").prepareGlobal($__module.id, null, null);

  (function ($__global) {
    (function () {
      'use strict';
      var h = new function () {}();var aa = new Set("annotation-xml color-profile font-face font-face-src font-face-uri font-face-format font-face-name missing-glyph".split(" "));function k(b) {
        var a = aa.has(b);b = /^[a-z][.0-9_a-z]*-[\-.0-9_a-z]*$/.test(b);return !a && b;
      }function l(b) {
        var a = b.isConnected;if (void 0 !== a) return a;for (; b && !(b.__CE_isImportDocument || b instanceof Document);) b = b.parentNode || (window.ShadowRoot && b instanceof ShadowRoot ? b.host : void 0);return !(!b || !(b.__CE_isImportDocument || b instanceof Document));
      }
      function m(b, a) {
        for (; a && a !== b && !a.nextSibling;) a = a.parentNode;return a && a !== b ? a.nextSibling : null;
      }
      function n(b, a, e) {
        e = e ? e : new Set();for (var c = b; c;) {
          if (c.nodeType === Node.ELEMENT_NODE) {
            var d = c;a(d);var f = d.localName;if ("link" === f && "import" === d.getAttribute("rel")) {
              c = d.import;if (c instanceof Node && !e.has(c)) for (e.add(c), c = c.firstChild; c; c = c.nextSibling) n(c, a, e);c = m(b, d);continue;
            } else if ("template" === f) {
              c = m(b, d);continue;
            }if (d = d.__CE_shadowRoot) for (d = d.firstChild; d; d = d.nextSibling) n(d, a, e);
          }c = c.firstChild ? c.firstChild : m(b, c);
        }
      }function q(b, a, e) {
        b[a] = e;
      };function r() {
        this.a = new Map();this.m = new Map();this.f = [];this.b = !1;
      }function ba(b, a, e) {
        b.a.set(a, e);b.m.set(e.constructor, e);
      }function t(b, a) {
        b.b = !0;b.f.push(a);
      }function v(b, a) {
        b.b && n(a, function (a) {
          return w(b, a);
        });
      }function w(b, a) {
        if (b.b && !a.__CE_patched) {
          a.__CE_patched = !0;for (var e = 0; e < b.f.length; e++) b.f[e](a);
        }
      }function x(b, a) {
        var e = [];n(a, function (b) {
          return e.push(b);
        });for (a = 0; a < e.length; a++) {
          var c = e[a];1 === c.__CE_state ? b.connectedCallback(c) : y(b, c);
        }
      }
      function z(b, a) {
        var e = [];n(a, function (b) {
          return e.push(b);
        });for (a = 0; a < e.length; a++) {
          var c = e[a];1 === c.__CE_state && b.disconnectedCallback(c);
        }
      }
      function A(b, a, e) {
        e = e ? e : {};var c = e.w || new Set(),
            d = e.s || function (d) {
          return y(b, d);
        },
            f = [];n(a, function (a) {
          if ("link" === a.localName && "import" === a.getAttribute("rel")) {
            var e = a.import;e instanceof Node && "complete" === e.readyState ? (e.__CE_isImportDocument = !0, e.__CE_hasRegistry = !0) : a.addEventListener("load", function () {
              var e = a.import;e.__CE_documentLoadHandled || (e.__CE_documentLoadHandled = !0, e.__CE_isImportDocument = !0, e.__CE_hasRegistry = !0, c.delete(e), A(b, e, { w: c, s: d }));
            });
          } else f.push(a);
        }, c);if (b.b) for (a = 0; a < f.length; a++) w(b, f[a]);for (a = 0; a < f.length; a++) d(f[a]);
      }
      function y(b, a) {
        if (void 0 === a.__CE_state) {
          var e = b.a.get(a.localName);if (e) {
            e.constructionStack.push(a);var c = e.constructor;try {
              try {
                if (new c() !== a) throw Error("The custom element constructor did not produce the element being upgraded.");
              } finally {
                e.constructionStack.pop();
              }
            } catch (g) {
              throw a.__CE_state = 2, g;
            }a.__CE_state = 1;a.__CE_definition = e;if (e.attributeChangedCallback) for (e = e.observedAttributes, c = 0; c < e.length; c++) {
              var d = e[c],
                  f = a.getAttribute(d);null !== f && b.attributeChangedCallback(a, d, null, f, null);
            }l(a) && b.connectedCallback(a);
          }
        }
      }r.prototype.connectedCallback = function (b) {
        var a = b.__CE_definition;a.connectedCallback && a.connectedCallback.call(b);
      };r.prototype.disconnectedCallback = function (b) {
        var a = b.__CE_definition;a.disconnectedCallback && a.disconnectedCallback.call(b);
      };r.prototype.attributeChangedCallback = function (b, a, e, c, d) {
        var f = b.__CE_definition;f.attributeChangedCallback && -1 < f.observedAttributes.indexOf(a) && f.attributeChangedCallback.call(b, a, e, c, d);
      };function B(b, a) {
        this.c = b;this.a = a;this.b = void 0;A(this.c, this.a);"loading" === this.a.readyState && (this.b = new MutationObserver(this.f.bind(this)), this.b.observe(this.a, { childList: !0, subtree: !0 }));
      }function C(b) {
        b.b && b.b.disconnect();
      }B.prototype.f = function (b) {
        var a = this.a.readyState;"interactive" !== a && "complete" !== a || C(this);for (a = 0; a < b.length; a++) for (var e = b[a].addedNodes, c = 0; c < e.length; c++) A(this.c, e[c]);
      };function ca() {
        var b = this;this.b = this.a = void 0;this.f = new Promise(function (a) {
          b.b = a;b.a && a(b.a);
        });
      }function D(b) {
        if (b.a) throw Error("Already resolved.");b.a = void 0;b.b && b.b(void 0);
      };function E(b) {
        this.h = !1;this.c = b;this.l = new Map();this.i = function (b) {
          return b();
        };this.g = !1;this.j = [];this.u = new B(b, document);
      }
      E.prototype.define = function (b, a) {
        var e = this;if (!(a instanceof Function)) throw new TypeError("Custom element constructors must be functions.");if (!k(b)) throw new SyntaxError("The element name '" + b + "' is not valid.");if (this.c.a.get(b)) throw Error("A custom element with name '" + b + "' has already been defined.");if (this.h) throw Error("A custom element is already being defined.");this.h = !0;var c, d, f, g, u;try {
          var p = function (b) {
            var d = P[b];if (void 0 !== d && !(d instanceof Function)) throw Error("The '" + b + "' callback must be a function.");
            return d;
          },
              P = a.prototype;if (!(P instanceof Object)) throw new TypeError("The custom element constructor's prototype is not an object.");c = p("connectedCallback");d = p("disconnectedCallback");f = p("adoptedCallback");g = p("attributeChangedCallback");u = a.observedAttributes || [];
        } catch (va) {
          return;
        } finally {
          this.h = !1;
        }a = { localName: b, constructor: a, connectedCallback: c, disconnectedCallback: d, adoptedCallback: f, attributeChangedCallback: g, observedAttributes: u, constructionStack: [] };ba(this.c, b, a);this.j.push(a);this.g || (this.g = !0, this.i(function () {
          return da(e);
        }));
      };function da(b) {
        if (!1 !== b.g) {
          b.g = !1;for (var a = b.j, e = [], c = new Map(), d = 0; d < a.length; d++) c.set(a[d].localName, []);A(b.c, document, { s: function (d) {
              if (void 0 === d.__CE_state) {
                var a = d.localName,
                    f = c.get(a);f ? f.push(d) : b.c.a.get(a) && e.push(d);
              }
            } });for (d = 0; d < e.length; d++) y(b.c, e[d]);for (; 0 < a.length;) {
            for (var f = a.shift(), d = f.localName, f = c.get(f.localName), g = 0; g < f.length; g++) y(b.c, f[g]);(d = b.l.get(d)) && D(d);
          }
        }
      }E.prototype.get = function (b) {
        if (b = this.c.a.get(b)) return b.constructor;
      };
      E.prototype.whenDefined = function (b) {
        if (!k(b)) return Promise.reject(new SyntaxError("'" + b + "' is not a valid custom element name."));var a = this.l.get(b);if (a) return a.f;a = new ca();this.l.set(b, a);this.c.a.get(b) && !this.j.some(function (a) {
          return a.localName === b;
        }) && D(a);return a.f;
      };E.prototype.v = function (b) {
        C(this.u);var a = this.i;this.i = function (e) {
          return b(function () {
            return a(e);
          });
        };
      };window.CustomElementRegistry = E;E.prototype.define = E.prototype.define;E.prototype.get = E.prototype.get;
      E.prototype.whenDefined = E.prototype.whenDefined;E.prototype.polyfillWrapFlushCallback = E.prototype.v;var F = window.Document.prototype.createElement,
          ea = window.Document.prototype.createElementNS,
          fa = window.Document.prototype.importNode,
          ga = window.Document.prototype.prepend,
          ha = window.Document.prototype.append,
          G = window.Node.prototype.cloneNode,
          H = window.Node.prototype.appendChild,
          I = window.Node.prototype.insertBefore,
          J = window.Node.prototype.removeChild,
          K = window.Node.prototype.replaceChild,
          L = Object.getOwnPropertyDescriptor(window.Node.prototype, "textContent"),
          M = window.Element.prototype.attachShadow,
          N = Object.getOwnPropertyDescriptor(window.Element.prototype, "innerHTML"),
          O = window.Element.prototype.getAttribute,
          Q = window.Element.prototype.setAttribute,
          R = window.Element.prototype.removeAttribute,
          S = window.Element.prototype.getAttributeNS,
          T = window.Element.prototype.setAttributeNS,
          U = window.Element.prototype.removeAttributeNS,
          V = window.Element.prototype.insertAdjacentElement,
          ia = window.Element.prototype.prepend,
          ja = window.Element.prototype.append,
          ka = window.Element.prototype.before,
          la = window.Element.prototype.after,
          ma = window.Element.prototype.replaceWith,
          na = window.Element.prototype.remove,
          oa = window.HTMLElement,
          W = Object.getOwnPropertyDescriptor(window.HTMLElement.prototype, "innerHTML"),
          X = window.HTMLElement.prototype.insertAdjacentElement;function pa() {
        var b = Y;window.HTMLElement = function () {
          function a() {
            var a = this.constructor,
                c = b.m.get(a);if (!c) throw Error("The custom element being constructed was not registered with `customElements`.");var d = c.constructionStack;if (!d.length) return d = F.call(document, c.localName), Object.setPrototypeOf(d, a.prototype), d.__CE_state = 1, d.__CE_definition = c, w(b, d), d;var c = d.length - 1,
                f = d[c];if (f === h) throw Error("The HTMLElement constructor was either called reentrantly for this constructor or called multiple times.");
            d[c] = h;Object.setPrototypeOf(f, a.prototype);w(b, f);return f;
          }a.prototype = oa.prototype;return a;
        }();
      };function qa(b, a, e) {
        a.prepend = function (a) {
          for (var d = [], c = 0; c < arguments.length; ++c) d[c - 0] = arguments[c];c = d.filter(function (b) {
            return b instanceof Node && l(b);
          });e.o.apply(this, d);for (var g = 0; g < c.length; g++) z(b, c[g]);if (l(this)) for (c = 0; c < d.length; c++) g = d[c], g instanceof Element && x(b, g);
        };a.append = function (a) {
          for (var d = [], c = 0; c < arguments.length; ++c) d[c - 0] = arguments[c];c = d.filter(function (b) {
            return b instanceof Node && l(b);
          });e.append.apply(this, d);for (var g = 0; g < c.length; g++) z(b, c[g]);if (l(this)) for (c = 0; c < d.length; c++) g = d[c], g instanceof Element && x(b, g);
        };
      };function ra() {
        var b = Y;q(Document.prototype, "createElement", function (a) {
          if (this.__CE_hasRegistry) {
            var e = b.a.get(a);if (e) return new e.constructor();
          }a = F.call(this, a);w(b, a);return a;
        });q(Document.prototype, "importNode", function (a, e) {
          a = fa.call(this, a, e);this.__CE_hasRegistry ? A(b, a) : v(b, a);return a;
        });q(Document.prototype, "createElementNS", function (a, e) {
          if (this.__CE_hasRegistry && (null === a || "http://www.w3.org/1999/xhtml" === a)) {
            var c = b.a.get(e);if (c) return new c.constructor();
          }a = ea.call(this, a, e);w(b, a);return a;
        });
        qa(b, Document.prototype, { o: ga, append: ha });
      };function sa() {
        var b = Y;function a(a, c) {
          Object.defineProperty(a, "textContent", { enumerable: c.enumerable, configurable: !0, get: c.get, set: function (d) {
              if (this.nodeType === Node.TEXT_NODE) c.set.call(this, d);else {
                var a = void 0;if (this.firstChild) {
                  var e = this.childNodes,
                      u = e.length;if (0 < u && l(this)) for (var a = Array(u), p = 0; p < u; p++) a[p] = e[p];
                }c.set.call(this, d);if (a) for (d = 0; d < a.length; d++) z(b, a[d]);
              }
            } });
        }q(Node.prototype, "insertBefore", function (a, c) {
          if (a instanceof DocumentFragment) {
            var d = Array.prototype.slice.apply(a.childNodes);
            a = I.call(this, a, c);if (l(this)) for (c = 0; c < d.length; c++) x(b, d[c]);return a;
          }d = l(a);c = I.call(this, a, c);d && z(b, a);l(this) && x(b, a);return c;
        });q(Node.prototype, "appendChild", function (a) {
          if (a instanceof DocumentFragment) {
            var c = Array.prototype.slice.apply(a.childNodes);a = H.call(this, a);if (l(this)) for (var d = 0; d < c.length; d++) x(b, c[d]);return a;
          }c = l(a);d = H.call(this, a);c && z(b, a);l(this) && x(b, a);return d;
        });q(Node.prototype, "cloneNode", function (a) {
          a = G.call(this, a);this.ownerDocument.__CE_hasRegistry ? A(b, a) : v(b, a);
          return a;
        });q(Node.prototype, "removeChild", function (a) {
          var c = l(a),
              d = J.call(this, a);c && z(b, a);return d;
        });q(Node.prototype, "replaceChild", function (a, c) {
          if (a instanceof DocumentFragment) {
            var d = Array.prototype.slice.apply(a.childNodes);a = K.call(this, a, c);if (l(this)) for (z(b, c), c = 0; c < d.length; c++) x(b, d[c]);return a;
          }var d = l(a),
              e = K.call(this, a, c),
              g = l(this);g && z(b, c);d && z(b, a);g && x(b, a);return e;
        });L && L.get ? a(Node.prototype, L) : t(b, function (b) {
          a(b, { enumerable: !0, configurable: !0, get: function () {
              for (var a = [], b = 0; b < this.childNodes.length; b++) a.push(this.childNodes[b].textContent);return a.join("");
            }, set: function (a) {
              for (; this.firstChild;) J.call(this, this.firstChild);H.call(this, document.createTextNode(a));
            } });
        });
      };function ta(b) {
        var a = Element.prototype;a.before = function (a) {
          for (var c = [], d = 0; d < arguments.length; ++d) c[d - 0] = arguments[d];d = c.filter(function (a) {
            return a instanceof Node && l(a);
          });ka.apply(this, c);for (var e = 0; e < d.length; e++) z(b, d[e]);if (l(this)) for (d = 0; d < c.length; d++) e = c[d], e instanceof Element && x(b, e);
        };a.after = function (a) {
          for (var c = [], d = 0; d < arguments.length; ++d) c[d - 0] = arguments[d];d = c.filter(function (a) {
            return a instanceof Node && l(a);
          });la.apply(this, c);for (var e = 0; e < d.length; e++) z(b, d[e]);if (l(this)) for (d = 0; d < c.length; d++) e = c[d], e instanceof Element && x(b, e);
        };a.replaceWith = function (a) {
          for (var c = [], d = 0; d < arguments.length; ++d) c[d - 0] = arguments[d];var d = c.filter(function (a) {
            return a instanceof Node && l(a);
          }),
              e = l(this);ma.apply(this, c);for (var g = 0; g < d.length; g++) z(b, d[g]);if (e) for (z(b, this), d = 0; d < c.length; d++) e = c[d], e instanceof Element && x(b, e);
        };a.remove = function () {
          var a = l(this);na.call(this);a && z(b, this);
        };
      };function ua() {
        var b = Y;function a(a, c) {
          Object.defineProperty(a, "innerHTML", { enumerable: c.enumerable, configurable: !0, get: c.get, set: function (a) {
              var d = this,
                  e = void 0;l(this) && (e = [], n(this, function (a) {
                a !== d && e.push(a);
              }));c.set.call(this, a);if (e) for (var f = 0; f < e.length; f++) {
                var g = e[f];1 === g.__CE_state && b.disconnectedCallback(g);
              }this.ownerDocument.__CE_hasRegistry ? A(b, this) : v(b, this);return a;
            } });
        }function e(a, c) {
          q(a, "insertAdjacentElement", function (a, d) {
            var e = l(d);a = c.call(this, a, d);e && z(b, d);l(a) && x(b, d);
            return a;
          });
        }M ? q(Element.prototype, "attachShadow", function (a) {
          return this.__CE_shadowRoot = a = M.call(this, a);
        }) : console.warn("Custom Elements: `Element#attachShadow` was not patched.");if (N && N.get) a(Element.prototype, N);else if (W && W.get) a(HTMLElement.prototype, W);else {
          var c = F.call(document, "div");t(b, function (b) {
            a(b, { enumerable: !0, configurable: !0, get: function () {
                return G.call(this, !0).innerHTML;
              }, set: function (a) {
                var b = "template" === this.localName ? this.content : this;for (c.innerHTML = a; 0 < b.childNodes.length;) J.call(b, b.childNodes[0]);for (; 0 < c.childNodes.length;) H.call(b, c.childNodes[0]);
              } });
          });
        }q(Element.prototype, "setAttribute", function (a, c) {
          if (1 !== this.__CE_state) return Q.call(this, a, c);var d = O.call(this, a);Q.call(this, a, c);c = O.call(this, a);b.attributeChangedCallback(this, a, d, c, null);
        });q(Element.prototype, "setAttributeNS", function (a, c, e) {
          if (1 !== this.__CE_state) return T.call(this, a, c, e);var d = S.call(this, a, c);T.call(this, a, c, e);e = S.call(this, a, c);b.attributeChangedCallback(this, c, d, e, a);
        });q(Element.prototype, "removeAttribute", function (a) {
          if (1 !== this.__CE_state) return R.call(this, a);var c = O.call(this, a);R.call(this, a);null !== c && b.attributeChangedCallback(this, a, c, null, null);
        });q(Element.prototype, "removeAttributeNS", function (a, c) {
          if (1 !== this.__CE_state) return U.call(this, a, c);var d = S.call(this, a, c);U.call(this, a, c);var e = S.call(this, a, c);d !== e && b.attributeChangedCallback(this, c, d, e, a);
        });X ? e(HTMLElement.prototype, X) : V ? e(Element.prototype, V) : console.warn("Custom Elements: `Element#insertAdjacentElement` was not patched.");
        qa(b, Element.prototype, { o: ia, append: ja });ta(b);
      }; /*
         Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
         This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
         The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
         The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
         Code distributed by Google as part of the polymer project is also
         subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
         */
      var Z = window.customElements;if (!Z || Z.forcePolyfill || "function" != typeof Z.define || "function" != typeof Z.get) {
        var Y = new r();pa();ra();sa();ua();document.__CE_hasRegistry = !0;var customElements = new E(Y);Object.defineProperty(window, "customElements", { configurable: !0, enumerable: !0, value: customElements });
      };
    }).call(self);

  })(this);

  return _retrieveGlobal();
});
$__System.register("a", ["b"], function (_export, _context) {
  "use strict";

  return {
    setters: [function (_b) {}],
    execute: function () {

      const PROMISES = new Map();
      const OBJECTS = new Map();

      const TYPE_MAP = new Map([["text", new Set(["txt", "html", "css", "js", "svg"])], ["json", new Set(["json"])], ["binary", new Set(["bin"])]]);

      class Loader {
        static get onLoad() {
          return Promise.all(PROMISES.values());
        }

        static get promises() {
          return PROMISES;
        }

        static get typeMap() {
          return TYPE_MAP;
        }

        static get(value) {
          return OBJECTS.get(value);
        }

        static load(values) {
          const returnArray = values instanceof Array;

          if (!returnArray) {
            values = [values];
          }

          let promises = [];

          for (let value of values) {
            if (!value) {
              continue;
            }

            let promise = PROMISES.get(value) || new Promise(function (resolve, reject) {
              if (Loader.get(value)) {
                resolve(Loader.get(value));
                return;
              }

              let onLoad = response => {
                PROMISES.delete(value);
                OBJECTS.set(value, response);
                resolve(response);
              };

              let element;

              if (typeof value === "string") {
                let extension = /[\\/](.*)\.(.*)$/.exec(value)[2];

                if (/\.(png|jpg|gif)$/.test(value)) {
                  element = document.createElement("img");
                } else if (/\.(mp4|webm)$/.test(value)) {
                  element = document.createElement("video");
                } else if (/\.(mp3|ogg)$/.test(value)) {
                  element = document.createElement("audio");
                } else if (/\.(woff|woff2)$/.test(value)) {
                  let fontFace = new FontFace(/([^\/]*)\.(woff|woff2)$/.exec(value)[1], `url("${value}")`);
                  fontFace.load().then(onLoad);
                  document.fonts.add(fontFace);
                } else {
                  fetch(value).then(response => {
                    let method;
                    if (Loader.typeMap.get("json").has(extension)) {
                      method = "json";
                    } else if (Loader.typeMap.get("binary").has(extension)) {
                      method = "arrayBuffer";
                    } else if (Loader.typeMap.get("text").has(extension)) {
                      method = "text";
                    } else {
                      method = "blob";
                    }
                    return response[method]();
                  }).then(onLoad);
                }
              }

              if (value instanceof HTMLElement) {
                element = value;
              }

              if (element) {
                const src = element.src || value;
                fetch(src).then(response => {
                  return response.blob();
                }).then(() => {
                  const loaded = () => {
                    element.removeEventListener("canplaythrough", loaded);
                    element.removeEventListener("load", loaded);
                    onLoad(element);
                  };
                  if (element.play) {
                    element.addEventListener("canplaythrough", loaded);
                    element.play();
                    if (!element.autoplay) {
                      let pauseElement = function () {
                        element.pause();
                        element.removeEventListener("playing", pauseElement);
                      };
                      element.addEventListener("playing", pauseElement);
                    }
                  } else {
                    element.addEventListener("load", loaded);
                  }
                  element.src = src;
                });
              }
            });

            promises.push(promise);
            PROMISES.set(value, promise);
          }

          return returnArray ? Promise.all(promises) : promises[0];
        }
      }

      let template = document.createElement("template");
      Loader.load("src/main/template.html").then(value => {
        template.innerHTML = value;
      });

      Loader.onLoad.then(() => {
        window.customElements.define("dnit-main", class extends HTMLElement {
          connectedCallback() {
            let templateClone = document.importNode(template.content, true);
            this.appendChild(templateClone);
          }
        });
      });
    }
  };
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define([], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory();
  else
    factory();
});