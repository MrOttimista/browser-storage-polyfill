const remove = function (
  key: string | string[],
  cb?: () => void
): Promise<void> {
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
};

export default remove;
