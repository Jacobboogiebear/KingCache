import { CacheController } from './CacheController';

class Cache {
    public __cachePath: string = "";
    public __clone_cache: any = {};

    constructor(cachePath?: string) {
        CacheController.getCachePath(this, cachePath);
        CacheController.confirmCacheFolder(this);
        CacheController.confirmCacheIndex(this);
        CacheController.readCacheIndex(this);
    }

    public exists(id: string) : boolean {
        return this.__clone_cache[id] !== undefined;
    }
}

export { Cache };