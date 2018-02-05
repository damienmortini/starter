const browserSyncServer = require("browser-sync").create();

browserSyncServer.init({
  server: true,
  httpModule: "http2",
  https: true,
  ghostMode: false,
  tunnel: false,
  open: "local",
  notify: false,
  files: "src",
  startPath: "?dev"
});