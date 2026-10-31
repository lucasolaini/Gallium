const C='giochi-v1';
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(['./','index.html','manifest.json'])));self.skipWaiting()});
self.addEventListener('activate',e=>e.waitUntil(clients.claim()));
self.addEventListener('fetch',e=>{
  const r=e.request,u=new URL(r.url);
  if(r.method!=='GET'||!(u.origin===location.origin||u.pathname.includes('/storage/v1/object/public/')))return;
  e.respondWith(caches.open(C).then(async c=>{
    const m=await c.match(r);
    const f=fetch(r).then(x=>{if(x.ok||x.type==='opaque')c.put(r,x.clone());return x}).catch(()=>m);
    return m||f;
  }));
});
