let AsyncStorage;

// if running locally (outside the browser extension runtime)
type ANY_OBJECT<T = any> = Record<string, T>;

if (!globalThis.chrome?.runtime?.id) {
  AsyncStorage = {
    set: function (items: ANY_OBJECT, cb?: () => void) {
      // Handle function signature.
      if (
        arguments.length < 1 ||
        arguments.length > 2 ||
        !items ||
        items.constructor !== Object ||
        (cb && typeof cb !== "function")
      ) {
        throw new TypeError(
          "Error in invocation of storage.set(object items, optional function callback): No matching signature."
        );
      }
      //
      Object.keys(items).forEach((k) => {
        localStorage.setItem(k, items[k] ? JSON.stringify(items[k]) : items[k]);
      });

      if (cb) {
        cb();
      }
    },
    get: function async(
      items: string | string[] | Record<string, any> | null | undefined,
      cb?: (z: ANY_OBJECT) => void
    ): Promise<Record<string, any>> {
      // handle signature
      if (
        items &&
        items.constructor === Array &&
        items.find((z: any) => typeof z !== "string")
      ) {
        throw new TypeError(
          "Error in invocation of storage.get(optional [string|array|object] keys, function callback): Error at parameter 'keys': Value did not match any choice"
        );
      }
      if (
        arguments.length > 2 ||
        typeof items === "number" ||
        (items &&
          !(
            typeof items !== "string" ||
            items.constructor !== Object ||
            items.constructor !== Array
          )) ||
        (cb !== undefined && typeof cb !== "function")
      ) {
        throw new TypeError(
          "Error in invocation of storage.get(optional [string|array|object] keys, function callback): No matching signature."
        );
      }

      let result: { [key: string]: any } = {};

      // in case of undefined or null, chrome storage return all keys
      let keys;
      if (!items) keys = Object.keys(localStorage);
      if (items?.constructor === Object) keys = Object.keys(items);
      if (items?.constructor === Array) keys = items;
      if (typeof items === "string") keys = [items];

      keys?.forEach((k: string) => {
        const val = localStorage.getItem(k);
        if (val) result[k] = JSON.parse(val);
      });
      if (cb) {
        cb({ ...result });
      }
      return Promise.resolve({ ...result });
    },
    remove: function (key: string | string[], cb?: () => void): Promise<void> {
      // Handle function signature.
      let keysToBeDeleted = key;
      if (
        arguments.length > 2 ||
        (keysToBeDeleted &&
          typeof keysToBeDeleted !== "string" &&
          !Array.isArray(keysToBeDeleted)) ||
        (cb && typeof cb !== "function")
      ) {
        throw new TypeError(
          "Error in invocation of storage.remove([string|array] keys, optional function callback): No matching signature."
        );
      }
      if (
        Array.isArray(keysToBeDeleted) &&
        keysToBeDeleted.find((z) => typeof z !== "string")
      ) {
        throw new TypeError(
          " Error in invocation of storage.remove([string|array] keys, optional function callback): Error at parameter 'keys': Value did not match any choice."
        );
      }

      if (typeof key === "string") {
        localStorage.removeItem(key);
      } else {
        key.forEach((k) => {
          localStorage.removeItem(k);
        });
      }
      cb && cb();
      return Promise.resolve();
    },
    clear: function (cb?: () => void): Promise<void> {
      if (arguments.length > 1 || (cb && typeof cb !== "function")) {
        throw new TypeError(
          "Error in invocation of storage.clear(optional function callback): No matching signature."
        );
      }

      localStorage.clear();
      cb && cb();
      return Promise.resolve();
    },
  };
} else {
  const { storage } = require("webextension-polyfill");

  AsyncStorage = {
    set: storage.local.set,
    get: storage.local.get,
    remove: storage.local.remove,
    clear: storage.local.clear,
  };
}
export const setStorage = AsyncStorage.set;

export const getStorage = AsyncStorage.get;

export const removeStorage = AsyncStorage.remove;

export const clearStorage = AsyncStorage.clear;
