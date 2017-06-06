let path = require("path");
let Builder = require("systemjs-builder");

let builder = new Builder();

builder.loadConfig("systemjs.config.js")
.then(function() {
  return builder.buildStatic("src/index.js", "build/index.js")
})
.then(function() {
  console.log("Build complete");
})
.catch(function(err) {
  console.log("Build error");
  console.log(err);
});