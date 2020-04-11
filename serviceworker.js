self.addEventListener('activate', () => {
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET' || event.request.destination !== 'script') {
    return;
  }

  event.respondWith(fetch(event.request).then((response) => {
    return response.clone().text().then((data) => {
      data = data.replace(/(\bimport\b.+[`'"])([^./].+?)([`'"])/g, `$1${self.location.origin}/node_modules/$2$3`);
      return new Response(data, {
        status: response.status,
        statusText: response.statusText,
        headers: Object.assign({ 'Content-Type': 'application/javascript' }, response.headers),
      });
    });
  }));
});
