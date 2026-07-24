// BUX Athletes — network-first service worker.
// Always fetch the freshest version when online (kills the stale-cache problem),
// fall back to cache only when offline.
const CACHE='bux-athletes-v1';
self.addEventListener('install', e=>{ self.skipWaiting(); });
self.addEventListener('activate', e=>{ e.waitUntil(self.clients.claim()); });
self.addEventListener('fetch', e=>{
  if(e.request.method!=='GET') return;
  e.respondWith(
    fetch(e.request).then(res=>{
      try{ const copy=res.clone(); caches.open(CACHE).then(c=>c.put(e.request, copy)).catch(()=>{}); }catch(_){}
      return res;
    }).catch(()=> caches.match(e.request))
  );
});
