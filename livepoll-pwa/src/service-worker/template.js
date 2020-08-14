self.addEventListener('fetch', function (event) {
    event.respondWith(
        caches.open('livepoll-dynamic').then(function (cache) {
            if (!(evt.request.url.indexOf('http') === 0)) return;

            if (event.request.method === 'GET') {
                return cache.match(event.request).then(function (response) {
                    const responsePromise = fetch(event.request).then(function (response) {
                        cache.put(event.request, response.clone());
                        return response;
                    })

                    return response || responsePromise
                })
            }
            return fetch(event.request)
        })
    )
})