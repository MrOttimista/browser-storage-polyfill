import clear from "./src/helpers/clear";
import get from "./src/helpers/get";
import remove from "./src/helpers/remove";
import set from "./src/helpers/set";

import { storage } from "webextension-polyfill";

import "react";
const polyFillStorage = {
  set: set,
  get: get,
  remove: remove,
  clear: clear,
};
let AsyncStorage = {
  local: polyFillStorage,
  session: polyFillStorage,
  sync: polyFillStorage,
};

// if running locally (outside the browser extension runtime)
if (globalThis.chrome?.runtime?.id) {
  AsyncStorage = storage;
}

export default AsyncStorage;
