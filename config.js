System.config({
  defaultJSExtensions: true,
  transpiler: "babel",
  babelOptions: {
    "optional": [
      "runtime",
      "optimisation.modules.system"
    ]
  },
  paths: {
    "github:*": "jspm_packages/github/*",
    "npm:*": "jspm_packages/npm/*"
  },

  map: {
    "THREE": "github:mrdoob/three.js@r73",
    "THREE.TrackballControls": "github:mrdoob/three.js@r73/examples/js/controls/TrackballControls.js",
    "THREE.EffectComposer": "github:mrdoob/three.js@r73/examples/js/postprocessing/EffectComposer.js",
    "THREE.RenderPass": "github:mrdoob/three.js@r73/examples/js/postprocessing/RenderPass.js",
    "THREE.MaskPass": "github:mrdoob/three.js@r73/examples/js/postprocessing/MaskPass.js",
    "THREE.ShaderPass": "github:mrdoob/three.js@r73/examples/js/postprocessing/ShaderPass.js",
    "THREE.CopyShader": "github:mrdoob/three.js@r73/examples/js/shaders/CopyShader.js",
    "THREE.FXAAShader": "github:mrdoob/three.js@r73/examples/js/shaders/FXAAShader.js",
    "babel": "npm:babel-core@5.8.34",
    "babel-runtime": "npm:babel-runtime@5.8.34",
    "core-js": "npm:core-js@1.2.6",
    "dlib": "npm:dlib@0.0.2",
    "text": "github:systemjs/plugin-text@0.0.2",
    "webcomponents.js": "npm:webcomponents.js@0.7.20",
    "github:jspm/nodelibs-assert@0.1.0": {
      "assert": "npm:assert@1.3.0"
    },
    "github:jspm/nodelibs-buffer@0.1.0": {
      "buffer": "npm:buffer@3.6.0"
    },
    "github:jspm/nodelibs-events@0.1.1": {
      "events": "npm:events@1.0.2"
    },
    "github:jspm/nodelibs-path@0.1.0": {
      "path-browserify": "npm:path-browserify@0.0.0"
    },
    "github:jspm/nodelibs-process@0.1.2": {
      "process": "npm:process@0.11.2"
    },
    "github:jspm/nodelibs-util@0.1.0": {
      "util": "npm:util@0.10.3"
    },
    "npm:assert@1.3.0": {
      "util": "npm:util@0.10.3"
    },
    "npm:babel-runtime@5.8.34": {
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:buffer@3.6.0": {
      "base64-js": "npm:base64-js@0.0.8",
      "child_process": "github:jspm/nodelibs-child_process@0.1.0",
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "ieee754": "npm:ieee754@1.1.6",
      "isarray": "npm:isarray@1.0.0",
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:core-js@1.2.6": {
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "path": "github:jspm/nodelibs-path@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "systemjs-json": "github:systemjs/plugin-json@0.1.0"
    },
    "npm:d@0.1.1": {
      "es5-ext": "npm:es5-ext@0.10.11"
    },
    "npm:dlib@0.0.2": {
      "event-emitter": "npm:event-emitter@0.3.4",
      "gl-matrix": "npm:gl-matrix@2.3.1",
      "howler": "npm:howler@1.1.28",
      "min-signal": "npm:min-signal@0.0.5"
    },
    "npm:es5-ext@0.10.11": {
      "es6-iterator": "npm:es6-iterator@2.0.0",
      "es6-symbol": "npm:es6-symbol@3.0.2",
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:es6-iterator@2.0.0": {
      "d": "npm:d@0.1.1",
      "es5-ext": "npm:es5-ext@0.10.11",
      "es6-symbol": "npm:es6-symbol@3.0.2"
    },
    "npm:es6-symbol@3.0.2": {
      "d": "npm:d@0.1.1",
      "es5-ext": "npm:es5-ext@0.10.11"
    },
    "npm:event-emitter@0.3.4": {
      "d": "npm:d@0.1.1",
      "es5-ext": "npm:es5-ext@0.10.11",
      "events": "github:jspm/nodelibs-events@0.1.1"
    },
    "npm:gl-matrix@2.3.1": {
      "fs": "github:jspm/nodelibs-fs@0.1.2"
    },
    "npm:howler@1.1.28": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.0"
    },
    "npm:inherits@2.0.1": {
      "util": "github:jspm/nodelibs-util@0.1.0"
    },
    "npm:path-browserify@0.0.0": {
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:process@0.11.2": {
      "assert": "github:jspm/nodelibs-assert@0.1.0"
    },
    "npm:util@0.10.3": {
      "inherits": "npm:inherits@2.0.1",
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:webcomponents.js@0.7.20": {
      "process": "github:jspm/nodelibs-process@0.1.2"
    }
  }
});
