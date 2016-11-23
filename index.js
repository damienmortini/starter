(!/\bdev\b/.test(window.location.search) ? System.import("build/index.js") : Promise.resolve())
.catch(function(error) {
  console.log(error);
  console.warn("The project hasn't been built yet, add the \"dev\" query string parameter to launch it from the \"src\" folder.");
})
.then(function() {
  return System.import("src/index.js");
})
.catch((error) => {
  console.error(error);
});
