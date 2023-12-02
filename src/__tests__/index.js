const { getStorage, setStorage, removeStorage, clearStorage } = require("..");
require("jest-localstorage-mock");

const dummyObject = {
  1: 1,
  z: "test",
  arr: [1, 2, 3],
  q: { 1: 1, arr: [1, 2, 3] },
  p: "anything",
};

beforeEach(() => {
  localStorage.clear();
});

describe("browser storage: set", () => {
  // Test function signature
  test("throwing error if no argument passed to the function", () => {
    expect(() => setStorage()).toThrow(TypeError);
  });

  test("throwing error if argument passed is not object", () => {
    expect(() => setStorage(["", "test"])).toThrow(TypeError);
    expect(() => setStorage("123")).toThrow(TypeError);
    expect(() => setStorage(1)).toThrow(TypeError);
    expect(() => setStorage(() => dummyObject)).toThrow(TypeError);
  });

  test("throw error if the callback is not function", () => {
    expect(() => setStorage(dummyObject, 1)).toThrow(TypeError);
    expect(() => setStorage(dummyObject, "fef")).toThrow(TypeError);
    expect(() => setStorage(dummyObject, dummyObject)).toThrow(TypeError);
  });

  test("setting to current storage", () => {
    setStorage(dummyObject);

    Object.keys(dummyObject).forEach((k) => {
      expect(localStorage[k]).toEqual(JSON.stringify(dummyObject[k]));
    });
  });

  test("call the callback function once with no params", () => {
    const cb = jest.fn();

    setStorage(dummyObject, cb);

    expect(cb).toBeCalledTimes(1);
    expect(cb).toBeCalledWith();
  });
});

describe("browser storage: get", () => {
  // Test function signature
  test("throw error in case of invalid params", () => {
    expect(() => getStorage(["test", 1])).toThrow(TypeError);
    expect(() => getStorage("test", 1)).toThrow(TypeError);
    expect(() => getStorage("1111", "11123", "11111")).toThrow(TypeError);
    expect(() => getStorage(1)).toThrow(TypeError);
    expect(() => getStorage("test", () => null, 1)).toThrow(TypeError);
  });

  test("return all values if no parameter is passed", async () => {
    // storage is empty
    const emptyData = await getStorage();
    expect(emptyData).toEqual({});

    // storage has data
    setStorage(dummyObject);
    expect(await getStorage()).toEqual(dummyObject);
  });

  test("return values of keys if parameter is array", async () => {
    setStorage(dummyObject);

    Object.keys(dummyObject).forEach((key) => {
      getStorage(key).then((res) => {
        expect(res).toEqual({
          [key]: dummyObject[key],
        });
      });
    });
  });

  test("return values of keys if parameter is obj", () => {
    setStorage(dummyObject);

    Object.keys(dummyObject).forEach((key) => {
      getStorage({ [key]: 1 }).then((res) => {
        expect(res).toEqual({
          [key]: dummyObject[key],
        });
      });
    });
  });

  test("call the callback function with storage values as params", () => {
    const cb = jest.fn();
    setStorage(dummyObject);

    getStorage(null, cb);

    expect(cb).toBeCalledTimes(1);
    expect(cb).toBeCalledWith(dummyObject);
  });
});

describe("browser storage: remove", () => {
  // Test function signature
  test("throw error in case of invalid params", () => {
    expect(() => removeStorage(["test", 1])).toThrow(TypeError);
    expect(() => removeStorage("test", 1)).toThrow(TypeError);
    expect(() => removeStorage("1111", "11123", "11111")).toThrow(TypeError);
    expect(() => removeStorage(1)).toThrow(TypeError);
    expect(() => removeStorage("test", () => null, 1)).toThrow(TypeError);
  });

  test("remove values of keys if parameter is array", async () => {
    setStorage(dummyObject);

    Object.keys(dummyObject).forEach((key) => {
      removeStorage(String(key)).then(() => {
        expect(localStorage[key]).toBeUndefined();
      });
    });
  });

  test("call the callback function with storage values as params", () => {
    const cb = jest.fn();
    setStorage(dummyObject);

    removeStorage("1", cb);

    expect(cb).toBeCalledTimes(1);
    expect(cb).toBeCalledWith();
  });
});

describe("browser storage: clear", () => {
  // Test function signature
  test("throw error in case of invalid params", () => {
    expect(() => clearStorage(["test", 1])).toThrow(TypeError);
    expect(() => clearStorage("test", 1)).toThrow(TypeError);
    expect(() => clearStorage("1111", "11123", "11111")).toThrow(TypeError);
    expect(() => clearStorage(1)).toThrow(TypeError);
    expect(() => clearStorage("test", () => null, 1)).toThrow(TypeError);
    expect(() => clearStorage("test")).toThrow(TypeError);
  });

  test("remove values of keys if parameter is array", async () => {
    setStorage(dummyObject);

    await clearStorage();
    expect(Object.keys(localStorage)).toEqual([]);
  });

  test("call the callback function with storage values as params", () => {
    const cb = jest.fn();
    setStorage(dummyObject);

    clearStorage(cb);

    expect(cb).toBeCalledTimes(1);
    expect(cb).toBeCalledWith();
  });
});
