import { Cache } from './Cache'; 
import * as path from 'path';
import * as fs from 'fs';
import * as BSON from 'bson';

class CacheController {
    static getCachePath(cache: Cache, cachePath?: string) : void {
        cachePath === undefined ? cache.__cachePath = path.join(path.dirname(process?.mainModule?.filename as string), '/.cache/') : cache.__cachePath = cachePath;
    }

    static confirmCacheFolder(cache: Cache) : void {
        !fs.existsSync(cache.__cachePath) ? fs.mkdirSync(cache.__cachePath) : null;
    }

    static confirmCacheIndex(cache: Cache) : void {
        !fs.existsSync(path.join(cache.__cachePath, '/CACHE')) ? fs.writeFileSync(path.join(cache.__cachePath, '/CACHE'), BSON.serialize({})) : null;
    }

    static readCacheIndex(cache: Cache) : void {
        cache.__clone_cache = BSON.deserialize(fs.readFileSync(path.join(cache.__cachePath, '/CACHE')));
    }

    static updateCacheIndex(cache: Cache) : void {
        fs.writeFileSync(path.join(cache.__cachePath, '/CACHE'), BSON.serialize(cache.__clone_cache))
    }
}

export { CacheController };