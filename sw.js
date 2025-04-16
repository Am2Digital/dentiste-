self.addEventListener("install", (event) => {
  console.log("[Service Worker] Install");
  event.waitUntil(
    caches.open("dashboard-cache-v1").then((cache) => {
      return cache.addAll([
        "./",
        "./index.html",
        "./manifest.json",
        "./sw.js",
        "https://cdn.jsdelivr.net/npm/chart.js", // externe
        "https://www.gstatic.com/firebasejs/10.8.1/firebase-app-compat.js",
        "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore-compat.js"
        // Ajoute tes images, CSS, icônes...
      ]);
    })
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
