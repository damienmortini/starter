SystemJS.config({
  transpiler: "plugin-babel",
  meta: {
    "*.js": {
      babelOptions: {
        es2015: false
      }
    },
    // babelOptions: {
    //   "optional": [
    //     "runtime",
    //     "optimisation.modules.system"
    //   ]
    // },
    "github:mrdoob/three.js@r73/build/three.js": {
      "format": "global"
    }
  }
});

SystemJS.config({
  packageConfigPaths: [
    "npm:@*/*.json",
    "npm:*.json",
    "github:*/*.json"
  ],
  map: {
    "babel": "npm:babel-core@5.8.38",
    "THREE": "github:mrdoob/three.js@r73",
    "babel-runtime": "npm:babel-runtime@5.8.38",
    "buffer": "github:jspm/nodelibs-buffer@0.2.0-alpha",
    "core-js": "npm:core-js@1.2.6",
    "dlib": "npm:dlib@0.0.4",
    "events": "github:jspm/nodelibs-events@0.2.0-alpha",
    "fs": "github:jspm/nodelibs-fs@0.2.0-alpha",
    "path": "github:jspm/nodelibs-path@0.2.0-alpha",
    "plugin-babel": "npm:systemjs-plugin-babel@0.0.10",
    "process": "github:jspm/nodelibs-process@0.2.0-alpha",
    "text": "github:systemjs/plugin-text@0.0.4",
    "webcomponents.js": "npm:webcomponents.js@0.7.22"
  },
  packages: {
    "github:jspm/nodelibs-buffer@0.2.0-alpha": {
      "map": {
        "buffer-browserify": "npm:buffer@4.6.0"
      }
    },
    "npm:babel-runtime@5.8.38": {
      "map": {}
    },
    "npm:buffer@4.6.0": {
      "map": {
        "base64-js": "npm:base64-js@1.1.2",
        "ieee754": "npm:ieee754@1.1.6",
        "isarray": "npm:isarray@1.0.0"
      }
    },
    "npm:core-js@1.2.6": {
      "map": {
        "systemjs-json": "github:systemjs/plugin-json@0.1.2"
      }
    },
    "npm:d@0.1.1": {
      "map": {
        "es5-ext": "npm:es5-ext@0.10.11"
      }
    },
    "npm:dlib@0.0.4": {
      "map": {
        "event-emitter": "npm:event-emitter@0.3.4",
        "gl-matrix": "npm:gl-matrix@2.3.2",
        "howler": "npm:howler@1.1.29",
        "min-signal": "npm:min-signal@0.0.5",
        "webcomponents.js": "npm:webcomponents.js@0.7.22"
      }
    },
    "npm:es5-ext@0.10.11": {
      "map": {
        "es6-iterator": "npm:es6-iterator@2.0.0",
        "es6-symbol": "npm:es6-symbol@3.0.2"
      }
    },
    "npm:es6-iterator@2.0.0": {
      "map": {
        "d": "npm:d@0.1.1",
        "es5-ext": "npm:es5-ext@0.10.11",
        "es6-symbol": "npm:es6-symbol@3.0.2"
      }
    },
    "npm:es6-symbol@3.0.2": {
      "map": {
        "d": "npm:d@0.1.1",
        "es5-ext": "npm:es5-ext@0.10.11"
      }
    },
    "npm:event-emitter@0.3.4": {
      "map": {
        "d": "npm:d@0.1.1",
        "es5-ext": "npm:es5-ext@0.10.11"
      }
    },
    "npm:gl-matrix@2.3.2": {
      "map": {}
    },
    "npm:howler@1.1.29": {
      "map": {}
    },
    "npm:webcomponents.js@0.7.22": {
      "map": {
        "systemjs-json": "github:systemjs/plugin-json@0.1.2"
      }
    }
  }
});
