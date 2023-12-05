# browser-storage-polyfill

JavaScript library that enables the use of storage outside of the Chrome runtime in web applications. It provides a way to simulate the chrome.storage API using the localStorage object.

`chrome.storage` API is not provided for normal web apps as it is build for **extension** usage only.

Check chrome.storage [docs](https://developer.chrome.com/docs/extensions/reference/api/storage)

the main idea is to use `localStorage` to simulate `chrome.storage`

## Usage

the same way you use the `chrome.storage` api

```js
import AsyncStorage from "browser-storage-polyfill";

// local storage
AsyncStorage.storage.local.set({ key: value }).then(() => {
  console.log("Value is set");
  // do something
});

AsyncStorage.storage.local.get(["key"]).then((result) => {
  console.log("Value currently is " + result.key);
  // do something
});

// sync storage

AsyncStorage.storage.sync.set({ key: value }).then(() => {
  console.log("Value is set");
  // do something
});

AsyncStorage.storage.sync.get(["key"]).then((result) => {
  console.log("Value currently is " + result.key);
  // do something
});

// session storage

AsyncStorage.storage.session.set({ key: value }).then(() => {
  console.log("Value was set");
  // do something
});

AsyncStorage.storage.session.get(["key"]).then((result) => {
  console.log("Value currently is " + result.key);
  // do something
});
```

## Motivation

The `chrome.storage` API is primarily designed for use in Chrome extensions. However, if you are developing a Chrome extension and want to test it as a web app, you may encounter limitations in using chrome.storage directly. This library aims to bridge that gap by providing a polyfill that allows you to use `localStorage` to simulate the chrome.storage behavior.

## Challenges

There are main differences between `localStorage` and `chrome.storage`.

- chrome.storage is Async while localStorage is Sync
- chrome.storage can handle callbacks
- function naming is different
- chrome.storage: in get method, if no parameter is passed, all values got returned
