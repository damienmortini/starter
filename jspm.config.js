SystemJS.config({
  nodeConfig: {
    "paths": {
      "github:": "jspm_packages/github/",
      "npm:": "jspm_packages/npm/"
    }
  },
  devConfig: {
    "map": {
      "babel": "npm:babel-core@5.8.38",
      "babel-runtime": "npm:babel-runtime@5.8.38",
      "core-js": "npm:core-js@1.2.6",
      "plugin-babel": "npm:systemjs-plugin-babel@0.0.10"
    }
  },
  transpiler: "plugin-babel",
  babelOptions: {
    "es2015": false
  }
});

SystemJS.config({
  packageConfigPaths: [
    "npm:@*/*.json",
    "npm:*.json",
    "github:*/*.json"
  ],
  map: {
    "assert": "github:jspm/nodelibs-assert@0.2.0-alpha",
    "buffer": "github:jspm/nodelibs-buffer@0.2.0-alpha",
    "dlib": "npm:dlib@0.0.9",
    "events": "github:jspm/nodelibs-events@0.2.0-alpha",
    "fs": "github:jspm/nodelibs-fs@0.2.0-alpha",
    "path": "github:jspm/nodelibs-path@0.2.0-alpha",
    "process": "github:jspm/nodelibs-process@0.2.0-alpha",
    "stream": "github:jspm/nodelibs-stream@0.2.0-alpha",
    "text": "github:systemjs/plugin-text@0.0.8",
    "util": "github:jspm/nodelibs-util@0.2.0-alpha",
    "webcomponents.js": "npm:webcomponents.js@0.7.22"
  },
  packages: {
    "github:jspm/nodelibs-buffer@0.2.0-alpha": {
      "map": {
        "buffer-browserify": "npm:buffer@4.7.0"
      }
    },
    "npm:d@0.1.1": {
      "map": {
        "es5-ext": "npm:es5-ext@0.10.12"
      }
    },
    "npm:es6-iterator@2.0.0": {
      "map": {
        "d": "npm:d@0.1.1",
        "es5-ext": "npm:es5-ext@0.10.12",
        "es6-symbol": "npm:es6-symbol@3.1.0"
      }
    },
    "npm:event-emitter@0.3.4": {
      "map": {
        "d": "npm:d@0.1.1",
        "es5-ext": "npm:es5-ext@0.10.12"
      }
    },
    "npm:buffer@4.7.0": {
      "map": {
        "isarray": "npm:isarray@1.0.0",
        "base64-js": "npm:base64-js@1.1.2",
        "ieee754": "npm:ieee754@1.1.6"
      }
    },
    "npm:es5-ext@0.10.12": {
      "map": {
        "es6-symbol": "npm:es6-symbol@3.1.0",
        "es6-iterator": "npm:es6-iterator@2.0.0"
      }
    },
    "npm:es6-symbol@3.1.0": {
      "map": {
        "d": "npm:d@0.1.1",
        "es5-ext": "npm:es5-ext@0.10.12"
      }
    },
    "npm:dlib@0.0.9": {
      "map": {
        "gl-matrix": "npm:gl-matrix@2.3.2",
        "min-signal": "npm:min-signal@0.0.5",
        "event-emitter": "npm:event-emitter@0.3.4",
        "webcomponents.js": "npm:webcomponents.js@0.7.22",
        "gl-buffer": "npm:gl-buffer@2.1.2",
        "gl-texture2d": "npm:gl-texture2d@2.0.10",
        "gl-shader": "npm:gl-shader@4.2.0"
      }
    },
    "npm:gl-buffer@2.1.2": {
      "map": {
        "ndarray": "npm:ndarray@1.0.18",
        "ndarray-ops": "npm:ndarray-ops@1.2.2",
        "typedarray-pool": "npm:typedarray-pool@1.1.0"
      }
    },
    "npm:gl-texture2d@2.0.10": {
      "map": {
        "ndarray": "npm:ndarray@1.0.18",
        "ndarray-ops": "npm:ndarray-ops@1.2.2",
        "typedarray-pool": "npm:typedarray-pool@1.1.0"
      }
    },
    "npm:ndarray@1.0.18": {
      "map": {
        "is-buffer": "npm:is-buffer@1.1.3",
        "iota-array": "npm:iota-array@1.0.0"
      }
    },
    "npm:ndarray-ops@1.2.2": {
      "map": {
        "cwise-compiler": "npm:cwise-compiler@1.1.2"
      }
    },
    "npm:typedarray-pool@1.1.0": {
      "map": {
        "bit-twiddle": "npm:bit-twiddle@1.0.2",
        "dup": "npm:dup@1.0.0"
      }
    },
    "npm:cwise-compiler@1.1.2": {
      "map": {
        "uniq": "npm:uniq@1.0.1"
      }
    },
    "npm:gl-shader@4.2.0": {
      "map": {
        "gl-format-compiler-error": "npm:gl-format-compiler-error@1.0.2",
        "weakmap-shim": "npm:weakmap-shim@1.1.0"
      }
    },
    "npm:gl-format-compiler-error@1.0.2": {
      "map": {
        "sprintf-js": "npm:sprintf-js@1.0.3",
        "gl-constants": "npm:gl-constants@1.0.0",
        "glsl-shader-name": "npm:glsl-shader-name@1.0.0",
        "add-line-numbers": "npm:add-line-numbers@1.0.1"
      }
    },
    "npm:glsl-shader-name@1.0.0": {
      "map": {
        "glsl-tokenizer": "npm:glsl-tokenizer@2.1.2",
        "atob-lite": "npm:atob-lite@1.0.0"
      }
    },
    "npm:glsl-tokenizer@2.1.2": {
      "map": {
        "through2": "npm:through2@0.6.5"
      }
    },
    "npm:through2@0.6.5": {
      "map": {
        "xtend": "npm:xtend@4.0.1",
        "readable-stream": "npm:readable-stream@1.0.34"
      }
    },
    "npm:readable-stream@1.0.34": {
      "map": {
        "isarray": "npm:isarray@0.0.1",
        "inherits": "npm:inherits@2.0.1",
        "stream-browserify": "npm:stream-browserify@1.0.0",
        "core-util-is": "npm:core-util-is@1.0.2",
        "string_decoder": "npm:string_decoder@0.10.31"
      }
    },
    "npm:add-line-numbers@1.0.1": {
      "map": {
        "pad-left": "npm:pad-left@1.0.2"
      }
    },
    "npm:stream-browserify@1.0.0": {
      "map": {
        "readable-stream": "npm:readable-stream@1.1.14",
        "inherits": "npm:inherits@2.0.1"
      }
    },
    "npm:pad-left@1.0.2": {
      "map": {
        "repeat-string": "npm:repeat-string@1.5.4"
      }
    },
    "npm:readable-stream@1.1.14": {
      "map": {
        "core-util-is": "npm:core-util-is@1.0.2",
        "isarray": "npm:isarray@0.0.1",
        "string_decoder": "npm:string_decoder@0.10.31",
        "inherits": "npm:inherits@2.0.1",
        "stream-browserify": "npm:stream-browserify@1.0.0"
      }
    },
    "github:jspm/nodelibs-stream@0.2.0-alpha": {
      "map": {
        "stream-browserify": "npm:stream-browserify@2.0.1"
      }
    },
    "npm:stream-browserify@2.0.1": {
      "map": {
        "readable-stream": "npm:readable-stream@2.1.4",
        "inherits": "npm:inherits@2.0.1"
      }
    },
    "npm:readable-stream@2.1.4": {
      "map": {
        "core-util-is": "npm:core-util-is@1.0.2",
        "inherits": "npm:inherits@2.0.1",
        "isarray": "npm:isarray@1.0.0",
        "string_decoder": "npm:string_decoder@0.10.31",
        "process-nextick-args": "npm:process-nextick-args@1.0.7",
        "buffer-shims": "npm:buffer-shims@1.0.0",
        "util-deprecate": "npm:util-deprecate@1.0.2"
      }
    }
  }
});
