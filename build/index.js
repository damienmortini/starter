System.registerDynamic("npm:@webcomponents/custom-elements@1.0.0-alpha.3.json", [], false, function() {
  return {
    "main": "custom-elements.min.js",
    "format": "cjs",
    "meta": {
      "*.json": {
        "format": "json"
      },
      "tests/chromium/custom-elements/spec/create-element-defined-asynchronous.html": {
        "format": "amd"
      },
      "tests/chromium/resources/mojo-helpers.js": {
        "format": "amd"
      }
    }
  };
});

System.registerDynamic("npm:@webcomponents/custom-elements@1.0.0-alpha.3/custom-elements.min.js", [], true, function ($__require, exports, module) {
  /*
  
   Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
   This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
   The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
   The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
   Code distributed by Google as part of the polymer project is also
   subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
  */
  'use strict';
  var define,
      global = this || self,
      GLOBAL = global;
  (function () {
    function c() {
      function a() {
        b.C = !0;b.b(f.childNodes);
      }var b = this;this.a = new Map();this.j = new Map();this.h = new Map();this.m = new Set();this.v = new MutationObserver(this.A.bind(this));this.f = null;this.B = new Set();this.enableFlush = !0;this.C = !1;this.G = this.c(f);window.HTMLImports ? window.HTMLImports.whenReady(a) : a();
    }function g() {
      return h.customElements;
    }function k(a) {
      if (!/^[a-z][.0-9_a-z]*-[\-.0-9_a-z]*$/.test(a) || -1 !== q.indexOf(a)) return Error("The element name '" + a + "' is not valid.");
    }function l(a, b, d, e) {
      var c = g();a = r.call(a, b, d);(b = c.a.get(b.toLowerCase())) && c.D(a, b, e);c.c(a);return a;
    }function m(a, b, d, e) {
      b = b.toLowerCase();var c = a.getAttribute(b);e.call(a, b, d);1 == a.__$CE_upgraded && (e = g().a.get(a.localName), d = e.w, (e = e.i) && 0 <= d.indexOf(b) && (d = a.getAttribute(b), d !== c && e.call(a, b, c, d, null)));
    }var f = document,
        h = window;if (g() && (g().g = function () {}, !g().forcePolyfill)) return;var q = "annotation-xml color-profile font-face font-face-src font-face-uri font-face-format font-face-name missing-glyph".split(" ");
    c.prototype.K = function (a, b) {
      function d(a) {
        var b = g[a];if (void 0 !== b && "function" !== typeof b) throw Error(c + " '" + a + "' is not a Function");return b;
      }if ("function" !== typeof b) throw new TypeError("constructor must be a Constructor");var e = k(a);if (e) throw e;if (this.a.has(a)) throw Error("An element with name '" + a + "' is already defined");if (this.j.has(b)) throw Error("Definition failed for '" + a + "': The constructor is already used.");var c = a,
          g = b.prototype;if ("object" !== typeof g) throw new TypeError("Definition failed for '" + a + "': constructor.prototype must be an object");var e = d("connectedCallback"),
          h = d("disconnectedCallback"),
          n = d("attributeChangedCallback");this.a.set(c, { name: a, localName: c, constructor: b, o: e, s: h, i: n, w: n && b.observedAttributes || [] });this.j.set(b, c);this.C && this.b(f.childNodes);if (a = this.h.get(c)) a.resolve(void 0), this.h.delete(c);
    };c.prototype.get = function (a) {
      return (a = this.a.get(a)) ? a.constructor : void 0;
    };c.prototype.L = function (a) {
      var b = k(a);if (b) return Promise.reject(b);if (this.a.has(a)) return Promise.resolve();
      if (b = this.h.get(a)) return b.M;var d,
          e = new Promise(function (a) {
        d = a;
      }),
          b = { M: e, resolve: d };this.h.set(a, b);return e;
    };c.prototype.g = function () {
      this.enableFlush && (this.l(this.G.takeRecords()), this.A(this.v.takeRecords()), this.m.forEach(function (a) {
        this.l(a.takeRecords());
      }, this));
    };c.prototype.I = function (a) {
      this.f = a;
    };c.prototype.c = function (a) {
      if (null != a.__$CE_observer) return a.__$CE_observer;a.__$CE_observer = new MutationObserver(this.l.bind(this));a.__$CE_observer.observe(a, { childList: !0, subtree: !0 });this.enableFlush && this.m.add(a.__$CE_observer);return a.__$CE_observer;
    };c.prototype.J = function (a) {
      null != a.__$CE_observer && (a.__$CE_observer.disconnect(), this.enableFlush && this.m.delete(a.__$CE_observer), a.__$CE_observer = null);
    };c.prototype.l = function (a) {
      for (var b = 0; b < a.length; b++) {
        var d = a[b];if ("childList" === d.type) {
          var e = d.removedNodes;this.b(d.addedNodes);this.H(e);
        }
      }
    };c.prototype.b = function (a, b) {
      b = b || new Set();for (var d = 0; d < a.length; d++) {
        var e = a[d];if (e.nodeType === Node.ELEMENT_NODE) {
          this.J(e);e = f.createTreeWalker(e, NodeFilter.SHOW_ELEMENT, null, !1);do this.F(e.currentNode, b); while (e.nextNode());
        }
      }
    };c.prototype.F = function (a, b) {
      if (!b.has(a)) {
        b.add(a);var d = this.a.get(a.localName);if (d) {
          a.__$CE_upgraded || this.D(a, d, !0);var e;if (e = a.__$CE_upgraded && !a.__$CE_attached) a: {
            e = a;do {
              if (e.__$CE_attached || e.nodeType === Node.DOCUMENT_NODE) {
                e = !0;break a;
              }e = e.parentNode || e.nodeType === Node.DOCUMENT_FRAGMENT_NODE && e.host;
            } while (e);e = !1;
          }e && (a.__$CE_attached = !0, d.o && d.o.call(a));
        }a.shadowRoot && this.b(a.shadowRoot.childNodes, b);"LINK" === a.tagName && a.rel && -1 !== a.rel.toLowerCase().split(" ").indexOf("import") && this.u(a, b);
      }
    };c.prototype.u = function (a, b) {
      var d = a.import;if (d) b.has(d) || (b.add(d), d.__$CE_observer || this.c(d), this.b(d.childNodes, b));else if (b = a.href, !this.B.has(b)) {
        this.B.add(b);var e = this,
            c = function () {
          a.removeEventListener("load", c);a.import.__$CE_observer || e.c(a.import);e.b(a.import.childNodes);
        };a.addEventListener("load", c);
      }
    };c.prototype.H = function (a) {
      for (var b = 0; b < a.length; b++) {
        var d = a[b];if (d.nodeType === Node.ELEMENT_NODE) {
          this.c(d);
          d = f.createTreeWalker(d, NodeFilter.SHOW_ELEMENT, null, !1);do {
            var e = d.currentNode;if (e.__$CE_upgraded && e.__$CE_attached) {
              e.__$CE_attached = !1;var c = this.a.get(e.localName);c && c.s && c.s.call(e);
            }
          } while (d.nextNode());
        }
      }
    };c.prototype.D = function (a, b, d) {
      a.__proto__ = b.constructor.prototype;d && (this.I(a), new b.constructor(), a.__$CE_upgraded = !0, console.assert(!this.f));d = b.w;if ((b = b.i) && 0 < d.length) {
        this.v.observe(a, { attributes: !0, attributeOldValue: !0, attributeFilter: d });for (var e = 0; e < d.length; e++) {
          var c = d[e];if (a.hasAttribute(c)) {
            var f = a.getAttribute(c);b.call(a, c, null, f, null);
          }
        }
      }
    };c.prototype.A = function (a) {
      for (var b = 0; b < a.length; b++) {
        var d = a[b];if ("attributes" === d.type) {
          var e = d.target,
              c = this.a.get(e.localName),
              f = d.attributeName,
              g = d.oldValue,
              h = e.getAttribute(f);h !== g && c.i.call(e, f, g, h, d.attributeNamespace);
        }
      }
    };window.CustomElementRegistry = c;c.prototype.define = c.prototype.K;c.prototype.get = c.prototype.get;c.prototype.whenDefined = c.prototype.L;c.prototype.flush = c.prototype.g;c.prototype.polyfilled = !0;c.prototype._observeRoot = c.prototype.c;
    c.prototype._addImport = c.prototype.u;var t = h.HTMLElement;h.HTMLElement = function () {
      var a = g();if (a.f) {
        var b = a.f;a.f = null;return b;
      }if (this.constructor) return a = a.j.get(this.constructor), l(f, a, void 0, !1);throw Error("Unknown constructor. Did you call customElements.define()?");
    };h.HTMLElement.prototype = Object.create(t.prototype, { constructor: { value: h.HTMLElement, configurable: !0, writable: !0 } });var r = f.createElement;f.createElement = function (a, b) {
      return l(f, a, b, !0);
    };var u = f.createElementNS;f.createElementNS = function (a, b) {
      return "http://www.w3.org/1999/xhtml" === a ? f.createElement(b) : u.call(f, a, b);
    };var p = Element.prototype.attachShadow;p && Object.defineProperty(Element.prototype, "attachShadow", { value: function (a) {
        a = p.call(this, a);g().c(a);return a;
      } });var v = f.importNode;f.importNode = function (a, b) {
      a = v.call(f, a, b);g().b(a.nodeType === Node.ELEMENT_NODE ? [a] : a.childNodes);return a;
    };var w = Element.prototype.setAttribute;Element.prototype.setAttribute = function (a, b) {
      m(this, a, b, w);
    };var x = Element.prototype.removeAttribute;
    Element.prototype.removeAttribute = function (a) {
      m(this, a, null, x);
    };Object.defineProperty(window, "customElements", { value: new c(), configurable: !0, enumerable: !0 });window.CustomElements = { takeRecords: function () {
        g().g && g().g();
      } };
  })();

  

  return module.exports;
});
System.registerDynamic("npm:whatwg-fetch@1.0.0.json", [], false, function() {
  return {
    "main": "fetch.js",
    "format": "cjs",
    "meta": {
      "*.json": {
        "format": "json"
      }
    }
  };
});

