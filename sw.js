const staticCacheName = 'site-static-v8.9';
const assets =[
    '/',
    '/index.html',
    '/js/app.js',
    '/js/1.js',
    '/css/1.css',
    '/img/[CITYPNG.COM]Apple Watch Ultra Starlight Alpine Front View HD PNG - 2074x2074.png',
    '/img/iphone-14-pro_overview__e414c54gtu6a_og.png',
    '/img/pexels-felix-mittermeier-1146134.jpg',
    '/img/apple-logo-png-ios-support-the-pipeline-virtual-ecotourism-9.png',
    '/product/img1/[CITYPNG.COM]Apple Watch Ultra Starlight Alpine Front View HD PNG - 2074x2074.png',
    '/img/MacBookAir13m12020_Grey.png',
    '/img/apple-logo-transparent.png',
    '/img/Apple-iPhone-11-PNG-File.png',
    '/iPhone 12/Apple-iPhone-12-PNG-Photo.png',
    '/img/lotsofiphone.png',
    '/img/Apple-iPhone-11-PNG-HD (1).png',
    '/product/product.html',
    '/product/productcss/p.css',
    '/product/productjs/p.js',
    '/product/img1/apple-logo-transparent.png',
    '/product/img1/lotsofiphone.png',
    '/product/img1/airpods-32449 (1).png',
    '/product/img1/pexels-felix-mittermeier-1146134.jpg',
    '/product/img1/pngimg.com - iphone_12_PNG19.png',
    'product/img1/iPhone-14-PNG-Clipart.png',
    '/product/img1/iPhone-14-Pro-Max-PNG.png ',
    '/product/img1/mba-digitalmat-gallery-2-202111.png',
    '/product/img1/watch-ultra-digitalmat-gallery-3-202209_GEO_IN.png',
    '/product/img1/airpods-max-select-pink-202011.png',
    '/product/img1/MME73_AV4.jpg',
    '/product/img1/ipadpro11-digitalmat-gallery-1-202210.png',
    '/product/img1/imac24-digitalmat-gallery-2-202111.png',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/css/all.min.css',
];

//install
self.addEventListener('install',evt=>{
    // console.log('serivce worker has been installed');
    evt.waitUntil( 
        caches.open(staticCacheName).then(cache =>{
            console.log('caching shell assets');
            cache.addAll(assets);
        })
    );
   
});

//active
self.addEventListener('activate' ,evt=>{
    // console.log('service worker has been activated');
    evt.waitUntil(
        caches.keys().then(keys =>{
            // console.log(keys);
            return Promise.all(keys
                .filter(key => key !== staticCacheName)
                .map(key => caches.delete(key))    
            )
        })
    );
});

//fetch event
self.addEventListener('fetch',evt=>{
    // console.log('fetch event',evt);
    evt.respondWith(
        caches.match(evt.request).then(cacheRes =>{
            return cacheRes || fetch(evt.request);
        })
    );
});