self.addEventListener("fetch", (event) => {
  if(event.request.method !== "GET") {
    return;
  }

  event.respondWith(fetch(event.request).then((response) => {
    return response.clone().text().then((data) => {
      const importRegexp = /\bimport\b(.*from)?\s+[`'"](.*?)[`'"]/g;

      let processed = false;

      let results;

      while((results = importRegexp.exec(data)) !== null) {
        let moduleURI = results[2];

        // Change local node module URI to global 
        if(/^[@\w]/.exec(moduleURI)) {
          processed = true;
          moduleURI = `${self.location.origin}/node_modules/${moduleURI}`;
        }
        
        // Add .js extension to module if it's missing
        if(!moduleURI.endsWith(".js")) {
          processed = true;
          moduleURI += ".js";
        }

        if(processed) {
          data = data.replace(results[2], moduleURI);
        }
      }
      
      if(processed) {
        response = new Response(data, {
          status: response.status,
          statusText: response.statusText,
          headers: Object.assign({"Content-Type": "application/javascript"}, response.headers)
        });
      }

      return response;
    });
  }));
});