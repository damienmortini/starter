(!/\bdev\b/.test(window.location.search) ? System.import("build/index.js") : Promise.resolve())
.catch(function(error) {
  console.log(error);
  console.warn("The project hasn't been built yet, add the \"dev\" query string parameter to launch it from the \"src\" folder.");
})
.then(function() {
  return System.import("three");
})
.then(function(module) {
  window.THREE = {
    WebGLRenderTarget: module.WebGLRenderTarget,
    ShaderMaterial: module.ShaderMaterial,
    UniformsUtils: module.UniformsUtils,
    OrthographicCamera: module.OrthographicCamera,
    Scene: module.Scene,
    PlaneBufferGeometry: module.PlaneBufferGeometry,
    Mesh: module.Mesh,
  };
  return System.import("src/index.js");
})
.catch((error) => {
  console.error(error);
});