System.registerDynamic('npm:whatwg-fetch@1.0.0/fetch.js', [], true, function ($__require, exports, module) {
  var define,
      global = this || self,
      GLOBAL = global;
  (function (self) {
    'use strict';

    if (self.fetch) {
      return;
    }

    var support = {
      searchParams: 'URLSearchParams' in self,
      iterable: 'Symbol' in self && 'iterator' in Symbol,
      blob: 'FileReader' in self && 'Blob' in self && function () {
        try {
          new Blob();
          return true;
        } catch (e) {
          return false;
        }
      }(),
      formData: 'FormData' in self,
      arrayBuffer: 'ArrayBuffer' in self
    };

    function normalizeName(name) {
      if (typeof name !== 'string') {
        name = String(name);
      }
      if (/[^a-z0-9\-#$%&'*+.\^_`|~]/i.test(name)) {
        throw new TypeError('Invalid character in header field name');
      }
      return name.toLowerCase();
    }

    function normalizeValue(value) {
      if (typeof value !== 'string') {
        value = String(value);
      }
      return value;
    }

    // Build a destructive iterator for the value list
    function iteratorFor(items) {
      var iterator = {
        next: function () {
          var value = items.shift();
          return { done: value === undefined, value: value };
        }
      };

      if (support.iterable) {
        iterator[Symbol.iterator] = function () {
          return iterator;
        };
      }

      return iterator;
    }

    function Headers(headers) {
      this.map = {};

      if (headers instanceof Headers) {
        headers.forEach(function (value, name) {
          this.append(name, value);
        }, this);
      } else if (headers) {
        Object.getOwnPropertyNames(headers).forEach(function (name) {
          this.append(name, headers[name]);
        }, this);
      }
    }

    Headers.prototype.append = function (name, value) {
      name = normalizeName(name);
      value = normalizeValue(value);
      var list = this.map[name];
      if (!list) {
        list = [];
        this.map[name] = list;
      }
      list.push(value);
    };

    Headers.prototype['delete'] = function (name) {
      delete this.map[normalizeName(name)];
    };

    Headers.prototype.get = function (name) {
      var values = this.map[normalizeName(name)];
      return values ? values[0] : null;
    };

    Headers.prototype.getAll = function (name) {
      return this.map[normalizeName(name)] || [];
    };

    Headers.prototype.has = function (name) {
      return this.map.hasOwnProperty(normalizeName(name));
    };

    Headers.prototype.set = function (name, value) {
      this.map[normalizeName(name)] = [normalizeValue(value)];
    };

    Headers.prototype.forEach = function (callback, thisArg) {
      Object.getOwnPropertyNames(this.map).forEach(function (name) {
        this.map[name].forEach(function (value) {
          callback.call(thisArg, value, name, this);
        }, this);
      }, this);
    };

    Headers.prototype.keys = function () {
      var items = [];
      this.forEach(function (value, name) {
        items.push(name);
      });
      return iteratorFor(items);
    };

    Headers.prototype.values = function () {
      var items = [];
      this.forEach(function (value) {
        items.push(value);
      });
      return iteratorFor(items);
    };

    Headers.prototype.entries = function () {
      var items = [];
      this.forEach(function (value, name) {
        items.push([name, value]);
      });
      return iteratorFor(items);
    };

    if (support.iterable) {
      Headers.prototype[Symbol.iterator] = Headers.prototype.entries;
    }

    function consumed(body) {
      if (body.bodyUsed) {
        return Promise.reject(new TypeError('Already read'));
      }
      body.bodyUsed = true;
    }

    function fileReaderReady(reader) {
      return new Promise(function (resolve, reject) {
        reader.onload = function () {
          resolve(reader.result);
        };
        reader.onerror = function () {
          reject(reader.error);
        };
      });
    }

    function readBlobAsArrayBuffer(blob) {
      var reader = new FileReader();
      reader.readAsArrayBuffer(blob);
      return fileReaderReady(reader);
    }

    function readBlobAsText(blob) {
      var reader = new FileReader();
      reader.readAsText(blob);
      return fileReaderReady(reader);
    }

    function Body() {
      this.bodyUsed = false;

      this._initBody = function (body) {
        this._bodyInit = body;
        if (typeof body === 'string') {
          this._bodyText = body;
        } else if (support.blob && Blob.prototype.isPrototypeOf(body)) {
          this._bodyBlob = body;
        } else if (support.formData && FormData.prototype.isPrototypeOf(body)) {
          this._bodyFormData = body;
        } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
          this._bodyText = body.toString();
        } else if (!body) {
          this._bodyText = '';
        } else if (support.arrayBuffer && ArrayBuffer.prototype.isPrototypeOf(body)) {
          // Only support ArrayBuffers for POST method.
          // Receiving ArrayBuffers happens via Blobs, instead.
        } else {
          throw new Error('unsupported BodyInit type');
        }

        if (!this.headers.get('content-type')) {
          if (typeof body === 'string') {
            this.headers.set('content-type', 'text/plain;charset=UTF-8');
          } else if (this._bodyBlob && this._bodyBlob.type) {
            this.headers.set('content-type', this._bodyBlob.type);
          } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
            this.headers.set('content-type', 'application/x-www-form-urlencoded;charset=UTF-8');
          }
        }
      };

      if (support.blob) {
        this.blob = function () {
          var rejected = consumed(this);
          if (rejected) {
            return rejected;
          }

          if (this._bodyBlob) {
            return Promise.resolve(this._bodyBlob);
          } else if (this._bodyFormData) {
            throw new Error('could not read FormData body as blob');
          } else {
            return Promise.resolve(new Blob([this._bodyText]));
          }
        };

        this.arrayBuffer = function () {
          return this.blob().then(readBlobAsArrayBuffer);
        };

        this.text = function () {
          var rejected = consumed(this);
          if (rejected) {
            return rejected;
          }

          if (this._bodyBlob) {
            return readBlobAsText(this._bodyBlob);
          } else if (this._bodyFormData) {
            throw new Error('could not read FormData body as text');
          } else {
            return Promise.resolve(this._bodyText);
          }
        };
      } else {
        this.text = function () {
          var rejected = consumed(this);
          return rejected ? rejected : Promise.resolve(this._bodyText);
        };
      }

      if (support.formData) {
        this.formData = function () {
          return this.text().then(decode);
        };
      }

      this.json = function () {
        return this.text().then(JSON.parse);
      };

      return this;
    }

    // HTTP methods whose capitalization should be normalized
    var methods = ['DELETE', 'GET', 'HEAD', 'OPTIONS', 'POST', 'PUT'];

    function normalizeMethod(method) {
      var upcased = method.toUpperCase();
      return methods.indexOf(upcased) > -1 ? upcased : method;
    }

    function Request(input, options) {
      options = options || {};
      var body = options.body;
      if (Request.prototype.isPrototypeOf(input)) {
        if (input.bodyUsed) {
          throw new TypeError('Already read');
        }
        this.url = input.url;
        this.credentials = input.credentials;
        if (!options.headers) {
          this.headers = new Headers(input.headers);
        }
        this.method = input.method;
        this.mode = input.mode;
        if (!body) {
          body = input._bodyInit;
          input.bodyUsed = true;
        }
      } else {
        this.url = input;
      }

      this.credentials = options.credentials || this.credentials || 'omit';
      if (options.headers || !this.headers) {
        this.headers = new Headers(options.headers);
      }
      this.method = normalizeMethod(options.method || this.method || 'GET');
      this.mode = options.mode || this.mode || null;
      this.referrer = null;

      if ((this.method === 'GET' || this.method === 'HEAD') && body) {
        throw new TypeError('Body not allowed for GET or HEAD requests');
      }
      this._initBody(body);
    }

    Request.prototype.clone = function () {
      return new Request(this);
    };

    function decode(body) {
      var form = new FormData();
      body.trim().split('&').forEach(function (bytes) {
        if (bytes) {
          var split = bytes.split('=');
          var name = split.shift().replace(/\+/g, ' ');
          var value = split.join('=').replace(/\+/g, ' ');
          form.append(decodeURIComponent(name), decodeURIComponent(value));
        }
      });
      return form;
    }

    function headers(xhr) {
      var head = new Headers();
      var pairs = (xhr.getAllResponseHeaders() || '').trim().split('\n');
      pairs.forEach(function (header) {
        var split = header.trim().split(':');
        var key = split.shift().trim();
        var value = split.join(':').trim();
        head.append(key, value);
      });
      return head;
    }

    Body.call(Request.prototype);

    function Response(bodyInit, options) {
      if (!options) {
        options = {};
      }

      this.type = 'default';
      this.status = options.status;
      this.ok = this.status >= 200 && this.status < 300;
      this.statusText = options.statusText;
      this.headers = options.headers instanceof Headers ? options.headers : new Headers(options.headers);
      this.url = options.url || '';
      this._initBody(bodyInit);
    }

    Body.call(Response.prototype);

    Response.prototype.clone = function () {
      return new Response(this._bodyInit, {
        status: this.status,
        statusText: this.statusText,
        headers: new Headers(this.headers),
        url: this.url
      });
    };

    Response.error = function () {
      var response = new Response(null, { status: 0, statusText: '' });
      response.type = 'error';
      return response;
    };

    var redirectStatuses = [301, 302, 303, 307, 308];

    Response.redirect = function (url, status) {
      if (redirectStatuses.indexOf(status) === -1) {
        throw new RangeError('Invalid status code');
      }

      return new Response(null, { status: status, headers: { location: url } });
    };

    self.Headers = Headers;
    self.Request = Request;
    self.Response = Response;

    self.fetch = function (input, init) {
      return new Promise(function (resolve, reject) {
        var request;
        if (Request.prototype.isPrototypeOf(input) && !init) {
          request = input;
        } else {
          request = new Request(input, init);
        }

        var xhr = new XMLHttpRequest();

        function responseURL() {
          if ('responseURL' in xhr) {
            return xhr.responseURL;
          }

          // Avoid security warnings on getResponseHeader when not allowed by CORS
          if (/^X-Request-URL:/m.test(xhr.getAllResponseHeaders())) {
            return xhr.getResponseHeader('X-Request-URL');
          }

          return;
        }

        xhr.onload = function () {
          var options = {
            status: xhr.status,
            statusText: xhr.statusText,
            headers: headers(xhr),
            url: responseURL()
          };
          var body = 'response' in xhr ? xhr.response : xhr.responseText;
          resolve(new Response(body, options));
        };

        xhr.onerror = function () {
          reject(new TypeError('Network request failed'));
        };

        xhr.ontimeout = function () {
          reject(new TypeError('Network request failed'));
        };

        xhr.open(request.method, request.url, true);

        if (request.credentials === 'include') {
          xhr.withCredentials = true;
        }

        if ('responseType' in xhr && support.blob) {
          xhr.responseType = 'blob';
        }

        request.headers.forEach(function (value, name) {
          xhr.setRequestHeader(name, value);
        });

        xhr.send(typeof request._bodyInit === 'undefined' ? null : request._bodyInit);
      });
    };
    self.fetch.polyfill = true;
  })(typeof self !== 'undefined' ? self : this);
  return module.exports;
});
System.registerDynamic("npm:dlib@0.0.16.json", [], false, function() {
  return {
    "format": "es6",
    "meta": {
      "*.json": {
        "format": "json"
      }
    }
  };
});

