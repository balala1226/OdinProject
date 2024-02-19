class BucketEntry{
    constructor(key = null, value = null){
        this.key = key;
        this.value = value;
    }
}

class HashMap{
    constructor(){
        this.capacity = 16;
        this.buckets = new Array(16);
        this.currentSize = 0;
    }

    hash(key) {
        let hashCode = 0;
            
        const primeNumber = 31;
        for (let i = 0; i < key.length; i++) {
            hashCode = primeNumber * hashCode + key.charCodeAt(i);
        }

        hashCode = hashCode % this.capacity;
        return hashCode;
    } 

    resize() {
        const optimalCapacity = Math.ceil(this.capacity / 0.75);

        if (this.currentSize < optimalCapacity){
            return;
        }

        this.capacity = this.capacity * 2;
        const newMap = new Array(this.capacity);

        this.buckets.forEach(bucketEntry => {
            if (bucketEntry.key != null){
                var newHash = this.hash(key);
                var newBucketEntry = new BucketEntry(bucketEntry.key, bucketEntry.value);
                newMap[hashCode] = newBucketEntry;
            }
        });

        this.buckets = newMap;
    }

    set(key, value) {
        var hashCode = this.hash(key);

        if (this.buckets[hashCode] == null || this.buckets[hashCode] == undefined)
        {
            var newBucketEntry = new BucketEntry();
            this.buckets[hashCode] = newBucketEntry;
            this.currentSize++;

            this.resize();
        } 

        this.buckets[hashCode].key = key;
        this.buckets[hashCode].value = value;
    }

    get(key) {
        var hashCode = this.hash(key);

        if (this.buckets[hashCode] == undefined){
            return null;
        }

        if (this.buckets[hashCode].key != key){
            return null;
        }

        return this.buckets[hashCode].value;
    }

    has(key) {
        var hashCode = this.hash(key);

        if (this.buckets[hashCode] == undefined){
            return false;
        }

        if (this.buckets[hashCode].key != key){
            return false;
        }
        
        return true;
    }

    remove(key) {
        var hashCode = this.hash(key);

        if (this.buckets[hashCode] == undefined){
            return;
        }

        if (this.buckets[hashCode].key != key){
            return;
        }
        
        this.buckets[hashCode].key = null;
        this.buckets[hashCode].value = null;

        this.currentSize--;
    }

    length() {
        return this.currentSize;
    }

    clear() {
        this.buckets = [];

        this.capacity = 16;
        const newMap = new Array(this.capacity);
        
        this.buckets = newMap;

        this.currentSize = 0;
    }

    keys() {
        var keyArray = [];

        this.buckets.forEach(bucketEntry => {
            if (bucketEntry.key != null){
                keyArray.push(bucketEntry.key);
            }
        });

        return keyArray;
    }

    values() {
        var valueArray = [];

        this.buckets.forEach(bucketEntry => {
            if (bucketEntry.key != null){
                valueArray.push(bucketEntry.value);
            }
        });

        return valueArray;
    }

    entries() {
        var entriesArray = [];

        this.buckets.forEach(bucketEntry => {
            if (bucketEntry.key != null){
                entriesArray.push(bucketEntry);
            }
        });

        return entriesArray;
    }
}

//test
var hashMap = new HashMap();

hashMap.set("hello", "me");
hashMap.set("hi", "tada");
hashMap.set("bag", "black");
console.log(hashMap);
console.log("keys " +hashMap.keys());
console.log("values " + hashMap.values());
console.log("entries " + hashMap.entries());
console.log("get " +hashMap.get("hi"));
console.log("has " +hashMap.get("me"));
console.log("has " +hashMap.get("bag"));
console.log("remove ");
hashMap.remove("bag")
console.log(hashMap);
console.log("length " +hashMap.length());
hashMap.clear();
console.log(hashMap);