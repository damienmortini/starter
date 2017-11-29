!function(e){function t(e){Object.defineProperty(this,e,{enumerable:!0,get:function(){return this[v][e]}})}function r(e){if("undefined"!=typeof System&&System.isModule?System.isModule(e):"[object Module]"===Object.prototype.toString.call(e))return e;var t={default:e,__useDefault:e};if(e&&e.__esModule)for(var r in e)Object.hasOwnProperty.call(e,r)&&(t[r]=e[r]);return new o(t)}function o(e){Object.defineProperty(this,v,{value:e}),Object.keys(e).forEach(t,this)}function n(e){return"@node/"===e.substr(0,6)?c(e,r(m(e.substr(6))),{}):p[e]}function u(e){var t=n(e);if(!t)throw new Error('Module "'+e+'" expected, but not contained in build.');if(t.module)return t.module;var r=t.linkRecord;return i(t,r),a(t,r,[]),t.module}function i(e,t){if(!t.depLoads){t.declare&&d(e,t),t.depLoads=[];for(var r=0;r<t.deps.length;r++){var o=n(t.deps[r]);t.depLoads.push(o),o.linkRecord&&i(o,o.linkRecord);var u=t.setters&&t.setters[r];u&&(u(o.module||o.linkRecord.moduleObj),o.importerSetters.push(u))}return e}}function d(t,r){var o=r.moduleObj,n=t.importerSetters,u=!1,i=r.declare.call(e,function(e,t){if(!u){if("object"==typeof e)for(var r in e)"__useDefault"!==r&&(o[r]=e[r]);else o[e]=t;u=!0;for(var i=0;i<n.length;i++)n[i](o);return u=!1,t}},{id:t.key});"function"!=typeof i?(r.setters=i.setters,r.execute=i.execute):(r.setters=[],r.execute=i)}function l(e,t,r){return p[e]={key:e,module:void 0,importerSetters:[],linkRecord:{deps:t,depLoads:void 0,declare:r,setters:void 0,execute:void 0,moduleObj:{}}}}function f(e,t,r,o){var n={};return p[e]={key:e,module:void 0,importerSetters:[],linkRecord:{deps:t,depLoads:void 0,declare:void 0,execute:o,executingRequire:r,moduleObj:{default:n,__useDefault:n},setters:void 0}}}function s(e,t,r){return function(o){for(var n=0;n<e.length;n++)if(e[n]===o){var u,i=t[n],d=i.linkRecord;return u=d?-1===r.indexOf(i)?a(i,d,r):d.moduleObj:i.module,"__useDefault"in u?u.__useDefault:u}}}function a(t,r,n){if(n.push(t),t.module)return t.module;var u;if(r.setters){for(var i=0;i<r.deps.length;i++){var d=r.depLoads[i],l=d.linkRecord;l&&-1===n.indexOf(d)&&(u=a(d,l,l.setters?n:[]))}r.execute.call(y)}else{var f={id:t.key},c=r.moduleObj;Object.defineProperty(f,"exports",{configurable:!0,set:function(e){c.default=c.__useDefault=e},get:function(){return c.__useDefault}});var p=s(r.deps,r.depLoads,n);if(!r.executingRequire)for(var i=0;i<r.deps.length;i++)p(r.deps[i]);var v=r.execute.call(e,p,c.__useDefault,f);void 0!==v?c.default=c.__useDefault=v:f.exports!==c.__useDefault&&(c.default=c.__useDefault=f.exports);var m=c.__useDefault;if(m&&m.__esModule)for(var b in m)Object.hasOwnProperty.call(m,b)&&(c[b]=m[b])}var f=t.module=new o(r.moduleObj);if(!r.setters)for(var i=0;i<t.importerSetters.length;i++)t.importerSetters[i](f);return f}function c(e,t){return p[e]={key:e,module:t,importerSetters:[],linkRecord:void 0}}var p={},v="undefined"!=typeof Symbol?Symbol():"@@baseObject";o.prototype=Object.create(null),"undefined"!=typeof Symbol&&Symbol.toStringTag&&(o.prototype[Symbol.toStringTag]="Module");var m="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,y={};return Object.freeze&&Object.freeze(y),function(e,t,n,i){return function(d){d(function(d){var s={_nodeRequire:m,register:l,registerDynamic:f,registry:{get:function(e){return p[e].module},set:c},newModule:function(e){return new o(e)}};c("@empty",new o({}));for(var a=0;a<t.length;a++)c(t[a],r(arguments[a],{}));i(s);var v=u(e[0]);if(e.length>1)for(var a=1;a<e.length;a++)u(e[a]);return n?v.__useDefault:(v instanceof o&&Object.defineProperty(v,"__esModule",{value:!0}),v)})}}}("undefined"!=typeof self?self:"undefined"!=typeof global?global:this)

(["a"], [], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
!function(e){function r(e,r){for(var n=e.split(".");n.length;)r=r[n.shift()];return r}function n(n){if("string"==typeof n)return r(n,e);if(!(n instanceof Array))throw new Error("Global exports must be a string or array.");for(var t={},o=0;o<n.length;o++)t[n[o].split(".").pop()]=r(n[o],e);return t}function t(r){if(-1===a.indexOf(r)){try{var n=e[r]}catch(e){a.push(r)}this(r,n)}}var o,i=$__System,a=["_g","sessionStorage","localStorage","clipboardData","frames","frameElement","external","mozAnimationStartTime","webkitStorageInfo","webkitIndexedDB","mozInnerScreenY","mozInnerScreenX"];i.registry.set("@@global-helpers",i.newModule({prepareGlobal:function(r,i,a){var f=e.define;e.define=void 0;var s;if(a){s={};for(var l in a)s[l]=e[l],e[l]=a[l]}return i||(o={},Object.keys(e).forEach(t,function(e,r){o[e]=r})),function(){var r,a=i?n(i):{},l=!!i;if(i||Object.keys(e).forEach(t,function(e,n){o[e]!==n&&void 0!==n&&(i||(a[e]=n,void 0!==r?l||r===n||(l=!0):r=n))}),a=l?a:r,s)for(var c in s)e[c]=s[c];return e.define=f,a}}}))}("undefined"!=typeof self?self:global);
$__System.registerDynamic("b", [], false, function ($__require, $__exports, $__module) {
  var _retrieveGlobal = $__System.registry.get("@@global-helpers").prepareGlobal($__module.id, null, null);

  (function ($__global) {
    (function () {
      'use strict';
      var h = new function () {}();var aa = new Set("annotation-xml color-profile font-face font-face-src font-face-uri font-face-format font-face-name missing-glyph".split(" "));function n(b) {
        var a = aa.has(b);b = /^[a-z][.0-9_a-z]*-[\-.0-9_a-z]*$/.test(b);return !a && b;
      }function p(b) {
        var a = b.isConnected;if (void 0 !== a) return a;for (; b && !(b.__CE_isImportDocument || b instanceof Document);) b = b.parentNode || (window.ShadowRoot && b instanceof ShadowRoot ? b.host : void 0);return !(!b || !(b.__CE_isImportDocument || b instanceof Document));
      }
      function q(b, a) {
        for (; a && a !== b && !a.nextSibling;) a = a.parentNode;return a && a !== b ? a.nextSibling : null;
      }
      function t(b, a, c) {
        c = c ? c : new Set();for (var d = b; d;) {
          if (d.nodeType === Node.ELEMENT_NODE) {
            var e = d;a(e);var f = e.localName;if ("link" === f && "import" === e.getAttribute("rel")) {
              d = e.import;if (d instanceof Node && !c.has(d)) for (c.add(d), d = d.firstChild; d; d = d.nextSibling) t(d, a, c);d = q(b, e);continue;
            } else if ("template" === f) {
              d = q(b, e);continue;
            }if (e = e.__CE_shadowRoot) for (e = e.firstChild; e; e = e.nextSibling) t(e, a, c);
          }d = d.firstChild ? d.firstChild : q(b, d);
        }
      }function u(b, a, c) {
        b[a] = c;
      };function v() {
        this.a = new Map();this.o = new Map();this.f = [];this.b = !1;
      }function ba(b, a, c) {
        b.a.set(a, c);b.o.set(c.constructor, c);
      }function w(b, a) {
        b.b = !0;b.f.push(a);
      }function x(b, a) {
        b.b && t(a, function (a) {
          return y(b, a);
        });
      }function y(b, a) {
        if (b.b && !a.__CE_patched) {
          a.__CE_patched = !0;for (var c = 0; c < b.f.length; c++) b.f[c](a);
        }
      }function z(b, a) {
        var c = [];t(a, function (b) {
          return c.push(b);
        });for (a = 0; a < c.length; a++) {
          var d = c[a];1 === d.__CE_state ? b.connectedCallback(d) : A(b, d);
        }
      }
      function B(b, a) {
        var c = [];t(a, function (b) {
          return c.push(b);
        });for (a = 0; a < c.length; a++) {
          var d = c[a];1 === d.__CE_state && b.disconnectedCallback(d);
        }
      }
      function C(b, a, c) {
        c = c ? c : {};var d = c.w || new Set(),
            e = c.s || function (a) {
          return A(b, a);
        },
            f = [];t(a, function (a) {
          if ("link" === a.localName && "import" === a.getAttribute("rel")) {
            var c = a.import;c instanceof Node && (c.__CE_isImportDocument = !0, c.__CE_hasRegistry = !0);c && "complete" === c.readyState ? c.__CE_documentLoadHandled = !0 : a.addEventListener("load", function () {
              var c = a.import;if (!c.__CE_documentLoadHandled) {
                c.__CE_documentLoadHandled = !0;var f = new Set(d);f.delete(c);C(b, c, { w: f, s: e });
              }
            });
          } else f.push(a);
        }, d);if (b.b) for (a = 0; a < f.length; a++) y(b, f[a]);for (a = 0; a < f.length; a++) e(f[a]);
      }
      function A(b, a) {
        if (void 0 === a.__CE_state) {
          var c = a.ownerDocument;if (c.defaultView || c.__CE_isImportDocument && c.__CE_hasRegistry) if (c = b.a.get(a.localName)) {
            c.constructionStack.push(a);var d = c.constructor;try {
              try {
                if (new d() !== a) throw Error("The custom element constructor did not produce the element being upgraded.");
              } finally {
                c.constructionStack.pop();
              }
            } catch (m) {
              throw a.__CE_state = 2, m;
            }a.__CE_state = 1;a.__CE_definition = c;if (c.attributeChangedCallback) for (c = c.observedAttributes, d = 0; d < c.length; d++) {
              var e = c[d],
                  f = a.getAttribute(e);null !== f && b.attributeChangedCallback(a, e, null, f, null);
            }p(a) && b.connectedCallback(a);
          }
        }
      }v.prototype.connectedCallback = function (b) {
        var a = b.__CE_definition;a.connectedCallback && a.connectedCallback.call(b);
      };v.prototype.disconnectedCallback = function (b) {
        var a = b.__CE_definition;a.disconnectedCallback && a.disconnectedCallback.call(b);
      };
      v.prototype.attributeChangedCallback = function (b, a, c, d, e) {
        var f = b.__CE_definition;f.attributeChangedCallback && -1 < f.observedAttributes.indexOf(a) && f.attributeChangedCallback.call(b, a, c, d, e);
      };function D(b, a) {
        this.c = b;this.a = a;this.b = void 0;C(this.c, this.a);"loading" === this.a.readyState && (this.b = new MutationObserver(this.f.bind(this)), this.b.observe(this.a, { childList: !0, subtree: !0 }));
      }function E(b) {
        b.b && b.b.disconnect();
      }D.prototype.f = function (b) {
        var a = this.a.readyState;"interactive" !== a && "complete" !== a || E(this);for (a = 0; a < b.length; a++) for (var c = b[a].addedNodes, d = 0; d < c.length; d++) C(this.c, c[d]);
      };function ca() {
        var b = this;this.b = this.a = void 0;this.f = new Promise(function (a) {
          b.b = a;b.a && a(b.a);
        });
      }function F(b) {
        if (b.a) throw Error("Already resolved.");b.a = void 0;b.b && b.b(void 0);
      };function G(b) {
        this.i = !1;this.c = b;this.m = new Map();this.j = function (b) {
          return b();
        };this.g = !1;this.l = [];this.u = new D(b, document);
      }
      G.prototype.define = function (b, a) {
        var c = this;if (!(a instanceof Function)) throw new TypeError("Custom element constructors must be functions.");if (!n(b)) throw new SyntaxError("The element name '" + b + "' is not valid.");if (this.c.a.get(b)) throw Error("A custom element with name '" + b + "' has already been defined.");if (this.i) throw Error("A custom element is already being defined.");this.i = !0;var d, e, f, m, l;try {
          var g = function (b) {
            var a = k[b];if (void 0 !== a && !(a instanceof Function)) throw Error("The '" + b + "' callback must be a function.");
            return a;
          },
              k = a.prototype;if (!(k instanceof Object)) throw new TypeError("The custom element constructor's prototype is not an object.");d = g("connectedCallback");e = g("disconnectedCallback");f = g("adoptedCallback");m = g("attributeChangedCallback");l = a.observedAttributes || [];
        } catch (r) {
          return;
        } finally {
          this.i = !1;
        }a = { localName: b, constructor: a, connectedCallback: d, disconnectedCallback: e, adoptedCallback: f, attributeChangedCallback: m, observedAttributes: l, constructionStack: [] };ba(this.c, b, a);this.l.push(a);this.g || (this.g = !0, this.j(function () {
          return da(c);
        }));
      };function da(b) {
        if (!1 !== b.g) {
          b.g = !1;for (var a = b.l, c = [], d = new Map(), e = 0; e < a.length; e++) d.set(a[e].localName, []);C(b.c, document, { s: function (a) {
              if (void 0 === a.__CE_state) {
                var e = a.localName,
                    f = d.get(e);f ? f.push(a) : b.c.a.get(e) && c.push(a);
              }
            } });for (e = 0; e < c.length; e++) A(b.c, c[e]);for (; 0 < a.length;) {
            for (var f = a.shift(), e = f.localName, f = d.get(f.localName), m = 0; m < f.length; m++) A(b.c, f[m]);(e = b.m.get(e)) && F(e);
          }
        }
      }G.prototype.get = function (b) {
        if (b = this.c.a.get(b)) return b.constructor;
      };
      G.prototype.whenDefined = function (b) {
        if (!n(b)) return Promise.reject(new SyntaxError("'" + b + "' is not a valid custom element name."));var a = this.m.get(b);if (a) return a.f;a = new ca();this.m.set(b, a);this.c.a.get(b) && !this.l.some(function (a) {
          return a.localName === b;
        }) && F(a);return a.f;
      };G.prototype.v = function (b) {
        E(this.u);var a = this.j;this.j = function (c) {
          return b(function () {
            return a(c);
          });
        };
      };window.CustomElementRegistry = G;G.prototype.define = G.prototype.define;G.prototype.get = G.prototype.get;
      G.prototype.whenDefined = G.prototype.whenDefined;G.prototype.polyfillWrapFlushCallback = G.prototype.v;var H = window.Document.prototype.createElement,
          ea = window.Document.prototype.createElementNS,
          fa = window.Document.prototype.importNode,
          ga = window.Document.prototype.prepend,
          ha = window.Document.prototype.append,
          ia = window.DocumentFragment.prototype.prepend,
          ja = window.DocumentFragment.prototype.append,
          I = window.Node.prototype.cloneNode,
          J = window.Node.prototype.appendChild,
          K = window.Node.prototype.insertBefore,
          L = window.Node.prototype.removeChild,
          M = window.Node.prototype.replaceChild,
          N = Object.getOwnPropertyDescriptor(window.Node.prototype, "textContent"),
          O = window.Element.prototype.attachShadow,
          P = Object.getOwnPropertyDescriptor(window.Element.prototype, "innerHTML"),
          Q = window.Element.prototype.getAttribute,
          R = window.Element.prototype.setAttribute,
          S = window.Element.prototype.removeAttribute,
          T = window.Element.prototype.getAttributeNS,
          U = window.Element.prototype.setAttributeNS,
          ka = window.Element.prototype.removeAttributeNS,
          la = window.Element.prototype.insertAdjacentElement,
          ma = window.Element.prototype.prepend,
          na = window.Element.prototype.append,
          V = window.Element.prototype.before,
          oa = window.Element.prototype.after,
          pa = window.Element.prototype.replaceWith,
          qa = window.Element.prototype.remove,
          ra = window.HTMLElement,
          W = Object.getOwnPropertyDescriptor(window.HTMLElement.prototype, "innerHTML"),
          sa = window.HTMLElement.prototype.insertAdjacentElement;function ta() {
        var b = X;window.HTMLElement = function () {
          function a() {
            var a = this.constructor,
                d = b.o.get(a);if (!d) throw Error("The custom element being constructed was not registered with `customElements`.");var e = d.constructionStack;if (!e.length) return e = H.call(document, d.localName), Object.setPrototypeOf(e, a.prototype), e.__CE_state = 1, e.__CE_definition = d, y(b, e), e;var d = e.length - 1,
                f = e[d];if (f === h) throw Error("The HTMLElement constructor was either called reentrantly for this constructor or called multiple times.");
            e[d] = h;Object.setPrototypeOf(f, a.prototype);y(b, f);return f;
          }a.prototype = ra.prototype;return a;
        }();
      };function Y(b, a, c) {
        function d(a) {
          return function (d) {
            for (var c = [], e = 0; e < arguments.length; ++e) c[e - 0] = arguments[e];for (var e = [], f = [], k = 0; k < c.length; k++) {
              var r = c[k];r instanceof Element && p(r) && f.push(r);if (r instanceof DocumentFragment) for (r = r.firstChild; r; r = r.nextSibling) e.push(r);else e.push(r);
            }a.apply(this, c);for (c = 0; c < f.length; c++) B(b, f[c]);if (p(this)) for (c = 0; c < e.length; c++) f = e[c], f instanceof Element && z(b, f);
          };
        }c.h && (a.prepend = d(c.h));c.append && (a.append = d(c.append));
      };function ua() {
        var b = X;u(Document.prototype, "createElement", function (a) {
          if (this.__CE_hasRegistry) {
            var c = b.a.get(a);if (c) return new c.constructor();
          }a = H.call(this, a);y(b, a);return a;
        });u(Document.prototype, "importNode", function (a, c) {
          a = fa.call(this, a, c);this.__CE_hasRegistry ? C(b, a) : x(b, a);return a;
        });u(Document.prototype, "createElementNS", function (a, c) {
          if (this.__CE_hasRegistry && (null === a || "http://www.w3.org/1999/xhtml" === a)) {
            var d = b.a.get(c);if (d) return new d.constructor();
          }a = ea.call(this, a, c);y(b, a);return a;
        });
        Y(b, Document.prototype, { h: ga, append: ha });
      };function va() {
        var b = X;function a(a, d) {
          Object.defineProperty(a, "textContent", { enumerable: d.enumerable, configurable: !0, get: d.get, set: function (a) {
              if (this.nodeType === Node.TEXT_NODE) d.set.call(this, a);else {
                var c = void 0;if (this.firstChild) {
                  var e = this.childNodes,
                      l = e.length;if (0 < l && p(this)) for (var c = Array(l), g = 0; g < l; g++) c[g] = e[g];
                }d.set.call(this, a);if (c) for (a = 0; a < c.length; a++) B(b, c[a]);
              }
            } });
        }u(Node.prototype, "insertBefore", function (a, d) {
          if (a instanceof DocumentFragment) {
            var c = Array.prototype.slice.apply(a.childNodes);
            a = K.call(this, a, d);if (p(this)) for (d = 0; d < c.length; d++) z(b, c[d]);return a;
          }c = p(a);d = K.call(this, a, d);c && B(b, a);p(this) && z(b, a);return d;
        });u(Node.prototype, "appendChild", function (a) {
          if (a instanceof DocumentFragment) {
            var c = Array.prototype.slice.apply(a.childNodes);a = J.call(this, a);if (p(this)) for (var e = 0; e < c.length; e++) z(b, c[e]);return a;
          }c = p(a);e = J.call(this, a);c && B(b, a);p(this) && z(b, a);return e;
        });u(Node.prototype, "cloneNode", function (a) {
          a = I.call(this, a);this.ownerDocument.__CE_hasRegistry ? C(b, a) : x(b, a);
          return a;
        });u(Node.prototype, "removeChild", function (a) {
          var c = p(a),
              e = L.call(this, a);c && B(b, a);return e;
        });u(Node.prototype, "replaceChild", function (a, d) {
          if (a instanceof DocumentFragment) {
            var e = Array.prototype.slice.apply(a.childNodes);a = M.call(this, a, d);if (p(this)) for (B(b, d), d = 0; d < e.length; d++) z(b, e[d]);return a;
          }var e = p(a),
              c = M.call(this, a, d),
              m = p(this);m && B(b, d);e && B(b, a);m && z(b, a);return c;
        });N && N.get ? a(Node.prototype, N) : w(b, function (b) {
          a(b, { enumerable: !0, configurable: !0, get: function () {
              for (var a = [], b = 0; b < this.childNodes.length; b++) a.push(this.childNodes[b].textContent);return a.join("");
            }, set: function (a) {
              for (; this.firstChild;) L.call(this, this.firstChild);J.call(this, document.createTextNode(a));
            } });
        });
      };function wa(b) {
        var a = Element.prototype;function c(a) {
          return function (c) {
            for (var d = [], e = 0; e < arguments.length; ++e) d[e - 0] = arguments[e];for (var e = [], l = [], g = 0; g < d.length; g++) {
              var k = d[g];k instanceof Element && p(k) && l.push(k);if (k instanceof DocumentFragment) for (k = k.firstChild; k; k = k.nextSibling) e.push(k);else e.push(k);
            }a.apply(this, d);for (d = 0; d < l.length; d++) B(b, l[d]);if (p(this)) for (d = 0; d < e.length; d++) l = e[d], l instanceof Element && z(b, l);
          };
        }V && (a.before = c(V));V && (a.after = c(oa));pa && u(a, "replaceWith", function (a) {
          for (var d = [], c = 0; c < arguments.length; ++c) d[c - 0] = arguments[c];for (var c = [], m = [], l = 0; l < d.length; l++) {
            var g = d[l];g instanceof Element && p(g) && m.push(g);if (g instanceof DocumentFragment) for (g = g.firstChild; g; g = g.nextSibling) c.push(g);else c.push(g);
          }l = p(this);pa.apply(this, d);for (d = 0; d < m.length; d++) B(b, m[d]);if (l) for (B(b, this), d = 0; d < c.length; d++) m = c[d], m instanceof Element && z(b, m);
        });qa && u(a, "remove", function () {
          var a = p(this);qa.call(this);a && B(b, this);
        });
      };function xa() {
        var b = X;function a(a, c) {
          Object.defineProperty(a, "innerHTML", { enumerable: c.enumerable, configurable: !0, get: c.get, set: function (a) {
              var d = this,
                  e = void 0;p(this) && (e = [], t(this, function (a) {
                a !== d && e.push(a);
              }));c.set.call(this, a);if (e) for (var f = 0; f < e.length; f++) {
                var k = e[f];1 === k.__CE_state && b.disconnectedCallback(k);
              }this.ownerDocument.__CE_hasRegistry ? C(b, this) : x(b, this);return a;
            } });
        }function c(a, c) {
          u(a, "insertAdjacentElement", function (a, d) {
            var e = p(d);a = c.call(this, a, d);e && B(b, d);p(a) && z(b, d);
            return a;
          });
        }O && u(Element.prototype, "attachShadow", function (a) {
          return this.__CE_shadowRoot = a = O.call(this, a);
        });P && P.get ? a(Element.prototype, P) : W && W.get ? a(HTMLElement.prototype, W) : w(b, function (b) {
          a(b, { enumerable: !0, configurable: !0, get: function () {
              return I.call(this, !0).innerHTML;
            }, set: function (a) {
              var b = "template" === this.localName,
                  d = b ? this.content : this,
                  c = H.call(document, this.localName);for (c.innerHTML = a; 0 < d.childNodes.length;) L.call(d, d.childNodes[0]);for (a = b ? c.content : c; 0 < a.childNodes.length;) J.call(d, a.childNodes[0]);
            } });
        });u(Element.prototype, "setAttribute", function (a, c) {
          if (1 !== this.__CE_state) return R.call(this, a, c);var d = Q.call(this, a);R.call(this, a, c);c = Q.call(this, a);b.attributeChangedCallback(this, a, d, c, null);
        });u(Element.prototype, "setAttributeNS", function (a, c, f) {
          if (1 !== this.__CE_state) return U.call(this, a, c, f);var d = T.call(this, a, c);U.call(this, a, c, f);f = T.call(this, a, c);b.attributeChangedCallback(this, c, d, f, a);
        });u(Element.prototype, "removeAttribute", function (a) {
          if (1 !== this.__CE_state) return S.call(this, a);var c = Q.call(this, a);S.call(this, a);null !== c && b.attributeChangedCallback(this, a, c, null, null);
        });u(Element.prototype, "removeAttributeNS", function (a, c) {
          if (1 !== this.__CE_state) return ka.call(this, a, c);var d = T.call(this, a, c);ka.call(this, a, c);var e = T.call(this, a, c);d !== e && b.attributeChangedCallback(this, c, d, e, a);
        });sa ? c(HTMLElement.prototype, sa) : la ? c(Element.prototype, la) : console.warn("Custom Elements: `Element#insertAdjacentElement` was not patched.");Y(b, Element.prototype, { h: ma, append: na });wa(b);
      }; /*
         Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
         This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
         The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
         The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
         Code distributed by Google as part of the polymer project is also
         subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
         */
      var Z = window.customElements;if (!Z || Z.forcePolyfill || "function" != typeof Z.define || "function" != typeof Z.get) {
        var X = new v();ta();ua();Y(X, DocumentFragment.prototype, { h: ia, append: ja });va();xa();document.__CE_hasRegistry = !0;var customElements = new G(X);Object.defineProperty(window, "customElements", { configurable: !0, enumerable: !0, value: customElements });
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

      class Signal extends Set {
        constructor() {
          super();

          this._onceCallbacks = new Set();
        }

        add(value, { once = false } = {}) {
          if (once) {
            this._onceCallbacks.add(value);
          }

          super.add(value);
        }

        dispatch(value) {
          for (let callback of this) {
            callback(value);

            if (this._onceCallbacks.has(callback)) {
              this._onceCallbacks.delete(callback);
              this.delete(callback);
            }
          }
        }
      }

      class Ticker extends Signal {
        constructor() {
          super();

          this._updateBinded = this.update.bind(this);

          this._previousTimestamp = 0;
          this.deltaTime = 0;
          this.timeScale = 1;

          this.update();
        }

        update(time) {
          requestAnimationFrame(this._updateBinded);

          let timestamp = window.performance ? window.performance.now() : Date.now();
          this.deltaTime = (timestamp - this._previousTimestamp) * .001;
          this.timeScale = this.deltaTime / .0166666667;
          this._previousTimestamp = timestamp;

          this.dispatch(time);
        }
      }

      var Ticker$1 = new Ticker();

      class LoopElement extends HTMLElement {
        constructor({ autoplay = true, background = false } = {}) {
          super();
          this._autoplay = autoplay || this.hasAttribute("autoplay");
          this._background = background || this.hasAttribute("background");

          this.paused = true;

          this._updateBinded = this.update.bind(this);
        }

        connectedCallback() {
          if (!this._background) {
            window.addEventListener("blur", this._pauseBinded = this.pause.bind(this));
            window.addEventListener("focus", this._playBinded = this.play.bind(this));
          }
          if (this._autoplay) {
            this.play();
          }
        }

        disconnectedCallback() {
          this.pause();
          window.removeEventListener("blur", this._pauseBinded);
          window.removeEventListener("focus", this._playBinded);
        }

        play() {
          this.paused = false;
          Ticker$1.add(this._updateBinded);
          this.dispatchEvent(new Event("playing"));
        }

        pause() {
          this.paused = true;
          Ticker$1.delete(this._updateBinded);
          this.dispatchEvent(new Event("pause"));
        }

        update() {}
      }

      window.customElements.define("dlib-loop", LoopElement);

      let baseURI = "";

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

        static get baseURI() {
          return baseURI;
        }

        static set baseURI(value) {
          baseURI = value;
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

            let promise = new Promise(function (resolve, reject) {
              if (PROMISES.get(value)) {
                PROMISES.get(value).then(resolve);
                return;
              }

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
                } else if (/\.(woff|woff2|ttf)$/.test(value)) {
                  let fontFace = new FontFace(/([^\/]*)\.(woff|woff2|ttf)$/.exec(value)[1], `url("${value}")`);
                  fontFace.load().then(onLoad);
                  document.fonts.add(fontFace);
                } else {
                  fetch(`${baseURI}${value}`).then(response => {
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
                const src = `${baseURI}${element.src || value}`;
                const loaded = () => {
                  element.removeEventListener("canplaythrough", loaded);
                  element.removeEventListener("load", loaded);
                  onLoad(element);
                };
                if (element.play) {
                  fetch(src).then(() => {
                    element.addEventListener("canplaythrough", loaded);
                    element.play();
                    // TODO: Check if this is still needed
                    if (!element.autoplay) {
                      let pauseElement = function () {
                        element.pause();
                        element.removeEventListener("playing", pauseElement);
                      };
                      element.addEventListener("playing", pauseElement);
                    }
                  });
                } else {
                  element.addEventListener("load", loaded);
                }
                element.src = src;
              }
            });

            promises.push(promise);
            PROMISES.set(value, promise);
          }

          return returnArray ? Promise.all(promises) : promises[0];
        }
      }

      /* Copyright (c) 2015, Brandon Jones, Colin MacKenzie IV.
      
      Permission is hereby granted, free of charge, to any person obtaining a copy
      of this software and associated documentation files (the "Software"), to deal
      in the Software without restriction, including without limitation the rights
      to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
      copies of the Software, and to permit persons to whom the Software is
      furnished to do so, subject to the following conditions:
      
      The above copyright notice and this permission notice shall be included in
      all copies or substantial portions of the Software.
      
      THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
      IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
      FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
      AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
      LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
      OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
      THE SOFTWARE. */

      /**
       * Common utilities
       * @module glMatrix
       */

      // Configuration Constants
      const EPSILON = 0.000001;
      let ARRAY_TYPE = typeof Float32Array !== 'undefined' ? Float32Array : Array;
      const RANDOM = Math.random;

      /**
       * Sets the type of array used when creating new vectors and matrices
       *
       * @param {Type} type Array type, such as Float32Array or Array
       */

      /**
       * Convert Degree To Radian
       *
       * @param {Number} a Angle in Degrees
       */

      /**
       * Tests whether or not the arguments have approximately the same value, within an absolute
       * or relative tolerance of glMatrix.EPSILON (an absolute tolerance is used for values less
       * than or equal to 1.0, and a relative tolerance is used for larger values)
       *
       * @param {Number} a The first number to test.
       * @param {Number} b The second number to test.
       * @returns {Boolean} True if the numbers are approximately equal, false otherwise.
       */

      /* Copyright (c) 2015, Brandon Jones, Colin MacKenzie IV.
      
      Permission is hereby granted, free of charge, to any person obtaining a copy
      of this software and associated documentation files (the "Software"), to deal
      in the Software without restriction, including without limitation the rights
      to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
      copies of the Software, and to permit persons to whom the Software is
      furnished to do so, subject to the following conditions:
      
      The above copyright notice and this permission notice shall be included in
      all copies or substantial portions of the Software.
      
      THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
      IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
      FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
      AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
      LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
      OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
      THE SOFTWARE. */

      /**
       * 4x4 Matrix
       * @module mat4
       */

      /**
       * Creates a new identity mat4
       *
       * @returns {mat4} a new 4x4 matrix
       */

      /**
       * Creates a new mat4 initialized with values from an existing matrix
       *
       * @param {mat4} a matrix to clone
       * @returns {mat4} a new 4x4 matrix
       */

      /**
       * Copy the values from one mat4 to another
       *
       * @param {mat4} out the receiving matrix
       * @param {mat4} a the source matrix
       * @returns {mat4} out
       */
      function copy(out, a) {
        out[0] = a[0];
        out[1] = a[1];
        out[2] = a[2];
        out[3] = a[3];
        out[4] = a[4];
        out[5] = a[5];
        out[6] = a[6];
        out[7] = a[7];
        out[8] = a[8];
        out[9] = a[9];
        out[10] = a[10];
        out[11] = a[11];
        out[12] = a[12];
        out[13] = a[13];
        out[14] = a[14];
        out[15] = a[15];
        return out;
      }

      /**
       * Create a new mat4 with the given values
       *
       * @param {Number} m00 Component in column 0, row 0 position (index 0)
       * @param {Number} m01 Component in column 0, row 1 position (index 1)
       * @param {Number} m02 Component in column 0, row 2 position (index 2)
       * @param {Number} m03 Component in column 0, row 3 position (index 3)
       * @param {Number} m10 Component in column 1, row 0 position (index 4)
       * @param {Number} m11 Component in column 1, row 1 position (index 5)
       * @param {Number} m12 Component in column 1, row 2 position (index 6)
       * @param {Number} m13 Component in column 1, row 3 position (index 7)
       * @param {Number} m20 Component in column 2, row 0 position (index 8)
       * @param {Number} m21 Component in column 2, row 1 position (index 9)
       * @param {Number} m22 Component in column 2, row 2 position (index 10)
       * @param {Number} m23 Component in column 2, row 3 position (index 11)
       * @param {Number} m30 Component in column 3, row 0 position (index 12)
       * @param {Number} m31 Component in column 3, row 1 position (index 13)
       * @param {Number} m32 Component in column 3, row 2 position (index 14)
       * @param {Number} m33 Component in column 3, row 3 position (index 15)
       * @returns {mat4} A new mat4
       */

      /**
       * Set the components of a mat4 to the given values
       *
       * @param {mat4} out the receiving matrix
       * @param {Number} m00 Component in column 0, row 0 position (index 0)
       * @param {Number} m01 Component in column 0, row 1 position (index 1)
       * @param {Number} m02 Component in column 0, row 2 position (index 2)
       * @param {Number} m03 Component in column 0, row 3 position (index 3)
       * @param {Number} m10 Component in column 1, row 0 position (index 4)
       * @param {Number} m11 Component in column 1, row 1 position (index 5)
       * @param {Number} m12 Component in column 1, row 2 position (index 6)
       * @param {Number} m13 Component in column 1, row 3 position (index 7)
       * @param {Number} m20 Component in column 2, row 0 position (index 8)
       * @param {Number} m21 Component in column 2, row 1 position (index 9)
       * @param {Number} m22 Component in column 2, row 2 position (index 10)
       * @param {Number} m23 Component in column 2, row 3 position (index 11)
       * @param {Number} m30 Component in column 3, row 0 position (index 12)
       * @param {Number} m31 Component in column 3, row 1 position (index 13)
       * @param {Number} m32 Component in column 3, row 2 position (index 14)
       * @param {Number} m33 Component in column 3, row 3 position (index 15)
       * @returns {mat4} out
       */
      function set(out, m00, m01, m02, m03, m10, m11, m12, m13, m20, m21, m22, m23, m30, m31, m32, m33) {
        out[0] = m00;
        out[1] = m01;
        out[2] = m02;
        out[3] = m03;
        out[4] = m10;
        out[5] = m11;
        out[6] = m12;
        out[7] = m13;
        out[8] = m20;
        out[9] = m21;
        out[10] = m22;
        out[11] = m23;
        out[12] = m30;
        out[13] = m31;
        out[14] = m32;
        out[15] = m33;
        return out;
      }

      /**
       * Set a mat4 to the identity matrix
       *
       * @param {mat4} out the receiving matrix
       * @returns {mat4} out
       */
      function identity(out) {
        out[0] = 1;
        out[1] = 0;
        out[2] = 0;
        out[3] = 0;
        out[4] = 0;
        out[5] = 1;
        out[6] = 0;
        out[7] = 0;
        out[8] = 0;
        out[9] = 0;
        out[10] = 1;
        out[11] = 0;
        out[12] = 0;
        out[13] = 0;
        out[14] = 0;
        out[15] = 1;
        return out;
      }

      /**
       * Transpose the values of a mat4
       *
       * @param {mat4} out the receiving matrix
       * @param {mat4} a the source matrix
       * @returns {mat4} out
       */

      /**
       * Inverts a mat4
       *
       * @param {mat4} out the receiving matrix
       * @param {mat4} a the source matrix
       * @returns {mat4} out
       */
      function invert(out, a) {
        let a00 = a[0],
            a01 = a[1],
            a02 = a[2],
            a03 = a[3];
        let a10 = a[4],
            a11 = a[5],
            a12 = a[6],
            a13 = a[7];
        let a20 = a[8],
            a21 = a[9],
            a22 = a[10],
            a23 = a[11];
        let a30 = a[12],
            a31 = a[13],
            a32 = a[14],
            a33 = a[15];

        let b00 = a00 * a11 - a01 * a10;
        let b01 = a00 * a12 - a02 * a10;
        let b02 = a00 * a13 - a03 * a10;
        let b03 = a01 * a12 - a02 * a11;
        let b04 = a01 * a13 - a03 * a11;
        let b05 = a02 * a13 - a03 * a12;
        let b06 = a20 * a31 - a21 * a30;
        let b07 = a20 * a32 - a22 * a30;
        let b08 = a20 * a33 - a23 * a30;
        let b09 = a21 * a32 - a22 * a31;
        let b10 = a21 * a33 - a23 * a31;
        let b11 = a22 * a33 - a23 * a32;

        // Calculate the determinant
        let det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;

        if (!det) {
          return null;
        }
        det = 1.0 / det;

        out[0] = (a11 * b11 - a12 * b10 + a13 * b09) * det;
        out[1] = (a02 * b10 - a01 * b11 - a03 * b09) * det;
        out[2] = (a31 * b05 - a32 * b04 + a33 * b03) * det;
        out[3] = (a22 * b04 - a21 * b05 - a23 * b03) * det;
        out[4] = (a12 * b08 - a10 * b11 - a13 * b07) * det;
        out[5] = (a00 * b11 - a02 * b08 + a03 * b07) * det;
        out[6] = (a32 * b02 - a30 * b05 - a33 * b01) * det;
        out[7] = (a20 * b05 - a22 * b02 + a23 * b01) * det;
        out[8] = (a10 * b10 - a11 * b08 + a13 * b06) * det;
        out[9] = (a01 * b08 - a00 * b10 - a03 * b06) * det;
        out[10] = (a30 * b04 - a31 * b02 + a33 * b00) * det;
        out[11] = (a21 * b02 - a20 * b04 - a23 * b00) * det;
        out[12] = (a11 * b07 - a10 * b09 - a12 * b06) * det;
        out[13] = (a00 * b09 - a01 * b07 + a02 * b06) * det;
        out[14] = (a31 * b01 - a30 * b03 - a32 * b00) * det;
        out[15] = (a20 * b03 - a21 * b01 + a22 * b00) * det;

        return out;
      }

      /**
       * Calculates the adjugate of a mat4
       *
       * @param {mat4} out the receiving matrix
       * @param {mat4} a the source matrix
       * @returns {mat4} out
       */

      /**
       * Calculates the determinant of a mat4
       *
       * @param {mat4} a the source matrix
       * @returns {Number} determinant of a
       */

      /**
       * Multiplies two mat4s
       *
       * @param {mat4} out the receiving matrix
       * @param {mat4} a the first operand
       * @param {mat4} b the second operand
       * @returns {mat4} out
       */
      function multiply(out, a, b) {
        let a00 = a[0],
            a01 = a[1],
            a02 = a[2],
            a03 = a[3];
        let a10 = a[4],
            a11 = a[5],
            a12 = a[6],
            a13 = a[7];
        let a20 = a[8],
            a21 = a[9],
            a22 = a[10],
            a23 = a[11];
        let a30 = a[12],
            a31 = a[13],
            a32 = a[14],
            a33 = a[15];

        // Cache only the current line of the second matrix
        let b0 = b[0],
            b1 = b[1],
            b2 = b[2],
            b3 = b[3];
        out[0] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
        out[1] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
        out[2] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
        out[3] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;

        b0 = b[4];b1 = b[5];b2 = b[6];b3 = b[7];
        out[4] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
        out[5] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
        out[6] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
        out[7] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;

        b0 = b[8];b1 = b[9];b2 = b[10];b3 = b[11];
        out[8] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
        out[9] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
        out[10] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
        out[11] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;

        b0 = b[12];b1 = b[13];b2 = b[14];b3 = b[15];
        out[12] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
        out[13] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
        out[14] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
        out[15] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
        return out;
      }

      /**
       * Translate a mat4 by the given vector
       *
       * @param {mat4} out the receiving matrix
       * @param {mat4} a the matrix to translate
       * @param {vec3} v vector to translate by
       * @returns {mat4} out
       */
      function translate(out, a, v) {
        let x = v[0],
            y = v[1],
            z = v[2];
        let a00, a01, a02, a03;
        let a10, a11, a12, a13;
        let a20, a21, a22, a23;

        if (a === out) {
          out[12] = a[0] * x + a[4] * y + a[8] * z + a[12];
          out[13] = a[1] * x + a[5] * y + a[9] * z + a[13];
          out[14] = a[2] * x + a[6] * y + a[10] * z + a[14];
          out[15] = a[3] * x + a[7] * y + a[11] * z + a[15];
        } else {
          a00 = a[0];a01 = a[1];a02 = a[2];a03 = a[3];
          a10 = a[4];a11 = a[5];a12 = a[6];a13 = a[7];
          a20 = a[8];a21 = a[9];a22 = a[10];a23 = a[11];

          out[0] = a00;out[1] = a01;out[2] = a02;out[3] = a03;
          out[4] = a10;out[5] = a11;out[6] = a12;out[7] = a13;
          out[8] = a20;out[9] = a21;out[10] = a22;out[11] = a23;

          out[12] = a00 * x + a10 * y + a20 * z + a[12];
          out[13] = a01 * x + a11 * y + a21 * z + a[13];
          out[14] = a02 * x + a12 * y + a22 * z + a[14];
          out[15] = a03 * x + a13 * y + a23 * z + a[15];
        }

        return out;
      }

      /**
       * Scales the mat4 by the dimensions in the given vec3 not using vectorization
       *
       * @param {mat4} out the receiving matrix
       * @param {mat4} a the matrix to scale
       * @param {vec3} v the vec3 to scale the matrix by
       * @returns {mat4} out
       **/
      function scale(out, a, v) {
        let x = v[0],
            y = v[1],
            z = v[2];

        out[0] = a[0] * x;
        out[1] = a[1] * x;
        out[2] = a[2] * x;
        out[3] = a[3] * x;
        out[4] = a[4] * y;
        out[5] = a[5] * y;
        out[6] = a[6] * y;
        out[7] = a[7] * y;
        out[8] = a[8] * z;
        out[9] = a[9] * z;
        out[10] = a[10] * z;
        out[11] = a[11] * z;
        out[12] = a[12];
        out[13] = a[13];
        out[14] = a[14];
        out[15] = a[15];
        return out;
      }

      /**
       * Rotates a mat4 by the given angle around the given axis
       *
       * @param {mat4} out the receiving matrix
       * @param {mat4} a the matrix to rotate
       * @param {Number} rad the angle to rotate the matrix by
       * @param {vec3} axis the axis to rotate around
       * @returns {mat4} out
       */

      /**
       * Rotates a matrix by the given angle around the X axis
       *
       * @param {mat4} out the receiving matrix
       * @param {mat4} a the matrix to rotate
       * @param {Number} rad the angle to rotate the matrix by
       * @returns {mat4} out
       */
      function rotateX(out, a, rad) {
        let s = Math.sin(rad);
        let c = Math.cos(rad);
        let a10 = a[4];
        let a11 = a[5];
        let a12 = a[6];
        let a13 = a[7];
        let a20 = a[8];
        let a21 = a[9];
        let a22 = a[10];
        let a23 = a[11];

        if (a !== out) {
          // If the source and destination differ, copy the unchanged rows
          out[0] = a[0];
          out[1] = a[1];
          out[2] = a[2];
          out[3] = a[3];
          out[12] = a[12];
          out[13] = a[13];
          out[14] = a[14];
          out[15] = a[15];
        }

        // Perform axis-specific matrix multiplication
        out[4] = a10 * c + a20 * s;
        out[5] = a11 * c + a21 * s;
        out[6] = a12 * c + a22 * s;
        out[7] = a13 * c + a23 * s;
        out[8] = a20 * c - a10 * s;
        out[9] = a21 * c - a11 * s;
        out[10] = a22 * c - a12 * s;
        out[11] = a23 * c - a13 * s;
        return out;
      }

      /**
       * Rotates a matrix by the given angle around the Y axis
       *
       * @param {mat4} out the receiving matrix
       * @param {mat4} a the matrix to rotate
       * @param {Number} rad the angle to rotate the matrix by
       * @returns {mat4} out
       */
      function rotateY(out, a, rad) {
        let s = Math.sin(rad);
        let c = Math.cos(rad);
        let a00 = a[0];
        let a01 = a[1];
        let a02 = a[2];
        let a03 = a[3];
        let a20 = a[8];
        let a21 = a[9];
        let a22 = a[10];
        let a23 = a[11];

        if (a !== out) {
          // If the source and destination differ, copy the unchanged rows
          out[4] = a[4];
          out[5] = a[5];
          out[6] = a[6];
          out[7] = a[7];
          out[12] = a[12];
          out[13] = a[13];
          out[14] = a[14];
          out[15] = a[15];
        }

        // Perform axis-specific matrix multiplication
        out[0] = a00 * c - a20 * s;
        out[1] = a01 * c - a21 * s;
        out[2] = a02 * c - a22 * s;
        out[3] = a03 * c - a23 * s;
        out[8] = a00 * s + a20 * c;
        out[9] = a01 * s + a21 * c;
        out[10] = a02 * s + a22 * c;
        out[11] = a03 * s + a23 * c;
        return out;
      }

      /**
       * Rotates a matrix by the given angle around the Z axis
       *
       * @param {mat4} out the receiving matrix
       * @param {mat4} a the matrix to rotate
       * @param {Number} rad the angle to rotate the matrix by
       * @returns {mat4} out
       */
      function rotateZ(out, a, rad) {
        let s = Math.sin(rad);
        let c = Math.cos(rad);
        let a00 = a[0];
        let a01 = a[1];
        let a02 = a[2];
        let a03 = a[3];
        let a10 = a[4];
        let a11 = a[5];
        let a12 = a[6];
        let a13 = a[7];

        if (a !== out) {
          // If the source and destination differ, copy the unchanged last row
          out[8] = a[8];
          out[9] = a[9];
          out[10] = a[10];
          out[11] = a[11];
          out[12] = a[12];
          out[13] = a[13];
          out[14] = a[14];
          out[15] = a[15];
        }

        // Perform axis-specific matrix multiplication
        out[0] = a00 * c + a10 * s;
        out[1] = a01 * c + a11 * s;
        out[2] = a02 * c + a12 * s;
        out[3] = a03 * c + a13 * s;
        out[4] = a10 * c - a00 * s;
        out[5] = a11 * c - a01 * s;
        out[6] = a12 * c - a02 * s;
        out[7] = a13 * c - a03 * s;
        return out;
      }

      /**
       * Creates a matrix from a vector translation
       * This is equivalent to (but much faster than):
       *
       *     mat4.identity(dest);
       *     mat4.translate(dest, dest, vec);
       *
       * @param {mat4} out mat4 receiving operation result
       * @param {vec3} v Translation vector
       * @returns {mat4} out
       */

      /**
       * Creates a matrix from a vector scaling
       * This is equivalent to (but much faster than):
       *
       *     mat4.identity(dest);
       *     mat4.scale(dest, dest, vec);
       *
       * @param {mat4} out mat4 receiving operation result
       * @param {vec3} v Scaling vector
       * @returns {mat4} out
       */

      /**
       * Creates a matrix from a given angle around a given axis
       * This is equivalent to (but much faster than):
       *
       *     mat4.identity(dest);
       *     mat4.rotate(dest, dest, rad, axis);
       *
       * @param {mat4} out mat4 receiving operation result
       * @param {Number} rad the angle to rotate the matrix by
       * @param {vec3} axis the axis to rotate around
       * @returns {mat4} out
       */

      /**
       * Creates a matrix from the given angle around the X axis
       * This is equivalent to (but much faster than):
       *
       *     mat4.identity(dest);
       *     mat4.rotateX(dest, dest, rad);
       *
       * @param {mat4} out mat4 receiving operation result
       * @param {Number} rad the angle to rotate the matrix by
       * @returns {mat4} out
       */

      /**
       * Creates a matrix from the given angle around the Y axis
       * This is equivalent to (but much faster than):
       *
       *     mat4.identity(dest);
       *     mat4.rotateY(dest, dest, rad);
       *
       * @param {mat4} out mat4 receiving operation result
       * @param {Number} rad the angle to rotate the matrix by
       * @returns {mat4} out
       */

      /**
       * Creates a matrix from the given angle around the Z axis
       * This is equivalent to (but much faster than):
       *
       *     mat4.identity(dest);
       *     mat4.rotateZ(dest, dest, rad);
       *
       * @param {mat4} out mat4 receiving operation result
       * @param {Number} rad the angle to rotate the matrix by
       * @returns {mat4} out
       */

      /**
       * Creates a matrix from a quaternion rotation and vector translation
       * This is equivalent to (but much faster than):
       *
       *     mat4.identity(dest);
       *     mat4.translate(dest, vec);
       *     let quatMat = mat4.create();
       *     quat4.toMat4(quat, quatMat);
       *     mat4.multiply(dest, quatMat);
       *
       * @param {mat4} out mat4 receiving operation result
       * @param {quat4} q Rotation quaternion
       * @param {vec3} v Translation vector
       * @returns {mat4} out
       */

      /**
       * Returns the translation vector component of a transformation
       *  matrix. If a matrix is built with fromRotationTranslation,
       *  the returned vector will be the same as the translation vector
       *  originally supplied.
       * @param  {vec3} out Vector to receive translation component
       * @param  {mat4} mat Matrix to be decomposed (input)
       * @return {vec3} out
       */

      /**
       * Returns the scaling factor component of a transformation
       *  matrix. If a matrix is built with fromRotationTranslationScale
       *  with a normalized Quaternion paramter, the returned vector will be
       *  the same as the scaling vector
       *  originally supplied.
       * @param  {vec3} out Vector to receive scaling factor component
       * @param  {mat4} mat Matrix to be decomposed (input)
       * @return {vec3} out
       */

      /**
       * Returns a quaternion representing the rotational component
       *  of a transformation matrix. If a matrix is built with
       *  fromRotationTranslation, the returned quaternion will be the
       *  same as the quaternion originally supplied.
       * @param {quat} out Quaternion to receive the rotation component
       * @param {mat4} mat Matrix to be decomposed (input)
       * @return {quat} out
       */

      /**
       * Creates a matrix from a quaternion rotation, vector translation and vector scale
       * This is equivalent to (but much faster than):
       *
       *     mat4.identity(dest);
       *     mat4.translate(dest, vec);
       *     let quatMat = mat4.create();
       *     quat4.toMat4(quat, quatMat);
       *     mat4.multiply(dest, quatMat);
       *     mat4.scale(dest, scale)
       *
       * @param {mat4} out mat4 receiving operation result
       * @param {quat4} q Rotation quaternion
       * @param {vec3} v Translation vector
       * @param {vec3} s Scaling vector
       * @returns {mat4} out
       */

      /**
       * Creates a matrix from a quaternion rotation, vector translation and vector scale, rotating and scaling around the given origin
       * This is equivalent to (but much faster than):
       *
       *     mat4.identity(dest);
       *     mat4.translate(dest, vec);
       *     mat4.translate(dest, origin);
       *     let quatMat = mat4.create();
       *     quat4.toMat4(quat, quatMat);
       *     mat4.multiply(dest, quatMat);
       *     mat4.scale(dest, scale)
       *     mat4.translate(dest, negativeOrigin);
       *
       * @param {mat4} out mat4 receiving operation result
       * @param {quat4} q Rotation quaternion
       * @param {vec3} v Translation vector
       * @param {vec3} s Scaling vector
       * @param {vec3} o The origin vector around which to scale and rotate
       * @returns {mat4} out
       */

      /**
       * Calculates a 4x4 matrix from the given quaternion
       *
       * @param {mat4} out mat4 receiving operation result
       * @param {quat} q Quaternion to create matrix from
       *
       * @returns {mat4} out
       */
      function fromQuat(out, q) {
        let x = q[0],
            y = q[1],
            z = q[2],
            w = q[3];
        let x2 = x + x;
        let y2 = y + y;
        let z2 = z + z;

        let xx = x * x2;
        let yx = y * x2;
        let yy = y * y2;
        let zx = z * x2;
        let zy = z * y2;
        let zz = z * z2;
        let wx = w * x2;
        let wy = w * y2;
        let wz = w * z2;

        out[0] = 1 - yy - zz;
        out[1] = yx + wz;
        out[2] = zx - wy;
        out[3] = 0;

        out[4] = yx - wz;
        out[5] = 1 - xx - zz;
        out[6] = zy + wx;
        out[7] = 0;

        out[8] = zx + wy;
        out[9] = zy - wx;
        out[10] = 1 - xx - yy;
        out[11] = 0;

        out[12] = 0;
        out[13] = 0;
        out[14] = 0;
        out[15] = 1;

        return out;
      }

      /**
       * Generates a frustum matrix with the given bounds
       *
       * @param {mat4} out mat4 frustum matrix will be written into
       * @param {Number} left Left bound of the frustum
       * @param {Number} right Right bound of the frustum
       * @param {Number} bottom Bottom bound of the frustum
       * @param {Number} top Top bound of the frustum
       * @param {Number} near Near bound of the frustum
       * @param {Number} far Far bound of the frustum
       * @returns {mat4} out
       */

      /**
       * Generates a perspective projection matrix with the given bounds
       *
       * @param {mat4} out mat4 frustum matrix will be written into
       * @param {number} fovy Vertical field of view in radians
       * @param {number} aspect Aspect ratio. typically viewport width/height
       * @param {number} near Near bound of the frustum
       * @param {number} far Far bound of the frustum
       * @returns {mat4} out
       */
      function perspective(out, fovy, aspect, near, far) {
        let f = 1.0 / Math.tan(fovy / 2);
        let nf = 1 / (near - far);
        out[0] = f / aspect;
        out[1] = 0;
        out[2] = 0;
        out[3] = 0;
        out[4] = 0;
        out[5] = f;
        out[6] = 0;
        out[7] = 0;
        out[8] = 0;
        out[9] = 0;
        out[10] = (far + near) * nf;
        out[11] = -1;
        out[12] = 0;
        out[13] = 0;
        out[14] = 2 * far * near * nf;
        out[15] = 0;
        return out;
      }

      /**
       * Generates a perspective projection matrix with the given field of view.
       * This is primarily useful for generating projection matrices to be used
       * with the still experiemental WebVR API.
       *
       * @param {mat4} out mat4 frustum matrix will be written into
       * @param {Object} fov Object containing the following values: upDegrees, downDegrees, leftDegrees, rightDegrees
       * @param {number} near Near bound of the frustum
       * @param {number} far Far bound of the frustum
       * @returns {mat4} out
       */

      /**
       * Generates a orthogonal projection matrix with the given bounds
       *
       * @param {mat4} out mat4 frustum matrix will be written into
       * @param {number} left Left bound of the frustum
       * @param {number} right Right bound of the frustum
       * @param {number} bottom Bottom bound of the frustum
       * @param {number} top Top bound of the frustum
       * @param {number} near Near bound of the frustum
       * @param {number} far Far bound of the frustum
       * @returns {mat4} out
       */

      /**
       * Generates a look-at matrix with the given eye position, focal point, and up axis
       *
       * @param {mat4} out mat4 frustum matrix will be written into
       * @param {vec3} eye Position of the viewer
       * @param {vec3} center Point the viewer is looking at
       * @param {vec3} up vec3 pointing up
       * @returns {mat4} out
       */

      /**
       * Generates a matrix that makes something look at something else.
       *
       * @param {mat4} out mat4 frustum matrix will be written into
       * @param {vec3} eye Position of the viewer
       * @param {vec3} center Point the viewer is looking at
       * @param {vec3} up vec3 pointing up
       * @returns {mat4} out
       */

      /**
       * Returns a string representation of a mat4
       *
       * @param {mat4} a matrix to represent as a string
       * @returns {String} string representation of the matrix
       */

      /**
       * Returns Frobenius norm of a mat4
       *
       * @param {mat4} a the matrix to calculate Frobenius norm of
       * @returns {Number} Frobenius norm
       */

      /**
       * Adds two mat4's
       *
       * @param {mat4} out the receiving matrix
       * @param {mat4} a the first operand
       * @param {mat4} b the second operand
       * @returns {mat4} out
       */

      /**
       * Subtracts matrix b from matrix a
       *
       * @param {mat4} out the receiving matrix
       * @param {mat4} a the first operand
       * @param {mat4} b the second operand
       * @returns {mat4} out
       */

      /**
       * Multiply each element of the matrix by a scalar.
       *
       * @param {mat4} out the receiving matrix
       * @param {mat4} a the matrix to scale
       * @param {Number} b amount to scale the matrix's elements by
       * @returns {mat4} out
       */

      /**
       * Adds two mat4's after multiplying each element of the second operand by a scalar value.
       *
       * @param {mat4} out the receiving vector
       * @param {mat4} a the first operand
       * @param {mat4} b the second operand
       * @param {Number} scale the amount to scale b's elements by before adding
       * @returns {mat4} out
       */

      /**
       * Returns whether or not the matrices have exactly the same elements in the same position (when compared with ===)
       *
       * @param {mat4} a The first matrix.
       * @param {mat4} b The second matrix.
       * @returns {Boolean} True if the matrices are equal, false otherwise.
       */

      /**
       * Returns whether or not the matrices have approximately the same elements in the same position.
       *
       * @param {mat4} a The first matrix.
       * @param {mat4} b The second matrix.
       * @returns {Boolean} True if the matrices are equal, false otherwise.
       */

      /**
       * Alias for {@link mat4.multiply}
       * @function
       */

      /**
       * Alias for {@link mat4.subtract}
       * @function
       */

      class Matrix4 extends Float32Array {
        constructor(array = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]) {
          super(array);
          return this;
        }

        set x(value) {
          this[12] = value;
        }

        get x() {
          return this[12];
        }

        set y(value) {
          this[13] = value;
        }

        get y() {
          return this[13];
        }

        set z(value) {
          this[14] = value;
        }

        get z() {
          return this[14];
        }

        set w(value) {
          this[15] = value;
        }

        get w() {
          return this[15];
        }

        copy(matrix4) {
          copy(this, matrix4);
          return this;
        }

        set(m00, m01, m02, m03, m10, m11, m12, m13, m20, m21, m22, m23, m30, m31, m32, m33) {
          if (m00.length) {
            return this.copy(m00);
          }
          set(this, m00, m01, m02, m03, m10, m11, m12, m13, m20, m21, m22, m23, m30, m31, m32, m33);
          return this;
        }

        translate(vector3, matrix4 = this) {
          translate(this, matrix4, vector3);
          return this;
        }

        rotateX(value, matrix4 = this) {
          rotateX(this, matrix4, value);
          return this;
        }

        rotateY(value, matrix4 = this) {
          rotateY(this, matrix4, value);
          return this;
        }

        rotateZ(value, matrix4 = this) {
          rotateZ(this, matrix4, value);
          return this;
        }

        scale(value, matrix4 = this) {
          scale(this, matrix4, typeof value === "number" ? [value, value, value] : value);
          return this;
        }

        multiply(matrix4a, matrix4b) {
          if (matrix4b) {
            multiply(this, matrix4a, matrix4b);
          } else {
            multiply(this, this, matrix4a);
          }
          return this;
        }

        identity() {
          identity(this);
          return this;
        }

        copy(matrix4) {
          copy(this, matrix4);
          return this;
        }

        fromPerspective({ fov, aspectRatio, near, far } = {}) {
          perspective(this, fov, aspectRatio, near, far);
          return this;
        }

        fromQuaternion(quaternion) {
          fromQuat(this, quaternion);
          return this;
        }

        setPosition(vector3) {
          this.x = vector3[0];
          this.y = vector3[1];
          this.z = vector3[2];
          return this;
        }

        invert(matrix4 = this) {
          invert(this, matrix4);
          return this;
        }
      }

      /* Copyright (c) 2015, Brandon Jones, Colin MacKenzie IV.
      
      Permission is hereby granted, free of charge, to any person obtaining a copy
      of this software and associated documentation files (the "Software"), to deal
      in the Software without restriction, including without limitation the rights
      to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
      copies of the Software, and to permit persons to whom the Software is
      furnished to do so, subject to the following conditions:
      
      The above copyright notice and this permission notice shall be included in
      all copies or substantial portions of the Software.
      
      THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
      IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
      FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
      AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
      LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
      OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
      THE SOFTWARE. */

      /**
       * 2 Dimensional Vector
       * @module vec2
       */

      /**
       * Creates a new, empty vec2
       *
       * @returns {vec2} a new 2D vector
       */
      function create$1() {
        let out = new ARRAY_TYPE(2);
        out[0] = 0;
        out[1] = 0;
        return out;
      }

      /**
       * Creates a new vec2 initialized with values from an existing vector
       *
       * @param {vec2} a vector to clone
       * @returns {vec2} a new 2D vector
       */

      /**
       * Creates a new vec2 initialized with the given values
       *
       * @param {Number} x X component
       * @param {Number} y Y component
       * @returns {vec2} a new 2D vector
       */

      /**
       * Copy the values from one vec2 to another
       *
       * @param {vec2} out the receiving vector
       * @param {vec2} a the source vector
       * @returns {vec2} out
       */
      function copy$1(out, a) {
        out[0] = a[0];
        out[1] = a[1];
        return out;
      }

      /**
       * Set the components of a vec2 to the given values
       *
       * @param {vec2} out the receiving vector
       * @param {Number} x X component
       * @param {Number} y Y component
       * @returns {vec2} out
       */
      function set$1(out, x, y) {
        out[0] = x;
        out[1] = y;
        return out;
      }

      /**
       * Adds two vec2's
       *
       * @param {vec2} out the receiving vector
       * @param {vec2} a the first operand
       * @param {vec2} b the second operand
       * @returns {vec2} out
       */
      function add$1(out, a, b) {
        out[0] = a[0] + b[0];
        out[1] = a[1] + b[1];
        return out;
      }

      /**
       * Subtracts vector b from vector a
       *
       * @param {vec2} out the receiving vector
       * @param {vec2} a the first operand
       * @param {vec2} b the second operand
       * @returns {vec2} out
       */
      function subtract$1(out, a, b) {
        out[0] = a[0] - b[0];
        out[1] = a[1] - b[1];
        return out;
      }

      /**
       * Multiplies two vec2's
       *
       * @param {vec2} out the receiving vector
       * @param {vec2} a the first operand
       * @param {vec2} b the second operand
       * @returns {vec2} out
       */

      /**
       * Divides two vec2's
       *
       * @param {vec2} out the receiving vector
       * @param {vec2} a the first operand
       * @param {vec2} b the second operand
       * @returns {vec2} out
       */

      /**
       * Math.ceil the components of a vec2
       *
       * @param {vec2} out the receiving vector
       * @param {vec2} a vector to ceil
       * @returns {vec2} out
       */

      /**
       * Math.floor the components of a vec2
       *
       * @param {vec2} out the receiving vector
       * @param {vec2} a vector to floor
       * @returns {vec2} out
       */

      /**
       * Returns the minimum of two vec2's
       *
       * @param {vec2} out the receiving vector
       * @param {vec2} a the first operand
       * @param {vec2} b the second operand
       * @returns {vec2} out
       */

      /**
       * Returns the maximum of two vec2's
       *
       * @param {vec2} out the receiving vector
       * @param {vec2} a the first operand
       * @param {vec2} b the second operand
       * @returns {vec2} out
       */

      /**
       * Math.round the components of a vec2
       *
       * @param {vec2} out the receiving vector
       * @param {vec2} a vector to round
       * @returns {vec2} out
       */

      /**
       * Scales a vec2 by a scalar number
       *
       * @param {vec2} out the receiving vector
       * @param {vec2} a the vector to scale
       * @param {Number} b amount to scale the vector by
       * @returns {vec2} out
       */
      function scale$1(out, a, b) {
        out[0] = a[0] * b;
        out[1] = a[1] * b;
        return out;
      }

      /**
       * Adds two vec2's after scaling the second operand by a scalar value
       *
       * @param {vec2} out the receiving vector
       * @param {vec2} a the first operand
       * @param {vec2} b the second operand
       * @param {Number} scale the amount to scale b by before adding
       * @returns {vec2} out
       */

      /**
       * Calculates the euclidian distance between two vec2's
       *
       * @param {vec2} a the first operand
       * @param {vec2} b the second operand
       * @returns {Number} distance between a and b
       */

      /**
       * Calculates the squared euclidian distance between two vec2's
       *
       * @param {vec2} a the first operand
       * @param {vec2} b the second operand
       * @returns {Number} squared distance between a and b
       */

      /**
       * Calculates the length of a vec2
       *
       * @param {vec2} a vector to calculate length of
       * @returns {Number} length of a
       */
      function length(a) {
        var x = a[0],
            y = a[1];
        return Math.sqrt(x * x + y * y);
      }

      /**
       * Calculates the squared length of a vec2
       *
       * @param {vec2} a vector to calculate squared length of
       * @returns {Number} squared length of a
       */
      function squaredLength(a) {
        var x = a[0],
            y = a[1];
        return x * x + y * y;
      }

      /**
       * Negates the components of a vec2
       *
       * @param {vec2} out the receiving vector
       * @param {vec2} a vector to negate
       * @returns {vec2} out
       */
      function negate(out, a) {
        out[0] = -a[0];
        out[1] = -a[1];
        return out;
      }

      /**
       * Returns the inverse of the components of a vec2
       *
       * @param {vec2} out the receiving vector
       * @param {vec2} a vector to invert
       * @returns {vec2} out
       */

      /**
       * Normalize a vec2
       *
       * @param {vec2} out the receiving vector
       * @param {vec2} a vector to normalize
       * @returns {vec2} out
       */
      function normalize(out, a) {
        var x = a[0],
            y = a[1];
        var len = x * x + y * y;
        if (len > 0) {
          //TODO: evaluate use of glm_invsqrt here?
          len = 1 / Math.sqrt(len);
          out[0] = a[0] * len;
          out[1] = a[1] * len;
        }
        return out;
      }

      /**
       * Calculates the dot product of two vec2's
       *
       * @param {vec2} a the first operand
       * @param {vec2} b the second operand
       * @returns {Number} dot product of a and b
       */
      function dot(a, b) {
        return a[0] * b[0] + a[1] * b[1];
      }

      /**
       * Computes the cross product of two vec2's
       * Note that the cross product must by definition produce a 3D vector
       *
       * @param {vec3} out the receiving vector
       * @param {vec2} a the first operand
       * @param {vec2} b the second operand
       * @returns {vec3} out
       */
      function cross(out, a, b) {
        var z = a[0] * b[1] - a[1] * b[0];
        out[0] = out[1] = 0;
        out[2] = z;
        return out;
      }

      /**
       * Performs a linear interpolation between two vec2's
       *
       * @param {vec2} out the receiving vector
       * @param {vec2} a the first operand
       * @param {vec2} b the second operand
       * @param {Number} t interpolation amount between the two inputs
       * @returns {vec2} out
       */
      function lerp(out, a, b, t) {
        var ax = a[0],
            ay = a[1];
        out[0] = ax + t * (b[0] - ax);
        out[1] = ay + t * (b[1] - ay);
        return out;
      }

      /**
       * Generates a random vector with the given scale
       *
       * @param {vec2} out the receiving vector
       * @param {Number} [scale] Length of the resulting vector. If ommitted, a unit vector will be returned
       * @returns {vec2} out
       */

      /**
       * Transforms the vec2 with a mat2
       *
       * @param {vec2} out the receiving vector
       * @param {vec2} a the vector to transform
       * @param {mat2} m matrix to transform with
       * @returns {vec2} out
       */

      /**
       * Transforms the vec2 with a mat2d
       *
       * @param {vec2} out the receiving vector
       * @param {vec2} a the vector to transform
       * @param {mat2d} m matrix to transform with
       * @returns {vec2} out
       */

      /**
       * Transforms the vec2 with a mat3
       * 3rd vector component is implicitly '1'
       *
       * @param {vec2} out the receiving vector
       * @param {vec2} a the vector to transform
       * @param {mat3} m matrix to transform with
       * @returns {vec2} out
       */
      function transformMat3(out, a, m) {
        var x = a[0],
            y = a[1];
        out[0] = m[0] * x + m[3] * y + m[6];
        out[1] = m[1] * x + m[4] * y + m[7];
        return out;
      }

      /**
       * Transforms the vec2 with a mat4
       * 3rd vector component is implicitly '0'
       * 4th vector component is implicitly '1'
       *
       * @param {vec2} out the receiving vector
       * @param {vec2} a the vector to transform
       * @param {mat4} m matrix to transform with
       * @returns {vec2} out
       */
      function transformMat4(out, a, m) {
        let x = a[0];
        let y = a[1];
        out[0] = m[0] * x + m[4] * y + m[12];
        out[1] = m[1] * x + m[5] * y + m[13];
        return out;
      }

      /**
       * Returns a string representation of a vector
       *
       * @param {vec2} a vector to represent as a string
       * @returns {String} string representation of the vector
       */

      /**
       * Returns whether or not the vectors exactly have the same elements in the same position (when compared with ===)
       *
       * @param {vec2} a The first vector.
       * @param {vec2} b The second vector.
       * @returns {Boolean} True if the vectors are equal, false otherwise.
       */
      function exactEquals$1(a, b) {
        return a[0] === b[0] && a[1] === b[1];
      }

      /**
       * Returns whether or not the vectors have approximately the same elements in the same position.
       *
       * @param {vec2} a The first vector.
       * @param {vec2} b The second vector.
       * @returns {Boolean} True if the vectors are equal, false otherwise.
       */

      /**
       * Alias for {@link vec2.length}
       * @function
       */

      /**
       * Alias for {@link vec2.subtract}
       * @function
       */

      /**
       * Alias for {@link vec2.multiply}
       * @function
       */

      /**
       * Alias for {@link vec2.divide}
       * @function
       */

      /**
       * Alias for {@link vec2.distance}
       * @function
       */

      /**
       * Alias for {@link vec2.squaredDistance}
       * @function
       */

      /**
       * Alias for {@link vec2.squaredLength}
       * @function
       */

      /**
       * Perform some operation over an array of vec2s.
       *
       * @param {Array} a the array of vectors to iterate over
       * @param {Number} stride Number of elements between the start of each vec2. If 0 assumes tightly packed
       * @param {Number} offset Number of elements to skip at the beginning of the array
       * @param {Number} count Number of vec2s to iterate over. If 0 iterates over entire array
       * @param {Function} fn Function to call for each vector in the array
       * @param {Object} [arg] additional argument to pass to fn
       * @returns {Array} a
       * @function
       */
      const forEach = function () {
        let vec = create$1();

        return function (a, stride, offset, count, fn, arg) {
          let i, l;
          if (!stride) {
            stride = 2;
          }

          if (!offset) {
            offset = 0;
          }

          if (count) {
            l = Math.min(count * stride + offset, a.length);
          } else {
            l = a.length;
          }

          for (i = offset; i < l; i += stride) {
            vec[0] = a[i];vec[1] = a[i + 1];
            fn(vec, vec, arg);
            a[i] = vec[0];a[i + 1] = vec[1];
          }

          return a;
        };
      }();

      class Vector2 extends Float32Array {
        constructor(x = 0, y = 0) {
          super(2);
          this.set(x, y);
          return this;
        }

        get x() {
          return this[0];
        }

        set x(value) {
          this[0] = value;
        }

        get y() {
          return this[1];
        }

        set y(value) {
          this[1] = value;
        }

        set(x, y) {
          set$1(this, x, y);
          return this;
        }

        copy(vector2) {
          copy$1(this, vector2);
          return this;
        }

        add(vector2) {
          add$1(this, this, vector2);
          return this;
        }

        get size() {
          return length(this);
        }

        get squaredSize() {
          return squaredLength(this);
        }

        subtract(vector2) {
          subtract$1(this, this, vector2);
          return this;
        }

        negate(vector2 = this) {
          negate(this, vector2);
          return this;
        }

        cross(vector2a, vector2b) {
          cross(this, vector2a, vector2b);
          return this;
        }

        scale(value) {
          scale$1(this, this, value);
          return this;
        }

        normalize() {
          normalize(this, this);
        }

        dot(vector2) {
          return dot(this, vector2);
        }

        equals(vector2) {
          return exactEquals$1(this, vector2);
        }

        applyMatrix3(matrix3) {
          transformMat3(this, this, matrix3);
          return this;
        }

        applyMatrix4(matrix4) {
          transformMat4(this, this, matrix4);
          return this;
        }

        lerp(vector2, value) {
          lerp(this, this, vector2, value);
        }

        clone() {
          return new Vector2(this.x, this.y);
        }
      }

      /* Copyright (c) 2015, Brandon Jones, Colin MacKenzie IV.
      
      Permission is hereby granted, free of charge, to any person obtaining a copy
      of this software and associated documentation files (the "Software"), to deal
      in the Software without restriction, including without limitation the rights
      to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
      copies of the Software, and to permit persons to whom the Software is
      furnished to do so, subject to the following conditions:
      
      The above copyright notice and this permission notice shall be included in
      all copies or substantial portions of the Software.
      
      THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
      IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
      FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
      AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
      LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
      OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
      THE SOFTWARE. */

      /**
       * 3 Dimensional Vector
       * @module vec3
       */

      /**
       * Creates a new, empty vec3
       *
       * @returns {vec3} a new 3D vector
       */
      function create$2() {
        let out = new ARRAY_TYPE(3);
        out[0] = 0;
        out[1] = 0;
        out[2] = 0;
        return out;
      }

      /**
       * Creates a new vec3 initialized with values from an existing vector
       *
       * @param {vec3} a vector to clone
       * @returns {vec3} a new 3D vector
       */

      /**
       * Calculates the length of a vec3
       *
       * @param {vec3} a vector to calculate length of
       * @returns {Number} length of a
       */
      function length$1(a) {
        let x = a[0];
        let y = a[1];
        let z = a[2];
        return Math.sqrt(x * x + y * y + z * z);
      }

      /**
       * Creates a new vec3 initialized with the given values
       *
       * @param {Number} x X component
       * @param {Number} y Y component
       * @param {Number} z Z component
       * @returns {vec3} a new 3D vector
       */
      function fromValues$2(x, y, z) {
        let out = new ARRAY_TYPE(3);
        out[0] = x;
        out[1] = y;
        out[2] = z;
        return out;
      }

      /**
       * Copy the values from one vec3 to another
       *
       * @param {vec3} out the receiving vector
       * @param {vec3} a the source vector
       * @returns {vec3} out
       */
      function copy$2(out, a) {
        out[0] = a[0];
        out[1] = a[1];
        out[2] = a[2];
        return out;
      }

      /**
       * Set the components of a vec3 to the given values
       *
       * @param {vec3} out the receiving vector
       * @param {Number} x X component
       * @param {Number} y Y component
       * @param {Number} z Z component
       * @returns {vec3} out
       */
      function set$2(out, x, y, z) {
        out[0] = x;
        out[1] = y;
        out[2] = z;
        return out;
      }

      /**
       * Adds two vec3's
       *
       * @param {vec3} out the receiving vector
       * @param {vec3} a the first operand
       * @param {vec3} b the second operand
       * @returns {vec3} out
       */
      function add$2(out, a, b) {
        out[0] = a[0] + b[0];
        out[1] = a[1] + b[1];
        out[2] = a[2] + b[2];
        return out;
      }

      /**
       * Subtracts vector b from vector a
       *
       * @param {vec3} out the receiving vector
       * @param {vec3} a the first operand
       * @param {vec3} b the second operand
       * @returns {vec3} out
       */
      function subtract$2(out, a, b) {
        out[0] = a[0] - b[0];
        out[1] = a[1] - b[1];
        out[2] = a[2] - b[2];
        return out;
      }

      /**
       * Multiplies two vec3's
       *
       * @param {vec3} out the receiving vector
       * @param {vec3} a the first operand
       * @param {vec3} b the second operand
       * @returns {vec3} out
       */

      /**
       * Divides two vec3's
       *
       * @param {vec3} out the receiving vector
       * @param {vec3} a the first operand
       * @param {vec3} b the second operand
       * @returns {vec3} out
       */

      /**
       * Math.ceil the components of a vec3
       *
       * @param {vec3} out the receiving vector
       * @param {vec3} a vector to ceil
       * @returns {vec3} out
       */

      /**
       * Math.floor the components of a vec3
       *
       * @param {vec3} out the receiving vector
       * @param {vec3} a vector to floor
       * @returns {vec3} out
       */

      /**
       * Returns the minimum of two vec3's
       *
       * @param {vec3} out the receiving vector
       * @param {vec3} a the first operand
       * @param {vec3} b the second operand
       * @returns {vec3} out
       */

      /**
       * Returns the maximum of two vec3's
       *
       * @param {vec3} out the receiving vector
       * @param {vec3} a the first operand
       * @param {vec3} b the second operand
       * @returns {vec3} out
       */

      /**
       * Math.round the components of a vec3
       *
       * @param {vec3} out the receiving vector
       * @param {vec3} a vector to round
       * @returns {vec3} out
       */

      /**
       * Scales a vec3 by a scalar number
       *
       * @param {vec3} out the receiving vector
       * @param {vec3} a the vector to scale
       * @param {Number} b amount to scale the vector by
       * @returns {vec3} out
       */
      function scale$2(out, a, b) {
        out[0] = a[0] * b;
        out[1] = a[1] * b;
        out[2] = a[2] * b;
        return out;
      }

      /**
       * Adds two vec3's after scaling the second operand by a scalar value
       *
       * @param {vec3} out the receiving vector
       * @param {vec3} a the first operand
       * @param {vec3} b the second operand
       * @param {Number} scale the amount to scale b by before adding
       * @returns {vec3} out
       */

      /**
       * Calculates the euclidian distance between two vec3's
       *
       * @param {vec3} a the first operand
       * @param {vec3} b the second operand
       * @returns {Number} distance between a and b
       */

      /**
       * Calculates the squared euclidian distance between two vec3's
       *
       * @param {vec3} a the first operand
       * @param {vec3} b the second operand
       * @returns {Number} squared distance between a and b
       */

      /**
       * Calculates the squared length of a vec3
       *
       * @param {vec3} a vector to calculate squared length of
       * @returns {Number} squared length of a
       */
      function squaredLength$1(a) {
        let x = a[0];
        let y = a[1];
        let z = a[2];
        return x * x + y * y + z * z;
      }

      /**
       * Negates the components of a vec3
       *
       * @param {vec3} out the receiving vector
       * @param {vec3} a vector to negate
       * @returns {vec3} out
       */
      function negate$1(out, a) {
        out[0] = -a[0];
        out[1] = -a[1];
        out[2] = -a[2];
        return out;
      }

      /**
       * Returns the inverse of the components of a vec3
       *
       * @param {vec3} out the receiving vector
       * @param {vec3} a vector to invert
       * @returns {vec3} out
       */

      /**
       * Normalize a vec3
       *
       * @param {vec3} out the receiving vector
       * @param {vec3} a vector to normalize
       * @returns {vec3} out
       */
      function normalize$1(out, a) {
        let x = a[0];
        let y = a[1];
        let z = a[2];
        let len = x * x + y * y + z * z;
        if (len > 0) {
          //TODO: evaluate use of glm_invsqrt here?
          len = 1 / Math.sqrt(len);
          out[0] = a[0] * len;
          out[1] = a[1] * len;
          out[2] = a[2] * len;
        }
        return out;
      }

      /**
       * Calculates the dot product of two vec3's
       *
       * @param {vec3} a the first operand
       * @param {vec3} b the second operand
       * @returns {Number} dot product of a and b
       */
      function dot$1(a, b) {
        return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
      }

      /**
       * Computes the cross product of two vec3's
       *
       * @param {vec3} out the receiving vector
       * @param {vec3} a the first operand
       * @param {vec3} b the second operand
       * @returns {vec3} out
       */
      function cross$1(out, a, b) {
        let ax = a[0],
            ay = a[1],
            az = a[2];
        let bx = b[0],
            by = b[1],
            bz = b[2];

        out[0] = ay * bz - az * by;
        out[1] = az * bx - ax * bz;
        out[2] = ax * by - ay * bx;
        return out;
      }

      /**
       * Performs a linear interpolation between two vec3's
       *
       * @param {vec3} out the receiving vector
       * @param {vec3} a the first operand
       * @param {vec3} b the second operand
       * @param {Number} t interpolation amount between the two inputs
       * @returns {vec3} out
       */

      /**
       * Performs a hermite interpolation with two control points
       *
       * @param {vec3} out the receiving vector
       * @param {vec3} a the first operand
       * @param {vec3} b the second operand
       * @param {vec3} c the third operand
       * @param {vec3} d the fourth operand
       * @param {Number} t interpolation amount between the two inputs
       * @returns {vec3} out
       */

      /**
       * Performs a bezier interpolation with two control points
       *
       * @param {vec3} out the receiving vector
       * @param {vec3} a the first operand
       * @param {vec3} b the second operand
       * @param {vec3} c the third operand
       * @param {vec3} d the fourth operand
       * @param {Number} t interpolation amount between the two inputs
       * @returns {vec3} out
       */

      /**
       * Generates a random vector with the given scale
       *
       * @param {vec3} out the receiving vector
       * @param {Number} [scale] Length of the resulting vector. If ommitted, a unit vector will be returned
       * @returns {vec3} out
       */

      /**
       * Transforms the vec3 with a mat4.
       * 4th vector component is implicitly '1'
       *
       * @param {vec3} out the receiving vector
       * @param {vec3} a the vector to transform
       * @param {mat4} m matrix to transform with
       * @returns {vec3} out
       */
      function transformMat4$1(out, a, m) {
        let x = a[0],
            y = a[1],
            z = a[2];
        let w = m[3] * x + m[7] * y + m[11] * z + m[15];
        w = w || 1.0;
        out[0] = (m[0] * x + m[4] * y + m[8] * z + m[12]) / w;
        out[1] = (m[1] * x + m[5] * y + m[9] * z + m[13]) / w;
        out[2] = (m[2] * x + m[6] * y + m[10] * z + m[14]) / w;
        return out;
      }

      /**
       * Transforms the vec3 with a mat3.
       *
       * @param {vec3} out the receiving vector
       * @param {vec3} a the vector to transform
       * @param {mat3} m the 3x3 matrix to transform with
       * @returns {vec3} out
       */

      /**
       * Transforms the vec3 with a quat
       *
       * @param {vec3} out the receiving vector
       * @param {vec3} a the vector to transform
       * @param {quat} q quaternion to transform with
       * @returns {vec3} out
       */

      /**
       * Rotate a 3D vector around the x-axis
       * @param {vec3} out The receiving vec3
       * @param {vec3} a The vec3 point to rotate
       * @param {vec3} b The origin of the rotation
       * @param {Number} c The angle of rotation
       * @returns {vec3} out
       */

      /**
       * Rotate a 3D vector around the y-axis
       * @param {vec3} out The receiving vec3
       * @param {vec3} a The vec3 point to rotate
       * @param {vec3} b The origin of the rotation
       * @param {Number} c The angle of rotation
       * @returns {vec3} out
       */

      /**
       * Rotate a 3D vector around the z-axis
       * @param {vec3} out The receiving vec3
       * @param {vec3} a The vec3 point to rotate
       * @param {vec3} b The origin of the rotation
       * @param {Number} c The angle of rotation
       * @returns {vec3} out
       */

      /**
       * Get the angle between two 3D vectors
       * @param {vec3} a The first operand
       * @param {vec3} b The second operand
       * @returns {Number} The angle in radians
       */
      function angle(a, b) {
        let tempA = fromValues$2(a[0], a[1], a[2]);
        let tempB = fromValues$2(b[0], b[1], b[2]);

        normalize$1(tempA, tempA);
        normalize$1(tempB, tempB);

        let cosine = dot$1(tempA, tempB);

        if (cosine > 1.0) {
          return 0;
        } else if (cosine < -1.0) {
          return Math.PI;
        } else {
          return Math.acos(cosine);
        }
      }

      /**
       * Returns a string representation of a vector
       *
       * @param {vec3} a vector to represent as a string
       * @returns {String} string representation of the vector
       */

      /**
       * Returns whether or not the vectors have exactly the same elements in the same position (when compared with ===)
       *
       * @param {vec3} a The first vector.
       * @param {vec3} b The second vector.
       * @returns {Boolean} True if the vectors are equal, false otherwise.
       */
      function exactEquals$2(a, b) {
        return a[0] === b[0] && a[1] === b[1] && a[2] === b[2];
      }

      /**
       * Returns whether or not the vectors have approximately the same elements in the same position.
       *
       * @param {vec3} a The first vector.
       * @param {vec3} b The second vector.
       * @returns {Boolean} True if the vectors are equal, false otherwise.
       */

      /**
       * Alias for {@link vec3.subtract}
       * @function
       */

      /**
       * Alias for {@link vec3.multiply}
       * @function
       */

      /**
       * Alias for {@link vec3.divide}
       * @function
       */

      /**
       * Alias for {@link vec3.distance}
       * @function
       */

      /**
       * Alias for {@link vec3.squaredDistance}
       * @function
       */

      /**
       * Alias for {@link vec3.length}
       * @function
       */
      const len$1 = length$1;

      /**
       * Alias for {@link vec3.squaredLength}
       * @function
       */

      /**
       * Perform some operation over an array of vec3s.
       *
       * @param {Array} a the array of vectors to iterate over
       * @param {Number} stride Number of elements between the start of each vec3. If 0 assumes tightly packed
       * @param {Number} offset Number of elements to skip at the beginning of the array
       * @param {Number} count Number of vec3s to iterate over. If 0 iterates over entire array
       * @param {Function} fn Function to call for each vector in the array
       * @param {Object} [arg] additional argument to pass to fn
       * @returns {Array} a
       * @function
       */
      const forEach$1 = function () {
        let vec = create$2();

        return function (a, stride, offset, count, fn, arg) {
          let i, l;
          if (!stride) {
            stride = 3;
          }

          if (!offset) {
            offset = 0;
          }

          if (count) {
            l = Math.min(count * stride + offset, a.length);
          } else {
            l = a.length;
          }

          for (i = offset; i < l; i += stride) {
            vec[0] = a[i];vec[1] = a[i + 1];vec[2] = a[i + 2];
            fn(vec, vec, arg);
            a[i] = vec[0];a[i + 1] = vec[1];a[i + 2] = vec[2];
          }

          return a;
        };
      }();

      class Vector3 extends Float32Array {
        constructor(array = [0, 0, 0]) {
          super(array);
          return this;
        }

        get x() {
          return this[0];
        }

        set x(value) {
          this[0] = value;
        }

        get y() {
          return this[1];
        }

        set y(value) {
          this[1] = value;
        }

        get z() {
          return this[2];
        }

        set z(value) {
          this[2] = value;
        }

        set(x, y, z) {
          set$2(this, x, y, z);
          return this;
        }

        copy(vector3) {
          copy$2(this, vector3);
          return this;
        }

        add(vector3) {
          add$2(this, this, vector3);
          return this;
        }

        get size() {
          return length$1(this);
        }

        get squaredSize() {
          return squaredLength$1(this);
        }

        subtract(vector3) {
          subtract$2(this, this, vector3);
          return this;
        }

        negate(vector3 = this) {
          negate$1(this, vector3);
          return this;
        }

        cross(vector3a, vector3b) {
          cross$1(this, vector3a, vector3b);
          return this;
        }

        scale(value) {
          scale$2(this, this, value);
          return this;
        }

        normalize() {
          normalize$1(this, this);
          return this;
        }

        dot(vector3) {
          return dot$1(this, vector3);
        }

        equals(vector3) {
          return exactEquals$2(this, vector3);
        }

        applyMatrix4(matrix4) {
          transformMat4$1(this, this, matrix4);
          return this;
        }

        angle(vector3) {
          return angle(this, vector3);
        }

        clone() {
          return new Vector3(this.x, this.y, this.z);
        }
      }

      /* Copyright (c) 2015, Brandon Jones, Colin MacKenzie IV.
      
      Permission is hereby granted, free of charge, to any person obtaining a copy
      of this software and associated documentation files (the "Software"), to deal
      in the Software without restriction, including without limitation the rights
      to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
      copies of the Software, and to permit persons to whom the Software is
      furnished to do so, subject to the following conditions:
      
      The above copyright notice and this permission notice shall be included in
      all copies or substantial portions of the Software.
      
      THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
      IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
      FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
      AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
      LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
      OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
      THE SOFTWARE. */

      /**
       * 4 Dimensional Vector
       * @module vec4
       */

      /**
       * Creates a new, empty vec4
       *
       * @returns {vec4} a new 4D vector
       */
      function create$3() {
        let out = new ARRAY_TYPE(4);
        out[0] = 0;
        out[1] = 0;
        out[2] = 0;
        out[3] = 0;
        return out;
      }

      /**
       * Creates a new vec4 initialized with values from an existing vector
       *
       * @param {vec4} a vector to clone
       * @returns {vec4} a new 4D vector
       */

      /**
       * Creates a new vec4 initialized with the given values
       *
       * @param {Number} x X component
       * @param {Number} y Y component
       * @param {Number} z Z component
       * @param {Number} w W component
       * @returns {vec4} a new 4D vector
       */

      /**
       * Copy the values from one vec4 to another
       *
       * @param {vec4} out the receiving vector
       * @param {vec4} a the source vector
       * @returns {vec4} out
       */
      function copy$3(out, a) {
        out[0] = a[0];
        out[1] = a[1];
        out[2] = a[2];
        out[3] = a[3];
        return out;
      }

      /**
       * Set the components of a vec4 to the given values
       *
       * @param {vec4} out the receiving vector
       * @param {Number} x X component
       * @param {Number} y Y component
       * @param {Number} z Z component
       * @param {Number} w W component
       * @returns {vec4} out
       */
      function set$3(out, x, y, z, w) {
        out[0] = x;
        out[1] = y;
        out[2] = z;
        out[3] = w;
        return out;
      }

      /**
       * Adds two vec4's
       *
       * @param {vec4} out the receiving vector
       * @param {vec4} a the first operand
       * @param {vec4} b the second operand
       * @returns {vec4} out
       */

      /**
       * Subtracts vector b from vector a
       *
       * @param {vec4} out the receiving vector
       * @param {vec4} a the first operand
       * @param {vec4} b the second operand
       * @returns {vec4} out
       */

      /**
       * Multiplies two vec4's
       *
       * @param {vec4} out the receiving vector
       * @param {vec4} a the first operand
       * @param {vec4} b the second operand
       * @returns {vec4} out
       */

      /**
       * Divides two vec4's
       *
       * @param {vec4} out the receiving vector
       * @param {vec4} a the first operand
       * @param {vec4} b the second operand
       * @returns {vec4} out
       */

      /**
       * Math.ceil the components of a vec4
       *
       * @param {vec4} out the receiving vector
       * @param {vec4} a vector to ceil
       * @returns {vec4} out
       */

      /**
       * Math.floor the components of a vec4
       *
       * @param {vec4} out the receiving vector
       * @param {vec4} a vector to floor
       * @returns {vec4} out
       */

      /**
       * Returns the minimum of two vec4's
       *
       * @param {vec4} out the receiving vector
       * @param {vec4} a the first operand
       * @param {vec4} b the second operand
       * @returns {vec4} out
       */

      /**
       * Returns the maximum of two vec4's
       *
       * @param {vec4} out the receiving vector
       * @param {vec4} a the first operand
       * @param {vec4} b the second operand
       * @returns {vec4} out
       */

      /**
       * Math.round the components of a vec4
       *
       * @param {vec4} out the receiving vector
       * @param {vec4} a vector to round
       * @returns {vec4} out
       */

      /**
       * Scales a vec4 by a scalar number
       *
       * @param {vec4} out the receiving vector
       * @param {vec4} a the vector to scale
       * @param {Number} b amount to scale the vector by
       * @returns {vec4} out
       */
      function scale$3(out, a, b) {
        out[0] = a[0] * b;
        out[1] = a[1] * b;
        out[2] = a[2] * b;
        out[3] = a[3] * b;
        return out;
      }

      /**
       * Adds two vec4's after scaling the second operand by a scalar value
       *
       * @param {vec4} out the receiving vector
       * @param {vec4} a the first operand
       * @param {vec4} b the second operand
       * @param {Number} scale the amount to scale b by before adding
       * @returns {vec4} out
       */

      /**
       * Calculates the euclidian distance between two vec4's
       *
       * @param {vec4} a the first operand
       * @param {vec4} b the second operand
       * @returns {Number} distance between a and b
       */

      /**
       * Calculates the squared euclidian distance between two vec4's
       *
       * @param {vec4} a the first operand
       * @param {vec4} b the second operand
       * @returns {Number} squared distance between a and b
       */

      /**
       * Calculates the length of a vec4
       *
       * @param {vec4} a vector to calculate length of
       * @returns {Number} length of a
       */

      /**
       * Calculates the squared length of a vec4
       *
       * @param {vec4} a vector to calculate squared length of
       * @returns {Number} squared length of a
       */

      /**
       * Negates the components of a vec4
       *
       * @param {vec4} out the receiving vector
       * @param {vec4} a vector to negate
       * @returns {vec4} out
       */

      /**
       * Returns the inverse of the components of a vec4
       *
       * @param {vec4} out the receiving vector
       * @param {vec4} a vector to invert
       * @returns {vec4} out
       */

      /**
       * Normalize a vec4
       *
       * @param {vec4} out the receiving vector
       * @param {vec4} a vector to normalize
       * @returns {vec4} out
       */
      function normalize$2(out, a) {
        let x = a[0];
        let y = a[1];
        let z = a[2];
        let w = a[3];
        let len = x * x + y * y + z * z + w * w;
        if (len > 0) {
          len = 1 / Math.sqrt(len);
          out[0] = x * len;
          out[1] = y * len;
          out[2] = z * len;
          out[3] = w * len;
        }
        return out;
      }

      /**
       * Calculates the dot product of two vec4's
       *
       * @param {vec4} a the first operand
       * @param {vec4} b the second operand
       * @returns {Number} dot product of a and b
       */

      /**
       * Performs a linear interpolation between two vec4's
       *
       * @param {vec4} out the receiving vector
       * @param {vec4} a the first operand
       * @param {vec4} b the second operand
       * @param {Number} t interpolation amount between the two inputs
       * @returns {vec4} out
       */

      /**
       * Generates a random vector with the given scale
       *
       * @param {vec4} out the receiving vector
       * @param {Number} [scale] Length of the resulting vector. If ommitted, a unit vector will be returned
       * @returns {vec4} out
       */

      /**
       * Transforms the vec4 with a mat4.
       *
       * @param {vec4} out the receiving vector
       * @param {vec4} a the vector to transform
       * @param {mat4} m matrix to transform with
       * @returns {vec4} out
       */

      /**
       * Transforms the vec4 with a quat
       *
       * @param {vec4} out the receiving vector
       * @param {vec4} a the vector to transform
       * @param {quat} q quaternion to transform with
       * @returns {vec4} out
       */

      /**
       * Returns a string representation of a vector
       *
       * @param {vec4} a vector to represent as a string
       * @returns {String} string representation of the vector
       */

      /**
       * Returns whether or not the vectors have exactly the same elements in the same position (when compared with ===)
       *
       * @param {vec4} a The first vector.
       * @param {vec4} b The second vector.
       * @returns {Boolean} True if the vectors are equal, false otherwise.
       */

      /**
       * Returns whether or not the vectors have approximately the same elements in the same position.
       *
       * @param {vec4} a The first vector.
       * @param {vec4} b The second vector.
       * @returns {Boolean} True if the vectors are equal, false otherwise.
       */

      /**
       * Alias for {@link vec4.subtract}
       * @function
       */

      /**
       * Alias for {@link vec4.multiply}
       * @function
       */

      /**
       * Alias for {@link vec4.divide}
       * @function
       */

      /**
       * Alias for {@link vec4.distance}
       * @function
       */

      /**
       * Alias for {@link vec4.squaredDistance}
       * @function
       */

      /**
       * Alias for {@link vec4.length}
       * @function
       */

      /**
       * Alias for {@link vec4.squaredLength}
       * @function
       */

      /**
       * Perform some operation over an array of vec4s.
       *
       * @param {Array} a the array of vectors to iterate over
       * @param {Number} stride Number of elements between the start of each vec4. If 0 assumes tightly packed
       * @param {Number} offset Number of elements to skip at the beginning of the array
       * @param {Number} count Number of vec4s to iterate over. If 0 iterates over entire array
       * @param {Function} fn Function to call for each vector in the array
       * @param {Object} [arg] additional argument to pass to fn
       * @returns {Array} a
       * @function
       */
      const forEach$2 = function () {
        let vec = create$3();

        return function (a, stride, offset, count, fn, arg) {
          let i, l;
          if (!stride) {
            stride = 4;
          }

          if (!offset) {
            offset = 0;
          }

          if (count) {
            l = Math.min(count * stride + offset, a.length);
          } else {
            l = a.length;
          }

          for (i = offset; i < l; i += stride) {
            vec[0] = a[i];vec[1] = a[i + 1];vec[2] = a[i + 2];vec[3] = a[i + 3];
            fn(vec, vec, arg);
            a[i] = vec[0];a[i + 1] = vec[1];a[i + 2] = vec[2];a[i + 3] = vec[3];
          }

          return a;
        };
      }();

      class Vector4 extends Float32Array {
        constructor(array = [0, 0, 0, 0]) {
          super(array);
          return this;
        }

        get x() {
          return this[0];
        }

        set x(value) {
          this[0] = value;
        }

        get y() {
          return this[1];
        }

        set y(value) {
          this[1] = value;
        }

        get z() {
          return this[2];
        }

        set z(value) {
          this[2] = value;
        }

        get w() {
          return this[3];
        }

        set w(value) {
          this[3] = value;
        }

        set(x, y, z, w) {
          set$3(this, x, y, z, w);
          return this;
        }
      }

      /* Copyright (c) 2015, Brandon Jones, Colin MacKenzie IV.
      
      Permission is hereby granted, free of charge, to any person obtaining a copy
      of this software and associated documentation files (the "Software"), to deal
      in the Software without restriction, including without limitation the rights
      to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
      copies of the Software, and to permit persons to whom the Software is
      furnished to do so, subject to the following conditions:
      
      The above copyright notice and this permission notice shall be included in
      all copies or substantial portions of the Software.
      
      THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
      IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
      FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
      AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
      LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
      OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
      THE SOFTWARE. */

      /**
       * 3x3 Matrix
       * @module mat3
       */

      /**
       * Creates a new identity mat3
       *
       * @returns {mat3} a new 3x3 matrix
       */
      function create$4() {
        let out = new ARRAY_TYPE(9);
        out[0] = 1;
        out[1] = 0;
        out[2] = 0;
        out[3] = 0;
        out[4] = 1;
        out[5] = 0;
        out[6] = 0;
        out[7] = 0;
        out[8] = 1;
        return out;
      }

      /**
       * Copies the upper-left 3x3 values into the given mat3.
       *
       * @param {mat3} out the receiving 3x3 matrix
       * @param {mat4} a   the source 4x4 matrix
       * @returns {mat3} out
       */
      function fromMat4(out, a) {
        out[0] = a[0];
        out[1] = a[1];
        out[2] = a[2];
        out[3] = a[4];
        out[4] = a[5];
        out[5] = a[6];
        out[6] = a[8];
        out[7] = a[9];
        out[8] = a[10];
        return out;
      }

      /**
       * Creates a new mat3 initialized with values from an existing matrix
       *
       * @param {mat3} a matrix to clone
       * @returns {mat3} a new 3x3 matrix
       */

      /**
       * Copy the values from one mat3 to another
       *
       * @param {mat3} out the receiving matrix
       * @param {mat3} a the source matrix
       * @returns {mat3} out
       */
      function copy$4(out, a) {
        out[0] = a[0];
        out[1] = a[1];
        out[2] = a[2];
        out[3] = a[3];
        out[4] = a[4];
        out[5] = a[5];
        out[6] = a[6];
        out[7] = a[7];
        out[8] = a[8];
        return out;
      }

      /**
       * Create a new mat3 with the given values
       *
       * @param {Number} m00 Component in column 0, row 0 position (index 0)
       * @param {Number} m01 Component in column 0, row 1 position (index 1)
       * @param {Number} m02 Component in column 0, row 2 position (index 2)
       * @param {Number} m10 Component in column 1, row 0 position (index 3)
       * @param {Number} m11 Component in column 1, row 1 position (index 4)
       * @param {Number} m12 Component in column 1, row 2 position (index 5)
       * @param {Number} m20 Component in column 2, row 0 position (index 6)
       * @param {Number} m21 Component in column 2, row 1 position (index 7)
       * @param {Number} m22 Component in column 2, row 2 position (index 8)
       * @returns {mat3} A new mat3
       */

      /**
       * Set the components of a mat3 to the given values
       *
       * @param {mat3} out the receiving matrix
       * @param {Number} m00 Component in column 0, row 0 position (index 0)
       * @param {Number} m01 Component in column 0, row 1 position (index 1)
       * @param {Number} m02 Component in column 0, row 2 position (index 2)
       * @param {Number} m10 Component in column 1, row 0 position (index 3)
       * @param {Number} m11 Component in column 1, row 1 position (index 4)
       * @param {Number} m12 Component in column 1, row 2 position (index 5)
       * @param {Number} m20 Component in column 2, row 0 position (index 6)
       * @param {Number} m21 Component in column 2, row 1 position (index 7)
       * @param {Number} m22 Component in column 2, row 2 position (index 8)
       * @returns {mat3} out
       */
      function set$4(out, m00, m01, m02, m10, m11, m12, m20, m21, m22) {
        out[0] = m00;
        out[1] = m01;
        out[2] = m02;
        out[3] = m10;
        out[4] = m11;
        out[5] = m12;
        out[6] = m20;
        out[7] = m21;
        out[8] = m22;
        return out;
      }

      /**
       * Set a mat3 to the identity matrix
       *
       * @param {mat3} out the receiving matrix
       * @returns {mat3} out
       */
      function identity$1(out) {
        out[0] = 1;
        out[1] = 0;
        out[2] = 0;
        out[3] = 0;
        out[4] = 1;
        out[5] = 0;
        out[6] = 0;
        out[7] = 0;
        out[8] = 1;
        return out;
      }

      /**
       * Transpose the values of a mat3
       *
       * @param {mat3} out the receiving matrix
       * @param {mat3} a the source matrix
       * @returns {mat3} out
       */

      /**
       * Inverts a mat3
       *
       * @param {mat3} out the receiving matrix
       * @param {mat3} a the source matrix
       * @returns {mat3} out
       */
      function invert$1(out, a) {
        let a00 = a[0],
            a01 = a[1],
            a02 = a[2];
        let a10 = a[3],
            a11 = a[4],
            a12 = a[5];
        let a20 = a[6],
            a21 = a[7],
            a22 = a[8];

        let b01 = a22 * a11 - a12 * a21;
        let b11 = -a22 * a10 + a12 * a20;
        let b21 = a21 * a10 - a11 * a20;

        // Calculate the determinant
        let det = a00 * b01 + a01 * b11 + a02 * b21;

        if (!det) {
          return null;
        }
        det = 1.0 / det;

        out[0] = b01 * det;
        out[1] = (-a22 * a01 + a02 * a21) * det;
        out[2] = (a12 * a01 - a02 * a11) * det;
        out[3] = b11 * det;
        out[4] = (a22 * a00 - a02 * a20) * det;
        out[5] = (-a12 * a00 + a02 * a10) * det;
        out[6] = b21 * det;
        out[7] = (-a21 * a00 + a01 * a20) * det;
        out[8] = (a11 * a00 - a01 * a10) * det;
        return out;
      }

      /**
       * Calculates the adjugate of a mat3
       *
       * @param {mat3} out the receiving matrix
       * @param {mat3} a the source matrix
       * @returns {mat3} out
       */

      /**
       * Calculates the determinant of a mat3
       *
       * @param {mat3} a the source matrix
       * @returns {Number} determinant of a
       */

      /**
       * Multiplies two mat3's
       *
       * @param {mat3} out the receiving matrix
       * @param {mat3} a the first operand
       * @param {mat3} b the second operand
       * @returns {mat3} out
       */
      function multiply$4(out, a, b) {
        let a00 = a[0],
            a01 = a[1],
            a02 = a[2];
        let a10 = a[3],
            a11 = a[4],
            a12 = a[5];
        let a20 = a[6],
            a21 = a[7],
            a22 = a[8];

        let b00 = b[0],
            b01 = b[1],
            b02 = b[2];
        let b10 = b[3],
            b11 = b[4],
            b12 = b[5];
        let b20 = b[6],
            b21 = b[7],
            b22 = b[8];

        out[0] = b00 * a00 + b01 * a10 + b02 * a20;
        out[1] = b00 * a01 + b01 * a11 + b02 * a21;
        out[2] = b00 * a02 + b01 * a12 + b02 * a22;

        out[3] = b10 * a00 + b11 * a10 + b12 * a20;
        out[4] = b10 * a01 + b11 * a11 + b12 * a21;
        out[5] = b10 * a02 + b11 * a12 + b12 * a22;

        out[6] = b20 * a00 + b21 * a10 + b22 * a20;
        out[7] = b20 * a01 + b21 * a11 + b22 * a21;
        out[8] = b20 * a02 + b21 * a12 + b22 * a22;
        return out;
      }

      /**
       * Translate a mat3 by the given vector
       *
       * @param {mat3} out the receiving matrix
       * @param {mat3} a the matrix to translate
       * @param {vec2} v vector to translate by
       * @returns {mat3} out
       */
      function translate$1(out, a, v) {
        let a00 = a[0],
            a01 = a[1],
            a02 = a[2],
            a10 = a[3],
            a11 = a[4],
            a12 = a[5],
            a20 = a[6],
            a21 = a[7],
            a22 = a[8],
            x = v[0],
            y = v[1];

        out[0] = a00;
        out[1] = a01;
        out[2] = a02;

        out[3] = a10;
        out[4] = a11;
        out[5] = a12;

        out[6] = x * a00 + y * a10 + a20;
        out[7] = x * a01 + y * a11 + a21;
        out[8] = x * a02 + y * a12 + a22;
        return out;
      }

      /**
       * Rotates a mat3 by the given angle
       *
       * @param {mat3} out the receiving matrix
       * @param {mat3} a the matrix to rotate
       * @param {Number} rad the angle to rotate the matrix by
       * @returns {mat3} out
       */
      function rotate$1(out, a, rad) {
        let a00 = a[0],
            a01 = a[1],
            a02 = a[2],
            a10 = a[3],
            a11 = a[4],
            a12 = a[5],
            a20 = a[6],
            a21 = a[7],
            a22 = a[8],
            s = Math.sin(rad),
            c = Math.cos(rad);

        out[0] = c * a00 + s * a10;
        out[1] = c * a01 + s * a11;
        out[2] = c * a02 + s * a12;

        out[3] = c * a10 - s * a00;
        out[4] = c * a11 - s * a01;
        out[5] = c * a12 - s * a02;

        out[6] = a20;
        out[7] = a21;
        out[8] = a22;
        return out;
      }

      /**
       * Scales the mat3 by the dimensions in the given vec2
       *
       * @param {mat3} out the receiving matrix
       * @param {mat3} a the matrix to rotate
       * @param {vec2} v the vec2 to scale the matrix by
       * @returns {mat3} out
       **/
      function scale$4(out, a, v) {
        let x = v[0],
            y = v[1];

        out[0] = x * a[0];
        out[1] = x * a[1];
        out[2] = x * a[2];

        out[3] = y * a[3];
        out[4] = y * a[4];
        out[5] = y * a[5];

        out[6] = a[6];
        out[7] = a[7];
        out[8] = a[8];
        return out;
      }

      /**
       * Creates a matrix from a vector translation
       * This is equivalent to (but much faster than):
       *
       *     mat3.identity(dest);
       *     mat3.translate(dest, dest, vec);
       *
       * @param {mat3} out mat3 receiving operation result
       * @param {vec2} v Translation vector
       * @returns {mat3} out
       */

      /**
       * Creates a matrix from a given angle
       * This is equivalent to (but much faster than):
       *
       *     mat3.identity(dest);
       *     mat3.rotate(dest, dest, rad);
       *
       * @param {mat3} out mat3 receiving operation result
       * @param {Number} rad the angle to rotate the matrix by
       * @returns {mat3} out
       */

      /**
       * Creates a matrix from a vector scaling
       * This is equivalent to (but much faster than):
       *
       *     mat3.identity(dest);
       *     mat3.scale(dest, dest, vec);
       *
       * @param {mat3} out mat3 receiving operation result
       * @param {vec2} v Scaling vector
       * @returns {mat3} out
       */

      /**
       * Copies the values from a mat2d into a mat3
       *
       * @param {mat3} out the receiving matrix
       * @param {mat2d} a the matrix to copy
       * @returns {mat3} out
       **/

      /**
      * Calculates a 3x3 matrix from the given quaternion
      *
      * @param {mat3} out mat3 receiving operation result
      * @param {quat} q Quaternion to create matrix from
      *
      * @returns {mat3} out
      */
      function fromQuat$1(out, q) {
        let x = q[0],
            y = q[1],
            z = q[2],
            w = q[3];
        let x2 = x + x;
        let y2 = y + y;
        let z2 = z + z;

        let xx = x * x2;
        let yx = y * x2;
        let yy = y * y2;
        let zx = z * x2;
        let zy = z * y2;
        let zz = z * z2;
        let wx = w * x2;
        let wy = w * y2;
        let wz = w * z2;

        out[0] = 1 - yy - zz;
        out[3] = yx - wz;
        out[6] = zx + wy;

        out[1] = yx + wz;
        out[4] = 1 - xx - zz;
        out[7] = zy - wx;

        out[2] = zx - wy;
        out[5] = zy + wx;
        out[8] = 1 - xx - yy;

        return out;
      }

      /**
      * Calculates a 3x3 normal matrix (transpose inverse) from the 4x4 matrix
      *
      * @param {mat3} out mat3 receiving operation result
      * @param {mat4} a Mat4 to derive the normal matrix from
      *
      * @returns {mat3} out
      */

      /**
       * Generates a 2D projection matrix with the given bounds
       *
       * @param {mat3} out mat3 frustum matrix will be written into
       * @param {number} width Width of your gl context
       * @param {number} height Height of gl context
       * @returns {mat3} out
       */

      /**
       * Returns a string representation of a mat3
       *
       * @param {mat3} a matrix to represent as a string
       * @returns {String} string representation of the matrix
       */

      /**
       * Returns Frobenius norm of a mat3
       *
       * @param {mat3} a the matrix to calculate Frobenius norm of
       * @returns {Number} Frobenius norm
       */

      /**
       * Adds two mat3's
       *
       * @param {mat3} out the receiving matrix
       * @param {mat3} a the first operand
       * @param {mat3} b the second operand
       * @returns {mat3} out
       */

      /**
       * Subtracts matrix b from matrix a
       *
       * @param {mat3} out the receiving matrix
       * @param {mat3} a the first operand
       * @param {mat3} b the second operand
       * @returns {mat3} out
       */

      /**
       * Multiply each element of the matrix by a scalar.
       *
       * @param {mat3} out the receiving matrix
       * @param {mat3} a the matrix to scale
       * @param {Number} b amount to scale the matrix's elements by
       * @returns {mat3} out
       */

      /**
       * Adds two mat3's after multiplying each element of the second operand by a scalar value.
       *
       * @param {mat3} out the receiving vector
       * @param {mat3} a the first operand
       * @param {mat3} b the second operand
       * @param {Number} scale the amount to scale b's elements by before adding
       * @returns {mat3} out
       */

      /**
       * Returns whether or not the matrices have exactly the same elements in the same position (when compared with ===)
       *
       * @param {mat3} a The first matrix.
       * @param {mat3} b The second matrix.
       * @returns {Boolean} True if the matrices are equal, false otherwise.
       */

      /**
       * Returns whether or not the matrices have approximately the same elements in the same position.
       *
       * @param {mat3} a The first matrix.
       * @param {mat3} b The second matrix.
       * @returns {Boolean} True if the matrices are equal, false otherwise.
       */

      /**
       * Alias for {@link mat3.multiply}
       * @function
       */

      /**
       * Alias for {@link mat3.subtract}
       * @function
       */

      class Matrix3 extends Float32Array {
        constructor(array = [1, 0, 0, 0, 1, 0, 0, 0, 1]) {
          super(array);
          return this;
        }

        set(m00, m01, m02, m10, m11, m12, m20, m21, m22) {
          set$4(this, m00, m01, m02, m10, m11, m12, m20, m21, m22);
          return this;
        }

        translate(vector2, matrix3 = this) {
          translate$1(this, matrix3, vector2);
          return this;
        }

        rotate(value, matrix3 = this) {
          rotate$1(this, matrix3, value);
          return this;
        }

        scale(vector2, matrix3 = this) {
          scale$4(this, matrix3, vector2);
          return this;
        }

        multiply(matrix3a, matrix3b) {
          if (matrix3b) {
            multiply$4(this, matrix3a, matrix3b);
          } else {
            multiply$4(this, this, matrix3a);
          }
          return this;
        }

        identity() {
          identity$1(this);
          return this;
        }

        copy(matrix3) {
          copy$4(this, matrix3);
          return this;
        }

        fromMatrix4(matrix4) {
          fromMat4(this, matrix4);
          return this;
        }

        fromQuaternion(quaternion) {
          fromQuat$1(this, quaternion);
          return this;
        }

        fromBasis(vector3a, vector3b, vector3c) {
          this.set(vector3a[0], vector3a[1], vector3a[2], vector3b[0], vector3b[1], vector3b[2], vector3c[0], vector3c[1], vector3c[2]);
          return this;
        }

        invert(matrix3 = this) {
          invert$1(this, matrix3);
          return this;
        }
      }

      class Shader {
        static add(string = "void main() {}", chunks) {
          function regExpFromKey(key) {
            let regExpString = key instanceof RegExp ? key.source : key.replace(/[|\\{}()[\]^$+*?.]/g, "\\$&");
            return new RegExp(`(${regExpString})`);
          }

          for (let [key, chunk] of chunks) {
            switch (key) {
              case "start":
                string = string.replace(/(#version .*?)\n([\s\S]*)/, `$1\n${chunk}\n$2`);
                break;
              case "end":
                string = string.replace(/(}\s*$)/, `\n${chunk}\n$1`);
                break;
              case "main":
                string = string.replace(/(\bvoid\b +\bmain\b[\s\S]*?{\s*)/, `$1\n${chunk}\n`);
                break;
              default:
                string = string.replace(key, chunk);
            }
          }

          return string;
        }

        constructor({ vertexShader = `#version 300 es
    void main() {
      gl_Position = vec4(0., 0., 0., 1.);
    }
  `, fragmentShader = `#version 300 es
    precision highp float;

    out vec4 fragColor;

    void main() {
      fragColor = vec4(1.);
    }
  `, uniforms = [], vertexShaderChunks = [], fragmentShaderChunks = [], shaders = [] } = {}) {
          this.uniforms = new Map();
          this._glslUniformTypes = new Map();

          this.vertexShader = vertexShader;
          this.fragmentShader = fragmentShader;
          this._vertexShaderChunks = [];
          this._fragmentShaderChunks = [];

          this.add({ vertexShaderChunks, fragmentShaderChunks, uniforms });

          for (let shader of shaders) {
            this.add(shader);
          }
        }

        add({ vertexShaderChunks = [], fragmentShaderChunks = [], uniforms = [] } = {}) {
          this.vertexShader = Shader.add(this.vertexShader, vertexShaderChunks);
          this._vertexShaderChunks.push(...vertexShaderChunks);
          this.fragmentShader = Shader.add(this.fragmentShader, fragmentShaderChunks);
          this._fragmentShaderChunks.push(...fragmentShaderChunks);
          for (let [key, value] of uniforms) {
            this.uniforms.set(key, value);
          }
        }

        set vertexShader(value) {
          this._vertexShader = value;
          this._parseUniforms(this._vertexShader);
        }

        get vertexShader() {
          return this._vertexShader;
        }

        set fragmentShader(value) {
          this._fragmentShader = value;
          this._parseUniforms(this._fragmentShader);
        }

        get fragmentShader() {
          return this._fragmentShader;
        }

        get vertexShaderChunks() {
          return this._vertexShaderChunks;
        }

        get fragmentShaderChunks() {
          return this._fragmentShaderChunks;
        }

        /**
         * Parse shader strings to extract uniforms
         */
        _parseUniforms(string, classes) {
          classes = Object.assign({
            Vector2: class Vector2 extends Float32Array {
              constructor() {
                super(2);
              }
            },
            Vector3: class Vector3 extends Float32Array {
              constructor() {
                super(3);
              }
            },
            Vector4: class Vector4 extends Float32Array {
              constructor() {
                super(4);
              }
            },
            Matrix3: class Matrix3 extends Float32Array {
              constructor() {
                super([1, 0, 0, 0, 1, 0, 0, 0, 1]);
              }
            },
            Matrix4: class Matrix3 extends Float32Array {
              constructor() {
                super([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]);
              }
            },
            Texture: class Texture {},
            TextureCube: class TextureCube {}
          }, classes);

          let regExp = /^\s*uniform (.[^ ]+) (.[^ ;\[\]]+)\[? *(\d+)? *\]?/gm;

          let match;

          while (match = regExp.exec(string)) {
            let [, glslType, variableName, lengthStr] = match;
            let length = parseInt(lengthStr);

            if (this.uniforms.has(variableName)) {
              continue;
            }

            let value;
            let typeMatch;

            this._glslUniformTypes.set(variableName, glslType);

            if (/float|double/.test(glslType)) {
              if (isNaN(length)) {
                value = 0;
              } else {
                value = new Array(length).fill(0);
              }
            } else if (/int|uint/.test(glslType)) {
              if (isNaN(length)) {
                value = 0;
              } else {
                value = new Array(length).fill(0);
              }
            } else if (/sampler2D/.test(glslType)) {
              if (isNaN(length)) {
                value = new classes.Texture();
              } else {
                value = new Array(length).fill().map(value => new classes.Texture());
              }
            } else if (/samplerCube/.test(glslType)) {
              if (isNaN(length)) {
                value = new classes.TextureCube();
              } else {
                value = new Array(length).fill().map(value => new classes.TextureCube());
              }
            } else if (typeMatch = /(.?)vec(\d)/.exec(glslType)) {
              let vectorLength = typeMatch[2];
              if (isNaN(length)) {
                value = new classes[`Vector${vectorLength}`]();
              } else {
                value = new Array(length).fill().map(value => new classes[`Vector${vectorLength}`]());
              }
            } else if (typeMatch = /mat(\d)/.exec(glslType)) {
              let matrixLength = typeMatch[1];
              if (isNaN(length)) {
                value = new classes[`Matrix${matrixLength}`]();
              } else {
                value = new Array(length).fill().map(value => new classes[`Matrix${matrixLength}`]());
              }
            } else {
              value = undefined;
            }

            this.uniforms.set(variableName, value);
          }
        }
      }

      class GLTexture {
        constructor({
          gl,
          data = null,
          width = undefined,
          height = undefined,
          level = 0,
          internalformat = gl.RGBA,
          format = gl.RGBA,
          type = gl.UNSIGNED_BYTE,
          minFilter = gl.NEAREST_MIPMAP_LINEAR,
          magFilter = gl.LINEAR,
          wrapS = gl.REPEAT,
          wrapT = gl.REPEAT
        } = {}) {
          this.gl = gl;
          this._texture = this.gl.createTexture();
          this._width = width;
          this._height = height;

          this.level = level;
          this.internalformat = internalformat;
          this.format = format;
          this.type = type;
          this.minFilter = minFilter;
          this.magFilter = magFilter;
          this.wrapS = wrapS;
          this.wrapT = wrapT;
          if (data || this._width && this._height) {
            this.data = data;
          }
        }

        generateMipmap() {
          this.gl.generateMipmap(this.gl.TEXTURE_2D);
        }

        set data(value) {
          this._data = value;
          this.bind();
          const width = this._width || this._data.width || this._data.videoWidth;
          const height = this._height || this._data.height || this._data.videoHeight;
          if (this.gl instanceof WebGLRenderingContext && (this._data.width || this._data.videoWidth)) {
            this.gl.texImage2D(this.gl.TEXTURE_2D, this.level, this.internalformat, this.format, this.type, this._data);
          } else {
            this.gl.texImage2D(this.gl.TEXTURE_2D, this.level, this.internalformat, width, height, 0, this.format, this.type, this._data);
          }
        }

        get data() {
          return this._data;
        }

        get width() {
          return this._width;
        }

        get height() {
          return this._height;
        }

        set minFilter(value) {
          if (this._minFilter === value) {
            return;
          }
          this._minFilter = value;
          this.bind();
          this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this._minFilter);
        }

        get minFilter() {
          return this._minFilter;
        }

        set magFilter(value) {
          if (this._magFilter === value) {
            return;
          }
          this._magFilter = value;
          this.bind();
          this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, this._magFilter);
        }

        get magFilter() {
          return this._magFilter;
        }

        set wrapS(value) {
          if (this._wrapS === value) {
            return;
          }
          this._wrapS = value;
          this.bind();
          this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_S, this._wrapS);
        }

        get wrapS() {
          return this._wrapS;
        }

        set wrapT(value) {
          if (this._wrapT === value) {
            return;
          }
          this._wrapT = value;
          this.bind();
          this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_T, this._wrapT);
        }

        get wrapT() {
          return this._wrapT;
        }

        bind({ unit = 0 } = {}) {
          this.gl.activeTexture(this.gl[`TEXTURE${unit}`]);
          this.gl.bindTexture(this.gl.TEXTURE_2D, this._texture);
        }

        unbind() {
          this.gl.bindTexture(this.gl.TEXTURE_2D, null);
        }
      }

      class GLProgram extends Shader {
        constructor({ gl,
          vertexShader = undefined,
          fragmentShader = undefined,
          uniforms = undefined,
          attributes = undefined,
          vertexShaderChunks = undefined,
          fragmentShaderChunks = undefined,
          shaders = undefined
        } = {}) {
          super({ vertexShader, fragmentShader, uniforms, attributes, vertexShaderChunks, fragmentShaderChunks, shaders });

          this.gl = gl;
          this._program = gl.createProgram();
          this._attachedShaders = new Map();

          const self = this;

          this._vertexAttribDivisor = function () {};
          const instancedArraysExtension = this.gl.getExtension("ANGLE_instanced_arrays");
          if (instancedArraysExtension) {
            this._vertexAttribDivisor = instancedArraysExtension.vertexAttribDivisorANGLE.bind(instancedArraysExtension);
          } else if (this.gl.vertexAttribDivisor) {
            this._vertexAttribDivisor = this.gl.vertexAttribDivisor.bind(this.gl);
          }

          const attributesLocations = new Map();
          class Attributes extends Map {
            set(name, { buffer, location = attributesLocations.get(name), size, type = gl.FLOAT, normalized = false, stride = 0, offset = 0, divisor } = {}) {
              if (name instanceof Map) {
                for (let [key, value] of name) {
                  this.set(key, value);
                }
                return;
              }
              buffer.bind();
              if (!location) {
                location = gl.getAttribLocation(self._program, name);
                if (location === -1) {
                  console.warn(`Attribute "${name}" is missing or never used`);
                }
                attributesLocations.set(name, location);
              }
              gl.enableVertexAttribArray(location);
              gl.vertexAttribPointer(location, size, type, normalized, stride, offset);
              if (divisor !== undefined) {
                self._vertexAttribDivisor(location, divisor);
              }
              super.set(name, { buffer, size, type, normalized, stride, offset });
            }
          }

          this._uniformLocations = new Map();
          this._uniformTypes = new Map();
          class Uniforms extends Map {
            set(name, ...values) {
              let value = values[0];
              if (value === undefined) {
                return;
              }

              let location = self._uniformLocations.get(name);
              if (location === undefined) {
                location = gl.getUniformLocation(self._program, name);
                self._uniformLocations.set(name, location);
              }

              if (value.length === undefined) {
                if (value instanceof Object) {
                  for (let key in value) {
                    self.uniforms.set(`${name}.${key}`, value[key]);
                  }
                  return;
                }
                if (values.length > 1) {
                  value = self.uniforms.get(name);
                  value.set(...values);
                } else {
                  value = values;
                }
              } else if (value[0] instanceof Object) {
                for (let i = 0; i < value.length; i++) {
                  if (value[0].length) {
                    self.uniforms.set(`${name}[${i}]`, value[i]);
                  } else {
                    for (let key in value[i]) {
                      self.uniforms.set(`${name}[${i}].${key}`, value[i][key]);
                    }
                  }
                }
                return;
              }

              if (location === null) {
                return;
              }

              let type = self._uniformTypes.get(name);
              if (!type) {
                type = /int|ivec|sampler2D|samplerCube/.test(self._glslUniformTypes.get(name)) ? "iv" : "fv";
                self._uniformTypes.set(name, type);
              }

              if (value.length <= 4) {
                gl[`uniform${value.length || 1}${type}`](location, value);
              } else if (value.length === 9) {
                gl.uniformMatrix3fv(location, false, value);
              } else if (value.length === 16) {
                gl.uniformMatrix4fv(location, false, value);
              }

              super.set(name, value);
            }
          }

          this.vertexShader = this.vertexShader;
          this.fragmentShader = this.fragmentShader;

          this.use();

          this.attributes = new Attributes();
          this.uniforms = new Uniforms([...this.uniforms]);
        }

        set vertexShader(value) {
          super.vertexShader = value;
          if (this.gl) {
            this._updateShader(this.gl.VERTEX_SHADER, this.vertexShader);
          }
        }

        get vertexShader() {
          return super.vertexShader;
        }

        set fragmentShader(value) {
          super.fragmentShader = value;
          if (this.gl) {
            this._updateShader(this.gl.FRAGMENT_SHADER, this.fragmentShader);
          }
        }

        get fragmentShader() {
          return super.fragmentShader;
        }

        use() {
          this.gl.useProgram(this._program);
        }

        _updateShader(type, source) {
          if (!source) {
            return;
          }

          if (this.gl instanceof WebGLRenderingContext) {
            source = source.replace(/#version.*?\n/g, "");
            source = source.replace(/\btexture\b/g, "texture2D");
            if (type === this.gl.VERTEX_SHADER) {
              source = source.replace(/\bin\b/g, "attribute");
              source = source.replace(/\bout\b/g, "varying");
            } else {
              source = source.replace(/\bin\b/g, "varying");
              const results = /out vec4 (.*?);/.exec(source);
              if (results) {
                const fragColorName = results[1];
                source = source.replace(/out.*?;/, "");
                source = source.replace(new RegExp(`\\b${fragColorName}\\b`, "g"), "gl_FragColor");
              }
            }
          }

          const shader = this.gl.createShader(type);
          this.gl.shaderSource(shader, source);
          this.gl.compileShader(shader);

          const shaderInfoLog = this.gl.getShaderInfoLog(shader);
          if (!this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS)) {
            const lineNumberResults = /ERROR: 0:(\d+):/.exec(shaderInfoLog);
            if (lineNumberResults) {
              const lineNumber = parseFloat(lineNumberResults[1]);
              const shaderLines = source.split("\n");
              console.error(`${shaderInfoLog}\nat: ${shaderLines[lineNumber - 1].replace(/^\s*/, "")}`);
            } else {
              console.error(shaderInfoLog);
            }
            this.gl.deleteShader(shader);
            return;
          } else if (shaderInfoLog) {
            console.warn(shaderInfoLog);
          }

          const attachedShader = this._attachedShaders.get(type);
          if (attachedShader) {
            this.gl.detachShader(this._program, attachedShader);
            this.gl.deleteShader(attachedShader);
          }

          this.gl.attachShader(this._program, shader);
          this.gl.deleteShader(shader);
          this._attachedShaders.set(type, shader);

          if (this._attachedShaders.size === 2) {
            this.gl.linkProgram(this._program);
            const programInfoLog = this.gl.getProgramInfoLog(this._program);
            if (!this.gl.getProgramParameter(this._program, this.gl.LINK_STATUS)) {
              console.error(programInfoLog);
            } else if (programInfoLog) {
              console.warn(programInfoLog);
            }
            for (let [type, attachedShader] of this._attachedShaders) {
              // this.gl.detachShader(this._program, attachedShader);
              // this._attachedShaders.delete(type);
            }
            this._uniformLocations = new Map();
            this._uniformTypes = new Map();
          }
        }

        _parseUniforms(string) {
          super._parseUniforms(string, {
            Vector2,
            Vector3,
            Vector4,
            Matrix3,
            Matrix4,
            GLTexture
          });
        }
      }

      class GLBuffer {
        constructor({ gl, size = 0, data = new ArrayBuffer(size), target = gl.ARRAY_BUFFER, usage = gl.STATIC_DRAW } = {}) {
          this.gl = gl;
          this._target = target;
          this._usage = usage;

          this._buffer = this.gl.createBuffer();

          this.data = data;
        }

        set data(value) {
          this._data = value;

          this.bind();
          this.gl.bufferData(this._target, this._data, this._usage);
        }

        get data() {
          return this._data;
        }

        bind() {
          this.gl.bindBuffer(this._target, this._buffer);
        }

        unbind() {
          this.gl.bindBuffer(this._target, null);
        }
      }

      class GLMesh {
        constructor({ gl, attributes, indiceData } = {}) {
          this.gl = gl;

          this.gl.getExtension("OES_element_index_uint");

          this._drawElementsInstanced = function () {};
          this._drawArraysInstanced = function () {};
          const instancedArraysExtension = this.gl.getExtension("ANGLE_instanced_arrays");
          if (instancedArraysExtension) {
            this._drawElementsInstanced = instancedArraysExtension.drawElementsInstancedANGLE.bind(instancedArraysExtension);
            this._drawArraysInstanced = instancedArraysExtension.drawArraysInstancedANGLE.bind(instancedArraysExtension);
          } else if (this.gl.drawElementsInstanced) {
            this._drawElementsInstanced = this.gl.drawElementsInstanced.bind(this.gl);
            this._drawArraysInstanced = this.gl.drawArraysInstanced.bind(this.gl);
          }

          this.attributes = new Map(attributes);

          for (let [name, attribute] of this.attributes) {
            attribute.buffer = new GLBuffer({
              gl: this.gl,
              data: attribute.data
            });
            attribute.count = attribute.count || attribute.data.length / attribute.size;
          }

          if (indiceData) {
            this.indices = {
              buffer: new GLBuffer({
                gl: this.gl,
                data: indiceData,
                target: this.gl.ELEMENT_ARRAY_BUFFER
              }),
              type: indiceData instanceof Uint8Array ? this.gl.UNSIGNED_BYTE : indiceData instanceof Uint16Array ? this.gl.UNSIGNED_SHORT : this.gl.UNSIGNED_INT,
              offset: 0,
              count: indiceData ? indiceData.length : 0
            };
          }
        }

        bind() {
          for (let attribute of this.attributes.values()) {
            attribute.buffer.bind();
          }

          if (this.indices) {
            this.indices.buffer.bind();
          }
        }

        unbind() {
          for (let attribute of this.attributes.values()) {
            attribute.buffer.unbind();
          }

          if (this.indices) {
            this.indices.buffer.unbind();
          }
        }

        draw({
          mode = this.gl.TRIANGLES,
          elements = !!this.indices,
          count = elements ? this.indices.count : this.attributes.get("position").count,
          offset = this.indices ? this.indices.offset : 0,
          type = this.indices ? this.indices.type : null,
          first = 0,
          instanceCount = undefined
        } = {}) {
          if (elements) {
            if (instanceCount !== undefined) {
              this._drawElementsInstanced(mode, count, type, offset, instanceCount);
            } else {
              this.gl.drawElements(mode, count, type, offset);
            }
          } else {
            if (instanceCount !== undefined) {
              this._drawArraysInstanced(mode, first, count, instanceCount);
            } else {
              this.gl.drawArrays(mode, first, count);
            }
          }
        }
      }

      class Camera {
        constructor({ near = 0.01, far = 1000, aspectRatio = 1, fov = Math.PI / 3 } = {}) {
          this._near = near;
          this._far = far;
          this._aspectRatio = aspectRatio;
          this._fov = fov;

          this.transform = new Matrix4();
          this._inverseTransform = new Matrix4();
          this._projection = new Matrix4();
          this._projectionView = new Matrix4();

          this._updateProjection();
        }

        set near(value) {
          this._near = value;
          this._updateProjection();
        }

        get near() {
          return this._near;
        }

        set far(value) {
          this._far = value;
          this._updateProjection();
        }

        get far() {
          return this._far;
        }

        set fov(value) {
          this._fov = value;
          this._updateProjection();
        }

        get fov() {
          return this._fov;
        }

        set aspectRatio(value) {
          this._aspectRatio = value;
          this._updateProjection();
        }

        get aspectRatio() {
          return this._aspectRatio;
        }

        get inverseTransform() {
          return this._inverseTransform.invert(this.transform);
        }

        get projection() {
          return this._projection;
        }

        get projectionView() {
          return this._projectionView.copy(this.projection).multiply(this.inverseTransform);
        }

        _updateProjection() {
          this._projection.fromPerspective(this);
        }
      }

      Object.defineProperty(Camera.prototype, "near", { enumerable: true });
      Object.defineProperty(Camera.prototype, "far", { enumerable: true });
      Object.defineProperty(Camera.prototype, "fov", { enumerable: true });
      Object.defineProperty(Camera.prototype, "aspectRatio", { enumerable: true });
      Object.defineProperty(Camera.prototype, "inverseTransform", { enumerable: true });
      Object.defineProperty(Camera.prototype, "projection", { enumerable: true });
      Object.defineProperty(Camera.prototype, "projectionView", { enumerable: true });

      let pointers = new Map();

      class Pointer extends Vector2 {
        static get TOUCH_TYPE() {
          return "touchtype";
        }

        static get MOUSE_TYPE() {
          return "mousetype";
        }

        static get(domElement = window) {
          let pointer = pointers.get(domElement);
          if (!pointer) {
            pointer = new Pointer(domElement);
          }
          return pointer;
        }

        get downed() {
          return this._downed;
        }

        constructor(domElement = document.body) {
          super();

          this.domElement = domElement;

          this.type = Pointer.TOUCH_TYPE;

          this._position = new Vector2();

          this.velocity = new Vector2();
          this.dragOffset = new Vector2();

          this.centered = new Vector2();
          this.centeredFlippedY = new Vector2();
          this.normalized = new Vector2();
          this.normalizedFlippedY = new Vector2();
          this.normalizedCentered = new Vector2();
          this.normalizedCenteredFlippedY = new Vector2();

          this._downed = false;

          pointers.set(this.domElement, this);

          this.onDown = new Signal();
          this.onMove = new Signal();
          this.onUp = new Signal();
          this.onClick = new Signal();
          this.onTypeChange = new Signal();

          this._preventMouseTypeChange = false;

          this._onPointerMoveBinded = this._onPointerMove.bind(this);
          this._onPointerDownBinded = this._onPointerDown.bind(this);
          this._onPointerUpBinded = this._onPointerUp.bind(this);

          this._updateBinded = this._update.bind(this);
          this._resizeBinded = this.resize.bind(this);

          this.resize();
          this.enable();
        }

        resize() {
          this._domElementBoundingRect = this.domElement !== window ? this.domElement.getBoundingClientRect() : {
            top: 0,
            left: 0,
            width: window.innerWidth,
            height: window.innerHeight
          };
        }

        _onPointerDown(e) {
          if (e.type === "touchstart") {
            this._preventMouseTypeChange = true;
            this._changeType(Pointer.TOUCH_TYPE);
          }
          this._downed = true;
          this.dragOffset.set(0, 0);
          this.copy(this._position);
          this._onPointerEvent(e);
          this._updatePositions();
          this.onDown.dispatch(e);
        }

        _onPointerMove(e) {
          if (e.type === "mousemove") {
            if (this._preventMouseTypeChange) {
              return;
            } else {
              this._changeType(Pointer.MOUSE_TYPE);
            }
          }
          this._onPointerEvent(e);
          this.onMove.dispatch(e);
        }

        _onPointerUp(e) {
          this._downed = false;
          this._onPointerEvent(e);
          this._updatePositions();
          this.onUp.dispatch(e);
          if (this.dragOffset.length < 4) {
            this.onClick.dispatch(e);
          }
          clearTimeout(this._timeout);
          this._timeout = setTimeout(() => {
            this._preventMouseTypeChange = false;
          }, 2000);
        }

        _onPointerEvent(e) {
          if (!!window.TouchEvent && e instanceof window.TouchEvent) {
            if (e.type === "touchend") {
              e = e.changedTouches[0];
            } else {
              e = e.touches[0];
            }
          }
          this._position.x = e.clientX - this._domElementBoundingRect.left;
          this._position.y = e.clientY - this._domElementBoundingRect.top;
        }

        _changeType(type) {
          if (this.type === type) {
            return;
          }
          this.type = type;
          this.disable();
          this.enable();
          this.onTypeChange.dispatch(this.type);
        }

        _update() {
          if (this.x || this.y) {
            this.velocity.x = this._position.x - this.x;
            this.velocity.y = this._position.y - this.y;
            if (this.downed) {
              this.dragOffset.add(this.velocity);
            }
          }

          this._updatePositions();
        }

        _updatePositions() {
          this.x = this._position.x;
          this.y = this._position.y;

          this.centered.x = this.centeredFlippedY.x = this.x - this._domElementBoundingRect.width * .5;
          this.centered.y = this.centeredFlippedY.y = this.y - this._domElementBoundingRect.height * .5;
          this.centeredFlippedY.y *= -1;

          this.normalized.x = this.normalizedFlippedY.x = this.x / this._domElementBoundingRect.width;
          this.normalized.y = this.normalizedFlippedY.y = this.y / this._domElementBoundingRect.height;
          this.normalizedFlippedY.y = 1 - this.normalizedFlippedY.y;

          this.normalizedCentered.x = this.normalizedCenteredFlippedY.x = this.normalized.x * 2 - 1;
          this.normalizedCentered.y = this.normalizedCenteredFlippedY.y = this.normalized.y * 2 - 1;
          this.normalizedCenteredFlippedY.y *= -1;
        }

        enable() {
          this.disable();
          this.resize();
          if (this.type === Pointer.TOUCH_TYPE) {
            this.domElement.addEventListener("touchmove", this._onPointerMoveBinded);
            window.addEventListener("touchend", this._onPointerUpBinded);
          } else {
            this.domElement.addEventListener("mousedown", this._onPointerDownBinded);
            window.addEventListener("mouseup", this._onPointerUpBinded);
          }
          this.domElement.addEventListener("touchstart", this._onPointerDownBinded);
          this.domElement.addEventListener("mousemove", this._onPointerMoveBinded);
          window.addEventListener("resize", this._resizeBinded);
          Ticker$1.add(this._updateBinded = this._updateBinded || this._update.bind(this));
        }

        disable() {
          Ticker$1.delete(this._updateBinded);
          this.domElement.removeEventListener("touchstart", this._onPointerDownBinded);
          this.domElement.removeEventListener("mousedown", this._onPointerDownBinded);
          this.domElement.removeEventListener("touchmove", this._onPointerMoveBinded);
          this.domElement.removeEventListener("mousemove", this._onPointerMoveBinded);
          window.removeEventListener("touchend", this._onPointerUpBinded);
          window.removeEventListener("mouseup", this._onPointerUpBinded);
          window.removeEventListener("resize", this._resizeBinded);
        }
      }

      /* Copyright (c) 2015, Brandon Jones, Colin MacKenzie IV.
      
      Permission is hereby granted, free of charge, to any person obtaining a copy
      of this software and associated documentation files (the "Software"), to deal
      in the Software without restriction, including without limitation the rights
      to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
      copies of the Software, and to permit persons to whom the Software is
      furnished to do so, subject to the following conditions:
      
      The above copyright notice and this permission notice shall be included in
      all copies or substantial portions of the Software.
      
      THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
      IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
      FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
      AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
      LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
      OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
      THE SOFTWARE. */

      /**
       * Quaternion
       * @module quat
       */

      /**
       * Creates a new identity quat
       *
       * @returns {quat} a new quaternion
       */
      function create$5() {
        let out = new ARRAY_TYPE(4);
        out[0] = 0;
        out[1] = 0;
        out[2] = 0;
        out[3] = 1;
        return out;
      }

      /**
       * Set a quat to the identity quaternion
       *
       * @param {quat} out the receiving quaternion
       * @returns {quat} out
       */
      function identity$2(out) {
        out[0] = 0;
        out[1] = 0;
        out[2] = 0;
        out[3] = 1;
        return out;
      }

      /**
       * Sets a quat from the given angle and rotation axis,
       * then returns it.
       *
       * @param {quat} out the receiving quaternion
       * @param {vec3} axis the axis around which to rotate
       * @param {Number} rad the angle in radians
       * @returns {quat} out
       **/
      function setAxisAngle(out, axis, rad) {
        rad = rad * 0.5;
        let s = Math.sin(rad);
        out[0] = s * axis[0];
        out[1] = s * axis[1];
        out[2] = s * axis[2];
        out[3] = Math.cos(rad);
        return out;
      }

      /**
       * Gets the rotation axis and angle for a given
       *  quaternion. If a quaternion is created with
       *  setAxisAngle, this method will return the same
       *  values as providied in the original parameter list
       *  OR functionally equivalent values.
       * Example: The quaternion formed by axis [0, 0, 1] and
       *  angle -90 is the same as the quaternion formed by
       *  [0, 0, 1] and 270. This method favors the latter.
       * @param  {vec3} out_axis  Vector receiving the axis of rotation
       * @param  {quat} q     Quaternion to be decomposed
       * @return {Number}     Angle, in radians, of the rotation
       */

      /**
       * Multiplies two quat's
       *
       * @param {quat} out the receiving quaternion
       * @param {quat} a the first operand
       * @param {quat} b the second operand
       * @returns {quat} out
       */
      function multiply$5(out, a, b) {
        let ax = a[0],
            ay = a[1],
            az = a[2],
            aw = a[3];
        let bx = b[0],
            by = b[1],
            bz = b[2],
            bw = b[3];

        out[0] = ax * bw + aw * bx + ay * bz - az * by;
        out[1] = ay * bw + aw * by + az * bx - ax * bz;
        out[2] = az * bw + aw * bz + ax * by - ay * bx;
        out[3] = aw * bw - ax * bx - ay * by - az * bz;
        return out;
      }

      /**
       * Rotates a quaternion by the given angle about the X axis
       *
       * @param {quat} out quat receiving operation result
       * @param {quat} a quat to rotate
       * @param {number} rad angle (in radians) to rotate
       * @returns {quat} out
       */
      function rotateX$2(out, a, rad) {
        rad *= 0.5;

        let ax = a[0],
            ay = a[1],
            az = a[2],
            aw = a[3];
        let bx = Math.sin(rad),
            bw = Math.cos(rad);

        out[0] = ax * bw + aw * bx;
        out[1] = ay * bw + az * bx;
        out[2] = az * bw - ay * bx;
        out[3] = aw * bw - ax * bx;
        return out;
      }

      /**
       * Rotates a quaternion by the given angle about the Y axis
       *
       * @param {quat} out quat receiving operation result
       * @param {quat} a quat to rotate
       * @param {number} rad angle (in radians) to rotate
       * @returns {quat} out
       */
      function rotateY$2(out, a, rad) {
        rad *= 0.5;

        let ax = a[0],
            ay = a[1],
            az = a[2],
            aw = a[3];
        let by = Math.sin(rad),
            bw = Math.cos(rad);

        out[0] = ax * bw - az * by;
        out[1] = ay * bw + aw * by;
        out[2] = az * bw + ax * by;
        out[3] = aw * bw - ay * by;
        return out;
      }

      /**
       * Rotates a quaternion by the given angle about the Z axis
       *
       * @param {quat} out quat receiving operation result
       * @param {quat} a quat to rotate
       * @param {number} rad angle (in radians) to rotate
       * @returns {quat} out
       */
      function rotateZ$2(out, a, rad) {
        rad *= 0.5;

        let ax = a[0],
            ay = a[1],
            az = a[2],
            aw = a[3];
        let bz = Math.sin(rad),
            bw = Math.cos(rad);

        out[0] = ax * bw + ay * bz;
        out[1] = ay * bw - ax * bz;
        out[2] = az * bw + aw * bz;
        out[3] = aw * bw - az * bz;
        return out;
      }

      /**
       * Calculates the W component of a quat from the X, Y, and Z components.
       * Assumes that quaternion is 1 unit in length.
       * Any existing W component will be ignored.
       *
       * @param {quat} out the receiving quaternion
       * @param {quat} a quat to calculate W component of
       * @returns {quat} out
       */

      /**
       * Performs a spherical linear interpolation between two quat
       *
       * @param {quat} out the receiving quaternion
       * @param {quat} a the first operand
       * @param {quat} b the second operand
       * @param {Number} t interpolation amount between the two inputs
       * @returns {quat} out
       */
      function slerp(out, a, b, t) {
        // benchmarks:
        //    http://jsperf.com/quaternion-slerp-implementations
        let ax = a[0],
            ay = a[1],
            az = a[2],
            aw = a[3];
        let bx = b[0],
            by = b[1],
            bz = b[2],
            bw = b[3];

        let omega, cosom, sinom, scale0, scale1;

        // calc cosine
        cosom = ax * bx + ay * by + az * bz + aw * bw;
        // adjust signs (if necessary)
        if (cosom < 0.0) {
          cosom = -cosom;
          bx = -bx;
          by = -by;
          bz = -bz;
          bw = -bw;
        }
        // calculate coefficients
        if (1.0 - cosom > 0.000001) {
          // standard case (slerp)
          omega = Math.acos(cosom);
          sinom = Math.sin(omega);
          scale0 = Math.sin((1.0 - t) * omega) / sinom;
          scale1 = Math.sin(t * omega) / sinom;
        } else {
          // "from" and "to" quaternions are very close
          //  ... so we can do a linear interpolation
          scale0 = 1.0 - t;
          scale1 = t;
        }
        // calculate final values
        out[0] = scale0 * ax + scale1 * bx;
        out[1] = scale0 * ay + scale1 * by;
        out[2] = scale0 * az + scale1 * bz;
        out[3] = scale0 * aw + scale1 * bw;

        return out;
      }

      /**
       * Calculates the inverse of a quat
       *
       * @param {quat} out the receiving quaternion
       * @param {quat} a quat to calculate inverse of
       * @returns {quat} out
       */
      function invert$2(out, a) {
        let a0 = a[0],
            a1 = a[1],
            a2 = a[2],
            a3 = a[3];
        let dot$$1 = a0 * a0 + a1 * a1 + a2 * a2 + a3 * a3;
        let invDot = dot$$1 ? 1.0 / dot$$1 : 0;

        // TODO: Would be faster to return [0,0,0,0] immediately if dot == 0

        out[0] = -a0 * invDot;
        out[1] = -a1 * invDot;
        out[2] = -a2 * invDot;
        out[3] = a3 * invDot;
        return out;
      }

      /**
       * Calculates the conjugate of a quat
       * If the quaternion is normalized, this function is faster than quat.inverse and produces the same result.
       *
       * @param {quat} out the receiving quaternion
       * @param {quat} a quat to calculate conjugate of
       * @returns {quat} out
       */

      /**
       * Creates a quaternion from the given 3x3 rotation matrix.
       *
       * NOTE: The resultant quaternion is not normalized, so you should be sure
       * to renormalize the quaternion yourself where necessary.
       *
       * @param {quat} out the receiving quaternion
       * @param {mat3} m rotation matrix
       * @returns {quat} out
       * @function
       */
      function fromMat3(out, m) {
        // Algorithm in Ken Shoemake's article in 1987 SIGGRAPH course notes
        // article "Quaternion Calculus and Fast Animation".
        let fTrace = m[0] + m[4] + m[8];
        let fRoot;

        if (fTrace > 0.0) {
          // |w| > 1/2, may as well choose w > 1/2
          fRoot = Math.sqrt(fTrace + 1.0); // 2w
          out[3] = 0.5 * fRoot;
          fRoot = 0.5 / fRoot; // 1/(4w)
          out[0] = (m[5] - m[7]) * fRoot;
          out[1] = (m[6] - m[2]) * fRoot;
          out[2] = (m[1] - m[3]) * fRoot;
        } else {
          // |w| <= 1/2
          let i = 0;
          if (m[4] > m[0]) i = 1;
          if (m[8] > m[i * 3 + i]) i = 2;
          let j = (i + 1) % 3;
          let k = (i + 2) % 3;

          fRoot = Math.sqrt(m[i * 3 + i] - m[j * 3 + j] - m[k * 3 + k] + 1.0);
          out[i] = 0.5 * fRoot;
          fRoot = 0.5 / fRoot;
          out[3] = (m[j * 3 + k] - m[k * 3 + j]) * fRoot;
          out[j] = (m[j * 3 + i] + m[i * 3 + j]) * fRoot;
          out[k] = (m[k * 3 + i] + m[i * 3 + k]) * fRoot;
        }

        return out;
      }

      /**
       * Creates a quaternion from the given euler angle x, y, z.
       *
       * @param {quat} out the receiving quaternion
       * @param {x} Angle to rotate around X axis in degrees.
       * @param {y} Angle to rotate around Y axis in degrees.
       * @param {z} Angle to rotate around Z axis in degrees.
       * @returns {quat} out
       * @function
       */

      /**
       * Returns a string representation of a quatenion
       *
       * @param {quat} a vector to represent as a string
       * @returns {String} string representation of the vector
       */

      /**
       * Creates a new quat initialized with values from an existing quaternion
       *
       * @param {quat} a quaternion to clone
       * @returns {quat} a new quaternion
       * @function
       */

      /**
       * Creates a new quat initialized with the given values
       *
       * @param {Number} x X component
       * @param {Number} y Y component
       * @param {Number} z Z component
       * @param {Number} w W component
       * @returns {quat} a new quaternion
       * @function
       */

      /**
       * Copy the values from one quat to another
       *
       * @param {quat} out the receiving quaternion
       * @param {quat} a the source quaternion
       * @returns {quat} out
       * @function
       */
      const copy$5 = copy$3;

      /**
       * Set the components of a quat to the given values
       *
       * @param {quat} out the receiving quaternion
       * @param {Number} x X component
       * @param {Number} y Y component
       * @param {Number} z Z component
       * @param {Number} w W component
       * @returns {quat} out
       * @function
       */
      const set$5 = set$3;

      /**
       * Adds two quat's
       *
       * @param {quat} out the receiving quaternion
       * @param {quat} a the first operand
       * @param {quat} b the second operand
       * @returns {quat} out
       * @function
       */

      /**
       * Alias for {@link quat.multiply}
       * @function
       */

      /**
       * Scales a quat by a scalar number
       *
       * @param {quat} out the receiving vector
       * @param {quat} a the vector to scale
       * @param {Number} b amount to scale the vector by
       * @returns {quat} out
       * @function
       */

      /**
       * Calculates the dot product of two quat's
       *
       * @param {quat} a the first operand
       * @param {quat} b the second operand
       * @returns {Number} dot product of a and b
       * @function
       */

      /**
       * Performs a linear interpolation between two quat's
       *
       * @param {quat} out the receiving quaternion
       * @param {quat} a the first operand
       * @param {quat} b the second operand
       * @param {Number} t interpolation amount between the two inputs
       * @returns {quat} out
       * @function
       */

      /**
       * Calculates the length of a quat
       *
       * @param {quat} a vector to calculate length of
       * @returns {Number} length of a
       */

      /**
       * Alias for {@link quat.length}
       * @function
       */

      /**
       * Calculates the squared length of a quat
       *
       * @param {quat} a vector to calculate squared length of
       * @returns {Number} squared length of a
       * @function
       */

      /**
       * Alias for {@link quat.squaredLength}
       * @function
       */

      /**
       * Normalize a quat
       *
       * @param {quat} out the receiving quaternion
       * @param {quat} a quaternion to normalize
       * @returns {quat} out
       * @function
       */
      const normalize$3 = normalize$2;

      /**
       * Returns whether or not the quaternions have exactly the same elements in the same position (when compared with ===)
       *
       * @param {quat} a The first quaternion.
       * @param {quat} b The second quaternion.
       * @returns {Boolean} True if the vectors are equal, false otherwise.
       */

      /**
       * Returns whether or not the quaternions have approximately the same elements in the same position.
       *
       * @param {quat} a The first vector.
       * @param {quat} b The second vector.
       * @returns {Boolean} True if the vectors are equal, false otherwise.
       */

      /**
       * Sets a quaternion to represent the shortest rotation from one
       * vector to another.
       *
       * Both vectors are assumed to be unit length.
       *
       * @param {quat} out the receiving quaternion.
       * @param {vec3} a the initial vector
       * @param {vec3} b the destination vector
       * @returns {quat} out
       */
      const rotationTo = function () {
        let tmpvec3 = create$2();
        let xUnitVec3 = fromValues$2(1, 0, 0);
        let yUnitVec3 = fromValues$2(0, 1, 0);

        return function (out, a, b) {
          let dot$$1 = dot$1(a, b);
          if (dot$$1 < -0.999999) {
            cross$1(tmpvec3, xUnitVec3, a);
            if (len$1(tmpvec3) < 0.000001) cross$1(tmpvec3, yUnitVec3, a);
            normalize$1(tmpvec3, tmpvec3);
            setAxisAngle(out, tmpvec3, Math.PI);
            return out;
          } else if (dot$$1 > 0.999999) {
            out[0] = 0;
            out[1] = 0;
            out[2] = 0;
            out[3] = 1;
            return out;
          } else {
            cross$1(tmpvec3, a, b);
            out[0] = tmpvec3[0];
            out[1] = tmpvec3[1];
            out[2] = tmpvec3[2];
            out[3] = 1 + dot$$1;
            return normalize$3(out, out);
          }
        };
      }();

      /**
       * Performs a spherical linear interpolation with two control points
       *
       * @param {quat} out the receiving quaternion
       * @param {quat} a the first operand
       * @param {quat} b the second operand
       * @param {quat} c the third operand
       * @param {quat} d the fourth operand
       * @param {Number} t interpolation amount
       * @returns {quat} out
       */
      const sqlerp = function () {
        let temp1 = create$5();
        let temp2 = create$5();

        return function (out, a, b, c, d, t) {
          slerp(temp1, a, d, t);
          slerp(temp2, b, c, t);
          slerp(out, temp1, temp2, 2 * t * (1 - t));

          return out;
        };
      }();

      /**
       * Sets the specified quaternion with values corresponding to the given
       * axes. Each axis is a vec3 and is expected to be unit length and
       * perpendicular to all other specified axes.
       *
       * @param {vec3} view  the vector representing the viewing direction
       * @param {vec3} right the vector representing the local "right" direction
       * @param {vec3} up    the vector representing the local "up" direction
       * @returns {quat} out
       */
      const setAxes = function () {
        let matr = create$4();

        return function (out, view, right, up) {
          matr[0] = right[0];
          matr[3] = right[1];
          matr[6] = right[2];

          matr[1] = up[0];
          matr[4] = up[1];
          matr[7] = up[2];

          matr[2] = -view[0];
          matr[5] = -view[1];
          matr[8] = -view[2];

          return normalize$3(out, fromMat3(out, matr));
        };
      }();

      class Quaternion extends Float32Array {
        constructor(x = 0, y = 0, z = 0, w = 1) {
          super(4);
          this.set(x, y, z, w);
          return this;
        }

        get x() {
          return this[0];
        }

        set x(value) {
          this[0] = value;
        }

        get y() {
          return this[1];
        }

        set y(value) {
          this[1] = value;
        }

        get z() {
          return this[2];
        }

        set z(value) {
          this[2] = value;
        }

        get w() {
          return this[3];
        }

        set w(value) {
          this[3] = value;
        }

        identity() {
          identity$2(this);
          return this;
        }

        set(x, y, z, w) {
          set$5(this, x, y, z, w);
          return this;
        }

        rotateX(angle) {
          rotateX$2(this, this, angle);
          return this;
        }

        rotateY(angle) {
          rotateY$2(this, this, angle);
          return this;
        }

        rotateZ(angle) {
          rotateZ$2(this, this, angle);
          return this;
        }

        invert(quaternion = this) {
          invert$2(this, quaternion);
          return this;
        }

        copy(quaternion) {
          copy$5(this, quaternion);
          return this;
        }

        normalize(quaternion = this) {
          normalize$3(this, this);
          return this;
        }

        multiply(quaternionA, quaternionB) {
          if (quaternionB) {
            multiply$5(this, quaternionA, quaternionB);
          } else {
            multiply$5(this, this, quaternionA);
          }
          return this;
        }

        fromMatrix3(matrix3) {
          fromMat3(this, matrix3);
          return this;
        }
      }

      class TrackballController {
        constructor({
          matrix = new Matrix4(),
          domElement = document.body,
          distance = 0,
          invertRotation = true,
          rotationEaseRatio = .04,
          zoomSpeed = .1,
          zoomEaseRatio = .1,
          minDistance = 0,
          maxDistance = Infinity,
          enabled = true
        } = {}) {
          this.matrix = matrix;

          this._distance = distance;
          this.invertRotation = invertRotation;
          this.rotationEaseRatio = rotationEaseRatio;
          this.maxDistance = maxDistance;
          this.minDistance = minDistance;
          this.zoomSpeed = zoomSpeed;
          this.zoomEaseRatio = zoomEaseRatio;

          this._pointer = Pointer.get(domElement);
          this._nextDistance = this._distance;

          this._cachedQuaternion = new Quaternion();
          this._cachedMatrix = new Matrix4();
          this._cachedVector3 = new Vector3();

          this._velocity = new Vector2();
          this._velocityOrigin = new Vector2();

          this._position = new Vector3([this.matrix.x, this.matrix.y, this.matrix.z]);
          this._positionPrevious = this._position.clone();
          this._positionOffset = new Vector3();

          domElement.addEventListener("wheel", this.onWheel.bind(this));

          this.enabled = true;
          this.update();
          this.enabled = enabled;
        }

        set distance(value) {
          this._distance = this._nextDistance = value;
        }

        get distance() {
          return this._distance;
        }

        onWheel(e) {
          if (!this.enabled) {
            return;
          }
          this._nextDistance += e.deltaY * this.zoomSpeed;
          this._nextDistance = Math.max(Math.min(this._nextDistance, this.maxDistance), this.minDistance);
        }

        update() {
          if (!this.enabled) {
            return;
          }

          this._cachedMatrix.identity();
          this._cachedQuaternion.identity();

          this._distance += (this._nextDistance - this._distance) * this.zoomEaseRatio;

          this._position.set(this.matrix.x, this.matrix.y, this.matrix.z).subtract(this._positionOffset);

          this.matrix.x = 0;
          this.matrix.y = 0;
          this.matrix.z = 0;

          if (this._pointer.downed) {
            this._velocity.copy(this._pointer.velocity).scale(.003);
          }

          this._velocity.lerp(this._velocityOrigin, this.rotationEaseRatio);

          this._cachedQuaternion.rotateY(this.invertRotation ? -this._velocity.x : this._velocity.x);
          this._cachedQuaternion.rotateX(this.invertRotation ? -this._velocity.y : this._velocity.y);

          this._cachedMatrix.fromQuaternion(this._cachedQuaternion);

          this.matrix.multiply(this._cachedMatrix);

          this._positionOffset.set(0, 0, 1);
          this._positionOffset.applyMatrix4(this.matrix);
          this._positionOffset.scale(this._distance);

          this._cachedVector3.copy(this._position).add(this._positionOffset);

          this.matrix.x = this._cachedVector3.x;
          this.matrix.y = this._cachedVector3.y;
          this.matrix.z = this._cachedVector3.z;
        }
      }

      class View {
        constructor({ canvas } = {}) {
          this.canvas = canvas;
          this.gl = this.canvas.getContext(window.WebGL2RenderingContext ? "webgl2" : "webgl", {
            depth: true,
            alpha: false,
            antialias: true
          });

          this.camera = new Camera();

          this.cameraController = new TrackballController({
            matrix: this.camera.transform,
            distance: 5
          });

          this.gl.clearColor(0, 0, 0, 1);
          this.gl.enable(this.gl.CULL_FACE);
          this.gl.enable(this.gl.DEPTH_TEST);

          this.program = new GLProgram({
            gl: this.gl,
            uniforms: [["transform", new Matrix4()]],
            vertexShaderChunks: [["start", `
          uniform mat4 projectionView;
          uniform mat4 transform;

          in vec3 normal;
          in vec3 position;

          out vec3 vNormal;
        `], ["end", `
          gl_Position = projectionView * transform * vec4(position, 1.);
          vNormal = normal;
        `]],
            fragmentShaderChunks: [["start", `
          precision highp float;

          in vec3 vNormal;
        `], ["end", `
          fragColor = vec4(vNormal * .5 + .5, 1.);
        `]]
          });

          this.mesh = new GLMesh({
            gl: this.gl,
            attributes: [["position", {
              data: new Float32Array([-0.5, 0.5, 0.5, 0.5, 0.5, 0.5, -0.5, -0.5, 0.5, 0.5, -0.5, 0.5, 0.5, 0.5, -0.5, -0.5, 0.5, -0.5, 0.5, -0.5, -0.5, -0.5, -0.5, -0.5, -0.5, 0.5, -0.5, -0.5, 0.5, 0.5, -0.5, -0.5, -0.5, -0.5, -0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, -0.5, 0.5, -0.5, 0.5, 0.5, -0.5, -0.5, -0.5, 0.5, -0.5, 0.5, 0.5, -0.5, -0.5, 0.5, 0.5, 0.5, 0.5, 0.5, -0.5, -0.5, 0.5, 0.5, -0.5, 0.5, -0.5, -0.5, -0.5, 0.5, -0.5, -0.5]),
              size: 3
            }], ["normal", {
              data: new Float32Array([0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0]),
              size: 3
            }]],
            indiceData: new Uint8Array([0, 2, 3, 0, 3, 1, 4, 6, 7, 4, 7, 5, 8, 10, 11, 8, 11, 9, 12, 14, 15, 12, 15, 13, 16, 18, 19, 16, 19, 17, 20, 22, 23, 20, 23, 21])
          });
        }

        resize(width, height) {
          this.camera.aspectRatio = width / height;
          this.update();
        }

        update() {
          this.gl.viewport(0, 0, this.gl.drawingBufferWidth, this.gl.drawingBufferHeight);
          this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

          this.cameraController.update();

          this.program.use();
          this.program.uniforms.set("projectionView", this.camera.projectionView);
          this.program.attributes.set(this.mesh.attributes);

          this.mesh.bind();
          this.mesh.draw();
        }
      }

      let template = document.createElement("template");
      Loader.load("src/main/template.html").then(value => {
        template.innerHTML = value;
      });

      Loader.onLoad.then(() => {
        window.customElements.define("dnit-main", class extends LoopElement {
          connectedCallback() {
            super.connectedCallback();

            let templateClone = document.importNode(template.content, true);
            this.appendChild(templateClone);

            this.canvas = this.querySelector("canvas");

            this.view = new View({ canvas: this.canvas });

            window.addEventListener("resize", this._resizeBinded = this.resize.bind(this));

            this.resize();
          }

          disconnectedCallback() {
            window.removeEventListener("resize", this._resizeBinded);
          }

          resize() {
            let width = this.canvas.offsetWidth;
            let height = this.canvas.offsetHeight;

            this.canvas.width = width * window.devicePixelRatio;
            this.canvas.height = height * window.devicePixelRatio;

            this.view.resize(width, height);
          }

          update() {
            this.view.update();
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