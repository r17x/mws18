var CACHE_NAME = 'ri7nz-mws18',
    CACHE_LIST = [
      'index.html',
      'hitung-angka.html',
      'grid.html',
      'map.html',
      'main.js',
      'main.css'
      ],
    SW_UPDATE  = function(req){
        return caches.open(CACHE_NAME).then(function(cache){
            return fetch(req).then(function(res) {
                return cache.put(req, res.clone()).then(function(){
                    return res;
                });
            });
        }); 
    },
    SW_REFRESH = function(res){
        return self.clients.matchAll().then(function(clients){
            clients.forEach(function(client){
                var message = {
                    type: 'refresh',
                    url: res.url,
                    eTag: res.headers.get('ETag')
                };
                client.postMessage(JSON.stringify(message));
            });
        });
    };
/**
 * Create Cache All  
 */
console.log(self); 
self.addEventListener('install', function(e) {
  e.waitUntil(
      caches.open(CACHE_NAME).then(function(c){
          console.log('cache all created :D');
          return c.addAll(CACHE_LIST); 
      })
  );
});

/**
 * Create Fetch Catch for response cache if match
 */
self.addEventListener('fetch', function(e) {
    // check all request url
    console.log(e.request.url);
    e.respondWith(
        caches.match(e.request).then( function(res){
            return res || fetch(e.request); 
        })
    );
    
    e.waitUntil(
        SW_UPDATE(e.request)
        .then(SW_REFRESH)
    );
});

/**
 * Create Install Prompt | Added To Homescreen
 */
self.addEventListener('beforeinstallprompt', function(e) {
    e.userChoice.then( function(choiceResult){
        console.log(choiceResult.outcome); 
        if(choiceResult.outcome == 'dismissed') 
            console.log('User is Good Cancel');
        else
            console.log('User Added TO Chrome'); 
    });
}); 

self.addEventListener('activate', function(e){
    console.log('activate state SW.js'); 
   var CACHE_WITHELIST = [ CACHE_NAME ];

    e.waitUntil(
        caches.keys().then(function(keyList){
            return Promise.all(keyList.map(function(key){
                if ( CACHE_WITHELIST.indexOf(key) === - 1 ){
                    return caches.delete(key); 
                }
            }))
        })
    );
});
