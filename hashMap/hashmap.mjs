import linkedList from "./linkedList.mjs";

export default class hashMap {
  #buckets;
  #loadFactor;
  #capacity;
  #expansionCap;

  constructor(size = 16, loadFactor = 0.75) {
    this.#buckets = new Array(size);

    this.#loadFactor = loadFactor;
    this.#capacity = size;
    this.#expansionCap = Math.ceil(this.#capacity * this.#loadFactor);
  }

  hash(key) {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = primeNumber * hashCode + key.charCodeAt(i);
      hashCode %= this.#buckets.length;
    }

    return hashCode;
  }

  set(key, value) {
    if (this.entries().length >= this.#expansionCap) {
      this.extendArr();
    }

    let hash = this.hash(key);
    let bucket = this.#buckets[hash];

    if (!bucket) {
      this.#buckets[hash] = linkedList();
      bucket = this.#buckets[hash];
    }

    let itemIndex = bucket.find(key);

    if (itemIndex !== false) {
      bucket.replaceAt({ key, value }, itemIndex);
      return;
    }

    bucket.append({ key, value });
  }

  extendArr() {
    this.#capacity = this.#capacity * 2;
    let newArr = new Array(this.#capacity);
    this.#expansionCap = Math.ceil(this.#capacity * this.#loadFactor);

    let entriesArr = this.entries();

    this.#buckets = newArr;

    entriesArr.forEach(([key, value]) => {
      this.set(key, value);
    });
  }

  get(key) {
    const hash = this.hash(key);
    let bucket = this.#buckets[hash];

    if (!bucket) return null;

    const itemIndex = bucket.find(key);
    if (itemIndex !== false) {
      return bucket.at(itemIndex).value;
    }
    return null;
  }

  has(key) {
    const hash = this.hash(key);
    let bucket = this.#buckets[hash];

    if (!bucket) return false;

    const itemIndex = bucket.find(key);
    if (itemIndex !== false) {
      return true;
    }
    return false;
  }

  remove(key) {
    const hash = this.hash(key);
    let bucket = this.#buckets[hash];

    if (!bucket) return false;

    const itemIndex = bucket.find(key);
    if (itemIndex !== false) {
      bucket.removeAt(itemIndex);
      return true;
    }
    return false;
  }

  length() {
    let totalKeys = 0;
    this.#buckets.forEach((bucket) => {
      totalKeys += bucket.size();
    });

    return totalKeys;
  }

  clear() {
    this.#buckets.forEach((bucket) => {
      while (bucket.head) bucket.pop();
    });
  }

  keys() {
    let keyArr = [];
    this.#buckets.forEach((bucket) => {
      let tmpNode = bucket.head;
      while (tmpNode != null) {
        keyArr.push(tmpNode.key);
        tmpNode = tmpNode.nextNode;
      }
    });

    return keyArr;
  }

  values() {
    let valuesArr = [];
    this.#buckets.forEach((bucket) => {
      let tmpNode = bucket.head;
      while (tmpNode != null) {
        valuesArr.push(tmpNode.value);
        tmpNode = tmpNode.nextNode;
      }
    });

    return valuesArr;
  }

  entries() {
    let entriesArr = [];
    this.#buckets.forEach((bucket) => {
      let tmp = bucket.head;
      while (tmp != null) {
        entriesArr.push([tmp.key, tmp.value]);
        tmp = tmp.nextNode;
      }
    });

    return entriesArr;
  }

  display() {
    this.#buckets.forEach((bucket, index) => {
      console.log(`Bucket ${index}: ${bucket.toString()}`);
    });
  }
}
