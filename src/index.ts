import clear from "./helpers/clear";
import get from "./helpers/get";
import remove from "./helpers/remove";
import set from "./helpers/set";

let AsyncStorage;

// if running locally (outside the browser extension runtime)

if (!globalThis.chrome?.runtime?.id) {
  const polyFillStorage = {
    set: set,
    get: get,
    remove: remove,
    clear: clear,
  };

  AsyncStorage = {
    local: polyFillStorage,
    session: polyFillStorage,
    sync: polyFillStorage,
  };
} else {
  AsyncStorage = chrome.storage;
}

export default AsyncStorage;
