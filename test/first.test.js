const { Cache, CacheFile } = require('../dist/kingcache');
let cache = new Cache();

if (cache.exists('A file')) {
    let file = new CacheFile(cache, 'A file');
    console.log(file.read())
    file.delete();
} else {
    let file = new CacheFile(cache, 'A file');
    file.write('This is written');
    file.save();
    console.log('saved to cache');
}