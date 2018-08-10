var staticCacheName = 'restaurant-app-v1';

self.addEventListener('install', function (event) {
	event.waitUntil(
		caches.open(staticCacheName).then(function (cache) {
			return cache.addAll([
				'/skeleton',
				'/js/main.js',
				'/js/restaurant_info.js',
				'/js/dbhelper.js',
				'/css/styles.css',
				'/img/1.jpg',
				'/img/2.jpg',
				'/img/3.jpg',
				'/img/4.jpg',
				'/img/5.jpg',
				'/img/6.jpg',
				'/img/7.jpg',
				'/img/8.jpg',
				'/img/9.jpg',
				'/img/10.jpg',
				'/css/lt360.css',
				'/css/lt899.css',
				'/css/min900.css',
				'https://unpkg.com/leaflet@1.3.1/dist/leaflet.js',
				'https://unpkg.com/leaflet@1.3.1/dist/leaflet.css'
			]);
		})
	);
});

self.addEventListener('activate', function (event) {
	event.waitUntil(
		caches.keys().then(function (cacheNames) {
			return Promise.all(
				cacheNames.filter(function (cacheName) {
					return cacheName.startsWith('restaurant-app-') &&
						cacheName != staticCacheName;
				}).map(function (cacheName) {
					return caches.delete(cacheName);
				})
			);
		})
	);
});

self.addEventListener('fetch', function (event) {
	let requestUrl = new URL(event.request.url);

	if (requestUrl.origin === location.origin) {
		if (requestUrl.pathname === '/') {
			event.respondWith(caches.match('/skeleton'));
			return;
		}
	}

	event.respondWith(
		caches.match(event.request).then(function (response) {
			return response || fetch(event.request);
		}).catch(err => console.log(err, event.request))
	);
});