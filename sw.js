/* F.STAGE — offline shell */
var C='fstage-v1';
var FILES=["./", "index.html", "app.css", "fonts.css", "app.js", "data.js", "manifest.webmanifest", "assets/alpha-black.png", "assets/alpha-white.png", "assets/ed-wide.webp", "assets/hero-poster.jpg", "assets/hero.mp4", "assets/icon-192.png", "assets/icon-512.png", "assets/logo.png", "assets/p-alo-set.webp", "assets/p-jordan-silver.webp", "assets/p-jordan-unc-a.webp", "assets/p-jordan-unc-b.webp", "assets/p-leopard-tee.webp", "assets/p-linen-set.webp", "assets/p-vomero.webp", "fonts/20ba07dcaa.woff2", "fonts/395290514d.woff2", "fonts/567244088c.woff2", "fonts/79dc5e1034.woff2"];
self.addEventListener('install',function(e){
  self.skipWaiting();
  e.waitUntil(caches.open(C).then(function(c){return c.addAll(FILES).catch(function(){});}));
});
self.addEventListener('activate',function(e){
  e.waitUntil(caches.keys().then(function(k){
    return Promise.all(k.filter(function(n){return n!==C;}).map(function(n){return caches.delete(n);}));
  }).then(function(){return self.clients.claim();}));
});
self.addEventListener('fetch',function(e){
  if(e.request.method!=='GET') return;
  var u=new URL(e.request.url);
  if(u.origin!==location.origin) return;
  e.respondWith(caches.match(e.request).then(function(r){
    return r || fetch(e.request).then(function(res){
      var copy=res.clone();
      caches.open(C).then(function(c){c.put(e.request,copy);});
      return res;
    }).catch(function(){ return caches.match('index.html'); });
  }));
});
