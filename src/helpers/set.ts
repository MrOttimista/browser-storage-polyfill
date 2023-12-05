type ANY_OBJECT = Record<string, any>;

const set = function (items: ANY_OBJECT, cb?: () => void) {
  // Start: Handle function signature.
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
  // End: Handle function signature.

  Object.keys(items).forEach((k) => {
    localStorage.setItem(k, items[k] ? JSON.stringify(items[k]) : items[k]);
  });

  if (cb) {
    cb();
  }
};

export default set;
