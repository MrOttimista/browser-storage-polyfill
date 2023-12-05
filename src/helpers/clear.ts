const clear = function (cb?: () => void): Promise<void> {
  if (arguments.length > 1 || (cb && typeof cb !== "function")) {
    throw new TypeError(
      "Error in invocation of storage.clear(optional function callback): No matching signature."
    );
  }

  localStorage.clear();
  cb && cb();
  return Promise.resolve();
};

export default clear;
