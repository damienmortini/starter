const browserSyncServer = require("browser-sync").create();

browserSyncServer.init({
  server: {
    baseDir: "."
  },
  https: true,
  ghostMode: false,
  tunnel: false,
  open: "local",
  notify: false,
  files: "src",
  startPath: "?dev"
});