System.register("npm:dlib@0.0.16/utils/Loader.js", ["whatwg-fetch"], function (_export, _context) {
  "use strict";

  return {
    setters: [function (_whatwgFetch) {}],
    execute: function () {

      const PROMISES = new Map();
      const OBJECTS = new Map();

      class Loader {
        static get onLoad() {
          return Promise.all(PROMISES.values());
        }

        static get promises() {
          return PROMISES;
        }

        static get(value) {
          return OBJECTS.get(value);
        }

        static load(values) {
          if (!(values instanceof Array)) {
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
                if (value instanceof HTMLElement) {
                  value.removeEventListener("load", onLoad);
                  value.removeEventListener("canplaythrough", onLoad);
                  OBJECTS.set(value.getAttribute("src"), value);
                  resolve(value);
                } else {
                  OBJECTS.set(value, response);
                  resolve(response);
                }
              };

              if (typeof value === "string") {
                let tagName;
                if (/\.(png|jpg|gif)$/.test(value)) {
                  tagName = "img";
                } else if (/\.(mp4|webm)$/.test(value)) {
                  tagName = "video";
                } else if (/\.(mp3|ogg)$/.test(value)) {
                  tagName = "audio";
                } else if (/\.(woff|woff2)$/.test(value)) {
                  let fontFace = new FontFace(/([^\/]*)\.(woff|woff2)$/.exec(value)[1], `url(${ value })`);
                  fontFace.load().then(onLoad);
                  document.fonts.add(fontFace);
                } else {
                  fetch(value).catch(err => {
                    return new Promise(function (resolve, reject) {
                      let xhr = new XMLHttpRequest();
                      xhr.onload = () => {
                        resolve(new Response(xhr.responseText, { status: xhr.status }));
                      };
                      xhr.open("GET", value);
                      xhr.send(null);
                    });
                  }).then(response => {
                    return response[/\.(json)$/.test(value) ? "json" : "text"]();
                  }).then(onLoad);
                }
                if (tagName) {
                  let element = document.createElement(tagName);
                  element.src = value;
                  value = element;
                }
              }

              if (value instanceof HTMLElement) {
                if (value instanceof HTMLMediaElement) {
                  value.addEventListener("canplaythrough", onLoad);
                } else {
                  value.addEventListener("load", onLoad);
                };
              }
            });

            promises.push(promise);
            PROMISES.set(value, promise);
          }

          return promises.length > 1 ? Promise.all(promises) : promises[0];
        }
      }

      _export("default", Loader);
    }
  };
});
System.register("dnit/main/index.js", ["dlib/utils/Loader.js"], function (_export, _context) {
  "use strict";

  var Loader;
  return {
    setters: [function (_dlibUtilsLoaderJs) {
      Loader = _dlibUtilsLoaderJs.default;
    }],
    execute: function () {

      let template = document.createElement("template");
      Loader.load("src/main/template.html").then(value => {
        template.innerHTML = value;
      });

      class Main extends HTMLElement {
        constructor() {
          super();

          let templateClone = document.importNode(template.content, true);
          this.appendChild(templateClone);
        }
      }

      Loader.onLoad.then(() => {
        window.customElements.define("dnit-main", Main);
      });
    }
  };
});
System.register("dnit/index.js", ["@webcomponents/custom-elements", "./main/index.js"], function (_export, _context) {
  "use strict";

  return {
    setters: [function (_webcomponentsCustomElements) {}, function (_mainIndexJs) {}],
    execute: function () {}
  };
});
//# sourceMappingURL=index.js.map