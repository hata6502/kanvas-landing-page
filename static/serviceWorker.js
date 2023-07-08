const cacheName = "v109";

const requests = [
  "https://cdn.jsdelivr.net/npm/premy@8.18.2",
  "/",
  "/css/main.css",
  "/examples.json",
  "/favicon.png",
  "/manifest.json",
  "https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js",
  "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/css/all.min.css",
  "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/webfonts/fa-brands-400.ttf",
  "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/webfonts/fa-brands-400.woff",
  "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/webfonts/fa-brands-400.woff2",
  "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/webfonts/fa-solid-900.ttf",
  "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/webfonts/fa-solid-900.woff",
  "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/webfonts/fa-solid-900.woff2",
  "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.12.0/highlight.min.js",
  "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.12.0/languages/go.min.js",
  "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.12.0/languages/haskell.min.js",
  "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.12.0/languages/kotlin.min.js",
  "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.12.0/languages/scala.min.js",
  "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.12.0/languages/swift.min.js",
  "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.12.0/styles/default.min.css",
  "https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.5/config/TeX-AMS-MML_HTMLorMML.js?V=2.7.5",
  "https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.5/extensions/MathMenu.js?V=2.7.5",
  "https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.5/extensions/MathZoom.js?V=2.7.5",
  "https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.5/MathJax.js?config=TeX-AMS-MML_HTMLorMML",
  "https://fonts.googleapis.com/css?family=Noto+Color+Emoji|Dancing+Script|Fruktur|Hachi+Maru+Pop|Potta+One",
  "https://fonts.googleapis.com/css?family=Raleway",
  "https://fonts.gstatic.com/s/raleway/v27/1Ptxg8zYS_SKggPN4iEgvnHyvveLxVvaorCIPrE.woff2",
  "https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js",
  "https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css",
];

// eslint-disable-next-line no-restricted-globals
const serviceWorker = self;

serviceWorker.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();

      await Promise.all(
        keys.map(async (key) => {
          if (key === cacheName) {
            return;
          }

          await caches.delete(key);
        })
      );

      await serviceWorker.clients.claim();
    })()
  );
});

serviceWorker.addEventListener("fetch", (event) => {
  event.respondWith(
    (async () => {
      const cacheResponse = await caches.match(event.request);

      if (cacheResponse) {
        return cacheResponse;
      }

      const fetchResponse = await fetch(event.request);

      return fetchResponse;
    })()
  );
});

serviceWorker.addEventListener("install", (event) => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(cacheName);

      await cache.addAll(requests);
      await serviceWorker.skipWaiting();
    })()
  );
});
