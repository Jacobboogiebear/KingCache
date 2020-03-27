import { Cache } from './Cache';
import * as fs from 'fs';
import * as path from 'path';
import SHA from 'sha.js'
import randomstring from 'randomstring';
import { CacheController } from './CacheController';

class CacheFile {
    public __content: Buffer = Buffer.from([]);
    public __version: string = "";
    public __id: string;
    public __cache: Cache;

    constructor(cache: Cache, id: string) {
        this.__id = id;
        this.__cache = cache;
        if (cache.__clone_cache[this.__id] !== undefined) {
            this.__content = fs.readFileSync(path.join(cache.__cachePath, cache.__clone_cache[this.__id].f));
            this.__version = cache.__clone_cache[this.__id].v;
        }
    }

    public read() : string {
        return this.__content.toString('ascii');
    }

    public write(content: string) : void {
        this.__content = Buffer.from(content);
        this.__version = SHA('sha256').update(content).digest('hex');
    }

    public save() {
        if (this.__cache.__clone_cache[this.__id] === undefined) {
            let filename = randomstring.generate(50);
            this.__cache.__clone_cache[this.__id] = {
                f: filename,
                v: this.__version
            }
            fs.writeFileSync(path.join(this.__cache.__cachePath, filename), this.__content);
            CacheController.updateCacheIndex(this.__cache);
        } else {
            this.__cache.__clone_cache[this.__id] = {
                v: this.__version
            }
            fs.writeFileSync(path.join(this.__cache.__cachePath, this.__cache.__clone_cache[this.__id].f), this.__content);
        }
    }

    public delete() {
        if (this.__cache.__clone_cache[this.__id] !== undefined) {
            fs.unlinkSync(path.join(this.__cache.__cachePath, this.__cache.__clone_cache[this.__id].f));
            delete this.__cache.__clone_cache[this.__id];
            CacheController.updateCacheIndex(this.__cache);
        }
    }
}

export { CacheFile };