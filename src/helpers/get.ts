type ANY_OBJECT = Record<string, any>;

const get = function async(
  items: string | string[] | Record<string, any> | null | undefined,
  cb?: (z: ANY_OBJECT) => void
): Promise<Record<string, any>> {
  // Start: handle function signature
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
  // End: handle function signature

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
};

export default get;
